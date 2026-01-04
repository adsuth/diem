import { DailySortMode } from "./DailySortMode"

export type DailySettings = {
    sortMode: DailySortMode,
    isListView: boolean,
    showComplete: boolean,
}

export const DEFAULT_SETTINGS: DailySettings = {
    sortMode: DailySortMode.Custom,
    isListView: false,
    showComplete: true,
}