<script setup lang="ts">
const route = useRoute();
console.log(route.params.slug);
</script>
<template>
  <article
    class="prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:text-gray-700 dark:prose-pre:text-gray-300"
  >
    <ContentDoc />
  </article>
</template>
