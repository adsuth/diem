import {
  ClockIcon,
  ImageSquareIcon,
  ListNumbersIcon,
  PaletteIcon,
  TextAaIcon,
} from "@phosphor-icons/react"
import { DailyDto } from "./DailyDto"

export enum DailySortMode {
  Custom,
  Alphabetical,
  Color,
  Icon,
}

const dailySortModeCount = Object.values(DailySortMode).filter(
  (val) => !isNaN(+val)
).length

export function nextSortMode(mode: DailySortMode): DailySortMode {
  console.log(
    `[debug] :: Sorting from ${DailySortMode[mode]} to ${
      DailySortMode[(mode + 1) % dailySortModeCount]
    }`
  )
  return (mode + 1) % dailySortModeCount
}

export function sortBy(a: any, b: any) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export function sortDailyByMethod(
  a: DailyDto,
  b: DailyDto,
  mode: DailySortMode
): number {
  console.log(`[debug] :: Sorting by ${DailySortMode[mode]}`)
  switch (mode) {
    case DailySortMode.Custom:
      return sortBy(a.customOrder, b.customOrder)

    case DailySortMode.Alphabetical:
      return sortBy(a.name, b.name)

    case DailySortMode.Color:
      return sortBy(a.color, b.color)

    case DailySortMode.Icon:
      return sortBy(a.icon, b.icon)

    default:
      return sortBy(a.customOrder, b.customOrder)
  }
}

export function getCurrentSortModeIcon(mode: DailySortMode) {
  switch (mode) {
    case DailySortMode.Custom:
      return <ListNumbersIcon size={32} weight={"bold"} />

    case DailySortMode.Alphabetical:
      return <TextAaIcon size={32} weight={"bold"} />

    case DailySortMode.Color:
      return <PaletteIcon size={32} weight={"bold"} />

    case DailySortMode.Icon:
      return <ImageSquareIcon size={32} weight={"bold"} />

    default:
      return <ClockIcon size={32} weight={"bold"} />
  }
}
