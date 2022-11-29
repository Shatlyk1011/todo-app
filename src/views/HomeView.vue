<template>
  <div class="container px-8 py-4 text-center w-1/3">
    <MultipleLists :lists="formattedDoc" :error="error"/>
  </div>
  
</template>

<script>
import MultipleLists from '@/components/MultipleLists.vue'
import getLists from '@/composables/getLists'
import { formatDistance } from 'date-fns';
import {ru} from 'date-fns/locale'

import {computed} from 'vue'

export default {
  name: 'Home',
  components: {MultipleLists},

  setup() {
    const { load, lists, error } =  getLists();

    /* Formatting time using date-fns */
    const formattedDoc = computed(() => {
      if(lists.value) {
        return lists.value.map(list => {
          let newTime = formatDistance(list.createdAt.toDate(), new Date(), {locale: ru})
          return { ...list, createdAt: newTime}
        })
      }
  })

    load();

    return {lists, error, formattedDoc}
}
}


</script>
