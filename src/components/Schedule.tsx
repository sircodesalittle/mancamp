export const Schedule = () => {
  return (
    <>
      <section className="nes-container">
        <h2 className="nes-text is-success">Friday</h2>
        <div className="lists">
          <ul className="nes-list is-disc">
            <li>Arrival</li>
            <ul>
              <li>As early as 4:00 PM</li>
            </ul>
            <li>Dinner</li>
            <li>First session</li>
            <li>Prayer</li>
            <li>Hangout, board games, etc.</li>
          </ul>
        </div>

        <h2 className="nes-text is-primary">Saturday</h2>
        <div className="lists">
          <ul className="nes-list is-disc">
            <li>Quiet time & coffee</li>
            <li>Breakfast</li>
            <li>Second Session</li>
            <li>Quick Lunch</li>
            <li>White water rafting (10 minute drive)</li>
            <li>Free time</li>
            <li>Third session</li>
          </ul>
        </div>

        <h2 className="nes-text is-warning">Sunday</h2>
        <div className="lists">
          <ul className="nes-list is-disc">
            <li>Breakfast</li>
            <li>Clean up</li>
            <li>Dip out (11:00 AM)</li>
          </ul>
        </div>
      </section>
    </>
  );
};
