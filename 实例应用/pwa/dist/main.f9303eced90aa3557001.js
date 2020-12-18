(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */
/***/ (function(module, exports) {

console.log(1);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('service worker registed');
    }).catch(err => {
      console.log('err');
    });
  });
}

/***/ })
],[[0,1]]]);
//# sourceMappingURL=main.f9303eced90aa3557001.js.map