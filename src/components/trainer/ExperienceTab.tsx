
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceTabProps {
  experience: Experience[];
}

export const ExperienceTab = ({ experience }: ExperienceTabProps) => {
  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{exp.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {exp.company} | {exp.period}
            </div>
          </CardHeader>
          <CardContent>
            <p>{exp.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
