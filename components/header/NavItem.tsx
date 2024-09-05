import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import {
  NAVBAR_HEIGHT_DESKTOP,
} from "../../constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  // const image = item?.image?.[0];

  return (
    <li
      class="group flex items-center pr-5"
      style={{ height: NAVBAR_HEIGHT_DESKTOP }}
    >
      <a
        href={url}
        class="text-3.5 font-medium"
      >
        {name}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-40 items-start justify-center gap-6 border-t-2 border-b-2 border-base-200 w-screen top-5"
            style={{
              
              left: "0px",
              marginTop: "44px",
            }}
          >
            
            <ul class="flex items-start justify-start gap-6 container">
              {children.map((node) => (
                <li class="p-6 pl-0">
                  <a class="hover:underline flex flex-col items-center text-3.5" href={node.url}>
                  {node.image?.[0]?.url && (
                    <Image
                        class="py-6"
                        src={node.image[0].url}
                        alt={node.image[0].alternateName}
                        width={300}
                        height={332}
                        loading="lazy"
                      />
                    )}
                  
                    <span>{node.name}</span>
                  

                  {/* <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.url}>
                          <span class="text-xs">{leaf.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul> */}
                </a>
              </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
