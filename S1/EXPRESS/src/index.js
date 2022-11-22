import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const port = 3000;

const users = [];

app.post("/user", (request, response) => {
  console.log(request.body);
  const { email, name } = request.body;
  const userAlreadyExist = users.find((user) => user.email === email);

  if (userAlreadyExist) {
    return response
      .status(400)
      .json({ error: "This E-mail is already exist." });
  }

  users.push({
    email,
    name,
    id: uuidv4(),
  });

  return response.status(201).send();
});

app.get("/users", (request, response) => {
  return response.json(users);
});

app.get("/eletronicos", (request, response) => {
  response.send("seção de eletrônicos");
});

app.get("/moveis", (request, response) => {
  response.send("seção de móveis");
});

app.get("/construcao", (request, response) => {
  response.send("seção de construção");
});
app.get("*", (request, response) => {
  response.send("404 not found");
});

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
