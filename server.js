console.log("Starting the server...");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const entitiesRoutes = require("./routes/entitiesRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/entities", entitiesRoutes);
app.use("/auth", authRoutes);


app.listen(port, () => {
  console.log("server listening at: ", port);
});
