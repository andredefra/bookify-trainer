
import { CardPaymentForm } from "@/components/shared/payment/CardPaymentForm";
import { CashPaymentNotice } from "@/components/shared/payment/CashPaymentNotice";

// PayPal payment form mockup
export const PayPalPaymentForm = () => (
  <div className="space-y-4">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-blue-600 font-bold text-lg">PayPal</div>
      </div>
      <p className="text-sm text-blue-700 mb-3">
        You'll be redirected to PayPal to complete your payment securely
      </p>
      <div className="text-xs text-blue-600">
        ✓ Buyer protection included
      </div>
    </div>
  </div>
);

// Klarna payment form mockup
export const KlarnaPaymentForm = () => (
  <div className="space-y-4">
    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-pink-600 rounded text-white text-xs flex items-center justify-center font-bold">K</div>
        <span className="font-semibold text-pink-800">Klarna</span>
      </div>
      <p className="text-sm text-pink-700 mb-3">
        Split your payment into 4 interest-free installments
      </p>
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="text-center">
          <div className="font-medium">Today</div>
          <div className="text-gray-600">€{(25).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">2 weeks</div>
          <div className="text-gray-600">€{(25).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">4 weeks</div>
          <div className="text-gray-600">€{(25).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">6 weeks</div>
          <div className="text-gray-600">€{(25).toFixed(2)}</div>
        </div>
      </div>
    </div>
  </div>
);

interface PaymentFormRendererProps {
  paymentMethod: string;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardHolder: string;
  setCardHolder: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
}

export function PaymentFormRenderer({
  paymentMethod,
  cardNumber,
  setCardNumber,
  cardHolder,
  setCardHolder,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv
}: PaymentFormRendererProps) {
  switch (paymentMethod) {
    case 'card':
      return (
        <CardPaymentForm 
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cardHolder={cardHolder}
          setCardHolder={setCardHolder}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
          cvv={cvv}
          setCvv={setCvv}
        />
      );
    case 'klarna':
      return <KlarnaPaymentForm />;
    case 'paypal':
      return <PayPalPaymentForm />;
    case 'cash':
      return <CashPaymentNotice />;
    default:
      return null;
  }
}
