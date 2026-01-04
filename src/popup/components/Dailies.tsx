import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import {
  allDailiesAtom,
  isListViewAtom,
  showCompleteAtom,
  sortModeAtom,
} from "../lib/atoms"
import { DailyDto } from "../lib/types/DailyDto"
import { sortDailyByMethod } from "../lib/types/DailySortMode"
import "./Dailies.scss"
import Daily from "./Daily"
import Header from "./Header"
import NoDailiesMessage from "./messages/NoDailiesMessage"

export default function Dailies() {
  const [dailies, setDailies] = useState<DailyDto[]>([])
  const [allDailies] = useAtom(allDailiesAtom)

  const [isListMode] = useAtom(isListViewAtom)
  const [showComplete] = useAtom(showCompleteAtom)
  const [sortMode] = useAtom(sortModeAtom)

  useEffect(() => {
    const filtered = [...allDailies].filter(
      (daily) => showComplete || (!showComplete && !daily.wasOpenedToday)
    )
    const sorted = filtered.sort((a, b) => sortDailyByMethod(a, b, sortMode))

    setDailies(sorted)
  }, [allDailies, showComplete, sortMode])

  const noDailiesMessage =
    dailies.length === 0 ? (
      <NoDailiesMessage
        allCount={allDailies.length}
        shownCount={dailies.length}
      />
    ) : null

  return (
    <>
      <Header />
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
