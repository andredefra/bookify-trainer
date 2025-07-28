import React from "react";

interface RegisterHeaderProps {
  title?: string;
  subtitle?: string;
}

export const RegisterHeader: React.FC<RegisterHeaderProps> = ({ 
  title = "Create your demo account", 
  subtitle = "This is a mock registration for our demo alpha version. If you are interested in joining MyPersonal.fit you can get in touch via email at andrea.mypersonal.fit@gmail.com" 
}) => {
  return (
    <div className="text-center mb-8 mt-4">
      <h1 className="text-3xl font-display font-bold text-primary mb-2">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};