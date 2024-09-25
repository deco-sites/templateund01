import { type VideoWidget } from "apps/admin/widgets.ts";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  videos: {
    mobile: VideoWidget;
    desktop: VideoWidget;
  };
}

function Banner({ videos }: Props) {
  return (
    <Section.Container class="lg:px-8 px-4">
      <div class="relative mx-5 sm:mx-0">
        <video class="w-full object-cover" controls>
          <source
            media="(max-width: 640px)"
            src={videos.mobile}
            type="video/mp4"
          />
          <source
            media="(min-width: 640px)"
            src={videos.desktop}
            type="video/mp4"
          />
          Seu navegador não suporta vídeos.
        </video>
      </div>
    </Section.Container>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default Banner;
