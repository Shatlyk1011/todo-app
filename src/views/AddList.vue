<template>
<div class="w-full py-4 px-8 flex justify-center">
  <form @submit.prevent="sendData" class="flex flex-col justify-center items-start gap-4 w-1/3">
    <label for="title">Загаловок:</label>
    <input v-model.trim="title" class="w-full py-1 px-2 border border-zinc-400 outline-none" type="text" id="title" required>
    <label for="body">Описание:</label>
    <textarea  v-model.trim = "body" class="outline-none border border-zinc-400 w-full py-1 px-2 h-24" id="body"></textarea>
    <Dropzone @drop.prevent="drop" @change="selectedFile"/>
    <div class="-m-2 mx-auto">Название: {{dropzoneFile.name}}</div>
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
    const dropzoneFile = ref('')
    const imgUrl = ref('')
    /* Dropzone */
    const drop = async (e) => {
      console.log( e.dataTransfer.files[0])
      dropzoneFile.value = e.dataTransfer.files[0]
    }
    const selectedFile = () => {
      dropzoneFile.value = document.querySelector('.dropzoneFile').files[0]
    }

    const newList = async () => {
      if(title.value !== '' && body.value !== '') {
        const newList = await {
          title: title.value,
          body: body.value,
          createdAt: timestamp(),
          complete: false,
          imgUrl: imgUrl.value,
          imgName: dropzoneFile.value.name
        }
        await projectFirestore.collection('lists').add(newList)

        router.push({name: 'Home'})
      }
    }

    /* Добавить в список новую задачу */
    const sendData = async () => {
      const storage = firebase.storage();
      const storageRef = storage.ref('images/' + dropzoneFile.value.name);
      
      // Отправка фото 
      await storageRef.put(dropzoneFile.value)
      console.log('file uploaded')
      await storageRef.getDownloadURL().then((url) => {
      console.log(url)
      imgUrl.value = url
      newList()
      }
      )
    }


 
    return {title, body, sendData, dropzoneFile, selectedFile, drop}
  }
}

</script>