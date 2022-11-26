<template>
  <div v-if="lists.length" class="inline-block mx-auto">
    <div  v-for="list in lists" :key="list.id" class="px-8 py-4  bg-zinc-300 text-zinc-800 rounded-sm flex gap-6" :class="{bgColor: active }">
      <div class="flex flex-col justify-center items-start  ">
        <div class="text-lg font-medium">{{list.title}}</div>
        <div>{{list.body}}</div>
      </div>

      <!-- icons -->
      <div class="flex items-end justify-center m-0 p-0 gap-1 ">
        <!-- install ionicon 5 -->
        <ion-icon @click="handleClick" class="icons" :class="{iconColor: active }"  name="checkmark-done-outline"></ion-icon>
        <ion-icon  class="icons" name="create-outline"></ion-icon>
        <ion-icon  class="icons" name="trash-outline"></ion-icon>
        
      </div>
      
    </div>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import {ref} from 'vue';

export default {
  name: 'SingleProject',
  props: ['lists'],
  components: {Spinner},

  setup() {
    const active = ref(false)

    const handleClick = (() => {
      active.value = !active.value
    })

    return {active, handleClick}
  }

}
  
</script>

<style>
.icons {
  height: 1.2rem;
  width: 1.2rem;
  /* visibility: visible; */
  color: black;
  
}

.iconColor {
  color: red;
  /* visibility: visible; */
}

.bgColor {
  background-color: #70e000;
  color: white;
}
</style>