import { Suspense } from "react";
import { useShopQuery, CacheLong, gql } from "@shopify/hydrogen";

import Layout from "../components/Layout.server";
import ProductCard from "../components/ProductGridItem.server";

export default function Catalog() {
  const data = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: true,
  });

  const {
    data: {
      products: { nodes },
    },
  } = data;

  // console.log(nodes);

  return (
    <>
      <Layout>
        <Suspense>
          <div className="catalog-page container">
            <div className="product-grid">
              {nodes.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        </Suspense>
      </Layout>
    </>
  );
}

const QUERY = gql`
  query products {
    products(first: 100) {
      nodes {
        title
        handle
        featuredImage {
          url
          altText
          height
          width
        }
        variants(first: 1) {
          nodes {
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
