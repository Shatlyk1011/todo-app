<template>
  <div class="w-full py-4 px-8 flex justify-center">

    <form @submit.prevent="createList" class="flex flex-col justify-center items-start gap-4 w-1/3">
      <label for="title">Загаловок:</label>
      <input v-model="title" class="w-full py-1 px-2 border border-zinc-400 outline-none" type="text" id="title">
      <label for="body">Описание:</label>
      <textarea v-model = "body" class="outline-none border border-zinc-400 w-full py-1 px-2" id="body"></textarea>
      <button class="bg-zinc-600 px-6 py-3 rounded-full hover:bg-zinc-700 transition duration-150 text-white">Создать</button>
  </form>

</div>
</template>

<script>
import { projectFirestore } from '@/firebase/config';
import router from '@/router';
import { ref } from 'vue';

export default {
  setup () {
    const title = ref('')
    const body = ref('')

    const createList = async () => {
      if(title.value !== '' && body.value !== '') {

        const newList = {
          title: title.value,
          body: body.value
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