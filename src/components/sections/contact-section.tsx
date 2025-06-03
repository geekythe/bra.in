import { Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react';
import ContactForm from './contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AllSectionsContentData, SectionId } from '@/types';
import ContentOptimizer from './content-optimizer';

interface ContactSectionProps {
  id: SectionId; // Added id prop
  content: AllSectionsContentData['contact'];
}

const iconMap: { [key: string]: React.ElementType } = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Twitter: Twitter,
};

export default function ContactSection({ id, content }: ContactSectionProps) {
  const contentString = `Title: ${content.title}\nHeading: ${content.heading}\nEmail: ${content.email}\nPhone: ${content.phone}`;
  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-primary">
            {content.title}
          </h1>
          <p className="text-xl text-foreground/80 font-body">{content.heading}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-primary" />
                <a href={`mailto:${content.email}`} className="font-body text-foreground/90 hover:text-primary transition-colors">
                  {content.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-primary" />
                <span className="font-body text-foreground/90">{content.phone}</span>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-headline text-lg text-accent mb-3">Follow Me</h3>
                <div className="flex space-x-4">
                  {content.socialLinks.map(link => {
                    const IconComponent = iconMap[link.platform];
                    return (
                      <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}
                         className="text-muted-foreground hover:text-primary transition-colors">
                        {IconComponent && <IconComponent className="h-7 w-7" />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <ContentOptimizer sectionId={id} sectionTitle={content.title} initialContent={contentString} />
        </div>
      </div>
    </div>
  );
}
