import Area from "@components/common/Area.js";
import React from "react";

import "../../css/global.scss";
import "../../pages/all/Layout.scss";
import "../../pages/all/tailwind.scss";

export function Header() {
  return React.createElement(
    "div",
    { className: "header" },
    React.createElement(
      "div",
      { className: "page-width flex justify-between" },
      React.createElement(Area, {
        id: "header",
        noOuter: true,
        coreComponents: [
          {
            component: { default: Area },
            props: {
              id: "icon-wrapper",
              className: "icon-wrapper flex justify-between space-x-4",
            },
            sortOrder: 20,
          },
        ],
      })
    )
  );
}

export default Header;
