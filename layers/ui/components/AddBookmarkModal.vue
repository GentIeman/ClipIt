<template>
  <UModal
      title="New bookmark"
      description="Save your favorite links for quick access later">
    <UButton
        label="New"
        color="primary"
        size="md"
        leading-icon="i-lucide-plus"
        variant="solid"
    />
    <template #body>
      <DynamicForm
          v-if="form"
          class="grid gap-4 h-fit"
          :state="state"
          :validation-schema="bookmarkSchema"
          :schema="form"/>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {bookmarkSchema} from "~/layers/bookmarks/validators/bookmarkRules";

const user = useStrapiUser()

const state = reactive({
  link: "",
  user: user.value?.id
})

const {data: form} = useAsyncData("form",
    () => queryCollection('forms')
        .where("stem", "=", "forms/bookmark")
        .select("button", "fields")
        .first()
)

</script>

<style scoped>

</style>