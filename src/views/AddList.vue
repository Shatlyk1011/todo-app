<template>
  <div class="w-full py-4 px-8 flex justify-center">
    <form @submit.prevent="createList" class="flex flex-col justify-center items-start gap-4 w-1/3">
      <label for="title">Загаловок:</label>
      <input v-model.trim="title" class="w-full py-1 px-2 border border-zinc-400 outline-none" type="text" id="title" minlength="3" required>
      <label for="body">Описание:</label>
      <textarea minlength="5" v-model.trim = "body" class="outline-none border border-zinc-400 w-full py-1 px-2 h-24" id="body"></textarea>
      <label for="files">Файлы (нажмите enter чтобы добавить)</label>
      <input v-model="file" @keydown.enter.prevent="handleFiles" type="text" id="files" class="w-full py-1 px-2 border border-zinc-400 outline-none">
      <div class="flex gap-2 w-full flex-wrap" >
        <div class="bg-zinc-500 px-2 py-1 rounded-md text-white flex items-center gap-2" v-for="file in files" :key="file">
          <ion-icon name="contrast-outline"></ion-icon>{{file}}
        </div>
      </div>
      <button class="bg-zinc-600 px-6 py-3 rounded-full hover:bg-zinc-700 transition duration-150 text-white">Создать</button>
  </form>
</div>
</template>

<script>
import { projectFirestore, timestamp } from '@/firebase/config';
import router from '@/router';
import { ref } from 'vue';

export default {
  setup () {
    const title = ref('')
    const body = ref('')
    const file = ref('')
    const files = ref([])
    
    const handleFiles = () => {
      if(!files.value.includes(file.value) && file.value !== ' ' ) {
        file.value = file.value.trim();
        files.value.push(file.value)
      }
      file.value = ''
    }

    /* Добавить в список новую задачу */
    const createList = async () => {
      if(title.value !== '' && body.value !== '') {

        const newList = {
          title: title.value,
          body: body.value,
          files: files.value,
          createdAt: timestamp(),
          complete: false
        }
         await projectFirestore.collection('lists').add(newList)
        router.push({name: 'Home'})
      }
    }
 
    return {title, body, createList, handleFiles, file, files}
  }
}
</script>