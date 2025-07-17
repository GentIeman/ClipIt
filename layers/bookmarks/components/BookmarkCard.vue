<template>
  <UCard>
    <template #header>
      <img
          v-if="bookmark.preview?.url"
          :src="media + bookmark.preview?.url"
          alt=""
          :width="bookmark.preview?.width"
          :height="bookmark.preview?.height"
          class="object-cover rounded-lg">
    </template>
    <div class="grid gap-2">
      <h3 class="text-xl">{{ bookmark.title }}</h3>
      <p class="text-neutral-500 line-clamp-3"> {{ bookmark.description }}</p>
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

const props = defineProps<{
  bookmark: IBookmark
}>()

const media = useStrapiMedia("/")

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

</script>

<style scoped>

</style>