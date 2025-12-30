import { ChangeEvent } from "react"

interface IProps {
  name: string
  value: string
  setter: (text: string) => void
  required?: boolean
}

function labelNameFor(name: string) {
  return `daily-${name}`
}

export default function TextInput(props: IProps) {
  const { name, value, setter, required } = props

  function setValue(ev: ChangeEvent<HTMLInputElement>) {
    setter(ev.currentTarget.value)
  }

  return (
    <div className="text-input">
      <label htmlFor={labelNameFor(name)} data-required={required}>
        {name}
      </label>
      <input
        name={labelNameFor(name)}
        type="text"
        placeholder={`Enter ${name}...`}
        onChange={setValue}
        value={value}
      />
    </div>
  )
}
