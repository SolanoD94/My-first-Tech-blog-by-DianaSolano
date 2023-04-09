const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.getElementById("user_name-signin").value.trim();
  const email = document.getElementById("email-signin").value.trim();
  const password = document.getElementById("password-signin").value.trim();

  console.log(name, email, password);
  if (email && password) {
    const response = await fetch("/api/user/signin", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert("Failed to create user.");
    }
  }
};

document
  .getElementById("signin-form")
  .addEventListener("submit", signupFormHandler);
