import { findDaily, saveDaily } from "@/content/daily"
import { DEFAULT_DAILY_DTO } from "@/content/decs"
import { BackspaceIcon, FloppyDiskBackIcon } from "@phosphor-icons/react"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import {
  allDailiesAtom,
  currentTabUrlAtom,
  editDailyIdAtom,
  editFormIsOpenAtom,
} from "../../lib/atoms"
import { DailyColor } from "../../lib/types/DailyColor"
import { DailyDto } from "../../lib/types/DailyDto"
import { DailyIcon } from "../../lib/types/DailyIcon"
import { validateEnum, validateString } from "../../lib/validation"
import ColorSelect from "../form/ColorSelect"
import IconSelect from "../form/IconSelect"
import TextInput from "../form/TextInput"
import Header from "../Header"
import { getViewTitle, ViewType } from "@/popup/lib/types/DailyView"

export default function DailyFormModal() {
  const [editDailyId, setEditDailyId] = useAtom(editDailyIdAtom)
  const [dto, setDto] = useState<DailyDto>(DEFAULT_DAILY_DTO)
  const [isOpen, setIsOpen] = useAtom(editFormIsOpenAtom)
  const [, setDailies] = useAtom(allDailiesAtom)
  const [currentUrl] = useAtom(currentTabUrlAtom)

  const [title, setTitle] = useState<string>(
    dto.id !== null ? `Edit ${dto.name}` : "New Daily"
  )

  useEffect(() => {
    const titleTemplate = getViewTitle(ViewType.EditFormModal)

    if (editDailyId === null) {
      setTitle(titleTemplate.replace("{0}", "New Daily"))
      return
    }

    ;(async () => {
      const editDto = await findDaily(editDailyId)
      setTitle(titleTemplate.replace("{0}", editDto.name))
      setDto(editDto)
    })()

    setIsOpen(true)
  }, [editDailyId])

  useEffect(() => {
    if (editDailyId !== null) return
    dto.link = currentUrl
  }, [currentUrl])

  function isValid() {
    return [
      validateString(dto.name, { max: 15, required: true }),
      validateString(dto.link, { required: true }),
      validateEnum(dto.color, { required: false }),
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
    if (!isValid()) return
    await saveDaily(dto, setDailies)
    clearAndClose()
  }

  return (
    <div
      className="modal modal-wrapper"
      hidden={!isOpen}
      daily-modal="edit-form"
    >
      <Header close={() => clearAndClose()} />
      <section hidden={!isOpen}>
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
      </section>
    </div>
  )
}
