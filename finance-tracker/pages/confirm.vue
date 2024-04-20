<template>
  <UCard>
    <template #header> signing in... </template>

    Wait a moment while we sign you in...
  </UCard>
</template>
<script setup lang="ts">
useRedirectIfAuthenticated();
</script>
