import { FunnelIcon, PencilIcon, PlusIcon, XIcon } from "@phosphor-icons/react"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import {
  editFormIsOpenAtom,
  editSearchIsOpenAtom,
  isListViewAtom,
  showCompleteAtom,
  sortModeAtom,
  viewTypeAtom,
} from "../lib/atoms"
import {
  getCurrentSortModeIcon,
  nextSortMode,
} from "../lib/types/DailySortMode"
import { getViewTitle } from "../lib/types/DailyView"
import ViewModeIcon from "./icons/ViewModeIcon"

interface IHeaderProps {
  close?: () => void
}

export default function Header(props: IHeaderProps) {
  const { close } = props

  const [isListView, setIsListView] = useAtom(isListViewAtom)
  const [showComplete, setShowComplete] = useAtom(showCompleteAtom)
  const [sortMode, setSortMode] = useAtom(sortModeAtom)

  const [isEditSearchOpen, setIsEditSearchOpen] = useAtom(editSearchIsOpenAtom)
  const [isEditFormOpen, setIsEditFormOpen] = useAtom(editFormIsOpenAtom)

  const [isHomeView, setIsHomeView] = useState(true)
  const [viewType] = useAtom(viewTypeAtom)

  useEffect(() => {
    setIsHomeView(!isEditSearchOpen && !isEditFormOpen)
  }, [isEditSearchOpen, isEditFormOpen])

  return (
    <header modal-type={viewType}>
      <h1>{getViewTitle(viewType)}</h1>
      <div>
        <button
          onClick={() => setShowComplete(!showComplete)}
          hidden={!isHomeView}
        >
          <FunnelIcon size={32} weight={showComplete ? "fill" : "bold"} />
        </button>

        <button
          onClick={() => setSortMode(nextSortMode(sortMode))}
          hidden={!isHomeView}
        >
          {getCurrentSortModeIcon(sortMode)}
        </button>

        <button onClick={() => setIsListView(!isListView)} hidden={!isHomeView}>
          <ViewModeIcon isListView={isListView} />
        </button>

        <button onClick={() => setIsEditSearchOpen(true)} hidden={!isHomeView}>
          <PencilIcon size={32} weight={"bold"} />
        </button>

        <button onClick={close} hidden={!close}>
          <XIcon size={32} weight="bold" />
        </button>

        <button onClick={() => setIsEditFormOpen(true)}>
          <PlusIcon size={32} weight={"bold"} />
        </button>
      </div>
    </header>
  )
}
