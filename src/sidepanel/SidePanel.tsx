import App from "@/popup/App"
import { isPopupAtom } from "@/popup/lib/atoms"
import { useAtom } from "jotai"
import { useEffect } from "react"
import "./SidePanel.scss"

export default function SidePanel() {
  const [, setIsPopup] = useAtom(isPopupAtom)

  useEffect(() => {
    setIsPopup(false)
  }, [])

  return <App />
}
