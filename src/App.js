import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//
// chrome.devtools.panels.elements.createSidebarPane(
//     "FC Tester",
//     function(sidebar) {
//         console.warn("-- Console 5252", sidebar);
//         function updateElementProperties() {
//             console.warn("-- Console SHOIOW", sidebar);
//             sidebar.setExpression("(" + page_getProperties.toString() + ")()");
//         }
//         updateElementProperties();
//         chrome.devtools.panels.elements.onSelectionChanged.addListener(
//             updateElementProperties);
//     });

class App extends Component {
    componentDidMount() {
        console.warn("-- Console WHERE AM I ", document.getElementById("root"));
        //
        // chrome.devtools.panels.create("Freedcamp Test Creator",
        //     "react48.png",
        //     "devtools.html",
        //     function(panel) {
        //         console.warn("-- Console ", panel);
        //     });
    }


    changeColor(e) {
    window.chrome.tabs.executeScript(null, { code: "document.body.style.backgroundColor='" + e.target.id + "'" });
  }

  render() {
    return (
      <div className="App" style={{ minWidth: '400px' }}>
        <header className="App-header">
          <h1 className="App-title">Welcome to React Ch52rome Extension</h1>
        </header>
        <div className="App-intro">
          <div className="item" id="red" onClick={this.changeColor.bind(this)}>GRE22</div>
          <div className="item" id="blue" onClick={this.changeColor.bind(this)}>blue</div>
          <div className="item" id="green" onClick={this.changeColor.bind(this)}>green</div>
          <div className="item" id="yellow" onClick={this.changeColor.bind(this)}>yellow</div>
        </div>
      </div>
    );
  }
}

export default App;
