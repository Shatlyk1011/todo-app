<template>
  <div class="container px-8 py-4 text-center w-1/3">
    <MultipleLists :lists="lists" :error="error"/>
  </div>
  
</template>

<script>
import MultipleLists from '@/components/MultipleLists.vue'
import getLists from '@/composables/getLists'

export default {
  name: 'Home',
  components: {MultipleLists},

  setup() {
    const { load, lists, error } =  getLists();

    load();

    return {lists, error}
}
}


</script>
