"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getContentImprovementSuggestions, type ContentImprovementSuggestionsInput, type ContentImprovementSuggestionsOutput } from '@/ai/flows/content-improvement-suggestions';
import { Loader2, Wand2 } from 'lucide-react';
import type { SectionId, SectionContent } from '@/types';
import { ScrollArea } from '../ui/scroll-area';

interface ContentOptimizerProps {
  sectionId: SectionId;
  sectionTitle: string;
  initialContent: string; 
}

export default function ContentOptimizer({ sectionId, sectionTitle, initialContent }: ContentOptimizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(initialContent);
  const [userFeedback, setUserFeedback] = useState('');
  const [engagementMetrics, setEngagementMetrics] = useState('');
  const [suggestions, setSuggestions] = useState<ContentImprovementSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update currentContent if initialContent changes (e.g., navigating between sections with same optimizer instance)
    setCurrentContent(initialContent);
    setSuggestions(null); // Reset suggestions when content changes
  }, [initialContent]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    const input: ContentImprovementSuggestionsInput = {
      section: sectionTitle,
      content: currentContent,
      userFeedback: userFeedback || undefined,
      engagementMetrics: engagementMetrics || undefined,
    };

    try {
      const result = await getContentImprovementSuggestions(input);
      setSuggestions(result);
    } catch (e) {
      console.error("Error getting suggestions:", e);
      setError("Failed to get suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-4 bg-primary/10 hover:bg-primary/20 text-primary border-primary/30">
          <Wand2 className="mr-2 h-4 w-4" />
          Optimize Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Content Optimizer: {sectionTitle}</DialogTitle>
          <DialogDescription>
            Get AI-powered suggestions to improve your content.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6">
        <div className="space-y-4 py-4 pr-1">
          <div>
            <Label htmlFor="currentContent" className="font-headline">Current Content</Label>
            <Textarea
              id="currentContent"
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              rows={8}
              className="mt-1 bg-background focus:ring-primary"
            />
          </div>
          <div>
            <Label htmlFor="userFeedback" className="font-headline">User Feedback (Optional)</Label>
            <Textarea
              id="userFeedback"
              value={userFeedback}
              onChange={(e) => setUserFeedback(e.target.value)}
              placeholder="e.g., 'Users find this section confusing.'"
              rows={2}
              className="mt-1 bg-background focus:ring-primary"
            />
          </div>
          <div>
            <Label htmlFor="engagementMetrics" className="font-headline">Engagement Metrics (Optional)</Label>
            <Textarea
              id="engagementMetrics"
              value={engagementMetrics}
              onChange={(e) => setEngagementMetrics(e.target.value)}
              placeholder="e.g., 'Bounce rate: 70%, Avg. time on page: 30s'"
              rows={2}
              className="mt-1 bg-background focus:ring-primary"
            />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 font-body">Generating suggestions...</p>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive font-body">{error}</p>
          )}

          {suggestions && (
            <div className="mt-6 p-4 border border-dashed border-accent rounded-md bg-accent/10">
              <h3 className="font-headline text-lg text-accent mb-2">Suggestions:</h3>
              <ul className="list-disc list-inside space-y-1 font-body text-sm text-foreground/90">
                {suggestions.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
              <h3 className="font-headline text-lg text-accent mt-4 mb-2">Reasoning:</h3>
              <p className="font-body text-sm text-foreground/90">{suggestions.reasoning}</p>
            </div>
          )}
        </div>
        </ScrollArea>
        <DialogFooter className="mt-auto pt-4 border-t">
          <DialogClose asChild>
             <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            Get Suggestions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
