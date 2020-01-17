import { writable } from "svelte/store";

export const active_post = writable();

export const panel_router = writable(0);
export const topic_active = writable({
  topic: undefined,
  id: undefined,
  name: undefined
});
