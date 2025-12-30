import { DailyIcon, getIcon } from "@/popup/types/DailyIcon"
import { MouseEvent } from "react"

interface IProps {
  value: DailyIcon
  setter: (icon: DailyIcon) => void
}

export default function IconSelect(props: IProps) {
  const icons = Object.values(DailyIcon).filter((val) => !isNaN(+val))
  const { value, setter } = props

  function setValue(ev: MouseEvent<HTMLButtonElement>) {
    setter(+ev.currentTarget.value)
  }

  return (
    <>
      <div className="select-grid icon-select">
        {icons.map((ico) => (
          <button
            value={ico}
            key={ico}
            data-selected={ico === value}
            onClick={setValue}
          >
            {getIcon(+ico, 32)}
          </button>
        ))}
      </div>
    </>
  )
}
