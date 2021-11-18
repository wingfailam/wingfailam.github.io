const cities = {
  Northern: {
    Zh: '北部',
    Cities: [
      { CityName: '臺北市', City: 'Taipei' },
      { CityName: '新北市', City: 'NewTaipei' },
      { CityName: '基隆市', City: 'Keelung' },
      { CityName: '桃園市', City: 'Taoyuan' },

      { CityName: '新竹市', City: 'Hsinchu' },
      { CityName: '新竹縣', City: 'HsinchuCounty' },
      { CityName: '宜蘭縣', City: 'YilanCounty' },
    ],
  },
  Central: {
    Zh: '中部',
    Cities: [
      { CityName: '苗栗縣', City: 'MiaoliCounty' },
      { CityName: '臺中市', City: 'Taichung' },
      { CityName: '彰化縣', City: 'ChanghuaCounty' },
      { CityName: '南投縣', City: 'NantouCounty' },
    ],
  },
  Southern: {
    Zh: '南部',
    Cities: [
      { CityName: '雲林縣', City: 'YunlinCounty' },
      { CityName: '嘉義縣', City: 'ChiayiCounty' },
      { CityName: '嘉義市', City: 'Chiayi' },
      { CityName: '臺南市', City: 'Tainan' },
      { CityName: '高雄市', City: 'Kaohsiung' },

      { CityName: '屏東縣', City: 'PingtungCounty' },
    ],
  },

  Others: {
    Zh: '東部&離島',
    Cities: [
      { CityName: '花蓮縣', City: 'HualienCounty' },
      { CityName: '臺東縣', City: 'TaitungCounty' },
      { CityName: '金門縣', City: 'KinmenCounty' },
      { CityName: '澎湖縣', City: 'PenghuCounty' },
      { CityName: '連江縣', City: 'LienchiangCounty' },
    ],
  },
};
export default cities;
