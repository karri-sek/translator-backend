import admin from "firebase-admin";
export const searchTranslator = async (req, res) => {
  const db = admin.firestore();
  const { lang } = req.query;
  const translators = [];
  const allTranslators = await db.collection("translators").get();
  allTranslators.docs.map((doc) => {
    if (doc.data().languages) {
      if (doc.data().languages.indexOf(lang) >= 0) {
       const obj = doc.data();
       obj['email'] = doc.id;
        translators.push(obj);
      }
    }
  });
  res.send(translators);
};

export default searchTranslator;
