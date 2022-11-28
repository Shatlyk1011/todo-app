<template>

<div class="flex flex-col justify-start items-start gap-4 text-start">
  <div class="text-2xl font-medium border-b border-zinc-700 w-full ">{{list.title}}</div>
  <div class="text-xl">{{list.body}}</div>
  <div class="flex gap-4 mt-8">
    <div class="bg-zinc-200 px-2 py-1 rounded-sm " :class="{activeColor: list.complete}" v-for="file in list.files">
      {{file}}
    </div>
  </div>
</div>
<!-- icons -->
<div class="flex flex-col items-end justify-center m-0 p-0 gap-2 ">
  <ion-icon @click="handleDone" class="icons" name="checkmark-done-outline"></ion-icon>
  <router-link :to="{name: 'EditView', params: {id:list.id}}">
    <ion-icon  class="icons" name="create-outline"></ion-icon>
  </router-link>
  <ion-icon @click="deleteList"  class="icons" name="trash-outline"></ion-icon>
</div>
</template>

<script>
import { projectFirestore } from '@/firebase/config';
import {ref} from 'vue'
export default {
  name: 'SingleList',
  props: ['list'],

  setup(props) {
  /* Удалить из списка  */
  const deleteList = async () => {
    try {
      await projectFirestore.collection('lists').doc(props.list.id).delete()
    } catch(err) {
      console.log(err)
    }
  }
  /* Задача выполнена */
  const handleDone = () => { 
    projectFirestore.collection('lists').doc(props.list.id).get().then((doc) => { doc.ref.update({complete: !doc.data().complete }).then(console.log(doc.data()))})
  }
    return {deleteList, handleDone }
  }

}


</script>

<style scoped>
.icons {
  height: 1.8rem;
  width: 1.8rem;
  visibility: visible;
  color: black;
  cursor: pointer
}

.activeColor {
  @apply bg-green-400
}


</style>