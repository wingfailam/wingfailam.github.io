<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <header>
      <div class="logo"></div>
      <div class="bar-container" :class="{ active: toggle == 1 }">
        <div class="bar-wrapper">
          <div class="dropdown" @click="toggle = !toggle">
            {{ selectedCity.CityName }}
            /
            {{ selectedType.Zh }}
          </div>
          <input
            class="search"
            name="taiwantravel-search"
            placeholder="請輸入關鍵詞"
            v-model="queryString"
            @keypress="enterClicked()"
          />
          <div class="submit" @click="enterClicked()">SEARCH</div>
        </div>

        <div class="dropdown-container" :class="{ active: toggle == 1 }">
          <h2>選擇區域</h2>
          <button
            @click="selectedCity = defaultCity"
            :class="{ active: selectedCity == defaultCity }"
          >
            台灣
          </button>
          <div class="tabs-container">
            <!-- <div class="radio-container">
              <input
                type="radio"
                class="tabs-radio"
                name="tabs"
                v-for="(city, index) in Object.keys(cities)"
                :key="city.id"
                :id="'tab-' + index"
                :checked="index == 0"
              />
              <div class="label-container">
                <label
                  v-for="(city, index) in Object.keys(cities)"
                  :key="city.id"
                  :for="'tab-' + index"
                  class="tabs-label"
                  :id="'label-' + index"
                  >{{ cities[city].Zh }}</label
                >
              </div>
            </div> -->
            <div class="radio-container">
              <input
                type="radio"
                class="tabs-radio"
                name="tabs"
                v-for="(city, index) in Object.keys(cities)"
                :key="city.id"
                :id="'tab-' + index"
                :checked="index == 0"
              />

              <label
                v-for="(city, index) in Object.keys(cities)"
                :key="city.id"
                :for="'tab-' + index"
                class="tabs-label"
                :id="'label-' + index"
                >{{ cities[city].Zh }}</label
              >
              <div class="cities-container">
                <div class="cities-slide">
                  <div class="cities-wrapper" v-for="area in Object.keys(cities)" :key="area.id">
                    <!-- <p>{{ cities[area].Zh }}</p> -->
                    <button
                      v-for="cts in cities[area].Cities"
                      :key="cts.City"
                      @click="selectedCity = cts"
                      :class="{ active: selectedCity == cts }"
                    >
                      {{ cts.CityName }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2>選擇類型</h2>
          <div class="type-container">
            <button
              v-for="type in types"
              :key="type.En"
              @click="selectedType = type"
              :class="{ active: selectedType == type }"
            >
              {{ type.Zh }}
            </button>
          </div>

          <div class="completion-container">
            <button class="active" @click="toggle = !toggle">OK</button>
          </div>
        </div>
      </div>
    </header>
    <div class="cat-container">
      <h2>熱門景點</h2>
      <div class="scenicspots-container">
        <div
          v-for="(scenicspot, index) in scenicspots"
          :key="scenicspot.id"
          class="scenicspots-item"
          :class="{ l: index % 3 == 0 }"
        >
          <div
            class="bgi"
            :style="{
              'background-image': 'url(' + scenicspot.Picture.PictureUrl1 + ')',
            }"
          ></div>
          <span> {{ scenicspot.Name }}</span>
        </div>
      </div>
      <h2>美食推薦</h2>
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
      </div>

      <h2>旅宿資訊</h2>
      <div class="hotels-container">
        <div v-for="hotel in hotels" :key="hotel.id" class="hotels-item">
          <div
            class="bgi"
            :style="{
              'background-image': 'url(' + hotel.Picture.PictureUrl1 + ')',
            }"
          ></div>
          <h2 class="title">{{ hotel.Name }}</h2>
          <p class="address"><span class="address-icon"></span>{{ hotel.Address }}</p>
        </div>
      </div>
      <h2>節慶活動</h2>
      <div class="activities-container">
        <!-- <div class="activity-item">
          <div class="img"></div>
          <div class="content">
            <h2 class="title">標題</h2>
            <p class="date">日期</p>
            <p class="address">地址</p>
          </div>
        </div> -->
        <div v-for="activity in activities" :key="activity.id" class="activity-item">
          <div class="img">
            <div
              class="bgi"
              :style="{
                'background-image': 'url(' + activity.Picture.PictureUrl1 + ')',
              }"
            ></div>
          </div>
          <div class="content">
            <h2 class="title">{{ activity.Name }}</h2>
            <p class="address"><span class="address-icon"></span>{{ activity.Address }}</p>
            <br />
            <p>{{ activity.Description }}</p>
          </div>
        </div>
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

import cities from '../components/Cities';
import types from '../components/Types';

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

// function getCities7() {
//   return new Promise((resolve) => {
//     const api = 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON';
//     return axios.get(api, { headers: getAuthorizationHeader() }).then((response) => {
//       // console.log(response.data);
//       const newData = _.shuffle(response.data);
//       console.log(newData);
//       resolve(newData.slice(0, 7));
//     });
//   });
// }

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

function getScenicSpot7() {
  return new Promise((resolve) => {
    const api = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?'
      + '$filter=Picture%2FPictureUrl1%20ne%20null&'
      + '$format=JSON';
    return axios.get(api, { headers: getAuthorizationHeader() }).then((response) => {
      // console.log(response.data);
      const newData = _.shuffle(response.data);
      console.log(newData);
      resolve(newData.slice(0, 7));
    });
  });
}

function getHotel6() {
  return new Promise((resolve) => {
    const api = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?'
      + '$filter=Picture%2FPictureUrl1%20ne%20null&'
      + '$format=JSON';
    return axios.get(api, { headers: getAuthorizationHeader() }).then((response) => {
      // console.log(response.data);
      const newData = _.shuffle(response.data);
      console.log(newData);
      resolve(newData.slice(0, 7));
    });
  });
}
function shortDescription(description) {
  let temp;
  const num = 100;
  if (description.length > num) {
    temp = description.slice(0, num);
    temp += '......';
    return temp;
  }
  return description;
}
function getActivities6() {
  return new Promise((resolve) => {
    const api = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?'
      + '$filter=Picture%2FPictureUrl1%20ne%20null&'
      + '$format=JSON';
    return axios.get(api, { headers: getAuthorizationHeader() }).then((response) => {
      // console.log(response.data);
      let newData = _.shuffle(response.data);
      newData = newData.map((element) => {
        const temp = element;
        temp.Description = shortDescription(element.Description);
        return temp;
      });
      // newData = shortDescription(newData);
      console.log(newData);
      resolve(newData.slice(0, 7));
    });
  });
}
const defaultCity = { CityName: '台灣', City: 'Taiwan' };
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
      hotels: [],
      activities: [],
      cities,
      defaultCity,
      selectedCity: defaultCity,
      types,
      selectedType: types[0],
      toggle: 0,
      queryString: '',
    };
  },
  methods: {
    enterClicked() {
      this.$router.push(`/${this.selectedType.En}/${this.selectedCity.City}/${this.queryString}`);
    },
  },
  computed: {},
  async mounted() {
    this.scenicspots = await getScenicSpot7();
    this.restaurants = await getRestaurants5();
    this.hotels = await getHotel6();
    this.activities = await getActivities6();
    console.log(Object.keys(cities));
    console.log(this.defaultCity);
    console.log(this.selectedCity);
  },
};
</script>

<style lang="scss" scoped>
$blue: #a6cde0;
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

    @media (max-width: 768px) {
      margin-top: 70px;
    }
  }
  .bar-container {
    overflow: hidden;
    position: absolute;
    // bottom: 100px;
    top: 510px;
    // margin: 20px;

    width: calc(100% - 80px);
    max-width: 600px;
    // height: 80px;
    border-radius: 20px;
    // display: flex;
    display: inline-flex;
    // justify-content: space-around;
    justify-content: space-evenly;
    align-items: flex-start;
    $items-height: 40px;
    padding: 20px;
    @media (max-width: 768px) {
      display: none;
    }
    &.active {
      padding-bottom: 331px;
      @media (max-width: 768px) {
        padding-bottom: 310px;
      }
    }

    // padding-bottom: 640px;
    @media (max-width: 768px) {
      top: 430px;
    }
    .bar-wrapper {
      @include shadow();
      padding: 20px 20px;
      border-radius: 20px;
      background-color: #fff;
      width: 100%;
      display: flex;
      gap: 10px;
      position: relative;
      input {
        &::placeholder {
          color: #b0b0b0;
        }
      }
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
        z-index: 3;
        @media (max-width: 768px) {
        }
      }
      .dropdown {
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
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
        z-index: 3;
        @media (max-width: 768px) {
          width: 100%;
          flex: 3 1 200px;
          padding-left: 10px;
          padding-right: 0;
        }
      }
      @media (max-width: 768px) {
        bottom: 0px;
        height: 120px;
        display: flex;
        flex-direction: column;
        // padding: 20px;
        padding-bottom: 40px;
      }
      &::before {
        background-color: #fff;
        width: 100%;
        // height: calc(100% - 20px);
        height: calc(100% - 20px);
        border-radius: 20px;
        // padding-bottom: 20px;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .dropdown-container {
      display: none;
      &.active {
        display: block;
      }
      @include shadow();
      // border: 1px solid;
      box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
      padding: 0px 20px;
      padding-bottom: 20px;
      position: absolute;
      top: 90px;
      // left: 0;
      width: calc(100% - 40px - 40px);
      background-color: #fff;
      border-radius: 20px;
      z-index: 3;
      h2 {
        display: inline-block;
        margin-right: 10px;
      }
      button {
        width: 62px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border: solid 1px $blue;
        padding: 10px;
        border-radius: 10px;
        height: 40px;
        cursor: pointer;
        &:hover,
        &.active {
          background-color: $blue;
          // border: #fff;
          color: #fff;
        }
      }
      .tabs-container {
        width: 100%;
        .radio-container {
          display: block;
          width: 100%;

          .cities-container {
            width: 100%;
            height: 40px;
            // padding-top: 20px;
            margin-top: 20px;
            position: relative;
            overflow: hidden;
            @media (max-width: 768px) {
              height: 90px;
            }
            .cities-slide {
              display: inline-block;
              white-space: nowrap;

              position: absolute;
              top: 0px;
              left: 0px;
              transition: all 0.5s;
              .cities-wrapper {
                // width: inherit;

                width: 100%;
                height: 100%;
                display: inline-flex;
                gap: 10px;
                flex-wrap: wrap;
                p {
                  display: inline;
                }
              }
            }
          }
          label {
            padding-left: 2px;
            padding-bottom: 2px;
            padding-right: 8px;
            margin-right: 8px;
            cursor: pointer;
          }
          [type='radio'] {
            display: none;
          }
          // [type='radio']:checked ~ label {
          //   border-bottom: 3px solid $blue;
          //   z-index: 2;
          // }

          @for $i from 1 through 10 {
            input:nth-of-type(#{$i}):checked ~ label:nth-of-type(#{$i}) {
              border-bottom: 3px solid $blue;
              z-index: 2;
            }
            input:nth-of-type(#{$i}):checked ~ .cities-container .cities-slide {
              transform: translateX(($i - 1) * -100%);
            }
          }
        }
      }
      .type-container {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }
      .completion-container {
        border-top: solid 1px #e0e0e0;
        padding-top: 20px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}

.cat-container {
  margin: 40px;

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
    z-index: 0;
  }

  .time-icon,
  .address-icon {
    display: inline-flex;
    flex-shrink: 0;
    height: 13px;
    width: 13px;
    padding-top: 3px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../assets/images/icons/time.svg');
    margin-right: 10px;
  }
  .address-icon {
    background-image: url('../assets/images/icons/site.svg');
  }
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
      position: relative;
      overflow: hidden;
      &:hover .bgi {
        transform: scale(1.2);
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
      }
      span {
        z-index: 2;
        font-size: 16px;
        font-weight: bold;
        // color: #fff;
        color: #f8f8f8;
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
        align-items: flex-start;
        color: #f8f8f8f8;
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
      position: relative;
      display: flex;
      flex-direction: column;

      overflow: hidden;
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

        background: linear-gradient(#000, rgba(255, 255, 255, 0));
        opacity: 0.7;
        backdrop-filter: grayscale(10%);
        backdrop-filter: contrast(50%);
      }
      &:hover .bgi {
        transform: scale(1.2);
      }
      h2,
      p {
        color: #f8f8f8;
        z-index: 2;
        display: flex;
        align-items: flex-start;
      }
      p {
        margin: 2px 0;
      }
    }
  }
  .activities-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .activity-item {
      @include shadow();
      // background-color: gray;
      flex-basis: 250px;
      width: 100%;
      // padding: 10px;
      border-radius: 20px;
      display: flex;
      position: relative;
      @media (max-width: 768px) {
        flex-direction: column;
      }
      .img {
        // height: 100%;
        flex: 1 1 250px;
        // width: 250px;
        border-radius: 20px 0px 0px 20px;
        // background: red;
        position: relative;
        overflow: hidden;
        @media (max-width: 768px) {
          border-radius: 20px 20px 0px 0px;
        }
        .bgi {
          border-radius: 20px 0px 0px 20px;
          @media (max-width: 768px) {
            border-radius: 20px 20px 0px 0px;
          }
        }
      }
      .content {
        padding: 0 20px;
        flex: 2 1 500px;
        p {
          margin: 2px 0;
        }
        z-index: 2;
        @media (max-width: 768px) {
          flex: 2 1 auto;
          padding-bottom: 20px;
        }
      }
      &:hover .img .bgi {
        transform: scale(1.2);
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

        // background: linear-gradient(#000, rgba(255, 255, 255, 0));
        opacity: 0.7;
        backdrop-filter: grayscale(10%);
        backdrop-filter: contrast(50%);
      }
    }
  }
}
</style>
