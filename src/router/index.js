import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LaunchView/Login.vue";
import Signup from "../views/LaunchView/Signup.vue";
import ForgotPassword from "../views/LaunchView/ForgotPassword.vue";
import Home from "../views/LaunchView/Home.vue";
import About from "../views/CustomersView/About.vue";
import Clinics from "../views/CustomersView/Clinics.vue";
import Products from "../views/CustomersView/Products.vue";
import Cart from "../views/CustomersView/Cart.vue";
import Profile from "../views/CustomersView/Profile.vue";
import ClinicProducts from "../views/ClinicsView/ClinicProducts.vue";
import ClinicProfile from "../views/ClinicsView/ClinicProfile.vue";
import ClinicOrderHistory from "../views/ClinicsView/ClinicOrderHistory.vue";

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
