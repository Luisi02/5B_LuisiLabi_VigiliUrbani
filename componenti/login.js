//Crea la funzione login
function login () {
    //Prende username e password dagli input del login
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    console.log('Try to login', username, password);
    //Crea costante data con password e login per poi usarla nella fetch
    const data = {
        password: password,
        username: username
    }
    // Fa la fetch sulla configurazione
    fetch("conf.json")
    .then((r) => r.json())
    .then((conf) => {
        console.log(conf.cacheToken);
    });
    //Fa la fetch a ws.cipiaceinfo.it
    fetch("https://ws.cipiaceinfo.it/credential/login",{
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "key": conf.cacheToken,
        },
        body: JSON.stringify(data)
    })
    .then((r) => r.json())
    .then((response) => {
        if (response.result){
            //Se loggato nasconte il bottone login e fa vedere il bottone aggiungi
            document.getElementById('bottoneAggiungi').style.display = 'flex'; 
            document.getElementById('bottoneLogin').style.display  = "none";
            sessionStorage.setItem("mattiaLogin","utenteLoggato")
            // Se loggato dice che è loggato
            alert("Login effettuato con successo!");
        }else{
            //Se non è loggato non toglie il pulsante login ma fa vedere alert con errore
            alert("ERRORE DURANTE IL LOGIN!")
            console.log(response.result);
        }
    });
};


