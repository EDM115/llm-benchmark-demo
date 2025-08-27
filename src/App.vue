<template>
  <v-app class="pa-4">
    <v-main>
      <Suspense>
        <Home />

        <template #fallback>
          <v-container>
            <v-row
              align="center"
              align-content="center"
              justify="center"
            >
              <v-col align="center">
                <h1>LLM Benchmark Demo</h1>

                <v-divider class="my-4" />

                <v-progress-circular indeterminate color="primary" />
                <br />
                <br />
                <b>Loading all components...</b>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </Suspense>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Home from "./views/Home.vue";

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  filter: blur(0.5rem);
  opacity: 0;
  transform: translateY(-20px);
}
</style>
