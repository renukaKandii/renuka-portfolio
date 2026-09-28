import { useEffect, useState } from 'react';
import { meetingTypes, scheduling } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

/**
 * Schedule a Call.
 *
 * Two states, driven by per-meeting URLs in src/data/portfolio.ts:
 *  1. No booking URL yet (default): polished placeholder cards with
 *     timezone detection. Nothing fake — no invented availability.
 *  2. URL configured: each "Book" button opens the real Calendly page
 *     for that meeting length in a new tab.
 */
export default function ScheduleCall() {
  const ref = useReveal();
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      setTimezone('');
    }
  }, []);

  const urlFor = (urlKey: 'introUrl' | 'technicalUrl') => {
    const perMeeting = scheduling[urlKey]?.trim();
    if (scheduling.provider !== null && perMeeting) return perMeeting;
    if (scheduling.provider !== null && scheduling.url.trim() !== '') return scheduling.url;
    return '';
  };

  return (
    <section className="block" id="schedule" aria-label="Schedule a call">
      <div className="wrap">
        <div ref={ref} className="reveal">
          <p className="dossier-label">Dossier 07 · Office hours</p>
          <h2 className="section-title">Find a time to connect.</h2>
          <p className="section-lede">
            A quick introduction or a deeper conversation about AI, software engineering and
            potential collaborations.
          </p>
        </div>

        <div className="schedule-grid">
          {meetingTypes.map((m) => {
            const url = urlFor(m.urlKey);
            return (
              <div key={m.id} className="meeting-card reveal" ref={useReveal<HTMLDivElement>()}>
                <span className="duration">{m.duration}</span>
                <h3>{m.name}</h3>
                <p>{m.description}</p>
                {url ? (
                  <a
                    className="btn"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Book ${m.name} (${m.duration}) — opens booking page in a new tab`}
                  >
                    Book this call <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    disabled
                    aria-disabled="true"
                    title="Booking opens once my scheduling links are connected"
                  >
                    Booking opens soon
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {timezone && (
          <p className="tz-note">
            <span className="dot" aria-hidden="true" />
            Your timezone: {timezone} — shown automatically so we never do timezone math wrong.
          </p>
        )}

        {meetingTypes.every((m) => !urlFor(m.urlKey)) && (
          <div className="booking-pending" role="note" aria-label="How to connect booking">
            <strong>Booking isn’t wired up yet.</strong> I haven’t connected my Calendly links —
            and this page refuses to fake availability. To enable it, I set{' '}
            <code>scheduling.provider</code>, <code>scheduling.introUrl</code> (15-min) and{' '}
            <code>scheduling.technicalUrl</code> (30-min) in{' '}
            <code>src/data/portfolio.ts</code>, redeploy, and these cards become live booking
            buttons. Meanwhile, email works great: my contact section is one scroll down.
          </div>
        )}
      </div>
    </section>
  );
}
