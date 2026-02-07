import { create } from "zustand";
import type { User } from "firebase/auth";
import {
  signupWithEmail,
  signinWithEmail,
  signinWithGoogle,
  logoutFirebase,
  onAuthChanged,
} from "@/lib/firebase";

declare global {
  interface Window {
    __authUnsub?: () => void;
  }
}

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  init: boolean;
  signup: (
    username: string | null,
    email: string,
    password: string,
  ) => Promise<User | void>;
  signin: (email: string, password: string) => Promise<void>;
  signinWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  initAuthListener: () => void;
};

export const useAuthStore = create<AuthState>(
  (
    set: (
      partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>),
    ) => void,
    get: () => AuthState,
  ) => {
    // auto-init when running in browser
    if (typeof window !== "undefined") {
      // defer to next tick to avoid calling during module evaluation
      setTimeout(() => {
        try {
          get().initAuthListener();
        } catch (e) {
          console.error("Failed to initialize auth listener", e);
          // ignore -- firebase may not be configured yet
        }
      }, 0);
    }

    return {
      user: null,
      loading: false,
      error: null,
      init: false,

      initAuthListener: () => {
        if (get().init || typeof window === "undefined") return;
        set({ init: true });
        try {
          const unsub = onAuthChanged((u) => {
            set({ user: u });
          });
          // store unsubscribe on window for possible debugging/cleanup
          window.__authUnsub = unsub;
        } catch (e) {
          // onAuthChanged may throw if firebase isn't configured; record error
          const msg = e instanceof Error ? e.message : String(e);
          set({ error: msg });
        }
      },

      signup: async (
        username: string | null,
        email: string,
        password: string,
      ) => {
        set({ loading: true, error: null });
        try {
          const u = await signupWithEmail(username, email, password);
          set({ user: u });
          return u;
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          set({ error: msg });
        } finally {
          set({ loading: false });
        }
      },

      signin: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          await signinWithEmail(email, password);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          set({ error: msg });
          throw e;
        } finally {
          set({ loading: false });
        }
      },

      signinWithGoogle: async () => {
        set({ loading: true, error: null });
        try {
          await signinWithGoogle();
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          set({ error: msg });
          throw e;
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await logoutFirebase();
          set({ user: null });
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          set({ error: msg });
          throw e;
        } finally {
          set({ loading: false });
        }
      },
    };
  },
);

export default useAuthStore;
