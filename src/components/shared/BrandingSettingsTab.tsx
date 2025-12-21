import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Palette, Save, Eye } from "lucide-react";
import { toast } from "sonner";

interface BrandingSettingsTabProps {
  entityType: 'studio' | 'gym';
  initialData?: {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    sidebarBgColor?: string;
  };
  onSave?: (data: BrandingData) => void;
}

interface BrandingData {
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  sidebarBgColor: string;
}

export function BrandingSettingsTab({ entityType, initialData, onSave }: BrandingSettingsTabProps) {
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || "");
  const [primaryColor, setPrimaryColor] = useState(initialData?.primaryColor || "#10b981");
  const [secondaryColor, setSecondaryColor] = useState(initialData?.secondaryColor || "#1f2937");
  const [sidebarBgColor, setSidebarBgColor] = useState(initialData?.sidebarBgColor || "#ffffff");
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logoUrl || null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // In a real app, you'd upload to Supabase storage here
      toast.info("Logo preview loaded. Save to upload.");
    }
  };

  const handleSave = () => {
    const data: BrandingData = {
      logoUrl: logoPreview || logoUrl,
      primaryColor,
      secondaryColor,
      sidebarBgColor,
    };
    
    if (onSave) {
      onSave(data);
    }
    
    toast.success("Branding settings saved!");
  };

  const entityLabel = entityType === 'studio' ? 'Studio' : 'Palestra';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Branding & White Label
          </CardTitle>
          <CardDescription>
            Personalizza l'aspetto della piattaforma con i tuoi colori e logo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="space-y-6">
              {/* Logo Upload */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/50 overflow-hidden">
                    {logoPreview ? (
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG o SVG. Max 2MB. Consigliato 128x128px.
                    </p>
                  </div>
                </div>
              </div>

              {/* Primary Color */}
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="text-base font-semibold">
                  Colore Primario
                </Label>
                <p className="text-sm text-muted-foreground">
                  Usato per bottoni, accenti e elementi principali
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="primaryColor"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-16 rounded cursor-pointer border border-border"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-32 font-mono"
                    placeholder="#10b981"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="space-y-2">
                <Label htmlFor="secondaryColor" className="text-base font-semibold">
                  Colore Secondario
                </Label>
                <p className="text-sm text-muted-foreground">
                  Usato per testi e accenti secondari
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="secondaryColor"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="h-10 w-16 rounded cursor-pointer border border-border"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-32 font-mono"
                    placeholder="#1f2937"
                  />
                </div>
              </div>

              {/* Sidebar Background */}
              <div className="space-y-2">
                <Label htmlFor="sidebarBgColor" className="text-base font-semibold">
                  Sfondo Sidebar
                </Label>
                <p className="text-sm text-muted-foreground">
                  Colore di sfondo del menu laterale
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="sidebarBgColor"
                    value={sidebarBgColor}
                    onChange={(e) => setSidebarBgColor(e.target.value)}
                    className="h-10 w-16 rounded cursor-pointer border border-border"
                  />
                  <Input
                    value={sidebarBgColor}
                    onChange={(e) => setSidebarBgColor(e.target.value)}
                    className="w-32 font-mono"
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              {/* Save Button */}
              <Button onClick={handleSave} className="w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Salva Branding
              </Button>
            </div>

            {/* Right: Preview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <Label className="text-base font-semibold">Anteprima Menu</Label>
              </div>
              <div 
                className="rounded-lg border shadow-lg overflow-hidden"
                style={{ maxWidth: '240px' }}
              >
                {/* Preview Sidebar */}
                <div 
                  className="p-4 space-y-4"
                  style={{ backgroundColor: sidebarBgColor }}
                >
                  {/* Logo area */}
                  <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: `${secondaryColor}20` }}>
                    <div 
                      className="h-10 w-10 rounded-lg flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {entityType === 'studio' ? 'S' : 'G'}
                        </span>
                      )}
                    </div>
                    <span 
                      className="font-semibold text-sm"
                      style={{ color: secondaryColor }}
                    >
                      {entityLabel}
                    </span>
                  </div>

                  {/* Menu items */}
                  <nav className="space-y-1">
                    {['Dashboard', 'Clienti', 'Trainer', 'Calendario', 'Impostazioni'].map((item, index) => (
                      <div
                        key={item}
                        className="px-3 py-2 rounded-md text-sm transition-colors"
                        style={{
                          backgroundColor: index === 0 ? `${primaryColor}15` : 'transparent',
                          color: index === 0 ? primaryColor : secondaryColor,
                          fontWeight: index === 0 ? 600 : 400,
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Preview button */}
                <div className="p-4 bg-gray-50 border-t">
                  <button
                    className="w-full py-2 px-4 rounded-md text-white text-sm font-medium"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Bottone Esempio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}