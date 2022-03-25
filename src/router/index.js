import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Clinics from "../views/Clinics.vue";
import Products from "../views/Products.vue";
import Cart from "../views/Cart.vue";
import Profile from "../views/Profile.vue";
import IndividualProduct from "../components/IndividualProductPage/IndividualProduct.vue"

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

  {
    path: "/Products/show/:id",
    name: 'IndividualProduct',
    component: IndividualProduct,
    props: {
      myProperty: {name: String}
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
