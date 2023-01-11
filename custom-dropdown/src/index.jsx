import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.scss";

import {DropdownExample} from "./stories/DropdownExample";
import {DropdownSync} from "./components";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <DropdownSync>
      <div className="App">
        <div className="example">
          <div className="example-section">
            <DropdownExample />
            <DropdownExample hover={true} />
          </div>
          <div className="example-section">
            <DropdownExample hover={true} />
            <DropdownExample />
          </div>
        </div>
      </div>
    </DropdownSync>
  </React.StrictMode>
);
