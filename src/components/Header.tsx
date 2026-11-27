import { Printer } from 'lucide-react';
import { TranslationPack } from '../i18n/translations';

interface HeaderProps {
  t: TranslationPack;
  onOpenRaceCard: () => void;
}

export function Header({ t, onOpenRaceCard }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/90 bg-[#0A0A0A]/95 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-8 px-6 py-4">
        <a
          href="#planner"
          className="font-display text-2xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDD00]"
        >
          HYROX <span className="text-[#FFDD00]">PACELAB</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
          <a
            href="#planner"
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDD00]"
          >
            {t.nav.planner}
          </a>
          <a
            href="#split-matrix"
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDD00]"
          >
            {t.nav.splitMatrix}
          </a>
          <a
            href="#roxzone"
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDD00]"
          >
            {t.nav.roxzone}
          </a>
          <a
            href="#benchmarks"
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDD00]"
          >
            {t.nav.benchmarks}
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenRaceCard}
            className="inline-flex items-center gap-2 rounded bg-[#FFDD00] px-4 py-2 text-xs font-bold tracking-wide text-black hover:bg-[#E5C700] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFDD00]"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.nav.raceWristband}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
