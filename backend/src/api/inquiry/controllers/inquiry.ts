import { factories } from '@strapi/strapi';

// Simple in-memory rate limiter (per IP)
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;        // max requests
const RATE_WINDOW = 60_000;  // per 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip);
  }
}, 5 * 60_000);

export default factories.createCoreController('api::inquiry.inquiry', ({ strapi }) => ({
  async create(ctx) {
    // Rate limiting
    const ip = ctx.request.ip || ctx.ip || 'unknown';
    if (isRateLimited(ip)) {
      ctx.status = 429;
      ctx.body = { error: { message: 'Too many requests. Please try again later.' } };
      return;
    }

    // Honeypot check — if the hidden field has a value, it's a bot
    const honeypot = ctx.request.body?.data?.company_name;
    if (honeypot) {
      // Silently reject but return success so bots think it worked
      ctx.status = 200;
      ctx.body = { data: { id: 0 } };
      return;
    }

    // Remove honeypot field before passing to Strapi
    if (ctx.request.body?.data) {
      delete ctx.request.body.data.company_name;
    }

    // Proceed with default create
    return await super.create(ctx);
  },
}));
