export default function HeadingCopy(props) {
  const defaultTitle = 'Assembly: Endgame'
  const defaultDescription = 'Guess the word in under 8 attempts to keep the programming world safe from Assembly!'

  return(
    <>
      <h1>{ props.title       || defaultTitle }</h1>
      <p>{  props.description || defaultDescription }</p>
    </>
  )
}
