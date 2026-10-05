# angebot-studio.de

Statische Webseite für **Angebot Studio** – stellt die Anwendung vor (https://app.angebot-studio.de), listet Vorteile und Preise und führt zum Pilotzugang.

- Reines HTML/CSS/JS, kein Build-Schritt. Farben und Schriften wie in der App (Ziegel `#B5452F`, Graphit `#2F2F2F`, Kalk `#F4EFEA`; Geist und Caveat).
- Schriften liegen lokal in `fonts/` (keine Verbindung zu Google Fonts). Beide stehen unter der SIL Open Font License 1.1, siehe `fonts/LIZENZEN.md`.
- Keine Cookies, kein Tracking.
- Die Skizze im Kopfbereich ist dieselbe wie auf der Anmeldeseite der App (`src/app/(auth)/anfrage-skizze.tsx` im App-Repo), hier als statisches SVG.

## Lokal ansehen

```bash
python3 -m http.server 4321
```

Dann http://localhost:4321 öffnen.

## Veröffentlichung (GitHub Pages)

1. Repo auf GitHub: *Settings → Pages → Source: Deploy from a branch → `main` / `(root)`*.
2. Die Datei `CNAME` enthält `angebot-studio.de` – GitHub übernimmt sie als Custom Domain.
3. DNS bei Hostinger für `angebot-studio.de`:
   - `A`-Einträge für `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - optional `AAAA` für `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` für `www` → `artucci21.github.io`
   - Der bestehende Eintrag `app` (CNAME zu Railway) bleibt unverändert.
4. Sobald das Zertifikat ausgestellt ist: *Settings → Pages → Enforce HTTPS* aktivieren.

## Pflege

- Preise und Pakete stehen in `index.html` im Abschnitt `#preise` (Umschalter monatlich/jährlich über `data-monat` / `data-jahr`).
- Impressum und Datenschutz der Webseite: `impressum.html`, `datenschutz.html`. Die App hat eigene Rechtstexte unter app.angebot-studio.de.
