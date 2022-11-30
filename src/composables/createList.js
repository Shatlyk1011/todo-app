import { projectFirestore, timestamp, storage } from "@/firebase/config";
import router from "@/router";
import { ref } from "vue";

const title = ref("");
const body = ref("");
const imgUrl = ref("");
const dropzoneFile = ref("");

const storageRef = storage.ref("images/" + dropzoneFile.value.name);

export const createList = () => {
  /* Dropzone файлы  */
  const drop = async (e) => {
    dropzoneFile.value = e.dataTransfer.files[0];
  };
  const selectedFile = () => {
    dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
  };

  /* Объект нового листа */
  const newList = () => {
    if (title.value !== "") {
      const newList = {
        title: title.value,
        body: body.value,
        createdAt: timestamp(),
        complete: false,
        imgUrl: imgUrl.value || "",
      };
      projectFirestore.collection("lists").add(newList);
      router.push({ name: "HomeView" });
    }
  };

  /* Добавить в список новую задачу */
  const sendData = async () => {
    // Отправка фото
    if (dropzoneFile.value !== "") {
      await storageRef.put(dropzoneFile.value);
      console.log("Загружено");

      await storageRef.getDownloadURL().then((url) => {
        imgUrl.value = url;
      });
    }
    newList();
    // Очистить поля
    title.value = "";
    body.value = "";
    dropzoneFile.value = "";
  };
  return {
    sendData,
    dropzoneFile,
    title,
    body,
    imgUrl,
    drop,
    selectedFile,
  };
};
