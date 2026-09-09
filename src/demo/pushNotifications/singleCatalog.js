/**
 * Single-user push notifications — sourced from
 * `Tattle Mobile App_Push Notifications - Single User Notifications.csv`
 */

import { feedback } from "../../../dummyData.js";
import { routeForNotification } from "./routes.js";

const isReview = (f) => f.channel === "Google" || f.channel === "Yelp";
const isSurvey = (f) => !isReview(f);

function findFeedback(criteria) {
  const {
    kind,
    rating,
    minRating,
    maxRating,
    flagged,
    responded,
    nameIncludes,
    channel
  } = criteria;

  return feedback.find((f) => {
    if (kind === "review" && !isReview(f)) return false;
    if (kind === "survey" && !isSurvey(f)) return false;
    if (channel && f.channel !== channel) return false;
    if (rating != null && f.rating !== rating) return false;
    if (minRating != null && f.rating < minRating) return false;
    if (maxRating != null && f.rating > maxRating) return false;
    if (flagged != null && f.flagged !== flagged) return false;
    if (responded != null && f.responded !== responded) return false;
    if (nameIncludes && !(f.name || "").includes(nameIncludes)) return false;
    return true;
  });
}

const feedbackIds = {
  survey5: findFeedback({ kind: "survey", rating: 5 })?.id,
  survey4: findFeedback({ kind: "survey", rating: 4 })?.id,
  survey3: findFeedback({ kind: "survey", rating: 3 })?.id,
  surveyIncident: findFeedback({ kind: "survey", rating: 1, flagged: true })?.id,
  surveyLoyalRisk: findFeedback({ kind: "survey", rating: 2, nameIncludes: "Lisa" })?.id,
  review5: findFeedback({ kind: "review", rating: 5 })?.id,
  review4:
    findFeedback({ kind: "review", rating: 4, channel: "Yelp" })?.id ??
    findFeedback({ kind: "review", rating: 4 })?.id,
  reviewNegative: findFeedback({ kind: "review", rating: 2 })?.id,
  guestReply: findFeedback({ kind: "survey", responded: true, nameIncludes: "Nina" })?.id,
  guestRecovered: findFeedback({ kind: "survey", nameIncludes: "Maria" })?.id
};

function entry(row) {
  return {
    persona: "single",
    ...row,
    route: routeForNotification(row)
  };
}

export const SINGLE_PUSH_TIERS = ["Critical", "Habits", "Celebrations", "Weekly roundup", "Re-engagement"];

export const singlePushCatalog = [
  entry({
    id: "p0-5star-survey",
    tier: "Critical",
    priority: "P0",
    notificationType: "New 5 star survey submission",
    deepLinkDestination: "Inbox → Specific submission",
    title: "🌟 New 5-Star Survey",
    body: "Congratulations! Tap to send a quick thank-you.",
    feedbackId: feedbackIds.survey5
  }),
  entry({
    id: "p0-4star-survey",
    tier: "Critical",
    priority: "P0",
    notificationType: "New 4 star survey submission",
    deepLinkDestination: "Inbox → Specific submission",
    title: "🔔 New 4-Star Survey",
    body: "Tap to view details and reply.",
    feedbackId: feedbackIds.survey4
  }),
  entry({
    id: "p0-3star-survey",
    tier: "Critical",
    priority: "P0",
    notificationType: "New 3 star survey submission",
    deepLinkDestination: "Inbox → Specific submission",
    title: "⚠️ New 3-Star Survey",
    body: "Tap to view details and reply.",
    feedbackId: feedbackIds.survey3
  }),
  entry({
    id: "p0-12star-incident",
    tier: "Critical",
    priority: "P0",
    notificationType: "New 1-2 star survey submission",
    deepLinkDestination: "Inbox → Specific incident",
    title: "🚨 Critical Incident",
    body: "Guest issue reported at 7th & Colorado. Tap to recover now.",
    feedbackId: feedbackIds.surveyIncident
  }),
  entry({
    id: "p0-loyal-guest",
    tier: "Critical",
    priority: "P0",
    notificationType: "High-value guest at risk",
    deepLinkDestination: "Inbox → Specific submission",
    title: "⚠️ Loyal Guest at Risk",
    body: "Negative feedback from a repeat customer. Respond immediately!",
    feedbackId: feedbackIds.surveyLoyalRisk
  }),
  entry({
    id: "p0-5star-review",
    tier: "Critical",
    priority: "P0",
    notificationType: "New 5 star review posted",
    deepLinkDestination: "Inbox → Specific review",
    title: "🎉 New Google Review",
    body: "Good job on a 5-star review! Your hard work is paying off.",
    feedbackId: feedbackIds.review5
  }),
  entry({
    id: "p0-4star-review",
    tier: "Critical",
    priority: "P0",
    notificationType: "New 4 star review posted",
    deepLinkDestination: "Inbox → Specific review",
    title: "🔔 New Google Review",
    body: "4-star review posted. Tap to reply.",
    feedbackId: feedbackIds.review4
  }),
  entry({
    id: "p0-negative-review",
    tier: "Critical",
    priority: "P0",
    notificationType: "New negative review posted",
    deepLinkDestination: "Inbox → Specific review",
    title: "⚠️ New 2-Star Review",
    body: "Posted on Google. Respond now to turn it around.",
    feedbackId: feedbackIds.reviewNegative
  }),
  entry({
    id: "p0-action-items",
    tier: "Critical",
    priority: "P0",
    notificationType: "Open action items",
    deepLinkDestination: "To-Do Tab",
    title: "📋 Pending Action Items",
    body: "You have 4 open tasks. Time for a quick check-in?"
  }),
  entry({
    id: "p0-objective-set",
    tier: "Critical",
    priority: "P0",
    notificationType: "Objective Set",
    deepLinkDestination: "To-Do Tab",
    title: "🎯 June Objective Set",
    body: "New target is live. Hit it to keep your streak alive!"
  }),
  entry({
    id: "p0-guest-reply",
    tier: "Critical",
    priority: "P0",
    notificationType: "Guest reply",
    deepLinkDestination: "Inbox → Specific response",
    title: "✉️ New Guest Reply",
    body: "Don't let them wait. Tap to respond now.",
    feedbackId: feedbackIds.guestReply
  }),
  entry({
    id: "p1-morning-briefing",
    tier: "Habits",
    priority: "P1",
    notificationType: "Morning Briefing",
    deepLinkDestination: "To-Do Tab",
    title: "☀️ Morning Briefing",
    body: "3 tasks on your to-do list. Start your day strong!"
  }),
  entry({
    id: "p1-evening-summary",
    tier: "Habits",
    priority: "P1",
    notificationType: "Evening Summary",
    deepLinkDestination: "Stats",
    title: "🌙 Evening Summary",
    body: "Today's results: 8 guests recovered, 15 feedback submitted."
  }),
  entry({
    id: "p1-monthly-cer",
    tier: "Habits",
    priority: "P1",
    notificationType: "Monthly CER change",
    deepLinkDestination: "Stats",
    title: "📈 Monthly CER Update",
    body: "You finished this month with CER: 4.83. Tap to see details."
  }),
  entry({
    id: "p1-inbox-digest",
    tier: "Habits",
    priority: "P1",
    notificationType: "Unread / unreplied inbox digest",
    deepLinkDestination: "To-Do List → Specific item",
    title: "📬 Inbox Status",
    body: "5 guests waiting for response. Quick replies = happy guests!"
  }),
  entry({
    id: "p2-guest-recovered",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Guest recovered",
    deepLinkDestination: "Inbox → Conversation thread",
    title: "🎉 Guest Recovered!",
    body: 'Maria said "Thanks for making it right!"',
    feedbackId: feedbackIds.guestRecovered
  }),
  entry({
    id: "p2-streak",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Streak Milestone",
    deepLinkDestination: "Stats",
    title: "🔥 7-Day Streak!",
    body: "You are building a reputation of excellence. Keep it up!"
  }),
  entry({
    id: "p2-cer-record",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "CER Personal Best",
    deepLinkDestination: "Stats → CER trend",
    title: "🏆 New CER Record!",
    body: "You just hit your highest score in the last 90 days. Guests are loving it!"
  }),
  entry({
    id: "p2-benchmarking",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Benchmarking Win",
    deepLinkDestination: "Stats → Benchmarking",
    title: "📈 Ranking Update",
    body: "You jumped 5 spots! Now #12 out of 87 locations."
  }),
  entry({
    id: "p2-perfect-week",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Zero incident week",
    deepLinkDestination: "Stats",
    title: "💯 Perfect Week!",
    body: "Zero incidents, happy guests all around. You're crushing it!"
  }),
  entry({
    id: "p2-objective-met",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Objective Met",
    deepLinkDestination: "To-Do Tab",
    title: "🚀 Objective Met!",
    body: "You hit your June CER goal of 4.7. Incredible work!"
  }),
  entry({
    id: "p2-objective-progress",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Objective Progress (only if using AI Coach)",
    deepLinkDestination: "Stats",
    title: "📈 June Update",
    body: "Your Hospitality improved by 0.5. Keep it up!"
  }),
  entry({
    id: "p2-revenue-milestone",
    tier: "Celebrations",
    priority: "P2",
    notificationType: "Recovery Revenue Milestone",
    deepLinkDestination: "Stats → Recovered Revenue",
    title: "💰 $1,000 Recovered!",
    body: "That is real impact. Great work!"
  }),
  entry({
    id: "p3-weekly-stats",
    tier: "Weekly roundup",
    priority: "P3",
    notificationType: "Weekly Stats Report",
    deepLinkDestination: "Stats Dashboard",
    title: "📊 Weekly Review",
    body: "CER 89 (↑4), 24 recoveries, ranking #15. Tap for details."
  }),
  entry({
    id: "p3-trend-alert",
    tier: "Weekly roundup",
    priority: "P3",
    notificationType: "Trend Alert",
    deepLinkDestination: "Stats → Filtered view",
    title: "📈 Trend Alert: Incidents",
    body: "Dinner service incidents up 40% this week. Take a look."
  }),
  entry({
    id: "p3-competitive",
    tier: "Weekly roundup",
    priority: "P3",
    notificationType: "Competitive Intelligence",
    deepLinkDestination: "Stats → Benchmarking",
    title: "👀 Ranking Alert",
    body: "Downtown location just passed you. What can you learn?"
  }),
  entry({
    id: "p3-location-needs-you",
    tier: "Re-engagement",
    priority: "P3",
    notificationType: "Your Location Needs You",
    deepLinkDestination: "Inbox or To-Do",
    title: "👋 Outstanding Tasks",
    body: "5 new items and 3 urgent tasks await. Login now."
  }),
  entry({
    id: "p3-scores-update",
    tier: "Re-engagement",
    priority: "P3",
    notificationType: "For locations with absolutely no activity after two weeks",
    deepLinkDestination: "Stats → CER trend",
    title: "📉 Your Scores Update",
    body: "CER dropped to 78 while you were away. Time to check in!"
  })
];
