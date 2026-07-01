export default function AmountInput({ state = "filled", value }) {
  // states: empty | filled | hover | focused
  const text = value ?? (state === "empty" ? "0" : "1,000");
  if (state === "focused") {
    return (
      <div className="amount-input amount-input--focused">
        <span className="amount-input__figure">{text}</span>
        <span className="amount-input__caret" />
      </div>
    );
  }
  return (
    <div className={`amount-input amount-input--${state}`}>
      <span className="amount-input__figure">{text}</span>
      <span className="amount-input__rule" />
    </div>
  );
}
