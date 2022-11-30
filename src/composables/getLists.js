import { ref, watchEffect } from "vue";
import { projectFirestore } from "@/firebase/config";

/* Получить список листов */
const getLists = () => {
  const lists = ref([]);
  const error = ref(null);

  const load = () => {
    const collectionRef = projectFirestore
      .collection("lists")
      .orderBy("createdAt", "desc");
    const unsub = collectionRef.onSnapshot((snap) => {
      let list = [];
      snap.docs.map((doc) => {
        doc.data().createdAt && list.push({ ...doc.data(), id: doc.id });
      });
      lists.value = list;
    });
    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub);
    });
  };

  return { load, lists, error };
};

export default getLists;
