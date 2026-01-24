
interface RateLimitResult {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
}

const stores = new Map<string, Map<string, { count: number; reset: number }>>();

/**
 * A simple in-memory rate limiter for Next.js API routes.
 * 
 * Note: In serverless environments (like Vercel), this is per-instance.
 * For global rate limiting, consider using Upstash Redis.
 */
export async function rateLimit(
    identifier: string,
    limit: number = 5,
    windowMs: number = 60000, // 1 minute
    storeKey: string = "default"
): Promise<RateLimitResult> {
    if (!stores.has(storeKey)) {
        stores.set(storeKey, new Map());
    }

    const store = stores.get(storeKey)!;
    const now = Date.now();
    const record = store.get(identifier);

    if (!record || now > record.reset) {
        const newRecord = {
            count: 1,
            reset: now + windowMs,
        };
        store.set(identifier, newRecord);
        return {
            success: true,
            limit,
            remaining: limit - 1,
            reset: newRecord.reset,
        };
    }

    record.count++;

    if (record.count > limit) {
        return {
            success: false,
            limit,
            remaining: 0,
            reset: record.reset,
        };
    }

    return {
        success: true,
        limit,
        remaining: limit - record.count,
        reset: record.reset,
    };
}
