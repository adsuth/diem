export enum DailyColor {
    None,
    Red,
    Green,
    Blue,
    Pink,
    Orange,
    Teal,
    Purple,
}

export function getColorFrom(color: DailyColor | number) {
    return DailyColor[color];
}