# Was macht diese App? (Erklärung ohne Technik-Vorwissen)

Diese Datei erklärt in einfachen Worten, was CasAuto ist und wie die einzelnen Teile zusammenspielen — ohne Programmierkenntnisse vorauszusetzen. Wer technische Details sucht, findet sie in der [README.md](README.md).

> **Wichtig:** Diese Datei muss bei jeder Änderung, die beschreibt, *was* die App tut (neue Funktion, andere Aufteilung, neuer Hosting-Ort), mit aktualisiert werden — siehe die entsprechende Checkliste in [CONTRIBUTING.md](CONTRIBUTING.md).

## Worum geht's?

CasAuto ist eine Website für ein Autohaus. Besucher können sich Fahrzeuge ansehen und eine Probefahrt anfragen, das Autohaus-Personal kann im Hintergrund die Fahrzeuge und Anfragen verwalten.

## Die drei Bausteine

Man kann sich die App wie ein Restaurant vorstellen:

- **Das Frontend** ist der Gastraum — das, was Besucher sehen und bedienen.
- **Das Backend** ist die Küche — es nimmt Bestellungen (Anfragen) entgegen, verarbeitet sie und schickt eine Antwort zurück.
- **Die Datenbank** ist die Speisekammer — dort liegt dauerhaft alles gespeichert (Fahrzeuge, Termine, Nutzerkonten).

### 1. Frontend — das, was man im Browser sieht

Gebaut mit React (einer Technik für interaktive Websites). Enthält:

- **Startseite** mit Vorstellung des Autohauses und Kundenbewertungen
- **Fahrzeugkatalog** — alle Fahrzeuge, mit Filtern nach Marke, Kategorie, Kraftstoffart, Preis und Baujahr
- **Fahrzeug-Detailseite** — Infos zu einem einzelnen Fahrzeug, inkl. Formular für eine Probefahrt-Anfrage
- **Kontakt-, Über-uns- und Karriere-Seiten**
- **Newsletter-Anmeldung**
- **Login/Registrierung** für Kunden
- **Admin-Bereich** (nur fürs Autohaus-Personal, mit Passwort geschützt) — hier können Fahrzeuge hinzugefügt, bearbeitet, gelöscht und eingegangene Probefahrt-Termine eingesehen werden

### 2. Backend — die Logik im Hintergrund

Gebaut mit NestJS. Läuft nicht im Browser, sondern auf einem Server, und macht Dinge, die das Frontend nicht selbst machen darf oder kann:

- Prüft bei Login, ob Passwort und Nutzername stimmen
- Nimmt neue Fahrzeuge, Änderungen und Probefahrt-Anfragen entgegen und legt sie in der Datenbank ab
- Sorgt dafür, dass nur eingeloggte Admins Fahrzeuge verändern oder löschen können
- Passwörter werden nie im Klartext gespeichert, sondern verschlüsselt (gehasht)

### 3. Datenbank — der dauerhafte Speicher

Eine MySQL-Datenbank speichert:

- Alle Fahrzeuge (Marke, Modell, Preis, Baujahr, Status, …)
- Alle Probefahrt-Termine
- Nutzerkonten (Admins/Kunden)
- Newsletter-Anmeldungen

Ohne Datenbank wäre nach jedem Neustart der App alles wieder weg.

## Wo läuft das Ganze? (Hosting)

- **Frontend:** läuft dauerhaft und kostenlos auf **Vercel** — erreichbar unter https://cas-auto-real-web.vercel.app/
- **Backend + Datenbank:** laufen aktuell auf **Railway** (befristetes Test-Kontingent)
- **AWS (Terraform):** parallel bauen wir dieselbe Architektur (Backend + Datenbank + Speicherplatz fürs Frontend) selbst auf AWS nach — das ist eine Kursaufgabe, mit der wir zeigen, dass wir Server-Infrastruktur eigenständig aufsetzen können. Diese AWS-Version ist (Stand jetzt) kein Dauerbetrieb, sondern ein Nachweis für die Abgabe. Die "echte", dauerhaft erreichbare App bleibt auf Vercel + Railway.

## Kleines Glossar

| Begriff | Bedeutung |
|---|---|
| Frontend | Der sichtbare, bedienbare Teil im Browser |
| Backend | Der unsichtbare Teil, der im Hintergrund Anfragen bearbeitet |
| Datenbank | Dauerhafter Speicher für alle Daten |
| API | Die "Sprache", mit der Frontend und Backend miteinander reden |
| Deployment | Eine neue Version der App online bringen |
| Hosting | Der Ort/Anbieter, auf dem die App tatsächlich läuft |
