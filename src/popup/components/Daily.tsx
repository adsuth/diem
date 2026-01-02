import { useAtom } from "jotai"
import { DailyDto } from "../types/DailyDto"
import { getIcon } from "../types/DailyIcon"
import {
  dailiesAtom,
  editDailyIdAtom,
  isDeleteModeAtom as isEditModeAtom,
  isListModeAtom,
} from "../lib/atoms"
import {
  CheckIcon,
  DotsSixIcon,
  DotsSixVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import { deleteDaily, setDailyOpened } from "@/content/main"
import { UUIDTypes } from "uuid"
import { MouseEvent } from "react"

interface IDailyProps {
  dto: DailyDto
}

function getDragHandleIcon(isEditMode: boolean, isListView: boolean) {
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

export default function Daily(props: IDailyProps) {
  const { id, name, link, icon, color, wasOpenedToday } = props.dto
  const [isListMode] = useAtom(isListModeAtom)
  const [isEditMode] = useAtom(isEditModeAtom)
  const [, setDailies] = useAtom(dailiesAtom)
  const [, setEditDaily] = useAtom(editDailyIdAtom)

  async function openDailyLink() {
    await setDailyOpened(id as UUIDTypes, setDailies)
    window.open(link, "_blank")
  }

  function editDaily() {
    setEditDaily(id)
  }

  function removeDaily() {
    deleteDaily(id as UUIDTypes, setDailies)
  }

  function stopPropagationAndRun(
    ev: MouseEvent<HTMLButtonElement>,
    callback: () => void
  ) {
    ev.stopPropagation()
    callback()
  }

  return (
    <>
      <div
        className="daily"
        daily-color={color}
        onClick={openDailyLink}
        daily-complete={`${wasOpenedToday}`}
      >
        {getDragHandleIcon(isEditMode, isListMode)}

        {getIcon(icon, isListMode ? 24 : 48)}

        <p>{name}</p>

        <div className="daily-actions" daily-edit-mode={"" + isEditMode}>
          <button onClick={(ev) => stopPropagationAndRun(ev, editDaily)}>
            <PencilIcon size={24} weight={"bold"} />
          </button>

          <button onClick={(ev) => stopPropagationAndRun(ev, removeDaily)}>
            <TrashIcon size={24} weight={"bold"} />
          </button>
        </div>

        <div className="daily-check" data-complete={wasOpenedToday}>
          <CheckIcon size={24} weight={"bold"} />
        </div>
      </div>
    </>
  )
}
