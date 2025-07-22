<template>
  <main>
    <UContainer
        class="grid gap-4"
        :class="{
          'grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))]': ['cards'].includes(viewMode),
        }">
      <Bookmark
          v-for="bookmark in bookmarks"
          :key="bookmark.documentId"
          as="article"
          :view="viewMode"
          :bookmark="bookmark"/>
    </UContainer>
    <UContainer class="fixed bottom-0 w-full grid sm:hidden place-items-center my-3">
      <UButton
          label="New Bookmark"
          color="primary"
          size="md"
          leading-icon="i-lucide-plus"
          variant="solid"
      />
    </UContainer>
  </main>
</template>

<script setup lang="ts">
import {useBookmarkStore} from "~/layers/bookmarks/stores/bookmarks";

const bookmarkStore = useBookmarkStore()
const {bookmarks} = storeToRefs(bookmarkStore)
const user = useStrapiUser()

await callOnce('bookmarks', () => bookmarkStore.fetchBookmarks(user.value))
definePageMeta({
  middleware: ['auth'],
})

// temporary solution to switch between view modes
const viewMode: BookmarkView = 'cards'
</script>

<style scoped>

</style>