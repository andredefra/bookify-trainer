export interface PaymentSettings {
  allowInstallments: boolean;
  defaultInstallmentOptions: number[];
  maxInstallments: number;
  minAmountForInstallments: number;
  processingFeeEnabled: boolean;
  processingFeePercentage: number;
  automaticReminders: boolean;
  reminderDaysBefore: number;
  overdueGraceDays: number;
  reminderTemplate: string;
  overdueTemplate: string;
}

export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  allowInstallments: true,
  defaultInstallmentOptions: [2, 3, 4, 6],
  maxInstallments: 6,
  minAmountForInstallments: 100,
  processingFeeEnabled: false,
  processingFeePercentage: 2.5,
  automaticReminders: true,
  reminderDaysBefore: 7,
  overdueGraceDays: 3,
  reminderTemplate: "Hi {client_name}, this is a friendly reminder that your payment of €{amount} is due on {due_date}. Please make your payment to avoid any service interruption.",
  overdueTemplate: "Hi {client_name}, your payment of €{amount} was due on {due_date} and is now overdue. Please contact us immediately to resolve this matter."
};

export function getPaymentSettings(): PaymentSettings {
  const saved = localStorage.getItem('payment-settings');
  return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_SETTINGS;
}

export function savePaymentSettings(settings: PaymentSettings): void {
  localStorage.setItem('payment-settings', JSON.stringify(settings));
}

export function formatReminderMessage(
  template: string,
  clientName: string,
  amount: number,
  dueDate: string
): string {
  return template
    .replace('{client_name}', clientName)
    .replace('{amount}', amount.toFixed(2))
    .replace('{due_date}', dueDate);
}

export function shouldSendReminder(
  dueDate: string,
  reminderDaysBefore: number,
  lastReminderSent?: string
): boolean {
  const due = new Date(dueDate);
  const today = new Date();
  const reminderDate = new Date(due);
  reminderDate.setDate(reminderDate.getDate() - reminderDaysBefore);
  
  if (today >= reminderDate && today < due) {
    if (!lastReminderSent) return true;
    
    const lastReminder = new Date(lastReminderSent);
    const daysSinceLastReminder = Math.floor((today.getTime() - lastReminder.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceLastReminder >= 1; // Don't send multiple reminders per day
  }
  
  return false;
}

export function isPaymentOverdue(
  dueDate: string,
  graceDays: number
): boolean {
  const due = new Date(dueDate);
  const today = new Date();
  const graceEndDate = new Date(due);
  graceEndDate.setDate(graceEndDate.getDate() + graceDays);
  
  return today > graceEndDate;
}