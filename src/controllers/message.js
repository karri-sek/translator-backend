import admin from "firebase-admin";

const getToUserMail = (toUser) =>{
  if(toUser && toUser.email === undefined){
    return toUser;
  }else{
    return toUser.email;
  }
}
const getFromUserEmail = (fromUser) =>{
  if(fromUser && fromUser.email === undefined){
    return fromUser;
  }else{
    return fromUser.email;
  }
}
export const receiveMessage = async (req, res) => {
  const db = admin.firestore();
  let {toUser, fromUser, message}= req.body;
  const toUserRecord = await db.collection("translators").doc(getToUserMail(toUser)).get();
  //this is the object going to store for each message 
  const newMessageObject = {fromUserEmail: getFromUserEmail(fromUser), message: [message]}
  const existingUser = toUserRecord.data();
  console.log(" existingUser.messages ",existingUser.messages, "  ",fromUser)
  let fromUserFound = false;
  if(existingUser.messages){
    existingUser.messages.forEach(element => {
      if(element && element.fromUserEmail === getFromUserEmail(fromUser)){
        fromUserFound = true;
        if(element.message === undefined){
          existingUser['message'] = [];
          element.message.push(message);
        }else{
          element.message.push(message);
        }
      }
    });
    if(!fromUserFound){
     existingUser.messages.push(newMessageObject);
    }
  }else if(existingUser.messages === undefined){
    existingUser['messages'] = [];
    existingUser.messages.push(newMessageObject);
  }
  console.log(" existingUser", existingUser)
  await db.collection("translators").doc(getToUserMail(toUser)).set(existingUser);
  res.json({ message: "ok", statusCode: 200, user: existingUser });
};

export default receiveMessage;
