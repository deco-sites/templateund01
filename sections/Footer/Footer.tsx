import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import Section from "../../components/ui/Section.tsx";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

interface Props {
  imageBackground?: ImageWidget;
  links?: Link[];
  social?: Social[];
  paymentMethods?: Social[];
  seals?: Social[];
  // policies?: Item[];
  // logo?: ImageWidget;
  trademark?: string;
}

function Footer({
  imageBackground,
  links = [],
  social = [],
  seals = [],
  // policies = [],
  paymentMethods = [],
  // logo,
  trademark,
}: Props) {
  return (
    <footer
      class="px-5 sm:py-8 sm:px-0 text-white lg:bg-black bg-[#05123299]"
      style={{ backgroundImage: imageBackground }}
    >
      <div class="container-custom flex flex-col gap-5 sm:gap-10 py-10">
        <ul class="grid grid-flow-row sm:grid-flow-col gap-6 ">
          {links.map(({ title, href, children }) => (
            <li class="flex flex-col gap-4 items-center">
              <a class="text-base font-semibold" href={href}>{title}</a>
              <ul class="flex flex-col gap-2 items-center">
                {children.map(({ title, href }) => (
                  <li>
                    <a class="text-sm font-medium text-base-400" href={href}>
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <hr class="w-full text-base-400 hidden lg:block" />
        <div class="flex flex-col sm:flex-row gap-12 justify-between items-start items-center">
          <div class="flex flex-wrap gap-2 items-center">
            <span class="text-xs font-normal">
              Pague com
            </span>
            <ul class="flex flex-wrap gap-2">
              {paymentMethods.map(({ image, alt }) => (
                <li class="h-8 w-10 border border-base-100 rounded flex justify-center items-center">
                  <Image
                    src={image}
                    alt={alt}
                    width={20}
                    height={20}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <span class="text-xs font-normal">
              Redes Sociais:
            </span>
            <ul class="flex gap-4">
              {social.map(({ image, href, alt }) => (
                <li>
                  <a href={href}>
                    <Image
                      src={image}
                      alt={alt}
                      loading="lazy"
                      width={24}
                      height={24}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <span class="text-xs font-normal">
              selos
            </span>
            <ul class="flex gap-4">
              {seals.map(({ image, href, alt }) => (
                <li class="h-[52px] w-fit">
                  <a href={href}>
                    <Image
                      class="h-[52px] object-contain w-auto"
                      src={image}
                      alt={alt}
                      loading="lazy"
                      width={68}
                      height={53}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div class="grid grid-flow-row sm:grid-flow-col gap-8">
          {
            /* <ul class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
            {policies.map(({ title, href }) => (
              <li>
                <a class="text-xs font-medium" href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul> */
          }

          <div class="flex flex-nowrap items-center justify-between sm:justify-center gap-4">
            {
              /* <div>
              <img loading="lazy" src={logo} />
            </div> */
            }
            <span class="text-xs font-medium text-white">{trademark}</span>
          </div>

          <div class="flex flex-nowrap items-center justify-center gap-4">
            <span class="text-sm font-normal text-base-400">Powered by</span>
            <PoweredByDeco />
          </div>
        </div>
      </div>
    </footer>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;

export default Footer;
