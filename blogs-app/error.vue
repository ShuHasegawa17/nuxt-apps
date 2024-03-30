<script setup lang="ts">
defineProps<{
  error: any;
}>();
</script>
<template>
  <NuxtLayout>
    <section>
      <h1 class="text-4xl mb-4">Opps {{ error.statusCode }}</h1>
      <h2 class="text-xl text-gray500 dark:text-gray-400">
        {{ error.statusMessage }}
      </h2>
    </section>
  </NuxtLayout>
</template>
