import { ListIcon, GridFourIcon } from "@phosphor-icons/react"

interface IViewModeProps {
  isListView: boolean
}

export default function ViewModeIcon(props: IViewModeProps) {
  const { isListView } = props

  return isListView ? (
    <ListIcon size={32} weight={"bold"} />
  ) : (
    <GridFourIcon size={32} weight={"bold"} />
  )
}
