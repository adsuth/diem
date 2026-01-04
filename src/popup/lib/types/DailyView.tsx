export enum ViewType {
  Home = "",
  EditSearchModal = "edit-search",
  EditFormModal = "edit-form",
}

export function getViewTitle(type: ViewType) {
  switch (type) {
    case ViewType.EditSearchModal:
      return "Edit Your Dailies"
    case ViewType.EditFormModal:
      return "Edit {0}"
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
  if (isFormEditOpen) return ViewType.EditFormModal
  if (isSearchEditOpen) return ViewType.EditSearchModal
  return ViewType.Home
}
