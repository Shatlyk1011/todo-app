<template>
  <div v-for="list in lists" :key="list.id" class="inline-block mx-auto w-full bg-zinc-100 mb-5 border-l-[6px] border-transparent" :class="{activeBorder: list.complete }" >
    <SingleList :list="list"/>
  </div>

  <router-link v-if="!lists.length" to="/add">
      <button class="px-4 py-2 rounded-full bg-zinc-600 hover:bg-zinc-700 mt-2 text-white text-xs  uppercase">Добавить список </button>
  </router-link>
  
  <div class="text-center mt-6 text-red-400 font-medium text-sm "> {{ error }}</div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import SingleList from '@/components/SingleList.vue'
import { Suspense } from 'vue';

export default {
  name: 'MultipleLists',
  props: ['lists', 'error'],
  components: { Spinner, SingleList, Suspense },
}
  
</script>

<style scoped>
.activeBorder {
  @apply bg-green-300 border-l-green-500 !important
}
</style>