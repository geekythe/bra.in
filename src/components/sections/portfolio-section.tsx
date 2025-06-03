import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AllSectionsContentData, SectionId, PortfolioProject } from '@/types';
import { ExternalLink, Github } from 'lucide-react';
import ContentOptimizer from './content-optimizer';

interface PortfolioSectionProps {
  id: SectionId;
  content: AllSectionsContentData['portfolio'];
}

export default function PortfolioSection({ id, content }: PortfolioSectionProps) {
  const contentString = `Title: ${content.title}\nHeading: ${content.heading}\nProjects:\n${content.projects.map(p => `- ${p.title}: ${p.description} (Tech: ${p.technologies.join(', ')})`).join('\n')}`;
  
  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-primary">
            {content.title}
          </h1>
          <p className="text-xl text-foreground/80 font-body">{content.heading}</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.projects.map((project: PortfolioProject) => (
            <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/30 hover:border-primary/70 bg-card">
              <div className="relative w-full h-56">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  style={{objectFit:"cover"}}
                  className="object-cover"
                  data-ai-hint={project.dataAiHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-accent">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <CardDescription className="text-foreground/70 font-body text-sm min-h-[60px]">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-secondary/70 text-secondary-foreground hover:bg-secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-start space-x-3 pt-4">
                {project.liveLink && (
                  <Button variant="outline" size="sm" asChild className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
                {project.repoLink && (
                  <Button variant="ghost" size="sm" asChild className="text-foreground/70 hover:text-primary">
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Source Code
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ContentOptimizer sectionId={id} sectionTitle={content.title} initialContent={contentString} />
        </div>
      </div>
    </div>
  );
}
