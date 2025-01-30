const { invoke } = window.__TAURI__.core;
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
import { ask, message } from "@tauri-apps/api/dialog";

let greetInputEl;
let greetMsgEl;

async function greet() {
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

async function checkForUpdates() {
  try {
    const { shouldUpdate, manifest } = await checkUpdate();

    if (shouldUpdate) {
      const userAgreed = await ask(
        `Ein neues Update (${manifest?.version}) ist verfügbar! Möchtest du es jetzt installieren?`,
        { title: "Update verfügbar", type: "info" }
      );

      if (userAgreed) {
        await installUpdate();
        await message("Update wurde installiert. Die App wird jetzt neu gestartet!", { type: "info" });
        await relaunch();
      }
    }
  } catch (error) {
    console.error("Fehler beim Update:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  // Prüfe beim Start auf Updates
  checkForUpdates();
});
