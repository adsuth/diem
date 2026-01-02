import { atom } from "jotai";
import { DailyDto } from "./types/DailyDto";
import { UUIDTypes } from "uuid";
import { DailySortMode } from "./types/DailySortMode";

export const isPopupAtom = atom<boolean>(false)
export const editSearchIsOpenAtom = atom<boolean>(false)
export const editFormIsOpenAtom = atom<boolean>(false)

export const editDailyIdAtom = atom<UUIDTypes | null>(null)
export const allDailiesAtom = atom<DailyDto[]>([])
export const currentTabUrlAtom = atom<string>("")
export const sortModeAtom = atom<DailySortMode>(DailySortMode.Custom)
export const isListViewAtom = atom<boolean>(true)
export const showCompleteAtom = atom<boolean>(false)
