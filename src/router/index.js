import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Clinics from "../views/Clinics.vue";
import Products from "../views/Products.vue";
import Cart from "../views/Cart.vue";
import Profile from "../views/Profile.vue";
import ClinicProducts from "../views/ClinicProducts.vue";
import AddProduct from "../views/ClinicsView/AddProduct.vue";
import EditProduct from "../views/ClinicsView/EditProduct.vue";
import ClinicProfile from "../views/ClinicProfile.vue";
import ClinicOrderHistory from "../views/ClinicOrderHistory.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Login/:id",
    name: "Login",
    component: Login,
  },
  {
    path: "/Signup/:id",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/ForgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/About",
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
    path: "/ClinicProfile",
    name: "ClinicProfile",
    component: ClinicProfile,
  },
  {
    path: "/ClinicProducts",
    name: "ClinicProducts",
    component: ClinicProducts,
  },
  {
    path: "/AddProduct",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/EditProduct",
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/ClinicOrderHistory",
    name: "ClinicOrderHistory",
    component: ClinicOrderHistory,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
