import { DailyColor } from "@/popup/lib/types/DailyColor";
import { DailyDto } from "@/popup/lib/types/DailyDto";
import { DailyIcon } from "@/popup/lib/types/DailyIcon";
import { v7 as uuidv7} from "uuid";

export enum ChangedObjectStateEnum {
    DAILIES = 0,
    SETTINGS,
}

export const TODAY = new Date()

export const DEFAULT_DAILIES: DailyDto[] = [
    // NYT 
    {
        id: uuidv7(),
        name: "Wordle",
        link: "https://www.nytimes.com/games/wordle/index.html",
        icon: DailyIcon.Letter,
        color: DailyColor.Green,
        wasOpenedToday: false,
        openedUtc: null,
        modifiedUtc: new Date(),
        numberOfTimesOpened: 0,
        customOrder: 0,
    },
    {
        id: uuidv7(),
        name: "Connections",
        link: "https://www.nytimes.com/games/connections",
        icon: DailyIcon.Tiles,
        color: DailyColor.Pink,
        wasOpenedToday: false,
        openedUtc: null,
        modifiedUtc: new Date(),
        numberOfTimesOpened: 0,
        customOrder: 1,
    },
    {
        id: uuidv7(),
        name: "Strands",
        link: "https://www.nytimes.com/games/strands",
        icon: DailyIcon.Tiles,
        color: DailyColor.Teal,
        wasOpenedToday: false,
        openedUtc: null,
        modifiedUtc: new Date(),
        numberOfTimesOpened: 0,
        customOrder: 2,
    },


    // LinkedIn 
    {
        id: uuidv7(),
        name: "Queens",
        link: "https://www.linkedin.com/games/queens/",
        icon: DailyIcon.Puzzle,
        color: DailyColor.Purple,
        wasOpenedToday: false,
        openedUtc: null,
        modifiedUtc: new Date(),
        numberOfTimesOpened: 0,
        customOrder: 3,
    },
    {
        id: uuidv7(),
        name: "Tango",
        link: "https://www.linkedin.com/games/tango/",
        icon: DailyIcon.Puzzle,
        color: DailyColor.Blue,
        wasOpenedToday: false,
        openedUtc: null,
        modifiedUtc: new Date(),
        numberOfTimesOpened: 0,
        customOrder: 4,
    },

    // Game
    {
        id: uuidv7(),
        name: "Guess the Game",
        link: "https://guessthe.game/",
        icon: DailyIcon.Game,
        color: DailyColor.Red,
        wasOpenedToday: false,
        openedUtc: null,
        modifiedUtc: new Date(),
        numberOfTimesOpened: 0,
        customOrder: 5,
    },

    // Music
    {
        id: uuidv7(),
        name: "Bandle",
        link: "https://bandle.app/daily",
        icon: DailyIcon.Music,
        color: DailyColor.Black,
        wasOpenedToday: false,
        openedUtc: null,
        modifiedUtc: new Date(),
        numberOfTimesOpened: 0,
        customOrder: 6,
    },

    // Misc
    {
        id: uuidv7(),
        name: "Gisnep",
        link: "https://gisnep.com/",
        icon: DailyIcon.Letter,
        color: DailyColor.Green,
        wasOpenedToday: false,
        openedUtc: null,
        modifiedUtc: new Date(),
        numberOfTimesOpened: 0,
        customOrder: 7,
    },
    {
        id: uuidv7(),
        name: "Chess.com",
        link: "https://www.chess.com/puzzles",
        icon: DailyIcon.Puzzle,
        color: DailyColor.Grey,
        wasOpenedToday: false,
        openedUtc: null,
        modifiedUtc: new Date(),
        numberOfTimesOpened: 0,
        customOrder: 8,
    },
]

export const DEFAULT_DAILY_DTO: DailyDto = {
    id: null,
    name: "",
    link: "",
    icon: DailyIcon.Puzzle,
    color: DailyColor.Grey,
    wasOpenedToday: false,
    openedUtc: null,
    modifiedUtc: new Date(),
    numberOfTimesOpened: 0,
    customOrder: -1,
}