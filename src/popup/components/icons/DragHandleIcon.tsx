import { isPopupAtom } from "@/popup/lib/atoms"
import { isChromium } from "@/popup/lib/browser"
import { DotsSixVerticalIcon, DotsSixIcon } from "@phosphor-icons/react"
import { useAtom } from "jotai"

interface IDndIconProps {
  isEditMode: boolean
  isListView: boolean
}

export function getDragHandleIcon(props: IDndIconProps) {
  const [isPopup] = useAtom(isPopupAtom)
  const { isEditMode, isListView } = props
  const isFirefoxPopup = isPopup && !isChromium

  if (!isEditMode || isFirefoxPopup) return <></>

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
