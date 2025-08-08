<template>
  <v-container>
    <v-row
      align="center"
      align-content="center"
      justify="center"
    >
      <v-col align="center">
        <h1>LLM Benchmark Demo</h1>

        <v-divider class="my-4" />

        <v-col>
          <v-row>
            <v-select
              v-model="selectedItem"
              :item-props="itemProps"
              :items="items"
              label="Component"
              return-object
              variant="outlined"
            />
            <v-btn
              color="primary"
              class="ml-6"
              id="replay-button"
              text="Replay"
              @click="rerenderKey++"
            />
          </v-row>
        </v-col>
      </v-col>
    </v-row>

    <v-row
      align="center"
      align-content="center"
      justify="center"
    >
      <v-col align="center">
        <v-card
          id="stats"
          class="mx-auto my-4"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>Stats</h2>
          </v-card-title>

          <v-card-text>
            <Component
              :is="selectedComponent"
              :key="chosenComponentId + '-' + rerenderKey"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, watch, type Component } from "vue"

type ComponentModule = {
  default: Component
}

const items: Array<{ id: number; name: string; owner: string; component: ComponentModule }> = [
  {
    id: 0,
    name: "Original code",
    owner: "EDM115",
    component: await import("@/components/EDM115/OriginalCode.vue"),
  },
  {
    id: 1,
    name: "GPT 3.5",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT3.5.vue"),
  },
  {
    id: 2,
    name: "GPT 4 Turbo",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT4Turbo.vue"),
  },
  {
    id: 3,
    name: "GPT 4o",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT4o.vue"),
  },
  {
    id: 4,
    name: "GPT o3",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPTo3.vue"),
  },
  {
    id: 5,
    name: "GPT 4.1",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT4.1.vue"),
  },
  {
    id: 6,
    name: "GPT 4.5",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT4.5.vue"),
  },
  {
    id: 7,
    name: "GPT o4-mini-high",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPTo4MiniHigh.vue"),
  },
  {
    id: 8,
    name: "GPT OSS 120b",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPTOSS120b.vue"),
  },
  {
    id: 9,
    name: "GPT 5 (Thinking)",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT5Thinking.vue"),
  },
  {
    id: 10,
    name: "Gemini 1.5 Pro",
    owner: "GoogleAI",
    component: await import("@/components/GoogleAI/Gemini1.5Pro.vue"),
  },
  {
    id: 11,
    name: "Gemini 2.0 Flash",
    owner: "GoogleAI",
    component: await import("@/components/GoogleAI/Gemini2.0Flash.vue"),
  },
  {
    id: 12,
    name: "Gemma 3 27B",
    owner: "GoogleAI",
    component: await import("@/components/GoogleAI/Gemma327B.vue"),
  },
  {
    id: 13,
    name: "Gemini 2.5 Pro",
    owner: "GoogleAI",
    component: await import("@/components/GoogleAI/Gemini2.5Pro.vue"),
  },
  {
    id: 14,
    name: "LLaMA 3 70b",
    owner: "MetaAI",
    component: await import("@/components/MetaAI/LLaMA370b.vue"),
  },
  {
    id: 15,
    name: "LLaMA 3.1 405b",
    owner: "MetaAI",
    component: await import("@/components/MetaAI/LLaMA3.1405b.vue"),
  },
  {
    id: 16,
    name: "LLaMA 3.3 70b",
    owner: "MetaAI",
    component: await import("@/components/MetaAI/LLaMA3.370b.vue"),
  },
  {
    id: 17,
    name: "LLaMA 4 Maverick 17b Instruct",
    owner: "MetaAI",
    component: await import("@/components/MetaAI/LLaMA4Maverick17bInstruct.vue"),
  },
  {
    id: 18,
    name: "Claude 3 Opus",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude3Opus.vue"),
  },
  {
    id: 19,
    name: "Claude 3.5 Sonnet",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude3.5Sonnet.vue"),
  },
  {
    id: 20,
    name: "Claude 3.7 Sonnet",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude3.7Sonnet.vue"),
  },
  {
    id: 21,
    name: "Claude 4 Sonnet",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude4Sonnet.vue"),
  },
  {
    id: 22,
    name: "Claude 4 Opus",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude4Opus.vue"),
  },
  {
    id: 23,
    name: "Mistral Large 2.1",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/MistralLarge2.1.vue"),
  },
  {
    id: 24,
    name: "Mistral Medium 3",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/MistralMedium3.vue"),
  },
  {
    id: 25,
    name: "Magistral Medium 1.1",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/MagistralMedium1.1.vue"),
  },
  {
    id: 26,
    name: "Codestral 2508",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/Codestral2508.vue"),
  },
  {
    id: 27,
    name: "Devstral Medium",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/DevstralMedium.vue"),
  },
  {
    id: 28,
    name: "pro",
    owner: "Perplexity",
    component: await import("@/components/Perplexity/pro.vue"),
  },
  {
    id: 29,
    name: "reasoning pro",
    owner: "Perplexity",
    component: await import("@/components/Perplexity/reasoningpro.vue"),
  },
  {
    id: 30,
    name: "Chat (V3 0324)",
    owner: "Deepseek",
    component: await import("@/components/Deepseek/ChatV30324.vue"),
  },
  {
    id: 31,
    name: "Reasoner (R1 0528)",
    owner: "Deepseek",
    component: await import("@/components/Deepseek/ReasonerR10528.vue"),
  },
  {
    id: 32,
    name: "Grok 2",
    owner: "xAI",
    component: await import("@/components/xAI/Grok2.vue"),
  },
  {
    id: 33,
    name: "Grok 3",
    owner: "xAI",
    component: await import("@/components/xAI/Grok3.vue"),
  },
  {
    id: 34,
    name: "Qwen 3 Coder",
    owner: "Alibaba Cloud",
    component: await import("@/components/AlibabaCloud/Qwen3Coder.vue"),
  },
  {
    id: 35,
    name: "Qwen 3 235B A22B 2507",
    owner: "Alibaba Cloud",
    component: await import("@/components/AlibabaCloud/Qwen3235BA22B2507.vue"),
  },
  {
    id: 36,
    name: "Kimi K2",
    owner: "Moonshot AI",
    component: await import("@/components/MoonshotAI/KimiK2.vue"),
  },
  {
    id: 37,
    name: "GLM 4.5",
    owner: "Z.ai",
    component: await import("@/components/Zai/GLM4.5.vue"),
  },
  {
    id: 38,
    name: "Horizon Beta",
    owner: "Unknown ?",
    component: await import("@/components/Unknown/HorizonBeta.vue"),
  },
  {
    id: 39,
    name: "Fixed code",
    owner: "EDM115",
    component: await import("@/components/EDM115/FixedCode.vue"),
  },
]

const chosenComponentId = ref(0)
const rerenderKey = ref(0)
const selectedComponent = shallowRef<Component | null>(null)
const selectedItem = ref(items[0])

function itemProps(item: { name: string; owner: string }) {
  return {
    title: item.name,
    subtitle: item.owner,
  }
}

function switchComponent(item: typeof items[0]) {
  chosenComponentId.value = item.id
  rerenderKey.value = 0
  selectedComponent.value = item.component.default

  const urlParams = new URLSearchParams(window.location.search)
  urlParams.set("id", String(item.id))
  window.history.replaceState({}, "", `?${urlParams.toString()}`)
}

watch(selectedItem, switchComponent)

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const componentId = urlParams.get("id")

  if (componentId) {
    const item = items.find((item) => item.id === Number(componentId))

    if (item) {
      switchComponent(item)
      selectedItem.value = item
    } else {
      switchComponent(items[0])
    }
  } else {
    switchComponent(items[0])
  }
})
</script>

<style scoped>
:deep(.v-input__details) {
  display: none !important;
}

#replay-button {
  align-self: center;
}
</style>
