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

/**
 * Animates the digits of a number in an odometer/slot-machine style.
 * Each digit wheel spins, with higher-place-value digits spinning slower.
 *
 * @param {string} statId - The ID of the stat being animated (e.g., "0", "1").
 * @param {number} value - The final number to animate to.
 */
function animateDigits(statId: string, value: number) {
  const integerValue = Math.floor(value)
  const digitArray = String(integerValue).split("")
  const maxTime = 4 // Total animation duration in seconds
  const digitHeight = 80 // Height of a single digit in pixels, from CSS

  // A master timeline allows us to apply a single ease function to all animations
  const tl = gsap.timeline({ paused: true })

  // We iterate through digits from right to left (ones, tens, hundreds...)
  const reversedDigits = [...digitArray].reverse()

  reversedDigits.forEach((finalDigitStr, place) => {
    // `place` is the power of 10 (0 for ones, 1 for tens, etc.)
    const id = `#n${statId}-${place}`
    const element = document.querySelector(id)
    if (!element)
      return

    // Reset starting position to '0'
    gsap.set(element, { y: 0 })

    const finalDigit = Number(finalDigitStr)

    // Calculate how many full 0-9 rotations this wheel must perform.
    // For 567, the tens wheel (place=1) does floor(567 / 100) = 5 full rotations.
    const fullSpins = Math.floor(integerValue / (10 ** (place + 1)))

    const stripHeight = 10 * digitHeight // The pixel height of a full 0-9 spin
    const finalDigitY = -finalDigit * digitHeight

    // The total distance is the sum of all full spins plus the final digit's position.
    // We use negative values because we are moving the strip upwards.
    const totalY = -(fullSpins * stripHeight) + finalDigitY

    // Add the animation for this single digit to the master timeline.
    // They all start at time 0 and have a duration of 1 (it will be scaled by the master tween).
    tl.to(element, { y: totalY, duration: 1, ease: "none" }, 0)
  })

  // Create a tween that "scrubs" the master timeline from start to finish.
  // This applies a single, smooth ease to the entire complex animation.
  gsap.to(tl, { progress: 1, duration: maxTime, ease: "power3.inOut" })

  tl.play()
}

function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statElement = entry.target // This is the v-row being observed
      // Find the first digit to parse the stat's ID
      const numbElement = statElement.querySelector(".numb")
      if (!numbElement)
        return

      const elementId = numbElement.id // e.g., "n0-2"
      const idParts = elementId.split("-")
      const statId = idParts[0]?.slice(1) ?? ""
      const statIndex = parseInt(statId, 10)

      if (!isNaN(statIndex) && statIndex >= 0 && statIndex < stats.value.length) {
        const statObject = stats.value[statIndex]
        if (statObject) {
          // The 'value' property can be a raw number or a Ref.
          // This safely unwraps the value if it's a ref.
          // ! Replaced the bogus condition (value of a value)
          // ! statObject.value?.value ?? statObject.value  =>  statObject.value
          const valueToAnimate = statObject.value

          animateDigits(statId, valueToAnimate as number)
          observer?.unobserve(entry.target)
        }
      }
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
  // The ID "statsCounters" is duplicated, which is invalid HTML, but querySelectorAll still works.
  document.querySelectorAll("#statsCounters").forEach(el => observer?.observe(el))
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
