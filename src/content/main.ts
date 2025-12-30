import { DailyDto } from "@/popup/types/DailyDto";
import { ChangedObjectStateEnum, DEFAULT_DAILIES, DEFAULT_DAILY_DTO, TODAY } from "./decs";
import { pingChanges, storage } from "./browser";
import { UUIDTypes } from "uuid";
import { v7 as uuidv7 } from 'uuid';

function wasOpenedToday(openedUtc: Date) {
    return TODAY.toDateString() === openedUtc.toDateString()
}

function dailyDtoFactory(dto: DailyDto): DailyDto {
    dto.openedUtc = new Date(dto.openedUtc as string)
    dto.wasOpenedToday = wasOpenedToday(dto.openedUtc)
    return dto
}

export async function fetchDailies(
  setter?: (dtos: DailyDto[]) => void,
): Promise<DailyDto[]> {
    let storage = JSON.parse(
        localStorage.getItem("adsu-diem") as string,
    );

    storage = storage?.map(dailyDtoFactory)

    if (!storage || storage.length === 0) {
        console.log(`[debug] :: No dailies found, setting defaults`)
        storage = DEFAULT_DAILIES
    }

    localStorage.setItem("adsu-diem", JSON.stringify(storage));

    if (setter) {
        setter(storage);
    }

    console.log(`[debug] :: Returning ${storage.length} dailies`)
    console.log(`        :: Dailies include\n: ${storage.map((row: DailyDto) => row.name)}`)

    return storage
}

export function saveDailies(dtos: DailyDto[], setter: (dtos: DailyDto[]) => void) {
    storage.set({ dailies: dtos });
    localStorage.setItem("adsu-diem", JSON.stringify(dtos));
    console.log(`[debug] :: Saving ${dtos.length} dailies`)
    console.log(`        :: Dailies include\n: ${dtos.map((row: DailyDto) => row.name)}`)

    pingChanges(ChangedObjectStateEnum.DAILIES, dtos);
    setter(dtos)
}

export async function saveDaily(dto: DailyDto, setter: (dtos: DailyDto[]) => void) {
    console.log(`[debug] :: Fetching all dailies`)

    const dtos = await fetchDailies()
    console.log(`[debug] :: Found ${dtos.length} dailies, adding new daily`)

    if (dto.id !== null) {
        const indexOf = dtos.findIndex(row => row.id === dto.id)
        dtos[indexOf] = dto;
    }
    else {
        dto.id = uuidv7()
        dtos.push(dto)
    }

    saveDailies(dtos, setter)
}

export async function findDaily(id: UUIDTypes | null): Promise<DailyDto> {
    if (id === null) return DEFAULT_DAILY_DTO
    const dailies: DailyDto[] = await fetchDailies()
    const dto = dailies.find(row => row.id === id)
    return dto || DEFAULT_DAILY_DTO
}

export async function deleteDaily(id: UUIDTypes, setter: (dtos: DailyDto[]) => void) {
    console.log(`[debug] :: Deleting daily with id "${id}"`)
    let dtos = await fetchDailies()
    setter(dtos.filter(dto => dto.id !== id))
}

export async function setDailyOpened(id: UUIDTypes, setter: (dtos: DailyDto[]) => void) {
    const dto = await findDaily(id)
    dto.openedUtc = new Date()
    dto.wasOpenedToday = true
    saveDaily(dto, setter)
}