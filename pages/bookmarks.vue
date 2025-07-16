<template>
  <main>
    <UContainer class="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))]">
      <BookmarkCard
          v-for="bookmark in bookmarks"
          :key="bookmark.documentId"
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
</script>

<style scoped>

</style>