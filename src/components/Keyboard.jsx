import { clsx } from "clsx/lite"

export default function Keyboard(props) {
  function addGuessedLetter(letter) {
    props.setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters
      : [...prevLetters, letter])
  }

  function checkLetterIsInWord(letter) {
    if (!props.guessedLetters.includes(letter)) return null
    return props.currentWord.includes(letter)
  }

  const alphabet = props.alphabet || "abcdefghijklmnopqrstuvwxyz"
  const classNameToggle = props.classToggle || ["wrong", "correct"]
  const alphabetButtons = alphabet.split("").map((letter, index) => {
    const isLetterInWord = checkLetterIsInWord(letter)

    return (
      <button className={
          clsx(
            (isLetterInWord === true)  && classNameToggle[1],
            (isLetterInWord === false) && classNameToggle[0],
          )
        }
        key={`letter-${letter}-${index}`}
        onClick={_ => { addGuessedLetter(letter) }}
        disabled={props.disabled}
        aria-disabled={props.guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
      >
        { letter }
      </button>
    )
  })

  return (
    <>
    { alphabetButtons }
    </>
  )
}
