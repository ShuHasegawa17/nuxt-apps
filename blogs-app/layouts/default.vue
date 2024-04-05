<template>
  <div class="container mx-auto max-w-3xl">
    <header class="flex justify-between items-start md:items-center mt-5">
      <div class="flex items-center md:space-x-12">
        <div class="hidden md:block">
          <NuxtLink
            to="/"
            class="text-xl font-semibold p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            Shu Hasegawa
          </NuxtLink>
        </div>
        <Menu />
      </div>
      <ClientOnly>
        <ColorModeSelector />
      </ClientOnly>
    </header>
    <main class="p-2 mt-10">
      <SpeedInsights />
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
useHead({
  titleTemplate: '%s - Shu Hasegawa',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: '',
    },
  ],
});
</script>
<style lang="scss">
body {
  font-family: 'Roboto';
}
body {
  @apply bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300;
}
</style>
