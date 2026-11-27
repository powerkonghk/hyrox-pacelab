/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { BenchmarkMatrix } from './components/BenchmarkMatrix';
import { Header } from './components/Header';
import { RaceCardModal } from './components/RaceCardModal';
import { RaceSummaryStrip } from './components/RaceSummaryStrip';
import { RoxzonePanel } from './components/RoxzonePanel';
import { SplitMatrix } from './components/SplitMatrix';
import { TargetControls } from './components/TargetControls';
import {
  AthleteProfileBias,
  DIVISIONS,
  DivisionId,
  RunPacingMode,
  StationId,
  computeRacePlan,
} from './data/hyroxDatabase';
import { Language, TRANSLATIONS } from './i18n/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('yue');
  const [divisionId, setDivisionId] = useState<DivisionId>('open_men');
  const [targetFinishSec, setTargetFinishSec] = useState<number>(4500); // 1:15:00 default
  const [runPaceSec, setRunPaceSec] = useState<number>(300); // 5:00/km default
  const [runMode, setRunMode] = useState<RunPacingMode>('compromised');
  const [bias, setBias] = useState<AthleteProfileBias>('balanced');
  const [lockedStations, setLockedStations] = useState<Partial<Record<StationId, number>>>({});
  const [roxzoneOverrideSec, setRoxzoneOverrideSec] = useState<number | null>(null);
  const [isRaceCardOpen, setIsRaceCardOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'yue' ? 'zh-HK' : 'en';
    document.title =
      lang === 'yue'
        ? 'HYROX PaceLab — 比賽分段同轉換區配速規劃'
        : 'HYROX PaceLab — Race Split & Transition Planner';
  }, [lang]);

  const plan = useMemo(
    () =>
      computeRacePlan({
        divisionId,
        targetFinishSec,
        runPaceSec,
        runMode,
        bias,
        lockedStations,
        roxzoneOverrideSec,
      }),
    [divisionId, targetFinishSec, runPaceSec, runMode, bias, lockedStations, roxzoneOverrideSec]
  );

  const handleChangeDivision = (nextDiv: DivisionId) => {
    const meta = DIVISIONS.find((d) => d.id === nextDiv) ?? DIVISIONS[0];
    setDivisionId(nextDiv);
    setTargetFinishSec(meta.defaultTargetSec);
    setRunPaceSec(meta.defaultRunPaceSec);
    setLockedStations({});
    setRoxzoneOverrideSec(null);
  };

  const handleAdjustStation = (stationId: StationId, newSec: number) => {
    setLockedStations((prev) => ({
      ...prev,
      [stationId]: newSec,
    }));
  };

  const handleToggleLockStation = (stationId: StationId, currentSec: number) => {
    setLockedStations((prev) => {
      const next = { ...prev };
      if (typeof next[stationId] === 'number') {
        delete next[stationId];
      } else {
        next[stationId] = currentSec;
      }
      return next;
    });
  };

  const handleResetAll = () => {
    setLockedStations({});
    setRoxzoneOverrideSec(null);
    setBias('balanced');
  };

  const handleSelectBenchmarkTier = (finishSec: number, benchmarkRunPaceSec: number) => {
    setTargetFinishSec(finishSec);
    setRunPaceSec(benchmarkRunPaceSec);
    setLockedStations({});
    setRoxzoneOverrideSec(null);
  };

  const hasCustomOverrides =
    Object.keys(lockedStations).length > 0 ||
    roxzoneOverrideSec !== null ||
    bias !== 'balanced';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <Header t={t} onOpenRaceCard={() => setIsRaceCardOpen(true)} />

      <main className="mx-auto w-full max-w-[1320px] flex-1 px-6 print:hidden">
        <TargetControls
          lang={lang}
          onChangeLang={setLang}
          t={t}
          divisionId={divisionId}
          onChangeDivision={handleChangeDivision}
          targetFinishSec={targetFinishSec}
          onChangeTargetFinish={setTargetFinishSec}
          runPaceSec={runPaceSec}
          onChangeRunPace={setRunPaceSec}
          empiricalRunPaceSec={plan.empiricalRunPaceSec}
          runMode={runMode}
          onChangeRunMode={setRunMode}
          bias={bias}
          onChangeBias={setBias}
          tierName={plan.tierName}
          percentileLabel={plan.percentileLabel}
          onResetAll={handleResetAll}
          hasCustomOverrides={hasCustomOverrides}
        />

        <RaceSummaryStrip
          t={t}
          plan={plan}
          onSyncFinishToProjected={() => setTargetFinishSec(plan.projectedFinishSec)}
        />

        <SplitMatrix
          t={t}
          divisionId={divisionId}
          plan={plan}
          onAdjustStation={handleAdjustStation}
          onToggleLockStation={handleToggleLockStation}
        />

        <RoxzonePanel
          t={t}
          plan={plan}
          roxzoneOverrideSec={roxzoneOverrideSec}
          onChangeRoxzoneOverride={setRoxzoneOverrideSec}
        />

        <BenchmarkMatrix
          t={t}
          divisionId={divisionId}
          activeFinishSec={targetFinishSec}
          onSelectBenchmarkTier={handleSelectBenchmarkTier}
        />
      </main>

      <footer className="border-t border-zinc-900 bg-[#0A0A0A] py-6 print:hidden">
        <div className="mx-auto flex max-w-[1320px] flex-col sm:flex-row items-center justify-between gap-4 px-6 text-xs text-zinc-500">
          <span>{t.footer.left}</span>
          <span>{t.footer.right}</span>
        </div>
      </footer>

      <RaceCardModal
        t={t}
        isOpen={isRaceCardOpen}
        onClose={() => setIsRaceCardOpen(false)}
        divisionId={divisionId}
        plan={plan}
      />
    </div>
  );
}
