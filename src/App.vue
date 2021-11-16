<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <h1>TAIWAN TRAVEL</h1>
      </router-link>
    </div>
    <router-view />
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
}
h1 {
  font-size: 20px;
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
</style>
