import { useEffect, useState } from "react"
import "./Dailies.scss"
import { DailyDto } from "../types/DailyDto"
import Daily from "./Daily"
import { fetchDailies } from "@/content/main"
import {
  FunnelIcon,
  GridFourIcon,
  HandWavingIcon,
  ListIcon,
  LockSimpleIcon,
  LockSimpleOpenIcon,
  PlusIcon,
  SirenIcon,
} from "@phosphor-icons/react"
import { useAtom } from "jotai"
import {
  addDailyModalIsOpenAtom,
  dailiesAtom,
  isDeleteModeAtom,
  isListModeAtom,
  showCompleteAtom as hideCompleteAtom,
  sortModeAtom,
} from "../lib/atoms"
import {
  getCurrentSortModeIcon,
  nextSortMode,
  sortDailyByMethod,
} from "../types/DailySortMode"

export default function Dailies() {
  const [dailies, setDailies] = useAtom(dailiesAtom)
  const [filteredDailies, setFilteredDailies] = useState<DailyDto[]>([])
  const [isOpen, setIsOpen] = useAtom(addDailyModalIsOpenAtom)
  const [isListMode, setIsListMode] = useAtom(isListModeAtom)
  const [hideComplete, setHideComplete] = useAtom(hideCompleteAtom)
  const [sortMode, setSortMode] = useAtom(sortModeAtom)
  const [isEditMode, setIsEditMode] = useAtom(isDeleteModeAtom)

  useEffect(() => {
    fetchDailies(setDailies)
  }, [isOpen])

  useEffect(() => {
    const filtered = [...dailies].filter(
      (daily) => !hideComplete || (hideComplete && !daily.wasOpenedToday)
    )
    const sorted = filtered.sort((a, b) => sortDailyByMethod(a, b, sortMode))

    setFilteredDailies(sorted)
  }, [dailies, hideComplete, sortMode])

  useEffect(() => {
    filteredDailies
  }, [sortMode])

  const listToggleIcon = isListMode ? (
    <ListIcon size={32} weight={"bold"} />
  ) : (
    <GridFourIcon size={32} weight={"bold"} />
  )
  const editToggleIcon = isEditMode ? (
    <LockSimpleOpenIcon size={32} weight={"bold"} />
  ) : (
    <LockSimpleIcon size={32} weight={"fill"} />
  )

  let noDailiesMessage = null

  if (filteredDailies.length === 0 && hideComplete && dailies.length > 0)
    noDailiesMessage = (
      <p className="no-daily-message">
        <span>
          There are no dailies left for today.
          <br />
          <br />
          <b>see you tomorrow!</b>
        </span>

        <HandWavingIcon size={64} weight={"regular"} />
      </p>
    )
  else if (dailies.length === 0)
    noDailiesMessage = (
      <p className="no-daily-message">
        <span>
          You have <b>no dailies!</b>
          <br />
          <br />
          <b>Reopen the popup</b> to load the defaults, or start adding your
          own.
        </span>

        <SirenIcon size={64} weight={"bold"} />
      </p>
    )

  return (
    <>
      <header>
        <h1>Diem</h1>
        <div>
          <button onClick={() => setHideComplete(!hideComplete)}>
            <FunnelIcon size={32} weight={hideComplete ? "fill" : "bold"} />
          </button>

          <button onClick={() => setSortMode(nextSortMode(sortMode))}>
            {getCurrentSortModeIcon(sortMode)}
          </button>

          <button onClick={() => setIsListMode(!isListMode)}>
            {listToggleIcon}
          </button>

          <button onClick={() => setIsEditMode(!isEditMode)}>
            {editToggleIcon}
          </button>

          <button onClick={() => setIsOpen(true)}>
            <PlusIcon size={32} weight={"bold"} />
          </button>
        </div>
      </header>

      {noDailiesMessage ?? (
        <div className={isListMode ? "daily-list" : "daily-grid"}>
          {filteredDailies?.map((dto: DailyDto) => (
            <Daily dto={dto} key={dto.id as string} />
          ))}
        </div>
      )}
    </>
  )
}
