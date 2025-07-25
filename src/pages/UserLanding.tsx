import UserNavbar from '@/components/UserNavbar';
import UserFooter from '@/components/UserFooter';
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
                Allena corpo e mente. Con Trainer.ai, non sei mai da solo.
              </h1>
              
              <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                Scopri il primo personal trainer virtuale che ti ascolta davvero.<br />
                Crea il tuo piano, registra i progressi, ricevi consigli su misura. Tutto questo, senza dover pagare un coach.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" className="text-lg px-8 py-4">
                  <Link to="/user-register">
                    👉 Inizia ora – Gratis per 1 anno per i primi 100 utenti!
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1 - Start Your Journey */}
        <section id="features" className="py-16 md:py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-8 text-center">
                🏋️‍♂️ Fai partire il tuo percorso. Quando vuoi. Dove vuoi.
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  Quante volte hai pensato di iniziare ad allenarti, ma non sapevi da dove cominciare?
                  O magari hai già esperienza, ma ti manca una guida costante o un modo semplice per tenere traccia dei tuoi progressi.
                </p>
                
                <p>
                  Con Trainer.ai, il nostro personal trainer virtuale, puoi finalmente costruire una routine personalizzata senza dover dipendere da un coach umano.
                </p>
                
                <div className="bg-background/50 rounded-lg p-6 my-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Puoi:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Parlare con il tuo Trainer.ai in tempo reale</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Ricevere un programma di allenamento personalizzato in pochi secondi</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Registrare manualmente (o automaticamente) i tuoi allenamenti e i tuoi miglioramenti</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Ricevere consigli nutrizionali e motivazionali basati sui tuoi obiettivi</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Monitorare peso, misure, passi, performance giorno dopo giorno</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Collegare Apple Health, Google Fit o Fitbit per sincronizzare tutto</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-center text-xl font-semibold text-primary">
                  👉 Tutto questo senza stress, in totale autonomia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Trainer.ai Your Virtual Ally */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-8 text-center">
                🤖 Trainer.ai: il tuo nuovo alleato virtuale
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  Dietro Trainer.ai c'è un'intelligenza artificiale pensata per ascoltarti, capirti e guidarti.
                  Non si limita a spararti schede precompilate: ti fa domande, si adatta, evolve con te.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="text-center">
                    <p className="font-semibold text-primary mb-2">Ogni consiglio è basato sui tuoi dati.</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-primary mb-2">Ogni allenamento è costruito sulla tua condizione fisica e sui tuoi obiettivi.</p>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-6 my-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Puoi chiedergli:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-background/50 rounded p-3 text-sm italic">
                        "Ho solo 30 minuti oggi, cosa faccio?"
                      </div>
                      <div className="bg-background/50 rounded p-3 text-sm italic">
                        "Sto ingrassando o solo aumentando massa?"
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-background/50 rounded p-3 text-sm italic">
                        "Cosa posso mangiare al posto del pane?"
                      </div>
                      <div className="bg-background/50 rounded p-3 text-sm italic">
                        "Fammi un programma da 3 giorni a settimana per dimagrire"
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-xl">
                  E Trainer.ai risponde. In modo concreto, semplice, efficace.<br />
                  È come avere un coach in tasca, ma più economico e sempre disponibile.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Keep Everything Under Control */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-8 text-center">
                📊 Tieni tutto sotto controllo
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p className="text-center">
                  MyPersonal.fit non è solo allenamento. È anche controllo, costanza e risultati.
                </p>
                
                <div className="bg-background/50 rounded-lg p-6 my-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Nell'app potrai:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <BarChart3 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Visualizzare i tuoi obiettivi attivi</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Vedere l'andamento del peso, della massa grassa, delle misure corporee</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Analizzare la tua attività giornaliera (passi, sessioni, progressi)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Ricevere suggerimenti mirati per migliorare</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-center text-lg">
                  E se un giorno deciderai di lavorare con un personal trainer vero,
                  il tuo storico sarà lì, pronto per essere condiviso. Nessun dato perso, nessun reset.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - Why We Do This */}
        <section id="about" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-8">
                💙 Perché lo facciamo
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p className="text-xl font-semibold">
                  Allenarsi dovrebbe essere semplice.<br />
                  E invece spesso è costoso, complicato o poco motivante.
                </p>
                
                <p>
                  Noi di MyPersonal.fit crediamo in un nuovo approccio:
                  Un'esperienza smart, accessibile e guidata dall'intelligenza, dove l'utente resta sempre al centro.
                </p>
                
                <div className="bg-primary/5 rounded-lg p-8 my-8">
                  <p className="text-xl">
                    Abbiamo creato MyPersonal proprio per te: per farti entrare nel nostro mondo senza barriere.
                  </p>
                  <p className="text-lg mt-4">
                    E da qui, se vorrai, potrai evolvere con noi. Fino ad allenarti con i migliori PT quelli veri!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                💶 Prezzo
              </h2>
              
              <div className="bg-background/80 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Lancio speciale:</h3>
                <p className="text-xl mb-6">
                  🎉 Solo 1€/mese, o gratis per 1 anno per chi si iscrive oggi fino a 100 utenti
                </p>
                
                <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                  <span className="text-lg font-semibold text-primary">5/100 utenti registrati</span>
                </div>
                
                <div className="space-y-2 text-muted-foreground mb-6">
                  <p>✅ Nessun vincolo</p>
                  <p>✅ Nessuna carta di credito obbligatoria</p>
                  <p>✅ Puoi cancellare quando vuoi</p>
                </div>
                
                <p className="text-xl font-semibold text-primary">
                  🎯 Il miglior investimento che puoi fare… è su te stesso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                🚀 Inizia ora
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8">
                Basta rimandare.<br />
                Trainer.ai è pronto. Tu lo sei?
              </p>
              
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/user-register">
                  👉 Clicca qui per accedere gratis, fino a esaurimento posti, affrettati!
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <UserFooter />
    </div>
  );
};

export default UserLanding;