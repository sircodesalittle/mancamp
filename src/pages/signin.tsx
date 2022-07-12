import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  updateProfile,
  User,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: any;
  }
}

export default function SignIn({ user }: { user: User | null }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  let appVerifier = useRef<RecaptchaVerifier>();
  let confirmationResult = useRef<ConfirmationResult>();
  const auth = getAuth();
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [displayNameInput, setDisplayNameInput] = useState("");

  const cleanPhoneNumber = () => {
    let cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
    return `+1${cleanPhoneNumber}`;
  };

  const onSendCodeClick = () => {
    if (appVerifier.current) {
      signInWithPhoneNumber(auth, cleanPhoneNumber(), appVerifier.current)
        .then((receivedConfirmation) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          setCodeSent(true);
          confirmationResult.current = receivedConfirmation;
        })
        .catch((error) => {
          console.log();
        });
    }
  };

  const onVerifyCodeClick = () => {
    confirmationResult.current?.confirm(code).then((result) => {
      if (!result.user.displayName) {
        setIsNewUser(true);
      }
    });
  };

  const onUpdateDisplayNameClick = (name: string) => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          console.log("user updated");
        })
        .catch((error) => {
          console.error("user could not be updated");
        });
    }
  };

  useEffect(() => {
    console.log("setting up recaptcha");
    appVerifier.current = new RecaptchaVerifier(
      "send-code-button",
      {
        size: "invisible",
        callback: (response: any) => {
          console.log(response);
          setRecaptchaVerified(false);
        },
      },
      auth
    );
    if (appVerifier.current) {
      appVerifier.current.render().then((widgetId: any) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  }, []);

  return (
    <div className="container">
      {user && (
        <main className="main-content">
          <p>Thanks for signing up!</p>
          <p>
            We'll keep you in the loop with any updates or if we need anything
            from you.
          </p>
          <Link to="/">
            <button className="nes-btn">Home</button>
          </Link>
          {/* <h3>See who else is going</h3>
          auth.
          <div className="cards">
            <section className="nes-container is-dark member-card">
              <div className="profile">
                <h4 className="name">B.C.Rikko</h4> <p>Creator of NES.css</p>{" "}
              </div>
            </section>

            <section className="nes-container is-dark member-card">
              <div className="profile">
                <h4 className="name">B.C.Rikko</h4> <p>Creator of NES.css</p>{" "}
              </div>
            </section>
          </div> */}
        </main>
      )}
      {!user && (
        <main className="main-content">
          <h1>Sign In</h1>
          <p>Get started or sign in by entering your phone number</p>
          <div className="nes-field">
            <label htmlFor="name_field">Phone Number</label>
            <input
              type="text"
              id="name_field"
              className="nes-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={
              "nes-btn " + (recaptchaVerified ? "is-disabled" : "is-primary")
            }
            onClick={() => {
              onSendCodeClick();
            }}
            id="send-code-button"
          >
            Send Code
          </button>
          <p style={{ fontSize: ".5rem" }}>
            By signing up, you agree to receive occasional text updates related
            to ManCamp2.0
          </p>
          {codeSent && (
            <div>
              <p>A code has been sent to your phone - enter it below</p>
              <div className="nes-field">
                <label htmlFor="code_field">Verification Code</label>
                <input
                  type="text"
                  id="code_field"
                  className="nes-input"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <button
                type="button"
                className={"nes-btn is-primary"}
                onClick={() => onVerifyCodeClick()}
              >
                Verify
              </button>
            </div>
          )}

          {isNewUser && (
            <div>
              <div className="nes-field">
                <label htmlFor="code_field">Your Name</label>
                <input
                  type="text"
                  id="code_field"
                  className="nes-input"
                  value={displayNameInput}
                  onChange={(e) => {
                    setDisplayNameInput(e.target.value);
                  }}
                />
              </div>
              {/* <section className="showcase">
              <section className="nes-container with-title">
                <h3 className="title">Sign Up</h3>
                <div className="nes-field">
                  <label htmlFor="name_field">Your name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="nes-input"
                  ></input>
                </div>

                <div className="nes-field">
                  <label htmlFor="name_field">Emergency Contact Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="nes-input"
                  ></input>
                </div>

                <div className="nes-field">
                  <label htmlFor="name_field">Emergency Contact Number</label>
                  <input
                    type="text"
                    id="name_field"
                    className="nes-input"
                  ></input>
                </div>
              </section>
            </section> */}
              <button
                type="button"
                className={"nes-btn is-primary"}
                onClick={() => onUpdateDisplayNameClick(displayNameInput)}
              >
                Submit
              </button>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
