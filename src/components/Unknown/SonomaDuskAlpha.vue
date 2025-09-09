<template>
  <v-col>
    <v-row
      v-for="(stat, statIndex) in stats"
      :id="'statsCounters-' + statIndex"
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
            class="counter-container"
          >
            <div
              id="counter"
              class="counter"
            >
              <div
                v-for="(digit, index) in String(stat.value).split('')"
                :key="index"
                class="digit-container"
                :style="{ order: -index }"
              >
                <div
                  :id="'n' + stat.id + '-' + index"
                  class="numb"
                >
                  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9
                </div>
                <div class="gradmask" />
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
import { nextTick, onMounted, ref } from "vue"

let observer: IntersectionObserver | null = null
const projectsNumber = ref(65)

const projectsLoc = ref({
  // active
  "ban-all-except-admins": 441,
  "better-maps": 13863,
  "booleanfix": 534,
  "bulk-youtube-download": 293,
  "dotfiles": 35267,
  "EDM115": 296,
  "website": 11337,
  "website-v1": 137999,
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

function animateCounter(statId: number, targetValue: number) {
  const digitArray = String(targetValue).padStart(5, '0').split('') // Pad to fixed width for consistency
  const totalDuration = 3 // Total animation time in seconds
  const digitHeight = 80 // Height of each digit in pixels
  
  // Clear any existing animations
  gsap.killTweensOf(`#n${statId}-*`)
  
  // Create timeline for this counter
  const tl = gsap.timeline()
  
  // Animate each digit independently
  digitArray.forEach((digit, index) => {
    const element = document.querySelector(`#n${statId}-${index}`) as HTMLElement
    if (!element) return
    
    const targetPosition = -(parseInt(digit) * digitHeight)
    const currentPosition = 0 // Start from 0
    
    // Calculate relative speed: rightmost digits move fastest
    const relativeSpeed = Math.pow(10, digitArray.length - 1 - index)
    const digitDuration = totalDuration / relativeSpeed
    
    // For the odometer effect, we need to animate through all the intermediate values
    const startDigit = 0
    const endDigit = parseInt(digit)
    
    if (index === 0) {
      // Leftmost digit - moves slowest, only animates to its final value
      tl.to(element, {
        y: targetPosition,
        duration: totalDuration,
        ease: "power2.inOut"
      }, 0)
    } else {
      // Other digits - create odometer effect based on left digit's movement
      const leftDigitIndex = index - 1
      // ! Added the fallback here
      const leftDigitFinalValue = parseInt(digitArray[leftDigitIndex] ?? "0")
      
      // This digit needs to complete 10 full cycles for each increment of the left digit, plus its final value
      const totalRotations = leftDigitFinalValue * 10 + endDigit
      
      tl.to(element, {
        y: -(totalRotations * digitHeight),
        duration: totalDuration,
        ease: "none" // Linear for smooth odometer effect
      }, 0)
    }
  })
  
  // Ensure all animations complete together
  tl.timeScale(1)
}

function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statElement = entry.target as HTMLElement
      // ! Added the fallback here
      const statIndex = parseInt(statElement.id.split('-')[1] ?? "0") || 0
      const stat = stats.value[statIndex]
      
      if (stat) {
        animateCounter(stat.id, stat.value)
      }
      
      observer?.unobserve(entry.target)
    }
  })
}

onMounted(async () => {
  await fetchProjectsNumber()

  if (stats.value[0] !== undefined && stats.value[0].value !== projectsNumber.value) {
    stats.value[0].value = projectsNumber.value
  }

  // Wait a bit for DOM to be ready
  nextTick(() => {
    observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    })
    
    document.querySelectorAll("[id^='statsCounters-']").forEach((el) => {
      observer?.observe(el)
    })
  })
})
</script>

<style scoped>
.counter-container {
  position: relative;
  overflow: hidden;
  color: rgb(var(--v-theme-primary));
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.counter {
  display: flex;
  flex-direction: row-reverse; /* Rightmost digit first */
  height: 80px;
  overflow: hidden;
  position: relative;
  gap: 2px;
}

.digit-container {
  position: relative;
  height: 80px;
  width: 40px;
  background-color: rgb(var(--v-theme-background-lighten-2));
  border-radius: 8px;
  box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.5), inset 0px -5px 5px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.numb {
  color: rgb(var(--v-theme-primary));
  text-align: center;
  font-family: "Fira Code", monospace;
  font-size: 50px;
  font-weight: bold;
  height: 100%;
  width: 100%;
  line-height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  will-change: transform;
}

.gradmask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 45%,
    rgb(var(--v-theme-background-lighten-2)) 45%,
    rgb(var(--v-theme-background-lighten-2)) 55%,
    transparent 55%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 2;
}

/* Ensure proper stacking */
.digit-container {
  z-index: 1;
}

.numb {
  z-index: 0;
}
</style>
