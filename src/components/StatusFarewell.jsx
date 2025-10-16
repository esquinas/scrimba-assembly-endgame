import { getFarewellText } from "../data/farewells"

export default function StatusFarewell(props) {
  const farewellText = getFarewellText(props.lostLanguage?.name)

  return (
    <p>"{farewellText}"</p>
  )
}
