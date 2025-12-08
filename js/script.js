/* global script for Wanderkalender
   - Für index.html verhält es sich passiv (keine Aktion nötig)
   - Für monatliche Seiten: body muss data-month="01" setzen (z.B. route01.html)
   - Für tägliche Seiten: body muss data-month="01" UND class "daily-page"
*/

document.addEventListener('DOMContentLoaded', () => {

  /* --- Helfer: Month key (zB "monat01") --- */
  function monthKeyFromBody() {
    const m = document.body.dataset.month;
    return m ? `monat${String(m).padStart(2,'0')}` : null;
  }

  /* --- 1) Wenn wir auf einer daily page sind: Aufgaben generieren & Fortschritt --- */
  if (document.body.classList.contains('daily-page')) {
    // Beispiel-Aufgaben (kannst du individuell anpassen)
    const monatAufgaben = [
      "Heute jemandem ein Lächeln schenken",
      "5 Minuten bewusst draußen spazieren",
      "Notiere drei Dinge, für die du dankbar bist",
      "Hilf jemandem ohne zu fragen",
      "Schreibe eine kurze Nachricht an einen Freund",
      "Trinke ein Glas Wasser extra",
      "Mache eine kleine Yoga-Übung",
      "Sammle Müll in der Umgebung",
      "Höre deine Lieblingsmusik",
      "Male oder zeichne etwas Kleines",
      "Lese 5 Seiten eines Buchs",
      "Rufe ein Familienmitglied an",
      "Schreibe eine positive Eigenschaft über dich auf",
      "Gehe eine extra Runde spazieren",
      "Schreibe ein Kompliment an jemanden",
      "Mach eine kleine Meditation",
      "Erledige eine Aufgabe, die du aufgeschoben hast",
      "Tanze 2 Minuten zu deinem Lieblingssong",
      "Lächle bewusst in den Spiegel",
      "Schreibe eine kleine To-Do-Liste für die Woche",
      "Führe ein kurzes Dankbarkeitstagebuch",
      "Mach ein Foto von etwas Schönem draußen",
      "Teile ein lustiges Video mit jemandem",
      "Räume einen kleinen Bereich auf",
      "Backe oder koche etwas Kleines",
      "Trinke bewusst Tee oder Kaffee",
      "Lese einen inspirierenden Spruch",
      "Schreibe eine nette Nachricht an jemanden",
      "Atme bewusst 5 Minuten tief durch",
      "Reflektiere kurz, was dir heute Freude gemacht hat"
    ];

    const container = document.getElementById('tageAufgaben') || document.querySelector('#tageAufgaben');
    const fortText = document.getElementById('fortschrittText');
    const barFill = document.getElementById('fortschrittFuellung');
    if (!container || !fortText || !barFill) return;

    const monthKey = monthKeyFromBody() || 'monatXX';

    // Erzeuge die Liste
    const checkboxes = [];
    monatAufgaben.forEach((aufgabe, i) => {
      const id = `${monthKey}_tag${i+1}`;

      const row = document.createElement('div');
      row.className = 'tagAufgabe';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = id;
      cb.checked = localStorage.getItem(id) === 'true';

      cb.addEventListener('change', () => {
        localStorage.setItem(id, cb.checked);
        updateProgress();
      });

      const label = document.createElement('label');
      label.htmlFor = id;
      label.textContent = `Tag ${i+1}: ${aufgabe}`;

      row.appendChild(cb);
      row.appendChild(label);
      container.appendChild(row);
      checkboxes.push(cb);
    });

    function updateProgress(){
      const done = checkboxes.filter(c => c.checked).length;
      const total = checkboxes.length;
      fortText.textContent = `${done} von ${total} erledigt`;
      const p = Math.round((done / total) * 100);
      barFill.style.width = p + '%';
      barFill.textContent = p + '%';
    }

    updateProgress();
  }

  /* --- 2) Optional: Bild-Slider (einfache Implementation) --- */
  document.querySelectorAll('.image-slider').forEach(slider => {
    const imgs = slider.querySelectorAll('img');
    let i = 0;
    if (imgs.length < 2) return;
    // Buttons? einfache Auto-Rotation
    setInterval(() => {
      imgs[i].classList.remove('active');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('active');
    }, 3500);
  });

});
