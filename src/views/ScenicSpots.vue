<template>
  <div class="scenicspots-container">
    <header></header>
    <SideSearch class="sideSearch" />

    <div class="results-container">
      <div class="results-wrapper" v-for="result in selectedResults" :key="result.id">
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
      </div>

      <div class="pagination">
        <button class="page-button prev-page" v-if="selectedPage - 1 > 0"></button>

        <router-link :to="{ path: './?page=' + 1 }" v-if="selectedPage - 3 > 0">
          <button class="page-button first-page">1</button>
        </router-link>
        <span v-if="selectedPage - 3 > 0">...</span>

        <router-link :to="{ path: './?page=' + (selectedPage - 2) }" v-if="selectedPage - 2 > 0">
          <button class="page-button last-page">
            {{ selectedPage - 2 }}
          </button>
        </router-link>
        <router-link :to="{ path: './?page=' + (selectedPage - 1) }" v-if="selectedPage - 1 > 0">
          <button class="page-button last-page">
            {{ selectedPage - 1 }}
          </button>
        </router-link>

        <button class="page-button selected-page">{{ selectedPage }}</button>

        <router-link :to="{ path: './?page=' + (selectedPage + 1) }">
          <button class="page-button last-page" v-if="selectedPage + 1 <= lastPage">
            {{ selectedPage + 1 }}
          </button>
        </router-link>
        <router-link :to="{ path: './?page=' + (selectedPage + 2) }">
          <button class="page-button last-page" v-if="selectedPage + 2 <= lastPage">
            {{ selectedPage + 2 }}
          </button>
        </router-link>

        <span v-if="selectedPage + 3 <= lastPage">...</span>

        <router-link :to="{ path: './?page=' + lastPage }">
          <button class="page-button last-page" v-if="selectedPage + 2 < lastPage">
            {{ lastPage }}
          </button>
        </router-link>
        <button class="page-button next-page" v-if="selectedPage + 1 < lastPage"></button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
* {
  //   border: 1px solid;
}
@mixin shadow {
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
}
.scenicspots-container {
  //   background-color: #000;
  //   min-height: 100vh;
  //   display: flex;
}
header {
  background-image: url(../assets/images/ScenicSpotsHeader.jpg);
  height: 200px;
  width: 100%;
  background-position: center;
  background-size: cover;
}
.sideSearch {
  position: fixed;
  top: 140px;
}
.results-container {
  margin-top: 40px;
  margin-left: 400px;
  margin-right: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
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

      .results-img {
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
      &.next-page,
      &.prev-page {
        border-radius: 0px;
        border: 0px;
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
      lastPage: 0,
      selectedPage: parseInt(this.$route.query.page, 10) || 1,
      selectedCity: this.$route.params.city || '',
    };
  },
  computed: {},
  methods: {
    async getResult() {
      this.results = await TdxService.getScenicSpot(this.selectedCity);
      this.lastPage = Math.ceil(this.results.length / this.perPage);
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
      if (to.params.city !== from.params.city) {
        this.selectedCity = to.params.city || '';
        await this.getResult();
      }
      this.selectedPage = parseInt(this.$route.query.page, 10) || 1;
      this.setResult();
    },
  },
};
</script>
