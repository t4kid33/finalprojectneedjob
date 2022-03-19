<template>
  <div class="card-body">
    <h1 style="font-weight: bold">EditProflie</h1>
    <p>
      Email:
      <input class="form-control" type="email" required v-model="email" />
    </p>
    <button @click="updateEmail1()" type="submit" class="btn btn-success">
      UPDATE
    </button>

    <p>
      Password :
      <input
        class="form-control"
        type="password"
        required
        v-model="newPassword"
      />
    </p>
    <button @click="updatepassword1()" type="submit" class="btn btn-success">
      UPDATE
    </button>
  </div>
</template>

<script>
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../plugins/firebaseinit";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    checkLogin() {
      //const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          // ...
          this.email = user.email;
          this.uid = user.uid;
        } else {
          // User is signed out
          // ...
          alert("กรุณา Login ก่อน");
          this.$router.push("/login");
        }
      });
    },

    updateEmail1() {
      const auth = getAuth();
      updateEmail(auth.currentUser, this.email)
        .then(() => {
          console.log("Email Updated!");
          this.$router.go("/post");
          // Email updated!
          // ...
        })
        .catch((error) => {
          console.log(error);
          // An error occurred
          // ...
        });
    },
    updatepassword1() {
      const auth = getAuth();

      const user = auth.currentUser;

      updatePassword(user, this.newPassword)
        .then(() => {
          console.log("password update");
          this.$router.go("/post");
          // Update successful.
        })
        .catch((error) => {
          console.log(error);
          // An error ocurred
          // ...
        });
    },
  },
};
</script>

<style>
.container {
  border-radius: 20px;
}

button {
  margin: 5px;
}
p {
  margin: 20px;
}
</style>
