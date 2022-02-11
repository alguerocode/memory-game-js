import { useEffect, useState } from "react";
import "./App.css";
import Card from "./card";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [turns, setTurns] = useState(0);
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // hanlde choice
  const handleChoice = (card) => {
    if (card.matched) return;
    firstChoice && firstChoice.id !== card.id ? setSecondChoice(card) : setFirstChoice(card);
  };

  useEffect(() => {
    if (secondChoice) {
      // if seconde choice matches first choice
      console.log(secondChoice.src === firstChoice.src);

      if (secondChoice.src === firstChoice.src) {
        setCards((cards) =>
          cards.map((card) => {
            return card.src === firstChoice.src ? { ...card, matched: true } : card;
          })
        );
      }

      // reset
      setTimeout(() => {
        setTurns(turns + 1);
        setSecondChoice(null);
        setFirstChoice(null);
      }, 600);
    }
  }, [secondChoice]);

  useEffect(() => shuffleCards(), []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <div class="buttons">
        <button onClick={() => shuffleCards()}>New Game</button>
        <button disabled>turns : {turns}</button>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            disabled={secondChoice}
            flipped={card === firstChoice || card.matched || card === secondChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
