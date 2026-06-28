/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as allegro from "../allegro.js";
import type * as auth from "../auth.js";
import type * as authDb from "../authDb.js";
import type * as crons from "../crons.js";
import type * as discord from "../discord.js";
import type * as email from "../email.js";
import type * as emailDb from "../emailDb.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as i18nError from "../i18nError.js";
import type * as mailShell from "../mailShell.js";
import type * as orderPricing from "../orderPricing.js";
import type * as orderStats from "../orderStats.js";
import type * as orders from "../orders.js";
import type * as payments from "../payments.js";
import type * as profile from "../profile.js";
import type * as seedDev from "../seedDev.js";
import type * as seedDevDb from "../seedDevDb.js";
import type * as serverAuth from "../serverAuth.js";
import type * as shareLinks from "../shareLinks.js";
import type * as storage from "../storage.js";
import type * as uploadRules from "../uploadRules.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  allegro: typeof allegro;
  auth: typeof auth;
  authDb: typeof authDb;
  crons: typeof crons;
  discord: typeof discord;
  email: typeof email;
  emailDb: typeof emailDb;
  files: typeof files;
  http: typeof http;
  i18nError: typeof i18nError;
  mailShell: typeof mailShell;
  orderPricing: typeof orderPricing;
  orderStats: typeof orderStats;
  orders: typeof orders;
  payments: typeof payments;
  profile: typeof profile;
  seedDev: typeof seedDev;
  seedDevDb: typeof seedDevDb;
  serverAuth: typeof serverAuth;
  shareLinks: typeof shareLinks;
  storage: typeof storage;
  uploadRules: typeof uploadRules;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
