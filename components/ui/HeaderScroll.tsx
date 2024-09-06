import { useScript } from "deco/hooks/useScript.ts";
import { JSX } from "preact";

interface HeaderScrollProps {
  style?: JSX.IntrinsicElements['header']['style'];
  children?: JSX.Element;
  className?: string;
}

const script = () => {
  let lastScrollTop = 0;


  const handler = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const header = document.querySelector('header');

    if(header){
     
      if (scrollTop > lastScrollTop) {
        // console.log('scroll-down');
        header.classList.add('scroll-down')
        header.classList.remove('scroll-up');
      } else if (scrollTop < lastScrollTop) {
        // console.log('scroll-up');
        header.classList.add('scroll-up')
        header.classList.remove('scroll-down');
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
   
  };

  document.addEventListener("scroll", handler);
  // Limpar eventos se necessário
  return () => {
    document.removeEventListener("scroll", handler);
  };
};

function HeaderScroll({ style, children, className }: HeaderScrollProps) {
  return (
    <>
     
      <header style={style} className={className}>
        {children}
      </header>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script) }}
      />
    </>
  );
}

export default HeaderScroll;
