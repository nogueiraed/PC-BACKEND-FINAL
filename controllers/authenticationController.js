const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../constants");
const Database = require("../model/database");
const database = new Database();
class AuthenticationController {
  async login(req, res) {
    try {
      const { user, password } = req.body;
      console.log(user, password);

      const query = "SELECT * FROM users where user = ? AND password = ?";
      let result = await database.ExecuteQuery(query, [user, password]);
      if (result && result[0]) {
        const token = jwt.sign({ user }, JWT_KEY, { expiresIn: 6000 });
        res.json({ token });
        console.log(token);
      } else {
        res.status(401).json({ error: "Not authorized: Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      console.log("Error, user not logged", error);
      res.status(500).json({ error: "Error on log in" });
    }
  }

  //     if (user == "" && password == "") {
  //       const token = jwt.sign({ user }, JWT_KEY, { expiresIn: 6000 });
  //       res.json({ token });
  //       console.log(token);
  //     } else {
  //       res.status(401).json({ error: "Not authorized: Invalid credentials" });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     console.log("Error, user not logged", error);
  //     res.status(500).json({ error: "Error on log in" });
  //   }
  // }
}

module.exports = AuthenticationController;
