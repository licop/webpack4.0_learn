console.log(1);

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('service worker registed');
        }).catch(err => {
            console.log('err');
        })
    })
}
