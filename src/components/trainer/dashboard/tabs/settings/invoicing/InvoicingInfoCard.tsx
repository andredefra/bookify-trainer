
import { AlertCircle } from "lucide-react";

export function InvoicingInfoCard() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-amber-800 mb-1">Important Information</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• API keys are stored securely and encrypted</li>
            <li>• You can disconnect the provider at any time</li>
            <li>• Sent invoices will be automatically recorded in your system</li>
            <li>• Make sure your company data is up to date in the provider</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
