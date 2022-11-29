import { projectFirestore, timestamp, storage } from "@/firebase/config";
import router from "@/router";
import { ref, computed } from "vue";

const title = ref("");
const body = ref("");
const imgUrl = ref("");
const dropzoneFile = ref("");

const storageRef = storage.ref("images/" + dropzoneFile.value.name);

export const createList = () => {
  /*  */
  const drop = async (e) => {
    console.log(e.dataTransfer.files[0]);
    dropzoneFile.value = e.dataTransfer.files[0];
  };
  const selectedFile = () => {
    dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
  };
  /*  */
  const newList = () => {
    if (title.value !== "" && body.value !== "") {
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
      console.log("file uploaded");

      await storageRef.getDownloadURL().then((url) => {
        console.log(url);
        imgUrl.value = url;
      });
    }
    newList();
    console.log(new Date());
    /* Clear poles */
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
