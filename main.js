// Angebot Studio – kleine Helfer für die Webseite. Ohne JavaScript bleibt alles sichtbar und bedienbar.
(() => {
  // Kopfzeile bekommt beim Scrollen eine Trennlinie.
  const kopf = document.getElementById("kopf");
  if (kopf) {
    const beimScrollen = () =>
      kopf.classList.toggle("ist-gescrollt", window.scrollY > 8);
    beimScrollen();
    window.addEventListener("scroll", beimScrollen, { passive: true });
  }

  // Mobiles Menü (nur auf der Startseite)
  const menueKnopf = document.getElementById("menue-knopf");
  const menue = document.getElementById("menue");
  if (menueKnopf && menue) menueEinrichten();

  function menueEinrichten() {
    const menueSchliessen = () => {
      menue.classList.remove("ist-offen");
      menueKnopf.setAttribute("aria-expanded", "false");
      menueKnopf.querySelector(".sr-only").textContent = "Menü öffnen";
    };
    menueKnopf.addEventListener("click", () => {
      const offen = menue.classList.toggle("ist-offen");
      menueKnopf.setAttribute("aria-expanded", String(offen));
      menueKnopf.querySelector(".sr-only").textContent = offen
        ? "Menü schließen"
        : "Menü öffnen";
    });
    menue
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", menueSchliessen));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menue.classList.contains("ist-offen")) {
        menueSchliessen();
        menueKnopf.focus();
      }
    });
  }

  // Elemente beim Scrollen einblenden; der Notizzettel streicht seine Punkte durch.
  const ziele = document.querySelectorAll("[data-einblenden], [data-strich]");
  if ("IntersectionObserver" in window) {
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("ist-sichtbar");
          beobachter.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    ziele.forEach((el) => beobachter.observe(el));
  } else {
    ziele.forEach((el) => el.classList.add("ist-sichtbar"));
  }

  // Preise: monatlich / jährlich
  const schalter = document.querySelectorAll("[data-zeitraum]");
  const preisFelder = document.querySelectorAll("[data-monat][data-jahr]");
  schalter.forEach((knopf) =>
    knopf.addEventListener("click", () => {
      const zeitraum = knopf.dataset.zeitraum;
      schalter.forEach((k) =>
        k.setAttribute("aria-pressed", String(k === knopf)),
      );
      preisFelder.forEach((feld) => {
        feld.textContent = feld.dataset[zeitraum];
      });
    }),
  );

  const jahr = document.getElementById("jahr");
  if (jahr) jahr.textContent = String(new Date().getFullYear());
})();
