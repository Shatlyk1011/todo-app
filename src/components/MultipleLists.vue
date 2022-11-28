<template>
  <div  class="inline-block mx-auto w-full">
    <div v-if="lists.length" v-for="list in lists" :key="list.id" class="px-6 py-3 bg-zinc-100 text-zinc-800 rounded-sm flex gap-6 justify-between mb-5 border-l-[6px] border-transparent" :class="{activeColor: list.complete }">
    <SingleList :list="list"/>
  </div>
  <div v-else>
    <router-link  to="/add">
      <button class="px-4 py-2 rounded-full bg-zinc-600 hover:bg-zinc-700 mt-2 text-white text-xs  uppercase">Добавить список </button>
    </router-link>
  </div>
</div>
  
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
.activeColor {
  @apply bg-green-300 border-l-green-500 !important
}
</style>