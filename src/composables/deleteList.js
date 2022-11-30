import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const error = ref("");

export const delList = (id) => {
  const deleteMe = () => {
    try {
      projectFirestore.collection("lists").doc(id).delete();
    } catch (err) {
      error.value = "Что то пошло не так...";
    }
  };

  return { deleteMe, error };
};
