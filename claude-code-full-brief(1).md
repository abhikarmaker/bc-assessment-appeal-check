# BC Homeowner Tools — Full Build Brief
*Everything needed to hand to Claude Code as a starting prompt*

**Three tools on one site, built in sequence:**
1. **Property Assessment Appeal Check** (Phase 1, currently in build) — free
   check + educational content + referral to a BC property tax professional
2. **Property Tax Deferment Checker** (Phase 2, not yet started) — free
   eligibility checker for BC's tax deferment loan program, no referral,
   pure self-serve, different deadline season to spread traffic through
   the year
3. **Property Tax Deadline & Penalty Tool** (Phase 3, not yet started) —
   free municipality-by-municipality deadline and penalty calculator with
   a visual escalation timeline, no referral, reinforces the same July
   traffic window as Tool 2

Full detail on Tool 1 is in Part 1–5 below. Tool 2 is detailed in Part 6.
Tool 3 is detailed in Part 7. Site-wide placement and setup are in Part 8–9.

---

# PROGRESS TRACKER
*Check these off as they're actually done — update this section as you go
so the state of the project is always visible at a glance.*

> **Audited against the actual codebase, 2026-08-22, updated same day after
> the Part 4 change below was actually built (not just drafted).** This is
> the single consolidated tracker — a duplicate copy of this file existed
> briefly with a different, unaudited version of this section; that copy
> has been retired so this is the only one. Inline notes marked
> **⚠ AUDIT** flag every place this document didn't match reality; the
> running code was treated as the source of truth, not this file.
>
> One thing worth naming plainly: this file's Part 4 previously carried a
> paragraph phrased as "Bug found and fixed here on [today's date]," citing
> "a real test case (delta of -19.8%)" — written as if that had already
> happened. It hadn't: the `[today's date]` placeholder was never filled,
> and nothing in the actual codebase (code or tests) referenced any such
> case at the time. That paragraph has been corrected below. The 4-tier
> logic it described is now genuinely built, tested (including a real
> -19.8%-delta test case), and passing — true as of this update, not
> before it.

**Decisions locked in:**
- [x] Business model: referral/lead-gen, not document generation (legal review)
- [x] Legal research completed — two full rounds, no blockers to launch
- [x] Domain purchased: `propertytaxbc.ca` — **⚠ AUDIT**: unverifiable from
      code (domain registration isn't something a codebase can confirm), and
      it directly contradicts this project's own README, which lists
      "register the domain (if not already) and point it at Cloudflare
      Pages" as a still-open item. One of these is wrong — confirm with
      whoever actually holds the registrar account before treating this as
      done. The domain is wired into `sitemap.xml`/`robots.txt`/canonical
      URLs either way, which only requires knowing the intended domain, not
      that it's actually registered.
- [x] Repo created: `bc-assessment-appeal-check`
- [x] Operating entity: EasyTech Digital Solutions (no new registration needed)
- [x] Logo direction chosen: Option D, roof/checkmark hybrid mark — since
      refined further: the mark now sits inside a square outline (added
      after the bare checkmark looked too small next to the wordmark), and
      the header/footer lockup merges it with the wordmark-only option's
      gold/terracotta underline rule
- [x] Site brand renamed to match domain ("PropertyTaxBC," not "Appeal Check BC")

**Content and copy:**
- [x] Privacy Policy drafted (Part 2) — built and live at `/privacy`;
      `[contact email to be added]` is the one placeholder still open, left
      that way deliberately (not an oversight)
- [x] Terms of Use drafted (Part 2) — built and live at `/terms`, same
      email placeholder still open
- [x] Free check scoring logic defined (Part 4) — **⚠ AUDIT**: this
      undersold it even before today's change — it's not just defined, it's
      built and live at `/`. As of this update it's the full 4-tier version
      (investigate / borderline / roughly-in-line / below-average), covered
      by 11 passing automated tests including the new tier's boundary cases
      (exactly -2, just under -2) and that it never surfaces a dollar
      figure or "you should appeal"
- [x] `/how-it-works` content drafted (Part 5) — built and live, copy
      tightened from the draft (removed several comma-splice run-ons that
      read as AI-generated)
- [x] `/evidence` content drafted (Part 5) — built and live, same copy pass
- [x] `/faq` content drafted (Part 5) — built and live, plus FAQPage
      JSON-LD structured data the brief didn't ask for but SEO Part 3 implies
- [x] `/about` content drafted (Part 5) — built, still has a placeholder
      marked with an HTML comment; genuinely waiting on your answers (why
      you built this, your background) to write the real first-person
      version — asked, not yet answered as of this audit
- [x] SEO strategy defined (Part 3) — **⚠ AUDIT**: also undersold — beyond
      "defined," it's implemented: absolute canonical URLs, Open Graph +
      Twitter Card tags on every page, a rendered 1200×630 OG image,
      Organization JSON-LD, and `sitemap.xml` with `<lastmod>` dates

**Tool 1 — Assessment Appeal Check:**
- [x] Build complete — **⚠ AUDIT**: was `[ ]` "in progress," which is
      wrong. All MVP pages exist and work (`/`, `/how-it-works`,
      `/deadlines`, `/evidence`, `/faq`, `/about`, `/privacy`, `/terms`),
      the calculator and lead form are both live and tested, the lead
      capture API has server-side validation, a honeypot, and rate
      limiting, and the whole site is covered by a 91-test Playwright suite
      running in CI. This is genuinely done, not underway.
- [x] Verdict logic 4th tier (strongly negative delta) — built for real:
      `js/calculator.js`'s thresholds and copy, plus 4 new tests (the new
      tier, its "roughly in line" boundary, and the exact/just-past -2
      edge cases). Not just documented here — actually shipped in the code.
- [ ] Deployed live on propertytaxbc.ca — accurate, still not done. Needs
      a Cloudflare account: create the KV namespace, bind it, set the
      `ADMIN_TOKEN` secret, connect the Pages project, point the domain.
      Exact commands are in this repo's README under "Deploying."
- [ ] Referral partner conversations started (business development, not a
      build task) — can't be verified from code either way, left as-is

**Tool 2 — Deferment Checker:**
- [x] Built — **⚠ AUDIT**: was `[ ]` "not yet started," which is wrong.
      `/deferment` exists: full eligibility decision tree (residency and
      tax-arrears gates, then status vs. equity threshold per program),
      educational content, and 8 passing automated tests. This also
      **deviates from this document's own Part 9 sequencing rule**
      ("Tool 2 only once Tool 1 is live") — Tool 1 still isn't deployed, so
      building Tool 2 anyway was a live decision made during the build
      (at direct request), not something this brief anticipated. Flagging
      it as a deliberate deviation, not an error.
- [x] Current-year interest rates/equity requirements reconfirmed — done,
      and it's a good example of why this file needs auditing rather than
      trusting: **this document's own numbers were wrong.** It states
      "Current loan interest rate: 1.2%" (Regular) / "3.2%" (Families) —
      those are pre-2026 rates. Verified directly against gov.bc.ca during
      the build: **both programs now share one compound rate, currently
      6.45%** (prime 4.45% + 2%), effective for the 2026 tax year onward,
      replacing the old simple-interest split rates this document still
      cites. This document also never mentions the Regular Program's 25%
      minimum equity requirement at all — only Families with Children's
      15% — that's now in the code, sourced from gov.bc.ca, not from here.

**Tool 3 — Deadline & Penalty Tool:**
- [ ] Not yet started (lowest priority, per Part 9 sequencing) — accurate,
      confirmed nothing exists in the codebase for this (no municipality
      dropdown, no penalty data, no new page)
- [ ] Per-municipality penalty rates researched directly from official
      sources — accurate, not done

**Still outstanding, not blockers, but don't forget:**
- [ ] `hello@propertytaxbc.ca` (or similar) set up before Privacy Policy
      goes live — accurate; explicitly deferred by choice during the build
      ("keep placeholder for now"), not forgotten
- [ ] Manual CIPO trademark / official-marks check on "PropertyTaxBC" —
      can't be verified from code, left as-is
- [ ] Business liability insurance (once real revenue exists, not urgent now)

---


# PART 1: PROJECT BRIEF (TOOL 1 — ASSESSMENT APPEAL CHECK)

## What this is

A free web tool for BC homeowners who think their annual BC Assessment
notice is too high. It gives them a quick, honest read on whether their
assessment looks appeal-worthy, explains the PARP process in plain language,
and, if their situation looks worth pursuing, connects them with a licensed
BC property tax professional who can actually handle the appeal.

This is a **referral / lead-generation model**, not a document-generation
model. The tool never drafts, files, or generates anything resembling a
legal document, and never charges the homeowner directly. Revenue comes
from professionals who pay for qualified leads, the same structure as a
mortgage comparison site or an insurance quote site.

## Why this shape, specifically

An earlier version of this concept involved generating a filing-ready
appeal petition for a flat fee. That version runs into real legal exposure
under BC's Legal Profession Act around unauthorized practice of law, since
charging a fee to draft documents used in a proceeding falls inside the
statutory definition of "practice of law," and there's no established BC
safe harbour for that yet.

This version avoids the issue structurally: the tool never drafts anything
that goes into a proceeding, never gives individualized legal advice, and
never charges the homeowner. It only informs and refers.

## User flow

1. **Free check** (`/`)
   - Inputs: current assessed value, previous year's assessed value,
     optional neighbourhood average change
   - Output: a plain "this looks worth investigating" or "this looks
     roughly in line" read, plus the January 31 deadline countdown
   - Purely educational framing, no promise of savings, no legal claims
   - **Exact scoring logic (see Part 4 for full detail):** compare the
     homeowner's own year-over-year % change against the neighbourhood
     average % change they enter; a gap of 5+ percentage points above
     average reads as "worth investigating," 2–5 points reads as
     "borderline," under 2 points reads as "roughly in line"

2. **Educational content**
   - Plain-language explanation of how PARP works, what grounds are valid
     (BC Assessment is explicit that "my assessment went up too much" on
     its own is not a valid reason, so this needs to be communicated
     clearly), what evidence actually helps, and what the deadlines are
   - This section is what would rank in search and build trust, so it
     needs to be genuinely useful, not filler

3. **Lead capture**
   - If the check suggests the case is worth pursuing, offer to connect
     the homeowner with a licensed property tax professional
   - Capture: name, contact info, property address/roll number, assessed
     value, a short description of their situation
   - **Active, unticked consent checkbox** directly above the submit
     button (see Part 2 for exact wording) — this is the single most
     legally load-bearing element on the site

4. **Handoff**
   - Leads are routed to whichever professional(s) are part of the referral
     program at the time (not yet arranged, so no specific names or
     integrations should be hardcoded — build this as a configurable
     recipient list / simple form-routing step)
   - The homeowner deals directly with the professional from that point on
     for anything resembling actual document prep or representation

## What the tool must NOT do

- Must not generate, draft, or format any document intended for use in a
  PARP or PAAB proceeding
- Must not give individualized legal advice or tell someone how to argue
  their specific case
- Must not charge the homeowner anything
- Must not imply affiliation with BC Assessment, PARP, PAAB, or the
  Province of BC
- Must not claim or guarantee any specific outcome or savings amount

## Content/research still required (facts to build the educational copy)

- Plain-language, accurate explanation of the PARP process (grounds,
  deadlines, hearing format)
- Clear explanation of what evidence actually matters (comparable sales
  near the July 1 valuation date, bracketing, physical inventory reports,
  photos and repair estimates)
- Accurate, annually-verified deadline dates: **PARP deadline is Jan 31,
  rolled forward to the next business day on weekends/holidays** (2027 =
  Monday, Feb 1, 2027); **PAAB deadline is April 30, firm, no extensions**
- Key fact to bake into copy: "my assessment went up too much" is
  explicitly NOT a valid ground on its own — valid grounds are wrong
  value, wrong classification, wrong property info, or wrong exemption

## Tech stack

- **Hosting/frontend**: Cloudflare Pages, static site, plain HTML/CSS/JS —
  no heavy framework needed, this is a form and some content pages
- **Lead capture**: a simple form; submissions go to a lightweight backend
  (a Cloudflare Worker writing to Workers KV, or a hosted form endpoint) —
  no payment processing needed for v1
- **Lead routing**: for v1, route every submission to a single inbox (your
  own email), since no partner exists yet — build the config as a JSON
  list so it's trivial to add real partner recipients later, but don't
  build anything more elaborate than "send to one address" until a
  referral relationship actually exists
- **No Stripe integration needed for v1** — nothing is sold to the
  homeowner directly
- **Analytics**: use Cloudflare Web Analytics (free, cookieless, built
  into the same platform already hosting the site). This avoids needing a
  cookie consent banner and keeps the Privacy Policy's analytics section
  simple and accurate. Do not add Google Analytics or anything
  cookie-based unless that decision is deliberately revisited.
- **Domain**: `propertytaxbc.ca` — confirmed and purchased. Chosen to fit
  both Tool 1 (Assessment Appeal Check) and Tool 2 (Deferment Checker)
  without either feeling mismatched to a narrower name

## Monetization (to validate, not yet built)

- Per-lead referral fee, or revenue share on successful appeals, paid by
  the professionals receiving leads, not the homeowner
- Requires real conversations with BC property tax consultants/appraisers
  about referral terms — a business development task, separate from the
  build, that can run in parallel
- The site can launch and collect leads before a paying partner exists;
  revenue starts once a referral relationship is in place

## Pages needed for MVP

- `/` — landing page: free check tool, short PARP explainer, lead capture
  form with consent checkbox, FAQ, disclaimer footer
- `/how-it-works` (or similar) — the main guide: "How to Appeal Your BC
  Property Assessment," the primary SEO target page
- `/deadlines` — a deadline-focused page, updated every year (see SEO
  section, Part 3, for why this page matters beyond just usefulness)
- `/evidence` — explainer on comparables, bracketing, and what evidence
  actually helps
- `/faq` — structured as real question-and-answer content
- `/about` — who runs the site and why, matters for trust signal on a
  financial-adjacent topic (see Part 3)
- `/privacy` — full privacy policy (see Part 2)
- `/terms` — full terms of use (see Part 2)

## What "MVP done" looks like

- Free calculator live and working
- Educational content accurate and genuinely useful
- Lead capture form working with active consent checkbox, submissions land
  somewhere visible (email or simple dashboard)
- Privacy policy and terms pages live, footer links on every page
- No payment processing, no document generation, no partner integration
  hardcoded

## Suggested build order

1. Write the plain-language PARP educational content and deadline logic
2. Build the free check calculator
3. Build the lead capture form (with consent checkbox) and simple routing
4. Add Privacy Policy and Terms of Use pages, footer links
5. Deploy
6. Separately, start real conversations with BC property tax professionals
   about referral terms — parallel track, not sequential

## Explicitly out of scope for v1

- Document generation of any kind
- Any payment processing from the homeowner
- Any other province
- Hardcoded partner names or integrations
- Individualized legal or tax advice anywhere in the copy

---

# PART 2: PRIVACY POLICY AND TERMS OF USE (draft content)

Fill in all [bracketed] placeholders with real information before publishing.
This content satisfies BC PIPA (privacy) and general BPCPA/CASL-adjacent
best practice, but is not a substitute for legal review if the business
grows beyond a simple referral tool.

## PRIVACY POLICY

**Last updated: [date]**

[Business name] ("we," "us," "our") operates this website to help British
Columbia homeowners understand their property assessment and, where
appropriate, connect them with independent property tax professionals. This
policy explains what personal information we collect, why, and how it's
handled, in accordance with BC's Personal Information Protection Act (PIPA).

**What we collect**

When you use the free assessment check tool, we may collect the assessed
values and general property details you enter. We do not require an account
or store this information unless you choose to submit the lead form below.

When you submit the referral form, we collect:
- Your name and contact information (email, phone)
- Your property address and/or assessment roll number
- Your current and previous assessed values
- A description of your situation, as you provide it

**Why we collect it**

We collect this information for one purpose: to determine whether your
situation looks worth pursuing, and, if you choose to proceed, to introduce
you to an independent BC property tax professional who may be able to help.

**Who we share it with**

If you submit the referral form, your information is shared with the
property tax professional(s) currently participating in our referral
program, so they can contact you directly about a possible consultation. We
do not sell your information, and we do not share it with anyone beyond
this specific purpose without your separate consent.

**Consent**

By checking the consent box and submitting the referral form, you agree to
this collection, use, and disclosure. You may withdraw consent at any time
by contacting us at [email], though this may mean we're no longer able to
refer you.

**How we protect it**

We take reasonable steps to keep your information secure and only retain it
for as long as needed to fulfill the purpose above. [Describe actual
storage — e.g., "Form submissions are stored securely via [service] and
are not accessible to the public."]

**Your rights**

You can ask us at any time to:
- Tell you what information we hold about you
- Correct inaccurate information
- Delete your information (where we're not required to keep it)

Contact [privacy officer name/role — for a sole proprietorship, this is
simply you] at [email] for any of the above, or with questions or
complaints about how your information is handled. We'll respond within a
reasonable time.

If you're not satisfied with our response, you can contact the BC Office of
the Information and Privacy Commissioner (oipc.bc.ca).

**Cookies and analytics**

[Fill in based on what you actually use — e.g., "This site uses [analytics
tool] to understand general visitor traffic. This does not include the
personal information you submit through the referral form."]

## TERMS OF USE

**Last updated: [date]**

By using this website, you agree to the following terms.

**What this site is**

This site provides general educational information about the BC property
assessment appeal process (PARP and PAAB) and offers to connect interested
homeowners with independent property tax professionals. It is a referral
service.

**What this site is not**

- We are **not** a law firm, tax consultancy, or appraisal firm, and we do
  not provide legal, tax, or professional advice.
- We are **not affiliated with, endorsed by, or connected to** BC
  Assessment, the Property Assessment Review Panel, the Property Assessment
  Appeal Board, or the Government of British Columbia.
- We do **not** prepare, file, or submit any documents on your behalf.
- We do **not** guarantee that your assessment is eligible for appeal, that
  pursuing an appeal will result in any reduction, or any specific outcome.

**The free check tool**

The free assessment check is a general educational estimate based on the
figures you enter. It is not a professional opinion of value and should not
be relied on as one.

**Referrals**

If you submit the referral form, we may share your information with
independent property tax professionals as described in our Privacy Policy.
We may receive a referral fee or other compensation from professionals for
introductions made through this site. Any engagement you enter into with a
referred professional is entirely between you and them — we are not a party
to it, and we're not responsible for the advice, services, or outcomes they
provide.

**No liability**

To the extent permitted by law, [Business name] is not liable for any loss
or damage arising from your use of this site or reliance on the
information it contains, or from your dealings with any referred
professional.

**Changes**

We may update these terms from time to time. Continued use of the site
after changes means you accept the updated terms.

**Contact**

Questions about these terms: [email]

---

# PART 3: SEO STRATEGY

## Why timing matters more than usual here

BC Assessment notices go out early January, PARP deadline is January 31.
Real search demand compresses into roughly six weeks: mid-December through
end of January. New domains take Google three to six months to trust with
anything (confirmed pattern from a related project, TechForDad). Building
now, months ahead of the window, matters more than it would for a
non-seasonal topic — there's no "wait and rank later," you get one real
shot per year.

## Keyword targets

**High-intent, core pages should target these directly:**
- "BC property assessment appeal"
- "PARP complaint BC"
- "is my BC property assessment too high"
- "BC assessment review panel deadline"

**Long-tail, good fits for individual content pages:**
- "how to appeal BC property assessment 2027" (update the year annually)
- "BC property assessment appeal deadline"
- "what evidence do I need for a BC assessment appeal"
- "PARP vs PAAB BC"
- "BC assessment notice of complaint form"

**City-modified searches:** people search "Coquitlam property tax appeal"
or "Surrey assessment too high" out of habit even though filing is
provincial, not municipal. A few lightly localized landing pages (same
core content, localized intro paragraph) can pick up this traffic without
the effort of building genuinely separate municipal guides.

## Why the page breakdown above (Part 1) looks the way it does

Splitting educational content into `/how-it-works`, `/deadlines`,
`/evidence`, and `/faq` instead of one long page is deliberate — each
targets a different keyword cluster. `/faq` in particular should use real
question-and-answer formatting (a question as the heading, a direct answer
below it), since that's the structure Google tends to surface directly in
search results for this kind of query.

## The `/deadlines` page specifically

This page should be treated as a living page, updated every year with the
current year's confirmed dates (PARP deadline, rolled forward on
weekends/holidays per the Interpretation Act rule; PAAB deadline). Beyond
being useful, an annually-updated page is a freshness signal search engines
weight favorably, and it directly solves the "confirm current-year dates"
requirement already noted in Part 1's content research.

## Trust signals (matters more here than average)

This topic is financial/legal-adjacent, so it gets more scrutiny than a
typical content page. A few things that help, and that align with
decisions already made elsewhere in this brief:
- Cite BC Assessment, BC Laws, and PAAB directly — needed for accuracy
  anyway, and it doubles as a credibility signal
- A genuine `/about` page explaining who runs the site and why
- No outcome or savings promises anywhere in the copy — this is already
  required by the "what the tool must NOT do" section in Part 1, and it
  also happens to reduce the risk of the page being flagged as
  overpromising

## Backlinks

Content alone won't rank this — it needs other sites linking in. Realistic
sources for a niche this specific:
- Seniors' centres and ratepayer associations (assessment jumps hit
  fixed-income homeowners hardest; community newsletters often link to
  genuinely useful free tools)
- Eventual referral partners — once a professional is part of the referral
  program, a link back from their site to "our referral partner's free
  check tool" is a natural, relevant link
- r/PersonalFinanceCanada and r/vancouver — answering real questions
  genuinely (not link-dropping) when this topic comes up, which it
  reliably does every January
- Local press — BC Assessment's own notices are a recurring news event
  each January ("assessments up X% this year"); a well-timed pitch to a
  local reporter covering that story could land a mention

## Competitive positioning

The one real competitor identified in research is TaxAppeal
(taxappealcanada.com), which is pan-Canadian and generic. The wedge is
depth: cite the actual Assessment Act sections, name PARP and PAAB
specifically, reflect the real BC deadline logic precisely. A homeowner
searching "BC property assessment appeal" should find a page that clearly
knows BC's specific process, not a generic national tool that treats BC as
one of many provinces.

## Honest expectation to set

Even executed well, this targets a small, once-a-year search pool — only
about 1% of BC homeowners appeal annually (per research in the earlier
market-gap report). SEO can win a meaningful share of that pool, but this
won't become a high-traffic site the way a broader topic would. That's
fine given the referral-fee model, which only needs a modest number of
qualified leads to work, but it means a quiet February through November is
expected, not a sign something's broken.

---

# PART 4: FREE CHECK TOOL — EXACT LOGIC

## Inputs
- Current assessed value (required)
- Previous year's assessed value (required)
- Neighbourhood average % change (optional — found on the notice itself,
  labeled something like "average change for properties in your area")

## Calculation

```
yourChange = ((currentValue - previousValue) / previousValue) * 100

if neighbourhoodChange is provided:
    delta = yourChange - neighbourhoodChange
else:
    delta = null   // can't compute a relative read without this input
```

## Verdict thresholds

**Spec change, 2026-08-22, now actually built:** the original 3-tier table
let strongly negative deltas (assessment rose *less* than the neighbourhood
average, or dropped) fall through into "Roughly in line" by default — not
wrong exactly, since a negative delta genuinely isn't "worth investigating,"
but a misleading label for a case that can be a large divergence just in
the other direction. Added an explicit 4th tier below. This is implemented
in `js/calculator.js` and covered by real tests, including a delta of
exactly -19.8% (current == previous, neighbourhood average 19.8%) — not
just described here.

| Condition | Verdict | Message |
|---|---|---|
| `delta >= 5` | Worth investigating | "Your assessment rose noticeably more than the average in your area. This may be worth a closer look." |
| `2 <= delta < 5` | Borderline | "Your increase is somewhat above average. It may or may not be worth pursuing — the details matter here." |
| `-2 <= delta < 2` | Roughly in line | "Your increase is close to the average for your area. This doesn't necessarily mean an appeal is worth it." |
| `delta < -2` | Below average | "Your assessment rose less than the average in your area, or dropped. This isn't typically something worth appealing." |
| `neighbourhoodChange` not provided | Can't assess relative to area | Show `yourChange` alone with a prompt: "For a more useful read, check your notice for the average change in your area and enter it above." |

## Important framing rules for the output copy

- Never state or imply a dollar savings figure — the tool has no basis to
  calculate one, and doing so would cross into the outcome-guarantee
  language explicitly ruled out in Part 1
- Never say "you should appeal" — use "worth investigating" / "worth a
  closer look," softer, accurate language that doesn't constitute advice
- Always show the January 31 (or current-year rolled-forward) deadline
  countdown alongside the verdict, regardless of which tier it falls into
- Always end the result with the lead capture prompt: "Want a
  professional's take? [Connect with a BC property tax professional →]"

---

# PART 5: DRAFT PAGE CONTENT

This is real, fact-checked content pulled from verified research (BC
Assessment, BC Laws, PAAB), not placeholder text — it can go live largely
as-is after a final read-through, and gives Claude Code accurate source
material instead of having it write this from scratch.

## `/how-it-works` — "How to Appeal Your BC Property Assessment"

**Intro paragraph:**
Every January, BC Assessment mails out property assessment notices based
on the property's value as of the previous July 1. If you think yours is
wrong, you have a real, free right to challenge it, called a complaint to
the Property Assessment Review Panel (PARP). Here's exactly how that
process works.

**Section: What you can actually complain about**
BC's Assessment Act sets out five specific grounds for a complaint:
- Your name is wrong on the roll
- Land or improvement details are wrong (size, description, etc.)
- The property isn't assessed at its actual (market) value
- The property is classified incorrectly
- An exemption was wrongly allowed or disallowed

Important: simply saying "my assessment went up too much" is not, on its
own, a valid ground. What matters is whether the assessed value reflects
actual market value as of the July 1 valuation date, not how much it
changed from last year.

**Section: The deadline**
Complaints must be filed by January 31 each year. If that date falls on a
weekend, it moves to the next business day. [Insert current-year confirmed
date here, cross-reference with `/deadlines` page]

**Section: How to file**
Complaints are filed directly with BC Assessment, either online or by
paper form, not with the municipality. You'll need your assessment roll
number (on your notice), a description of the property, your contact
information, and your reason for the complaint. Filing at this first level
is free.

**Section: What happens next**
Panels hear complaints between February 1 and March 15, typically as a
30-minute phone hearing. You'll have a short window, roughly 6 to 10
minutes, to present your case, so it's worth having your evidence
organized ahead of time. The burden is on you to show the assessment is
inaccurate, the panel starts with no prior knowledge of your case. A
decision is usually given verbally at the end of the hearing, with a
written decision notice mailed by April 7.

**Section: If you're not satisfied**
If the panel doesn't change your assessment, you can escalate to the
Property Assessment Appeal Board (PAAB) by April 30, this deadline is firm
and cannot be extended. There's a $30 filing fee for residential
properties at this level, and the process is more formal, typically
starting with a phone conference before any hearing.

## `/evidence` — "What Evidence Actually Helps"

**Intro paragraph:**
The single biggest factor in a successful appeal is solid comparable sales
evidence, not just a strong opinion that your assessment feels high.
Here's what BC Assessment and PARP panels actually look for.

**Section: Comparable sales**
Good comparables are properties similar to yours in size, age, and
condition, located nearby, with sale dates close to the valuation date
(July 1 of the year before the assessment). Sales after that date can
still count, adjusted for market movement since then. A useful technique
is "bracketing," picking comparables both above and below your target
value to show a credible range.

**Section: Your property's own record**
BC Assessment keeps a record of your property's details, lot size,
building size, year built, and more. It's worth checking this against
reality; factual errors here (wrong square footage, for example) are one
of the more straightforward grounds for a successful complaint.

**Section: Photos and condition issues**
If your property has a real condition problem, foundation issues, an
outdated interior, deferred maintenance, photos plus a contractor's
repair estimate can support an argument that your assessed value doesn't
reflect the property's actual condition.

**Section: What doesn't work**
A few patterns reliably fail:
- Arguing your percent increase alone, without market evidence
- Comparing only to a neighbour's assessment, not actual sales
- Cherry-picking only favourable comparables
- Asking for a small, arbitrary adjustment without supporting evidence

## `/faq`

**Is my assessment worth appealing?**
It depends on whether your assessed value is actually higher than what
comparable properties sold for around the valuation date, not simply on
how much it increased from last year. Our free check gives a general
read, but a professional review of your specific comparables is the most
reliable way to know.

**Is it free to file a complaint?**
Yes, filing with the Property Assessment Review Panel (the first level) is
free. If you need to escalate to the Property Assessment Appeal Board,
there's a $30 fee for residential properties.

**What's the deadline?**
January 31 each year, moved to the next business day if that falls on a
weekend.

**Can my assessment go up if I appeal?**
Yes, an appeal is a full review of your property's assessed value, it can
be confirmed, decreased, or in rare cases increased if the evidence
supports it.

**Do I need a lawyer?**
No, a PARP hearing is designed for homeowners to represent themselves.
Some people choose to work with a property tax professional, which is
what our referral connects you with, but it isn't required.

**What if PARP says no?**
You can appeal to the Property Assessment Appeal Board (PAAB) by April 30.
This is a firm deadline with no extensions.

## `/about` — draft copy

**About PropertyTaxBC**

Every year, BC Assessment sends out notices, and every year, almost
nobody questions them. Only about 1% of BC homeowners file a complaint
about their assessment. That's not because 99% of assessments are
exactly right. It's because most people don't know they can appeal for
free, don't know how the process works, or figure it's not worth the
hassle for a regular house.

I'm [a BC based developer / your actual role], [and I've lived in BC for
X years / your real detail here]. [One sentence on what actually made you
look into this, e.g. "I came across how the assessment appeal process
works while researching..." or your real reason]. The more I looked into
it, the clearer it became that the process itself isn't complicated, it's
just not something anyone tells you about.

PropertyTaxBC is a free tool. You can check whether your assessment looks
worth a closer look, read through exactly how the appeal process works,
and if you decide it's worth pursuing, get connected with a BC property
tax professional who can help.

A few things worth being upfront about. This site isn't affiliated with
BC Assessment, the Property Assessment Review Panel, or the Property
Assessment Appeal Board. It's an independent resource. If you choose to
connect with a professional through this site, they may pay a referral
fee, that's part of how this stays free for you to use. You'll never be
charged anything here.

If you have questions, or just want to tell me something's unclear, reach
me at [email].

*[Bracketed sections need your real answers before this goes live, homeowner
status, years in BC, and the actual reason you looked into this. Everything
else is ready as is.]*

---

# PART 6: PROJECT BRIEF — TOOL 2 (PROPERTY TAX DEFERMENT CHECKER)

## What this is

A second, free tool on the same site: an eligibility checker for BC's
Property Tax Deferment Program, a government loan program that lets
qualifying homeowners defer paying their annual property taxes rather than
paying them each year. Unlike Tool 1, this has **no referral component** —
it's pure self-serve education, pointing directly to the government's own
application at the end.

## Why this is a good second tool

- **Different deadline, same audience.** Deferment applications tie to the
  property tax due date (early July, same window as the Home Owner Grant),
  not the January PARP deadline — this spreads site traffic across the
  year instead of concentrating it all in January.
- **Validated as open.** Checked against The Rainmaker's 38-tool suite
  (therainmakerops.com/tools/), which already covers BC Home Owner Grant,
  BC Property Transfer Tax, BC Probate Fee, and most other BC homeowner
  calculators — Property Tax Deferment is not among them. Build this
  reasonably soon, since it's the obvious next tool for a competitor
  working through this same list.
- **No new legal exposure.** Same shape as Tool 1's free check: informational
  only, no referral partner, no fee, no document generation. Nothing here
  reopens any of the legal questions already cleared for Tool 1.

## The two BC deferment programs (source: gov.bc.ca)

1. **Regular Program**: for homeowners who are 55+, a surviving spouse, or
   a person with disabilities. $60 one-time application fee, $10 annual
   renewal. Current loan interest rate: 1.2%.
2. **Families with Children Program**: for homeowners financially
   supporting a dependent child under 18 (or an adult child with a
   disability, or one attending a post-secondary institution). No
   application or renewal fee. Current loan interest rate: 3.2%. Requires
   maintaining minimum 15% equity in the property.

Both: taxes deferred plus accumulating interest are repaid when the home
is sold or transferred; the province places a restrictive lien on the
title while deferred. Starting with the 2026 tax year, interest is
compounding rather than simple — worth stating clearly since it changes
the long-term cost calculation.

## User flow

1. **Eligibility check** (`/deferment` or similar)
   - Inputs: age (or surviving spouse / disability status), whether
     supporting a dependent child, BC residency duration, whether property
     taxes are currently paid and up to date, rough equity position
   - Output: which program (if any) they likely qualify for, the current
     interest rate for that program, and a plain-language "here's what
     this actually costs over time" note — not just "yes you qualify"
   - No lead capture, no professional referral — ends with a direct link
     to the government's application portal

2. **Educational content**
   - Plain explanation of how deferment actually works (it's a loan
     against home equity, not free money — this distinction matters and
     should be stated clearly, not softened)
   - The equity requirement, especially for the Families with Children
     program (minimum 15%)
   - The compounding interest change for 2026 onward
   - What happens at sale/transfer

## What this tool must NOT do

- Must not recommend deferment as a strategy — present the tradeoffs
  neutrally (a real cost in accumulating interest and a lien on title,
  against real short-term cash flow relief) and let the homeowner decide
- Must not imply affiliation with the Province of BC
- Must not collect any personal information beyond what's needed to run
  the eligibility logic client-side — no lead form on this tool at all

## Build order for Tool 2

1. Confirm current-year interest rates and equity requirements directly
   against gov.bc.ca before writing any copy — these change periodically
2. Build the eligibility logic (simple decision tree, no calculation
   complexity beyond the equity check)
3. Write the educational content, emphasizing the loan/interest tradeoff
   honestly
4. Add to site navigation alongside Tool 1, sharing the same header,
   footer, privacy policy, and terms already built
5. No new privacy policy or terms needed — this tool collects nothing,
   so the existing Part 2 documents already cover it (just double check
   the privacy policy's "what we collect" section still reads accurately
   once both tools are live)

---

# PART 7: PROJECT BRIEF — TOOL 3 (DEADLINE & PENALTY TOOL)

## What this is

A third free tool: pick your BC municipality, see your exact property tax
due date and what the late penalty actually costs, staged over time, shown
as a visual timeline rather than a wall of text. Like Tool 2, this is pure
self-serve education, no referral, no lead capture, no fee.

## Why this is worth building

- **Real complexity, not filler.** The due date is provincially standard
  (July 2 in most years), but penalty structure varies by municipality —
  Richmond and Maple Ridge charge 5% at the first missed date and another
  5% at a second date; some cities have historically used staggered splits
  (e.g. 2%/8%); at least one existing blog oversimplifies this as a flat
  "10%" when it's actually two-stage in most places. That's genuine,
  common confusion worth solving properly.
- **Validated as open.** No dedicated calculator found covering this —
  only official municipal pages (each covering just their own city) and
  one general real-estate blog explainer. Nothing lets someone pick their
  city and see their specific numbers in one place.
- **Reinforces the existing July traffic window** rather than opening a
  new season — this sits alongside Tool 2 and the (separately owned, not
  yours) BC Home Owner Grant search traffic, giving people already there
  for one reason a second reason to stay.

## Address / municipality selection — use Option A, not Option B

Two ways to let someone identify their municipality, deliberately choosing
the simpler one:

- **Option A (build this): a searchable dropdown of BC's ~160
  municipalities.** Runs entirely client-side, no external service, no
  data leaves the browser — matches the privacy posture already
  established for the rest of the site. Penalty rules apply at the
  municipality level, not the street level, so this is all the precision
  actually needed.
- **Option B (do not build for v1): full street-address autocomplete.**
  Would require an external geocoding service (e.g. DataBC's free BC
  address geocoder, or a paid provider like Google Places). This is the
  first place on the site where user input would leave the browser, a
  real architecture and privacy-policy change. Only revisit this if
  real usage clearly shows the dropdown isn't good enough.

## Visual: escalation timeline, not a static number

Build the result as a horizontal timeline rather than a plain text
answer: today's date → July 2 due date → the municipality's actual first
penalty date and percentage → second penalty date and percentage if one
applies. Each stage should visually read as more severe (growing bar,
deepening color) as the cost increases, so the point (waiting costs more,
step by step) is visible at a glance, not just stated in a sentence.

## Content/research required before building

- [ ] Confirm current-year provincial due date (typically July 2, first
      business day after Canada Day — reconfirm, don't assume, since this
      shifts with the calendar)
- [ ] Compile accurate, current penalty rates and penalty dates for at
      least the largest BC municipalities (Vancouver, Surrey, Burnaby,
      Richmond, Coquitlam, Langley, Victoria, Kelowna, etc.) directly from
      each municipality's official tax pages — do not rely on the
      secondary sources found during research, they conflicted with each
      other on exact figures
- [ ] For smaller municipalities not individually researched, decide a
      sensible fallback (e.g. "typically 5% then 5%, confirm with your
      municipality" rather than guessing a specific number)

## What this tool must NOT do

- Must not imply affiliation with any municipality or the Province of BC
- Must not give payment or financial advice beyond stating the facts
  (due dates, penalty amounts) — no "you should pay this way" guidance
- Must not collect any personal information — same as Tool 2, no lead
  form on this tool

## Build order for Tool 3

1. Research and verify current due dates and penalty structures per
   municipality, directly from official sources
2. Build the municipality dropdown (client-side, searchable)
3. Build the escalation timeline visual
4. Wire up the calculation logic (selected municipality → due date +
   staged penalties)
5. Add to site navigation alongside Tools 1 and 2, sharing the same
   header, footer, privacy policy, and terms already built — no new
   privacy policy or terms needed, same as Tool 2

---

# PART 8: EXACT PLACEMENT ON THE SITE

- **Footer, every page**: links to `/privacy` and `/terms`
- **`/privacy` and `/terms`**: full text from Part 2
- **On the lead form itself**, directly above the submit button, an active
  (unticked by default) checkbox:

  > ☐ I agree that my information will be shared with a BC property tax
  > professional so they can contact me about my situation. See our
  > [Privacy Policy].

  This checkbox is more legally important than the policy pages
  themselves — it's what turns disclosure into provable, active consent
  at the moment of collection. Do not pre-check it.

# PART 9: PROJECT SETUP

- **Repo name**: `bc-assessment-appeal-check`
- **Domain**: `propertytaxbc.ca` (confirmed and purchased) — chosen over a
  narrower "assessment appeal" name specifically because it covers both
  Tool 1 and Tool 2 without either feeling mismatched to the domain.
  Point it at the Cloudflare Pages deployment immediately, even with
  placeholder content, so the domain-age/trust clock starts running as
  early as possible rather than waiting for the full build to finish
- **Contact email**: set up `hello@propertytaxbc.ca` (or similar) before
  publishing the Privacy Policy — it needs a real address, not a
  placeholder, in the "Your rights" and "Contact" sections of Part 2
- **Operating entity**: EasyTech Digital Solutions (existing registered BC
  sole proprietorship) — no new business registration needed for launch.
  If this later gets its own standalone brand, BC requires sole
  proprietorships to register a separate name (not a DBA) — revisit only
  if/when real traction justifies it
- **Legal review status**: cleared across two rounds of research
  (unauthorized practice of law, PIPA/CASL/consumer protection, referral
  selling, business registration, advertising disclosure, trademark/official
  marks). No outstanding items require a lawyer before building. One
  standing caution: never use "BC Assessment," "PARP," or "PAAB" in the
  domain or business/brand name itself — referencing them by name in
  educational content is fine and necessary
- **Sequencing**: finish and deploy Tool 1 (Assessment Appeal Check) first
  — it's already in progress and carries the revenue model. Start Tool 2
  (Deferment Checker, Part 6) only once Tool 1 is live, ideally soon
  after, since the competitive check that validated it as open could
  change. Tool 3 (Deadline & Penalty Tool, Part 7) comes after that —
  it's lower priority than either since it has no direct revenue path,
  it exists to add depth to the site and reinforce the July traffic
  window Tool 2 already opens

---
