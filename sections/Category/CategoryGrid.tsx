import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
// import Slider from "../../components/ui/Slider.tsx";
// import { clx } from "../../sdk/clx.ts";
import { LoadingFallbackProps } from "deco/mod.ts";

/** @titleBy label */
export interface Item {
  image: ImageWidget;
  text: string;
  href: string;
  label: string;
}

export interface Props extends SectionHeaderProps {
  items: Item[];
}

function Card({ image, href, label, text }: Item) {
  return (
    <a href={href} class="flex flex-col items-center justify-center gap-4">
      <div class="lg:w-44 lg:h-44 w-24 h-24 rounded-full flex justify-center items-center contrast">
        <Image
          src={image}
          alt={label}
          width={200}
          height={200}
          loading="lazy"
        />
      </div>
      <span className="font-medium text-sm uppercase text-base-200">{text}</span>
      <span class="font-medium text-sm underline text-base-200">{label}</span>
    </a>
  );
}

function CategoryGrid({ title, cta, items }: Props) {
  const device = useDevice();

  return (
    <Section.Container>
      <Section.Header title={title} cta={cta}  />

      {device === "desktop"
        ? (
          <div class="grid grid-cols-6 gap-10">
            {items.map((i) => <Card {...i} />)}
          </div>
        )
        : (
          <div class="grid grid-cols-3 gap-10 overflow-hidden">
            {items.map((i) => <Card {...i} />)}
          </div>
        )}
    </Section.Container>
  );
}

export const LoadingFallback = (
  { title, cta }: LoadingFallbackProps<Props>,
) => (
  <Section.Container>
    <Section.Header title={title} cta={cta} />
    <Section.Placeholder height="212px" />;
  </Section.Container>
);

export default CategoryGrid;
