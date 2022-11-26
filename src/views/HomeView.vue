<template>
  <div class="container px-8 py-4 text-center">
    <SingleProject :lists="lists"/>
  </div>
</template>

<script>
import SingleProject from '@/components/SingleProject.vue'
import getLists from '@/composables/getLists'

export default {
  name: 'Home',
  components: {SingleProject},

  setup() {
    const { load, lists } = getLists();

    load();

    return {lists}
}
}


</script>
