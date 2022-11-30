<template>
  <div @dragenter.prevent="toggleActive" 
      @dragleave.prevent="toggleActive" 
      @drop.prevent="toggleActive"
      @dragover.prevent
      :class="{'activeDropzone': active}"
      class="dropzone">
    <span>Перетащите</span>
    <span>или</span>
    <label for="dropzoneFile">Выберите фото</label>
    <input type="file" id="dropzoneFile" class="dropzoneFile" accept="image/*">
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  setup () {
    const active = ref(false)

    const toggleActive = () => {
      active.value = !active.value
    }
    return {active, toggleActive}
  }
}
</script>

<style lang="scss" scoped>
.dropzone {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed rgb(113, 113, 122);
  background-color: #fff;
  transition: all 0.3s ease;

  label {
    font-size: 12px;
    padding: 10px 18px;
    color: #fff;
    background-color:rgb(113, 113, 122);
    transition: all 0.3s ease;
    border-radius: 1000px;

    &:hover {
      background-color: rgb(82,82,91)
    }
    
  }
  input {
    display: none;
  }
}

.activeDropzone {
  color: #fff;
  background-color: rgb(113, 113, 122);

  label {
    background-color: #fff;
    color: rgb(113, 113, 122);
  }
}

</style>