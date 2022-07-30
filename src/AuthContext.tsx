import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getDocs,
  collection,
  addDoc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { firestoreDB } from "./firebase";

interface MancampProgress {
  signedUpForUpdates: boolean;
  registered: boolean;
  paidForTrip: boolean;
}
interface Profile {
  name: string;
  phone: string | undefined | null;
  email: string | undefined;
  tShirtSize: string | undefined;
  dietaryRestrictions: string | undefined;
  iceName: string | undefined;
  iceNumber: string | undefined;
  progress: MancampProgress;
}
interface AuthContextType {
  user: User | undefined;
  signIn: (user: User, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
  profile: Profile | undefined;
  profileDocRef: DocumentReference<DocumentData> | undefined;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [profileDocRef, setProfileDocRef] =
    useState<DocumentReference<DocumentData>>();
  const firebaseAuth = getAuth();

  const addOrGetUserProfile = useCallback(async () => {
    try {
      let foundProfile = false;
      const querySnapshot = await getDocs(
        collection(firestoreDB(), "userProfiles")
      );
      querySnapshot.forEach((doc) => {
        if (doc.data().phone === user?.phoneNumber) {
          foundProfile = true;
          const profile = { ...doc.data() } as Profile;
          setProfileDocRef(doc.ref);
          setProfile(profile);
        }
      });
      if (!foundProfile) {
        console.log("adding profile");
        const profile: Profile = {
          phone: user?.phoneNumber,
          name: "",
          email: "",
          progress: {
            signedUpForUpdates: true,
            registered: false,
            paidForTrip: false,
          },
          tShirtSize: "",
          dietaryRestrictions: "",
          iceName: "",
          iceNumber: "",
        };
        const docRef = await addDoc(
          collection(firestoreDB(), "userProfiles"),
          profile
        );
        setProfileDocRef(docRef);
        setProfile(profile);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [user?.phoneNumber]);

  const signIn = useCallback(
    (newUser: User, callback?: VoidFunction) => {
      setUser(newUser);
      addOrGetUserProfile();
      if (callback) {
        callback();
      }
    },
    [addOrGetUserProfile]
  );

  const signOut = (callback?: VoidFunction) => {
    return firebaseAuth.signOut().then(() => {
      setUser(undefined);
      if (callback) {
        callback();
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        signIn(firebaseUser);
      }
    });
  }, [firebaseAuth, signIn]);

  let value = { user, signIn, signOut, profile, profileDocRef };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
