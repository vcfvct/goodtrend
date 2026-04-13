import React from "react";
import "./FeaturedCategories.scss";

interface CategoryItem {
  title: string;
  image: string;
  href: string;
  alt: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    title: "Bags",
    image: "/bags.jpg",
    href: "/bags",
    alt: "Shop bags",
  },
  {
    title: "DrinkWare",
    image: "/drinkwares.jpg",
    href: "/drinkwares",
    alt: "Shop DrinkWare",
  },
  {
    title: "Tech Accessories",
    image: "/tech-accessories.jpg",
    href: "/tech-accessories",
    alt: "Shop Tech Accessories",
  },
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="featured-categories">
      <div className="page-width">
        <div className="featured-categories-header">
          <span className="featured-categories-label">Browse</span>
          <h2 className="featured-categories-title">Our Categories</h2>
          <p className="featured-categories-subtitle">
            Explore our curated selection of premium promotional products
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              className="category-card group cursor-pointer"
            >
              <div className="category-card-image-wrapper">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="category-card-image"
                  loading="lazy"
                />
                <div className="category-card-overlay" />
              </div>
              <div className="category-card-content">
                <h3 className="category-card-title">{cat.title}</h3>
                <span className="category-card-link">
                  Shop Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="category-card-arrow"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

export const layout = {
  areaId: "content",
  sortOrder: 5,
};
