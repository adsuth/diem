import { useAtom } from "jotai"
import { isPopupAtom } from "./lib/atoms"
import App from "./App"
import { useEffect } from "react"

export default function Popup() {
  const [, setIsPopup] = useAtom(isPopupAtom)

  useEffect(() => {
    setIsPopup(true)
  }, [])

  return <App />
}
