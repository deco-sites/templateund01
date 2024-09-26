import Image from "apps/website/components/Image.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  navItems?: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  if (!item.children || item.children.length === 0) {
    return (
      <a class="text-sm min-h-auto h-[73px] mb-[16px] pl-0 flex flex-row items-center gap-[7px] " href={item.url}>
        {item.image?.[0]?.url && (
          <Image
            class="py-6"
            src={item.image[0].url}
            alt={item.image[0].alternateName}
            width={79}
            height={73}
            loading="lazy"
          />
        )}
        {item.name}
      </a>
    );
  }

  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
        <div class="collapse-title min-h-auto mb-[16px] h-[73px] pl-0 flex flex-row items-center gap-[7px]">
          {item.image?.[0]?.url && (
            <Image
              class="py-6"
              src={item.image[0].url}
              alt={item.image[0].alternateName}
              width={79}
              height={73}
              loading="lazy"
            />
          )}
          {item.name}
        </div>
      <div class="collapse-content">
        <ul>
          {item.children.map((node) => (
            <li class="!border-0">
              <MenuItem item={node} />
            </li>
          ))}
          <li>
            <a class="underline text-sm" href={item.url}>
              Ver todos
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Menu({ navItems = [] }: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto bg-[#F2F2F2]"
      style={{ minWidth: "100vw" }}
    >
      <div className="flex flex-col px-[16px]">
        <h2 class="text-base text-base-200 mb-[16px] mt-[32px]">
          PRODUTOS
        </h2>
        <div class="bg-[#008081] flex items-center mb-[16px] min-h-auto h-[73px] pl-0">
          <span class="!border-0 text-white px-[16px] py-[14px] text-xs">
            <a href="/produtos">
              VER TODOS OS PRODUTOS
            </a>  
          </span>
        </div>
      </div>
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto">
        {navItems.map((item) => (
          <li class="!border-0">
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 bg-[#F2F2F2]">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="favorite" />
            <span class="text-sm">Lista de desejos</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="home_pin" />
            <span class="text-sm">Nossas lojas</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="call" />
            <span class="text-sm">Fale conosco</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="account_circle" />
            <span class="text-sm">Minha conta</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
