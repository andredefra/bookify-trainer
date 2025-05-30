
export interface InvoicingProvider {
  id: string;
  name: string;
  description: string;
  logo: string;
  isConnected: boolean;
}

export const providers: InvoicingProvider[] = [
  {
    id: "fattureincloud",
    name: "FattureInCloud",
    description: "Leading electronic invoicing system in Italy",
    logo: "🧾",
    isConnected: false
  },
  {
    id: "fiscozen",
    name: "Fiscozen",
    description: "Digital accountant with integrated invoicing",
    logo: "📊",
    isConnected: false
  },
  {
    id: "aruba",
    name: "Aruba Fatturazione",
    description: "Simple and secure electronic invoicing",
    logo: "🔒",
    isConnected: false
  }
];
