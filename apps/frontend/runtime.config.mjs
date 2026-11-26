// Settings the browser reads from /config.js (window.__POSTIZ_CONFIG__).
// They used to be rendered into every page by the Next.js root layout, which
// is what lets one Docker image be configured with environment variables, so
// they are still read when the server starts, not when the app is built.
// Everything here is sent to every visitor: only add values that are public.
//
// Docker: `node apps/frontend/runtime.config.mjs > apps/frontend/dist/config.js`
// Dev: served by the Vite dev server (vite.config.ts).
import { pathToFileURL } from 'url';

export const runtimeConfig = (env = process.env) => ({
  storageProvider: env.STORAGE_PROVIDER,
  backendUrl: env.NEXT_PUBLIC_BACKEND_URL,
  plontoKey: env.NEXT_PUBLIC_POLOTNO,
  stripeClient: env.STRIPE_PUBLISHABLE_KEY,
  isChatBase: !!env.CHATBASE_TOKEN,
  billingEnabled: !!env.STRIPE_PUBLISHABLE_KEY,
  discordUrl: env.NEXT_PUBLIC_DISCORD_SUPPORT,
  frontEndUrl: env.FRONTEND_URL,
  isGeneral: !!env.IS_GENERAL,
  genericOauth: !!env.POSTIZ_GENERIC_OAUTH,
  oauthLogoUrl: env.NEXT_PUBLIC_POSTIZ_OAUTH_LOGO_URL,
  oauthDisplayName: env.NEXT_PUBLIC_POSTIZ_OAUTH_DISPLAY_NAME,
  uploadDirectory: env.NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY,
  cloudflareUrl: env.CLOUDFLARE_BUCKET_URL || '',
  mainUrl: env.MAIN_URL || '',
  mcpUrl: env.MCP_URL,
  dub: !!env.STRIPE_PUBLISHABLE_KEY,
  facebookPixel: env.NEXT_PUBLIC_FACEBOOK_PIXEL,
  telegramBotName: env.TELEGRAM_BOT_NAME,
  neynarClientId: env.NEYNAR_CLIENT_ID,
  appleClientId: env.APPLE_CLIENT_ID,
  isSecured: !env.NOT_SECURED,
  disableImageCompression: !!env.DISABLE_IMAGE_COMPRESSION,
  disableXAnalytics: !!env.DISABLE_X_ANALYTICS,
  sentryDsn: env.NEXT_PUBLIC_SENTRY_DSN,
  extensionId: env.EXTENSION_ID || '',
  googleAdsId: env.NEXT_PUBLIC_GTM_ID,
  googleAdsTrialTracking: env.NEXT_PUBLIC_TRACKING_TRIAL,
  recaptchaSiteKey: env.RECAPTCHA_SITE_KEY || '',
  mediaProcessing:
    env.STORAGE_PROVIDER === 'cloudflare' &&
    !!env.RUNPOD_API_KEY &&
    !!env.RUNPOD_ENDPOINT_ID,
  // Not part of the variables context, used by the route guards and analytics
  disableRegistration: env.DISABLE_REGISTRATION === 'true',
  datafastWebsiteId: env.DATAFAST_WEBSITE_ID,
});

export const runtimeConfigScript = (env = process.env) =>
  `window.__POSTIZ_CONFIG__ = ${JSON.stringify(runtimeConfig(env))};\n`;

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.stdout.write(runtimeConfigScript());
}
