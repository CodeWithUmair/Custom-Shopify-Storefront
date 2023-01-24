import {
  ProductOptionsProvider,
  useProductOptions,
  Image,
  ProductPrice,
  AddToCartButton,
} from "@shopify/hydrogen";

export default function ProductDetails({ product }) {
  console.log(product);

  return (
    <>
      <ProductOptionsProvider data={product}>
        <Image
          alt={product.media.nodes[0].image.altText}
          data={product.media.nodes[0].image}
          className="product-page-image"
        />
        <ProductForm product={product} />
      </ProductOptionsProvider>
    </>
  );
}

function ProductForm({ product }) {
  const { options, selectedVariant, selectedOptions, setSelectedOption } =
    useProductOptions();

  const isOutOfStock = !selectedVariant?.availableForSale || false;

  return (
    <>
      <div>
        <h1>{product.title}</h1>
        <ProductPrice
          className="product-page-price"
          withoutTrailingZeros
          data={product}
          variantId={selectedVariant.id}
        />

        <div>
          {options.map(({ name, values }) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div className="product-option-group" key={name}>
                <legend className="product-option-name">{name}</legend>
                {values.map((value) => {
                  const id = `option-${name}=${value}`;
                  const checked = selectedOptions[name] === value;

                  return (
                    <div className="product-option-value" key={id}>
                      <input
                        type="radio"
                        id={id}
                        checked={checked}
                        name={name}
                        value={value}
                        onChange={() => setSelectedOption(name, value)}
                      />
                      <label htmlFor={id}>{value}</label>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <AddToCartButton disabled={isOutOfStock} className="add-to-cart">
          {isOutOfStock ? "Out of stoke" : "Add to Cart"}
        </AddToCartButton>
        <div
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
    </>
  );
}
