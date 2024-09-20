import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";

interface Props {
  page: ProductDetailsPage | null;
}
function truncateDescription(description: string, maxLength: number) {
  if (description.length <= maxLength) return description;
  return `${description.substring(0, maxLength)}...`;
}
function ProductInfo({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf } = product;
  const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;

  const {
    price = 0,
    listPrice,
    seller = "1",
    availability,
  } = useOffer(offers);

  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  //Checks if the variant name is "title"/"default title" and if so, the SKU Selector div doesn't render
  const hasValidVariants = isVariantOf?.hasVariant?.some(
    (variant) =>
      variant?.name?.toLowerCase() !== "title" &&
      variant?.name?.toLowerCase() !== "default title",
  ) ?? false;

  return (
    <div {...viewItemEvent} class="flex flex-col scroll-smooth" id={id}>
      {/* Price tag */}
      <span
        class={clx(
          "text-sm/4 font-normal text-black bg-base-200 bg-opacity-15 text-center rounded-badge px-2 py-1",
          percent < 1 && "hidden",
          "w-fit",
        )}
      >
        {percent} % off
      </span>

      {/* Product Name */}
      <span class={clx("font-normal", "pt-0 text-base-200 text-[28px]")}>
        {title}
      </span>

      {/* Prices */}
      <div class="flex gap-3 pt-1">
        <span class="text-base font-bold text-[#008081]">
          {formatPrice(price, offers?.priceCurrency)}
        </span>
        <span class="line-through text-base-200 font-normal">
          {formatPrice(listPrice, offers?.priceCurrency)}
        </span>
      </div>
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <div class="mt-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: truncateDescription(description, 140),
                }}
              />
              <a
                href="#more-info"
                class="text-base-200 underline scroll-smooth"
              >
                Mais informações
              </a>
            </div>
          )}
        </span>
      </div>
      {/* Sku Selector */}
      {hasValidVariants && (
        <div className="mt-4 sm:mt-8">
          <ProductSelector product={product} />
        </div>
      )}

      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              <AddToCartButton
                item={item}
                seller={seller}
                product={product}
                class="btn btn-primary no-animation"
                disabled={false}
              />
              <WishlistButton item={item} />
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>

      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulationForm
          items={[{ id: Number(product.sku), quantity: 1, seller: seller }]}
        />
      </div>

      {/* Description card */}
      <div class="mt-4 sm:mt-6 ">
        <span class="text-sm">
          {description && (
            <details class="aparence-none">
              <summary class="cursor-pointer" id="more-info">DESCRIÇÃO</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
