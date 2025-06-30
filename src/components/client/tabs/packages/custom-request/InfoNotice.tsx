
import { Clock } from "lucide-react";

export function InfoNotice() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex gap-3">
        <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="text-blue-800 font-medium mb-1">What happens next?</p>
          <ul className="text-blue-700 space-y-1">
            <li>• We'll review your request within 24 hours</li>
            <li>• A suitable trainer will be matched to your needs</li>
            <li>• You'll receive a personalized quote and package details</li>
            <li>• Free consultation call to discuss your package</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
