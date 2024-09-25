import { type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  description?: string;
  colorText: string;
  images: {
    mobile: ImageWidget;
    desktop: ImageWidget;
  };
  imageBackground: ImageWidget;
  colorBackground: string;
  cta?: {
    href: string;
    label: string;
  };
}

function Banner(
  { description, images, cta, colorText, imageBackground, colorBackground }:
    Props,
) {
  return (
    <Section.Container
      class="lg:px-8 lg:mt-[85px] mt-[138px] lg:min-h-[400px] justify-center"
      style={{
        backgroundColor: colorBackground,
        backgroundImage: `url(${imageBackground})`,
      }}
    >
      <div class="relative sm:mx-0 flex w-full flex-col justify-center items-center">
        <Picture>
          <Source
            media="(max-width: 640px)"
            src={images.mobile}
            width={190}
            height={95}
          />
          <Source
            media="(min-width: 640px)"
            src={images.desktop}
            width={190}
            height={95}
          />
          <img src={images.desktop} class="" />
        </Picture>

        <div
          style={{ color: colorText }}
          class={clx(
            "relative left-0 top-0 color-mobile",
            "p-5 md:px-[60px]",
            "flex flex-col",
            "h-full max-w-full md:max-w-[50%] justify-start",
          )}
        >
          {description && (
            <span
              style={{ color: colorText }}
              class="font-normal text-base md:pt-2 pb-2 text-center mb-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <div class="">
            {cta && (
              <a
                href={cta.href}
                class="btn-primary rounded-none bg-white hover:bg-transparent no-animatio w-fit lg:border-0 min-w-[180px] text-base-200 text-sm uppercase border-2 lg:border-transparent lg:hover:border-base-200 max-lg:border max-lg:border-[#051232] px-6 py-3 max-lg:mt-2"
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </Section.Container>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default Banner;
