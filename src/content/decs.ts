import { DailyColor } from "@/popup/types/DailyColor";
import { DailyDto } from "@/popup/types/DailyDto";
import { DailyIcon } from "@/popup/types/DailyIcon";
import { v7 as uuidv7} from "uuid";

export enum ChangedObjectStateEnum {
    DAILIES = 0,
}

export const TODAY = new Date()

export const DEFAULT_DAILIES: DailyDto[] = [
    {
        id: uuidv7(),
        name: "Wordle",
        link: "https://www.nytimes.com/games/wordle/index.html",
        icon: DailyIcon.Letter,
        color: DailyColor.Green,
        wasOpenedToday: false,
        openedUtc: null,
    },
    {
        id: uuidv7(),
        name: "Connections",
        link: "https://www.nytimes.com/games/connections",
        icon: DailyIcon.Tiles,
        color: DailyColor.Red,
        wasOpenedToday: false,
        openedUtc: null,
    },
]

export const DEFAULT_DAILY_DTO: DailyDto = {
    id: null,
    name: "",
    link: "",
    icon: DailyIcon.None,
    color: DailyColor.None,
    wasOpenedToday: false,
    openedUtc: null,
}