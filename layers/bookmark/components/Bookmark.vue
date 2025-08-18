<template>
  <UCard>
    <template
        v-if="viewChecks.isCards"
        #header>
      <img
          :src="mediaPath + bookmark.preview?.url"
          alt=""
          :width="bookmark.preview?.width"
          :height="bookmark.preview?.height"
          class="object-cover rounded-lg">
    </template>
    <div class="grid gap-2">
      <h3 class="text-xl">{{ bookmark.title }}</h3>
      <p
          v-if="viewChecks.isCardsOrLines"
          class="text-neutral-500 line-clamp-3"> {{ bookmark.description }}</p>
      <div class="flex gap-3">
        <UBadge
            :label="linkBadgeLabel"
            class="rounded-full"/>
        <p>{{ formattedCreatedAt }}</p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  bookmark: IBookmark
  view?: BookmarkView
}>(), {
  view: 'cards'
})

const mediaPath = useStrapiMedia("/")

const linkBadgeLabel = computed(() => {
  return props.bookmark.link.replace(/^https?:\/\//, '')
})

const formattedCreatedAt = computed(() => {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(props.bookmark.createdAt))
})

const viewChecks = computed(() => ({
  isCards: ['cards'].includes(props.view),
  isCardsOrLines: ['cards', 'lines'].includes(props.view),
}));

</script>

<style scoped>

</style>