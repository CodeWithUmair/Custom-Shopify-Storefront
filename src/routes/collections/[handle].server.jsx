import {
  useShopQuery,
  CacheLong,
  gql,
  useRouteParams,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductGridItem.server";

export default function Collection() {
  const { handle } = useRouteParams();

  const data = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: true,
    variables: {
      handle,
    },
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

const QUERY = gql``;
