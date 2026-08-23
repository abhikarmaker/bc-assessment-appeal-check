# PropertyTaxBC

Two free tools for BC homeowners on one site:

1. **Assessment Appeal Check** — whether a BC Assessment notice looks
   appeal-worthy, how the PARP/PAAB appeal process works, and — if it
   looks worth pursuing — a referral to a licensed BC property tax
   professional. Referral/lead-gen model: free for homeowners, revenue
   comes from participating professionals.
2. **Property Tax Deferment Checker** (`/deferment`) — pure self-serve
   education and an eligibility decision tree for BC's property tax
   deferment program. No referral component, no lead capture, nothing
   collected — it links straight to the government's own application
   portal at the end.

See the project brief for full rationale, legal boundaries, and content
sourcing.

## What's here

Plain static HTML/CSS/JS (no framework, no build step) plus two Cloudflare
Pages Functions for lead capture.

```
index.html               Landing page: hero, free check calculator, PARP
                          summary, lead capture form, mini-FAQ
how-it-works/index.html  /how-it-works — main PARP/PAAB guide (primary SEO page)
deadlines/index.html     /deadlines — current-cycle deadlines (update yearly)
evidence/index.html      /evidence — comparables, bracketing, what helps
faq/index.html           /faq — Q&A content with FAQPage JSON-LD
about/index.html         /about — trust page (needs your real voice, see note in file)
privacy/index.html       /privacy — PIPA-oriented privacy policy
terms/index.html         /terms — terms of use
deferment/index.html     /deferment — Tool 2: deferment eligibility checker + education
404.html                 Kept flat at the root — Cloudflare Pages looks for it there
favicon.svg               Browser-tab icon (primary — modern browsers)
favicon-32.png            Legacy PNG fallback for favicon.svg
apple-touch-icon.png      180×180, solid background — iOS home-screen icon
brand/logo-mark.svg       Logo mark, charcoal stroke — for use on light backgrounds
brand/logo-mark-reversed.svg  Same mark, white stroke — standalone asset, not used live
brand/propertytaxbc-favicon.svg  Portable copy of /favicon.svg for external use (app stores, avatars) — kept byte-identical to the live one, not a separate design
brand/propertytaxbc-header-logo.svg  Combined mark+wordmark as one flat image. Used live as the header and footer logo on every page (`<img class="brand-logo-img">` / `.footer-logo-img`), and also the file to hand out for contexts needing a single flat image (email signatures, print, social)
og-image.png              1200×630 social share preview (source is a scratch file, see "Color palette")
robots.txt / sitemap.xml
css/style.css
js/calculator.js         Free-check scoring logic (see "Calculator logic" below)
js/deadlines.js          Deadline countdown + table, shared by index and /deadlines
js/deferment.js          Deferment eligibility decision tree (see "Deferment checker" below)
js/lead-form.js          Lead form validation + submission to /api/lead
functions/api/lead.js    POST — validates + writes a lead to KV, rate-limited (see "Security")
functions/api/leads.js   GET — token-protected endpoint to view captured leads
wrangler.toml
_headers                 Security headers incl. CSP for Cloudflare Pages (see "Security")
package.json / package-lock.json   Dev-only — test tooling, not a build step for the site itself
playwright.config.js     Test runner config (see "Testing")
tests/                   Playwright test suite (see "Testing")
.github/workflows/test.yml   CI — runs the test suite on push/PR to main
```

Each content page lives in its own directory as `index.html` (e.g.
`how-it-works/index.html`) rather than a flat `how-it-works.html`, so
`/how-it-works` resolves natively via directory-index behavior on any
static host — not just Cloudflare Pages' specific `.html`-stripping
feature. All internal links already use extensionless absolute paths
(`/how-it-works`, `/privacy`, etc.), so nothing else needed to change.
`index.html` (site root) and `404.html` (Cloudflare Pages' custom-404
convention) are the only files kept flat.

## Before you launch — open items

1. **Domain — decided: `propertytaxbc.ca`.** Wired into `sitemap.xml`
   (absolute URLs) and `robots.txt`'s `Sitemap:` line. The on-page brand
   was renamed to match — **PropertyTaxBC** — across every page's header,
   `<title>`, meta description, and footer copyright. Still to do:
   register the domain (if not already) and point it at Cloudflare Pages.
   One thing worth a deliberate gut-check before you commit to it: a name
   this close to sounding official raises the bar slightly on the
   "not affiliated with the Government of British Columbia" disclaimers
   already threaded through every footer and hero — they were already
   required, but they're carrying a bit more weight now.
2. **Contact email.** `privacy/index.html`, `terms/index.html`, and
   `about/index.html` all have a `[contact email to be added]`
   placeholder — search for that string and replace it in all three files
   before publishing.
3. ~~`/about` page copy~~ — done. Real first-person copy from the site's
   actual owner is in place as of 2026-08-22, not a placeholder.
4. **Business name / entity.** Legal operator stays "EasyTech Digital
   Solutions" per the existing sole proprietorship (Part 9 of the brief)
   — that's unrelated to the public-facing PropertyTaxBC brand name above.
   No new registration needed for launch.

## Logo

A checkmark whose long upstroke also reads as a roof pitch, sitting on a
terracotta ground line inside a square outline — one mark ties together
both tools (an eligibility *check*, on a *property*) instead of picking
one or the other. The square border was added after the first version
(bare checkmark, no frame) looked too small and unanchored next to the
wordmark; framing it let the whole mark scale up (42×42 in the header,
30×30 in the footer, both up from ~26×23) without looking oversized.
Charcoal `#241f1c` stroke on light backgrounds, white stroke on
charcoal — the header uses the reversed white version inline
(`.brand-mark` in `css/style.css`), since it sits directly on the
charcoal header bar; the same 64×64 viewBox and path data live in
`brand/logo-mark.svg` (charcoal-on-light) and
`brand/logo-mark-reversed.svg` (white-on-dark) as reusable standalone
assets. `favicon.svg` keeps its own, separate solid-fill charcoal badge
treatment rather than the outlined square — a thin border stroke
anti-aliases away at 16–32px, so the favicon needed a different,
simpler shape to stay legible that small; `favicon-32.png` and
`apple-touch-icon.png` are Chromium-rasterized fallbacks of that badge
(ImageMagick wasn't usable in this environment — Windows' own
`convert.exe` shadows it in PATH). Four other icon directions were
explored and set aside early on — wordmark-only, a plain house
roofline, a document+check, and a monogram badge — in case a different
mark is wanted later.

## Color palette

Went through two rebrands so far. Originally navy `#10253e` / gold
`#c9862f`; then the on-page brand became **PropertyTaxBC** (see below)
while colors stayed navy/gold; then, after mocking up several
alternatives side by side, settled on **warm charcoal `#241f1c` /
terracotta `#c1592f`** — same two-tone structure, warmer and less
generic-bank-blue.

The CSS custom properties in `css/style.css` are named for what they
are now, not their history: `--charcoal` / `--charcoal-light` (was
`--navy` / `--navy-light`) and `--terracotta` / `--terracotta-dark`
(was `--gold` / `--gold-dark`). If you ever grep old design notes or
screenshots and see `--navy`/`--gold`, that's the pre-rebrand names —
they don't exist in the stylesheet anymore.

Swapping the two root variables' *values* propagates through most of
the site automatically, but a few things don't go through the
variables and need updating by hand if the palette ever changes again:

- Inline `<svg>` icon strokes in every page's header/footer brand mark
  (`stroke="#c1592f"` etc.) and in `favicon.svg` / `brand/*.svg`
- The secondary "light text on the dark header/hero/footer" colors,
  which were hand-tuned to complement whichever hue is primary (nav
  links, hero lead paragraph, tagline, footer text/legal) — currently a
  warm-neutral scale (`#e2ddd8`, `#d9d2c9`, `#c7bcb0`, `#a99e92`,
  `#f5f0ea` for badges) that would need to shift again for a cooler
  primary color
- `theme-color` meta tag on every page
- `og-image.png` and its source (the source lives only as a scratch
  file used to render it, not in this repo — regenerate by rebuilding a
  similarly-styled 1200×630 HTML page and screenshotting it, same
  approach as the favicon PNGs)
- The `.btn` text color (`#ffffff`) was chosen for contrast against
  terracotta specifically — gold's higher luminance had used a dark
  near-black instead; re-check contrast if the accent color changes
  again
- `--terracotta-btn` (`#b3532c`) exists as a separate, slightly darker
  variable used ONLY for `.btn`'s background. Plain `--terracotta`
  (`#c1592f`) with white button text computes to 4.43:1 — just under
  the 4.5:1 WCAG AA threshold for normal-size text (16px bold doesn't
  qualify as "large text," which needs ≥18.66px bold). `--terracotta`
  itself is otherwise only ever used as a background/decoration
  (border, rule bar, icon accent), never as text or a text background,
  so it didn't need to move — only the one spot with text sitting on
  it did. If the accent hue changes again, re-run the contrast check
  specifically for whatever sits behind button text.

The header lockup (`.brand` in `css/style.css`) merges two of those
explored directions: the checkmark/roofline icon, plus a short gold
`.brand-rule` divider between the wordmark and tagline that was originally
just the wordmark-only option's accent. Same idea in `og-image.png`,
the social-share preview image.

## SEO

Beyond the per-page `<title>`/meta description and FAQPage JSON-LD already
in place:

- **Canonical URLs are now absolute** (`https://propertytaxbc.ca/...`)
  instead of root-relative, on every page.
- **Open Graph + Twitter Card tags** on every page (`og:title`,
  `og:description`, `og:url`, `og:image`, `twitter:card`, etc.), each
  pointing at `og-image.png` — a 1200×630 social preview built from the
  same brand mark/wordmark, rendered via headless Chromium (see
  `brand/` above — no design tool was needed, just the existing SVG mark
  plus Google Fonts).
- **`theme-color`** (`#241f1c`) so mobile browser chrome picks up the
  brand charcoal.
- **Organization JSON-LD** on the homepage only (name, url, logo,
  description) — no `sameAs` or search-action markup, since there are no
  social profiles or on-site search to point at honestly.
- **`sitemap.xml` now carries `<lastmod>`** dates (currently 2026-08-22
  on every entry) — update these when a page's content actually changes,
  not on every deploy, so the freshness signal stays meaningful.

Not done here, worth doing before launch: verifying og-image.png renders
correctly in an actual link-preview tool (Facebook's Sharing Debugger,
Twitter Card Validator) once the real domain is live, and adding
`hreflang`/`lang="en-CA"` refinements if that's ever a priority — skipped
since the site is single-language and this wasn't flagged as a gap.

## Calculator logic (js/calculator.js)

Implements the brief's Part 6 exactly:

```
yourChange = (current - previous) / previous * 100
delta = yourChange - neighbourhoodChange   (only if neighbourhood % was entered)

delta >= 5        → "Worth investigating"
2 <= delta < 5     → "Borderline"
delta < 2          → "Roughly in line"
no neighbourhood % → show yourChange alone, prompt for the area average
```

Never surfaces a dollar figure, never says "you should appeal." All
calculation happens client-side; nothing is sent anywhere until the
homeowner explicitly submits the separate lead form.

## Deadlines (js/deadlines.js)

`DEADLINES` at the top of the file holds the current cycle's confirmed
PARP and PAAB dates. **Update this every year** — it's a hardcoded
same-purpose to the `/deadlines` page being a "living page" per the SEO
section of the brief. Currently set for the cycle ending in the PARP
deadline of **Monday, February 1, 2027** (Jan 31, 2027 falls on a Sunday)
and the PAAB deadline of **April 30, 2027** (firm, never rolled forward).
Always cross-check against BC Assessment's own published dates before
updating.

## Deferment checker (js/deferment.js, /deferment)

Tool 2, per Part 11 of the brief. A client-side-only decision tree, no
lead form, no data collected. Facts were verified directly against
gov.bc.ca on 2026-08-20 (not taken from the brief as-written, which had
gone stale — see below):

- **Both programs now share one interest rate**: compound interest at
  Prime + 2%, effective for the 2026 tax year onward. This *replaced* the
  old, lower, differentiated simple-interest rates (Regular was
  prime−2%, Families was prime) that the brief's Part 11 still cited
  (1.2% / 3.2%). Taxes deferred in 2025 or earlier keep the old
  simple-interest terms.
- **Current rate: 6.45%** (prime 4.45% + 2%), effective Jul 1–Sep 30,
  2026. It resets roughly every six months (Apr 1 / Oct 1) — check
  `CURRENT_RATE` at the top of `js/deferment.js` against
  [gov.bc.ca's current/previous rates page](https://www2.gov.bc.ca/gov/content/taxes/property-taxes/annual-property-tax/property-tax-deferment-program/tax-deferment-interest-fees/current-previous-rates)
  roughly quarterly — this needs more frequent upkeep than the yearly
  PARP/PAAB deadlines.
- **Minimum equity**: Regular Program 25% (the brief didn't mention this
  figure — verified against gov.bc.ca and added), Families with Children
  15% (brief had this one right).
- **Fees**: Regular — $60 one-time application + $10/year renewal.
  Families with Children — none.
- **Residency**: 1+ year in BC before applying, both programs.

The decision tree in `js/deferment.js` checks residency and tax-arrears
status first as hard gates, then evaluates status (age/spouse/disability
vs. supporting a dependent child) against the relevant equity threshold.
It never recommends deferring, presents the interest/lien trade-off
neutrally, and ends eligible results with a direct link to the official
gov.bc.ca application portal. The Privacy Policy's "What we collect"
section was updated to state plainly that this tool collects nothing.

## Lead capture setup (Cloudflare Pages + Workers KV)

1. Create the KV namespaces:
   ```
   wrangler kv namespace create LEADS
   wrangler kv namespace create LEADS --preview
   ```
2. Paste the resulting IDs into `wrangler.toml` (`id` / `preview_id`).
3. In the Cloudflare Pages project settings (or via `wrangler.toml` if
   deploying through Wrangler), bind the `LEADS` KV namespace to the Pages
   project.
4. Set an admin token as a Pages secret (used to protect `/api/leads`):
   ```
   wrangler pages secret put ADMIN_TOKEN
   ```
5. To view captured leads, request `/api/leads` with header
   `Authorization: Bearer <the token you set>`. This endpoint is
   intentionally not linked from anywhere in the site nav.

For v1, every submission just lands in KV / is viewable via `/api/leads` —
there's no partner routing yet, per the brief ("route every submission to
a single inbox... don't build anything more elaborate until a referral
relationship actually exists"). If you want email notifications on new
leads in addition to KV storage, that's the natural next addition to
`functions/api/lead.js` once you've picked a transactional email provider.

### Testing Functions locally

Static files alone (`python -m http.server`, etc.) can't run
`functions/api/*.js` — those need Cloudflare's actual runtime. To test the
lead form and admin endpoint end-to-end, including real KV behavior:

```
npx wrangler pages dev . --kv=LEADS --binding ADMIN_TOKEN=some-local-test-token
```

This spins up a local server (default `http://localhost:8788`) with a
disk-persisted local KV store standing in for the real one — no
Cloudflare account or login needed for this. One gotcha: `CF-Connecting-IP`
(what the rate limiter in `functions/api/lead.js` keys on) is a header
Cloudflare's real edge network injects on every request — `wrangler pages
dev` does not simulate it, so the rate limiter's `if (!ip) return false`
fallback means it won't actually trigger locally unless you pass the
header yourself: `curl -H "CF-Connecting-IP: 203.0.113.1" ...`. Confirmed
working end-to-end this way during development (5 requests pass, the 6th
gets `429` with a `Retry-After` header) — it'll behave the same in
production without any extra step, since Cloudflare always sets that
header there. Local KV state persists across `wrangler dev` runs in
`.wrangler/state` (gitignored) — delete that directory to reset it.

## Security

- **Rate limiting** on `POST /api/lead`: a fixed-window counter per client
  IP (`ratelimit:<ip>` in the `LEADS` KV namespace, 5 submissions/hour,
  auto-expires via KV's `expirationTtl`). Not a precise sliding window —
  that would need Durable Objects, more infrastructure than this form's
  expected traffic justifies. See "Testing Functions locally" above for
  how this was actually verified, not just written and assumed correct.
- **Content-Security-Policy** in `_headers`: `script-src 'self'` (no
  `unsafe-inline`, no `unsafe-eval` — there's no inline executable JS
  anywhere, only external `/js/*.js` files and inert `application/ld+json`
  blocks, which CSP's script-src doesn't govern). `style-src` does allow
  `'unsafe-inline'`, a deliberate tradeoff: the site uses inline `style=""`
  attributes pervasively for one-off layout, and inline CSS is a much
  smaller XSS surface than inline JS would be. Verified against a real
  enforced CSP header in a real browser (not just reasoned about) across
  all 10 pages plus the calculator's interactive flow — zero violations.
  Also sets HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  and a restrictive `Permissions-Policy`.
- **Input validation** happens server-side in `functions/api/lead.js`
  regardless of what the client sends — required fields, email shape,
  length caps, explicit `consent === true` — never trusting the form's
  own client-side checks.
- **Honeypot** (`company_website` field, off-screen via `position:
  absolute; left:-9999px`, `tabindex="-1"`) catches bots that fill every
  input without rendering CSS; tripping it returns a normal-looking
  success without storing anything.

## Testing

```
npm install
npx playwright install chromium   # first time only
npm test
```

`tests/` covers, against a plain static server (no Functions — see above
for testing those separately):

- **`pages.spec.js`** — every page returns 200, has exactly one `<h1>`,
  zero console errors, valid JSON-LD where present, no duplicate ids
- **`calculator.spec.js`** — all four verdict tiers from Part 6's exact
  thresholds, the "no neighbourhood %" fallback, and that it never
  surfaces a dollar figure or "you should appeal"
- **`deferment.spec.js`** — the eligibility decision tree's branches
  (each program alone, both together, equity-too-low, no-residency,
  arrears, no-qualifying-status), and that it never tells anyone to defer
- **`lead-form.spec.js`** — consent checkbox defaults unchecked, submission
  is blocked without it, required-field validation, the honeypot's
  off-screen positioning
- **`responsive.spec.js`** — no horizontal overflow on any page at
  320/375/414px (this caught two real bugs during development — a
  `white-space: nowrap` button and a table — see git history)
- **`links.spec.js`** — every internal `href`/`src` resolves to a real
  file under this project's directory-based routing, every page has
  exactly one absolute canonical URL

`npm run test:ui` opens Playwright's UI mode for debugging a specific
failure; `npm run serve` just runs the static server on its own
(`http://localhost:8123`) if you want to poke at the site by hand.

## CI

`.github/workflows/test.yml` runs the full suite (`npm ci`, installs the
Chromium browser, `npm test`) on every push and PR targeting `main`, and
uploads the HTML report as a build artifact either way — check that if a
run fails on GitHub rather than re-running blind locally.

## Deploying

Static site + Pages Functions, so a standard Cloudflare Pages Git
integration deploy works. This needs your Cloudflare account — none of
these steps can be run from here, but here's the exact sequence:

1. **Push this repo to GitHub** (or GitLab), if it isn't already.
2. **Create the Pages project**: Cloudflare dashboard → Workers & Pages →
   Create → Pages → Connect to Git → pick this repo. Build settings:
   leave the build command **empty** and the output directory as `/`
   (repo root) — there's no build step.
3. **Create the KV namespace** (needs `wrangler login` first if you
   haven't authenticated the CLI before):
   ```
   npx wrangler login
   npx wrangler kv namespace create LEADS
   npx wrangler kv namespace create LEADS --preview
   ```
   Paste the two resulting ids into `wrangler.toml` (`id` and
   `preview_id`), replacing the `REPLACE_WITH_...` placeholders.
4. **Bind the KV namespace to the Pages project** in the dashboard:
   Pages project → Settings → Functions → KV namespace bindings → add
   variable name `LEADS` → select the namespace you just created. (This
   is separate from `wrangler.toml`, which only matters if you deploy via
   `wrangler pages deploy` directly instead of the Git integration.)
5. **Set the admin token secret**:
   ```
   npx wrangler pages secret put ADMIN_TOKEN --project-name <your-pages-project-name>
   ```
   Pick a long random value — this is what protects `/api/leads`.
6. **Point the domain**: in the Pages project → Custom domains → add
   `propertytaxbc.ca` (or whatever domain you actually register/use).
   Cloudflare handles the DNS/SSL if the domain's nameservers are already
   on Cloudflare; otherwise it'll walk you through adding the domain to
   your Cloudflare account first.
7. **Verify the live site**: check `/api/leads` with your admin token
   returns `{"count":0,...}` (proves the KV binding is live), submit the
   real lead form once and confirm it shows up there, and re-run through
   `sitemap.xml`/`robots.txt` at the real domain since both already point
   at `propertytaxbc.ca` absolute URLs.

After that, every push to `main` auto-deploys (Cloudflare Pages' default
Git integration behavior) — the CI workflow above runs the test suite
independently of that deploy, it doesn't gate it.

## Analytics

Cloudflare Web Analytics only (cookieless, free, no cookie banner
required) — add the site in the Cloudflare dashboard and paste the
provided snippet before `</body>` on each page once you have a token. Do
not add Google Analytics or any cookie-based analytics without revisiting
the Privacy Policy's analytics section.

## Explicitly out of scope for v1

Document generation of any kind, homeowner-facing payments, other
provinces, hardcoded partner integrations, individualized legal/tax
advice in the copy, and a lead form or referral component on the
deferment checker specifically. See the full project brief for the
reasoning.
