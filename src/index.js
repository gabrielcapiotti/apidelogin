import express from "express";
import cors from "cors";

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

let users = [];
let nextUserId = 1;

// SIGNUP
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received signup request:", { name, email, password });

  if (!name) {
    console.log("Signup error: Missing name");
    return res
      .status(400)
      .json({ message: "Please verify if you pass a valid name" });
  }

  if (!email) {
    console.log("Signup error: Missing email");
    return res
      .status(400)
      .json({ message: "Please verify if you pass a valid email address" });
  }

  if (!password) {
    console.log("Signup error: Missing password");
    return res
      .status(400)
      .json({ message: "Please verify if you pass a valid password" });
  }

  const newUser = { id: nextUserId++, name, email, password };
  users.push(newUser);

  console.log("User registered successfully:", newUser);

  return res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Received login request:", { email, password });

  if (!email) {
    console.log("Login error: Missing email");
    return res.status(400).json({ message: "Send a valid email" });
  }

  if (!password) {
    console.log("Login error: Missing password");
    return res.status(400).json({ message: "Send a valid password" });
  }

  const userVerify = users.find((user) => user.email === email);

  if (!userVerify) {
    console.log("Login error: Email not found");
    return res
      .status(400)
      .json({ message: "This email does not exist in the database" });
  }

  console.log("Login successful:", { email });

  return res
    .status(200)
    .json({ message: "Welcome! You have successfully logged in", email });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
