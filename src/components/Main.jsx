import { useState } from "react"
import { clsx } from "clsx/lite"
// Components
import Confetti from "react-confetti"
import Chip from "./Chip"
import HeadingCopy from "./HeadingCopy"
import Keyboard from "./Keyboard"
import StatusFarewell from "./StatusFarewell"
import StatusLost from "./StatusLost"
import StatusWon from "./StatusWon"
import StatusForTheVisuallyImpaired from "./StatusForTheVisuallyImpaired"
import Word from "./Word"
// Misc
import { languages } from "../data/languages"
import getRandomWord from "../getRandomWord"
import GameStatus from "../gameStatus"

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState(getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const game = new GameStatus({ currentWord, guessedLetters, languages })

  const languageChips = languages.map((lang, index) => (
    <Chip key={lang.name}
      isLost={index < game.wrongGuessCount}
      name={lang.name}
      color={lang.color}
      backgroundColor={lang.backgroundColor}
    />
  ))

  function startNewGame() {
    setCurrentWord(_ => getRandomWord())
    setGuessedLetters(_ => [])
  }

  function renderGameStatus() {
    if (game.isWon) {
      return <StatusWon />
    }

    if (game.isLost) {
      return <StatusLost />
    }

    if (game.isFarewell) {
      return <StatusFarewell lostLanguage={game.lostLanguage} />
    }

    return null
  }

  return (
    <main className="text-center">
      { game.isWon && <Confetti numberOfPieces={600} initialVelocityY={{ min: 0, max: 20 }} recycle={false} /> }
      <header>
        <HeadingCopy />
      </header>

      <section className={
          clsx("game-status",
            game.isWon      && "won",
            game.isLost     && "lost",
            game.isFarewell && "farewell"
          )
        }
        aria-live="polite" role="status" >
        { renderGameStatus() }
      </section>

      <section className="language-chips">
        { languageChips }
      </section>

      <section className="word">
        <Word currentWord={currentWord} guessedLetters={guessedLetters} isLost={game.isLost} />
      </section>

      <section className="sr-only" aria-live="polite" role="status">
        <StatusForTheVisuallyImpaired currentWord={currentWord} guessedLetters={guessedLetters} />
      </section>

      <section className="keyboard">
        <Keyboard alphabet="abcdefghijklmnopqrstuvwxyz"
          classToggle={[ "wrong", "correct" ]}
          currentWord={currentWord}
          guessedLetters={guessedLetters}
          disabled={game.isOver}
          setGuessedLetters={setGuessedLetters}
        />
      </section>

      { game.isOver  &&
        <button className="new-game" onClick={ _ => startNewGame() }>New Game</button>
      }
    </main>
  )
}
