import { DailyColor } from "@/popup/lib/types/DailyColor"
import { CheckIcon } from "@phosphor-icons/react"
import { MouseEvent } from "react"

interface IProps {
  value: DailyColor
  setter: (color: DailyColor) => void
}

export default function ColorSelect(props: IProps) {
  const colors = Object.values(DailyColor).filter((val) => !isNaN(+val))
  const { value, setter } = props

  function setValue(ev: MouseEvent<HTMLButtonElement>) {
    const color = +ev.currentTarget.value
    setter(color)
  }

  return (
    <>
      <div className="select-grid color-select">
        {colors.map((col) => (
          <button
            daily-color={col as string}
            value={col}
            key={col}
            data-selected={col === value}
            onClick={setValue}
          >
            {col === value && <CheckIcon size={32} fill="bold" />}
          </button>
        ))}
      </div>
    </>
  )
}
