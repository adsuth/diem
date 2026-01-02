import { ChangedObjectStateEnum } from "./decs"

export const isChromium  = typeof (globalThis as any).browser !== "undefined";
export const browser = typeof (globalThis as any).browser !== "undefined" ? 
    (globalThis as any).browser : 
    chrome
export const storage = browser.storage.local

export function pingChanges(
    changed: ChangedObjectStateEnum,
    message: object,
) {
  (async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      lastFocusedWindow: true,
    })
    const key = ChangedObjectStateEnum[changed].toLowerCase() ?? null

    const content: { [key: string]: object } = {}
    content[key] = message

    await browser.tabs.sendMessage(tab.id as number, content)

    console.log(`[diem] :: Saving changes`)
  })().catch(() => {})
}

export function isExtensionInPopupView(): boolean {
    let url = window.location.search.substring(1);
    let params = url.split("&");

    for (let i = 0; i < params.length; i++) {
        let para = params[i].split("=");

        if (para[0] === "popup") {
            return para[1] === "true";
        }
    }

    return false
}
