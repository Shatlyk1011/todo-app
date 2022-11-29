<template>
  <div class="w-full py-4 px-8 flex justify-center">
    <form @submit.prevent="createList" class="flex flex-col justify-center items-start gap-4 w-1/3">
      <label for="title">Загаловок:</label>
      <input v-model.trim="title" class="w-full py-1 px-2 border border-zinc-400 outline-none" type="text" id="title" required>
      <label for="body">Описание:</label>
      <textarea  v-model.trim = "body" class="outline-none border border-zinc-400 w-full py-1 px-2 h-24" id="body"></textarea>
      <Dropzone @drop.prevent="drop" @change="selectedFile"/>
        <span class="-m-2 mx-auto">Файл: {{dropzoneFile.name}}</span>
      <button class="bg-zinc-600 px-6 py-3 rounded-full hover:bg-zinc-700 transition duration-150 text-white">Создать</button>
  </form>
</div>
</template>

<script>
import Dropzone from '@/components/Dropzone.vue'
import firebase from "firebase/app";
import { projectFirestore, timestamp } from '@/firebase/config';
import router from '@/router';
import { ref, computed } from 'vue';

export default {
  name: 'AddList',
  components: {Dropzone},
  setup () {
    const title = ref('')
    const body = ref('')
    let dropzoneFile = ref('')
  

    /* Dropzone */
    const drop = (e) => {
      console.log( e.dataTransfer.files[0])
      dropzoneFile.value = e.dataTransfer.files[0] //our dropped file (?)
    }
    const selectedFile = () => {
      dropzoneFile.value = document.querySelector('.dropzoneFile').files[0]
    }

    /* Добавить в список новую задачу */
    const createList = async () => {
      if(title.value !== '' && body.value !== '') {

        const newList = {
          title: title.value,
          body: body.value,
          createdAt: timestamp(),
          complete: false
        }
        await projectFirestore.collection('lists').add(newList)
        // Dropzone file
        const storageRef = firebase.storage().ref('images/' + dropzoneFile.value.name);
        storageRef.put(dropzoneFile.value)
        console.log('file uploaded')
        router.push({name: 'Home'})
      }
    }
 
    return {title, body, createList, dropzoneFile, drop, selectedFile}
  }
}
</script>