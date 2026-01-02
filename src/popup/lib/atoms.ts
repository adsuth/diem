import { atom } from "jotai";
import { DailyDto } from "../types/DailyDto";
import { UUIDTypes } from "uuid";
import { DailySortMode } from "../types/DailySortMode";

export const addDailyModalIsOpenAtom = atom<boolean>(false)
export const editDailyIdAtom = atom<UUIDTypes | null>(null)
export const dailiesAtom = atom<DailyDto[]>([])
export const currentTabUrlAtom = atom<string>("")
export const sortModeAtom = atom<DailySortMode>(DailySortMode.Custom)
export const isListModeAtom = atom<boolean>(true)
export const isDeleteModeAtom = atom<boolean>(false)
export const showCompleteAtom = atom<boolean>(false)
