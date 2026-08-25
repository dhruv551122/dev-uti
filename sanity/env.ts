export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-05";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const siteName = assertValue(
  process.env.NEXT_PUBLIC_SITE_NAME,
  "Missing environment variable: NEXT_PUBLIC_SITE_NAME",
);

export const domainUrl = assertValue(
  process.env.NEXT_PUBLIC_DOMAIN_URL?.replace(/\/$/, "") || "",
  "Missing environment variable: NEXT_PUBLIC_DOMAIN_URL",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
