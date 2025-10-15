import { ui } from "./ui.js";

export let localData = null;

export function changeLocalDaa(value) {
  localData = value;
  ui(localData);
}
