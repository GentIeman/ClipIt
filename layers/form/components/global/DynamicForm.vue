<template>
  <UForm
      novalidate
      :state="localState"
      :schema="validationSchema">
    <ULegend
        :text="schema.legend"
        class="block text-center text-xl font-bold"/>
    <UFormField
        v-for="(field, index) of schema.fields"
        :key="index"
        :name="field.name"
        :label="field.label"
        :required="field.required"
    >
      <Component
          :is="componentMap[field.name] ?? UInput"
          v-model="localState[field.name]"
          v-bind="field"
          class="w-full"/>
    </UFormField>
    <UButton
        v-bind="schema.button"
        class="h-fit"/>
  </UForm>
</template>

<script setup lang="ts">
import ULegend from "~/layers/form/components/ULegend.vue";
import UInputPassword from "~/layers/form/components/UInputPassword.vue";
import {UInput} from "#components";
import type {FormsCollectionItem} from "@nuxt/content";

const props = defineProps<{
  state: Record<string, string | undefined | null | number>
  schema: Pick<FormsCollectionItem, "button" | "fields" | "legend">
  validationSchema: object
}>()

const localState = reactive(props.state)

const componentMap: Record<string, Component> = {
  "password": UInputPassword,
}
</script>