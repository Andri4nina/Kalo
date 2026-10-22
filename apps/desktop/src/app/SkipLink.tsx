import type { RefObject } from "react";

/** Lien d'évitement : place le focus clavier directement sur le contenu principal. */
export function SkipLink({ target }: { target: RefObject<HTMLElement | null> }) {
  return (
    <a
      href="#contenu"
      onClick={(event) => {
        event.preventDefault();
        target.current?.focus();
      }}
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-kalo-panel focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-kalo-accent dark:focus:bg-kalo-dark-panel"
    >
      Aller au contenu
    </a>
  );
}
