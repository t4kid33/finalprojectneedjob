<template>
  <div class="about">
    <div>
      <span class="text middle" data-text="Post"></span>
    </div>
    <div>
      <div class="text-black">
        <h1 style="font-weight: bold">CreatePost</h1>
      </div>
      <form @submit.prevent="addData">
        <div class="card-body">
          <div class="form-floating mb-3"></div>
          <div class="form-floating mb-3">
            <input
              type="name"
              class="form-control"
              id="floatingInput"
              placeholder="jobneed"
              v-model="jobneed"
            />
            <label for="floatingInput">งานที่ต้องการ</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="detail"
              class="form-control"
              id="floatingInput"
              placeholder="detail"
              v-model="detail"
            />
            <label for="floatingInput">รายระเอียด</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="tel"
              class="form-control"
              id="floatingInput"
              placeholder="detail"
              v-model="phonenum"
            />
            <label for="floatingInput">เบอร์ติดต่อ</label>
          </div>

          <div class="d-grid gap-2 d-md-block">
            <button
              type="submit"
              class="btn btn-success"
              style="font-weight: bold"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from "../plugins/firebaseinit";
import { onAuthStateChanged } from "firebase/auth";

import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { db } from "../plugins/firebaseinit";

export default {
  data() {
    return {
      csDoc: [],
      jobneed: "",
      detail: "",
      phonenum: "",
    };
  },

  beforeMount() {
    this.readData();
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

    async addData() {
      try {
        this.csDoc = [];
        const docRef = await addDoc(collection(db, "post"), {
          jobneed: this.jobneed,
          detail: this.detail,
          phonenum: this.phonenum,
          email: this.email,
          uid: this.uid,
        });
        this.jobneed = "";
        this.detail = "";
        this.phonenum = "";
        console.log("Document", docRef.id);
        this.$router.replace("/post");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    readData() {
      this.csDoc = [];
      const q = query(collection(db, "post"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.csDoc.push({ id: doc.id, data: doc.data() });
        });
        // console.log("Current cities in CA: ", this.csDoc.join(", "));
      });
    },
  },
};
</script>
