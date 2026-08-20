/**
 * Groupable notification → screen overlays.
 * Applied only when the deep link includes ?notice=<id>.
 * Default Inbox / Stats / To-Do (no notice param) stay unchanged.
 */

import { feedback } from "../../../dummyData.js";

function byId(id) {
  return feedback.find((item) => item.id === id);
}

function pick(ids, extra = {}) {
  return ids.map((id) => {
    const item = byId(id);
    return item ? { ...item, ...extra } : null;
  }).filter(Boolean);
}

function cerMetric({
  title = "Group CER",
  value,
  kind,
  rank,
  total = "18",
  rankKind,
  company = "4.29",
  line,
  yTicks
}) {
  return {
    title,
    badge: { value, star: true, kind },
    rank: { rank: String(rank), total: String(total), kind: rankKind },
    companyLabel: "Company CER",
    company: { value: company, star: true, kind: "good" },
    legend: "CER",
    yTicks,
    line,
    fmt: (v) => v.toFixed(1)
  };
}

const FALLING_CER = [4.29, 4.28, 4.27, 4.26, 4.25, 4.24, 4.22, 4.21, 4.20, 4.18, 4.17, 4.16, 4.15, 4.14];
const RISING_MOVER = [4.10, 4.12, 4.14, 4.16, 4.18, 4.22, 4.26, 4.30, 4.34, 4.38, 4.42, 4.46, 4.49, 4.51];
const RECORD_CER = [4.52, 4.54, 4.56, 4.58, 4.60, 4.62, 4.64, 4.66, 4.67, 4.68, 4.69, 4.70, 4.71, 4.72];
const MONTHLY_CER = [4.75, 4.75, 4.76, 4.76, 4.77, 4.77, 4.78, 4.78, 4.79, 4.79, 4.80, 4.80, 4.81, 4.81];
const WEEKLY_CER = [4.20, 4.22, 4.24, 4.26, 4.28, 4.32, 4.35, 4.38, 4.40, 4.42, 4.45, 4.47, 4.49, 4.50];
const HIGH_STABLE = [4.48, 4.49, 4.50, 4.50, 4.51, 4.52, 4.52, 4.53, 4.54, 4.54, 4.55, 4.55, 4.56, 4.56];
const RANKING_CER = [4.38, 4.40, 4.42, 4.44, 4.46, 4.48, 4.50, 4.52, 4.54, 4.55, 4.56, 4.57, 4.58, 4.59];

const UNREAD_PILE_IDS = [
  "fb_058", "fb_064", "fb_068", "fb_062", "fb_096",
  "fb_044", "fb_048", "fb_041", "fb_031", "fb_034",
  "fb_055", "fb_071"
];

const noticeScenarios = {
  "g-unread-piling-up": {
    inbox: {
      tab: "surveys",
      newCount: 23,
      allUnread: true,
      items: pick(UNREAD_PILE_IDS, { locationId: "loc_005", responded: false })
    }
  },
  "g-reply-rate": {
    inbox: {
      tab: "surveys",
      subtitle: "82% reply rate this month",
      allUnread: false,
      items: [
        ...pick(["fb_058", "fb_096"], { locationId: "loc_005", responded: false }),
        ...pick(
          ["fb_017", "fb_025", "fb_076", "fb_086", "fb_031", "fb_034", "fb_041", "fb_044", "fb_048", "fb_055"],
          { responded: true }
        )
      ]
    }
  },
  "g-login-reminder": {
    inbox: {
      tab: "surveys",
      newCount: 5,
      allUnread: true,
      items: pick(["fb_058", "fb_064", "fb_075", "fb_071", "fb_091"], { responded: false, flagged: true })
    }
  },
  "g-group-incident-spike": {
    stats: {
      surveySubtitle: "68 Surveys",
      cer: cerMetric({
        value: "4.08",
        kind: "mid",
        rank: 14,
        total: 18,
        rankKind: "bad",
        line: FALLING_CER,
        yTicks: [4.4, 4.3, 4.2, 4.1, 4.0]
      }),
      incidentRate: {
        value: "41",
        kind: "bad",
        rank: "16",
        total: "18",
        rankKind: "bad",
        company: "21",
        note: "Up 42% across Houston Metro vs last week."
      }
    }
  },
  "g-location-incident-spike": {
    stats: {
      surveySubtitle: "22 Surveys",
      cer: cerMetric({
        title: "Location CER",
        value: "3.92",
        kind: "warn",
        rank: 17,
        total: 18,
        rankKind: "bad",
        line: FALLING_CER.map((v) => v - 0.18),
        yTicks: [4.2, 4.0, 3.8, 3.6, 3.4]
      }),
      incidentRate: {
        value: "46",
        kind: "bad",
        rank: "18",
        total: "18",
        rankKind: "bad",
        company: "21",
        note: "Midtown incidents up 60% vs last week."
      }
    }
  },
  "g-cer-drop": {
    stats: {
      surveySubtitle: "84 Surveys",
      cer: cerMetric({
        value: "4.14",
        kind: "warn",
        rank: 15,
        total: 18,
        rankKind: "bad",
        line: FALLING_CER,
        yTicks: [4.4, 4.3, 4.2, 4.1, 4.0]
      }),
      incidentRate: {
        value: "34",
        kind: "mid",
        rank: "12",
        total: "18",
        rankKind: "bad",
        company: "21",
        note: "CER fell 0.15 pts this week; 3 locations dropped 0.3 pts."
      }
    }
  },
  "g-incident-rate-update": {
    stats: {
      surveySubtitle: "112 Surveys",
      cer: cerMetric({
        value: "4.21",
        kind: "mid",
        rank: 9,
        total: 18,
        rankKind: "mid",
        line: HIGH_STABLE.map((v) => v - 0.32),
        yTicks: [4.4, 4.2, 4.0, 3.8, 3.6]
      }),
      incidentRate: {
        value: "4.2",
        kind: "mid",
        rank: "11",
        total: "18",
        rankKind: "mid",
        company: "3.1",
        note: "+1.1% vs last month at the group level."
      }
    }
  },
  "g-group-ranking": {
    stats: {
      surveySubtitle: "96 Surveys",
      cer: cerMetric({
        value: "4.59",
        kind: "good",
        rank: 4,
        total: 18,
        rankKind: "good",
        line: RANKING_CER,
        yTicks: [4.7, 4.6, 4.5, 4.4, 4.3]
      }),
      incidentRate: {
        value: "18",
        kind: "good",
        rank: "5",
        total: "18",
        rankKind: "good",
        company: "21"
      }
    }
  },
  "g-google-score-record": {
    stats: {
      reviewSubtitle: "42 Reviews",
      reviewAverage: "4.8",
      reviewAverageKind: "score-good",
      competitorAverage: "4.2",
      competitorKind: "score-mid",
      reviewPlatforms: [
        { name: "Google", channel: "Google", count: "31", rating: "4.8", kind: "score-good" },
        { name: "Yelp", channel: "Yelp", count: "11", rating: "4.5", kind: "score-good" }
      ],
      responseRate: { value: "91", kind: "good", replies: "38 / 42" }
    }
  },
  "g-top-mover": {
    stats: {
      surveySubtitle: "19 Surveys",
      cer: cerMetric({
        title: "Location CER",
        value: "4.51",
        kind: "good",
        rank: 2,
        total: 18,
        rankKind: "good",
        line: RISING_MOVER,
        yTicks: [4.6, 4.4, 4.2, 4.0, 3.8]
      }),
      incidentRate: {
        value: "11",
        kind: "good",
        rank: "3",
        total: "18",
        rankKind: "good",
        company: "21",
        note: "Biggest CER gain in Houston Metro this week (+0.41)."
      }
    }
  },
  "g-recovery-revenue": {
    stats: {
      surveySubtitle: "91 Surveys",
      cer: cerMetric({
        value: "4.48",
        kind: "good",
        rank: 6,
        total: 18,
        rankKind: "mid",
        line: HIGH_STABLE,
        yTicks: [4.6, 4.5, 4.4, 4.3, 4.2]
      }),
      recoveryRate: { value: "62", kind: "good", rank: "3", total: "18", rankKind: "good" },
      recoveryRevenue: { value: "$5,000", kind: "good", note: "Milestone reached across Houston Metro." }
    }
  },
  "g-zero-incident-week": {
    stats: {
      surveySubtitle: "16 Surveys",
      cer: cerMetric({
        title: "Location CER",
        value: "4.56",
        kind: "good",
        rank: 1,
        total: 18,
        rankKind: "good",
        line: HIGH_STABLE,
        yTicks: [4.6, 4.5, 4.4, 4.3, 4.2]
      }),
      incidentRate: {
        value: "0",
        kind: "excellent",
        rank: "1",
        total: "18",
        rankKind: "good",
        company: "21",
        note: "Zero incidents this week at The Woodlands."
      }
    }
  },
  "g-morning-briefing": {
    stats: {
      surveySubtitle: "8 open incidents",
      cer: cerMetric({
        value: "4.18",
        kind: "mid",
        rank: 12,
        total: 18,
        rankKind: "bad",
        line: FALLING_CER,
        yTicks: [4.4, 4.3, 4.2, 4.1, 4.0]
      }),
      incidentRate: {
        value: "38",
        kind: "bad",
        rank: "14",
        total: "18",
        rankKind: "bad",
        company: "21",
        note: "8 open incidents across 8 Houston Metro locations."
      }
    }
  },
  "g-weekly-snapshot": {
    stats: {
      surveySubtitle: "124 guests recovered",
      cer: cerMetric({
        value: "4.50",
        kind: "good",
        rank: 5,
        total: 18,
        rankKind: "good",
        line: WEEKLY_CER,
        yTicks: [4.6, 4.4, 4.2, 4.0, 3.8]
      }),
      recoveryRate: { value: "54", kind: "good", rank: "4", total: "18", rankKind: "good" },
      recoveryRevenue: { value: "$1,860", kind: "good", note: "124 guests recovered this week (+0.3 CER)." }
    }
  },
  "g-monthly-cer": {
    stats: {
      surveySubtitle: "140 Surveys",
      cer: cerMetric({
        value: "4.81",
        kind: "excellent",
        rank: 3,
        total: 18,
        rankKind: "good",
        line: MONTHLY_CER,
        yTicks: [4.85, 4.80, 4.75, 4.70, 4.65]
      }),
      incidentRate: {
        value: "16",
        kind: "good",
        rank: "4",
        total: "18",
        rankKind: "good",
        company: "21",
        note: "+0.06 vs last month."
      }
    }
  },
  "g-group-cer-record": {
    stats: {
      surveySubtitle: "90 Surveys",
      cer: cerMetric({
        value: "4.72",
        kind: "excellent",
        rank: 2,
        total: 18,
        rankKind: "good",
        line: RECORD_CER,
        yTicks: [4.8, 4.7, 4.6, 4.5, 4.4]
      }),
      incidentRate: {
        value: "14",
        kind: "good",
        rank: "3",
        total: "18",
        rankKind: "good",
        company: "21",
        note: "Highest group CER in the last 90 days."
      }
    }
  },
  "g-objectives-set": {
    todo: {
      title: "June Objectives",
      subtitle: "New targets are live",
      groupsTab: "objectives",
      locationMeta: {
        loc_005: { start: 68, progress: 68, target: 87, status: "off-track" },
        loc_006: { start: 79, progress: 79, target: 90, status: "on-track" },
        loc_012: { start: 74, progress: 74, target: 87, status: "off-track" },
        loc_013: { start: 70, progress: 70, target: 87, status: "off-track" },
        loc_014: { start: 82, progress: 82, target: 90, status: "on-track" },
        loc_015: { start: 65, progress: 65, target: 87, status: "off-track" },
        loc_016: { start: 80, progress: 80, target: 87, status: "on-track" },
        loc_017: { start: 76, progress: 76, target: 87, status: "off-track" }
      }
    }
  },
  "g-objective-progress": {
    todo: {
      title: "June Objectives",
      subtitle: "5 hit goal · 2 on the way · 1 off track",
      groupsTab: "objectives",
      locationMeta: {
        loc_014: { start: 82, progress: 91, target: 87, status: "on-track" },
        loc_016: { start: 80, progress: 90, target: 87, status: "on-track" },
        loc_006: { start: 79, progress: 91, target: 87, status: "on-track" },
        loc_017: { start: 76, progress: 88, target: 87, status: "on-track" },
        loc_012: { start: 74, progress: 87, target: 87, status: "on-track" },
        loc_013: { start: 70, progress: 80, target: 87, status: "on-track" },
        loc_005: { start: 68, progress: 78, target: 87, status: "on-track" },
        loc_015: { start: 65, progress: 61, target: 87, status: "off-track" }
      }
    }
  },
  "g-open-action-items": {
    todo: {
      title: "June Objectives",
      subtitle: "50% still have open items",
      groupsTab: "off-track",
      locationMeta: {
        loc_005: { start: 68, progress: 61, target: 87, status: "off-track" },
        loc_012: { start: 74, progress: 70, target: 87, status: "off-track" },
        loc_013: { start: 70, progress: 66, target: 87, status: "off-track" },
        loc_015: { start: 65, progress: 58, target: 87, status: "off-track" },
        loc_006: { start: 79, progress: 91, target: 87, status: "on-track" },
        loc_014: { start: 82, progress: 91, target: 87, status: "on-track" },
        loc_016: { start: 80, progress: 90, target: 87, status: "on-track" },
        loc_017: { start: 76, progress: 88, target: 87, status: "on-track" }
      }
    }
  }
};

export function getNoticeScenario(noticeId) {
  if (!noticeId) return null;
  return noticeScenarios[noticeId] ?? null;
}
