import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const getList = (id) => {
  const oneList = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let response = await projectFirestore.collection("lists").doc(id).get();
      if (!response.exists) {
        throw Error("Такого списка не существует");
      }
      oneList.value = { ...response.data(), id: response.id };
    } catch (err) {
      console.log(err);
    }
  };
  return { load, oneList, error };
};

export default getList;
