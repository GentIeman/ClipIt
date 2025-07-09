<template>
  <UForm :state="props.state" class="grid gap-4">
    <ULegend :text="schema.legend" class="block text-center text-xl font-bold"/>
    <UFormField
        v-for="(field, index) of schema.fields"
        :key="index"
        :name="field.name"
        :label="field.label"
        :required="schema.required.includes(field.name)"
    >
      <Component :is="componentMap[field.name] ?? UInput" v-bind="field" class="w-full" />
    </UFormField>
    <UButton v-bind="schema.button"/>
  </UForm>
</template>

<script setup lang="ts">
import ULegend from "~/layers/form/components/ULegend.vue";
import UInputPassword from "~/layers/form/components/UInputPassword.vue";
import {UInput} from "#components";
import type {FormsCollectionItem} from "@nuxt/content";

// @TODO сделать схему валидации на zod

const props = defineProps<{
  state: Object
  schema: FormsCollectionItem
}>()

const componentMap: Record<string, Component> = {
  "password": UInputPassword,
}
</script>

<style scoped>

</style>