import { jsPDF } from "jspdf";
import { DemoTransaction } from "./demoTransactionsBridge";

const TRAINER = {
  name: "Sarah Johnson",
  title: "Personal Trainer",
  address: "Via Roma 12, 20121 Milano (MI)",
  vat: "IT01234567890",
  email: "sarah.johnson@mypersonal.fit",
};

const CLIENT = {
  name: "Andrea M.",
  address: "Via Verdi 8, 20122 Milano (MI)",
  cf: "NDRMRA90A01F205X",
};

function header(doc: jsPDF, title: string) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(title, 20, 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(TRAINER.name, 20, 34);
  doc.text(TRAINER.title, 20, 39);
  doc.text(TRAINER.address, 20, 44);
  doc.text(`P.IVA: ${TRAINER.vat}`, 20, 49);
  doc.text(TRAINER.email, 20, 54);

  doc.setDrawColor(200);
  doc.line(20, 60, 190, 60);
}

function clientBlock(doc: jsPDF, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Cliente / Client", 20, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(CLIENT.name, 20, y + 6);
  doc.text(CLIENT.address, 20, y + 11);
  doc.text(`CF: ${CLIENT.cf}`, 20, y + 16);
}

function footer(doc: jsPDF) {
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    "Documento generato automaticamente da MyPersonal.fit — demo prototype",
    20,
    285
  );
}

export function downloadInvoicePdf(tx: DemoTransaction) {
  const doc = new jsPDF();
  const invoiceNumber = tx.invoiceNumber ?? `INV-${tx.id}`;
  const issuedAt = tx.invoiceIssuedAt ?? tx.date;

  header(doc, "FATTURA / INVOICE");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`Numero: ${invoiceNumber}`, 130, 34);
  doc.setFont("helvetica", "normal");
  doc.text(`Data emissione: ${issuedAt}`, 130, 40);
  doc.text(`Data servizio: ${tx.date}`, 130, 46);

  clientBlock(doc, 72);

  // Table
  const tableTop = 105;
  doc.setFillColor(245, 245, 245);
  doc.rect(20, tableTop, 170, 9, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Descrizione", 24, tableTop + 6);
  doc.text("Qta", 130, tableTop + 6);
  doc.text("Importo", 165, tableTop + 6);

  doc.setFont("helvetica", "normal");
  const desc = `${tx.type} — ${tx.name ?? ""}`.trim();
  doc.text(desc, 24, tableTop + 16);
  doc.text("1", 130, tableTop + 16);
  doc.text(`EUR ${tx.amount.toFixed(2)}`, 165, tableTop + 16);

  // Totals (no IVA — regime forfettario demo)
  const totY = tableTop + 35;
  doc.setDrawColor(220);
  doc.line(120, totY, 190, totY);
  doc.setFont("helvetica", "normal");
  doc.text("Imponibile:", 125, totY + 7);
  doc.text(`EUR ${tx.amount.toFixed(2)}`, 165, totY + 7);
  doc.text("IVA:", 125, totY + 13);
  doc.text("Esente (regime forfettario)", 145, totY + 13);
  doc.setFont("helvetica", "bold");
  doc.text("Totale:", 125, totY + 21);
  doc.text(`EUR ${tx.amount.toFixed(2)}`, 165, totY + 21);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(
    "Operazione esente IVA ai sensi dell'art. 1, commi 54-89, L. 190/2014 (regime forfettario).",
    20,
    totY + 40
  );
  doc.text(
    `Metodo di pagamento: ${tx.paymentMethod ?? "card"}.`,
    20,
    totY + 46
  );

  footer(doc);
  doc.save(`${invoiceNumber}.pdf`);
}

export function downloadRefundReceiptPdf(tx: DemoTransaction) {
  const doc = new jsPDF();
  const refundNumber =
    tx.refundReceiptNumber ?? `REF-${tx.id}`;
  const processedAt = tx.refundProcessedAt ?? tx.date;

  header(doc, "RICEVUTA DI RIMBORSO");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`Numero: ${refundNumber}`, 130, 34);
  doc.setFont("helvetica", "normal");
  doc.text(`Data rimborso: ${processedAt}`, 130, 40);
  doc.text(
    `Riferimento transazione: ${tx.invoiceNumber ?? `TX-${tx.id}`}`,
    130,
    46
  );

  clientBlock(doc, 72);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Dettagli rimborso", 20, 110);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Servizio: ${tx.type} — ${tx.name ?? ""}`, 20, 118);
  doc.text(`Data originale: ${tx.date}`, 20, 124);
  doc.text(`Metodo: ${tx.paymentMethod ?? "card"}`, 20, 130);
  if (tx.refundReason) {
    doc.text("Motivazione:", 20, 140);
    const split = doc.splitTextToSize(tx.refundReason, 170);
    doc.text(split, 20, 146);
  }

  // Total refunded
  const totY = 175;
  doc.setDrawColor(220);
  doc.line(120, totY, 190, totY);
  doc.setFont("helvetica", "bold");
  doc.text("Importo rimborsato:", 125, totY + 7);
  doc.text(`EUR ${tx.amount.toFixed(2)}`, 165, totY + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(
    "Il rimborso è stato elaborato sullo stesso metodo di pagamento originale.",
    20,
    totY + 25
  );

  footer(doc);
  doc.save(`${refundNumber}.pdf`);
}
