<template>
  <div id="app">
    <div id="nav">
      <h1 class="hamburger" @click="toggleSideSearchRWD = !toggleSideSearchRWD">☰</h1>
      <SideSearchRWD
        class="nav-side-search"
        :class="{ active: toggleSideSearchRWD == 1 }"
        @close-search="toggleSideSearchRWD = 0"
      />
      <router-link to="/">
        <h1>TAIWAN TRAVEL</h1>
      </router-link>
    </div>
    <router-view />
    <footer>
      <span>TaiwanTravel © 2021</span>
      <span>Designer Vum.</span>
      <span>Front-end Wingfailam.</span>
      <span>All rights reserved.</span>
    </footer>
    <div class="back-to-top" :class="{ active: scrollY }" @click="backToTop()"></div>
  </div>
</template>
<script>
import SideSearchRWD from '@/components/SideSearchRWD.vue';

export default {
  components: { SideSearchRWD },
  data() {
    return {
      toggleSideSearchRWD: 0,
      scrollY: 0,
    };
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
    },
    backToTop() {
      window.scroll({ top: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss">
$blue: #a6cde0;
.swiper-pagination-bullet {
  background: #fff !important;
}
.background-container.nav-side-search.active {
  z-index: 5;
}

* {
  color: #505050;
  text-decoration: none;
  font-family: 'Helvetica', 'Arial', 'LiHei Pro', '蘋方-繁', '黑體-繁', '微軟正黑體', sans-serif;
  // border: solid 1px;
}

html,
body {
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 20px;
  color: #fff;
}
h2 {
  font-size: 20px;
}

@mixin shadow {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}

@font-face {
  font-family: 'SourceHanSerifTC-VF';
  src: url('./assets/fonts/SourceHanSerifTW-VF.otf.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
  @media (max-width: 768px) {
    padding-bottom: 160px;
  }
}

#nav {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 40px);
  padding: 20px;
  .hamburger {
    display: none;
    @media (max-width: 768px) {
      display: block;
      font-size: 30px;
      line-height: 21px;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  }

  h1 {
    font-family: 'SourceHanSerifTC-VF';
    font-size: 20px;
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  a {
    border: 0px;
  }
}
footer {
  position: absolute;
  bottom: 0;
  width: calc(100% - 40px);
  // height: 70px;
  padding: 20px;
  background-color: #a6cde0;
  // color: #f8f8f8;

  display: flex;
  justify-content: center;
  align-items: center;

  display: flex;
  gap: 10px;
  z-index: -100;
  span {
    color: #fff;
    font-size: 15px;
    font-family: 'SourceHanSerifTC-VF';
    // font-weight: bold;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.back-to-top {
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  background-color: unset;
  border: 0px;
  background-image: url(./assets/images/icons/gotop_default.svg);
  z-index: 1000;
  opacity: 0;
  transition: all 0.5s;
  &.active {
    opacity: 1;
  }
  &:hover {
    background-image: url(./assets/images/icons/gotop_hover.svg);
  }
}
</style>
