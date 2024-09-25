import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductImageZoom from "./ProductImageZoom.tsx";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Share from "./Share.tsx";
export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const WIDTH = 820;
const HEIGHT = 820;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();
  const zoomId = `${id}-zoom`;

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const { page: { product: { name, isVariantOf, image: pImages } } } = props;

  // Filter images when image's alt text matches product name
  // More info at: https://community.shopify.com/c/shopify-discussions/i-can-not-add-multiple-pictures-for-my-variants/m-p/2416533
  const groupImages = isVariantOf?.image ?? pImages ?? [];
  const filtered = groupImages.filter((img) =>
    name?.includes(img.alternateName || "")
  );
  const images = filtered.length > 0 ? filtered : groupImages;

  return (
    <>
      <div
        id={id}
        class="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-[min-content_1fr] gap-5"
      >
        {/* Image Slider */}
        <div class="col-start-1 col-span-1 sm:col-start-2">
          <div class="relative h-min flex-grow">
            <Slider class="carousel carousel-center gap-6 w-full">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
                >
                  <Image
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <Slider.PrevButton
              class="no-animation absolute !border-0 lg:left-2 max-lg:left-auto max-lg:right-[60px] top-auto max-lg:bottom-[-50px] lg:top-1/2 btn btn-circle btn-outline disabled:opacity-70 z-20 text-[#008081]"
              disabled
            >
              <Icon id="chevron-right" class="rotate-180" />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation !border-0 absolute right-1 top-auto max-lg:bottom-[-50px] lg:top-1/2 btn btn-circle btn-outline disabled:opacity-70 z-20 text-[#008081]"
              disabled={images.length < 2}
            >
              <Icon id="chevron-right" />
            </Slider.NextButton>

            <div class="absolute top-0 right-0 z-10 !bg-transparet h-[90%] w-full rounded-full">
              <label
                class="btn !bg-transparent btn-ghost hidden sm:inline-flex w-full h-full"
                for={zoomId}
              >
                <Icon id="pan_zoom" class="hidden" />
              </label>
            </div>

            {/* share */}
            <div class="flex justify-between items-center mt-[25px] max-lg:hidden">
              <Share />
              <span class="flex gap-2 items-center text-sm text-base-200 max-lg:hidden">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                    stroke="#051232"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.5 17.5L13.875 13.875"
                    stroke="#051232"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 9H6"
                    stroke="#051232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M9 12V6"
                    stroke="#051232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>Clique nas imagens para ampliá-las
              </span>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div class="col-start-1 col-span-1">
          <ul
            class={clx(
              "carousel carousel-center",
              "sm:carousel-vertical",
              "gap-2",
              "max-w-full",
              "overflow-x-auto",
              "sm:overflow-y-auto",
            )}
            style={{ maxHeight: "600px" }}
          >
            {images.map((img, index) => (
              <li class="carousel-item lg:w-16 lg:h-16 w-1.5 h-1.5 max-lg:border max-lg:rounded-full max-lg:border-base-200 group-disabled:bg-base-200">
                <Slider.Dot index={index} class="group-disabled:bg-base-200">
                  <Image
                    style={{ aspectRatio: "1 / 1" }}
                    class="group-disabled:border-base-400 border rounded object-cover w-full h-full group-disabled:bg-base-200 max-lg:invisible"
                    width={64}
                    height={64}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>

        <Slider.JS rootId={id} />
      </div>
      <ProductImageZoom
        id={zoomId}
        images={images}
        width={700}
        height={Math.trunc(700 * HEIGHT / WIDTH)}
      />
    </>
  );
}
