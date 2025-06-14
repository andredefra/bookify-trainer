export interface Country {
  id: string;
  name: string;
  flag: string;
  code: string;
}

export interface InvoicingProvider {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  countryId: string;
  features: string[];
  pricing: string;
}

export const countries: Country[] = [
  // Europe
  { id: "it", name: "Italy", flag: "🇮🇹", code: "IT" },
  { id: "de", name: "Germany", flag: "🇩🇪", code: "DE" },
  { id: "fr", name: "France", flag: "🇫🇷", code: "FR" },
  { id: "es", name: "Spain", flag: "🇪🇸", code: "ES" },
  { id: "gb", name: "United Kingdom", flag: "🇬🇧", code: "GB" },
  { id: "nl", name: "Netherlands", flag: "🇳🇱", code: "NL" },
  { id: "be", name: "Belgium", flag: "🇧🇪", code: "BE" },
  { id: "ch", name: "Switzerland", flag: "🇨🇭", code: "CH" },
  { id: "at", name: "Austria", flag: "🇦🇹", code: "AT" },
  { id: "se", name: "Sweden", flag: "🇸🇪", code: "SE" },
  { id: "no", name: "Norway", flag: "🇳🇴", code: "NO" },
  { id: "dk", name: "Denmark", flag: "🇩🇰", code: "DK" },
  { id: "fi", name: "Finland", flag: "🇫🇮", code: "FI" },
  { id: "pt", name: "Portugal", flag: "🇵🇹", code: "PT" },
  
  // North America
  { id: "us", name: "United States", flag: "🇺🇸", code: "US" },
  { id: "ca", name: "Canada", flag: "🇨🇦", code: "CA" },
  { id: "mx", name: "Mexico", flag: "🇲🇽", code: "MX" },
  
  // South America
  { id: "br", name: "Brazil", flag: "🇧🇷", code: "BR" },
  { id: "ar", name: "Argentina", flag: "🇦🇷", code: "AR" },
  { id: "cl", name: "Chile", flag: "🇨🇱", code: "CL" },
  { id: "co", name: "Colombia", flag: "🇨🇴", code: "CO" },
  { id: "pe", name: "Peru", flag: "🇵🇪", code: "PE" },
  
  // Asia Pacific
  { id: "au", name: "Australia", flag: "🇦🇺", code: "AU" },
  { id: "nz", name: "New Zealand", flag: "🇳🇿", code: "NZ" },
  { id: "jp", name: "Japan", flag: "🇯🇵", code: "JP" },
  { id: "sg", name: "Singapore", flag: "🇸🇬", code: "SG" },
  { id: "hk", name: "Hong Kong", flag: "🇭🇰", code: "HK" },
  { id: "in", name: "India", flag: "🇮🇳", code: "IN" },
  
  // Africa & Middle East
  { id: "za", name: "South Africa", flag: "🇿🇦", code: "ZA" },
  { id: "ae", name: "United Arab Emirates", flag: "🇦🇪", code: "AE" },
  { id: "il", name: "Israel", flag: "🇮🇱", code: "IL" },
];

export const providers: InvoicingProvider[] = [
  // Italy
  {
    id: "fattureincloud_it",
    name: "FattureInCloud",
    description: "Leading electronic invoicing system in Italy",
    logo: "🧾",
    website: "https://www.fattureincloud.it",
    countryId: "it",
    features: ["Electronic invoicing", "SDI integration", "Tax compliance"],
    pricing: "From €9.90/month"
  },
  {
    id: "fiscozen_it",
    name: "Fiscozen",
    description: "Digital accountant with integrated invoicing",
    logo: "📊",
    website: "https://fiscozen.it",
    countryId: "it",
    features: ["Automated accounting", "Tax consultation", "Invoice management"],
    pricing: "From €29/month"
  },
  {
    id: "aruba_it",
    name: "Aruba Fatturazione",
    description: "Simple and secure electronic invoicing",
    logo: "🔒",
    website: "https://www.aruba.it",
    countryId: "it",
    features: ["SDI certified", "Cloud storage", "Mobile app"],
    pricing: "From €1/month"
  },

  // United States
  {
    id: "quickbooks_us",
    name: "QuickBooks Online",
    description: "America's #1 accounting software",
    logo: "📗",
    website: "https://quickbooks.intuit.com",
    countryId: "us",
    features: ["Full accounting", "Payroll integration", "Tax preparation"],
    pricing: "From $30/month"
  },
  {
    id: "xero_us",
    name: "Xero",
    description: "Beautiful accounting software",
    logo: "🔵",
    website: "https://www.xero.com",
    countryId: "us",
    features: ["Real-time collaboration", "Bank reconciliation", "Financial reporting"],
    pricing: "From $13/month"
  },
  {
    id: "freshbooks_us",
    name: "FreshBooks",
    description: "Invoicing and time tracking for small business",
    logo: "🍃",
    website: "https://www.freshbooks.com",
    countryId: "us",
    features: ["Time tracking", "Project management", "Client portal"],
    pricing: "From $17/month"
  },
  {
    id: "wave_us",
    name: "Wave Accounting",
    description: "Free accounting software for small business",
    logo: "🌊",
    website: "https://www.waveapps.com",
    countryId: "us",
    features: ["Free invoicing", "Receipt scanning", "Payment processing"],
    pricing: "Free (payment fees apply)"
  },
  {
    id: "invoice2go_us",
    name: "Invoice2go",
    description: "Professional invoicing on the go",
    logo: "📱",
    website: "https://invoice.2go.com",
    countryId: "us",
    features: ["Mobile invoicing", "Payment tracking", "Expense management"],
    pricing: "From $5.99/month"
  },

  // United Kingdom
  {
    id: "sage_gb",
    name: "Sage Business Cloud",
    description: "Complete business management solution",
    logo: "🟢",
    website: "https://www.sage.com/en-gb",
    countryId: "gb",
    features: ["Making Tax Digital", "Payroll", "CRM integration"],
    pricing: "From £10/month"
  },
  {
    id: "xero_gb",
    name: "Xero UK",
    description: "Cloud accounting for UK businesses",
    logo: "🔵",
    website: "https://www.xero.com/uk",
    countryId: "gb",
    features: ["VAT returns", "Bank feeds", "Making Tax Digital ready"],
    pricing: "From £12/month"
  },
  {
    id: "kashflow_gb",
    name: "KashFlow",
    description: "Simple online accounting for small business",
    logo: "💰",
    website: "https://www.kashflow.com",
    countryId: "gb",
    features: ["Easy invoicing", "Expense tracking", "VAT compliance"],
    pricing: "From £15/month"
  },

  // Germany
  {
    id: "lexoffice_de",
    name: "Lexoffice",
    description: "Online-Buchhaltung für Unternehmer",
    logo: "📋",
    website: "https://www.lexoffice.de",
    countryId: "de",
    features: ["GoBD-konform", "Umsatzsteuervoranmeldung", "Banking"],
    pricing: "Ab €8,90/Monat"
  },
  {
    id: "sevdesk_de",
    name: "sevDesk",
    description: "Buchhaltungssoftware in der Cloud",
    logo: "7️⃣",
    website: "https://sevdesk.de",
    countryId: "de",
    features: ["Rechnungen", "Belege", "Finanzen"],
    pricing: "Ab €7,90/Monat"
  },
  {
    id: "fastbill_de",
    name: "FastBill",
    description: "Automatisierte Buchhaltung",
    logo: "⚡",
    website: "https://www.fastbill.com",
    countryId: "de",
    features: ["Rechnungsstellung", "Zeiterfassung", "API"],
    pricing: "Ab €8,99/Monat"
  },

  // France
  {
    id: "pennylane_fr",
    name: "Pennylane",
    description: "Comptabilité collaborative en ligne",
    logo: "🪙",
    website: "https://www.pennylane.com",
    countryId: "fr",
    features: ["Facturation", "Comptabilité", "TVA"],
    pricing: "À partir de 39€/mois"
  },
  {
    id: "tiime_fr",
    name: "Tiime",
    description: "Comptabilité automatisée",
    logo: "⏰",
    website: "https://www.tiime-ae.co",
    countryId: "fr",
    features: ["Facturation automatique", "Déclarations", "Banque"],
    pricing: "À partir de 16€/mois"
  },
  {
    id: "zefyr_fr",
    name: "Zefyr",
    description: "Gestion financière pour entrepreneurs",
    logo: "🌬️",
    website: "https://www.zefyr.net",
    countryId: "fr",
    features: ["Facturation", "Comptabilité", "Trésorerie"],
    pricing: "À partir de 9€/mois"
  },

  // Spain
  {
    id: "contasimple_es",
    name: "ContaSimple",
    description: "Contabilidad online simple",
    logo: "📊",
    website: "https://www.contasimple.com",
    countryId: "es",
    features: ["Facturación", "Contabilidad", "AEAT"],
    pricing: "Desde 6€/mes"
  },
  {
    id: "quipu_es",
    name: "Quipu",
    description: "Gestión integral para autónomos y pymes",
    logo: "🔢",
    website: "https://getquipu.com",
    countryId: "es",
    features: ["Facturación electrónica", "Gastos", "Informes"],
    pricing: "Desde 9€/mes"
  },

  // Canada
  {
    id: "quickbooks_ca",
    name: "QuickBooks Canada",
    description: "Accounting software for Canadian businesses",
    logo: "📗",
    website: "https://quickbooks.intuit.ca",
    countryId: "ca",
    features: ["GST/HST", "Payroll", "CRA integration"],
    pricing: "From $20 CAD/month"
  },
  {
    id: "wave_ca",
    name: "Wave Canada",
    description: "Free accounting for Canadian small business",
    logo: "🌊",
    website: "https://www.waveapps.com/ca",
    countryId: "ca",
    features: ["Free invoicing", "GST/HST tracking", "Payroll"],
    pricing: "Free (payroll fees apply)"
  },

  // Australia
  {
    id: "xero_au",
    name: "Xero Australia",
    description: "Online accounting software",
    logo: "🔵",
    website: "https://www.xero.com/au",
    countryId: "au",
    features: ["GST returns", "Single Touch Payroll", "Bank feeds"],
    pricing: "From $25 AUD/month"
  },
  {
    id: "myob_au",
    name: "MYOB",
    description: "Mind Your Own Business accounting",
    logo: "🦘",
    website: "https://www.myob.com/au",
    countryId: "au",
    features: ["Accounting", "Payroll", "Tax compliance"],
    pricing: "From $27 AUD/month"
  },
  {
    id: "reckon_au",
    name: "Reckon One",
    description: "Simple online accounting",
    logo: "🔍",
    website: "https://www.reckon.com/au",
    countryId: "au",
    features: ["Invoicing", "Expense tracking", "BAS lodgment"],
    pricing: "From $10 AUD/month"
  },

  // Brazil
  {
    id: "contaazul_br",
    name: "ContaAzul",
    description: "Gestão empresarial na nuvem",
    logo: "🔵",
    website: "https://contaazul.com",
    countryId: "br",
    features: ["NFe", "Controle financeiro", "Relatórios"],
    pricing: "A partir de R$ 58/mês"
  },
  {
    id: "omie_br",
    name: "Omie",
    description: "ERP online para pequenas e médias empresas",
    logo: "⭕",
    website: "https://www.omie.com.br",
    countryId: "br",
    features: ["Nota fiscal", "Financeiro", "Estoque"],
    pricing: "A partir de R$ 29/mês"
  },

  // Mexico
  {
    id: "contpaqi_mx",
    name: "CONTPAQi",
    description: "Sistema de gestión empresarial",
    logo: "📋",
    website: "https://www.contpaq.com.mx",
    countryId: "mx",
    features: ["Facturación electrónica", "Contabilidad", "SAT"],
    pricing: "Desde $299 MXN/mes"
  },
  {
    id: "aspel_mx",
    name: "Aspel",
    description: "Software administrativo y fiscal",
    logo: "🏢",
    website: "https://www.aspel.com.mx",
    countryId: "mx",
    features: ["CFDI", "Contabilidad electrónica", "Nómina"],
    pricing: "Desde $199 MXN/mes"
  },

  // Add more providers for other countries as needed...
];

export const getProvidersByCountry = (countryId: string): InvoicingProvider[] => {
  return providers.filter(provider => provider.countryId === countryId);
};

export const getCountryById = (countryId: string): Country | undefined => {
  return countries.find(country => country.id === countryId);
};