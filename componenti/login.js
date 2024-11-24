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
}

