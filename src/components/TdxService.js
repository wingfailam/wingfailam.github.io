import axios from 'axios';
// import _ from 'lodash';
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

const TdxService = {
  getScenicSpot(city, keyword) {
    let computedCity = city;
    let computedQueryString = '';
    if (keyword) computedQueryString = ` and contains(Name,'${keyword}')`;
    if (city === 'Taiwan') computedCity = '';
    return new Promise((resolve) => {
      const api = `${
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${computedCity}?`
        + '$filter=Picture%2FPictureUrl1%20ne%20null'
      }${computedQueryString}&$format=JSON`;
      return axios.get(api, { headers: getAuthorizationHeader() }).then((response) => {
        // const newData = _.shuffle(response.data);
        // console.log(newData);
        resolve(response.data);
      });
    });
  },
  getAny(category, city, keyword) {
    let computedCity = city;
    let computedQueryString = '';
    if (keyword) computedQueryString = ` and contains(Name,'${keyword}') or contains(Description,'${keyword}')`;
    if (city === 'Taiwan') computedCity = '';
    return new Promise((resolve) => {
      const api = `${
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}/${computedCity}?`
        + '$filter=Picture%2FPictureUrl1%20ne%20null'
      }${computedQueryString}&$format=JSON`;
      return axios.get(api, { headers: getAuthorizationHeader() }).then((response) => {
        // const newData = _.shuffle(response.data);
        // console.log(newData);
        resolve(response.data);
      });
    });
  },
  //   getScenicSpotByCity() {
  //     return new Promise((resolve) => {
  //       const api = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?'
  //         + '$filter=Picture%2FPictureUrl1%20ne%20null&'
  //         + '$format=JSON';
  //       return axios.get(api, { headers: getAuthorizationHeader() }).then((response) => {
  //         // const newData = _.shuffle(response.data);
  //         // console.log(newData);
  //         resolve(response.data);
  //       });
  //     });
  //   },
};
export default TdxService;
