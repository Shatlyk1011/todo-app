<template>
<div class="add">
  <form class="form" @submit.prevent="sendData" >
    <label for="title">Загаловок:</label>
    <input v-model.trim="title" type="text" id="title" required>
    <label for="body">Описание:</label>
    <textarea  v-model.trim = "body"  id="body"></textarea>
    <Dropzone @drop.prevent="drop" @change="selectedFile"/>
    <button>Создать</button>
</form>
</div>
</template>

<script>
import Dropzone from '@/components/Dropzone.vue'
import {createList} from '@/composables/createList' 


export default {
  name: 'add',
  components: {Dropzone},
  setup () {
    const { sendData, dropzoneFile, title, body, imgUrl, drop, selectedFile } = createList();



      return {sendData, dropzoneFile, title, body, imgUrl, drop, selectedFile }
   }
}

</script>

<style lang="scss" scoped>
.add {
  display: flex;
  width: 100%;
  padding: 1rem 2rem;
  justify-content: center;


  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 1rem;
    width: 33.333333%;
    text-align: left;
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

</style>