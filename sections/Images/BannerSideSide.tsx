import { type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

interface  Banner {
  title: string;
  description?: string;
  colorText: string;
  mobile: ImageWidget;
  desktop?: ImageWidget;

  cta?: {
    href: string;
    label: string;
  };
}

interface Props {
    /**
   * @maxItems 2
   * @minItems 2
   */
  banners?: Banner[];
}
function Banner({ title, description, mobile, desktop, cta, colorText }: Banner) {
  return (
    <div class="relative mx-5 sm:mx-0">
    <Picture>
      <Source
        media="(max-width: 640px)"
        src={mobile}
        width={335}
        height={572}
      />
      <Source
        media="(min-width: 640px)"
        src={desktop || mobile}
        width={1320}
        height={480}
      />
      <img src={desktop} alt={title} class="w-full object-cover" />
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
          class="font-normal text-sm md:pt-2 pb-2"
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
  );
}
function BannerSideSide({
  banners = [
    {
      title: "Fashion", // Título correto dentro do objeto
      description: "Fashion description", // Descrição correta dentro do objeto
      colorText: "#ffffff",
      mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      desktop:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      cta: {
        label: "Shop Now",
        href: "/",
      },
    },
    {
      title: "Fashion", // Título correto dentro do objeto
      description: "Fashion description", // Descrição correta dentro do objeto
      colorText: "#ffffff",
      mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      desktop:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      cta: {
        label: "Shop Now",
        href: "/",
      },
    },
  ],
}: Props) {
  return (
    <Section.Container class="py-8 sm:py-8">
      <ul class="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 px-5 sm:px-0">
        {banners.map((item, index) => (
          <li key={index}>
            <Banner {...item} />
          </li>
        ))}
      </ul>
    </Section.Container>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default BannerSideSide;
