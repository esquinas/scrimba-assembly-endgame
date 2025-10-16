export default function StatusForTheVisuallyImpaired(props) {
  const lastGuessedLetter = props.guessedLetters.at(-1)

  return (
    <>
      <p>
        {
          lastGuessedLetter && (
            props.currentWord.includes(lastGuessedLetter) ?
              `Correct! The letter ${lastGuessedLetter.toUpperCase()} is in the word.` :
              `Sorry, the letter ${lastGuessedLetter.toUpperCase()} is not in the word.`
          )
        }
      </p>
      <p>Current word: {
        props.currentWord.split("")
          .map(letter => props.guessedLetters.includes(letter) ? `${letter}. ` : "blank. ")
          .join(" ")
      }</p>
    </>
  )
}
