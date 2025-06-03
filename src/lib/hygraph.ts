// Hygraph API client for fetching data

const API_URL = "https://us-west-2.cdn.hygraph.com/content/cm9pvby8t01wm07wcm0lwwf5u/master"

/**
 * Fetch data from Hygraph CMS
 */
export async function fetchHygraph<T>(query: string): Promise<T> {
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
      throw new Error(`Failed to fetch data: ${response.status}`)
    }

    const { data, errors } = await response.json()

    if (errors) {
      console.error("GraphQL errors:", errors)
      throw new Error(`GraphQL errors: ${errors.map((e: any) => e.message).join(", ")}`)
    }

    return data as T
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error)
    throw error
  }
}

// Resume section queries
export async function getWorkHistory() {
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

  const data = await fetchHygraph<{ works: WorkHistory[] }>(query)
  return data.works
}

export async function getEducation() {
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

  const data = await fetchHygraph<{ educations: Education[] }>(query)
  return data.educations
}

export async function getTestimonials() {
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

  const data = await fetchHygraph<{ testimonials: Testimonial[] }>(query)
  return data.testimonials
}

export async function getDesignSkills() {
  const query = `
    query DesignSkills {
      designskills {
        name
        percentage
      }
    }
  `

  const data = await fetchHygraph<{ designskills: Skill[] }>(query)
  return data.designskills
}

export async function getCodingSkills() {
  const query = `
    query CodingSkills {
      codingskills {
        name
        percentage
      }
    }
  `

  const data = await fetchHygraph<{ codingskills: Skill[] }>(query)
  return data.codingskills
}

// Portfolio section queries
export async function getPortfolioProjects() {
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
    const data = await fetchHygraph<{
      portfolios: PortfolioProjectHygraph[];
      portfolio2s: PortfolioProjectHygraph[];
      portfolio3s: PortfolioProjectHygraph[];
    }>(query);

    const allProjects: PortfolioProjectHygraph[] = [
      ...(data.portfolios || []),
      ...(data.portfolio2s || []),
      ...(data.portfolio3s || []),
    ];

    const projectsWithSource = allProjects.map((project, index) => ({
      ...project,
      uniqueId: `${project.number || project.title}-${index}`,
      source:
        index < (data.portfolios?.length || 0)
          ? "portfolios"
          : index < (data.portfolios?.length || 0) + (data.portfolio2s?.length || 0)
            ? "portfolio2s"
            : "portfolio3s",
    }));

    return projectsWithSource;
  } catch (error) {
    console.error("Error in getPortfolioProjects:", error);
    throw error;
  }
}


// Combined Certifications section queries - Fetch from all three models
export async function getCertifications() {
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
    const data = await fetchHygraph<{
      certifications: CertificationHygraph[];
      certification2s: CertificationHygraph[];
      certification3s: CertificationHygraph[];
    }>(query)

    const allCertifications: CertificationHygraph[] = [
      ...(data.certifications || []),
      ...(data.certification2s || []),
      ...(data.certification3s || []),
    ]

    const certificationsWithSource = allCertifications.map((cert, index) => ({
      ...cert,
      uniqueId: `${cert.credentialId || cert.title}-${index}`, 
      source:
        index < (data.certifications?.length || 0)
          ? "certifications"
          : index < (data.certifications?.length || 0) + (data.certification2s?.length || 0)
            ? "certification2s"
            : "certification3s",
    }))

    return certificationsWithSource
  } catch (error) {
    console.error("Error in getCertifications:", error)
    throw error
  }
}

// Blog section queries
export async function getBlogs() {
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

  const data = await fetchHygraph<{ blogs: BlogHygraph[] }>(query)
  return data.blogs
}

// About section queries
export async function getAboutServices() {
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

  const data = await fetchHygraph<{ aboutServices: AboutService[] }>(query)
  return data.aboutServices
}

export async function getAboutClients() {
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

  const data = await fetchHygraph<{ aboutClients: AboutClient[] }>(query)
  return data.aboutClients
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
