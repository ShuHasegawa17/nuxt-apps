<script setup lang="ts">
const { error, pending, data } = await useFetch<any>(
  'https://api.github.com/users/ShuHasegawa17/repos'
);
// console.log(data.value);
const repos = computed(() =>
  data.value
    //.filter((repo: { description: any }) => repo.description)
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
);
</script>

<template>
  <div class="not-prose">
    <section v-if="pending">Loading...</section>
    <section v-else-if="error">somthing went wrong,,, Try again!</section>
    <section v-else>
      <ul class="grid grid-cols-1 gap-4">
        <li
          v-for="repsitory in repos"
          :key="repsitory.id"
          class="border border-gray-200 dark:border-gray-700 rounded-sm p-4 hover:bg-gray-100 dark:hover:bg-gray-700 font-mono"
        >
          <a :href="repsitory.html_url" target="_blank">
            <div class="flex item-center justify-between text-sm">
              <div class="font-semibold">{{ repsitory.name }}</div>
              <div>{{ repsitory.stargazers_count }} *</div>
            </div>
            <p class="text-sm">
              {{ repsitory.description }}
            </p>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
