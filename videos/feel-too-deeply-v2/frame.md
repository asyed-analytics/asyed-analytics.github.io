# Video Style Sheet — house style

The default style for every video made in this folder. Follow it on every edit unless the brief says otherwise.

It was measured from four reference reels (Instagram, uploaded 2026-11-05). The reels are **not stored in this repo**: it is a public GitHub Pages site and the footage belongs to other creators.

| Ref | File id  | Size / fps     | Length | What it is                                                                    |
| --- | -------- | -------------- | ------ | ----------------------------------------------------------------------------- |
| R1  | cc4de23b | 1276×718, 30   | 82.1 s | Cinematic lifestyle explainer: editorial serif captions, split screens        |
| R2  | 1aab4cb5 | 720×1280, 25   | 62.1 s | Talking head with screen-recording B-roll, tiny captions, number highlights   |
| R3  | 57fece2d | 720×1280, 30   | 29.1 s | "17 video effects" list reel: bold yellow/white captions, effect montage      |
| R4  | 6cf038fb | 960×720, 25    | 36.4 s | Kinetic 3D typography around the subject, white + red words                   |

**How the numbers were taken.** Cuts, shot lengths, change frequency and grade come from `npx hyperframes measure cuts|events|look`. Loudness comes from `ffmpeg ebur128`, and hits from `npx hyperframes audio` plus spectrograms. Colours are pixel samples of the frames. Type sizes are glyph heights measured in pixels and converted to font size with each face's metrics.

- Values marked **(est.)** were judged from frames, not computed.
- Font names are the **closest free match** to what is on screen. The originals are not embedded in the videos.
- All px values are for a **1080×1920** canvas unless noted. Reel pixels were scaled ×1.5 (720→1080 wide) or ×1.505 (718→1080 high).

---

## 0. Defaults at a glance

```yaml
format:      { width: 1080, height: 1920, fps: 30, safe_x: "7%–93%", safe_y: "12%–72%" }
fonts:
  sans:      "Inter Tight"        # 700 captions, 800 emphasis/titles   (npm @fontsource/inter-tight)
  serif:     "DM Serif Display"   # 400 — editorial punch words          (npm @fontsource/dm-serif-display)
  lead:      "Poppins"            # 400 — editorial lead-ins             (bundled in HyperFrames)
  condensed: "Bebas Neue"         # 400 — full-screen one-word cards     (npm @fontsource/bebas-neue)
  fallbacks: { sans: "Inter", serif: "Playfair Display", condensed: "League Gothic" }   # bundled
colors:
  white:        "#FFFFFF"   # all base caption text
  accent:       "#F8E67E"   # house yellow (butter) — sans emphasis, titles, labels      (R3)
  accent_hot:   "#F8E31A"   # lemon yellow — serif punch words, black-card text           (R1)
  kinetic_red:  "#B21B2D"   # red words in kinetic mode                                   (R4)
  select_blue:  "#4D7EE0"   # number highlight box                                        (R2)
  card_black:   "#000000"   # text cards
  paper_red:    "#660E10"   # paper-texture card ground                                   (R1)
  chip_grey:    "#909090"   # label chips                                                  (R2)
  card_ink:     "#353535"   # condensed one-word card text                                 (R2)
type_scale_px:  { counter: 48, small_caption: 64, subtitle: 76, caption: 84, title: 120, emphasis: 148, hero: 160 }   # verified by test render vs R3
caption:
  words_per_line: "2–4 (max 5)"
  lines: "max 2 (white lead line + yellow emphasis line)"
  case: lowercase
  enter: "blur-in 3 frames (0.10 s): blur 16px→0, opacity 0.4→1, no movement"
  exit:  "hard cut to the next phrase"
  shadow: "0 6px 20px rgba(0,0,0,0.5) (est.) — no stroke, no box"
pacing: { median_shot_s: 1.4, max_static_hold_s: 1.4, visual_change_every_s: "≤0.55", first_cut_by_s: 1.0 }
transitions: { hard_cut_share: "≈90%", fx_transition_frames: "2–5 (0.07–0.17 s)", dissolves: none }
audio: { master_lufs: -14, true_peak_dbtp: -1.0, lra_lu: "≤3", music_under_voice_db: -12, sfx_before_cut_frames: "0–2" }
grade: { blacks_p1: "0–2", highlights_p99: "240–245", saturation: "0.25–0.37", warmth: "+5 … +16 (warm mids)", look: "deep blacks, clean neutral whites, warm skin" }
```

Pick a **mode** from the footage, then apply its overrides:

| Footage                                                                      | Mode                        | Built from |
| ---------------------------------------------------------------------------- | --------------------------- | ---------- |
| Locked-off camera, list or "N things" content, effects/tool demos (default)  | **House** (§2.2)            | R3         |
| Cinematic B-roll, story or voice-over, outdoor or lifestyle                  | **Editorial** (§2.5a)       | R1         |
| Walking / handheld wide-angle, 1–2 sentence promise, high energy             | **Kinetic** (§2.5b)         | R4         |
| Face-to-camera explaining software, money, process                           | **Talking head** (§2.5c)    | R2         |

---

## 1. Format

- **Canvas:** 1080×1920, 30 fps (R1 and R3 are 30 fps, R2 and R4 are 25). Editorial pieces may go landscape at 1920×1080. Keep the same type sizes in px against the 1080 short side.
- **Length:** 29–82 s across the references. Use 30–60 s by default.
- **Safe area:** keep all text inside **x 7–93 %, y 12–72 %** (y 230–1382 px). R3 never places text below 71 %. The bottom 28 % belongs to Instagram's UI.

---

## 2. Fonts

### 2.1 Font files

The npm packages are installed as dev dependencies of this folder. Copy the `.woff2` files into each project's `assets/fonts/` and declare them with `@font-face`, so local and cloud renders match.

| Role       | Face             | Weights                 | File                                                                                      |
| ---------- | ---------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| sans       | Inter Tight      | 700, 800                | `node_modules/@fontsource/inter-tight/files/inter-tight-latin-{700,800}-normal.woff2`     |
| serif      | DM Serif Display | 400 (+ italic)          | `node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff2` |
| condensed  | Bebas Neue       | 400                     | `node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2`             |
| lead       | Poppins          | 400                     | bundled with HyperFrames — no file needed                                                 |

**Why these faces:**
- **Sans.** R3 and R4 use a tight bold grotesque with a double-storey `a`, a flat-topped `t`, a flag `1` and very tight spacing. Inter Tight 700/800 matches it. If a font file is missing, fall back to bundled Inter 700 with `letter-spacing: -0.045em`.
- **Serif.** R1's punch words are a heavy display serif with moderate contrast, ball terminals on `a`/`y`/`k`, a large x-height and a wedge apostrophe. DM Serif Display is the closest free match; Playfair Display 700 (bundled) is the fallback.
- **Lead.** R1's lead-ins are a geometric sans in regular weight, matching Poppins 400.
- **Condensed.** R2's full-screen "NOW" card is a condensed uppercase face, matching Bebas Neue.

### 2.2 House caption system (default, from R3)

| Element                  | Face / weight      | Size px | Colour    | Tracking  | Line-height | R3 glyph box at 720 w → 1080 target | Test render at 1080 |
| ------------------------ | ------------------ | ------- | --------- | --------- | ----------- | ----------------------------------- | ------------------- |
| Hook title line 1        | Inter Tight 800    | 120     | `#F8E67E` | -0.01em   | 0.95        | 62×574 → **93×861**                 | 93×851              |
| Hook title line 2        | Inter Tight 700    | 76      | `#FFFFFF` | -0.02em   | 0.95        | 37×395 → **55.5×592**               | 55×589              |
| Phrase caption           | Inter Tight 700    | 84      | `#FFFFFF` | -0.03em   | 1.0         | 41×534 → **61.5×801**               | 62×800              |
| Emphasis line            | Inter Tight 800    | 148     | `#F8E67E` | -0.035em  | 0.95        | 95×553 → **142.5×830**              | 142×832             |
| Hero label (list item)   | Inter Tight 800    | 160     | `#F8E67E` | -0.02em   | 0.9         | 83×238 → 124.5×357                  | not test-rendered   |
| Counter `01/17`          | Inter Tight 700    | 48      | `#FFFFFF` | +0.06em   | 1           | digit height 24 → 36                | not test-rendered   |

**How these sizes were checked:**
- The first four tiers were **rendered in HyperFrames and re-measured** against R3's own frames. Each is within 1.2% of the reference glyph height and width.
- The test used "17 video effects / claude can create" for the title and "that claude can create / 100% for you" for the caption.
- **Emphasis size:** the emphasis line is about 1.75× the caption. A long emphasis line (more than about 10 characters) fills about 77% of the width. Short single words measured slightly smaller ("follow" ≈ 132 px). Shrink any line that would pass **907 px (84% of width)**.

- **Measured colours.** Yellow core `#F8E67E` (samples ranged `#F4E47B`–`#FAE67D`). White core `#FFFFFF`.
- **Shadow.** A soft dark halo under the letters, about `0 6px 20px rgba(0,0,0,.5)` (est.). There is **no stroke, outline or background box** in house mode.
- **Gaps between glyph boxes:**
  - Title line 1 to line 2: 12 px at 720 w, so use **18 px**.
  - Caption to emphasis line: **20 px**.
  - Counter to hero label: 9 px at 720 w, so use **14 px**.
- **CSS that reproduces it:**
  - Title line 1: `top: 258px`; line 2: `top: 390px`.
  - Caption: `top: 1005px`; emphasis: `top: 1090px`.
  - All lines `text-align: center` across the full width.

### 2.3 Placement

| Block                                         | Position (1080×1920)                                       | Measured                                    |
| --------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------- |
| Persistent hook title (2 lines)               | centred, top of block **y = 258 px (13.4 %)**, ends 22 %   | R3 y 172–283 of 1280                        |
| Phrase caption, full-body / seated framing    | centred, line centre **y = 1047 px (54.5 %)** — on the chest | R3 y 678–719 of 1280                      |
| Phrase caption, MCU talking head              | centred, line centre **y = 1337 px (69.6 %)**              | R2 y 875–908 of 1280                        |
| Counter + hero label                          | centred, **y 1182–1356 px (61.6–70.6 %)**                  | R3 y 788–904 of 1280                        |
| End CTA (white line + yellow word)            | centred, top **y = 247 px (12.9 %)**                       | R3 y 165–283 of 1280                        |

**Rule:** captions sit on the torso or in empty space. They never cover the eyes or mouth.

### 2.4 How words appear

| Mode           | Unit on screen                          | Entrance                                                                                       | Exit                                     |
| -------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| House (R3)     | whole phrase at once                    | **blur-in 3 frames (0.10 s)**: blur ≈16 px → 6 px → 0, opacity ≈0.4 → 0.9 → 1, no move or scale. Often lands on a cut. | hard cut, replaced by the next phrase    |
| Editorial (R1) | word by word, building the phrase       | **hard pop on 1 frame**, timed to the syllable (e.g. "Think" 0.07 s, "before" 0.43, "you" 0.73, "speak." 0.90) | whole phrase clears on the cut           |
| Kinetic (R4)   | one word per element, building a sentence | **motion-blur sweep along its own path, settles in 3–4 frames (0.12–0.16 s), ease ≈ `expo.out`**. Red words fade up from a defocus blur over 5 frames (0.20 s). | defocus blur-out with a faint echo copy offset ≈40 px down (est.) |
| Talking head (R2) | 1–2 words                            | hard cut                                                                                       | hard cut                                 |

### 2.5 Mode overrides

#### a) Editorial (R1)

- **Lead-in:** Poppins 400, **58 px**, `#FFFFFF`, sentence case, 1–3 words. Measured glyph band 29 px at 718 h, which is a 39 px font.
- **Punch:** DM Serif Display, **104 px**, `#F8E31A` (measured `#F3E328`–`#F8E31A`), 1–3 words directly under the lead-in. A **single-word punch** ("time") goes up to **140 px**. The punch is 1.8–2.4× the lead-in.
- **Spacing:** the serif line starts 15 px under the lead-in's baseline, so the line-height is about 0.9.
- **Alignment:** left-aligned blocks sit in the **negative space beside the subject**:
  - Measured spots: x 23–49 %, y 50–65 % ("Think before / you speak."); x 18–48 %, y 34–47 %; and right-aligned top-right at x 75–90 %, y 12–27 % ("And by the / time").
- **Black text card:** DM Serif Display **88 px** `#F8E31A` centred on `#000000`, 1–2 lines, line-height 1.15. Measured background `#010002`.
- **Product name:** the same serif in yellow, in a corner (top-right, "Wispr Flow").
- **Feature subtitles:** a tiny white line, about **21 px** (est.), on a dark translucent chip at the bottom of a UI panel.

#### b) Kinetic (R4)

- **Faces and colours:** Inter Tight 800, lowercase. White `#FFFFFF` (measured `#FCFBFF`) and red `#B21B2D` (measured `#B21B2D` in daylight, `#A70B17` at night). About **one red word per 3–4 words**.
- **Sizes by importance**, at 1080 short side:
  - function words ("a", "if you"): **60–90 px**
  - key words ("now", "comment"): **170–200 px**
  - The biggest word is about 3.3× the smallest.
- **Layout:** words are placed **in 3D around the subject**:
  - curved along arcs over the head ("touching without" bends around it)
  - stacked at different depths
  - partly **behind** the subject (needs a matte of the subject)
  - tracked to camera motion
- **Pace:** words arrive about **every 0.15–0.20 s** in step with speech.

#### c) Talking head (R2)

- **Captions:** Inter Tight 700, **64 px** `#FFFFFF`, 1–2 words, centred at **y 69.6 %**. Measured glyph band 33 px at 720 w, which is a 45 px font.
- **Key numbers** ("$1000", "$2000"):
  - Inter Tight 800, **120 px** white on a **`#4D7EE0`** box. The box is 162 px tall, about 1.35× the font size, with square corners.
  - The box **grows left to right like a text selection**, one character per 3 frames: 0.12 s per character, 0.52 s for "$1000".
  - The digits de-pixelate in 2 frames.
  - The reveal is preceded by a **6-frame (0.24 s) blue flash**: a vertical gradient `#00B1FA` → `#63C1E9` → `#002C3F`.
- **Label chip** at the split-screen seam: white 40 px text (est.) on `#909090`, radius about 6 px (est.).
- **One-word full-screen card** ("NOW"): Bebas Neue **260 px** `#353535` on a vertical gradient `#FFFFFF` → `#474747`, held **6 frames (0.24 s)**. Measured cap height 122 px at 720 w.

---

## 3. Colours and grading

### 3.1 Palette (measured)

| Token          | Hex                                      | Used for                                     | Ref |
| -------------- | ---------------------------------------- | -------------------------------------------- | --- |
| white          | `#FFFFFF`                                | all base caption text                        | all |
| accent         | `#F8E67E`                                | house titles, emphasis, labels               | R3  |
| accent_hot     | `#F8E31A`                                | serif punch words, black-card text           | R1  |
| kinetic_red    | `#B21B2D`                                | kinetic emphasis words                       | R4  |
| select_blue    | `#4D7EE0`                                | number highlight box                         | R2  |
| flash_blue     | `#00B1FA` → `#63C1E9` → `#002C3F`        | 0.24 s flash before a reveal                 | R2  |
| card_black     | `#000000`                                | text cards                                   | R1  |
| paper_red      | `#660E10` (`#640C0E`–`#691215`)          | crumpled-paper card ground with photo cut-out | R1 |
| card_gradient  | `#FFFFFF` → `#474747` (top → bottom)     | one-word cards                               | R2  |
| card_ink       | `#353535`                                | one-word card text                           | R2  |
| chip_grey      | `#909090`                                | seam / label chips                           | R2  |
| canvas_white   | `#FFFFFF` → `#FBFBFB`, faint dot grid    | split-screen top canvas for UI screenshots   | R2  |

**Rule:** one accent per video. Use yellow in house and editorial modes, red in kinetic mode, and blue only for number highlights. Never mix the yellows.

### 3.2 Grade targets

Measured with `npx hyperframes measure look`. Luma is the 0–255 mean, saturation runs 0–1, and warmth is red minus blue. Percentiles and tints come from 1 fps samples.

| Ref | Look                         | Luma | Contrast | Sat  | Warmth | Luma p1 / p99 | Midtone avg (tint)            | Highlights (tint)        |
| --- | ---------------------------- | ---- | -------- | ---- | ------ | ------------- | ----------------------------- | ------------------------ |
| R1  | warm natural, some B&W       | 92   | 52.6     | 0.37 | +16.5  | 0 / 245       | `#837E64` (R+11 G+7 B-19)     | `#DFE1DF` neutral        |
| R2  | bright, punchy, clean whites | 104  | 79.5     | 0.23 | +2.6   | 2 / 253       | `#857A66` (R+14 B-17)         | `#F0F0EE` neutral        |
| R3  | low-key, moody, desaturated  | 60   | 53.5     | 0.21 | +5.5   | 0 / 243       | `#79786E` (R+4 B-7)           | (yellow captions)        |
| R4  | teal/orange, punchy, cool    | 64   | 47.3     | 0.40 | -2.0   | 0 / 238       | `#757B78` neutral             | `#D5E0DF` (teal, B+3 R-7) |

**House grade:**
- **Blacks crushed to true black:** p1 luma 0–2, with no lifted or faded blacks.
- **Whites clean and neutral:** p99 240–245. Only UI screens may hit 253.
- **Warm midtones and skin:** R +10 to +14, B -17 to -19.
- **Saturation 0.25–0.37.**
- **Moody variant (R3)** for indoor talking heads: luma ≈ 60, saturation ≈ 0.21.
- **Kinetic variant (R4)** for outdoor: saturation ≈ 0.40, warmth ≈ -2, teal highlights.

**FFmpeg starting chain:** an untested starting point. Tune it until `measure look` hits the targets above.

```
eq=contrast=1.08:saturation=0.92:gamma=0.97,colorbalance=rm=0.05:gm=0.02:bm=-0.06,curves=master='0/0 0.06/0.02 0.5/0.5 0.95/0.94 1/0.96'
```

### 3.3 Stylised treatments (R1)

- **B&W sections:** ≈11.7–15 s and ≈20–23.9 s (est.), for "the past", inner monologue and doubt. Everything else is colour.
- **Echo or ghost trail:** about 4 trailing copies of the walking subject, on B&W shots.
- **Posterised or illustrated sky B-roll:** reduced tones, at 1.33–3.17 s (est.).
- **Face callout inset:** a 21 %-wide square crop of the face (270×268 px at 1276×718) with a **1 px `#FFFFFF` stroke**, floated above the subject.

---

## 4. Layout

- **House (R3):**
  - One locked-off wide shot, subject seated full-body in the centre.
  - Every "effect" is a layer over or around that shot.
  - The hook title stays at the top for the whole list section (0–18.4 s).
  - The end CTA is an Instagram-profile phone card centred at y 40–76 %, with rounded corners.
- **Editorial (R1):**
  - Wide shots with the subject at about 1/3 of frame height, placed on a third. Text fills the open side.
  - **50/50 vertical split** (left: subject wide shot, right: phone close-up of the product UI) runs **29.3–77.6 s, 58 % of the film**.
  - Inserts: the red-paper card with a photo cut-out and a flash of a childhood photo; full black text cards (25.7–29.3 s).
- **Talking head (R2):**
  - Medium close-up, eyes at about 1/3 height.
  - **Split screen:** top **48 %** is a white canvas with floating app screenshots (soft drop shadow, stacked or fanned). The bottom **52 %** is the speaker. A grey chip label sits on the seam.
  - Full-screen B-roll inserts last 0.8–2.0 s: a laptop over the shoulder, a desk, a blurred client video call.
  - A blue gradient card with app icons (Claude Code, Notion, …).
  - **Punch-ins** alternate between about 100 %, about 115 % and about 140 % on the money lines (est.; face tracking was blocked).
- **Kinetic (R4):**
  - Handheld wide-angle, low angle, subject walking toward the lens.
  - Day-to-night shots of the same street for "change time of day".
  - Full-frame screen recordings for 10–17 s.
  - A 3D-tracked word cloud around the subject.

---

## 5. Motion

| Move                                   | Timing (measured)                                                                                       | Ease (est.)                    | Ref |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------ | --- |
| Hard cut                               | **≈90 % of all transitions** (82 of 92)                                                                  | —                              | all |
| FX transition (zoom-through, frame break, whip) | **2–5 frames (0.07–0.17 s)**; never a dissolve                                                  | `power3.inOut`                 | R2, R3 |
| Caption blur-in                        | 3 frames (0.10 s), blur 16 → 0 px                                                                        | `power2.out`                   | R3  |
| Kinetic word sweep                     | 3–4 frames (0.12–0.16 s) along its path, heavy directional motion blur                                   | `expo.out`                     | R4  |
| Red word defocus-in                    | 5 frames (0.20 s)                                                                                        | `sine.out`                     | R4  |
| Selection highlight                    | 0.12 s per character (3 frames at 25 fps), stepped                                                       | `steps(1)` per character       | R2  |
| Colour flash                           | 6 frames (0.24 s)                                                                                        | cut in, cut out                | R2  |
| One-word card                          | 6 frames (0.24 s)                                                                                        | cut in, cut out                | R2  |
| Opening light-block reveal             | 16 frames (0.53 s). The image appears tile by tile (tiles ≈ 1/3 × 1/2 frame); each tile first shows as a blown-out white bloom with a soft edge, then resolves | one tile per 2–3 frames | R1 |
| Photo-flash montage                    | about 0.6 s of rapid photo swaps (6.6–7.2 s) under projector-click SFX                                  | cut                            | R1  |
| Effect list montage                    | a new effect **every ≈1.0 s** (median shot 1.00 s; 17 effects in 18.4 s)                                 | cut                            | R3  |

**Change frequency:** something visibly changes (a cut, caption, overlay or punch-in) **every 0.49–0.54 s** in R1 and R2, every 0.77 s in R3, and every 1.35 s in R4, whose words also move continuously. **The longest static hold in any reel is 1.37 s; R2 never holds past 0.60 s.**
- **House rule:** a change at least every 0.55 s, and never a static frame longer than 1.4 s.

---

## 6. Captions

- **Always on.** Text is on screen from **frame 1** (≤0.07 s) in all four reels.
- **Words per line:**

| Mode | Words per line |
| --- | --- |
| House | **3–5 words** per phrase line ("that claude can create", "i'm about to reveal") plus an optional **1–3 word yellow emphasis line** ("100% for you", "follow", "26 video effects") |
| Editorial | lead-in 1–3 words + punch 1–3 words |
| Talking head | 1–2 words |
| Kinetic | 1 word per element, sentence of 3–7 words built up in about 1 s |

- **Max 2 lines** on screen. The white line comes first and the yellow line second, never the reverse.
- **Highlight words:** the payoff noun or number ("you speak.", "time", "I've realized", "thinking first.", "26 video effects", "100% for you", "follow", "$1000").
  - They change colour, get bigger (1.6–2.4×) and sit on their own line.
  - In editorial mode they also change typeface, from sans to serif.
  - Expect about one highlight per sentence.
- **Case:** lowercase in house and kinetic modes, even for brand names ("claude") and "i'm". Sentence case in editorial mode. Bebas Neue uppercase only for one-word cards.
- **Punctuation:** keep full stops and commas on editorial punches ("you speak.", "first."). Drop them elsewhere.
- **Labels and counters:** list items show `NN/TT` (zero-padded, white, wide tracking) above a yellow hero label.

---

## 7. Sound design

### 7.1 Levels (measured)

| Ref | Integrated   | Short-term max | True peak                   | LRA    | Music bed under voice                          |
| --- | ------------ | -------------- | --------------------------- | ------ | ---------------------------------------------- |
| R1  | -14.1 LUFS   | -11.4          | -0.8 dBTP                   | 3.2 LU | **13.8 dB** under (continuous)                 |
| R2  | -14.1 LUFS   | -12.7          | -0.5 dBTP                   | 1.6 LU | **13.0 dB** under                              |
| R3  | -14.1 LUFS   | -13.0          | -1.0 dBTP                   | 2.0 LU | **no music**, voice + SFX only (floor 23 dB down) |
| R4  | -14.3 LUFS   | -12.5          | **+1.6 dBTP (clips 3×, avoid)** | 2.0 LU | **11.5 dB** under                         |

- **House master:** **-14 LUFS integrated, true peak ≤ -1.0 dBTP, LRA ≤ 3 LU.** The voice is heavily compressed and steady.
- **Music bed:** **-12 dB under the voice** (about -26 LUFS when the voice is at -14). It runs continuously, with no big ducking moves.
- **Stereo:** the voice is mono-centred. The side channel sits 21–23 dB under mid in R1–R3 and 12 dB under in R4, where the music is wider.

### 7.2 Music style

| Mode | Music |
| --- | --- |
| Editorial | soft piano or ambient pad with sustained notes (steady tones around 0.56 and 1.1 kHz), ending in a **rising sweep over the last 3 s** into the final line (78–81 s) |
| Talking head | bass-heavy minimal bed, energy kept under 150 Hz so it doesn't fight the voice |
| Kinetic | synth pad with sustained high tones (≈2–2.5 kHz) and **sub-bass kicks** (≈1.9, 3.9, 10.6, 17.4, 20.3 s) |
| House | **no music**: voice, SFX and booms only |

No reliable BPM could be extracted, so none is prescribed.

### 7.3 SFX and when they land

| SFX                                   | Character (spectrogram)                                    | Where it lands                                                                                      | Ref |
| ------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --- |
| **Click / pop**                       | broadband transient, about 30 ms, up to 14 kHz             | **about 50 ms (1–2 frames) before a cut** (2.88 s hit before the 2.93 s cut)                         | R3  |
| **Airy whoosh**                       | noise 2–14 kHz, about 0.25 s                               | starts right after the cut                                                                          | R3  |
| **Sub boom / impact**                 | 20–110 Hz, 0.3–0.5 s                                       | on big reveals and section changes (≈8.3, 10.3, 15.5, 18.0 s, each on a cut)                         | R3  |
| **Digital ticks**                     | rapid ticks, 5–15 kHz                                      | under the number-selection sweep (4.56–4.80 s)                                                       | R2  |
| **Typing / keyboard bed**             | about 20 ticks/s, 2–15 kHz                                 | under screen-recording B-roll (36.2–37.0 s)                                                          | R2  |
| **Projector / shutter clicks**        | dense ticks plus a sustained tone                          | under the photo-flash montage (6.6–7.2 s)                                                            | R1  |
| **Riser**                             | rising sweep                                               | the last 3 s, into the closing line or CTA                                                          | R1  |

- **Sync stats:** **51–58 % of cuts carry a hit** within ±0.12 s (R1 14/24, R2 20/39, R3 11/20, R4 4/9). The hit lands a median **0.03–0.14 s before** the cut.
- **House rule:** about every other cut gets an SFX, placed **0–2 frames before the picture change**. Use booms only on the 3–5 biggest moments.

---

## 8. Pacing and the hook

### 8.1 Shot length (measured)

| Ref | Shots | Mean   | Median     | Min–max       |
| --- | ----- | ------ | ---------- | ------------- |
| R1  | 25    | 3.29 s | **2.27 s** | 0.07–12.0 s   |
| R2  | 40    | 1.55 s | **1.40 s** | 0.08–4.48 s   |
| R3  | 21    | 1.39 s | **1.00 s** | 0.07–10.75 s  |
| R4  | 10    | 3.64 s | **3.82 s** | 0.20–6.52 s   |

**House:**
- **Median shot length** by mode:

| Mode | Median shot |
| --- | --- |
| Talking head | **1.4 s** |
| List or montage | **1.0 s** |
| Editorial | **2.3 s** |
| Kinetic (long tracked shots; the words carry the pace) | **3.8 s** |

- Long shots are allowed only when captions or overlays keep changing (see §5).

### 8.2 The first 3 seconds

| Ref | 0 – 1 s                                                                                       | 1 – 3 s                                                                                                       | Cuts in 0–3 s     |
| --- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------- |
| R1  | Light-block reveal (0.53 s) + a familiar quote built word by word, "Think before you speak."   | cut at 1.33 s to a stylised sky; the setup turns contrarian: "I was always told this by everyone."             | 8 reveal flickers (0.07–0.53) + 1.33 |
| R2  | the product dashboard on the top half and the speaker below, from frame 1, labelled "Simple Dashboard" | Claude logo at 1.5 s, B-roll at 2.3 s; **money hook ($1000 → $2000) at 4.5 / 6.0 s**                    | 1.00, 2.28        |
| R3  | **payoff on frame 1:** effect #1 playing, with a persistent title making the promise "17 video effects / claude can create" and counter 01/17 | a new effect at 0.80, 1.77 and 2.93 s                                                     | 0.80, 1.77, 1.83, 2.93 |
| R4  | 3D red words in the sky, "now create captions"                                                 | tilt down to the subject; the promise "without touching a single keyframe" is complete by 3.2 s                 | none (one moving shot) |

**House hook rules:**
1. Text is on screen by **0.07 s**.
2. Show the **payoff or the product in the first frame**, not a lead-up.
3. Put the promise in a 2-line title: **number + benefit** in yellow, the qualifier in white.
4. First cut or visible change by **1.0 s**, and at least 2 more changes by 3.0 s.
5. Use a contrast or number line ("I was always told…", "$1000 → $2000") by 3–6 s.
6. End with a single CTA line in white plus one yellow word ("follow", "comment"), led in by a riser.

---

## 9. Effects toolbox → HyperFrames registry

**R3's 17 named effects, in order:**
1. orbit
2. couch wall
3. ui world
4. frame break
5. digital zoom
6. phone mockup
7. checklist
8. headline wall
9. zoom-through cut
10. chart grow
11. pull-back reveal
12. green screen
13. *(paper collage; no name shown)*
14. doodle boil
15. vertigo
16. cover story
17. glass type

Before hand-building any of these, search `npx hyperframes catalog <words>`. The closest blocks and components:

| Technique                                  | Registry item(s)                                                     |
| ------------------------------------------ | -------------------------------------------------------------------- |
| Caption blur-in                            | `blur-in`, `soft-blur-in`, `focus-blur-resolve`                      |
| Word-by-word build                         | `per-word-crossfade`, `per-word-rise`, `text-stagger`                |
| Number selection highlight                 | `cursor-text-select`, `caption-highlight`, `mk-callout-highlight`    |
| Kinetic words on arcs                      | `hw-path-text`, `kinetic-center-build`, `caption-kinetic-slam`       |
| Orbiting screens                           | `orbit-card`, `carousel-orbit-3/4/5`, `locked-nucleus-orbit`         |
| Phone or UI mockups                        | `device-frame-stage`, `multi-device-splay`, `parallax-device-dive`   |
| Zoom-through / digital zoom                | `zoom-through-transition`, `cinematic-zoom`, `parallax-zoom`         |
| Vertigo                                    | `camera-dolly-zoom`                                                  |
| Paper collage / doodle                     | `paper-collage-reveal`, `torn-paper-rip`, `hw-frame`                 |
| Checklist                                  | `marker-checklist-card`, `mk-specs-list`                             |
| Headline wall                              | `mk-clone-wall-transition`, `headline-slam`                          |
| Chart grow                                 | `animated-bar-chart`, `data-chart`                                   |
| Echo / ghost trail                         | `echo-trail`, `echo-smear`                                           |
| Light-block reveal, flashes                | `light-leak`, `transitions-light`, `flash-through-white`             |
| RGB-split glitch on B-roll entry           | `glitch`, `caption-glitch-rgb`                                       |
| Whip                                       | `whip-pan`, `whip-pan-cut`                                           |
| Split comparison                           | `comparison-split`                                                   |

Restyle every installed item to this sheet's tokens: fonts, colours, sizes and timings.

---

## 10. Check before export

```bash
npx hyperframes measure cuts  renders/<file>.mp4 --json   # median shot length matches the mode (§8.1)
npx hyperframes measure events renders/<file>.mp4 --json  # a change every ≤0.55 s, no hold > 1.4 s
npx hyperframes measure look  renders/<file>.mp4 --json   # grade within the §3.2 house targets
ffmpeg -i renders/<file>.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12   # -14 LUFS, TP ≤ -1.0
```

- [ ] Text on screen from frame 1; payoff or product visible in the first frame; first change by 1.0 s.
- [ ] Only white plus one accent colour; highlight words 1.6–2.4× and on their own line.
- [ ] All text inside x 7–93 %, y 12–72 %; nothing covers the eyes or mouth.
- [ ] Hard cuts (≈90 %); FX transitions ≤ 5 frames; no dissolves.
- [ ] SFX on about half the cuts, 0–2 frames early; music bed 12 dB under the voice; riser into the CTA.
- [ ] -14 LUFS integrated, true peak ≤ -1.0 dBTP.
