import Script from "next/script";

export function Analytics() {
  const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;
  const umamiSrc = process.env.UMAMI_SRC;
  const umamiId = process.env.UMAMI_WEBSITE_ID;
  if (plausibleDomain) {
    const src = process.env.PLAUSIBLE_SRC?.trim() || "https://plausible.io";
    return <Script defer data-domain={plausibleDomain} src={`${src.replace(/\/$/, "")}/js/script.js`} />;
  }
  if (umamiSrc && umamiId) {
    return <Script defer src={umamiSrc} data-website-id={umamiId} />;
  }
  return null;
}
