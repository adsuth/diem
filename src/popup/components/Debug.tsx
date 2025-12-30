import { saveDailies } from "@/content/main"
import { useAtom } from "jotai"
import { dailiesAtom } from "../lib/atoms"

export default function Debug() {
  const [, setDailies] = useAtom(dailiesAtom)

  function clearAllDailies() {
    saveDailies([], setDailies)
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          gap: "0.25rem",
        }}
      >
        <button onClick={() => clearAllDailies()}>Clear All</button>
      </div>
    </>
  )
}
