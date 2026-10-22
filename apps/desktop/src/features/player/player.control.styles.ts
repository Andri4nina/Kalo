import { focus } from "@/design/tokens";

/** État actif : couleur d'accent et point sous l'icône, comme les bascules Spotify. */
export const modeOn =
  "text-kalo-accent after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-current dark:text-kalo-dark-accent";

export const modeOff =
  "text-kalo-muted hover:text-kalo-ink dark:text-kalo-dark-muted dark:hover:text-kalo-dark-ink";

export const skip =
  `rounded-full p-2 text-kalo-muted transition-colors hover:text-kalo-ink disabled:opacity-40 dark:text-kalo-dark-muted dark:hover:text-kalo-dark-ink ${focus}`;

export const modeButton = `relative rounded-full p-2 transition-colors ${focus}`;

/** Curseur natif : remplissage encre, accent au survol. */
export const range =
  "h-1 w-full cursor-pointer accent-kalo-ink hover:accent-kalo-accent dark:accent-kalo-dark-ink dark:hover:accent-kalo-dark-accent";
