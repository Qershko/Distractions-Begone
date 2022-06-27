
chrome.runtime.onConnect.addListener(function (port) {

    port.onMessage.addListener(function (msg) {

        if (msg.alarm) {

            chrome.alarms.get(msg.alarm.site,
                function (data) {
                    chrome.alarms.clearAll();
                    if (data) {
                        port.postMessage({ response: "found alarm", data: data });
                        chrome.alarms.onAlarm.addListener(
                            function () {
                                port.postMessage({ alarm: msg.alarm });

                            }
                        )
                    }
                    else {
                        chrome.alarms.create(msg.alarm.site, { periodInMinutes: Number(msg.alarm.time) });
                        chrome.alarms.onAlarm.addListener(
                            function () {
                                port.postMessage({ alarm: msg.alarm });

                            }
                        )
                    }
                    chrome.alarms.getAll(function (data) {
                        port.postMessage({ response: "all alarms", data: data });
                    })
                }
            )

        }
        if (msg.pauseAlarm == true) {
            port.postMessage({ response: "cleared all" });
            chrome.alarms.clearAll();
        }

    });
});
