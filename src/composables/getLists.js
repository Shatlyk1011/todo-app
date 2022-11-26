import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

export const getLists = () => {
  const lists = ref([]);

  const load = async () => {
    try {
      const res = await projectFirestore.collection("lists").get();
      console.log(res.docs);
      lists.value = res.docs.map((doc) => {
        console.log(doc.data());
        return { ...doc.data(), id: doc.id };
      });
    } catch (err) {
      console.log(err);
    }
  };
  return { load, lists };
};

export default getLists;
