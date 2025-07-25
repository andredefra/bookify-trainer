import UserNavbar from '@/components/UserNavbar';
import UserFooter from '@/components/UserFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Bot, Target, BarChart3, Heart, Zap, Smartphone, Clock, Shield, Infinity, X } from 'lucide-react';
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in">
                <div>
                  <Badge variant="secondary" className="mb-4">🏋️‍♂️ Il Tuo Percorso</Badge>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                    Fai partire il tuo percorso.<br />
                    <span className="text-2xl md:text-3xl text-muted-foreground">Quando vuoi. Dove vuoi.</span>
                  </h2>
                </div>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-primary">Quante volte</strong> hai pensato di iniziare ad allenarti, ma non sapevi da dove cominciare?
                    O magari hai già esperienza, ma ti manca una <strong className="text-primary">guida costante</strong>.
                  </p>
                  
                  <p>
                    Con <strong className="text-primary">Trainer.ai</strong>, finalmente puoi costruire una routine personalizzata 
                    senza dover dipendere da un coach umano.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Bot, text: "Chat AI in tempo reale" },
                    { icon: Target, text: "Programmi personalizzati" },
                    { icon: BarChart3, text: "Tracking automatico" },
                    { icon: Heart, text: "Integrazione dispositivi" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover-scale">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center sm:text-left">
                  <p className="text-xl font-semibold text-primary mb-4">
                    👉 Tutto questo senza stress, in totale autonomia.
                  </p>
                  <Button size="lg" className="px-8">
                    Inizia Subito Gratis
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative animate-fade-in">
                <div className="relative mx-auto w-full max-w-sm">
                  {/* Phone Mockup */}
                  <div className="relative bg-background border-8 border-primary/20 rounded-[2.5rem] p-6 shadow-2xl">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">Trainer.ai</div>
                          <div className="text-xs text-muted-foreground">Online ora</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-primary/10 rounded-lg p-3 text-sm">
                          Ciao! Ho creato il tuo programma da 3 giorni per dimagrire 💪
                        </div>
                        <div className="bg-background rounded-lg p-3 text-sm text-right">
                          Perfetto! Quante calorie brucio?
                        </div>
                        <div className="bg-primary/10 rounded-lg p-3 text-sm">
                          Circa 300-400 cal per sessione. Vuoi che ti mostri il primo allenamento? 🔥
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button size="sm" className="w-full">
                          <Zap className="h-4 w-4 mr-2" />
                          Inizia Allenamento
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-2 shadow-lg animate-pulse">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-lg p-2 shadow-lg">
                    <div className="text-xs font-semibold">Today: 245 kcal</div>
                    <div className="text-xs text-muted-foreground">🔥 Ottimo lavoro!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Trainer.ai Your Virtual Ally */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 animate-fade-in">
              <Badge variant="outline" className="mb-4">🤖 Intelligenza Artificiale</Badge>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">
                Trainer.ai: il tuo nuovo<br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">alleato virtuale</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Non schede precompilate. Un'AI che ti ascolta, ti capisce, evolve con te.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Si adatta a te",
                  description: "Ogni consiglio è basato sui tuoi dati personali",
                  icon: Target,
                  gradient: "from-blue-500/10 to-blue-600/10"
                },
                {
                  title: "Impara con te", 
                  description: "Si evolve in base ai tuoi progressi e preferenze",
                  icon: Bot,
                  gradient: "from-purple-500/10 to-purple-600/10"
                },
                {
                  title: "Sempre disponibile",
                  description: "24/7, più economico di un coach umano",
                  icon: Clock,
                  gradient: "from-green-500/10 to-green-600/10"
                }
              ].map((feature, index) => (
                <Card key={index} className={`p-6 border-0 bg-gradient-to-br ${feature.gradient} hover-scale`}>
                  <CardContent className="p-0">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border shadow-lg">
                <h3 className="text-2xl font-semibold text-primary mb-6 text-center">
                  💬 Domande che puoi fare a Trainer.ai:
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Ho solo 30 minuti oggi, cosa faccio?",
                    "Sto ingrassando o aumentando massa?",
                    "Cosa posso mangiare al posto del pane?",
                    "Fammi un programma da 3 giorni per dimagrire"
                  ].map((question, index) => (
                    <div key={index} className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                      <p className="italic text-muted-foreground">{question}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <p className="text-lg">
                    <strong className="text-primary">Trainer.ai risponde sempre.</strong> Concreto, semplice, efficace.<br />
                    <span className="text-muted-foreground">Come avere un coach in tasca, ma più economico e sempre disponibile.</span>
                  </p>
                </div>
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
        <section id="pricing" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <Badge variant="secondary" className="mb-4">💶 Prezzi</Badge>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">
                Scegli il tuo piano
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Inizia gratis per 1 anno. Nessun vincolo, nessuna carta di credito richiesta.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <Card className="relative p-8 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-green-500 hover:bg-green-500">🎉 LANCIO SPECIALE</Badge>
                </div>
                
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl">Piano Gratuito</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold">€0</div>
                      <div className="text-sm text-muted-foreground">per 1 anno</div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Perfetto per iniziare il tuo percorso fitness
                  </CardDescription>
                  
                  {/* Counter */}
                  <div className="bg-primary/10 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Posti rimanenti</span>
                      <span className="text-lg font-bold text-primary">95/100</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '5%'}}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Solo 5 utenti si sono già registrati!</p>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="space-y-4 mb-8">
                    {[
                      { text: "Chat con Trainer.ai", icon: Bot, included: true },
                      { text: "Programmi base personalizzati", icon: Target, included: true },
                      { text: "Tracking allenamenti", icon: BarChart3, included: true },
                      { text: "Supporto community", icon: Heart, included: true },
                      { text: "1 integrazione dispositivo", icon: Smartphone, included: true },
                      { text: "Funzionalità avanzate", icon: Zap, included: false },
                      { text: "Supporto prioritario", icon: Shield, included: false }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {feature.included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </div>
                        <feature.icon className="h-4 w-4 text-muted-foreground" />
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground line-through'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button asChild size="lg" className="w-full">
                    <Link to="/user-register">
                      🚀 Inizia Gratis Ora
                    </Link>
                  </Button>
                  
                  <div className="text-center mt-4 space-y-1">
                    <p className="text-sm text-muted-foreground">✅ Nessun vincolo</p>
                    <p className="text-sm text-muted-foreground">✅ Nessuna carta di credito</p>
                    <p className="text-sm text-muted-foreground">✅ Cancellazione in qualsiasi momento</p>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="relative p-8 border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="secondary">⭐ PREMIUM</Badge>
                </div>
                
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl">Piano Premium</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold">€9.99</div>
                      <div className="text-sm text-muted-foreground">al mese</div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Tutte le funzionalità avanzate per massimizzare i tuoi risultati
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="space-y-4 mb-8">
                    {[
                      { text: "Chat illimitata con Trainer.ai", icon: Bot },
                      { text: "Programmi avanzati personalizzati", icon: Target },
                      { text: "Analytics completi e insights", icon: BarChart3 },
                      { text: "Consigli nutrizionali dettagliati", icon: Heart },
                      { text: "Tutte le integrazioni dispositivi", icon: Smartphone },
                      { text: "Funzionalità AI avanzate", icon: Zap },
                      { text: "Supporto prioritario 24/7", icon: Shield },
                      { text: "Aggiornamenti early access", icon: Infinity }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <Check className="h-3 w-3" />
                        </div>
                        <feature.icon className="h-4 w-4 text-primary" />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="secondary" size="lg" className="w-full">
                    Upgrade a Premium
                  </Button>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-primary font-medium">
                      💎 Passa a Premium in qualsiasi momento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-2xl font-semibold text-primary mb-4">
                🎯 Il miglior investimento che puoi fare… è su te stesso.
              </p>
              <p className="text-muted-foreground">
                Unisciti ai primi 100 utenti e ottieni 1 anno gratuito di accesso completo
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <div className="mb-8">
                <Badge variant="outline" className="mb-4">🚀 Ultimo Step</Badge>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">
                  Basta rimandare.<br />
                  <span className="text-2xl md:text-3xl text-muted-foreground">Trainer.ai è pronto. Tu lo sei?</span>
                </h2>
              </div>
              
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border shadow-lg mb-8">
                <p className="text-xl text-muted-foreground mb-6">
                  🏃‍♂️ <strong>95 posti rimanenti</strong> per l'accesso gratuito di 1 anno<br />
                  ⏰ <strong>Offerta a tempo limitato</strong> - non aspettare troppo!
                </p>
                
                <Button asChild size="lg" className="text-lg px-12 py-6 hover-scale">
                  <Link to="/user-register">
                    👉 Accedi Gratis Ora - Affrettati!
                  </Link>
                </Button>
                
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Setup in 2 minuti</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Nessuna carta richiesta</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Cancellazione facile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <UserFooter />
    </div>
  );
};

export default UserLanding;