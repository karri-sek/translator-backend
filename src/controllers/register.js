import admin from "firebase-admin";
export const registerUser = async (req, res) => {
    const db = admin.firestore();
  console.log(" req.body ", req.body)
  const { name, email, password, userType } = req.body;
  const data = {
    name,
    password,
    userType,
  };
  await db.collection("translators").doc(req.body.user.email).set(req.body.user);

  res.json({ message: "ok", statusCode: 200, user: req.body });
};

export default registerUser;
