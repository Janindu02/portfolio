export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  filter: "Full Stack" | "Open Source";
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  thumbnail: string;
  gallery: string[];
  github?: string;
  liveDemo?: string;
  period?: string;
  role?: string;
  teamSize?: string;
}

export const projects: Project[] = [
  {
    id: "ceylonmine",
    slug: "ceylonmine",
    title: "CeylonMine",
    category: "Full Stack",
    filter: "Full Stack",
    shortDesc:
      "Award-winning platform to digitise and streamline mining operations in Sri Lanka. Features an AI-powered chatbot, interactive mine maps, and digital permit application workflows. 2nd Runners-up at Cutting Edge 2025 with GSMB endorsement.",
    fullDesc: `CeylonMine is an award-winning, comprehensive digital platform designed to revolutionize mining operations in Sri Lanka. The platform combines cutting-edge technology with industry-specific features to streamline processes and improve efficiency.

## Key Features

**AI-Powered Chatbot**: An intelligent conversational assistant that helps operators with queries, provides guidance, and automates routine tasks.

**Interactive Mine Maps**: Real-time visualization of mine operations with interactive mapping capabilities, allowing operators to monitor activities and resources efficiently.

**Digital Permit Application Workflows**: Automated and streamlined permit application processes that reduce paperwork, minimize delays, and ensure compliance with regulations.

**Award Recognition**: Recognized as 2nd Runners-up at Cutting Edge 2025 with official endorsement from GSMB (Geological Survey and Mines Bureau), validating its impact and innovation.

## Technology Stack

Built with a modern, scalable architecture combining frontend, backend, and AI services to deliver a robust solution for mining operations.

## Impact

CeylonMine demonstrates how digital transformation can significantly improve operational efficiency in the mining sector, reducing manual processes and enhancing decision-making through data-driven insights.`,
    tags: [
      "Next.js",
      "Flask",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "ChatGPT API",
    ],
    thumbnail: "/pics/ceylonemine.png",
    gallery: [
      "/pics/ceylonmine/Picture1.png",
      "/pics/ceylonmine/Picture2.png",
      "/pics/ceylonmine/Picture3.jpg",
      "/pics/ceylonmine/Picture4.png",
      "/pics/ceylonmine/Picture5.png",
      "/pics/ceylonmine/Picture6.png",
      "/pics/ceylonmine/Picture7.png",
      "/pics/ceylonmine/Picture8.png",
      "/pics/ceylonmine/Picture9.png",
      "/pics/ceylonmine/Picture10.png",
      "/pics/ceylonmine/Picture11.png",
      "/pics/ceylonmine/Picture12.png",
      "/pics/ceylonmine/Picture14.png",
    ],
  },
  {
    id: "codinglanka",
    slug: "learning-platform",
    title: "Coding Lanka",
    category: "Open Source",
    filter: "Open Source",
    shortDesc:
      "Free, open-source software development roadmaps built for Sri Lankan learners. Provides structured learning paths from beginner fundamentals to production-ready skills.",
    fullDesc: `Coding Lanka is a comprehensive, free, and open-source platform dedicated to providing Sri Lankan learners with structured pathways to master software development.

## Mission

Making quality software engineering education accessible to everyone, regardless of background or resources. The platform serves as a bridge between complete beginners and production-ready developers.

## Learning Pathways

**Beginner Fundamentals**: Start from the basics with interactive tutorials and guided learning on core programming concepts.

**Intermediate Skills**: Progress through web development, databases, and software design patterns with hands-on projects.

**Production-Ready Skills**: Master deployment, scalability, testing, and industry best practices to build professional applications.

## Community-Driven

As an open-source project, Coding Lanka benefits from community contributions and feedback, ensuring the content remains current and relevant to market demands.

## Impact

Created to support the growing tech talent pool in Sri Lanka by providing free, high-quality learning resources that help developers build careers in the global tech industry.`,
    tags: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    thumbnail: "/pics/codinglanka.png",
    github: "https://github.com/Janindu02",
    gallery: [
      "/pics/codinglanka/photo1.jpeg",
      "/pics/codinglanka/photo2.jpeg",
      "/pics/codinglanka/photo3.jpeg",
      "/pics/codinglanka/photo4.jpeg",
      "/pics/codinglanka/photo5.jpeg",
    ],
  },
  {
    id: "plane-seat",
    slug: "plane-seat",
    title: "Plane Seat Management System",
    category: "Full Stack",
    filter: "Full Stack",
    period: "January 2025 – April 2025",
    role: "Full-Stack Developer",
    teamSize: "Solo Developer",
    shortDesc:
      "Comprehensive seat management and booking system for private aviation with real-time seat allocation, user authentication, and intuitive interfaces for passengers and administrators. Built with Java, Spring Boot, and Angular.",
    fullDesc: `A comprehensive seat management and booking system for private aviation, featuring real-time seat allocation, user authentication, and an intuitive interface for both passengers and administrators. Built with Java, Spring Boot, and Angular with advanced OOP principles and algorithms.`,
    tags: ["Java", "Spring Boot", "Angular", "MySQL", "OOP", "Algorithms", "React.js"],
    thumbnail: "/pics/myjourney/medium1.png",
    gallery: [],
    liveDemo: "#",
    github: "https://github.com/Janindu02",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
