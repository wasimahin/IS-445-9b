const callApiButton = document.getElementById("callApi");
const result = document.getElementById("result");

const travelInfo = {
  name: "Sam",
  countries: [
    { name: "Japan", year: 2019 },
    { name: "Italy", year: 2021 },
    { name: "Canada", year: 2022 },
    { name: "Mexico", year: 2023 },
    { name: "France", year: 2024 }
  ]
};

callApiButton.addEventListener("click", () => {
  fetch("/api/countries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(travelInfo)
  })
    .then(response => response.text())
    .then(text => {
      result.textContent = text;
    })
    .catch(error => {
      result.textContent = "Unable to reach the server.";
      console.error(error.message);
    });
});
