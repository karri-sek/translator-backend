import admin from "firebase-admin";
export const verifyLogin = async (req, res) => {
  const db = admin.firestore();
  const email = req.body.email;
  const password = req.body.password; 
  const userRecord = await db.collection("translators").doc(email).get();
  if (userRecord.exists) {
    if (userRecord.data().password === password) {
      res.json({ message: "ok", statusCode: 200, user: Object.assign(userRecord.data(),{"email":email}) });
    } else {
      res.json({ message: "the password is not matched", statusCode: 401 });
    }
  } else {
    res.json({ message: "user not found", statusCode: 404 });
  }
};

export default verifyLogin;
