<template>
  <div class="container px-8 py-4 text-center w-1/3">
    <SingleProject :lists="lists" :error="error"/>
  </div>
  
</template>

<script>
import SingleProject from '@/components/SingleProject.vue'
import getLists from '@/composables/getLists'

export default {
  name: 'Home',
  components: {SingleProject},

  setup() {
    const { load, lists, error } = getLists();

    load();

    return {lists, error}
}
}


</script>
