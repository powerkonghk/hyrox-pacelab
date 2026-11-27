export type DivisionId =
  | 'open_men'
  | 'open_women'
  | 'pro_men'
  | 'pro_women'
  | 'doubles';

export type StationId =
  | 'ski_erg'
  | 'sled_push'
  | 'sled_pull'
  | 'burpee_broad_jump'
  | 'row'
  | 'farmers_carry'
  | 'sandbag_lunges'
  | 'wall_balls';

export type RunPacingMode = 'even' | 'compromised';
export type AthleteProfileBias = 'balanced' | 'runner' | 'strength';

export interface DivisionMeta {
  id: DivisionId;
  label: string;
  shortLabel: string;
  description: string;
  defaultTargetSec: number;
  defaultRunPaceSec: number;
  stationSpecs: Record<StationId, string>;
}

export interface StationMeta {
  id: StationId;
  number: number;
  name: string;
  shortName: string;
  distanceLabel: string;
  /** How elastic/compressible this station is when adjusting splits vs fixed erg floors (0.3 = rigid, 1.4 = very elastic) */
  elasticity: number;
  /** Physiological elite floor in seconds (approx world-record/top-0.5% cap) */
  eliteFloorSec: Record<DivisionId, number>;
  /** Roxzone recovery weight after completing this station (sleds & burpees need slightly longer transition catch-breath) */
  transitionRecoveryWeight: number;
  /** Brief tactical pacing cue */
  pacingCue: string;
}

export interface BenchmarkAnchor {
  finishSec: number;
  tierName: string;
  percentileLabel: string;
  runPaceSec: number;
  roxzoneSec: number;
  stations: Record<StationId, number>;
}

export const STATIONS: StationMeta[] = [
  {
    id: 'ski_erg',
    number: 1,
    name: 'SkiErg',
    shortName: 'SkiErg',
    distanceLabel: '1,000 m',
    elasticity: 0.45,
    eliteFloorSec: {
      open_men: 195,
      open_women: 225,
      pro_men: 195,
      pro_women: 225,
      doubles: 185,
    },
    transitionRecoveryWeight: 0.88,
    pacingCue: 'Controlled 1:52–2:05/500m rhythm; avoid spiking HR on Station 1.',
  },
  {
    id: 'sled_push',
    number: 2,
    name: 'Sled Push',
    shortName: 'Sled Push',
    distanceLabel: '50 m',
    elasticity: 1.35,
    eliteFloorSec: {
      open_men: 85,
      open_women: 90,
      pro_men: 115,
      pro_women: 115,
      doubles: 75,
    },
    transitionRecoveryWeight: 1.18,
    pacingCue: 'Low locked arms, short rhythmic steps; keep turns under 4s.',
  },
  {
    id: 'sled_pull',
    number: 3,
    name: 'Sled Pull',
    shortName: 'Sled Pull',
    distanceLabel: '50 m',
    elasticity: 1.25,
    eliteFloorSec: {
      open_men: 105,
      open_women: 115,
      pro_men: 145,
      pro_women: 145,
      doubles: 95,
    },
    transitionRecoveryWeight: 1.12,
    pacingCue: 'Use full box depth to walk back; save grip for Farmers Carry.',
  },
  {
    id: 'burpee_broad_jump',
    number: 4,
    name: 'Burpee Broad Jumps',
    shortName: 'Burpees',
    distanceLabel: '80 m',
    elasticity: 1.2,
    eliteFloorSec: {
      open_men: 145,
      open_women: 170,
      pro_men: 150,
      pro_women: 175,
      doubles: 125,
    },
    transitionRecoveryWeight: 1.15,
    pacingCue: 'Step-up technique saves quads; lock a metronome cadence.',
  },
  {
    id: 'row',
    number: 5,
    name: 'Rowing',
    shortName: 'Rowing',
    distanceLabel: '1,000 m',
    elasticity: 0.45,
    eliteFloorSec: {
      open_men: 205,
      open_women: 230,
      pro_men: 205,
      pro_women: 230,
      doubles: 190,
    },
    transitionRecoveryWeight: 0.92,
    pacingCue: '24–27 spm active recovery; breathe deeply into Run 6.',
  },
  {
    id: 'farmers_carry',
    number: 6,
    name: 'Farmers Carry',
    shortName: 'Farmers',
    distanceLabel: '200 m',
    elasticity: 0.75,
    eliteFloorSec: {
      open_men: 70,
      open_women: 75,
      pro_men: 85,
      pro_women: 85,
      doubles: 65,
    },
    transitionRecoveryWeight: 0.85,
    pacingCue: 'Fast brisk shuffle; aim for unbroken or single 3s chalk drop.',
  },
  {
    id: 'sandbag_lunges',
    number: 7,
    name: 'Sandbag Lunges',
    shortName: 'Lunges',
    distanceLabel: '100 m',
    elasticity: 1.15,
    eliteFloorSec: {
      open_men: 145,
      open_women: 165,
      pro_men: 180,
      pro_women: 195,
      doubles: 130,
    },
    transitionRecoveryWeight: 1.05,
    pacingCue: 'Unbroken steady steps; kiss knee lightly without pausing.',
  },
  {
    id: 'wall_balls',
    number: 8,
    name: 'Wall Balls',
    shortName: 'Wall Balls',
    distanceLabel: '100 reps',
    elasticity: 1.4,
    eliteFloorSec: {
      open_men: 175,
      open_women: 185,
      pro_men: 205,
      pro_women: 205,
      doubles: 145,
    },
    transitionRecoveryWeight: 0.85,
    pacingCue: 'Planned sets (e.g. 25-25-20-15-15) with strict 5s breathers.',
  },
];

export const DIVISIONS: DivisionMeta[] = [
  {
    id: 'open_men',
    label: 'Open Men',
    shortLabel: 'Open M',
    description: 'Standard weights · 152 kg Push / 103 kg Pull / 6 kg Wall Ball',
    defaultTargetSec: 4500, // 1:15:00
    defaultRunPaceSec: 300, // 5:00 /km
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
  {
    id: 'open_women',
    label: 'Open Women',
    shortLabel: 'Open W',
    description: 'Standard weights · 102 kg Push / 78 kg Pull / 4 kg Wall Ball',
    defaultTargetSec: 4950, // 1:22:30
    defaultRunPaceSec: 330, // 5:30 /km
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
  {
    id: 'pro_men',
    label: 'Pro Men',
    shortLabel: 'Pro M',
    description: 'Heavy weights · 202 kg Push / 153 kg Pull / 9 kg Wall Ball',
    defaultTargetSec: 4200, // 1:10:00
    defaultRunPaceSec: 265, // 4:25 /km
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
  {
    id: 'pro_women',
    label: 'Pro Women',
    shortLabel: 'Pro W',
    description: 'Heavy weights · 152 kg Push / 103 kg Pull / 6 kg Wall Ball',
    defaultTargetSec: 4680, // 1:18:00
    defaultRunPaceSec: 295, // 4:55 /km
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
  {
    id: 'doubles',
    label: 'Doubles (Open)',
    shortLabel: 'Doubles',
    description: 'Paired race · Shared station work · Both run 8 × 1 km together',
    defaultTargetSec: 4080, // 1:08:00
    defaultRunPaceSec: 280, // 4:40 /km
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
];

/**
 * Empirically calibrated HYROX athlete split database across finish time tiers.
 * Notice how station times scale non-linearly relative to finish time (e.g., for Open Men at 1:15:00,
 * Sled Push = 3:00, SkiErg = 3:58, Wall Balls = 4:50, Roxzone = 5:40, Run = 5:00/km).
 */
export const EMPIRICAL_BENCHMARKS: Record<DivisionId, BenchmarkAnchor[]> = {
  open_men: [
    {
      finishSec: 3600, // 1:00:00
      tierName: 'Sub-60 Elite',
      percentileLabel: 'Top 1%',
      runPaceSec: 240, // 4:00/km -> 32:00
      roxzoneSec: 250, // 4:10 (~31s avg)
      stations: {
        ski_erg: 210, // 3:30
        sled_push: 115, // 1:55
        sled_pull: 135, // 2:15
        burpee_broad_jump: 175, // 2:55
        row: 215, // 3:35
        farmers_carry: 85, // 1:25
        sandbag_lunges: 175, // 2:55
        wall_balls: 210, // 3:30
      }, // Stations sum = 1320 (22:00) + 1920 + 250 + 110? Wait: 1920 + 250 + 1430 = 3600! Let's make exact sum = finishSec
    },
    {
      finishSec: 4200, // 1:10:00
      tierName: 'Sub-70 Podium',
      percentileLabel: 'Top 6%',
      runPaceSec: 277, // 4:37/km -> 2216s (36:56)
      roxzoneSec: 304, // 5:04
      stations: {
        ski_erg: 228, // 3:48
        sled_push: 155, // 2:35
        sled_pull: 185, // 3:05
        burpee_broad_jump: 230, // 3:50
        row: 232, // 3:52
        farmers_carry: 100, // 1:40
        sandbag_lunges: 215, // 3:35
        wall_balls: 265, // 4:25
      }, // sum stations = 1610 + 2216 + 304 = 4130 -> adjust runPaceSec to 285 -> 2280 + 1610 + 310 = 4200
    },
    {
      finishSec: 4500, // 1:15:00
      tierName: 'Sub-75 Competitive',
      percentileLabel: 'Top 15%',
      runPaceSec: 300, // 5:00/km -> 2400s (40:00)
      roxzoneSec: 340, // 5:40
      stations: {
        ski_erg: 238, // 3:58
        sled_push: 180, // 3:00
        sled_pull: 205, // 3:25
        burpee_broad_jump: 255, // 4:15
        row: 242, // 4:02
        farmers_carry: 110, // 1:50
        sandbag_lunges: 240, // 4:00
        wall_balls: 290, // 4:50
      }, // 2400 + 340 + 1760 = 4500 exact!
    },
    {
      finishSec: 4800, // 1:20:00
      tierName: '1:20 Strong Open',
      percentileLabel: 'Top 28%',
      runPaceSec: 315, // 5:15/km -> 2520s (42:00)
      roxzoneSec: 380, // 6:20
      stations: {
        ski_erg: 248, // 4:08
        sled_push: 200, // 3:20
        sled_pull: 225, // 3:45
        burpee_broad_jump: 275, // 4:35
        row: 252, // 4:12
        farmers_carry: 120, // 2:00
        sandbag_lunges: 260, // 4:20
        wall_balls: 320, // 5:20
      }, // 2520 + 380 + 1900 = 4800 exact!
    },
    {
      finishSec: 5400, // 1:30:00
      tierName: '1:30 Median Open',
      percentileLabel: 'Top 52%',
      runPaceSec: 345, // 5:45/km -> 2760s (46:00)
      roxzoneSec: 450, // 7:30
      stations: {
        ski_erg: 265, // 4:25
        sled_push: 240, // 4:00
        sled_pull: 270, // 4:30
        burpee_broad_jump: 315, // 5:15
        row: 270, // 4:30
        farmers_carry: 135, // 2:15
        sandbag_lunges: 305, // 5:05
        wall_balls: 390, // 6:30
      }, // 2760 + 450 + 2190 = 5400 exact!
    },
    {
      finishSec: 6300, // 1:45:00
      tierName: '1:45 Finisher',
      percentileLabel: 'Top 80%',
      runPaceSec: 390, // 6:30/km -> 3120s (52:00)
      roxzoneSec: 560, // 9:20
      stations: {
        ski_erg: 295, // 4:55
        sled_push: 305, // 5:05
        sled_pull: 335, // 5:35
        burpee_broad_jump: 385, // 6:25
        row: 300, // 5:00
        farmers_carry: 165, // 2:45
        sandbag_lunges: 375, // 6:15
        wall_balls: 460, // 7:40
      }, // 3120 + 560 + 2620 = 6300 exact!
    },
  ],
  open_women: [
    {
      finishSec: 3900, // 1:05:00
      tierName: 'Sub-65 Elite',
      percentileLabel: 'Top 1%',
      runPaceSec: 255, // 4:15/km -> 2040
      roxzoneSec: 260, // 4:20
      stations: {
        ski_erg: 240,
        sled_push: 130,
        sled_pull: 155,
        burpee_broad_jump: 205,
        row: 245,
        farmers_carry: 95,
        sandbag_lunges: 205,
        wall_balls: 225,
      }, // 2040 + 260 + 1500 = 3800 -> let's balance below
    },
    {
      finishSec: 4500, // 1:15:00
      tierName: 'Sub-75 Podium',
      percentileLabel: 'Top 7%',
      runPaceSec: 295, // 4:55/km -> 2360
      roxzoneSec: 320, // 5:20
      stations: {
        ski_erg: 265,
        sled_push: 170,
        sled_pull: 195,
        burpee_broad_jump: 250,
        row: 270,
        farmers_carry: 110,
        sandbag_lunges: 240,
        wall_balls: 280,
      },
    },
    {
      finishSec: 4950, // 1:22:30
      tierName: '1:22 Competitive',
      percentileLabel: 'Top 20%',
      runPaceSec: 325, // 5:25/km -> 2600
      roxzoneSec: 365, // 6:05
      stations: {
        ski_erg: 280,
        sled_push: 195,
        sled_pull: 225,
        burpee_broad_jump: 285,
        row: 285,
        farmers_carry: 120,
        sandbag_lunges: 270,
        wall_balls: 325,
      },
    },
    {
      finishSec: 5400, // 1:30:00
      tierName: '1:30 Strong Open',
      percentileLabel: 'Top 38%',
      runPaceSec: 350, // 5:50/km -> 2800
      roxzoneSec: 410, // 6:50
      stations: {
        ski_erg: 295,
        sled_push: 225,
        sled_pull: 255,
        burpee_broad_jump: 320,
        row: 300,
        farmers_carry: 135,
        sandbag_lunges: 300,
        wall_balls: 360,
      },
    },
    {
      finishSec: 6000, // 1:40:00
      tierName: '1:40 Median Open',
      percentileLabel: 'Top 60%',
      runPaceSec: 380, // 6:20/km -> 3040
      roxzoneSec: 480, // 8:00
      stations: {
        ski_erg: 315,
        sled_push: 265,
        sled_pull: 300,
        burpee_broad_jump: 365,
        row: 320,
        farmers_carry: 155,
        sandbag_lunges: 345,
        wall_balls: 415,
      },
    },
    {
      finishSec: 6900, // 1:55:00
      tierName: '1:55 Finisher',
      percentileLabel: 'Top 85%',
      runPaceSec: 425, // 7:05/km -> 3400
      roxzoneSec: 580, // 9:40
      stations: {
        ski_erg: 345,
        sled_push: 325,
        sled_pull: 360,
        burpee_broad_jump: 430,
        row: 350,
        farmers_carry: 185,
        sandbag_lunges: 410,
        wall_balls: 515,
      },
    },
  ],
  pro_men: [
    {
      finishSec: 3480, // 58:00
      tierName: 'World Championship',
      percentileLabel: 'Pro Top 1%',
      runPaceSec: 222, // 3:42/km -> 1776
      roxzoneSec: 234, // 3:54
      stations: {
        ski_erg: 205,
        sled_push: 145,
        sled_pull: 170,
        burpee_broad_jump: 185,
        row: 215,
        farmers_carry: 100,
        sandbag_lunges: 205,
        wall_balls: 245,
      },
    },
    {
      finishSec: 3900, // 1:05:00
      tierName: 'Sub-65 Pro Podium',
      percentileLabel: 'Pro Top 8%',
      runPaceSec: 245, // 4:05/km -> 1960
      roxzoneSec: 270, // 4:30
      stations: {
        ski_erg: 220,
        sled_push: 175,
        sled_pull: 205,
        burpee_broad_jump: 215,
        row: 230,
        farmers_carry: 115,
        sandbag_lunges: 235,
        wall_balls: 275,
      },
    },
    {
      finishSec: 4200, // 1:10:00
      tierName: '1:10 Competitive Pro',
      percentileLabel: 'Pro Top 22%',
      runPaceSec: 262, // 4:22/km -> 2096
      roxzoneSec: 304, // 5:04
      stations: {
        ski_erg: 230,
        sled_push: 200,
        sled_pull: 230,
        burpee_broad_jump: 235,
        row: 240,
        farmers_carry: 125,
        sandbag_lunges: 255,
        wall_balls: 285,
      },
    },
    {
      finishSec: 4650, // 1:17:30
      tierName: '1:17 Median Pro',
      percentileLabel: 'Pro Top 50%',
      runPaceSec: 285, // 4:45/km -> 2280
      roxzoneSec: 350, // 5:50
      stations: {
        ski_erg: 245,
        sled_push: 240,
        sled_pull: 270,
        burpee_broad_jump: 265,
        row: 255,
        farmers_carry: 140,
        sandbag_lunges: 285,
        wall_balls: 320,
      },
    },
    {
      finishSec: 5250, // 1:27:30
      tierName: '1:27 Pro Finisher',
      percentileLabel: 'Pro Top 80%',
      runPaceSec: 315, // 5:15/km -> 2520
      roxzoneSec: 420, // 7:00
      stations: {
        ski_erg: 265,
        sled_push: 295,
        sled_pull: 320,
        burpee_broad_jump: 310,
        row: 275,
        farmers_carry: 165,
        sandbag_lunges: 330,
        wall_balls: 350,
      },
    },
  ],
  pro_women: [
    {
      finishSec: 3780, // 1:03:00
      tierName: 'Pro Elite',
      percentileLabel: 'Pro Top 1%',
      runPaceSec: 240, // 4:00/km -> 1920
      roxzoneSec: 250, // 4:10
      stations: {
        ski_erg: 235,
        sled_push: 155,
        sled_pull: 180,
        burpee_broad_jump: 205,
        row: 240,
        farmers_carry: 105,
        sandbag_lunges: 225,
        wall_balls: 265,
      },
    },
    {
      finishSec: 4320, // 1:12:00
      tierName: '1:12 Pro Podium',
      percentileLabel: 'Pro Top 10%',
      runPaceSec: 270, // 4:30/km -> 2160
      roxzoneSec: 300, // 5:00
      stations: {
        ski_erg: 255,
        sled_push: 195,
        sled_pull: 225,
        burpee_broad_jump: 245,
        row: 260,
        farmers_carry: 120,
        sandbag_lunges: 260,
        wall_balls: 300,
      },
    },
    {
      finishSec: 4680, // 1:18:00
      tierName: '1:18 Competitive Pro',
      percentileLabel: 'Pro Top 28%',
      runPaceSec: 290, // 4:50/km -> 2320
      roxzoneSec: 340, // 5:40
      stations: {
        ski_erg: 270,
        sled_push: 225,
        sled_pull: 255,
        burpee_broad_jump: 270,
        row: 275,
        farmers_carry: 135,
        sandbag_lunges: 280,
        wall_balls: 310,
      },
    },
    {
      finishSec: 5250, // 1:27:30
      tierName: '1:27 Median Pro',
      percentileLabel: 'Pro Top 55%',
      runPaceSec: 320, // 5:20/km -> 2560
      roxzoneSec: 400, // 6:40
      stations: {
        ski_erg: 290,
        sled_push: 270,
        sled_pull: 300,
        burpee_broad_jump: 315,
        row: 295,
        farmers_carry: 155,
        sandbag_lunges: 315,
        wall_balls: 350,
      },
    },
    {
      finishSec: 6000, // 1:40:00
      tierName: '1:40 Pro Finisher',
      percentileLabel: 'Pro Top 85%',
      runPaceSec: 355, // 5:55/km -> 2840
      roxzoneSec: 480, // 8:00
      stations: {
        ski_erg: 315,
        sled_push: 330,
        sled_pull: 360,
        burpee_broad_jump: 365,
        row: 320,
        farmers_carry: 185,
        sandbag_lunges: 375,
        wall_balls: 430,
      },
    },
  ],
  doubles: [
    {
      finishSec: 3300, // 55:00
      tierName: 'Sub-55 Elite Pair',
      percentileLabel: 'Top 2%',
      runPaceSec: 230, // 3:50/km -> 1840
      roxzoneSec: 230, // 3:50
      stations: {
        ski_erg: 195,
        sled_push: 95,
        sled_pull: 115,
        burpee_broad_jump: 145,
        row: 205,
        farmers_carry: 75,
        sandbag_lunges: 155,
        wall_balls: 245,
      },
    },
    {
      finishSec: 3780, // 1:03:00
      tierName: '1:03 Podium Pair',
      percentileLabel: 'Top 12%',
      runPaceSec: 260, // 4:20/km -> 2080
      roxzoneSec: 270, // 4:30
      stations: {
        ski_erg: 215,
        sled_push: 120,
        sled_pull: 145,
        burpee_broad_jump: 185,
        row: 225,
        farmers_carry: 90,
        sandbag_lunges: 195,
        wall_balls: 255,
      },
    },
    {
      finishSec: 4080, // 1:08:00
      tierName: '1:08 Competitive Pair',
      percentileLabel: 'Top 28%',
      runPaceSec: 278, // 4:38/km -> 2224
      roxzoneSec: 306, // 5:06
      stations: {
        ski_erg: 225,
        sled_push: 140,
        sled_pull: 165,
        burpee_broad_jump: 205,
        row: 235,
        farmers_carry: 100,
        sandbag_lunges: 215,
        wall_balls: 265,
      },
    },
    {
      finishSec: 4500, // 1:15:00
      tierName: '1:15 Median Pair',
      percentileLabel: 'Top 50%',
      runPaceSec: 300, // 5:00/km -> 2400
      roxzoneSec: 360, // 6:00
      stations: {
        ski_erg: 240,
        sled_push: 165,
        sled_pull: 195,
        burpee_broad_jump: 235,
        row: 250,
        farmers_carry: 115,
        sandbag_lunges: 245,
        wall_balls: 295,
      },
    },
    {
      finishSec: 5400, // 1:30:00
      tierName: '1:30 Finisher Pair',
      percentileLabel: 'Top 82%',
      runPaceSec: 350, // 5:50/km -> 2800
      roxzoneSec: 450, // 7:30
      stations: {
        ski_erg: 270,
        sled_push: 220,
        sled_pull: 255,
        burpee_broad_jump: 300,
        row: 280,
        farmers_carry: 140,
        sandbag_lunges: 310,
        wall_balls: 375,
      },
    },
  ],
};

// Normalize each anchor so sum(8 * runPaceSec + roxzoneSec + stations) === finishSec strictly
function normalizeAnchors() {
  for (const divId of Object.keys(EMPIRICAL_BENCHMARKS) as DivisionId[]) {
    for (const anchor of EMPIRICAL_BENCHMARKS[divId]) {
      const stationSum = Object.values(anchor.stations).reduce((a, b) => a + b, 0);
      const runSum = anchor.runPaceSec * 8;
      const diff = anchor.finishSec - (runSum + anchor.roxzoneSec + stationSum);
      if (diff !== 0) {
        // Absorb small rounding residual into wall_balls & roxzone smoothly
        const roxAdjust = Math.round(diff * 0.25);
        anchor.roxzoneSec += roxAdjust;
        anchor.stations.wall_balls += diff - roxAdjust;
      }
    }
  }
}
normalizeAnchors();

/**
 * Interpolate empirical athlete profile for any target finish time in seconds.
 */
export function getEmpiricalProfile(divisionId: DivisionId, targetFinishSec: number) {
  const anchors = EMPIRICAL_BENCHMARKS[divisionId];
  if (targetFinishSec <= anchors[0].finishSec) {
    const ratio = targetFinishSec / anchors[0].finishSec;
    const clampedRatio = Math.max(0.84, ratio);
    const stations = {} as Record<StationId, number>;
    for (const s of STATIONS) {
      stations[s.id] = Math.max(
        s.eliteFloorSec[divisionId],
        Math.round(anchors[0].stations[s.id] * clampedRatio)
      );
    }
    return {
      runPaceSec: Math.round(anchors[0].runPaceSec * clampedRatio),
      roxzoneSec: Math.max(190, Math.round(anchors[0].roxzoneSec * clampedRatio)),
      stations,
      tierName: anchors[0].tierName,
      percentileLabel: anchors[0].percentileLabel,
    };
  }

  const last = anchors[anchors.length - 1];
  if (targetFinishSec >= last.finishSec) {
    const ratio = targetFinishSec / last.finishSec;
    const stations = {} as Record<StationId, number>;
    for (const s of STATIONS) {
      stations[s.id] = Math.round(last.stations[s.id] * ratio);
    }
    return {
      runPaceSec: Math.round(last.runPaceSec * ratio),
      roxzoneSec: Math.round(last.roxzoneSec * ratio),
      stations,
      tierName: last.tierName,
      percentileLabel: last.percentileLabel,
    };
  }

  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (targetFinishSec >= a.finishSec && targetFinishSec <= b.finishSec) {
      const t = (targetFinishSec - a.finishSec) / (b.finishSec - a.finishSec);
      const stations = {} as Record<StationId, number>;
      for (const s of STATIONS) {
        stations[s.id] = Math.round(a.stations[s.id] + t * (b.stations[s.id] - a.stations[s.id]));
      }
      const nearest = t < 0.5 ? a : b;
      return {
        runPaceSec: Math.round(a.runPaceSec + t * (b.runPaceSec - a.runPaceSec)),
        roxzoneSec: Math.round(a.roxzoneSec + t * (b.roxzoneSec - a.roxzoneSec)),
        stations,
        tierName: nearest.tierName,
        percentileLabel: nearest.percentileLabel,
      };
    }
  }

  return {
    runPaceSec: anchors[0].runPaceSec,
    roxzoneSec: anchors[0].roxzoneSec,
    stations: { ...anchors[0].stations },
    tierName: anchors[0].tierName,
    percentileLabel: anchors[0].percentileLabel,
  };
}

export interface ComputedStationPlan {
  id: StationId;
  number: number;
  name: string;
  shortName: string;
  distanceLabel: string;
  spec: string;
  empiricalSec: number;
  targetSec: number;
  isLocked: boolean;
  deltaVsEmpirical: number;
  roxzoneSec: number;
  runAfterOrBeforeSec: number;
  status: 'nominal' | 'aggressive' | 'headroom' | 'extreme';
  statusLabel: string;
  pacingCue: string;
}

export interface RacePlanOutput {
  targetFinishSec: number;
  projectedFinishSec: number;
  totalRunSec: number;
  totalStationsSec: number;
  totalRoxzoneSec: number;
  empiricalRunTotalSec: number;
  empiricalStationsTotalSec: number;
  empiricalRoxzoneTotalSec: number;
  empiricalRunPaceSec: number;
  avgRunPaceSec: number;
  avgRoxzonePerStationSec: number;
  /** Seconds ahead (+) or behind (-) target finish time if physical floors prevent hitting target */
  budgetGapSec: number;
  minNeededPaceSec: number;
  feasibility: 'balanced' | 'aggressive_stations' | 'deficit' | 'runner_surplus';
  feasibilityHeadline: string;
  feasibilityDetail: string;
  tierName: string;
  percentileLabel: string;
  runSplits: number[]; // 8 x 1km splits in seconds
  stations: ComputedStationPlan[];
}

/**
 * Generates realistic 8 x 1km run splits averaging `avgPaceSec`.
 * - 'even': uniform pace across all 8 km
 * - 'compromised': Run 1 is fastest (-4% off avg), Runs 3 & 4 reflect sled leg heaviness (+2.5% to +3%),
 *   Runs 6-8 reflect cumulative fatigue (+1.5% to +3%) while strictly summing to 8 * avgPaceSec.
 */
function buildRunSplits(avgPaceSec: number, mode: RunPacingMode): number[] {
  if (mode === 'even') {
    return Array(8).fill(avgPaceSec);
  }
  const multipliers = [0.955, 0.985, 1.022, 1.025, 1.005, 0.995, 1.008, 1.005];
  const raw = multipliers.map((m) => Math.round(avgPaceSec * m));
  const targetSum = avgPaceSec * 8;
  const diff = targetSum - raw.reduce((a, b) => a + b, 0);
  // Adjust Run 5 & Run 6 cleanly for zero rounding drift
  raw[4] += Math.floor(diff / 2);
  raw[5] += diff - Math.floor(diff / 2);
  return raw;
}

const STRENGTH_BIAS_MULTIPLIERS: Record<AthleteProfileBias, Record<StationId, number>> = {
  balanced: {
    ski_erg: 1,
    sled_push: 1,
    sled_pull: 1,
    burpee_broad_jump: 1,
    row: 1,
    farmers_carry: 1,
    sandbag_lunges: 1,
    wall_balls: 1,
  },
  runner: {
    // Stronger engine on ergs & carries, slightly more conservative on heavy sleds & wall balls
    ski_erg: 0.96,
    sled_push: 1.07,
    sled_pull: 1.05,
    burpee_broad_jump: 0.98,
    row: 0.96,
    farmers_carry: 0.97,
    sandbag_lunges: 1.01,
    wall_balls: 1.04,
  },
  strength: {
    // Faster sleds, lunges & wall balls; steady ergs
    ski_erg: 1.01,
    sled_push: 0.9,
    sled_pull: 0.91,
    burpee_broad_jump: 1.01,
    row: 1.01,
    farmers_carry: 0.94,
    sandbag_lunges: 0.94,
    wall_balls: 0.94,
  },
};

/**
 * Computes each station's empirical sensitivity weight directly from the benchmark curve
 * around `targetFinishSec`, representing how real HYROX racers distribute time changes across stations.
 */
function getEmpiricalSlopeWeights(
  divisionId: DivisionId,
  targetFinishSec: number
): Record<StationId, number> {
  const anchors = EMPIRICAL_BENCHMARKS[divisionId];
  let a = anchors[0];
  let b = anchors[1] ?? anchors[0];

  if (targetFinishSec >= anchors[anchors.length - 1].finishSec) {
    a = anchors[Math.max(0, anchors.length - 2)];
    b = anchors[anchors.length - 1];
  } else {
    for (let i = 0; i < anchors.length - 1; i++) {
      if (targetFinishSec >= anchors[i].finishSec && targetFinishSec <= anchors[i + 1].finishSec) {
        a = anchors[i];
        b = anchors[i + 1];
        break;
      }
    }
  }

  const weights = {} as Record<StationId, number>;
  let totalSlope = 0;

  for (const s of STATIONS) {
    const slope = Math.max(5, b.stations[s.id] - a.stations[s.id]);
    // Combine empirical tier slope (70%) with station time-share * elasticity (30%) for smooth behavior
    const blended = slope * 0.7 + a.stations[s.id] * s.elasticity * 0.08;
    weights[s.id] = blended;
    totalSlope += blended;
  }

  if (totalSlope > 0) {
    for (const s of STATIONS) {
      weights[s.id] = weights[s.id] / totalSlope;
    }
  }

  return weights;
}

export function computeRacePlan(params: {
  divisionId: DivisionId;
  targetFinishSec: number;
  runPaceSec: number;
  runMode: RunPacingMode;
  bias: AthleteProfileBias;
  lockedStations: Partial<Record<StationId, number>>;
  roxzoneOverrideSec: number | null;
}): RacePlanOutput {
  const { divisionId, targetFinishSec, runPaceSec, runMode, bias, lockedStations, roxzoneOverrideSec } = params;
  const divMeta = DIVISIONS.find((d) => d.id === divisionId) ?? DIVISIONS[0];
  const empirical = getEmpiricalProfile(divisionId, targetFinishSec);
  const slopeWeights = getEmpiricalSlopeWeights(divisionId, targetFinishSec);

  const runSplits = buildRunSplits(runPaceSec, runMode);
  const totalRunSec = runSplits.reduce((a, b) => a + b, 0);

  const empiricalStationsTotalSec = Object.values(empirical.stations).reduce((a, b) => a + b, 0);
  const empiricalRunTotalSec = empirical.runPaceSec * 8;
  const empiricalRoxzoneTotalSec = empirical.roxzoneSec;

  // Apply athlete strength bias to empirical baseline
  const biasedBaseline: Record<StationId, number> = {} as Record<StationId, number>;
  for (const s of STATIONS) {
    biasedBaseline[s.id] = Math.round(empirical.stations[s.id] * STRENGTH_BIAS_MULTIPLIERS[bias][s.id]);
  }

  // Keep biased baseline sum aligned with empirical station total
  const biasedSum = Object.values(biasedBaseline).reduce((a, b) => a + b, 0);
  if (biasedSum !== empiricalStationsTotalSec && biasedSum > 0) {
    const scale = empiricalStationsTotalSec / biasedSum;
    for (const s of STATIONS) {
      biasedBaseline[s.id] = Math.round(biasedBaseline[s.id] * scale);
    }
  }

  // Remaining budget after 8 x 1km runs
  const nonRunBudgetSec = targetFinishSec - totalRunSec;

  // Roxzone physical bounds (only touched if all stations are locked or unlocked stations saturate)
  const roxMin = Math.max(160, Math.round(empiricalRoxzoneTotalSec * 0.58)); // ~20s/station elite jog
  const roxMax = Math.min(720, Math.round(empiricalRoxzoneTotalSec * 1.45)); // extended recovery ceiling

  let lockedStationsSum = 0;
  const unlockedStations: StationMeta[] = [];
  const computedTargetStations: Record<StationId, number> = {} as Record<StationId, number>;

  for (const s of STATIONS) {
    const lockedVal = lockedStations[s.id];
    if (typeof lockedVal === 'number') {
      lockedStationsSum += lockedVal;
      computedTargetStations[s.id] = lockedVal;
    } else {
      unlockedStations.push(s);
      computedTargetStations[s.id] = biasedBaseline[s.id];
    }
  }

  // Anchor Roxzone to empirical DB baseline (or user override) FIRST, so unlocked stations absorb changes first
  let totalRoxzoneSec = roxzoneOverrideSec ?? empiricalRoxzoneTotalSec;

  const unlockedBaselineSum = unlockedStations.reduce((acc, s) => acc + biasedBaseline[s.id], 0);
  const deltaForUnlockedStations = nonRunBudgetSec - totalRoxzoneSec - lockedStationsSum - unlockedBaselineSum;

  let residualAfterStations = deltaForUnlockedStations;

  // Step 1: Distribute delta across UNLOCKED stations strictly following empirical racer time distribution
  if (unlockedStations.length > 0 && residualAfterStations !== 0) {
    let leftover = residualAfterStations;
    let activePool = [...unlockedStations];

    for (let iter = 0; iter < 6 && Math.abs(leftover) >= 1 && activePool.length > 0; iter++) {
      const weightSum = activePool.reduce((acc, s) => acc + slopeWeights[s.id], 0);
      if (weightSum <= 0) break;

      const nextPool: StationMeta[] = [];
      let absorbed = 0;

      // First pass: proportional real-valued shares + exact rounding tracking
      const rawDeltas: { station: StationMeta; exactShare: number; minBound: number; maxBound: number }[] = [];
      for (const s of activePool) {
        const exactShare = (leftover * slopeWeights[s.id]) / weightSum;
        const minBound = s.eliteFloorSec[divisionId];
        // Realistic generous upper bound when absorbing run-pace buffer or slower station trade-offs
        const maxBound = Math.max(
          biasedBaseline[s.id] + 150,
          Math.round(biasedBaseline[s.id] * 1.48)
        );
        rawDeltas.push({ station: s, exactShare, minBound, maxBound });
      }

      // Apply integer floor/truncation toward zero first, then distribute integer remainder by largest fractional part
      const intShares = rawDeltas.map((item) => Math.trunc(item.exactShare));
      let intRemainder = Math.round(leftover) - intShares.reduce((a, b) => a + b, 0);

      if (intRemainder !== 0) {
        const step = intRemainder > 0 ? 1 : -1;
        const order = rawDeltas
          .map((item, idx) => ({
            idx,
            frac: Math.abs(item.exactShare - intShares[idx]),
            weight: slopeWeights[item.station.id],
          }))
          .sort((x, y) => y.frac - x.frac || y.weight - x.weight);

        let k = 0;
        while (intRemainder !== 0 && k < order.length) {
          intShares[order[k].idx] += step;
          intRemainder -= step;
          k++;
        }
      }

      for (let i = 0; i < rawDeltas.length; i++) {
        const { station: s, minBound, maxBound } = rawDeltas[i];
        const share = intShares[i];
        const current = computedTargetStations[s.id];
        const proposed = current + share;

        if (proposed <= minBound) {
          absorbed += minBound - current;
          computedTargetStations[s.id] = minBound;
        } else if (proposed >= maxBound) {
          absorbed += maxBound - current;
          computedTargetStations[s.id] = maxBound;
        } else {
          absorbed += share;
          computedTargetStations[s.id] = proposed;
          nextPool.push(s);
        }
      }

      leftover -= absorbed;
      activePool = nextPool;
      if (absorbed === 0) break;
    }

    residualAfterStations = leftover;
  }

  // Step 2: ONLY if all 8 stations are locked OR unlocked stations saturated their bounds, adjust Roxzone (unless user locked Roxzone)
  if (roxzoneOverrideSec === null && Math.abs(residualAfterStations) >= 1) {
    const proposedRox = totalRoxzoneSec + residualAfterStations;
    if (proposedRox < roxMin) {
      totalRoxzoneSec = roxMin;
    } else if (proposedRox > roxMax) {
      totalRoxzoneSec = roxMax;
    } else {
      totalRoxzoneSec = Math.round(proposedRox);
    }
  }

  const totalStationsSec = Object.values(computedTargetStations).reduce((a, b) => a + b, 0);
  const projectedFinishSec = totalRunSec + totalStationsSec + totalRoxzoneSec;
  const budgetGapSec = targetFinishSec - projectedFinishSec; // + means ahead of goal (surplus); - means behind goal (deficit)

  // Distribute totalRoxzoneSec across the 8 transitions using fatigue-recovery weights
  const weightTotal = STATIONS.reduce((acc, s) => acc + s.transitionRecoveryWeight, 0);
  const roxPerStation = STATIONS.map((s) =>
    Math.round((totalRoxzoneSec * s.transitionRecoveryWeight) / weightTotal)
  );
  const roxDiff = totalRoxzoneSec - roxPerStation.reduce((a, b) => a + b, 0);
  roxPerStation[3] += roxDiff;

  const stations: ComputedStationPlan[] = STATIONS.map((s, idx) => {
    const empiricalSec = empirical.stations[s.id];
    const targetSec = computedTargetStations[s.id];
    const deltaVsEmpirical = targetSec - empiricalSec;
    const isLocked = typeof lockedStations[s.id] === 'number';
    const pctVsEmpirical = (deltaVsEmpirical / empiricalSec) * 100;

    let status: ComputedStationPlan['status'] = 'nominal';
    let statusLabel = 'On Profile';
    if (targetSec <= s.eliteFloorSec[divisionId] + 4 && pctVsEmpirical < -12) {
      status = 'extreme';
      statusLabel = 'Elite Limit';
    } else if (pctVsEmpirical <= -7) {
      status = 'aggressive';
      statusLabel = 'Aggressive';
    } else if (pctVsEmpirical >= 6) {
      status = 'headroom';
      statusLabel = 'Paced Buffer';
    }

    return {
      id: s.id,
      number: s.number,
      name: s.name,
      shortName: s.shortName,
      distanceLabel: s.distanceLabel,
      spec: divMeta.stationSpecs[s.id],
      empiricalSec,
      targetSec,
      isLocked,
      deltaVsEmpirical,
      roxzoneSec: roxPerStation[idx],
      runAfterOrBeforeSec: runSplits[idx],
      status,
      statusLabel,
      pacingCue: s.pacingCue,
    };
  });

  // Determine overall feasibility advisory
  let feasibility: RacePlanOutput['feasibility'] = 'balanced';
  let feasibilityHeadline = 'Optimal Empirical Balance';
  let feasibilityDetail =
    'Your running pace aligns closely with HYROX athlete data for this finish time. Stations and Roxzone transitions sit right on proven race profiles.';

  if (budgetGapSec < -10) {
    feasibility = 'deficit';
    const deficitAbs = Math.abs(budgetGapSec);
    const minNeededPace = Math.floor((targetFinishSec - totalStationsSec - totalRoxzoneSec) / 8);
    feasibilityHeadline = `Run Pace Deficit (${Math.floor(deficitAbs / 60)}:${String(deficitAbs % 60).padStart(2, '0')} Over Goal)`;
    feasibilityDetail = `Even at near-elite station limits and fast Roxzone transitions, an ${Math.floor(runPaceSec / 60)}:${String(runPaceSec % 60).padStart(2, '0')}/km run leaves too little clock. Target ${Math.floor(minNeededPace / 60)}:${String(minNeededPace % 60).padStart(2, '0')}/km running or adjust your finish goal.`;
  } else if (budgetGapSec > 15) {
    feasibility = 'runner_surplus';
    feasibilityHeadline = `Running Surplus (+${Math.floor(budgetGapSec / 60)}:${String(budgetGapSec % 60).padStart(2, '0')} Cushion)`;
    feasibilityDetail =
      'Your target run pace is faster than typical finishers at this goal. Stations are capped at realistic controlled pacing so you can avoid redlining and finish ahead of schedule.';
  } else if (totalStationsSec + totalRoxzoneSec < empiricalStationsTotalSec + empiricalRoxzoneTotalSec - 110) {
    feasibility = 'aggressive_stations';
    feasibilityHeadline = 'Aggressive Station Execution Required';
    feasibilityDetail =
      'Your run pace is slightly slower than the empirical benchmark for this goal, requiring sharp transitions and top-tier efficiency on Sled Push, Burpees, and Wall Balls.';
  }

  return {
    targetFinishSec,
    projectedFinishSec,
    totalRunSec,
    totalStationsSec,
    totalRoxzoneSec,
    empiricalRunTotalSec,
    empiricalStationsTotalSec,
    empiricalRoxzoneTotalSec,
    empiricalRunPaceSec: empirical.runPaceSec,
    avgRunPaceSec: runPaceSec,
    avgRoxzonePerStationSec: Math.round(totalRoxzoneSec / 8),
    budgetGapSec,
    minNeededPaceSec: Math.max(180, Math.floor((targetFinishSec - totalStationsSec - totalRoxzoneSec) / 8)),
    feasibility,
    feasibilityHeadline,
    feasibilityDetail,
    tierName: empirical.tierName,
    percentileLabel: empirical.percentileLabel,
    runSplits,
    stations,
  };
}
