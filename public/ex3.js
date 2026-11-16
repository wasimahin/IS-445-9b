const form = document.getElementById("articleForm");
const message = document.getElementById("message");

form.addEventListener("submit", event => {
  event.preventDefault();

  fetch("/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(new FormData(form))
  })
    .then(response => {
      const added = response.ok;
      return response.text().then(text => ({ added, text }));
    })
    .then(({ added, text }) => {
      message.textContent = text;
      if (added) {
        form.reset();
      }
    })
    .catch(error => {
      message.textContent = "Unable to reach the server.";
      console.error(error.message);
    });
});
