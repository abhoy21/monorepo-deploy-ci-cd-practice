import express from "express";
import { prisma } from "@repo/db/client";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/create-user", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
