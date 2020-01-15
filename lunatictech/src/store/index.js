import { writable } from "svelte/store";

export const active_post = writable();

export const panel_router = writable("notification");
