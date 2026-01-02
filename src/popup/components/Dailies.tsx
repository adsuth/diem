import { fetchDailies } from "@/content/daily"
import { FunnelIcon, PencilIcon, PlusIcon } from "@phosphor-icons/react"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import {
  allDailiesAtom,
  editFormIsOpenAtom,
  editSearchIsOpenAtom,
  showCompleteAtom as hideCompleteAtom,
  isListViewAtom,
  sortModeAtom,
} from "../lib/atoms"
import { DailyDto } from "../lib/types/DailyDto"
import {
  getCurrentSortModeIcon as getSortIcon,
  nextSortMode,
  sortDailyByMethod,
} from "../lib/types/DailySortMode"
import "./Dailies.scss"
import Daily from "./Daily"
import ViewModelIcon from "./icons/ViewModeIcon"
import NoDailiesMessage from "./messages/NoDailiesMessage"

export default function Dailies() {
  const [allDailies, setAllDailies] = useAtom(allDailiesAtom)
  const [dailies, setDailies] = useState<DailyDto[]>([])

  const [isFormOpen, setIsFormOpen] = useAtom(editFormIsOpenAtom)
  const [isEditOpen, setIsEditOpen] = useAtom(editSearchIsOpenAtom)

  const [isListMode, setIsListMode] = useAtom(isListViewAtom)
  const [hideComplete, setHideComplete] = useAtom(hideCompleteAtom)
  const [sortMode, setSortMode] = useAtom(sortModeAtom)

  useEffect(() => {
    fetchDailies(setAllDailies)
  }, [isEditOpen])

  useEffect(() => {
    const filtered = [...allDailies].filter(
      (daily) => !hideComplete || (hideComplete && !daily.wasOpenedToday)
    )
    const sorted = filtered.sort((a, b) => sortDailyByMethod(a, b, sortMode))
    setDailies(sorted)
  }, [allDailies, hideComplete, sortMode])

  const noDailiesMessage =
    allDailies.length === 0 && dailies.length === 0 ? (
      <NoDailiesMessage
        allCount={allDailies.length}
        shownCount={dailies.length}
      />
    ) : null

  return (
    <>
      <header>
        <h1>Diem</h1>
        <div>
          <button onClick={() => setHideComplete(!hideComplete)}>
            <FunnelIcon size={32} weight={hideComplete ? "fill" : "bold"} />
          </button>

          <button onClick={() => setSortMode(nextSortMode(sortMode))}>
            {getSortIcon(sortMode)}
          </button>

          <button onClick={() => setIsListMode(!isListMode)}>
            <ViewModelIcon isListView={isListMode} />
          </button>

          <button onClick={() => setIsEditOpen(true)}>
            <PencilIcon size={32} weight={"bold"} />
          </button>

          <button onClick={() => setIsFormOpen(true)}>
            <PlusIcon size={32} weight={"bold"} />
          </button>
        </div>
      </header>

      {noDailiesMessage ?? (
        <div className={isListMode ? "daily-list" : "daily-grid"}>
          {dailies?.map((dto) => (
            <Daily dto={dto} key={dto.id as string} />
          ))}
        </div>
      )}
    </>
  )
}
