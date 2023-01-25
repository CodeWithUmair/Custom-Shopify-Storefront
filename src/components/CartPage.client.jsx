import { Suspense } from "react";
import {
  CartCost,
  CartLineProvider,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
  Image,
  Link,
  Money,
  useCart,
  useCartLine,
} from "@shopify/hydrogen";

export default function CartPage() {
  return (
    <>
      <Suspense>
        <CartTable />
      </Suspense>
    </>
  );
}

function CartTable() {
  const { lines, checkoutUrl, status } = useCart();

  if (lines.length === 0) {
    if (status === "idle") {
      return (
        <div
          style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.5rem" }}
        >
          No items are currently in the Cart
        </div>
      );
    }
  } else {
    return (
      <>
        <table className="cart-table">
          <tbody>
            {lines.map((line) => {
              return (
                <CartLineProvider key={line.id} line={line}>
                  <CartLineItem />
                </CartLineProvider>
              );
            })}
            <tr>
              <td colSpan="2"></td>
              <td>Total:</td>
              <td>
                <CartCost withoutTrailingZeros />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="cart-footer">
          <Link to={checkoutUrl} className="checkout-button">
            Checkout
          </Link>
        </div>
      </>
    );
  }
}

function CartLineItem() {
  const { lineId, merchandise, cost } = useCartLine();
  const { image, product, selectedOptions } = merchandise;

  return (
    <>
      <tr key={lineId}>
        <td>
          <Image className="line-item-image" data={image} />
        </td>
        <td>
          <Link
            to={`/products/${product.handle}`}
            className="line-item-product-title"
          >
            {product.title}
          </Link>
          <div className="line-item-variant">
            {(selectedOptions || []).map((option) => (
              <span key={option.name}>
                {option.name}: {option.value}
              </span>
            ))}
          </div>
          <Money withoutTrailingZeros data={merchandise.priceV2} />
        </td>
        <td>
          <div className="cart-quantity-selector">
            <CartLineQuantityAdjustButton adjust="decrease">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 12H6"
                />
              </svg>
            </CartLineQuantityAdjustButton>
            <CartLineQuantity />
            <CartLineQuantityAdjustButton adjust="increase">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </CartLineQuantityAdjustButton>
          </div>
        </td>
        <td>
          <Money withoutTrailingZeros data={cost.totalAmount} />
          <CartLineQuantityAdjustButton
            as="div"
            className="cart-remove"
            adjust="remove"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </CartLineQuantityAdjustButton>
        </td>
      </tr>
    </>
  );
}
