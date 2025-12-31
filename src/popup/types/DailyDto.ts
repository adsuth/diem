import { DailyColor } from "./DailyColor";
import { DailyIcon } from "./DailyIcon";
import { UUIDTypes } from "uuid";

export type DailyDto = {
    id: UUIDTypes | null,
    name: string,
    link: string,
    icon: DailyIcon,
    color: DailyColor,
    openedUtc: Date | null | string,
    wasOpenedToday: boolean,
    modifiedUtc: Date | string,
    numberOfTimesOpened: number,
}