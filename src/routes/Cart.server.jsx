import CartPage from "../components/CartPage.client";
import Layout from "../components/Layout.server";

export default function Cart() {
  return (
    <>
      <Layout>
        <div className="container">
          <CartPage />
        </div>
      </Layout>
    </>
  );
}
