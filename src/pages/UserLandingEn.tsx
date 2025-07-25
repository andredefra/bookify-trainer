import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Brain, 
  Dumbbell, 
  TrendingUp, 
  Smartphone, 
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

const UserLandingEn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Train body and mind, with Trainer.ai.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your new virtual personal trainer is ready to listen to you.
            Create custom workout plans, receive nutritional advice and track your progress. All starting from €1/month. No PT required.
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            🟦 Start Now – Free or €1/month
          </Button>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Who is this app for?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you're a beginner or already experienced, Trainer.ai helps you build a program that suits you.
              Workouts, goals, progress tracking. Everything in one app, without needing a personal trainer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Beginners</h3>
              <p className="text-muted-foreground">Start your fitness journey with guided programs and expert advice</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Intermediate</h3>
              <p className="text-muted-foreground">Level up your training with personalized programs and progress tracking</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Advanced</h3>
              <p className="text-muted-foreground">Optimize your performance with AI-powered insights and analysis</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What you can do:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Talk with Trainer.ai, our virtual coach</h3>
                <p className="text-muted-foreground text-sm">Get personalized guidance and motivation whenever you need it</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Get a custom workout plan in seconds</h3>
                <p className="text-muted-foreground text-sm">AI-generated programs tailored to your goals and fitness level</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Track your workouts and measurements</h3>
                <p className="text-muted-foreground text-sm">Monitor progress with detailed analytics and visualizations</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Integrate Apple Health / Google Fit / Fitbit</h3>
                <p className="text-muted-foreground text-sm">Sync your data across all your favorite health apps</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Get training and nutrition advice</h3>
                <p className="text-muted-foreground text-sm">Expert recommendations powered by advanced AI algorithms</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Mobile-optimized experience</h3>
                <p className="text-muted-foreground text-sm">Access your trainer anytime, anywhere on any device</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Why we do this?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We created MyPersonal.fit to revolutionize the way people train.
            This is the gateway for everyone: an artificial intelligence by your side, every day.
            And if one day you want to work with a real coach, there will already be a world ready to welcome you.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="p-6">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">AI-Powered Guidance</h3>
              <p className="text-muted-foreground">Experience the future of fitness with our advanced AI trainer that learns and adapts to your needs</p>
            </Card>

            <Card className="p-6">
              <Smartphone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Always Accessible</h3>
              <p className="text-muted-foreground">Your virtual trainer is available 24/7, ready to help you achieve your fitness goals</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pricing
          </h2>
          
          <Card className="p-8 max-w-md mx-auto">
            <Badge className="mb-4 bg-green-500 text-white">🎯 Launch Price</Badge>
            <div className="text-4xl font-bold mb-2">Free or €1/month</div>
            <p className="text-muted-foreground mb-6">No credit card required to start</p>
            
            <div className="space-y-3 text-left mb-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Unlimited access to Trainer.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Custom workout plans</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Progress tracking & analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Health app integrations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Nutrition guidance</span>
              </div>
            </div>
            
            <Button className="w-full" size="lg">
              Start for Free
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UserLandingEn;