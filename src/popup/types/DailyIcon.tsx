import {
  ConfettiIcon,
  GlobeIcon,
  GridFourIcon,
  HashStraightIcon,
  JoystickIcon,
  PuzzlePieceIcon,
  TennisBallIcon,
  TextAaIcon,
} from "@phosphor-icons/react"

export enum DailyIcon {
  None,
  Letter,
  Number,
  Tiles,
  Game,
  World,
  Sport,
  Joke,
}

export function getIcon(type: DailyIcon | number, size: number = 32) {
  switch (type) {
    case DailyIcon.Letter:
      return <TextAaIcon size={size} weight="fill" />

    case DailyIcon.Number:
      return <HashStraightIcon size={size} weight="fill" />

    case DailyIcon.Tiles:
      return <GridFourIcon size={size} weight="fill" />

    case DailyIcon.Game:
      return <JoystickIcon size={size} weight="fill" />

    case DailyIcon.World:
      return <GlobeIcon size={size} weight="fill" />

    case DailyIcon.Sport:
      return <TennisBallIcon size={size} weight="fill" />

    case DailyIcon.Joke:
      return <ConfettiIcon size={size} weight="fill" />

    default:
      return <PuzzlePieceIcon size={size} weight="fill" />
  }
}
