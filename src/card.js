import "./card.css";

export default function Card({ card, handleChoice, flipped, disabled }) {
  /* we use secondChoice to prevent user click cards when setTimeOut is not ended*/
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" alt="card front" />
        <img className="back" onClick={() => !disabled && handleChoice(card)} src="/img/cover.png" alt="card back"/>
      </div>
    </div>
  );
}
