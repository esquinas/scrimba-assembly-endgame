import { clsx } from "clsx"

export default function Chip(props) {
  return (
    <span
      className={clsx("chip", props.isLost && "lost")}
      style={{ color: props.color, backgroundColor: props.backgroundColor }}
    >
      { props.name }
    </span>
  )
}
