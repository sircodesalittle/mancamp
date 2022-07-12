import { User } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Home({ user }: { user: User | null }) {
  return (
    <>
      <section className="topic">
        <section className="nes-container with-title">
          <h3 className="title">Event Info</h3>
          <h2 className="nes-text is-success">Where</h2>
          <div className="lists">
            <ul className="nes-list is-disc">
              <li>Turtletown, TN</li>
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
              <li>Includes: food, lodging, snacks, speaker</li>
              <br></br>
              <li>Additional white water rafting cost: TBD</li>
              <br></br>
              <li>
                Prices may decrease as more folks sign up, but it will not
                increase
              </li>
              <br></br>
              <li>Payment due by September 1st (scholarships available)</li>
            </ul>
          </div>

          {!user && (
            <>
              <Link to="/signin">
                <button
                  type="button"
                  id="signUpButton"
                  className="nes-btn is-primary"
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
