import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebaseApp from "./firebase.js";
import { getFirestore } from "firebase/firestore";
import mitt from "mitt";

const emitter = mitt();
const app = createApp(App);

app.config.globalProperties.emitter = emitter;
app.use(store).use(router).mount("#app");
getFirestore(firebaseApp);
