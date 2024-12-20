import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./css/bootstrap-reboot.min.css";
import "./css/bootstrap-grid.min.css";

createApp(App).use(router).mount("#app");
