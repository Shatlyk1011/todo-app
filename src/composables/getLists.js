import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

export const getLists = () => {
  const lists = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await projectFirestore
        .collection("lists")
        .orderBy("createdAt", "desc")
        .get();
      console.log(res.docs);
      lists.value = res.docs.map((doc) => {
        console.log(doc.id);
        return { ...doc.data(), id: doc.id };
      });
    } catch {
      error.value = "Что то пошло не так, попробуйте перезагрузить страницу...";
    }
  };
  return { load, lists, error };
};

export default getLists;
