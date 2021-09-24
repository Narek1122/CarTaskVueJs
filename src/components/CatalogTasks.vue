<template>
<div class="container">
  <div class="card" >
    <div v-if="data.task_images.length > 0" class="div1">
      <button class="btn1 btn text-primary" @click="imagedown(data.task_images.length)">Preview</button>
      <img :src="this.checkPicture(data.task_images[image].picture)" alt="" class="avatar" >
      <button class="btn2 btn text-primary" @click="imageup(data.task_images.length)">Next</button>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{data.brand}}</h5>
      <p class="card-text">{{data.model}}</p>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "CatalogTasks",
  data() {
    return {
      key: 'value',
      image:0
    }
  },
  props: {
    data: {
      type: Object, default: () => {
      }
    }
  },
  methods:{
    checkPicture(img){
      return process.env.SERVER_URL + 'get_image/' + img
    },

    imageup(x) {
      this.image++
      if (this.image == x) {
        this.image = 0
      }
    },
    imagedown(x) {
      if (this.image == 0) {
        this.image = x
      }
      this.image = this.image - 1
    },
  }
}
</script>

<style scoped>
img {
  float: left;
  width:  100%;
  height: 200px;
  object-fit: cover;
}

.div1{
  position: relative;
}

.btn1{
  position: absolute;
  top: 50%;
}

.btn2{
  position: absolute;
  top: 50%;
  right: 0;
}
</style>
