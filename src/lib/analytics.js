/**
 * Central GA4 event tracker.
 * All components import `track` from here — never call window.gtag directly.
 * Safe no-op if GA4 is blocked or not yet loaded.
 */
export function track(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

// ── Event name constants — prevents typos across components ──────────────────
export const EVENTS = {
  // Conversions
  WAITLIST_FORM_STARTED:   'waitlist_form_started',
  WAITLIST_SUBMITTED:      'waitlist_submitted',
  WAITLIST_FORM_ABANDONED: 'waitlist_form_abandoned',

  // CTAs
  CTA_CLICKED:             'cta_clicked',

  // Pricing
  PRICING_PLAN_CTA_CLICKED: 'pricing_plan_cta_clicked',

  // Feature engagement
  AI_CHAT_TAB_SWITCHED:     'ai_chat_tab_switched',
  WA_SCENARIO_SWITCHED:     'whatsapp_scenario_switched',
  DASHBOARD_WA_QUERY:       'dashboard_wa_query_clicked',

  // Passive engagement
  SECTION_VIEWED:           'section_viewed',
  SCROLL_DEPTH:             'scroll_depth',
  EXTERNAL_LINK_CLICKED:    'external_link_clicked',
}
