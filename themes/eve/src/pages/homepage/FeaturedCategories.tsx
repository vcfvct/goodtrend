import React from "react";

function FeaturedCategories() {
  return (
    <div className="page-width">
      <div className="mb-8 mt-12">
        <h2 className="text-center">OUR CATEGORIES</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="relative col-span-1 row-span-1 men-cat">
          <img src="/bags.jpg" alt="Shop bags" />
          <a
            className="absolute underline top-[20px] left-[20px] bg-white px-2"
            href="/bags">
            SHOP Bags
          </a>
        </div>
        <div className="relative col-span-1 row-span-1 women-cat">
          <img src="/drinkwares.jpg" alt="Shop DrinkWare" />
          <a
            className="absolute underline top-[20px] left-[20px] bg-white px-2"
            href="/drinkwares">
            SHOP DrinkWare
          </a>
        </div>
        <div className="relative col-span-1 row-span-1 kid-cat">
          <img src="/tech-accessories.jpg" alt="Shop Tech Accessories" />
          <a
            className="absolute underline top-[20px] left-[20px] bg-white px-2"
            href="/tech-accessories">
            SHOP Tech Accessories
          </a>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCategories;

export const layout = {
  areaId: "content",
  sortOrder: 5,
};
