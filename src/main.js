import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebaseApp from "./firebase.js";
import { getFirestore } from "firebase/firestore";
import mitt from "mitt";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const emitter = mitt();
const app = createApp(App);

app.config.globalProperties.emitter = emitter;
app.use(store).use(router).use(ElementPlus).use(VueChartkick).mount("#app");
const db = getFirestore(firebaseApp);
export default db;
