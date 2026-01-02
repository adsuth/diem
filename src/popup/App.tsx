import Dailies from "./components/Dailies"
import "./Popup.scss"
import DailyFormModal from "./components/modals/DailyFormModal"
import DailySearchEditModal from "./components/modals/DailySearchEditModal"

export default function App() {
  return (
    <>
      <DailySearchEditModal />
      <DailyFormModal />
      <Dailies />
    </>
  )
}
