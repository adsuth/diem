import { useEffect, useState } from "react"
import "./Dailies.scss"
import { DailyDto } from "../types/DailyDto"
import Daily from "./Daily"
import { fetchDailies, saveDailies } from "@/content/main"
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
  DailySortMode,
  getCurrentSortModeIcon as getSortIcon,
  nextSortMode,
  sortDailyByMethod,
} from "../types/DailySortMode"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

function getViewIcon(isListView: boolean) {
  return isListView ? (
    <ListIcon size={32} weight={"bold"} />
  ) : (
    <GridFourIcon size={32} weight={"bold"} />
  )
}

function getEditIcon(isEditMode: boolean) {
  return isEditMode ? (
    <LockSimpleOpenIcon size={32} weight={"bold"} />
  ) : (
    <LockSimpleIcon size={32} weight={"fill"} />
  )
}

export default function Dailies() {
  const [allDailies, setAllDailies] = useAtom(dailiesAtom)
  const [dailies, setDailies] = useState<DailyDto[]>([])
  const [isOpen, setIsOpen] = useAtom(addDailyModalIsOpenAtom)
  const [isListMode, setIsListMode] = useAtom(isListModeAtom)
  const [hideComplete, setHideComplete] = useAtom(hideCompleteAtom)
  const [sortMode, setSortMode] = useAtom(sortModeAtom)
  const [isEditMode, setIsEditMode] = useAtom(isDeleteModeAtom)

  useEffect(() => {
    fetchDailies(setAllDailies)
  }, [isOpen])

  useEffect(() => {
    const filtered = [...allDailies].filter(
      (daily) => !hideComplete || (hideComplete && !daily.wasOpenedToday)
    )
    const sorted = filtered.sort((a, b) => sortDailyByMethod(a, b, sortMode))
    setDailies(sorted)
  }, [allDailies, hideComplete, sortMode])

  useEffect(() => {
    if (!isEditMode) return
    setHideComplete(false)
  }, [isEditMode])

  useEffect(() => {
    if (!hideComplete) return
    setIsEditMode(false)
  }, [hideComplete])

  function reorder(
    list: DailyDto[],
    startIndex: any,
    endIndex: any
  ): DailyDto[] {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  function onDragEnd(result: any) {
    if (!result.destination) return

    const newOrderedDailies = reorder(
      dailies,
      result.source.index,
      result.destination.index
    )

    saveDailies(newOrderedDailies, setAllDailies)
  }

  let noDailiesMessage = null

  if (dailies.length === 0 && hideComplete && allDailies.length > 0)
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
  else if (allDailies.length === 0)
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
            {getSortIcon(sortMode)}
          </button>

          <button onClick={() => setIsListMode(!isListMode)}>
            {getViewIcon(isListMode)}
          </button>

          <button onClick={() => setIsEditMode(!isEditMode)}>
            {getEditIcon(isEditMode)}
          </button>

          <button onClick={() => setIsOpen(true)}>
            <PlusIcon size={32} weight={"bold"} />
          </button>
        </div>
      </header>

      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={() => setSortMode(DailySortMode.Custom)}
      >
        <Droppable droppableId="list">
          {(provided, _) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {noDailiesMessage ?? (
                <div className={isListMode ? "daily-list" : "daily-grid"}>
                  {dailies?.map((dto: DailyDto, index: number) => (
                    <Draggable
                      key={dto.id as string}
                      draggableId={dto.id as string}
                      index={index}
                      isDragDisabled={!isEditMode}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Daily dto={dto} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
