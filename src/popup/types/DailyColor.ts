export enum DailyColor {
    DarkRed,
    Red,
    Orange,
    Pink,
    Purple,
    Blue,
    Teal,
    Green,
    Grey,
    Black,
}

export function getColorFrom(color: DailyColor | number) {
    return DailyColor[color];
}