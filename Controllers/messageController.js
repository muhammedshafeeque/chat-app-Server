const { ObjectId } = require("mongodb");
const collection = require("../Config/collections");
const db = require("../Config/connection");
module.exports = {
  sendMessage: async (req, res) => {
    const { sender, content, chatId } = req.body;

    if (!sender || !content || !chatId) {
      res.send({ error: "required all parameters" });
    } else {
      try {
        let message = {
          senderId: sender,
          content: content,
          chat: chatId,
          sendDate: new Date(),
        };
        let chat = await db
          .get()
          .collection(collection.CHAT_COLLECTION)
          .updateOne(
            { _id: ObjectId(chatId) },
            {
              $set: {
                updatedAt: new Date(),
              },
            }
          );

        let data = await db
          .get()
          .collection(collection.MESSAGE_COLLECTION)
          .insertOne(message);
        if (data) {
          res.send(message);
        } else {
          res.send({ error: "message sending failed" });
        }
      } catch (error) {
        res.send({ error: "message sending failed" });
      }
    }
  },
  getlAllmessages: async (req, res) => {
    const chatId = req.params.chatId;
    try {
      let messages = await db
        .get()
        .collection(collection.MESSAGE_COLLECTION)
        .find({ chat: chatId })
        .toArray();
      if (messages) {
        res.send(messages);
      } else {
        res.send({ error: "no messages found" });
      }
    } catch (error) {
      res.send({ error: "message fetching faild" });
    }
  },
};
