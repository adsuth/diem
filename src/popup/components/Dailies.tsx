import { useEffect } from "react"
import "./Dailies.scss"
import { DailyDto } from "../types/DailyDto"
import Daily from "./Daily"
import { fetchDailies } from "@/content/main"
import {
  CalendarBlankIcon,
  EraserIcon,
  GridFourIcon,
  ListIcon,
  LockIcon,
  LockSimpleIcon,
  LockSimpleOpenIcon,
  PlusIcon,
} from "@phosphor-icons/react"
import { useAtom } from "jotai"
import {
  addDailyModalIsOpenAtom,
  dailiesAtom,
  isDeleteModeAtom,
  isListModeAtom,
  refreshAtom,
} from "../lib/atoms"

export default function Dailies() {
  const [dailies, setDailies] = useAtom(dailiesAtom)
  const [isOpen, setIsOpen] = useAtom(addDailyModalIsOpenAtom)
  const [isListMode, setIsListMode] = useAtom(isListModeAtom)
  const [isDeleteMode, setisDeleteMode] = useAtom(isDeleteModeAtom)
  const [refresh] = useAtom(refreshAtom)

  useEffect(() => {
    fetchDailies(setDailies)
  }, [isOpen, refresh])

  const listToggleIcon = isListMode ? (
    <GridFourIcon size={32} weight={"bold"} />
  ) : (
    <ListIcon size={32} weight={"bold"} />
  )
  const deleteToggleIcon = isDeleteMode ? (
    <LockSimpleOpenIcon size={32} weight={"bold"} />
  ) : (
    <LockSimpleIcon size={32} weight={"fill"} />
  )

  return (
    <>
      <header>
        <h1>Dailies</h1>
        <div>
          <button onClick={() => setIsListMode(!isListMode)}>
            {listToggleIcon}
          </button>

          <button onClick={() => setisDeleteMode(!isDeleteMode)}>
            {deleteToggleIcon}
          </button>

          <button onClick={() => setIsOpen(true)}>
            <PlusIcon size={32} weight={"bold"} />
          </button>
        </div>
      </header>

      <div className={isListMode ? "daily-list" : "daily-grid"}>
        {dailies?.map((dto: DailyDto) => (
          <Daily dto={dto} key={dto.id as string} />
        ))}
      </div>
    </>
  )
}
