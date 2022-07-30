import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: any;
  }
}

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  let appVerifier = useRef<RecaptchaVerifier>();
  let confirmationResult = useRef<ConfirmationResult>();
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [codeValid, setCodeValid] = useState(true);
  const auth = useAuth();
  const firebaseAuth = getAuth();
  const navigate = useNavigate();

  const cleanPhoneNumber = () => {
    let cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
    return `+1${cleanPhoneNumber}`;
  };

  const onSendCodeClick = () => {
    if (appVerifier.current && recaptchaVerified) {
      signInWithPhoneNumber(
        firebaseAuth,
        cleanPhoneNumber(),
        appVerifier.current
      )
        .then((receivedConfirmation) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          setCodeSent(true);
          confirmationResult.current = receivedConfirmation;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onVerifyCodeClick = () => {
    setCodeValid(true);
    confirmationResult.current
      ?.confirm(code)
      .catch(() => {
        setCodeValid(false);
      })
      .then((value) => {
        if (value) {
          auth.signIn(value.user);
          navigate("/");
        }
      });
  };

  useEffect(() => {
    console.log("setting up recaptcha");
    appVerifier.current = new RecaptchaVerifier(
      "send-code-button",
      {
        size: "invisible",
        callback: (response: any) => {
          console.log(response);
          setRecaptchaVerified(true);
        },
      },
      firebaseAuth
    );
    if (appVerifier.current) {
      appVerifier.current.render().then((widgetId: any) => {
        window.recaptchaWidgetId = widgetId;
        appVerifier.current?.verify();
      });
    }
  }, [firebaseAuth]);

  return (
    <div className="container">
      {!auth.user && (
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
              "nes-btn " + (!recaptchaVerified ? "is-disabled" : "is-primary")
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
                onClick={() => {
                  onVerifyCodeClick();
                }}
                type="button"
                className={"nes-btn is-primary"}
              >
                Verify
              </button>
              {!codeValid && (
                <p className="nes-text is-error">
                  Invalid code, try again or double check the phone number is
                  correct
                </p>
              )}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
