import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddList from "../views/AddList.vue";
import EditView from "@/views/EditView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/add",
    name: "AddList",
    component: AddList,
  },
  {
    path: "/edit/:id",
    name: "EditView",
    component: EditView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
