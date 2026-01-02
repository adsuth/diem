import { DotsSixVerticalIcon, DotsSixIcon } from "@phosphor-icons/react"

interface IDndIconProps {
  isEditMode: boolean
  isListView: boolean
}

export function getDragHandleIcon(props: IDndIconProps) {
  const { isEditMode, isListView } = props
  if (!isEditMode) return <></>

  return isListView ? (
    <DotsSixVerticalIcon
      size={24}
      weight={"bold"}
      className="daily-drag-handle"
      display={isEditMode ? "flex" : "none"}
    />
  ) : (
    <DotsSixIcon
      size={24}
      weight={"bold"}
      className="daily-drag-handle"
      display={isEditMode ? "flex" : "none"}
    />
  )
}
