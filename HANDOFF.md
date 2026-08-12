# Goody landing — handoff

You are continuing work on the **Goody** Japanese landing page. Read this file in full before doing anything. Do not invent context.

## What Goody is

Japanese-language landing page for **Goody (グッディ)** — a platform that matches **beginner creators** (3D / video / UI / app dev / graphic / AI) with **real client work**. Tagline: 「未経験でも、つくる側へ。」 ("Even with no experience — onto the maker side.")

Six business divisions:
1. クリエイティブ事業 (Creative)
2. グローバル人材育成事業 (Global Talent)
3. 人材サービス事業 (HR Services)
4. BPO事業
5. 海外飲食事業 (F&B Overseas)
6. 酒類マーケティング・クリエイティブ事業 (Spirits)

## Where everything lives

| Thing | Location |
|---|---|
| Local working copy | `/private/tmp/goody-new` |
| Local dev server | `http://127.0.0.1:8766` (python `http.server`, cwd = working copy) |
| GitHub remote | `https://github.com/Goody-JP/goody-landing` |
| Branch in flight | `from-scratch` (NOT main — Pages source has been switched to this branch) |
| Live URL (gate) | https://goody-jp.github.io/goody-landing/ |
| Live URL (home) | https://goody-jp.github.io/goody-landing/home.html |
| Live URL (business) | https://goody-jp.github.io/goody-landing/home.html#business |

The Goody-JP org also has `Goody-JP/goody-web` (a Next.js + Three.js experimental "Helix/Orbit" rebuild). **That is a separate prototype — do not touch unless asked.** All current work is in this repo (`goody-landing`).

## File map

```
/private/tmp/goody-new
├── index.html            # Gate page (entry), red ball, tickers, grain overlay
├── home.html             # Main landing page — all major sections + inline CSS/JS
├── sustainability.html   # STUB — "coming soon" + SDG strip. Not built out yet.
├── assets/business.css   # Currently small / mostly unused — most biz styles live inline in home.html
├── business/
│   ├── creative.html     # Six division subpages — each linked from biz slide CTA
│   ├── global.html
│   ├── hr.html
│   ├── bpo.html
│   ├── food.html
│   └── spirits.html
└── img/
    ├── biz/biz-0{1..6}-*.jpg  # 1MB total — division hero imagery, also used as text-clip fill
    ├── sdg/sdg-{03,04,08,10,13,15}.webp
    ├── goody-logo.png
    └── goody-logo-light.png
```

## Design language (locked, do not redesign)

- **Palette:** `--ink: #0e0e0e` / `--paper: #f5f2eb` / `--red: #dc2626`
- **Type:** `Noto Serif JP` (display, weight 900 for big titles), `Noto Sans JP` (body), `Inter` (EN labels/eyebrows)
- **Eyebrows:** small caps, letter-spacing 0.32em, red 28px lead-bar (`label-en::before`)
- **Grain overlay** on `paper` sections (SVG fractal noise, opacity 0.07, mix-blend multiply)
- Hero centerpiece: huge red ball (Japan flag motif); subhead uses a red ● glyph as a punctuation mark inside the JP type ("つくる●側へ。")

## Business (事業内容) section — the part we just locked in

`#business` on home.html is a **600vh pinned horizontal-scroll track** with 6 slides. JS at the bottom of `home.html` reads `pin.getBoundingClientRect()` and translates the track horizontally — see the IIFE labeled `BIZ PINNED HORIZONTAL SCROLL`.

Each slide had 6 background-number layout variations (`var-a`…`var-f`). **We locked in `var-d` ("Small Left") for all 6 slides:** compact number (`clamp(110px, 14vw, 220px)`) anchored to the left gutter, vertically centered. The number's `::before` overlay is filled with that division's biz-image via `background-clip: text` and revealed on `.is-active` via a `clip-path` wipe.

Recent fix you should know about: `biz-head` grid was overflowing — title was wider than its column and bled into the lead paragraph. Fixed by widening the title column: `grid-template-columns: minmax(560px, 1.4fr) minmax(280px, 1fr)`. Stacks to one column under 1100px.

## Open tasks (in rough priority)

1. **Sustainability page** is currently a "coming soon" stub (`sustainability.html`). Build it out: hero + pillars (働き方 / 人材育成 / 環境負荷 / コミュニティ) + SDG commitments grid + metrics. Match the home-page design language. The home-page teaser section (`#sustainability` / `.sus-teaser`) is already designed and links to this page — match its tone.
2. **6 business subpages** exist but the user has not reviewed their depth — check each is filled in properly with division-specific content, not boilerplate.
3. Re-test the biz pinned scroll on a real long-page scroll, looking for any other overlaps with adjacent sections (sustainability teaser appears immediately after biz-section ends).
4. Mobile: biz-section breaks to a stacked layout at `<900px` (see `@media (max-width: 900px)`). Spot-check.

## How to ship

1. Make edits in `/private/tmp/goody-new` directly (no build step — it's static HTML with inline styles + JS).
2. Test on `http://127.0.0.1:8766/` (python server is already running — if not: `cd /private/tmp/goody-new && python3 -m http.server 8766`).
3. Commit on the `from-scratch` branch and `git push origin from-scratch`.
4. GitHub Pages auto-rebuilds from `from-scratch`. To force a build: `gh api -X POST repos/Goody-JP/goody-landing/pages/builds`.

## User preferences (carry these over)

- **Conversational, terse.** No big numbered lists. 2–4 sentences with a recommendation + main tradeoff. Tables when comparing.
- **One question per turn, in a large `#` header.** His display is far away; batched questions overwhelm.
- **"Just do it"** with tools rather than writing instructions for him to paste elsewhere.
- **GitHub is the source of truth.** He doesn't scroll the chat. Substantive decisions/docs should land in the repo same day.
- **"High-end" = maximalist.** When he says "best you can do," he means heavy WebGL / scroll choreography / custom typography — not editorial minimalism. (For *this* repo specifically the language is locked to red/black/paper editorial — but visual ambition within that language should stay high.)

## Don't

- Don't push to `main`. Pages now serves `from-scratch`.
- Don't touch `Goody-JP/goody-web` (the Next.js Helix/Orbit prototype) unless asked.
- Don't refactor the inline-CSS-in-`home.html` pattern. It's intentional for fast iteration on a static site.
- Don't add Next.js, React, build tooling, or package managers to this repo. It's deliberately plain HTML.
