import type { AllSectionsContentData } from '@/types';

export const sectionsContentData: AllSectionsContentData = {
  home: {
    title: "Home",
    greeting: "Hello, I'm Alex.",
    introduction: "A passionate Full-Stack Developer creating seamless and engaging digital experiences. I specialize in modern web technologies and user-centric design.",
    callToAction: "Explore My Work",
    featuredProject: {
      title: "Project Nova",
      description: "An innovative platform for collaborative design, built with Next.js, TypeScript, and Firebase. Featuring real-time updates and a component-based architecture.",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "technology abstract",
    }
  },
  about: {
    title: "About Me",
    heading: "Crafting Digital Solutions with Precision and Passion.",
    bio: "With over 5 years in web development, I've honed my skills in creating responsive, high-performance applications. My journey began with a fascination for how code can transform ideas into reality, and this curiosity continues to drive me. I believe in lifelong learning and constantly explore new technologies to enhance my toolkit. Outside of coding, I enjoy hiking, photography, and contributing to open-source projects.",
    skills: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Node.js", "Python", "Firebase", "GraphQL", "Docker", "Tailwind CSS"],
    experience: [
      {
        role: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        duration: "2021 - Present",
        description: "Led the development of key features for a major e-commerce platform, improving user engagement by 20%. Mentored junior developers and spearheaded the adoption of a new state management library."
      },
      {
        role: "Software Engineer",
        company: "Innovate Co.",
        duration: "2018 - 2021",
        description: "Developed and maintained full-stack applications for various clients, focusing on API design and database optimization. Contributed to a 15% reduction in server response times."
      }
    ],
    imageUrl: "https://placehold.co/400x400.png",
    dataAiHint: "professional portrait",
  },
  blog: {
    title: "Blog",
    articles: [
      {
        id: "1",
        title: "The Future of Server Components in Next.js",
        date: "October 26, 2023",
        summary: "Exploring the paradigm shift brought by React Server Components and their impact on Next.js development, performance, and developer experience.",
        imageUrl: "https://placehold.co/600x300.png",
        dataAiHint: "coding future"
      },
      {
        id: "2",
        title: "Mastering TypeScript for Large-Scale Applications",
        date: "September 15, 2023",
        summary: "A deep dive into advanced TypeScript patterns, type safety strategies, and best practices for maintaining a robust codebase in large projects.",
        imageUrl: "https://placehold.co/600x300.png",
        dataAiHint: "typescript code"
      },
      {
        id: "3",
        title: "Effective UI/UX Principles for Developers",
        date: "August 02, 2023",
        summary: "Understanding key UI/UX principles can significantly elevate the quality of applications. This article covers actionable tips for developers.",
        imageUrl: "https://placehold.co/600x300.png",
        dataAiHint: "ui design"
      }
    ]
  },
  contact: {
    title: "Contact",
    heading: "Let's Connect",
    email: "alex.developer@example.com",
    phone: "+1 (555) 123-4567",
    socialLinks: [
      { platform: "LinkedIn", url: "#" },
      { platform: "GitHub", url: "#" },
      { platform: "Twitter", url: "#" },
    ]
  }
};
