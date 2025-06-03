import type { AllSectionsContentData } from '@/types';

export const sectionsContentData: AllSectionsContentData = {
  home: {
    title: "Home",
    greeting: "SYS.INIT // Alex_vOS",
    introduction: "Full-Stack Deviant. Architecting cybernetic realities & injecting rogue code into the digital stream. Specializing in bleeding-edge tech & user-interface neuro-linking.",
    callToAction: "Interface Projects",
    featuredProject: {
      title: "Project Chimera",
      description: "A decentralized consciousness network built on quantum entanglement protocols. Next.js, Rust (WASM), and a proprietary neural net framework. Real-time psionic data flow.",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "cyberpunk city brain",
    }
  },
  about: {
    title: "About//Unit_Alex",
    heading: "Forging Digital Constructs from Pure Code & Neon Light.",
    bio: "Data ghost with 5+ cycles in the net. Augmented skills in crafting high-frequency, low-latency applications. Genesis sequence: a terminal's glow, a thirst for system mastery. Constant evolution via black market tech and forbidden knowledge. Off-grid pursuits: urban exploration, vintage hardware necromancy, and subversive data art.",
    skills: ["Neuralink.js", "QuantumScript", "React Holography", "Next.VOID", "Node.DARK", "CyberPy", "Firebase Citadel", "GraphQL Singularity", "Docker Swarm", "PulseBlade CSS"],
    experience: [
      {
        role: "Lead System Architect",
        company: "Cybereality Corp",
        duration: "Cycle 2075 - Present",
        description: "Chief architect for flagship 'Digital Soul' project. Enhanced user immersion by 40%. Mentored a cadre of code-warlocks. Spearheaded transition to psionic state management."
      },
      {
        role: "Net Runner",
        company: "Shadow Networks Ltd.",
        duration: "Cycle 2072 - 2075",
        description: "Developed and secured covert data channels for high-profile clients. Specialized in ICE penetration and data encryption. Reduced system vulnerabilities by 25%."
      }
    ],
    imageUrl: "https://placehold.co/400x400.png",
    dataAiHint: "cyberpunk hacker portrait",
  },
  blog: {
    title: "Data Streams",
    articles: [
      {
        id: "1",
        title: "The Singularity & Server Components",
        date: "October 26, 2077",
        summary: "Uploading consciousness via React Server Components: implications for Next.js sentience, performance, and the dev-entity experience.",
        imageUrl: "https://placehold.co/600x300.png",
        dataAiHint: "ai code matrix"
      },
      {
        id: "2",
        title: "QuantumScript for Interdimensional Arrays",
        date: "September 15, 2077",
        summary: "A deep dive into n-dimensional QuantumScript patterns, chrono-safety strategies, and best practices for maintaining stable multiversal codebases.",
        imageUrl: "https://placehold.co/600x300.png",
        dataAiHint: "quantum computing abstract"
      },
      {
        id: "3",
        title: "Neuro-Sympathetic UI/UX in the Cyber Age",
        date: "August 02, 2077",
        summary: "Bridging the man-machine interface: key UI/UX principles for direct neural pathways. Actionable directives for devs.",
        imageUrl: "https://placehold.co/600x300.png",
        dataAiHint: "brain interface"
      }
    ]
  },
  portfolio: {
    title: "Portfolio",
    heading: "Fabricated Realities & System Exploits",
    projects: [
      {
        id: "proj1",
        title: "Kowloon Market Sim",
        description: "Hyper-realistic simulation of a black market Kowloon sector. Features dynamic AI vendors, procedurally generated contraband, and VR integration.",
        imageUrl: "https://placehold.co/600x400.png",
        dataAiHint: "cyberpunk market neon",
        technologies: ["Unreal Engine 7", "C++", "Neural Textures", "Quantum AI"],
        liveLink: "#",
        repoLink: "#"
      },
      {
        id: "proj2",
        title: "GhostTalk Secure Comms",
        description: "End-to-end encrypted communication platform utilizing quantum-resistant algorithms and decentralized mesh networking.",
        imageUrl: "https://placehold.co/600x400.png",
        dataAiHint: "secure data stream",
        technologies: ["Rust", "WASM", "LibP2P", "Zero-Knowledge Proofs"],
        repoLink: "#"
      },
      {
        id: "proj3",
        title: "SynthWave Dream Sequencer",
        description: "A generative music and visual art application that creates immersive audiovisual experiences based on user's brainwave patterns.",
        imageUrl: "https://placehold.co/600x400.png",
        dataAiHint: "synthwave music abstract",
        technologies: ["Python", "TensorFlow", "TouchDesigner", "EEG Interface"],
        liveLink: "#",
      }
    ]
  },
  contact: {
    title: "Connect//Signal_Lost",
    heading: "Reach Out Across the Void",
    email: "alex.dev@classified.net",
    phone: "+44 [REDACTED]",
    socialLinks: [
      { platform: "LinkedIn", url: "#" },
      { platform: "GitHub", url: "#" },
      { platform: "Twitter", url: "#" },
    ]
  }
};
