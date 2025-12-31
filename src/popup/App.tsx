import Dailies from "./components/Dailies"
import "./App.scss"
import AddDailyModal from "./components/AddDailyModal"

export default function App() {
  return (
    <>
      <AddDailyModal />
      <Dailies />
    </>
  )
}
