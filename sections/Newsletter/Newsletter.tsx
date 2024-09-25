import { SectionProps } from "deco/mod.ts";
import { AppContext } from "../../apps/site.ts";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";

interface NoticeProps {
  title?: string;
  description?: string;
}

export interface Props {
  empty?: NoticeProps;
  success?: NoticeProps;
  failed?: NoticeProps;

  /** @description Signup label */
  label?: string;

  /** @description Input placeholder */
  placeholder?: string;

  /** @hide true */
  status?: "success" | "failed";
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const platform = usePlatform();

  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;

  if (platform === "vtex") {
    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("vtex/actions/newsletter/subscribe.ts", {
      email,
    });

    return { ...props, status: "success" };
  }

  return { ...props, status: "failed" };
}

export function loader(props: Props) {
  return { ...props, status: undefined };
}

function Notice(
  { title, description }: { title?: string; description?: string },
) {
  return (
    <div class="flex w-full flex-col justify-center items-center sm:items-start gap-4">
      <span class="text-3xl font-semibold text-center sm:text-start">
        {title}
      </span>
      <span class="text-sm font-normal text-base-400 text-center sm:text-start">
        {description}
      </span>
    </div>
  );
}

function Newsletter({
  empty = {
    title: "Get top deals, latest trends, and more.",
    description:
      "Receive our news and promotions in advance. Enjoy and get 10% off your first purchase. For more information click here.",
  },
  success = {
    title: "Thank you for subscribing!",
    description:
      "You’re now signed up to receive the latest news, trends, and exclusive promotions directly to your inbox. Stay tuned!",
  },
  failed = {
    title: "Oops. Something went wrong!",
    description:
      "Something went wrong. Please try again. If the problem persists, please contact us.",
  },
  label = "Sign up",
  placeholder = "Enter your email address",
  status,
}: SectionProps<typeof loader, typeof action>) {
  if (status === "success" || status === "failed") {
    return (
      <Section.Container class="bg-base-200">
        <div class="p-14 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
          <Icon
            size={80}
            class={clx(
              status === "success" ? "text-success" : "text-error",
            )}
            id={status === "success" ? "check-circle" : "error"}
          />
          <Notice {...status === "success" ? success : failed} />
        </div>
      </Section.Container>
    );
  }

  return (
    <Section.Container class="bg-[#EFF0F0] mt-8">
      <div class="p-8 grid grid-flow-row sm:grid-cols-2 gap-10 sm:gap-20 place-items-center">
        <Notice {...empty} />

        <form
          hx-target="closest section"
          hx-swap="outerHTML"
          hx-post={useComponent(import.meta.url)}
          class="flex flex-col sm:flex-row w-full flex-wrap"
        >
          <fieldset class="flex gap-2 flex-row flex-wrap lg:flex-nowrap w-full">
            <input
              name="email"
              class="input border-b-2 rounded-none border-0 bg-transparent outline-none border-[#051232] max-lg:w-full lg:min-w-[85%] flex-grow mb-4 lg:mr-4 pl-0"
              type="text"
              placeholder={placeholder}
            />

            <button
              class="btn max-lg:w-full btn-primary"
              type="submit"
            >
              <span class="[.htmx-request_&]:hidden inline">
                {label}
              </span>
              <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
            </button>

          </fieldset>
          <label class="flex flex-row gap-3 items-center text-xs mt-4">
            <input
              type="checkbox"
              name="checkbox"
              required
              class="input-accept"
            />
            Declaro que li e aceito com os termos de segurança e privacidade
          </label>
        </form>
      </div>
    </Section.Container>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="412px" />;

export default Newsletter;
