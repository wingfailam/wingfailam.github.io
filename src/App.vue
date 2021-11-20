<template>
  <div id="app">
    <div id="nav">
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
  </div>
</template>

<style lang="scss">
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
  height: 100%;
}
h1 {
  font-size: 20px;
  color: #fff;
}
h2 {
  font-size: 20px;
}
// h3 {
//   font-size: 24px;
// }

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
  // color: #2c3e50;
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

  // a {
  //   // font-weight: bold;
  //   color: #2c3e50;

  //   &.router-link-exact-active {
  //     color: #42b983;
  //   }
  // }
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
</style>
