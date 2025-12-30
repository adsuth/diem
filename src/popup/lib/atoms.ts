import { atom } from "jotai";
import { DailyDto } from "../types/DailyDto";
import { UUIDTypes } from "uuid";

export const addDailyModalIsOpenAtom = atom<boolean>(false)
export const refreshAtom = atom<boolean>(false)
export const isListModeAtom = atom<boolean>(false)
export const isDeleteModeAtom = atom<boolean>(false)
export const dailiesAtom = atom<DailyDto[]>([])
export const editDailyIdAtom = atom<UUIDTypes | null>(null)
