<template>
  <div class="hero-container ">
    <div v-if="formattedDoc.length">
      <transition-group tag="div" name="disper">
        <div v-for="list in formattedDoc" :key="list.id">
          <SingleList :list="list" :listError="error"/>
        </div>
      </transition-group>
      <router-link v-show="!formattedDoc.length" to="/add">
        <button class="btn">Добавить список </button>
      </router-link>
    </div>
  </div>
  
</template>

<script>
import SingleList from '@/components/SingleList.vue'
import getLists from '@/composables/getLists'
import { formatDistance, formatRelative } from 'date-fns';

import {ru} from 'date-fns/locale'

import {computed} from 'vue'

export default {
  name: 'HomeView',
  components: {SingleList},

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

.btn {
  font-size: 0.75rem;
  line-height: 1rem;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: rgb(82 82 91 );
  color: #fff;

  &:hover {
    background-color: rgb(63 63 70);
  }
}

.disper-leave-from {
  opacity: 1;
}
.disper-leave-to {
  transform: scale(0.6);
  opacity: 0;
}

.disper-leave-active {
  transition: all 0.4s ease;
}
</style>