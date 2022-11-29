import { projectFirestore, storage } from "@/firebase/config";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const title = ref("");
const body = ref("");
const dropzoneFile = ref("");
const imgUrl = ref("");
const storageRef = storage.ref("images/" + dropzoneFile.value.name);

const updateList = (id) => {
  const handleUpdate = async () => {
    await storageRef.put(dropzoneFile.value);
    console.log("file uploaded", dropzoneFile);
    await storageRef.getDownloadURL().then((url) => {
      // if (dropzoneFile.value !== "") {
      console.log(url);
      imgUrl.value = url;
      // projectFirestore.collection('lists').doc(id).add()
      // } else return console.log("returned");
    });

    projectFirestore.collection("lists").doc(id).update({
      title: title.value,
      body: body.value,
      imgUrl: imgUrl,
    });
    title.value = "";
    body.value = "";
    // dropzoneFile.value = null;
    // router.push({ name: "HomeView" });
  };

  return { handleUpdate, title, body, dropzoneFile };
};

export default updateList;
