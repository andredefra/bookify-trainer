
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface AboutTabProps {
  certifications: string[];
  education: string;
}

export const AboutTab = ({ certifications, education }: AboutTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{education}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Training Approach</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            I believe in creating personalized fitness plans that fit your lifestyle and help you achieve sustainable results. 
            My approach combines strength training, cardio, and nutrition guidance to ensure comprehensive fitness development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
