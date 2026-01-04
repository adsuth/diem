import { CheckIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react"
import { useAtom } from "jotai"
import { MouseEvent } from "react"
import { UUIDTypes } from "uuid"
import {
  allDailiesAtom,
  editDailyIdAtom,
  editFormIsOpenAtom,
  editSearchIsOpenAtom,
  isListViewAtom,
} from "../lib/atoms"
import { deleteDaily, setDailyOpened } from "../lib/daily"
import { DailyDto } from "../lib/types/DailyDto"
import { getIcon } from "../lib/types/DailyIcon"
import { getDragHandleIcon } from "./icons/DragHandleIcon"

interface IDailyProps {
  dto: DailyDto
}

function stopPropagationAndRun(
  ev: MouseEvent<HTMLButtonElement>,
  callback: () => void
) {
  ev.stopPropagation()
  callback()
}

export default function Daily(props: IDailyProps) {
  const { id, name, link, icon, color, wasOpenedToday } = props.dto
  const [isListView] = useAtom(isListViewAtom)
  const [isEditMode] = useAtom(editSearchIsOpenAtom)
  const [, setDailies] = useAtom(allDailiesAtom)

  if (isEditMode) return <EditableDaily dto={props.dto} />

  async function openDailyLink() {
    await setDailyOpened(id as UUIDTypes, setDailies)
    window.open(link, "_blank")
  }

  return (
    <div
      className="daily"
      daily-color={color}
      onClick={openDailyLink}
      daily-complete={`${wasOpenedToday}`}
    >
      {getIcon(icon, isListView ? 24 : 48)}

      <p>{name}</p>

      {/* todo :: future improvements: show stats */}
      {/* <div className="daily-actions" daily-edit-mode={"" + isEditMode}>
        <button onClick={(ev) => stopPropagationAndRun(ev, editDaily)}>
          <TrophyIcon size={24} weight={"bold"} />
        </button>
      </div> */}

      <div className="daily-check" data-complete={wasOpenedToday}>
        <CheckIcon size={24} weight={"bold"} />
      </div>
    </div>
  )
}

export function EditableDaily(props: IDailyProps) {
  const { id, name, icon, color } = props.dto
  const [isEditMode] = useAtom(editSearchIsOpenAtom)
  const [, setDailies] = useAtom(allDailiesAtom)
  const [, setEditDaily] = useAtom(editDailyIdAtom)
  const [, setIsEditFormOpen] = useAtom(editFormIsOpenAtom)

  function editDaily() {
    setEditDaily(id)
    setIsEditFormOpen(true)
  }

  function removeDaily() {
    deleteDaily(id as UUIDTypes, setDailies)
  }

  return (
    <div className="daily" daily-color={color} daily-complete="false">
      {getDragHandleIcon({ isEditMode, isListView: true })}

      {getIcon(icon, 24)}

      <p>{name}</p>

      <div className="daily-actions" daily-edit-mode="true">
        <button onClick={(ev) => stopPropagationAndRun(ev, editDaily)}>
          <PencilIcon size={24} weight={"bold"} />
        </button>

        <button onClick={(ev) => stopPropagationAndRun(ev, removeDaily)}>
          <TrashIcon size={24} weight={"bold"} />
        </button>
      </div>
    </div>
  )
}
