import { Fragment, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { events } from "../data/events.js";
import { PrimaryButton, GhostButton } from "./Ctas.jsx";

const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTH_NAMES = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function createCalendarMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const matrix = [];
  let current = 1 - startDay;
  for (let week = 0; week < 6; week++) {
    const row = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(year, month, current);
      row.push({
        date,
        inMonth: date.getMonth() === month,
        dateKey: date.toISOString().slice(0, 10),
      });
      current += 1;
    }
    matrix.push(row);
  }
  return matrix;
}

function formatDateLabel(date) {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function downloadICS(event) {
  const dtStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const dtStart = `${event.date.replace(/-/g, "")}T${event.start.replace(":", "")}`;
  const dtEnd = `${event.date.replace(/-/g, "")}T${event.end.replace(":", "")}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//La Seiche//Agenda//FR",
    "BEGIN:VEVENT",
    `UID:${event.id}@la-seiche`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    "LOCATION:Marché de la Seiche, Sévrier",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.id}.ics`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Agenda() {
  const monthRef = useMemo(() => {
    const first = events[0] ? new Date(events[0].date) : new Date();
    return { year: first.getFullYear(), month: first.getMonth() };
  }, []);

  const eventsByDate = useMemo(() => {
    return events.reduce((acc, evt) => {
      (acc[evt.date] = acc[evt.date] || []).push(evt);
      return acc;
    }, {});
  }, []);

  const upcomingEvents = useMemo(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    const future = events.filter((event) => event.date >= todayKey).sort((a, b) => a.date.localeCompare(b.date));
    return future.length > 0 ? future : [...events].sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  const [selectedDate, setSelectedDate] = useState(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    if (eventsByDate[todayKey]) return todayKey;
    const keys = Object.keys(eventsByDate).sort();
    return keys[0] ?? todayKey;
  });

  const matrix = useMemo(
    () => createCalendarMatrix(monthRef.year, monthRef.month),
    [monthRef]
  );

  const selectedEvents = eventsByDate[selectedDate] ?? [];
  const monthLabel = `${MONTH_NAMES[monthRef.month]} ${monthRef.year}`;
  const isShowingSelection = selectedEvents.length > 0;
  const displayEvents = isShowingSelection ? selectedEvents : upcomingEvents.slice(0, 3);
  const agendaLabel = isShowingSelection
    ? formatDateLabel(new Date(selectedDate))
    : "Prochaines soirées mises en avant";

  const handleCopyLink = async () => {
    const hash = `#agenda-${selectedDate}`;
    window.location.hash = hash;
    const full = `${window.location.origin}${window.location.pathname}${hash}`;
    try {
      await navigator.clipboard.writeText(full);
      alert("Lien copié dans le presse-papiers");
    } catch (error) {
      console.error("Clipboard error", error);
    }
  };

  const handleMailTonight = () => {
    const dateLabel = new Date(selectedDate).toLocaleDateString("fr-FR");
    window.location.href = `mailto:contact@lemarchedelaseiche.com?subject=Venir ce soir&body=Bonjour,%20nous%20souhaitons%20venir%20ce%20${dateLabel}.`;
  };

  return (
    <section id="agenda" className="relative bg-[var(--bg)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)]">Agenda live</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] after:mt-3 after:block after:h-[2px] after:w-10 after:bg-[var(--brown)] sm:text-4xl">
              Concerts, soirées dansantes, karaokés et spectacles à venir
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              La Seiche privilégie les artistes et collectifs de Haute-Savoie : rock’n’roll avec DJ Shrek,
              soirées Salsa/Bachata, bal country, stand-up Carton Comedy Club ou encore jam sessions du
              vendredi. Filtrez par date, téléchargez la fiche .ics et partagez le lien du soir en un clic.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={handleMailTonight}>Réserver ma soirée</PrimaryButton>
            <GhostButton onClick={handleCopyLink}>Partager la date</GhostButton>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="rounded-3xl bg-white/85 p-6 text-[var(--muted)] shadow-sm backdrop-blur sm:p-7">
            <div className="flex items-center justify-between text-sm font-semibold tracking-[-0.01em] text-[var(--ink)]">
              <span>{monthLabel}</span>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-medium uppercase tracking-[0.06em] text-[var(--muted)]">
              {DAY_NAMES.map((name) => (
                <div key={name}>{name}</div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm">
              {matrix.map((week, idx) => (
                <Fragment key={idx}>
                  {week.map((day) => {
                    const hasEvents = Boolean(eventsByDate[day.dateKey]);
                    const isSelected = day.dateKey === selectedDate;
                    return (
                      <button
                        key={day.dateKey}
                        type="button"
                        onClick={() => setSelectedDate(day.dateKey)}
                        className={`flex h-11 w-full items-center justify-center rounded-lg border text-sm transition ${
                          isSelected
                            ? "border-[var(--brown)] bg-[var(--brown)] text-[#0B0B0B]"
                            : day.inMonth
                            ? "border-[var(--border)] bg-[var(--sand)] text-[var(--ink)] hover:border-[var(--brown)]"
                            : "border-[var(--border)] bg-white text-[var(--muted)]/70"
                        }`}
                      >
                        {day.date.getDate()}
                        {hasEvents ? (
                          <span className="ml-1 text-[10px] text-[var(--brown)]">•</span>
                        ) : null}
                      </button>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--muted)]">
                {agendaLabel}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--ink)] after:mt-2 after:block after:h-[2px] after:w-10 after:bg-[var(--brown)]">
                {isShowingSelection ? "Programmation" : "À venir"}
              </h3>
              {!isShowingSelection ? (
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                  Choisissez une date dans le calendrier pour afficher le détail complet ou parcourez les
                  trois prochaines soirées ci-dessous.
                </p>
              ) : null}
            </div>

            <div className="space-y-4">
              {displayEvents.map((event) => (
                <motion.article
                  key={event.id}
                  id={`agenda-${event.date}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-0 overflow-hidden rounded-3xl bg-white/90 shadow-sm backdrop-blur md:flex-row"
                >
                  <div className="h-48 w-full bg-black/40 md:h-auto md:w-64">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--muted)]">
                        {event.type}
                      </p>
                      <h4 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-[var(--ink)]">
                        {event.title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                      <span className="font-medium text-[var(--ink)]">
                        {event.start} → {event.end}
                      </span>
                      <span>{event.freeEntry ? "Entrée libre" : "Réservation conseillée"}</span>
                      <button
                        type="button"
                        onClick={() => downloadICS(event)}
                        className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--brown)] transition hover:border-[var(--brown)] hover:text-[var(--brown)] focus:outline-none focus:ring-2 focus:ring-[var(--brown)] focus:ring-opacity-40 focus:ring-offset-2 focus:ring-offset-white"
                      >
                        Ajouter au calendrier
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
