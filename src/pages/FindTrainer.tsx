
import { useState, useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, MapPin, Star, Calendar } from "lucide-react";

const FindTrainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock trainer data
  const trainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Strength Training",
      location: "New York, NY",
      rating: 4.9,
      reviews: 124,
      price: "€50",
      availability: "Available today",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Michael Thompson",
      specialty: "HIIT Workouts",
      location: "Los Angeles, CA",
      rating: 4.7,
      reviews: 98,
      price: "€45",
      availability: "Available tomorrow",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Emma Davis",
      specialty: "Yoga Instructor",
      location: "Chicago, IL",
      rating: 4.8,
      reviews: 156,
      price: "€40",
      availability: "Available today",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "James Wilson",
      specialty: "Nutrition Coach",
      location: "Austin, TX",
      rating: 4.6,
      reviews: 87,
      price: "€60",
      availability: "Available this week",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-primary mb-6">
              Find Your Perfect Personal Trainer
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse top trainers in your area and book sessions directly through our platform.
            </p>
          </div>
          
          {/* Search and filter */}
          <div className="glass rounded-xl p-6 mb-10 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search for trainers or specialties"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
          
          {/* Trainer results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${trainer.image})` }}></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{trainer.name}</h3>
                  <p className="text-muted-foreground text-sm">{trainer.specialty}</p>
                  
                  <div className="flex items-center mt-3 text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">{trainer.location}</span>
                  </div>
                  
                  <div className="flex items-center mt-2 text-sm">
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <span>{trainer.rating}</span>
                    <span className="text-muted-foreground ml-1">({trainer.reviews} reviews)</span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold">{trainer.price}/session</span>
                    <div className="flex items-center text-sm text-emerald-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{trainer.availability}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 py-2 bg-primary text-white rounded-lg font-medium button-hover">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindTrainer;
