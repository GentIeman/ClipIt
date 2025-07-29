<template>
  <div>
    <AppHeader/>
    <slot/>
    <UContainer class="fixed bottom-0 w-full grid sm:hidden place-items-center my-3">
      <AddBookmarkModal />
    </UContainer>
  </div>
</template>
<script setup lang="ts">
import AddBookmarkModal from "#layers/ui/components/AddBookmarkModal.vue";
</script>