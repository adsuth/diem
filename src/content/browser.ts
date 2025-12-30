import { ChangedObjectStateEnum } from "./decs"

// const BROWSER = typeof browser === "undefined" ? chrome : browser
export const BROWSER = chrome
export const storage = BROWSER.storage.local;

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