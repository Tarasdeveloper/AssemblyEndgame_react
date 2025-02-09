import clsx from 'clsx';
import { languages } from 'languages';
import { useState } from 'react';

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  function addGuessedLetter(letter) {
    setGuessedLetters(
      prevLetters =>
        prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
      // const lettersSet = new Set(prevLetters);
      // lettersSet.add(letter);
      // return Array.from(lettersSet);
    );
  }

  const languageElems = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span className="chip" style={styles} key={lang.name}>
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord
    .split('')
    .map((letter, index) => (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter.toUpperCase() : ''}
      </span>
    ));

  const keyboardElement = alphabet.split('').map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        onClick={() => addGuessedLetter(letter)}
        key={letter}
      >
        {letter.toLocaleUpperCase()}
      </button>
    );
  });

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>

      <section className="language-chips">{languageElems}</section>

      <section className="word">{letterElements}</section>

      <section className="keyboard">{keyboardElement}</section>

      <button className="new-game">New Game</button>
    </main>
  );
}
