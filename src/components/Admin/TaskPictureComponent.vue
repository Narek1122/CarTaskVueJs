<template>
<div >
    <div class="div1">
      <img :src="this.checkPicture(images.picture)" alt="" class="avatar" width="300px">
      <button class="btn btn-warning" @click="deletes(images)">Delete</button>
    </div>


</div>
</template>

<script>
export default {
  name: "TaskPictureComponent",
  data() {
    return {
      token:''
    }
  },
  mounted() {
    this.getToken()
  },
  props: {
    images: {
      type: Object, default: () => {
      }
    }
  },
  methods:{
    getToken(){
      this.token = localStorage.getItem('admin_token')
    },
    checkPicture(img){
      return process.env.SERVER_URL + 'get_image/' + img
    },

    deletes(img){
      let data = {
        token: this.token,
        image: img
      }
      this.$store.dispatch('deletesTaskImage',data)
    },

  }

}
</script>

<style scoped>
.div1{
  position: relative;
}

button{
  position: absolute;
  top: 0;
  right: 0;
}
</style>
