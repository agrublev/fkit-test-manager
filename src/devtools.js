// const handlePanelShown = () => {
//     console.log('Page Modeller panel shown');
// };
//
// const handlePanelHidden = () => {
//     console.log('Page Modeller panel hidden');
// };
//
// chrome.devtools.panels.create('Page Modeller', 'react32.png', 'index.html', newPanel => {
//     newPanel.onShown.addListener(handlePanelShown);
//     newPanel.onHidden.addListener(handlePanelHidden);
// });
//
// // // Create a connection to the background page
// // var backgroundPageConnection = chrome.runtime.connect({
// //     name: "panel"
// // });
// //
// //
// // backgroundPageConnection.postMessage({
// //     name: 'init',
// //     tabId: chrome.devtools.inspectedWindow.tabId
// // });
// //
// // chrome.devtools.panels.create("Freedcamp Test Creator", null, "../index.html", function(extensionPanel) {
// //     var _window;
// //     var steps;
// //
// //     extensionPanel.onShown.addListener(function tmp(panelWindow) {
// //         extensionPanel.onShown.removeListener(tmp); // Run once
// //         _window = panelWindow;
// //
// //         _window._postMessage = function(obj) {
// //           backgroundPageConnection.postMessage({
// //             "name": "postMessage",
// //             "tabId": tab_id,
// //             "object": obj
// //           });
// //         };
// //
// //         // Initialize
// //         if (steps) {
// //           _window.setSteps(steps);
// //         } else {
// //           _window._postMessage({
// //             "method": "getSteps"
// //           });
// //         }
// //
// //
// //         // chrome.devtools.inspectedWindow.eval(
// //         //     "window.location.pathname",
// //         //      function(result) {
// //         //        _window.setPathname(result);
// //         //      }
// //         // );
// //     });
// //
// //     backgroundPageConnection.onMessage.addListener(function (message) {
// //       if (_window) {
// //         _window.setSteps(message);
// //       } else {
// //         steps = message;
// //       }
// //     });
// //   }
// // );
