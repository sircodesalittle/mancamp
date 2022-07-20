import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export const Header = () => {
  const auth = useAuth();

  const onSignOutClick = () => {
    auth.signOut();
  };

  return (
    <header>
      <div className="container">
        <div className="nav-brand">
          <Link to="/">
            <h1>ManCamp2.0</h1>
          </Link>
          <p>
            Upgrade your ManCamp <i className="trophy nes-icon brand-logo"></i>
          </p>
        </div>
        {!auth.user && (
          <div className="social-buttons">
            <div className="share">
              <Link to="/signin">
                <button className="nes-btn is-primary">Sign In</button>
              </Link>
            </div>
          </div>
        )}
        {auth.user && (
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
  );
};
