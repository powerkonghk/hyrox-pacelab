import { AthleteProfileBias, DivisionId, StationId } from '../data/hyroxDatabase';

export type Language = 'yue' | 'en';

export interface TranslationPack {
  langLabel: string;
  nav: {
    planner: string;
    splitMatrix: string;
    roxzone: string;
    benchmarks: string;
    raceWristband: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    languageLabel: string;
  };
  divisions: Record<
    DivisionId,
    {
      label: string;
      shortLabel: string;
      description: string;
      stationSpecs: Record<StationId, string>;
    }
  >;
  stations: Record<
    StationId,
    {
      name: string;
      shortName: string;
      distanceLabel: string;
      pacingCue: string;
    }
  >;
  controls: {
    targetFinishTime: string;
    presets: string;
    targetRunningPace: string;
    total8km: string;
    dbAvgFor: string;
    syncToDbPace: string;
    runDistribution: string;
    compromised: string;
    evenSplits: string;
    athleteBias: string;
    biasLabels: Record<AthleteProfileBias, string>;
    customLocks: string;
    resetOverrides: string;
    decreaseFinishAria: string;
    increaseFinishAria: string;
    fasterPaceAria: string;
    slowerPaceAria: string;
  };
  summary: {
    projectedFinish: string;
    goalPrefix: string;
    varianceVsGoal: string;
    onTarget: string;
    aheadSuffix: string;
    overSuffix: string;
    running8km: string;
    ofRaceSuffix: string;
    avgPrefix: string;
    matchesDb: string;
    vsDbSuffix: string;
    stationsTotal: string;
    dbRefPrefix: string;
    exactDb: string;
    roxzoneTotal: string;
    avgPerTransition: string;
    onDb: string;
    raceTimeAllocation: string;
    legendRunning: string;
    legendStations: string;
    legendRoxzone: string;
    setGoalTo: string;
    statusTags: {
      balanced: string;
      aggressive_stations: string;
      runner_surplus: string;
      deficit: string;
    };
    feasibility: {
      balancedTitle: string;
      balancedDetail: string;
      deficitTitle: (timeStr: string) => string;
      deficitDetail: (runPaceStr: string, minPaceStr: string) => string;
      surplusTitle: (timeStr: string) => string;
      surplusDetail: string;
      aggressiveTitle: string;
      aggressiveDetail: string;
    };
  };
  splitMatrix: {
    title: string;
    subtitle: string;
    tabStations: string;
    tabSequence: string;
    colStation: string;
    colDbBenchmark: string;
    colTargetSplit: string;
    colVsDb: string;
    colRoxzone: string;
    colEffortProfile: string;
    colExitClock: string;
    colLeg: string;
    colSegment: string;
    colTargetSpec: string;
    colLegTime: string;
    colCumulativeClock: string;
    runLabel: (n: number) => string;
    statusLabels: {
      nominal: string;
      aggressive: string;
      headroom: string;
      extreme: string;
    };
    unlockTooltip: string;
    lockTooltip: string;
    allLockedNote: string;
    clickToEditHint: string;
  };
  roxzone: {
    title: string;
    subtitle: string;
    restoreAuto: (timeStr: string) => string;
    totalBudget: string;
    avgPerStationSuffix: string;
    impliedJogPace: string;
    estDistancePerStation: string;
    tacticalRuleTitle: string;
    tacticalRuleBody: string;
    weightedAllocation: string;
    sumPrefix: string;
    categories: {
      elite: string;
      controlled: string;
      steady: string;
      walk: string;
    };
  };
  benchmarks: {
    title: (divLabel: string) => string;
    subtitle: string;
    colFinishTier: string;
    colRunKm: string;
    colRoxzone: string;
  };
  wristband: {
    title: string;
    subtitle: (divLabel: string, finishStr: string, paceStr: string) => string;
    headerBanner: (divUpper: string) => string;
    finishPrefix: string;
    colSegment: string;
    colSplit: string;
    colRox: string;
    colClock: string;
    copyText: string;
    copiedSplits: string;
    printWristband: string;
    plainTitle: (divLabel: string) => string;
    plainSummary: (finishStr: string, paceStr: string, stationsStr: string, roxStr: string) => string;
    runPlain: (n: number) => string;
    clockLabel: string;
  };
  tiers: Record<string, { tierName: string; percentileLabel: string }>;
  footer: {
    left: string;
    right: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationPack> = {
  yue: {
    langLabel: '廣東話',
    nav: {
      planner: '配速規劃',
      splitMatrix: '分段時間表',
      roxzone: '轉換區',
      benchmarks: '參考大數據',
      raceWristband: '比賽手帶',
    },
    hero: {
      kicker: '實戰數據配速引擎',
      title: 'HYROX 目標分段同轉換區配速規劃',
      subtitle:
        '輸入你嘅目標完賽時間同每公里跑速。系統會根據真實 HYROX 選手數據曲線建議各個體能站時間同 Roxzone 轉換節奏，唔係單純將剩餘時間平均分攤。',
      languageLabel: '語言',
    },
    divisions: {
      open_men: {
        label: '男子公開組 (Open Men)',
        shortLabel: 'Open 男',
        description: '標準重量 · 推雪橇 152 kg / 拉雪橇 103 kg / 藥球 6 kg',
        stationSpecs: {
          ski_erg: '1,000 m · 阻力 5–7',
          sled_push: '50 m · 152 kg',
          sled_pull: '50 m · 103 kg',
          burpee_broad_jump: '80 m · 自體重量',
          row: '1,000 m · 阻力 5–7',
          farmers_carry: '200 m · 2 × 24 kg',
          sandbag_lunges: '100 m · 20 kg',
          wall_balls: '100 下 · 6 kg · 3.0 m 目標',
        },
      },
      open_women: {
        label: '女子公開組 (Open Women)',
        shortLabel: 'Open 女',
        description: '標準重量 · 推雪橇 102 kg / 拉雪橇 78 kg / 藥球 4 kg',
        stationSpecs: {
          ski_erg: '1,000 m · 阻力 4–6',
          sled_push: '50 m · 102 kg',
          sled_pull: '50 m · 78 kg',
          burpee_broad_jump: '80 m · 自體重量',
          row: '1,000 m · 阻力 4–6',
          farmers_carry: '200 m · 2 × 16 kg',
          sandbag_lunges: '100 m · 10 kg',
          wall_balls: '100 下 · 4 kg · 2.7 m 目標',
        },
      },
      pro_men: {
        label: '男子精英組 (Pro Men)',
        shortLabel: 'Pro 男',
        description: '加重組別 · 推雪橇 202 kg / 拉雪橇 153 kg / 藥球 9 kg',
        stationSpecs: {
          ski_erg: '1,000 m · 阻力 6–8',
          sled_push: '50 m · 202 kg',
          sled_pull: '50 m · 153 kg',
          burpee_broad_jump: '80 m · 自體重量',
          row: '1,000 m · 阻力 6–8',
          farmers_carry: '200 m · 2 × 32 kg',
          sandbag_lunges: '100 m · 30 kg',
          wall_balls: '100 下 · 9 kg · 3.0 m 目標',
        },
      },
      pro_women: {
        label: '女子精英組 (Pro Women)',
        shortLabel: 'Pro 女',
        description: '加重組別 · 推雪橇 152 kg / 拉雪橇 103 kg / 藥球 6 kg',
        stationSpecs: {
          ski_erg: '1,000 m · 阻力 5–7',
          sled_push: '50 m · 152 kg',
          sled_pull: '50 m · 103 kg',
          burpee_broad_jump: '80 m · 自體重量',
          row: '1,000 m · 阻力 5–7',
          farmers_carry: '200 m · 2 × 24 kg',
          sandbag_lunges: '100 m · 20 kg',
          wall_balls: '100 下 · 6 kg · 2.7 m 目標',
        },
      },
      doubles: {
        label: '雙人組 (Doubles)',
        shortLabel: '雙人組',
        description: '雙人拍檔 · 體能站輪流分擔 · 兩人一齊跑 8 × 1 公里',
        stationSpecs: {
          ski_erg: '1,000 m · 輪流分擔',
          sled_push: '50 m · 152 / 102 kg 輪流',
          sled_pull: '50 m · 103 / 78 kg 輪流',
          burpee_broad_jump: '80 m · 輪流分擔',
          row: '1,000 m · 輪流分擔',
          farmers_carry: '200 m · 24 / 16 kg 輪流',
          sandbag_lunges: '100 m · 20 / 10 kg 輪流',
          wall_balls: '100 下 · 6 / 4 kg 輪流',
        },
      },
    },
    stations: {
      ski_erg: {
        name: '滑雪機 SkiErg',
        shortName: '滑雪機',
        distanceLabel: '1,000 m',
        pacingCue: '維持每 500m 1:52–2:05 穩定節奏；第一站唔好一開波就谷爆心率。',
      },
      sled_push: {
        name: '推雪橇 Sled Push',
        shortName: '推雪橇',
        distanceLabel: '50 m',
        pacingCue: '壓低重心鎖實雙臂、細步密推；每次轉彎盡量 4 秒內完成。',
      },
      sled_pull: {
        name: '拉雪橇 Sled Pull',
        shortName: '拉雪橇',
        distanceLabel: '50 m',
        pacingCue: '用盡比賽格仔空間向後行拉；留返啲前臂握力比之後農夫行。',
      },
      burpee_broad_jump: {
        name: '波比跳遠 Burpees',
        shortName: '波比跳遠',
        distanceLabel: '80 m',
        pacingCue: '用分步起身（Step-up）慳返大腿四頭肌力，鎖定均勻呼吸節奏。',
      },
      row: {
        name: '划艇機 Rowing',
        shortName: '划艇機',
        distanceLabel: '1,000 m',
        pacingCue: '保持每分鐘 24–27 槳做動態恢復，順返條氣入第 6 圈跑。',
      },
      farmers_carry: {
        name: '農夫行 Farmers Carry',
        shortName: '農夫行',
        distanceLabel: '200 m',
        pacingCue: '快步碎跑推進；目標一氣呵成，最多中途放低 3 秒調整握力。',
      },
      sandbag_lunges: {
        name: '負重弓步 Lunges',
        shortName: '負重弓步',
        distanceLabel: '100 m',
        pacingCue: '保持連貫步頻唔好停低，後膝輕點地面就即刻起返。',
      },
      wall_balls: {
        name: '藥球擲牆 Wall Balls',
        shortName: '藥球擲牆',
        distanceLabel: '100 下',
        pacingCue: '預先拆好組數（例如 25-25-20-15-15），每組嚴格唞 5 秒就繼續。',
      },
    },
    controls: {
      targetFinishTime: '目標完賽時間',
      presets: '常用目標:',
      targetRunningPace: '目標跑步配速',
      total8km: '8 × 1 公里總計:',
      dbAvgFor: '數據庫參考配速',
      syncToDbPace: '同步數據庫跑速',
      runDistribution: '跑步分段策略',
      compromised: '疲勞遞減',
      evenSplits: '均速分段',
      athleteBias: '選手能力偏向',
      biasLabels: {
        balanced: '均衡型',
        runner: '跑手型',
        strength: '力量型',
      },
      customLocks: '自訂站點鎖定',
      resetOverrides: '重設所有微調',
      decreaseFinishAria: '目標完賽時間減 1 分鐘',
      increaseFinishAria: '目標完賽時間加 1 分鐘',
      fasterPaceAria: '每公里跑速快 2 秒',
      slowerPaceAria: '每公里跑速慢 2 秒',
    },
    summary: {
      projectedFinish: '預計完賽時間',
      goalPrefix: '目標',
      varianceVsGoal: '同目標差距',
      onTarget: '準時達標',
      aheadSuffix: '快過目標',
      overSuffix: '慢過目標',
      running8km: '8 × 1 公里跑步',
      ofRaceSuffix: '佔總時間',
      avgPrefix: '平均',
      matchesDb: '同數據庫吻合',
      vsDbSuffix: '對比數據庫',
      stationsTotal: '8 個體能站合計',
      dbRefPrefix: '數據庫參考',
      exactDb: '同數據庫完全一致',
      roxzoneTotal: 'Roxzone 轉換區總計',
      avgPerTransition: '平均每站',
      onDb: '貼合數據庫',
      raceTimeAllocation: '比賽時間比例分佈',
      legendRunning: '跑步',
      legendStations: '體能站',
      legendRoxzone: '轉換區',
      setGoalTo: '將目標調校至',
      statusTags: {
        balanced: '均衡配置',
        aggressive_stations: '進取體能站',
        runner_surplus: '快過目標',
        deficit: '目標超時風險',
      },
      feasibility: {
        balancedTitle: '最佳實戰數據平衡',
        balancedDetail:
          '你嘅目標跑速同呢個完賽時間嘅 HYROX 大數據極度吻合，體能站同 Roxzone 轉換都處於穩陣實戰區間。',
        deficitTitle: (timeStr) => `跑速赤字（比目標慢 ${timeStr}）`,
        deficitDetail: (runPaceStr, minPaceStr) =>
          `就算體能站同 Roxzone 壓到接近精英極限，以 ${runPaceStr}/km 跑步依然唔夠時間完成目標。建議將跑速提升至約 ${minPaceStr}/km，或者調整完賽目標。`,
        surplusTitle: (timeStr) => `跑步時間充裕（淨多 ${timeStr} 緩衝）`,
        surplusDetail:
          '你嘅跑步配速快過同級選手大數據。系統將體能站維持喺合理唔爆偈嘅可控節奏，令你有足夠體力穩定發揮甚至提前衝線。',
        aggressiveTitle: '需要高效率體能站執行力',
        aggressiveDetail:
          '你嘅跑步配速比同目標完賽選手略慢，需要靠快速進出轉換區，同埋喺推雪橇、波比跳遠同藥球擲牆慳返時間補數。',
      },
    },
    splitMatrix: {
      title: '各站目標時間同比賽順序',
      subtitle: '根據真實選手數據曲線推算。你可以鎖定或微調任何一站，其餘站點會自動重新平衡。',
      tabStations: '8 個體能站及轉換',
      tabSequence: '16 段完整比賽順序',
      colStation: '體能站',
      colDbBenchmark: '數據庫基準',
      colTargetSplit: '建議目標',
      colVsDb: '對比基準',
      colRoxzone: '轉換區',
      colEffortProfile: '強度評估',
      colExitClock: '出站累計時間',
      colLeg: '階段',
      colSegment: '賽段內容',
      colTargetSpec: '目標配速 / 規格',
      colLegTime: '分段時間',
      colCumulativeClock: '累計比賽時間',
      runLabel: (n) => `第 ${n} 圈跑步 (1,000 m)`,
      statusLabels: {
        nominal: '貼合曲線',
        aggressive: '進取目標',
        headroom: '留力緩衝',
        extreme: '接近精英極限',
      },
      unlockTooltip: '解鎖此站',
      lockTooltip: '鎖定此站時間',
      allLockedNote: '全部 8 個體能站已鎖定 · 時間差額將由 Roxzone 轉換區自動吸收',
      clickToEditHint: '撳時間數字可直接輸入分段',
    },
    roxzone: {
      title: 'Roxzone 轉換區配速優化',
      subtitle:
        '8 個室內進出轉換通道合計約 2.2 公里步距。系統會為高乳酸負荷站點（如雪橇、波比跳）預留多幾秒順氣緩衝。',
      restoreAuto: (timeStr) => `還原自動轉換時間 (${timeStr})`,
      totalBudget: 'Roxzone 轉換總預算',
      avgPerStationSuffix: '平均每站',
      impliedJogPace: '推算慢跑配速',
      estDistancePerStation: '每站進出約 275 m',
      tacticalRuleTitle: '實戰守則：',
      tacticalRuleBody:
        '入閘頭 10 秒千祈唔好即刻行。進出滑雪機、划艇同農夫行保持輕快慢跑；剛推完雪橇或者做完波比跳先留幾秒深呼吸調整心率。',
      weightedAllocation: '各站轉換時間分配（入站 + 出站）',
      sumPrefix: '合計:',
      categories: {
        elite: '精英級快跑轉換',
        controlled: '穩定慢跑通過',
        steady: '均速緩跑回氣',
        walk: '行路 / 較長回氣時間',
      },
    },
    benchmarks: {
      title: (divLabel) => `真實選手數據曲線 · ${divLabel}`,
      subtitle: '各個完賽級別嘅真實數據參考。撳任何一行即可直接套用該目標時間同跑速。',
      colFinishTier: '完賽級別',
      colRunKm: '跑速 /km',
      colRoxzone: '轉換區',
    },
    wristband: {
      title: '比賽日配速手帶',
      subtitle: (divLabel, finishStr, paceStr) =>
        `${divLabel} · 目標完賽 ${finishStr} · 平均跑速 ${paceStr}/km`,
      headerBanner: (divUpper) => `HYROX ${divUpper}`,
      finishPrefix: '目標完賽',
      colSegment: '賽段',
      colSplit: '分段',
      colRox: '轉換',
      colClock: '累計時間',
      copyText: '複製純文字',
      copiedSplits: '已複製分段',
      printWristband: '列印手帶',
      plainTitle: (divLabel) => `HYROX PACELAB — 比賽手帶 (${divLabel})`,
      plainSummary: (finishStr, paceStr, stationsStr, roxStr) =>
        `目標: ${finishStr} | 平均跑速: ${paceStr}/km | 體能站合計: ${stationsStr} | 轉換區: ${roxStr}`,
      runPlain: (n) => `第${n}圈跑`,
      clockLabel: '累計',
    },
    tiers: {
      'Sub-60 Elite': { tierName: 'Sub-60 頂尖精英', percentileLabel: '前 1%' },
      'Sub-70 Podium': { tierName: 'Sub-70 頒獎台級', percentileLabel: '前 6%' },
      'Sub-75 Competitive': { tierName: 'Sub-75 進階競爭組', percentileLabel: '前 15%' },
      '1:20 Strong Open': { tierName: '1:20 強勁公開組', percentileLabel: '前 28%' },
      '1:30 Median Open': { tierName: '1:30 公開組中位數', percentileLabel: '前 52%' },
      '1:45 Finisher': { tierName: '1:45 穩健完賽組', percentileLabel: '前 80%' },
      'Sub-65 Elite': { tierName: 'Sub-65 頂尖精英', percentileLabel: '前 1%' },
      'Sub-75 Podium': { tierName: 'Sub-75 頒獎台級', percentileLabel: '前 7%' },
      '1:22 Competitive': { tierName: '1:22 進階競爭組', percentileLabel: '前 20%' },
      '1:30 Strong Open': { tierName: '1:30 強勁公開組', percentileLabel: '前 38%' },
      '1:40 Median Open': { tierName: '1:40 公開組中位數', percentileLabel: '前 60%' },
      '1:55 Finisher': { tierName: '1:55 穩健完賽組', percentileLabel: '前 85%' },
      'World Championship': { tierName: '世錦賽頂尖級', percentileLabel: 'Pro 前 1%' },
      'Sub-65 Pro Podium': { tierName: 'Sub-65 Pro 頒獎台', percentileLabel: 'Pro 前 8%' },
      '1:10 Competitive Pro': { tierName: '1:10 進階 Pro 組', percentileLabel: 'Pro 前 22%' },
      '1:17 Median Pro': { tierName: '1:17 Pro 中位數', percentileLabel: 'Pro 前 50%' },
      '1:27 Pro Finisher': { tierName: '1:27 Pro 完賽組', percentileLabel: 'Pro 前 80%' },
      'Pro Elite': { tierName: 'Pro 頂尖精英', percentileLabel: 'Pro 前 1%' },
      '1:12 Pro Podium': { tierName: '1:12 Pro 頒獎台', percentileLabel: 'Pro 前 10%' },
      '1:18 Competitive Pro': { tierName: '1:18 進階 Pro 組', percentileLabel: 'Pro 前 28%' },
      '1:27 Median Pro': { tierName: '1:27 Pro 中位數', percentileLabel: 'Pro 前 55%' },
      '1:40 Pro Finisher': { tierName: '1:40 Pro 完賽組', percentileLabel: 'Pro 前 85%' },
      'Sub-55 Elite Pair': { tierName: 'Sub-55 頂尖拍檔', percentileLabel: '前 2%' },
      '1:03 Podium Pair': { tierName: '1:03 頒獎台拍檔', percentileLabel: '前 12%' },
      '1:08 Competitive Pair': { tierName: '1:08 進階拍檔', percentileLabel: '前 28%' },
      '1:15 Median Pair': { tierName: '1:15 雙人中位數', percentileLabel: '前 50%' },
      '1:30 Finisher Pair': { tierName: '1:30 雙人完賽組', percentileLabel: '前 82%' },
    },
    footer: {
      left: 'HYROX PaceLab · 實戰數據分段同轉換區配速模型',
      right: '官方比賽順序：8 × 1,000 m 跑步 + 8 個體能站 + Roxzone 轉換區',
    },
  },
  en: {
    langLabel: 'English',
    nav: {
      planner: 'Planner',
      splitMatrix: 'Split Matrix',
      roxzone: 'Roxzone',
      benchmarks: 'Benchmarks',
      raceWristband: 'Race Wristband',
    },
    hero: {
      kicker: 'Empirical Race Strategy Engine',
      title: 'HYROX Target Split & Transition Planner',
      subtitle:
        'Set your target finish time and 1 km running pace. Station targets and Roxzone transitions are derived from real HYROX athlete split curves rather than naive equal division.',
      languageLabel: 'Language',
    },
    divisions: {
      open_men: {
        label: 'Open Men',
        shortLabel: 'Open M',
        description: 'Standard weights · 152 kg Push / 103 kg Pull / 6 kg Wall Ball',
        stationSpecs: {
          ski_erg: '1,000 m · Damper 5–7',
          sled_push: '50 m · 152 kg',
          sled_pull: '50 m · 103 kg',
          burpee_broad_jump: '80 m · Bodyweight',
          row: '1,000 m · Damper 5–7',
          farmers_carry: '200 m · 2 × 24 kg',
          sandbag_lunges: '100 m · 20 kg',
          wall_balls: '100 reps · 6 kg · 3.0 m',
        },
      },
      open_women: {
        label: 'Open Women',
        shortLabel: 'Open W',
        description: 'Standard weights · 102 kg Push / 78 kg Pull / 4 kg Wall Ball',
        stationSpecs: {
          ski_erg: '1,000 m · Damper 4–6',
          sled_push: '50 m · 102 kg',
          sled_pull: '50 m · 78 kg',
          burpee_broad_jump: '80 m · Bodyweight',
          row: '1,000 m · Damper 4–6',
          farmers_carry: '200 m · 2 × 16 kg',
          sandbag_lunges: '100 m · 10 kg',
          wall_balls: '100 reps · 4 kg · 2.7 m',
        },
      },
      pro_men: {
        label: 'Pro Men',
        shortLabel: 'Pro M',
        description: 'Heavy weights · 202 kg Push / 153 kg Pull / 9 kg Wall Ball',
        stationSpecs: {
          ski_erg: '1,000 m · Damper 6–8',
          sled_push: '50 m · 202 kg',
          sled_pull: '50 m · 153 kg',
          burpee_broad_jump: '80 m · Bodyweight',
          row: '1,000 m · Damper 6–8',
          farmers_carry: '200 m · 2 × 32 kg',
          sandbag_lunges: '100 m · 30 kg',
          wall_balls: '100 reps · 9 kg · 3.0 m',
        },
      },
      pro_women: {
        label: 'Pro Women',
        shortLabel: 'Pro W',
        description: 'Heavy weights · 152 kg Push / 103 kg Pull / 6 kg Wall Ball',
        stationSpecs: {
          ski_erg: '1,000 m · Damper 5–7',
          sled_push: '50 m · 152 kg',
          sled_pull: '50 m · 103 kg',
          burpee_broad_jump: '80 m · Bodyweight',
          row: '1,000 m · Damper 5–7',
          farmers_carry: '200 m · 2 × 24 kg',
          sandbag_lunges: '100 m · 20 kg',
          wall_balls: '100 reps · 6 kg · 2.7 m',
        },
      },
      doubles: {
        label: 'Doubles (Open)',
        shortLabel: 'Doubles',
        description: 'Paired race · Shared station work · Both run 8 × 1 km together',
        stationSpecs: {
          ski_erg: '1,000 m · Shared',
          sled_push: '50 m · 152 / 102 kg Shared',
          sled_pull: '50 m · 103 / 78 kg Shared',
          burpee_broad_jump: '80 m · Shared',
          row: '1,000 m · Shared',
          farmers_carry: '200 m · 24 / 16 kg Shared',
          sandbag_lunges: '100 m · 20 / 10 kg Shared',
          wall_balls: '100 reps · 6 / 4 kg Shared',
        },
      },
    },
    stations: {
      ski_erg: {
        name: 'SkiErg',
        shortName: 'SkiErg',
        distanceLabel: '1,000 m',
        pacingCue: 'Controlled 1:52–2:05/500m rhythm; avoid spiking HR on Station 1.',
      },
      sled_push: {
        name: 'Sled Push',
        shortName: 'Sled Push',
        distanceLabel: '50 m',
        pacingCue: 'Low locked arms, short rhythmic steps; keep turns under 4s.',
      },
      sled_pull: {
        name: 'Sled Pull',
        shortName: 'Sled Pull',
        distanceLabel: '50 m',
        pacingCue: 'Use full box depth to walk back; save grip for Farmers Carry.',
      },
      burpee_broad_jump: {
        name: 'Burpee Broad Jumps',
        shortName: 'Burpees',
        distanceLabel: '80 m',
        pacingCue: 'Step-up technique saves quads; lock a metronome cadence.',
      },
      row: {
        name: 'Rowing',
        shortName: 'Rowing',
        distanceLabel: '1,000 m',
        pacingCue: '24–27 spm active recovery; breathe deeply into Run 6.',
      },
      farmers_carry: {
        name: 'Farmers Carry',
        shortName: 'Farmers',
        distanceLabel: '200 m',
        pacingCue: 'Fast brisk shuffle; aim for unbroken or single 3s chalk drop.',
      },
      sandbag_lunges: {
        name: 'Sandbag Lunges',
        shortName: 'Lunges',
        distanceLabel: '100 m',
        pacingCue: 'Unbroken steady steps; kiss knee lightly without pausing.',
      },
      wall_balls: {
        name: 'Wall Balls',
        shortName: 'Wall Balls',
        distanceLabel: '100 reps',
        pacingCue: 'Planned sets (e.g. 25-25-20-15-15) with strict 5s breathers.',
      },
    },
    controls: {
      targetFinishTime: 'Target Finish Time',
      presets: 'Presets:',
      targetRunningPace: 'Target Running Pace',
      total8km: '8 × 1 km total:',
      dbAvgFor: 'DB Avg for',
      syncToDbPace: 'Sync to DB Pace',
      runDistribution: 'Run Distribution',
      compromised: 'Compromised',
      evenSplits: 'Even Splits',
      athleteBias: 'Athlete Strength Bias',
      biasLabels: {
        balanced: 'Balanced',
        runner: 'Runner',
        strength: 'Strength',
      },
      customLocks: 'Custom locks',
      resetOverrides: 'Reset Overrides',
      decreaseFinishAria: 'Decrease finish time by 1 minute',
      increaseFinishAria: 'Increase finish time by 1 minute',
      fasterPaceAria: 'Faster run pace by 2 seconds per km',
      slowerPaceAria: 'Slower run pace by 2 seconds per km',
    },
    summary: {
      projectedFinish: 'Projected Finish',
      goalPrefix: 'Goal',
      varianceVsGoal: 'Variance vs goal',
      onTarget: 'On Target',
      aheadSuffix: 'ahead',
      overSuffix: 'over',
      running8km: '8 × 1 km Running',
      ofRaceSuffix: '% of race',
      avgPrefix: 'Avg',
      matchesDb: 'Matches DB',
      vsDbSuffix: 'vs DB',
      stationsTotal: '8 Stations Total',
      dbRefPrefix: 'DB Ref',
      exactDb: 'Exact DB',
      roxzoneTotal: 'Roxzone Total',
      avgPerTransition: 'Avg',
      onDb: 'On DB',
      raceTimeAllocation: 'Race Time Allocation',
      legendRunning: 'Running',
      legendStations: 'Stations',
      legendRoxzone: 'Roxzone',
      setGoalTo: 'Set Goal to',
      statusTags: {
        balanced: 'Balanced Profile',
        aggressive_stations: 'Aggressive Stations',
        runner_surplus: 'Ahead of Goal',
        deficit: 'Goal Deficit',
      },
      feasibility: {
        balancedTitle: 'Optimal Empirical Balance',
        balancedDetail:
          'Your running pace aligns closely with HYROX athlete data for this finish time. Stations and Roxzone transitions sit right on proven race profiles.',
        deficitTitle: (timeStr) => `Run Pace Deficit (${timeStr} Over Goal)`,
        deficitDetail: (runPaceStr, minPaceStr) =>
          `Even at near-elite station limits and fast Roxzone transitions, a ${runPaceStr}/km run leaves too little clock. Target ${minPaceStr}/km running or adjust your finish goal.`,
        surplusTitle: (timeStr) => `Running Surplus (+${timeStr} Cushion)`,
        surplusDetail:
          'Your target run pace is faster than typical finishers at this goal. Stations are capped at realistic controlled pacing so you can avoid redlining and finish ahead of schedule.',
        aggressiveTitle: 'Aggressive Station Execution Required',
        aggressiveDetail:
          'Your run pace is slightly slower than the empirical benchmark for this goal, requiring sharp transitions and top-tier efficiency on Sled Push, Burpees, and Wall Balls.',
      },
    },
    splitMatrix: {
      title: 'Station Targets & Race Order',
      subtitle:
        'Suggested splits anchored to empirical athlete curves. Lock or fine-tune any station to rebalance remaining legs.',
      tabStations: '8 Stations & Transitions',
      tabSequence: '16-Leg Race Sequence',
      colStation: 'Station',
      colDbBenchmark: 'DB Benchmark',
      colTargetSplit: 'Target Split',
      colVsDb: 'vs DB',
      colRoxzone: 'Roxzone',
      colEffortProfile: 'Effort Profile',
      colExitClock: 'Exit Clock',
      colLeg: 'Leg',
      colSegment: 'Segment',
      colTargetSpec: 'Target Spec / Pace',
      colLegTime: 'Leg Time',
      colCumulativeClock: 'Cumulative Clock',
      runLabel: (n) => `Run ${n} (1,000 m)`,
      statusLabels: {
        nominal: 'On Profile',
        aggressive: 'Aggressive',
        headroom: 'Paced Buffer',
        extreme: 'Elite Limit',
      },
      unlockTooltip: 'Unlock split',
      lockTooltip: 'Lock split',
      allLockedNote: 'All 8 stations locked · Time variance is now absorbed by Roxzone',
      clickToEditHint: 'Click any split time to type directly',
    },
    roxzone: {
      title: 'Roxzone Transition Optimizer',
      subtitle:
        'Pacing strategy across the 8 indoor transition corridors (~2.2 km total in-and-out distance). High-lactate stations receive proportional recovery buffer.',
      restoreAuto: (timeStr) => `Restore Auto Roxzone (${timeStr})`,
      totalBudget: 'Total Roxzone Budget',
      avgPerStationSuffix: 'avg per station',
      impliedJogPace: 'Implied Jog Pace',
      estDistancePerStation: 'est. ~275 m / station',
      tacticalRuleTitle: 'Tactical Rule:',
      tacticalRuleBody:
        'Never walk the first 10 seconds out of the Run-In gate. Maintain a light jog entering SkiErg, Row, and Farmers Carry; take your controlled deep breaths exiting Sled Push and Burpees.',
      weightedAllocation: 'Weighted Transition Allocation (In + Out)',
      sumPrefix: 'Sum:',
      categories: {
        elite: 'Elite Brisk Jog',
        controlled: 'Controlled Jog',
        steady: 'Steady Recovery Trot',
        walk: 'Walk / Extended Catch-Breath',
      },
    },
    benchmarks: {
      title: (divLabel) => `Empirical Athlete Curve · ${divLabel}`,
      subtitle:
        'Reference database profiles across finish tiers. Click any row to load that finish goal and empirical run pace.',
      colFinishTier: 'Finish Tier',
      colRunKm: 'Run /km',
      colRoxzone: 'Roxzone',
    },
    wristband: {
      title: 'Race-Day Pace Wristband',
      subtitle: (divLabel, finishStr, paceStr) =>
        `${divLabel} · Target ${finishStr} · Avg Run ${paceStr}/km`,
      headerBanner: (divUpper) => `HYROX ${divUpper}`,
      finishPrefix: 'FINISH',
      colSegment: 'Segment',
      colSplit: 'Split',
      colRox: 'Rox',
      colClock: 'Clock',
      copyText: 'Copy Text',
      copiedSplits: 'Copied Splits',
      printWristband: 'Print Wristband',
      plainTitle: (divLabel) => `HYROX PACELAB — RACE WRISTBAND (${divLabel})`,
      plainSummary: (finishStr, paceStr, stationsStr, roxStr) =>
        `Goal: ${finishStr} | Avg Run: ${paceStr}/km | Stations: ${stationsStr} | Roxzone: ${roxStr}`,
      runPlain: (n) => `Run ${n}`,
      clockLabel: 'Clock',
    },
    tiers: {},
    footer: {
      left: 'HYROX PaceLab · Empirical Race Split & Transition Modeling',
      right: 'Official race order: 8 × 1,000 m Run + 8 Workout Stations + Roxzone',
    },
  },
};
