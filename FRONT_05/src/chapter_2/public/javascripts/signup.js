const login = document.querySelector("#login");
const password = document.querySelector("#password");
const repassword = document.querySelector("#repassword");
const signInButton = document.querySelector(".js-submit");
const roleButton = document.querySelector(`#admin`);

signInButton.addEventListener('click', evt => {
    evt.preventDefault();

    if (!login.value || !password.value || !repassword.value) {
        alert("Fill the form!");
    } if (password.value !== repassword.value) {
        alert("Passwords are different!");
    } else {
        const role = roleButton.value === "waiter" ? "waiter" : "admin";

        fetch('/waiter', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "Temp name",
                orders: null,
                login: login.value,
                password: password.value,
                role: role
            })
        })
            .then(res => res.json())
            .then(id => console.log(id))
            .catch(err => {
                console.log(err);
                alert("Something went wrong!")
            })
    }
})