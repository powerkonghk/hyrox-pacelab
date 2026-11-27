import { useState, useEffect } from 'react';
import { Globe, Minus, Plus, RotateCcw } from 'lucide-react';
import {
  AthleteProfileBias,
  DIVISIONS,
  DivisionId,
  RunPacingMode,
} from '../data/hyroxDatabase';
import { Language, TranslationPack } from '../i18n/translations';
import { formatHMS, formatMS, parseTimeToSeconds } from '../utils/timeFormat';

interface TargetControlsProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  t: TranslationPack;
  divisionId: DivisionId;
  onChangeDivision: (id: DivisionId) => void;
  targetFinishSec: number;
  onChangeTargetFinish: (sec: number) => void;
  runPaceSec: number;
  onChangeRunPace: (sec: number) => void;
  empiricalRunPaceSec: number;
  runMode: RunPacingMode;
  onChangeRunMode: (mode: RunPacingMode) => void;
  bias: AthleteProfileBias;
  onChangeBias: (bias: AthleteProfileBias) => void;
  tierName: string;
  percentileLabel: string;
  onResetAll: () => void;
  hasCustomOverrides: boolean;
}

const FINISH_PRESETS = [
  { label: '1:00:00', sec: 3600 },
  { label: '1:10:00', sec: 4200 },
  { label: '1:15:00', sec: 4500 },
  { label: '1:20:00', sec: 4800 },
  { label: '1:30:00', sec: 5400 },
  { label: '1:45:00', sec: 6300 },
];

export function TargetControls({
  lang,
  onChangeLang,
  t,
  divisionId,
  onChangeDivision,
  targetFinishSec,
  onChangeTargetFinish,
  runPaceSec,
  onChangeRunPace,
  empiricalRunPaceSec,
  runMode,
  onChangeRunMode,
  bias,
  onChangeBias,
  tierName,
  percentileLabel,
  onResetAll,
  hasCustomOverrides,
}: TargetControlsProps) {
  const activeDivText = t.divisions[divisionId];
  const localizedTier = t.tiers[tierName] ?? { tierName, percentileLabel };

  const [finishInput, setFinishInput] = useState(formatHMS(targetFinishSec));
  const [paceInput, setPaceInput] = useState(formatMS(runPaceSec));
  const [editingFinish, setEditingFinish] = useState(false);
  const [editingPace, setEditingPace] = useState(false);

  useEffect(() => {
    if (!editingFinish) setFinishInput(formatHMS(targetFinishSec));
  }, [targetFinishSec, editingFinish]);

  useEffect(() => {
    if (!editingPace) setPaceInput(formatMS(runPaceSec));
  }, [runPaceSec, editingPace]);

  const commitFinishInput = () => {
    setEditingFinish(false);
    const parsed = parseTimeToSeconds(finishInput);
    if (parsed !== null) {
      const clamped = Math.min(8400, Math.max(3120, parsed));
      onChangeTargetFinish(clamped);
    } else {
      setFinishInput(formatHMS(targetFinishSec));
    }
  };

  const commitPaceInput = () => {
    setEditingPace(false);
    const parsed = parseTimeToSeconds(paceInput);
    if (parsed !== null) {
      const clamped = Math.min(480, Math.max(200, parsed));
      onChangeRunPace(clamped);
    } else {
      setPaceInput(formatMS(runPaceSec));
    }
  };

  return (
    <section id="planner" className="pt-8 pb-6">
      {/* Hero Headline & Division / Language Selector Row */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-[#FFDD00] uppercase">
            {t.hero.kicker}
          </p>
          <h1 className="mt-1.5 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white [text-wrap:balance]">
            {t.hero.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-2.5">
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.hero.languageLabel}</span>
            </span>
            <div className="flex items-center gap-1 rounded-md border border-zinc-800 bg-[#121212] p-0.5">
              <button
                type="button"
                onClick={() => onChangeLang('yue')}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === 'yue'
                    ? 'bg-[#FFDD00] text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                廣東話
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('en')}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#FFDD00] text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Division Selector */}
          <div className="flex flex-wrap items-center gap-1 rounded-md border border-zinc-800 bg-[#121212] p-1">
            {DIVISIONS.map((div) => {
              const active = div.id === divisionId;
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => onChangeDivision(div.id)}
                  className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFDD00] ${
                    active
                      ? 'bg-[#FFDD00] text-black'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {t.divisions[div.id].shortLabel}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-zinc-500">{activeDivText.description}</p>
        </div>
      </div>

      {/* Primary Inputs Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Target Finish Time Control */}
        <div className="lg:col-span-5 rounded-md border border-zinc-800 bg-[#121212] p-5 flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <label
                htmlFor="target-finish-input"
                className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                {t.controls.targetFinishTime}
              </label>
              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                <span className="text-zinc-300 font-medium">{localizedTier.tierName}</span>
                <span aria-hidden="true">·</span>
                <span>{localizedTier.percentileLabel}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label={t.controls.decreaseFinishAria}
                onClick={() => onChangeTargetFinish(Math.max(3120, targetFinishSec - 60))}
                className="flex h-9 w-9 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <input
                id="target-finish-input"
                type="text"
                value={finishInput}
                onFocus={() => setEditingFinish(true)}
                onChange={(e) => setFinishInput(e.target.value)}
                onBlur={commitFinishInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitFinishInput();
                }}
                aria-label={t.controls.targetFinishTime}
                className="w-[116px] rounded border border-zinc-800 bg-black px-2 py-1 text-center font-mono text-2xl font-bold text-[#FFDD00] tabular-nums focus:border-[#FFDD00] focus:outline-none"
              />
              <button
                type="button"
                aria-label={t.controls.increaseFinishAria}
                onClick={() => onChangeTargetFinish(Math.min(8400, targetFinishSec + 60))}
                className="flex h-9 w-9 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div>
            <input
              type="range"
              min={3120}
              max={7800}
              step={15}
              value={targetFinishSec}
              onChange={(e) => onChangeTargetFinish(Number(e.target.value))}
              aria-label={t.controls.targetFinishTime}
              className="hyrox-slider w-full"
            />
            <div className="mt-1.5 flex justify-between text-[11px] font-mono text-zinc-500 tabular-nums">
              <span>0:52:00</span>
              <span>1:15:00</span>
              <span>1:40:00</span>
              <span>2:10:00</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-zinc-800/80">
            <span className="text-[11px] font-medium text-zinc-500 mr-1">
              {t.controls.presets}
            </span>
            {FINISH_PRESETS.map((preset) => {
              const isSelected = targetFinishSec === preset.sec;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => onChangeTargetFinish(preset.sec)}
                  className={`rounded px-2 py-1 font-mono text-xs tabular-nums transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#FFDD00]/15 text-[#FFDD00] border border-[#FFDD00]/50 font-semibold'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Running Pace Control */}
        <div className="lg:col-span-4 rounded-md border border-zinc-800 bg-[#121212] p-5 flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <label
                htmlFor="run-pace-input"
                className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                {t.controls.targetRunningPace}
              </label>
              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                <span>{t.controls.total8km}</span>
                <span className="font-mono text-zinc-200 tabular-nums">
                  {formatMS(runPaceSec * 8)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label={t.controls.fasterPaceAria}
                onClick={() => onChangeRunPace(Math.max(200, runPaceSec - 2))}
                className="flex h-9 w-9 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-baseline rounded border border-zinc-800 bg-black px-2.5 py-1">
                <input
                  id="run-pace-input"
                  type="text"
                  value={paceInput}
                  onFocus={() => setEditingPace(true)}
                  onChange={(e) => setPaceInput(e.target.value)}
                  onBlur={commitPaceInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitPaceInput();
                  }}
                  aria-label={t.controls.targetRunningPace}
                  className="w-[62px] bg-transparent text-center font-mono text-2xl font-bold text-white tabular-nums focus:outline-none"
                />
                <span className="text-xs font-mono text-zinc-500 ml-0.5">/km</span>
              </div>
              <button
                type="button"
                aria-label={t.controls.slowerPaceAria}
                onClick={() => onChangeRunPace(Math.min(480, runPaceSec + 2))}
                className="flex h-9 w-9 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div>
            <input
              type="range"
              min={205}
              max={460}
              step={1}
              value={runPaceSec}
              onChange={(e) => onChangeRunPace(Number(e.target.value))}
              aria-label={t.controls.targetRunningPace}
              className="hyrox-slider w-full"
            />
            <div className="mt-1.5 flex justify-between text-[11px] font-mono text-zinc-500 tabular-nums">
              <span>3:25/km</span>
              <span>4:45/km</span>
              <span>6:00/km</span>
              <span>7:40/km</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-800/80 text-xs">
            <span className="text-zinc-500">
              {t.controls.dbAvgFor} ({formatHMS(targetFinishSec)}):{' '}
              <span className="font-mono text-zinc-300 tabular-nums">
                {formatMS(empiricalRunPaceSec)}/km
              </span>
            </span>
            {runPaceSec !== empiricalRunPaceSec && (
              <button
                type="button"
                onClick={() => onChangeRunPace(empiricalRunPaceSec)}
                className="text-xs font-semibold text-[#FFDD00] hover:underline cursor-pointer whitespace-nowrap shrink-0"
              >
                {t.controls.syncToDbPace}
              </button>
            )}
          </div>
        </div>

        {/* Pacing Strategy & Athlete Bias */}
        <div className="lg:col-span-3 rounded-md border border-zinc-800 bg-[#121212] p-5 flex flex-col justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {t.controls.runDistribution}
            </span>
            <div className="mt-2 grid grid-cols-2 gap-1 rounded border border-zinc-800 bg-black p-1">
              <button
                type="button"
                onClick={() => onChangeRunMode('compromised')}
                className={`rounded px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  runMode === 'compromised'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {t.controls.compromised}
              </button>
              <button
                type="button"
                onClick={() => onChangeRunMode('even')}
                className={`rounded px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  runMode === 'even'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {t.controls.evenSplits}
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {t.controls.athleteBias}
            </span>
            <div className="mt-2 grid grid-cols-3 gap-1 rounded border border-zinc-800 bg-black p-1">
              {(['balanced', 'runner', 'strength'] as const).map((optId) => (
                <button
                  key={optId}
                  type="button"
                  onClick={() => onChangeBias(optId)}
                  className={`rounded px-2 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    bias === optId
                      ? 'bg-[#FFDD00] text-black'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {t.controls.biasLabels[optId]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80">
            <span className="text-xs text-zinc-500">{t.controls.customLocks}</span>
            <button
              type="button"
              onClick={onResetAll}
              disabled={!hasCustomOverrides}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                hasCustomOverrides
                  ? 'text-[#FFDD00] hover:underline cursor-pointer'
                  : 'text-zinc-600 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              <span>{t.controls.resetOverrides}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
