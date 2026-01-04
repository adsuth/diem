import { defineManifest } from "@crxjs/vite-plugin"
import pkg from "./package.json"

export default defineManifest({
  manifest_version: 3,
  name: "Diem",
  description: "List and keep track of your daily games like Wordle, Connections, etc.",
  version: pkg.version,
  icons: {
    256: "assets/diem_256.png",
  },
  action: {
    default_icon: {
      256: "assets/diem_256.png",
    },
    default_popup: "src/popup/index.html",
  },
  permissions: [
    "sidePanel",
    "storage",
    "tabs",
  ],
  side_panel: {
    default_path: "src/sidepanel/index.html",
  },
})
