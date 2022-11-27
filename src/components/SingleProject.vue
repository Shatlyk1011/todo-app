<template>
  <div v-if="lists.length" class="inline-block mx-auto">
    <div  v-for="list in lists" :key="list.id" class="px-8 py-4  bg-zinc-300 text-zinc-800 rounded-sm flex gap-6 justify-between mb-5" :class="{bgColor: active }">
      <div class="flex flex-col justify-center items-start  ">
        <div class="text-lg font-medium">{{list.title}}</div>
        <div>{{list.body}}</div>
      </div>

      <!-- icons -->
      <div class="flex flex-col items-end justify-center m-0 p-0 gap-2 ">
        <!-- install ionicon 5 -->
        <ion-icon class="icons" :class="{iconColor: list.complete }"  name="checkmark-done-outline"></ion-icon>
        <router-link :to="{name: 'EditView', params: {id:list.id}}">
          <ion-icon  class="icons" name="create-outline"></ion-icon>
        </router-link>
        <ion-icon  class="icons" name="trash-outline"></ion-icon>
        
      </div>
    </div>
  </div>
  <Spinner v-else/>
  <div v-if="!lists.length">
    <router-link to="/add">
      <button class="px-4 py-2 rounded-full bg-zinc-600 hover:bg-zinc-700 mt-2 text-white text-xs  uppercase">Добавить список </button>
    </router-link>
  </div>

  <div class=" text-center mt-6 text-red-400 font-medium text-sm "> {{ error }}</div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import {ref} from 'vue';

import { projectFirestore } from '@/firebase/config';

export default {
  name: 'SingleProject',
  props: ['lists', 'error'],
  components: {Spinner},

  setup() {
    
    /* ?? */
    
/*     const handleClick = ( async() => {
      const list = await projectFirestore.collection('lists').doc(route.params.id).get();
      console.log(list)
      list.data((e) => {
        if(e.complete === false) {
          return true
        } else 
        return false;
      })
    }) */

        /* Удалить из списка  */
        const deleteList = async () => {

}

    return { }
  }

}
  
</script>

<style>
.icons {
  height: 1.4rem;
  width: 1.4rem;
  visibility: visible;
  color: black;
  
}

.iconColor {
  color: red;
  visibility: visible;
}

.bgColor {
  background-color: #70e000;
  color: white;
}
</style>