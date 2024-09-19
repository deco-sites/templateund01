import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { useScript } from "deco/hooks/useScript.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  product: Product;
  seller: string;
  item: AnalyticsItem;
}

const onClick = () => {
  event?.stopPropagation();
  const button = event?.currentTarget as HTMLButtonElement | null;
  const container = button!.closest<HTMLDivElement>("div[data-cart-item]")!;
  const { item, platformProps } = JSON.parse(
    decodeURIComponent(container.getAttribute("data-cart-item")!),
  );
  window.STOREFRONT.CART.addToCart(item, platformProps);
};

const onChange = () => {
  const input = event!.currentTarget as HTMLInputElement;
  const productID = input!
    .closest("div[data-cart-item]")!
    .getAttribute("data-item-id")!;
  const quantity = Number(input.value);

  if (!input.validity.valid) {
    return;
  }

  window.STOREFRONT.CART.setQuantity(productID, quantity);
};

// Copy cart form values into AddToCartButton
const onLoad = (id: string) => {
  window.STOREFRONT.CART.subscribe((sdk) => {
    const container = document.getElementById(id);
    const checkbox = container?.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    const input = container?.querySelector<HTMLInputElement>(
      'input[type="number"]',
    );
    const itemID = container?.getAttribute("data-item-id")!;

    const quantity = sdk.getQuantity(itemID) || 0;

    if (!input || !checkbox) {
      return;
    }

    input.value = quantity.toString();
    checkbox.checked = quantity > 0;

    // enable interactivity
    container?.querySelectorAll<HTMLButtonElement>("button").forEach((node) =>
      node.disabled = false
    );
    container?.querySelectorAll<HTMLButtonElement>("input").forEach((node) =>
      node.disabled = false
    );
  });
};

const useAddToCart = ({ product, seller }: Props) => {
  const platform = usePlatform();
  const { additionalProperty = [], isVariantOf, productID } = product;
  const productGroupID = isVariantOf?.productGroupID;

  if (platform === "vtex") {
    return {
      allowedOutdatedData: ["paymentData"],
      orderItems: [{ quantity: 1, seller: seller, id: productID }],
    };
  }

  if (platform === "shopify") {
    return { lines: { merchandiseId: productID } };
  }

  if (platform === "vnda") {
    return {
      quantity: 1,
      itemId: productID,
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    };
  }

  if (platform === "wake") {
    return {
      productVariantId: Number(productID),
      quantity: 1,
    };
  }

  if (platform === "nuvemshop") {
    return {
      quantity: 1,
      itemId: Number(productGroupID),
      add_to_cart_enhanced: "1",
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    };
  }

  if (platform === "linx") {
    return {
      ProductID: productGroupID,
      SkuID: productID,
      Quantity: 1,
    };
  }

  return null;
};

function AddToCartButton(props: Props) {
  const { product, item, class: _class } = props;
  const platformProps = useAddToCart(props);
  const id = useId();

  return (
    <div
      id={id}
      class="flex w-1/2"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({ item, platformProps }),
      )}
    >
      <input type="checkbox" class="hidden peer" />

      <button
        disabled
        class={clx("flex-grow  px-[12px] py-2 !text-white !bg-[#008081]", _class?.toString())}
        hx-on:click={useScript(onClick)}
      >
        ADICIONAR <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.14257 5.15063H4.6307H4.44043L4.43095 5.34067L3.80025 17.99L3.78978 18.2H4H17H17.2101L17.1998 17.9902L16.5881 5.55814V5.33132V5.13132H16.3881H13.8287C13.8054 4.25848 13.4572 3.42551 12.8523 2.805C12.2256 2.16213 11.3745 1.8 10.4859 1.8C9.5973 1.8 8.74618 2.16213 8.11946 2.805C7.51007 3.43008 7.16124 4.27078 7.14257 5.15063ZM8.01414 5.13132C8.03716 4.4896 8.29578 3.87994 8.73869 3.42561C9.20296 2.94938 9.83155 2.6828 10.4859 2.6828C11.1402 2.6828 11.7688 2.94938 12.2331 3.42561C12.676 3.87994 12.9346 4.4896 12.9576 5.13132H8.01414ZM4.709 17.3075L5.26353 6.04309H6.72049H15.7647L16.3192 17.3075H4.709Z" fill="white" stroke="white" stroke-width="0.4"/>
        </svg>

      </button>

      {/* Quantity Input */}
      <div class="flex-grow !hidden">
        <QuantitySelector
          disabled
          min={0}
          max={100}
          hx-on:change={useScript(onChange)}
        />
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}

export default AddToCartButton;
