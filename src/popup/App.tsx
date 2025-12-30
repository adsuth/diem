import Dailies from "./components/Dailies"
import "./App.scss"
import Debug from "./components/Debug"
import AddDailyModal from "./components/AddDailyModal"

export default function App() {
  return (
    <>
      <Debug />
      <AddDailyModal />
      <Dailies />
    </>
  )
}
