import { clsx } from "clsx/lite"

export default function Word(props) {
  const letterElements = props.currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = props.isLost || props.guessedLetters.includes(letter)
    const letterClassName = clsx("char-box", props.isLost && !props.guessedLetters.includes(letter) && "wrong")

    return (
      <span className={letterClassName} key={index + letter}>
        {shouldRevealLetter && letter }
      </span>
    )
  })

  return (
    <>
      {letterElements}
    </>
  )
}
