<template>
  <header>
    <UContainer class="flex items-center py-4">
      <UButton
          variant="link"
          label="Clip It"
          size="xl"
          @click="$router.push('/')"/>
      <UContainer class="flex items-center px-0">
        <UNavigationMenu
            :items="navigationMenuItems"
            class="w-full justify-center"/>
        <UButton
            label="New Bookmark"
            color="primary"
            class="hidden lg:inline-flex"
            size="md"
            leading-icon="i-lucide-plus"
            variant="solid"
        />
      </UContainer>
      <UDropdownMenu
          :items="dropDownMenuItems"
      >
        <UButton
            :avatar="{
                src: 'https://github.com/nuxt.png'
            }"
            size="md"
            color="neutral"
            variant="outline"
        />
      </UDropdownMenu>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import type {DropdownMenuItem, NavigationMenuItem} from '@nuxt/ui'

const navigationMenuItems = ref<NavigationMenuItem[]>([
  {
    label: 'Bookmarks',
    icon: 'i-lucide-bookmark',
    to: '/bookmarks',
  },
  {
    label: 'Collections',
    icon: 'i-lucide-folders',
  },
])

const dropDownMenuItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
    }
  ]
])
</script>

<style scoped>

</style>