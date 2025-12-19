/* global script for Wanderkalender
   - Für index.html verhält es sich passiv (keine Aktion nötig)
   - Für monatliche Seiten: body muss data-month="01" setzen (z.B. route01.html)
   - Für tägliche Seiten: body muss data-month="01" UND class "daily-page"
*/

document.addEventListener('DOMContentLoaded', () => {

  /* --- Helfer: Month key (zB "monat01") --- */
  function monthKeyFromBody() {
    const m = document.body.dataset.month;
    return m ? `monat${String(m).padStart(2, '0')}` : null;
  }

  /* --- Aufgaben pro Monat (NEU) --- */
  const aufgabenProMonat = {
    
  "01": [
    "Kreativ: Zeichne mit der nicht-dominanten Hand für 2 Minuten",
    "Achtsames Essen: Iss ein Stück Obst langsam und beschreibe Geschmack und Textur in 5 Minuten",
    "Kooperation: Spiele ein kurzes Teamspiel zu zweit, bei dem einer Anweisungen gibt und der andere verbindet (Dauer ~3 Minuten)",
    "Balanceübung: Stehe auf einem Bein und halte so lange du kannst, versuche 30 Sekunden",
    "Progressive Muskelentspannung: Spanne nacheinander Körperteile an und lasse los (10 Minuten)",
    "Bauchatmung: Lege eine Hand auf den Bauch und atme bewusst 5 Minuten",
    "Freier Tanz: Tanze zur Lieblingsmusik für 5 Minuten ohne geplante Schritte",
    "Reflexion: Notiere eine Sache, die du heute gelernt hast und warum (Dauer 3 Minuten)",
    "Soziale Geste: Sage jemandem etwas Nettes und beobachte seine Reaktion (kurz berichten in 1 Minuten)",
    "Körper-Scan: Lege dich hin und scanne langsam deinen Körper von Kopf bis Fuß (5 Minuten)",
    "Feinmotorik: Fädle Perlen oder schnüre Schuhe bewusst für 5 Minuten",
    "Natur-Aufgabe: Sammle 3 verschiedene Blätter, vergleiche Form, Farbe und Größe (7 Minuten)",
    "Stille: Sitze still und beobachte Gedanken ohne zu bewerten (2 Minuten)",
    "Rollenspiel: Erfinde ein kurzes Dialogspiel mit einer Emotion als Thema (4 Minuten)",
    "Positive Affirmation: Formuliere und sprich laut eine stärkende Aussage (3×), reflektiere 1 Minuten",
    "Kurzgeschichte: Erfinde 3 Sätze als Mini-Geschichte zu einem Alltagsthema (3 Minuten)",
    "Papierbastelei: Baue eine kleine Figur aus Papier in 5 Minuten",
    "Rhythmus: Klatsche und zähle einen Rhythmus, dann lass andere nachmachen (3 Minuten)",
    "Ballkoordination: Werfe einen Ball gegen die Wand und fange ihn 10×",
    "Sonnenbegrüßungen: Mache 10 langsame Yoga-Runden",
    "Resilienzübung: Nenne eine Schwierigkeit und notiere zwei Lösungswege (3 Minuten)",
    "Achtsamkeits-Spaziergang: Gehe 5 Minuten und nimm bewusst 5 Details wahr",
    "Konzentrationsübung: Fixiere einen Punkt und zähle deine Atemzüge für 2 Minuten",
    "Duftübung: Rieche drei Düfte und beschreibe sie in jeweils 10 Sekunden",
    "Selbstfürsorge: Liste drei Dinge, die dir guttun und plane eine davon (3 Minuten)",
    "Partnerübung: Gib einem Partner eine kurze, freundliche Schultermassage für 20 Sekunden",
    "Fantasie: Male einen imaginären Ort und beschreibe ihn (7 Minuten)",
    "Musikreflexion: Höre ein Lied und notiere 3 Gefühle, die es weckt (5 Minuten)",
    "Aufräum-Minute: Räume 5 Minuten einen kleinen Bereich auf",
    "Gedächtnisübung: Nenne 5 Dinge vom gestrigen Tag in umgekehrter Reihenfolge",
    "Box-Breathing: Atme im Muster 4-4-4-4 für 3 Minuten"
  ],
  "02": [
    "Hampelmänner: Mache Hampelmänner für 60 Sekunden, dann ruhe 30 Sekunden",
    "Tast-Sinne: Fühle mit geschlossenen Augen 3 verschiedene Texturen und beschreibe sie",
    "Stolznotiz: Schreibe eine Sache, auf die du stolz bist, und erkläre warum (2 Minuten)",
    "Rätsel: Löse ein kurzes Zahlen- oder Wort-Rätsel (Dauer 5 Minuten)",
    "Summ-Übung: Summe leise eine Melodie 2 Minuten",
    "Visualisierung: Stelle dir einen beruhigenden Ort vor und beschreibe ihn (2 Minuten)",
    "Mini-Gedicht: Schreibe 4 Zeilen zu einem Gefühl (4 Minuten)",
    "Wärmen der Hände: Reibe Hände und halte sie warm an Bauch oder Wangen für 20 Sekunden",
    "Rückwärts-Lauf: Laufe sicher 15 Schritte rückwärts",
    "Feinschnitt: Schneide vorsichtig aus Papier eine Form (Dauer 5 Minuten)",
    "Beobachte Gedanken: Beobachte Gedanken 2 Minuten ohne zu reagieren",
    "Mutübung: Frage jemanden etwas, das dir unangenehm wäre, aber respektvoll (2 Minuten Vorbereitung)",
    "Wolkenbeobachtung: Beschreibe eine Wolke und finde eine Fantasiefigur (3 Minuten)",
    "Dankbarkeit: Nenne 3 Dinge, für die du heute dankbar bist und warum (2 Minuten)",
    "Buch-Blick: Lese 5 Seiten bewusst und markiere ein Lieblingszitat (10 Minuten)",
    "Stille-Lesen: Lies ein Zitat und reflektiere es 1 Minuten",
    "Atmung & Stimme: Singe eine Melodie langsam und achte auf Atemsupport (3 Minuten)",
    "Minidehnung: Dehne Nacken, Schultern und Rücken je 30 Sekunden",
    "Pause: 60 Sekunden bewusstes Atmen",
    "Kooperationsbau: Bau mit Bechern einen Turm zusammen (max 10 Becher)",
    "Gefühle benennen: Nenne 3 Gefühle und wo du sie im Körper spürst (2 Minuten)",
    "Achtsame Hände: Knete einen Ball 1 Minuten und beschreibe Empfindungen",
    "2-Minuten-Aufgabe: Erledige eine kleine Aufgabe sofort (z. B. Zimmer durchlüften)",
    "Zuhören: Höre einer Person 2 Minuten aktiv zu ohne zu unterbrechen",
    "Stimmenzählen: Zähle 10 Atemzüge und notiere Empfindungen nach jedem 5.",
    "Mini-Experiment: Probiere eine neue Sitzposition für 2 Minuten",
    "Atme beim Gehen: Koordiniere 4 Schritte einatmen, 4 ausatmen für 3 Minuten",
    "5 Minuten Atemübung: Atme ein 4s, halte 4s, atme aus 4s (4-4-4) (5 Minuten)"
  ],
  "03": [
    "10 langsame Kniebeugen: achte auf Haltung und Atem",
    "Sinne schärfen: Schließe die Augen und nenne 5 Geräusche in 2 Minuten",
    "Achtsames Zeichnen: Zeichne ohne Blick auf das Papier für 2 Minuten",
    "Achtsames Essen: Iss ein Stück Obst langsam und beschreibe Geschmack und Textur in 3 Minuten",
    "Kooperation: Spiele ein Kooperationsspiel, bei dem Stillschweigen gilt (Dauer 5 Minuten)",
    "Balance-Challenge: Laufe eine gerade Linie und halte das Gleichgewicht für 20 Sekunden",
    "Progressive Mini-Relax: Spanne Hände, Arme, Schultern an und lasse los (5 Minuten)",
    "Bauchatmung mit Bild: Atme und stelle dir vor, der Bauch ist ein Ballon (5 Minuten)",
    "Freier Tanz: Tanze mit geschlossenen Augen 3 Minuten und nimm Körperempfindungen wahr",
    "Reflexionsfrage: Nenne heute etwas, das dir schwer fiel, und eine Idee dazu (4 Minuten)",
    "Soziale Aufmerksamkeit: Bedanke dich bei einer Person für etwas Konkretes (1 Minute)",
    "Körper-Scan-Fokussiert: Scanne nur Beine und Füße (3 Minuten)",
    "Feinmotorik-Aufgabe: Falte eine kleine Figur aus Papier in 7 Minuten",
    "Natur-Detektiv: Finde ein Insekt und beschreibe es (3 Minuten Beobachtung)",
    "Stille mit Geräusch: Sitze 2 Minuten und nimm nur ein dominantes Geräusch wahr",
    "Rollenspiel-Emotionsfokus: Spiele eine Szene mit Überraschung als Thema (4 Minuten)",
    "Affirmation-Variation: Schreibe eine persönliche Affirmation und hänge sie auf (3 Minuten)",
    "Kurzgeschichte-Impulse: Beginne mit 'Heute entdeckte ich...' und schreibe 3 Sätze",
    "Papierflugzeug: Baue ein und teste Flugbahn (5 Minuten)",
    "Rhythmus-Paar: Erfinde einen Rhythmus und führe ihn 2 Minuten vor",
    "Ballspiel-Übung: Werfe den Ball in verschiedenen Winkeln 12×",
    "Sonnenbegrüßung-Variation: Mache 5 langsame Runden mit Atemzählung",
    "Resilienz-Check: Notiere eine kleine Rückschlag-Erfahrung und was half (5 Minuten)",
    "Detail-Spaziergang: Suche drei Farben draußen und beschreibe sie (5 Minuten)",
    "Fokussierübung: Schau 2 Minuten auf ein Blatt Papier und zähle Formen",
    "Duft-Interview: Beschreibe einen Duft und frage, ob andere ihn identifizieren (3 Minuten)",
    "Selbstfürsorge-Plan: Wähle heute eine Sache und setze sie um (5 Minuten)",
    "Partner-Spiegel: Spiegelt 1 Minute die Bewegungen des Anderen",
    "Fantasie-Karte: Zeichne eine Karte eines Fantasielandes (10 Minuten)",
    "Musik-Analyse: Achte auf Instrumente in einem Lied (5 Minuten)",
    "Mini-Aufräum: Räume 5 Minuten eine Schublade"
  ],
  "04": [
    "Box-Breathing: Atme im Muster 4-4-4-4 für 3 Minuten",
    "Intervall-Bewegung: 30 Sekunden schnell gehen, 30 Sekunden langsam, 3×",
    "Tast-Quiz: Fühle mit verbundenen Augen 4 Gegenstände und benenne sie",
    "Stolz-Postkarte: Schreibe eine kurze Postkarte an dich mit einer Stärken-Erinnerung (5 Minuten)",
    "Logikrätsel: Löse ein Puzzle mit einer Person (10 Minuten)",
    "Summ-Impro: Summe 2 Minuten eine Melodie und variiere Tonhöhen",
    "Sinnes-Visualisierung: Stelle dir eine Farbe vor und fokussiere Details (2 Minuten)",
    "Gefühlsgedicht: Schreibe 4 Zeilen über ein aktuelles Gefühl",
    "Hände wärmen & atmen: Reibe Hände und lege sie 30s auf den Bauch",
    "Rückwärts-Coordination: Gehe rückwärts 12 Schritte sicher",
    "Schnitt-Kunst: Schneide eine Schablone aus Papier (7 Minuten)",
    "Gedankenbeobachtung: Beobachte Gedanken 3 Minuten ohne Bewertung",
    "Mut-Probe: Sprich in der Gruppe eine kleine Idee an (Vorbereitungszeit 2 Minuten)",
    "Wolkenbilder: Vergleiche zwei Wolkenformen (2 Minuten)",
    "Dankbarkeits-Foto: Mache ein Foto von etwas, wofür du dankbar bist",
    "Buch-Note: Markiere eine überraschende Stelle in 5 gelesenen Seiten",
    "Zitat-Reflexion: Lies und kommentiere ein kurzes Zitat (1 Minute)",
    "Stimmübung: Summ eine Tonleiter ruhig 3 Minuten",
    "Nacken-Reset: Dehne Nacken 30 Sekunden pro Seite",
    "1-Minuten-Pause: Atme bewusst 60 Sekunden",
    "Turmbau-Kooperation: Baue gemeinsam einen Turm mit 12 Bechern",
    "Gefühlskarte: Male, wie dein heutiges Gefühl aussieht (5 Minuten)",
    "Hand-Achtsamkeit: Drücke und löse jede Hand jeweils 1 Minute",
    "Sofort-Erledigen: Führe eine kleine Aufgabe direkt aus (2 Minuten)",
    "Aktives Zuhören: Höre 2 Minuten und fasse danach zusammen",
    "Atemnotizen: Zähle 10 Atemzüge und schreibe Beobachtungen",
    "Sitz-Experiment: Probier 2 Minuten verschiedene Sitzpositionen",
    "Geh-Atem-Rhythmus: Atme 4 Schritte ein, 4 aus für 5 Minuten",
    "Kniebeugen: Mache 10 langsame Kniebeugen mit Fokus auf Form",
    "Mini-Ziel: Definiere ein kleines Ziel für den Tag"
  ],
  "05": [
    "Sinne-Check: Schließe die Augen und liste 5 Dinge, die du hörst (2 Minuten)",
    "Non-dominant-Zeichnung: Male mit der nicht-dominanten Hand 3 Minuten",
    "Achtsames Snacken: Iss einen Bissen bewusst mit 5 Sinnen (3 Minuten)",
    "Kooperationsspiel: Baue eine kurze Geschichte reihum (Dauer 7 Minuten)",
    "Single-Leg-Hold: Stehe 30 Sekunden pro Bein und wechsle achtsam",
    "Kurz-Entspannung: Progressive Muskelentspannung für 5 Minuten",
    "Belly-Breath-Variante: 7 tiefe Atemzüge mit Hand auf Bauch",
    "Tanz-Impro: Folge impulsiv der Musik 4 Minuten",
    "Lern-Notiz: Schreibe eine Sache, die du heute bewusst geübt hast",
    "Dankesaktion: Sage einer Person konkret wofür du dankbar bist",
    "Body-Check: Nenne drei Körperstellen, die sich gut anfühlen",
    "Finger-Fertigkeit: Fädle dünne Schnur durch eine Nadel (5 Minuten)",
    "Natur-Forschungsauftrag: Beschreibe eine Pflanze genau (10 Minuten)",
    "Stille-Alarm: Finde 2 Minuten Ruhe ohne Ablenkung",
    "Kurz-Impro: Spiele eine Szene ohne Worte (4 Minuten)",
    "Affirmation-Schreiben: Schreibe ein persönliches Mantra (3 Minuten)",
    "3-Satz-Story: Erzähle eine Mini-Story mit Anfang, Mitte, Ende",
    "Origami: Falte ein Herz aus Papier (7 Minuten)",
    "Rhythmus-Staffel: Erfinde in Gruppen einen Rhythmus und wechsle",
    "Ball-Variationen: Fange mit verschiedenen Handflächen 15×",
    "Yoga-Flow: Mache 5 Sonnengrüße mit langsamen Übergängen",
    "Problemlöseblatt: Notiere 2 Schritte zur Lösung eines kleinen Problems",
    "Achtsamer Spaziergang: Nimm 3 Gerüche unterwegs wahr (5 Minuten)",
    "Fokus-Check: Halte Blickkontakt mit einem Objekt 2 Minuten",
    "Geruchs-Tasting: Errate 3 Gewürze mit geschlossenen Augen",
    "Selbstfürsorge-Toolbox: Liste 3 Notfall-Strategien auf",
    "Spiegelübung: Sieh dich 30 Sekunden im Spiegel und nenne Stärken",
    "Imaginationsbild: Male innerlich eine Ruheoase (3 Minuten)",
    "Musikdetaillierung: Notiere 3 Instrumente in einem Song",
    "Schnelles Aufräumen: Räume 5 Minuten einen Tisch",
    "Gedächtnis-Recall: Erzähle eine kurze Geschichte vom Vortag"
  ],
  "06": [
    "Box-Breathing-Fokus: Atme 4-4-4-4 und zähle 6 Zyklen (3 Minuten)",
    "Mini-Cardio: 1 Minute Hampelmänner, 30 Sekunden Pause, wiederhole 2×",
    "Tast-Memory: Finde Paare durch Tasten mit verbundenen Augen (5 Minuten)",
    "Stolz-Timeline: Schreibe eine schnelle Timeline deiner Erfolge (5 Minuten)",
    "Logik-Partner: Löse ein Rätsel in Paaren (10 Minuten)",
    "Melodie-Exploration: Summe 2 Minuten, ändere Tempo",
    "Beruhigungsbild: Visualisiere eine sichere Stelle (2 Minuten)",
    "Gefühlsquadrat: Schreibe vier Facetten eines Gefühls auf (5 Minuten)",
    "Handwärme-Routine: Reibe Hände und setze sie 30s auf Herz",
    "Rückwärts-Coord: Laufe 12 Schritte rückwärts langsam und sicher",
    "Papierform: Schneide eine dekorative Form (7 Minuten)",
    "Gedanken-Notiz: Schreibe auf, welche Gedanken oft kommen (2 Minuten)",
    "Mut-Aufgabe: Erzähle in der Gruppe etwas Neues über dich",
    "Wolken-Collage: Zeichne drei Wolkenformen und nenne Gefühle",
    "Dankbarkeitsbrief: Schreibe einem Menschen eine kurze Dankeszeile",
    "Buch-Leseecke: Lies 5 Seiten und markiere eine hilfreiche Stelle",
    "Zitat-Übung: Finde ein Zitat, das dich stärkt und schreibe es ab",
    "Stimm-Atmung: Singe drei lange Töne mit vollständigem Atem (3 Minuten)",
    "Schulter-Reset: Dehne Schultern 30 Sekunden pro Seite",
    "Atmen & Pause: Bewusst 60 Sekunden Atmen ohne Ablenkung",
    "Becher-Challenge: Baue eine asymmetrische Architektur mit 10 Bechern",
    "Gefühls-Check-in: Nenne Gefühle und gib ihnen Farben (3 Minuten)",
    "Knet-Entspannung: Knete 1 Minute und beschreibe Spannung",
    "Sofort-Tun: Erledige eine kurz aufgenommene Aufgabe (2 Minuten)",
    "Aktives Zuhören-Übung: Wiederhole in eigenen Worten nach 2 Minuten",
    "Atemjournal: Notiere nach 10 Atemzügen wie du dich fühlst",
    "Sitz-Test: Teste 2 Minuten verschiedene Sitzhöhen",
    "Geh-Rhythmus: 4 Schritte ein, 4 aus für 4 Minuten",
    "Achtsame Kniebeugen: 10 Kniebeugen mit Atemfokus",
    "Farb-Atmung: Atme ein und stelle dir eine Farbe vor",
    "Mini-Gedankenstopp: Stoppe eine negative Gedankenkette bewusst"
  ],
  "07": [
    "Sinne schärfen: Schließe die Augen und nenne 5 Dinge, die du riechst (2 Minuten)",
    "Non-dominant-Kunst: Zeichne mit der anderen Hand 4 Minuten",
    "Achtsames Kauen: Zerkaue bewusst 10 Mal und beschreibe Textur",
    "Team-Story: Erzähle eine gemeinsame Geschichte reihum (Dauer 8 Minuten)",
    "Einbein-Herausforderung: Halte 40 Sekunden auf jedem Bein",
    "Kurze Entspannung: Progressive Übung für Hände und Arme (3 Minuten)",
    "Bauchatmung-Variation: Atme 7 tiefe Züge und zähle sie",
    "Impro-Flow: Tanze 6 Minuten ohne Musik, nur mit Impulsen",
    "Lernnotiz: Schreibe 1 neue Idee, die du heute probieren willst",
    "Kleine Dankesaktion: Hinterlasse eine Notiz für jemanden",
    "Körper-Inventory: Notiere 3 erfühlbare Empfindungen",
    "Fingerfertigkeit-Herausforderung: Knoten knüpfen in 7 Minuten",
    "Natur-Beobachtungsauftrag: Suche eine ungewöhnliche Pflanze (10 Minuten)",
    "Silent-Task: 2 Minuten ohne Worte in der Gruppe sitzen",
    "Emotionsspiel: Stelle eine Emotion pantomimisch dar",
    "Affirmationskarte: Schreibe eine Karte mit deinem Mantra",
    "Drei-Satz-Drama: Erfinde eine Mini-Szene mit Wendung",
    "Papier-Figur: Falte ein Tier (7 Minuten)",
    "Rhythmus-Impro: Klatsche einen wechselnden Rhythmus 4 Minuten",
    "Ball-Drill: Fange mit jeweils anderem Auge 15×",
    "Yoga-Basics: 5 Baum-Posen mit Fokus",
    "Problemlöseplan: Notiere 2 kreative Lösungsansätze",
    "Achtsam laufen: Gehe 5 Minuten und zähle Atemzüge",
    "Fokus-Blick: Fixiere 3 Minuten ein kleines Objekt",
    "Geruchs-Raten: Erkenne 3 Kräuter mit Augenbinde",
    "Selbstfürsorge-Check: Plane 15 Minuten Ruhezeit",
    "Spiegel-Spiel: Imitiere 2 Minuten Bewegungen eines Partners",
    "Imaginationsübungen: Zeichne deine Traumwiese",
    "Musik-Detail: Notiere 3 Rhythmusänderungen in einem Lied",
    "Schnelles Aufräumen: Räume 5 Minuten einen Regalfach",
    "Erinnerungsübung: Erzähle 5 Dinge vom letzten Wochenende"
  ],
  "08": [
    "Tiefenatmung: Box-Breathing 4-4-4-4 sechs Zyklen (3 Minuten)",
    "Intervall-Sprung: Hampelmänner 45 Sekunden, Pause 30 Sekunden, 3×",
    "Blindtast-Probe: Finde 4 Gegenstände nur mit Händen (5 Minuten)",
    "Stolz-Liste: Schreibe drei Erfolge der letzten Woche (5 Minuten)",
    "Logik-Puzzle im Team: Löse ein Rätsel gemeinsam (10 Minuten)",
    "Melodie-Übung: Summe und variiere Tonhöhe 2 Minuten",
    "Ruhebild: Visualisiere einen beruhigenden Ort (2 Minuten)",
    "Gefühlsfeld: Benenne 4 Gefühle und ordne sie nach Intensität",
    "Hand-Warmup: Reibe Hände und halte 30s am Gesicht",
    "Rückwärts-Übung: Sicher 20 Schritte rückwärts gehen",
    "Feinschnitt-Kunst: Ausschneiden einer komplizierten Form (7 Minuten)",
    "Gedankenprotokoll: Notiere wiederkehrende Gedanken (3 Minuten)",
    "Mut-Memo: Teile eine kleine Angst in der Gruppe",
    "Wolken-Suchspiel: Finde 3 unterschiedliche Formen",
    "Dankbarkeitsfoto: Fotografiere etwas, das dich heute berührt hat",
    "Leseimpuls: Markiere ein Zitat auf 5 Seiten",
    "Zitat-Besprechung: Diskutiere die Aussage eines Zitats (1 Minute)",
    "Lange Töne: Singe 3 Töne mit Atemunterstützung (3 Minuten)",
    "Schulter-Entspanner: Dehne Schultern 45 Sekunden",
    "Atmepause: 60 Sekunden bewusstes Atmen",
    "Becher-Architektur: Baue eine stabile Struktur mit 10 Bechern",
    "Gefühls-Map: Male eine Landkarte deiner Gefühle",
    "Knete-Fokus: Knete 2 Minuten und notiere Stresslevel",
    "Sofort-Handeln: Schließe eine kleine Aufgabe direkt ab (2 Minuten)",
    "Aufmerksames Zuhören: Wiederhole Gesehenes nach 2 Minuten",
    "Atem-Protokoll: Schreibe Empfindungen nach 10 Atemzügen",
    "Sitz-Check: Probiere 2 Minuten auf dem Boden und auf Stuhl",
    "Geh-Atem-Übung: 4 Schritte ein/4 Schritte aus für 4 Minuten",
    "Kniebeugen-Fokus: 15 langsame Kniebeugen mit Atem",
    "Sinne-Test: Liste 5 Dinge, die du heute bewusst gespürt hast",
    "Kreativ-Impulse: Erfinde ein Fantasietier und benenne es"
  ],
  "09": [
    "Kreativ: Zeichne ein Selbstporträt mit verbundenen Augen (4 Minuten)",
    "Achtsames Kauen: Beschreibe Textur und Laut beim Kauen einer Nuss (3 Minuten)",
    "Kooperations-Challenge: Erzählt abwechselnd je einen Satz und baut eine Geschichte (8 Minuten)",
    "Balance-Parcours: Gehe fünf verschiedene Linien mit unterschiedlicher Breite",
    "Mini-Progressive: Spanne und löse alle Gesichtsmuskeln (5 Minuten)",
    "Bauchatmung-Notiz: Zähle 7 tiefe Atemzüge und notiere Unterschiede",
    "Tanz-Experiment: Tanze nur mit Schultern 3 Minuten",
    "Lern-Reflex: Notiere einen Aha-Moment des Tages",
    "Dankes-Interview: Frag jemanden, wofür er dankbar ist und notiere (5 Minuten)",
    "Körper-Akzeptanz: Schreibe drei Dinge, die dein Körper gut kann",
    "Fingerkoordination: Spiele eine Fingerübung wie Klavier 5 Minuten",
    "Natur-Hypothese: Beobachte ein Blatt und rate, warum es so aussieht (10 Minuten)",
    "Stille-Übung: Sitze 3 Minuten und zähle ruhige Momente",
    "Szenen-Spiel: Erfinde eine Szene ohne Worte (4 Minuten)",
    "Affirmationskarte: Hänge eine Affirmation sichtbar auf",
    "Erzählaufgabe: Erzähle eine Mini-Geschichte mit einer Wendung",
    "Origami-Herausforderung: Falte ein Schiff (7 Minuten)",
    "Rhythmus-Memory: Klatsche ein Pattern und lasse andere wiederholen",
    "Wurfvariation: Wirf einen Ball in verschiedenem Tempo 15×",
    "Yoga-Balance: Halte Baum-Pose 30 Sekunden je Seite",
    "Lösungs-Schrittplan: Notiere 3 kleine Schritte für ein Problem",
    "Achtsamer Weg: Gehe 7 Minuten barfuß (oder mit Socken) drinnen",
    "Fokus-Training: Schau 3 Minuten auf einen Punkt und blinzle selten",
    "Geruchs-Notiz: Beschreibe 3 alltägliche Gerüche sehr genau",
    "Selbstfürsorge-Plan: Plane ein kleines Wohlfühlritual für heute",
    "Spiegelübung 2.0: Nenne dir selbst ein Kompliment laut",
    "Fantasieland: Male 3 Gebäude deines Fantasiedorfes",
    "Song-Analyse: Beschreibe Tempowechsel in einem Lied",
    "Schnelles Putzen: Räume 5 Minuten einen Platz blitzschnell auf",
    "Episoden-Erinnerung: Erzähle ein lustiges Ereignis vom letzten Monat"
  ],
  "10": [
    "Box-Breathing-Session: 4-4-4-4 für 4 Minuten mit Fokus auf Bauch",
    "Cardio-Puls: 60 Sekunden Hampelmänner, Pause 45 Sekunden, 2×",
    "Tast-Match: Platziere 5 Paar-Objekte und finde sie blind",
    "Stolz-Tagebuch: Schreibe drei Kleinerfolge der Woche (5 Minuten)",
    "Denksport im Duo: Löse ein Rätsel zusammen und tausche Strategien",
    "Summ-Variationen: Summe 3 Melodien und wechsle Lautstärke",
    "Imaginäres Bild: Stelle dir eine friedliche Szene vor (2 Minuten)",
    "Vier-Zeilen-Gedicht: Schreibe über Herbstsinne (4 Minuten)",
    "Hände-wärmen-Routine: Reibe Hände und halte 30 Sekunden am Gesicht",
    "Rückwärtskoordination: Sichere 20 Schritte rückwärts",
    "Papierkunst: Schneide ein Mandala (8 Minuten)",
    "Gedanken-Check: Notiere drei wiederkehrende Gedanken (2 Minuten)",
    "Mut-Aufruf: Teile eine kleine Hoffnung öffentlich",
    "Wolkenquiz: Wer sieht das ungewöhnlichste Tier in den Wolken?",
    "Dankbarkeits-Mikro: Schreibe einem Freund in 2 Minuten warum du ihn schätzt",
    "Lese-Highlight: Markiere eine inspirierende Stelle",
    "Zitat-reflex: Schreibe auf, was das Zitat mit dir macht",
    "Atem&Stimme: Summe drei Töne und achte auf Haltung",
    "Schulter-Flow: Dehne und kreise jeweils 30 Sekunden",
    "60-Sekunden-Reset: Atme bewusst 60 Sekunden",
    "Becher-Design: Baue ein Höhlensystem aus 10 Bechern",
    "Gefühls-Atlas: Male Gefühle als Landschaft",
    "Knet-Pause: Knete 2 Minuten und nenne Empfindungen",
    "Sofort-Do: Erledige eine kleine Aufgabe direkt (2 Minuten)",
    "Zuhör-Reflex: Fasse nach 2 Minuten Kernaussage zusammen",
    "Atemnotiz: Nach 10 Atemzügen beschreibe Spannung",
    "Sitz-Experiment: Teste Boden- vs. Stuhlsitzen 2 Minuten",
    "Gehrhythmus: 4 Schritte ein/4 aus für 6 Minuten",
    "Kniebeugen-Fokus: 12 langsame Wiederholungen mit Atem",
    "Sinne-Check: Notiere 5 Dinge, die du heute bewusst wahrgenommen hast",
    "Neues-Wort-Spiel: Erfinde ein Wort und erkläre Bedeutung"
  ],
  "11": [
    "Non-dominant-Detail: Male ein Alltagsobjekt mit der anderen Hand (5 Minuten)",
    "Achtsames Trinken: Nimm einen Schluck und beschreibe Temperatur (2 Minuten)",
    "Kooperations-Rätsel: Löse eine Aufgabe gemeinsam ohne Sprache (8 Minuten)",
    "Balance-Fein: Stehe auf einem Kissen 30 Sekunden pro Fuß",
    "Mini-Relaxtool: Progressive Entspannung für Hände und Kiefer (5 Minuten)",
    "Bauchatmendatei: Notiere nach 7 Atemzügen deine Gefühle",
    "Tanz ohne Musik: Führe 3 Minuten reine Impulsbewegung aus",
    "Reflexionsblatt: Schreibe, was dich heute motiviert hat",
    "Dankesphrase: Sende einem Lehrer/einer Lehrerin eine Dankesnachricht",
    "Körperfreundlich: Nenne drei Dinge, die dein Körper gut macht",
    "Finger-Fix: Suche kleine Dinge mit Fingerspitzen (5 Minuten)",
    "Pflanzenforschung: Mache ein Foto von einer Pflanze und beschreibe",
    "Ruhe-Insel: Sitze 2 Minuten mit geschlossenen Augen",
    "Emotionssketch: Zeichne eine Emotion als Form",
    "Affirmationskarte: Schreibe eine und hänge sie an deinen Platz",
    "Mini-Dialog: Schreibe einen kurzen inneren Dialog auf",
    "Origami-Herz: Falte eine Herzform",
    "Rhythmus-Export: Klatsche einen Rhythmus und schreibe ihn auf",
    "Wurfübungen: Variiere Wurfentfernungen 15×",
    "Yoga-Balance-Set: Drei Balancen halten je 20 Sekunden",
    "Lösungs-Map: Zeichne Schritte für ein Problem",
    "Natur-Rallye: Finde 5 unterschiedliche Blattformen",
    "Fokus-Aufgabe: Fixiere eine Kerze 2 Minuten",
    "Geruchs-Station: Errate 3 Düfte in einem Becher",
    "Selbstfürsorge-Karte: Schreibe 3 Sofortstrategien",
    "Spiegel-Feedback: Beobachte Gesichtsausdruck 30 Sekunden",
    "Imaginationsreise: Erzähle eine kurze Fantasiegeschichte",
    "Song-Fakten: Schreibe 3 Fakten über ein Lied",
    "Schnell-Aufräumen: Räume 5 Minuten eine Ecke",
    "Erinnerungs-Quiz: Nenne 5 Ereignisse aus letzter Woche"
  ],
  "12": [
    "Atemrhythmus: Atme 6 Mal ruhig ein und aus und notiere Gefühl (3 Minuten)",
    "Kurzer Cardio-Impuls: Hampelmänner 45 Sekunden, Pause 30 Sekunden, 3×",
    "Blindtast-Match: Finde 4 identische Objekte ausschließlich mit Händen (5 Minuten)",
    "Jahres-Stolz: Schreibe drei Dinge, auf die du dieses Jahr stolz bist (5 Minuten)",
    "Rätsel-Sprint: Löse in Teams ein kurzes Rätsel (10 Minuten)",
    "Melodie-Variation: Summe 2 Minuten und variiere die Endung",
    "Beruhigungs-Visual: Stelle dir eine warme Helligkeit vor (2 Minuten)",
    "4-Zeilen-Reflex: Schreibe ein kurzes Gedicht über Wintergefühle",
    "Handwarm-Up: Reibe Hände 30 Sekunden und atme tief",
    "Rückwärts-Sicherheit: Gehe 10 Schritte rückwärts sicher",
    "Feinschnitt-Finale: Schneide ein Wintermotiv aus Papier (8 Minuten)",
    "Gedankenübersicht: Notiere, welche Gedanken dich diese Woche begleiteten (3 Minuten)",
    "Mut-Moment teilen: Erzähle kurz eine Überwindung",
    "Wolken-Fantasie: Suche eine Form, die an das Jahr erinnert",
    "Dankbarkeitsbrief: Schreibe einen kurzen Dankesbrief (7 Minuten)",
    "Lese-Haul: Markiere ein inspirierendes Zitat aus 5 Seiten",
    "Zitat-Notiz: Schreibe, warum das Zitat zu dir passt",
    "Long-Tone: Singe drei lange Töne mit voller Atmung (3 Minuten)",
    "Schulter-Reset: Lockere Schultern 45 Sekunden",
    "Atmepause: 60 Sekunden bewusstes Atmen",
    "Becher-Fest: Baue ein kleines Kunstwerk mit 10 Bechern",
    "Gefühlslandkarte: Zeichne dein Jahr als Landkarte",
    "Knet-Reflex: Knete 2 Minuten und schreibe, was sich löste",
    "Sofort-Aufgabe: Erledige eine angefallene Kleinigkeit (2 Minuten)",
    "Aktives Zuhören: Höre 2 Minuten einer Geschichte und fasse zusammen",
    "Atemnotizen: Beschreibe Empfindungen nach 10 Atemzügen",
    "Sitz-Check: Vergleiche Sitzpositionen 2 Minuten",
    "Geh-Atem: 4 Schritte ein/4 Schritte aus für 5 Minuten",
    "Kniebeugen-Finale: 12 langsame Kniebeugen mit Atmung",
    "Sinnesbilanz: Liste 5 Dinge, die deine Sinne dieses Jahr erfreuten",
    "Ritual-Plan: Wähle ein kleines Jahresabschlussritual und notiere Zeit"
  ]
}

   
  

  /* --- 1) Wenn wir auf einer daily page sind: Aufgaben generieren & Fortschritt --- */
  if (document.body.classList.contains('daily-page')) {

    const monat = document.body.dataset.month;
    const monatAufgaben = aufgabenProMonat[monat];
    if (!monatAufgaben) return;

    const container = document.getElementById('tageAufgaben');
    const fortText = document.getElementById('fortschrittText');
    const barFill = document.getElementById('fortschrittFuellung');
    if (!container || !fortText || !barFill) return;

    const monthKey = monthKeyFromBody() || 'monatXX';

    // Erzeuge die Liste
    const checkboxes = [];
    monatAufgaben.forEach((aufgabe, i) => {
      const id = `${monthKey}_tag${i + 1}`;

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
      label.textContent = `Tag ${i + 1}: ${aufgabe}`;

      row.appendChild(cb);
      row.appendChild(label);
      container.appendChild(row);
      checkboxes.push(cb);
    });

    function updateProgress() {
      const done = checkboxes.filter(c => c.checked).length;
      const total = checkboxes.length;
      const p = Math.round((done / total) * 100);

      fortText.textContent = `${done} von ${total} erledigt`;
      barFill.style.width = p + '%';
      barFill.textContent = p + '%';
    }

    updateProgress();
  }

  /* --- 2) Optional: Bild-Slider (unverändert) --- */
  document.querySelectorAll('.image-slider').forEach(slider => {
    const imgs = slider.querySelectorAll('img');
    let i = 0;
    if (imgs.length < 2) return;

    setInterval(() => {
      imgs[i].classList.remove('active');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('active');
    }, 3500);
  });

});
