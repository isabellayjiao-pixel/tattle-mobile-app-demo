import { useEffect, useMemo, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";
import {
  feedback,
  getFeedbackById,
  locations
} from "../dummyData";
import {
  getNoticeScenario,
  pushNotificationCatalog,
  pushPersonas,
  pushTiersByPersona
} from "./demo/pushNotifications";
import {
  IconInbox,
  IconTodo,
  IconStats,
  IconProfile,
  IconSend,
  IconRefresh,
  IconSearch,
  IconSliders,
  IconBack,
  IconMore,
  IconPlus,
  IconCheck,
  IconChevronRight,
  IconChevronDown,
  IconThumbsUp,
  IconArrowUp,
  IconArrowDown,
  IconSparkle,
  IconTemplate,
  IconX,
  IconExternal,
  IconInfo,
  IconCategories,
  IconDayparts,
  IconChannels,
  IconBell,
  ChannelLogo
} from "./icons";
import tattleAppIcon from "./assets/tattle-app-icon.jpg";
import tattleLogoWhite from "./assets/tattle-logo-white.png";
import MerchantBrandLogo from "./components/MerchantBrandLogo";
import { merchantBrand } from "../merchantBrand";
import IPhoneShell from "./demo/IPhoneShell";
import DemoPersonaToggle from "./demo/DemoPersonaToggle";
import DemoStageShell from "./demo/DemoStageShell";
import GuestDemoApp from "./guest/GuestDemoApp";

const DEMO_ACCESS_KEY = "tattle_demo_access";
const DEMO_PASSWORD = "TattleIsAwesome2026";

function getInitialUnreadIds() {
  const surveys = feedback
    .filter((f) => f.channel !== "Google" && f.channel !== "Yelp")
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 12);
  const reviews = feedback
    .filter((f) => f.channel === "Google" || f.channel === "Yelp")
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 12);
  return new Set([...surveys.slice(0, 2), ...reviews.slice(0, 2)].map((f) => f.id));
}

// ── helpers ──

function scoreClass(rating) {
  const r = Math.max(1, Math.min(rating, 5));
  if (r >= 4) return "score-good";
  if (r === 3) return "score-mid";
  return "score-bad";
}

function pctClass(pct) {
  if (pct >= 80) return "score-good";
  if (pct >= 73) return "score-mid";
  if (pct >= 60) return "score-warn";
  return "score-bad";
}

function shortCategory(category) {
  const map = {
    "Speed of Service": "Speed",
    "Order Accuracy": "Accuracy",
    "Mobile App / Online Order": "Mobile App",
    "Food Quality": "Food Quality"
  };
  return map[category] ?? category;
}

function toDisplayTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function toRelativeDate(timestamp) {
  const d = new Date(timestamp);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return toDisplayTime(timestamp);
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

// ── lock screen ──

function HomeLockScreen({ notifications, onNotificationClick, onOpenApp }) {
  return (
    <div className="screen lock-screen">
      <div className="lock-wallpaper" aria-hidden />

      <div className="lock-content">
        <div className="lock-status">
          <span className="lock-date">Friday, May 29</span>
          <span className="lock-time">7:42</span>
        </div>

        <button className="lock-tattle-icon" type="button" onClick={onOpenApp} aria-label="Open Tattle">
          <img src={tattleAppIcon} alt="" />
          <span className="lock-tattle-label">Tattle</span>
        </button>

        <div className="notification-stack">
          {notifications.slice(-4).map((notice) => (
            <button
              key={notice.id}
              className="ios-notification"
              type="button"
              onClick={() => onNotificationClick(notice)}
            >
              <img className="ios-app-icon-img" src={tattleAppIcon} alt="" />
              <div className="ios-body">
                <div className="ios-meta">
                  <strong>Tattle</strong>
                  <span>now</span>
                </div>
                <h3>{notice.title}</h3>
                <p>{notice.body}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="lock-bottom">
          <div className="lock-home-indicator" />
        </div>
      </div>
    </div>
  );
}

function DemoPushSidebar({ activeId, onReset, onTrigger }) {
  const [collapsed, setCollapsed] = useState(true);
  const [persona, setPersona] = useState("single");
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const tierOptions = ["all", ...(pushTiersByPersona[persona] ?? [])];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pushNotificationCatalog.filter((item) => {
      if (item.persona !== persona) return false;
      if (tierFilter !== "all" && item.tier !== tierFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.body.toLowerCase().includes(q) ||
        item.notificationType.toLowerCase().includes(q)
      );
    });
  }, [persona, query, tierFilter]);

  return (
    <aside className={`demo-push-sidebar ${collapsed ? "is-collapsed" : ""}`}>
      <header className="demo-panel-topbar app-topbar">
        <div className="demo-panel-topbar-row">
          <div className="demo-panel-head">
            <h2>Notification Panel</h2>
            <p>Trigger push notifications and deep link into the app.</p>
          </div>
          <button
            className="circle-btn demo-sidebar-toggle"
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand notification panel" : "Collapse notification panel"}
          >
            <IconChevronDown width={18} height={18} />
          </button>
        </div>
      </header>

      <div className="demo-panel-body" aria-hidden={collapsed}>
        <div className="demo-panel-body-inner">
        <div className="demo-panel-toolbar">
          <button className="demo-reset-btn" type="button" onClick={onReset}>
            <IconRefresh width={15} height={15} />
            Reset to Lock Screen
          </button>

          <div className="demo-toolbar-group">
            <span className="demo-toolbar-label">Audience</span>
            <div className="demo-persona-seg" role="tablist" aria-label="Notification audience">
              {pushPersonas.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  disabled={!option.enabled}
                  title={option.enabled ? undefined : "Coming later"}
                  aria-selected={persona === option.id}
                  className={`demo-persona-chip ${persona === option.id ? "active" : ""}`}
                  onClick={() => {
                    if (!option.enabled) return;
                    setPersona(option.id);
                    setTierFilter("all");
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sheet-search demo-panel-search">
            <IconSearch width={16} height={16} />
            <input
              placeholder="Search notifications…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="demo-toolbar-group">
            <span className="demo-toolbar-label">Tier</span>
            <div className="demo-tier-chips">
              {tierOptions.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  className={`demo-tier-chip ${tierFilter === tier ? "active" : ""}`}
                  onClick={() => setTierFilter(tier)}
                >
                  {tier === "all" ? "All" : tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="demo-panel-list inbox-list">
          {filtered.length === 0 ? (
            <p className="empty-list">No notifications match your filters.</p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                className={`inbox-item demo-push-item ${activeId === item.id ? "active" : ""}`}
                type="button"
                onClick={() => onTrigger(item)}
              >
                <div className="inbox-main">
                  <div className="row-top">
                    <strong className="row-name">{item.title}</strong>
                    <span className="tag-chip chip-neu">{item.tier}</span>
                  </div>
                  <p className="row-preview">{item.body}</p>
                </div>
              </button>
            ))
          )}
        </div>
        </div>
      </div>
    </aside>
  );
}

function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 1300);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="screen splash-figma" onClick={() => navigate("/login")}>
      <Wordmark light />
    </div>
  );
}

function Wordmark({ light }) {
  return (
    <span className={`tattle-wordmark ${light ? "light" : ""}`}>
      tattle
      <svg className="tattle-signal" viewBox="0 0 28 28" width="20" height="20" aria-hidden>
        <path d="M4 20a12 12 0 0 1 12-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M5 20a8 8 0 0 1 8-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="6" cy="20" r="2.4" fill="currentColor" />
      </svg>
    </span>
  );
}

function LoginScreen() {
  return (
    <div className="screen login-figma">
      <Wordmark light />
      <div className="login-card">
        <label className="field-label">
          Email
          <input className="field" defaultValue="manager@crestline.co" />
        </label>
        <label className="field-label">
          Password
          <input className="field" type="password" defaultValue="demo1234" />
          <Link className="forgot" to="/login">Forgot password?</Link>
        </label>
        <Link className="btn-primary" to="/inbox?tab=surveys">
          Login
        </Link>
      </div>
    </div>
  );
}

function AccessGate({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!exiting) return undefined;
    const timer = setTimeout(onSuccess, 520);
    return () => clearTimeout(timer);
  }, [exiting, onSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === DEMO_PASSWORD) {
      sessionStorage.setItem(DEMO_ACCESS_KEY, "1");
      setError(false);
      setExiting(true);
      return;
    }
    setError(true);
  };

  return (
    <div className={`access-gate ${exiting ? "is-exiting" : ""}`}>
      <div className="access-gate-wallpaper" aria-hidden />
      <div className="access-gate-content">
        <img className="access-gate-logo" src={tattleLogoWhite} alt="Tattle" />
        <p className="access-gate-subtitle">Mobile App Demo</p>
        <form className="access-gate-card" onSubmit={handleSubmit}>
          <label className="field-label">
            Password
            <input
              className="field"
              type="password"
              placeholder="Enter demo password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              autoComplete="current-password"
              autoFocus
            />
          </label>
          {error ? <p className="access-gate-error">Incorrect password. Please try again.</p> : null}
          <button className="btn-primary access-gate-submit" type="submit">
            Enter Demo
          </button>
        </form>
      </div>
    </div>
  );
}

// ── bottom nav ──

function BottomNav({ active }) {
  const navigate = useNavigate();
  const items = [
    { key: "inbox", label: "Inbox", icon: IconInbox, to: "/inbox?tab=surveys" },
    { key: "todo", label: "To-Do", icon: IconTodo, to: "/todo" },
    { key: "stats", label: "Stats", icon: IconStats, to: "/performance" },
    { key: "profile", label: "Profile", icon: IconProfile, to: "/profile" }
  ];
  return (
    <footer className="bottom-nav">
      {items.map(({ key, label, icon: Icon, to }) => (
        <button
          key={key}
          className={`nav-item ${active === key ? "active" : ""}`}
          type="button"
          onClick={() => navigate(to)}
        >
          <Icon width={22} height={22} filled />
          <span>{label}</span>
        </button>
      ))}
    </footer>
  );
}

function ScoreBadge({ rating, large }) {
  return (
    <span className={`metric-badge ${scoreClass(rating)} ${large ? "lg" : ""}`}>
      {rating}<span className="badge-star">★</span>
    </span>
  );
}

function RatingItem({ label, rating, factors, comment }) {
  const expanded = (factors && factors.length) || comment;
  return (
    <div className={`ratings-item ${expanded ? "expanded" : ""}`}>
      <div className="ri-head">
        <span className="ri-label">{label}</span>
        <ScoreBadge rating={rating} large />
      </div>
      {factors && factors.length ? (
        <>
          <div className="ri-divider" />
          <div className="ri-factors">
            {factors.map((f, i) => (
              <span key={i} className={`factor-pill ${f.pos ? "pos" : "neg"}`}>{f.t}</span>
            ))}
          </div>
        </>
      ) : null}
      {comment ? <p className="ri-comment">{comment}</p> : null}
    </div>
  );
}

function StarBadge({ value, kind, large }) {
  return (
    <span className={`metric-badge ${kind} ${large ? "lg" : ""}`}>
      {value}<span className="badge-star">★</span>
    </span>
  );
}

function chipClass(rating) {
  return rating >= 4 ? "chip-pos" : "chip-neg";
}

function moreCount(item) {
  return (item.id.charCodeAt(item.id.length - 1) % 5) + 1;
}

function locationShortName(loc) {
  return loc.name.includes(" – ") ? loc.name.split(" – ")[1] : loc.name;
}

const STORE_GROUPS = [
  { value: "grp_austin", label: "Austin Metro", locationIds: ["loc_001", "loc_002"] },
  { value: "grp_dallas", label: "Dallas Metro", locationIds: ["loc_003", "loc_004"] },
  { value: "grp_houston", label: "Houston Metro", locationIds: ["loc_005", "loc_006", "loc_012", "loc_013", "loc_014", "loc_015", "loc_016", "loc_017"] },
  { value: "grp_sa", label: "San Antonio", locationIds: ["loc_007"] },
  { value: "grp_nashville", label: "Nashville Region", locationIds: ["loc_008", "loc_009"] },
  { value: "grp_denver", label: "Denver Market", locationIds: ["loc_010", "loc_011"] }
];

const GROUP_FILTER_OPTIONS = STORE_GROUPS.map((g) => ({ value: g.value, label: g.label }));

function locationIdsForGroups(groupValues) {
  if (!groupValues.length) return locations.map((l) => l.id);
  const ids = new Set();
  groupValues.forEach((gv) => {
    const g = STORE_GROUPS.find((sg) => sg.value === gv);
    g?.locationIds.forEach((id) => ids.add(id));
  });
  return [...ids];
}

const OBJECTIVE_NAMES = ["Order Accuracy", "Speed of Service", "Guest Experience", "Food Quality", "Cleanliness"];

const LOCATION_TODO_META = Object.fromEntries(
  locations.map((loc, i) => {
    const start = 65 + (i * 4) % 12;
    const progress = Math.min(97, Math.max(58, loc.cer - 2 + (i % 5)));
    const target = 87;
    return [
      loc.id,
      {
        objective: OBJECTIVE_NAMES[i % OBJECTIVE_NAMES.length],
        focus: ["Special Instructions", "Table Touches", "Hot Holding", "Line Speed", "Dining Room"][i % 5],
        start,
        progress,
        target,
        status: progress >= target - 4 ? "on-track" : "off-track"
      }
    ];
  })
);

const STATS_FILTER_GROUPS = [
  {
    type: "group",
    label: "Group",
    mode: "multi",
    options: GROUP_FILTER_OPTIONS
  },
  {
    type: "location",
    label: "Location",
    mode: "multi",
    options: locations.map((l) => ({ value: l.id, label: locationShortName(l) }))
  },
  {
    type: "date",
    label: "Date Range",
    mode: "single",
    options: [
      { value: "7", label: "Past 7 Days" },
      { value: "30", label: "Past 30 Days" },
      { value: "90", label: "Past 90 Days" },
      { value: "180", label: "Past 6 Months" },
      { value: "all", label: "All Time" }
    ]
  },
  {
    type: "questionnaire",
    label: "Questionnaires",
    mode: "multi",
    options: [
      { value: "standard", label: "Standard Survey" },
      { value: "reward", label: "Survey w/ Reward" },
      { value: "incident", label: "Incident Follow-up" },
      { value: "ces", label: "CES Program" }
    ]
  },
  {
    type: "daypart",
    label: "Day Parts",
    mode: "multi",
    options: [
      { value: "breakfast", label: "Breakfast" },
      { value: "lunch", label: "Lunch" },
      { value: "dinner", label: "Dinner" },
      { value: "latenight", label: "Late Night" }
    ]
  }
];

const DEFAULT_STATS_FILTERS = [
  { type: "location", value: "loc_001", label: "Domain" },
  { type: "date", value: "90", label: "Past 90 days" }
];

function filtersFromSearchParams(searchParams) {
  const filters = [];
  searchParams.getAll("group").forEach((value) => {
    const group = STORE_GROUPS.find((sg) => sg.value === value);
    if (group) filters.push({ type: "group", value: group.value, label: group.label });
  });
  searchParams.getAll("location").forEach((value) => {
    const loc = locations.find((l) => l.id === value);
    if (loc) filters.push({ type: "location", value: loc.id, label: locationShortName(loc) });
  });
  return filters;
}

function statsFiltersFromSearchParams(searchParams) {
  const fromUrl = filtersFromSearchParams(searchParams);
  if (!fromUrl.length) return [...DEFAULT_STATS_FILTERS];
  const hasDate = fromUrl.some((f) => f.type === "date");
  return hasDate ? fromUrl : [...fromUrl, { type: "date", value: "90", label: "Past 90 days" }];
}

function groupsFromSearchParams(searchParams) {
  const fromUrl = searchParams.getAll("group").filter((value) =>
    STORE_GROUPS.some((sg) => sg.value === value)
  );
  return fromUrl.length ? fromUrl : STORE_GROUPS.map((g) => g.value);
}

const FILTER_GROUPS = [
  { type: "rating", label: "Star Rating", mode: "range" },
  { type: "group", label: "Group", mode: "multi", options: GROUP_FILTER_OPTIONS },
  { type: "date", label: "Date Range", mode: "single", options: [
    { value: "7", label: "Past 7 Days" }, { value: "30", label: "Past 30 Days" }, { value: "90", label: "Past 90 Days" }, { value: "180", label: "Past 6 Months" }, { value: "all", label: "All Time" }
  ] },
  { type: "location", label: "Location", mode: "multi", options: locations.map((l) => ({ value: l.id, label: locationShortName(l) })) },
  { type: "platform", label: "Platforms", mode: "multi", options: ["Google", "Yelp", "Facebook", "DoorDash", "Tripadvisor", "OpenTable"].map((p) => ({ value: p, label: p })) },
  { type: "status", label: "Response Status", mode: "single", options: [
    { value: "responded", label: "Responded" }, { value: "pending", label: "Needs Response" }, { value: "flagged", label: "Flagged" }
  ] },
  { type: "category", label: "Tags", mode: "multi", options: [
    { value: "Food Quality", label: "Food Quality" }, { value: "Service", label: "Service" },
    { value: "Speed of Service", label: "Speed" }, { value: "Cleanliness", label: "Cleanliness" },
    { value: "Order Accuracy", label: "Accuracy" }, { value: "Value", label: "Value" }
  ] }
];

function RatingRangeRow({ caption, type, draft, toggleDraft }) {
  const selected = draft.find((f) => f.type === type)?.value;
  return (
    <div className="rate-block">
      <span className="rate-caption">{caption}</span>
      <div className="rate-row">
        {[1, 2, 3, 4, 5].map((n) => {
          const on = selected === n;
          return (
            <button
              key={n}
              type="button"
              className={`rate-badge ${on ? `sel ${scoreClass(n)}` : ""}`}
              onClick={() => toggleDraft(type, n, `${caption === "Minimum Rating" ? "Min" : "Max"} ${n}★`, true)}
            >
              {n}<span className="rate-star">★</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FilterSheet({
  draft,
  isDrafted,
  toggleDraft,
  onApply,
  onClose,
  groups: groupDefs = FILTER_GROUPS,
  showSearch = true,
  searchQuery: controlledQuery,
  onSearchQueryChange,
  searchPlaceholder = "Search reviews…"
}) {
  const [open, setOpen] = useState(() =>
    Object.fromEntries(groupDefs.map((g) => [g.type, g.type === "rating"]))
  );
  const [internalQuery, setInternalQuery] = useState("");
  const query = controlledQuery !== undefined ? controlledQuery : internalQuery;
  const setQuery = onSearchQueryChange ?? setInternalQuery;
  const toggleSection = (type) => setOpen((cur) => ({ ...cur, [type]: !cur[type] }));

  const groups = groupDefs.map((g) => ({
    ...g,
    options: g.options && query.trim()
      ? g.options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
      : g.options
  })).filter((g) => g.mode === "range" || !query.trim() || (g.options && g.options.length));

  const groupCount = (group) =>
    group.mode === "range"
      ? draft.filter((f) => f.type === "ratingMin" || f.type === "ratingMax").length
      : draft.filter((f) => f.type === group.type).length;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet filter-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="compose-head">
          <h4>Filters</h4>
          <button className="circle-btn ghost" type="button" onClick={onClose}>
            <IconX width={18} height={18} />
          </button>
        </div>

        {showSearch ? (
          <div className="sheet-search">
            <IconSearch width={18} height={18} />
            <input placeholder={searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        ) : null}

        <div className="filter-accordion">
          {groups.map((group) => {
            const count = groupCount(group);
            const isOpen = !!open[group.type] || (query.trim() && group.options && group.options.length);
            return (
              <div className={`accordion-row ${isOpen ? "open" : ""}`} key={group.type}>
                <button className="accordion-head" type="button" onClick={() => toggleSection(group.type)}>
                  <span className="accordion-label">
                    {group.label}
                    {count ? <span className="accordion-count">{count}</span> : null}
                  </span>
                  <IconChevronDown width={18} height={18} className="accordion-caret" />
                </button>

                {isOpen && group.mode === "range" ? (
                  <div className="accordion-body rate-body">
                    <RatingRangeRow caption="Minimum Rating" type="ratingMin" draft={draft} toggleDraft={toggleDraft} />
                    <RatingRangeRow caption="Maximum Rating" type="ratingMax" draft={draft} toggleDraft={toggleDraft} />
                  </div>
                ) : null}

                {isOpen && group.mode !== "range" ? (
                  <div className="accordion-body">
                    <div className="filter-list">
                      {group.options.map((opt) => {
                        const on = isDrafted(group.type, opt.value);
                        return (
                          <button
                            key={String(opt.value)}
                            type="button"
                            className={`filter-list-row ${on ? "on" : ""}`}
                            onClick={() => toggleDraft(group.type, opt.value, opt.label, group.mode === "single")}
                          >
                            <span className={`${group.mode === "single" ? "opt-radio" : "opt-check"} ${on ? "on" : ""}`} />
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="filter-foot">
          <button className="btn-primary apply-filters" type="button" disabled={!draft.length} onClick={onApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

function InboxScreen({ unreadIds, onMarkRead }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get("tab") === "reviews" ? "reviews" : "surveys";
  const scenario = getNoticeScenario(searchParams.get("notice"));
  const inboxOverlay = scenario?.inbox;

  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [draft, setDraft] = useState([]);
  const [activeFilters, setActiveFilters] = useState(() => filtersFromSearchParams(searchParams));
  const overlayKey = `${searchParams.get("notice") || ""}:${inboxOverlay?.allUnread ? "1" : "0"}`;
  const [extraUnread, setExtraUnread] = useState(() =>
    new Set(inboxOverlay?.allUnread ? (inboxOverlay.items || []).map((item) => item.id) : [])
  );

  useEffect(() => {
    setExtraUnread(new Set(inboxOverlay?.allUnread ? (inboxOverlay.items || []).map((item) => item.id) : []));
  }, [overlayKey]);

  const surveyItems = useMemo(
    () =>
      feedback
        .filter((f) => f.channel !== "Google" && f.channel !== "Yelp")
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 12),
    []
  );
  const reviewItems = useMemo(
    () =>
      feedback
        .filter((f) => f.channel === "Google" || f.channel === "Yelp")
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 12),
    []
  );

  const baseItems = useMemo(() => {
    if (inboxOverlay?.items && (!inboxOverlay.tab || inboxOverlay.tab === tab)) {
      return inboxOverlay.items;
    }
    return tab === "reviews" ? reviewItems : surveyItems;
  }, [inboxOverlay, tab, reviewItems, surveyItems]);

  const items = useMemo(() => {
    let list = baseItems;
    const vals = (type) => activeFilters.filter((f) => f.type === type).map((f) => f.value);
    const cats = vals("category");
    const platforms = vals("platform");
    const groups = vals("group");
    const locs = vals("location");
    const statuses = vals("status");
    const ratingMin = vals("ratingMin")[0];
    const ratingMax = vals("ratingMax")[0];
    if (ratingMin) list = list.filter((i) => i.rating >= ratingMin);
    if (ratingMax) list = list.filter((i) => i.rating <= ratingMax);
    if (cats.length) list = list.filter((i) => cats.includes(i.category));
    if (platforms.length) list = list.filter((i) => platforms.includes(i.channel));
    if (groups.length) {
      const groupLocIds = new Set(locationIdsForGroups(groups));
      list = list.filter((i) => groupLocIds.has(i.locationId));
    }
    if (locs.length) list = list.filter((i) => locs.includes(i.locationId));
    if (statuses.length) {
      list = list.filter((i) =>
        statuses.some((s) => (s === "responded" ? i.responded : s === "flagged" ? i.flagged : !i.responded))
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((i) => i.name.toLowerCase().includes(q) || i.comment.toLowerCase().includes(q));
    }
    return list;
  }, [baseItems, activeFilters, query]);

  const unreadOf = (item) => unreadIds.has(item.id) || extraUnread.has(item.id);
  const newCount = inboxOverlay?.newCount ?? items.filter(unreadOf).length;
  const inboxSubtitle = inboxOverlay?.subtitle ?? `${newCount} New Responses`;

  const toggleDraft = (type, value, label, single = false) => {
    setDraft((cur) => {
      const exists = cur.some((f) => f.type === type && f.value === value);
      if (single) {
        const without = cur.filter((f) => f.type !== type);
        return exists ? without : [...without, { type, value, label }];
      }
      return exists ? cur.filter((f) => !(f.type === type && f.value === value)) : [...cur, { type, value, label }];
    });
  };
  const isDrafted = (type, value) => draft.some((f) => f.type === type && f.value === value);
  const openFilters = () => { setDraft(activeFilters); setFilterOpen(true); };
  const removeFilter = (f) => setActiveFilters((cur) => cur.filter((x) => !(x.type === f.type && x.value === f.value)));

  return (
    <div className="screen inbox-screen">
      <header className="app-topbar">
        <h2>Inbox</h2>
        <p>{inboxSubtitle}</p>
      </header>

      <div className="seg-tabs">
        <button
          className={`seg ${tab === "surveys" ? "active" : ""}`}
          type="button"
          onClick={() => {
            const next = new URLSearchParams(searchParams);
            next.set("tab", "surveys");
            setSearchParams(next);
          }}
        >
          Surveys
        </button>
        <button
          className={`seg ${tab === "reviews" ? "active" : ""}`}
          type="button"
          onClick={() => {
            const next = new URLSearchParams(searchParams);
            next.set("tab", "reviews");
            setSearchParams(next);
          }}
        >
          Reviews
        </button>
      </div>

      <div className="inbox-list">
        {items.map((item) => {
          const unread = unreadOf(item);
          return (
            <button
              key={item.id}
              className={`inbox-item ${tab === "surveys" ? "is-survey" : ""} ${unread ? (item.sentiment === "negative" ? "unread-crit" : "unread") : ""}`}
              type="button"
              onClick={() => {
                onMarkRead(item.id);
                setExtraUnread((cur) => {
                  if (!cur.has(item.id)) return cur;
                  const next = new Set(cur);
                  next.delete(item.id);
                  return next;
                });
                navigate(`/inbox/review/${item.id}`);
              }}
            >
              {unread && tab === "reviews" ? (
                <span
                  className={`inbox-unread-dot ${item.sentiment === "negative" ? "crit" : ""}`}
                  aria-hidden
                />
              ) : null}
              {tab === "reviews" ? <ChannelLogo channel={item.channel} /> : null}
              <div className="inbox-main">
                <div className="row-top">
                  <strong className="row-name">{item.name}</strong>
                  <span className="row-time">{toRelativeDate(item.timestamp)}</span>
                </div>
                <div className="row-meta">
                  <ScoreBadge rating={item.rating} />
                  <span className={`tag-chip ${chipClass(item.rating)}`}>{shortCategory(item.category)}</span>
                  <span className={`tag-chip more ${chipClass(item.rating)}`}>+{moreCount(item)}</span>
                </div>
                {tab === "reviews" ? <p className="row-preview">{item.comment}</p> : null}
              </div>
            </button>
          );
        })}
        {items.length === 0 ? <p className="empty-list">No feedback matches your filters.</p> : null}
      </div>

      <div className="inbox-float">
        <div className="quick-actions">
          <button type="button" className={filterOpen ? "on" : ""} onClick={openFilters}><IconSearch width={17} height={17} /></button>
          <span className="qa-divider" />
          <button type="button" className={activeFilters.length ? "on" : ""} onClick={openFilters}><IconSliders width={17} height={17} /></button>
        </div>

        {activeFilters.length ? (
          <div className="active-filters">
            {activeFilters.map((f) => (
              <button className="filter-chip" type="button" key={`${f.type}-${f.value}`} onClick={() => removeFilter(f)}>
                {f.label} <span className="x">×</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {filterOpen ? (
        <FilterSheet
          draft={draft}
          isDrafted={isDrafted}
          toggleDraft={toggleDraft}
          onClear={() => setDraft([])}
          onApply={() => { setActiveFilters(draft); setFilterOpen(false); }}
          onClose={() => setFilterOpen(false)}
          searchQuery={query}
          onSearchQueryChange={setQuery}
          searchPlaceholder={tab === "reviews" ? "Search reviews…" : "Search surveys…"}
        />
      ) : null}

      <BottomNav active="inbox" />
    </div>
  );
}

// ── detail ──

function TimelineChip({ icon: Icon, color, label }) {
  return (
    <div className="tl-chip">
      <span className={`tl-icon ${color}`}><Icon width={13} height={13} /></span>
      <span>{label}</span>
    </div>
  );
}

function TimelineBubble({ name, time, text, avatar, outgoing }) {
  return (
    <div className={`tl-bubble ${outgoing ? "outgoing" : ""}`}>
      {!outgoing ? <span className={`tl-avatar ${avatar}`}>{avatar === "ai" ? "🌶️" : <IconProfile width={18} height={18} />}</span> : null}
      <div className="tl-bubble-body">
        <div className="tl-bubble-head">
          <strong>{name}</strong>
          <span>{time}</span>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}

const REPLY_TEMPLATES = [
  { name: "Apology — Service Issue", body: "Thank you for sharing this with us. We're truly sorry your visit didn't meet expectations. We've shared your feedback with the team and are taking steps to make it right." },
  { name: "Thank You — Positive Review", body: "Thank you so much for the kind words! We're thrilled you had a great experience and can't wait to welcome you back soon." },
  { name: "Service Recovery", body: "We sincerely apologize for the experience you described. We'd love the opportunity to make it up to you — please reach out so we can make things right." },
  { name: "We'd Love You Back", body: "We appreciate your honest feedback and would love a chance to win you back. We've sent a little something your way — we hope to see you again soon." },
  { name: "General Response", body: "Thank you for taking the time to share your feedback. We truly value your input and are always working to improve." }
];

const REWARD_OPTIONS = [
  "$10 off next order",
  "$25 off next order",
  "$50 off next order",
  "Free Pretzel Bites",
  "Free Dessert",
  "Free Appetizer"
];

const REWARD_EXPIRATIONS = ["30 Days", "45 Days", "60 Days", "90 Days"];

function AddRewardOverlay({ onClose, onAttach, initial }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(initial?.reward ?? "$25 off next order");
  const [expiration, setExpiration] = useState(initial?.expiration ?? "30 Days");
  const list = REWARD_OPTIONS.filter((r) => r.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet reward-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="compose-head">
          <h4>Add Reward</h4>
          <button className="circle-btn ghost" type="button" onClick={onClose}>
            <IconX width={18} height={18} />
          </button>
        </div>

        <div className="sheet-search">
          <IconSearch width={18} height={18} />
          <input placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="reward-list">
          {list.map((r) => (
            <button
              key={r}
              type="button"
              className={`reward-item ${selected === r ? "on" : ""}`}
              onClick={() => setSelected(r)}
            >
              <span className="radio" />
              {r}
            </button>
          ))}
        </div>

        <span className="filter-group-label">Expiration</span>
        <div className="exp-chips">
          {REWARD_EXPIRATIONS.map((e) => (
            <button
              key={e}
              type="button"
              className={`pick-chip ${expiration === e ? "on" : ""}`}
              onClick={() => setExpiration(e)}
            >
              {e}
            </button>
          ))}
        </div>

        <p className="reward-note">This reward is sent in a separate email. It's not attached to this message.</p>

        <button className="btn-primary" type="button" onClick={() => onAttach({ reward: selected, expiration })}>
          Attach Reward
        </button>
      </div>
    </div>
  );
}

function UseTemplateOverlay({ onClose, onPick }) {
  const [query, setQuery] = useState("");
  const list = REPLY_TEMPLATES.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet template-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="compose-head">
          <h4>Use Template</h4>
          <button className="circle-btn ghost" type="button" onClick={onClose}>
            <IconX width={18} height={18} />
          </button>
        </div>

        <div className="sheet-search">
          <IconSearch width={18} height={18} />
          <input placeholder="Search templates…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="template-list">
          {list.map((t) => (
            <button key={t.name} type="button" className="template-item" onClick={() => onPick(t.body)}>
              <IconTemplate width={18} height={18} />
              <span>
                <strong>{t.name}</strong>
                <em>{t.body}</em>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReplyComposer({ isReview, aiText, onClose }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [reward, setReward] = useState(null);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet compose-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="compose-head">
          <div>
            <h4>Reply to {isReview ? "Review" : "Guest"}</h4>
            <p>Craft a response, use a template, or let AI work its magic!</p>
          </div>
          <button className="circle-btn ghost" type="button" onClick={onClose}>
            <IconX width={18} height={18} />
          </button>
        </div>

        <div className="compose-options">
          <button type="button" className="reply-option" onClick={() => setText(aiText)}>
            <IconSparkle width={16} height={16} />
            Write with AI
          </button>
          <button type="button" className="reply-option" onClick={() => setTemplateOpen(true)}>
            <IconTemplate width={16} height={16} />
            Use Template
          </button>
        </div>

        <div className="compose-editor">
          <textarea
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {!isReview ? (
            <button type="button" className={`add-reward ${reward ? "attached" : ""}`} onClick={() => setRewardOpen(true)}>
              {reward ? `✓ ${reward.reward.replace(" next order", "")}` : "Add Reward"}
            </button>
          ) : null}
        </div>

        <button
          className="btn-primary send-email"
          type="button"
          disabled={!text.trim() || sent}
          onClick={() => { setSent(true); setTimeout(onClose, 600); }}
        >
          {sent ? "Sent!" : "Send"}
        </button>
      </div>

      {templateOpen ? (
        <UseTemplateOverlay
          onClose={() => setTemplateOpen(false)}
          onPick={(body) => { setText(body); setTemplateOpen(false); }}
        />
      ) : null}

      {!isReview && rewardOpen ? (
        <AddRewardOverlay
          initial={reward}
          onClose={() => setRewardOpen(false)}
          onAttach={(r) => { setReward(r); setRewardOpen(false); }}
        />
      ) : null}
    </div>
  );
}

function fullDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function statusVariant(item) {
  if (item.rating <= 2) return { cls: "error", label: "Error", sub: "Your reply failed to publish", Icon: IconInfo };
  if (item.rating === 3) return { cls: "pending", label: "Pending", sub: "Your reply is being published", Icon: IconRefresh };
  return { cls: "success", label: "Published", sub: "Your reply is now public", Icon: IconSend };
}

function reviewFactors(item) {
  const pos = item.sentiment === "positive";
  if (pos) {
    return ["Freshness of Ingredients", "Topping Distribution", "Appearance", "Flavor", "Temperature", "Friendliness", "Texture (crispiness)", "Spice/Flavor", "Attentiveness"].map((t) => ({ t, pos: true }));
  }
  return [shortCategory(item.category), "Wait Time", "Order Accuracy", "Greeting", "Incorrect Order"].map((t) => ({ t, pos: false }));
}

function hasPhotos() {
  return true;
}

const RESTAURANT_PHOTOS = [
  "photo-1568901346375-23c9450c58cd", // burger
  "photo-1513104890138-7c749659a591", // pizza
  "photo-1571091718767-18b5b1457add", // burger & fries
  "photo-1414235077428-338989a2e8c0", // restaurant interior
  "photo-1517248135467-4c7edcad34c4", // restaurant interior
  "photo-1552566626-52f8b828add9", // dining room
  "photo-1565299624946-b28f40a0ae38", // pizza slice
  "photo-1546069901-ba9599a7e63c", // salad bowl
  "photo-1559339352-11d035aa65de", // plated dish
  "photo-1504674900247-0877df9cc836", // food spread
  "photo-1466978913421-dad2ebd01d17", // cafe interior
  "photo-1550966871-3ed3cdb5ed0c" // burger close up
];

function photoUrl(id, w, h) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=80`;
}

function ReviewPhotos({ seed }) {
  const start = (seed.charCodeAt(seed.length - 1) + seed.length) % RESTAURANT_PHOTOS.length;
  const pick = (n) => RESTAURANT_PHOTOS[(start + n) % RESTAURANT_PHOTOS.length];
  return (
    <div className="photo-grid">
      <div className="pg-main" style={{ backgroundImage: `url(${photoUrl(pick(0), 320, 280)})` }} />
      <div className="pg-side">
        <div className="pg-cell" style={{ backgroundImage: `url(${photoUrl(pick(1), 200, 140)})` }} />
        <div className="pg-cell more" style={{ backgroundImage: `url(${photoUrl(pick(2), 200, 140)})` }}>
          <span>+3</span>
        </div>
      </div>
    </div>
  );
}

function ReviewDetailsScreen({ item }) {
  const [composeOpen, setComposeOpen] = useState(false);
  const st = statusVariant(item);
  const factors = reviewFactors(item);
  const aiText = item.aiDraft ?? "Thank you so much for taking the time to share your experience. We truly value your feedback and are always working to improve.";
  const firstName = item.name.split(" ")[0];
  const responseText = item.sentiment === "positive"
    ? `Hey ${firstName}! We're thrilled our team provided you with such an awesome experience! If we can do anything to ensure your next meal is a 5-star visit, please let our team know. We look forward to welcoming you back soon!`
    : `Hi ${firstName}, thank you for sharing this with us — we're sorry your visit fell short. We've passed your feedback to the location team and would love the chance to make it right on your next visit.`;
  const responseDate = item.respondedAt ? fullDate(item.respondedAt) : fullDate(item.timestamp);

  return (
    <div className="screen detail-screen review-details-screen">
      <header className="review-topbar">
        <button className="circle-btn" type="button" onClick={() => window.history.back()}>
          <IconBack width={20} height={20} />
        </button>
        <div className="rt-center">
          <h2>{item.name}</h2>
          <div className="rt-sub">
            <span className={`metric-badge ${scoreClass(item.rating)}`}>{item.rating}<span className="badge-star">★</span></span>
            <span className="social-badge">
              <ChannelLogo channel={item.channel} />
              {item.channel}
            </span>
          </div>
        </div>
        <button className="circle-btn" type="button">
          <IconExternal width={18} height={18} />
        </button>
      </header>

      <div className="review-scroll">
        <div className={`review-toast ${st.cls}`}>
          <span className="toast-icon"><st.Icon width={16} height={16} /></span>
          <div className="toast-body">
            <strong>{st.label}</strong>
            <span>{st.sub}</span>
          </div>
        </div>

        <h3 className="section-title">Review Details</h3>
        <div className="surface-card rd-card">
          <div className="rd-grid">
            <div className="field-readout dark"><span>Date</span><strong>{fullDate(item.timestamp)}</strong></div>
            <div className="field-readout dark"><span>Reviewer</span><strong>{item.name}</strong></div>
            <div className="field-readout dark">
              <span>Platform</span>
              <span className="platform-chip"><ChannelLogo channel={item.channel} />{item.channel}</span>
            </div>
            <div className="field-readout dark"><span>Rating</span><ScoreBadge rating={item.rating} large /></div>
          </div>
          <div className="ri-divider" />
          <div className="ri-factors">
            {factors.map((f, i) => (
              <span key={i} className={`factor-pill ${f.pos ? "pos" : "neg"}`}>{f.t}</span>
            ))}
          </div>
        </div>

        <div className="surface-card review-card">
          <span className="rc-label">Review</span>
          <p className="rc-text">{item.comment}</p>
          {hasPhotos(item) ? <ReviewPhotos seed={item.id} /> : null}
          <div className="ri-divider" />
          <span className="rc-label">Tags</span>
          <p className="no-tags">No tags applied</p>
          <button className="edit-tags" type="button">Edit Tags</button>
        </div>

        {st.cls !== "pending" ? (
          <>
            <h3 className="section-title">Reply</h3>
            <div className="surface-card response-card">
              <div className="response-head">
                <span className="rc-label">Response</span>
                <span className="response-date">{responseDate}</span>
              </div>
              <p className="rc-text">{responseText}</p>
            </div>
          </>
        ) : null}
      </div>

      <div className="reply-bar">
        <button className="btn-primary" type="button" onClick={() => setComposeOpen(true)}>
          Reply to Review
        </button>
      </div>

      {composeOpen ? (
        <ReplyComposer isReview aiText={aiText} onClose={() => setComposeOpen(false)} />
      ) : null}

      <BottomNav active="inbox" />
    </div>
  );
}

function ReviewDetailScreen() {
  const { feedbackId } = useParams();
  const item = getFeedbackById(feedbackId) ?? feedback[0];
  const isReview = item.channel === "Google" || item.channel === "Yelp";
  const [composeOpen, setComposeOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [tab, setTab] = useState("chat");

  if (isReview) return <ReviewDetailsScreen item={item} />;

  const title = isReview ? item.name : "janedoe@xyz.com";
  const aiText = item.aiDraft ?? "Hi there, thank you so much for taking the time to share this feedback with us. We truly appreciate it and are always working to improve.";

  return (
    <div className="screen detail-screen">
      <header className="detail-topbar">
        <button className="circle-btn" type="button" onClick={() => window.history.back()}>
          <IconBack width={20} height={20} />
        </button>
        <div className="detail-title">
          <h2>{title}</h2>
          <div className="detail-sub">
            <ScoreBadge rating={item.rating} />
            <span className="tag-chip chip-neu">{isReview ? item.channel : "Drive Thru"}</span>
          </div>
        </div>
        <button className="circle-btn" type="button" onClick={() => setActionOpen(true)}>
          <IconMore width={20} height={20} />
        </button>
      </header>

      <div className="seg-tabs">
        <button className={`seg ${tab === "chat" ? "active" : ""}`} type="button" onClick={() => setTab("chat")}>
          Chat
        </button>
        <button className={`seg ${tab === "survey" ? "active" : ""}`} type="button" onClick={() => setTab("survey")}>
          Survey Details
        </button>
      </div>

      {tab === "chat" ? (
        <section className="timeline-wrap">
          <div className="timeline-track">
            <div className="tl-line-bg" />
            <div className="tl-date">Nov. 12</div>
            <TimelineChip icon={IconSend} color="green" label="Business Reply Sent" />
            <TimelineBubble avatar="ai" name="AI Reply" time="4:23 PM" text={aiText} />
            <div className="tl-date">Yesterday</div>
            <TimelineChip icon={IconThumbsUp} color="green" label="Guest Satisfied" />
            <TimelineBubble avatar="user" name={item.name} time="4:23 PM" text="I appreciate the rapid response! I will give you another chance soon." />
            <TimelineBubble outgoing name="Manual Reply" time="4:31 PM" text="Sounds great! Look forward to seeing you back soon." />
            <div className="tl-date">Today</div>
            <TimelineChip icon={IconRefresh} color="green" label="You were mentioned" />
          </div>
        </section>
      ) : (
        <section className="survey-wrap">
          <h3 className="section-title">Experience Details</h3>
          <div className="surface-card">
            <div className="exp-grid">
              <div className="field-readout"><span>Date</span><strong>Oct 29, 2025</strong></div>
              <div className="field-readout"><span>Time</span><strong>9:35 AM</strong></div>
              <div className="field-readout"><span>Channel</span><strong>Drive-Thru</strong></div>
              <div className="field-readout"><span>Daypart</span><strong>Breakfast</strong></div>
              <div className="field-readout"><span>Location</span><strong>West End Plaza</strong></div>
              <div className="field-readout"><span>Questionnaire</span><strong>Test w/ Reward</strong></div>
            </div>
          </div>

          <h3 className="section-title">Order Details</h3>
          <div className="surface-card order-card">
            <div className="exp-grid">
              <div className="field-readout"><span>Order Number</span><strong className="break">7529cd5d-5c5a-448d-b5fd-5bb8259295bb</strong></div>
              <div className="field-readout"><span>Order Amount</span><strong>$63.93</strong></div>
              <div className="field-readout"><span>Referral Source</span><strong>Toast</strong></div>
              <div className="field-readout"><span>Delivery</span><strong>Yes</strong></div>
            </div>
            <div className="order-divider" />
            <div className="order-items">
              {[
                { name: "Extra Dressings", rating: 5, mods: "Anthony's Pesto Ranch (2oz)|Anthony's Pesto Ranch (2oz)|Anthony's Pesto Ranch (2oz)|Anthony's Pesto Ranch (2oz)" },
                { name: 'NY "Wedge"', rating: 3, mods: "Bacon*|Croutons|Tomato|Ranch|Blue Cheese Crumble|Red Onion (L)|Ranch Dressing*|No Garlic Bread" },
                { name: '18" Neapolitan', rating: 3, mods: "Jalapeños (L)|Fresh Basil (L)|Red Onion (L)|Crispy Pepperoni (L)" }
              ].map((it, i) => (
                <div className="order-item" key={i}>
                  <div className="order-item-head">
                    <span className="order-item-name">{it.name}</span>
                    <ScoreBadge rating={it.rating} />
                  </div>
                  <p className="order-item-mods">{it.mods}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="section-title">Ratings</h3>
          <div className="surface-card ratings-card">
            <RatingItem label="CER" rating={1} />
            <RatingItem
              label="Food Quality"
              rating={4}
              factors={[{ t: "Temperature", pos: true }, { t: "Taste", pos: true }]}
              comment="My second time eating here. I thought I'd give it another try as the first time the burger was dry and tasteless, fries were lukewarm and a bit soggy."
            />
            <RatingItem
              label="Speed of Service"
              rating={2}
              factors={[{ t: "Waiting for Order" }, { t: "Payment Processing" }, { t: "Waiting in Line" }]}
            />
            <RatingItem label="Accuracy" rating={3} />
          </div>

          <h3 className="section-title">Additional Feedback</h3>
          <div className="surface-card qa-card">
            {[
              { q: "How often do you go to restaurants and bars?", a: "Once a day" },
              { q: "How often do you come to Brand Name?", a: "This is my first time!" },
              { q: "How did you hear about us?", a: "Friend/Co-worker" },
              { q: "What did you order today?", a: "Classic Cheeseburger" },
              { q: "What was your wait time today?", a: "15-20 minutes" },
              { q: "What's your age?", a: "30" }
            ].map((row, i) => (
              <div className="qa-row" key={i}>
                <p>{row.q}</p>
                <strong>{row.a}</strong>
              </div>
            ))}
          </div>

          <h3 className="section-title">Tags</h3>
          <div className="surface-card">
            <div className="tag-wrap">
              <span className="factor-pill neg">Food Quality</span>
              <span className="factor-pill neg">Speed</span>
              <span className="factor-pill pos">Friendly Staff</span>
            </div>
          </div>
        </section>
      )}

      <div className="reply-bar">
        <button className="btn-primary" type="button" onClick={() => setComposeOpen(true)}>
          Reply
        </button>
      </div>

      {composeOpen ? (
        <ReplyComposer
          isReview={isReview}
          aiText={aiText}
          onClose={() => setComposeOpen(false)}
        />
      ) : null}

      {actionOpen ? (
        <div className="overlay" onClick={() => setActionOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <button className="sheet-item" type="button">View Incident Summary</button>
            <button className="sheet-item" type="button">Add Tags</button>
            <button className="sheet-item" type="button">Mark as Resolved</button>
            <button className="sheet-item danger" type="button">Flag Feedback</button>
            <button className="sheet-item cancel" type="button" onClick={() => setActionOpen(false)}>Cancel</button>
          </div>
        </div>
      ) : null}

      <BottomNav active="inbox" />
    </div>
  );
}

// ── objective progress ring ──

function ProgressRing({ value, start, target }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min((value - start) / (target - start), 1));
  return (
    <svg className="ring" viewBox="0 0 120 120" width="120" height="120">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#e5e5e5" strokeWidth="10" />
      <circle
        cx="60" cy="60" r={r} fill="none" stroke="#0071e8" strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${frac * c} ${c}`}
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="67" textAnchor="middle" className="ring-text">{value}%</text>
    </svg>
  );
}

const ACTION_ITEMS = [
  {
    id: "ai1",
    num: 1,
    date: "June 1, 2026",
    body: "Incomplete soda delivery was raised in a recent survey — one guest noted that across two delivery orders, they consistently received only one of the two soda bottles they ordered. Repeated order inaccuracies may make guests trust the ordering process less.",
    done: false,
    sources: [
      {
        tone: "orange",
        title: "Guest Response",
        text: "On my last 2 delivery orders I ordered two bottles of soda. Each time I received only one bottle of soda."
      }
    ]
  },
  {
    id: "ai2",
    num: 2,
    date: "June 1, 2026",
    body: "Team Members are not always attentive to guest needs in accordance with the VIP Experience. Reinforce “Every Guest, Every Time” positioning by training Team Members to maintain one-foot proximity to tables and stay within a 5-foot section radius to support guest needs across the entire floor.",
    done: false,
    sources: [
      {
        tone: "orange",
        title: "Training Material",
        text: "VIP Experience standard: maintain one-foot proximity to tables and stay within a 5-foot section radius at all times. Use the “Every Guest, Every Time” positioning card during pre-shift huddles."
      },
      {
        tone: "blue",
        title: "Guest Response",
        text: "Waited a while before anyone checked on our table. The staff seemed busy and we had to flag someone down just to get refills."
      },
      {
        tone: "blue",
        title: "Guest Response",
        text: "Food was good, but service felt a little inattentive during the lunch rush. Took a while to get our check."
      },
      {
        tone: "orange",
        title: "Training Material",
        text: "Survey question “How attentive was our staff?” scored below target across the last reporting period. Review the attentiveness role-play module with the dinner team."
      },
      {
        tone: "neutral",
        title: "AI Coach Boundaries",
        text: "This action item focuses on in-store service behaviors and team training only. It does not change scheduling, staffing levels, or compensation. Escalate those topics to your district manager."
      }
    ]
  },
  {
    id: "ai3",
    num: 3,
    date: "May 28, 2026",
    body: "Multiple guests mentioned that fries and other fried sides arrived lukewarm during the dinner daypart. Review holding times and station hand-offs so hot items reach guests at temperature.",
    done: false,
    sources: [
      {
        tone: "orange",
        title: "Training Material",
        text: "Fry holding time should not exceed 7 minutes before quality and temperature noticeably drop. Review the hot-holding SOP with the dinner shift."
      },
      {
        tone: "blue",
        title: "Guest Response",
        text: "The burger was great but the fries were lukewarm by the time they reached our table. A little disappointing."
      }
    ]
  }
];

const FACTOR_DATA = [
  {
    name: "Texture",
    risk: 60,
    opp: 18,
    reviews: [
      { rating: 4, email: "melissa.bouga@gmail.com", time: "3 Days Ago", comment: "My order was accurate but the bread felt a little stale and was hard to bite into, so my breakfast sandwich was tougher than I'd like.", tags: ["Freshness", "Texture"] },
      { rating: 2, email: "dan.whitfield@outlook.com", time: "5 Days Ago", comment: "The fries were soggy and the bun was mushy. The texture really let the whole meal down this visit.", tags: ["Freshness", "Texture"] },
      { rating: 5, email: "george.m@icloud.com", time: "2 Wks Ago", comment: "Everything had the perfect crunch — crispy fries and a freshly toasted bun. Exactly how it should be.", tags: ["Freshness", "Texture"] },
      { rating: 3, email: "priya.nair@yahoo.com", time: "3 Wks Ago", comment: "Burger was fine but the lettuce was wilted and the patty felt a bit rubbery in places.", tags: ["Temperature", "Texture"] },
      { rating: 1, email: "sara.lopez@gmail.com", time: "1 Mo Ago", comment: "The chicken was dry and chewy, almost impossible to cut. Won't be ordering that sandwich again.", tags: ["Freshness", "Temperature", "Texture"] }
    ]
  },
  {
    name: "Taste",
    risk: 30,
    opp: 45,
    reviews: [
      { rating: 5, email: "natalie.reyes@gmail.com", time: "2 Days Ago", comment: "The seasoning on the new sandwich is perfect. So much flavor in every bite — easily my favorite menu item now.", tags: ["Seasoning", "Taste"] },
      { rating: 4, email: "tom.becker@outlook.com", time: "6 Days Ago", comment: "Really tasty overall. The sauce makes the whole thing. Only wish it had a touch more spice.", tags: ["Taste"] },
      { rating: 2, email: "ana.cruz@yahoo.com", time: "2 Wks Ago", comment: "Pretty bland this time around. The fries needed salt and the burger felt under-seasoned.", tags: ["Seasoning", "Taste"] },
      { rating: 3, email: "kevin.li@icloud.com", time: "3 Wks Ago", comment: "Flavor was okay but nothing special. It tasted a little different from my usual order.", tags: ["Freshness", "Taste"] },
      { rating: 1, email: "rachel.gomez@gmail.com", time: "1 Mo Ago", comment: "The shake tasted off and the burger was way too salty. Couldn't finish it.", tags: ["Seasoning", "Taste"] }
    ]
  },
  {
    name: "Temperature",
    risk: 48,
    opp: 22,
    reviews: [
      { rating: 2, email: "mgonz53@cox.net", time: "4 Days Ago", comment: "Food arrived lukewarm. The fries were cold by the time I got home even though I live five minutes away.", tags: ["Temperature", "Wait Time"] },
      { rating: 1, email: "susanlphillips1@msn.com", time: "1 Wk Ago", comment: "My burger was completely cold in the middle. Had to microwave it which ruined the texture.", tags: ["Temperature", "Texture"] },
      { rating: 5, email: "derek.shah@gmail.com", time: "2 Wks Ago", comment: "Order came out piping hot and fresh. You can tell it was made to order — really impressed.", tags: ["Freshness", "Temperature"] },
      { rating: 3, email: "lauren.kim@outlook.com", time: "3 Wks Ago", comment: "The hot items were warm enough but the shake was already half melted when it reached me.", tags: ["Temperature", "Wait Time"] },
      { rating: 4, email: "omar.haddad@yahoo.com", time: "1 Mo Ago", comment: "Mostly hot and fresh, just the fries cooled down a bit faster than expected.", tags: ["Temperature"] }
    ]
  }
];

function ratingKind(r) {
  if (r >= 5) return "rk-excellent";
  if (r === 4) return "rk-good";
  if (r === 3) return "rk-neutral";
  if (r === 2) return "rk-poor";
  return "rk-critical";
}

function AddActionItemSheet({ onClose, onCreate }) {
  const [text, setText] = useState("");
  const valid = text.trim().length > 0;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet add-action-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="ais-head">
          <div className="ais-title">
            <h3>Add Action Item</h3>
          </div>
          <button className="circle-btn ghost" type="button" onClick={onClose}>
            <IconX width={18} height={18} />
          </button>
        </div>
        <div className="compose-editor add-action-editor">
          <textarea
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
        </div>
        <button
          className="btn-primary large-cta"
          type="button"
          disabled={!valid}
          onClick={() => {
            onCreate(text.trim());
            onClose();
          }}
        >
          Create Action Item
        </button>
      </div>
    </div>
  );
}

function ActionItemSheet({ item, onClose, onComplete }) {
  const [srcIdx, setSrcIdx] = useState(0);
  useEffect(() => {
    setSrcIdx(0);
  }, [item.id]);
  const hasSources = item.sources && item.sources.length > 0;
  const src = hasSources ? item.sources[Math.min(srcIdx, item.sources.length - 1)] : null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet action-item-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="ais-head">
          <div className="ais-title">
            <div className="ais-title-row">
              <h3>Action Item #{item.num}</h3>
              <IconSparkle width={15} height={15} />
            </div>
            <p>Created by AI Coach on {item.date}</p>
          </div>
          <button className="circle-btn ghost" type="button" onClick={onClose}>
            <IconX width={18} height={18} />
          </button>
        </div>
        <div className="ais-divider" />
        <p className="ais-body">{item.body}</p>
        {hasSources ? (
          <>
            <div className="ais-chips">
              {item.sources.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className={`ais-chip ${s.tone} ${i === srcIdx ? "active" : ""}`}
                  onClick={() => setSrcIdx(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="ais-source">
              <strong>{src.title}</strong>
              <p>{src.text}</p>
            </div>
          </>
        ) : null}
        {item.done ? (
          <button className="btn-primary large-cta is-done" type="button" disabled>
            <IconCheck width={17} height={12} /> Completed
          </button>
        ) : (
          <button
            className="btn-primary large-cta"
            type="button"
            onClick={() => {
              onComplete(item.id);
              onClose();
            }}
          >
            <IconCheck width={17} height={12} /> Mark Complete
          </button>
        )}
      </div>
    </div>
  );
}

function FactorReviewsScreen({ factor, onClose }) {
  return (
    <div className="factor-detail-screen">
      <header className="factor-topbar">
        <button className="circle-btn ghost" type="button" onClick={onClose}>
          <IconBack width={18} height={18} />
        </button>
        <div className="ft-center">
          <h2>{factor.name}</h2>
          <p>Last 90 Days</p>
        </div>
        <span className="ft-spacer" />
      </header>
      <div className="factor-scroll">
        {factor.reviews.map((rv, i) => (
          <div className="factor-review-card" key={i}>
            <div className="frc-head">
              <span className={`rating-badge ${ratingKind(rv.rating)}`}>
                {rv.rating}
                <span className="rb-star">★</span>
              </span>
              <span className="frc-time">{rv.time}</span>
            </div>
            <p className="frc-email">{rv.email}</p>
            <p className="frc-text">{rv.comment}</p>
            <div className="frc-tags">
              {rv.tags.map((t, j) => (
                <span key={j} className={`frc-tag ${rv.rating >= 4 ? "pos" : "neg"}`}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="todo" />
    </div>
  );
}

function MultiSelectDropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  const label = (() => {
    if (!value.length) return placeholder;
    if (value.length === options.length) return "All Groups";
    if (value.length === 1) return options.find((o) => o.value === value[0])?.label ?? placeholder;
    return `${value.length} Groups`;
  })();

  const toggle = (optValue) => {
    const exists = value.includes(optValue);
    onChange(exists ? value.filter((v) => v !== optValue) : [...value, optValue]);
  };

  return (
    <>
      <button className={`dropdown ${open ? "open" : ""}`} type="button" onClick={() => setOpen(true)}>
        {label}
        <IconChevronDown width={18} height={18} />
      </button>
      {open ? (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="sheet group-picker-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="compose-head">
              <h4>Select Groups</h4>
              <button className="circle-btn ghost" type="button" onClick={() => setOpen(false)}>
                <IconX width={18} height={18} />
              </button>
            </div>
            <div className="filter-list group-picker-list">
              {options.map((opt) => {
                const on = value.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`filter-list-row ${on ? "on" : ""}`}
                    onClick={() => toggle(opt.value)}
                  >
                    <span className={`opt-check ${on ? "on" : ""}`} />
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <div className="filter-foot">
              <button className="btn-primary apply-filters" type="button" onClick={() => setOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function GroupTrendArrow({ up }) {
  return (
    <span className={`metric-trend ${up ? "up" : "down"}`}>
      {up ? (
        <IconArrowUp width={16} height={16} strokeWidth={2.8} />
      ) : (
        <IconArrowDown width={16} height={16} strokeWidth={2.8} />
      )}
    </span>
  );
}

function ToDoScreen() {
  const [searchParams] = useSearchParams();
  const todoOverlay = getNoticeScenario(searchParams.get("notice"))?.todo;
  const [view, setView] = useState(() => (searchParams.get("view") === "groups" ? "groups" : "store"));
  const [groupsTab, setGroupsTab] = useState(() => todoOverlay?.groupsTab ?? "objectives");
  const [selectedGroups, setSelectedGroups] = useState(() => groupsFromSearchParams(searchParams));
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [items, setItems] = useState(() => ACTION_ITEMS.map((a) => ({ ...a })));
  const [addOpen, setAddOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeFactor, setActiveFactor] = useState(null);

  const remaining = items.filter((i) => !i.done).length;
  const activeItem = items.find((i) => i.id === activeId) || null;
  const selectedLocation = selectedLocationId ? locations.find((l) => l.id === selectedLocationId) : null;
  const overlayMeta = todoOverlay?.locationMeta?.[selectedLocation?.id];
  const storeMeta = selectedLocation
    ? { ...LOCATION_TODO_META[selectedLocation.id], ...overlayMeta }
    : { objective: "Order Accuracy", focus: "Special Instructions", start: 71, progress: 73, target: 87, status: "on-track" };

  const completeItem = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: true } : i)));

  const createItem = (text) =>
    setItems((prev) => [
      ...prev,
      { id: `ai${Date.now()}`, num: prev.length + 1, date: "June 4, 2026", body: text, done: false, sources: [] }
    ]);

  const visibleLocationIds = useMemo(() => locationIdsForGroups(selectedGroups), [selectedGroups]);

  const groupRows = useMemo(() => {
    const goal = 80;
    return locations
      .filter((loc) => visibleLocationIds.includes(loc.id))
      .map((loc, i) => {
        const meta = { ...LOCATION_TODO_META[loc.id], ...(todoOverlay?.locationMeta?.[loc.id] || {}) };
        if (groupsTab === "objectives") {
          return {
            id: loc.id,
            name: locationShortName(loc),
            goal: meta.target,
            score: meta.progress,
            up: meta.progress >= meta.start
          };
        }
        const overlayStatus = todoOverlay?.locationMeta?.[loc.id]?.status;
        const onTrack = overlayStatus ? overlayStatus !== "off-track" : loc.cer >= goal;
        if (groupsTab === "on-track" && !onTrack) return null;
        if (groupsTab === "off-track" && onTrack) return null;
        return {
          id: loc.id,
          name: locationShortName(loc),
          goal,
          score: loc.cer,
          up: i % 3 !== 0
        };
      })
      .filter(Boolean);
  }, [visibleLocationIds, groupsTab, todoOverlay]);

  const openLocation = (locId) => {
    setSelectedLocationId(locId);
    setView("location");
  };

  const showStoreContent = view === "store" || view === "location";
  const topTitle = view === "location" && selectedLocation
    ? locationShortName(selectedLocation)
    : view === "store"
      ? "To-Do List"
      : (todoOverlay?.title ?? "March Objectives");
  const topSubtitle = view === "location" && selectedLocation
    ? selectedLocation.manager
    : view === "groups"
      ? (todoOverlay?.subtitle ?? "25 Days Left")
      : "25 Days Left";

  return (
    <div className="screen todo-screen">
      <header className="app-topbar">
        {view === "location" ? (
          <button
            className="circle-btn ghost todo-back"
            type="button"
            onClick={() => {
              setView("groups");
              setSelectedLocationId(null);
            }}
          >
            <IconBack width={18} height={18} />
          </button>
        ) : null}
        <div className="todo-topbar-copy">
          <h2>{topTitle}</h2>
          <p>{topSubtitle}</p>
        </div>
      </header>

      <div className="seg-tabs">
        <button
          className={`seg ${view === "store" ? "active" : ""}`}
          type="button"
          onClick={() => {
            setView("store");
            setSelectedLocationId(null);
          }}
        >
          My Store
        </button>
        <button
          className={`seg ${view === "groups" || view === "location" ? "active" : ""}`}
          type="button"
          onClick={() => {
            setView("groups");
            setSelectedLocationId(null);
          }}
        >
          Groups
        </button>
      </div>

      <div className="scroll-area">
        {showStoreContent ? (
          <>
            <section className="surface-card objective-card">
              <div className="objective-head">
                <div>
                  <h3>Monthly Objective</h3>
                  <p>{storeMeta.objective}</p>
                </div>
                <span className={`status-pill ${storeMeta.status}`}>{storeMeta.status === "on-track" ? "On Track" : "Off Track"}</span>
              </div>
              <div className="objective-ring">
                <div className="ring-side">
                  <strong>{storeMeta.start}%</strong>
                  <span>Start</span>
                </div>
                <ProgressRing value={storeMeta.progress} start={storeMeta.start} target={storeMeta.target} />
                <div className="ring-side">
                  <strong>{storeMeta.target}%</strong>
                  <span>Target</span>
                </div>
              </div>
              <div className="objective-footer">
                <strong>Focus Area</strong>
                <span>{storeMeta.focus}</span>
              </div>
            </section>

            <section className="surface-card">
              <div className="card-head">
                <div>
                  <h3>Action Items</h3>
                  <p>{remaining} Remaining</p>
                </div>
                <button className="circle-btn sm" type="button" onClick={() => setAddOpen(true)}>
                  <IconPlus width={20} height={20} />
                </button>
              </div>
              <div className="todo-list">
                {items.map((item) => (
                  <button className="todo-item" key={item.id} type="button" onClick={() => setActiveId(item.id)}>
                    <span className={`checkbox ${item.done ? "done" : ""}`}>
                      {item.done ? <IconCheck width={14} height={14} /> : null}
                    </span>
                    <span className={`todo-text ${item.done ? "done" : ""}`}>{item.body}</span>
                    <span className="chev"><IconChevronRight width={18} height={18} /></span>
                  </button>
                ))}
              </div>
            </section>

            <section className="surface-card">
              <h3 className="card-title">Factors</h3>
              <div className="factor-list">
                {FACTOR_DATA.map((f) => (
                  <button className="factor-row" key={f.name} type="button" onClick={() => setActiveFactor(f)}>
                    <div className="factor-title">{f.name}</div>
                    <div className="factor-bar">
                      <span className="risk" style={{ width: `${f.risk}%` }} />
                      <span className="opp" style={{ width: `${f.opp}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <MultiSelectDropdown
              placeholder="Select Group"
              options={GROUP_FILTER_OPTIONS}
              value={selectedGroups}
              onChange={setSelectedGroups}
            />
            <div className="seg-tabs group-sub-tabs three-col">
              <button
                className={`seg ${groupsTab === "objectives" ? "active" : ""}`}
                type="button"
                onClick={() => setGroupsTab("objectives")}
              >
                Objectives
              </button>
              <button
                className={`seg ${groupsTab === "on-track" ? "active" : ""}`}
                type="button"
                onClick={() => setGroupsTab("on-track")}
              >
                On Track
              </button>
              <button
                className={`seg ${groupsTab === "off-track" ? "active" : ""}`}
                type="button"
                onClick={() => setGroupsTab("off-track")}
              >
                Off Track
              </button>
            </div>
            <section className="surface-card group-card">
              <div className="group-head">
                <span>Location</span>
                <span>{groupsTab === "objectives" ? "Progress" : "Current Score"}</span>
              </div>
              {groupRows.length === 0 ? (
                <p className="empty-list group-empty">No locations match this view.</p>
              ) : (
                groupRows.map((row) => (
                  <button className="group-row" key={row.id} type="button" onClick={() => openLocation(row.id)}>
                    <div className="group-loc">
                      <strong>{row.name}</strong>
                      <div className="goal-bar">
                        <span className={pctClass(row.score)} style={{ width: `${Math.min(row.score, 100)}%` }} />
                      </div>
                      <small>Goal: {row.goal}%</small>
                    </div>
                    <GroupTrendArrow up={row.up} />
                    <span className={`score-pill ${pctClass(row.score)}`}>{row.score}%</span>
                  </button>
                ))
              )}
            </section>
          </>
        )}
      </div>

      <BottomNav active="todo" />

      {addOpen ? <AddActionItemSheet onClose={() => setAddOpen(false)} onCreate={createItem} /> : null}
      {activeItem ? (
        <ActionItemSheet item={activeItem} onClose={() => setActiveId(null)} onComplete={completeItem} />
      ) : null}
      {activeFactor ? (
        <FactorReviewsScreen factor={activeFactor} onClose={() => setActiveFactor(null)} />
      ) : null}
    </div>
  );
}

// ── performance ──

function ValBadge({ value, unit, star, kind, lg, trend }) {
  const badge = (
    <span className={`val-badge ${kind} ${lg ? "lg" : ""}`}>
      {value}
      {star ? <span className="vb-star">★</span> : null}
      {unit ? <span className="vb-unit">{unit}</span> : null}
    </span>
  );
  if (!trend || lg) return badge;
  return (
    <div className="metric-badge-wrap">
      <span className={`metric-trend ${trend}`}>
        {trend === "up" ? (
          <IconArrowUp width={16} height={16} strokeWidth={2.8} />
        ) : (
          <IconArrowDown width={16} height={16} strokeWidth={2.8} />
        )}
      </span>
      {badge}
    </div>
  );
}

function RankPill({ rank, total, kind }) {
  return (
    <span className={`rank-pill ${kind}`}>
      <b>#{rank}</b>
      <small>/{total}</small>
    </span>
  );
}

function PerfChart({ yTicks, line, fmt }) {
  const W = 322;
  const H = 178;
  const padL = 28;
  const padR = 4;
  const padT = 10;
  const padB = 22;
  const yMax = Math.max(...yTicks);
  const yMin = Math.min(...yTicks);
  const bars = [0.32, 0.5, 0.28, 0.62, 0.42, 0.7, 0.96, 0.52, 0.78, 0.46, 0.4, 0.6, 0.34, 0.24];
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const yAt = (v) => padT + ((yMax - v) / (yMax - yMin)) * plotH;
  const n = line.length;
  const xAt = (i) => padL + plotW * (i / (n - 1));
  const barW = (plotW / n) * 0.5;
  const pts = line.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(" ");
  return (
    <svg className="perf-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="cerLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e0a83a" />
          <stop offset="0.14" stopColor="#4ba64e" />
          <stop offset="1" stopColor="#4ba64e" />
        </linearGradient>
      </defs>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} y1={yAt(t)} x2={W - padR} y2={yAt(t)} stroke="#ededed" strokeWidth="1" />
          <text x={padL - 6} y={yAt(t) + 3.5} textAnchor="end" className="chart-axis">{fmt(t)}</text>
        </g>
      ))}
      {bars.map((b, i) => {
        const bh = b * plotH;
        return <rect key={i} x={xAt(i) - barW / 2} y={padT + plotH - bh} width={barW} height={bh} rx="2" fill="#ececec" />;
      })}
      <polyline points={pts} fill="none" stroke="url(#cerLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x={xAt(0)} y={H - 5} textAnchor="start" className="chart-axis">3/2</text>
      <text x={xAt(Math.floor(n / 2))} y={H - 5} textAnchor="middle" className="chart-axis">4/20</text>
      <text x={xAt(n - 1)} y={H - 5} textAnchor="end" className="chart-axis">6/1</text>
    </svg>
  );
}

const PERF_METRICS = {
  cer: {
    title: "My CER",
    badge: { value: "4.04", star: true, kind: "good" },
    rank: { rank: "13", total: "14", kind: "bad" },
    companyLabel: "Company CER",
    company: { value: "4.29", star: true, kind: "good" },
    legend: "CER",
    yTicks: [4.4, 3.9, 3.4, 2.9, 2.5],
    line: [2.55, 3.45, 3.85, 3.7, 4.0, 4.2, 4.28, 4.05, 3.8, 4.05, 4.0, 3.92, 4.06, 4.12],
    fmt: (v) => v.toFixed(1)
  },
  score: {
    title: "My Score",
    badge: { value: "82", unit: "%", kind: "good" },
    rank: { rank: "7", total: "14", kind: "mid" },
    companyLabel: "Company Score",
    company: { value: "85", unit: "%", kind: "good" },
    legend: "Score",
    yTicks: [90, 80, 70, 60, 50],
    line: [54, 66, 72, 70, 78, 83, 86, 80, 76, 82, 80, 79, 83, 84],
    fmt: (v) => `${Math.round(v)}`
  },
  top: {
    title: "My Top Box",
    badge: { value: "64", unit: "%", kind: "mid" },
    rank: { rank: "9", total: "14", kind: "bad" },
    companyLabel: "Company Top Box",
    company: { value: "68", unit: "%", kind: "good" },
    legend: "Top Box",
    yTicks: [80, 70, 60, 50, 40],
    line: [42, 52, 58, 55, 62, 66, 70, 64, 60, 66, 63, 62, 66, 67],
    fmt: (v) => `${Math.round(v)}`
  }
};

const OPERATIONAL_CATEGORIES = [
  { rank: 1, name: "Ordering Process", score: 67, highlight: true, trend: "down" },
  { rank: 2, name: "Delivery Driver", score: 72, trend: "up" },
  { rank: 3, name: "Food Quality", score: 79, trend: "up" },
  { rank: 4, name: "Speed of Service", score: 81, trend: "down" },
  { rank: 5, name: "Accuracy", score: 82, trend: "up" },
  { rank: 6, name: "Online Ordering", score: 91, trend: "up" },
  { rank: 7, name: "Hospitality", score: 96, trend: "up" },
  { rank: 8, name: "Cleanliness", score: 100, trend: "up" },
  { rank: 9, name: "Atmosphere", score: 100, trend: "up" }
];

const DAYPART_REPORTS = [
  {
    name: "Lunch",
    hours: "9:00am - 2:00pm",
    metrics: [
      { label: "CER", value: "4.0", star: true, kind: "good" },
      { label: "Score", value: "90", unit: "%", kind: "good" },
      { label: "Top Box", value: "56", unit: "%", kind: "mid" },
      { label: "Incidents", value: "4", kind: "bad" },
      { label: "Surveys", value: "9", kind: "neutral" }
    ]
  },
  {
    name: "Mid-Shift",
    hours: "2:00pm - 5:00pm",
    metrics: [
      { label: "CER", value: "4.2", star: true, kind: "good" },
      { label: "Score", value: "83", unit: "%", kind: "good" },
      { label: "Top Box", value: "73", unit: "%", kind: "good" },
      { label: "Incidents", value: "3", kind: "bad" },
      { label: "Surveys", value: "15", kind: "neutral" }
    ]
  },
  {
    name: "Dinner",
    hours: "5:00pm - 12:00am",
    metrics: [
      { label: "CER", value: "4.0", star: true, kind: "good" },
      { label: "Score", value: "82", unit: "%", kind: "good" },
      { label: "Top Box", value: "63", unit: "%", kind: "mid" },
      { label: "Incidents", value: "19", kind: "bad" },
      { label: "Surveys", value: "67", kind: "neutral" }
    ]
  }
];

const CHANNEL_REPORTS = [
  {
    name: "Dine-In",
    metrics: [
      { label: "CER", value: "5.0", star: true, kind: "good" },
      { label: "Score", value: "100", unit: "%", kind: "good" },
      { label: "Top Box", value: "100", unit: "%", kind: "good" },
      { label: "Surveys", value: "4", kind: "neutral" },
      { label: "Incidents", value: "0", kind: "bad" }
    ]
  },
  {
    name: "Take-Out",
    metrics: [
      { label: "CER", value: "4.5", star: true, kind: "good" },
      { label: "Score", value: "92", unit: "%", kind: "good" },
      { label: "Top Box", value: "78", unit: "%", kind: "good" },
      { label: "Surveys", value: "51", kind: "neutral" },
      { label: "Incidents", value: "6", kind: "bad" }
    ]
  },
  {
    name: "Delivery",
    metrics: [
      { label: "CER", value: "3.2", star: true, kind: "mid" },
      { label: "Score", value: "69", unit: "%", kind: "mid" },
      { label: "Top Box", value: "39", unit: "%", kind: "bad" },
      { label: "Surveys", value: "36", kind: "neutral" },
      { label: "Incidents", value: "20", kind: "bad" }
    ]
  }
];

const reportItems = [
  { id: "categories", label: "Operational Categories", icon: IconCategories },
  { id: "dayparts", label: "Dayparts", icon: IconDayparts },
  { id: "channels", label: "Channels", icon: IconChannels }
];

function pctBadgeKind(score) {
  if (score >= 91) return "excellent";
  if (score >= 70) return "good";
  return "mid";
}

function ReportScreenShell({ title, subtitle, onClose, children, scrollClass = "" }) {
  return (
    <div className="report-detail-screen">
      <header className="factor-topbar">
        <button className="circle-btn ghost" type="button" onClick={onClose}>
          <IconBack width={18} height={18} />
        </button>
        <div className="ft-center">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <span className="ft-spacer" />
      </header>
      <div className={`report-scroll ${scrollClass}`.trim()}>{children}</div>
      <BottomNav active="stats" />
    </div>
  );
}

function MetricTile({ label, value, star, unit, kind, trend }) {
  return (
    <div className="metric-tile">
      <span>{label}</span>
      <ValBadge value={value} star={star} unit={unit} kind={kind} trend={trend} />
    </div>
  );
}

function OperationalCategoriesReport({ subtitle, onClose }) {
  return (
    <ReportScreenShell
      title="Operational Categories"
      subtitle={subtitle}
      onClose={onClose}
      scrollClass="report-scroll-opcat"
    >
      <section className="surface-card opcat-card">
        <div className="opcat-head">
          <span>Rank</span>
          <span>Average Score</span>
        </div>
        <div className="opcat-scroll">
          {OPERATIONAL_CATEGORIES.map((row) => (
            <div className="opcat-row" key={row.name}>
              <span className={`rank-num ${row.highlight ? "hot" : ""}`}>{row.rank}</span>
              <span className={`opcat-name ${row.highlight ? "hot" : ""}`}>{row.name}</span>
              <ValBadge value={String(row.score)} unit="%" kind={pctBadgeKind(row.score)} trend={row.trend} />
            </div>
          ))}
        </div>
      </section>
    </ReportScreenShell>
  );
}

function DaypartsReport({ subtitle, onClose }) {
  return (
    <ReportScreenShell title="Dayparts" subtitle={subtitle} onClose={onClose}>
      {DAYPART_REPORTS.map((dp) => (
        <section className="surface-card daypart-report-card" key={dp.name}>
          <div className="daypart-report-head">
            <h3>{dp.name}</h3>
            <p>{dp.hours}</p>
          </div>
          <div className="daypart-report-metrics">
            {dp.metrics.map((m) => (
              <MetricTile key={m.label} {...m} />
            ))}
          </div>
        </section>
      ))}
    </ReportScreenShell>
  );
}

function ChannelsReport({ subtitle, onClose }) {
  return (
    <ReportScreenShell title="Channels" subtitle={subtitle} onClose={onClose}>
      {CHANNEL_REPORTS.map((ch) => (
        <section className="surface-card daypart-report-card" key={ch.name}>
          <div className="daypart-report-head">
            <h3>{ch.name}</h3>
          </div>
          <div className="daypart-report-metrics">
            {ch.metrics.map((m) => (
              <MetricTile key={m.label} {...m} />
            ))}
          </div>
        </section>
      ))}
    </ReportScreenShell>
  );
}

const reviewPlatforms = [
  { name: "Google", channel: "Google", count: "23", rating: "4.6", kind: "score-good" },
  { name: "Yelp", channel: "Yelp", count: "7", rating: "2.7", kind: "score-warn" }
];

const SENTIMENT_INSIGHTS = [
  { name: "Hospitality", mentions: "19", rate: "37", positive: "89", positiveKind: "good", negative: "11", reviews: "11" },
  { name: "Pizza Quality", mentions: "11", rate: "27", positive: "91", positiveKind: "good", negative: "9", reviews: "11" },
  { name: "Food Quality", mentions: "7", rate: "17", positive: "100", positiveKind: "excellent", negative: "0", reviews: "7" },
  { name: "Server", mentions: "4", rate: "9", positive: "100", positiveKind: "excellent", negative: "0", reviews: "4" },
  { name: "Speed of Service", mentions: "4", rate: "7", positive: "67", positiveKind: "mid", negative: "33", reviews: "4" }
];

function sentimentMetrics(item) {
  return [
    { label: "Total Mentions", value: item.mentions, kind: "neutral" },
    { label: "Mention Rate", value: item.rate, unit: "%", kind: "neutral" },
    { label: "Positive", value: item.positive, unit: "%", kind: item.positiveKind },
    { label: "Negative", value: item.negative, unit: "%", kind: "good" },
    { label: "Reviews", value: item.reviews, kind: "neutral" }
  ];
}

function ReviewMetricTile({ label, value, unit, kind }) {
  return (
    <div className="review-metric-tile">
      <span className="review-metric-label">{label}</span>
      <ValBadge value={value} unit={unit} kind={kind} />
    </div>
  );
}

function PerformanceScreen() {
  const [searchParams] = useSearchParams();
  const initialFilters = statsFiltersFromSearchParams(searchParams);
  const statsOverlay = getNoticeScenario(searchParams.get("notice"))?.stats;
  const [tab, setTab] = useState(() => (searchParams.get("tab") === "reviews" ? "reviews" : "surveys"));
  const [metric, setMetric] = useState("cer");
  const [filterOpen, setFilterOpen] = useState(false);
  const [draft, setDraft] = useState(() => [...initialFilters]);
  const [activeFilters, setActiveFilters] = useState(() => [...initialFilters]);
  const [activeReport, setActiveReport] = useState(null);
  const perfMetric = metric === "cer" && statsOverlay?.cer ? statsOverlay.cer : PERF_METRICS[metric];
  const incident = {
    value: "29",
    kind: "good",
    rank: "12",
    total: "14",
    rankKind: "bad",
    company: "21",
    note: "Lower incident rates indicate better customer experience recovery",
    ...statsOverlay?.incidentRate
  };
  const recoveryRate = {
    value: "15",
    kind: "bad",
    rank: "6",
    total: "14",
    rankKind: "mid",
    ...statsOverlay?.recoveryRate
  };
  const recoveryRevenue = {
    value: "$264",
    kind: "good",
    note: "*Estimated value of customer relationships saved through incident resolution",
    ...statsOverlay?.recoveryRevenue
  };
  const platforms = statsOverlay?.reviewPlatforms ?? reviewPlatforms;
  const responseRate = {
    value: "73",
    kind: "good",
    replies: "22 / 30",
    ...statsOverlay?.responseRate
  };
  const locationFilters = activeFilters.filter((f) => f.type === "location");
  const locationLabel =
    locationFilters.length === 0
      ? "All Locations"
      : locationFilters.length === 1
        ? locationFilters[0].label
        : `${locationFilters.length} Locations`;
  const statsSection = searchParams.get("section");

  useEffect(() => {
    if (statsSection === "incident-rate" || statsSection === "recovery") {
      setTab("surveys");
    }
  }, [statsSection]);

  useEffect(() => {
    if (tab !== "surveys") return;
    const targetId =
      statsSection === "incident-rate"
        ? "stats-incident-rate"
        : statsSection === "recovery"
          ? "stats-recovery"
          : null;
    if (!targetId) return;

    const timer = window.setTimeout(() => {
      const el = document.getElementById(targetId);
      const scroller = el?.closest(".perf-scroll");
      if (!el || !scroller) return;
      const elRect = el.getBoundingClientRect();
      const scRect = scroller.getBoundingClientRect();
      scroller.scrollTo({
        top: scroller.scrollTop + (elRect.top - scRect.top) - 8,
        behavior: "smooth"
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [statsSection, tab, statsOverlay]);

  const toggleDraft = (type, value, label, single = false) => {
    setDraft((cur) => {
      const exists = cur.some((f) => f.type === type && f.value === value);
      if (single) {
        const without = cur.filter((f) => f.type !== type);
        return exists ? without : [...without, { type, value, label }];
      }
      return exists ? cur.filter((f) => !(f.type === type && f.value === value)) : [...cur, { type, value, label }];
    });
  };
  const isDrafted = (type, value) => draft.some((f) => f.type === type && f.value === value);
  const openFilters = () => { setDraft([...activeFilters]); setFilterOpen(true); };
  const removeFilter = (f) => setActiveFilters((cur) => cur.filter((x) => !(x.type === f.type && x.value === f.value)));

  return (
    <div className="screen performance-screen">
      <header className="app-topbar">
        <h2>Stats</h2>
        <p>{tab === "reviews" ? (statsOverlay?.reviewSubtitle ?? "30 Reviews") : (statsOverlay?.surveySubtitle ?? "91 Surveys")}</p>
      </header>

      <div className="seg-tabs">
        <button className={`seg ${tab === "surveys" ? "active" : ""}`} type="button" onClick={() => setTab("surveys")}>Surveys</button>
        <button className={`seg ${tab === "reviews" ? "active" : ""}`} type="button" onClick={() => setTab("reviews")}>Reviews</button>
      </div>

      <div className="scroll-area perf-scroll">
        {tab === "surveys" ? (
          <>
            <section className="surface-card perf-hero">
              <div className="metric-seg">
                {[
                  { key: "cer", label: "CER" },
                  { key: "score", label: "Score" },
                  { key: "top", label: "Top Box" }
                ].map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    className={`metric-seg-item ${metric === m.key ? "active" : ""}`}
                    onClick={() => setMetric(m.key)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="perf-hero-main">
                <h3>{perfMetric.title}</h3>
                <ValBadge value={perfMetric.badge.value} star={perfMetric.badge.star} unit={perfMetric.badge.unit} kind={perfMetric.badge.kind} lg />
              </div>

              <div className="stat-divider" />

              <div className="stat-rows">
                <div className="stat-row">
                  <span>Location Rank</span>
                  <RankPill rank={perfMetric.rank.rank} total={perfMetric.rank.total} kind={perfMetric.rank.kind} />
                </div>
                <div className="stat-row">
                  <span>{perfMetric.companyLabel}</span>
                  <ValBadge value={perfMetric.company.value} star={perfMetric.company.star} unit={perfMetric.company.unit} kind={perfMetric.company.kind} />
                </div>
              </div>

              <div className="stat-divider" />

              <div className="chart-legend">
                <span className="lg-item"><span className="lg-dot" /> {perfMetric.legend}</span>
                <span className="lg-item"><span className="lg-bar" /> Surveys</span>
              </div>
              <PerfChart yTicks={perfMetric.yTicks} line={perfMetric.line} fmt={perfMetric.fmt} />
            </section>

            <section id="stats-incident-rate" className="surface-card stat-card stats-anchor">
              <div className="stat-card-head">
                <h3>Incident Rate</h3>
                <ValBadge value={incident.value} unit="%" kind={incident.kind} lg />
              </div>
              <div className="stat-divider" />
              <div className="stat-rows">
                <div className="stat-row">
                  <span>Location Rank</span>
                  <RankPill rank={incident.rank} total={incident.total} kind={incident.rankKind} />
                </div>
                <div className="stat-row">
                  <span>Company Incident Rate</span>
                  <ValBadge value={incident.company} unit="%" kind="good" />
                </div>
              </div>
              <div className="stat-divider" />
              <p className="stat-note">{incident.note}</p>
            </section>

            <div id="stats-recovery" className="stats-anchor">
              <section className="surface-card stat-card">
                <div className="stat-card-head">
                  <h3>Recovery Rate</h3>
                  <ValBadge value={recoveryRate.value} unit="%" kind={recoveryRate.kind} lg />
                </div>
                <div className="stat-divider" />
                <div className="stat-rows">
                  <div className="stat-row">
                    <span>Location Rank</span>
                    <RankPill rank={recoveryRate.rank} total={recoveryRate.total} kind={recoveryRate.rankKind} />
                  </div>
                </div>
              </section>

              <section className="surface-card stat-card">
                <div className="stat-card-head">
                  <h3>Recovery Revenue*</h3>
                  <ValBadge value={recoveryRevenue.value} kind={recoveryRevenue.kind} lg />
                </div>
                <p className="stat-note">{recoveryRevenue.note}</p>
              </section>
            </div>

            <h3 className="reports-title">Reports</h3>
            <div className="report-list">
              {reportItems.map(({ id, label, icon: Icon }) => (
                <button className="report-item" type="button" key={id} onClick={() => setActiveReport(id)}>
                  <span className="report-icon"><Icon /></span>
                  <span className="report-label">{label}</span>
                  <span className="report-chev"><IconChevronRight width={16} height={16} /></span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <section className="surface-card hero-card">
              <h3>My Average</h3>
              <StarBadge value={statsOverlay?.reviewAverage ?? "4.02"} kind={statsOverlay?.reviewAverageKind ?? "score-good"} large />
              <div className="hero-divider" />
              <div className="hero-row">
                <span>Competitors' Avg.</span>
                <StarBadge value={statsOverlay?.competitorAverage ?? "3.7"} kind={statsOverlay?.competitorKind ?? "score-mid"} />
              </div>
            </section>

            <section className="surface-card platform-card">
              <h3 className="card-title">Reviews by Platform</h3>
              {platforms.map((p) => (
                <div className="platform-row" key={p.name}>
                  <ChannelLogo channel={p.channel} />
                  <strong>{p.name}</strong>
                  <span className="count-chip">{p.count}</span>
                  <StarBadge value={p.rating} kind={p.kind} />
                </div>
              ))}
            </section>

            <section className="surface-card response-rate-card">
              <h3>Response Rate</h3>
              <ValBadge value={responseRate.value} unit="%" kind={responseRate.kind} lg />
              <div className="hero-divider" />
              <div className="hero-row">
                <span>Total Replies</span>
                <span className="replies-chip">{responseRate.replies}</span>
              </div>
            </section>

            <h3 className="sentiment-title">Sentiment Insights</h3>
            {SENTIMENT_INSIGHTS.map((item) => (
              <section className="surface-card sentiment-card" key={item.name}>
                <h3>{item.name}</h3>
                <div className="review-category-metrics">
                  {sentimentMetrics(item).map((m) => (
                    <ReviewMetricTile key={m.label} {...m} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>

      <div className="perf-float">
        <div className="quick-actions solo">
          <button type="button" onClick={openFilters}>
            <IconSliders width={17} height={17} />
          </button>
        </div>
        {activeFilters.length ? (
          <div className="active-filters">
            {activeFilters.map((f) => (
              <button
                className="filter-chip"
                type="button"
                key={`${f.type}-${f.value}`}
                onClick={() => removeFilter(f)}
              >
                {f.label} <span className="x">×</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {filterOpen ? (
        <FilterSheet
          groups={STATS_FILTER_GROUPS}
          showSearch={false}
          draft={draft}
          isDrafted={isDrafted}
          toggleDraft={toggleDraft}
          onApply={() => { setActiveFilters(draft); setFilterOpen(false); }}
          onClose={() => setFilterOpen(false)}
        />
      ) : null}

      {activeReport === "categories" ? (
        <OperationalCategoriesReport subtitle={locationLabel} onClose={() => setActiveReport(null)} />
      ) : null}
      {activeReport === "dayparts" ? (
        <DaypartsReport subtitle={locationLabel} onClose={() => setActiveReport(null)} />
      ) : null}
      {activeReport === "channels" ? (
        <ChannelsReport subtitle={locationLabel} onClose={() => setActiveReport(null)} />
      ) : null}

      <BottomNav active="stats" />
    </div>
  );
}

function Toggle({ on, onClick }) {
  return (
    <button type="button" className={`toggle ${on ? "on" : ""}`} onClick={onClick} aria-pressed={on}>
      <span className="toggle-knob" />
    </button>
  );
}

const DEFAULT_NOTIF_PREFS = {
  quietEnabled: true,
  quietStart: "10:00 PM",
  quietEnd: "6:00 AM",
  quietBadge: "7:30 PM - 4 AM",
  critical: {
    positiveFeedback: true,
    guestIssues: false,
    guestReply: true,
    objectiveReminders: false
  },
  celebrations: {
    guestRecovered: true,
    revenueRecovered: true,
    streakMilestone: true,
    cerRecord: true,
    benchmarkingWin: true
  },
  summaries: {
    morningBriefing: true,
    eveningSummary: true
  },
  engagement: {
    after48Hours: true,
    after2Weeks: false
  }
};

function countOff(obj) {
  return Object.values(obj).filter((v) => !v).length;
}

function NotificationTopBar({ title, subtitle, onBack }) {
  return (
    <header className="notif-topbar">
      <button className="circle-btn ghost" type="button" onClick={onBack}>
        <IconBack width={18} height={18} />
      </button>
      <div className="ft-center">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <span className="ft-spacer" />
    </header>
  );
}

function NotifStatusBadge({ children, kind = "info" }) {
  return <span className={`notif-status-badge ${kind}`}>{children}</span>;
}

function NotifNavCard({ title, description, badge, badgeKind, onClick }) {
  return (
    <button className="notif-nav-card" type="button" onClick={onClick}>
      <div className="notif-nav-copy">
        <div className="notif-nav-title-row">
          <strong>{title}</strong>
          {badge ? <NotifStatusBadge kind={badgeKind}>{badge}</NotifStatusBadge> : null}
        </div>
        {description ? <p>{description}</p> : null}
      </div>
      <span className="notif-nav-chev">
        <IconChevronRight width={14} height={14} />
      </span>
    </button>
  );
}

function NotifToggleLine({ title, description, on, onToggle }) {
  return (
    <div className="notif-toggle-line">
      <div className="notif-toggle-copy">
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </div>
      <Toggle on={on} onClick={onToggle} />
    </div>
  );
}

function NotifTimeRow({ label, value }) {
  return (
    <div className="notif-time-row">
      <span>{label}</span>
      <span className="notif-time-value">{value}</span>
    </div>
  );
}

function NotificationsFlow({ onClose, isDark }) {
  const [view, setView] = useState("main");
  const [prefs, setPrefs] = useState(() => structuredClone(DEFAULT_NOTIF_PREFS));
  const [systemBanner] = useState(true);

  const setCritical = (key, value) =>
    setPrefs((p) => ({ ...p, critical: { ...p.critical, [key]: value } }));
  const setCelebrations = (key, value) =>
    setPrefs((p) => ({ ...p, celebrations: { ...p.celebrations, [key]: value } }));
  const setSummaries = (key, value) =>
    setPrefs((p) => ({ ...p, summaries: { ...p.summaries, [key]: value } }));
  const setEngagement = (key, value) =>
    setPrefs((p) => ({ ...p, engagement: { ...p.engagement, [key]: value } }));

  const criticalOff = countOff(prefs.critical);
  const engagementOff = countOff(prefs.engagement);

  const resetSection = (section) => {
    setPrefs((p) => ({ ...p, [section]: structuredClone(DEFAULT_NOTIF_PREFS[section]) }));
  };
  const resetAll = () => setPrefs(structuredClone(DEFAULT_NOTIF_PREFS));

  const back = () => {
    if (view === "main") onClose();
    else setView("main");
  };

  const shellClass = `notif-flow-screen ${isDark ? "profile-dark" : ""}`;

  if (view === "quiet") {
    return (
      <div className={shellClass}>
        <NotificationTopBar title="Quiet Hours" subtitle="Settings / Notifications" onBack={back} />
        <div className="notif-scroll">
          <section className="surface-card notif-settings-card">
            <NotifToggleLine
              title="Quiet Hours"
              on={prefs.quietEnabled}
              onToggle={() => setPrefs((p) => ({ ...p, quietEnabled: !p.quietEnabled }))}
            />
            {prefs.quietEnabled ? (
              <>
                <div className="notif-inner-divider" />
                <NotifTimeRow label="Start" value={prefs.quietStart} />
                <div className="notif-inner-divider" />
                <NotifTimeRow label="End" value={prefs.quietEnd} />
              </>
            ) : null}
          </section>
          <p className="notif-footnote">
            Notifications are silenced during these hours. You&apos;ll see them when quiet hours end.
          </p>
        </div>
        <BottomNav active="profile" />
      </div>
    );
  }

  if (view === "critical") {
    return (
      <div className={shellClass}>
        <NotificationTopBar title="Critical Alerts" subtitle="Settings / Notifications" onBack={back} />
        <div className="notif-scroll">
          <section className="surface-card notif-settings-card">
            <NotifToggleLine
              title="Positive Feedback"
              description="4–5 star surveys and reviews"
              on={prefs.critical.positiveFeedback}
              onToggle={() => setCritical("positiveFeedback", !prefs.critical.positiveFeedback)}
            />
            <div className="notif-inner-divider" />
            <NotifToggleLine
              title="Guest Issues"
              description="Negative experiences and bad reviews"
              on={prefs.critical.guestIssues}
              onToggle={() => setCritical("guestIssues", !prefs.critical.guestIssues)}
            />
            <div className="notif-inner-divider" />
            <NotifToggleLine
              title="New Guest Reply"
              description="Guest replies to your messages"
              on={prefs.critical.guestReply}
              onToggle={() => setCritical("guestReply", !prefs.critical.guestReply)}
            />
          </section>
          <section className="surface-card notif-settings-card compact">
            <NotifToggleLine
              title="Objective / Task Reminders"
              on={prefs.critical.objectiveReminders}
              onToggle={() => setCritical("objectiveReminders", !prefs.critical.objectiveReminders)}
            />
          </section>
          <button className="notif-reset-btn" type="button" onClick={() => resetSection("critical")}>
            Reset to Default
          </button>
        </div>
        <BottomNav active="profile" />
      </div>
    );
  }

  if (view === "celebrations") {
    return (
      <div className={shellClass}>
        <NotificationTopBar title="Celebrations" subtitle="Settings / Notifications" onBack={back} />
        <div className="notif-scroll">
          <section className="surface-card notif-settings-card">
            <NotifToggleLine
              title="Guest Recovered"
              description="When an unhappy guest returns"
              on={prefs.celebrations.guestRecovered}
              onToggle={() => setCelebrations("guestRecovered", !prefs.celebrations.guestRecovered)}
            />
            <div className="notif-inner-divider" />
            <NotifToggleLine
              title="Revenue Recovered"
              description="Revenue from unhappy guests who return"
              on={prefs.celebrations.revenueRecovered}
              onToggle={() => setCelebrations("revenueRecovered", !prefs.celebrations.revenueRecovered)}
            />
            <div className="notif-inner-divider" />
            <NotifToggleLine
              title="Streak Milestone"
              description="Celebrates consecutive login streaks"
              on={prefs.celebrations.streakMilestone}
              onToggle={() => setCelebrations("streakMilestone", !prefs.celebrations.streakMilestone)}
            />
            <div className="notif-inner-divider" />
            <NotifToggleLine
              title="CER Record"
              description="Alerts when your CER hits a 90-day high"
              on={prefs.celebrations.cerRecord}
              onToggle={() => setCelebrations("cerRecord", !prefs.celebrations.cerRecord)}
            />
            <div className="notif-inner-divider" />
            <NotifToggleLine
              title="Benchmarking Win"
              description="Weekly alert when your rank improves"
              on={prefs.celebrations.benchmarkingWin}
              onToggle={() => setCelebrations("benchmarkingWin", !prefs.celebrations.benchmarkingWin)}
            />
          </section>
          <button className="notif-reset-btn" type="button" onClick={() => resetSection("celebrations")}>
            Reset to Default
          </button>
        </div>
        <BottomNav active="profile" />
      </div>
    );
  }

  if (view === "summaries") {
    return (
      <div className={shellClass}>
        <NotificationTopBar title="Summaries" subtitle="Settings / Notifications" onBack={back} />
        <div className="notif-scroll">
          <section className="surface-card notif-settings-card">
            <NotifToggleLine
              title="Morning Briefing"
              on={prefs.summaries.morningBriefing}
              onToggle={() => setSummaries("morningBriefing", !prefs.summaries.morningBriefing)}
            />
            <div className="notif-inner-divider" />
            <NotifToggleLine
              title="Evening Summary"
              on={prefs.summaries.eveningSummary}
              onToggle={() => setSummaries("eveningSummary", !prefs.summaries.eveningSummary)}
            />
          </section>
          <p className="notif-footnote">
            Morning Briefing at 7:30 AM shows your pending to-do items, and the Evening Summary at 8:30 PM shows daily
            performance changes.
          </p>
          <button className="notif-reset-btn" type="button" onClick={() => resetSection("summaries")}>
            Reset to Default
          </button>
        </div>
        <BottomNav active="profile" />
      </div>
    );
  }

  if (view === "engagement") {
    return (
      <div className={shellClass}>
        <NotificationTopBar title="Engagement" subtitle="Settings / Notifications" onBack={back} />
        <div className="notif-scroll">
          <section className="surface-card notif-settings-card">
            <NotifToggleLine
              title="After 48 Hours"
              on={prefs.engagement.after48Hours}
              onToggle={() => setEngagement("after48Hours", !prefs.engagement.after48Hours)}
            />
            <div className="notif-inner-divider" />
            <NotifToggleLine
              title="After 2 Weeks"
              on={prefs.engagement.after2Weeks}
              onToggle={() => setEngagement("after2Weeks", !prefs.engagement.after2Weeks)}
            />
          </section>
          <p className="notif-footnote">
            Get a reminder to check Tattle if you haven&apos;t opened the app in a while.
          </p>
          <button className="notif-reset-btn" type="button" onClick={() => resetSection("engagement")}>
            Reset to Default
          </button>
        </div>
        <BottomNav active="profile" />
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <NotificationTopBar title="Notifications" subtitle="Settings" onBack={back} />
      <div className="notif-scroll">
        {systemBanner ? (
          <button className="notif-system-banner" type="button">
            <div className="notif-system-copy">
              <div className="notif-system-title">
                <IconBell width={18} height={18} />
                <strong>System Notifications are Off</strong>
              </div>
              <p>To receive these alerts, enable notifications in your device settings.</p>
            </div>
            <IconChevronRight width={14} height={14} />
          </button>
        ) : null}

        <NotifNavCard
          title="Quiet Hours"
          badge={prefs.quietBadge}
          badgeKind="info"
          onClick={() => setView("quiet")}
        />

        <div className="notif-nav-stack">
          <NotifNavCard
            title="Critical Alerts"
            description="New responses, incidents, objectives, and more..."
            badge={criticalOff ? `${criticalOff} Turned Off` : null}
            badgeKind="danger"
            onClick={() => setView("critical")}
          />
          <NotifNavCard
            title="Celebrations"
            description="New guests recovered, CER records, and more..."
            onClick={() => setView("celebrations")}
          />
          <NotifNavCard
            title="Daily Summaries"
            description="performance briefing and task reminders"
            onClick={() => setView("summaries")}
          />
          <NotifNavCard
            title="Login Reminders"
            description="Check-ins after prolonged inactivity"
            badge={engagementOff ? `${engagementOff} Turned Off` : null}
            badgeKind="danger"
            onClick={() => setView("engagement")}
          />
        </div>

        <button className="notif-reset-btn" type="button" onClick={resetAll}>
          Reset All to Defaults
        </button>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

function ProfileBrandLogo() {
  return <MerchantBrandLogo variant="profile" className="profile-brand" alt="" />;
}

function ProfileScreen() {
  const [theme, setTheme] = useState("Light");
  const [rotation, setRotation] = useState(true);
  const [sideNav, setSideNav] = useState(false);
  const [faceId, setFaceId] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const isDark = theme === "Dark";

  return (
    <div className={`screen profile-screen ${isDark ? "profile-dark" : ""}`}>
      <header className="app-topbar">
        <h2>Settings</h2>
        <p>Manage Your Account</p>
      </header>

      <div className="scroll-area">
        <section className="surface-card profile-card">
          <div className="profile-banner">
            <img className="profile-banner-img" src={merchantBrand.banner} alt="Restaurant food" />
            <span className="profile-admin">Admin</span>
            <ProfileBrandLogo />
          </div>
          <div className="profile-info">
            <div>
              <h3>{merchantBrand.name}</h3>
              <p>Merchant ID: 2651</p>
            </div>
            <button className="switch-link" type="button">
              Switch <IconChevronRight width={16} height={16} />
            </button>
          </div>
        </section>

        <button className="surface-card setting-row" type="button">
          <span className="row-label">My Email</span>
          <span className="row-value">demo@gettattle.com</span>
        </button>

        <h3 className="section-title">Appearance</h3>
        <section className="surface-card setting-group">
          <div className="setting-line">
            <span className="row-label">Theme</span>
            <div className="theme-seg">
              {["System", "Light", "Dark"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={theme === t ? "active" : ""}
                  onClick={() => setTheme(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="setting-line">
            <div>
              <span className="row-label">Screen Rotation</span>
              <p className="row-desc">Allow app to rotate when device is tilted</p>
            </div>
            <Toggle on={rotation} onClick={() => setRotation((v) => !v)} />
          </div>
          <div className="setting-line">
            <div>
              <span className="row-label">Side Navigation</span>
              <p className="row-desc">Show navigation on the side of the screen</p>
            </div>
            <Toggle on={sideNav} onClick={() => setSideNav((v) => !v)} />
          </div>
        </section>

        <h3 className="section-title">Preferences</h3>
        <section className="surface-card setting-group">
          <button className="setting-line as-button" type="button" onClick={() => setNotificationsOpen(true)}>
            <div>
              <span className="row-label">Notifications</span>
              <p className="row-desc">Choose which alerts you get</p>
            </div>
            <IconChevronRight width={18} height={18} />
          </button>
          <div className="setting-line">
            <div>
              <span className="row-label">Use Face ID</span>
              <p className="row-desc">Use biometrics to sign in quickly</p>
            </div>
            <Toggle on={faceId} onClick={() => setFaceId((v) => !v)} />
          </div>
        </section>

        <h3 className="section-title">About</h3>
        <section className="surface-card setting-group">
          <div className="setting-line">
            <span className="row-label">App Version</span>
            <span className="row-value">10.6.2</span>
          </div>
          <div className="setting-line">
            <span className="row-label">Backend Version</span>
            <span className="row-value">13.2.1</span>
          </div>
        </section>

        <button className="btn-logout" type="button">Log Out</button>
      </div>

      <BottomNav active="profile" />

      {notificationsOpen ? (
        <NotificationsFlow onClose={() => setNotificationsOpen(false)} isDark={isDark} />
      ) : null}
    </div>
  );
}

function OperatorDemoApp() {
  const navigate = useNavigate();
  const [lockNotifications, setLockNotifications] = useState([]);
  const [lastTriggeredId, setLastTriggeredId] = useState(null);
  const [unreadIds, setUnreadIds] = useState(() => getInitialUnreadIds());

  const handleReset = () => {
    setLockNotifications([]);
    setLastTriggeredId(null);
    setUnreadIds(getInitialUnreadIds());
    navigate("/device/home");
  };

  const handleMarkInboxRead = (feedbackId) => {
    setUnreadIds((cur) => {
      if (!cur.has(feedbackId)) return cur;
      const next = new Set(cur);
      next.delete(feedbackId);
      return next;
    });
  };

  const handleTriggerPush = (item) => {
    const notice = {
      id: `live-${item.id}-${Date.now()}`,
      catalogId: item.id,
      title: item.title,
      body: item.body,
      route: item.route
    };
    setLockNotifications((cur) => [...cur, notice].slice(-4));
    setLastTriggeredId(item.id);
    navigate("/device/home");
  };

  const handleOpenNotification = (notice) => {
    setLockNotifications((cur) => cur.filter((entry) => entry.id !== notice.id));
    const detailMatch = notice.route?.match(/\/inbox\/review\/([^/?]+)/);
    if (detailMatch) handleMarkInboxRead(detailMatch[1]);
    navigate(notice.route);
  };

  const handleOpenApp = () => navigate("/inbox?tab=surveys");

  return (
    <>
      <DemoPushSidebar activeId={lastTriggeredId} onReset={handleReset} onTrigger={handleTriggerPush} />
      <IPhoneShell>
        <Routes>
          <Route path="/" element={<Navigate to="/device/home" replace />} />
          <Route
            path="/device/home"
            element={
              <HomeLockScreen
                notifications={lockNotifications}
                onNotificationClick={handleOpenNotification}
                onOpenApp={handleOpenApp}
              />
            }
          />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/inbox" element={<InboxScreen unreadIds={unreadIds} onMarkRead={handleMarkInboxRead} />} />
          <Route path="/inbox/review/:feedbackId" element={<ReviewDetailScreen />} />
          <Route path="/todo" element={<ToDoScreen />} />
          <Route path="/performance" element={<PerformanceScreen />} />
          <Route path="/performance/insights" element={<PerformanceScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </IPhoneShell>
    </>
  );
}

function DemoApp() {
  const navigate = useNavigate();
  const [persona, setPersona] = useState("operator");
  const [activeGuestInvite, setActiveGuestInvite] = useState(null);

  const handlePersonaChange = (next) => {
    setPersona(next);
    if (next === "operator") {
      navigate("/device/home");
    } else {
      navigate("/guest/home");
    }
  };

  const handleGuestReset = () => {
    setActiveGuestInvite(null);
  };

  return (
    <DemoStageShell>
      <DemoPersonaToggle persona={persona} onChange={handlePersonaChange} />
      <div className="demo-fit">
        {persona === "operator" ? (
          <OperatorDemoApp />
        ) : (
          <GuestDemoApp
            activeInvite={activeGuestInvite}
            onInviteChange={setActiveGuestInvite}
            onReset={handleGuestReset}
          />
        )}
      </div>
    </DemoStageShell>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(DEMO_ACCESS_KEY) === "1");

  if (!authed) {
    return <AccessGate onSuccess={() => setAuthed(true)} />;
  }

  return <DemoApp />;
}
