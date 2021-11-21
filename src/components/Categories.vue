<template>
  <div class="categories-container">
    <header :class="selectedType"></header>
    <SideSearch class="SideSearch" />

    <div class="results-container">
      <div class="results-header">
        <div class="title">
          <h2>{{ selectedCityZh }}</h2>
          <p>{{ '/ ' + queryString }}</p>
        </div>

        <span class="buttons-container">
          <!-- <button>{{ selectedTypeZh }}</button> -->
          <button
            v-for="type in types"
            :key="type.En"
            @click="
              selectedType = type.En;
              $router.push(`/${selectedType}/${selectedCity}/${queryString}`);
            "
            :class="{ active: selectedType == type.En }"
          >
            {{ type.Zh }}
          </button>
        </span>
      </div>

      <div class="results-wrapper" v-for="result in selectedResults" :key="result.id">
        <router-link
          :to="{ path: '/information/' + selectedType + '/' + selectedCity + '/' + result.ID }"
        >
          <div class="results-img-container">
            <div
              class="results-img"
              :style="{ 'background-image': 'url(' + result.Picture.PictureUrl1 + ')' }"
            ></div>
          </div>
          <div class="results-content-container">
            <h3>{{ result.Name }}</h3>
            <!-- <p>{{ result.OpenTime }}</p> -->
            <!-- <p>{{ result.TicketInfo }}</p> -->
            <p v-if="result.Address"><span class="icon-address"></span>{{ result.Address }}</p>
          </div>
        </router-link>
      </div>

      <div class="pagination">
        <router-link
          :to="{ path: './' + queryString + '?page=' + (selectedPage - 1) }"
          v-if="selectedPage - 1 > 0"
        >
          <button class="page-button prev-page" v-if="selectedPage - 1 > 0"></button>
        </router-link>
        <router-link :to="{ path: './' + queryString + '?page=' + 1 }" v-if="selectedPage - 3 > 0">
          <button class="page-button first-page">1</button>
        </router-link>
        <span v-if="selectedPage - 3 > 0">...</span>

        <router-link
          :to="{ path: './' + queryString + '?page=' + (selectedPage - 2) }"
          v-if="selectedPage - 2 > 0"
        >
          <button class="page-button left-2">
            {{ selectedPage - 2 }}
          </button>
        </router-link>
        <router-link
          :to="{ path: './' + queryString + '?page=' + (selectedPage - 1) }"
          v-if="selectedPage - 1 > 0"
        >
          <button class="page-button left-1">
            {{ selectedPage - 1 }}
          </button>
        </router-link>

        <button class="page-button selected-page" v-if="lastPage !== 1">{{ selectedPage }}</button>

        <router-link :to="{ path: './' + queryString + '?page=' + (selectedPage + 1) }">
          <button class="page-button right-1" v-if="selectedPage + 1 <= lastPage">
            {{ selectedPage + 1 }}
          </button>
        </router-link>
        <router-link :to="{ path: './' + queryString + '?page=' + (selectedPage + 2) }">
          <button class="page-button right-2" v-if="selectedPage + 2 <= lastPage">
            {{ selectedPage + 2 }}
          </button>
        </router-link>

        <span v-if="selectedPage + 3 <= lastPage">...</span>

        <router-link :to="{ path: './' + queryString + '?page=' + lastPage }">
          <button class="page-button last-page" v-if="selectedPage + 2 < lastPage">
            {{ lastPage }}
          </button>
        </router-link>
        <router-link :to="{ path: './' + queryString + '?page=' + (selectedPage + 1) }">
          <button class="page-button next-page" v-if="selectedPage + 1 < lastPage"></button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$blue: #a6cde0;
* {
  //   border: 1px solid;
}
#nav {
  background-color: #fff;
}
@mixin shadow {
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
}
.categories-container {
  //   background-color: #000;
  //   min-height: 100vh;
  //   display: flex;
}
header {
  height: 200px;
  width: 100%;
  background-position: center;
  background-size: cover;
  &.scenicspot {
    background-image: url(../assets/images/scenicspot-header.jpg);
  }
  &.restaurant {
    background-image: url(../assets/images/restaurant-header.jpg);
  }
  &.hotel {
    background-image: url(../assets/images/hotel-header.jpg);
  }
  &.activity {
    background-image: url(../assets/images/activity-header.jpg);
  }
}
.bar-container.SideSearch {
  position: fixed;
  top: 140px;
  width: 320px;
  @media (max-width: 768px) {
    // position: absolute;
    // left: -100%;
    display: none;
  }
}
.results-container {
  margin-top: 20px;
  margin-left: 400px;
  margin-right: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 768px) {
    margin: 0;
    padding: 20px;
  }
  .results-header {
    flex: 0 0 100%;
    display: flex;
    align-items: flex-end;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    .title {
      display: block;
      h2 {
        font-family: 'SourceHanSerifTC-VF';
        font-size: 40px;
        margin: 0;
        padding: 0;
        font-weight: normal;
        margin-right: 5px;
        @media (max-width: 768px) {
          font-size: 25px;
        }
        display: inline;
      }
      p {
        display: inline;
        font-family: 'SourceHanSerifTC-VF';
        // font-weight: bold;
        margin: 0;
        margin-right: 12px;
        // line-height: 50px;
        // margin: 0;
        // margin-bottom: 0px;
      }
    }
    .buttons-container {
      display: flex;
      gap: 10px;
      button {
        width: 50px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border: solid 1px $blue;
        padding: 5px;
        border-radius: 10px;
        height: 35px;
        cursor: pointer;
        &:hover,
        &.active {
          background-color: $blue;
          // border: #fff;
          color: #fff;
        }
      }
    }
  }
  .results-wrapper {
    display: flex;
    flex: 1 1 250px;
    flex-direction: column;
    border-radius: 20px;
    @include shadow();
    p {
      margin: 0;
      margin-bottom: 2px;
      display: flex;
      span {
        width: 18px;
        height: 18px;
        background-size: cover;
        background-position: center;

        &.icon-address {
          background-image: url(../assets/images/icons/site.svg);
        }
      }
    }
    .results-content-container {
      padding: 0 10px;
      padding-bottom: 10px;
    }
    .results-img-container {
      border-radius: 20px;
      width: 100%;
      height: 250px;
      overflow: hidden;
      border-radius: 20px 20px 0 0;
      &:hover .results-img {
        transform: scale(1.2);
      }

      .results-img {
        transition: all 0.5s;
        border-radius: 20px 20px 0 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
      }
    }
  }
  .pagination {
    flex: 1 0 100%;
    display: flex;
    align-items: start;
    justify-content: flex-end;
    gap: 10px;

    span {
      width: 20px;
      height: 40px;
      display: flex;
      justify-content: center;
      //   align-items: center;
      line-height: 35px;
    }
    button {
      $blue: #7baebe;
      cursor: pointer;
      border: 1px solid $blue;
      border-radius: 10px;
      width: 40px;
      height: 40px;
      background-size: cover;
      background-position: center;
      background-color: #fff;
      display: inline;
      &.selected-page {
        background-color: $blue;
        color: #fff;
      }
      &.left-2,
      &.right-2 {
        @media (max-width: 768px) {
          display: none;
        }
      }
      &.next-page,
      &.prev-page {
        border-radius: 0px;
        border: 0px;
        @media (max-width: 768px) {
          display: none;
        }
      }
      &.prev-page {
        background-image: url(../assets/images/icons/arrowWithBorderLeft_default.svg);
      }
      &.next-page {
        background-image: url(../assets/images/icons/arrowWithBorderRight_default.svg);
      }
    }
  }
}
</style>
<script>
import SideSearch from '@/components/SideSearch.vue';
import TdxService from '@/components/TdxService';
import types from '@/components/Types';
import cities from '@/components/Cities';

// function getCityByZh(city) {
//   if (city === '台灣') {
//     return '';
//   }
//   let payload = '';
//   Object.keys(cities).some((area) => {
//     const result = cities[area].Cities.find((el) => el.CityName === city);
//     if (result) {
//       payload = result.City;
//       return true;
//     }
//     return false;
//   });
//   return payload;
// }
export default {
  components: { SideSearch },
  data() {
    return {
      city: '',
      results: [],
      selectedResults: [],
      perPage: 24,
      lastPage: 1,
      selectedType: this.$route.params.category || 'scenicspot',
      selectedPage: parseInt(this.$route.query.page, 10) || 1,
      selectedCity: this.$route.params.city || '',
      queryString: this.$route.params.q || '',
      types,
    };
  },
  computed: {
    selectedCityZh() {
      if (this.selectedCity === 'Taiwan') {
        return '台灣';
      }
      let payload = '';
      Object.keys(cities).some((area) => {
        const result = cities[area].Cities.find((el) => el.City === this.selectedCity);
        if (result) {
          payload = result.CityName;
          return true;
        }
        return false;
      });
      return payload;
    },
    selectedTypeZh() {
      return types.find((el) => el.En === this.selectedType).Zh;
    },
  },
  methods: {
    async getResult() {
      this.results = await TdxService.getAny(
        this.selectedType,
        this.selectedCity,
        this.queryString,
      );
      this.lastPage = Math.ceil(this.results.length / this.perPage) || 1;
    },
    setResult() {
      this.selectedResults = this.results.slice(
        (this.selectedPage - 1) * this.perPage,
        this.selectedPage * this.perPage,
      );
    },
  },
  async mounted() {
    // get results and how many pages
    await this.getResult();
    // this.results = await TdxService.getScenicSpot(this.selectedCityEn);
    // this.lastPage = Math.ceil(this.results.length / this.perPage);

    this.setResult();
  },
  watch: {
    async $route(to, from) {
      // react to route changes...

      console.log(to, from);
      // city 變動
      if (to.params.city !== from.params.city || to.params.category !== from.params.category) {
        this.selectedCity = to.params.city || '';
        await this.getResult();
      }
      // q變動
      if (to.params.q !== from.params.q) {
        this.queryString = to.params.q || '';
        await this.getResult();
      }
      // 單純換頁
      this.selectedPage = parseInt(this.$route.query.page, 10) || 1;
      this.setResult();
    },
  },
};
</script>
