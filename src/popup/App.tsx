import Dailies from "./components/Dailies"
import DailyFormModal from "./components/modals/DailyFormModal"
import DailySearchEditModal from "./components/modals/DailySearchEditModal"
import { useEffect } from "react"
import { useAtom } from "jotai"
import { allDailiesAtom, currentTabUrlAtom } from "./lib/atoms"
import { browser, isChromium } from "@/content/browser"
import { getDailiesOrSetDefaults } from "@/content/daily"
import "./App.scss"

export default function App() {
  const [, setAllDailies] = useAtom(allDailiesAtom)
  const [, setCurrentTabUrl] = useAtom(currentTabUrlAtom)

  useEffect(() => {
    getDailiesOrSetDefaults(setAllDailies)

    // chromium specific (chrome, edge, etc)
    if (isChromium) {
      browser.tabs.onActivated.addListener((activeInfo: any) => {
        browser.tabs.get(activeInfo.tabId, (tab: any) => {
          setCurrentTabUrl(tab.url || "")
        })
      })

      browser.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
        const url = tabs[0]?.url
        setCurrentTabUrl(url as string)
      })
      return
    }

    // firefox specific
    browser.tabs.onActivated.addListener((activeInfo: any) => {
      browser.tabs.get(activeInfo.tabId, (tab: any) => {
        setCurrentTabUrl(tab.url || "")
      })
    })

    browser.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      const url = tabs[0]?.url
      setCurrentTabUrl(url as string)
    })
  }, [])

  return (
    <>
      <DailySearchEditModal />
      <DailyFormModal />
      <Dailies />
    </>
  )
}
