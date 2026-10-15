import { MapPin, Star, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import type { DemoTrainer, Trainer } from "@/data/trainerMockData";
import "./public-header.css";
import { PublicOfferTabs } from "./PublicOfferTabs";
import type { PublicBookingSelection } from "@/data/trainerMockData";

export type PublicProfileTab = "about" | "packages" | "classes" | "experience" | "education" | "reviews" | "availability";

interface PublicHeaderProps {
  trainer: Trainer;
  demoTrainer?: DemoTrainer;
  activeTab: PublicProfileTab;
  onTabChange: (tab: PublicProfileTab) => void;
  onBookSession: () => void;
  onMessageClick: () => void;
  onOfferBook: (selection: PublicBookingSelection) => void;
  primaryGym?: { name: string; verified?: boolean };
}

export function PublicHeader({ trainer, demoTrainer, activeTab, onTabChange, onBookSession, onMessageClick, onOfferBook, primaryGym }: PublicHeaderProps) {
  const { t } = useLanguage();
  const record = demoTrainer ?? trainer;
  const gym = demoTrainer ? demoTrainer.primaryGym : primaryGym;
  const years = demoTrainer?.yearsExperience;
  const percent = (value?: string) => value == null ? "—" : `${value.replace(/%/g, "")}%`;
  const stats = [
    { value: demoTrainer?.stats.clientsHelped ?? "—", key: "clients" },
    { value: percent(demoTrainer?.stats.goalsHit), key: "goals" },
    { value: percent(demoTrainer?.stats.avgProgress), key: "progress" },
    { value: record.specialties.length, key: "specialties" },
  ];
  const tabs: PublicProfileTab[] = ["about", ...(demoTrainer?.packages?.length ? ["packages" as const] : []), ...(demoTrainer?.classes?.length ? ["classes" as const] : []), "experience", "education", "reviews", "availability"];
  const rate = `€${record.hourlyRate} ${t("publicProfile.perHour")}`;
  return (
    <div className="public-profile">
      <section className="public-profile-band trainer-brand bg-brand-canvas relative overflow-hidden">
        <div className="public-profile-glow" aria-hidden="true" />
        <div className="public-profile-inner">
          <div className="public-profile-cover font-brand-mono">mypersonal.fit/t/<span className="text-brand-highlight">{record.slug ?? record.id}</span></div>
          <div className="public-profile-header">
            <img className="public-profile-photo" src={record.profileImage} alt={record.name} />
            <div className="public-profile-identity">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="trainer-headline public-profile-name">{record.name}</h1>
                <div className="flex flex-wrap gap-2">
                  {demoTrainer?.credentials.map(credential => <span key={credential} className={`public-profile-credential font-brand-mono ${credential}`}>{t(`cred.${credential}`)}</span>)}
                </div>
              </div>
              <p className="public-profile-title">{record.title}</p>
              <div className="public-profile-meta">
                <span className="inline-flex items-center gap-1"><MapPin size={14} />{record.location}</span>
                {years != null && <><span>·</span><span><strong>{years} {t("publicProfile.years")}</strong> {t("publicProfile.ofExperience")}</span></>}
                <span>·</span>
                <span className="inline-flex items-center gap-1"><span className="flex text-brand-highlight" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} fill="currentColor" />)}</span><strong>{record.rating.toFixed(1)}</strong> ({record.reviews} {t("market.reviews")})</span>
              </div>
              <div className="public-profile-gym">
                {gym && <><span>{t("publicProfile.trainsAt")} <strong>{gym.name}</strong></span>{gym.verified && <span className="public-profile-credential verified font-brand-mono">{t("publicProfile.gymVerified")}</span>}</>}
                <span className="public-profile-rate font-brand-mono">{rate}</span>
              </div>
            </div>
            <div className="public-profile-actions">
              <Button className="public-profile-book" onClick={onBookSession}>{t("publicProfile.book")}</Button>
              <Button variant="outline" className="public-profile-message" onClick={onMessageClick}>{t("publicProfile.message")}</Button>
            </div>
          </div>
          <div className="public-profile-stats">
            {stats.map(stat => <div className="public-profile-stat" key={stat.key}>
              <div className="public-profile-stat-value font-brand-mono">{stat.value}</div>
              <div className="public-profile-stat-label font-brand-mono">{t(`publicProfile.stat.${stat.key}`)}</div>
              <p className="public-profile-stat-source">{t(`publicProfile.source.${stat.key}`)}</p>
            </div>)}
          </div>
          <div className="public-profile-specialties">
            <div className="public-profile-small-label font-brand-mono">{t("publicProfile.stat.specialties")}</div>
            <div className="flex flex-wrap gap-2">{record.specialties.map(specialty => <span className="public-profile-specialty" key={specialty}>{specialty}</span>)}</div>
          </div>
          <div className="public-profile-tabs scrollbar-hide" role="tablist" aria-label={t("publicProfile.sections")}>
            {tabs.map(tab => <Button role="tab" aria-selected={activeTab === tab} key={tab} variant="ghost" className="public-profile-tab" onClick={() => onTabChange(tab)}>{t(`publicProfile.tab.${tab}`)}</Button>)}
          </div>
        </div>
      </section>
      <section className="public-profile-about-section">
        <div className="public-profile-inner">
          {demoTrainer && (activeTab === "packages" || activeTab === "classes") ? <PublicOfferTabs trainer={demoTrainer} tab={activeTab} onBook={onOfferBook} /> : <>
          <article className="public-profile-about">
            <h2 className="trainer-headline public-profile-about-heading"><UserRound size={21} className="shrink-0" />{t("publicProfile.aboutHeading").replace("{name}", record.name)}</h2>
            <p className="public-profile-bio">{record.bio}</p>
            <div className="public-profile-details">
              <div className="public-profile-detail"><div className="public-profile-detail-label font-brand-mono">{t("publicProfile.languages")}</div><div className="flex flex-wrap gap-2">{demoTrainer?.languages.map(language => <span className="public-profile-language" key={language}>{language}</span>)}</div></div>
              <div className="public-profile-detail"><div className="public-profile-detail-label font-brand-mono">{t("publicProfile.trainsAt")}</div>{gym ? <div className="flex flex-wrap items-center gap-2">{gym.name}{gym.verified && <span className="public-profile-verified-gym">{t("cred.verified")}</span>}</div> : t("publicProfile.independent")}</div>
              <div className="public-profile-detail"><div className="public-profile-detail-label font-brand-mono">{t("publicProfile.sessionRate")}</div><strong>{rate}</strong><p className="public-profile-note">{t("publicProfile.bookingNote")}</p></div>
              <div className="public-profile-detail"><div className="public-profile-detail-label font-brand-mono">{t("publicProfile.tab.experience")}</div><strong>{years == null ? "—" : `${years} ${t("publicProfile.years")}`}</strong><p className="public-profile-note">{t("publicProfile.positionsNote").replace("{n}", String(record.experience.length))}</p></div>
            </div>
          </article>
          </>}
        </div>
      </section>
    </div>
  );
}