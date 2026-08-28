# Product Requirements Document (PRD): Community Group Buying Platform MVP

**Project Name:** LetsStack (formerly GroupBuy)  
**Tagline:** "Let's Stack. Let's Save Together."  
**Target Audience:** Indian Consumers in Tier 1 & 2 Cities (Hyderabad, Bangalore, Mumbai, etc.)  
**Version:** 3.1 (Platform Rebrand, Terminology Standardization & Union-of-Access Visibility Architecture)  
**Author:** Suraj Kalangi  
**Date:** August 22, 2026  
**UI/UX Source of Truth:** `updated_stitch_groupbuy/` directory & `groupbuy-web/` application  

---

## 1. Executive Summary

GroupBuy is a community-driven group buying platform for Indian consumers where trusted social circles (apartment residents, office colleagues, friends, family members) pool together to purchase products and services in bulk at lower prices, or to collectively make things happen that wouldn't be possible individually. The platform replaces fragmented WhatsApp coordination with a streamlined digital experience — one-click participation, escrow-based payments, and built-in trust mechanisms. 

The scope of collective buying on the platform is limitless. It empowers value-conscious and aspirational buyers alike to aggregate their demand—whether they are pooling resources for farm-fresh seasonal produce, booking luxury group vacations, negotiating fleet-level discounts with car dealerships, or organizing a dance tutor for their community's teenagers. By uniting their purchasing power, communities unlock massive savings, exclusive deals, and collective experiences that would be impossible to secure individually.

**MVP Goal:** Launch a functional mobile-first web app that allows users to create groups, post deals ("pools"), collect commitments, handle payments securely, and coordinate fulfillment — all within their trusted social circles, with a focus on ease of use and trust while fostering a sense of community. 

---

## 2. Target Audience & Market Context

- **Primary Audience:** Value-conscious urban dwellers in Tier 1 and 2 cities (apartment residents, office colleagues, friend circles, family groups).
- **Market Nuances:**
  - **UPI-First:** High penetration of UPI for payments.
  - **Social Trust:** Heavy reliance on WhatsApp for community coordination. The platform leverages pre-existing trust within social circles.
  - **Trusted Circles:** The platform's organizing principle is social trust (knowing the people you buy with), not geographic proximity. While many Clans happen to be location-based (apartment complexes, offices), others are friend groups, alumni networks, or family circles spread across a city.
  - **Value-Driven:** Strong motivation for discounts, "best deals," and enabling collective experiences.

---

## 2.5 Platform Philosophy — Why GroupBuy Exists

### The Core Problem

People already pool purchases informally in real life — splitting a bulk mango order with neighbors, coordinating Diwali gift hampers with colleagues, rallying friends for a group resort booking. **But this behavior is rare, not because people don't want it, but because the friction of making it happen is too high.**

The friction comes from multiple layers:

| Barrier | Reality |
|---------|---------|
| **Finding people with the same need** | You'd have to individually ask everyone you know if they're interested. In a busy life, most people simply won't bother. |
| **Social awkwardness of reaching out** | Many people feel uncomfortable broadcasting a purchasing plan — it can feel "needy," invite judgment, or face the embarrassment of rejection when actively reaching out. |
| **WhatsApp status is a poor tool for this** | Some try posting on WhatsApp status, but: it expires in 24 hours, provides incomplete details, has low engagement, and many users simply don't use the status feature for this kind of purpose. |
| **Coordination overhead** | Even when a group forms, coordinating quantities, collecting payments, tracking commitments, and handling dropouts is exhausting. The "organizer tax" burns social capital. |
| **Stranger aversion** | Platforms that pool strangers (like traditional group buying apps) don't work for Indian consumers who rely heavily on social trust for purchasing decisions. |

**The result:** Collective buying — which could save significant money for everyone involved — almost never happens because the effort and social risk outweigh the perceived benefit.

### What GroupBuy Solves

At its core, GroupBuy is a **social payments platform**. It integrates money transfers and escrow pooling directly into community-focused networks. It allows users to safely pool money while interacting with friends, colleagues, or neighbors in a social environment.

GroupBuy eliminates friction by providing a structured, low-effort, socially comfortable way to coordinate collective purchases:

1. **No awkward outreach needed** — A host simply creates a Pitch with detailed information and leaves it for the community to discover. Only people with genuine interest engage. No chasing, no convincing, no rejection.
2. **Interest finds you** — Instead of broadcasting on WhatsApp status or individually messaging contacts, the Pitch sits within a trusted Clan where members browse at their own pace. The right audience self-selects.
3. **Coordination is automated** — Commitment tracking, threshold mechanics, escrow payments, and deadline management are handled by the platform. The host doesn't have to chase anyone.
4. **Trust is built-in** — Because you're pooling with your apartment residents, office colleagues, or friend circle, there's inherent accountability. Nobody disappears with the money.
5. **The organizer is rewarded, not punished** — Host reputation scores, transparent dashboards, and structured workflows make organizing a collective purchase a manageable task rather than a social burden.

### The Coordination Challenge — A Broader Opportunity

Beyond purchasing, there's a deeper, universal problem: **people have stopped coordinating with each other.** Corporate jobs, family commitments, and individual schedules have made it so hard to align with others that many people have stopped trying. They skip the group trip, skip the group movie, and default to solo decisions — even when collective action would be cheaper, more fun, or simply better.

GroupBuy's Pitch model is inherently a coordination tool. A host proposes, sets a threshold and deadline, and the community self-selects. If enough people align, it happens. If not, no harm done.

**If GroupBuy can reduce coordination friction broadly — not just for purchases but for collective experiences and plans — it becomes a platform people open habitually, not just when they want a discount.** This is the path to becoming a driver of user engagement and a base layer for community activity.

### The Trust-Based Ecosystem (Long-Term Vision)

As the platform matures and communities build history together, a natural trust ecosystem emerges:

- **Peer confidence:** When 30 families in your clan back a pitch, it signals quality — you buy with the confidence that your community has validated it.
- **Collaborative discovery:** A member creates a Wish Pitch about buying an AC for summer. Others with the same plan join the discussion, compare models and brands, and collectively decide what to buy. Users feel they're not alone in the process.
- **Trust-based buyers:** A segment of users who don't just buy for savings, but because their trusted circle's endorsement gives them confidence in the purchase decision.

This isn't a feature to build — it's an emergent behavior that the platform should nurture by keeping communities active, engaged, and transparent.

### GroupBuy vs. Adjacent Models

| Model | Example | How GroupBuy Differs |
|-------|---------|---------------------|
| **Marketplace / Classifieds** | OLX, Quikr | GroupBuy is NOT a marketplace. Nobody lists items for sale. A host *organizes* a collective purchase from an external source. |
| **Neighborhood Commerce** | MyGate Buy & Sell | MyGate enables peer-to-peer selling of pre-loved items within your apartment. GroupBuy enables community-to-source collective buying — pooling demand for new products, services, and experiences from external sources at wholesale prices. |
| **Discount / Coupon Platform** | CRED, CashKaro | These find existing deals. GroupBuy *creates* savings that didn't exist before — through collective purchasing power. |
| **Traditional Group Buying** | Pinduoduo | Pinduoduo pools strangers for volume discounts. GroupBuy pools trusted circles — eliminating the discomfort of coordinating with unknowns. |
| **WhatsApp Groups** | Informal coordination | WhatsApp is great for discussion and casual chat, but breaks down when you need firm commitments, payment tracking, threshold management, dropout handling, and accountability. GroupBuy handles the structured coordination layer that WhatsApp can't. See detailed analysis below. |

### Why WhatsApp Groups Are Not Enough — And How GroupBuy Coexists

**The honest truth:** For small, simple, low-stakes coordination (5 colleagues ordering lunch), WhatsApp works fine. GroupBuy doesn't need to replace that. The question is: **where does WhatsApp break down?** — because that's where GroupBuy's real value begins.

#### The WhatsApp Group Buying Lifecycle — Where It Falls Apart

| Phase | What happens on WhatsApp | Where it breaks |
|-------|-------------------------|-----------------|
| **1. Initiation** | Someone messages: "Hey, anyone interested in ordering mangoes from XYZ farm? ₹400/crate if we get 20+ crates." | The message gets buried under other group chat within hours. Members who check later never see it. No structured details, no images, no persistent visibility. |
| **2. Gauging interest** | A few people reply "interested 👍", others say "how much?", some say nothing. | "Interested" ≠ committed. The organizer has no idea how many are genuinely in. There's no way to distinguish "I'm thinking about it" from "I'm IN and here's my money." |
| **3. Chasing commitments** | The organizer has to individually follow up: "Hey, you said you were interested. Are you in?" | This is where social friction peaks. Nobody wants to be the person sending repeated follow-ups. It feels pushy, it burns social capital, and many organizers quit here. |
| **4. Collecting money** | "Please send ₹1,200 to my GPay." | Some pay immediately, some delay, some pay the wrong amount. The organizer manually checks each payment notification. No consolidated view of who paid and who hasn't. Awkward follow-ups ensue. |
| **5. Threshold tracking** | The farm needs 20 crates minimum. We have 14. | There's no live progress bar. The organizer mentally tracks the count. If they're short, they have to personally recruit more people. If someone drops out, the count goes backward and nobody knows automatically. |
| **6. Dropouts** | 3 people drop out after committing. Now the organizer is ₹3,600 short. | No cancellation fees, no accountability for dropouts. The organizer either covers the shortfall, finds replacements, or cancels the entire thing — refunding everyone manually. |
| **7. Failure / Cancellation** | The deal doesn't reach threshold. Everyone needs their money back. | The organizer has to manually refund 15+ people via individual UPI transfers. This process alone is exhausting enough to ensure they never organize again. |
| **8. Post-purchase** | "Orders have arrived! Pick up from the clubhouse 5-8pm." | No tracking of who collected. No record of the transaction. 2 months later when someone asks "who was that mango guy?", it's buried under thousands of messages. |

#### Where WhatsApp Works vs. Where GroupBuy Takes Over

| Aspect | WhatsApp | GroupBuy |
|--------|----------|---------|
| **Casual discussion & chat** | ✅ Great | ❌ Not our job |
| **Broadcasting an idea** | 🟡 Okay for small groups | ✅ Structured Pitch with details, visible to entire Clan |
| **Firm commitments** | ❌ "Interested" ≠ committed | ✅ Escrow-backed commitment — money talks |
| **Payment collection** | ❌ Manual, per-person, no tracking | ✅ Automated escrow, consolidated dashboard |
| **Live progress tracking** | ❌ Mental math by organizer | ✅ Real-time progress bar (14/20 committed) |
| **Threshold enforcement** | ❌ Organizer decides subjectively | ✅ Automatic: goal met → order proceeds; goal not met → auto-refund |
| **Dropout protection** | ❌ Zero accountability | ✅ Cancellation fees after threshold, escrow holds |
| **Refunds on failure** | ❌ Manual UPI transfers to each person | ✅ Automatic full refund to all participants |
| **Transaction history** | ❌ Buried in chat scroll | ✅ Persistent record of all pitches, participants, outcomes |
| **Repeat coordination** | ❌ Start from scratch every time | ✅ Pitch history, clan memory, recurring potential |
| **Scale (20+ people)** | ❌ Chaos — messages unread, coordination impossible | ✅ Designed for community-scale coordination |

#### The Strategic Insight: Complement, Don't Compete

GroupBuy should **not** position itself as a WhatsApp replacement. It should position itself as **the structured layer that WhatsApp can't provide.** The natural flow is:

1. **Discussion happens on WhatsApp** (as it always does) — "Hey, should we do a bulk mango order this season?"
2. **When the group decides to act**, someone creates a **Pitch on GroupBuy** with all the details
3. **They share the Pitch link back to the WhatsApp group** — "Here's the link, join if you're in"
4. **Members click, see structured details, and commit with escrow** — no more "interested 👍" ambiguity
5. **The platform handles everything from there** — tracking, payments, thresholds, deadlines, refunds

**WhatsApp is where you talk. GroupBuy is where you commit.**

This positioning is critical because:
- It doesn't ask users to abandon a platform they love (WhatsApp)
- It doesn't compete with established behavior (group chat)
- It solves the exact moment where WhatsApp fails: the transition from "discussing an idea" to "actually making it happen"
- The WhatsApp share feature already built into GroupBuy enables this exact flow

#### When Users Will Switch (The Trigger Events)

Users don't switch to a new tool because it's "better." They switch when pain from the current approach becomes unbearable. The trigger events that drive adoption:

| Trigger | What happened | What they'll think |
|---------|--------------|-------------------|
| **"I lost money"** | Someone collected payments informally and the deal fell through. Refunds are messy or never come. | "I wish there was an escrow system." |
| **"Never again"** | An organizer spent days chasing 20 people for payments, handling 5 dropouts, and manually refunding 8 people when the deal failed. | "I'm never organizing anything again." → Unless a tool does it for them. |
| **"Nobody follows through"** | 15 people said "interested" on WhatsApp. 4 actually paid. The deal collapsed. | "I wish 'interested' meant committed." |
| **"We couldn't get enough people"** | The message got buried in chat. Half the group never saw it. Threshold wasn't met. | "I wish there was a way to keep this visible longer." |
| **"It was so awkward to chase people"** | The organizer had to personally message 12 people asking for payment. Some ghosted. | "I wish the platform collected money automatically." |

**The key insight:** GroupBuy doesn't need to convince happy WhatsApp users to switch. It needs to be there when WhatsApp coordination fails — and it will fail, because it always does at scale. The platform wins by being the obvious answer when the pain becomes real.

### Platform Principles

1. **Savings first** — The primary value is always cost savings through pooled purchasing power. Everything else is built on this foundation.
3. **Let interest find you** — The Pitch model is designed so that hosts never have to hard-sell or cold-outreach. Create, share to your Clan, and let the right audience self-select.
4. **Trusted circles, not strangers** — The organizing principle is social trust. People buy with those they already know — neighbors, colleagues, friends, family.
5. **Coordination as a feature** — Every Pitch is inherently a coordination mechanism. If enough people align before the deadline, it happens. The platform handles the logistics of alignment.
6. **Show the humans** — Every pool should feel like it's organized by a real person for real people, not an algorithm or a faceless brand.
7. **Make it normal** — The platform should normalize collective buying, making it feel like a routine habit rather than an unusual effort. As friction drops, adoption broadens.
8. **Complement, don't compete** — LetsStack coexists with WhatsApp and existing group dynamics. It doesn't replace the conversation — it replaces the chaos that follows the conversation.

---

## 2.6 Clan Security & Stranger Infiltration Prevention

In LetsStack, **Private Clans** (apartment societies, office colleagues, family & friend circles) represent trusted social boundaries. Maintaining absolute privacy and preventing stranger infiltration is vital to user safety and legal compliance.

### 2.6.1 Strict Zero-Access Rule for Pending Members
* **No Grace Periods:** Prospective members who scan an openly distributed QR code or click a private clan invite link are placed into a `pending_approval` queue.
* **Strict Zero-Access:** While in `pending_approval` status, the user has **0 visibility** into the clan's active pools, participant lists, prices, photos, or discussion threads. They see only a generic clan header and a "Request Sent — Waiting for Lead Approval" state. This eliminates data leakage to unauthorized outsiders or infiltrators.

### 2.6.2 Best Practices & Safeguards for Clan Leads
Clan Leads are equipped with lightweight, powerful administrative tools:
1. **Identity & Verification Badges:** Clan leads can review applicant profiles, verification notes (e.g. Flat/Tower number or corporate email domain), and mutual contact endorsements before granting approval.
2. **Dynamic Invite Links with Expiry:** Clan leads can generate time-limited (e.g. 48 hours) or max-use (e.g. 20 joins) invite links for specific onboarding campaigns (e.g., apartment annual general meetings).
3. **Instant Link Revocation:** If an invite link or QR code is leaked to public forums or unauthorized third parties, the clan lead can revoke and regenerate the invite token in 1 tap, instantly invalidating previous links.
4. **1-Tap Member Removal & Blacklisting:** Suspicious or disruptive accounts can be removed immediately by clan leads, automatically revoking access to all private clan pools.

---

## 2.7 Strategic Product Thesis: High-Margin, High-Ticket Demand Aggregation vs. Low-Margin FMCG Groceries

### 2.7.1 Why LetsStack Focuses on High-Margin & High-Ticket Sourcing
Traditional group-buying platforms in India that focused on low-ticket groceries (vegetables, fruits, daily dairy milk, bread, FMCG) suffered from severe unit economic degradation:
- **Thin Vendor Margins:** Daily produce and FMCG have wafer-thin distributor margins (4–8%), leaving zero room for meaningful bulk discounts without subsidized logistics.
- **High Perishability & Delivery Friction:** Daily produce requires hyper-local cold chain and daily morning fulfillment runs, resulting in high customer dissatisfaction when 1–2 items are bruised.
- **Intense Quick-Commerce Saturation:** Quick commerce (Blinkit, Zepto, Instamart) delivers low-ticket groceries in 10 minutes, making users unwilling to wait 3–5 days to save ₹20 on tomatoes.

**LetsStack's Strategic Positioning:**  
LetsStack aggregates demand for **high-margin, high-ticket, fragmented services and products** where collective buying creates **massive, undeniable price advantages** (15% to 60% savings) that justify waiting 3–7 days for bulk dispatch or on-site service booking:

| Target High-Margin Category | Fragmented Demand Problem | LetsStack Collective Sourcing Solution |
|---|---|---|
| **Home Infrastructure & Major Appliances** | Individual homeowners pay full MRP (₹45k+) for ACs, RO purifiers, and balcony pigeon/mosquito nets with expensive standalone installation. | Direct distributor wholesale lots (4–10 units) with bundled free master technician installation and bulk copper piping. |
| **Rooftop Solar Systems** | Villa and gated society homeowners face fragmented ₹2.5L+ quotes from local solar EPC installers. | 5-villa collective procurement unlocks tier-1 bifacial panels, net-metering liaison, and 25-year manufacturer warranty at ₹1.75L/unit. |
| **Weddings & Auspicious Events** | Mehndi artists, Nadaswaram troupes, and handloom weavers charge hefty peak-season surge fees for single events. | 5–10 wedding event bulk booking allows master artisan studios to optimize their seasonal schedule, offering 40–50% savings to brides and families. |
| **Gym Hardware & Recovery Tech** | Premium fitness gear (hex dumbbells, percussion massage guns, Olympic barbell racks) mark up 300% in retail fitness showrooms. | Direct OEM factory carton orders split among fitness clan members at ₹1,850/massage gun (retail ₹4,500). |
| **Move-In Services & Deep Cleaning** | New flat buyers and tenants pay steep individual rates for deep cleaning, sofa sanitization, and Bayer pest control. | Apartment or society cluster bookings where technicians service 5–10 flats consecutively on the same weekend. |
| **Pet Parent Sacks & Vet Drives** | Premium imported dog kibble (Farmina/Royal Canin 12kg) and annual 7-in-1 vaccinations cost a premium per pet. | Breeder master-sack splits and licensed on-site society vaccination camps. |
| **Digital Software & Cloud Subscriptions** | Family and developer tiers for streaming, cloud storage, and AI tools go under-utilized individually. | 4-5 trusted friends/colleagues share annual multi-seat slots securely with auto-renew escrow. |
| **Group Travel, Retreats & Remote Activities** | Chartered 12-seater Urbania tours, heritage estate bungalows, and remote global study programs require group thresholds. | Zero-risk escrow threshold pooling where seats confirm once target headcount is achieved. |

### 2.7.2 Core Affinity Clan Taxonomy & Sourcing Profiles (Backend & Catalog Standards)

The platform supports specialized community verticals with tailored sourcing economics:

1. **Fitness & Home Gym (`clan-fitness`)**:
   - *Target Products*: Quick-dial adjustable dumbbells (5–40kg pair with stand), dual-frequency body composition weight scales, standalone GPS smartwatches, rubber-encased cast-iron hex dumbbell pairs, high-density dual-layer 6mm TPE mats, high-torque brushless percussion massage guns.
   - *Sourcing Route*: Certified foundry clusters (Jalandhar, Ludhiana) and wearable tech OEMs.
   - *Economics*: 50%–68% savings by eliminating fitness showroom real estate markups.

2. **Toddlers & New Parents (`clan-parents`)**:
   - *Target Products & Services*: Society-cluster dedicated verified pediatric caretakers & nannies, 3-in-1 convertible solid beechwood high chairs, retractable baby safety gates with childproofing kits, wholesale master diaper cartons, Channapatna non-toxic sensory wooden toy sets, on-site society clubhouse infant CPR & first-aid workshops.
   - *Sourcing Route*: Accredited Montessori childcare agencies, European beechwood furniture artisans, Begumpet FMCG master distributors, and certified pediatric emergency medical trainers.
   - *Economics*: 55%–68% savings via shared monthly agency retainers and master carton splits.

3. **New Home & Flat Setup (`clan-newtocity`)**:
   - *Target Products & Services*: Sectional sofas with integrated recliners, full-length arched floor dressing mirrors, modular steel frame storage wardrobes, 100% thermal blackout heavy linen drapes, digital air fryer + 750W mixer grinder kitchen combos, tri-ply stainless steel induction cookware starter sets, foldable stainless balcony drying racks, pre-filled XXL corduroy bean bags, 300 TC King Glace cotton bedsheet + pillow sets, balcony pigeon safety nets, 6-inch orthopedic HR foam mattresses, move-in deep cleaning combos, mobile foldable laptop desks, and pre-summer split AC foam jet wash servicing.
   - *Sourcing Route*: Jodhpur & Bengaluru furniture OEM clusters, architectural float glass factories, Surat textile weaving mills, Panipat export clusters, and certified HVAC/cleaning guilds.
   - *Economics*: 50%–67% savings via direct tempo-van drops and batch technician appointments.

4. **Weddings & Auspicious Events (`clan-wedding`)**:
   - *Target Products & Services*: Fresh Madurai jasmine flower strings (air cargo), bridal Poola Jada & rose Varmala sets, Pochampally semi-silk return gift sarees, bridal & family mehndi studio artist packages, live hereditary temple Nadaswaram & Thavil 4-artist troupes, solid cast brass peacock Diya return gifts, BIS-hallmarked 999 pure silver coins & Kumkum bowls, authentic pure-ghee Brahmin catering buffets (35–60 guests), handcrafted velvet trousseau display trays, and royal groom Safa & family Pagdi tying master artists.
   - *Sourcing Route*: Madurai floral cargo mandis, Pochampally handloom weaving societies, Nachiarkoil brass artisans, MMTC-PAMP authorized bullion partners, and master hereditary culinary/turban guilds.
   - *Economics*: 40%–65% savings by booking studio teams and wholesale lots across consolidated seasonal muhurtham dates.

5. **Pet & Dog Parents (`clan-dogs`)**:
   - *Target Products & Services*: Breeder master-sack Royal Canin/Farmina dry kibble splits into sealed 5kg food-grade desiccant tubs, and on-site Sunday community dog park vaccination & health check camps.
   - *Sourcing Route*: Authorized southern pet feed distributors and licensed mobile veterinary surgeons.
   - *Economics*: 40%–55% savings on monthly pet nutrition and preventive healthcare.

---

## 2.8 Fulfillment & Accessibility Architecture: Dynamic Badge & Proximity Filtering Engine

The platform must clearly communicate to every user whether and how they can participate in a pool based on physical location, courier coverage, society residency, or digital access.

### 2.8.1 Delivery Mode Hierarchy & Badge Priority
Pools are classified into four delivery modes at creation, and rendered dynamically to the viewing user:

1. **`🌐 Remote / Global Activity` (e.g. Network School Kazakhstan):**
   - Non-physical program or virtual cohort open to participants anywhere in the world.
   - Badge: `🌐 Remote` with tooltip *"Remote / Global Program • Open to participants anywhere"*.
   - **Proximity Behavior:** Always accessible regardless of user GPS or distance radius filters.

2. **`📦 Pan-India Courier` (e.g. Card Sleeves, Handloom Sarees, Brass Gift Sets):**
   - Physical merchandise shipped via Speed Post or express national couriers.
   - Badge: `📦 Pan-India` with tooltip *"Dispatched nationwide via courier to your door"*.
   - **Proximity Behavior:** Always accessible nationwide across all distance radius filters.

3. **`🚚 Doorstep Delivery / On-Site Service` (e.g. AC Installation, Mehndi Artists, Deep Cleaning):**
   - Host/vendor services specific designated city localities (e.g., Hitec City, Gachibowli, Tellapur, Madhapur, Whitefield).
   - When the user's active locality matches the pool's serviced zones: Renders **`🚚 Doorstep`** badge (*"Doorstep delivery/service available in your area"*).
   - Takes priority over pickup distance pills because doorstep fulfillment delivers maximum convenience.

4. **`🏠 Your Society` (e.g. Society Clubhouses, Resident AC pools, Balcony Blinds):**
   - Pools hosted exclusively within or tagged to the user's joined society clan (e.g., MyHome Tridasa, Ravidham Complex).
   - If user is away from society premises, renders **`🏠 Your Society`** badge.
   - **Exemption Rule:** Society pools are **strictly exempt from distance radius dropdown filtering** (5km, 15km, 30km) because the user resides there and will receive goods/services at their home/clubhouse.

5. **`📍 Proximity Distance Badges` (e.g. `📍 2.4 km`, `📍 8.5 km`):**
   - For local physical meetups, store group visits, and gaming sessions, proximity is calculated dynamically from the pool's pickup coordinate anchor to the user's current or selected locality.
   - Distance radius filters (5km, 15km, 30km) strictly filter out physical pools outside the user's selected radius (unless the pool is in a joined society clan or is Pan-India/Remote/Digital).

---

## 2.9 Pool Creation UX Architecture

The pool creation wizard (`/pitches/create`) is structured into a frictionless 3-step flow tailored for high-ticket sourcing:

1. **Step 1: Product & High-Value Category Selection:**
   - Interactive category cards grid highlighting high-margin demand clusters (Home Setup, Weddings, Gym Hardware, Deep Cleaning, Baby, Pets, Digital, Travel, Solar).
   - Product photo uploader (16:9 aspect ratio) with preview & delete controls.
   - Seller & brand sourcing metadata (Name, Registration GSTIN) without self-asserted verification checkboxes.

2. **Step 2: Pricing & Capacity Economics:**
   - Cost per unit vs. estimated retail MRP with live % community savings calculation.
   - Minimum threshold units (escrow activation target) and maximum capacity caps.

3. **Step 3: Fulfillment, Serviced Zones & Governance:**
   - **Delivery Mode Selector:** 4 clear cards (Community Pickup, Doorstep Delivery, Pan-India Courier, Digital Delivery).
   - **Doorstep Zone Multi-Select:** City selector tabs (Hyderabad, Bengaluru, Mumbai, Delhi NCR, Pune, Chennai) -> City locality chips multi-select -> Mini search bar to add custom neighborhood zones -> Active selected chips tray with quick removal.
   - **Physical Hub & Landmark Anchor:** Clean address / landmark input with duration timing + One-click Device GPS Coordinate Lock.
   - **Escrow Return Policy Selector:** Standard inspection upon delivery, 7-day replacement, or custom terms.

---

## 3. MVP Scope Definition

### ✅ In Scope (MVP)

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Mobile OTP Login** | Onboarding via mobile number with 6-digit OTP verification (Firebase Auth). Landing page introduces platform value props before sign-in. |
| 2 | **Basic Profile** | Name, phone, email, address (society/office), profile photo |
| 3 | **Clan Creation & Joining** | Create invite-only groups; join via invite link or QR code; basic moderator controls |
| 4 | **Pitch Creation** | Host posts a deal with product details, cost split, deadline, and unit capacity limits |
| 5 | **One-Click Participation** | "I'm In" button to commit to a pitch |
| 6 | **UPI Escrow Payments** | Razorpay UPI mandate — block funds on opt-in; debit on threshold met; auto-refund on failure |
| 7 | **Pitch Chat** | Simple in-pitch comment thread for host-participant communication |
| 8 | **Push Notifications** | FCM-based alerts for pitch updates, threshold met, and delivery status |
| 9 | **WhatsApp Sharing** | Share pitch link externally via WhatsApp |
| 10 | **Basic Reputation Score** | Track reliability; penalize dropouts |
| 11 | **Delivery Confirmation** | Host marks items as "Ready for Pickup"; participants confirm receipt |
| 12 | **Platform Fee** | 2% fee charged on successful pitches; deducted from settlement before host payout. Helps sustain platform operations and availability. Fee percentage may be adjusted as the platform scales. |

### ❌ Out of Scope (Post-MVP)

- Affiliate/wholesaler integration & direct ordering
- AI recommendations & price comparison
- Integrated logistics/delivery partners
- Subscription/premium model
- Gamification (badges, leaderboards)
- Community forums & discussion boards
- Wishlist / demand aggregation
- Event-based group buying
- Product/supplier rating system
- Recurring pitches (auto-scheduling)
- Advanced analytics for hosts
- Dedicated referral/custom invite tracking system

---

## 4. User Roles

| Role | Description |
|------|-------------|
| **User** | Any registered user. Can browse pitches, join groups, and participate in deals. |
| **Host** | A user who creates a pitch. Responsible for placing the bulk order and coordinating delivery. |
| **Moderator (MOD)** | Creator/admin of a Clan. Can approve/remove members, manage group settings. |

> A single user can hold all three roles simultaneously (e.g., MOD of a clan who also hosts pitches and participates in others).

---

## 5. User Journeys

### Journey 1: New User Onboarding

**Actor:** New User  
**Goal:** Sign up, complete profile, and join their first Clan.

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEW USER ONBOARDING                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Landing  │───▶│  Mobile  │───▶│  OTP     │───▶│ Profile  │  │
│  │   Page    │    │  Number  │    │ Verify   │    │  Setup   │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│                                                       │         │
│                                                       ▼         │
│                                        ┌──────────────────────┐ │
│                                        │  Join / Create Clan  │ │
│                                        │  (via invite link    │ │
│                                        │   or browse nearby)  │ │
│                                        └──────────────────────┘ │
│                                                       │         │
│                                                       ▼         │
│                                              ┌──────────────┐   │
│                                              │  Home Feed   │   │
│                                              │  (Clan view) │   │
│                                              └──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Step-by-Step Flow:**

| Step | Screen | Action | System Response |
|------|--------|--------|-----------------|
| 1 | Landing Page | User views value proposition ("Save More, Together"), feature cards (Pool with neighbors, Secure UPI escrow, Trusted circles), and taps "Sign in →" | Navigates to Mobile Number entry |
| 2 | Sign In (Mobile) | User enters mobile number (+91 prefix, country code selector) and taps "Get OTP →" | System sends 6-digit OTP via SMS; shows "SECURE LOGIN" and "ENCRYPTED" trust badges |
| 3 | OTP Verification | User enters 6-digit code (individual digit boxes, auto-advance). Masked number shown (e.g., +91 •••• ••892). Resend timer (60s). "Having trouble? Contact Support" link. | Phone verified; "END-TO-END ENCRYPTED" and "VERIFIED COMMUNITY" trust badges shown |
| 4 | Profile Setup | User enters: Full Name, Email Address, Phone (verified badge), City (dropdown), Society/Locality. Optional profile photo upload (JPG/PNG, max 5MB). "Skip for now" option available. | Profile saved; "Complete Setup" CTA |
| 5 | Join Clan Prompt | User chooses: (a) Enter invite code or link, (b) Browse Nearby Clans, or (c) Create a New Clan. "Why join a Clan?" info card shown. | Navigates to selected option |
| 6 | Home Feed | User sees active pitches in their Clan | Onboarding complete |

**Edge Cases:**
- Returning user (phone already verified) → skip to Home Feed.
- Invalid OTP → allow 3 retries, then cooldown for 60 seconds. "Resend Code" link available after timer expires.
- User skips profile photo → default avatar assigned.
- User skips Clan joining → can still browse public pitches via Discover tab, and can participate in public pitches.

---

### Journey 2: Clan Creation & Management

**Actor:** Moderator (MOD)  
**Goal:** Create a private Clan and invite members.

```
┌─────────────────────────────────────────────────────────────────┐
│                   CLAN CREATION & MANAGEMENT                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Create   │───▶│  Name &  │───▶│ Generate │───▶│  Share   │  │
│  │   Clan    │    │ Location │    │  Invite  │    │  Invite  │  │
│  │  Button   │    │  Setup   │    │   Link   │    │  Link    │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│                                                       │         │
│                                                       ▼         │
│                                            ┌────────────────┐   │
│                                            │  Members Join  │   │
│                                            │  via Link      │   │
│                                            └────────────────┘   │
│                                                       │         │
│                                                       ▼         │
│                                            ┌────────────────┐   │
│                                            │ MOD Approves / │   │
│                                            │ Manages Members│   │
│                                            └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Step-by-Step Flow:**

| Step | Screen | Action | System Response |
|------|--------|--------|-----------------|
| 1 | Home / Groups Tab | MOD taps "Create Clan" | Opens Clan setup form |
| 2 | Clan Setup | MOD enters Clan name (e.g., "Prestige Lakeside Towers"), sets location, optional description | Clan created; MOD assigned as admin |
| 3 | Invite Screen | System generates a unique invite link | Link displayed with copy + share options |
| 4 | Sharing | MOD shares invite link via WhatsApp / SMS | Recipients receive the link |
| 5 | Member Joins | New member clicks link → lands in app → requests to join | MOD receives join request notification |
| 6 | Approval | MOD approves or rejects the request | Member added to Clan; sees Clan pitches |
| 7 | Management | MOD can remove members or transfer MOD role | Member list updated |

**Edge Cases:**
- Minimum 2 members required for a Clan to host pitches.
- A user can be part of multiple Clans (e.g., apartment + office).
- MOD leaves → must transfer MOD role first; cannot orphan a Clan.

---

### Journey 3: Host Creates a Pitch

### Journey 3: Host Creates a Pool (3-Step Wizard)

**Actor:** Host (logged-in member)  
**Goal:** Propose a collective group buying deal for their trusted clans or communities.

```
┌─────────────────────────────────────────────────────────────────┐
│                      POOL CREATION WIZARD                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────────┐  │
│  │   Step 1     │─────▶│   Step 2     │─────▶│    Step 3     │  │
│  │ Product Info │      │ Price & Qty  │      │ Rules & Clans │  │
│  │  & Seller    │      │ (Goal & Cap) │      │ (Visibility)  │  │
│  └──────────────┘      └──────────────┘      └───────────────┘  │
│                                                      │          │
│                                                      ▼          │
│                                             ┌────────────────┐  │
│                                             │   Pool Live!   │  │
│                                             │ Notifications  │  │
│                                             │ Sent to Clans  │  │
│                                             └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Step-by-Step Flow:**

| Step | Screen | Action | System Response |
|------|--------|--------|-----------------|
| **1** | **Product & Media** | Host enters: Product Name, Description, Photos (16:9 ratio), optional Product URL, optional Seller / Vendor Info (e.g., Aquaguard, MuscleBlaze). | Form validates required fields; generates high-quality preview thumbnails. |
| **2** | **Pricing & Capacity** | Host enters: Minimum Order (Goal threshold), Maximum Capacity, Unit Type (kg, box, kit, bottle), Cost per unit (₹). | Real-time preview renders total goal cost, per-unit economics, and auto-pluralized labels (e.g., "5 boxes minimum"). |
| **3** | **Rules, Clans & Visibility** | Host selects: Target Clan(s) (restricted strictly to clans the host belongs to), Pool Deadline (date & time), Pickup/Delivery Instructions, Escrow Payment Mode. | System derives and renders **Pool Visibility** (Public Discovery vs Private Clan Pool vs Direct Link Only) and reviews summary. |
| **Publish** | **Review & Publish** | Host reviews summary and taps "Publish Pool". | Pool is activated; published to tagged clan hubs; notification dispatched to clan members. |

**Host Clan Selection Enforcement (Backend & Frontend):**
* **Frontend:** The clan selector in Step 3 queries `currentUser.joinedClans` and exclusively populates clans the host has active membership in.
* **Backend API (`POST /api/pools`):** Validates that all requested `clanIds` are a strict subset of the authenticated user's joined clans (`payload.clanIds ⊆ host.joinedClanIds`). If a host attempts to tag an unjoined clan, the API rejects the request with `403 Forbidden: Host must be a member of all targeted clans`.

**Pool Data Model (MVP):**

| Field | Type | Required | Example | Description |
|-------|------|----------|---------|-------------|
| `id` | String | Yes | `"pitch-1"` | Unique pool identifier |
| `title` | Text | Yes | `"Alphonso Mangoes (Ratnagiri)"` | Clear, benefit-driven title |
| `description` | Text | Yes | `"Direct farm-sourced Ratnagiri mangoes..."` | Sourcing details and specs |
| `image` | String (URL) | Yes | `"/images/farm-mango-crates.jpg"` | 16:9 landscape product photo |
| `photos` | Array<URL> | No | `["/img1.jpg", "/img2.jpg"]` | Additional gallery images |
| `productLink` | URL | No | `"https://seller.com/deal"` | Reference link |
| `sellerName` | Text | No | `"Ratnagiri Orchards Co."` | Optional seller name |
| `verifiedVendor` | Boolean | No | `true` | Enables Blue Checkmark badge |
| `unitPrice` | Number (₹) | Yes | `600` | Per-unit price |
| `unit` | Text | Yes | `"crate"` | Unit label (box, kit, litre) |
| `minParticipants` | Number | Yes | `10` | Minimum Goal threshold |
| `maxParticipants` | Number | Yes | `25` | Maximum capacity limit |
| `clanIds` | Array<ID> | Yes | `["clan-1", "clan-2"]` | Tagged host clans |
| `visibility` | Enum | Yes | `'public'` \| `'restricted'` \| `'unlisted'` | Derived via Union of Access |
| `deadline` | DateTime | Yes | `"2026-08-30T18:00:00Z"` | Expiry timestamp |
| `pickupPoint` | Text | Yes | `"Clubhouse Lobby / Gate 2"` | Physical collection instructions |
| `geoCoordinates` | Object | No | `{ lat: 17.4435, lng: 78.3772 }` | Pickup hub coordinates for proximity filtering |
| `poolPolicies` | Object | Yes | `{ returnPolicy: 'exchange_only', quitPolicy: 'standard' }` | Return & cancellation rules |
| `status` | Enum | Yes | `'active'` \| `'activated'` \| `'expired'` \| `'completed'` | Pool lifecycle state |

---

## 3.4 Geolocation Proximity Engine for Public Clan Pools

For public and city-wide clans (e.g., *West Hyderabad Collective*, *Festive & Seasonal Collective*), physical bulk goods (farm produce, bakery items, bulk appliances) require convenient local pickup.

### 3.4.1 Haversine Proximity Calculation
* Every pool with physical pickup includes designated hub coordinates (`lat`, `lng`).
* When a user browses public feeds or searches for deals, the platform calculates the geographic distance between the user's saved/detected location and the pool's pickup hub:
  $$d = 2R \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)$$
* **Card Indicator:** Displays proximity badge on pool cards (e.g., `📍 2.4 km from your location • Gachibowli Hub`).

### 3.4.2 Proximity Filter Chips
* Users can filter public discovery feeds using distance radius chips:
  - **Nearby (Within 5 km)**: Hyper-local apartment and neighborhood pools.
  - **City Hubs (Within 15 km)**: Metro-wide community bulk orders.
  - **All Public Deals**: All open city pools.
  - **Remote / Pan-India**: Digital subscriptions, Kickstarter board games, or delivered goods with no geographic constraint.

---

## 3.5 Demand Aggregation, MOQ Unlocking & B2B/B2C Sourcing Mechanics

LetsStack turns fragmented individual demand into structured, high-volume collective purchasing power:

1. **Unlocking Wholesale Minimum Order Quantities (MOQs):**
   - Direct manufacturers and farm cooperatives often require large minimum orders (e.g. 50 crates of mangoes, 20 solar inverters, or 30 corporate health packages).
   - An individual buyer cannot meet the MOQ alone. Through LetsStack, a host creates a Pool setting the MOQ as the `Minimum Order (Goal)`.
2. **Tiered Price Unlocking (Dynamic Group Discounts):**
   - As more participants join, higher volume thresholds unlock deeper bulk discounts (e.g., 10 units = 15% off; 25 units = 30% off).
3. **Manufacturer & Direct-to-Consumer (D2C) Sourcing:**
   - Eliminates retail middleman margins. The host sources directly from the factory/farm gate, passing the 20–40% wholesale discount directly to clan members.

---

## 3.6 Pool Visuals, Content Standards, Expired Pool Governance & Vendor Verification

### 3.6.1 Pool Card Image Dimensions, Aspect Ratio & Subject Framing Standards
* **16:10 / 16:9 Landscape Card Container:** All pool cards across feeds, clan hubs, and bento discovery grids use a responsive landscape container (`aspect-ratio: 16 / 10; object-fit: cover; object-position: center;`). Minimum recommended upload resolution: `1280 × 800 px` (WebP or optimized JPEG under 500 KB).
* **Tall & Portrait Subject Framing (Zero-Clipping Rule):**
  - For vertically oriented products (e.g. full-length arched mirrors, double-tier clothes drying racks, modular storage wardrobes, toddler high chairs), the product must not be cropped at the top or bottom.
  - Images must be centered and scaled within a 16:10 canvas with matching ambient room/wall/sky tone padding or subtle ambient room background extension, ensuring 100% of the product (head-to-toe) is clearly visible and highlighted without distortion.
* **Visual-to-Deliverable Fidelity & Truthfulness:**
  - The photographic asset attached to a pool must strictly and accurately depict what is provided in the pool's stated title, unit, and description.
  - Do not show unincluded accessories in the hero image (e.g. if offering a standalone beanbag lounger without an ottoman, the photo must showcase the lounger accurately without portraying an unincluded ottoman, and vice versa).

### 3.6.2 Consumer-Friendly Pool Titles & Tone Guidelines
* **Simple, Relatable Titles for Everyday Consumers:**
  - Titles must be formatted in plain, easy-to-read language suitable for general consumers rather than industrial engineers or B2B procurement agents.
  - **No Industrial Codes or Technical Jargon in Titles:** Industrial grade codes (e.g. `SUS304`, `SS304`, `BIA Dual-Frequency`, `16 Bio-Metrics`, `PPG Sensors`, `GNSS`) belong strictly in the product specifications/description, not in the title.
  - **Minimize Hyphenation (`-`) and Em-Dashes (`—`):** Titles should use natural conversational connectors (e.g. `with`, `and`, commas, or parentheses) instead of excessive hyphenation.
* **Transparent Sourcing Rationale:**
  - Organizers should clearly articulate the exact sourcing route (direct foundry batches, Surat weaving mills, Panipat export clusters, accredited Montessori childcare agencies), local retail showroom comparisons, and the group buying economic advantage.

### 3.6.3 Strict Separation: Product Specifications vs. Return Policies
To maintain legal precision and customer trust, product features and return policies must never be commingled:
* **Product Description (`description`):** Strictly contains product features, manufacturing craftsmanship, dimensions, materials, motor wattage, accessories, certifications, and usage guides.
* **Return Policy (`pitchPolicies` / `returnPolicyCustom`):** Strictly contains legal return windows (e.g., 7-day transit damage, unboxing defects), manufacturer warranty coverage (e.g., 2-year dial mechanism warranty, 5-year frame warranty), cancellation fees (0% to 10%), and replacement terms.

### 3.6.4 Economic Realism & Wholesale Feasibility
* Quoted wholesale pool prices must reflect genuine wholesale OEM unit economics (accounting for raw material minimum costs, assembly, and bulk logistics) while delivering realistic 50–68% group savings over retail MRP.

### 3.6.5 Verified Vendor vs. Host Sourcing Disclaimers
* **Verified Vendor Badge (Blue Checkmark):** When a pool is officially organized or fulfilled directly by an authorized brand, distributor, or registered vendor (e.g., Aquaguard, MuscleBlaze, Lenskart), a **Verified Partner / Blue Tick Badge** is rendered alongside the seller's name.
* **Host Sourcing Liability Disclaimer:** When a pool is organized by an individual community host (peer-to-peer), a subtle disclaimer informs participants: *"Organized by community host {Host Name}. Sourced independently on behalf of clan members."*

### 3.6.6 Expired Pool Lifecycle & Archival Governance
* **Automatic Discovery Filtering:** As soon as a pool's deadline passes, it is automatically removed from active feeds (Home Feed, Global Search, Discover, and Clan Active tabs).
* **New Joins & Payments Disabled:** Tapping an expired pool displays a gray "Pool Expired / Closed" badge with disabled action buttons.
* **Unsuccessful Threshold Trigger:** If the deadline passes without meeting the Minimum Order Goal, all escrow mandates are instantly canceled and zero charges occur.
* **Read-Only Archival:** Expired and completed pools remain permanently accessible in read-only mode under **"My Pools > History"** for accounting, reputation scoring, and repeat pool cloning.

---

### Journey 4: Participant Joins a Pitch

**Actor:** Participant (Clan member)  
**Goal:** Find a deal, commit to it, and authorize payment.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PARTICIPANT JOINS A PITCH                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌───────────────┐ │
│  │  Browse   │───▶│  View    │───▶│  Tap     │───▶│  Select Qty   │ │
│  │  Clan     │    │  Pitch   │    │ "I'm In" │    │  + Optional   │ │
│  │  Feed     │    │  Details │    │  Button  │    │    Note       │ │
│  └──────────┘    └──────────┘    └──────────┘    └───────────────┘ │
│                                                         │           │
│                                                         ▼           │
│                                              ┌────────────────┐     │
│                                              │  UPI Mandate   │     │
│                                              │  Authorization │     │
│                                              │  (Funds Blocked│     │
│                                              │   NOT debited) │     │
│                                              └────────────────┘     │
│                                                         │           │
│                                                         ▼           │
│                                              ┌────────────────┐     │
│                                              │  "You're In!"  │     │
│                                              │  Confirmation  │     │
│                                              └────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
```

**Step-by-Step Flow:**

| Step | Screen | Action | System Response |
|------|--------|--------|-----------------|
| 1 | Clan Feed | User sees active pitches with summary cards (product, price, committed units, deadline countdown) | Pitches sorted by deadline (urgent first) |
| 2 | Pitch Detail | User taps a pitch card → views full details (description, photos, cost breakdown, host info, current committed units count) | Displays remaining units and countdown |
| 3 | "I'm In" | User taps "I'm In" button | Opens quantity selector + optional private note field |
| 4 | Quantity & Note | User selects quantity (e.g., "2 boxes"), optionally adds a private note (e.g., "I want the ripe ones") | Amount calculated (e.g., ₹1200 for 2 boxes) |
| 5 | Payment Auth | If payment mode is UPI Escrow: user authorizes UPI mandate via Razorpay (funds **blocked**, not debited) | Mandate created; confirmation shown |
| 5a | Payment Auth (Alt) | If payment mode is Cash on Delivery: user confirms commitment (no UPI mandate) | Commitment recorded |
| 6 | Confirmation | "You're In!" screen with summary: product, amount, expected date | Committed units count updated on pitch; host notified |

**Edge Cases:**
- Pitch is full (max capacity reached) → "I'm In" button disabled; show "Pitch Full" label.
- Deadline passed → "I'm In" button disabled; show "Expired" label.
- UPI mandate fails → show error; allow retry; do not count as participant.
- User tries to join their own pitch → allowed (host can be a participant too).

---

### Journey 5: Pitch Threshold Met → Payment & Order

**Actor:** System + Host  
**Goal:** Activate the deal, collect payments, and place the bulk order.

```
┌─────────────────────────────────────────────────────────────────────┐
│                 THRESHOLD MET → PAYMENT → ORDER                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│    ┌────────────────┐         ┌────────────────┐                    │
│    │  Min Threshold │────────▶│  System Debits │                    │
│    │    Reached!    │         │  All UPI       │                    │
│    │                │         │  Mandates      │                    │
│    └────────────────┘         └────────────────┘                    │
│                                       │                             │
│            ┌──────────────────────────┤                             │
│            ▼                          ▼                             │
│   ┌────────────────┐       ┌────────────────┐                      │
│   │  Notify All    │       │  Funds         │                      │
│   │  Participants: │       │  Transferred   │                      │
│   │  "Deal is ON!" │       │  to Host       │                      │
│   └────────────────┘       └────────────────┘                      │
│                                       │                             │
│                                       ▼                             │
│                            ┌────────────────┐                      │
│                            │  Host Places   │                      │
│                            │  Bulk Order    │                      │
│                            │  (externally)  │                      │
│                            └────────────────┘                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Step-by-Step Flow:**

| Step | Trigger | Action | System Response |
|------|---------|--------|-----------------|
| 1 | Min order reached | System detects threshold met | Pitch status → "Activated" |
| 2 | Auto | System debits all blocked UPI mandates | Funds collected from all participants |
| 3 | Auto | Funds transferred to Host's linked account minus **2% platform fee** (settlement summary shown on Host Dashboard) | Host receives payment confirmation with net payout breakdown |
| 4 | Auto | Push notification to all participants: "Deal Activated! 🎉 Your order is being placed." | Participants see updated pitch status |
| 5 | Host Action | Host places the bulk order externally (Amazon, wholesaler, local vendor, etc.) | Host updates pitch status to "Order Placed" |
| 6 | Host Action | Host can optionally share order tracking info in pitch chat | Participants see tracking updates |

**Pitch Failure Flow (Threshold NOT Met):**

| Step | Trigger | Action | System Response |
|------|---------|--------|-----------------|
| 1 | Deadline passes without meeting threshold | System detects expiry | Pitch status → "Expired" |
| 2 | Auto | All UPI mandates are released (auto-refund) | Blocked funds returned to participants |
| 3 | Auto | Push notification: "This pitch didn't reach its goal. Your funds have been released." | Participants see "Expired" status |

---

### Journey 6: Delivery & Fulfillment

**Actor:** Host + Participants  
**Goal:** Host receives bulk order, distributes to participants, everyone confirms receipt.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DELIVERY & FULFILLMENT                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐   │
│  │ Host Receives │───▶│ Host Marks   │───▶│  Participants        │   │
│  │ Bulk Order    │    │ "Ready for   │    │  Notified:           │   │
│  │               │    │  Pickup"     │    │  "Your order is      │   │
│  └──────────────┘    └──────────────┘    │   ready for pickup!" │   │
│                                          └──────────────────────┘   │
│                                                     │               │
│                                                     ▼               │
│                                          ┌──────────────────────┐   │
│                                          │  Participant Picks   │   │
│                                          │  Up Item             │   │
│                                          └──────────────────────┘   │
│                                                     │               │
│                                                     ▼               │
│                                          ┌──────────────────────┐   │
│                                          │  Host Marks          │   │
│                                          │  "Delivered" per     │   │
│                                          │  participant         │   │
│                                          └──────────────────────┘   │
│                                                     │               │
│                                                     ▼               │
│                                          ┌──────────────────────┐   │
│                                          │  Both Rate Each      │   │
│                                          │  Other (1–5 ⭐)      │   │
│                                          └──────────────────────┘   │
│                                                     │               │
│                                                     ▼               │
│                                          ┌──────────────────────┐   │
│                                          │  Pitch Marked        │   │
│                                          │  "Completed" ✅      │   │
│                                          └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

**Step-by-Step Flow:**

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1 | Host | Receives bulk order at their location | — |
| 2 | Host | Taps "Ready for Pickup" in the app | Push notification to all participants with pickup instructions |
| 3 | Participant | Goes to pickup location and collects their items | — |
| 4 | Host | Marks each participant as "Delivered" using a checklist | Participant receives "Delivery Confirmed" notification |
| 5 | System | Prompts Participant to rate Host and Product (1–5 stars) | Ratings saved; reputation scores updated |
| 6 | Host | Clicks "Mark Completed" once all participants are marked delivered/uncollected (button disabled until 100% resolved) | Pitch status → "Completed" ✅ |

**Edge Cases:**
- Participant doesn't pick up within 24 hours → Host sends reminder via app (bell icon); after 48 hours, Host can click "Mark Uncollected" (button enables only after reminder sent). Participant's reputation score is penalized.
- Participant reports an issue (wrong item, damaged) → can raise a dispute via pitch chat; handled manually in MVP.

---

### Journey 7: Participant Drops Out (After Committing)

**Actor:** Participant  
**Goal:** Withdraw from a pitch after clicking "I'm In."

```
┌─────────────────────────────────────────────────────────────────┐
│                    PARTICIPANT DROPOUT                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌───────────┐     ┌─────────────┐     ┌───────────────────┐  │
│   │ Participant│────▶│  Confirm    │────▶│  UPI Mandate      │  │
│   │ taps       │     │  Withdraw?  │     │  Released (if     │  │
│   │ "Leave"    │     │  (Warning)  │     │  before threshold)│  │
│   └───────────┘     └─────────────┘     └───────────────────┘  │
│                                                   │             │
│                                                   ▼             │
│                                          ┌──────────────────┐   │
│                                          │ Reputation Score │   │
│                                          │ Penalized (-1)   │   │
│                                          └──────────────────┘   │
│                                                   │             │
│                                                   ▼             │
│                                          ┌──────────────────┐   │
│                                          │ Host Notified    │   │
│                                          │ "X has left the  │   │
│                                          │  pitch"          │   │
│                                          └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Rules:**

| Scenario | Can Withdraw? | Refund? | Penalty? |
|----------|--------------|---------|----------|
| Before threshold is met | ✅ Yes | ✅ Full refund (mandate released) | ⚠️ Minor reputation penalty |
| After threshold met, before order placed | ❌ No (requires Host approval) | Partial/No refund (Host's discretion) | 🔴 Major reputation penalty |
| After order is placed | ❌ No | ❌ No refund | 🔴 Major reputation penalty |

---

## 6. Pitch Lifecycle (State Machine)

A pitch moves through the following states:

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  DRAFT   │────▶│  ACTIVE  │────▶│ ACTIVATED│────▶│  ORDER   │
│          │     │(accepting│     │(threshold│     │  PLACED  │
│          │     │ join)    │     │  met)    │     │          │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                      │                                  │
                      │ (deadline                        │
                      │  expires)                        ▼
                      ▼                          ┌──────────┐
                 ┌──────────┐                    │  READY   │
                 │ EXPIRED  │                    │  FOR     │
                 │(auto     │                    │  PICKUP  │
                 │ refund)  │                    └──────────┘
                 └──────────┘                         │
                                                      ▼
                                               ┌──────────┐
                                               │COMPLETED │
                                               │   ✅     │
                                               └──────────┘
```

| State | Description |
|-------|-------------|
| **Draft** | Host is creating the pitch (not yet published) |
| **Active** | Pitch is live; accepting participants |
| **Expired** | Deadline passed without meeting threshold; funds auto-refunded |
| **Activated** | Threshold met; funds debited; deal is confirmed |
| **Order Placed** | Host has placed the bulk order |
| **Ready for Pickup** | Host has received the order; participants can collect |
| **Completed** | All deliveries confirmed; ratings submitted |

---

## 7. Technical Requirements (MVP)

| Component | Technology | Notes |
|-----------|-----------|-------|
| **Platform** | Mobile-first PWA | Responsive web app; installable on Android/iOS |
| **Frontend** | React / Next.js | Component-based UI; SSR for SEO |
| **Backend** | Node.js / Express | REST API; scalable architecture |
| **Database** | PostgreSQL | Relational data (users, clans, pitches, payments) |
| **Real-time** | WebSockets (Socket.io) | Live pitch updates, chat |
| **Auth** | Firebase Auth | Google sign-in + phone OTP |
| **Payments** | Razorpay | UPI mandates, escrow, auto-refund |
| **Notifications** | Firebase Cloud Messaging (FCM) | Push notifications |
| **Maps** | Google Maps API | Location-based clan discovery |
| **Storage** | AWS S3 / Firebase Storage | Product images, profile photos |
| **Hosting** | Vercel / AWS | Auto-scaling, CDN |

---

## 8. MVP Screens — Detailed Breakdown

> **Total Screens: 30** (including modals, sub-screens, and confirmation states)
> **UI/UX Source of Truth:** All screens are documented in the `updated_stitch_groupbuy/` directory.

### Global Navigation Rules

- **Brand Logo:** The "GroupBuy" logo in the header of any screen acts as a navigation link.
  - **Active Session:** Clicking the logo redirects the user to the Home Feed (`/feed`).
  - **Inactive/Terminated Session:** Clicking the logo redirects the user to the Landing Page (`/`). This applies to public unauthenticated states, as well as pages where the session is explicitly terminated (e.g., successful sign-out, account deletion success).

### Global UI State Rules

- **Pitch Card Call-To-Action (CTA):** For logged-out users or logged-in non-members of the hosting clan, the primary button on pitch cards must ALWAYS display "View Pitch Details", regardless of the pitch's current capacity, waitlist status, or urgency. If the user is a verified Member of the clan, the button can dynamically show states like "Join Pitch", "Join Waitlist" (if full), or "Join Fast" (if almost full). This strict logic ensures that users who cannot participate aren't presented with misleading participation prompts, and it applies globally across the application.

- **Pitch Capacity Terminology:** Because pitches are fundamentally dealt with in 'units' (e.g., boxes of mangoes, liters of milk) rather than individual participants, the progress and capacity indicators must use the term "FILLED" instead of "JOINED" (e.g., "42/50 FILLED"). Additionally, urgency texts below progress bars must dynamically reference the exact item unit with **grammatically correct singular/plural forms** based on the count — e.g., "Only 1 box left!" (singular) vs "Only 5 boxes left!" (plural). **Never use the lazy `(s)` suffix pattern** (e.g., "box(s)"). A shared `pluralizeUnit(count, unit)` utility (`@/utils/pluralize.js`) must be used across all components. This applies globally across all progress bars, pitch statistics, quantity displays, and price breakdowns.

- **Host Navigation Update:** In pitch detail pages, the host section must provide a clear navigation chevron (>) that directs users to the host's public profile. This ensures that prospective buyers can securely view host details, reviews, and past performance before committing to a pitch.

- **Post-Delivery Rating Flow:** When a user logs in or initiates an active session, the system must check for any 'unrated, completed pitches' (where the pitch status is completed, the user successfully took delivery of the product, and has not yet submitted a rating). If found, a global quick-commerce style feedback modal (`<RatingModal />`) must automatically surface, prompting them to rate the host and product. If the user dismisses the modal, they can still access the rating flow via a fallback notification in their Activity Feed.

- **Access Control & Guarding:** The application enforces strict route segregation. Authentication entry flows (`/auth/verify`, `/auth/otp`) and session termination states (`/auth/signed-out`, `/profile/deactivate/*`) must be wrapped in `<GuestGuard>` to prevent logged-in users from seeing them. All core application features (`/feed`, `/profile`, `/pitches/create`) must be wrapped in `<AuthGuard>`. Informational pages remain unguarded.

- **Account Lifecycle Policy:** Any account termination (deactivation or deletion) must trigger an immediate client-side `logout()` event *before* redirecting the user. This ensures all active session privileges and tokens are instantly wiped before the user reaches the success receipt page (which must be guest-only).

- **Clan Preview Acquisition Strategy:** The Clan Preview page (`/clans/[clanId]/preview`) serves as the primary acquisition funnel for the platform. It must remain unguarded to allow guests to preview the community. CTAs on this page must dynamically adapt (e.g., displaying "Sign up to Join" instead of "Join this Clan" for guests) and must funnel guests directly into the `/auth/verify` pipeline rather than the generic landing page.

### Screen Overview

| # | Screen | Access Level | Journey(s) | UI Reference |
|---|--------|-------------|------------|--------------|
| 1 | Landing / Login | Public | J1 | `landing_and_login_view` |
| 2 | Sign In (Mobile Number) | Public | J1 | `sign_in_with_mobile_number` |
| 3 | OTP Verification | Auth flow | J1 | `otp_verification` |
| 4 | Profile Setup | Auth flow | J1 | `profile_setup` |
| 5 | Join Clan (Invite Code Input) | Auth flow | J1, J2 | `join_clan_invite_code_input` |
| 6 | Join Clan (Invite Link Preview) | Public | J2 | `join_clan_via_invite_link - preview` |
| 7 | Browse Nearby Clans | Logged in | J1, J2 | `browse_nearby_clans` |
| 8 | How It Works | Public | J1 | `how_it_works_view` |
| 9 | Home Feed | Logged in | J3, J4 | `home_feed` |
| 10 | Create Clan | Logged in | J2 | `create_clan_view` |
| 11 | Invite Members (+ Clan Created Success) | MOD | J2 | `invite_members_view - clan_creation_successful` |
| 12 | Welcome to Clan (Modal) | Clan member | J2 | `welcome_to_the_clan` |
| 13 | Clan Detail (incl. Members Tab) | Clan member | J2, J3, J4 | `clan_details_view`, `clan_details - members_tab` |
| 14 | My Pitches (3 tabs: Participating, Hosting, Saved) | Logged in | J5, J6, J7 | `my_pitches - *_tab_view` |
| 15 | Create Pitch — Step 1 (Product Details) | Clan member | J3 | `create_pitch_step_1` |
| 16 | Create Pitch — Step 2 (Pricing & Quantity) | Clan member | J3 | `create_pitch_step_2` |
| 17 | Create Pitch — Step 3 (Visibility: Public) | Clan member | J3 | `create_pitch_step_3 - visibility_public` |
| 18 | Create Pitch — Step 3 (Visibility: Private) | Clan member | J3 | `create_pitch_step_3 - visibility_private` |
| 19 | Pitch Preview | Host | J3 | `pitch_preview` |
| 20 | Save as Draft Confirmation | Host | J3 | `pitch - save_as_draft_view` |
| 21 | Publish Success ("Your Pitch is Live!") | Host | J3 | `publish_now - success_confirmation` |
| 22 | Pitch Detail | Clan member / Public | J4, J5, J6 | `pitch_details_view` |
| 23 | Join Pitch — Quantity & Note (Modal) | Participant | J4 | `join_pitch - quantity_and_note` |
| 24 | Authorize Commitment (UPI Mandate) | Participant | J4, J5 | `authorize_commitment` |
| 25 | Confirmation ("You're In!") | Participant | J4 | `you_re_in! - Confirmation` |
| 26 | Explore Public Pitches (Discover) | Logged in | J4 | `explore_public_pitches` |
| 28 | Edit Active Pitch | Host | J3 | `edit_active_pitch` |
| 29 | Host Dashboard | Host | J5, J6 | `host_dashboard` |
| 30 | Pitch Dashboard — Manage Pitch | Host | J5, J6 | `pitch_dashboard - manage_pitch_view` |
| 31 | Notifications | Logged in | All | `notifications_feed` |
| 32 | Profile & Settings | Logged in | — | `profile_and_settings_view` |
| 33 | Edit Profile | Logged in | — | `edit_profile_view` |
| 34 | Rating & Feedback (Modal) | Post-delivery | J6 | `pitch_feedback_modal` |
| 35 | Account Deactivation/Deletion Preview | Logged in | J8 | `account_deactivation_preview` |
| 36 | Account Action Confirmation (Take a Break / Permanent Deletion) | Logged in | J8 | `account_deletion_preview - *` |
| 37 | Account Deactivation Confirmation | Logged in | J8 | `account_deactivation_confirmation` |
| 38 | Account Permanently Deleted Confirmation | Logged in | J8 | `account_permanent_deletion_confirmation` |
| 39 | Sign Out Confirmation | Logged in | — | `sign_out_confirmation` |

---

### Screen 1: Landing / Login

**Purpose:** First screen the user sees. Introduces the platform and provides sign-in.  
**Access:** Public (unauthenticated users)  
**Journey:** J1 — New User Onboarding  
**UI Reference:** `landing_and_login_view`

| Element | Type | Details |
|---------|------|---------|
| App logo & tagline | Static | "GroupBuy" brand in dark green; "COMMUNITY COMMERCE" tag |
| Hero heading | Text | "Save More, *Together*." (italic emphasis on "Together") |
| Subtext | Text | "GroupBuy — the marketplace for collective buying. Join trusted communities to leverage collective purchasing power and secure better deals." |
| Deal showcase cards | Card group | Product cards (e.g., "Farm Fresh Box — Save 40%", "Smart Systems — Save 25%") with Clan tags (ORGANIC CLAN, TECH POOL) |
| "Sign in →" button | CTA (Primary, green pill) | Navigates to **Screen 2 (Sign In with Mobile Number)** |
| Social proof | Static | Avatar stack + "Joined by 1,200+ members this week" |
| Value proposition cards | 3-column card grid | **Pool with your community** (combine orders), **Secure UPI escrow** (money moves only when deal is locked), **Trusted circles** (verified clans) |
| "Empowering Local Economies" section | Brand grid | Partner/brand logos: LocalMarkt, Neighbourly, EcoUnion, SafePay |
| Navigation | Top bar | "How it works", "Our Impact" links |
| Footer | Static | "© 2024 GroupBuy. Community Commerce. v1.0.2" with Terms of Service, Privacy Policy, Community Guidelines links |

**Interactions:**
- Tapping "Sign in →" → Navigate to **Screen 2 (Sign In with Mobile Number)**
- "How it works" → Navigate to **Screen 8 (How It Works)**
- If returning user (session active) → skip to **Screen 9 (Home Feed)**

---

### Screen 2: Sign In (Mobile Number)

**Purpose:** Collect user's phone number for OTP-based authentication.  
**Access:** Public  
**Journey:** J1 — New User Onboarding  
**UI Reference:** `sign_in_with_mobile_number`

| Element | Type | Details |
|---------|------|---------|
| GroupBuy icon | Image | Community people icon (3-person silhouette in green) |
| Header text | Static | "Sign in to GroupBuy" |
| Subtext | Static | "Enter your phone number to continue" |
| Country code selector | Dropdown | "+91" with Indian flag icon (expandable for other codes) |
| Phone number input | Text field | Placeholder: "98765 43210"; numeric keyboard |
| "Get OTP →" button | CTA (Primary, rounded green) | Sends 6-digit OTP via SMS |
| Legal consent | Text | "By signing in, you agree to our Terms of Service and Privacy Policy" (links) |
| Trust badges | Static row | 🛡 "SECURE LOGIN" · 🔒 "ENCRYPTED" |
| Help link | Text link | "Need help signing in?" |

**Interactions:**
- Enter phone → tap "Get OTP →" → OTP sent via SMS → navigate to **Screen 3 (OTP Verification)**
- Invalid phone format → inline validation error
- Back → return to **Screen 1 (Landing)**

---

### Screen 3: OTP Verification

**Purpose:** Verify user's phone number with a 6-digit OTP code.  
**Access:** Auth flow (post-phone entry)  
**Journey:** J1 — New User Onboarding  
**UI Reference:** `otp_verification`

| Element | Type | Details |
|---------|------|---------|
| Shield icon | Image | Green verified shield checkmark |
| Header text | Static | "Verify your phone number" |
| Masked number display | Text | "We've sent a 6-digit code to **+91 •••• ••892**." + "Enter it below to secure your community access." |
| OTP input field | 6-digit segmented input | Individual digit boxes; auto-advance focus on each digit entry |
| Resend timer | Timer | "RESEND OTP IN 00:54" with countdown; "Resend Code" link (green) after timer expires |
| Error message area | Conditional | "Invalid OTP. X attempts remaining." |
| "Send OTP →" button | CTA (Primary, rounded green) | Verifies entered OTP |
| Help link | Text | "Having trouble? **Contact Support**" (link) |
| Trust badges | Static row | 🔒 "END-TO-END ENCRYPTED" · ✅ "VERIFIED COMMUNITY" |
| Back navigation | Arrow + "GroupBuy" header | Return to previous screen |

**Interactions:**
- Enter 6 digits → tap "Send OTP →" → auto-verifies → on success, navigate to **Screen 4 (Profile Setup)**
- 3 failed attempts → 60-second cooldown before retry
- "Resend Code" → sends new OTP; timer resets
- Back button → return to **Screen 2**

---

### Screen 4: Profile Setup

**Purpose:** Collect essential user information to complete account creation.  
**Access:** Auth flow (post-OTP verification)  
**Journey:** J1 — New User Onboarding  
**UI Reference:** `profile_setup`

| Element | Type | Details |
|---------|------|---------|
| Header text | Static | "Complete your profile" |
| Subtext | Static | "Welcome to the GroupBuy community. Tell us a bit about yourself to start saving together with your neighbors." |
| Profile photo | Image upload | Circular preview with camera icon overlay; "UPLOAD PHOTO" label; "JPG or PNG. Max 5MB" |
| Full name | Text field | Required; labeled "FULL NAME" |
| Email address | Text field | With email icon; green "✓" verified badge when validated |
| Phone number | Text field (read-only) | Pre-filled with "+91" prefix; "✓ VERIFIED" green badge shown |
| City | Dropdown | e.g., "Bengaluru" with chevron selector |
| Society / Locality | Text field | e.g., "Prestige Lakeside" with location pin icon |
| Location privacy note | Info text (green tint) | "Your location details help us connect you with people in your neighborhood. We never share your private information with third parties." |
| "Complete Setup" button | CTA (Primary, rounded green) | Saves profile and navigates forward |
| "Skip for now" link | Text link | Go to next step with minimal profile |
| Top navigation | Nav bar | GroupBuy logo, Home, My Pitches, Clans, **Profile** (active/underlined), Help icon |

**Interactions:**
- Fill required fields → Tap "Complete Setup" → save profile and navigate to **Screen 4b (Onboarding Welcome)**

---

### Screen 4b: Onboarding Welcome

**Purpose:** Provide the user with clear next steps after profile completion, rather than forcing them into the Join Clan page.
**Access:** Auth flow (post-Profile Setup)  
**Journey:** J1 — New User Onboarding  

| Element | Type | Details |
|---------|------|---------|
| Header text | Static | "Welcome to GroupBuy" |
| Subtext | Static | "Your profile is all set! How would you like to get started?" |
| "I was invited to a Clan" option | Card button | Primary option with diversity icon. Navigates to **Screen 5 (Join Clan)** |
| "Browse nearby Clans" option | Card button | Secondary option with explore icon. Navigates to **Browse Clans** |
| "Skip for now" link | Text link | Tertiary option at the bottom. Navigates to **Home Feed** |

**Interactions:**
- Tap any option → navigate to the respective screen.

---

### Screen 5: Join Clan (Invite Code Input)

**Purpose:** Guide new user to join or create their first Clan immediately after onboarding.  
**Access:** Auth flow (post-profile setup) — shown once only  
**Journey:** J1 — New User Onboarding, J2 — Clan Creation  
**UI Reference:** `join_clan_invite_code_input`

| Element | Type | Details |
|---------|------|---------|
| Community icon | Image | GroupBuy people icon with "COMMUNITY" badge below |
| Header text | Static | "Join your community" |
| Subtext | Static | "Find your apartment, office, or friend group" |
| Invite code/link input | Text field | Link icon + placeholder: "Enter invite code or link" + "Join" button (inline) |
| "Browse Nearby Clans" button | CTA (Primary, rounded green, full-width) | Compass icon + navigates to **Screen 7 (Browse Nearby Clans)** |
| Why join info card | Info card (warm tint) | People icon + "**Why join a Clan?** Clans unlock group discounts and exclusive bulk deals shared with your local neighbors." |
| "Create a New Clan →" link | Text link (green) | Navigate to **Screen 10 (Create Clan)** |

**Interactions:**
- Paste invite code/link → tap "Join" → validated → join request sent → navigate to Clan view
- "Browse Nearby Clans" → navigate to **Screen 7 (Browse Nearby Clans)**
- "Create a New Clan" → navigate to **Screen 10 (Create Clan)**

---

### Screen 6: Join Clan (Invite Link Preview)

**Purpose:** Public landing page for users who clicked a Clan invite link, showing clan details, how the platform works, and active pitches to entice them to join.  
**Access:** Public & Logged In Non-Members. Note: For a Logged In user who is *not* a member of the clan, the page should display 'Join this Clan' and 'Join Clan Now' buttons instead of 'Go to Clan'. This actively distinguishes between a 'Logged In non-member' user and a 'Member' user.
**Journey:** J2 — Clan Creation & Management  
**UI Reference:** `join_clan_via_invite_link - preview`

| Element | Type | Details |
|---------|------|---------|
| Header | Navigation | "GroupBuy" logo (left), Explore, About (text links), "Log In" CTA button (green pill, right) |
| Clan badge | Tag (orange) | "VERIFIED COMMUNITY" |
| Clan name | Heading (bold, large) | e.g., "Prestige Lakeside Towers" |
| Location | Text with pin icon | 📍 e.g., "Whitefield, Bangalore" |
| Clan description | Text | e.g., "A community of 128 neighbors pooling together for premium groceries, organic produce, and bulk savings." |
| "Join this Clan →" button | CTA (Primary, green pill) | Triggers join flow (prompts login if unauthenticated) |
| Social proof | Avatar stack + text | Avatar group + "+125" member count |
| Clan Cover | Image (right side) | Lifestyle image of community member |
| "How it works" section | 4-column card grid | **Join Clan** (people+ icon): "Accept the invite and become part of your local tower community." · **Participate** (hexagon icon): "Join active pitches for farm-fresh produce and premium bulk goods." · **Secure Pay** (shield icon): "Complete your purchase instantly via secure UPI integration." · **Pick up** (package icon): "Collect your items from the designated local tower hub." |
| "Active in this Clan" section | Heading + link | "**Active in this Clan**" + "Live opportunities to save with your neighbors." + "See all Pitches >" link (right-aligned) |
| Pitch preview cards | Card grid (2-col) | **Visibility-dependent content** (see rules below). Each visible card: category tag badge (e.g., "FRESH HARVEST", "BAKERY BATCH"), product image, "Save X%" badge (bottom-right), product name (bold), description, **Trust Meter** progress bar + "X% Funded" label, availability text (e.g., "18 spots remaining to unlock wholesale price", "Batch closes in 2 days"), "View Pitch Details" CTA button (outline, full-width) |
| "Members Only" placeholder cards | Conditional card(s) | Shown **only when the Clan requires approval to join** and private pitches exist. Blurred/frosted glass card with 🔒 lock icon centered, "MEMBERS ONLY" badge (amber/gold), text: "Exclusive deals are available for clan members.", "Join Clan to Unlock" outline CTA. Count indicator: "🔒 3 exclusive deals for members" (single summary, not per-card). |
| Bottom CTA banner | Card (green background) | "Ready to save with your neighbors at Prestige Lakeside?" + "Join 128 verified residents today and start getting better products at better prices." + **"Join Clan Now"** (white pill CTA) + **"Learn More"** (dark green pill CTA) |
| Footer | Static | "**GroupBuy**" + "Empowering communities through collective commerce." + PRIVACY, TERMS, SUPPORT links (right-aligned) |

**Pitch Visibility Rules on This Screen:**

> **Open-join Clan (no approval required):** ALL pitches are shown — both public and private. Since joining is frictionless (one-tap), showing private pitches incentivizes the user to join. The invite link itself acts as the trust signal (analogous to a Reddit auto-approve invite).

> **Approval-required Clan:** Only **public pitches** are shown in full. Private pitches are replaced with "Members Only" placeholder cards. This preserves the exclusivity of gated communities (analogous to an Instagram private profile — you can see the header but not the posts until approved).

> See `Clarification on Clan and Pitch Visibility & Publishing Logic.md` → "Guest Browsing & Content Visibility Rules" for the complete access matrix.

**Interactions:**
- Tap "Join this Clan →" →
  - If **not logged in**: navigate to **Screen 1 (Landing)** for authentication. After login, return to this screen and auto-trigger clan join.
  - If **logged in + open-join Clan**: join immediately → navigate to **Screen 13 (Clan Detail)** with **Screen 12 (Welcome to Clan Modal)** overlay
  - If **logged in + approval-required Clan**: join request sent → show inline confirmation: "Request Sent — we'll notify you when approved" → stay on this screen
- Tap "Log In" → navigate to **Screen 1 (Landing)**
- Tap "View Pitch Details" on a visible pitch card →
  - If **not logged in (Guest)**: navigate to **Screen 22 (Pitch Detail)** in **read-only guest mode** (product info, price, progress visible; chat hidden; "I'm In" replaced with "Sign in to Participate" CTA which triggers login redirect)
  - If **logged in but not a member**: navigate to **Screen 22 (Pitch Detail)** in **read-only non-member mode** (same as guest, but "I'm In" is replaced with "Join Clan to Participate" which triggers inline join flow)
  - If **logged in and already a member**: navigate to **Screen 22 (Pitch Detail)** in full member mode
- Tap "See all Pitches >" →
  - If **not logged in**: navigate to **Screen 22 (Pitch Detail)**-style listing in guest mode (same visibility rules apply — public pitches visible, private pitches gated)
  - If **logged in but not a member**: same guest-style listing with "Join Clan" prompts
  - If **logged in and already a member**: navigate to **Screen 13 (Clan Detail)** with Active Pitches tab (full member access)
- Tap "Join Clan to Unlock" on a "Members Only" placeholder →
  - Same flow as "Join this Clan →" above
- Tap "Join Clan Now" (bottom banner) → same as "Join this Clan →"
- Tap "Learn More" → navigate to **Screen 8 (How It Works)**
- Tap "Explore" (header) → navigate to **Screen 26 (Explore Public Pitches)**
- Tap "About" (header) → navigate to **Screen 8 (How It Works)**

---

### Screen 7: Browse Nearby Clans

**Purpose:** Allow users to discover and join clans based on their geographic location.  
**Access:** Logged in  
**Journey:** J1 — Onboarding, J2 — Clan Creation & Management  
**UI Reference:** `browse_nearby_clans`

| Element | Type | Details |
|---------|------|---------|
| Header | Navigation | GroupBuy logo, notification bell, profile avatar |
| Map View | Interactive Map | Full-screen Google Maps integration showing user's current location |
| Search bar | Text field | Floating over map: "Search societies, tech parks, or neighborhoods..." |
| Map Pins | Interactive icons | Multiple pins showing nearby clans. Active pin expands to show quick preview. |
| Bottom Sheet | Draggable panel | "**Clans Near You**" + "Showing communities within 5km of your location" |
| Clan List | Card list | List of clans in the bottom sheet. Each card: Clan name, distance (e.g., "1.2 km away"), member count, "Join" or "Request" button. |
| "Create New Clan" button | CTA (Floating) | Prominent button to start a new clan if none fit |

**Interactions:**
- Tap a map pin → highlights clan in the bottom sheet list
- Tap "Join" → if public, joins immediately; if private, sends request
- Tap "Create New Clan" → navigate to **Screen 10 (Create Clan)**

---

### Screen 8: How It Works

**Purpose:** Educate users on the value proposition and step-by-step process of the platform. Accessible from the Landing page, Join Clan preview, and other public-facing pages.  
**Access:** Public  
**Journey:** J1 — Onboarding  
**UI Reference:** `how_it_works_view - redirected_from_join_clan_preview_page`

| Element | Type | Details |
|---------|------|---------|
| Header | Navigation | "←" back arrow (left), "**GroupBuy**" logo, Home, **How It Works** (active, underlined), Explore (text links), "Join Clan" CTA button (green pill, right), ⚙ settings gear icon |
| Tag badge | Badge (green) | "COMMUNITY COMMERCE" |
| Hero Section | Split view | "How **GroupBuy** Works" heading (bold, "GroupBuy" in green) + "Unlock better prices by pooling orders with your community. GroupBuy connects trusted circles to premium products and services, making quality living affordable for everyone." + Hero image of a community gathering with shared goods |
| "Collective Power" overlay card | Floating card (on hero image) | 💚 "**Collective Power**" + "Join 450+ members in the Prestige Shantiniketan Clan saving 25% monthly." |
| "The Power of the Collective" section | Heading + text | "**The Power of the Collective**" + "We've reimagined commerce by removing the middleman and focusing on the strength of trusted communities." |
| Feature Block 1 | Card (light bg) | "**Strength in Numbers**" + "When you buy a single crate of Alphonso mangoes, you pay retail. When 50 families in your community buy together, you get wholesale prices. We facilitate this collective handshake." + Stats: **30%** AVG. SAVINGS · **0** DELIVERY FEES · **100%** DIRECT ORIGIN |
| Feature Block 2 | Card (dark green bg) | "**Optimized Logistics**" + "By delivering to one central hub per community, we slash shipping costs and ensure the freshest delivery." + Illustration (boxes/arrows icon) |
| "Your Journey to Smarter Buying" section | Heading + subtitle | "**Your Journey to Smarter Buying**" + "Five simple steps to transform how your community buys together." |
| 5-step timeline | Step cards (horizontal) | **01. Join a Clan** — "Find your apartment complex, office, or friend group. Join your community in a verified Clan." · **02. Pick a Pitch** — "Browse curated bulk deals—from seasonal fruits to artisan sourdough—vetted for quality." · **03. Commit Funds** — "Secure your share via a UPI mandate. No money leaves your account until the goal is reached." · **04. Bulk Order** — "Once the minimum quantity is hit, the order is placed automatically at the wholesale price." · **05. Pickup** — "Collect your items from the designated hub. Simple, fresh, and direct." |
| Trust Section | Heading + 2-column cards | "**Safe & Secure Payments**" + "We prioritize your security at every step of the transaction." · Card 1: 🛡 "**UPI Escrow System**" — "We use UPI mandates to 'block' funds. Your money only moves when the deal is confirmed and the supplier is ready to ship." · Card 2: ✅ "**Multi-Signature Security**" — "Large clan purchases require digital sign-offs from appointed Clan Leads, ensuring transparency in every transaction." |
| Footer CTA | Heading + button group | "**Ready to start saving with your community?**" + **"Join Clan"** (green pill, primary) + **"Contact Support"** (green outline pill) |
| Footer | Static | "**GroupBuy**" logo + links: How It Works, Trust & Safety, Privacy Policy, Terms of Service, Contact Us + "© 2026 GroupBuy. Community Commerce." |

**Interactions:**
- Tap "Join Clan" (header or footer CTA) → navigate to **Screen 1 (Landing)** if unauthenticated, or **Screen 5 (Join Clan Prompt)** if logged in
- Tap "Contact Support" → opens support/help page or email
- Tap "←" back arrow → return to previous page (e.g., Screen 6 if redirected from Clan invite preview)
- Tap "Home" → navigate to **Screen 9 (Home Feed)** if logged in, or **Screen 1 (Landing)** if not
- Tap "Explore" → navigate to **Screen 26 (Explore Public Pitches)**

---

### Screen 9: Home Feed

**Purpose:** Central hub showing active pitches across the user's Clans.  
**Access:** Logged in  
**Journey:** J3 — Pitch Creation, J4 — Joining a Pitch  
**UI Reference:** `home_feed`

| Element | Type | Details |
|---------|------|---------|
| Top app bar | Navigation | "GroupBuy" logo (green), search bar ("Search for pitches, products, or clans..."), notification bell (with badge count), user name (e.g., "Aravind S.") + primary Clan label (e.g., "PRESTIGE CLAN"), profile avatar |
| Page heading | Text | "**Home Feed**" |
| Page subtitle | Text | "Collective buying with your trusted community. Join a pitch to unlock better prices." |
| Filter icon | Icon button (right-aligned) | ☰ "Filter" — opens filter/sort options (by category, price range, deadline, etc.) |
| Grid view icon | Icon button (right-aligned, next to Filter) | ⊞ Grid toggle — switches pitch card layout between horizontal scroll and grid view |
| Clan selector tabs | Horizontal scroll tabs | "All Clans" (dark pill, default), then individual Clan names with location pin for primary clan (e.g., "📍 Prestige Lakeside", "Office Circle", "HSR Community", "Palm Meadows", "Sobha Anantha"); active Clan highlighted with green border |
| Active pitch cards | Card grid (3-col, or horizontal scroll) | Each card shows: product image with Clan tag overlay (e.g., "PRESTIGE CLAN", "OFFICE CIRCLE"), countdown timer badge (e.g., "2d 14h left", "1d 08h left", "0d 14h left"), product name (bold), price per unit (e.g., "₹50/kg", "₹185/L", "₹850/500g"), Host info (avatar + name + star rating, e.g., "Host: Rahul 4.8 ★"), participant progress bar with "X/Y units filled" + "X% FUNDED" label, "Join Pitch" CTA button (outline). **Urgency variant:** When ≤1 unit remaining, CTA changes to "**Join Fast - 1 Unit Left!**" (green filled, prominent). |
| Empty state | Conditional | "No active pitches yet. Create the first one!" with CTA |
| "+" Floating Action Button (FAB) | FAB (golden brown circle, bottom-right) | Navigate to **Screen 15 (Create Pitch — Step 1)** — visible only if user is a Clan member |
| Footer | Static | "© 2024 GROUPBUY. COMMUNITY COMMERCE. V1.0.2" + "Terms of Service", "Privacy Policy", "Community Guidelines" links |
| Bottom navigation bar | Tab bar | 4 tabs: **HOME** (house icon, active), **MY PITCHES** (shopping bag icon), **CLANS** (people icon), **DISCOVER** (compass icon) |

**Interactions:**
- Tap pitch card → navigate to **Screen 22 (Pitch Detail)**
- Tap Clan tab → filter pitches by selected Clan
- Tap Filter icon → opens filter/sort panel (category, price, deadline)
- Tap Grid icon → toggles between horizontal scroll and grid card layout
- Tap "+" FAB → navigate to **Screen 15 (Create Pitch — Step 1)** (select Clan if in multiple)
- Tap notification bell → navigate to **Screen 31 (Notifications)**
- Tap profile avatar → navigate to **Screen 32 (Profile & Settings)**
- Pull to refresh → reload pitch feed

---

### Screen 10: Create Clan

**Purpose:** Allow a user to start a new Clan and become its Moderator.  
**Access:** Logged in  
**Journey:** J2 — Clan Creation & Management  
**UI Reference:** `create_clan_view`

| Element | Type | Details |
|---------|------|---------|
| Header | Navigation | "← GroupBuy" back button + notification bell + profile avatar |
| Page title | Text | "**Create a new Clan**" + "Establish your local commerce hub. Invite neighbors or colleagues to unlock collective bargaining power." |
| Clan cover image | Image upload | Dashed upload area with upload icon; "Upload Clan Cover Image" + "Recommended: 1200 x 480 pixels" |
| Clan name | Text field | Labeled "CLAN NAME"; placeholder: "e.g., Prestige Lakeside - Block A" |
| Description | Textarea | Labeled "DESCRIPTION (OPTIONAL)"; placeholder: "Tell potential members what this Clan is about..." |
| Location | Map embed + text | Labeled "LOCATION" with "⊕ Use Current" link (green); embedded Google Map with "📍 Set on map" button overlay |
| Require approval toggle | Toggle row | Checkmark icon + "**Require approval to join**" + "New members must be vetted by you" with toggle switch (default: ON) |
| "Create Clan 🐝" button | CTA (Primary, green, full-width) | Creates Clan; user becomes MOD |
| Community guidelines consent | Footer text | "By creating a clan, you agree to the **Community Guidelines** and will act as the primary moderator." |
| Bottom navigation | Tab bar | HOME, PITCHES, **CLANS** (active), DISCOVER |

**Interactions:**
- Fill form → tap "Create Clan" → Clan created → navigate to **Screen 11 (Invite Members)**
- Validation: Clan name required, location required
- "Use Current" → auto-fills using device GPS
- "Set on map" → interactive map pin placement

---

### Screen 11: Invite Members (Clan Created Successfully)

**Purpose:** Generate and share an invite link for the Clan after successful creation.  
**Access:** MOD only  
**Journey:** J2 — Clan Creation & Management  
**UI Reference:** `invite_members_view - clan_creation_successful`

| Element | Type | Details |
|---------|------|---------|
| Success banner | Status card | "Clan Created Successfully!" with checkmark icon and subtitle: "Your community is ready. Invite your neighbors to start saving together." |
| Invite link | Text (selectable) | Unique URL, e.g., `groupbuy.app/join/clan-abc123` |
| "Copy" button | CTA | Copies link to clipboard with confirmation toast |
| Quick Share section | Button group | **"WhatsApp"** (primary theme color `var(--primary)`, with WhatsApp SVG logo), **"SMS"**, and **"More"** (system share sheet). **Note:** WhatsApp button uses the platform's primary color for uniformity, not WhatsApp brand green (#25D366). |
| Clan QR Code | Image (printable) | Scannable QR code containing the clan invite link. Designed for **physical sharing** — can be printed and posted in apartment lobbies, office pantries, or community notice boards for easy in-person scanning. Label: "SCAN TO JOIN CLAN". |
| Pending requests list | List | Names of users who have requested to join; Approve / Reject buttons. Empty state: "No pending invites — When people use your link, their requests will appear here for approval." |
| "Start Inviting" button | CTA (Primary) | Triggers the share sheet for first-time use |
| "Go to Clan Feed →" button | CTA (Secondary/outline) | Navigate back to **Screen 13 (Clan Detail)** |

**Interactions:**
- Copy / Share / QR scan → invite link shared (digital or physical)
- Approve request → member added → notification sent to new member
- Reject request → request removed → notification sent to rejected user
- QR code can be downloaded/printed for offline distribution

---

### Screen 12: Welcome to Clan (Modal)

**Purpose:** Warm welcome message and onboarding modal when a user successfully joins a Clan.  
**Access:** Clan member (on first entry)  
**Journey:** J2 — Clan Creation & Management  
**UI Reference:** `welcome_to_the_clan`

| Element | Type | Details |
|---------|------|---------|
| Status icon | Image | Party popper (🎉) icon in circle |
| Welcome heading | Text | "Welcome to the Prestige Lakeside Clan, [User Name]!" |
| Subtext | Text | "You're now part of **128 neighbors** saving together. Ready to find your first neighborhood deal?" |
| Onboarding steps | List | 3 cards with icons: **Browse Pitches** (shopping bag), **Verify Identity** (shield), **Say Hello** (chat bubble) |
| "Explore My Clan" button | CTA (Primary, green) | Dismisses modal and shows Clan active pitches feed |

**Interactions:**
- Tap "Explore My Clan" → modal closes, user stays on Clan Detail page

---

### Screen 13: Clan Detail

**Purpose:** View Clan information, its members, active pitches, and top contributors.  
**Access:** Clan members only (header visible to public for join-via-link flow)  
**Journey:** J2 — Clan Management, J3 — Pitch Creation, J4 — Joining a Pitch  
**UI Reference:** `clan_details_view`, `clan_details - members_tab`

**Clan Header:**

| Element | Type | Details |
|---------|------|---------|
| Cover photo | Image | Full-width banner image of the community/society |
| Clan badge | Tag | "PREMIUM CLAN" or "VERIFIED SOCIETY" — based on clan status |
| Clan name | Heading | e.g., "Prestige Lakeside Towers" |
| Meta info | Static | Member count (e.g., "128 Members") · Location (e.g., "Whitefield, Bengaluru") |
| Description | Text | Clan description paragraph |
| "Invite Members" button | CTA (visible to MOD only) | Navigate to **Screen 11 (Invite Members)** |

**Tabs:** `Active Pitches (count)` · `Members` · `Clan Treasury (Post-MVP)`

> **Note:** The "Clan Treasury" tab is a post-MVP concept that will show a dashboard of total successful pitches in the clan and estimated lifetime savings. For MVP, this tab is either hidden or displays a "Coming Soon" placeholder.

#### Active Pitches Tab (Default)

| Element | Type | Details |
|---------|------|---------|
| Pitch cards | Card grid | Each card: product image (with time-remaining badge, e.g., "4 Days Left"), product name, price per unit (₹), short description, "I'm In" CTA button |
| "+" FAB | Floating action button | Navigate to **Screen 15 (Create Pitch — Step 1)** pre-filled with this Clan |

#### Members Tab

| Element | Type | Details |
|---------|------|---------|
| Search bar | Search field | "Search members by name or role..." — filters member list in real-time |
| Moderators section | Card group (elevated) | Section header: 🛡 "MODERATORS". Each moderator card: profile photo (with online indicator dot), name, "Founding Member" badge (green), reputation score (e.g., "95/100 REPUTATION") |
| All Members section | Flat list | Section header: "ALL MEMBERS". Each row: avatar (photo or initial letter), name, join date (e.g., "Joined Jan 2023"), reputation score (/100), chevron for profile drill-down |
| Pagination | Text link | "View All [count] Members" — loads the full list |
| MOD controls (MOD only) | Contextual menu | Long-press member → options: Remove, Make MOD, View Profile |

**Top Contributors** (below tabs, visible on Active Pitches tab):

| Element | Type | Details |
|---------|------|---------|
| Section header | Heading + icon | ✅ "Top Contributors" |
| Contributor cards | Horizontal scroll | Each card: profile photo, name, reputation score badge (e.g., "98/100 REPUTATION"). Shows top 3–5 members ranked by reputation within this clan. |

**Interactions:**
- Tap a pitch card → navigate to **Screen 22 (Pitch Detail)**
- Tap "I'm In" on pitch card → navigate to **Screen 23 (Join Pitch — Quantity & Note)**
- Switch to Members tab → shows searchable member list with moderators highlighted
- Tap a member row → view member profile (reputation, pitches joined/hosted)
- (MOD) Tap pending request → approve/reject with confirmation dialog
- (MOD) Long-press member → options: Remove, Make MOD
- Tap "Invite Members" → navigate to **Screen 11 (Invite Members)**
- Tap a Top Contributor card → view that member's profile

---

### Screen 14: My Pitches

**Purpose:** Central view for all pitches the user is involved in — as Participant, Host, or Saved.  
**Access:** Logged in  
**Journey:** J5, J6, J7  
**UI Reference:** `my_pitches - participant_tab_view`, `my_pitches - hosting_tab_view`, `my_pitches - saved_tab_view`

**Bottom Tab Bar:** 3 tabs: **PARTICIPATING** (people icon) · **HOSTING** (building icon) · **SAVED** (bookmark icon)

#### Participating Tab (Default)

| Element | Type | Details |
|---------|------|---------|
| Top navigation | Nav bar | "GroupBuy" logo, Home, Discover, **Pitches** (active, underlined), Clans, search bar ("Search pitches or clans..."), notification bell, profile avatar |
| Page header | Text | "My Pitches" + "Review and track the community group-buys you're currently participating." |
| Status filter chips | Horizontal scroll | "ALL" (active, golden orange), "ACTIVE", "READY FOR PICKUP", "COMPLETED", "EXPIRED" |
| Pitch cards | Card grid (3-col) | Each card: Product image with Clan tag badge (e.g., "FARM CLAN"), bookmark icon, product name, price per unit, subtitle (short description), progress bar with "X/Y JOINED" label, Host info (avatar + name), "Details" CTA button |
| Empty state | Conditional | "You haven't participated in any pitches yet. Join a pitch?" or "No pitches joined yet. Browse deals?" |
| Community pitch CTA | Section | "Finding Your People" — description + "Explore Community Pitches" golden brown button |
| Community quote | Card | Inspirational quote: "Community isn't just a group of people, it's a shared purpose." |

#### Hosting Tab

| Element | Type | Details |
|---------|------|---------|
| Top navigation | Nav bar | "GroupBuy" logo, Home, Discover, **Pitches** (active, underlined), Clans, search bar ("Search pitches or clans..."), notification bell, profile avatar |
| Page header | Text | "**Hosting Dashboard**" + "Manage your active community pitches and track group buying progress." |
| Status filter chips | Horizontal scroll | "ALL" (active, golden orange), "ACTIVE", "DRAFT", "COMPLETED", "EXPIRED" |
| Active pitch cards | Card grid (3-col) | Product image with "ACTIVE" badge (green), product name (bold), subtitle (short description), price per unit, progress bar with "X/Y FILLED" label, participant avatars row (e.g., 👤👤👤 "+38 units committed"), "Manage" CTA button (green filled) |
| Draft pitch cards | Card grid (3-col) | **Two variants:** ① **Incomplete draft:** Placeholder image area with bookmark icon (no product image), "DRAFT" badge (gray), product name, "₹--/unit" (no price set), subtitle: "Complete details to launch", info hint: "⏳ Complete details to launch this pitch", "Edit Draft" CTA button (outline). ② **Near-complete draft:** Product image with "DRAFT" badge (gray), product name, price per unit, subtitle, readiness hint: "✅ Almost ready to be published", "Edit Draft" CTA button (outline). |
| Completed pitch cards | Card grid (3-col) | Product image with "COMPLETED" badge (green), product name, subtitle (short description), price per unit, "FULLY FUNDED" label + "Y/Y FILLED" count, participant avatars row (e.g., 👤👤👤 "+38 units committed"), "Manage" CTA button (outline) |
| Expired pitch cards | Card grid (3-col) | Product image with "EXPIRED" badge (dark), product name, subtitle (short description), price per unit, "GOAL NOT MET" label + "X/Y JOINED" count, "View Details" CTA button (outline, muted) |
| "+ Create Pitch" FAB | Floating button (green, bottom-right) | "+ Create Pitch"; navigate to **Screen 15 (Create Pitch — Step 1)** |

#### Saved Tab

| Element | Type | Details |
|---------|------|---------|
| Top navigation | Nav bar | "GroupBuy" logo, Home, Discover, **Pitches** (active, underlined), Clans, search bar ("Search pitches or clans..."), notification bell, profile avatar |
| Page header | Text | "My Pitches" + "Managing your saved community collective buys." |
| Status filter chips | Horizontal scroll | "All", "Active", "Completed", "Expired" |
| Pitch cards | Card grid | Each card: Product image with bookmark icon (toggle save), status badge overlay (ACTIVE/COMPLETED/EXPIRED), product name, price per unit, time remaining or status label, community goal progress bar + %, Host info (avatar + name), "View Details" / "Closed" / "Expired" CTA |
| "Create Pitch" FAB | Floating button | "+" icon; navigate to **Screen 15 (Create Pitch — Step 1)** |

**Interactions:**
- Tap 'Details' button on pitch card under **Participating** → navigate to **Screen 22 (Pitch Detail)**
- Tap 'Manage' button on pitch card under **Hosting** → navigate to **Screen 30 (Manage Pitch)**
- Tap 'Edit Draft' button on pitch card under **Hosting** → navigate to **Screen 15 (Create Pitch — Step 1)**
- Tap 'View Details' button on pitch card under **Hosting** or **Saved** → navigate to **Screen 22 (Pitch Detail)**
- Tap a pitch card under **Saved** → navigate to **Screen 22 (Pitch Detail)**
- Toggle bookmark icon → add/remove from Saved list
- Filter by status → pitch cards filtered in real-time

---

### Screen 15–18: Create Pitch (Multi-Step Form)

**Purpose:** Host creates a group buying deal in a step-by-step guided flow.  
**Access:** Clan member  
**Journey:** J3 — Host Creates a Pitch  
**UI Reference:** `create_pitch_step_1`, `create_pitch_step_2`, `create_pitch_step_3 - visibility_public`, `create_pitch_step_3 - visibility_private`

**Step 1 of 3 — Product Details:**

| Element | Type | Details |
|---------|------|---------|
| Progress indicator | Stepper | Step 1 of 3 highlighted |
| Product name | Text field | Required (max 100 chars) |
| Description | Textarea | Required (max 500 chars); placeholder with example |
| Product photo | Image upload | Optional; up to 3 photos |
| Product link | URL field | Optional; link to source (Amazon, website, etc.) |
| "Next" button | CTA | Validate → move to Step 2 |

**Step 2 of 3 — Pricing & Quantity:**

Pitches support **flexible participation criteria**: a host sets a Minimum Order (Goal) that must be met for the pitch to succeed, and a Maximum Capacity as an upper bound. This enables use cases beyond bulk purchasing, such as group trips (e.g., minimum 10 seats / maximum 20 seats).

| Element | Type | Details |
|---------|------|---------|
| Minimum Order (Goal) | Number field | Required; the minimum quantity needed for the pitch to be successful. Hint: "Min quantity for success". |
| Maximum Capacity | Number field | Required; the upper limit of units available. Must be ≥ Minimum Order. Hint: "Maximum units available". |
| Cost per unit (₹) | Number field (with ₹ prefix) | Required; full-width row. Hint: "Price per unit for participants". |
| Unit Type | Text field | Required; full-width row. e.g., "kg", "seat", "piece", "box", "litre". Hint: "How is the item measured?". |
| Price preview | Calculated display | Shows: unit price (₹X/unit), "Y units Minimum" or "Y unit Minimum" (singular/plural based on count), "Z units Maximum Capacity" or "Z unit Maximum Capacity", and a lock notice. Must use `pluralizeUnit()` — never the `(s)` pattern. |
| "Next" button | CTA | Validate all four fields → move to Step 3 |
| "Back" button | Text link | Return to Step 1 |

**Layout:** Minimum Order and Maximum Capacity are displayed **side-by-side** in a 2-column grid. Cost Per Unit and Unit Type each occupy their own **full-width row** below.

**Step 3 of 3 — Rules & Publish:**

| Element | Type | Details |
|---------|------|---------|
| Deadline | Date + time picker | Must be in the future; required. Calendar icon uses the `calendar_clock` Material icon. |
| Pickup / delivery instructions | Textarea | Required (e.g., "B-Block lobby, 6–8 PM") |
| Payment mode | Radio buttons | "UPI Escrow (Recommended)" / "Cash on Delivery" |
| Visibility | Radio buttons | "Private (This Clan only)" / "Public" |
| Select Clan(s) | Multi-select (if private) | Choose which Clans can see this pitch |
| Host participates toggle | Toggle | "I'm also participating in this pitch" (default: ON) |
| Review summary | Card | Full pitch summary preview |
| "Publish Pitch" button | CTA (Primary) | Publish → notification to Clan → navigate to **Screen 22 (Pitch Detail)** |
| "Back" button | Text link | Return to Step 2 |
| "Save as Draft" button | CTA | Save → pitch goes to preview → navigate to **Screen 19 (Pitch Preview)** |

**Interactions:**
- Multi-step form with back/next navigation
- "Publish" → pitch goes live → push notification sent to Clan members
- Validation errors shown inline per field
- Draft auto-saved locally if user leaves mid-creation

---

### Screen 19: Pitch Preview

**Purpose:** Full preview of how the pitch will appear to participants before publishing.  
**Access:** Host (during pitch creation flow)  
**Journey:** J3 — Host Creates a Pitch  
**UI Reference:** `pitch_preview`

| Element | Type | Details |
|---------|------|---------|
| Header bar | Navigation | "✕" (close) + "Pitch Preview" + "Close Preview" text link |
| Product image | Full-width image | High-res product photo with price overlay badge (e.g., "₹600/unit") |
| Category tags | Badge group | e.g., "HERITAGE COLLECTION", "LIMITED BATCH" |
| Product name | Heading | e.g., "Heritage Monsoon Mangoes (5kg Box)" |
| Description | Text | Full product description |
| Info grid | 4-column cards | **GOAL** (Min 5 Participants), **DEADLINE** (24 Oct, 06:00 PM), **PAYMENT** (UPI Escrow — Safe), **VISIBILITY** (Public Pitch) |
| Progress section | Card | "Pitch Progress — 0/5 JOINED — Waiting for first participant" with empty progress bar |
| Host info | Card | Host avatar + name ("You — Alex Rivers"), star badge, "REPUTATION 4.9 ✅" |
| Legal note | Footer text | "By publishing, you agree to fulfill orders once the minimum target is reached. Funds are held in escrow for buyer safety." |
| Action bar | Button group | "✏ Back to Edit" (outline) · "Publish Now 🚀" (primary green) |

**Interactions:**
- "✕" → return to Step 3 of pitch creation
- "Close Preview" → return to Step 3 of pitch creation
- "Back to Edit" → return to Step 3 of pitch creation
- "Publish Now" → pitch goes live → navigate to **Screen 21 (Publish Success)**

---

### Screen 20: Save as Draft Confirmation

**Purpose:** Confirm that a pitch has been saved as a draft for later publishing.  
**Access:** Host  
**Journey:** J3 — Host Creates a Pitch  
**UI Reference:** `pitch - save_as_draft_view`

| Element | Type | Details |
|---------|------|---------|
| Header bar | Navigation | GroupBuy logo, share icon + "⋮" overflow menu |
| Success icon | Image | Green checkmark in circle |
| Confirmation title | Text | "Pitch Saved as Draft" |
| Info text | Text | "You can find your draft in 'My Pitches' under Hosting Tab and publish it whenever you are ready." |
| Draft card | Card | Product thumbnail + "DRAFT" badge + "Updated just now" + product name + "Awaiting 15 more members" with arrow chevron |
| "Back to Home" button | CTA (outline) | Navigate to Home Feed |
| "Go to My Pitches" button | CTA (Primary, green) | Navigate to My Pitches → Hosting Tab |
| Help link | Text | "Need help with your pitch? **Contact Community Support**" |
| Bottom navigation | Tab bar | HOME, **PITCHES** (active), CLANS, DISCOVER |

---

### Screen 21: Publish Success ("Your Pitch is Live!")

**Purpose:** Celebrate successful pitch publication and guide host on next steps.  
**Access:** Host  
**Journey:** J3 — Host Creates a Pitch  
**UI Reference:** `publish_now - success_confirmation`

| Element | Type | Details |
|---------|------|---------|
| Header bar | Navigation | GroupBuy logo, search, notification bell, profile avatar |
| Success icon | Image | Green checkmark circle |
| Title | Text | "Your Pitch is Live! 🚀" |
| Subtitle | Text | "Great job, Host! Your neighborhood group-buy is now active and ready for participants." |
| Pitch summary card | Card | Product image + "ACTIVE PITCH" badge + price per unit + product name + "Goal: 5 neighbors" + "PROGRESS 0/5 JOINED" bar |
| Share buttons | Button group | "📤 Share on WhatsApp" (primary theme color `var(--primary)`, with WhatsApp SVG logo) · "📋 Copy Link" (outline). **Note:** The WhatsApp button uses the platform's primary color (not WhatsApp brand green) for visual uniformity across the app. |
| "What happens next?" timeline | Step list | 4 steps: **Neighbors Join** → **Goal Reached** → **Order Placed** → **Local Pickup** (each with icon, title, description) |
| "Go to Pitch Dashboard" button | CTA (Primary, green) | Navigate to Host Dashboard |
| "View Community Feed" button | CTA (outline) | Navigate to Home Feed |
| Bottom navigation | Tab bar | HOME, **PITCHES** (active), CLANS, DISCOVER |

---

### Screen 22: Pitch Detail

**Purpose:** Full information about a pitch — participants can join, chat, and track progress. Also serves as a **read-only preview** for guests and non-members who arrive via shared links or the Clan invite preview (Screen 6).  
**Access:** Clan members (full access) · Logged-in non-members (read-only) · Guests (read-only)  
**Journey:** J4 — Joining a Pitch, J5 — Threshold & Payment, J6 — Delivery  
**UI Reference:** `pitch_details_view`

#### Member View (Full Access)

| Element | Type | Details |
|---------|------|---------|
| Product image carousel | Image slider | Swipeable product photos |
| Product name & description | Text | Full description |
| Product link | External link button | "View Product Source →" (opens in browser) |
| Price breakdown | Card | Total cost, cost per unit, unit name, savings % |
| Host info | Row | Host name, profile photo, reputation score, tap → view profile |
| Participant progress | 2-Stage Progress bar + text | "X of Y filled (Goal Met)" or "X of Z to reach goal" with avatar stack of participants |
| Countdown timer | Timer | "2d 14h 32m remaining" — live countdown |
| Status badge | Badge | Current pitch state: Active / Activated / Ready for Pickup / Completed / Expired |
| "I'm In" button | CTA (Primary, sticky bottom) | Visible ONLY when pitch is Active and not full; triggers **Screen 23 (Join Pitch — Quantity & Note)** |
| "Pitch Full" label | Conditional | Replaces "I'm In" when max participants reached |
| "Expired" label | Conditional | Replaces "I'm In" when deadline has passed |
| "Already Joined" message | Conditional | Shown if user is already a participant; with "Leave Pitch" option |
| Pickup / delivery instructions | Info card | Location, timing, and any special notes |
| Chat thread | Expandable section | In-pitch comments; text input at bottom; host messages highlighted |
| Share button | Icon button (top bar) | Share pitch link via WhatsApp / copy link |

#### Guest / Non-Member View (Read-Only)

When the viewer is **not logged in** (guest) or **logged in but not a member of the pitch's Clan**, the screen renders in a restricted read-only mode. This follows the e-commerce "guest browsing" pattern — the user can browse and evaluate the deal, but must join the Clan to participate.

| Element | Member View | Guest / Non-Member View |
|---------|:---:|:---:|
| Product image carousel | ✅ Full | ✅ Full |
| Product name & description | ✅ Full | ✅ Full |
| Product link | ✅ Full | ✅ Full |
| Price breakdown | ✅ Full | ✅ Full |
| Host info | ✅ Tappable (view profile) | ✅ Visible but not tappable |
| Participant progress bar | ✅ With avatar stack | ✅ Progress bar only — avatars hidden ("Join to see who's in") |
| Countdown timer | ✅ Full | ✅ Full |
| Status badge | ✅ Full | ✅ Full |
| **Primary CTA** | **"I'm In"** → Screen 23 | **"Sign in to Participate"** (Guest) → Login OR **"Join Clan to Participate"** (Non-member) → Join flow |
| Pickup / delivery instructions | ✅ Full | ⚠️ Partial — location area shown, but specific address masked ("Join to see full pickup details") |
| Chat thread | ✅ Full with input | ❌ Hidden — replaced with: "💬 Join this clan to see the discussion and chat with the host" |
| Share button | ✅ Full | ✅ Full (encourages virality even for guests) |
| Bookmark / Save | ✅ Full | 🔒 Prompts login (guest) or clan join (non-member) |

**"Sign in" / "Join Clan" CTA Behavior:**
- If the user is a **Guest**, the button reads **"Sign in to Participate"** and directs them to the authentication flow before they can proceed.
- If the user is **Logged in but not a member**, the button reads **"Join Clan to Participate"**.
- **Guest (not logged in):** Tap → navigate to **Screen 1 (Landing)** for login → after auth, redirect back to this pitch with a clan join prompt
- **Logged-in non-member + open-join Clan:** Tap → inline join confirmation: "Join [Clan Name] to participate in this pitch?" → **"Join & Continue"** (green) / **"Cancel"** (outline) → on join, CTA changes to "I'm In" and full member view loads
- **Logged-in non-member + approval-required Clan:** Tap → join request sent → CTA changes to "Request Sent — Pending Approval" (disabled, gray) → user stays on read-only view

**Member Interactions:**
- Tap "I'm In" → opens **Screen 23 (Join Pitch — Quantity & Note)**
- Tap host name → view host profile + reputation
- Tap share → WhatsApp share sheet with pre-filled pitch link + summary
- Post a comment in chat → message appears in thread
- Tap "Leave Pitch" → confirmation dialog → dropout flow (Journey 7). If pitch was at capacity and has a waitlist, unit is automatically reallocated to a waitlisted user and they receive a notification (toast/push).
- Tap "Join Waitlist" (when full) → adds user to waitlist queue and changes CTA to "On Waitlist".
- Tap "Leave Waitlist" → removes user from waitlist.

---

### Screen 23: Join Pitch — Quantity & Note (Modal)

**Purpose:** Select quantity and add optional private note before committing.  
**Access:** Participant (after tapping "I'm In")  
**Journey:** J4 — Joining a Pitch  
**UI Reference:** `join_pitch - quantity_and_note`

| Element | Type | Details |
|---------|------|---------|
| Quantity selector | Number stepper | Min: 1, Max: remaining available units |
| Amount display | Calculated | "2 × ₹50/kg = ₹100" — updates live |
| Private note to host | Textarea (optional) | e.g., "I prefer the ripe ones" (visible only to host) |
| "Confirm & Pay" button | CTA (Primary) | If UPI Escrow → navigate to **Screen 24 (Authorize Commitment)** |
| "Confirm" button | CTA (Primary, alt) | If Cash on Delivery → skip payment → navigate to **Screen 25 (Confirmation — "You're In!")** |
| "Cancel" button | Text link | Dismiss bottom sheet |

**Interactions:**
- Adjust quantity → amount recalculates in real-time
- "Confirm & Pay" → opens Razorpay UPI mandate flow (**Screen 24**)
- "Confirm" (COD) → commitment saved → **Screen 25 (Confirmation)**

---

### Screen 24: Authorize Commitment (UPI Mandate)

**Purpose:** Authorize UPI mandate to block (not debit) funds for the pitch.  
**Access:** Participant (UPI Escrow pitches only)  
**Journey:** J4 — Joining a Pitch, J5 — Threshold Met  
**UI Reference:** `authorize_commitment`

| Element | Type | Details |
|---------|------|---------|
| Payment summary | Card | Product name, quantity, total amount to be blocked |
| Escrow explanation | Info text | "Your funds will be blocked, NOT debited. They are only debited when the deal reaches its minimum participants. If the deal doesn't form, you get an automatic full refund." |
| Razorpay UPI widget | Embedded (Razorpay SDK) | UPI app selector (GPay, PhonePe, Paytm, etc.) → mandate authorization |
| Success state | Conditional | Green checkmark + "Mandate authorized!" |
| Failure state | Conditional | Error message + "Retry" button |
| "Back" button | Text link | Return to **Screen 23 (Join Pitch — Quantity & Note)** |

**Interactions:**
- Select UPI app → authorize mandate in UPI app → returns to payment screen
- Success → auto-navigate to **Screen 25 (Confirmation — "You're In!")** after 2 seconds
- Failure → display error; "Retry" button → retry flow; "Cancel" → return to **Screen 22 (Pitch Detail)**

---

### Screen 25: Confirmation ("You're In!")

**Purpose:** Confirm successful commitment to a pitch.  
**Access:** Participant (post-payment / post-commitment)  
**Journey:** J4 — Joining a Pitch  
**UI Reference:** `you_re_in! - Confirmation`

| Element | Type | Details |
|---------|------|---------|
| Success animation | Animation | Confetti or checkmark animation |
| Confirmation title | Text | "You're In! 🎉" |
| Pitch summary | Card | Product name, your quantity, amount blocked/committed, expected delivery date |
| Mandate status | Info badge | "₹100 blocked via UPI" or "Cash on Delivery" |
| "Share with friends" button | CTA (Secondary) | Share pitch link via WhatsApp |
| "View Pitch" button | CTA (Primary) | Navigate back to **Screen 22 (Pitch Detail)** |
| "Go to Home" button | Text link | Navigate to **Screen 9 (Home Feed)** |

**Interactions:**
- Tap "Share" → WhatsApp share sheet
- Tap "View Pitch" → return to pitch detail
- Tap "Go to Home" → return to home feed

---

### Screen 26: Explore Public Pitches (Discover)

**Purpose:** Browse and discover public pitches across all communities nearby.  
**Access:** Logged in  
**Journey:** J4 — Joining a Pitch  
**UI Reference:** `explore_public_pitches`

| Element | Type | Details |
|---------|------|---------|
| Top navigation | Nav bar | GroupBuy logo, Home, **Discover** (active/underlined), Pitches, Clans, notification bell, profile avatar |
| Page heading | Text | "Explore Nearby **Community Pitches**" (green accent on "Community Pitches") |
| Subtext | Text | "Join forces with your neighbors to unlock wholesale prices on premium local essentials. Trust-verified and community-led." |
| Search bar | Text field | "Search for fresh produce, community deals, or clans..." |
| Category filter chips | Horizontal scroll | "All Pitches" (active, green), "Fresh Produce", "Pantry Essentials", "Dairy & Eggs", "Artisan Goods", "Household" |
| Pitch cards | Card grid (3-col) | Each card: Full product image with time badge (e.g., "2D 14H LEFT", "18 HOURS LEFT"), product name, price per unit + "SAVE X%" green label, Host info (name + star rating), Progress bar + "X spots left", "Join Pitch" CTA (green) |
| "+" FAB | Floating action button (gold) | Navigate to Create Pitch |

**Interactions:**
- Tap "Join Pitch" on card → navigate to **Screen 23 (Join Pitch — Quantity & Note)**
- Tap card → navigate to **Screen 22 (Pitch Detail)**
- Filter by category → cards filtered in real-time
- Search → real-time results

---

### Screen 28: Edit Active Pitch

**Purpose:** Allow host to modify a published pitch, with field locking for committed pricing.  
**Access:** Host only  
**Journey:** J3 — Host Creates a Pitch  
**UI Reference:** `edit_active_pitch`

**Layout:** The edit pitch page uses a **2-column bento grid** layout on desktop (7fr left / 5fr right), collapsing to a single column on mobile. Sections are grouped into two flex columns for dense vertical packing (no wasted gaps between cards of unequal height).

| Element | Type | Details |
|---------|------|---------|
| Header bar | Navigation | "← Edit Pitch" + "⋮" overflow menu |
| Pitch Progress card | Info card (full-width, above grid) | Progress bar + "You have reached 60% of your target participants. Keep going!" + "3 PARTICIPANTS JOINED" / "GOAL: 5". Shows locked fields warning when participants have committed. |
| **Left Column** | | |
| Product Details section | Card | **PITCH TITLE** (editable text), **DESCRIPTION** (editable textarea), **PRODUCT PHOTOS** (existing photos with delete overlay + "ADD PHOTO" CTA) |
| Pitch Policies section | Card | **RETURN POLICY** (dropdown: No Returns / Exchange Only / Full Refund 24h / Custom), **CUSTOM RETURN POLICY** (textarea, shown only when "Custom" is selected), **CANCELLATION FEE** (button group: No Fee / 5% / 10%), **Policy info note** (2% platform processing fee explanation) |
| **Right Column** | | |
| Pricing & Quantity section | Card | **COST PER UNIT** (₹ field, locked with 🔒 icon when participants joined), **TOTAL UNITS AVAILABLE** (number field, locked with 🔒 icon), **ESTIMATED SAVINGS** display ("22% vs Market Price") |
| Pitch Discussion section | Card (compact) | Toggle switch to enable/disable pitch discussion. Label: "**Pitch Discussion**" + "Allow participants to chat and ask questions." Toggle controls whether the in-pitch chat thread is active. |
| Rules & Logistics section | Card | **JOIN DEADLINE** (date picker), **PICKUP INSTRUCTIONS** (editable textarea), **HOST** info (Host avatar + name + verified badge) |
| **Footer (sticky)** | | |
| "💾 Save Changes" button | CTA (Primary, green) | Save edits |
| "Cancel" button | CTA (outline, gray) | Discard changes |

**Interactions:**
- Edit allowed fields → "Save Changes" → pitch updated (return to Pitch Detail) → participants notified of changes
- Locked fields (pricing, units) → 🔒 icon shown, field disabled when participants have committed
- "Cancel" → discard changes → return to previous page
- Toggle "Pitch Discussion" ON/OFF → enables or disables in-pitch chat for the pitch

---

### Screen 29: Host Dashboard

**Purpose:** Host manages the lifecycle of their pitch post-activation.  
**Access:** Host only  
**Journey:** J5 — Payment & Order, J6 — Delivery  
**UI Reference:** `host_dashboard`, `pitch_dashboard - manage_pitch_view`

| Element | Type | Details |
|---------|------|---------|
| Breadcrumb | Navigation | Pitches > Active Details |
| Pitch summary header | Card | Product name, image, status badge ("ACTIVATED"), countdown timer ("Ends in 3 days") |
| Lifecycle stepper | Step indicator | 4-step visual: ① **Activated** → ② Order Placed → ③ Ready for Pickup → ④ Completed |
| Collection Summary | Card | Product thumbnail, **Total Collected** (amount), **Participation** (X/Y slots), **Funding Progress** bar (e.g., 80% Funded) |
| Status Controls | CTA group | **"Mark Order Placed"** (primary) → progression to next state (Mark Ready for Pickup); **"Update Tracking"** (secondary) — each action notifies all participants via SMS and email |
| Participant checklist | Table | Columns: Member (name + clan), QTY, Action ("Mark Delivered" / "Mark Uncollected" actions per row, hidden until "Ready for Pickup" status). Note: Escrow guarantees funds upfront, so manual payment tracking is omitted. Summary badge shows "X Participants" (switches to "Pending Delivery" tracking when ready). |
| Settlement Summary | Info card | **Gross Collected** (total), **Platform Fee (2%)** deduction, **Host Payout** (net amount). Info note: "Funds are held securely by GroupBuy Escrow and will be released to your linked bank account 24 hours after completion." |
| Chat shortcut | Button | "Pitch Chat" — open pitch chat thread |
| Tracking info input | Text field (optional) | Add order tracking link/details — shared in pitch chat |
| "Send Reminder" button | CTA (per participant) | Push notification to participant: "Your order is ready for pickup!" (Must be triggered before "Mark Uncollected" is enabled). |
| Sidebar navigation | Left sidebar | Dashboard, Active Pitches, Participants, Analytics (post-MVP), Settings |

**Interactions:**
- Tap "Mark Order Placed" → pitch status updates → participants notified via SMS/email
- Tap "Mark Ready for Pickup" → push notification to all participants
- Tap "Mark Delivered" per participant → marks individual delivery (Note: Does not trigger rating modal for Host; rating is Participant-only).
- When all participants marked "Delivered" or "Uncollected" → Host can manually click "Mark Completed" (button disabled until 100% checklist resolution).
- Settlement payout auto-initiates 24 hours after completion (gross minus 2% platform fee)

---

### Screen 30: Pitch Dashboard — Manage Pitch

**Purpose:** Comprehensive host management dashboard for an active/funded pitch — status tracking, participant management, financials, and communications.  
**Access:** Host only  
**Journey:** J5 — Payment & Order, J6 — Delivery  
**UI Reference:** `pitch_dashboard - manage_pitch_view`

| Element | Type | Details |
|---------|------|---------|
| Top navigation | Nav bar | "GroupBuy" logo, Home, **Pitches** (active, underlined), Clans, search bar ("Search deals..."), chat icon, notification bell, profile avatar |
| Edit icon | Icon button (top-right of hero) | ✏ pencil icon — navigate to **Screen 28 (Edit Active Pitch)** |
| Pitch hero card | Card | Product image (left), "ACTIVATED" badge (green), product name (bold, e.g., "Artisan Veggie Bundle"), description (e.g., "Curated heritage greens and root vegetables from North Creek Farms."), **TOTAL FUNDS** (e.g., "₹42,850"), **PARTICIPANTS** (e.g., "32/40") |
| Pitch Status timeline | 4-step visual tracker | ① **ACTIVATED** (green filled circle, completed) → ② **ORDER PLACED** (green filled circle, current) → ③ **READY FOR PICKUP** (gray outline, pending) → ④ **COMPLETED** (gray outline, pending). Connected by progress line (green for completed, gray for pending). |
| Participants Management | Table section | Header: "**Participants Management**" + "⬇ Export CSV" link (green text). Table columns: **NAME** (avatar + name + Clan label, e.g., "Rohan Kapoor — CLAN: URBAN CHEFS"), **QUANTITY** (e.g., "2 Bundles"), **DELIVERED** (checkbox, toggleable per participant). "VIEW ALL [N] PARTICIPANTS" link at bottom. |
| Financial Overview | Card (right column) | "**Financial Overview**" heading. Line items: **Gross Collection** (e.g., "₹42,850"), **Platform Fee (2%)** (e.g., "- ₹857", red), **Shipping/Logistics** (e.g., "- ₹1,200", red). Divider. **Final Payout** (bold, e.g., "₹40,793"). Info note (green tint): "ⓘ Payout will be initiated 24 hours after the status is marked as Completed and verified by the Clan." |
| "Update Order Status" button | CTA (Primary, green, full-width) | ✏ icon + "Update Order Status" — advances the Pitch Status timeline to the next step. Button label changes dynamically: "Mark Order Placed" → "Mark Ready for Pickup" → "Mark Completed" |
| "Open Pitch Chat" button | CTA (Secondary, amber/orange, full-width) | 💬 icon + "Open Pitch Chat" — opens group chat with all participants |
| "Share Deal Update" button | CTA (outline, full-width) | ↗ icon + "Share Deal Update" — broadcasts a status update to all participants |
| Footer | Static | "**GroupBuy Central**" — "Empowering communities to buy better, together. High-quality products at collective prices." + Platform links (How it Works, Active Pitches, Clan Directories), Support links (Host Guidelines, Buyer Protection, Help Center), Legal links (Privacy Policy, Terms of Service) |

**Interactions:**
- Tap "Update Order Status" → advances pitch lifecycle, notifies all participants via push/SMS/email
- Tap "Export CSV" → generates and downloads participant order sheet for bulk vendor ordering
- Toggle "Delivered" checkbox per participant → marks individual delivery (Note: Rating is Participant-only flow).
- When all participants marked "Delivered" or "Uncollected" → Host can manually click "Mark Completed" (button disabled until 100% checklist resolution).
- Tap "Open Pitch Chat" → opens real-time chat with all pitch participants
- Tap "Share Deal Update" → opens broadcast composer (e.g., "Order placed with farm, arriving Friday")
- Tap ✏ edit icon → navigate to **Screen 28 (Edit Active Pitch)**
- Settlement payout auto-initiates 24 hours after completion (gross minus 2% platform fee minus logistics)

---

### Screen 31: Notifications

**Purpose:** Real-time feed of all platform activity relevant to the user.  
**Access:** Logged in  
**Journey:** All journeys  
**UI Reference:** `notifications_feed`

| Element | Type | Details |
|---------|------|---------|
| Page heading | Text | "**Notifications**" + "Stay updated with your community's pulse." |
| "Mark all as read" | Action link (green, top-right) | ✓✓ icon + "Mark all as read" |
| Filter tabs | Horizontal tab bar | "All" (active, green pill), "Pitches", "Clans", "Delivery" |
| Notification cards | Card list | Each card: category icon (color-coded circle), bold title, description text, relative timestamp (e.g., "2M AGO", "45M AGO", "3H AGO", "YESTERDAY", "2 DAYS AGO"), action CTA link (green text), unread indicator (green dot) |
| Notification types | Categorized | Pitch updates, join requests (MOD), threshold met, delivery ready, ratings received |
| "View Past Notifications" button | CTA (outline, centered) | Load older notifications |
| Empty state | Conditional | "You're all caught up! 🎉" |

**Notification Types (from UI):**

| Type | Icon | Example | Action CTA |
|------|------|---------|------------|
| Threshold Met | ₹ (green circle) | "Threshold Met: Organic Alphonso Mangoes — Great news! The 'Skyview Residency' clan just hit the 50kg goal. Prices have dropped by 15%." | "View Pitch Details" |
| Ready for Pickup | 📦 (amber circle) | "Ready for Pickup — Your order for 'Farm Fresh Avocados' has arrived at the Community Hub (Tower C Lobby)." | "Show QR Code" (green pill button) |
| Join Request (MOD) | 👤 (gray circle) | "Join Request: Prestige Shantiniketan — Amit V. has requested to join your buying clan. Review their community reputation score." | "Review Request" |
| New Pitch | 📢 (green circle) | "New Pitch: Artisanal Sourdough — Freshly baked by 'The Crusty Corner'. Early bird discount for the first 10 buyers." | "Join Pitch" |
| Reputation Milestone | ⭐ (gold circle) | "Reputation Milestone! — You've reached 'Silver Buyer' status. You now get early access to limited-stock artisan pitches." | — |

**Interactions:**
- Tap a notification → navigate to relevant screen (pitch detail, clan detail, etc.)
- Tap action CTA → deep-link to specific action (e.g., "Show QR Code" for pickup)
- Filter by tab → notifications filtered in real-time
- "Mark all as read" → all unread dots cleared

---

### Screen 32: Profile & Settings

**Purpose:** User's profile dashboard with reputation, clan memberships, preferences, and account actions.  
**Access:** Logged in  
**Journey:** —  
**UI Reference:** `profile_and_settings_view`

| Element | Type | Details |
|---------|------|---------|
| Top navigation | Nav bar | GroupBuy logo, Home, Pitches, Clans, Discover, search bar, notification bell, profile avatar (active, green ring) |
| Profile header | Section | Large circular avatar (with verified checkmark badge), user name (e.g., "Aditya Sharma"), location pin + "Prestige Lakeside, Bangalore", "✏ Edit Profile" button (dark, pill) |
| Reputation Score card | Gradient card (dark green) | Header: "REPUTATION SCORE", Score: "**Reliable — 92/100**", Subtext: "Top 5% of community buyers in Bangalore", **TRUST LEVEL** progress bar (amber/green) with percentage |
| Activity stats | 2-column cards | "**12** PITCHES JOINED" · "**3** PITCHES HOSTED" |
| My Clans section | Card list | Each card: Clan icon (color-coded), Clan name (e.g., "Prestige Lakeside"), Clan type (e.g., "Primary Residence", "Work Collective"). "+ Join New Clan" button (dashed card) at bottom. |
| Preferences section | Toggle list | **Push Notifications** ("Alerts for new pitch matches") — toggle ON/OFF · **Email Weekly Recap** ("Savings and community updates") — toggle ON/OFF · **Public Profile** ("Allow others to see your reputation") — toggle ON/OFF |
| "Sign out" link | Text link (red/green) | Arrow-exit icon + "Sign out" → navigate to **Screen 39 (Sign Out Confirmation)** |

**Interactions:**
- Edit profile → navigate to **Screen 33 (Edit Profile)**
- Toggle notification preferences → saved immediately
- Tap a Clan → navigate to **Screen 13 (Clan Detail)**
- Log out → navigate to **Screen 39 (Sign Out Confirmation)**

---

### Screen 33: Edit Profile

**Purpose:** Modify user profile details, and access account management (deactivation/deletion).  
**Access:** Logged in  
**Journey:** —  
**UI Reference:** `edit_profile_view`

| Element | Type | Details |
|---------|------|---------|
| Header | Navigation | "← GroupBuy" back button |
| Page title | Text | "**Edit Profile**" + "Update your personal details and locality details for the GroupBuy network." |
| Avatar | Image upload | Circular preview with camera overlay; "CHANGE AVATAR" label |
| Full Name | Text field | Editable |
| Email Address | Text field | With "✓ VERIFIED" green badge |
| Phone Number | Text field | With "✓ VERIFIED" green badge |
| City | Dropdown | e.g., "Bangalore" |
| Society / Locality | Text field | e.g., "Prestige Shantiniketan" |
| Profile Completeness | Progress bar + % | e.g., "85%" with green progress bar; hint: "Add your profile photo to reach 100%" |
| "How to get Verified" card | Checklist (green tint) | ✅ Add apartment/flat number, ✅ Join a Clan in your society, ✅ Complete 1 Successful Pitch |
| "Save Changes" button | CTA (Primary, green) | Save profile edits |
| "Cancel and return to Profile" link | Text link (green) | Discard changes |
| Account Management section | Footer section | "**Account Management**" heading + "Need to temporarily deactivate or permanently delete your GroupBuy profile data?" + "DEACTIVATE" button (pink/danger outline) |

**Interactions:**
- Edit fields → "Save Changes" → success toast → return to Profile
- "Cancel" → discard → return to Profile
- "DEACTIVATE" → navigate to **Screen 35 (Account Deactivation/Deletion Preview)**

---


### Screen 34: Rating & Feedback (Modal)

**Purpose:** Post-delivery feedback modal for rating host and product quality (Participant-only flow).  
**Access:** Participant (post-delivery confirmation)  
**Journey:** J6 — Delivery & Rating  
**UI Reference:** `pitch_feedback_modal`

| Element | Type | Details |
|---------|------|---------|
| Top navigation | Nav bar | GroupBuy logo, Home, Discover, Pitches, Clans, search bar, notification bell, profile avatar (active, green ring) |
| Status banner | Badge | "DELIVERY CONFIRMED! 🎉" (green text) |
| Header text | Text | "How was your experience with this pitch?" |
| Close button | Icon | "✕" (top-right) — dismiss modal |
| Host & Product summary | Info card | Host avatar + "HOST: [Host Name]" · "PRODUCT: [Product Name]" |
| "RATE HOST ORGANIZATION" | Star rating | 5-star system (filled gold stars); below stars: selectable trait chips: "Great communication", "Friendly host", "Well organized", "Punctual" |
| "RATE PRODUCT QUALITY" | Star rating | 5-star system (filled orange/gold stars); below stars: selectable trait chips: "Fresh", "Premium quality", "Good value" |
| "Any additional comments?" | Textarea | Placeholder: "Share more details about your experience..." |
| "Submit Rating →" button | CTA (Primary, green, full-width) | Submits both ratings |
| Footer encouragement | Text | "YOUR FEEDBACK HELPS THE GROUPBUY COMMUNITY GROW STRONGER." |

**Interactions:**
- Select stars + optional tags + optional comment → submit
- Rating saved → reputation score recalculated for rated user
- Modal dismissed → return to Pitch Detail
- "✕" → modal closes without rating

---

### Journey 8: Account Deactivation & Deletion

**Actor:** User  
**Goal:** Temporarily deactivate or permanently delete their account.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     ACCOUNT MANAGEMENT FLOW                              │
│                                                                          │
│  ┌──────────────┐    ┌──────────────┐                                    │
│  │ Edit Profile  │    │ Deactivation │                                    │
│  │ Screen 33    │───▶│  Preview     │                                    │
│  │ → "DEACTIVATE"│    │  Screen 35   │                                    │
│  │   button      │    │  (reason +   │                                    │
│  └──────────────┘    │  impact)     │                                    │
│                       └──────┬───────┘                                    │
│                              │                                            │
│                 ┌────────────┴────────────┐                               │
│                 │                         │                               │
│           "Take a Break"          "Permanent Deletion"                   │
│           selected                  selected                             │
│                 │                         │                               │
│                 │ (DIRECT — reversible)   │ (EXTRA GATE — irreversible)   │
│                 │                         ▼                               │
│                 │                  ┌────────────────┐                     │
│                 │                  │ Screen 36       │                     │
│                 │                  │ "Wait, are you  │                     │
│                 │                  │  sure?"          │                     │
│                 │                  │ Suggests "Take   │                     │
│                 │                  │  a Break" with   │                     │
│                 │                  │  RECOMMENDED     │                     │
│                 │                  │  badge           │                     │
│                 │                  └────────┬─────────┘                    │
│                 │                           │                              │
│                 │                  ┌────────┴────────┐                     │
│                 │                  │                 │                     │
│                 │           "Nevermind,       "Proceed with               │
│                 │            keep profile"    Account Deletion"           │
│                 │                  │                 │                     │
│                 │                  ▼                 ▼                     │
│                 │           ┌────────────┐   ┌────────────┐              │
│                 ▼           │  Return to  │   │ Screen 38   │              │
│          ┌────────────┐    │  Profile    │   │ Permanently │              │
│          │ Screen 37   │    └────────────┘   │  Deleted    │              │
│          │ Deactivated │                     │(irreversible)│             │
│          │ Confirmation│                     └────────────┘              │
│          │ (reversible)│                                                  │
│          └────────────┘                                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

**Step-by-Step Flow:**

| Step | Screen | Action | System Response |
|------|--------|--------|-----------------||
| 1 | Edit Profile (Screen 33) | User taps "DEACTIVATE" button in Account Management section | Navigate to Screen 35 (Deactivation Preview) |
| 2 | Deactivation Preview (Screen 35) | User sees community impact (Reputation Score, Clans Joined, Active Pitches), selects reason for leaving, chooses "Take a Break" or "Permanent Deletion" | Reason recorded |
| 3a | **Take a Break** → Screen 37 | Taps "Deactivate My Account" → goes **directly** to Screen 37 (Deactivation Confirmation). No extra confirmation — action is reversible. | Account deactivated; profile hidden |
| 3b | **Permanent Deletion** → Screen 36 | Taps "Deactivate My Account" → routed to Screen 36 ("Wait, are you sure?"). Shows "RECOMMENDED" badge on Take a Break. Must confirm "Proceed with Account Deletion". | Extra friction gate |
| 4b | Deleted Confirmation (Screen 38) | Confirmed permanent deletion on Screen 36. Shows "Account Permanently Deleted" — "Return to Landing Page →" CTA | All data erased forever; session ended |

> **Design Rationale:** "Take a Break" is streamlined (no extra screen) because it is **reversible**. "Permanent Deletion" adds Screen 36 as a **friction gate** because the action is **irreversible**, and nudges the user toward the safer option.


---

### Screen 35: Account Deactivation/Deletion Preview

**Purpose:** Show user their community impact and collect reason for leaving before proceeding.  
**Access:** Logged in  
**Journey:** J8 — Account Management  
**UI Reference:** `account_deactivation_preview`

| Element | Type | Details |
|---------|------|---------|
| Header | Navigation | "← GroupBuy" back button |
| Page title | Text | "**Deactivate or Delete Your Account**" |
| Subtext | Text | "We're sorry to see you go. If you need a break or want to start fresh, please choose an option below." |
| Option cards | Radio card group | **Take a Break** (green border, pause icon): "Your profile and pitches will be hidden from the community. You can return anytime just by logging back in." · **Permanent Deletion** (red border, X icon): "This is permanent. All your reputation, clan memberships, and history will be erased forever." |
| Community Impact card | Info card | "YOUR COMMUNITY IMPACT" — **98/100** Reputation Score, **3** Clans Joined, **0** Active Pitches. Quote: "Your reputation reflects your contribution to 3 local neighborhoods in Bangalore." |
| "Why are you leaving?" | Radio list | Options: "Moving to a different location", "Receiving too many notifications", "Privacy and data concerns", "Other" |
| Optional feedback | Textarea | "Tell us more (optional)" |
| "Cancel and Keep My Profile" button | CTA (Primary, green, full-width) | Return to Edit Profile |
| "Deactivate My Account" button | CTA (outline, full-width) | Proceed to confirmation |
| Legal note | Footer text | "By deactivating, you agree to our Terms of Service. Permanent deletion may take up to 30 days to process across all our systems." |
| Privacy badge | Footer | 🛡 "YOUR PRIVACY IS OUR PRIORITY" |

**Interactions:**
- Select "Take a Break" + tap "Deactivate My Account" → navigate **directly** to **Screen 37 (Deactivation Confirmation)** — no extra confirmation needed (action is reversible)
- Select "Permanent Deletion" + tap "Deactivate My Account" → navigate to **Screen 36 (Action Confirmation)** — extra friction gate before irreversible action
- Tap "Cancel and Keep My Profile" → return to **Screen 33 (Edit Profile)**

---

### Screen 36: Account Action Confirmation

**Purpose:** Final warning screen shown **only when user selects "Permanent Deletion"** on Screen 35. Acts as a friction gate to prevent accidental permanent data loss, and nudges the user toward the safer "Take a Break" option.  
**Access:** Logged in (only reached via Permanent Deletion path)  
**Journey:** J8 — Account Management  
**UI Reference:** `account_deletion_preview - take_a_break_selected`, `account_deletion_preview - permanent_deletion_selected`

| Element | Type | Details |
|---------|------|---------|
| Header | Navigation | GroupBuy logo, '?' help icon |
| Page title | Text | "**Wait, are you sure?**" |
| Subtext | Text | "Your contribution to the community means a lot. Before you go, choose how you want to handle your account." |
| Option cards | Radio card group (selectable) | **Take a Break (Deactivate)** (green highlight, with "RECOMMENDED" badge — default NOT selected): "Your profile, clan memberships, and pitches will be hidden from everyone. You can return and reactivate everything whenever you're ready." · **Permanent Deletion** (red highlight when selected — pre-selected since user chose this on Screen 35): "This action is final. Your reputation score, history, and all account data will be erased forever. This cannot be undone." |
| "Nevermind, keep my profile" button | CTA (Primary, green) | Return to profile |
| "Confirm Deactivation" / "Proceed with Account Deletion" button | CTA (outline) | Dynamic label: shows "Confirm Deactivation" if user switches to Take a Break, or "Proceed with Account Deletion" if Permanent Deletion remains selected |
| Trust badge | Footer | 🛡 "SECURE COMMUNITY PROTECTION" |

**Interactions:**
- If user switches to "Take a Break" + taps "Confirm Deactivation" → navigate to **Screen 37 (Deactivation Confirmation)**
- If user keeps "Permanent Deletion" + taps "Proceed with Account Deletion" → navigate to **Screen 38 (Permanently Deleted Confirmation)**
- Tap "Nevermind, keep my profile" → return to **Screen 32 (Profile & Settings)**

---

### Screen 37: Account Deactivation Confirmation

**Purpose:** Confirm account has been successfully deactivated (reversible).  
**Access:** Post-deactivation  
**Journey:** J8 — Account Management  
**UI Reference:** `account_deactivation_confirmation`

| Element | Type | Details |
|---------|------|---------|
| Header | Navigation | GroupBuy logo, 'Help Center' button |
| Moon icon | Image | Crescent moon icon (symbolizing "pause/rest") |
| Title | Text | "**Your account is now deactivated.**" |
| Description | Text | "We're sorry to see you go, but we've hidden your profile and clan memberships. All your active commitments have been handled safely." |
| "Want to come back?" card | Info card (green tint) | "Whenever you're ready to join the community again, just sign in with your mobile number and everything will be right where you left it." |
| "Return to Home →" button | CTA (Primary, green) | Navigate to Landing Page |
| Footer links | Text links | "HELP CENTER", "PRIVACY POLICY", "TERMS OF SERVICE" |
| Copyright | Footer | "© 2024 GroupBuy. All rights reserved." |

---

### Screen 38: Account Permanently Deleted Confirmation

**Purpose:** Confirm account has been permanently deleted (irreversible).  
**Access:** Post-deletion  
**Journey:** J8 — Account Management  
**UI Reference:** `account_permanent_deletion_confirmation`

| Element | Type | Details |
|---------|------|---------|
| Header | Minimal | "GroupBuy" logo + "Support" link |
| Delete icon | Image | Trash can with X icon |
| Title | Text | "**Account Permanently Deleted**" |
| Description | Text | "We're sorry to see you go. Your profile, reputation score, history, and all account data have been erased forever as requested." |
| Farewell message | Text (green) | "Thank you for being part of the GroupBuy community." |
| "Return to Landing Page →" button | CTA (Primary, green) | Navigate to Landing Page |

---

### Screen 39: Sign Out Confirmation

**Purpose:** Confirm the user has been logged out successfully.  
**Access:** Post-sign-out  
**Journey:** —  
**UI Reference:** `sign_out_confirmation`

| Element | Type | Details |
|---------|------|---------|
| Header | Minimal | "GroupBuy" logo |
| Sign-out icon | Image | Arrow-out-of-box icon in circle |
| Title | Text | "**You have been signed out.**" |
| Description | Text | "Thank you for being a part of the **GroupBuy** community. We're looking forward to seeing you again for your next neighborhood deal!" |
| Community illustration | Image | Group of diverse people illustration |
| "→ Sign In Again" button | CTA (Primary, green) | Navigate to **Screen 2 (Sign In)** |
| "Return to Landing Page →" link | Text link (green) | Navigate to **Screen 1 (Landing)** |
| Trust badges | Footer | 🛡 "SECURE LOGOUT" · 🌐 "NEIGHBORHOOD FIRST" |
| Copyright | Footer | "© 2024 GroupBuy. Built for the community." |

---

### Screen-to-Journey Mapping

| Screen | J1 Onboarding | J2 Clan | J3 Create Pitch | J4 Join Pitch | J5 Threshold & Pay | J6 Delivery | J7 Dropout | J8 Account Mgmt |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1. Landing / Login | ✅ | | | | | | | |
| 2. Sign In (Mobile) | ✅ | | | | | | | |
| 3. OTP Verification | ✅ | | | | | | | |
| 4. Profile Setup | ✅ | | | | | | | |
| 5. Join Clan (Invite Code) | ✅ | ✅ | | | | | | |
| 6. Join Clan (Invite Preview) | | ✅ | | | | | | |
| 7. Browse Nearby Clans | ✅ | ✅ | | | | | | |
| 8. How It Works | ✅ | | | | | | | |
| 9. Home Feed | | | ✅ | ✅ | | | | |
| 10. Create Clan | | ✅ | | | | | | |
| 11. Invite Members | | ✅ | | | | | | |
| 12. Welcome to Clan | | ✅ | | | | | | |
| 13. Clan Detail | | ✅ | ✅ | ✅ | | | | |
| 14. Clan Detail — Members | | ✅ | | | | | | |
| 15–18. Create Pitch (Steps) | | | ✅ | | | | | |
| 19. Pitch Preview | | | ✅ | | | | | |
| 20. Save as Draft | | | ✅ | | | | | |
| 21. Publish Success | | | ✅ | | | | | |
| 22. Pitch Detail | | | | ✅ | ✅ | ✅ | ✅ | |
| 23. Join Pitch (Qty & Note) | | | | ✅ | | | | |
| 24. Authorize Commitment | | | | ✅ | ✅ | | | |
| 25. Confirmation ("You're In!") | | | | ✅ | | | | |
| 26. Explore Public Pitches | | | | ✅ | | | | |
| 27. My Pitches (3 tabs) | | | | | ✅ | ✅ | ✅ | |
| 28. Edit Active Pitch | | | ✅ | | | | | |
| 29. Host Dashboard | | | | | ✅ | ✅ | | |
| 30. Manage Pitch | | | | | ✅ | ✅ | | |
| 31. Notifications | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | |
| 32. Profile & Settings | | | | | | | | |
| 33. Edit Profile | | | | | | | | ✅ |
| 34. Rating & Feedback | | | | | | ✅ | | |
| 35. Deactivation Preview | | | | | | | | ✅ |
| 36. Action Confirmation | | | | | | | | ✅ |
| 37. Deactivation Confirmed | | | | | | | | ✅ |
| 38. Deletion Confirmed | | | | | | | | ✅ |
| 39. Sign Out | | | | | | | | |

---

## 9. Success Metrics (KPIs)

| Metric | Target (Month 1) | Description |
|--------|-------------------|-------------|
| **Pitch Conversion Rate** | > 60% | % of pitches that reach their threshold |
| **User Retention** | > 40% | % of users participating in > 1 pitch per month |
| **Viral Coefficient** | > 1.2 | New users joined via shared pitch links per existing user |
| **Average Rating** | > 4.0 / 5 | Average host + participant ratings |
| **Time to Threshold** | < 48 hours | Average time from pitch creation to threshold being met |

---

## 10. Future Roadmap (Post-MVP)

| Phase | Features |
|-------|---------|
| **Phase 2** | Recurring pitches, pitch cloning, advanced host analytics, flexible threshold handling (share the burden), **Clan Treasury dashboard** (total successful pitches per clan, estimated lifetime savings) |
| **Phase 3** | Affiliate integration (Amazon/Flipkart bulk ordering), integrated delivery partners, clan-level group discounts |
| **Phase 4** | AI deal recommendations, price comparison tool, gamification (badges, leaderboards), community savings tracker |
| **Phase 5** | Subscription model for power hosts, community forums, event-based group buying, variable platform fee tiers |

---

## 11. Social Graph & Trust Signals

The design system includes a **social circle discovery pattern** on the Browse Clans screen where users can see which clans their friends and contacts have joined. This feature requires a basic social graph.

### Social Graph Requirements

| Feature | Description |
|---------|-------------|
| **Contact-based discovery** | Users can optionally sync phone contacts to find friends who are already on GroupBuy |
| **Friend-joined clans** | The "From Your Social Circle" section on Browse Clans highlights clans where the user's contacts are members (e.g., "2 friends are members") |
| **Avatar stacks** | Friend avatars are shown as stacked circles on clan cards to create social proof |
| **Contact join alerts** | "3 people from your contacts recently joined this clan" — drives discovery via trust |

### Mock Data Notes (MVP)

For the MVP frontend implementation, the social graph is simulated with hardcoded mock data:
- `SOCIAL_CLANS` array in the Browse Clans page contains friend count and friend text
- Avatar stacks use letter placeholders (A, R, P) instead of real profile photos
- The "From Your Social Circle" section is always visible with sample data

### Design Observations & Additions (May 2026)

| Observation | Details |
|------------|---------|
| **Auth flow routing** | Profile Setup → Join Clan → Browse Clans → Clan Welcome → Home Feed. "Skip for now" bypasses clan joining and goes directly to the Home Feed. |
| **Color token alignment** | The design system's `secondary-container` token is `#fea619` (bold amber), used for verified badges, trust meter fills, rating stars, and active feedback tags. Previously mismatched as `#fff3e0` in code. |
| **Guest browsing** | Unauthenticated users can view public clans and pitches but cannot join pitches or participate in discussions. They are prompted to sign up when attempting gated actions. |
| **Signed-out page visibility** | The `/auth/signed-out` page is strictly for Guest (non-logged-in) users. If a logged-in user explicitly triggers logout, they transition to Guest and can view this page. If a logged-in user attempts to navigate to this page while having an active session, they will be instantly redirected away to the home feed. |
| **Navigation consistency** | All main pages (including Profile, Notifications) must include the standard top Navbar and bottom BottomNav for consistent navigation. |
| **Bottom nav icons** | The design uses Material Symbols Outlined (not custom SVGs) with `FILL 1` for active states. |
| **No clan discount on join** | The Join Pitch flow (`/pitches/[id]/join`) does not apply a clan-level discount. Pricing is straightforward: `total = qty × unit price`. Clan discounts may be introduced in a future phase. |
| **Hosting actions** | The "Edit Pitch" button on the My Pitches hosting tab navigates to `/pitches/[id]/edit`. All action buttons on cards must have proper navigation handlers. |
| **Notifications page** | The Community Savings widget has been removed from the Notifications page. The page shows only the notification list with filter chips. |
| **FAB button uniformity** | The "+" FAB button position and size must be uniform across all pages (Home Feed, My Pitches, Discover, Clan Detail, Browse Clans). Position: `bottom: 90px; right: 24px` (above bottom nav). On pages where the FAB navigates to **Create Pitch** (Home Feed, My Pitches, Discover, Clan Detail), the FAB uses the platform's primary gradient color (`var(--gradient-primary)`). On **Browse Clans**, where the FAB navigates to **Create Clan**, the FAB uses a distinct teal/cyan color to differentiate the action. |
| **WhatsApp button uniformity** | All "Share on WhatsApp" buttons across the platform use the platform's primary theme color (`var(--primary)`) instead of the WhatsApp brand green (`#25D366`). This applies to: Publish Success page (`/pitches/[id]/published`), Clan Invite page (`/clans/[id]/invite`), and any future share surfaces. The WhatsApp SVG logo icon is retained for recognition. |
| **Edit Pitch — Bento grid layout** | The Edit Pitch page (`/pitches/[id]/edit`) uses a 2-column bento grid (7fr / 5fr) with flex columns for dense vertical packing. Left column: Product Details + Pitch Policies. Right column: Pricing & Quantity + Pitch Discussion toggle + Rules & Logistics. On mobile, sections stack in a logical single-column order. |
| **Edit Pitch — Pitch Discussion toggle** | The Edit Pitch page includes a "Pitch Discussion" toggle card in the right column. It allows the host to enable/disable in-pitch participant chat. The toggle uses a standard iOS-style switch (`.toggleSwitch` / `.toggleSlider`). Default state: OFF. |
| **Create Pitch — Flexible participation model** | Step 2 now uses **Minimum Order (Goal)** and **Maximum Capacity** instead of a single "Total Units Available" field. This enables flexible pitch criteria — e.g., a group trip requiring at least 10 seats but accommodating up to 20. The Minimum Order is the success threshold; the Maximum Capacity is the upper limit. Fields are laid out: min/max side-by-side, cost per unit full-width, unit type full-width. |
| **Create Pitch — TOTAL PROJECTED COST removed** | The 'Total Projected Cost' auto-calculated card has been removed from Step 2. |
| **Create Pitch — Price Preview updated** | The Price Preview now shows "X units Minimum" / "X unit Minimum" and "Y units Maximum Capacity" / "Y unit Maximum Capacity" with proper singular/plural forms based on count. Uses `pluralizeUnit()` utility — the `(s)` pattern is deprecated. |
| **Create Pitch — Participation Limits removed** | The 'Participation Limits' section (Minimum and Maximum participant fields) has been removed from Step 3. The deadline section has been streamlined and uses the standard `calendar_clock` icon. |
| **Pitch Detail — TOTAL COST removed** | The "TOTAL COST" section has been removed from the Pitch Detail page (`/pitches/[id]`). Only per-unit pricing is displayed. |
| **Back arrow color consistency** | Navigation back arrows must use a consistent color across all pages. The Deactivation Preview page (`/profile/deactivate`) back arrow has been changed from green to black to match the Edit Profile page (`/profile/edit`) pattern. |
| **Unit label pluralization — global fix** | All unit labels across the application now use grammatically correct singular/plural forms based on count (e.g., "1 kit", "3 kits", "1 box", "5 boxes") instead of the lazy `(s)` suffix pattern (e.g., "kit(s)"). A shared `pluralizeUnit(count, unit)` utility (`@/utils/pluralize.js`) handles standard English pluralization rules. Affected screens: Host Dashboard (participant checklist QTY, collection summary), Pitch Cards (progress text), Pitch Detail (urgency note), Create Pitch (price preview, review summary), Edit Pitch (progress text, locked fields warning, field labels), Join Pitch (subtotal), Payment (quantity display), Confirmation (quantity, goal text), Published Success (goal), and Join Pitch Modal (stepper, limit, price breakdown). |
| **Expired pitches filtered globally** | Pitches that are not strictly marked as `active` or `activated` (e.g. `expired` pitches) are now explicitly filtered out from all live pitch discovery and listing pages. This prevents users from being prompted to join an inactive pitch. Affected screens: Home Feed (`/feed`), Global Search (`/search`), Discover (`/discover`), Clan Dashboard (`/clans/[id]`), and Clan Preview (`/clans/[id]/preview`). My Pitches (`/pitches/my`) continues to show all history. |
| **Dynamic host details on Pitch Cards** | Pitch Cards in lists (e.g., Home Feed, Clan Dashboard) previously displayed hardcoded host details ("Arjun R." with a 4.8 rating). This has been updated to dynamically read `pitch.host.name`, `pitch.host.rating`, and `pitch.host.avatarUrl` directly from the pitch data, ensuring consistency with the Pitch Detail page. |
| **Guest auth guard — global route protection** | All pages requiring a user session are now protected by a reusable `<AuthGuard>` component (`@/components/auth/AuthGuard.js`). When a guest (unauthenticated) user navigates to a protected page, they see a centered "Sign in to continue" card with a Sign In button and a link back to Home, instead of seeing user-specific content. Protected pages: Home Feed (`/feed`), Activity (`/activity`), Notifications (`/notifications/*`), Profile (`/profile`, `/profile/edit`, `/profile/[userId]`, `/profile/deactivate/*`), My Pitches (`/pitches/my`), Create Pitch (`/pitches/create/*`), Join/Payment/Confirmation/Published/Edit/Host Dashboard/Rate flows (`/pitches/[id]/*`), Clan Dashboard/Invite/Welcome/Browse/Create (`/clans/*` except `/clans/[id]/preview`). Public pages remain accessible: Landing (`/`), Auth flows (`/auth/*`), How It Works, Discover, Search, Clan Preview, and Pitch Detail (read-only). |
| **Guest guard — auth routes restriction** | Auth entry pages (`/auth/verify`, `/auth/otp`, `/auth/signed-out`) and the Landing page (`/`) are restricted to guest users only using a `<GuestGuard>` component (`@/components/auth/GuestGuard.js`). Logged-in users navigating to these pages are automatically redirected to their Home Feed (`/feed`). |
| **Auth initial state (Guest)** | The application state strictly defaults to `GUEST` (instead of `LOGGED_IN`) when no previous session exists in local storage. This ensures first-time visitors always see the Landing Page correctly. |
| **OTP verification prototype notice** | Added a prominent notice banner to the `/auth/otp` page informing users that no actual SMS is sent in the prototype, prompting them to directly click "Verify Code". |
| **Rating Modal trigger refinement** | Removed the automatic triggering of the Rating Modal on the Home Feed. The modal is now strictly user-initiated, appearing only when clicking the "Rate Host & Product" action from the Activity page. |
| **Edit Pitch — Save button logic** | The "Save Changes" button is dynamically disabled until the host actually modifies at least one field, preventing accidental saves of unchanged data. |
| **Edit Pitch — Locked fields UI** | Optimized the warning box (increased max-width to 480px, tightened spacing and line-height) so the instructional text flows cleanly into 3 lines. |
| **Clan selection UI enhancements** | The 'Select Clan(s)' field is expanded to full width with no chip truncation. The dropdown list uses a specific `max-height` (205px) to expose exactly 4.5 items as a visual cue for scrollability, paired with custom thin scrollbars. The dropdown opens upwards on Edit Pitch to avoid footer cutoff. |
| **Pitch Visibility & Payment Layout** | Visibility terminology updated to "Public" and "Private" (formerly "Invite Only"). On Create Pitch Step 3, the Payment Mode and Visibility radio columns were interchanged for better form flow. |

### Version 3.1 Architecture Updates (August 2026)

| Architectural Area | Decisions & Implementation Details |
|:---|:---|
| **Platform Rebranding to 'LetsStack'** | Platform name officially transitioned from **GroupBuy** to **LetsStack**. Brand tagline established as **"Let's Stack. Let's Save Together."** Integrated across root metadata, layouts, legal pages, and auth flows. |
| **Terminology Standardization ('Pitch' → 'Pool')** | Core pooling mechanism standardized from "Pitch" to **"Pool"** across all user-facing touchpoints: "Create Pool", "Join Pool", "My Pools", "Pool Discussion", "Pool Policies", and "Active Pools". |
| **Maintainable Vector SVG Brand Logo** | Centralized brand mark as a pixel-perfect, scalable SVG geometric stacking emblem (3 interlocking tiers) and wordmark in `<Logo />` component, eliminating fixed image scaling artifacts across desktop and mobile. |
| **Union of Access Visibility Architecture** | In a clan-first platform, pool visibility is strictly derived from tagged clans:<br>• **Public Discovery Pool:** Tagging at least 1 public/open clan makes the pool discoverable on public feed, search, and clan hubs.<br>• **Restricted Community Pool:** Tagging exclusively private/gated clans restricts discovery strictly to verified clan members. Non-members cannot find it in search or feeds.<br>• **Direct Link Only:** Tagging 0 clans makes the pool unlisted, accessible strictly via direct link. |
| **Unconditional Clan Selection in Pool Creation** | Step 3 of Create Pool (`/pitches/create`) redesigned: target clan selection is unconditionally front-and-center. Real-time banner displays computed visibility reach (Public Discovery vs Restricted vs Direct Link Only). Clan dropdown displays explicit type pills (`Public` vs `Restricted`). |
| **Cross-Clan Discussion Privacy & Bolding Rules** | Multi-clan pools share a single unified discussion thread. Members participating from private clans receive a viewer-personalized privacy notice formatted with bolded clan names and unbolded conjunctions (`"This discussion is shared across **{Clan A}**, **{Clan B}**, and **{Clan C}** clans."`). |
| **Strict Zero-Access on Gated Clans** | Rejection of grace periods; applicants pending approval have zero access to gated clan pools until approved by a clan lead. |
| **Clan Re-tagging Post-Publish Governance** | Expanding a restricted-only pool to public clans is locked if member discussions have occurred, protecting participant privacy. |

### Version 3.2 Hyperlocal Proximity, Distance Slider & Delivery Badge Architecture (August 2026)

| Architectural Area | Decisions & Implementation Details |
|:---|:---|
| **Complete Terminology Migration ('Pool')** | Fully completed migration of all user-facing strings from "Pitch" to **"Pool"** across all platform pages (Create Pool, Join Pool, My Pools, Host Dashboard, Pool Discussion, Rating Modal, Empty States, Onboarding, and Support). |
| **Consolidated Remote & Digital Badge (`🌐 Remote`)** | Combined 'Digital' and 'Remote' into a single intuitive **`🌐 Remote`** badge on pool cards. Signifies that the product or service is remotely deliverable without physical distance proximity constraints (e.g. cloud subscriptions, software tools, online cohorts, remote travel coordination). |
| **Universal Distance Badging Guarantee** | Every pool card unconditionally renders a location or delivery badge: `🌐 Remote`, `📦 Pan-India`, `🏠 Your Society`, `🚚 Doorstep`, `📍 X km`, or `📍 Locality, City`. Null or missing badges are eliminated via smart multi-tier coordinate heuristics and intelligent locality extraction from pickup addresses. |
| **UX Distance Range Slider & Modal** | Replaced rigid `<select>` dropdowns with an interactive, mobile-optimized **Distance Range Slider Modal** (`DistanceSliderModal.js`):<br>• Smooth range slider (1 km to 50 km) with gradient fill and draggable thumb.<br>• Discrete quick-snap preset chips: `5 km` (Society/Walking), `15 km` (Neighborhood), `30 km` (Citywide), `🌐 Remote & Pan-India`, and `All Deals`.<br>• Real-time match count preview dynamically showing matching pools as the slider moves.<br>• One-tap quick reset button when a distance filter is active. |
| **Society & Villa Clan Distance Exemption** | Pools hosted inside a member's joined residential society or villa clan (e.g. *Ravi Dham Complex*, *Dates Villa County*) are strictly exempted from distance radius filtering. Members always see their community's pools even when traveling or setting a tight local radius. |
| **Remote Villa Community Clan (`clan-villas`)** | Added *Dates Villa County* clan representing residential-plot and villa layouts located outside city municipal limits facing vendor access friction. Enabled high-value group service pools: *Rooftop Solar & Net-Metering Drive* and *Certified Electrician Collective Service*. |
| **Wedding Planning & Flat Setup Clan Expansion** | Added high-utility community pools: *Wedding Silver Articles*, *Traditional Catering Drive*, *Decorative Trays*, *Groom's Pagdi Fixing*, *Multi-Purpose Laptop Stands*, and *Seasonal AC Servicing*. |

---

## 12. Pitch Policies & Refund Rules

Hosts can configure policies when creating or editing a pitch. These policies are displayed to participants before they join and govern the rules around returns, quitting, and refund deductions.

### 12.1 Return Policy

The host selects **one** of the following predefined return options:

| Option | Label | Description |
|--------|-------|-------------|
| `no_returns` | **No Returns** | All sales are final. No returns accepted after delivery. |
| `exchange_only` | **Exchange Only** | Defective or damaged items can be exchanged within 24 hours of pickup. No cash refunds. |
| `full_refund_24h` | **Full Refund (Within 24h)** | Participants can return items within 24 hours of pickup for a full refund. |
| `custom` | **Custom Policy** | Host provides a free-text return policy description (max 500 chars). |

**Default:** `no_returns` (if the host does not explicitly set a return policy).

### 12.2 Quit / Drop Policy

Participants can leave a pitch under the following rules, which vary by **pitch stage**:

| Stage | Rule | Refund |
|-------|------|--------|
| **Before threshold met** | Participant can drop freely at any time. | Full refund, no deductions. |
| **After threshold met, before order placed** | Participant can drop but incurs a cancellation fee. This protects the host from last-minute dropouts that would jeopardize the deal. | Refund minus cancellation fee (host-configured %) and platform processing fee (2%). |
| **After order placed** | No quit allowed. The host has placed the bulk order with the supplier and funds are committed. | No refund. Return policy applies once goods are delivered. |

**Stage transitions:**
1. **Pitch created → Threshold met:** Participants join. If a participant quits, the count drops and threshold may revert to "not met."
2. **Threshold met → Order placed:** Host confirms the bulk order with the supplier. This is the point of no return — the host clicks "Place Order" on the Host Dashboard.
3. **Order placed → Delivery:** Goods are in transit or ready for pickup. Participants cannot quit; they must use the return policy after receiving goods.

### 12.3 Refund Deductions

| Deduction Type | Rate | When Applied |
|----------------|------|-------------|
| **Platform processing fee** | 2% (fixed) | Always deducted from any refund (covers payment gateway costs). |
| **Cancellation fee** | 0%, 5%, or 10% (host-configured) | Deducted when a participant quits **after threshold is met but before order is placed**. |
| **No deduction** | 0% | When quitting **before** the threshold is met. Full refund. |

**Example:** A participant commits ₹600. Threshold is met. They want to quit before the order is placed. Host has set a 10% cancellation fee.
- Cancellation fee: ₹60 (10%)
- Platform fee: ₹12 (2%)
- Refund: ₹600 - ₹60 - ₹12 = **₹528**

### 12.4 Data Model

```
pitchPolicies: {
    returnPolicy: 'no_returns' | 'exchange_only' | 'full_refund_24h' | 'custom',
    returnPolicyCustom: string | null,          // only when returnPolicy === 'custom'
    cancellationFeePercent: 0 | 5 | 10,         // host-configured, default: 10
    platformFeePercent: 2,                       // fixed, not host-configurable
}
```

### 12.5 UI Display

- **Pitch Detail page:** A "Policies" section below the description shows the return policy and quit rules in a compact card format.
- **Join Pitch flow:** Before confirming, participants see a summary of the applicable policies with a note: *"By joining, you agree to the host's pitch policies."*
- **Edit Pitch page:** Host can modify policies as long as no order has been placed. After order is placed, policies are locked.

---

## References

[1]: User provided design points and issue list.
[2]: LinkedIn. (2024). Group Buying in Indian E-commerce: Is Now the Right Time?
[3]: Industry best practices for community group buying (Pinduoduo, Meituan Select).
