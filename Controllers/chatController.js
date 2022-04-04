const { ObjectId } = require("mongodb");
const collection = require("../Config/collections");
const db = require("../Config/connection");
module.exports = {
  chatAccess: async (req, res) => {
    const { userId } = req.body;
    try {
      let chat = await db
        .get()
        .collection(collection.CHAT_COLLECTION)
        .findOne({
          $and: [
            { users: { $elemMatch: { userId: req.user._id } } },
            { users: { $elemMatch: { userId: userId } } },
          ],
        });

      if (chat) {
        res.send(chat);
      } else {
        let user = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .findOne({ _id: ObjectId(userId) });
        let data = await db
          .get()
          .collection(collection.CHAT_COLLECTION)
          .insertOne({
            createdAt: new Date(),
            updatedAt: new Date(),
            users: [
              { userId: userId, name: user.name, email: user.email },
              {
                userId: req.user._id,
                name: req.user.name,
                email: req.user.email,
              },
            ],
          });
        const fullData = await db
          .get()
          .collection(collection.CHAT_COLLECTION)
          .findOne({ _id: ObjectId(data.insertedId) });
        res.send(fullData);
      }
    } catch (error) {
      res.send({ error: error });
    }
  },
  fetchChats:async(req,res)=>{
    try {
      let chats=await db.get().collection(collection.CHAT_COLLECTION).find({ users: { $elemMatch: { userId: req.user._id }}}).toArray()
      if(chats){
        res.send(chats)
      }else{
        res.send({error:"no Chats Found"})
      }
    } catch (error) {
      res.send({error:'chat fetching failed'})
    }
  }
};
