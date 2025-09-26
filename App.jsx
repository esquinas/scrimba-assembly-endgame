import { useState } from "react"
import { clsx } from "clsx/lite"
import Chip from "./Chip"
import { languages } from "./languages"
import { getFarewellText } from "./farewells"
import getRandomWord from "./getRandomWord"

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState(getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  const numGuessesLeft = languages.length - 1
  const wrongGuessCount =
    guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const lastGuessedLetter = guessedLetters.at(-1)
  const isGameIdle = (!lastGuessedLetter) || currentWord.includes(lastGuessedLetter)
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= numGuessesLeft
  const isGameOver = isGameWon || isGameLost
  const isGameFarewell = !(isGameOver || isGameIdle)
  const lostLanguage = languages[wrongGuessCount - 1]
  const farewellText = getFarewellText(lostLanguage?.name)

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const languageChips = languages.map((lang, index) => (
    <Chip key={lang.name}
      isLost={index < wrongGuessCount}
      name={lang.name}
      color={lang.color}
      backgroundColor={lang.backgroundColor}
    />
  ))
  const letterElements = currentWord.split("").map((letter, index) => (
    <span className="char-box" key={index + letter}>
      { guessedLetters.includes(letter) && letter }
    </span>
  ))
  const alphabetButtons = alphabet.split("").map((letter, index) => {
    const isLetterInWord = checkLetterIsInWord(letter)
    const className = clsx(
      (isLetterInWord === true)  && "correct",
      (isLetterInWord === false) && "wrong"
    )

    return (
      <button className={className}
        key={letter + index}
        onClick={_ => { addGuessedLetter(letter) }}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
      >
        { letter }
      </button>
    )
  })

  function startNewGame() {
    setCurrentWord(_ => getRandomWord())
    setGuessedLetters(_ => [])
  }

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters
                                                                  : [...prevLetters, letter])
  }

  function checkLetterIsInWord(letter) {
    if (!guessedLetters.includes(letter)) return null
    return currentWord.includes(letter)
  }

  function renderGameStatus() {
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }

    if (isGameFarewell) {
      return (
        <>
          <p>"{farewellText}"</p>
        </>
      )
    }

    return null
  }

  console.log({ lostLanguage, farewellText, guessedLetters, lastGuessedLetter, isGameIdle })

  return (
    <main className="text-center">
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className={clsx("game-status", isGameWon && "won", isGameLost && "lost", (isGameFarewell) && "farewell")}
        aria-live="polite" role="status" >
        { renderGameStatus() }
      </section>

      <section className="language-chips">
        { languageChips }
      </section>

      <section className="word">
        { letterElements }
      </section>

      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {
            lastGuessedLetter && (
              currentWord.includes(lastGuessedLetter) ?
                `Correct! The letter ${lastGuessedLetter.toUpperCase()} is in the word.` :
                `Sorry, the letter ${lastGuessedLetter.toUpperCase()} is not in the word.`
              )
          }
        </p>
        <p>Current word: {
          currentWord.split("")
            .map(letter =>guessedLetters.includes(letter) ? `${letter}. ` : "blank. ")
            .join(" ")
        }</p>
      </section>

      <section className="keyboard">
        { alphabetButtons }
      </section>

      { isGameOver  &&
        <button className="new-game" onClick={ _ => startNewGame() }>New Game</button>
      }
    </main>
  )
}
