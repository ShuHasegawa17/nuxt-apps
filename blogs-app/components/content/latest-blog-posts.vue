<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 0 });
</script>
<template>
  <BlogPosts v-slot="{ posts }" :limit="limit">
    <div v-for="post in posts" :key="post.id">
      <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
    </div>
  </BlogPosts>
</template>
