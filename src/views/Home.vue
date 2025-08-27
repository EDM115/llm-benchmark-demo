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
            <v-autocomplete
              v-model="selectedItem"
              :filter-keys="['raw.name', 'raw.owner']"
              hide-details
              :item-props="itemProps"
              :items="items"
              label="Component"
              no-data-text="Nothing found, type 'original' to get back to the original code"
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

type Item = {
  name: string
  owner: string
  component: ComponentModule
}

const initialItem: Item = {
  name: "Original code",
  owner: "EDM115",
  component: await import("@/components/EDM115/OriginalCode.vue"),
}

const items: Item[] = [
  initialItem,
  {
    name: "GPT 3.5",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT3.5.vue"),
  },
  {
    name: "GPT 4 Turbo",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT4Turbo.vue"),
  },
  {
    name: "GPT 4o",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT4o.vue"),
  },
  {
    name: "GPT o3",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPTo3.vue"),
  },
  {
    name: "GPT 4.1",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT4.1.vue"),
  },
  {
    name: "GPT 4.5",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT4.5.vue"),
  },
  {
    name: "GPT o4-mini-high",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPTo4MiniHigh.vue"),
  },
  {
    name: "GPT OSS 120b",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPTOSS120b.vue"),
  },
  {
    name: "GPT 5 (Thinking)",
    owner: "OpenAI",
    component: await import("@/components/OpenAI/GPT5Thinking.vue"),
  },
  {
    name: "Gemini 1.5 Pro",
    owner: "GoogleAI",
    component: await import("@/components/GoogleAI/Gemini1.5Pro.vue"),
  },
  {
    name: "Gemini 2.0 Flash",
    owner: "GoogleAI",
    component: await import("@/components/GoogleAI/Gemini2.0Flash.vue"),
  },
  {
    name: "Gemma 3 27B",
    owner: "GoogleAI",
    component: await import("@/components/GoogleAI/Gemma327B.vue"),
  },
  {
    name: "Gemini 2.5 Pro",
    owner: "GoogleAI",
    component: await import("@/components/GoogleAI/Gemini2.5Pro.vue"),
  },
  {
    name: "LLaMA 3 70b",
    owner: "MetaAI",
    component: await import("@/components/MetaAI/LLaMA370b.vue"),
  },
  {
    name: "LLaMA 3.1 405b",
    owner: "MetaAI",
    component: await import("@/components/MetaAI/LLaMA3.1405b.vue"),
  },
  {
    name: "LLaMA 3.3 70b",
    owner: "MetaAI",
    component: await import("@/components/MetaAI/LLaMA3.370b.vue"),
  },
  {
    name: "LLaMA 4 Maverick 17b Instruct",
    owner: "MetaAI",
    component: await import("@/components/MetaAI/LLaMA4Maverick17bInstruct.vue"),
  },
  {
    name: "Claude 3 Opus",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude3Opus.vue"),
  },
  {
    name: "Claude 3.5 Sonnet",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude3.5Sonnet.vue"),
  },
  {
    name: "Claude 3.7 Sonnet",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude3.7Sonnet.vue"),
  },
  {
    name: "Claude 4 Sonnet",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude4Sonnet.vue"),
  },
  {
    name: "Claude 4 Opus",
    owner: "Anthropic",
    component: await import("@/components/Anthropic/Claude4Opus.vue"),
  },
  {
    name: "Mistral Large 2.1",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/MistralLarge2.1.vue"),
  },
  {
    name: "Mistral Medium 3",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/MistralMedium3.vue"),
  },
  {
    name: "Magistral Medium 1.1",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/MagistralMedium1.1.vue"),
  },
  {
    name: "Codestral 2508",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/Codestral2508.vue"),
  },
  {
    name: "Devstral Medium",
    owner: "MistralAI",
    component: await import("@/components/MistralAI/DevstralMedium.vue"),
  },
  {
    name: "pro",
    owner: "Perplexity",
    component: await import("@/components/Perplexity/pro.vue"),
  },
  {
    name: "reasoning pro",
    owner: "Perplexity",
    component: await import("@/components/Perplexity/reasoningpro.vue"),
  },
  {
    name: "Chat (V3 0324)",
    owner: "Deepseek",
    component: await import("@/components/Deepseek/ChatV30324.vue"),
  },
  {
    name: "Reasoner (R1 0528)",
    owner: "Deepseek",
    component: await import("@/components/Deepseek/ReasonerR10528.vue"),
  },
  {
    name: "V3.1 Non-Think",
    owner: "Deepseek",
    component: await import("@/components/Deepseek/V3.1NonThink.vue"),
  },
  {
    name: "V3.1 Think",
    owner: "Deepseek",
    component: await import("@/components/Deepseek/V3.1Think.vue"),
  },
  {
    name: "Grok 2",
    owner: "xAI",
    component: await import("@/components/xAI/Grok2.vue"),
  },
  {
    name: "Grok 3",
    owner: "xAI",
    component: await import("@/components/xAI/Grok3.vue"),
  },
  {
    name: "Qwen 3 Coder",
    owner: "Alibaba Cloud",
    component: await import("@/components/AlibabaCloud/Qwen3Coder.vue"),
  },
  {
    name: "Qwen 3 235B A22B 2507",
    owner: "Alibaba Cloud",
    component: await import("@/components/AlibabaCloud/Qwen3235BA22B2507.vue"),
  },
  {
    name: "Kimi K2",
    owner: "Moonshot AI",
    component: await import("@/components/MoonshotAI/KimiK2.vue"),
  },
  {
    name: "GLM 4.5 Thinking",
    owner: "Z.ai",
    component: await import("@/components/Zai/GLM4.5Thinking.vue"),
  },
  {
    name: "Horizon Beta",
    owner: "Unknown ?",
    component: await import("@/components/Unknown/HorizonBeta.vue"),
  },
  {
    name: "Fixed code",
    owner: "EDM115",
    component: await import("@/components/EDM115/FixedCode.vue"),
  },
]

function generateId(item: Item) {
  return (item.owner + item.name).replace(/[\s\-\(\)\?]+/g, "").toLowerCase()
}

const chosenComponentId = ref(generateId(initialItem))
const rerenderKey = ref(0)
const selectedComponent = shallowRef<Component | null>(null)
const selectedItem = ref(initialItem)

function itemProps(item: Item) {
  return {
    title: item.name,
    subtitle: item.owner,
  }
}

function switchComponent(item: Item) {
  chosenComponentId.value = generateId(item)
  rerenderKey.value = 0
  selectedComponent.value = item.component.default

  const urlParams = new URLSearchParams(window.location.search)
  urlParams.set("id", chosenComponentId.value)
  window.history.replaceState({}, "", `?${urlParams.toString()}`)
}

watch(selectedItem, switchComponent)

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const componentId = urlParams.get("id")?.toLowerCase()

  const item = items.find((item) => generateId(item) === (componentId ?? ""))

  if (item) {
    switchComponent(item)
    selectedItem.value = item
  } else {
    switchComponent(initialItem)
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
