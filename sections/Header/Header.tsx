import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { LoadingFallbackProps } from "deco/mod.ts";
import Alert from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import SignIn from "../../components/header/SignIn.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem from "../../components/header/NavItem.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import HeaderScroll from "../../components/ui/HeaderScroll.tsx";
// import Modal from "../../components/ui/Modal.tsx";
import { useScript } from "deco/hooks/useScript.ts";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  // SEARCHBAR_DRAWER_ID,
  // SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface LogoSecondary {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface SectionProps {
  alerts?: HTMLWidget[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;

  /** @title Logo */
  logo: Logo;
  /** @title secondaryLogo */
  logoSecondary: LogoSecondary;
  /**
   * @description Usefull for lazy loading hidden elements, like hamburguer menus etc
   * @hide true */
  loading?: "eager" | "lazy";
}

type Props = Omit<SectionProps, "alert">;
const script = () => {
  const isHomePage = () => {
    return window.location.pathname === "/";
  };

  // Função chamada no carregamento da página
  const headerpages = () => {
    const headerPage = document.querySelector("header");
    if (headerPage) {
      if (!isHomePage()) {
        // Não está na home page
        headerPage.classList.add("not-home");
      } else {
        // Está na home page
        headerPage.classList.remove("not-home");
      }
    }
  };
  setTimeout(() => {
    headerpages();
  }, 200);
};
const Desktop = (
  { navItems, logo, searchbar, logoSecondary }: Props,
) => (
  <>
    {
      /* <Modal id={SEARCHBAR_POPUP_ID}>
      <div
        class="absolute top-0 bg-base-100 container"
        style={{ marginTop: HEADER_HEIGHT_MOBILE }}
      >
        {loading === "lazy"
          ? (
            <div class="flex justify-center items-center">
              <span class="loading loading-spinner" />
            </div>
          )
          : <Searchbar {...searchbar} />}
      </div>
    </Modal> */
    }

    <div class="flex flex-col gap-4 py-3 container-custom">
      <div class="flex justify-between items-center">
        <div class="flex justify-between items-center">
          <ul class="flex">
            {navItems?.slice(0, 10).map((item) => <NavItem item={item} />)}
          </ul>
          <div>
            {/* ship to */}
          </div>
        </div>
        <div class="place-self-center">
          <a href="/" aria-label="Store logo" class="logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 23}
            />
          </a>
          <a href="/" aria-label="Store logo" class="logoSecondary">
            <Image
              src={logoSecondary.src}
              alt={logoSecondary.alt}
              width={logoSecondary.width || 100}
              height={logoSecondary.height || 23}
            />
          </a>
        </div>
        <div className="left_content flex flex-row gap-3 items-center">
          {
            /* <label
            for={SEARCHBAR_POPUP_ID}
            class="input input-bordered flex items-center gap-2 w-full"
            aria-label="search icon button"
          >
            <Icon id="search" />
            <span class="text-base-400 truncate">
              Search products, brands...
            </span>
          </label> */
          }
          <Searchbar {...searchbar} />
          {
            /* <a href="/account" class="flex gap-4 place-self-end">
            <Icon id="account_circle" />
          </a> */
          }
          <div class="flex gap-4 place-self-end">
            <SignIn />
          </div>
          <div class="flex gap-4 place-self-end">
            <Bag />
          </div>
        </div>
      </div>
    </div>
  </>
);

const Mobile = (
  { logo, searchbar, navItems, loading, logoSecondary }: Props,
) => (
  <>
    {
      /* <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
          <div class="w-screen overflow-y-auto">
            {loading === "lazy"
              ? (
                <div class="h-full w-full flex items-center justify-center">
                  <span class="loading loading-spinner" />
                </div>
              )
              : <Searchbar {...searchbar} />}
          </div>
        </Drawer.Aside>
      }
    /> */
    }
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          {loading === "lazy"
            ? (
              <div
                id={SIDEMENU_CONTAINER_ID}
                class="h-full flex items-center justify-center"
                style={{ minWidth: "100vw" }}
              >
                <span class="loading loading-spinner" />
              </div>
            )
            : <Menu navItems={navItems ?? []} />}
        </Drawer.Aside>
      }
    />

    <div
      class="flex justify-between place-items-center w-screen px-5 gap-4"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns:
          "min-content auto min-content min-content min-content",
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="open menu"
      >
        <Icon id="menu" />
      </label>

      {logo && (
        <a
          href="/"
          class=" inline-flex items-center justify-center logo ml-[40px] mt-4"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="Store logo"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 100}
            height={logo.height || 13}
          />
        </a>
      )}
      {logoSecondary && (
        <a
          href="/"
          class="inline-flex items-center justify-center ml-[40px] logoSecondary mt-4"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="Store logo"
        >
          <Image
            src={logoSecondary.src}
            alt={logoSecondary.alt}
            width={logoSecondary.width || 100}
            height={logoSecondary.height || 13}
          />
        </a>
      )}
      <div className="sidecontent flex gap-2 items-center">
        <SignIn />

        <Bag />
      </div>
    </div>
    <Searchbar {...searchbar} />
  </>
);

function Header({
  alerts = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();

  return (
    <>
      <HeaderScroll
        className={`fixed z-20 w-full`}
        style={{
          height: device === "desktop"
            ? HEADER_HEIGHT_DESKTOP
            : HEADER_HEIGHT_MOBILE,
        }}
      >
        <div class="w-full z-40">
          {alerts.length > 0 && <Alert alerts={alerts} />}
          {device === "desktop"
            ? <Desktop logo={logo} {...props} />
            : <Mobile logo={logo} {...props} />}
        </div>
      </HeaderScroll>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script) }}
      />
    </>
    // <header
    // style={{
    //   height: device === "desktop"
    //   ? HEADER_HEIGHT_DESKTOP
    //   : HEADER_HEIGHT_MOBILE,
    // }}
    // >

    // </HeaderScroll>
    //   <div class="bg-base-100 fixed w-full z-40">
    //     {alerts.length > 0 && <Alert alerts={alerts} />}
    //     {device === "desktop"
    //       ? <Desktop logo={logo} {...props} />
    //       : <Mobile logo={logo} {...props} />}
    //   </div>
    // </header>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...props as any} loading="lazy" />
);

export default Header;
