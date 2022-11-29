import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddListView from "../views/AddListView.vue";
import EditView from "@/views/EditView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/add",
    name: "AddListView",
    component: AddListView,
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
