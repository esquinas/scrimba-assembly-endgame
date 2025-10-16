import { useState } from "react"
import { clsx } from "clsx/lite"
import Chip from "./Chip"
import HeadingCopy from "./HeadingCopy"
import StatusFarewell from "./StatusFarewell"
import StatusLost from "./StatusLost"
import StatusWon from "./StatusWon"
import Word from "./Word"
import { languages } from "../data/languages"
import getRandomWord from "../getRandomWord"
import Confetti from "react-confetti"
import StatusForTheVisuallyImpaired from "./StatusForTheVisuallyImpaired"

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

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const languageChips = languages.map((lang, index) => (
    <Chip key={lang.name}
      isLost={index < wrongGuessCount}
      name={lang.name}
      color={lang.color}
      backgroundColor={lang.backgroundColor}
    />
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
        <StatusWon />
      )
    }

    if (isGameLost) {
      return (
        <StatusLost />
      )
    }

    if (isGameFarewell) {
      return (
        <StatusFarewell lostLanguage={lostLanguage} />
      )
    }

    return null
  }

  return (
    <main className="text-center">
      { isGameWon && <Confetti numberOfPieces={600} initialVelocityY={{ min: 0, max: 20 }} recycle={false} /> }
      <header>
        <HeadingCopy />
      </header>

      <section className={clsx("game-status", isGameWon && "won", isGameLost && "lost", isGameFarewell && "farewell")}
        aria-live="polite" role="status" >
        { renderGameStatus() }
      </section>

      <section className="language-chips">
        { languageChips }
      </section>

      <section className="word">
        <Word currentWord={currentWord} guessedLetters={guessedLetters} isGameLost={isGameLost} />
      </section>

      <section className="sr-only" aria-live="polite" role="status">
        <StatusForTheVisuallyImpaired currentWord={currentWord} guessedLetters={guessedLetters} />
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
