// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "panel"
});

var tab_id = chrome.devtools.inspectedWindow.tabId;

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});

chrome.devtools.panels.create("Freedcamp Test Creator", null, "../index.html", function (extensionPanel) {
    var _window;
    var steps;

    extensionPanel.onShown.addListener(function tmp(panelWindow) {
        extensionPanel.onShown.removeListener(tmp); // Run once
        _window = panelWindow;

        _window._postMessage = function (obj) {
            backgroundPageConnection.postMessage({
                "name": "postMessage",
                "tabId": tab_id,
                "object": obj
            });
        };
        console.warn("-- Console LISTENB2323", 34232);
        // Initialize
        // if (steps) {
        //   _window.setSteps(steps);
        // } else {
        //   _window._postMessage({
        //     "method": "getSteps"
        //   });
        // }


        // chrome.devtools.inspectedWindow.eval(
        //     "window.location.pathname",
        //      function(result) {
        //        _window.setPathname(result);
        //      }
        // );
    });

    backgroundPageConnection.onMessage.addListener(function (message) {
        if (_window) {
            _window.setSteps(message);
        } else {
            steps = message;
        }
    });
});


// The function below is executed in the context of the inspected page.
var page_getProperties = function () {
    var data = window.jQuery && $0 ? jQuery.data($0) : {};
    // Make a shallow copy with a null prototype, so that sidebar does not
    // expose prototype.
    var props = Object.getOwnPropertyNames(data);
    var copy = {__proto__: null};
    for (var i = 0; i < props.length; ++i)
        copy[props[i]] = data[props[i]];
    return copy;
};

chrome.devtools.panels.elements.createSidebarPane(
    "jQuery Properties",
    function (sidebar) {
        function updateElementProperties() {
            sidebar.setExpression("(" + page_getProperties.toString() + ")()");
        }

        updateElementProperties();
        chrome.devtools.panels.elements.onSelectionChanged.addListener(
            updateElementProperties);
    });
