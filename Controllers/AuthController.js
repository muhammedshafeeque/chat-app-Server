const db = require("../Config/connection");
const collection = require("../Config/collections");
const bcrypt = require("bcrypt");
const webToken = require("../Functions/webToken");
module.exports = {
  doSignup: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.send({ error: "all field Required" });
    } else {
      let userExist = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: email });
      if (userExist) {
        res.send({ error: "Email  Allready Registerd" });
      } else {
        try {
          let encryptedpassword = await bcrypt.hash(password, 10);
          let user = await db
            .get()
            .collection(collection.USER_COLLECTION)
            .insertOne({
              name: name,
              email: email,
              password: encryptedpassword,
            });
          res.status(200).send({
            name: name,
            email: email,
            id: user.insertedId,
            token: webToken.generateToken(user.insertedId),
          });
        } catch (error) {
          res.status(400).send(error);
        }
      }
    }
  },
  doLogin: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send({ error: "Pleas Enter Email and Password" });
    } else {
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: email });
      if (!user) {
        res.send({ error: "user not Exist " });
      } else {
        await bcrypt.compare(password, user.password).then((status) => {
          if (status) {
            res.status(200).send({
              name: user.name,
              email: user.email,
              id: user._id,
              token: webToken.generateToken(user._id),
            });
          } else {
            res.send({ error: "invvalide email or password" });
          }
        });
      }
    }
  },
};
