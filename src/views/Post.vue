<template>
  <div class="about">
    <div>
      <span class="text middle"></span>
    </div>
    <div class="">
      <div class="text-black"><h1 style="font-weight: bold">Post</h1></div>
      <div class="align-self-start mr-auto" align="left">
        <router-link
          type="button"
          class="btn btn-primary"
          to="/CreatePost"
          style="font-size: 20px; font-weight: bold"
        >
          Create Post
        </router-link>
      </div>
      <div class="">
        <table class="table-bordered table table-striped table-hover">
          <thead>
            <tr class="bg-secondary" style="font-size: 20px">
              <th scope="col">งานที่ต้องการ</th>
              <th scope="col">รายระเอียด</th>
              <th scope="col">เบอร์ติดต่อ</th>
              <th scope="col">Post By</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in csDoc" :key="index" align="center">
              <td>{{ i.data.jobneed }}</td>
              <td>{{ i.data.detail }}</td>
              <td>{{ i.data.phonenum }}</td>
              <td>{{ i.data.email }}</td>
              <div v-if="email == i.data.email">
                <button class="btn btn-danger" @click="Del(i.id)">x</button>
              </div>

              <div v-else-if="email == 'admintest@admintest.com'">
                <button class="btn btn-danger" @click="Del(i.id)">x</button>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../plugins/firebaseinit";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../plugins/firebaseinit";
import {} from "../plugins/firebaseinit";

export default {
  beforeMount() {
    this.readData();
  },
  data() {
    return {
      csDoc: [],
      jobneed: "",
      detail: "",
      phonenum: "",
      email: "",
      uid: "",
    };
  },

  mounted() {
    this.checkLogin();
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
    async Del(id) {
      console.log("delete " + id);
      await deleteDoc(doc(db, "post", id));
      this.$router.go("/post");
    },

    readData() {
      this.csDoc = [];
      const q = query(collection(db, "post"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.csDoc.push({ id: doc.id, data: doc.data() });
        });
      });
    },
  },
};
</script>
