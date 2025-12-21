        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js?v=1766344719').then(function(reg) {
                reg.onupdatefound = function() {
                    var installingWorker = reg.installing;
                    installingWorker.onstatechange = function() {
                        switch (installingWorker.state) {
                            case 'installed':
                                if (navigator.serviceWorker.controller) {
                                    var event = document.createEvent('Event');
                                    event.initEvent('sw.update', true, true);
                                    window.dispatchEvent(event);
                                }
                                break;
                        }
                    };
                };
            }).catch(function(e) {
                console.error('Error during service worker registration:', e);
            });
        }
