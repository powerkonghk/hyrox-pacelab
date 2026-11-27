import { Footprints, RotateCcw } from 'lucide-react';
import { RacePlanOutput } from '../data/hyroxDatabase';
import { TranslationPack } from '../i18n/translations';
import { formatMS } from '../utils/timeFormat';

interface RoxzonePanelProps {
  t: TranslationPack;
  plan: RacePlanOutput;
  roxzoneOverrideSec: number | null;
  onChangeRoxzoneOverride: (sec: number | null) => void;
}

export function RoxzonePanel({
  t,
  plan,
  roxzoneOverrideSec,
  onChangeRoxzoneOverride,
}: RoxzonePanelProps) {
  const estimatedRoxDistanceMeters = 2200;
  const impliedJogPacePerKm = Math.round((plan.totalRoxzoneSec / estimatedRoxDistanceMeters) * 1000);
  const maxStationRox = Math.max(...plan.stations.map((s) => s.roxzoneSec));

  const paceCategory =
    plan.avgRoxzonePerStationSec <= 32
      ? t.roxzone.categories.elite
      : plan.avgRoxzonePerStationSec <= 44
      ? t.roxzone.categories.controlled
      : plan.avgRoxzonePerStationSec <= 56
      ? t.roxzone.categories.steady
      : t.roxzone.categories.walk;

  return (
    <section id="roxzone" className="pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.roxzone.title}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">{t.roxzone.subtitle}</p>
        </div>

        {roxzoneOverrideSec !== null && (
          <button
            type="button"
            onClick={() => onChangeRoxzoneOverride(null)}
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#FFDD00] hover:underline cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.roxzone.restoreAuto(formatMS(plan.empiricalRoxzoneTotalSec))}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive Transition Pacing Control */}
        <div className="lg:col-span-5 rounded-md border border-zinc-800 bg-[#121212] p-5 flex flex-col justify-between gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {t.roxzone.totalBudget}
              </span>
              <div className="mt-1 font-mono text-3xl font-bold text-[#FFDD00] tabular-nums">
                {formatMS(plan.totalRoxzoneSec)}
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                {formatMS(plan.avgRoxzonePerStationSec)} {t.roxzone.avgPerStationSuffix} · {paceCategory}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-zinc-500">{t.roxzone.impliedJogPace}</span>
              <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-lg font-semibold text-white tabular-nums">
                <Footprints className="h-4 w-4 text-[#FFDD00]" aria-hidden="true" />
                <span>{formatMS(impliedJogPacePerKm)}/km</span>
              </div>
              <div className="mt-0.5 text-[11px] text-zinc-500">
                {t.roxzone.estDistancePerStation}
              </div>
            </div>
          </div>

          <div>
            <input
              type="range"
              min={180}
              max={660}
              step={5}
              value={plan.totalRoxzoneSec}
              onChange={(e) => onChangeRoxzoneOverride(Number(e.target.value))}
              aria-label={t.roxzone.totalBudget}
              className="hyrox-slider w-full"
            />
            <div className="mt-1.5 flex justify-between text-[11px] font-mono text-zinc-500 tabular-nums">
              <span>3:00 (22s)</span>
              <span>5:20 (40s)</span>
              <span>8:00 (60s)</span>
              <span>11:00</span>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200 font-semibold">{t.roxzone.tacticalRuleTitle}</strong>{' '}
            {t.roxzone.tacticalRuleBody}
          </div>
        </div>

        {/* Right: Per-Station Transition Distribution */}
        <div className="lg:col-span-7 rounded-md border border-zinc-800 bg-[#121212] p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {t.roxzone.weightedAllocation}
            </span>
            <span className="text-xs font-mono text-zinc-500 tabular-nums">
              {t.roxzone.sumPrefix} {formatMS(plan.totalRoxzoneSec)}
            </span>
          </div>

          <div className="space-y-3">
            {plan.stations.map((st) => {
              const barPct = Math.round((st.roxzoneSec / maxStationRox) * 100);
              const isHighRecovery =
                st.id === 'sled_push' ||
                st.id === 'sled_pull' ||
                st.id === 'burpee_broad_jump';
              return (
                <div key={st.id} className="grid grid-cols-12 items-center gap-3">
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-2 truncate">
                    <span className="font-mono text-xs text-zinc-500 tabular-nums">
                      0{st.number}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                      {t.stations[st.id].shortName}
                    </span>
                  </div>

                  <div className="col-span-5 sm:col-span-6">
                    <div className="h-2 w-full rounded-sm bg-zinc-900 overflow-hidden">
                      <div
                        style={{ width: `${barPct}%` }}
                        className={`h-full transition-all duration-200 ${
                          isHighRecovery ? 'bg-[#FFDD00]' : 'bg-zinc-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="col-span-2 text-right font-mono text-xs sm:text-sm font-semibold text-white tabular-nums">
                    {formatMS(st.roxzoneSec)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
