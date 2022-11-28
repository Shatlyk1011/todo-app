import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const getLists = () => {
  const lists = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      await projectFirestore
        .collection("lists")
        .orderBy("createdAt", "desc")
        .onSnapshot((snap) => {
          console.log("snapshot");
          let list = snap.docs.map((doc) => {
            console.log(doc.data());
            return doc.data() && { ...doc.data(), id: doc.id };
          });
          lists.value = list;
        });
    } catch {
      error.value = "Что то пошло не так, попробуйте перезагрузить страницу...";
    }
  };
  return { load, lists, error };
};

export default getLists;
