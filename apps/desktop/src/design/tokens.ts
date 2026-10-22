export const page =
  "flex h-screen flex-col gap-2 bg-kalo-canvas p-2 text-kalo-ink dark:bg-kalo-dark-canvas dark:text-kalo-dark-ink";

/** Barres de défilement fines aux couleurs du thème (propriétés standard, héritées). */
export const scrollbars =
  "[scrollbar-color:theme(colors.kalo.line)_transparent] dark:[scrollbar-color:theme(colors.kalo.dark-raised)_transparent] [&_*]:[scrollbar-width:thin]";

export const surface = "rounded-lg bg-kalo-panel dark:bg-kalo-dark-panel";

export const card = "rounded-lg bg-kalo-card dark:bg-kalo-dark-card";

export const muted = "text-kalo-muted dark:text-kalo-dark-muted";

export const accent = "text-kalo-accent dark:text-kalo-dark-accent";

export const heading = "font-display font-bold tracking-tight";

export const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kalo-accent dark:focus-visible:ring-kalo-dark-accent focus-visible:ring-offset-2 focus-visible:ring-offset-kalo-panel dark:focus-visible:ring-offset-kalo-dark-panel";

export const input =
  "w-full rounded-md border border-kalo-line bg-kalo-panel px-3 py-2 text-sm text-kalo-ink placeholder:text-kalo-muted hover:border-kalo-muted/50 focus:outline-none focus:ring-2 focus:ring-kalo-accent dark:border-kalo-dark-line dark:bg-kalo-dark-raised dark:text-kalo-dark-ink dark:placeholder:text-kalo-dark-muted dark:hover:border-kalo-dark-muted/50 dark:focus:ring-kalo-dark-accent";

export const divider = "h-px w-full bg-kalo-line dark:bg-kalo-dark-line";

export const mediaGrid =
  "-mx-3 grid grid-cols-2 gap-1 sm:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]";

/** Liste déroulante compacte en pilule (filtres, tri). */
export const chipSelect =
  "h-9 cursor-pointer rounded-full border-0 bg-kalo-raised px-4 text-sm font-semibold text-kalo-ink hover:bg-kalo-line focus:outline-none focus-visible:ring-2 focus-visible:ring-kalo-accent dark:bg-kalo-dark-raised dark:text-kalo-dark-ink dark:hover:bg-kalo-dark-line dark:focus-visible:ring-kalo-dark-accent";
