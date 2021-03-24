import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";
import Application from "../src/application/app";

//initializes firebase 
const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://translating-website.firebaseio.com",
  });
};
(async (PORT) => {
  const app = Application();
  initializeFirebase();
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
})(5000);
