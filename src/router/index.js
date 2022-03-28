import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LaunchView/Login.vue";
import Signup from "../views/LaunchView/Signup.vue";
import Signup1 from "../views/LaunchView/Signup1.vue";
import ForgotPassword from "../views/LaunchView/ForgotPassword.vue";
import Home from "../views/LaunchView/Home.vue";
import EditCustomerParticulars from "../views/CustomersView/EditCustomerParticulars.vue";
import EditClinicParticulars from "../views/ClinicsView/EditClinicParticulars.vue";
import About from "../views/CustomersView/About.vue";
import Clinics from "../views/CustomersView/Clinics.vue";
import Products from "../views/CustomersView/Products.vue";
import Cart from "../views/CustomersView/Cart.vue";
import Profile from "../views/CustomersView/Profile.vue";
import ClinicProducts from "../views/ClinicsView/ClinicProducts.vue";
import AddProduct from "../views/ClinicsView/AddProduct.vue";
import EditProduct from "../views/ClinicsView/EditProduct.vue";
import ClinicProfile from "../views/ClinicsView/ClinicProfile.vue";
import ClinicOrderHistory from "../views/ClinicsView/ClinicOrderHistory.vue";
import IndividualProduct from "../components/IndividualProductPage/IndividualProduct.vue";
import IndividualClinic from "../components/IndividualClinicPage/IndividualClinic.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/Signup1",
    name: "Signup1",
    component: Signup1,
  },
  {
    path: "/ForgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/EditCustomerParticulars",
    name: "EditCustomerParticulars",
    component: EditCustomerParticulars,
  },
  {
    path: "/EditClinicParticulars",
    name: "EditClinicParticulars",
    component: EditClinicParticulars,
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
  {
    path: "/Products/show/:id",
    name: "IndividualProduct",
    component: IndividualProduct,
    props: {
      myProperty: { id: String },
    },
  },
  {
    path: "/EditCustomerParticulars",
    name: "EditCustomerParticulars",
    component: EditCustomerParticulars,
  },
  {
    path: "/EditClinicParticulars",
    name: "EditClinicParticulars",
    component: EditClinicParticulars,
  },
  {
    path: "/Clinics/book/:id",
    name: "IndividualClinic",
    component: IndividualClinic,
    props: {
      myProperty: { id: String },
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
