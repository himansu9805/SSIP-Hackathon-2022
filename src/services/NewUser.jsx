import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function isNewUser(uid) {
  const docRef = doc(db, "Users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return false;
  } else {
    return true;
  }
}

export async function createNewUser(uid, user) {
  await setDoc(doc(db, "Users", uid), user)
    .then((userData) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}
