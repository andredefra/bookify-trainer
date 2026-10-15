import { Check, ShoppingBag, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import type { DemoTrainer, PublicBookingSelection } from "@/data/trainerMockData";

interface PublicOfferTabsProps {
  trainer: DemoTrainer;
  tab: "packages" | "classes";
  onBook: (selection: PublicBookingSelection) => void;
}

export function PublicOfferTabs({ trainer, tab, onBook }: PublicOfferTabsProps) {
  const { t } = useLanguage();
  if (tab === "packages") {
    if (!trainer.packages?.length) return null;
    return <article className="public-profile-about" role="tabpanel" aria-label={t("publicProfile.tab.packages")}>
      <h2 className="trainer-headline public-profile-about-heading"><ShoppingBag size={21} />{t("publicProfile.tab.packages")}</h2>
      <div className="public-profile-packages">
        {trainer.packages.map(pkg => <div key={pkg.name} className={`public-profile-package${pkg.featured ? " is-featured" : ""}`}>
          {pkg.featured && <span className="public-profile-featured font-brand-mono">{t("publicProfile.featured")}</span>}
          <h3>{pkg.name}</h3>
          <p className="public-profile-package-subtitle">{pkg.subtitle}</p>
          <div className="public-profile-package-price font-brand-mono">€{pkg.price}</div>
          <p className="public-profile-package-unit font-brand-mono">{pkg.unit}</p>
          <ul>{pkg.includes.map(line => <li key={line}><Check size={15} aria-hidden="true" />{line}</li>)}</ul>
          <Button className="public-profile-offer-action" onClick={() => onBook({ name: pkg.name })}>{t("publicProfile.buy")}</Button>
        </div>)}
      </div>
      <p className="public-profile-offer-note">{t("publicProfile.packagesNote")}</p>
    </article>;
  }
  if (!trainer.classes?.length) return null;
  return <article className="public-profile-about" role="tabpanel" aria-label={t("publicProfile.tab.classes")}>
    <h2 className="trainer-headline public-profile-about-heading"><UsersRound size={21} />{t("publicProfile.classesHeading")}</h2>
    <div className="public-profile-classes">
      {trainer.classes.map(item => {
        const seats = Math.max(0, item.capacity - item.booked);
        const state = seats === 0 ? "full" : seats === 1 ? "last" : "free";
        const label = seats > 1 ? t("publicProfile.seatsFree").replace("{n}", String(seats)) : t(seats === 1 ? "publicProfile.seatsLast" : "publicProfile.seatsFull");
        return <div className="public-profile-class" key={`${item.weekday}-${item.day}-${item.name}`}>
          <div className="public-profile-class-date font-brand-mono"><span>{item.weekday}</span><strong>{item.day}</strong></div>
          <div className="public-profile-class-info"><h3>{item.name} · {item.venue}</h3><p>{item.time} · {item.level}</p></div>
          <span className={`public-profile-seats font-brand-mono ${state}`}>{label}</span>
          <Button className={`public-profile-offer-action class-action ${state}`} onClick={() => onBook({ name: item.name, dateLabel: `${item.weekday} ${item.day}`, time: item.time })}>{t(seats === 0 ? "publicProfile.waitlist" : "publicProfile.reserve")}</Button>
        </div>;
      })}
    </div>
    <p className="public-profile-offer-note">{t("publicProfile.classesNote")}</p>
  </article>;
}