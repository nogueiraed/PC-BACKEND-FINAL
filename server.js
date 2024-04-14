console.log("Starting the server...");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


const authRoutes = require("./Routes/authRoutes");
app.use("/authRoutes", authRoutes);

const dwRoutes = require("./Routes/dwRoutes");
app.use("/entities", dwRoutes);

const jaRoutes = require("./Routes/jaRoutes");
app.use("/entities", jaRoutes )


app.listen(port, () => {
  console.log("server listening at: ", port);
});
