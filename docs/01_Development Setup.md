# Environment Setup
1. Clone the repo
2. Run `npm i` to install all required packages

# Chrome
3. Run `npm run dev` to create the `./dist` output *This will automatically regenerate when it detects file changes*
4. Open Chrome and navigate to `chrome://extensions/`
5. Click **Load Unpacked**, navigate to the `./dist` folder and open the `manifest.json` file

# Firefox
1. Run `npm run dev:firefox`
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click **Load temporary add-on**, navigate to the `./dist` folder and open the `manifest.json` file