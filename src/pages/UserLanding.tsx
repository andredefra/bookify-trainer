import UserNavbar from '@/components/UserNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Bot, Target, BarChart3, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserLanding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 md:space-y-10">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-primary mx-auto max-w-5xl md:leading-tight text-balance">
                Allena corpo e mente, con Trainer.ai
              </h1>
              
              <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                Il tuo nuovo personal trainer virtuale è pronto ad ascoltarti.<br />
                Crea schede su misura, ricevi consigli nutrizionali e segui i tuoi progressi. 
                Tutto a partire da 1€/mese. Nessun PT necessario.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" className="text-lg px-8 py-4">
                  <Link to="/user-register">
                    🟦 Inizia ora – Gratis o 1€/mese
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                Per chi è questa app?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Che tu sia agli inizi o già esperto, Trainer.ai ti aiuta a costruire un programma adatto a te.
                Allenamenti, obiettivi, monitoraggio dei progressi. Tutto in un'unica app, senza bisogno di un personal trainer.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-12">
              Cosa puoi fare:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4 mx-auto">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">Parlare con Trainer.ai</h3>
                </div>
                <p className="text-muted-foreground">Il nostro allenatore virtuale</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4 mx-auto">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">Scheda su misura</h3>
                </div>
                <p className="text-muted-foreground">Creata in pochi secondi</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4 mx-auto">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">Tracciare allenamenti</h3>
                </div>
                <p className="text-muted-foreground">E le tue misure</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4 mx-auto">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">Integrare dispositivi</h3>
                </div>
                <p className="text-muted-foreground">Apple Health / Google Fit / Fitbit</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4 mx-auto">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">Consigli personalizzati</h3>
                </div>
                <p className="text-muted-foreground">Su allenamento e nutrizione</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section id="about" className="py-16 md:py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                Perché lo facciamo?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Abbiamo creato MyPersonal.fit per rivoluzionare il modo in cui le persone si allenano.
                Questa è la porta d'ingresso per tutti: un'intelligenza artificiale al tuo fianco, ogni giorno.
                E se un domani vorrai lavorare con un vero coach, ci sarà già un mondo pronto ad accoglierti.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                🎯 Prezzo di lancio: Gratis o 1€/mese
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Nessuna carta di credito richiesta per iniziare.
              </p>
              
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/user-register">
                  Inizia ora – Gratis
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserLanding;