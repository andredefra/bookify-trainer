import UserNavbar from '@/components/UserNavbar';
import UserFooter from '@/components/UserFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Bot, Target, BarChart3, Heart, Zap, Smartphone, Clock, Shield, Infinity, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const UserLandingEn = () => {
  const { t } = useLanguage();
  
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
                Train body and mind. With MyPersonal's AI Trainer, you're never alone.
              </h1>
              
              <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                Discover the first virtual personal trainer that truly listens to you.<br />
                Create your plan, track progress, receive personalized advice. All this, without having to pay a coach.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" className="text-lg px-8 py-4">
                  <Link to="/user-register">
                    <span className="hidden sm:inline">👉 Start now – Free for 1 year for the first 100 users!</span>
                    <span className="sm:hidden">👉 Start now – Free 1 year!</span>
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
                  <Badge variant="secondary" className="mb-4">🏋️‍♂️ Your Journey</Badge>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                    Start your journey.<br />
                    <span className="text-2xl md:text-3xl text-muted-foreground">When you want. Where you want.</span>
                  </h2>
                </div>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-primary">How many times</strong> have you thought about starting to work out, but didn't know where to begin?
                    Or maybe you already have experience, but you lack <strong className="text-primary">constant guidance</strong>.
                  </p>
                  
                  <p>
                    With <strong className="text-primary">MyPersonal's AI Trainer</strong>, you can finally build a personalized routine 
                    without having to depend on a human coach.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Bot, text: "Real-time AI Chat" },
                    { icon: Target, text: "Personalized Programs" },
                    { icon: BarChart3, text: "Automatic Tracking" },
                    { icon: Heart, text: "Device Integration" }
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
                    👉 All this without stress, in complete autonomy.
                  </p>
                  <Button size="lg" className="px-8">
                    Start Now for Free
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
                          <div className="text-sm font-semibold">MyPersonal's AI Trainer</div>
                          <div className="text-xs text-muted-foreground">Online now</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-primary/10 rounded-lg p-3 text-sm">
                          Hi! I've created your 3-day weight loss program 💪
                        </div>
                        <div className="bg-background rounded-lg p-3 text-sm text-right">
                          Perfect! How many calories do I burn?
                        </div>
                        <div className="bg-primary/10 rounded-lg p-3 text-sm">
                          About 300-400 cal per session. Want me to show you the first workout? 🔥
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button size="sm" className="w-full">
                          <Zap className="h-4 w-4 mr-2" />
                          Start Workout
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
                    <div className="text-xs text-muted-foreground">🔥 Great work!</div>
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
              <Badge variant="outline" className="mb-4">🤖 Artificial Intelligence</Badge>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">
                MyPersonal's AI Trainer: your new<br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">virtual ally</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                No pre-made templates. An AI that listens to you, understands you, evolves with you.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Adapts to you",
                  description: "Every advice is based on your personal data",
                  icon: Target,
                  gradient: "from-blue-500/10 to-blue-600/10"
                },
                {
                  title: "Learns with you", 
                  description: "Evolves based on your progress and preferences",
                  icon: Bot,
                  gradient: "from-purple-500/10 to-purple-600/10"
                },
                {
                  title: "Always available",
                  description: "24/7, cheaper than a human coach",
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
                  💬 Questions you can ask MyPersonal's AI Trainer:
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "I only have 30 minutes today, what should I do?",
                    "Am I gaining weight or building muscle?",
                    "What can I eat instead of bread?",
                    "Create a 3-day program for weight loss"
                  ].map((question, index) => (
                    <div key={index} className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                      <p className="italic text-muted-foreground">{question}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <p className="text-lg">
                    <strong className="text-primary">MyPersonal's AI Trainer always responds.</strong> Concrete, simple, effective.<br />
                    <span className="text-muted-foreground">Like having a coach in your pocket, but cheaper and always available.</span>
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
                📊 Keep everything under control
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p className="text-center">
                  MyPersonal.fit is not just training. It's also control, consistency and results.
                </p>
                
                <div className="bg-background/50 rounded-lg p-6 my-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">In the app you can:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <BarChart3 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>View your active goals</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>See weight progress, body fat, body measurements</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Analyze your daily activity (steps, sessions, progress)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Receive targeted suggestions for improvement</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-center text-lg">
                  And if one day you decide to work with a real personal trainer,
                  your history will be there, ready to be shared. No lost data, no resets.
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
                💙 Why we do this
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p className="text-xl font-semibold">
                  Training should be simple.<br />
                  Instead it's often expensive, complicated or unmotivating.
                </p>
                
                <p>
                  We at MyPersonal.fit believe in a new approach:
                  A smart, accessible experience guided by intelligence, where the user always remains at the center.
                </p>
                
                <div className="bg-primary/5 rounded-lg p-8 my-8">
                  <p className="text-xl">
                    We created MyPersonal specifically for you: to help you enter our world without barriers.
                  </p>
                  <p className="text-lg mt-4">
                    And from here, if you want, you can evolve with us. Until you train with the best PTs, the real ones!
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
              <Badge variant="secondary" className="mb-4">💶 Pricing</Badge>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">
                One plan. All features.
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Only the first 100 users get free access for 1 year. After that, normal plan at €4.99/month.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan for first 100 users */}
              <Card className="relative p-8 border-2 border-green-500/50 bg-green-50/50 hover:bg-green-50/70 transition-colors">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-green-500 hover:bg-green-500 text-white">🎉 FIRST 100 USERS</Badge>
                </div>
                
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl">Free Access</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">€0</div>
                      <div className="text-sm text-muted-foreground">for 1 complete year</div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    All premium features, completely free for one year
                  </CardDescription>
                  
                  {/* Counter */}
                  <div className="bg-green-100 border border-green-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Remaining spots</span>
                      <span className="text-lg font-bold text-green-600">95/100</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '5%'}}></div>
                    </div>
                    <p className="text-xs text-green-700 mt-2">⚡ Only 5 users have already signed up!</p>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="space-y-4 mb-8">
                    {[
                      { text: "Unlimited chat with MyPersonal's AI Trainer", icon: Bot },
                      { text: "Advanced personalized programs", icon: Target },
                      { text: "Complete analytics and insights", icon: BarChart3 },
                      { text: "Detailed nutritional advice", icon: Heart },
                      { text: "All device integrations", icon: Smartphone },
                      { text: "Advanced AI features", icon: Zap },
                      { text: "Priority 24/7 support", icon: Shield },
                      { text: "Early access updates", icon: Infinity }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <Check className="h-3 w-3" />
                        </div>
                        <feature.icon className="h-4 w-4 text-green-600" />
                        <span className="text-foreground font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    <Link to="/user-register">
                      🚀 Get Your Free Spot
                    </Link>
                  </Button>
                  
                  <div className="text-center mt-4 space-y-1">
                    <p className="text-sm text-green-700 font-medium">✅ Full access for 1 year</p>
                    <p className="text-sm text-green-700">✅ No credit card required</p>
                    <p className="text-sm text-green-700">✅ All features included</p>
                  </div>
                </CardContent>
              </Card>

              {/* Normal Plan (after 100 users) */}
              <Card className="relative p-8 border-2 border-primary/30 hover:border-primary/50 transition-colors">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="outline" className="bg-background border-2 border-primary/30 shadow-sm">💼 NORMAL PLAN</Badge>
                </div>
                
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl">Normal Access</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold">€4.99</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Same exact features, available after the first 100 users
                  </CardDescription>
                  
                  <div className="bg-primary/10 rounded-lg p-4 mt-4">
                    <p className="text-sm text-primary font-medium">
                      💡 Same premium service, you just didn't make it in time for the free period!
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="space-y-4 mb-8">
                    {[
                      { text: "Unlimited chat with MyPersonal's AI Trainer", icon: Bot },
                      { text: "Advanced personalized programs", icon: Target },
                      { text: "Complete analytics and insights", icon: BarChart3 },
                      { text: "Detailed nutritional advice", icon: Heart },
                      { text: "All device integrations", icon: Smartphone },
                      { text: "Advanced AI features", icon: Zap },
                      { text: "Priority 24/7 support", icon: Shield },
                      { text: "Early access updates", icon: Infinity }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <Check className="h-3 w-3" />
                        </div>
                        <feature.icon className="h-4 w-4 text-primary" />
                        <span className="text-foreground font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full" size="lg">
                    Subscribe at €4.99/month
                  </Button>
                  
                  <div className="text-center mt-4 space-y-1">
                    <p className="text-sm text-primary">🔄 Monthly subscription</p>
                    <p className="text-sm text-muted-foreground">Cancel anytime</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg text-muted-foreground mb-6">
                💡 <strong>One service, one quality level.</strong> Whether you get the free year or pay monthly, you get exactly the same experience.
              </p>
              
              <div className="max-w-2xl mx-auto">
                <Button asChild size="lg" className="px-12 py-4 text-lg">
                  <Link to="/user-register">
                    <span className="hidden sm:inline">🚀 Join the First 100 - Free for 1 Year</span>
                    <span className="sm:hidden">🚀 Join First 100</span>
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  No credit card required
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <div className="mb-8">
                <Badge variant="outline" className="mb-4">🚀 Final Step</Badge>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">
                  Stop postponing.<br />
                  <span className="text-2xl md:text-3xl text-muted-foreground">MyPersonal's AI Trainer is ready. Are you?</span>
                </h2>
              </div>
              
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border shadow-lg mb-8">
                <p className="text-xl text-muted-foreground mb-6">
                  🏃‍♂️ <strong>95 spots remaining</strong> for 1-year free access<br />
                  ⏰ <strong>Limited time offer</strong> - don't wait too long!
                </p>
                
                <Button asChild size="lg" className="text-lg px-12 py-6 hover-scale">
                  <Link to="/user-register">
                    <span className="hidden sm:inline">👉 Get Free Access Now - Hurry Up!</span>
                    <span className="sm:hidden">👉 Get Free Access!</span>
                  </Link>
                </Button>
                
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>2-minute setup</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>No card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Easy cancellation</span>
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

export default UserLandingEn;