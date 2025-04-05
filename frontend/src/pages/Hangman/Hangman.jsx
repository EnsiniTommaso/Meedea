import React, { useState, useEffect } from "react";
import "./Hangman.css";
import Layout from "../../components/Layout";

const Hangman = () => {
  const words = ["react", "javascript", "html", "css", "node", "express"];
  const [selectedWord, setSelectedWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(12);
  const [gameOver, setGameOver] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [gameWon, setGameWon] = useState(false); // Aggiunto stato corretto

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord);
    setGuessedLetters([]);
    setRemainingAttempts(12);
    setGameOver(false);
    setGameWon(false);
    setImageIndex(0);
  };

  const handleGuess = (letter) => {
    if (gameOver || guessedLetters.includes(letter)) return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (!selectedWord.includes(letter)) {
      setRemainingAttempts(prev => prev - 1);
      setImageIndex(prev => prev + 1);
    }

    // Controllo se la parola è stata completata
    const isWordGuessed = selectedWord.split("").every((char) => newGuessedLetters.includes(char));
    if (isWordGuessed) {
      setGameWon(true);
      setGameOver(true);
    } else if (remainingAttempts <= 1) {
      setGameOver(true);
    }
  };

  const renderWord = () => {
    return selectedWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  return (
    <Layout>
      <header>
        <h1>Hangman Game</h1>
      </header>

      <div className="game-container">
        <div className="game-box">
          <div className="game-info">
            <div className="word-display">
              <h2>{renderWord()}</h2>
            </div>
            <div className="attempts">
              <p>Attempts left: {remainingAttempts}</p>
            </div>
            <div className={`hangman-image ${gameOver ? "show" : ""}`}>
              <img src={`../assets/Hangman-${imageIndex + 1}.png`} alt="Hangman" />
            </div>
          </div>

          {gameWon && (
            <div className="game-won-message">
              <h3>🎉 Parola indovinata! </h3>
              <h3> Complimenti, hai vinto! 🎉</h3>
            </div>
          )}

          <div className="keyboard">
            {["qwertyuiop", "asdfghjkl", "zxcvbnm"].map((row, index) => (
              <div className="letter-row" key={index}>
                {row.split("").map((letter) => (
                  <button
                    key={letter}
                    className={`letter-btn ${guessedLetters.includes(letter) ? "guessed" : ""}`}
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.includes(letter) || gameOver}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="restart-container">
            <button className="restart-btn" onClick={startNewGame}>
              Restart Game
            </button>
          </div>

          {gameOver && !gameWon && (
            <div className="game-over-message">
              <h3>😞 Hai perso!</h3>
              <p>La parola era: <strong>{selectedWord}</strong></p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Hangman;
