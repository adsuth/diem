export enum ViewType {
  Home = "",
  EditSearch = "edit-search",
  EditForm = "edit-form",
}

export function getViewTitle(type: ViewType, isNew: boolean = false): string {
  switch (type) {
    case ViewType.EditSearch:
      return "Edit Your Dailies"
    case ViewType.EditForm:
      if (isNew) return "New Daily"
      else return "Edit {0}"
    default:
      return "Diem"
  }
}

interface IViewTypeGetter {
  isFormEditOpen: boolean
  isSearchEditOpen: boolean
}

export function getViewType(props: IViewTypeGetter) {
  const { isFormEditOpen, isSearchEditOpen } = props

  // order of precedence, descending
  if (isFormEditOpen) return ViewType.EditForm
  if (isSearchEditOpen) return ViewType.EditSearch
  return ViewType.Home
}

export const staticTitles = [ViewType.Home, ViewType.EditSearch]
