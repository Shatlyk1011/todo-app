<template>
  <nav class=" mx-auto flex justify-center items-center text-xl mt-6 gap-6 px-8 text-gray-500 uppercase">
    <router-link :to="{name: 'Home'}">Список</router-link>
    <router-link :to="{name: 'AddList'}">Добавить</router-link>
  </nav>
</template>

<script>
export default {
  setup () {
    

    return {}
  }
}
</script>

<style scoped>
 .router-link-active {
  @apply text-[#011627]
 }

</style>