<template>
  <v-col>
    <v-row
      v-for="stat in stats"
      id="statsCounters"
      :key="stat.id"
      class="stats-counter d-flex justify-center align-center"
    >
      <v-card class="ma-2">
        <v-card-title style="overflow-wrap: normal; overflow: visible; white-space: wrap;">
          {{ stat.name }}
        </v-card-title>
        <v-card-text>
          <div
            id="container"
            class=""
          >
            <div
              id="counter"
              class="middle d-flex justify-center align-center"
            >
              <div
                v-for="(digit, index) in String(stat.value).split('')"
                :id="'digit-container-' + stat.id + '-' + ((String(stat.value).split('').length) - index - 1)"
                :key="index"
                class="numbmask"
              >
                <div
                  :id="'n' + stat.id + '-' + ((String(stat.value).split('').length) - index - 1)"
                  class="numb"
                >
                  0 1 2 3 4 5 6 7 8 9 0
                </div>
                <div class="gradmask fullframe" />
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-row>
    <!-- <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://stats.edm115.dev/api?username=EDM115&count_private=true&show_icons=true&cache_seconds=1800&bg_color=30,833ab4,fd1d1d,fcb045&include_all_commits=True&title_color=fff&icon_color=fff&border_color=000&text_color=70ffff"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://stats.edm115.dev/api/top-langs/?username=EDM115&langs_count=10&layout=compact&theme=merko&bg_color=30,833ab4,fd1d1d,fcb045&title_color=fff&icon_color=fff&border_color=000&text_color=70ffff"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://github-readme-activity-graph.vercel.app/graph?username=EDM115&theme=dracula&line=50fa7b&point=ff79c6&area_color=f1fa8c&bg_color=282a36&color=8be9fd&title_color=8be9fd&area=true&hide_border=true&radius=8"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://github-readme-streak-stats.herokuapp.com/?user=EDM115&theme=dracula&hide_border=true&date_format=j%20M%5B%20Y%5D"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://github-profile-trophy.vercel.app/?username=EDM115&theme=dracula&no-bg=true&no-frame=true"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://lanyard.cnrad.dev/api/625240117560475658?theme=dark&bg=282a36&borderRadius=30&animated=true&idleMessage=No%20RPC%20activity%20detected&showDisplayName=true"
      />
    </v-row> -->
  </v-col>
</template>

<script setup lang="ts">
/* --------------------------------------------------------------- *
 *  This file contains only the **script** part of your component.
 *  The template (HTML) and the <style> block from your original
 *  component can stay unchanged.
 * --------------------------------------------------------------- */

import { gsap } from "gsap"
import { ofetch } from "ofetch"
import { onMounted, ref } from "vue"

// ----------------------------------------------------
//   Data (projects, LOC, etc.) – unchanged
// ----------------------------------------------------
const projectsNumber = ref(65)

const projectsLoc = ref({
  // active
  "ban-all-except-admins": 441,
  "better-maps": 13863,
  "booleanfix": 534,
  // "boubot": 4177,
  "bulk-youtube-download": 293,
  // "cursedChess-bot": 2658,
  // "DiceWizard": 2741,
  "dotfiles": 35267,
  "EDM115": 296,
  "website": 11337,
  "website-v1": 137999,
  // "edm115.fot.one / edm115.shadd.eu.org / edm115.ethar.xyz / walad.link/edm115": 384 + 3061,
  "EDM115.github.io": 90,
  "EDM115-discord-bot": 1198,
  "EDM115-ohmyposh-theme": 671,
  "Grundy2": 6477,
  "hugo": 890,
  "jean-marie-bot": 1984,
  "js-imports-sort": 3549,
  "learning-stack": 18412,
  "Markdown_Syntax_FR": 674,
  "monorepo-hash": 4101,
  "obsidian": 10246,
  "palex": 5552,
  "random-algorithm": 370491 - 370118,
  "school-codes": 3379,
  "shared-files": 381,
  "sport-track": 1582,
  "telegram-auto-upload-folder": 369,
  "telegram-backup-dump": 512,
  "The-Very-Restrictive-License": 311,
  // "ThunderBot": 2196,
  "unrar-alpine": 1689,
  "unzip-bot": 7469,
  "useful-stuff": 794,
  "VGM-KHI-download": 310,
  "web-logs": 303,

  "school-codes-v2": 885105,
  "IUT": 396155,

  // archived
  "bots-status": 214,
  "drive_uploader": 1163,
  "E5": 143,
  "EDM115-enhanced-experience": 14338,
  "feedback-bot": 25,
  "HerokuBans": 17,
  "IUT-mc-modpack": 19978,
  "nextgen-leech": 17,
  "portfolio": 72691,
  "pyrogram-heroku-template": 117 + 122,
  "sncf-wish": 86,
  "stpaul-homepage": 201,
  "TeleTest": 99,
  "TextToUrl-bot": 177,
  "underrated-producers-list": 15095,
  "vscode-extension-test": 2750,
  "Werewolf_Discord_bot": 70,
})

const linesOfCode = ref(Object.values(projectsLoc.value).reduce((a, b) => a + b, 0))

/** stats that are shown on the page */
const stats = ref([
  { id: 0, name: "Projects", value: projectsNumber.value },
  { id: 1, name: "Users", value: 46_568 },
  // **IMPORTANT** – we want a *plain number* for gsap, not a Ref.
  { id: 2, name: "Lines of Code", value: linesOfCode.value },
])

/* ---------------------------------------------------- *
 *  1️⃣  FETCH GITHUB PROJECTS COUNT
 * ---------------------------------------------------- */
async function fetchProjectsNumber() {
  try {
    const { public_repos } = await ofetch<{ public_repos: number }>("https://api.github.com/users/EDM115", {
      headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })

    projectsNumber.value = public_repos
  } catch (error) {
    console.error("Failed to fetch projects number :", error)
  }
}

/* ---------------------------------------------------- *
 *  2️⃣  ODOMETER‑STYLE ANIMATION
 * ---------------------------------------------------- */

/**
 * Animate the digits for a specific stat.
 *
 * @param statId  The `id` that you used when constructing the
 *               DOM ids (e.g. `0`, `1`, …)
 * @param value   The **final** number we want to show.
 */
function animateDigits(statId: string | number, value: number) {
  // Guard against non‑numeric values (e.g. a ref that hasn't been
  // resolved yet).  We simply do nothing.
  if (typeof value !== "number" || Number.isNaN(value)) return

  const digits = String(value).split("")               // e.g. ["2","7"]
  const totalDigits = digits.length
  const maxDuration = 2 // seconds – you can tweak this

  // Build a timeline that starts all tweens at time 0 so that
  // every digit finishes **together**.
  const tl = gsap.timeline({ paused: true })

  // Walk from *left* (most‑significant) to *right* (least‑significant)
  digits.forEach((_, idx) => {
    // Position of this digit in the DOM (`0` = rightmost)
    const pos = totalDigits - idx - 1

    // The number formed by all digits **up to** this one.
    //   "27" → left digit → 2
    //   "27" → right digit → 27
    const steps = Number(digits.slice(0, idx + 1).join('')) // e.g. 27

    // Each step moves the inner `.numb` 80 px upward
    const distance = steps * 80 // 80 px = height of one digit line

    const selector = `#n${statId}-${pos}`

    // Animate the *whole* distance in the *same* total time
    tl.to(
      selector,
      { y: -distance, duration: maxDuration, ease: "none" },
      0 // <-- start time (all start together)
    )
  })

  // When the timeline is ready, play it
  tl.play()
}

/* ---------------------------------------------------- *
 *  3️⃣  INTERSECTION OBSERVER – trigger animation
 * ---------------------------------------------------- */
function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return

    const statEl = entry.target as HTMLElement
    const numb = statEl.querySelector(".numb") as HTMLElement | null
    if (!numb) return

    // Extract the stat id from the DOM id (`n0-0`, `n1-2`, …)
    const idParts = numb.id.split("-")            // ["n0","0"] → ["0"]
    const statId = (idParts[0] ?? "").slice(1)      // "0"
    const index = Number(statId)

    // Guard for out‑of‑range / missing stats
    if (Number.isNaN(index) || index < 0 || index >= stats.value.length) {
      observer?.unobserve(entry.target)
      return
    }

    // The value may be a plain number or a Ref<number>
    const rawValue = stats.value[index].value
    const numericValue = typeof rawValue === "object" && "value" in rawValue
      ? (rawValue as any).value
      : rawValue

    animateDigits(statId, Number(numericValue) ?? 0)

    // Only animate once
    observer?.unobserve(entry.target)
  })
}

/* ---------------------------------------------------- *
 *  4️⃣  MOUNT & OBSERVE
 * ---------------------------------------------------- */
let observer: IntersectionObserver | null = null

onMounted(async () => {
  // ----------------------------------------------------------------
  //  Fetch the real number of public repos and update the first stat
  // ----------------------------------------------------------------
  await fetchProjectsNumber()
  if (stats.value[0]?.value !== projectsNumber.value) {
    stats.value[0].value = projectsNumber.value
  }

  // ----------------------------------------------------------------
  //  Set up the IntersectionObserver
  // ----------------------------------------------------------------
  observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  })

  // Every `<v-row>` that renders a counter gets the class
  // `stats-counter`.  We use a class selector because an
  // `id` must be unique, and you were using the same id
  // (`#statsCounters`) on many rows.
  document.querySelectorAll('.stats-counter').forEach(el => observer!.observe(el))
})
</script>

<style scoped>
.middle {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.fullframe {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#container {
  position: relative;
  overflow: hidden;
  color: rgb(var(--v-theme-primary));
  width: 100%;
  height: 76px;
}

#counter {
  width: 100%;
  height: 76px;
  overflow: hidden;
  position: relative;
}

.numbmask {
  position: relative;
  margin: 0px 1px;
  height: 100%;
  width: 33px;
  background-color: rgb(var(--v-theme-background-lighten-2));
  color: rgb(var(--v-theme-primary));
  overflow: hidden;
  float: right;
  border-radius: 8px;
  box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.5), inset 0px -5px 5px rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.numb {
  color: rgb(var(--v-theme-primary));
  text-align: center;
  font: "Fira Code", monospace;
  font-size: 50px;
  font-weight: bold;
  height: 100%;
  width: 100%;
  line-height: 80px;
  z-index: 1;
}

.gradmask {
  position: absolute;
  background: transparent;
}
</style>
