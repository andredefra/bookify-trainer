import { Award, BriefcaseBusiness, CalendarDays, GraduationCap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import type { DemoTrainer, Trainer } from "@/data/trainerMockData";
import { safeFormatDate } from "@/utils/safeFormatDate";

export type PublicDetailTab = "experience" | "education" | "reviews" | "availability";
interface Props { trainer: Trainer; demoTrainer?: DemoTrainer; tab: PublicDetailTab; onBook: () => void }

export function PublicDetailTabs({ trainer, demoTrainer, tab, onBook }: Props) {
  const { t } = useLanguage();
  const headings = { experience: "publicProfile.experienceHeading", education: "publicProfile.educationHeading", reviews: "publicProfile.tab.reviews", availability: "publicProfile.tab.availability" };
  const Icon = { experience: BriefcaseBusiness, education: GraduationCap, reviews: Star, availability: CalendarDays }[tab];
  const label = (key: string) => <h3 className="public-profile-sublabel font-brand-mono">{t(key)}</h3>;
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return <article className="public-profile-about" role="tabpanel" aria-label={t(`publicProfile.tab.${tab}`)}>
    <h2 className="trainer-headline public-profile-about-heading"><Icon size={21} className="shrink-0" />{t(headings[tab])}</h2>
    {tab === "experience" && <div className="public-profile-positions">
      {(demoTrainer?.experience ?? trainer.experience.map(item => ({ role: item.title, org: item.company, from: item.period, to: "", description: item.description }))).map((item, index) => <div className="public-profile-position" key={`${item.role}-${index}`}>
        <h3>{item.role}</h3><p className="public-profile-position-org">{item.org}</p>
        <p className="public-profile-position-years font-brand-mono">{item.from}{item.to && ` — ${item.to === "present" ? t("publicProfile.today") : item.to}`}</p>
        <p className="public-profile-position-description">{item.description}</p>
      </div>)}
    </div>}
    {tab === "education" && <>
      {label("publicProfile.tab.education")}
      <div className="public-profile-education-list">{demoTrainer ? demoTrainer.education.map((item, index) => <div key={index}><h4>{item.title}</h4><p>{item.org} · {item.years}</p></div>) : <p>{trainer.education}</p>}</div>
      <hr className="public-profile-light-divider" />
      {label("publicProfile.certifications")}
      <div className="public-profile-certifications">{(demoTrainer?.certifications ?? trainer.certifications.map(title => ({ title, org: "", expiry: null }))).map((item, index) => <div className="public-profile-certification" key={index}>
        <Award size={17} aria-hidden="true" /><div><h4>{item.title}</h4><p className="font-brand-mono">{item.org}{item.org && " · "}{item.expiry ? t("publicProfile.validUntil").replace("{date}", safeFormatDate(item.expiry, "dd/MM/yyyy")) : t("publicProfile.noExpiry")}</p></div>
      </div>)}</div>
    </>}
    {tab === "reviews" && <>
      <p className="public-profile-reviews-note">{t("publicProfile.reviewsNote")}</p>
      <div className="public-profile-reviews">{demoTrainer?.publicReviews.map((review, index) => {
        const parts = review.name.trim().split(/\s+/);
        const name = parts.length > 1 ? `${parts[0]} ${parts[1].charAt(0)}.` : parts[0];
        return <div className="public-profile-review" key={index}>
          <div className="public-profile-review-header"><div className="public-profile-avatar font-brand-mono">{name.charAt(0)}</div><div><h3>{name}</h3><div className="public-profile-review-meta"><span className="public-profile-review-stars" aria-label={`${review.rating} / 5`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} fill={i < Math.round(review.rating) ? "currentColor" : "none"} />)}</span><time dateTime={review.date}>{safeFormatDate(review.date, "dd/MM/yyyy")}</time></div></div></div>
          <p className="public-profile-review-text">{review.text}</p>
          {review.reply && <div className="public-profile-reply"><h4 className="font-brand-mono">{t("publicProfile.replyBy").replace("{name}", trainer.name)}</h4><p>{review.reply}</p></div>}
        </div>;
      })}</div>
    </>}
    {tab === "availability" && <>
      {label("publicProfile.weeklyHours")}
      <div className="public-profile-weekly">{days.map((day, index) => {
        const slot = demoTrainer?.schedule.weekly[index];
        const legacyHours = trainer.availability[day] ?? [];
        const closed = slot ? slot.closed : legacyHours.length === 0;
        return <div className={`public-profile-weekday${closed ? " is-closed" : ""}`} key={day}><strong>{t(`publicProfile.day.${day}`)}</strong><div>{slot ? slot.closed ? t("publicProfile.unavailable") : <>{slot.start} — {slot.end}{slot.break && <span className="public-profile-break"> ({t("publicProfile.break")} {slot.break.start}–{slot.break.end})</span>}</> : closed ? t("publicProfile.unavailable") : legacyHours.join(" · ")}</div></div>;
      })}</div>
      {demoTrainer && <>
        <div className="public-profile-session-pills"><span>{t("publicProfile.sessionDuration").replace("{n}", String(demoTrainer.schedule.sessionMinutes))}</span><span>{t("publicProfile.sessionGap").replace("{n}", String(demoTrainer.schedule.gapMinutes))}</span></div>
        <hr className="public-profile-light-divider" />{label("publicProfile.nextSevenDays")}
        <div className="public-profile-upcoming">{demoTrainer.schedule.upcoming.map(item => {
          const date = new Date(`${item.date}T12:00:00`);
          const index = (date.getDay() + 6) % 7;
          const closed = demoTrainer.schedule.weekly[index].closed;
          return <div className={`public-profile-upcoming-day${closed ? " is-closed" : ""}`} key={item.date}>
            <span className="font-brand-mono">{t(`publicProfile.day.${days[index]}`).slice(0, 3)}</span><strong className="font-brand-mono">{safeFormatDate(item.date, "d")}</strong><p className={item.booked > 0 && !closed ? "has-bookings" : ""}>{closed ? t("publicProfile.closed") : item.booked > 0 ? t("publicProfile.bookedCount").replace("{n}", String(item.booked)) : t("publicProfile.free")}</p>
          </div>;
        })}</div>
      </>}
      <Button className="public-profile-availability-book" onClick={onBook}>{t("publicProfile.book")}</Button>
    </>}
  </article>;
}