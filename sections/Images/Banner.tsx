import {  type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  title: string;
  description?: string;
  colorText: string;
  images: {
    mobile: ImageWidget;
    desktop: ImageWidget;
  };

  cta?: {
    href: string;
    label: string;
  };
}

function Banner({ title, description, images, cta, colorText }: Props) {
  return (
    <Section.Container class="container">
      <div class="relative bg-base-200 mx-5 sm:mx-0">
        <Picture>
          <Source
            media="(max-width: 640px)"
            src={images.mobile}
            width={335}
            height={572}
          />
          <Source
            media="(min-width: 640px)"
            src={images.desktop}
            width={1320}
            height={480}
          />
          <img src={images.desktop} alt={title} class="w-full object-cover" />
        </Picture>

        <div 
          style={{ color: colorText }}
          class={clx(
            "absolute left-0 top-0",
            "p-5 sm:p-10 md:py-20 md:px-[60px]",
            "flex flex-col",
            "h-full max-w-full sm:max-w-[33%] md:max-w-[50%] justify-start",
          )}
        >
          {title && <span class="font-bold text-base text-[currentColor]">{title}
          </span>}
          {description && (
            <span
              style={{ color: colorText }}
              class="font-normal text-sm md:pt-2 pb-2 text-[currentColor]"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <div class="">
            {cta && (
              <a
                href={cta.href}
                class="btn btn-primary rounded-none bg-white hover:bg-transparent no-animatio w-fit border-0 min-w-[180px] text-base-200 text-sm uppercase border-2 border-transparent hover:border-base-200"
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
