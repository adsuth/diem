import { ChangedObjectStateEnum } from "./decs"

export const BROWSER = chrome
export const STORAGE = BROWSER.storage.local;
export const TABS = typeof (globalThis as any).browser !== "undefined" ? 
    (globalThis as any).browser.tabs : 
    chrome.tabs


export function pingChanges(
    changed: ChangedObjectStateEnum,
    message: object,
) {
  (async () => {
    const [tab] = await BROWSER.tabs.query({
      active: true,
      lastFocusedWindow: true,
    })
    const key = ChangedObjectStateEnum[changed].toLowerCase() ?? null

    const content: { [key: string]: object } = {}
    content[key] = message

    await BROWSER.tabs.sendMessage(tab.id as number, content)

    console.log(`[diem] :: Saving changes`)
  })().catch(() => {})
}