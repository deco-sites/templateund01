import { type ImageWidget, type HTMLWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  background: string;
  imageLeft: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  imageRight: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
  };

  title?: {
    content?: string;
    layout?: {
      position?: "justify-start" | "justify-center" | "justify-end";
    };
  };
  text?: {
    /**
   * @title Content
   * @format rich-text
   */
    content?: HTMLWidget;
    layout?: {
      position?: "text-center" | "text-left" | "text-right";
    };
  };
}

const DEFAULT_PROPS: Props = {
  background: "#EEEAE5",
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
  imageLeft: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
    altText: "Fashion",
    top: "",
    bottom: "",
    left: "",
    right: ""
  },
  imageRight: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
    altText: "Fashion",
    top: "",
    bottom: "",
    left: "",
    right: ""
  },
};

function ShoppableBanner(props: Props) {
  const { background, text, title, imageLeft, imageRight } = { ...DEFAULT_PROPS, ...props };
   // Desestruturando as variáveis corretamente

  return (
    <div class="container-custom mb-8">
      <div class="card lg:card-side rounded grid grid-cols-1 lg:grid-cols-2" style={{ backgroundColor: background }}>
        <div className="relative flex justify-center items-center px-12 py-12">
          <h2 class={`card-title text-[32px]  max-w-[440px] z-20 flex ${title?.layout?.position}`}>
            {title?.content}
          </h2>

          <figure class="absolute w-full h-full">
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={imageLeft?.mobile}
                width={46}
                height={46}
              />
              <Source
                media="(min-width: 768px)"
                src={imageLeft?.desktop ? imageLeft?.desktop : imageLeft?.mobile}
                width={177}
                height={177}
              />
              <img
                class={`object-cover absolute`}
                style={{
                  top: imageLeft?.top || 'auto',
                  bottom: imageLeft?.bottom || 'auto',
                  left: imageLeft?.left || 'auto',
                  right: imageLeft?.right || 'auto',
                }}
                sizes="(max-width: 640px) 100vw, 30vw"
                src={imageLeft?.mobile}
                alt={imageLeft?.altText}
                decoding="async"
                loading="lazy"
              />
            </Picture>
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={imageRight?.mobile}
                width={46}
                height={46}
              />
              <Source
                media="(min-width: 768px)"
                src={imageRight?.desktop ? imageRight?.desktop : imageRight?.mobile}
                width={177}
                height={177}
              />
              <img
                class={`object-cover absolute`}
                style={{
                  top: imageRight?.top || 'auto',
                  bottom: imageRight?.bottom || 'auto',
                  left: imageRight?.left || 'auto',
                  right: imageRight?.right || 'auto',
                }}
                sizes="(max-width: 640px) 100vw, 30vw"
                src={imageRight?.mobile}
                alt={imageRight?.altText}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </figure>
        </div>
        
        <div class="flex flex-col bg-[#EEEAE5] justify-center gap-6  px-12 py-12">     
        {text && (
            <>
              {/* <p class={`text-base-200 ${text?.layout?.position}`}>
                {text?.content}
              </p> */}
              {text?.content && (
                <span
                class={`text-base-200 custom-p text-sm ${text?.layout?.position}`}
                  dangerouslySetInnerHTML={{ __html: text.content }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default ShoppableBanner;
