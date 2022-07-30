import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Progress } from "../components/Progress";

export default function Home() {
  const auth = useAuth();

  return (
    <>
      <section className="topic">
        {auth.user && <Progress />}
        <section className="nes-container with-title">
          <h3 className="title">Event Info</h3>
          <h2 className="nes-text is-success">Where</h2>
          <div className="lists">
            <ul className="nes-list is-disc">
              <li>
                140 Hyatt Bigham Road
                <br /> Turtletown, Tennessee
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.airbnb.com/rooms/22744812?guests=1&adults=1&s=67&unique_share_id=0b7e23ba-cf2d-437f-bcd4-bcd5a16db607"
                  rel="noreferrer"
                >
                  View the AirBnb
                </a>
              </li>
            </ul>
          </div>

          <h2 className="nes-text is-primary">When</h2>
          <div className="lists">
            <ul className="nes-list is-disc">
              <li>September 16 - 18</li>
            </ul>
          </div>

          <h2 className="nes-text is-warning">
            Cost <i className="nes-icon coin"></i>
            <i className="nes-icon coin"></i>
            <i className="nes-icon coin"></i>
          </h2>
          <div className="lists">
            <ul className="nes-list is-disc">
              <li>$200</li>
              <br></br>
              <li>
                Includes: food, lodging, snacks, white water rafting, speaker
              </li>
              <br></br>
              <li>Payment due by September 1st (scholarships available)</li>
            </ul>
          </div>

          <h2 className="nes-text is-error">The Speaker</h2>
          <div className="speaker">
            <img
              className="avatar"
              src="https://media-exp1.licdn.com/dms/image/C5603AQEIv2zB2FSN9g/profile-displayphoto-shrink_400_400/0/1657405864166?e=1664409600&v=beta&t=0qsfTJ8FxEICRqyAbpehS-sjHmLeRQ1PaCi94pZ16WE"
            />
            <h3 className="nes-text" style={{ paddingLeft: "10px" }}>
              Zack Shaffer
            </h3>
          </div>
          <p>Get to know the speaker before you go:</p>
          <div className="lists">
            <ul className="nes-list is-disc">
              <li>Bible teacher at North Cobb Christian School since 2005</li>
              <br></br>
              <li>
                Master's degree from Reformed Theological Seminary in
                Bible/Biblical Studies
              </li>
              <br></br>
              <li>
                <a
                  href="https://zackshaffer.wordpress.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Zack's Blog (good easy reads - subscribe too!)
                </a>
              </li>
              <br></br>
              <li>
                <a
                  href="https://zackshaffer.wordpress.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {!auth.user && (
            <>
              <Link to="/signin">
                <button
                  type="button"
                  id="signUpButton"
                  className="nes-btn"
                  style={{ width: "100%" }}
                >
                  Sign Up Now*
                </button>
              </Link>
              <p style={{ fontSize: ".65rem" }}>
                *Sign ups are to gauge interest and availability. A registration
                link will follow in the coming weeks, so sign up now to be in
                the know.
              </p>
            </>
          )}
        </section>
      </section>
    </>
  );
}
