import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  type RemoteConfig,
  type RemoteConfigSettings,
} from "firebase/remote-config";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error(
      "Firebase can only be initialized in the browser (client-side)",
    );
  }

  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }

  return getApp();
}

export function getFirebaseAnalytics() {
  if (typeof window === "undefined") return null;
  try {
    const app = getFirebaseApp();
    return getAnalytics(app);
  } catch (e) {
    console.log("Firebase Analytics is not supported in this environment.", e);
    return null;
  }
}

export function getFirebaseRemoteConfig(): RemoteConfig {
  if (typeof window === "undefined") {
    throw new Error("Remote Config can only be used in the browser (client-side)");
  }

  const app = getFirebaseApp();
  const rc = getRemoteConfig(app);

  // Reduce fetch interval in development for quicker iteration
  try {
    rc.settings = {
      minimumFetchIntervalMillis: process.env.NODE_ENV === "development" ? 1000 : 3600000,
    } as RemoteConfigSettings;
  } catch (e) {
    console.warn("Failed to set Remote Config settings, possibly due to unsupported SDK version.", e);
    // ignore if SDK version doesn't support settings assignment in this environment
  }



  return rc;
}

export async function fetchAndActivateRemoteConfig(): Promise<boolean> {
  try {
    const rc = getFirebaseRemoteConfig();
    return await fetchAndActivate(rc);
  } catch (e) {
    console.error('Remote Config fetchAndActivate failed', e);
    return false;
  }
}

export function getRemoteConfigValue(key: string, defaultValue = ''): string {
  try {
    const rc = getFirebaseRemoteConfig();
    const val = getValue(rc, key);
    const s = val.asString();
    return s === '' ? defaultValue : s;
  } catch (e) {
    console.error('getRemoteConfigValue error', e);
    return defaultValue;
  }
}

export default getFirebaseApp;
