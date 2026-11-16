const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/public", express.static(path.join(__dirname, "public")));

const sendView = fileName => (req, res) => {
  res.sendFile(path.join(__dirname, "views", fileName));
};

const articles = [
  { id: 1, title: "Learning Node.js", content: "Node.js lets you run JavaScript on the server." },
  { id: 2, title: "Express Basics", content: "Express makes it easy to define routes." },
  { id: 3, title: "Working with Forms", content: "Form data arrives in the body of a POST request." },
  { id: 4, title: "Deploying to Render", content: "Render can host a Node.js web service." }
];

app.get("/", sendView("index.html"));

app.get("/ex1", sendView("ex1.html"));

app.post("/ex1", (req, res) => {
  const { name, email } = req.body;

  res.type("text/plain");

  if (!name || !email) {
    res.status(400).send("Name and email are required.");
    return;
  }

  res.send(`${name}, Thank you for your order. We will keep you posted on delivery status at ${email}.`);
});

app.get("/ex2", sendView("ex2.html"));

app.post("/api/countries", (req, res) => {
  const { name, countries } = req.body;

  res.type("text/plain");

  if (!name || !Array.isArray(countries)) {
    res.status(400).send("A name and a countries array are required.");
    return;
  }

  res.send(`Your name is ${name} and you visited ${countries.length} countries. Keep traveling!`);
});

app.get("/ex3", sendView("ex3.html"));

app.post("/articles", (req, res) => {
  const { title, content } = req.body;

  res.type("text/plain");

  if (!title || !content) {
    res.status(400).send("A title and content are required.");
    return;
  }

  const maxId = articles.reduce((max, article) => (article.id > max ? article.id : max), 0);
  const newArticle = { id: maxId + 1, title, content };
  articles.push(newArticle);

  res.send(`New article added successfully with title "${newArticle.title}" and ID ${newArticle.id}!`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
