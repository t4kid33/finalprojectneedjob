<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link
      style="font-size: 35px; font-weight: bold"
      class="btn"
      to="/post"
      >หางาน</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link style="font-weight: bold" class="btn" to="/post"
            >POST</router-link
          >
        </li>
        <li class="nav-item active">
          <router-link style="font-weight: bold" class="btn" to="/createPost"
            >CreatePost</router-link
          >
        </li>
      </ul>
    </div>

    <div v-if="email" style="font-weight: bold">
      Email: {{ email }}
      <router-link style="font-weight: bold" class="btn" to="/editProfile"
        >EditProfile</router-link
      >
      <button @click="logout()" class="btn" style="font-weight: bold">
        Logout
      </button>
    </div>
    <div v-else>
      <router-link style="font-weight: bold" class="btn" to="/login"
        >Login</router-link
      >
      <router-link style="font-weight: bold" class="btn" to="/registerview"
        >Register</router-link
      >
    </div>
  </nav>
</template>

<script>
import { auth } from "../plugins/firebaseinit";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  beforeMount() {
    this.readData();
  },
  data() {
    return {
      csDoc: [],
      email: "",
      uid: "",
    };
  },

  mounted() {
    this.checkLogin();
  },

  methods: {
    logout() {
      //    const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-Out successful.
          this.$router.replace("/login");
          this.$router.go();
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    checkLogin() {
      //const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid);
          // ...
          this.email = user.email;
          this.uid = user.uid;
        }
      });
    },
  },
};
</script>

<style></style>
