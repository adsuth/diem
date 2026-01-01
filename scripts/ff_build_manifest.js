/**
 * Thank you to https://github.com/ynshung/better-yt-shorts for this one
 */
const { exec } = require("child_process");
const fs = require("fs");

const RELATIVE_PATH_TO_MANIFEST = "./dist/manifest.json";

if (process.argv[2] && process.argv[2] === "--skip-build") {
  buildFirefoxManifest();
} else {
  exec("npm run build", (error) => {
    if (error) {
      console.error("An error occurred while running 'npm run build'.", error);
    } else {
      buildFirefoxManifest();
    }
  });
}

function buildFirefoxManifest() {
  try {
    const manifest = JSON.parse(
      fs.readFileSync(RELATIVE_PATH_TO_MANIFEST, "utf8"),
    );

    manifest.manifest_version = 2;
    manifest.browser_action = manifest.action;
    delete manifest.action;

    manifest.background = {}
    manifest.background.scripts = [manifest.content_scripts[0].js[0]];
    delete manifest.content_scripts[0].js;

    manifest.web_accessible_resources =
      manifest.web_accessible_resources.resources;
    
    manifest.sidebar_action = {
        default_icon: "assets/diem_256.png",
        default_title: "Diem",
        default_panel: "src/sidepanel/index.html"
    }

    manifest.browser_specific_settings = {
      gecko: {
        id: "{ac34afe8-3a2e-4201-b745-346c0cf6ec7d}",
      },
    };

    fs.writeFileSync(
      RELATIVE_PATH_TO_MANIFEST,
      JSON.stringify(manifest, null, 2),
    );

    console.log("Firefox manifest created successfully, watching.");
  } catch (error) {
    console.error(
      "An error occurred while creating the Firefox manifest.",
      error,
    );
  }
}