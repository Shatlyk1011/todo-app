import { ref } from "vue";

const dropzoneFile = ref();

export const drop = async (e) => {
  console.log(e.dataTransfer.files[0]);
  dropzoneFile.value = e.dataTransfer.files[0];
};
export const selectedFile = () => {
  dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
};
