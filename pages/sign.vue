<template>
  <UContainer class="flex justify-center items-center h-dvh">
    <p class="flex flex-col p-8 items-center lg:justify-center absolute text-[30px] lg:text-[250px] text-neutral-800 select-none h-dvh">
      POCKET<span class="underline decoration-primary-500">ALTERNATIVE</span>
    </p>
    <UContainer class="grid gap-4 p-10 w-lg h-fit rounded-xl border border-neutral-700 backdrop-blur-md">
      <DynamicForm
          v-if="form"
          :state="state"
          :schema="form"
          class="grid gap-4 h-fit"
          :validation-schema="validationSchema"/>
      <UContainer class="lg:px-0">
        <USeparator label="or"/>
        {{ isSignIn ? "I don't have an": "I have an" }}
        <UButton
            to="#"
            class="px-0 text-md"
            variant="link"
            label="account"
            color="primary"
            @click="isSignIn = !isSignIn"/>
      </UContainer>
    </UContainer>
  </UContainer>
</template>

<script setup lang="ts">
import {signInSchema, signUpSchema} from "#layers/form/validators/authRules";

const isSignIn = ref<boolean>(true)
const {data: form, refresh} = useAsyncData("form",
    () => queryCollection('forms')
        .where("stem", "=", `forms/${isSignIn.value ? "signIn" : "signUp"}`)
        .select("button", "fields", "legend")
        .first()
)
watch(isSignIn, () => refresh())

const state = reactive({
  email: "",
  password: "",
  username: "",
})

const validationSchema = computed(() => isSignIn.value ? signInSchema : signUpSchema)
</script>

<style scoped>

</style>