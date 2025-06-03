'use server';

/**
 * @fileOverview An AI agent for providing content improvement suggestions for a portfolio.
 *
 * - getContentImprovementSuggestions - A function that generates content improvement suggestions.
 * - ContentImprovementSuggestionsInput - The input type for the getContentImprovementSuggestions function.
 * - ContentImprovementSuggestionsOutput - The return type for the getContentImprovementSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentImprovementSuggestionsInputSchema = z.object({
  section: z
    .string()
    .describe('The section of the portfolio to improve (e.g., Home, About, Blog, Contact).'),
  content: z.string().describe('The current content of the section.'),
  userFeedback: z
    .string()
    .optional()
    .describe('Optional user feedback on the content.'),
  engagementMetrics: z
    .string()
    .optional()
    .describe('Optional engagement metrics for the content (e.g., bounce rate, time on page).'),
});
export type ContentImprovementSuggestionsInput = z.infer<
  typeof ContentImprovementSuggestionsInputSchema
>;

const ContentImprovementSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggestions for improving the content.'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the suggestions provided.'),
});
export type ContentImprovementSuggestionsOutput = z.infer<
  typeof ContentImprovementSuggestionsOutputSchema
>;

export async function getContentImprovementSuggestions(
  input: ContentImprovementSuggestionsInput
): Promise<ContentImprovementSuggestionsOutput> {
  return contentImprovementSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentImprovementSuggestionsPrompt',
  input: {schema: ContentImprovementSuggestionsInputSchema},
  output: {schema: ContentImprovementSuggestionsOutputSchema},
  prompt: `You are an AI expert in portfolio content optimization. Provide specific, actionable suggestions for improving the content of the portfolio section based on the current content, user feedback, and engagement metrics.

Portfolio Section: {{{section}}}
Current Content: {{{content}}}
User Feedback: {{{userFeedback}}}
Engagement Metrics: {{{engagementMetrics}}}

Provide the suggestions and your reasoning behind them. Focus on improvements related to clarity, engagement, and effectiveness.
`,
});

const contentImprovementSuggestionsFlow = ai.defineFlow(
  {
    name: 'contentImprovementSuggestionsFlow',
    inputSchema: ContentImprovementSuggestionsInputSchema,
    outputSchema: ContentImprovementSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
