<template>
  <div class="w-full py-4 px-8 flex justify-center">

<form v-if="oneList" @submit.prevent="createList" class="flex flex-col justify-center items-start gap-4 w-1/3">
  <label for="title">Загаловок:</label>
  <input :placeholder="oneList.title" v-model="title" class="w-full py-1 px-2 border border-zinc-400 outline-none" type="text" id="title" required>
  <h1>{{oneList.title}}</h1>
  <label for="body">Описание:</label>
  <textarea :placeholder="oneList.body" v-model = "body" class="outline-none border border-zinc-400 w-full py-1 px-2 h-24" id="body"></textarea>
  <button @click="handleUpdate" class="bg-zinc-600 px-6 py-3 rounded-full hover:bg-zinc-700 transition duration-150 text-white">Сохранить</button>
</form>
 <div v-else> {{error}}</div>

</div>  
</template>

<script>
import getList from '@/composables/getList'
import { projectFirestore } from '@/firebase/config';
import {useRoute, useRouter} from 'vue-router';
import {ref} from 'vue'

export default {
  name: 'EditView',
  setup () {
    const route = useRoute();
    const router = useRouter();
    const { load, oneList, error, update} =  getList(route.params.id) 
    const title = ref('')
    const body = ref('')
    load()

    // update data
    const handleUpdate = async () => {
        await projectFirestore.collection('lists').doc(route.params.id).update({title: title.value, body: body.value})     
        router.push('/')
      }
    return {oneList, error, handleUpdate, title, body}
  }
}
</script>