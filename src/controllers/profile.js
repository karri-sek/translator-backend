import admin from 'firebase-admin';
import { format } from 'util';
const getProfile = async (req, res) => {
  const db = admin.firestore();
  const { email } = req.body;
  const userRecord = await db.collection('translators').doc(email).get();
  const data = {
    name: userRecord.data().name,
    email,
  };
  const responseToSend = { message: 'ok', statusCode: 200, user: data };
  res.json(responseToSend);
};

const uploadToFirebase =  (file) => {
  return new Promise((resolve, reject) =>{
    const bucket = admin.storage().bucket('skyline-f1511.appspot.com');
    let newFileName = `${file.originalname}`;
    let fileUpload = bucket.file(newFileName);
    const blob = bucket.file(file.originalname);
    let imageURL = undefined;
    const blobStream = blob.createWriteStream();
    blobStream.on('error', (err) => {
      next(err);
    });
  
    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
       imageURL = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(imageURL);
    });
    blobStream.end(file.buffer);
  })
};

const uploadImageToStorage = async (file) => {
  const bucket = admin.storage().bucket('skyline-f1511.appspot.com');
  bucket.upload(file, function (err, file) {
    if (!err) {
      console.log('file uploaded', file);
    } else {
      console.log('error uploading image: ', err);
    }
  });
};
const uploadProfileImage = async (req, res) => {
  const storageRef = admin.storage().ref(`${this.imageData.name}`).put(this.imageData);
  storageRef.on(
    `state_changed`,
    (snapshot) => {
      this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      console.log('errror', error.message);
    },
    () => {
      this.uploadValue = 100;
      storageRef.snapshot.ref.getDownloadURL().then((url) => {
        this.picture = url;
      });
    },
  );
};

const toLowerCase = (x) => ((x=x.toLowerCase()) && x.trim());
const removeEmpty = (x) => !(x === undefined || x.length <0 || x=== '');

const updateProfile = async (req,res) => {
  const db = admin.firestore();

   
  const { email, imageURL, newLanguages, qualification, firstName, lastName, city } = req.body;
  const userRecord = await db.collection('translators').doc(email).get();
  let userData = userRecord.data();
  if(imageURL !== undefined){
    Object.assign(userData, {profileURL:imageURL})
  }
  if(newLanguages){
    userData.languages =  [...new Set(newLanguages.split(',').filter(removeEmpty).map(toLowerCase))];
    userData['qualification'] = qualification === undefined?'':qualification;
    userData['firstName'] = firstName;
    userData['lastName'] = lastName;
    userData['city'] = city === undefined?'':city;
  }
  await db.collection("translators").doc(email).set(userData);
  userData['email'] = email;
  res.json({ message: "ok", statusCode: 200, user: userData });
}
export { getProfile, uploadProfileImage, uploadImageToStorage, uploadToFirebase, updateProfile };
