const form = document.getElementById("orderForm");
const message = document.getElementById("message");

form.addEventListener("submit", event => {
  event.preventDefault();

  fetch("/ex1", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(new FormData(form))
  })
    .then(response => response.text())
    .then(text => {
      message.textContent = text;
    })
    .catch(error => {
      message.textContent = "Unable to reach the server.";
      console.error(error.message);
    });
});

form.addEventListener("reset", () => {
  message.textContent = "";
});
