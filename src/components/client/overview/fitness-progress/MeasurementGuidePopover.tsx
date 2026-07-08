import { HelpCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type MeasurementKey = "chest" | "waist" | "hips" | "quadriceps" | "arms";

const GUIDES: Record<MeasurementKey, { title: string; men: string; women: string }> = {
  chest: {
    title: "Petto",
    men: "Misura la circonferenza del torace passando il metro all'altezza dei capezzoli, braccia rilassate lungo i fianchi. Il metro deve essere parallelo al pavimento.",
    women: "Misura la circonferenza del busto nel punto più pieno (di solito sopra il seno), braccia rilassate. Il metro deve essere parallelo al pavimento, senza comprimere.",
  },
  waist: {
    title: "Vita",
    men: "Misura nel punto più stretto del tronco, generalmente 2-3 cm sopra l'ombelico. Espira normalmente e non trattenere l'addome.",
    women: "Misura nel punto più stretto del tronco, tipicamente sopra l'ombelico. Espira normalmente, addome rilassato.",
  },
  hips: {
    title: "Fianchi",
    men: "Misura la circonferenza nel punto più largo dei glutei, piedi uniti, metro parallelo al pavimento.",
    women: "Misura la circonferenza nel punto più largo dei fianchi/glutei, piedi uniti, metro parallelo al pavimento.",
  },
  quadriceps: {
    title: "Quadricipiti",
    men: "Misura la coscia dominante a metà tra la piega inguinale e la parte superiore del ginocchio, gamba rilassata e peso distribuito equamente.",
    women: "Misura la coscia dominante a metà tra la piega inguinale e la parte superiore del ginocchio (spesso leggermente più in alto), gamba rilassata.",
  },
  arms: {
    title: "Braccia",
    men: "Misura la circonferenza del bicipite nel punto più largo, braccio rilassato lungo il fianco (non contratto).",
    women: "Misura la circonferenza del bicipite nel punto più largo, braccio rilassato lungo il fianco.",
  },
};

interface Props {
  measurement: MeasurementKey;
}

export function MeasurementGuidePopover({ measurement }: Props) {
  const guide = GUIDES[measurement];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Guida misurazione ${guide.title}`}
          className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <HelpCircle className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-72 text-xs space-y-2">
        <div className="font-semibold text-sm">{guide.title} — come misurare</div>
        <div>
          <div className="font-medium text-foreground">Uomo</div>
          <p className="text-muted-foreground">{guide.men}</p>
        </div>
        <div>
          <div className="font-medium text-foreground">Donna</div>
          <p className="text-muted-foreground">{guide.women}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
