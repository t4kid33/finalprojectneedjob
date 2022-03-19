<template>
  <div class="card-body">
    <h1 style="font-weight: bold">Register</h1>
    <p>
      Email:
      <input class="form-control" type="email" required v-model="email" />
    </p>
    <p>
      Password :
      <input class="form-control" type="password" required v-model="password" />
    </p>
    <button class="btn btn-warning" @click="register()">Register</button>
    <router-link class="btn btn-success" to="/login">Login</router-link>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../plugins/firebaseinit";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      //const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User = " + user);
          // ...
          this.$router.replace("/post");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    },
  },
};
</script>

<style></style>
