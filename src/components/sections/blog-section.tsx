import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { AllSectionsContentData, SectionId } from '@/types';
import { ArrowRight } from 'lucide-react';
import ContentOptimizer from './content-optimizer';

interface BlogSectionProps {
  id: SectionId; // Added id prop
  content: AllSectionsContentData['blog'];
}

export default function BlogSection({ id, content }: BlogSectionProps) {
  const contentString = `Title: ${content.title}\nArticles:\n${content.articles.map(article => `- ${article.title}: ${article.summary}`).join('\n')}`;
  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 bg-background">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-primary">
            {content.title}
          </h1>
          <p className="text-lg text-foreground/70 font-body">Insights, tutorials, and thoughts on web development and technology.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.articles.map(article => (
            <Card key={article.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  style={{objectFit:"cover"}}
                  className="object-cover"
                  data-ai-hint={article.dataAiHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-accent">{article.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">{article.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/80 font-body text-sm">{article.summary}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="text-primary p-0 hover:text-accent">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
