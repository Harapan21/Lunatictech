import { writable } from "svelte/store";

export const active_post = writable();

export const panel_router = writable(0);
export const topic_active = writable({
  topic: undefined,
  key: undefined,
  name: undefined,
  thumbnail: undefined,
  year: undefined
});

export const blog = writable({
  info: {
    name: "",
    description: "",
    loaded: false
  }
});
