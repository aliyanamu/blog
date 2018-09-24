<template>
  <div class="home">
    <myleft-menu class="col-4 col-md-4 col-lg-4 col-xl-4 cmdlist" :isLogin="isLogin">
    </myleft-menu>
    <div class="col-8 col-md-8 col-lg-8 col-xl-8 detailBox">
      <right-side :isLogin="isLogin"></right-side>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyleftMenu from '@/components/MyleftMenu.vue'
import RightSide from '@/components/RightSide.vue'

export default {
  name: 'home',
  components: {
    MyleftMenu,
    RightSide
  },
  props: ['isLogin'],
  data () {
    return {
      baseUrl: 'http://localhost:3000',
      notif: ''
    }
  },
  methods: {
  },
  created () {
  },
  watch: {
  }
}
</script>

<style scoped>
.cmdlist {
  min-height: 89vh;
  height: auto;
  /* border-right: 3px dotted black; */
}
.detailBox {
  height: auto;
}
</style>
