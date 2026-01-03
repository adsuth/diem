import { DailyDto } from "@/popup/lib/types/DailyDto";
import { UUIDTypes } from "uuid";
import {v7 as uuidv7} from "uuid"
import { storage, pingChanges } from "./browser";
import { TODAY, DEFAULT_DAILIES, ChangedObjectStateEnum, DEFAULT_DAILY_DTO } from "./decs";

function dailyDtoFactory(dto: DailyDto): DailyDto {
    dto.openedUtc = new Date(dto.openedUtc as string)
    dto.wasOpenedToday = TODAY.toDateString() === dto.openedUtc.toDateString()
    return dto
}

export async function getDailiesOrSetDefaults(
  setter: (dtos: DailyDto[]) => void,
) {
    let dtos = await fetchDailies()
    if (dtos.length === 0) {
        dtos = [...DEFAULT_DAILIES]
    }

    saveDailies(dtos, setter)
}

export async function fetchDailies(
  setter?: (dtos: DailyDto[]) => void,
): Promise<DailyDto[]> {
    let storage = JSON.parse(
        localStorage.getItem("adsu-diem") as string,
    );

    storage = storage?.map(dailyDtoFactory)

    localStorage.setItem("adsu-diem", JSON.stringify(storage));

    if (setter) {
        setter(storage);
    }

    console.log(`[debug] :: Returning ${storage.length} dailies`)
    console.log(`        :: Dailies include\n: ${storage.map((row: DailyDto) => row.name)}`)

    return storage
}

export function saveDailies(dtosToSave: DailyDto[], setter: (dtos: DailyDto[]) => void) {
    const dtos = dtosToSave.map((row: DailyDto, i: number) => ({...row, customOrder: i}))
    
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
        dto.customOrder = dtos.length;
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
    const deletedDto = dtos.find(dto => dto.id === id)

    if (!deletedDto) throw new Error("[diem] :: Cannot delete daily that doesnt exist!");
    
    const filteredDtos = dtos
        .filter(dto => dto.id !== id)
    
    filteredDtos
        .forEach((dto, index) => {
            if (deletedDto.customOrder > dto.customOrder) {
                filteredDtos[index].customOrder--
            }
        })

    saveDailies(dtos.filter(dto => dto.id !== id), setter)
}

export async function setDailyOpened(id: UUIDTypes, setter: (dtos: DailyDto[]) => void) {
    const dto = await findDaily(id)
    dto.openedUtc = new Date()
    dto.wasOpenedToday = true
    dto.numberOfTimesOpened++
    saveDaily(dto, setter)
}