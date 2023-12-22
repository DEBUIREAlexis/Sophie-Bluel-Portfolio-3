//Script who handle the log-in of a user
//Getting form input to check Regex and recover their value
const emailForm = document.querySelector("#usermail");
const passwordForm = document.querySelector("#userpassword");

const submitForm = document.querySelector("input[type=submit]");
submitForm.addEventListener("click", function (event) {
  event.preventDefault();
  const userEmail = emailForm.value;
  const userPassword = passwordForm.value;
  const logingIn = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});

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
