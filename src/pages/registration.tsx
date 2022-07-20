import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { firestoreDB } from "../firebase";

function Registration() {
  const auth = useAuth();
  const addUserProfile = async () => {
    try {
      //   const docRef = await addDoc(collection(firestoreDB(), "userProfiles"), {
      //     user: user?.phoneNumber,
      //     name: "",
      //   });

      const querySnapshot = await getDocs(
        collection(firestoreDB(), "userProfiles")
      );
      querySnapshot.forEach((doc) => {
        if (doc.data().user === auth.user?.phoneNumber) {
          console.log("found user document - do not create a new one");
        }
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    addUserProfile();
  }, []);
  return <></>;
}

export default Registration;
