
const supabase = supabase.createClient(
  'https://TUO-PROGETTO.supabase.co',  // 🔁 Sostituisci con il tuo Supabase URL
  'CHIAVE-PUBBLICA'                    // 🔁 Sostituisci con la tua chiave anon
);

let currentTable = 'partite_a'; // può essere 'partite_b', 'partite_c', ecc.
const authArea = document.getElementById('auth-area');
const tbodyResults = document.getElementById("calendario-body");
const tbodyStandings = document.getElementById("standings-body");

function editableCell(value, onChange) {
  const td = document.createElement("td");
  td.contentEditable = true;
  td.textContent = value;
  td.addEventListener("blur", () => {
    const newVal = td.textContent.trim();
    if (newVal !== value) onChange(newVal);
  });
  return td;
}

async function loadDati() {
  const { data: partite, error } = await supabase.from(currentTable).select("*").order("ora");

  if (error) {
    tbodyResults.innerHTML = `<tr><td colspan="10">Errore: ${error.message}</td></tr>`;
    return;
  }

  tbodyResults.innerHTML = "";
  const stats = {};

  partite.forEach(p => {
    const tr = document.createElement("tr");

    const update = (field, val) => {
      supabase.from(currentTable).update({ [field]: isNaN(val) ? val : parseInt(val) })
        .eq("id", p.id);
    };

    const fields = [
      ["squadra1", p.squadra1], ["set1_vinti", p.set1_vinti], ["punti1", p.punti1],
      ["squadra2", p.squadra2], ["set2_vinti", p.set2_vinti], ["punti2", p.punti2],
      ["campo", p.campo], ["ora", p.ora], ["arbitro", p.arbitro]
    ];

    fields.forEach(([key, val]) => {
      tr.appendChild(editableCell(val ?? "", newVal => update(key, newVal)));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.textContent = "Elimina";
    deleteBtn.onclick = async () => {
      await supabase.from(currentTable).delete().eq("id", p.id);
      loadDati();
    };

    const tdAzioni = document.createElement("td");
    tdAzioni.appendChild(deleteBtn);
    tr.appendChild(tdAzioni);

    tbodyResults.appendChild(tr);

    [p.squadra1, p.squadra2].forEach(t => {
      if (!stats[t]) stats[t] = { setVinti: 0, setPersi: 0, puntiFatti: 0, puntiSubiti: 0 };
    });
    stats[p.squadra1].setVinti += p.set1_vinti || 0;
    stats[p.squadra1].setPersi += p.set2_vinti || 0;
    stats[p.squadra1].puntiFatti += p.punti1 || 0;
    stats[p.squadra1].puntiSubiti += p.punti2 || 0;

    stats[p.squadra2].setVinti += p.set2_vinti || 0;
    stats[p.squadra2].setPersi += p.set1_vinti || 0;
    stats[p.squadra2].puntiFatti += p.punti2 || 0;
    stats[p.squadra2].puntiSubiti += p.punti1 || 0;
  });

  const sorted = Object.entries(stats).sort((a, b) => {
    if (b[1].setVinti !== a[1].setVinti) return b[1].setVinti - a[1].setVinti;
    return (b[1].puntiFatti - b[1].puntiSubiti) - (a[1].puntiFatti - a[1].puntiSubiti);
  });

  tbodyStandings.innerHTML = "";
  sorted.forEach(([team, d]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${team}</td>
      <td>${d.setVinti}</td>
      <td>${d.setPersi}</td>
      <td>${d.puntiFatti}</td>
      <td>${d.puntiSubiti}</td>
      <td>${d.puntiFatti - d.puntiSubiti}</td>
    `;
    tbodyStandings.appendChild(row);
  });
}

async function aggiungiPartita() {
  const { error } = await supabase.from(currentTable).insert([{ squadra1: "", squadra2: "" }]);
  if (error) alert("Errore: " + error.message);
  else loadDati();
}

async function setupAuth() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    authArea.innerHTML = `
      <span class="me-2">Bentornato!</span>
      <button class="btn btn-danger btn-sm" onclick="logout()">Logout</button>
    `;
  } else {
    authArea.innerHTML = `
      <button class="btn btn-primary btn-sm" onclick="window.location.href='login.html'">Login</button>
    `;
  }
}

async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

document.addEventListener("DOMContentLoaded", async () => {
  await setupAuth();
  await loadDati();
});
