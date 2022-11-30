import { projectFirestore, storage } from "@/firebase/config";
import router from "@/router";
import { ref } from "vue";

const title = ref("");
const body = ref("");
const dropzoneFile = ref("");
const imgUrl = ref("");
const storageRef = storage.ref("images/" + dropzoneFile.value.name);

/* Обновить лист */
const updateList = (id) => {
  const handleUpdate = async () => {
    if (dropzoneFile.value !== "") {
      // Обновить фото
      await storageRef.put(dropzoneFile.value);
      //Обновить url
      await storageRef.getDownloadURL().then((url) => {
        imgUrl.value = url;
      });
    }

    projectFirestore.collection("lists").doc(id).update({
      title: title.value,
      body: body.value,
      imgUrl: imgUrl.value,
    });
    // Очистить поля
    router.push({ name: "HomeView", params: id });
    title.value = "";
    body.value = "";
    dropzoneFile.value = "";
  };

  return { handleUpdate, title, body, dropzoneFile, imgUrl };
};

export default updateList;
