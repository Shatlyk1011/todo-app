import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddList from "../views/AddList.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
