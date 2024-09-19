import { ProductListingPage } from "apps/commerce/types.ts";
import { useScript } from "deco/hooks/useScript.ts";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

export type Props = Pick<ProductListingPage, "sortOptions"> & { url: string };

const getUrl = (href: string, value: string) => {
  const url = new URL(href);

  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);

  return url.href;
};

const labels: Record<string, string> = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamento",
  "discount:desc": "Maior desconto",
};

function SortMobile({ sortOptions, url }: Props) {
  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));

  // Função para alternar a visibilidade da lista de opções
  // const toggleOptions = useScript(() => {
  //   const optionsDiv = document.querySelector(".sort-options") as HTMLDivElement;
  //   if (optionsDiv) {
  //     optionsDiv.classList.toggle("hidden");
  //     optionsDiv.classList.toggle("flex");
  //   }
  // });

  return (
    <>
      <div class="h-max border-none overflow-[visible] relative">
        <div
          class="text-[#35393C] min-w-[160px] text-sm h-[47px] border border-base-200"
          hx-on:click={useScript(() => {
            const optionsDiv = document.querySelector(".sort-options") as HTMLDivElement;
            if (optionsDiv) {
              optionsDiv.classList.toggle("hidden");
              optionsDiv.classList.toggle("flex");
            }
          })}
        >
          <label for="sort" class="sr-only relative flex flex-row justify-between items-center uppercase cursor-pointer w-full h-full px-4">
            Ordenar por
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="#020242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          </label>
        </div>
        <div
          name="sort"
          class="sort-options hidden flex-col z-40 gap-[15px] absolute bg-white w-full p-4"
          hx-on:change={useScript(() => {
            const select = event!.currentTarget as HTMLSelectElement;
            window.location.href = select.value;
          })}
        >
          {options.map(({ value, label }) => (
            <a
              key={value}
              label={labels[label] ?? label}
              value={value}
              href={value}
              selected={value === current}
              class="text-xs text-[#35393c] uppercase"
            >
              {labels[label] ?? label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default SortMobile;
