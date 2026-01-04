import { DailySettings, DEFAULT_SETTINGS } from "@/popup/lib/types/DailySettings";
import { pingChanges, storage } from "./browser";
import { ChangedObjectStateEnum } from "./decs";

const SETTINGS_STORAGE_KEY = "diem-settings";

export async function fetchSettings(
  setter?: (dto: DailySettings) => void,
): Promise<DailySettings> {
    let storage = JSON.parse(
        localStorage.getItem(SETTINGS_STORAGE_KEY) as string,
    );
    if (setter) {
        setter(storage);
    }
    console.log(`[debug] :: Retrieving settings`)
    console.table({debug: true, ...storage})
    return storage
}

export async function saveSettings(dto: DailySettings, setter: (dto: DailySettings) => void) {
    storage.set({ settings: dto })
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(dto))
    console.log(`[debug] :: Saving settings`)
    pingChanges(ChangedObjectStateEnum.SETTINGS, dto)
    setter(dto)
}

export async function getOrSetDefaultSettings(
  setter: (dto: DailySettings) => void
) {
    let dto = await fetchSettings()
    if (!dto) {
        console.log(`[debug] :: Initializing default settings`)
        dto = DEFAULT_SETTINGS
    }
    await saveSettings(dto, setter)
}