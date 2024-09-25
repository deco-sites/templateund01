import Icon from "../ui/Icon.tsx";

function Share() {
  return (
    <div class="flex flex-row gap-4">
      <span class="text-[#101820] text-base">COMPARTILHAR</span>
      <a
        href={`https://api.whatsapp.com/send/?phone=&text&type=phone_number&app_absent=0`}
        class=""
        aria-label="Chat on WhatsApp"
      >
        <button
          class=""
          aria-label="Chat on WhatsApp"
        >
          <Icon id="facebook" size={22} stroke="0.01" />
        </button>
      </a>
      <a
        href={`https://api.whatsapp.com/send/?phone=&text&type=phone_number&app_absent=0`}
        class=""
        aria-label="Chat on WhatsApp"
      >
        <button
          class=""
          aria-label="Chat on WhatsApp"
        >
          <Icon id="instagram" size={22} stroke="0.01" />
        </button>
      </a>
      <a
        href={`https://api.whatsapp.com/send/?phone=&text&type=phone_number&app_absent=0`}
        class=""
        aria-label="Chat on WhatsApp"
      >
        <button
          class=""
          aria-label="Chat on WhatsApp"
        >
          <Icon id="twitter" size={22} stroke="0.01" />
        </button>
      </a>
    </div>
  );
}

export default Share;
