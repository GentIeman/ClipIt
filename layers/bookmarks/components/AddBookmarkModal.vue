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
      <div class="grid gap-3">
        <LinkPreview
            v-if="preview"
            :preview="preview"/>
        <DynamicForm
            v-if="form"
            class="grid gap-4 h-fit"
            :state="state"
            :validation-schema="bookmarkSchema"
            :schema="form"/>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {bookmarkSchema} from "~/layers/bookmarks/validators/bookmarkRules";
import {useLinkPreview} from "~/layers/bookmarks/composables/useLinkPreview";

const user = useStrapiUser()

const state = shallowReactive({
  link: "",
  user: user.value?.id
})

const {data: form} = useAsyncData("bookmarkForm",
    () => queryCollection('forms')
        .where("stem", "=", "forms/bookmark")
        .select("button", "fields")
        .first()
)

const {preview, fetchPreview, reset} = useLinkPreview()

watch(() => state.link, (link) => {
  if (link.length < 1) reset()
  fetchPreview(link)
})
</script>

<style scoped>

</style>