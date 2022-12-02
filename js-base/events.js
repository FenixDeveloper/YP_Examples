(function () {
    window.addEventListener('load', function () {
        console.debug('event: window.onload');
    });

    document.addEventListener('DOMContentLoaded', function () {
        console.debug('event: document.DOMContentLoaded');
    });

    document.addEventListener('readystatechange', function () {
        console.debug(`event: document.readyState = ${document.readyState}`);
    });

    window.onReady = function (callback) {
        if (document.readyState === 'complete') return callback();
        else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    };
})();