export const Pay = () => {
  return (
    <>
      <h1>Payment</h1>
      <p>Please use either of the two links and pay $200</p>
      <p>
        If you have issues paying or prefer another way to pay,{" "}
        <a href="mailto:mancamp@alexdykstra.com">email Alex</a>
      </p>
      <a
        className="nes-btn"
        target="_blank"
        href="https://venmo.com/TheFlyingDutchman20"
        rel="noreferrer"
      >
        Venmo
      </a>
      <div></div>
      <a
        className="nes-btn"
        target="_blank"
        href="https://paypal.me/sircodesalittle"
        rel="noreferrer"
      >
        Paypal
      </a>
    </>
  );
};
