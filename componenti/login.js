function login () {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    console.log('Try to login', username, password);

    const data = {
        password: password,
        username: username
    }
    fetch("conf.json")
    .then((r) => r.json())
    .then((conf) => {
        console.log(conf.cacheToken);
    });
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
            document.getElementById('bottoneAggiungi').style.display = 'flex'; 
            document.getElementById('bottoneLogin').style.display  = "none";
            sessionStorage.setItem("mattiaLogin","utenteLoggato")
            alert("Login effettuato con successo!");
        }else{
            alert("ERRORE DURANTE IL LOGIN!")
            console.log(response.result);
        }
    });
};


