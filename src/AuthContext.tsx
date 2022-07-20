import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";

interface AuthContextType {
  user: User | undefined;
  signIn: (user: User, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<User | undefined>(undefined);
  const firebaseAuth = getAuth();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        signIn(firebaseUser);
      }
    });
  }, [firebaseAuth]);

  const signIn = (newUser: User, callback?: VoidFunction) => {
    setUser(newUser);
    if (callback) {
      callback();
    }
  };

  const signOut = (callback?: VoidFunction) => {
    return firebaseAuth.signOut().then(() => {
      setUser(undefined);
      if (callback) {
        callback();
      }
    });
  };

  let value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
