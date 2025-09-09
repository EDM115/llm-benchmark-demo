<template>
  <v-col>
    <v-row
      v-for="stat in stats"
      :key="stat.id"
      id="statsCounters"
      class="d-flex justify-center align-center"
    >
      <v-card class="ma-2">
        <v-card-title style="overflow-wrap: normal; overflow: visible; white-space: wrap;">
          {{ stat.name }}
        </v-card-title>
        <v-card-text>
          <div id="container">
            <div
              id="counter"
              class="middle d-flex justify-center align-center"
            >
              <div
                v-for="(digit, index) in String(stat.animatedValue).split('')"
                :key="index"
                class="numbmask"
                :id="'digit-container-' + stat.id + '-' + ((String(stat.animatedValue).split('').length) - index - 1)"
              >
                <div
                  :id="'n' + stat.id + '-' + ((String(stat.animatedValue).split('').length) - index - 1)"
                  class="numb"
                >
                  <div
                    v-for="n in 10"
                    :key="n"
                    class="digit"
                  >
                    {{ n -1}}
                  </div>
                </div>
                <div class="gradmask fullframe"></div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-row>
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
  { id: 0, name: "Projects", value: projectsNumber.value, animatedValue: 0 },
  { id: 1, name: "Users", value: 46123, animatedValue: 0 },
  { id: 2, name: "Lines of Code", value: linesOfCode.value, animatedValue: 0 },
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

function animateDigits(statId: number, newValue: number) {
  // ! Added the non-null assertion here
  const oldValue = stats.value[statId]?.animatedValue

  const animTl = gsap.timeline({ defaults: { ease: "power3.inOut" }})

  String(newValue).split('').forEach((digit, index) => {
      const num = parseInt(digit)
      const prevNum =  parseInt(String(oldValue).split('')[index] || '0')
      const diff = num - prevNum
      const rotations = diff + (diff < 0 ? 10 : 0)
      const elementId = `#n${statId}-${String(newValue).length - 1 - index}`

      animTl.to(elementId, { y: `-=${rotations * 80}`, duration: 1, ease: "power2.inOut"})
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

      // ! Added the number cast here
      animateDigits(Number(statId), statValue ?? 0)
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
  stats.value.forEach(stat => stat.animatedValue = stat.value)

    document.querySelectorAll("#statsCounters").forEach((el) => {
    if (observer) {
      observer.observe(el)
    }
  })
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
  display: flex;
  flex-direction: column;
  /* Ensure smooth transitions between digits */
  will-change: transform;
}

.gradmask {
  position: absolute;
  background: transparent;
}

.digit {
  height: 80px; /* Adjust based on your font size */
}
</style>
