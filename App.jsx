import { supabase } from "./supabaseClient.js";

const App = () => {
  const root = document.getElementById("app");

  root.innerHTML = `
    <div class="flex flex-col h-screen">
      <div class="p-4 text-center bg-indigo-600 text-lg font-bold">🏆 Tournament Hub</div>

      <div id="content" class="flex-1 overflow-y-auto p-4">
        <button id="loadTournaments" class="bg-green-600 px-4 py-2 rounded">Load Tournaments</button>
        <div id="tournamentList" class="mt-4"></div>
      </div>

      <div class="flex justify-around bg-gray-800 p-2">
        <button id="dashboard">🏠 Dashboard</button>
        <button id="tournaments">🏆 Tournaments</button>
        <button id="wallet">💰 Wallet</button>
        <button id="profile">👤 Profile</button>
      </div>
    </div>
  `;

  // Load tournaments from Supabase
  document.getElementById("loadTournaments").onclick = async () => {
    let { data, error } = await supabase.from("tournaments").select("*").limit(5);
    if (error) {
      alert("Error loading tournaments");
      return;
    }
    document.getElementById("tournamentList").innerHTML = data
      .map(t => `<div class="p-2 border-b">${t.title} — ${t.currency} ${t.budget}</div>`)
      .join("");
  };
};

App();
