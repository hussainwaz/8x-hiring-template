# 8x Full-Stack Internship Assignment

This project is a partial recreation of **babiceva.ai**, built on top of the provided 8x hiring template.  
The goal was to build something similar to the **babiceva.ai** website, so I tried to copy the overall design and layout as much as possible within the given time.


---

## What I Built

- **Homepage**
  - Hero section with main CTA
  - Video gallery
  - Professional tips section

- **AI Tool Pages**
  - Video Generation page (main functional tool)
  - Other AI tool pages implemented as UI only
  - Form inputs (selectors, toggles, textarea)
  - Mock AI generation with loading and result states

- **Pricing & Subscription Flow**
  - Free and Pro tiers
  - Fake checkout UI
  - User upgraded to `pro` on successful mock checkout
  - UI and features gated based on subscription tier

- **Auth-Aware UI States**
  - Logged out → Logged in (Free) → Logged in (Pro)
  - Clear CTAs depending on user state
  - Disabled or gated actions where appropriate


---

## What I Reused From the Template

The provided template already included a solid foundation, so I intentionally reused:

- Supabase Auth setup (sign up, sign in, session handling)
- Protected route utilities
- Base layout and routing
- Supabase local configuration and migrations

Rather than rebuilding these parts, I focused on using them correctly and extending them where needed.

---

## Auth and Free / Pro Gating Logic

The app supports three distinct user states:

1. **Logged Out**
   - Pages are accessible for exploration
   - Generation actions prompt the user to sign in

2. **Logged In (Free)**
   - Access to tools with limited features
   - Upgrade prompts shown for Pro-only functionality

3. **Logged In (Pro)**
   - Full access to all features
   - Pro-only options unlocked

Instead of hard-locking entire routes, feature access is gated at the action level, allowing exploration while enforcing authentication at execution time.

---

## Issues I Ran Into

- **Docker Setup**
  - Docker was not installed initially and had to be set up to run Supabase locally
  - First-time image pulls took significant time

- **Supabase Local Development**
  - First experience running Supabase locally
  - Required installing the Supabase CLI and configuring environment variables
  - Minor issues during `supabase start` and `supabase db reset`, resolved by re-running and checking logs

---

## What I’d Improve With More Time

- Integrate real AI generation APIs instead of mock responses  
- Complete all other AI tool pages beyond the video generation page  
- Replace the fake checkout with Stripe / Stripe Connect  
- Improve caching and memoization for better performance on heavier UI sections  
- Add smoother transitions and micro-interactions  
- Enhance mobile responsiveness  
- Add more robust error handling and logging  
- Implement a history feature to save generated videos and images

---

## Video Link


