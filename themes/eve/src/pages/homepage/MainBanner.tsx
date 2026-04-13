import React from "react";
import "./MainBanner.scss";

const MainBanner: React.FC = () => {
  return (
    <section className="main-banner-home">
      <div className="main-banner-overlay" />
      <div className="page-width relative z-10 flex items-center h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col justify-center text-center md:text-left px-2">
            <span className="main-banner-tagline uppercase tracking-widest text-sm mb-4 inline-block">
              Premium Promotional Products
            </span>
            <h1 className="main-banner-heading">
              We Know <span className="main-banner-accent">Branding</span>
            </h1>
            <p className="main-banner-subtitle mt-4 mb-8">
              Find a wide selection of high-quality promotional items that are
              sure to deliver the perfect promotion for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a className="button button-primary" href="/#featured-categories">
                BROWSE CATEGORIES
              </a>
              <a className="button button-outline" href="/contact">
                GET A QUOTE
              </a>
            </div>
          </div>
          <div />
        </div>
      </div>
    </section>
  );
};

export default MainBanner;

export const layout = {
  areaId: "content",
  sortOrder: 1,
};
