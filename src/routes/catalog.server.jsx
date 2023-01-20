import { useShopQuery, CacheLong, gql } from "@shopify/hydrogen";
import { Suspense } from "react";
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

  console.log(nodes);

  return (
    <>
      <Layout>
        <Suspense>
          <div className="catalog-page container">
            <div className="product-grid">
              <ul>
                {nodes.map((product) => (
                  <ProductCard product={product} />
                ))}
              </ul>
            </div>
          </div>
        </Suspense>
      </Layout>
    </>
  );
}

const QUERY = gql`
  query products {
    products(first: 9) {
      nodes {
        title
        handle
      }
    }
  }
`;
