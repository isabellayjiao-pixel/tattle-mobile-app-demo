// ============================================================
// TATTLE DEMO — DUMMY DATA FILE
// Brand: Crestline Burger Co.
// Generated for sales demo purposes only
// ============================================================

// ─────────────────────────────────────────
// BRAND
// ─────────────────────────────────────────
export const brand = {
  id: "brand_crestline",
  name: "Crestline Burger Co.",
  logo: null, // swap in real logo URL if needed
  primaryColor: "#00B388",
  accentColor: "#FF6B35",
  responseSignature: "The Crestline Team",
  tattleScore: 87,
  totalLocations: 17,
  activeLocations: 17,
};

// ─────────────────────────────────────────
// LOCATIONS
// ─────────────────────────────────────────
export const locations = [
  { id: "loc_001", name: "Austin – Domain", city: "Austin", state: "TX", address: "11410 Century Oaks Terrace, Austin, TX 78758", manager: "Priya Nair", cer: 91, avgRating: 4.6, responseRate: 94, nps: 72, openDate: "2019-03-15" },
  { id: "loc_002", name: "Austin – South Congress", city: "Austin", state: "TX", address: "1704 S Congress Ave, Austin, TX 78704", manager: "Marcus Webb", cer: 78, avgRating: 4.1, responseRate: 81, nps: 58, openDate: "2020-07-22" },
  { id: "loc_003", name: "Dallas – Uptown", city: "Dallas", state: "TX", address: "3407 McKinney Ave, Dallas, TX 75204", manager: "Sofia Reyes", cer: 88, avgRating: 4.4, responseRate: 90, nps: 67, openDate: "2018-11-10" },
  { id: "loc_004", name: "Dallas – Frisco", city: "Frisco", state: "TX", address: "6150 Preston Rd, Frisco, TX 75034", manager: "Jordan Lee", cer: 93, avgRating: 4.7, responseRate: 96, nps: 76, openDate: "2021-02-01" },
  { id: "loc_005", name: "Houston – Midtown", city: "Houston", state: "TX", address: "2810 Milam St, Houston, TX 77006", manager: "Denise Okafor", cer: 74, avgRating: 3.9, responseRate: 72, nps: 44, openDate: "2019-09-18" },
  { id: "loc_006", name: "Houston – The Woodlands", city: "The Woodlands", state: "TX", address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380", manager: "Tyler Huang", cer: 85, avgRating: 4.3, responseRate: 88, nps: 63, openDate: "2020-04-14" },
  { id: "loc_007", name: "San Antonio – Alamo Ranch", city: "San Antonio", state: "TX", address: "5995 W Loop 1604, San Antonio, TX 78251", manager: "Camila Torres", cer: 89, avgRating: 4.5, responseRate: 91, nps: 69, openDate: "2021-08-30" },
  { id: "loc_008", name: "Nashville – Gulch", city: "Nashville", state: "TN", address: "1201 Pine St, Nashville, TN 37203", manager: "Ben Holloway", cer: 82, avgRating: 4.2, responseRate: 85, nps: 60, openDate: "2022-01-12" },
  { id: "loc_009", name: "Nashville – Brentwood", city: "Brentwood", state: "TN", address: "740 Old Hickory Blvd, Brentwood, TN 37027", manager: "Rachel Kim", cer: 95, avgRating: 4.8, responseRate: 97, nps: 81, openDate: "2022-06-05" },
  { id: "loc_010", name: "Denver – LoDo", city: "Denver", state: "CO", address: "1415 Market St, Denver, CO 80202", manager: "Aaron Patel", cer: 80, avgRating: 4.2, responseRate: 83, nps: 57, openDate: "2023-03-20" },
  { id: "loc_011", name: "Denver – Cherry Creek", city: "Denver", state: "CO", address: "2800 E 2nd Ave, Denver, CO 80206", manager: "Mia Johansson", cer: 86, avgRating: 4.4, responseRate: 89, nps: 64, openDate: "2023-09-01" },
  { id: "loc_012", name: "Houston – Galleria", city: "Houston", state: "TX", address: "5085 Westheimer Rd, Houston, TX 77056", manager: "Elena Vasquez", cer: 79, avgRating: 4.1, responseRate: 80, nps: 55, openDate: "2020-11-08" },
  { id: "loc_013", name: "Houston – Katy", city: "Katy", state: "TX", address: "23501 Cinco Ranch Blvd, Katy, TX 77494", manager: "Noah Briggs", cer: 76, avgRating: 4.0, responseRate: 77, nps: 50, openDate: "2021-05-19" },
  { id: "loc_014", name: "Houston – Sugar Land", city: "Sugar Land", state: "TX", address: "16535 Southwest Fwy, Sugar Land, TX 77479", manager: "Priya Shah", cer: 91, avgRating: 4.6, responseRate: 93, nps: 71, openDate: "2019-06-12" },
  { id: "loc_015", name: "Houston – Heights", city: "Houston", state: "TX", address: "405 W 19th St, Houston, TX 77008", manager: "Chris Nguyen", cer: 72, avgRating: 3.8, responseRate: 70, nps: 42, openDate: "2022-03-04" },
  { id: "loc_016", name: "Houston – Pearland", city: "Pearland", state: "TX", address: "11200 Broadway St, Pearland, TX 77584", manager: "Alicia Grant", cer: 88, avgRating: 4.5, responseRate: 90, nps: 66, openDate: "2021-10-21" },
  { id: "loc_017", name: "Houston – Energy Corridor", city: "Houston", state: "TX", address: "14700 Grisby Rd, Houston, TX 77079", manager: "Omar Haddad", cer: 84, avgRating: 4.3, responseRate: 86, nps: 61, openDate: "2023-01-16" },
];

// ─────────────────────────────────────────
// CHANNELS
// ─────────────────────────────────────────
export const channels = [
  "Tattle In-App Survey",
  "Google",
  "Yelp",
  "Email Survey",
  "SMS Survey",
  "Kiosk",
  "Receipt QR",
];

// ─────────────────────────────────────────
// CATEGORIES (Tattle feedback taxonomy)
// ─────────────────────────────────────────
export const categories = [
  "Food Quality",
  "Service",
  "Speed of Service",
  "Cleanliness",
  "Order Accuracy",
  "Value",
  "Ambiance",
  "Mobile App / Online Order",
];

// ─────────────────────────────────────────
// FEEDBACK RECORDS (100 records)
// ─────────────────────────────────────────
export const feedback = [

  // ── POSITIVE (60) ───────────────────────

  { id: "fb_001", locationId: "loc_004", channel: "Tattle In-App Survey", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-03-10T12:14:00Z", respondedAt: "2025-03-10T14:02:00Z", responded: true, flagged: false, name: "Jessica M.", comment: "Honestly one of the best smashburgers I've ever had. The brioche bun was perfectly toasted and the special sauce is addictive. My kids ask to come here every weekend now — that should tell you everything.", aiDraft: null },
  { id: "fb_002", locationId: "loc_009", channel: "SMS Survey", rating: 5, sentiment: "positive", category: "Service", timestamp: "2025-03-11T18:30:00Z", respondedAt: "2025-03-11T19:45:00Z", responded: true, flagged: false, name: "Daniel T.", comment: "Rachel and her team are absolutely phenomenal. I came in stressed from a work day and left in a completely different mood. They remembered my usual order without me saying a word.", aiDraft: null },
  { id: "fb_003", locationId: "loc_001", channel: "Google", rating: 5, sentiment: "positive", category: "Order Accuracy", timestamp: "2025-03-12T13:05:00Z", respondedAt: null, responded: false, flagged: false, name: "Anika R.", comment: "First time at the Domain location. Ordered online, everything was ready exactly on time and 100% correct. Fries were hot, burger was built exactly as customized. Really impressive.", aiDraft: null },
  { id: "fb_004", locationId: "loc_007", channel: "Receipt QR", rating: 5, sentiment: "positive", category: "Ambiance", timestamp: "2025-03-12T20:18:00Z", respondedAt: "2025-03-13T09:00:00Z", responded: true, flagged: false, name: "Liam F.", comment: "Great vibe in here. Music, lighting, seating — all of it feels thought out. Not just another burger joint. Brought a client for a casual lunch and they were impressed.", aiDraft: null },
  { id: "fb_005", locationId: "loc_009", channel: "Tattle In-App Survey", rating: 5, sentiment: "positive", category: "Speed of Service", timestamp: "2025-03-13T11:55:00Z", respondedAt: "2025-03-13T12:30:00Z", responded: true, flagged: false, name: "Olivia N.", comment: "Food was out in under 6 minutes on a Saturday lunch rush. That's insane. And it tasted like they took their time. Will be back every week.", aiDraft: null },
  { id: "fb_006", locationId: "loc_003", channel: "Email Survey", rating: 5, sentiment: "positive", category: "Value", timestamp: "2025-03-13T16:40:00Z", respondedAt: null, responded: false, flagged: false, name: "Carlos V.", comment: "The combo deal is unreal value for the quality. I paid less than I would at a fast food chain and got a restaurant-quality burger. More brands need to figure out this balance.", aiDraft: null },
  { id: "fb_007", locationId: "loc_004", channel: "Kiosk", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-03-14T12:22:00Z", respondedAt: "2025-03-14T13:10:00Z", responded: true, flagged: false, name: "Tasha G.", comment: "The Crestline Classic with extra pickles and no onion was perfect. Literally perfect. The beef patty had this crust on it that I haven't found anywhere else in Frisco.", aiDraft: null },
  { id: "fb_008", locationId: "loc_006", channel: "Google", rating: 4, sentiment: "positive", category: "Service", timestamp: "2025-03-14T19:03:00Z", respondedAt: null, responded: false, flagged: false, name: "Marcus B.", comment: "Super friendly staff, they were genuinely helpful when I asked about allergens for my daughter. Food was great too. Took one star only because parking is tough on weekends.", aiDraft: null },
  { id: "fb_009", locationId: "loc_001", channel: "SMS Survey", rating: 5, sentiment: "positive", category: "Mobile App / Online Order", timestamp: "2025-03-15T08:45:00Z", respondedAt: "2025-03-15T10:00:00Z", responded: true, flagged: false, name: "Preethi S.", comment: "The app ordering experience is so smooth. Saved my order from last time, easy checkout, and I could see exactly when it was ready. Picked up in 4 minutes. This is how it should work.", aiDraft: null },
  { id: "fb_010", locationId: "loc_009", channel: "Tattle In-App Survey", rating: 5, sentiment: "positive", category: "Service", timestamp: "2025-03-15T13:30:00Z", respondedAt: "2025-03-15T14:15:00Z", responded: true, flagged: false, name: "Kevin O.", comment: "The manager personally came to our table to check in. I didn't expect that at a QSR. It felt like fine dining service at a casual price point.", aiDraft: null },
  { id: "fb_011", locationId: "loc_004", channel: "Receipt QR", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-03-16T17:50:00Z", respondedAt: "2025-03-16T18:30:00Z", responded: true, flagged: false, name: "Amanda C.", comment: "The truffle fries are something else. I dream about them. My husband thinks I'm being dramatic but I made him try them and now he agrees.", aiDraft: null },
  { id: "fb_012", locationId: "loc_007", channel: "Kiosk", rating: 4, sentiment: "positive", category: "Cleanliness", timestamp: "2025-03-16T12:10:00Z", respondedAt: null, responded: false, flagged: false, name: "Ryan L.", comment: "Place was spotless for a Saturday afternoon. Tables cleaned fast, floors were clean, bathrooms were actually nice. Sets the standard for what this type of place should look like.", aiDraft: null },
  { id: "fb_013", locationId: "loc_003", channel: "Email Survey", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-03-17T11:20:00Z", respondedAt: "2025-03-17T13:00:00Z", responded: true, flagged: false, name: "Fatima A.", comment: "The veggie burger option is legitimately incredible. I'm not even vegetarian, I just prefer it to the beef. That's saying something.", aiDraft: null },
  { id: "fb_014", locationId: "loc_008", channel: "Google", rating: 4, sentiment: "positive", category: "Service", timestamp: "2025-03-17T20:05:00Z", respondedAt: null, responded: false, flagged: false, name: "Sean D.", comment: "Gulch location has a great energy. Staff were upbeat and fast. New to Nashville and this is already in my regular rotation.", aiDraft: null },
  { id: "fb_015", locationId: "loc_010", channel: "Tattle In-App Survey", rating: 4, sentiment: "positive", category: "Value", timestamp: "2025-03-18T12:40:00Z", respondedAt: "2025-03-18T14:20:00Z", responded: true, flagged: false, name: "Jenn W.", comment: "LoDo is a tough market for value but Crestline holds its own. Generous portions and you actually feel full after eating here. Rare for a burger place at this price.", aiDraft: null },
  { id: "fb_016", locationId: "loc_001", channel: "SMS Survey", rating: 5, sentiment: "positive", category: "Order Accuracy", timestamp: "2025-03-19T13:15:00Z", respondedAt: "2025-03-19T14:00:00Z", responded: true, flagged: false, name: "Mia T.", comment: "I have a complex order (allergies, substitutions) and it's been right every single time. That consistency is why I keep coming back.", aiDraft: null },
  { id: "fb_017", locationId: "loc_006", channel: "Receipt QR", rating: 5, sentiment: "positive", category: "Speed of Service", timestamp: "2025-03-19T18:22:00Z", respondedAt: "2025-03-20T09:00:00Z", responded: true, flagged: false, name: "Patrick N.", comment: "Drive-through was moving fast. I counted — 4 cars ahead of me and I had my food in 9 minutes total. That's how you build loyalty.", aiDraft: null },
  { id: "fb_018", locationId: "loc_009", channel: "Google", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-03-20T14:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Claire H.", comment: "Brentwood location never misses. The seasonal LTO burger this month is genuinely the best thing I've eaten in a while. Hope it stays on permanently.", aiDraft: null },
  { id: "fb_019", locationId: "loc_011", channel: "Kiosk", rating: 4, sentiment: "positive", category: "Ambiance", timestamp: "2025-03-21T11:30:00Z", respondedAt: "2025-03-21T12:45:00Z", responded: true, flagged: false, name: "Derek M.", comment: "Cherry Creek location is gorgeous inside. Clean, modern, doesn't feel like a fast food spot at all. Great for a quick working lunch.", aiDraft: null },
  { id: "fb_020", locationId: "loc_003", channel: "Tattle In-App Survey", rating: 5, sentiment: "positive", category: "Service", timestamp: "2025-03-22T16:50:00Z", respondedAt: "2025-03-22T17:30:00Z", responded: true, flagged: false, name: "Nina K.", comment: "I left a critical review 6 months ago and the manager actually reached out to make it right. Came back in and the experience was night and day. Customer for life now.", aiDraft: null },
  { id: "fb_021", locationId: "loc_004", channel: "SMS Survey", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-03-23T13:00:00Z", respondedAt: "2025-03-23T14:00:00Z", responded: true, flagged: false, name: "Will S.", comment: "Frisco location is firing on all cylinders right now. Fresh ingredients, fast service, no mistakes. Jordan's team has really figured it out.", aiDraft: null },
  { id: "fb_022", locationId: "loc_007", channel: "Email Survey", rating: 5, sentiment: "positive", category: "Service", timestamp: "2025-03-23T19:15:00Z", respondedAt: "2025-03-24T09:00:00Z", responded: true, flagged: false, name: "Hannah P.", comment: "The cashier remembered that I'd been in before and asked if I wanted 'the usual.' It's a small thing but it made me feel like a regular. Love this place.", aiDraft: null },
  { id: "fb_023", locationId: "loc_001", channel: "Google", rating: 4, sentiment: "positive", category: "Value", timestamp: "2025-03-24T12:20:00Z", respondedAt: null, responded: false, flagged: false, name: "Tom R.", comment: "Good quality at a fair price. The lunch specials are a great deal. My office orders from here probably twice a week.", aiDraft: null },
  { id: "fb_024", locationId: "loc_010", channel: "Tattle In-App Survey", rating: 4, sentiment: "positive", category: "Cleanliness", timestamp: "2025-03-25T11:45:00Z", respondedAt: "2025-03-25T12:30:00Z", responded: true, flagged: false, name: "Grace L.", comment: "Always clean every time I visit. The staff are clearly on top of it without it looking like they're scrambling. Really comfortable dining environment.", aiDraft: null },
  { id: "fb_025", locationId: "loc_006", channel: "Kiosk", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-03-25T17:40:00Z", respondedAt: "2025-03-25T18:20:00Z", responded: true, flagged: false, name: "Sam B.", comment: "Woodlands location is my favorite of the bunch. Consistent every single visit. The staff clearly cares about the product.", aiDraft: null },
  { id: "fb_026", locationId: "loc_008", channel: "Receipt QR", rating: 5, sentiment: "positive", category: "Mobile App / Online Order", timestamp: "2025-03-26T12:05:00Z", respondedAt: null, responded: false, flagged: false, name: "Zoe M.", comment: "Ordered ahead on the app, zero wait. The pickup shelf was organized and my bag was labeled perfectly. So easy.", aiDraft: null },
  { id: "fb_027", locationId: "loc_009", channel: "SMS Survey", rating: 5, sentiment: "positive", category: "Speed of Service", timestamp: "2025-03-26T18:50:00Z", respondedAt: "2025-03-26T19:30:00Z", responded: true, flagged: false, name: "Chris A.", comment: "Brentwood is always fast. I don't think I've ever waited more than 7 minutes here. That team has some kind of system working.", aiDraft: null },
  { id: "fb_028", locationId: "loc_003", channel: "Google", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-03-27T13:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Isabella F.", comment: "The new BBQ Bacon Stack is unreal. My husband and I split one and immediately ordered a second. Coming back this weekend for sure.", aiDraft: null },
  { id: "fb_029", locationId: "loc_011", channel: "Tattle In-App Survey", rating: 4, sentiment: "positive", category: "Service", timestamp: "2025-03-28T11:00:00Z", respondedAt: "2025-03-28T12:30:00Z", responded: true, flagged: false, name: "Anthony H.", comment: "Quick, friendly, and accurate. Exactly what you want from a lunch spot. Cherry Creek is well-run.", aiDraft: null },
  { id: "fb_030", locationId: "loc_001", channel: "Email Survey", rating: 5, sentiment: "positive", category: "Order Accuracy", timestamp: "2025-03-28T15:20:00Z", respondedAt: "2025-03-28T16:00:00Z", responded: true, flagged: false, name: "Sophie J.", comment: "Large catering order for our office, 22 items, everything was perfectly correct and packed really well. Huge relief. Will use again for events.", aiDraft: null },

  // ── NEUTRAL (25) ───────────────────────

  { id: "fb_031", locationId: "loc_005", channel: "Tattle In-App Survey", rating: 3, sentiment: "neutral", category: "Speed of Service", timestamp: "2025-03-10T13:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Trevor A.", comment: "Food was decent, took a bit longer than expected for a Tuesday afternoon when it wasn't busy. Nothing terrible, just expected faster.", aiDraft: null },
  { id: "fb_032", locationId: "loc_002", channel: "Yelp", rating: 3, sentiment: "neutral", category: "Value", timestamp: "2025-03-11T19:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Karen P.", comment: "It's fine. Not bad, not great. Prices have crept up a bit and the portions feel slightly smaller than they used to. Still a solid burger though.", aiDraft: null },
  { id: "fb_033", locationId: "loc_010", channel: "Google", rating: 3, sentiment: "neutral", category: "Ambiance", timestamp: "2025-03-12T12:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Brian K.", comment: "LoDo location is a little cramped. It works on off-peak hours but at lunch it's hard to find a seat. Food is good though.", aiDraft: null },
  { id: "fb_034", locationId: "loc_005", channel: "SMS Survey", rating: 3, sentiment: "neutral", category: "Service", timestamp: "2025-03-13T17:45:00Z", respondedAt: null, responded: false, flagged: false, name: "Monica S.", comment: "Staff was polite but seemed understaffed. Had to wait to get someone's attention at the counter. Not a dealbreaker but worth noting.", aiDraft: null },
  { id: "fb_035", locationId: "loc_002", channel: "Kiosk", rating: 3, sentiment: "neutral", category: "Food Quality", timestamp: "2025-03-14T12:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Patrick L.", comment: "Hit or miss depending on the day. When it's good it's really good. Today the bun was a bit soggy, probably sat a few minutes too long.", aiDraft: null },
  { id: "fb_036", locationId: "loc_008", channel: "Email Survey", rating: 3, sentiment: "neutral", category: "Cleanliness", timestamp: "2025-03-15T14:20:00Z", respondedAt: null, responded: false, flagged: false, name: "Lily T.", comment: "Gulch location was a bit messy when I visited around 1pm. Tables hadn't been cleared from the lunch rush. Not a big deal but a bit off-putting.", aiDraft: null },
  { id: "fb_037", locationId: "loc_010", channel: "Tattle In-App Survey", rating: 3, sentiment: "neutral", category: "Mobile App / Online Order", timestamp: "2025-03-16T10:00:00Z", respondedAt: null, responded: false, flagged: false, name: "David R.", comment: "App glitched twice during checkout. Had to restart. Once it worked it was fine but frustrating when you're in a hurry.", aiDraft: null },
  { id: "fb_038", locationId: "loc_005", channel: "Google", rating: 3, sentiment: "neutral", category: "Order Accuracy", timestamp: "2025-03-17T17:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Natalie W.", comment: "My order was missing the extra sauce I requested. Not a huge deal but when you specifically ask for something you notice when it's not there.", aiDraft: null },
  { id: "fb_039", locationId: "loc_002", channel: "Receipt QR", rating: 3, sentiment: "neutral", category: "Speed of Service", timestamp: "2025-03-18T12:15:00Z", respondedAt: null, responded: false, flagged: false, name: "Eric C.", comment: "Waited 14 minutes on a day that didn't seem that busy. Fine overall but I've been faster at other locations.", aiDraft: null },
  { id: "fb_040", locationId: "loc_008", channel: "SMS Survey", rating: 3, sentiment: "neutral", category: "Value", timestamp: "2025-03-20T13:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Helen B.", comment: "Good food but I walked away feeling like the price-to-size ratio isn't quite right. Happy to pay more for quality but the portion felt light.", aiDraft: null },
  { id: "fb_041", locationId: "loc_005", channel: "Tattle In-App Survey", rating: 3, sentiment: "neutral", category: "Food Quality", timestamp: "2025-03-21T18:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Jason M.", comment: "The fries were barely warm when I got them. Burger was great. Seems like a timing issue in the kitchen.", aiDraft: null },
  { id: "fb_042", locationId: "loc_002", channel: "Yelp", rating: 3, sentiment: "neutral", category: "Ambiance", timestamp: "2025-03-22T12:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Chloe R.", comment: "South Congress location feels a bit dated compared to other Crestline spots I've been to. Could use a refresh.", aiDraft: null },
  { id: "fb_043", locationId: "loc_010", channel: "Google", rating: 3, sentiment: "neutral", category: "Service", timestamp: "2025-03-23T11:15:00Z", respondedAt: null, responded: false, flagged: false, name: "Leo D.", comment: "Service was okay. Nobody went out of their way but nobody was rude either. Standard experience.", aiDraft: null },
  { id: "fb_044", locationId: "loc_005", channel: "Email Survey", rating: 2, sentiment: "neutral", category: "Cleanliness", timestamp: "2025-03-24T14:30:00Z", respondedAt: null, responded: false, flagged: true, name: "Maria G.", comment: "Midtown location was noticeably less clean than usual on my last visit. Floors around the drink station were sticky. Mentioned it to staff and they cleaned it up quickly, credit for that.", aiDraft: null },
  { id: "fb_045", locationId: "loc_008", channel: "Tattle In-App Survey", rating: 3, sentiment: "neutral", category: "Order Accuracy", timestamp: "2025-03-25T13:45:00Z", respondedAt: null, responded: false, flagged: false, name: "Nick H.", comment: "Got the wrong size drink. Small thing and they fixed it fast, but I was already at my table when I noticed.", aiDraft: null },
  { id: "fb_046", locationId: "loc_002", channel: "Kiosk", rating: 3, sentiment: "neutral", category: "Speed of Service", timestamp: "2025-03-26T12:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Diane F.", comment: "12-minute wait at 11:40am before the real lunch rush hits. Expected faster. The food was worth it though.", aiDraft: null },
  { id: "fb_047", locationId: "loc_010", channel: "SMS Survey", rating: 3, sentiment: "neutral", category: "Food Quality", timestamp: "2025-03-27T17:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Victor N.", comment: "The chicken sandwich was a bit dry this visit. Maybe a one-off but I've had better versions of it here before.", aiDraft: null },
  { id: "fb_048", locationId: "loc_005", channel: "Google", rating: 2, sentiment: "neutral", category: "Service", timestamp: "2025-03-28T19:20:00Z", respondedAt: null, responded: false, flagged: true, name: "Alice C.", comment: "The person at the counter seemed checked out. Not rude, just disengaged. Didn't make eye contact, didn't say thanks. Small things matter in hospitality.", aiDraft: null },
  { id: "fb_049", locationId: "loc_002", channel: "Receipt QR", rating: 3, sentiment: "neutral", category: "Value", timestamp: "2025-03-29T12:10:00Z", respondedAt: null, responded: false, flagged: false, name: "George T.", comment: "Decent food, decent price. Nothing that blew me away but nothing to complain about. Would return.", aiDraft: null },
  { id: "fb_050", locationId: "loc_008", channel: "Email Survey", rating: 3, sentiment: "neutral", category: "Ambiance", timestamp: "2025-03-30T14:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Ruth S.", comment: "Music was way too loud for a Tuesday afternoon. Had to raise my voice to talk to the friend I was with. Easy fix.", aiDraft: null },
  { id: "fb_051", locationId: "loc_010", channel: "Tattle In-App Survey", rating: 3, sentiment: "neutral", category: "Mobile App / Online Order", timestamp: "2025-03-31T11:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Paul M.", comment: "App estimated 8 minutes, food was ready in 17. Not a disaster but the estimate needs calibration.", aiDraft: null },
  { id: "fb_052", locationId: "loc_005", channel: "Yelp", rating: 3, sentiment: "neutral", category: "Food Quality", timestamp: "2025-04-01T13:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Laura B.", comment: "Burger was good but I've had better from this location. Seems inconsistent. Some days it's a 5-star experience, today was a 3.", aiDraft: null },
  { id: "fb_053", locationId: "loc_002", channel: "Google", rating: 3, sentiment: "neutral", category: "Order Accuracy", timestamp: "2025-04-02T18:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Jack A.", comment: "They swapped out a topping without telling me. Not allergic so it was fine but I noticed. Communication would help.", aiDraft: null },
  { id: "fb_054", locationId: "loc_010", channel: "SMS Survey", rating: 3, sentiment: "neutral", category: "Speed of Service", timestamp: "2025-04-03T12:45:00Z", respondedAt: null, responded: false, flagged: false, name: "Sandra O.", comment: "11 minutes for a simple single burger combo. Wasn't packed. Expected faster given the price point.", aiDraft: null },
  { id: "fb_055", locationId: "loc_005", channel: "Kiosk", rating: 3, sentiment: "neutral", category: "Cleanliness", timestamp: "2025-04-04T16:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Frank W.", comment: "Trash was overflowing near the side exit. Everything else was fine. Just that one area.", aiDraft: null },

  // ── NEGATIVE (15) ─────────────────────

  { id: "fb_056", locationId: "loc_005", channel: "Google", rating: 1, sentiment: "negative", category: "Order Accuracy", timestamp: "2025-04-05T13:00:00Z", respondedAt: null, responded: false, flagged: true, name: "Brandon K.", comment: "Completely wrong order. I ordered a Classic with no onions (allergy, not preference) and it came loaded with onions. Had to throw the whole thing away. This is a health issue, not just an inconvenience. Extremely disappointed.", aiDraft: "Hi Brandon, thank you for letting us know about this. An order accuracy issue involving allergens is something we take very seriously. This is not the standard we hold ourselves to and we're sorry this happened to you. Please reach out to us directly so we can make this right immediately." },
  { id: "fb_057", locationId: "loc_002", channel: "Yelp", rating: 1, sentiment: "negative", category: "Food Quality", timestamp: "2025-04-05T18:30:00Z", respondedAt: null, responded: false, flagged: true, name: "Samantha T.", comment: "Got a burger that was clearly not fresh. The patty was grey and lukewarm, like it had been sitting under a lamp for an hour. Paid $14 for that. Will not be back to this location.", aiDraft: "Hi Samantha, we're really sorry to hear this. A lukewarm, off-quality patty is absolutely not acceptable and not what we stand for. We'd like to understand what happened at the South Congress location that day. Would you be open to reaching out so we can address this directly and make it up to you?" },
  { id: "fb_058", locationId: "loc_005", channel: "Tattle In-App Survey", rating: 1, sentiment: "negative", category: "Service", timestamp: "2025-04-06T12:15:00Z", respondedAt: null, responded: false, flagged: true, name: "Victor H.", comment: "The staff member at the counter was dismissive and seemed annoyed when I asked a simple question about the menu. I wasn't being difficult. There's no excuse for that kind of attitude. Made the whole visit feel unwelcoming.", aiDraft: "Hi Victor, thank you for sharing this. The way you were made to feel during your visit is not okay, and it's not reflective of the hospitality standard we expect from every team member. We want to look into this and use it to coach the team. Thank you for taking the time to tell us." },
  { id: "fb_059", locationId: "loc_002", channel: "SMS Survey", rating: 2, sentiment: "negative", category: "Speed of Service", timestamp: "2025-04-07T13:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Lisa M.", comment: "23-minute wait on a Thursday at noon. By the time I got my food my entire lunch break was gone. I can't afford to wait that long. This is a recurring problem at this location.", aiDraft: "Hi Lisa, 23 minutes is too long and we're sorry this cut into your lunch break. Speed is something we're actively working to improve at South Congress. We hear you and appreciate you flagging this." },
  { id: "fb_060", locationId: "loc_005", channel: "Google", rating: 1, sentiment: "negative", category: "Cleanliness", timestamp: "2025-04-08T15:30:00Z", respondedAt: null, responded: false, flagged: true, name: "Diana L.", comment: "The bathroom at the Midtown location was disgusting. I'm not being dramatic — there was no soap, the floor was wet, and it clearly hadn't been cleaned in hours. I'll go out of my way to avoid this location until that gets fixed.", aiDraft: "Hi Diana, we are genuinely sorry about this experience. Restroom cleanliness is non-negotiable and what you're describing falls well below our standards. We've flagged this to the Midtown management team for immediate action. Thank you for telling us." },
  { id: "fb_061", locationId: "loc_002", channel: "Kiosk", rating: 2, sentiment: "negative", category: "Value", timestamp: "2025-04-09T12:40:00Z", respondedAt: null, responded: false, flagged: false, name: "Gary S.", comment: "Prices went up again and the portions are noticeably smaller. I used to recommend this place to everyone. Starting to feel like it's not worth it anymore.", aiDraft: "Hi Gary, we appreciate your honesty here. Value is something we think about a lot and feedback like yours helps us stay honest. We hope to win back your confidence and would love to share what we're doing to improve." },
  { id: "fb_062", locationId: "loc_005", channel: "Email Survey", rating: 1, sentiment: "negative", category: "Mobile App / Online Order", timestamp: "2025-04-10T10:00:00Z", respondedAt: null, responded: false, flagged: true, name: "Jennifer W.", comment: "I placed a mobile order, got a confirmation, drove to the store, and they had no record of it. Stood there for 10 minutes while staff tried to figure it out. Eventually had to re-order and wait again. Completely embarrassing. Fix the app.", aiDraft: "Hi Jennifer, we are so sorry this happened. A confirmed order that doesn't show up at the store is a serious breakdown and we want to understand exactly what went wrong. Please reach out and we'll make sure this is resolved and that it doesn't happen again." },
  { id: "fb_063", locationId: "loc_002", channel: "Google", rating: 2, sentiment: "negative", category: "Food Quality", timestamp: "2025-04-11T17:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Tom H.", comment: "The fries were cold and the burger bun was stale. For a Friday dinner service this isn't okay. South Congress used to be my go-to, not sure what happened recently.", aiDraft: "Hi Tom, cold fries and a stale bun on a Friday dinner service is not acceptable. We want to get to the bottom of this — quality dips like this usually signal a kitchen process issue and we take that seriously. Thank you for letting us know." },
  { id: "fb_064", locationId: "loc_005", channel: "Tattle In-App Survey", rating: 1, sentiment: "negative", category: "Service", timestamp: "2025-04-12T13:20:00Z", respondedAt: null, responded: false, flagged: true, name: "Rachel G.", comment: "I watched an employee eat food off a tray that was being prepared for a customer. I was so grossed out I walked out without my order. I've never left a review before but this needed to be said.", aiDraft: "Hi Rachel, we're deeply troubled by what you've described. This is something we take with the utmost seriousness from both a food safety and standards perspective. We need to investigate this at the Midtown location right away. Please know we are taking immediate action." },
  { id: "fb_065", locationId: "loc_002", channel: "Yelp", rating: 2, sentiment: "negative", category: "Order Accuracy", timestamp: "2025-04-13T18:45:00Z", respondedAt: null, responded: false, flagged: false, name: "Deborah N.", comment: "Third time in a row my order has had something wrong. This time no bacon, even though I was charged for it. At some point it stops being a coincidence.", aiDraft: "Hi Deborah, three consecutive order errors is unacceptable and we completely understand your frustration. We're sorry. You should absolutely be charged only for what you receive. Please reach out and we'll take care of a refund for the missing items and look into what's happening in the kitchen." },
  { id: "fb_066", locationId: "loc_005", channel: "Google", rating: 1, sentiment: "negative", category: "Speed of Service", timestamp: "2025-04-14T12:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Pete A.", comment: "30-minute wait for a burger and fries. I could have driven to a sit-down restaurant. The Midtown location seems chronically understaffed. This is my fourth bad speed experience here.", aiDraft: "Hi Pete, 30 minutes is far too long and we sincerely apologize. Staffing and throughput at Midtown is something our operations team is actively reviewing. Your feedback is exactly what helps us justify the changes that need to happen." },
  { id: "fb_067", locationId: "loc_002", channel: "SMS Survey", rating: 2, sentiment: "negative", category: "Ambiance", timestamp: "2025-04-15T19:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Karen V.", comment: "South Congress location had a strong grease smell that was almost overwhelming. I had to cut my visit short. I don't know if the ventilation needs attention but it was noticeable.", aiDraft: "Hi Karen, thank you for telling us about this. A strong grease odor usually indicates a ventilation or deep-cleaning issue and we're taking your report to the facilities team immediately. That's not the environment we want for our guests." },
  { id: "fb_068", locationId: "loc_005", channel: "Kiosk", rating: 1, sentiment: "negative", category: "Food Quality", timestamp: "2025-04-16T13:30:00Z", respondedAt: null, responded: false, flagged: true, name: "Mike D.", comment: "Found what looked like a hair in my burger. Wrapped it back up and told the manager who gave me a halfhearted apology and offered a coupon. A coupon. I've been coming here for two years and that was my last visit.", aiDraft: "Hi Mike, finding a foreign object in your food is unacceptable, full stop. We're sorry the on-site response didn't meet the moment. You deserved a full refund and a sincere apology, not a coupon. Please reach out to us directly — we want to make this right in a way that actually means something." },
  { id: "fb_069", locationId: "loc_002", channel: "Email Survey", rating: 2, sentiment: "negative", category: "Cleanliness", timestamp: "2025-04-17T14:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Susan J.", comment: "Dining room tables were sticky and hadn't been wiped. The bin near the door was overflowing. It makes the food taste worse when the space feels unclean.", aiDraft: "Hi Susan, a sticky, unclean dining area undermines the whole experience and you're right to call it out. We've passed this to the South Congress team and will be reinforcing our cleaning protocols. Thank you for taking the time." },
  { id: "fb_070", locationId: "loc_005", channel: "Google", rating: 1, sentiment: "negative", category: "Order Accuracy", timestamp: "2025-04-18T12:30:00Z", respondedAt: null, responded: false, flagged: true, name: "Anna C.", comment: "Drove home to find I had someone else's entire order. Completely different meal. Had to drive back. No one seemed that sorry when I returned. This is the second time this has happened to me at the Midtown location. Something needs to change.", aiDraft: "Hi Anna, receiving the wrong order entirely and then having to make a second trip is genuinely awful — we're so sorry. The fact that this has happened to you twice at the same location tells us there's a systemic issue we need to fix. We want to reach out to you personally to address this." },

  // ── RECENT (for notification demos) ────

  { id: "fb_071", locationId: "loc_004", channel: "Tattle In-App Survey", rating: 1, sentiment: "negative", category: "Service", timestamp: "2025-04-19T11:45:00Z", respondedAt: null, responded: false, flagged: true, name: "Derek S.", comment: "Staff was rude when I asked to substitute the side. Was told 'we don't do that' in a really dismissive tone. I've gotten substitutions here before. Felt embarrassed in front of my coworkers.", aiDraft: "Hi Derek, the experience you're describing — being dismissed in front of others — is not how we want any guest to feel. We can and do accommodate reasonable requests and this fell short of our hospitality standard. We're sorry and we want to make it right." },
  { id: "fb_072", locationId: "loc_009", channel: "SMS Survey", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-04-19T14:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Courtney B.", comment: "Just had the best lunch I've had in months. The Crestline Classic with the seasonal aioli LTO was incredible. Brentwood team is doing something special.", aiDraft: null },
  { id: "fb_073", locationId: "loc_001", channel: "Google", rating: 2, sentiment: "negative", category: "Speed of Service", timestamp: "2025-04-19T17:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Paul K.", comment: "The Domain location used to be my benchmark for speed. Today I waited 19 minutes. That's not normal here. Hope it's just an off day.", aiDraft: "Hi Paul, 19 minutes at Domain is not our standard and we hear you. We're going to look into what happened during that shift. Thanks for keeping us honest." },
  { id: "fb_074", locationId: "loc_007", channel: "Tattle In-App Survey", rating: 5, sentiment: "positive", category: "Service", timestamp: "2025-04-20T12:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Jasmine R.", comment: "Camila's team at Alamo Ranch is so welcoming. I brought my mom for her birthday and they treated her like royalty. Little gestures go a long way.", aiDraft: null },
  { id: "fb_075", locationId: "loc_003", channel: "SMS Survey", rating: 1, sentiment: "negative", category: "Food Quality", timestamp: "2025-04-20T18:30:00Z", respondedAt: null, responded: false, flagged: true, name: "Tyler B.", comment: "Got a burger that was completely raw in the middle. Took one bite and knew immediately. This is a food safety issue, not a preference thing. Really alarmed.", aiDraft: "Hi Tyler, an undercooked burger is a serious food safety concern and we are treating this with the urgency it requires. Please contact us directly so we can document this, escalate to the kitchen team, and ensure this is investigated fully. We're sorry this happened." },
  { id: "fb_076", locationId: "loc_006", channel: "Email Survey", rating: 5, sentiment: "positive", category: "Order Accuracy", timestamp: "2025-04-21T11:15:00Z", respondedAt: null, responded: false, flagged: false, name: "Nicole P.", comment: "Huge catering order for my company — 40 people — and everything was perfect. Every item accounted for, food arrived warm, labeled clearly. Tyler's team at Woodlands is outstanding.", aiDraft: null },
  { id: "fb_077", locationId: "loc_011", channel: "Google", rating: 3, sentiment: "neutral", category: "Speed of Service", timestamp: "2025-04-21T13:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Evan S.", comment: "Waited about 13 minutes at Cherry Creek on a Tuesday. Not terrible but I had a meeting to get to. Food was great when it arrived.", aiDraft: null },
  { id: "fb_078", locationId: "loc_004", channel: "Kiosk", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-04-22T12:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Brittany M.", comment: "The Double Smash with the Crestline sauce is hands down the best burger in the DFW area. I'll fight anyone who disagrees.", aiDraft: null },
  { id: "fb_079", locationId: "loc_009", channel: "Tattle In-App Survey", rating: 5, sentiment: "positive", category: "Service", timestamp: "2025-04-22T17:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Greg T.", comment: "Team at Brentwood remembered my dietary preference from a previous visit. Completely unprompted. That kind of attention to detail is why I keep coming back.", aiDraft: null },
  { id: "fb_080", locationId: "loc_005", channel: "Google", rating: 1, sentiment: "negative", category: "Service", timestamp: "2025-04-23T13:00:00Z", respondedAt: null, responded: false, flagged: true, name: "Sheila R.", comment: "The manager at the Midtown location was arguing loudly with a staff member in full view of customers. It was incredibly uncomfortable. I don't want to eat somewhere that feels chaotic.", aiDraft: "Hi Sheila, what you witnessed is not acceptable and is not how we expect our teams to operate in front of guests. We're escalating this to our regional manager immediately. Thank you for taking the time to tell us — we are addressing this directly." },

  // ── ADDITIONAL RECORDS for volume ──────

  { id: "fb_081", locationId: "loc_001", channel: "SMS Survey", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-04-23T17:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Ashley N.", comment: "Best burger I've had in Austin. Period. The sourdough bun upgrade is worth every penny.", aiDraft: null },
  { id: "fb_082", locationId: "loc_003", channel: "Tattle In-App Survey", rating: 4, sentiment: "positive", category: "Service", timestamp: "2025-04-24T12:00:00Z", respondedAt: null, responded: false, flagged: false, name: "James H.", comment: "Uptown location is consistently solid. Good team, good food, clean space.", aiDraft: null },
  { id: "fb_083", locationId: "loc_007", channel: "Google", rating: 5, sentiment: "positive", category: "Speed of Service", timestamp: "2025-04-24T18:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Michelle C.", comment: "Alamo Ranch is my standard for fast service. Never over 7 minutes, ever.", aiDraft: null },
  { id: "fb_084", locationId: "loc_010", channel: "Yelp", rating: 3, sentiment: "neutral", category: "Value", timestamp: "2025-04-25T13:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Aaron T.", comment: "Decent enough but the combo price has crept up. I'll keep coming but the value calculus is getting tighter.", aiDraft: null },
  { id: "fb_085", locationId: "loc_009", channel: "Receipt QR", rating: 5, sentiment: "positive", category: "Order Accuracy", timestamp: "2025-04-25T17:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Lauren F.", comment: "Perfect order every single time at Brentwood. Never once had an error. Rachel runs a tight ship.", aiDraft: null },
  { id: "fb_086", locationId: "loc_006", channel: "Kiosk", rating: 4, sentiment: "positive", category: "Ambiance", timestamp: "2025-04-26T11:45:00Z", respondedAt: null, responded: false, flagged: false, name: "Chris W.", comment: "Woodlands location has a nice patio area. Perfect for lunch on a nice day.", aiDraft: null },
  { id: "fb_087", locationId: "loc_004", channel: "Email Survey", rating: 5, sentiment: "positive", category: "Service", timestamp: "2025-04-26T15:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Emily R.", comment: "Jordan's team at Frisco is exemplary. Friendly, fast, consistent. Best managed location in the chain.", aiDraft: null },
  { id: "fb_088", locationId: "loc_011", channel: "Tattle In-App Survey", rating: 4, sentiment: "positive", category: "Food Quality", timestamp: "2025-04-27T12:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Ryan M.", comment: "Cherry Creek is getting better with every visit. The new menu items are excellent.", aiDraft: null },
  { id: "fb_089", locationId: "loc_008", channel: "SMS Survey", rating: 4, sentiment: "positive", category: "Service", timestamp: "2025-04-27T18:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Sarah K.", comment: "Gulch team has really improved over the past few months. Night and day difference from when they first opened.", aiDraft: null },
  { id: "fb_090", locationId: "loc_001", channel: "Google", rating: 5, sentiment: "positive", category: "Value", timestamp: "2025-04-28T12:00:00Z", respondedAt: null, responded: false, flagged: false, name: "David L.", comment: "Domain location is worth every dollar. Quality-to-price ratio is unmatched in Austin right now.", aiDraft: null },
  { id: "fb_091", locationId: "loc_002", channel: "Kiosk", rating: 1, sentiment: "negative", category: "Food Quality", timestamp: "2025-04-28T17:45:00Z", respondedAt: null, responded: false, flagged: true, name: "Mark T.", comment: "Undercooked chicken on the chicken sandwich. Concerning. South Congress location needs a kitchen quality check.", aiDraft: "Hi Mark, an undercooked protein is a food safety issue we take extremely seriously. We're investigating this at the South Congress location immediately. Thank you for flagging it." },
  { id: "fb_092", locationId: "loc_007", channel: "Tattle In-App Survey", rating: 5, sentiment: "positive", category: "Order Accuracy", timestamp: "2025-04-29T12:15:00Z", respondedAt: null, responded: false, flagged: false, name: "Kelly A.", comment: "Never once had an error at Alamo Ranch. Consistent perfection.", aiDraft: null },
  { id: "fb_093", locationId: "loc_003", channel: "Email Survey", rating: 4, sentiment: "positive", category: "Cleanliness", timestamp: "2025-04-29T15:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Tim B.", comment: "Uptown Dallas is always spotless. Sets the standard for cleanliness.", aiDraft: null },
  { id: "fb_094", locationId: "loc_009", channel: "Google", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-04-30T12:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Alicia M.", comment: "Brentwood continues to be the best location in the whole brand. Perfection every time.", aiDraft: null },
  { id: "fb_095", locationId: "loc_004", channel: "SMS Survey", rating: 5, sentiment: "positive", category: "Speed of Service", timestamp: "2025-04-30T17:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Josh R.", comment: "Frisco location is a machine. In and out in under 5 minutes with a perfect order. Unbeatable.", aiDraft: null },
  { id: "fb_096", locationId: "loc_005", channel: "Tattle In-App Survey", rating: 2, sentiment: "negative", category: "Service", timestamp: "2025-05-01T12:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Nina W.", comment: "Midtown continues to struggle. This location needs serious operational attention.", aiDraft: "Hi Nina, we hear you. Midtown is a location we're actively working to improve and feedback like this helps us make the case for change. Thank you." },
  { id: "fb_097", locationId: "loc_006", channel: "Google", rating: 4, sentiment: "positive", category: "Food Quality", timestamp: "2025-05-01T17:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Brandon S.", comment: "Woodlands is solid. The seasonal shake is incredible right now.", aiDraft: null },
  { id: "fb_098", locationId: "loc_001", channel: "Receipt QR", rating: 5, sentiment: "positive", category: "Service", timestamp: "2025-05-02T12:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Tanya L.", comment: "Domain team is top tier. Every person I interact with is friendly and professional.", aiDraft: null },
  { id: "fb_099", locationId: "loc_011", channel: "Kiosk", rating: 3, sentiment: "neutral", category: "Speed of Service", timestamp: "2025-05-02T17:30:00Z", respondedAt: null, responded: false, flagged: false, name: "Oscar H.", comment: "Cherry Creek a bit slow today. 15 minutes for a single item. Hopefully a one-off.", aiDraft: null },
  { id: "fb_100", locationId: "loc_003", channel: "SMS Survey", rating: 5, sentiment: "positive", category: "Food Quality", timestamp: "2025-05-03T12:00:00Z", respondedAt: null, responded: false, flagged: false, name: "Patricia G.", comment: "The LTO Jalapeño Crunch burger at Uptown Dallas is a limited time item that should be permanent. Absolutely incredible.", aiDraft: null },
];

// ─────────────────────────────────────────
// INSIGHTS (AI-generated trend summaries)
// ─────────────────────────────────────────
export const insights = [
  {
    id: "ins_001",
    type: "alert",
    title: "Midtown Houston flagged for multi-category decline",
    body: "Houston – Midtown has registered below-threshold scores in Service, Cleanliness, and Speed of Service over the last 21 days. CER has dropped 11 points to 74. Two food safety-adjacent reports require immediate review. Recommended action: regional manager site visit within 48 hours.",
    locationId: "loc_005",
    severity: "high",
    timestamp: "2025-05-03T08:00:00Z",
    categories: ["Service", "Cleanliness", "Speed of Service"],
  },
  {
    id: "ins_002",
    type: "positive",
    title: "Brentwood Nashville sustains best-in-brand CER",
    body: "Nashville – Brentwood has maintained a CER of 95 for six consecutive weeks, the highest in the portfolio. Response rate sits at 97%. Guest comments consistently cite service consistency and speed. Brentwood is a strong candidate for a best-practices spotlight in the next franchisee newsletter.",
    locationId: "loc_009",
    severity: "low",
    timestamp: "2025-05-03T08:00:00Z",
    categories: ["Service", "Speed of Service"],
  },
  {
    id: "ins_003",
    type: "trend",
    title: "Order accuracy issues rising at South Congress Austin",
    body: "Austin – South Congress has seen a 28% increase in order accuracy complaints over the last 30 days. Three guests have reported consecutive errors. The pattern suggests a kitchen line process issue rather than isolated incidents. Suggested intervention: line audit and accuracy re-training.",
    locationId: "loc_002",
    severity: "medium",
    timestamp: "2025-05-02T08:00:00Z",
    categories: ["Order Accuracy"],
  },
  {
    id: "ins_004",
    type: "trend",
    title: "Mobile ordering sentiment improving brand-wide",
    body: "Across 6 of 11 locations, mobile app and online ordering satisfaction has improved by an average of 14 points over the prior 60-day period. Guests cite pickup speed and order accuracy as the primary drivers. Two locations — Midtown Houston and South Congress — remain below average and may benefit from operational coaching.",
    locationId: null,
    severity: "low",
    timestamp: "2025-05-01T08:00:00Z",
    categories: ["Mobile App / Online Order"],
  },
];

// ─────────────────────────────────────────
// KPI SUMMARY (brand-level, rolling 30 days)
// ─────────────────────────────────────────
export const kpis = {
  cer: 85,
  cerChange: +3,
  avgRating: 4.3,
  avgRatingChange: +0.2,
  responseRate: 87,
  responseRateChange: +5,
  nps: 64,
  npsChange: +4,
  totalFeedback: 1847,
  totalFeedbackChange: +12,
  pendingResponses: 34,
  flaggedItems: 8,
};

// ─────────────────────────────────────────
// SENTIMENT TREND (30-day daily rollup)
// ─────────────────────────────────────────
export const sentimentTrend = [
  { date: "Apr 4", positive: 58, neutral: 24, negative: 18 },
  { date: "Apr 5", positive: 61, neutral: 22, negative: 17 },
  { date: "Apr 6", positive: 55, neutral: 27, negative: 18 },
  { date: "Apr 7", positive: 63, neutral: 21, negative: 16 },
  { date: "Apr 8", positive: 60, neutral: 24, negative: 16 },
  { date: "Apr 9", positive: 57, neutral: 26, negative: 17 },
  { date: "Apr 10", positive: 62, neutral: 23, negative: 15 },
  { date: "Apr 11", positive: 65, neutral: 20, negative: 15 },
  { date: "Apr 12", positive: 59, neutral: 25, negative: 16 },
  { date: "Apr 13", positive: 64, neutral: 22, negative: 14 },
  { date: "Apr 14", positive: 61, neutral: 24, negative: 15 },
  { date: "Apr 15", positive: 66, neutral: 21, negative: 13 },
  { date: "Apr 16", positive: 63, neutral: 23, negative: 14 },
  { date: "Apr 17", positive: 60, neutral: 25, negative: 15 },
  { date: "Apr 18", positive: 68, neutral: 19, negative: 13 },
  { date: "Apr 19", positive: 65, neutral: 22, negative: 13 },
  { date: "Apr 20", positive: 70, neutral: 18, negative: 12 },
  { date: "Apr 21", positive: 67, neutral: 20, negative: 13 },
  { date: "Apr 22", positive: 64, neutral: 23, negative: 13 },
  { date: "Apr 23", positive: 69, neutral: 19, negative: 12 },
  { date: "Apr 24", positive: 72, neutral: 17, negative: 11 },
  { date: "Apr 25", positive: 68, neutral: 20, negative: 12 },
  { date: "Apr 26", positive: 71, neutral: 18, negative: 11 },
  { date: "Apr 27", positive: 73, neutral: 17, negative: 10 },
  { date: "Apr 28", positive: 70, neutral: 19, negative: 11 },
  { date: "Apr 29", positive: 74, neutral: 16, negative: 10 },
  { date: "Apr 30", positive: 72, neutral: 18, negative: 10 },
  { date: "May 1", positive: 75, neutral: 15, negative: 10 },
  { date: "May 2", positive: 73, neutral: 17, negative: 10 },
  { date: "May 3", positive: 76, neutral: 14, negative: 10 },
];

// ─────────────────────────────────────────
// PUSH NOTIFICATIONS (demo triggers)
// ─────────────────────────────────────────
export const demoNotifications = [
  {
    id: "notif_001",
    label: "New 1-Star Alert",
    title: "New Critical Review",
    body: "Brandon K. left a 1-star review at Midtown Houston — allergy concern flagged.",
    deepLink: { screen: "ReviewDetail", params: { feedbackId: "fb_056" } },
    icon: "⚠️",
    color: "#EF4444",
  },
  {
    id: "notif_002",
    label: "Survey Completed",
    title: "New Guest Feedback",
    body: "Courtney B. just completed a survey at Brentwood Nashville — 5 stars.",
    deepLink: { screen: "ReviewDetail", params: { feedbackId: "fb_072" } },
    icon: "⭐",
    color: "#00B388",
  },
  {
    id: "notif_003",
    label: "Weekly Insights Ready",
    title: "Your Weekly Digest Is Ready",
    body: "Brentwood leads the brand. Midtown Houston needs attention. Tap to review.",
    deepLink: { screen: "Insights", params: {} },
    icon: "📊",
    color: "#6366F1",
  },
  {
    id: "notif_004",
    label: "34 Responses Pending",
    title: "Responses Needed",
    body: "34 guest reviews are awaiting a response. Don't let them go cold.",
    deepLink: { screen: "Feed", params: { filter: "unanswered" } },
    icon: "💬",
    color: "#F59E0B",
  },
  {
    id: "notif_005",
    label: "Location Alert: Houston",
    title: "Location Alert",
    body: "Midtown Houston CER dropped 11 points this week. Immediate attention recommended.",
    deepLink: { screen: "Insights", params: { insightId: "ins_001" } },
    icon: "📍",
    color: "#EF4444",
  },
];

// ─────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────

export const getLocationById = (id) => locations.find((l) => l.id === id);

export const getFeedbackById = (id) => feedback.find((f) => f.id === id);

export const getFeedbackByLocation = (locationId) =>
  feedback.filter((f) => f.locationId === locationId);

export const getFeedbackBySentiment = (sentiment) =>
  feedback.filter((f) => f.sentiment === sentiment);

export const getPendingFeedback = () =>
  feedback.filter((f) => !f.responded);

export const getFlaggedFeedback = () =>
  feedback.filter((f) => f.flagged);

export const getFeedbackByFilter = (filter) => {
  if (filter === "unanswered") return getPendingFeedback();
  if (filter === "flagged") return getFlaggedFeedback();
  if (filter === "positive") return getFeedbackBySentiment("positive");
  if (filter === "neutral") return getFeedbackBySentiment("neutral");
  if (filter === "negative") return getFeedbackBySentiment("negative");
  return feedback;
};

export const getInsightById = (id) => insights.find((i) => i.id === id);

export const getRecentFeedback = (count = 20) =>
  [...feedback]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, count);

export const getStarDistribution = () => {
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  feedback.forEach((f) => { dist[f.rating] = (dist[f.rating] || 0) + 1; });
  return dist;
};

export const getCategoryBreakdown = () => {
  const breakdown = {};
  feedback.forEach((f) => {
    breakdown[f.category] = (breakdown[f.category] || 0) + 1;
  });
  return Object.entries(breakdown)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
};
