export default function Chip(props) {
  return (
    <span className="chip" style={{ color: props.color, backgroundColor: props.backgroundColor }}>
      { props.name }
    </span>
  )
}
