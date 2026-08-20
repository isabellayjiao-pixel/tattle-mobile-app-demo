function appendList(params, key, values) {
  (values || []).forEach((value) => params.append(key, value));
}

export function buildAppRoute({
  path = "/inbox",
  tab,
  view,
  groups = [],
  locations = [],
  feedbackId,
  notice,
  section
} = {}) {
  const params = new URLSearchParams();
  if (tab) params.set("tab", tab);
  if (view) params.set("view", view);
  appendList(params, "group", groups);
  appendList(params, "location", locations);
  if (notice) params.set("notice", notice);
  if (section) params.set("section", section);
  const qs = params.toString();

  if (feedbackId) {
    return qs ? `/inbox/review/${feedbackId}?${qs}` : `/inbox/review/${feedbackId}`;
  }
  return qs ? `${path}?${qs}` : path;
}

export function routeForNotification(item) {
  const notice = item.persona === "groupable" ? item.id : undefined;
  if (item.link) {
    const { screen, tab, view, groups, locations, feedbackId, section } = item.link;
    if (feedbackId || screen === "inbox-detail") {
      return buildAppRoute({ feedbackId, notice });
    }
    if (screen === "todo") {
      return buildAppRoute({ path: "/todo", view, groups, notice });
    }
    if (screen === "stats") {
      return buildAppRoute({ path: "/performance", tab, groups, locations, notice, section });
    }
    return buildAppRoute({ path: "/inbox", tab: tab || "surveys", groups, locations, notice });
  }

  const dest = (item.deepLinkDestination || "").toLowerCase();
  const type = (item.notificationType || "").toLowerCase();

  if (dest.includes("specific review") || type.includes("review posted")) {
    return item.feedbackId ? `/inbox/review/${item.feedbackId}` : "/inbox?tab=reviews";
  }
  if (dest.includes("specific submission") || dest.includes("specific incident")) {
    return item.feedbackId ? `/inbox/review/${item.feedbackId}` : "/inbox?tab=surveys";
  }
  if (dest.includes("specific response") || dest.includes("conversation")) {
    return item.feedbackId ? `/inbox/review/${item.feedbackId}` : "/inbox?tab=surveys";
  }
  if (dest.includes("to-do") || dest.includes("to do")) return "/todo";
  if (dest.includes("stats")) return "/performance";
  if (dest.includes("inbox")) return "/inbox?tab=surveys";
  return "/inbox?tab=surveys";
}
