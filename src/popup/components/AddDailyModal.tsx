import { useEffect, useState } from "react"

import ColorSelect from "./Inputs/ColorSelect"
import { DailyColor } from "../types/DailyColor"
import IconSelect from "./Inputs/IconSelect"
import { DailyIcon } from "../types/DailyIcon"
import TextInput from "./Inputs/TextInput"
import { validateEnum, validateString } from "../lib/validation"
import { findDaily, saveDaily } from "@/content/main"
import { BackspaceIcon, FloppyDiskBackIcon, XIcon } from "@phosphor-icons/react"
import { useAtom } from "jotai"
import {
  addDailyModalIsOpenAtom,
  currentTabUrlAtom,
  dailiesAtom,
  editDailyIdAtom,
} from "../lib/atoms"
import { DailyDto } from "../types/DailyDto"
import { DEFAULT_DAILY_DTO } from "@/content/decs"

export default function AddDailyModal() {
  const [dto, setDto] = useState<DailyDto>(DEFAULT_DAILY_DTO)
  const [isOpen, setIsOpen] = useAtom(addDailyModalIsOpenAtom)
  const [editDailyId] = useAtom(editDailyIdAtom)
  const [, setDailies] = useAtom(dailiesAtom)
  const [, setEditDailyId] = useAtom(editDailyIdAtom)
  const [currentUrl, setCurrentTabUrl] = useAtom(currentTabUrlAtom)

  const title = dto.id !== null ? `Edit ${dto.name}` : "New Daily"

  useEffect(() => {
    if (editDailyId === null) return
    ;(async () => {
      const editDto = await findDaily(editDailyId)
      setDto(editDto)
    })()

    setIsOpen(true)
  }, [editDailyId])

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url
      console.log(`[debug] :: URL: ${url}`)
      setCurrentTabUrl(url as string)
    })
  }, [])

  useEffect(() => {
    if (editDailyId !== null) return
    dto.link = currentUrl
  }, [currentUrl])

  function isValid() {
    return [
      validateString(dto.name, { max: 15, required: true }),
      validateString(dto.link, { required: true }),
      validateEnum(dto.color, { required: true }),
      validateEnum(dto.icon, { required: false }),
    ].every((val) => val)
  }

  function clearAndClose() {
    clear()
    close()
  }

  function clear() {
    setDto(DEFAULT_DAILY_DTO)
  }

  function close() {
    setEditDailyId(null)
    setIsOpen(false)
  }

  async function submit() {
    console.log(`[debug] :: Saving new daily "${dto.name}"`)
    if (!isValid()) return
    await saveDaily(dto, setDailies)
    clearAndClose()
  }

  return (
    <div className="add-modal modal-wrapper" hidden={!isOpen}>
      <header>
        <h1>{title}</h1>
        <button onClick={clearAndClose}>
          <XIcon size={32} weight="bold" />
        </button>
      </header>

      <div className="add-modal-content">
        <TextInput
          name={"name"}
          value={dto.name}
          setter={(name: string) => setDto((old) => ({ ...old, name }))}
          required={true}
        />

        <TextInput
          name={"link"}
          value={dto.link}
          setter={(link: string) => setDto((old) => ({ ...old, link }))}
          required={true}
        />

        <div>
          <label>Color</label>
          <ColorSelect
            value={dto.color}
            setter={(color: DailyColor) => setDto((old) => ({ ...old, color }))}
          />
        </div>

        <div>
          <label>Icon</label>
          <IconSelect
            value={dto.icon}
            setter={(icon: DailyIcon) => setDto((old) => ({ ...old, icon }))}
          />
        </div>

        <div className="actions">
          <button type="button" onClick={clearAndClose}>
            <div>
              <BackspaceIcon size={16} weight="fill" />
              <span>Cancel</span>
            </div>
          </button>
          <button type="submit" onClick={submit} disabled={!isValid()}>
            <div>
              <FloppyDiskBackIcon size={16} weight="fill" />
              <span>Save</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
