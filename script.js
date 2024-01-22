let userList = document.getElementById("userList");
let userForm = document.getElementById("userForm");
let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");
let saveUserBtn = document.getElementById("saveUserBtn");

saveUserBtn.addEventListener("click", () => {
    console.log("Klick på knapp");

    let sendUser = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
    }

    console.log("send", sendUser);

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sendUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Svar från server", data);
        localStorage.setItem("user", data.id);

        // TÖM INPUTS
        userEmail.value = "";
        userName.value = "";
        userPassword.value = "";

        printUsers();
        printLogoutBtn();
    })

})

// INNIT
if (localStorage.getItem("user")) {
    // ÄR INLOGGAD
    printLogoutBtn();
} else {
    // ÄR INTE INLOGGAD
    printLoginForm();
}

function printUsers() {
    userList.innerHTML = "";
    fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(data => {
        console.log("data", data);

       data.map(user => {
        let li = document.createElement("li");
        li.innerText = user.name;

        userList.appendChild(li);
       })
    })
}

printUsers();

function printLoginForm() {
    userForm.innerHTML = "";
    let inputEmail = document.createElement("input");
    inputEmail.placeholder = "Epost";
    let inputPassword = document.createElement("input")
    inputPassword.placeholder = "Lösenord";
    inputPassword.type = "password";
    let loginBtn = document.createElement("button")
    loginBtn.innerText = "Logga in";

    loginBtn.addEventListener("click", () => {
        let sendUser = {email: inputEmail.value, password: inputPassword.value};

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log("post user", data);

            if (data.user) {
                localStorage.setItem("user", data.user)
                printLogoutBtn()
            } else {
                alert("Fel inlogg");
            }

        })
    })

    userForm.append(inputEmail, inputPassword, loginBtn);
}

function printLogoutBtn() {
    userForm.innerHTML = "";

    let logoutBtn = document.createElement("button");
    logoutBtn.innerText = "Logga ut";

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        printLoginForm();
    })

    userForm.appendChild(logoutBtn);

}
