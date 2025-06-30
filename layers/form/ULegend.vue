<template>
  <legend v-bind="props">{{text}}</legend>
</template>

<script setup lang="ts">

const props = defineProps<{
  text: string,
  class: string
}>()

</script>

<style scoped>

</style>