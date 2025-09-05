import React from "react"
import Chip from "./Chip"
import { languages } from "./languages"

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState("react")
  const languageChips = languages.map(lang => (
    <Chip key={lang.name}
      name={lang.name}
      color={lang.color}
      backgroundColor={lang.backgroundColor}
    />
  ))
  const letterElements = currentWord.split("").map((letter, index) => (
    <span className="char-box" key={letter + index}>{ letter }</span>
  ))

  return (
    <main className="text-center">
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className="game-status">
        <h3>You win!</h3>
        <p>Well done! 🎉</p>
      </section>

      <section className="language-chips">
        { languageChips }
      </section>

      <section className="word">
        {letterElements }
      </section>
    </main>
  )
}
