
interface SettingsHeaderProps {
  selectedSection: string;
}

export function SettingsHeader({ selectedSection }: SettingsHeaderProps) {
  const getTitleAndDescription = () => {
    switch (selectedSection) {
      case "profile":
        return {
          title: "Profile Settings",
          description: "Manage your personal information and professional details"
        };
      case "public-profile":
        return {
          title: "My Public Profile",
          description: "Manage your public trainer profile that clients will see"
        };
      case "availability":
        return {
          title: "Availability Settings",
          description: "Set your working hours and availability preferences"
        };
      case "payment-settings":
        return {
          title: "Payment Settings",
          description: "Configure installment plans and payment reminders"
        };
      case "invoicing":
        return {
          title: "Invoicing Integration",
          description: "Connect your invoicing system to streamline payment processing"
        };
      case "membership":
        return {
          title: "Membership & Plan",
          description: "Manage your subscription and account features"
        };
      case "billing":
        return {
          title: "Billing Information",
          description: "Update your payment methods and billing details"
        };
      default:
        return {
          title: "Settings",
          description: "Manage your account preferences"
        };
    }
  };

  const { title, description } = getTitleAndDescription();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
}
