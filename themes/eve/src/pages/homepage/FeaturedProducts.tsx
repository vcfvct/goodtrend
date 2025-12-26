import { ProductList } from "@components/frontStore/catalog/ProductList.js";
import { _ } from "@evershop/evershop/src/lib/locale/translate";
import React from "react";

interface Product {
  productId: number;
  name: string;
  price: {
    regular: {
      value: number;
      text: string;
    };
    special: {
      value: number;
      text: string;
    };
  };
  image: {
    alt: string;
    url: string;
  };
  url: string;
}

interface Collection {
  collectionId: number;
  name: string;
  products: {
    items: Product[];
  };
}

interface FeaturedProductsProps {
  collection: Collection;
}

export default function FeaturedProducts({ collection }: FeaturedProductsProps) {
  if (!collection) {
    return null;
  }
  return (
    <div className="pt-3">
      <div className="page-width">
        <h2 className="mt-3 mb-3 text-center uppercase  tracking-widest">
          {collection.name}
        </h2>
        <ProductList products={collection.products.items} countPerRow={3} />
      </div>
    </div>
  );
}

FeaturedProducts.defaultProps = {
  featuredProducts: [],
};

// export const layout = {
//   areaId: "content",
//   sortOrder: 15,
// };

export const query = `
  query query {
    collection (code: "homepage") {
      collectionId
      name
      products (filters: [{key: "limit", operation: eq, value: "6"}]) {
        items {
          productId
          name
          price {
            regular {
              value
              text
            }
            special {
              value
              text
            }
            }
          image {
            alt
            url: listing
          }
          url
        }
      }
    }
  }
`;
