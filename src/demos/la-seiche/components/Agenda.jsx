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
  "Décembre"
];

function createCalendarMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7; // convert Sunday=6
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
  // Génère un fichier ICS simple pour l'évènement
  const dtStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const dtStart = `${event.date.replace(/-/g, "")}T${event.start.replace(":", "")}`;
  const dtEnd = `${event.date.replace(/-/g, "")}T${event.end.replace(":", "")}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//La Seiche//Agenda//FR",
    "BEGIN:VEVENT",
    `UID:${event.id}@la-seiche` ,
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
  const handleCopyLink = async () => {
    const hash = `#agenda-${selectedDate}`;
    window.location.hash = hash;
    const full = `${window.location.origin}${window.location.pathname}${hash}`;
    try {
      await navigator.clipboard.writeText(full);
      alert("Lien copié dans le presse-papier");
    } catch (error) {
      console.error("Clipboard error", error);
    }
  };

  const handleMailTonight = () => {
    const dateLabel = new Date(selectedDate).toLocaleDateString("fr-FR");
    window.location.href = `mailto:contact@lemarchedelaseiche.com?subject=Venir ce soir&body=Bonjour,%20je%20souhaite%20venir%20ce%20soir%20(${dateLabel}).%20Nous%20serons%20...`;
  };

  return (
    <section id="agenda" className="bg-[#FAFAFA] px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-10 lg:flex-row"
        >
          <div className="w-full rounded-2xl border border-black/5 bg-white p-6 shadow-sm lg:max-w-sm">
            <div className="flex items-center justify-between text-sm font-semibold text-[#0F1730]">
              <span>{monthLabel}</span>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-medium text-[#0F1730]/70">
              {DAY_NAMES.map((name) => (
                <div key={name}>{name}</div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2 text-center text-sm">
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
                        className={`relative flex h-10 w-full items-center justify-center rounded-xl border transition ${
                          isSelected
                            ? "border-[#0E7490] bg-[#0E7490]/10 text-[#0F1730]"
                            : day.inMonth
                            ? "border-transparent text-[#0F1730] hover:border-[#0E7490]/40"
                            : "border-transparent text-[#0F1730]/30"
                        }`}
                      >
                        {day.date.getDate()}
                        {hasEvents ? (
                          <span className="absolute bottom-1 h-[6px] w-[6px] rounded-full bg-[#0E7490]" />
                        ) : null}
                      </button>
                    );
                  })}
                </Fragment>
              ))}
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <PrimaryButton onClick={handleMailTonight} className="w-full">
                Venir ce soir
              </PrimaryButton>
              <GhostButton onClick={handleCopyLink} className="w-full">
                Copier le lien du jour
              </GhostButton>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="rounded-2xl border border-black/5 bg-white px-6 py-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-[#0E7490]">
                {formatDateLabel(new Date(selectedDate))}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#0F1730]">Programmation</h3>
            </div>

            <div className="space-y-4">
              {selectedEvents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#0E7490]/30 bg-white px-6 py-10 text-center text-sm text-[#0F1730]/60">
                  Pas d’évènement ce jour
                </div>
              ) : (
                selectedEvents.map((event) => (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="card overflow-hidden hover-lift"
                  >
                    <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="space-y-4 px-6 py-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#0E7490]/10 px-3 py-1 text-xs font-medium text-[#0E7490]">
                            {event.type}
                          </span>
                          {event.freeEntry ? (
                            <span className="rounded-full bg-[#0F1730] px-3 py-1 text-xs font-medium text-white">
                              Entrée libre
                            </span>
                          ) : null}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-[#0F1730]">{event.title}</h4>
                          <p className="mt-1 text-sm text-[#0F1730]/70">
                            {event.start} – {event.end}
                          </p>
                          <p className="mt-3 text-sm text-[#0F1730]/70">{event.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <PrimaryButton onClick={() => downloadICS(event)}>
                            Ajouter à mon calendrier
                          </PrimaryButton>
                          <GhostButton onClick={() => handleMailEvent(event)}>
                            Je participe
                          </GhostButton>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function handleMailEvent(event) {
  // Mailto prérempli pour confirmer la participation
  const body = encodeURIComponent(
    `Bonjour,\n\nJe souhaite participer à l'évènement "${event.title}" le ${new Date(event.date).toLocaleDateString("fr-FR")} de ${event.start} à ${event.end}.\nNous serons ... personnes.\n\nMerci !`
  );
  window.location.href = `mailto:contact@lemarchedelaseiche.com?subject=Participation ${event.title}&body=${body}`;
}
