import { Suspense } from "react";
import {
  useShopQuery,
  CacheLong,
  gql,
  useRouteParams,
  Seo,
} from "@shopify/hydrogen";
import Layout from "../../components/Layout.server";
import ProductDetails from "../../components/ProductDeatils.client";

export default function Product() {
  const { handle } = useRouteParams();

  const {
    data: { product: product },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong,
    preload: true,
    variables: {
      handle,
    },
  });

  return (
    <>
      <Layout>
        <Suspense>
          <Seo type="product" data={product} />
        </Suspense>
        <div className="product-page container">
          <ProductDetails product={product} />
        </div>
      </Layout>
    </>
  );
}

const QUERY = gql`
  query Product($handle: String!) {
    product(handle: $handle) {
      title
      description
      media(first: 10) {
        nodes {
          ... on MediaImage {
            id
            image {
              url
              width
              height
              altText
            }
          }
        }
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
