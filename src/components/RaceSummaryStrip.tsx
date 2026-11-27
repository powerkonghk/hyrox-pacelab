import { AlertTriangle, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import { RacePlanOutput } from '../data/hyroxDatabase';
import { TranslationPack } from '../i18n/translations';
import { formatDelta, formatHMS, formatMS } from '../utils/timeFormat';

interface RaceSummaryStripProps {
  t: TranslationPack;
  plan: RacePlanOutput;
  onSyncFinishToProjected: () => void;
}

export function RaceSummaryStrip({
  t,
  plan,
  onSyncFinishToProjected,
}: RaceSummaryStripProps) {
  const runPct = Math.round((plan.totalRunSec / plan.projectedFinishSec) * 100);
  const stationsPct = Math.round((plan.totalStationsSec / plan.projectedFinishSec) * 100);
  const roxPct = Math.max(1, 100 - runPct - stationsPct);

  const stationDelta = plan.totalStationsSec - plan.empiricalStationsTotalSec;
  const roxDelta = plan.totalRoxzoneSec - plan.empiricalRoxzoneTotalSec;
  const runPaceDelta = plan.avgRunPaceSec - plan.empiricalRunPaceSec;

  const statusConfig = {
    balanced: {
      icon: CheckCircle2,
      border: 'border-zinc-800',
      iconColor: 'text-emerald-400',
      tagText: t.summary.statusTags.balanced,
      headline: t.summary.feasibility.balancedTitle,
      detail: t.summary.feasibility.balancedDetail,
    },
    aggressive_stations: {
      icon: Zap,
      border: 'border-amber-500/40',
      iconColor: 'text-[#FFDD00]',
      tagText: t.summary.statusTags.aggressive_stations,
      headline: t.summary.feasibility.aggressiveTitle,
      detail: t.summary.feasibility.aggressiveDetail,
    },
    runner_surplus: {
      icon: TrendingUp,
      border: 'border-emerald-500/35',
      iconColor: 'text-emerald-400',
      tagText: t.summary.statusTags.runner_surplus,
      headline: t.summary.feasibility.surplusTitle(formatMS(plan.budgetGapSec)),
      detail: t.summary.feasibility.surplusDetail,
    },
    deficit: {
      icon: AlertTriangle,
      border: 'border-red-500/50',
      iconColor: 'text-red-400',
      tagText: t.summary.statusTags.deficit,
      headline: t.summary.feasibility.deficitTitle(formatMS(Math.abs(plan.budgetGapSec))),
      detail: t.summary.feasibility.deficitDetail(
        formatMS(plan.avgRunPaceSec),
        formatMS(plan.minNeededPaceSec)
      ),
    },
  }[plan.feasibility];

  const StatusIcon = statusConfig.icon;

  return (
    <section className="pb-8 space-y-4">
      {/* 4-Column Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-md border border-zinc-800 bg-[#121212] p-5">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold uppercase tracking-wider">
              {t.summary.projectedFinish}
            </span>
            <span className="font-mono text-zinc-500 tabular-nums">
              {t.summary.goalPrefix} {formatHMS(plan.targetFinishSec)}
            </span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold tracking-tight text-[#FFDD00] tabular-nums">
            {formatHMS(plan.projectedFinishSec)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-zinc-500">{t.summary.varianceVsGoal}</span>
            <span
              className={`font-mono font-semibold tabular-nums ${
                Math.abs(plan.budgetGapSec) <= 5
                  ? 'text-zinc-300'
                  : plan.budgetGapSec > 0
                  ? 'text-emerald-400'
                  : 'text-red-400'
              }`}
            >
              {Math.abs(plan.budgetGapSec) <= 2
                ? t.summary.onTarget
                : plan.budgetGapSec > 0
                ? `${formatMS(plan.budgetGapSec)} ${t.summary.aheadSuffix}`
                : `${formatMS(Math.abs(plan.budgetGapSec))} ${t.summary.overSuffix}`}
            </span>
          </div>
        </div>

        <div className="rounded-md border border-zinc-800 bg-[#121212] p-5">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold uppercase tracking-wider">
              {t.summary.running8km}
            </span>
            <span className="font-mono text-zinc-500 tabular-nums">
              {runPct}{t.summary.ofRaceSuffix}
            </span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold tracking-tight text-white tabular-nums">
            {formatMS(plan.totalRunSec)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-zinc-500">
              {t.summary.avgPrefix} {formatMS(plan.avgRunPaceSec)}/km
            </span>
            <span
              className={`font-mono font-medium tabular-nums ${
                runPaceDelta <= 0 ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {runPaceDelta === 0
                ? t.summary.matchesDb
                : `${formatDelta(runPaceDelta)}/km ${t.summary.vsDbSuffix}`}
            </span>
          </div>
        </div>

        <div className="rounded-md border border-zinc-800 bg-[#121212] p-5">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold uppercase tracking-wider">
              {t.summary.stationsTotal}
            </span>
            <span className="font-mono text-zinc-500 tabular-nums">
              {stationsPct}{t.summary.ofRaceSuffix}
            </span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold tracking-tight text-white tabular-nums">
            {formatMS(plan.totalStationsSec)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-zinc-500">
              {t.summary.dbRefPrefix} {formatMS(plan.empiricalStationsTotalSec)}
            </span>
            <span
              className={`font-mono font-medium tabular-nums ${
                stationDelta < -45
                  ? 'text-amber-400'
                  : stationDelta > 30
                  ? 'text-emerald-400'
                  : 'text-zinc-300'
              }`}
            >
              {stationDelta === 0
                ? t.summary.exactDb
                : `${formatDelta(stationDelta)} ${t.summary.vsDbSuffix}`}
            </span>
          </div>
        </div>

        <div className="rounded-md border border-zinc-800 bg-[#121212] p-5">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold uppercase tracking-wider">
              {t.summary.roxzoneTotal}
            </span>
            <span className="font-mono text-zinc-500 tabular-nums">
              {roxPct}{t.summary.ofRaceSuffix}
            </span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold tracking-tight text-white tabular-nums">
            {formatMS(plan.totalRoxzoneSec)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-zinc-500">
              {t.summary.avgPerTransition} {formatMS(plan.avgRoxzonePerStationSec)}
            </span>
            <span className="font-mono text-zinc-300 tabular-nums">
              {roxDelta === 0
                ? t.summary.onDb
                : `${formatDelta(roxDelta)} ${t.summary.vsDbSuffix}`}
            </span>
          </div>
        </div>
      </div>

      {/* Proportion Bar + Feasibility Advisory */}
      <div className={`rounded-md border ${statusConfig.border} bg-[#121212] p-5 space-y-4`}>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
            <span className="font-semibold text-zinc-300">
              {t.summary.raceTimeAllocation}
            </span>
            <div className="flex flex-wrap items-center gap-4 text-zinc-400 font-mono tabular-nums">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-xs bg-zinc-200" aria-hidden="true" />
                {t.summary.legendRunning} {runPct}%
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-xs bg-[#FFDD00]" aria-hidden="true" />
                {t.summary.legendStations} {stationsPct}%
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-xs bg-zinc-600" aria-hidden="true" />
                {t.summary.legendRoxzone} {roxPct}%
              </span>
            </div>
          </div>
          <div className="flex h-2.5 w-full overflow-hidden rounded-sm bg-zinc-900">
            <div
              style={{ width: `${runPct}%` }}
              className="bg-zinc-200 transition-all duration-200"
            />
            <div
              style={{ width: `${stationsPct}%` }}
              className="bg-[#FFDD00] transition-all duration-200"
            />
            <div
              style={{ width: `${roxPct}%` }}
              className="bg-zinc-600 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-zinc-800/80">
          <div className="flex items-start gap-3">
            <StatusIcon className={`h-5 w-5 shrink-0 mt-0.5 ${statusConfig.iconColor}`} aria-hidden="true" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  {statusConfig.headline}
                </span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className={`text-xs font-medium ${statusConfig.iconColor}`}>
                  {statusConfig.tagText}
                </span>
              </div>
              <p className="mt-0.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {statusConfig.detail}
              </p>
            </div>
          </div>

          {Math.abs(plan.budgetGapSec) > 15 && (
            <button
              type="button"
              onClick={onSyncFinishToProjected}
              className="rounded border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white hover:border-[#FFDD00] hover:text-[#FFDD00] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.summary.setGoalTo} {formatHMS(plan.projectedFinishSec)}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
