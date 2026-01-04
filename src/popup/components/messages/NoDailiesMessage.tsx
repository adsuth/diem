import { HandWavingIcon, SirenIcon } from "@phosphor-icons/react"

interface INoDailiesMessageProps {
  allCount: number
  shownCount?: number
}

export default function NoDailiesMessage(props: INoDailiesMessageProps) {
  let { allCount, shownCount } = props
  const shouldShow = !(allCount !== 0 && shownCount !== 0)
  if (!shouldShow) return null

  let message = <></>
  const allComplete = shownCount === 0 && allCount > 0

  if (allComplete) {
    message = (
      <>
        <span>
          There are no dailies left for today.
          <br />
          <br />
          <b>see you tomorrow!</b>
        </span>

        <HandWavingIcon size={64} weight={"regular"} />
      </>
    )
  } else {
    message = (
      <>
        <span>
          You have <b>no dailies!</b>
          <br />
          <br />
          <b>Reopen the popup</b> to load the defaults, or start adding your
          own.
        </span>

        <SirenIcon size={64} weight={"bold"} />
      </>
    )
  }

  return <p className="no-daily-message">{message}</p>
}
