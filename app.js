import express from "express";
import createHomepageTemplate from "./views/index.js";
import createListTemplate from "./views/list.js";
import BOOKS_DATA from "./data/data.js";
import createBookTemplate from "./views/book.js";

// create app
const app = express();
app.use(express.urlencoded({ extended: false }));

// static assets
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.send(createHomepageTemplate());
});

app.get("/books", (req, res) => {
  res.send(createListTemplate());
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  console.log(req.body);
  const id = Math.random().toString();

  BOOKS_DATA.push({ id, title, author });

  res.redirect("/books/" + id);
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = BOOKS_DATA.find((b) => b.id === id);

  res.send(createBookTemplate(book));
});

// listen to port
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
