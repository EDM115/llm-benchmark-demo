<template>
  <v-col>
    <v-row
      v-for="stat in stats"
      id="statsCounters"
      :key="stat.id"
      class="d-flex justify-center align-center"
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
import { gsap } from "gsap"
import { ofetch } from "ofetch"
import { onMounted, ref } from "vue"

let observer: IntersectionObserver | null = null
// Different from what you see ? I include private repos here too :)
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
const linesOfCode = ref(Object.values(projectsLoc.value).reduce((acc, cur) => acc + cur, 0))

const stats = ref([
  { id: 0, name: "Projects", value: projectsNumber.value },
  { id: 1, name: "Users", value: 46123 },
  { id: 2, name: "Lines of Code", value: linesOfCode },
])

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

function animateDigits(statId: string, value: number) {
  // Configuration derived from your styles
  const stepPx = 80; // line-height per digit
  const totalStepsPerCycle = 10;
  const cyclePx = stepPx * totalStepsPerCycle;

  // Determine the string and digits
  const str = String(value);
  const digits = str.split("").map((d) => Number(d));
  const totalDigits = digits.length;

  // Choose a pleasant total time for the leftmost (most significant) digit
  // and scale others by powers of 10 so that each step on the left causes
  // exactly 10 steps on its right neighbor, independently.
  const leftmostTotalTime = 8; // seconds (matches your original maxTime)

  // Start all digit timelines together
  digits.forEach((digit, indexFromLeft) => {
    // Compute position from right: 0 = units, 1 = tens, ...
    const posFromRight = totalDigits - indexFromLeft - 1;

    // DOM ids: you used #n{statId}-{posFromRight}
    const selector = `#n${statId}-${posFromRight}`;
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return;

    // The target digit (0..9)
    const target = digit;

    // Duration scaling: each step of a digit takes 10× longer than the digit at its right.
    // So the total animation duration for this digit is:
    const totalDuration =
      leftmostTotalTime / Math.pow(10, totalDigits - indexFromLeft - 1);

    // How many full 0→9 cycles should this digit perform?
    // To keep it convincing and consistent, we can base the number of cycles on its
    // index so that more significant digits do at least one full cycle and the
    // less significant do many more automatically by timing, not by repeat.
    //
    // But to strictly follow the rule “each time the left increases by 1, the
    // right does 10 full turns” we only need the timing ratio; the number of cycles
    // emerges naturally if they start together. To fix the “extra 0” and snapping,
    // we compute exact y travel to final frame:
    //
    // Strategy:
    // - Start at frame 0 (digit 0 at visible window).
    // - Spin K full cycles + final partial steps to target.
    // - For a pleasing look, do:
    //   K = (indexFromLeft === 0 ? 1 : Math.min(6, posFromRight + 2))
    //   You can tweak K to taste; it does not break the timing rule because
    //   the speed is defined by totalDuration, not by cycles count.
    //
    const cycles = indexFromLeft === 0 ? 1 : Math.min(6, posFromRight + 3);

    // Total steps moved = cycles * 10 + target
    const totalSteps = cycles * totalStepsPerCycle + target;
    const totalDistance = totalSteps * stepPx;

    // Build a per-digit timeline
    const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });

    // We animate y from 0 to -totalDistance, but we also apply a modulo onUpdate
    // to avoid showing “extra 0” and to keep the loop seamless.
    tl.to(el, {
      y: -totalDistance,
      duration: totalDuration,
      ease: "power2.inOut",
      onUpdate() {
        // Modulo wrap to keep the strip within [0, cyclePx)
        // Negative y modulo handling:
        const y = gsap.getProperty(el, "y") as number;
        let wrapped = y % -cyclePx;
        if (wrapped > 0) wrapped -= cyclePx;
        gsap.set(el, { y: wrapped });
      },
      onComplete() {
        // Snap exactly to the target frame
        const finalY = -(target * stepPx);
        gsap.set(el, { y: finalY });
      },
    });

    tl.play(0);
  });
}

function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statElement = entry.target
      const numbElement = statElement.querySelector(".numb")
      const elementId = numbElement?.id ?? ""
      const idParts = elementId.split("-")
      const statId = idParts[0]?.slice(1) ?? ""
      const statIndex = parseInt(statId)
      const statValue = !isNaN(statIndex) && statIndex >= 0 && statIndex < stats.value.length
        ? stats.value[statIndex]?.value ?? 0
        : 0

      animateDigits(statId, statValue ?? 0)
      observer?.unobserve(entry.target)
    }
  })
}

onMounted(async () => {
  await fetchProjectsNumber()

  if (stats.value[0] !== undefined && stats.value[0].value !== projectsNumber.value) {
    stats.value[0].value = projectsNumber.value
  }

  observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  })
  document.querySelectorAll("#statsCounters").forEach((el) => observer?.observe(el))
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
