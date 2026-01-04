import { getViewTitle, ViewType } from "@/popup/lib/types/DailyView"
import { BackspaceIcon, FloppyDiskBackIcon } from "@phosphor-icons/react"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import {
  allDailiesAtom,
  currentTabUrlAtom,
  editDailyIdAtom,
  editFormIsOpenAtom,
  viewTitleAtom,
  viewTypeAtom,
} from "../../lib/atoms"
import { DailyColor } from "../../lib/types/DailyColor"
import { DailyDto } from "../../lib/types/DailyDto"
import { DailyIcon } from "../../lib/types/DailyIcon"
import { validateEnum, validateString } from "../../lib/validation"
import ColorSelect from "../form/ColorSelect"
import IconSelect from "../form/IconSelect"
import TextInput from "../form/TextInput"
import Header from "../Header"
import { findDaily, saveDaily } from "@/popup/lib/daily"
import { DEFAULT_DAILY_DTO } from "@/popup/lib/decs"

export default function DailyFormModal() {
  const [editDailyId, setEditDailyId] = useAtom(editDailyIdAtom)
  const [dto, setDto] = useState<DailyDto>(DEFAULT_DAILY_DTO)
  const [isEditFormOpen, setIsEditFormOpen] = useAtom(editFormIsOpenAtom)
  const [, setDailies] = useAtom(allDailiesAtom)
  const [currentUrl] = useAtom(currentTabUrlAtom)

  const [viewType] = useAtom(viewTypeAtom)
  const [, setViewTitle] = useAtom(viewTitleAtom)

  useEffect(() => {
    if (viewType !== ViewType.EditForm) return

    const titleTemplate = getViewTitle(ViewType.EditForm, editDailyId === null)

    if (editDailyId === null) {
      setViewTitle(titleTemplate)
      return
    }

    ;(async () => {
      const editDto = await findDaily(editDailyId)
      setViewTitle(titleTemplate.replace("{0}", editDto.name))
      setDto(editDto)
    })()

    setIsEditFormOpen(true)
  }, [viewType])

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
    setIsEditFormOpen(false)
  }

  async function submit() {
    if (!isValid()) return
    await saveDaily(dto, setDailies)
    clearAndClose()
  }

  return (
    <div
      className="view view-wrapper"
      hidden={!isEditFormOpen}
      daily-modal="edit-form"
    >
      <Header close={() => clearAndClose()} />
      <section hidden={!isEditFormOpen}>
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
