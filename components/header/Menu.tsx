import Image from "apps/website/components/Image.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  navItems?: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  if (!item.children || item.children.length === 0) {
    return (
      <a class="text-sm" href={item.url}>
        {item.image?.[0]?.url && (
          <Image
            class="py-6"
            src={item.image[0].url}
            alt={item.image[0].alternateName}
            width={300}
            height={332}
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
      <div class="collapse-title">{item.name}</div>
      <div class="collapse-content">
        <ul>
          {item.children.map((node) => (
            <li>
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
      class="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: "100vw" }}
    >
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto">
        {navItems.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 bg-white">
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
