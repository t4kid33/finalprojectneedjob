<template>
  <div class="card-body">
    <h1 style="font-weight: bold">Login</h1>
    <p>
      Email:
      <input class="form-control" type="email" required v-model="email" />
    </p>

    <p>
      Password :
      <input class="form-control" type="password" required v-model="password" />
    </p>
    <button @click="login()" type="submit" class="btn btn-success">
      Login
    </button>
    <router-link class="btn btn-warning" to="/registerview"
      >Register</router-link
    >
  </div>
</template>

<script>
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../plugins/firebaseinit";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    logout() {
      //    const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-Out successful.
          this.$router.replace("/login");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },

    login() {
      //const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
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

<style>
.card-body {
  margin: auto;
  width: 600px;
  height: 400px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 20px;
  background: rgb(236, 236, 236);
}
body {
  background-color: rgb(204, 204, 204);
}
</style>
