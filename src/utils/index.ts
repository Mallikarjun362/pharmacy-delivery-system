import { format, formatDistance } from "date-fns";
import { DEV_MODE } from "./Constants";

export const debugLog = (msg: string, ...args: any[]) => DEV_MODE == "DEBUG" ? console.log(`@__${msg}__ :`, ...args) : null;

export const toJSON = (val: any) => JSON.parse(JSON.stringify(val));

export const getTimeDiffFromNow = (date: any) => (Date.now() - new Date(date).getTime() < 24 * 3600 * 1000
    ? formatDistance(date, Date.now(), { includeSeconds: true, addSuffix: true })
    : format(date, 'MMM d/yyyy h:m a'))