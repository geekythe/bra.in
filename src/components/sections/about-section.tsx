import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AllSectionsContentData, SectionId } from '@/types';
import ContentOptimizer from './content-optimizer';

interface AboutSectionProps {
  id: SectionId; // Added id prop
  content: AllSectionsContentData['about'];
}

export default function AboutSection({ id, content }: AboutSectionProps) {
  const contentString = `Title: ${content.title}\nHeading: ${content.heading}\nBio: ${content.bio}\nSkills: ${content.skills.join(', ')}\nExperience: ${content.experience.map(exp => `${exp.role} at ${exp.company} (${exp.duration}): ${exp.description}`).join('\n')}`;
  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-primary">
            {content.title}
          </h1>
          <p className="text-xl text-foreground/80 font-body">{content.heading}</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12 items-start">
          <div className="md:col-span-1 flex justify-center">
            <Image
              src={content.imageUrl}
              alt="Portrait of Alex"
              width={300}
              height={300}
              className="rounded-full object-cover shadow-lg aspect-square"
              data-ai-hint={content.dataAiHint}
            />
          </div>
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-accent">Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 font-body leading-relaxed">{content.bio}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-headline font-semibold mb-6 text-center text-primary">Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {content.skills.map(skill => (
              <Badge key={skill} variant="secondary" className="text-sm px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-headline font-semibold mb-8 text-center text-primary">Experience</h2>
          <div className="space-y-8">
            {content.experience.map((exp, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-accent">{exp.role} at {exp.company}</CardTitle>
                  <p className="text-sm text-muted-foreground">{exp.duration}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 font-body">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <div className="mt-8 text-center">
          <ContentOptimizer sectionId={id} sectionTitle={content.title} initialContent={contentString} />
        </div>
      </div>
    </div>
  );
}
