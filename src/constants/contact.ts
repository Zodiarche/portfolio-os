/**
 * Mirrors the message limit of the contact service (portfolio-contact,
 * `domain/validateContact.ts`), which rejects anything longer.
 */
export const MESSAGE_MAX_LENGTH = 5000;

/** The visible counter stays out of the way until the limit is close enough to matter. */
export const MESSAGE_COUNTER_THRESHOLD = MESSAGE_MAX_LENGTH * 0.9;

/**
 * Screen readers hear the count once typing stops, not on every keystroke. The GOV.UK
 * character count settles on the same one-second window.
 */
export const COUNTER_ANNOUNCE_DELAY_MS = 1000;
