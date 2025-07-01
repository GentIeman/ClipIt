<template>
  <UForm :state="{}" class="grid gap-4">
    <ULegend text="Sign in" class="block text-center text-xl font-bold"/>
    <UFormField label="Email">
      <UInput placeholder="Enter your email" size="lg" class="w-full" />
    </UFormField>
    <UFormField label="Password" required>
      <UInputPassword />
    </UFormField>
    <UButton label="Sign in" block size="lg"/>
  </UForm>
</template>

<script setup lang="ts">

import UInputPassword from "#layers/form/UInputPassword.vue";
import ULegend from "~/layers/form/ULegend.vue";

defineProps<{
  state: Object,
  schema: ISchema,
}>()
</script>

<style scoped>

</style>