import React from "react";

function Logo() {
  return (
    <div>
      <a href="/">
        <img style={{maxHeight: '40px'}} src="/goodtrend2.svg" alt="goodtrend" />
      </a>
    </div>
  );
}

export default Logo;

export const layout = {
  areaId: "header",
  sortOrder: 5,
};
