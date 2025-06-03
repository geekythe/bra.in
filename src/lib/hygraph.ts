
// Hygraph API client for fetching data

const API_URL = "https://us-west-2.cdn.hygraph.com/content/cm9pvby8t01wm07wcm0lwwf5u/master"

/**
 * Fetch data from Hygraph CMS
 */
export async function fetchHygraph<T>(query: string): Promise<T | null> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 }, // Revalidate every minute
    })

    if (!response.ok) {
      console.error(`Hygraph API Error: ${response.status} ${response.statusText} for query: ${query.substring(0,100)}...`);
      if (response.status === 429) {
        console.error("Hygraph API rate limit exceeded. Data may be incomplete. Please try again later or optimize queries.");
      }
      return null;
    }

    const responseBody = await response.json();
    const { data, errors } = responseBody;

    if (errors) {
      console.error("Hygraph GraphQL errors:", errors, `for query: ${query.substring(0,100)}...`);
      return null;
    }

    return data as T;
  } catch (error) {
    console.error("Network or other error fetching data from Hygraph:", error, `for query: ${query.substring(0,100)}...`);
    return null;
  }
}

// Resume section queries
export async function getWorkHistory(): Promise<WorkHistory[]> {
  const query = `
    query WorkHistory {
      works {
        date
        title
        company
        description
      }
    }
  `

  const data = await fetchHygraph<{ works: WorkHistory[] }>(query);
  return data ? data.works : [];
}

export async function getEducation(): Promise<Education[]> {
  const query = `
    query Education {
      educations {
        date
        title
        institution
        description
      }
    }
  `

  const data = await fetchHygraph<{ educations: Education[] }>(query);
  return data ? data.educations : [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const query = `
    query Testimonials {
      testimonials {
        name
        position
        image {
          url
        }
        text
      }
    }
  `

  const data = await fetchHygraph<{ testimonials: Testimonial[] }>(query);
  return data ? data.testimonials : [];
}

export async function getDesignSkills(): Promise<Skill[]> {
  const query = `
    query DesignSkills {
      designskills {
        name
        percentage
      }
    }
  `

  const data = await fetchHygraph<{ designskills: Skill[] }>(query);
  return data ? data.designskills : [];
}

export async function getCodingSkills(): Promise<Skill[]> {
  const query = `
    query CodingSkills {
      codingskills {
        name
        percentage
      }
    }
  `

  const data = await fetchHygraph<{ codingskills: Skill[] }>(query);
  return data ? data.codingskills : [];
}

// Portfolio section queries
export async function getPortfolioProjects(): Promise<PortfolioProjectHygraph[]> {
  const query = `
    query PortfolioProjects {
      portfolios {
        number
        title
        subtitle
        category {
          pcategory
        }
        image {
          url
        }
        description
        technology {
          techused
        }
      }
      portfolio2s {
        number
        title
        subtitle
        category {
          pcategory
        }
        image {
          url
        }
        description
        technology {
          techused
        }
      }
      portfolio3s {
        number
        title
        subtitle
        category {
          pcategory
        }
        image {
          url
        }
        description
        technology {
          techused
        }
      }
    }
  `;

  try {
    const result = await fetchHygraph<{
      portfolios: PortfolioProjectHygraph[];
      portfolio2s: PortfolioProjectHygraph[];
      portfolio3s: PortfolioProjectHygraph[];
    }>(query);

    if (!result) return [];

    const allProjects: PortfolioProjectHygraph[] = [
      ...(result.portfolios || []),
      ...(result.portfolio2s || []),
      ...(result.portfolio3s || []),
    ];

    const projectsWithSource = allProjects.map((project, index) => ({
      ...project,
      uniqueId: `${project.number || project.title}-${index}`,
      source:
        index < (result.portfolios?.length || 0)
          ? "portfolios"
          : index < (result.portfolios?.length || 0) + (result.portfolio2s?.length || 0)
            ? "portfolio2s"
            : "portfolio3s",
    }));

    return projectsWithSource;
  } catch (error) {
    console.error("Error processing portfolio projects after fetch:", error);
    return []; // Return empty array on processing error
  }
}


// Combined Certifications section queries - Fetch from all three models
export async function getCertifications(): Promise<CertificationHygraph[]> {
  const query = `
    query AllCertifications {
      certifications {
        order
        title
        issuer
        date
        category
        image {
          url
        }
        description
        credentialId
        credentialurl
        details
        skill {
          techused
        }
      }
      certification2s {
        order
        title
        issuer
        date
        category
        image {
          url
        }
        description
        credentialId
        credentialurl
        details
        skill {
          techused
        }
      }
      certification3s {
        order
        title
        issuer
        date
        category
        image {
          url
        }
        description
        credentialId
        credentialurl
        details
        skill {
          techused
        }
      }
    }
  `

  try {
    const result = await fetchHygraph<{
      certifications: CertificationHygraph[];
      certification2s: CertificationHygraph[];
      certification3s: CertificationHygraph[];
    }>(query);

    if(!result) return [];

    const allCertifications: CertificationHygraph[] = [
      ...(result.certifications || []),
      ...(result.certification2s || []),
      ...(result.certification3s || []),
    ];

    const certificationsWithSource = allCertifications.map((cert, index) => ({
      ...cert,
      uniqueId: `${cert.credentialId || cert.title}-${index}`, 
      source:
        index < (result.certifications?.length || 0)
          ? "certifications"
          : index < (result.certifications?.length || 0) + (result.certification2s?.length || 0)
            ? "certification2s"
            : "certification3s",
    }));

    return certificationsWithSource;
  } catch (error) {
    console.error("Error processing certifications after fetch:", error);
    return []; // Return empty array on processing error
  }
}

// Blog section queries
export async function getBlogs(): Promise<BlogHygraph[]> {
  const query = `
    query Blogs {
      blogs {
        order
        title
        excerpt
        date {
          day
          month
        }
        category
        image {
          url
        }
        content {
          html
        }
        tags {
          techused
        }
      }
    }
  `

  const data = await fetchHygraph<{ blogs: BlogHygraph[] }>(query);
  return data ? data.blogs : [];
}

// About section queries
export async function getAboutServices(): Promise<AboutService[]> {
  const query = `
    query AboutServices {
      aboutServices {
        description
        service {
          title
          icon {
            url
          }
        }
      }
    }
  `

  const data = await fetchHygraph<{ aboutServices: AboutService[] }>(query);
  return data ? data.aboutServices : [];
}

export async function getAboutClients(): Promise<AboutClient[]> {
  const query = `
    query AboutClients {
      aboutClients {
        client {
          title
          icon {
            url
          }
        }
      }
    }
  `

  const data = await fetchHygraph<{ aboutClients: AboutClient[] }>(query);
  return data ? data.aboutClients : [];
}

// Type definitions
export interface WorkHistory {
  date: string
  title: string
  company: string
  description: string
}

export interface Education {
  date: string
  title: string
  institution: string
  description: string
}

export interface Testimonial {
  name: string
  position: string
  image: {
    url: string
  }
  text: string
}

export interface Skill {
  name: string
  percentage: number
}

export interface PortfolioCategoryHygraph {
  pcategory: string;
}
export interface PortfolioTechnologyHygraph {
  techused: string;
}

export interface PortfolioProjectHygraph {
  number: number;
  title: string;
  subtitle: string;
  category: PortfolioCategoryHygraph[] | PortfolioCategoryHygraph; // Can be an array or single object
  image?: {
    url: string;
  };
  description: string;
  technology?: PortfolioTechnologyHygraph[];
  uniqueId?: string;
  source?: string;
}


export interface CertificationSkillHygraph {
  techused: string;
}
export interface CertificationHygraph {
  order?: number;
  title: string;
  issuer: string;
  date: string;
  category: string | string[]; // Can be string or array of strings
  image?: {
    url: string;
  };
  description: string;
  credentialId: string;
  credentialurl?: string;
  details?: string;
  skill?: CertificationSkillHygraph[];
  uniqueId?: string;
  source?: string;
}

export interface BlogTagHygraph {
  techused: string;
}
export interface BlogDateHygraph {
  day: number;
  month: string;
}
export interface BlogHygraph {
  order?: number; // Make order optional as it might not always be present
  title: string;
  excerpt?: string; // Make excerpt optional
  date: BlogDateHygraph;
  category: string;
  image: {
    url: string;
  };
  content: {
    html: string;
  };
  tags: BlogTagHygraph[];
}


export interface AboutService {
  description: string
  service: {
    title: string
    icon: {
      url: string
    }
  }
}

export interface AboutClient {
  client: {
    title: string
    icon: {
      url: string
    }
  }
}

