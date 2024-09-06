import { useScript } from "deco/hooks/useScript.ts";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

const onLoad = (containerID: string) => {
  window.STOREFRONT.USER.subscribe((sdk) => {
    const container = document.getElementById(containerID) as HTMLDivElement;

    const nodes = container.querySelectorAll<HTMLAnchorElement>("a");

    const login = nodes.item(0);
    const account = nodes.item(1);

    const user = sdk.getUser();

    if (user?.email) {
      login.classList.add("hidden");
      account.classList.remove("hidden");
    } else {
      login.classList.remove("hidden");
      account.classList.add("hidden");
    }
  });
};

function SignIn() {
  const id = useId();

  return (
    <div id={id}>
      <a
        class={clx(
          "btn btn-sm font-thin btn-ghost no-animation",
        )}
        href="/login"
        aria-label="Login"
      >
        <Icon id="account_circle" />
      </a>
      <a
        class={clx(
          "hidden",
          "btn btn-sm font-thin btn-ghost no-animation",
        )}
        href="/account"
        aria-label="Account"
      >
        <Icon id="account_circle" />
      </a>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}

export default SignIn;
