import * as Sentry from "@sentry/react";
import { isBrowser } from "@/lib/utils";

const SENTRY_DSN_KEY = "NEXT_PUBLIC_SENTRY_DSN";

function getDSN(): string | undefined {
  if (!isBrowser) return process.env.SENTRY_DSN;
  return (
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    (typeof window !== "undefined" &&
      (window as any).__NEXT_DATA__?.props?.sentryDsn)
  );
}

export function initSentry() {
  const dsn = getDSN();
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
    integrations: isBrowser
      ? [Sentry.browserTracingIntegration(), Sentry.replayIntegration()]
      : [],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export function captureError(error: Error, context?: Record<string, unknown>) {
  const dsn = getDSN();
  if (!dsn) {
    console.error("[Sentry] No DSN configured — skipping:", error.message);
    return;
  }
  Sentry.withScope((scope) => {
    if (context) scope.setExtras(context);
    Sentry.captureException(error);
  });
}

export { Sentry };
