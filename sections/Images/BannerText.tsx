import { type HTMLWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";

export interface Props {

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
  
};

function ShoppableBanner(props: Props) {
  const {  text, title } = { ...DEFAULT_PROPS, ...props };
   // Desestruturando as variáveis corretamente

  return (
    <div class="container-custom mt-[148px] lg:mt-[112px] mb-8">
      <div class="" >
        <div className="relative flex justify-center items-center">
          <h2 class={`card-title text-[28px] mb-4 text-[#1a1a1a] max-w-[440px] z-20 flex font-[Glorify] ${title?.layout?.position}`}>
            {title?.content}
          </h2>

          
        </div>
        
        <div class="">     
        {text && (
            <>
              {/* <p class={`text-base-200 ${text?.layout?.position}`}>
                {text?.content}
              </p> */}
              {text?.content && (
                <div
                class={`text-base-200 custom-p ${text?.layout?.position}`}
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
