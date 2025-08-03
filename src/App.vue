<template>
  <v-app class="pa-4">
    <v-main>
      <Suspense>
        <Home />
      </Suspense>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Home from './views/Home.vue';

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
