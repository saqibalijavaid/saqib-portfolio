import {
  Gem,
  Globe,
  ShoppingCart,
  Smartphone,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import data from './projects.json';

/*
 * Single source of truth for both project surfaces, and for the structured
 * data on /projects.
 *
 * The records themselves live in projects.json rather than here. Only two
 * things read them — this module, and scripts/prerender.mjs, which cannot
 * import TypeScript — and keeping them in JSON means the ItemList of
 * CreativeWork in the page head is generated from exactly the records the page
 * renders. Structured data that disagrees with the visible page is worse than
 * none at all, and this makes that disagreement impossible rather than merely
 * unlikely.
 *
 * The homepage grid and /projects read different fields off the same record:
 * `summary` + `featuredStack` on the homepage, `description` + `bullets` +
 * `stack` on the detail page.
 *
 * Status is declared, never inferred from what is missing:
 *   liveUrl        work of Saqib's that is reachable right now
 *   reference      something related he did not build — a client's own site
 *   pendingRelease built, shipping shortly; forward-looking, amber
 *   note           neither linkable nor on the way; backward-looking, grey
 */
export interface Project {
  /** Stable anchor id, so a project can be linked to directly. */
  slug: string;
  name: string;
  tagline: string;
  /** Short form, homepage card. */
  summary: string;
  /** Long form, /projects. */
  description: string;
  bullets: string[];
  /** Full stack, /projects. */
  stack: string[];
  /** Trimmed stack, homepage card, where space is tighter. */
  featuredStack: string[];
  liveUrl?: string;
  liveLabel?: string;
  reference?: { url: string; label: string };
  pendingRelease?: string;
  note?: string;
  icon: LucideIcon;
}

/** JSON cannot hold a component, so icons are named there and resolved here. */
const icons: Record<string, LucideIcon> = {
  Gem,
  Globe,
  ShoppingCart,
  Smartphone,
  Workflow,
  Wrench,
  Zap,
};

type RawProject = Omit<Project, 'icon'> & { icon: string };

export const projects: Project[] = (data.projects as RawProject[]).map((project) => {
  const icon = icons[project.icon];
  if (!icon) {
    throw new Error(
      `projects.json: "${project.name}" names icon "${project.icon}", which is not in the icon map.`
    );
  }
  return { ...project, icon };
});
