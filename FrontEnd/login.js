//Script who handle the log-in of a user
//Remove Local Storage
window.localStorage.removeItem("token");
//Getting form input to check Regex and recover their value
const emailForm = document.querySelector("#usermail");
const passwordForm = document.querySelector("#userpassword");
const regex = new RegExp("^[a-zA-Z0-9._-]+@[a-z0-9A-Z-]+\\.[a-z]+");
const submitForm = document.querySelector("input[type=submit]");
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
    console.log(logingIn);
    console.log(response);
    if (logingIn.status === 200) {
      window.localStorage.setItem("token", response.token);
      window.location.assign("index.html");
    } else {
      window.alert("Erreur dans l’identifiant ou le mot de passe");
    }
  } else {
    window.alert("Email ou Mot de passe invalide");
  }
});

// Check if Email is a valid Mail
/*
emailForm.addEventListener("change", function () {
  const regex = new RegExp("^[a-zA-Z0-9._-]+@[a-z0-9A-Z-]+\\.[a-z]+");
  const emailValue = emailForm.value;
  if (regex.test(emailValue)) {
    console.log("bien");
    emailForm.classList.remove("invalid");
  } else {
    emailForm.classList.add("invalid");
  }
  console.log(emailValue);
});

passwordForm.addEventListener("change", () => {
  const passwordValue = passwordForm.value;
  if (passwordValue.length > 1) {
    passwordForm.classList.remove("invalid");
  } else {
    passwordForm.classList.add("invalid");
  }
});*/
