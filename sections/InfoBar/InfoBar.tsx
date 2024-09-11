import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { LoadingFallbackProps } from "deco/mod.ts";

/** @titleBy label */
export interface Item {
  image: ImageWidget;
  title: string;
  label: string;
}

export interface Props extends SectionHeaderProps {
  items: Item[];
}

function Card({ image, title, label }: Item) {
  return (
    <div class="flex flex-row items-center justify-center gap-2">
      <div class="w-24 h-24 rounded-full flex justify-center items-center">
        <Image
          src={image}
          alt={label}
          width={80}
          height={80}
          loading="lazy"
        />
      </div>
      <div class="flex flex-col">
        <span class="font-medium text-base text-base-200 font-semibold">{title}</span>
        <span class="font-medium text-sm text-base-200">{label}</span>

      </div>
    </div>
  );
}

function InfoBar({ title, cta, items }: Props) {
  const device = useDevice();

  return (
    <Section.Container class="relative top-[-10px]" style={{ backgroundColor: '#EEEAE5' }}>
      <Section.Header title={title} cta={cta} />

      {device === "desktop"
        ? (
          <div class="grid grid-cols-5 gap-10">
            {items.map((i) => <Card {...i} />)}
          </div>
        )
        : (
          <Slider class="carousel carousel-center sm:carousel-end gap-5 w-full">
            {items.map((i, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "first:pl-5 first:sm:pl-0",
                  "last:pr-5 last:sm:pr-0",
                )}
              >
                <Card {...i} />
              </Slider.Item>
            ))}
          </Slider>
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

export default InfoBar;
