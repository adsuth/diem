import { atom } from "jotai";
import { DailyDto } from "./types/DailyDto";
import { UUIDTypes } from "uuid";
import { DailySortMode } from "./types/DailySortMode";
import { DEFAULT_SETTINGS } from "./types/DailySettings";

export const isPopupAtom = atom<boolean>()
export const editSearchIsOpenAtom = atom<boolean>(false)
export const editFormIsOpenAtom = atom<boolean>(false)

export const editDailyIdAtom = atom<UUIDTypes | null>(null)
export const allDailiesAtom = atom<DailyDto[]>([])
export const currentTabUrlAtom = atom<string>("")

export const sortModeAtom = atom<DailySortMode>(DEFAULT_SETTINGS.sortMode)
export const isListViewAtom = atom<boolean>(DEFAULT_SETTINGS.isListView)
export const showCompleteAtom = atom<boolean>(DEFAULT_SETTINGS.showComplete)
