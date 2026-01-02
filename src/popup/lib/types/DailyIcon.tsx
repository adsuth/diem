import {
  ConfettiIcon,
  GlobeStandIcon,
  GridFourIcon,
  JoystickIcon,
  LightbulbIcon,
  MathOperationsIcon,
  MusicNotesIcon,
  PuzzlePieceIcon,
  TennisBallIcon,
  TextAaIcon,
} from "@phosphor-icons/react"

export enum DailyIcon {
  Puzzle,
  Letter,
  Game,
  Tiles,
  Music,
  Trivia,
  Math,
  World,
  Sport,
  Joke,
}

export function getIcon(type: DailyIcon | number, size: number = 32) {
  switch (type) {
    case DailyIcon.Letter:
      return <TextAaIcon size={size} weight="fill" />

    case DailyIcon.Math:
      return <MathOperationsIcon size={size} weight="fill" />

    case DailyIcon.Tiles:
      return <GridFourIcon size={size} weight="fill" />

    case DailyIcon.Game:
      return <JoystickIcon size={size} weight="fill" />

    case DailyIcon.World:
      return <GlobeStandIcon size={size} weight="fill" />

    case DailyIcon.Sport:
      return <TennisBallIcon size={size} weight="fill" />

    case DailyIcon.Joke:
      return <ConfettiIcon size={size} weight="fill" />

    case DailyIcon.Music:
      return <MusicNotesIcon size={size} weight="fill" />

    case DailyIcon.Trivia:
      return <LightbulbIcon size={size} weight="fill" />

    default:
      return <PuzzlePieceIcon size={size} weight="fill" />
  }
}
