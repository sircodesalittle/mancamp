import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export const Progress = () => {
  const auth = useAuth();
  const [progress, setProgress] = useState(0);
  const [signedUpForUpdates, setSignedUpForUpdates] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [paidForTrip, setPaidForTrip] = useState(false);
  const [barColor, setBarColor] = useState("is-error nes-progress");

  useEffect(() => {
    const getProfileProgress = (): number => {
      if (auth.profile?.progress.paidForTrip) {
        setPaidForTrip(true);
        setRegistered(true);
        setSignedUpForUpdates(true);
        return 100;
      }
      if (auth.profile?.progress.registered) {
        setRegistered(true);
        setSignedUpForUpdates(true);
        return 67;
      } else if (auth.profile?.progress.signedUpForUpdates) {
        setSignedUpForUpdates(true);
        return 33;
      }
      return 0;
    };
    const slowlyUpdate = async (finalNumber: number) => {
      if (progress !== finalNumber) {
        await setTimeout(() => {
          setProgress(progress + 1);
          if (progress >= 25) {
            setBarColor("is-warning nes-progress");
          }
          if (progress >= 50) {
            setBarColor("is-success nes-progress");
          }
          if (progress >= 75) {
            setBarColor("is-pattern nes-progress");
          }
        }, 70);
      }
    };
    if (auth.profile?.progress) {
      slowlyUpdate(getProfileProgress());
    }
  }, [auth, progress]);

  return (
    <div className="nes-container is-dark" style={{ marginBottom: "30px" }}>
      <p>Here's your progress so far</p>
      <progress
        className={barColor}
        value={progress.toString()}
        max="100"
      ></progress>
      <div className="lists">
        <ul className="nes-list is-circle">
          <li>
            <div style={{ backgroundColor: "#212529", padding: "1rem 0" }}>
              <label>
                <input
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  checked={signedUpForUpdates ? true : false}
                  readOnly
                />
                <span>Signed up for text updates</span>
              </label>
            </div>
          </li>
          <li>
            <div style={{ backgroundColor: "#212529", padding: "1rem 0" }}>
              <label>
                <input
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  checked={registered ? true : false}
                  readOnly
                />
                <span>Registered</span>
                {!registered && signedUpForUpdates && (
                  <Link to="/register">
                    <button type="button" className="nes-btn is-primary">
                      Register now
                    </button>
                  </Link>
                )}
              </label>
            </div>
          </li>
          <li>
            <div style={{ backgroundColor: "#212529", padding: "1rem 0" }}>
              <label>
                <input
                  type="checkbox"
                  className="nes-checkbox is-dark"
                  checked={paidForTrip ? true : false}
                  readOnly
                />
                <span>Paid for trip</span>
                {!paidForTrip && registered && signedUpForUpdates && (
                  <>
                    <p style={{ fontSize: ".5rem" }}>
                      *This status may take up to 24 hours to update
                    </p>
                    <Link to="/pay">
                      <button type="button" className="nes-btn is-primary">
                        Go to payment
                      </button>
                    </Link>
                  </>
                )}
              </label>
            </div>
          </li>
        </ul>
        {paidForTrip && registered && signedUpForUpdates && (
          <>
            <h1 className="nes-text is-primary">
              Congrats, your ManCamp has been
            </h1>
            <span
              style={{ margin: "0 auto", display: "table", fontSize: "3rem" }}
            >
              <span className="nes-text is-success">U</span>
              <span className="nes-text is-primary">P</span>
              <span className="nes-text is-warning">G</span>
              <span className="nes-text is-error">R</span>
              <span className="nes-text is-primary">A</span>
              <span className="nes-text is-success">D</span>
              <span className="nes-text is-warning">E</span>
              <span className="nes-text is-primary">D</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};
