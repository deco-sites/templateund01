import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };
  background: string;
  pins?: Pin[];

  title?: {
    imageBanner?: ImageWidget; // Adicionando imageBanner como opcional
    content?: string;
    layout?: {
      position?: "justify-start" | "justify-center" | "justify-end";
    };
  };
  text?: {
    content?: string;
    layout?: {
      position?: "text-center" | "text-left" | "text-right";
    };
  };
  link?: {
    layout?: {
      position?: "justify-start" | "justify-center" | "justify-end";
    };
    text: string;
    href: string;
  };
}

export interface Pin {
  mobile: {
    x: number;
    y: number;
  };
  desktop?: {
    x: number;
    y: number;
  };
  link: string;
  label: string;
}

const DEFAULT_PROPS: Props = {
  title: {
    layout: {
      position: "justify-center",
    },
    content: "Collection",
  },
  text: {
    layout: {
      position: "text-center",
    },
    content: "Your text",
  },
  link: {
    layout: {
      position: "justify-center",
    },
    href: "#",
    text: "Text link",
  },
  background: "#1034A6",
  pins: [],
  image: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
    altText: "Fashion",
  },
};

function ShoppableBanner(props: Props) {
  const { link, text, title, image, pins, background } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <div class="container-custom mb-8 mt-12">
      <div class="card lg:card-side rounded grid grid-cols-1 lg:grid-cols-2">
        <figure class="relative">
          <Picture class="max-lg:w-full">
            <Source
              media="(max-width: 767px)"
              src={image?.mobile}
              width={250}
              height={250}
            />
            <Source
              media="(min-width: 768px)"
              src={image?.desktop ? image?.desktop : image?.mobile}
              width={696}
              height={614}
            />
            <img
              class="w-full h-full object-cover"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image?.mobile}
              alt={image?.altText}
              decoding="async"
              loading="lazy"
            />
          </Picture>
          {pins?.map(({ mobile, desktop, link, label }) => (
            <>
              <a
                href={link}
                class="absolute w-min btn btn-accent rounded-full hover:rounded text-accent no-animation md:scale-[30%] hover:text-accent-content hover:scale-125 sm:hidden"
                style={{
                  left: `${mobile.x}%`,
                  top: `${mobile.y}%`,
                }}
              >
                <span>{label}</span>
              </a>
              <a
                href={link}
                class="absolute w-min btn btn-accent rounded-full hover:rounded text-accent no-animation md:scale-[30%] hover:text-accent-content hover:scale-125 hidden sm:inline-flex"
                style={{
                  left: `${desktop?.x ?? mobile.x}%`,
                  top: `${desktop?.y ?? mobile.y}%`,
                }}
              >
                <span>{label}</span>
              </a>
            </>
          ))}
        </figure>
        <div
          class="flex flex-col justify-center gap-6 py-20 px-8"
          style={{ backgroundColor: background }}
        >
          {title?.imageBanner && (
            <figure class="relative">
              <Picture class="w-fit">
                <Source
                  media="(max-width: 767px)"
                  src={title.imageBanner}
                  width={192}
                  height={95}
                />
                <Source
                  media="(min-width: 768px)"
                  src={title.imageBanner || title.imageBanner}
                  width={192}
                  height={95}
                />
                <img
                  class="w-48 h-24 object-cover"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={title.imageBanner}
                  alt={title?.content}
                  decoding="async"
                  loading="lazy"
                />
              </Picture>
            </figure>
          )}
          <h2 class={`card-title flex text-white ${title?.layout?.position}`}>
            {title?.content}
          </h2>
          <p class={`text-base-content ${text?.layout?.position}`}>
            {text?.content}
          </p>
          <div class={`card-actions ${link?.layout?.position}`}>
            <span
              class={`text-white ${text?.layout?.position} text-base`}
              href={link?.href}
            >
              {link?.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default ShoppableBanner;
