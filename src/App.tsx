import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin";
import Home from "./pages/home";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const onSignOutClick = () => {
    auth.signOut();
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <div className="container">
            <div className="nav-brand">
              <Link to="/">
                <h1>ManCamp2.0</h1>
              </Link>
              <p>
                Upgrade your ManCamp{" "}
                <i className="trophy nes-icon brand-logo"></i>
              </p>
            </div>
            {!user && (
              <div className="social-buttons">
                <div className="share">
                  <Link to="/signin">
                    <button className="nes-btn is-primary">Sign In</button>
                  </Link>
                </div>
              </div>
            )}
            {user && (
              <div className="social-buttons">
                <div className="share">
                  <button
                    type="button"
                    className="nes-btn is-primary"
                    onClick={() => {
                      onSignOutClick();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
        <div className="container">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/signin" element={<SignIn user={user} />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
