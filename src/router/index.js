import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import CreatePost from "../views/CreatePost.vue";
import Post from "../views/Post.vue";
import EditProfile from "../views/EditProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/RegisterView",
    name: "RegisterView",
    component: RegisterView,
  },
  {
    path: "/CreatePost",
    name: "CreatePost",
    component: CreatePost,
  },
  {
    path: "/Post",
    name: "Post",
    component: Post,
  },
  {
    path: "/EditProfile",
    name: "EditProfile",
    component: EditProfile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
