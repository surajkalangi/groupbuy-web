# Clarification on Clan and Pool Visibility & Publishing Logic (LetsStack Platform)

This document provides a detailed explanation of how Clan and Pool visibility, multi-clan tagging, and access governance function within the **LetsStack** community group buying platform.

---

## 1. Core Concepts & Architectural Model

To understand the platform's publishing and discovery mechanism, it is essential to distinguish between two foundational entities:

1. **Clan Privacy/Access Type**: Defines how members discover and join a specific community circle.
2. **Pool Visibility & Discovery (Union of Access)**: Defines who can discover, search for, view, and participate in a specific group pooling deal.

### 1.1 Clan Privacy Types

* **Public / Open Clan** (e.g., *Festive & Seasonal Collective*, *Board Games Guild*, *West Hyderabad Collective*):
  - Discoverable globally by any user on the platform via Search, Map, and Browse Clans.
  - Open join (one-tap membership) without requiring host/lead approval.
* **Restricted / Gated Clan** (e.g., *Ravi Dham Complex*, *MyHome Tridasa*, *Sathva Knowledge City*):
  - Created for closed, trusted social circles (apartment towers, residential gated communities, corporate workplaces).
  - Joining requires clan lead/moderator approval (`privacy: 'approval_required'`).
  - **Strict Zero-Access Security**: Pending applicants have zero access to restricted clan content or member discussions until officially approved by a clan lead.

---

## 2. Pool Visibility: The "Union of Access" Model

In LetsStack, **Pool visibility is derived from its tagged Clans**. Hosts can tag one or more clans to pool demand across communities.

### 2.1 The Derivation Matrix

| Tagged Clan Selection | Derived Pool Visibility | Discovery & Search Reach | Who Can Participate? |
|:---|:---|:---|:---|
| **Includes at least 1 Public/Open Clan** (e.g. *Festive Collective* + *MyHome Tridasa*) | **Public Discovery Pool** | Listed on Public Feed (`/feed`), Global Search (`/search`), Discover Feed (`/discover`), and all tagged Clan Feeds. | Any registered user who joins the public clan or tagged private clans. |
| **Only Restricted/Private Clans** (e.g. *MyHome Tridasa* only, or *MyHome Tridasa* + *Ravi Dham Complex*) | **Restricted Community Pool** | **Strictly Gated:** Visible only on the feeds of the tagged clans. In Global Search, only verified members of those clans can find it; it is **completely hidden** from non-members and public discovery feeds. | Verified members of the tagged private clans only. |
| **0 Clans Tagged** (`clanIds: []`) | **Direct Link Only (Unlisted)** | **Unlisted:** Hidden from all feeds, categories, and search results across the entire platform. | Anyone who possesses the direct invite link. |

---

## 3. Publishing Logic & Creation Flow

In Step 3 (**Rules & Publish**) of the Pool Creation flow (`/pitches/create`):

1. **Unconditional Target Clan Selection:**
   - Target Clan selection is always available and prominent (not hidden behind any secondary toggle).
   - Hosts select one or multiple clans from their joined communities.
2. **Dynamic Real-Time Visibility Feedback:**
   - The UI dynamically computes the **Derived Visibility** and displays a prominent audience badge + description:
     - **🌐 Public Discovery Pool**: *"Because this pool includes open public clans ({Names}), it will be discoverable on the public search and feed."*
     - **🔒 Restricted Community Pool**: *"Tagged strictly to gated clans ({Names}). Only verified members of these communities can search, view, and participate."*
     - **🔗 Direct Link Only**: *"No clans tagged. This pool will be unlisted and accessible strictly via direct invite link."*
3. **Post-Publish Clan Expansion Governance:**
   - If a host initially creates a pool tagged **exclusively to a restricted/private clan** (e.g., apartment complex), they may later expand and tag additional clans (including public clans) **only if no participant discussions have occurred yet**.
   - If discussions/messages have already been posted within the restricted community, expanding to public clans is locked to protect member privacy and confidential apartment chatter.

---

## 4. Cross-Clan Discussions & Viewer-Personalized Privacy

When a pool is tagged across multiple clans (e.g., *Festive & Seasonal Collective* + *MyHome Tridasa* + *Ravi Dham Complex*), all participants share a unified discussion thread to coordinate bulk deliveries.

### 4.1 Viewer-Personalized Community Awareness
To maintain transparency without UI clutter:
- **Private Clan Members participating in multi-clan pools:** See a tailored privacy reminder at the top of the discussion thread:
  > *"This discussion is shared across **{Clan A}**, **{Clan B}**, and **{Clan C}** clans."*
- **Formatting Rule:** Individual clan names are rendered in bold JSX tags, while conjunctions (`and`, commas) remain unbolded so multi-word clan names remain distinct and readable.
- **Public-Only Participants:** Enjoy a clean, streamlined thread without redundant privacy prompts.

---

## 5. Guest Browsing & Access Control Matrix

| Entry Point / User State | Public Pool | Restricted Pool (Private Clan) | Direct Link Pool (Unlisted) |
|:---|:---|:---|:---|
| **Non-Logged In (Guest)** | Read-only details; chat and participation prompt Sign In. | Hidden behind "Members Only" lock card; prompts Sign In + Clan Join. | Read-only details; participation prompts Sign In. |
| **Logged-In Non-Member** | Full read-only view; one-tap "Join Pool" (auto-joins open clan). | Hidden from search/discovery. If accessed via link: "Request to Join Clan" prompt. | Full read-only view; "Join Pool" active. |
| **Verified Clan Member** | Full access: View, Join Pool, chat in Pool Discussion, UPI escrow pay. | Full access: View, Join Pool, chat in Pool Discussion, UPI escrow pay. | Full access. |
| **Pending Clan Member** | Full access (if public clan). | **Zero Access:** Cannot view deals, progress, or chat until approved by clan lead. | Full access via direct link. |
