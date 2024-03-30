<script setup lang="ts">
const activeId = ref<string>('');
let elements: NodeListOf<Element>;
let observer: IntersectionObserver;
// client only hook
onMounted(() => {
  const callback = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id;
        break;
      }
    }
  };
  // only client api
  const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0.5,
  });
  elements = document.querySelectorAll('h2, h3');
  for (const element of elements) {
    observer.observe(element);
  }
});

onBeforeUnmount(() => {
  if (!observer) return;
  for (const elment of elements) {
    observer.unobserve(elment);
  }
});
</script>
<template>
  <article
    class="prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:text-gray-700 dark:prose-pre:text-gray-300"
  >
    <ContentDoc>
      <template #not-found>
        <h1>Document not found</h1>
      </template>
      <template v-slot="{ doc }">
        <div class="grid grid-cols-6 gap-16">
          <div :class="{ 'col-span-4': doc.toc, 'col-span-6': !doc.toc }">
            <ContentRenderer :value="doc" />
          </div>
          <div class="col-span-2 not-prose" v-if="doc.toc">
            <aside class="sticky top-8">
              <div class="font-semibold mb-2">Table of Contents</div>
              <nav>
                <TocLinks
                  :links="doc.body?.toc?.links"
                  :active-id="activeId"
                ></TocLinks>
              </nav>
            </aside>
          </div>
        </div>
      </template>
    </ContentDoc>
  </article>
</template>
