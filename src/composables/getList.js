import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const getList = (id) => {
  const listCollection = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let response = await projectFirestore.collection("lists").doc(id).get();
      if (!response.exists) {
        throw Error("Такого списка не существует");
      }
      listCollection.value = { ...response.data(), id: response.id };
    } catch (err) {
      error.value = err.message;
    }
  };
  return { load, listCollection, error };
};

export default getList;
