import { DEV_MODE } from "./Constants";

export const debugLog = (msg: string, ...args: any[]) => DEV_MODE == "DEBUG" ? console.log(`\n@__${msg}__ :`, ...args) : null;