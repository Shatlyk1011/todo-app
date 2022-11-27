<template>
  <div class="w-full py-4 px-8 flex justify-center">

    <form @submit.prevent="createList" class="flex flex-col justify-center items-start gap-4 w-1/3">
      <label for="title">Загаловок:</label>
      <input v-model.trim="title" class="w-full py-1 px-2 border border-zinc-400 outline-none" type="text" id="title" minlength="3" required>
      <label for="body">Описание:</label>
      <textarea minlength="5" v-model.trim = "body" class="outline-none border border-zinc-400 w-full py-1 px-2" id="body"></textarea>
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
    
    /* Добавить в список */
    const createList = async () => {
      if(title.value !== '' && body.value !== '') {

        const newList = {
          title: title.value,
          body: body.value,
          createdAt: timestamp(),
          complete: false
        }
         await projectFirestore.collection('lists').add(newList)
        router.push({name: 'Home'})
      }
    }


    return {title, body, createList}
  }
}
</script>

<style lang="scss" scoped>

</style>