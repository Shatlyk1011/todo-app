<template>
<div class="edit" >
  <form class="form" v-if="listCollection" @submit.prevent="createList" >
    <label for="title">Загаловок:</label>
    <input :placeholder="listCollection.title" v-model="title" type="text" id="title" required>
    <h1>{{listCollection.title}}</h1>
    <label for="body">Описание:</label>
    <textarea :placeholder="listCollection.body" v-model = "body" id="body"></textarea>
    
    <Dropzone @drop.prevent="drop" @change="selectedFile"/>
    <div class="dropzone-sub">Для изменения фото выберите новое </div>
    
    <button @click="handleUpdate">Сохранить</button>
  </form>
  <div v-else class="error"> {{error}}</div>
</div>  
</template>

<script>
import Dropzone from '@/components/Dropzone.vue'
import getList from '@/composables/getList'
import editList from '@/composables/editList'

import {useRoute} from 'vue-router';
import {onMounted} from 'vue'
import { projectFirestore } from "@/firebase/config";

export default {
  name: 'EditView',

  components: {Dropzone},
  setup () {
    const route = useRoute();
    const { load, listCollection, error} =  getList(route.params.id) 
    const {handleUpdate, title, body, dropzoneFile, imgUrl} = editList(route.params.id)
    load()
    
    onMounted(async () => {
      const res = await projectFirestore.collection("lists").doc(route.params.id).get();
      title.value = res.data().title;
      body.value = res.data().body;
      imgUrl.value = res.data().imgUrl;
  });

    const drop = async (e) => {
      dropzoneFile.value = e.dataTransfer.files[0]
    }
    const selectedFile = () => {
      dropzoneFile.value = document.querySelector('.dropzoneFile').files[0]
    }

    return {listCollection, error, handleUpdate, title, body, drop, selectedFile, imgUrl}
  }
}
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem 2rem;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    width: 33.333333%;
  }

  input, textarea {
    width: 100%;
    padding: 5px 10px;
    border: 1px solid rgb(161 161 170);
    outline: none;
  }

  textarea {
    height: 6rem;
  }

  button {
    background-color: rgb(82 82 91);
    padding: 12px 1.5rem;
    border-radius: 9999px;
    transition: all 0.15s;
    color: #fff;

    &:hover {
      background-color: rgb(63 63 70)
    }
  }
}

.dropzone-sub {
  margin: 0 auto;
  margin-top: -0.5rem;
}
</style>