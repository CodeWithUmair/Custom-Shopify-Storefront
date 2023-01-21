import { Suspense } from "react";
import { useShopQuery, CacheLong, gql, Seo, Link } from "@shopify/hydrogen";

export default function Layout({ children }) {
  const data = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  const {
    data: { shop },
  } = data;

  // console.log(data);

  return (
    <>
      <Seo
        type="defaultSeo"
        data={{
          title: shop.name,
          description: shop.description,
        }}
      />
      <header className="container header-inner">
        <ul className="header-navigation">
          <li>
            <a href="/catalog">Catalog</a>
          </li>
          <li>
            <a href="/collections/freestyle">Free Style</a>
          </li>
          {/* <li>
            <a href="/collections/winter-2022">winter-2022</a>
          </li> */}
        </ul>
        <Link to="/" className="header-logo">
          {shop.name}
        </Link>
        <div className="header-cart-link"></div>
      </header>
      <main>
        <Suspense>{children}</Suspense>
      </main>
    </>
  );
}

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
