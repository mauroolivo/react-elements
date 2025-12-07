import { create } from "zustand";
import { UserState } from "../dashboard/types";
import { signIn, signOut } from "../dashboard/auth";

export const useUserStore = create<UserState>((set) => ({
  userName: undefined,
  permissions: undefined,
  loading: false,
  handleSignIn: async () => {
    set({ loading: true });
    const user = await signIn();
    set({
      userName: user.name,
      permissions: user.permissions,
      loading: false,
    });
  },
  handleSignOut: async () => {
    set({ loading: true });
    await signOut();
    set({
      userName: undefined,
      permissions: undefined,
      loading: false,
    });
  },
  togglePermissions: () =>
    set((state) => ({
      permissions: state.permissions?.length === 0 ? ["admin"] : [],
    })),
}));
