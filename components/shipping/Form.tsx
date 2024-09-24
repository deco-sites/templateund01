import type { SKU } from "apps/vtex/utils/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  items: SKU[];
}

export default function Form({ items }: Props) {
  const slot = useId();

  return (
    <div class="flex flex-col gap-2 border border-[#DDDDDD] rounded-[1px] p-8">
      <div class="flex flex-col">
        <span class="text-base-200 text-2xl">
        Calcular frete e prazo
        </span>
      </div>

      <form
        class="relative join gap-4"
        hx-target={`#${slot}`}
        hx-swap="innerHTML"
        hx-sync="this:replace"
        hx-post={useComponent(import.meta.resolve("./Results.tsx"), {
          items,
        })}
      >
        <input
          as="input"
          type="text"
          class="input border-b rounded-none border-0 border-base-200 outline-none join-item h-8 pl-0 w-9/12"
          placeholder="Digite seu CEP"
          name="postalCode"
          maxLength={8}
          size={8}
        />
        <button type="submit" class="h-8 border border-base-200 join-item no-animation w-3/12 !bg-transparent rounded-none">
          <span class="[.htmx-request_&]:hidden inline text-base-200">Calcular</span>
          <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
        </button>
      </form>

      {/* Results Slot */}
      <div id={slot} />
    </div>
  );
}
