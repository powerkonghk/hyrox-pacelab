import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
  TrendingUp,
  Unlock,
  Zap,
} from 'lucide-react';
import { ComputedStationPlan, DivisionId, RacePlanOutput, StationId } from '../data/hyroxDatabase';
import { TranslationPack } from '../i18n/translations';
import { formatDelta, formatHMS, formatMS, parseTimeToSeconds } from '../utils/timeFormat';

interface SplitMatrixProps {
  t: TranslationPack;
  divisionId: DivisionId;
  plan: RacePlanOutput;
  onAdjustStation: (stationId: StationId, newSec: number) => void;
  onToggleLockStation: (stationId: StationId, currentSec: number) => void;
}

export function SplitMatrix({
  t,
  divisionId,
  plan,
  onAdjustStation,
  onToggleLockStation,
}: SplitMatrixProps) {
  const [viewMode, setViewMode] = useState<'stations' | 'sequence'>('stations');
  const [expandedCue, setExpandedCue] = useState<StationId | null>(null);
  const [editingId, setEditingId] = useState<StationId | null>(null);
  const [editValue, setEditValue] = useState('');

  const allStationsLocked = plan.stations.every((st) => st.isLocked);

  let runningClock = 0;
  const stationCumulative = plan.stations.map((st, idx) => {
    const runSec = plan.runSplits[idx];
    runningClock += runSec + st.roxzoneSec + st.targetSec;
    return {
      runSec,
      stationExitClock: runningClock,
    };
  });

  const startEditing = (st: ComputedStationPlan) => {
    setEditingId(st.id);
    setEditValue(formatMS(st.targetSec));
  };

  const commitEditing = (st: ComputedStationPlan) => {
    setEditingId(null);
    const parsed = parseTimeToSeconds(editValue);
    if (parsed !== null) {
      const clamped = Math.min(900, Math.max(45, parsed));
      if (clamped !== st.targetSec) {
        onAdjustStation(st.id, clamped);
      }
    }
  };

  const renderStatus = (st: ComputedStationPlan) => {
    const label = t.splitMatrix.statusLabels[st.status];
    if (st.status === 'extreme') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 whitespace-nowrap">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </span>
      );
    }
    if (st.status === 'aggressive') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FFDD00] whitespace-nowrap">
          <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </span>
      );
    }
    if (st.status === 'headroom') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 whitespace-nowrap">
          <TrendingUp className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 whitespace-nowrap">
        <Check className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden="true" />
        <span>{label}</span>
      </span>
    );
  };

  return (
    <section id="split-matrix" className="pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.splitMatrix.title}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            {t.splitMatrix.subtitle}{' '}
            <span className="text-zinc-500">· {t.splitMatrix.clickToEditHint}</span>
          </p>
          {allStationsLocked && (
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFDD00]">
              <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t.splitMatrix.allLockedNote}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 self-start rounded-md border border-zinc-800 bg-[#121212] p-1">
          <button
            type="button"
            onClick={() => setViewMode('stations')}
            className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              viewMode === 'stations'
                ? 'bg-[#FFDD00] text-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.splitMatrix.tabStations}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('sequence')}
            className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              viewMode === 'sequence'
                ? 'bg-[#FFDD00] text-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.splitMatrix.tabSequence}
          </button>
        </div>
      </div>

      {viewMode === 'stations' ? (
        <div className="overflow-x-auto rounded-md border border-zinc-800 bg-[#121212]">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-[#0E0E0E] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <th className="py-3 pl-5 pr-3">{t.splitMatrix.colStation}</th>
                <th className="py-3 px-3 text-right">{t.splitMatrix.colDbBenchmark}</th>
                <th className="py-3 px-3 text-center">{t.splitMatrix.colTargetSplit}</th>
                <th className="py-3 px-3 text-right">{t.splitMatrix.colVsDb}</th>
                <th className="py-3 px-3 text-right">{t.splitMatrix.colRoxzone}</th>
                <th className="py-3 px-3 text-left">{t.splitMatrix.colEffortProfile}</th>
                <th className="py-3 pl-3 pr-5 text-right">{t.splitMatrix.colExitClock}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70">
              {plan.stations.map((st, idx) => {
                const isExpanded = expandedCue === st.id;
                const isEditing = editingId === st.id;
                const stText = t.stations[st.id];
                const stSpec = t.divisions[divisionId].stationSpecs[st.id];

                return (
                  <tr
                    key={st.id}
                    className="group hover:bg-zinc-900/50 transition-colors duration-150"
                  >
                    <td className="py-3.5 pl-5 pr-3 align-top">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-xs font-semibold text-[#FFDD00] tabular-nums">
                              0{st.number}.
                            </span>
                            <span className="text-sm font-semibold text-white">
                              {stText.name}
                            </span>
                          </div>
                          <div className="mt-0.5 text-xs text-zinc-500">{stSpec}</div>
                          {isExpanded && (
                            <p className="mt-2 text-xs text-zinc-300 leading-relaxed max-w-sm">
                              {stText.pacingCue}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setExpandedCue(isExpanded ? null : st.id)}
                          aria-label={stText.name}
                          className="mt-0.5 rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-right align-middle font-mono text-sm text-zinc-400 tabular-nums">
                      {formatMS(st.empiricalSec)}
                    </td>

                    <td className="py-3.5 px-3 align-middle">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onAdjustStation(st.id, Math.max(45, st.targetSec - 5))}
                          aria-label={`-5s ${stText.name}`}
                          className="h-7 w-7 rounded border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
                        >
                          -5
                        </button>

                        {isEditing ? (
                          <input
                            type="text"
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => commitEditing(st)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') commitEditing(st);
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                            aria-label={stText.name}
                            className="w-[62px] rounded border border-[#FFDD00] bg-black py-0.5 text-center font-mono text-base font-bold text-[#FFDD00] tabular-nums focus:outline-none"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEditing(st)}
                            title={t.splitMatrix.clickToEditHint}
                            className={`w-[62px] rounded py-0.5 text-center font-mono text-base font-bold tabular-nums hover:bg-zinc-800/80 transition-colors cursor-text ${
                              st.isLocked ? 'text-[#FFDD00]' : 'text-white'
                            }`}
                          >
                            {formatMS(st.targetSec)}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onAdjustStation(st.id, Math.min(900, st.targetSec + 5))}
                          aria-label={`+5s ${stText.name}`}
                          className="h-7 w-7 rounded border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
                        >
                          +5
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleLockStation(st.id, st.targetSec)}
                          aria-label={
                            st.isLocked ? t.splitMatrix.unlockTooltip : t.splitMatrix.lockTooltip
                          }
                          title={
                            st.isLocked ? t.splitMatrix.unlockTooltip : t.splitMatrix.lockTooltip
                          }
                          className={`ml-1 flex h-7 w-7 items-center justify-center rounded border transition-colors cursor-pointer ${
                            st.isLocked
                              ? 'border-[#FFDD00]/60 bg-[#FFDD00]/15 text-[#FFDD00]'
                              : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-200'
                          }`}
                        >
                          {st.isLocked ? (
                            <Lock className="h-3.5 w-3.5" />
                          ) : (
                            <Unlock className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td
                      className={`py-3.5 px-3 text-right align-middle font-mono text-xs font-medium tabular-nums ${
                        st.deltaVsEmpirical < -10
                          ? 'text-[#FFDD00]'
                          : st.deltaVsEmpirical > 10
                          ? 'text-emerald-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      {st.deltaVsEmpirical === 0 ? '0:00' : formatDelta(st.deltaVsEmpirical)}
                    </td>

                    <td className="py-3.5 px-3 text-right align-middle font-mono text-sm text-zinc-300 tabular-nums">
                      {formatMS(st.roxzoneSec)}
                    </td>

                    <td className="py-3.5 px-3 align-middle">{renderStatus(st)}</td>

                    <td className="py-3.5 pl-3 pr-5 text-right align-middle font-mono text-sm font-semibold text-zinc-200 tabular-nums">
                      {formatHMS(stationCumulative[idx].stationExitClock)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-zinc-800 bg-[#121212]">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-[#0E0E0E] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <th className="py-3 pl-5 pr-3">{t.splitMatrix.colLeg}</th>
                <th className="py-3 px-3">{t.splitMatrix.colSegment}</th>
                <th className="py-3 px-3">{t.splitMatrix.colTargetSpec}</th>
                <th className="py-3 px-3 text-right">{t.splitMatrix.colLegTime}</th>
                <th className="py-3 px-3 text-right">{t.splitMatrix.colRoxzone}</th>
                <th className="py-3 pl-3 pr-5 text-right">{t.splitMatrix.colCumulativeClock}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70">
              {plan.stations.flatMap((st, idx) => {
                const runStartClock =
                  idx === 0 ? 0 : stationCumulative[idx - 1].stationExitClock;
                const runEndClock = runStartClock + plan.runSplits[idx];
                const stationEndClock = stationCumulative[idx].stationExitClock;
                const stText = t.stations[st.id];
                const stSpec = t.divisions[divisionId].stationSpecs[st.id];

                return [
                  <tr
                    key={`run-${idx}`}
                    className="hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="py-2.5 pl-5 pr-3 font-mono text-xs text-zinc-500 tabular-nums">
                      R{idx + 1}
                    </td>
                    <td className="py-2.5 px-3 text-sm font-medium text-zinc-200">
                      {t.splitMatrix.runLabel(idx + 1)}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-xs text-zinc-400 tabular-nums">
                      {formatMS(plan.runSplits[idx])} /km
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-sm font-semibold text-white tabular-nums">
                      {formatMS(plan.runSplits[idx])}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-xs text-zinc-600">
                      —
                    </td>
                    <td className="py-2.5 pl-3 pr-5 text-right font-mono text-sm text-zinc-300 tabular-nums">
                      {formatHMS(runEndClock)}
                    </td>
                  </tr>,
                  <tr
                    key={`station-${st.id}`}
                    className="bg-zinc-900/25 hover:bg-zinc-900/55 transition-colors"
                  >
                    <td className="py-2.5 pl-5 pr-3 font-mono text-xs font-semibold text-[#FFDD00] tabular-nums">
                      S{st.number}
                    </td>
                    <td className="py-2.5 px-3 text-sm font-semibold text-white">
                      {stText.name}
                    </td>
                    <td className="py-2.5 px-3 text-xs text-zinc-400">{stSpec}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-sm font-bold text-[#FFDD00] tabular-nums">
                      {formatMS(st.targetSec)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-xs text-zinc-400 tabular-nums">
                      +{formatMS(st.roxzoneSec)}
                    </td>
                    <td className="py-2.5 pl-3 pr-5 text-right font-mono text-sm font-semibold text-white tabular-nums">
                      {formatHMS(stationEndClock)}
                    </td>
                  </tr>,
                ];
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
