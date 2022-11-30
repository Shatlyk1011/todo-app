import { projectFirestore, storage } from "@/firebase/config";
import router from "@/router";
import { ref } from "vue";

const title = ref("");
const body = ref("");
const dropzoneFile = ref("");
const imgUrl = ref("");
const storageRef = storage.ref("images/" + dropzoneFile.value.name);

const updateList = (id) => {
  const handleUpdate = async () => {
    if (dropzoneFile.value !== "") {
      await storageRef.put(dropzoneFile.value);

      await storageRef.getDownloadURL().then((url) => {
        imgUrl.value = url;
      });
    }

    projectFirestore.collection("lists").doc(id).update({
      title: title.value,
      body: body.value,
      imgUrl: imgUrl.value,
    });
    title.value = "";
    body.value = "";
    dropzoneFile.value = "";
    router.push({ name: "HomeView", params: id });
  };

  return { handleUpdate, title, body, dropzoneFile, imgUrl };
};

export default updateList;
