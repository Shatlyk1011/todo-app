<template>

<div class="flex flex-col justify-start items-start gap-4 text-start w-full">
  <div class="text-2xl font-medium border-b border-zinc-700 w-full ">{{list.title}}</div>
  <div class="text-xl">{{list.body}}</div>
  <div class="text-xs font-medium text-black w-1/2">Создано {{list.createdAt}} назад</div>
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

import { projectFirestore, firebase } from '@/firebase/config';

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
    projectFirestore.collection('lists').doc(props.list.id).get().then((doc) => { doc.ref.update({complete: !doc.data().complete })})
  }
/* .... */
  const imgArr = []
  const storageRef = firebase.storage().ref();
  const forestRef = storageRef.child('images/Screenshot_2222.png')
  forestRef.listAll().then((res)=> {
    res.items.forEach((itemRef) => {
      console.log(itemRef.location.bucket + '/Screenshot_2222.png')
    })
  })
  /* .... */

  
    return {deleteList, handleDone, imgArr  }
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