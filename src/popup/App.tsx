import Dailies from "./components/Dailies"
import DailyFormModal from "./components/modals/DailyFormModal"
import DailySearchEditModal from "./components/modals/DailySearchEditModal"
import { useEffect } from "react"
import { useAtom } from "jotai"
import {
  allDailiesAtom,
  currentTabUrlAtom,
  isListViewAtom,
  showCompleteAtom,
  sortModeAtom,
} from "./lib/atoms"
import { browser, isChromium } from "@/content/browser"
import { getDailiesOrSetDefaults } from "@/content/daily"
import "./App.scss"
import {
  getOrSetDefaultSettings as getSettingsOrSetDefaults,
  saveSettings,
} from "@/content/settings"
import { DailySettings } from "./lib/types/DailySettings"

export default function App() {
  const [, setAllDailies] = useAtom(allDailiesAtom)
  const [, setCurrentTabUrl] = useAtom(currentTabUrlAtom)

  const [showComplete, setShowComplete] = useAtom(showCompleteAtom)
  const [sortMode, setSortMode] = useAtom(sortModeAtom)
  const [isListView, setIsListView] = useAtom(isListViewAtom)

  function setSettings(dto: DailySettings) {
    const { showComplete, sortMode, isListView } = dto
    console.log({ showComplete, sortMode, isListView })
    setShowComplete(showComplete)
    setSortMode(sortMode)
    setIsListView(isListView)
  }

  useEffect(() => {
    saveSettings({ showComplete, sortMode, isListView }, setSettings)
  }, [showComplete, sortMode, isListView])

  useEffect(() => {
    getDailiesOrSetDefaults(setAllDailies)
    getSettingsOrSetDefaults(setSettings)

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
