import { DivisionId, EMPIRICAL_BENCHMARKS, STATIONS } from '../data/hyroxDatabase';
import { TranslationPack } from '../i18n/translations';
import { formatHMS, formatMS } from '../utils/timeFormat';

interface BenchmarkMatrixProps {
  t: TranslationPack;
  divisionId: DivisionId;
  activeFinishSec: number;
  onSelectBenchmarkTier: (finishSec: number, runPaceSec: number) => void;
}

export function BenchmarkMatrix({
  t,
  divisionId,
  activeFinishSec,
  onSelectBenchmarkTier,
}: BenchmarkMatrixProps) {
  const anchors = EMPIRICAL_BENCHMARKS[divisionId];
  const divLabel = t.divisions[divisionId].label;

  return (
    <section id="benchmarks" className="pb-12">
      <div className="mb-4">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {t.benchmarks.title(divLabel)}
        </h2>
        <p className="mt-1 text-sm text-zinc-400">{t.benchmarks.subtitle}</p>
      </div>

      <div className="overflow-x-auto rounded-md border border-zinc-800 bg-[#121212]">
        <table className="w-full min-w-[940px] border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-800 bg-[#0E0E0E] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <th className="py-3 pl-5 pr-3">{t.benchmarks.colFinishTier}</th>
              <th className="py-3 px-2.5 text-right">{t.benchmarks.colRunKm}</th>
              <th className="py-3 px-2.5 text-right">{t.benchmarks.colRoxzone}</th>
              {STATIONS.map((s) => (
                <th key={s.id} className="py-3 px-2 text-right whitespace-nowrap">
                  {t.stations[s.id].shortName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/70">
            {anchors.map((row) => {
              const isNearActive = Math.abs(row.finishSec - activeFinishSec) <= 90;
              const tierInfo = t.tiers[row.tierName] ?? {
                tierName: row.tierName,
                percentileLabel: row.percentileLabel,
              };
              return (
                <tr
                  key={row.finishSec}
                  onClick={() => onSelectBenchmarkTier(row.finishSec, row.runPaceSec)}
                  className={`cursor-pointer transition-colors ${
                    isNearActive
                      ? 'bg-[#FFDD00]/10 hover:bg-[#FFDD00]/15'
                      : 'hover:bg-zinc-900/60'
                  }`}
                >
                  <td className="py-3 pl-5 pr-3">
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className={`font-mono text-sm font-bold tabular-nums ${
                          isNearActive ? 'text-[#FFDD00]' : 'text-white'
                        }`}
                      >
                        {formatHMS(row.finishSec)}
                      </span>
                      <span className="text-xs text-zinc-400 whitespace-nowrap">
                        {tierInfo.tierName} · {tierInfo.percentileLabel}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2.5 text-right font-mono text-xs font-semibold text-zinc-200 tabular-nums">
                    {formatMS(row.runPaceSec)}
                  </td>
                  <td className="py-3 px-2.5 text-right font-mono text-xs text-zinc-400 tabular-nums">
                    {formatMS(row.roxzoneSec)}
                  </td>
                  {STATIONS.map((s) => (
                    <td
                      key={s.id}
                      className="py-3 px-2 text-right font-mono text-xs text-zinc-300 tabular-nums"
                    >
                      {formatMS(row.stations[s.id])}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
