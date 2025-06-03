import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AllSectionsContentData, SectionId } from '@/types';
import ContentOptimizer from './content-optimizer'; // Import ContentOptimizer

interface HomeSectionProps {
  id: SectionId; // Added id prop
  content: AllSectionsContentData['home'];
  onNavigate: (sectionId: SectionId) => void; 
}

export default function HomeSection({ id, content, onNavigate }: HomeSectionProps) {
  const contentString = `Title: ${content.title}\nGreeting: ${content.greeting}\nIntroduction: ${content.introduction}\nFeatured Project: ${content.featuredProject.title} - ${content.featuredProject.description}`;
  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/10 via-background to-background">
      <header className="max-w-3xl mb-12">
        <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 text-primary">
          {content.greeting}
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-body">
          {content.introduction}
        </p>
        <Button size="lg" onClick={() => onNavigate('blog')} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          {content.callToAction}
        </Button>
      </header>

      <section className="w-full max-w-4xl">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-foreground">Featured Project</h2>
        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">{content.featuredProject.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <Image
                src={content.featuredProject.imageUrl}
                alt={content.featuredProject.title}
                width={600}
                height={400}
                className="rounded-lg object-cover aspect-video"
                data-ai-hint={content.featuredProject.dataAiHint}
              />
            </div>
            <div className="text-left">
              <CardDescription className="text-foreground/70 font-body text-base">
                {content.featuredProject.description}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </section>
      <div className="mt-8">
        <ContentOptimizer sectionId={id} sectionTitle={content.title} initialContent={contentString} />
      </div>
    </div>
  );
}
