import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Clinics from "../views/Clinics.vue";
import Products from "../views/Products.vue";
import Cart from "../views/Cart.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "About",
    component: About,
  },
  {
    path: "/Clinics",
    name: "Clinics",
    component: Clinics,
  },
  {
    path: "/Products",
    name: "Products",
    component: Products,
  },
  {
    path: "/Cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
