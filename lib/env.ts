export const env = {
  NEXT_PUBLIC_OVIRO_BASE_URL: process.env.NEXT_PUBLIC_OVIRO_BASE_URL || "https://api.maotrung.com",
  NEXT_PUBLIC_OVIRO_TENANT_ID: process.env.NEXT_PUBLIC_OVIRO_TENANT_ID || "11000",
  NEXT_PUBLIC_API_TIMEOUT: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

if (!env.NEXT_PUBLIC_OVIRO_BASE_URL) console.warn("Missing env: NEXT_PUBLIC_OVIRO_BASE_URL");