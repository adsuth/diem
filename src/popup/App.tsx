import { browser, isChromium } from "@/content/browser"
import { fetchDailies, getDailiesOrSetDefaults } from "@/content/daily"
import { useAtom } from "jotai"
import { useEffect } from "react"
import "./App.scss"
import Dailies from "./components/Dailies"
import DailyFormModal from "./components/modals/DailyFormView"
import DailySearchEditModal from "./components/modals/DailySearchEditView"
import {
  allDailiesAtom,
  currentTabUrlAtom,
  editFormIsOpenAtom,
  editSearchIsOpenAtom,
  sortModeAtom,
  viewTitleAtom,
  viewTypeAtom,
} from "./lib/atoms"
import { DailySortMode } from "./lib/types/DailySortMode"
import { getViewTitle, getViewType, staticTitles } from "./lib/types/DailyView"

export default function App() {
  const [, setAllDailies] = useAtom(allDailiesAtom)
  const [, setCurrentTabUrl] = useAtom(currentTabUrlAtom)
  const [isSearchEditOpen] = useAtom(editSearchIsOpenAtom)
  const [isFormEditOpen] = useAtom(editFormIsOpenAtom)

  const [, setSortMode] = useAtom(sortModeAtom)
  const [viewType, setViewType] = useAtom(viewTypeAtom)
  const [, setViewTitle] = useAtom(viewTitleAtom)

  //   function setSettings(dto: DailySettings) {
  //     const { showComplete, sortMode, isListView } = dto
  //     console.log({ showComplete, sortMode, isListView })
  //     setShowComplete(showComplete)
  //     setSortMode(sortMode)
  //     setIsListView(isListView)
  //   }

  //   useEffect(() => {
  //     saveSettings({ showComplete, sortMode, isListView }, setSettings)
  //   }, [showComplete, sortMode, isListView])

  useEffect(() => {
    getDailiesOrSetDefaults(setAllDailies)
    // getSettingsOrSetDefaults(setSettings)

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

  useEffect(() => {
    fetchDailies(setAllDailies)
    setSortMode(DailySortMode.Custom)
    setViewType(getViewType({ isFormEditOpen, isSearchEditOpen }))
  }, [isFormEditOpen, isSearchEditOpen])

  useEffect(() => {
    if (!staticTitles.includes(viewType)) return
    setViewTitle(getViewTitle(viewType))
  }, [viewType])

  function getBody() {
    // order of precedence, descending
    if (isFormEditOpen) return <DailyFormModal />
    if (isSearchEditOpen) return <DailySearchEditModal />
    return <Dailies />
  }

  return <>{getBody()}</>
}
