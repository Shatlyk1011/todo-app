<template>
  <div class="hero-container ">
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
  name: 'HomeView',
  components: {MultipleLists},

  setup() {
  const { load, lists, error } =  getLists();

  /* Formatting time using date-fns */
  const formattedDoc = computed(() => {
    if(lists.value) {
      return lists.value.map(list => {
        let newTime = formatDistance(list.createdAt && list.createdAt.toDate(), new Date(), {locale: ru})
        console.log('toDate: функция для перевода firestore timestamp на обычное время')
        return { ...list, createdAt: newTime}
      })
    }
  })

    load();

    return {lists, error, formattedDoc}
}
}


</script>

<style lang="scss" >
  .hero-container {
    width: 40%;
    margin: 0 auto;
    padding: 1.5rem 0;
    text-align: center;

    @media(max-width: 1200px) {
      width: 50%;
    }
    @media(max-width: 950px) {
      width: 60%;
    }
    @media(max-width: 750px) {
      width: 75%;
    }
    @media(max-width: 550px) {
      width: 100%;
      padding: 1.5rem 2rem;
      
    }

  }
</style>