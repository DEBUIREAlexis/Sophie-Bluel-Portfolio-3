//Script who handle the log-in of a user
//Remove Local Storage
window.localStorage.removeItem("token");
//Getting form input to check Regex and recover their value
const emailForm = document.querySelector("#usermail");
const passwordForm = document.querySelector("#userpassword");
const regex = new RegExp("^[a-zA-Z0-9._-]+@[a-z0-9A-Z-]+\\.[a-z]+");
const submitForm = document.querySelector("input[type=submit]");
mailChange(regex);
passwordChange();
// Check with the Api if user + password valid
submitForm.addEventListener("click", async function (event) {
  event.preventDefault();
  const userEmail = emailForm.value;
  const userPassword = passwordForm.value;

  if (regex.test(userEmail) && userPassword.length > 1) {
    const logingIn = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const response = await logingIn.json();
    if (logingIn.status === 200) {
      window.localStorage.setItem("token", response.token);
      window.location.assign("index.html");
    } else {
      const failToConnect = document.querySelector(".failToConnect");
      failToConnect.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    }
  } else {
    const failToConnect = document.querySelector(".failToConnect");
    failToConnect.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
  }
});

//Check if change in mail
function mailChange(regex) {
  const mail = document.querySelector("#usermail");
  mail.addEventListener("change", () => {
    const failToConnect = document.querySelector(".failToConnect");
    failToConnect.innerHTML = "";
  });
}

//Check if change in Password
function passwordChange() {
  const password = document.querySelector("#userpassword");

  password.addEventListener("change", () => {
    const failToConnect = document.querySelector(".failToConnect");
    failToConnect.innerHTML = "";
  });
}
