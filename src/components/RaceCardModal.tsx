import { useState } from 'react';
import { Check, Copy, Printer, X } from 'lucide-react';
import { DivisionId, RacePlanOutput } from '../data/hyroxDatabase';
import { TranslationPack } from '../i18n/translations';
import { formatHMS, formatMS } from '../utils/timeFormat';

interface RaceCardModalProps {
  t: TranslationPack;
  isOpen: boolean;
  onClose: () => void;
  divisionId: DivisionId;
  plan: RacePlanOutput;
}

export function RaceCardModal({
  t,
  isOpen,
  onClose,
  divisionId,
  plan,
}: RaceCardModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const divLabel = t.divisions[divisionId].label;

  let clock = 0;
  const rows = plan.stations.map((st, idx) => {
    const runSec = plan.runSplits[idx];
    const runExit = clock + runSec;
    const stationExit = runExit + st.roxzoneSec + st.targetSec;
    clock = stationExit;
    return {
      runLabel: t.wristband.runPlain(idx + 1),
      runSplit: formatMS(runSec),
      runExit: formatHMS(runExit),
      stationLabel: `0${st.number}. ${t.stations[st.id].shortName}`,
      stationSplit: formatMS(st.targetSec),
      roxzone: formatMS(st.roxzoneSec),
      stationExit: formatHMS(stationExit),
    };
  });

  const buildPlainText = () => {
    const lines = [
      t.wristband.plainTitle(divLabel),
      t.wristband.plainSummary(
        formatHMS(plan.projectedFinishSec),
        formatMS(plan.avgRunPaceSec),
        formatMS(plan.totalStationsSec),
        formatMS(plan.totalRoxzoneSec)
      ),
      `--------------------------------------------------`,
    ];
    for (const r of rows) {
      lines.push(`${r.runLabel.padEnd(8)} ${r.runSplit}  -> ${t.wristband.clockLabel} ${r.runExit}`);
      lines.push(
        `${r.stationLabel.padEnd(14)} ${r.stationSplit} (+${r.roxzone} Rox) -> ${t.wristband.clockLabel} ${r.stationExit}`
      );
    }
    return lines.join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="race-wristband-title"
    >
      <div className="w-full max-w-2xl rounded-md border border-zinc-800 bg-[#121212] text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 print:hidden">
          <div>
            <h3
              id="race-wristband-title"
              className="font-display text-2xl font-bold tracking-tight text-white"
            >
              {t.wristband.title}
            </h3>
            <p className="text-xs text-zinc-400">
              {t.wristband.subtitle(
                divLabel,
                formatHMS(plan.projectedFinishSec),
                formatMS(plan.avgRunPaceSec)
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5">
          <div className="rounded border border-zinc-800 bg-black p-4 print:border-black print:bg-white print:text-black">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3 print:border-zinc-300">
              <span className="font-display text-lg font-extrabold tracking-wide text-[#FFDD00] print:text-black">
                {t.wristband.headerBanner(divLabel.toUpperCase())}
              </span>
              <span className="font-mono text-sm font-bold text-white tabular-nums print:text-black">
                {t.wristband.finishPrefix} {formatHMS(plan.projectedFinishSec)}
              </span>
            </div>

            <table className="w-full border-collapse text-xs font-mono tabular-nums">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 print:border-zinc-300">
                  <th className="py-1.5 text-left">{t.wristband.colSegment}</th>
                  <th className="py-1.5 text-right">{t.wristband.colSplit}</th>
                  <th className="py-1.5 text-right">{t.wristband.colRox}</th>
                  <th className="py-1.5 text-right">{t.wristband.colClock}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 print:divide-zinc-200">
                {rows.flatMap((r, i) => [
                  <tr key={`w-r-${i}`} className="text-zinc-300 print:text-zinc-700">
                    <td className="py-1.5">{r.runLabel} (1 km)</td>
                    <td className="py-1.5 text-right">{r.runSplit}</td>
                    <td className="py-1.5 text-right text-zinc-600">—</td>
                    <td className="py-1.5 text-right font-semibold">{r.runExit}</td>
                  </tr>,
                  <tr key={`w-s-${i}`} className="text-white print:text-black">
                    <td className="py-1.5 font-semibold text-[#FFDD00] print:text-black">
                      {r.stationLabel}
                    </td>
                    <td className="py-1.5 text-right font-bold">{r.stationSplit}</td>
                    <td className="py-1.5 text-right text-zinc-400 print:text-zinc-600">
                      +{r.roxzone}
                    </td>
                    <td className="py-1.5 text-right font-bold">{r.stationExit}</td>
                  </tr>,
                ])}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-zinc-800 px-5 py-3.5 bg-[#0E0E0E] print:hidden">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:border-zinc-500 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span>{t.wristband.copiedSplits}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.wristband.copyText}</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded bg-[#FFDD00] px-4 py-2 text-xs font-bold text-black hover:bg-[#E5C700] transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.wristband.printWristband}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
