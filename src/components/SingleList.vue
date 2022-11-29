<template>
<div class="list-container" >
  <div class="list">
    <div class="list__title">{{list.title}}</div>
    <div class="list__body">{{list.body}}</div>
    <div class="list__created">Создано {{list.createdAt}} назад</div>
  </div>
  <!-- icons -->
  <div class="icons">
    <ion-icon @click="handleDone" class="icon" name="checkmark-done-outline"></ion-icon>
    <router-link :to="{name: 'EditView', params: {id:list.id}}">
      <ion-icon  class="icon" name="create-outline"></ion-icon>
    </router-link>
    <ion-icon @click="deleteMe"  class="icon" name="trash-outline"></ion-icon>
  </div>
</div>
<img class="img" v-show="list.imgUrl" :src="list.imgUrl" alt="Image">
<div class="error">{{error}}</div>
</template>

<script>
import { projectFirestore, } from '@/firebase/config';
import { delList } from '@/composables/deleteList'

export default {
  name: 'SingleList',
  props: ['list'],

  setup(props) {
  /* Удалить */
  const {deleteMe, error} = delList(props.list.id)

  /* Обновить задачу (done/undone) */
  const handleDone = () => { 
    projectFirestore.collection('lists').doc(props.list.id).get().then((doc) => { doc.ref.update({complete: !doc.data().complete })})
  }
    return { handleDone, deleteMe, error  }
  }

}


</script>

<style lang="scss" scoped>
.list-container {
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
  min-height: 150px;
  color: rgb(39 39 42);
  border-radius: 0.125rem;
  border-bottom: 1px solid rgb(219, 219, 219);
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  text-align: start;
  width: 100%;
  
  &__title {
  width: 100%;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
  border-bottom-width: 1px;
  border-color: rgb(63 63 70);
  }

  &__body {
  font-size: 1.25rem;
  line-height: 1.75rem;
  }

  &__created {
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(107 114 128);
  }
}

.icons {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
}

.icon {
  height: 1.8rem;
  width: 1.8rem;
  visibility: visible;
  color: black;
  cursor: pointer
}

.img {
  width: 50%;
  margin: 0 auto;
  max-height: 200px;
  background-position: center;
  object-fit: cover;
  padding-top: 10px;
}

</style>