<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <header>
      <div class="logo"></div>
      <div class="select-container">
        <div class="dropdown">台灣</div>
        <input class="search" name="taiwantravel-search" />

        <div class="submit">SEARCH</div>
      </div>
    </header>
    <div class="cat-container">
      <h2>熱門景點</h2>
      <div class="scenicspots-container">
        <!-- <div class="scenicspots-item l">
          <span>{{ scenicspots[0].CityName }}</span>
        </div>
        <div class="scenicspots-item"></div>
        <div class="scenicspots-item"></div>
        <div class="scenicspots-item l"></div>
        <div class="scenicspots-item"></div>
        <div class="scenicspots-item"></div>
        <div class="scenicspots-item l"></div> -->
        <div
          v-for="(scenicspot, index) in scenicspots"
          :key="scenicspot.id"
          class="scenicspots-item"
          :class="{ l: index % 3 == 0 }"
        >
          {{ scenicspot.CityName }}
        </div>
      </div>
      <h2>隱藏美食</h2>
      <div class="restaurants-container">
        <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurants-item">
          <div
            class="bgi"
            :style="{
              'background-image': 'url(' + restaurant.Picture.PictureUrl1 + ')',
            }"
          ></div>
          <h2 class="title">{{ restaurant.Name }}</h2>
          <p class="time"><span class="time-icon"></span>{{ restaurant.OpenTime }}</p>
          <p class="address"><span class="address-icon"></span>{{ restaurant.Address }}</p>
        </div>
        <!-- <div class="restaurants-item">
          <h2 class="title">標題</h2>
          <p class="time">時間</p>
          <p class="address">地址</p>
        </div>
        <div class="restaurants-item"></div>
        <div class="restaurants-item"></div>
        <div class="restaurants-item"></div>
        <div class="restaurants-item"></div> -->
      </div>

      <h2>住宿推薦</h2>
      <div class="hotels-container">
        <div class="hotels-item">
          <h2 class="title">標題</h2>
          <p class="address">地址</p>
        </div>
        <div class="hotels-item"></div>
        <div class="hotels-item"></div>
        <div class="hotels-item"></div>
        <div class="hotels-item"></div>
        <div class="hotels-item"></div>
      </div>
      <h2>體驗活動</h2>
      <div class="activities-container">
        <div class="activity-item">
          <div class="img"></div>
          <div class="content">
            <h2 class="title">標題</h2>
            <p class="date">日期</p>
            <p class="address">地址</p>
          </div>
        </div>
        <div class="activity-item"></div>
        <div class="activity-item"></div>
        <div class="activity-item"></div>
        <div class="activity-item"></div>
        <div class="activity-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Vue from 'vue'; // in Vue 2
import axios from 'axios';
// import VueAxios from 'vue-axios';
import _ from 'lodash';
import JsSHA from 'jssha';

function getAuthorizationHeader() {
  const AppID = '705e9a212c3242ed9a2fa2355b84f418';
  const AppKey = 'o2tSBueG3Dtk4o--mJKUv5kmGlE';

  const GMTString = new Date().toUTCString();
  const shaObj = new JsSHA('SHA-1', 'TEXT');
  shaObj.setHMACKey(AppKey, 'TEXT');
  shaObj.update(`x-date: ${GMTString}`);
  const HMAC = shaObj.getHMAC('B64');
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  return { Authorization, 'X-Date': GMTString };
}

function getCities7() {
  return new Promise((resolve) => {
    const api = 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON';
    return axios.get(api, { headers: getAuthorizationHeader() }).then((response) => {
      // console.log(response.data);
      const newData = _.shuffle(response.data);
      console.log(newData);
      resolve(newData.slice(0, 7));
    });
  });
}
function getRestaurants5() {
  return new Promise((resolve) => {
    const api = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=Picture%2FPictureUrl1%20ne%20null&$format=JSON';
    return axios.get(api, { headers: getAuthorizationHeader() }).then((response) => {
      // console.log(response.data);
      const newData = _.shuffle(response.data);
      console.log(newData);
      resolve(newData.slice(0, 5));
    });
  });
}

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      title: 'test',
      scenicspots: [],
      restaurants: [],
    };
  },
  methods: {},
  computed: {},
  async mounted() {
    this.scenicspots = await getCities7();
    this.restaurants = await getRestaurants5();
  },
};
</script>

<style lang="scss" scoped>
@mixin shadow {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}
header {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/images/header.jpg');
  background-position: center;
  background-size: cover;
  display: flex;
  // justify-content: center;
  // justify-content:
  // margin-top: 100px;

  align-items: center;
  flex-direction: column;

  .logo {
    margin-top: 95px;
    max-width: 500px;
    width: 100%;
    max-height: 500px;
    height: 100%;

    background-image: url('../assets/images/taiwan-logo-white.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .select-container {
    @include shadow();
    position: absolute;
    bottom: 100px;
    margin: 20px;
    background-color: #fff;
    width: calc(100% - 80px);
    max-width: 600px;
    height: 80px;
    border-radius: 20px;
    // display: flex;
    display: inline-flex;
    // justify-content: space-around;
    justify-content: space-evenly;
    align-items: center;
    $items-height: 40px;
    gap: 10px;
    padding: 0 20px;

    .dropdown,
    .search {
      // width: 100%;
      // max-width: 200px;
      // height: 40px;
      // flex-basis: 2fr;
      width: 100%;
      flex: 3 1 200px;
      height: $items-height;

      line-height: $items-height;
      border-radius: 10px;
      // background-color: #b4b4b4;
      background-color: #ebebeb;
      color: #707070;
      // padding: 10px;
      padding-left: 10px;
      font-size: 18px;
    }
    .dropdown {
      cursor: pointer;
    }
    .search {
      border: 0px;
      &:focus {
        outline: none;
      }
    }
    .submit {
      // width: 100%;
      // max-width: 100px;
      // height: 40px;
      flex: 1 1 70px;
      height: $items-height;
      line-height: $items-height;
      border-radius: 10px;
      background-color: #e8cb89;
      color: #fff;
      text-align: center;
      cursor: pointer;
      padding: 0 10px;
    }
  }
}

.cat-container {
  margin: 40px;

  .scenicspots-container {
    $height: 290px;
    display: flex;
    flex-direction: column;
    height: $height;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    @media (max-width: 768px) {
      flex-direction: row;
      height: 100vh;
    }
    .scenicspots-item {
      @include shadow;
      flex-basis: calc($height / 2 - 10px);
      width: 1fr;
      border-radius: 20px;
      background-color: grey;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
      }
      @media (max-width: 768px) {
        flex-basis: calc(50% - 7px);
        // flex-grow: 1;
      }
      &.l {
        flex-basis: $height;
        @media (max-width: 768px) {
          flex-basis: 100%;
          // flex-grow: 2;
        }
      }
    }
  }
  .restaurants-container {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    gap: 10px;
    .restaurants-item {
      cursor: pointer;
      @include shadow();
      border-radius: 20px;
      height: 350px;

      // backdrop-filter: grayscale(30%);

      flex: 1 230px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 10px;
      position: relative;
      overflow: hidden;

      &:hover .bgi {
        overflow: hidden;
        transform: scale(1.2);
      }
      .bgi {
        background-size: cover;
        background-position: center;
        transition: all 0.5s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
      &:hover {
        // transform: scale(1.2);
      }
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        z-index: 1;

        background: linear-gradient(rgba(255, 255, 255, 0), #000);
        opacity: 0.7;
        backdrop-filter: grayscale(10%);
        backdrop-filter: contrast(50%);

        // opacity: 1;
      }
      h2,
      p {
        // display: inline-block;
        // align-self: flex-start;
        display: flex;
        align-items: center;
        color: #fff;
        z-index: 2;
        // backdrop-filter: blur(2px);
        // backdrop-filter: grayscale(90%);
        // backdrop-filter: brightness(60%);
        // backdrop-filter: invert(30%);
        // border-radius: 10px;
        padding: 0 10px;
      }
      p {
        margin: 2px 0;
      }
      .time-icon,
      .address-icon {
        display: inline-flex;
        flex-shrink: 0;
        height: 18px;
        width: 18px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url('../assets/images/icons/time.svg');
        margin-right: 10px;
      }
      .address-icon {
        background-image: url('../assets/images/icons/site.svg');
      }
    }
  }
  .hotels-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .hotels-item {
      @include shadow();

      background-color: gray;
      border-radius: 20px;
      flex: 1 1 400px;
      height: 300px;
      padding: 10px;
      h2,
      p {
        // color: #fff;
      }
      p {
        margin: 2px 0;
      }
    }
  }
  .activities-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .activity-item {
      @include shadow();
      background-color: gray;
      flex-basis: 250px;
      width: 100%;
      padding: 10px;
      border-radius: 20px;
      display: flex;

      .img {
        height: 100%;
        flex: 1 1 250px;
        // width: 250px;
        border-radius: 20px;
      }
      .content {
        flex: 2 1 500px;
        p {
          margin: 2px 0;
        }
      }
    }
  }
}
</style>
