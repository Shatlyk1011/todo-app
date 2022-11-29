<template>
<div class=" px-6 py-3 text-zinc-800 rounded-sm flex gap-6 justify-between min-h-[150px]" >
  <div class="flex flex-col justify-start items-start gap-4 text-start w-full">
    <div class="text-2xl font-medium border-b border-zinc-700 w-full ">{{list.title}}</div>
    <div class="text-xl">{{list.body}}</div>
    <div class="text-xs  text-gray-500">Создано {{list.createdAt}} назад</div>
  </div>
  <!-- icons -->
  <div class="flex flex-col items-end justify-center m-0 p-0 gap-2 ">
    <ion-icon @click="handleDone" class="icons" name="checkmark-done-outline"></ion-icon>
    <router-link :to="{name: 'EditView', params: {id:list.id}}">
      <ion-icon  class="icons" name="create-outline"></ion-icon>
    </router-link>
    <ion-icon @click="deleteList"  class="icons" name="trash-outline"></ion-icon>
  </div>
</div>
<img v-show="list.imgUrl" class="w-1/2 mx-auto max-h-48 bg-center object-cover p-3" :src="list.imgUrl" alt="Image">
</template>

<script>
import { projectFirestore, } from '@/firebase/config';

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
  /* Обновить задачу (done/undone) */
  const handleDone = () => { 
    projectFirestore.collection('lists').doc(props.list.id).get().then((doc) => { doc.ref.update({complete: !doc.data().complete })})
  }
  
    return {deleteList, handleDone  }
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