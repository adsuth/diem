import Dailies from "./components/Dailies"
import "./Popup.scss"
import DailyFormModal from "./components/modals/DailyFormModal"
import DailySearchEditModal from "./components/modals/DailySearchEditModal"
import { useEffect } from "react"
import { useAtom } from "jotai"
import { isPopupAtom } from "./lib/atoms"
import { isExtensionInPopupView } from "@/content/browser"

export default function App() {
  const [, setIsPopup] = useAtom(isPopupAtom)

  useEffect(() => {
    setIsPopup(isExtensionInPopupView())
  }, [])

  return (
    <>
      <DailySearchEditModal />
      <DailyFormModal />
      <Dailies />
    </>
  )
}
