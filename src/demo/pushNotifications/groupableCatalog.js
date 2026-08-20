/**
 * Groupable-user push notifications — sourced from
 * `Groupable Push Notifications Spreadsheet - Source of Truth  - Groupable notifications.csv`
 */

import { routeForNotification } from "./routes.js";

const GROUP_HOUSTON = "grp_houston";
const LOC_MIDTOWN = "loc_005";
const LOC_WOODLANDS = "loc_006";
const ALL_GROUPS = [
  "grp_austin",
  "grp_dallas",
  "grp_houston",
  "grp_sa",
  "grp_nashville",
  "grp_denver"
];

function entry(row) {
  const item = { persona: "groupable", ...row };
  return { ...item, route: routeForNotification(item) };
}

export const GROUPABLE_PUSH_TIERS = [
  "Critical Alerts",
  "Performance Updates",
  "Celebrations",
  "Summaries",
  "Login Reminders"
];

export const groupablePushCatalog = [
  entry({
    id: "g-location-incident",
    tier: "Critical Alerts",
    priority: "P0",
    notificationType: "New Location Level Incidents",
    deepLinkDestination: "Inbox → Specific incident",
    title: "🚨 Critical Incident",
    body: "Guest issue reported at Midtown. Tap to review.",
    link: { screen: "inbox-detail", feedbackId: "fb_058" }
  }),
  entry({
    id: "g-negative-review",
    tier: "Critical Alerts",
    priority: "P0",
    notificationType: "New Location Level Negative Reviews",
    deepLinkDestination: "Inbox → Specific review",
    title: "⚠️ New 1-Star Review",
    body: "Posted on Google. Tap to review.",
    link: { screen: "inbox-detail", feedbackId: "fb_056" }
  }),
  entry({
    id: "g-survey-tag",
    tier: "Critical Alerts",
    priority: "P0",
    notificationType: "Tag notifications (surveys)",
    deepLinkDestination: "To the specific feedback with the assigned tag",
    title: "🚨 New Survey Tag",
    body: "Food Quality has been assigned to a guest survey feedback. Tap to see details.",
    link: { screen: "inbox-detail", feedbackId: "fb_041" }
  }),
  entry({
    id: "g-review-tag",
    tier: "Critical Alerts",
    priority: "P0",
    notificationType: "Tag notifications (online reviews)",
    deepLinkDestination: "To the specific review with the assigned tag",
    title: "🚨 New Online Review Tag",
    body: "Food Quality has been assigned to a Google review. Tap to see details.",
    link: { screen: "inbox-detail", feedbackId: "fb_097" }
  }),
  entry({
    id: "g-unread-piling-up",
    tier: "Critical Alerts",
    priority: "P0",
    notificationType: "Unread Feedback Piling Up",
    deepLinkDestination: "Inbox → Filtered to that location",
    title: "📬 Location Behind On Responses",
    body: "23 unread feedback across 2 locations sitting for 2+ days. Guests may still be waiting.",
    link: { screen: "inbox", tab: "surveys", locations: [LOC_MIDTOWN] }
  }),
  entry({
    id: "g-group-incident-spike",
    tier: "Critical Alerts",
    priority: "P0",
    notificationType: "Incident Spike (Group Level)",
    deepLinkDestination: "Stats → Group View",
    title: "🚨 Group Incident Spike",
    body: "Incidents up 42% across Houston Metro this week vs. last. Tap to investigate.",
    link: { screen: "stats", groups: [GROUP_HOUSTON], section: "incident-rate" }
  }),
  entry({
    id: "g-location-incident-spike",
    tier: "Critical Alerts",
    priority: "P0",
    notificationType: "Incident Spike (Single Location)",
    deepLinkDestination: "Stats → Location View",
    title: "🚨 Location Incident Spike",
    body: "Midtown incidents up 60% this week. Tap to see what's driving it.",
    link: { screen: "stats", locations: [LOC_MIDTOWN], section: "incident-rate" }
  }),
  entry({
    id: "g-cer-drop",
    tier: "Critical Alerts",
    priority: "P0",
    notificationType: "CER Drop Alert",
    deepLinkDestination: "Stats → Group View",
    title: "📉 CER Drop Alert",
    body: "Houston Metro CER fell 0.15 pts and 3 locations dropped 0.3 pts this week. Tap to see what's driving it.",
    link: { screen: "stats", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-objectives-set",
    tier: "Performance Updates",
    priority: "P1",
    notificationType: "Start-Of-Month Objective Setting",
    deepLinkDestination: "Objectives Landing Page for Groupable Users",
    title: "🎯 June Objectives Set",
    body: "New targets are live for your group. Tap to see each location's objectives!",
    link: { screen: "todo", view: "groups", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-incident-rate-update",
    tier: "Performance Updates",
    priority: "P1",
    notificationType: "Incident Rate Update",
    deepLinkDestination: "Stats → Group View",
    title: "📊 Incident Rate Update",
    body: "Houston Metro's incident rate is 4.2% this month, +1.1% vs. last month. Tap to see review.",
    link: { screen: "stats", groups: [GROUP_HOUSTON], section: "incident-rate" }
  }),
  entry({
    id: "g-group-ranking",
    tier: "Performance Updates",
    priority: "P1",
    notificationType: "Group Ranking Update",
    deepLinkDestination: "Stats → Group View",
    title: "📈 Group Ranking Update",
    body: "Houston Metro ranked #4 out of 18, up 2 spots from last month. Tap to see the breakdown.",
    link: { screen: "stats", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-reply-rate",
    tier: "Performance Updates",
    priority: "P1",
    notificationType: "Group-Level Reply Rate",
    deepLinkDestination: "Inbox → Group view",
    title: "📬 Reply Rate Up in June",
    body: "Houston Metro replied to 82% of incidents this month, up +6% from 76% last month. Keep it going!",
    link: { screen: "inbox", tab: "surveys", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-objective-progress",
    tier: "Performance Updates",
    priority: "P1",
    notificationType: "Objective Progress",
    deepLinkDestination: "Objectives Landing Page for Groupable Users",
    title: "📈 June Progress Update",
    body: "5 locations hit their goal, 2 locations are on their way, and 1 location is off track.",
    link: { screen: "todo", view: "groups", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-open-action-items",
    tier: "Performance Updates",
    priority: "P1",
    notificationType: "Action Item Completion Rate",
    deepLinkDestination: "Objectives Landing Page for Groupable Users",
    title: "📋 Open Action Items",
    body: "50% of locations in Houston Metro still have open action items this month. Tap to review.",
    link: { screen: "todo", view: "groups", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-group-cer-record",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Group CER Personal Best",
    deepLinkDestination: "Stats → Group View",
    title: "🏆 New Group CER Record!",
    body: "Houston Metro just hit its highest CER in 90 days. Keep building on this momentum!",
    link: { screen: "stats", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-google-score-record",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Group-wide Google Score Record",
    deepLinkDestination: "Stats → Reviews",
    title: "🏆 New Google Score Record!",
    body: "Houston Metro just hit a 4.8 on Google, that's a record! Guests are noticing.",
    link: { screen: "stats", tab: "reviews", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-top-mover",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Top Mover This Week",
    deepLinkDestination: "Stats → Location(s) selected in filter",
    title: "🌟 Top Mover This Week",
    body: "The Woodlands improved CER by +0.41, the biggest gain in Houston Metro this week!",
    link: { screen: "stats", groups: [GROUP_HOUSTON], locations: [LOC_WOODLANDS] }
  }),
  entry({
    id: "g-recovery-revenue",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Group Recovery Revenue Milestone",
    deepLinkDestination: "Stats → Group View",
    title: "💰 $5K Recovered Across Your Group!",
    body: "That is real impact. Great job to the team!",
    link: { screen: "stats", groups: [GROUP_HOUSTON], section: "recovery" }
  }),
  entry({
    id: "g-zero-incident-week",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Zero Incident Week (Location Level)",
    deepLinkDestination: "Stats → Locations selected in filter",
    title: "💯 Zero Incident Week",
    body: "The Woodlands had zero incidents this week. Give them a shout!",
    link: { screen: "stats", locations: [LOC_WOODLANDS] }
  }),
  entry({
    id: "g-morning-briefing",
    tier: "Summaries",
    priority: "P3",
    notificationType: "Morning Briefing",
    deepLinkDestination: "Stats → Group View",
    title: "☀️ Morning Briefing",
    body: "Houston Metro has 8 open incidents across 8 locations. 4 locations have open action items.",
    link: { screen: "stats", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-weekly-snapshot",
    tier: "Summaries",
    priority: "P3",
    notificationType: "End-of-Week Summary",
    deepLinkDestination: "Stats → Group View",
    title: "📈 Weekly Group Snapshot",
    body: "124 guests recovered, CER at 4.5 (+0.3) this week. Tap for the full breakdown.",
    link: { screen: "stats", groups: [GROUP_HOUSTON], section: "recovery" }
  }),
  entry({
    id: "g-monthly-cer",
    tier: "Summaries",
    priority: "P3",
    notificationType: "Monthly Group CER Update",
    deepLinkDestination: "Stats → Group View",
    title: "📈 June Group CER Update",
    body: "Houston Metro hit 4.81 this month, that's +0.06 from last month. Tap for details.",
    link: { screen: "stats", groups: [GROUP_HOUSTON] }
  }),
  entry({
    id: "g-login-reminder",
    tier: "Login Reminders",
    priority: "P3",
    notificationType: "3 days no login",
    deepLinkDestination: "Inbox (surveys tab) → Group View (All applicable groups selected)",
    title: "👋 Your Locations Need You",
    body: "5 critical incidents across 3 locations are waiting. Your team needs their coach!",
    link: { screen: "inbox", tab: "surveys", groups: ALL_GROUPS }
  })
];
