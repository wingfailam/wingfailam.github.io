# TaiwanTravel
以 Vue2 實作台灣旅遊資訊網

## Routes
```
首頁
|-- /

搜尋頁
|-- /:category/:city/:q

資訊頁
|-- /information/:category/:city/:id
```
## 功能
* 首頁隨機任選呈現台灣旅遊資訊
* 任選 *縣市區域 、 * 資訊種類 呈現其搜尋結果
* 點擊地圖上的站點將顯示該站點各路線之預估到站時間（依時間排序）
* 點擊地圖上的公車將顯示車牌號碼
* 以 30 秒為期自動更新，亦可手動更新
* 支援 RWD

## 學習運用

* 串接 API
* 運用原生 service 做狀態管理
*  ~~用 illustrator 做公車 icon 與其 gif 動圖~~

## 所用套件

* [leaflet](https://leafletjs.com/)
* [ng-select](https://github.com/ng-select/ng-select)

## 參考來源
* [台中公車即時動態](https://citybus.taichung.gov.tw/ebus/driving-map)
* [高雄公車即時動態](https://ibus.tbkc.gov.tw/ibus/driving-map/1431)

## 所用資源

* API
  * [TDX](https://tdx.transportdata.tw/)

* Icon
  * [切換 icon](https://www.flaticon.com/premium-icon/change_2990017?term=change&page=1&position=21&page=1&position=21&related_id=2990017&origin=search)

* 圖資
  * [mapbox](https://www.mapbox.com/)
