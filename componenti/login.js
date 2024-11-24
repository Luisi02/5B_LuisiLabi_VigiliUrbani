function login() {
    // Prende username e password dagli input del login
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log('Try to login', username, password);

    // Crea costante data con password e username per poi usarla nella fetch
    const data = {
        password: password,
        username: username
    };

    // Fa la fetch sulla configurazione
    fetch("conf.json")
        .then((r) => r.json())
        .then((conf) => {
            console.log(conf.cacheToken);

            // Fa la fetch a ws.cipiaceinfo.it usando il token della configurazione
            return fetch("https://ws.cipiaceinfo.it/credential/login", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "key": conf.cacheToken, // Usa il token dalla configurazione
                },
                body: JSON.stringify(data)
            });
        })
        .then((r) => r.json())
        .then((response) => {
            if (response.result) {
                // Se loggato, nasconde il bottone login e mostra il bottone aggiungi
                document.getElementById('bottoneAggiungi').style.display = 'flex';
                document.getElementById('bottoneLogin').style.display = "none";
                sessionStorage.setItem("mattiaLogin", "utenteLoggato");
                // Se loggato dice che è loggato
                alert("Login effettuato con successo!");
            } else {
                // Se non è loggato, non toglie il pulsante login ma mostra un alert con errore
                alert("ERRORE DURANTE IL LOGIN!");
                console.log(response.result);
            }
        });
}
