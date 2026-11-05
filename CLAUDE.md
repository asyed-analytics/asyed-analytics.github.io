# Video editing in this folder

This repo is also a public GitHub Pages site (`index.html`). Anything pushed to `main` goes live.

## Default style: `style-sheet.md`

`style-sheet.md` is the house style for **every** video made here. Apply it unless the user explicitly asks for something different for that video.

- Read `style-sheet.md` before planning or editing any video.
- Pick the mode from the footage, using the table in its §0.
- **HyperFrames projects:** after `npx hyperframes init <name>`, copy `style-sheet.md` to `<name>/frame.md`. The HyperFrames skill reads `frame.md` at the project root as the design spec.
- **Fonts:** copy the `.woff2` files listed in `style-sheet.md` §2.1 from `node_modules/@fontsource/` into `<name>/assets/fonts/` and declare them with `@font-face`. Poppins, Inter and Playfair Display are bundled with HyperFrames.
- **Before export:** run the checks in `style-sheet.md` §10 and report any value that misses its target.

## Tools

- **HyperFrames:** `npx hyperframes …`. Run `npm install` in a fresh container.
- **GSAP when the CDN is blocked:** new projects load GSAP from `cdn.jsdelivr.net`. If that host is blocked (it is in the cloud environment), copy `node_modules/gsap/dist/gsap.min.js` into the project and point the `<script src>` at the local file.
- **Command-line tools:** FFmpeg, Whisper (`whisper`) and yt-dlp.

## Footage

- Don't commit downloaded or reference footage, or renders, unless the user asks. This repo is public.
