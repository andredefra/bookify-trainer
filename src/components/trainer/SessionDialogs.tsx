
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RegisterForm, registerSchema } from "@/components/trainer/RegisterForm";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import type { PublicBookingSelection } from "@/data/trainerMockData";
import { useLanguage } from "@/context/LanguageContext";

interface SessionDialogsProps {
  trainerName: string;
  showRegister: boolean;
  showBookingForm: boolean;
  onRegisterSubmit: (data: z.infer<typeof registerSchema>) => void;
  onBookingSubmit: (data: z.infer<typeof bookingSchema>) => void;
  onRegisterCancel: () => void;
  onBookingCancel: () => void;
  selection?: PublicBookingSelection | null;
}

export const SessionDialogs = ({
  trainerName,
  showRegister,
  showBookingForm,
  onRegisterSubmit,
  onBookingSubmit,
  onRegisterCancel,
  onBookingCancel,
  selection
}: SessionDialogsProps) => {
  const { t } = useLanguage();
  return (
    <Dialog open={showRegister || showBookingForm} onOpenChange={(open) => {
      if (!open) {
        if (showRegister) onRegisterCancel();
        if (showBookingForm) onBookingCancel();
      }
    }}>
      <DialogContent>
        {selection && <div className="text-sm border-b pb-3">
          <p className="text-muted-foreground">{t("publicProfile.selectedOffer")}</p>
          <p className="font-semibold">{selection.name}</p>
          {selection.dateLabel && <p>{selection.dateLabel} · {selection.time}</p>}
        </div>}
        {showRegister && (
          <>
            <DialogHeader>
              <DialogTitle>{t("publicProfile.registerTitle")}</DialogTitle>
              <DialogDescription>
                {t("publicProfile.registerDescription").replace("{name}", trainerName)}
              </DialogDescription>
            </DialogHeader>
            
            <RegisterForm 
              onSubmit={onRegisterSubmit}
              onCancel={onRegisterCancel}
            />
          </>
        )}
        
        {showBookingForm && (
          <>
            <DialogHeader>
              <DialogTitle>{t("publicProfile.bookingTitle").replace("{name}", trainerName)}</DialogTitle>
              <DialogDescription>
                {t("publicProfile.bookingDescription")}
              </DialogDescription>
            </DialogHeader>
            
            <BookingForm 
              trainerName={trainerName}
              initialNotes={selection ? [selection.name, selection.dateLabel, selection.time].filter(Boolean).join(" · ") : undefined}
              initialTime={selection?.time?.split(" — ")[0]}
              onSubmit={onBookingSubmit}
              onCancel={onBookingCancel}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
