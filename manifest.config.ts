import { defineManifest } from "@crxjs/vite-plugin"
import pkg from "./package.json"

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    256: "assets/diem_256.png",
  },
  action: {
    default_icon: {
      256: "assets/diem_256.png",
    },
    default_popup: "src/popup/index.html?popup=true",
  },
  permissions: [
    "sidePanel",
    "contentSettings",
    "storage",
    "tabs",
  ],
  content_scripts: [{
    js: [
        "src/content/main.ts", 
        "src/content/daily.ts"
    ],
    matches: [
        "<all_urls>"
    ],
  }],
  side_panel: {
    default_path: "src/sidepanel/index.html",
  },
})
