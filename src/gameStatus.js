export default class GameStatus {
  #lastGuessedLetter

  constructor({ currentWord, guessedLetters, languages }) {
    this.currentWord = currentWord
    this.guessedLetters = guessedLetters
    this.languages = languages
    this.wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    this.lostLanguage = languages[this.wrongGuessCount - 1]
    this.#lastGuessedLetter = guessedLetters.at(-1)
    this.numGuessesLeft = languages.length - 1
  }

  get isIdle() {
    return !this.isOver && (!this.#lastGuessedLetter || this.currentWord.includes(this.#lastGuessedLetter))
  }
  get isWon() {
    if (this.currentWord === undefined) return false

    return this.currentWord.split("").every(letter => this.guessedLetters.includes(letter))
  }
  get isLost() {
    return this.wrongGuessCount >= this.numGuessesLeft
  }
  get isOver() {
    return this.isWon || this.isLost
  }
  get isFarewell() {
    return !this.isOver && !this.isIdle
  }
}
