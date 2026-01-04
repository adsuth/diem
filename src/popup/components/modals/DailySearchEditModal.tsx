import { isChromium } from "@/content/browser"
import { saveDailies } from "@/content/daily"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { useAtom } from "jotai"
import {
  allDailiesAtom,
  editFormIsOpenAtom,
  editSearchIsOpenAtom,
  isPopupAtom,
} from "../../lib/atoms"
import { DailyDto } from "../../lib/types/DailyDto"
import Daily from "../Daily"
import Header from "../Header"
import NoDailiesMessage from "../messages/NoDailiesMessage"

export default function DailySearchEditModal() {
  const [allDailies, setAllDailies] = useAtom(allDailiesAtom)
  const [isEditSearchOpen, setIsEditSearchOpen] = useAtom(editSearchIsOpenAtom)
  const [, setIsEditFormOpen] = useAtom(editFormIsOpenAtom)
  const [isPopup] = useAtom(isPopupAtom)

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
      allDailies,
      result.source.index,
      result.destination.index
    )

    saveDailies([...newOrderedDailies], setAllDailies)
  }

  function openEditForm() {
    setIsEditFormOpen(true)
  }

  function close() {
    setIsEditSearchOpen(false)
  }

  const noDailiesMessage =
    allDailies.length === 0 ? (
      <NoDailiesMessage allCount={allDailies.length} />
    ) : null

  return (
    <div className="modal modal-wrapper" hidden={!isEditSearchOpen}>
      <Header close={() => close()} />

      <p className="notification" hidden={isChromium || !isPopup}>
        Drag and drop does not work in Firefox popups, please use the Side Bar
        view.
      </p>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided, _) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {noDailiesMessage ?? (
                <div className="daily-list">
                  {allDailies.map((dto: DailyDto, index: number) => (
                    <Draggable
                      key={dto.id as string}
                      draggableId={dto.id as string}
                      index={index}
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
    </div>
  )
}
