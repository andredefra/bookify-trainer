
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutTab } from "@/components/trainer/AboutTab";
import { ExperienceTab } from "@/components/trainer/ExperienceTab";
import { ReviewsTab } from "@/components/trainer/ReviewsTab";
import { AvailabilityTab } from "@/components/trainer/AvailabilityTab";
import { Trainer, Testimonial } from "@/data/trainerMockData";

interface TabsSectionProps {
  trainer: Trainer;
  testimonials: Testimonial[];
  onBookSession: () => void;
}

export const TabsSection = ({ trainer, testimonials, onBookSession }: TabsSectionProps) => {
  return (
    <Tabs defaultValue="about" className="mb-12">
      <TabsList className="mb-6">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="availability">Availability</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about">
        <AboutTab certifications={trainer.certifications} education={trainer.education} />
      </TabsContent>
      
      <TabsContent value="experience">
        <ExperienceTab experience={trainer.experience} />
      </TabsContent>
      
      <TabsContent value="reviews">
        <ReviewsTab testimonials={testimonials} />
      </TabsContent>
      
      <TabsContent value="availability">
        <AvailabilityTab 
          availability={trainer.availability}
          trainerName={trainer.name}
          onViewCalendar={onBookSession}
        />
      </TabsContent>
    </Tabs>
  );
};
