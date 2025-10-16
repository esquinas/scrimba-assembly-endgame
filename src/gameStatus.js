export default class GameStatus {
  #lastGuessedLetter
  #numGuessesLeft

  constructor({ currentWord, guessedLetters, languages }) {
    this.currentWord = currentWord
    this.guessedLetters = guessedLetters
    this.languages = languages
    this.wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    this.lostLanguage = languages[this.wrongGuessCount - 1]
    this.#lastGuessedLetter = guessedLetters.at(-1)
    this.#numGuessesLeft = languages.length - 1
  }

  get isGameIdle() {
    return !this.isGameOver && (!this.#lastGuessedLetter || this.currentWord.includes(this.#lastGuessedLetter))
  }
  get isGameWon() {
    if (this.currentWord === undefined) return false

    return this.currentWord.split("").every(letter => this.guessedLetters.includes(letter))
  }
  get isGameLost() {
    return this.wrongGuessCount >= this.#numGuessesLeft
  }
  get isGameOver() {
    return this.isGameWon || this.isGameLost
  }
  get isGameFarewell() {
    return !this.isGameOver && !this.isGameIdle
  }
}
