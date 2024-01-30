// GOOGLE OAUTH CREDENTIALS
export const GOOGLE_OAUTH_CLIENT_ID: string = process.env.GOOGLE_OAUTH_CLIENT_ID!;
export const GOOGLE_OAUTH_CLIENT_SECRET: string = process.env.GOOGLE_OAUTH_CLIENT_SECRET!;


// GENERAL
export const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL!;
export const MONGODB_URI: string = process.env.MONGODB_URI!;
export const HOST_DOMAIN: string = process.env.HOST_DOMAIN!;
export const SERVER_SECRET: string = process.env.SERVER_SECRET!;
export const JWT_LIFESPAN_DAYS: number = parseInt(process.env.JWT_LIFESPAN_DAYS!);
export const DEV_MODE: string = "DEBUG";
export const DEFAULT_PERMISSIONS = {};
