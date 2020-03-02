import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";

//local Components
import Login from "@/views/Login.vue";
import ProjectsTable from "@/views/projects/ProjectsTable.vue";
import ProjectCreate from "@/views/projects/Create.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsTable
  },
  {
    path: "/projects/create",
    name: "ProjectCreate",
    component: ProjectCreate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
