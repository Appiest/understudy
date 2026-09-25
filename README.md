# Understudy

This is our team's Blue Ocean Strategy presentation for the USC Iovine and Young Academy. It pitches Understudy, a pair of AI smart glasses that learns how a store's best employee does the job and then coaches new hires by voice during their real shifts.

The presentation is a website that runs in your browser. This guide walks you through everything, one step at a time: getting the files onto your computer, running the slideshow, presenting it, saving it as a PDF for Brightspace, changing the words and numbers, and sending your changes back to the team.

You don't need any programming experience. The first setup takes about 15 minutes. After that, opening the deck takes about a minute.

## Contents

- [Quick start for people who already use Git](#quick-start-for-people-who-already-use-git)
- [Part 1: Set up your computer (only once)](#part-1-set-up-your-computer-only-once)
- [Part 2: Run the slideshow](#part-2-run-the-slideshow)
- [Part 3: Present it](#part-3-present-it)
- [Part 4: Save it as a PDF for Brightspace](#part-4-save-it-as-a-pdf-for-brightspace)
- [Part 5: Change the words, numbers and names](#part-5-change-the-words-numbers-and-names)
- [Part 6: Send your changes to the team](#part-6-send-your-changes-to-the-team)
- [Part 7: Working with Claude Code](#part-7-working-with-claude-code)
- [Part 8: Put the deck on the web](#part-8-put-the-deck-on-the-web)
- [How the project is organized](#how-the-project-is-organized)
- [How the slides work](#how-the-slides-work)
- [Where each rubric item lives](#where-each-rubric-item-lives)
- [If something goes wrong](#if-something-goes-wrong)

## Quick start for people who already use Git

```sh
git clone https://github.com/Appiest/understudy.git
cd understudy
npm install
npm run dev
```

Open **http://localhost:3000**. Before you push, run `npm run check`, which runs the type checker, the linter with its complexity limit, and a scan for em dashes. Branch off `main`, open a pull request, and read [`CLAUDE.md`](CLAUDE.md) for the design and writing rules.

---

## Part 1: Set up your computer (only once)

### Step 1: Accept the invitation to the repository

The deck lives in a GitHub repository, which is a shared folder with a full history of every change. Anyone can view and download it because it's public. To send changes back, though, you need to be a collaborator.

1. If you don't have a GitHub account, create one for free at **https://github.com/signup**.
2. Send your GitHub username to the repo owner so they can invite you.
3. Look for an email from GitHub with the subject "invited you to Appiest/understudy", then click **View invitation** and **Accept invitation**. You can also accept it at **https://github.com/Appiest/understudy/invitations** while you're signed in.

The invitation expires after 7 days. If it expires, ask for a new one.

### Step 2: Install Node.js

The slideshow needs a free program called Node.js to run.

1. Go to **https://nodejs.org**.
2. Click the big download button marked **LTS**, which is the stable version.
3. Open the file you downloaded and click through the installer, keeping all the default choices. On a Mac, it may ask for your computer password. That's normal.
4. When the installer finishes, **restart your computer** so the next steps can find Node.js.

If you already have Node.js, check that it's version 20.9 or newer by typing `node --version` in a Terminal or Command Prompt window. It should print something like `v22.11.0`.

### Step 3: Get the files with GitHub Desktop

GitHub Desktop is a free app with buttons for everything, so you never have to type Git commands. If you're comfortable with the command line, skip to [Step 3, alternative](#step-3-alternative-get-the-files-with-the-command-line).

1. Download GitHub Desktop from **https://desktop.github.com** and install it.
2. Open it and sign in with your GitHub account when it asks.
3. Click **File** in the menu bar, then **Clone Repository…**.
4. Click the **URL** tab and paste `https://github.com/Appiest/understudy`.
5. Under **Local Path**, pick where the folder should go. Your Documents folder or Desktop works well. Remember this spot.
6. Click **Clone**. When it finishes, you'll have a folder called `understudy` on your computer.

### Step 3, alternative: Get the files with the command line

On a Mac, Git comes with Apple's developer tools. Type `git --version` in Terminal, and if it asks to install the tools, click **Install**. On Windows, install Git from **https://git-scm.com/download/win** and keep the default choices.

Then type:

```sh
cd ~/Documents
git clone https://github.com/Appiest/understudy.git
```

This creates an `understudy` folder inside your Documents folder.

### Step 3, if you only want to watch: Download a ZIP

If you just want to view the deck and won't change anything, you don't need Git or an account.

1. Go to **https://github.com/Appiest/understudy**.
2. Click the green **Code** button, then **Download ZIP**.
3. Unzip it. On a Mac, double-click `understudy-main.zip`. On Windows, right-click it, choose **Extract All…**, then click **Extract**.

A ZIP is a snapshot. It won't get the team's later changes, and you can't send changes back from it.

### Step 4: Open a command window inside the `understudy` folder

You'll type a few short commands into a text window called Terminal (on a Mac) or Command Prompt (on Windows). It has to be pointed at the `understudy` folder.

**From GitHub Desktop (easiest):** click **Repository** in the menu bar, then **Open in Terminal** on a Mac or **Open in Command Prompt** on Windows.

**On a Mac, by hand:**

1. Press **Command + Space**, type **Terminal** and press **Return**.
2. Type `cd` followed by a single space. Don't press Return yet.
3. Drag the `understudy` folder from Finder into the Terminal window and let go. Its location appears after `cd `.
4. Press **Return**.

**On Windows, by hand:**

1. Open the `understudy` folder in File Explorer. You should see files like `package.json` and `README.md`.
2. Click once on the address bar at the top so the folder path turns blue.
3. Type `cmd` and press **Enter**. A Command Prompt window opens, already pointed at the folder.

**Check you're in the right place.** Type `ls` on a Mac or `dir` on Windows and press Return or Enter. You should see `package.json` and `README.md` in the list. If you don't, see [npm error code ENOENT](#nothing-happens-or-npm-error-code-enoent).

### Step 5: Install the slideshow's parts

In that window, type this and press **Return** or **Enter**:

```sh
npm install
```

This downloads everything the slideshow needs into a folder called `node_modules`. It takes one to three minutes and prints a lot of text. Yellow "warn" lines are normal. Wait until the blinking cursor comes back on a new line.

Run `npm install` again whenever you pull changes where someone added a new package. If the deck breaks after you pull, this is the first thing to try.

---

## Part 2: Run the slideshow

In your command window (see [Step 4](#step-4-open-a-command-window-inside-the-understudy-folder)), type:

```sh
npm run dev
```

It's ready when you see a line like this:

```
✓ Ready in 600ms
```

Now open your browser and go to **http://localhost:3000**. The title slide appears.

Leave the command window open while you use the deck, because closing it stops the slideshow. While it's running, any file you save shows up in the browser within a second, so you can edit and watch at the same time.

**When you're done,** click the command window and press **Control + C** to stop it.

**Next time,** you only need two things: open a command window in the folder (Step 4) and type `npm run dev`. If a teammate changed things since you last looked, get their changes first (see [Get the latest changes](#get-the-latest-changes)).

---

## Part 3: Present it

### Controls

| To do this | Press |
| --- | --- |
| Go forward | Right arrow, Down arrow, Space, Enter, Page Down, or click anywhere |
| Go back | Left arrow, Up arrow, Backspace, Page Up, or right-click |
| Swipe on a touchscreen or trackpad | Drag left to go forward, right to go back |
| Show or hide the speaker notes | N |
| Enter or leave full screen | F |
| Show or hide the “Slide x, beat y” label | B |
| Open the print version | P |
| Open the facts behind the current slide | D |
| Jump to the first or last slide | Home or End |
| Close the notes | Escape |

Most slides build in steps, called beats, so each press brings in the next part. The small label in the bottom right corner, like "Slide 2, beat 3", tells you exactly where you are, which makes it easy to call out hand-offs between speakers. Press **B** to hide or show it. Your browser remembers the choice, so hide it once on the presenting laptop and it stays hidden. The label never appears in the printed PDF.

### Speaker notes

Press **N** to open the speaker script for the current slide at the bottom of the screen. The notes appear on the same screen as the slides, so if you're projecting, open them on your laptop before you mirror the display, or keep a printed copy.

### Facts behind each slide

Every slide has a fact page for preparing Q&A. It lists each number on the slide with where it came from, a short quote from the source, and whether it matches the source, is a team estimate or is only an illustration. It also covers what to say if someone pushes back, background numbers like market size, and the questions an investor is likely to ask. The strategy canvas page shows every score and the reasoning behind it.

Press **D** during the deck, click **Facts behind this slide** in the speaker notes, or add `/data` to a slide's address: `http://localhost:3000/#5/data` (or **https://appiest.github.io/understudy/#5/data** on the live site). Press **Escape** to go back to the slide.

The facts live in `src/content/facts.ts`. If you change a number on a slide, update its entry there too.

### Jump to a slide

The address bar keeps track of where you are. `http://localhost:3000/#5` opens slide 5 (the strategy canvas), which is handy when you rehearse one section.

### Before class

1. Open the deck in Chrome and press **F** for full screen.
2. Click through the whole deck once so every image is loaded.
3. The mouse pointer hides itself after a second and a half without movement.
4. The deck is built at 16:9 and scales to fit any screen, so it looks the same on a laptop and on a projector. On a screen with a different shape, you'll see paper-colored bars on the sides or top.

### Interactive slides

On the **strategy canvas** (slide 5), hover over a line to highlight it, and click a name in the key to hide or show that line. On the **competitive landscape** (slide 6), hover over or click a company to read what it does. Clicking these controls doesn't advance the slide.

---

## Part 4: Save it as a PDF for Brightspace

The deck has a print version that puts each slide, and each build step that matters, on its own landscape page with every animation already finished.

1. Start the deck (`npm run dev`) and go to **http://localhost:3000/print**. You can also press **P** in the deck.
2. Wait a few seconds for the images to load. Scroll to the bottom once to be sure.
3. Press **Command + P** on a Mac or **Control + P** on Windows.
4. Set **Destination** to **Save as PDF**.
5. Click **More settings** and set:
   - **Margins:** None
   - **Background graphics:** checked. Without this, the colored shapes disappear.
   - **Headers and footers:** unchecked
6. Click **Save** and name the file something like `Understudy - Group 15.pdf`.

Use Chrome for this. Safari and Firefox handle custom page sizes less reliably.

---

## Part 5: Change the words, numbers and names

You never have to touch the slide layout code to change what the deck says. All the words, numbers and scores live in a few plain files inside `src/content`. Open them in any text editor. [Visual Studio Code](https://code.visualstudio.com) is free and works well: open it, click **File** then **Open Folder…**, and pick the `understudy` folder.

### Fill in the placeholders

Open `src/content/config.ts`. Everything that names our team, links to our Figma board or points to the mind map image is in this one file.

| Placeholder | What to put there | Where it shows up |
| --- | --- | --- |
| `productName` | The product's name. It's "Understudy" for now. | Title slide, solution slide, strategy canvas, landscape, browser tab |
| `teamName` | Our team's name. It's "Group 15". | Title slide |
| `teamMembers` | Our names, in quotes and separated by commas | Title slide |
| `figmaBoardLink` | The full link to our Figma board, starting with `https://` | The "Open our Figma board" button on the mind map slide |
| `mindMapImage` | The path to our exported mind map image, for example `"/mind-map.png"` | The mind map slide. Leave it as `""` to keep the drawn mind map. |

To add the mind map image, export it from Figma as a PNG (select the frame, then **Export** in the right panel), put the file in the `public` folder, and set `mindMapImage` to `"/"` followed by the file name.

Keep the quote marks and commas exactly as they are. Only change the text between the quote marks.

### Change slide text, statistics and speaker notes

Open `src/content/content.ts`. It has one section per slide, in the order the slides appear:

| Section | Slide | What's inside |
| --- | --- | --- |
| `title` | 1 | Tagline, subtitle, our five rules against solution jumping, notes |
| `turnover` | 2 | The headline, turnover rates by sector, the replacement cost, the Walmart quote, the reframed question, the three tiers of noncustomers, notes |
| `drivers` | 3 | The multimodal AI example, the glasses shipment shares, the 7 million figure, the timeline of big players leaving headsets, notes |
| `solution` | 4 | Capture, learn and coach descriptions, the sample playbook, the sample coaching exchange, the realistic v1 table, risks, notes |
| `canvas` | 5 | The ten factors, every player's scores, the ERRC grid, the three characteristics, notes |
| `landscape` | 6 | Every company's position and description, notes |
| `mindMap` | 7 | The center, the branches and their leaves, the Figma button label, the closing line, notes |
| `appendix` | Sources | Notes for the sources page |

A few examples:

- **Change a strategy canvas score.** Find `canvas`, then `players`. Each player has a `scores` list with ten numbers from 0 to 10, in the same order as `factors`. Change a number, save, and the line redraws.
- **Move a company on the landscape.** Find `landscape`, then `players`. `offToOn` runs from 0 (off the job, left) to 1 (on the job, right). `industrialToRetail` runs from 0 (industrial, bottom) to 1 (retail and small business, top).
- **Edit the speaker notes.** Every section has a `notes` list. Each item is one paragraph.
- **Change a turnover rate.** Find `turnover`, then `sectors`. The yearly figure is calculated from `monthlySeparationRate`, so you only change the monthly number.

### Add or change a source

Every statistic on a slide shows its source in the bottom left corner. The sources live in `src/content/sources.ts`. Each one has:

- `cite`: the short version for the slide footer, like `"BLS JOLTS Table 20, 2025"`
- `title`: the full version for the sources page
- `url`: the link

To cite a new source, add it to `sources.ts`, then add its name to the slide's `sourcesByStep` list in `src/components/deck/slides.ts`. The sources page lists every entry automatically.

### Content rules

These keep the deck honest and consistent. `npm run check` catches the first one for you.

- **Never use em dashes,** anywhere: slide text, notes, code or comments. Use a comma, colon, period or parentheses instead.
- **Every statistic needs a source** in its slide's footer.
- **Label estimates and old figures honestly,** for example "2017 estimate" or "team estimates".
- **Keep slide text short.** Details go in the speaker notes.
- **Write like a person talks.** The full writing and design rules are in [`CLAUDE.md`](CLAUDE.md).

---

## Part 6: Send your changes to the team

We use a simple routine so nobody overwrites anyone else's work. You make your changes on your own **branch** (a private copy of the deck), then open a **pull request**, which asks the team to merge your branch into the main version. The main version is called `main`.

### Get the latest changes

Always do this before you start working.

- **GitHub Desktop:** make sure **Current Branch** at the top says `main`, then click **Fetch origin**, then **Pull origin** if it appears.
- **Command line:** `git checkout main` then `git pull`.

If `package.json` changed, run `npm install` again.

### Make a branch

Name the branch after what you're doing, like `fill-team-names` or `canvas-scores-after-interviews`.

- **GitHub Desktop:** click **Current Branch**, then **New Branch**, type the name, and click **Create Branch**.
- **Command line:** `git checkout -b fill-team-names`

### Make your changes and check them

1. Edit the files and watch the result at **http://localhost:3000** while `npm run dev` is running.
2. Click through every slide you touched, including every build step.
3. Stop the dev server with **Control + C** and run:

   ```sh
   npm run check
   ```

   It checks three things: that the code has no type errors, that it passes the linter (which includes a limit on how complicated any one function can get), and that there are no em dashes. It should end without any red "error" lines. If it finds a problem, it prints the file and line number. Fix it and run the check again.

### Commit your changes

A commit is a saved snapshot with a short note about what changed.

- **GitHub Desktop:** the left panel lists your changed files. Type a short summary at the bottom left, like `Add team names and Figma link`, and click **Commit to fill-team-names**.
- **Command line:**

  ```sh
  git add -A
  git commit -m "Add team names and Figma link"
  ```

Write the summary as an instruction, starting with a verb: "Add…", "Fix…", "Update…".

### Push and open a pull request

- **GitHub Desktop:** click **Publish branch** (or **Push origin** if you've published before), then **Create Pull Request**. Your browser opens GitHub.
- **Command line:** `git push -u origin fill-team-names`, then open the link Git prints, or go to the repo on GitHub and click **Compare & pull request**.

On GitHub, describe what you changed and why, add a screenshot if a slide looks different, and click **Create pull request**. Ask a teammate to look at it. When it looks good, click **Merge pull request** and then **Delete branch**. Everyone gets it the next time they pull.

### If Git says there's a conflict

A conflict means you and a teammate changed the same lines. Git marks both versions in the file like this:

```
<<<<<<< HEAD
  tagline: "Their version",
=======
  tagline: "Your version",
>>>>>>> your-branch
```

Keep the version you want (or combine them), delete the three marker lines, save, run `npm run check`, and commit. GitHub Desktop walks you through this with an **Open in Visual Studio Code** button. If you're unsure, ask in the group chat before merging.

---

## Part 7: Working with Claude Code

This repo has a [`CLAUDE.md`](CLAUDE.md) file that Claude Code reads automatically whenever it works here. It covers our stack, our design rules (type, color, layout and motion), our writing rules and the no em dash rule, so every teammate's Claude builds the deck the same way.

- **Start Claude Code in the repo folder** (`cd understudy`, then `claude`) so it picks up `CLAUDE.md`.
- **The brief is the source for content.** `claude-code-prompt-blue-ocean-presentation.md` is the original assignment brief. When the brief and `CLAUDE.md` disagree about design or tools, `CLAUDE.md` wins. When they disagree about content or the rubric, the brief wins.
- **Ask for a branch and a pull request,** not a direct push to `main`.
- **`npm run check` runs automatically.** The repo has a Claude Code hook in `.claude/settings.json`. Whenever Claude finishes a turn with uncommitted changes in `src`, `public` or `scripts`, the hook runs the check, and if it fails, Claude has to fix the problems before it can stop. You'll see "Running npm run check on changed files" when it happens. Still check the result in the browser yourself.
- If you change a team rule, update `CLAUDE.md` in the same pull request so everyone's Claude learns it.

---

## Part 8: Put the deck on the web

The deck builds into plain files (HTML, CSS, JavaScript and images) that any static host can serve. `npm run build` writes them to a folder called `out`.

### GitHub Pages (set up once)

The repo already has an automatic deploy in `.github/workflows/deploy.yml`. After Pages is switched on, every merge to `main` checks the deck, builds it and publishes it.

1. On GitHub, open the repo and click **Settings**, then **Pages** in the left sidebar.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open the **Actions** tab, click **Deploy to GitHub Pages**, then **Run workflow**.
4. When it turns green, the deck is live at **https://appiest.github.io/understudy/**.

If the check step fails, the deploy stops and the live site keeps the last good version. Open the failed run to see which file and line caused it.

### Vercel (alternative)

1. Sign in at **https://vercel.com** with your GitHub account.
2. Click **Add New…**, then **Project**, and import `Appiest/understudy`.
3. Keep the defaults and click **Deploy**. Vercel detects Next.js and serves the deck from the root of its own address.

---

## How the project is organized

```
understudy/
├── CLAUDE.md                          Team design and writing rules, read by Claude Code
├── README.md                          This guide
├── claude-code-prompt-blue-ocean-presentation.md   The original assignment brief
├── art/
│   └── glasses.py                     Blender script that models and renders the glasses
├── public/
│   └── renders/                       Rendered glasses images used on the slides
├── scripts/
│   └── check-em-dashes.mjs            Fails the check if an em dash sneaks in
├── .github/workflows/deploy.yml       Builds and publishes to GitHub Pages
└── src/
    ├── app/
    │   ├── globals.css                The theme: colors, type sizes, spacing, shadows
    │   ├── fonts.ts                   Loads Mona Sans from Google Fonts
    │   ├── layout.tsx                 The page wrapper and browser tab title
    │   ├── page.tsx                   The deck, at /
    │   └── print/page.tsx             The print version, at /print
    ├── content/
    │   ├── config.ts                  Team placeholders: name, members, Figma link, mind map
    │   ├── facts.ts                   The fact pages: sources, quotes, statuses and Q&A for each slide
    │   ├── content.ts                 Every slide's words, numbers, scores and notes
    │   └── sources.ts                 Every source, with its citation and link
    ├── components/deck/
    │   ├── Deck.tsx                   The slideshow frame: scaling, transitions, grain
    │   ├── slides.ts                  The list of slides, their steps, sources and notes
    │   ├── slides/                    One file per slide
    │   ├── primitives.tsx             Shared animation pieces (text reveals, count-ups)
    │   ├── VoiceWave.tsx              The animated voice line that recurs through the deck
    │   ├── GlassesRender.tsx          Shows a rendered view of the glasses
    │   ├── SlideFooter.tsx            Sources and the slide and beat label
    │   ├── NotesPanel.tsx             The speaker notes panel (N)
    │   ├── PrintDeck.tsx              Lays every slide out for printing
    │   ├── useDeckNavigation.ts       Keyboard, click, swipe and address bar navigation
    │   └── usePresenterKeys.ts        Notes, full screen, print, idle cursor and scaling
    └── lib/                           Small helpers for animation timing and file paths
```

## How the slides work

Every slide is drawn on a fixed 1920 by 1080 stage that scales to fit the window, so sizes in the code are real pixels at 1080p.

`src/components/deck/slides.ts` lists the slides in order. Each entry sets:

- `name`: shown in the speaker notes panel and read out by screen readers
- `steps`: how many presses the slide takes before moving on
- `printSteps`: which steps get their own page in the PDF. By default only the last step is printed.
- `sourcesByStep`: which sources the footer shows at each step
- `notes`: the speaker notes, from `content.ts`
- `Content`: the component in `slides/` that draws it

Each slide component receives the current `step` and shows the right part. Animation uses the [Motion](https://motion.dev) library, icons come from [Phosphor](https://phosphoricons.com), and styling uses [Tailwind CSS](https://tailwindcss.com) with the tokens in `globals.css`. Use those tokens (`text-ocean`, `bg-paper-raised`, `text-headline` and so on) instead of new hex colors or pixel font sizes, so a design change happens in one place.

The glasses images are real 3D renders. `art/glasses.py` builds the model in [Blender](https://www.blender.org) and renders the views into `public/renders`. To re-render after editing it, run `blender -b -P art/glasses.py`.

## Where each rubric item lives

| Rubric item | Slide | What shows it |
| --- | --- | --- |
| (b) Tips to avoid solution jumping | 1, second step | Our five rules and the diagram of the jump we avoided |
| (c) The challenge and its evidence | 2 | Turnover rates, replacement cost, the Walmart quote, the reframed question, noncustomer tiers |
| (d) Exponential drivers | 3 | Multimodal AI, glasses overtaking headsets, big players leaving enterprise headsets |
| (e) The proposed solution | 4 | Capture, learn and coach, plus the realistic v1 and risks |
| (f) Blue Ocean value map | 5, supported by 6 | The strategy canvas, the ERRC grid, the three characteristics, the landscape map |
| (g) Mind map of the problem space | 7 | The mind map and the link to our Figma board |

The slides don't label rubric items, so use this table when you check the deck against the assignment.

---

## If something goes wrong

### "npm: command not found" or "'npm' is not recognized"

Your computer can't find Node.js yet. Restart your computer, open a new command window (Step 4), and try again. If it still happens, repeat Step 2.

### Nothing happens, or "npm error code ENOENT"

The command window isn't pointed at the right folder, so npm can't find `package.json`. If you downloaded a ZIP, unzipping sometimes creates a folder inside a folder with the same name. Use the inner one, the one that directly contains `package.json`, and redo Step 4.

### "Port 3000 is already in use" or "EADDRINUSE"

Another program is using the same address, often a slideshow you started earlier and didn't stop. Close other command windows and try again. Or run it on a different port:

```sh
npm run dev -- --port 3001
```

Then go to **http://localhost:3001**.

### The page is blank or says "This site can't be reached"

Check that the command window is still open and shows "Ready". If you closed it, start again from Part 2.

### The deck shows a red error screen after I pulled changes

Someone probably added a package. Stop the server with **Control + C**, run `npm install`, then `npm run dev` again.

### I edited `content.ts` and now nothing works

A missing quote mark, comma or bracket is the usual cause. The red error screen and the command window both name the file and line. Compare your line with the ones around it. If you're stuck, GitHub Desktop can undo everything: right-click the file in the **Changes** list and choose **Discard changes**.

### `npm run check` says there's an em dash

It prints the file and line, for example `src/content/content.ts:42`. Open that line and replace the long dash (the em dash, Unicode U+2014) with a comma, colon, period or parentheses.

### `npm run check` says "complexity"

One function has too many branches (`if`, `? :`, `&&`, `||` and so on). Split it into smaller named functions, return early instead of nesting, or use a lookup object. Ask Claude Code for help if you're unsure.

### GitHub says "Permission denied" or "403" when I push

You haven't accepted the invitation yet (Step 1), or you're signed in to a different GitHub account. In GitHub Desktop, check **GitHub Desktop** (Mac) or **File** (Windows), then **Settings**, then **Accounts**.

### The PDF is missing colors or has white borders

In the print dialog, turn on **Background graphics** and set **Margins** to **None** (Part 4).

### Something else

Post the exact error message and what you were doing in our group chat, or open an issue at **https://github.com/Appiest/understudy/issues**.
