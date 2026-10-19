// Offline constructed source representation, not a captured API response.
// Never import from a browser entry. All original representative revisions remain draft.
export type SourceEntry = Readonly<{
  sys: Readonly<{ id: string; type: 'Entry'; contentType: Readonly<{ sys: Readonly<{ type: 'Link'; linkType: 'ContentType'; id: string }> }> }>;
  fields: Readonly<Record<string, Readonly<Record<string, unknown>>>>;
}>;
export type SourceAsset = Readonly<{ sys: Readonly<{ id: string; type: 'Asset' }>; fields: Readonly<Record<string, Readonly<Record<string, unknown>>>> }>;
export const representativeEntries = [{
  "sys": {
    "id": "seed05-site-settings-primary",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "siteSettings"
      }
    }
  },
  "fields": {
    "siteName": {
      "en-US": "Gilberto Haro"
    },
    "siteDescription": {
      "en-US": "Web engineer focused on resilient interfaces, structured content systems, CMS operations, and thoughtful digital experiences."
    },
    "primaryNavigationItems": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-about"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-work"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-projects"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-writing"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-tools"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-contact"
        }
      }]
    },
    "footerNavigationItems": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-about"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-projects"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-writing"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-navigation-item-contact"
        }
      }]
    },
    "socialLinks": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-social-link-linkedin"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-social-link-github"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-person-profile-gilberto-haro",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "personProfile"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Gilberto Alejandro Haro"
    },
    "primaryTitle": {
      "en-US": "Web Content & Marketing Technologist"
    },
    "positioningStatement": {
      "en-US": "Building scalable interfaces and content systems for modern web experiences."
    },
    "shortBio": {
      "en-US": "Web content and marketing technologist with experience across enterprise website operations, CMS/DXP publishing, frontend implementation, content migration, metadata governance, localization, QA, and workflow optimization."
    },
    "longBio": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Gilberto's path into web technology grew from creative media and photography into frontend development, CMS operations, and content systems. Work with digital tools led to structured web-development study and professional roles in website delivery.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "His experience spans enterprise website operations, CMS publishing, frontend implementation, content migration, metadata governance, localization, content QA, and workflow optimization. His work includes Adobe Experience Manager and WordPress operations, alongside Contentful modeling and governance in the Greenfield Starter project.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "His project work connects semantic content contracts with reusable interfaces: the Contentful Greenfield Starter establishes a governed CMS model, while UI Gallery System develops a Storybook-centered UI workspace before CMS integration.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "profileImage": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-profile-portrait"
        }
      }
    },
    "location": {
      "en-US": "San Jose, California"
    },
    "availabilityStatus": {
      "en-US": "Open to relevant web, content systems, CMS operations, and frontend opportunities."
    },
    "workPreference": {
      "en-US": "Open to remote and hybrid opportunities in frontend engineering, CMS/content systems, and web operations."
    },
    "contactIntro": {
      "en-US": "Interested in web platforms, content systems, or bringing more structure to a marketing site? I'm open to relevant roles and collaborations."
    },
    "resume": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-resume-public"
        }
      }
    },
    "learningHighlights": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Current public materials describe an ongoing learning path across frontend engineering, content systems, component architecture, design systems, Contentful, AEM, AI-assisted workflows, and technical publishing.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "socialLinks": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-social-link-linkedin"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-social-link-github"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-social-link-linkedin",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "socialLink"
      }
    }
  },
  "fields": {
    "platform": {
      "en-US": "linkedin"
    },
    "label": {
      "en-US": "LinkedIn"
    },
    "url": {
      "en-US": "https://www.linkedin.com/in/gilbertoharo/"
    },
    "sortOrder": {
      "en-US": 1
    }
  }
}, {
  "sys": {
    "id": "seed05-social-link-github",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "socialLink"
      }
    }
  },
  "fields": {
    "platform": {
      "en-US": "github"
    },
    "label": {
      "en-US": "GitHub"
    },
    "url": {
      "en-US": "https://github.com/gah-code"
    },
    "sortOrder": {
      "en-US": 2
    }
  }
}, {
  "sys": {
    "id": "seed05-navigation-item-about",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "navigationItem"
      }
    }
  },
  "fields": {
    "label": {
      "en-US": "About"
    },
    "routeKey": {
      "en-US": "about"
    },
    "description": {
      "en-US": "Professional story, positioning, and working approach."
    }
  }
}, {
  "sys": {
    "id": "seed05-navigation-item-work",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "navigationItem"
      }
    }
  },
  "fields": {
    "label": {
      "en-US": "Work"
    },
    "routeKey": {
      "en-US": "work"
    },
    "description": {
      "en-US": "Professional experience and delivery context."
    }
  }
}, {
  "sys": {
    "id": "seed05-navigation-item-projects",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "navigationItem"
      }
    }
  },
  "fields": {
    "label": {
      "en-US": "Projects"
    },
    "routeKey": {
      "en-US": "projects"
    },
    "description": {
      "en-US": "Selected case studies and technical projects."
    }
  }
}, {
  "sys": {
    "id": "seed05-navigation-item-writing",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "navigationItem"
      }
    }
  },
  "fields": {
    "label": {
      "en-US": "Writing"
    },
    "routeKey": {
      "en-US": "writing"
    },
    "description": {
      "en-US": "Articles on frontend engineering, content systems, and professional learning."
    }
  }
}, {
  "sys": {
    "id": "seed05-navigation-item-tools",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "navigationItem"
      }
    }
  },
  "fields": {
    "label": {
      "en-US": "Tools"
    },
    "routeKey": {
      "en-US": "tools"
    },
    "description": {
      "en-US": "Platforms, frameworks, and tools used in practical work."
    }
  }
}, {
  "sys": {
    "id": "seed05-navigation-item-contact",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "navigationItem"
      }
    }
  },
  "fields": {
    "label": {
      "en-US": "Contact"
    },
    "routeKey": {
      "en-US": "contact"
    },
    "description": {
      "en-US": "Professional contact and collaboration information."
    }
  }
}, {
  "sys": {
    "id": "seed05-project-enterprise-cms-migration",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "project"
      }
    }
  },
  "fields": {
    "title": {
      "en-US": "Multi-Country Drupal to Adobe Experience Manager Migration"
    },
    "slug": {
      "en-US": "enterprise-cms-migration"
    },
    "summary": {
      "en-US": "Supported a multi-country Drupal-to-AEM migration involving 30,000+ content items through content mapping, metadata validation, redirects, publishing standards, QA, and workflow improvements."
    },
    "projectType": {
      "en-US": "migration-replatforming"
    },
    "role": {
      "en-US": "Marketing Web Developer supporting content migration and web production at Robert Half International."
    },
    "problem": {
      "en-US": "Prepare and validate website content for a multi-country transition from Drupal to Adobe Experience Manager."
    },
    "approach": {
      "en-US": "Supported content mapping, metadata validation, redirects, publishing standards, and migration QA. Performed cross-device UAT and reviewed accessibility, SEO, responsive behavior, and launch readiness."
    },
    "outcome": {
      "en-US": "Improved web production throughput through semi-automated tracking, standardized handoffs, and clearer task visibility, helping advance the content migration timeline by six months."
    },
    "caseStudyBody": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "The migration work combined structured content preparation with website production and review. Contributions included content audits, component-based authoring, migration validation, testing, and launch-readiness activities.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Cross-device UAT identified usability, accessibility, SEO, redirect, functional, responsive, and performance issues before launch. Issue tracking and standardized handoffs supported coordination across the work.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "The work connected content quality checks with production coordination, using clearer task visibility and handoffs to support migration delivery.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "heroImage": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-project-enterprise-cms-migration"
        }
      }
    },
    "galleryImages": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-project-system-diagram"
        }
      }]
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-content-migration"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-web-qa-uat"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-seo-metadata-governance"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-accessibility-wcag"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-localization"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-technical-documentation-governance"
        }
      }]
    },
    "tools": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-adobe-experience-manager"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-project-contentful-greenfield-starter",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "project"
      }
    }
  },
  "fields": {
    "title": {
      "en-US": "Contentful Greenfield Starter"
    },
    "slug": {
      "en-US": "contentful-greenfield-starter"
    },
    "summary": {
      "en-US": "A production-minded Contentful architecture project centered on semantic modeling, migration-driven schema governance, safe environment workflows, editorial QA, deterministic recovery, and CMS-agnostic frontend boundaries."
    },
    "projectType": {
      "en-US": "cms-architecture"
    },
    "role": {
      "en-US": "Semantic content modeling, migration governance, and CMS workflow documentation."
    },
    "problem": {
      "en-US": "Establish a structured, governed Contentful model for a personal website before frontend integration."
    },
    "approach": {
      "en-US": "Define content and route contracts, implement a version-controlled model migration, verify recovery, and document editorial QA and phase approval gates."
    },
    "outcome": {
      "en-US": "The semantic model was frozen as v1.0.0 after Phase 04 with zero material model drift. Exhaustive live editorial QA was not completed and remains documented debt."
    },
    "caseStudyBody": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "The project demonstrates an enterprise-style operating model for a personal Contentful implementation: requirements and route contracts first, semantic content modeling, version-controlled migration, model portability, clean-room recovery, editorial QA, and evidence-based phase gates.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "The current model has been frozen as v1.0.0 after Phase 04.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "heroImage": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-project-contentful-greenfield-starter"
        }
      }
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-content-modeling"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-content-migration"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-workflow-automation"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-api-integration"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-technical-documentation-governance"
        }
      }]
    },
    "tools": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-contentful"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-project-ui-gallery-system",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "project"
      }
    }
  },
  "fields": {
    "title": {
      "en-US": "UI Gallery System"
    },
    "slug": {
      "en-US": "ui-gallery-system"
    },
    "summary": {
      "en-US": "A UI-first, Storybook-centered frontend design-system project built through foundations, layout patterns, reusable components, sections, responsive refinement, and gallery/demo surfaces before CMS integration."
    },
    "projectType": {
      "en-US": "case-study"
    },
    "role": {
      "en-US": "Frontend component and design-system development in a Storybook-centered workspace."
    },
    "problem": {
      "en-US": "Stabilize reusable UI components and interface contracts before Contentful integration."
    },
    "approach": {
      "en-US": "Use Storybook as the UI workspace for foundations, layout patterns, reusable components, responsive refinement, and static data-shape planning."
    },
    "outcome": {
      "en-US": "A UI-first component and gallery workspace provides a foundation for later CMS integration."
    },
    "caseStudyBody": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "The project intentionally stabilizes UI contracts before Contentful integration. Storybook acts as the primary design-system workspace, while the implementation grows through primitives, patterns, components, sections, responsive QA, and static data-shape planning.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "heroImage": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-project-ui-gallery-system"
        }
      }
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-design-systems"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-accessibility-wcag"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-web-qa-uat"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-technical-documentation-governance"
        }
      }]
    },
    "tools": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-react"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-typescript"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-storybook"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-article-web-development-certifications-learning-journey",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "article"
      }
    }
  },
  "fields": {
    "title": {
      "en-US": "Web Development Certifications and Learning Journey"
    },
    "slug": {
      "en-US": "web-development-certifications-learning-journey"
    },
    "excerpt": {
      "en-US": "A practical look at 700+ hours of web development learning, certifications, and coursework across frontend, UX, JavaScript ecosystems, and modern web development."
    },
    "body": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "My web-development learning path has been a mix of structured coursework, certifications, hands-on projects, and professional application. Over time, I have invested more than 700 hours studying the fundamentals and building practical experience across HTML, CSS, JavaScript, React, responsive design, UX, Node.js, MongoDB, Gatsby, Next.js, and related web technologies.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "I started by learning how the web works at a foundational level: how browsers interpret documents, how layouts respond across devices, and how JavaScript adds behavior to interfaces. From there, I moved into deeper frontend work with React, state management, component architecture, routing, reusable UI patterns, and increasingly structured approaches to design systems.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Professional work changed how I approached learning. CMS migrations, publishing workflows, accessibility review, localization, metadata governance, QA, and enterprise content operations made the relationship between frontend engineering and content systems much clearer. I began thinking less about individual pages and more about systems: reusable components, semantic content models, governance, predictable workflows, and long-term maintainability.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "More recently, that learning has expanded into Contentful, structured content architecture, AI-assisted workflows, and the operational side of modern websites. The goal is no longer simply to collect technologies or complete courses. I want each area of study to strengthen how I solve real web problems: building interfaces that are easier to maintain, content systems that are easier to operate, and workflows that are easier for teams to understand.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "I continue to treat learning as an active part of the work. Courses provide structure, projects provide experimentation, and professional experience provides the constraints that turn technical knowledge into practical judgment.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "publishDate": {
      "en-US": "2026-09-22"
    },
    "heroImage": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-article-learning-journey"
        }
      }
    },
    "socialImage": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-site-social-default"
        }
      }
    },
    "authorProfile": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-person-profile-gilberto-haro"
        }
      }
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-technical-documentation-governance"
        }
      }]
    },
    "tools": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-react"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-typescript"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-article-state-management-in-react",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "article"
      }
    }
  },
  "fields": {
    "title": {
      "en-US": "State Management in React"
    },
    "slug": {
      "en-US": "state-management-in-react"
    },
    "excerpt": {
      "en-US": "A deep dive into React state management, including local and shared state, synchronization, and deciding where state should live."
    },
    "body": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "State management in React starts with a simple question: ",
            "marks": [],
            "data": {

            }
          }, {
            "nodeType": "text",
            "value": "where should this value live?",
            "marks": [{
              "type": "bold"
            }],
            "data": {

            }
          }, {
            "nodeType": "text",
            "value": " Not every piece of state needs a global store, and not every value belongs inside the component that first uses it.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Local state is usually the right choice when a value belongs to one component or a small part of the interface. Examples include whether a menu is open, the current value of a form field, or which tab is selected. Keeping that state close to the component makes the relationship between the data and the UI easier to understand.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Shared state becomes necessary when multiple components need the same information or when updates in one part of the interface must affect another. In those cases, lifting state into a common parent, using React Context, or introducing a dedicated state-management pattern can make the data flow more predictable.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "The important part is not choosing the most powerful tool. It is choosing the smallest approach that still makes ownership clear. State that is pushed too high can create unnecessary coupling. State that is kept too low can lead to duplication and synchronization problems.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "I think about React state in terms of ownership, lifetime, and consumers. Who owns this value? How long should it exist? Which components need it? Does it come from user interaction, application data, or a server request? Answering those questions usually points toward the appropriate location.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Good state management is less about a specific library and more about maintaining a clear mental model. When data ownership is explicit, components become easier to reason about, test, reuse, and change.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "publishDate": {
      "en-US": "2026-09-22"
    },
    "socialImage": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-site-social-default"
        }
      }
    },
    "authorProfile": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-person-profile-gilberto-haro"
        }
      }
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }]
    },
    "tools": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-react"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-article-about-me",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "article"
      }
    }
  },
  "fields": {
    "title": {
      "en-US": "About Me"
    },
    "slug": {
      "en-US": "about-me"
    },
    "excerpt": {
      "en-US": "A personal story about the path from creative media and photography into frontend web development, content systems, UI engineering, and modern web technology."
    },
    "body": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "My path into web development began through creative work. Before working professionally with websites and content systems, I spent years around photography, design, editing tools, and digital media. That experience taught me to pay attention to presentation, composition, detail, and the way people interact with visual information.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Working with digital tools gradually made me more curious about the systems behind them. I began studying web development and learning how browsers, HTML, CSS, JavaScript, and responsive layouts work together. Courses and personal projects eventually grew into professional opportunities where I could apply that knowledge to real websites.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "My early professional work involved WordPress development and website maintenance. From there, I moved into larger CMS and web-operations environments, including enterprise content migration, Adobe Experience Manager, localization, metadata, QA, publishing workflows, and frontend implementation.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Over time, I found that my strongest interests sit at the intersection of engineering and content operations. I enjoy building interfaces, but I also care about how content is modeled, governed, migrated, reviewed, and delivered. That is what led me toward Contentful, structured content architecture, design systems, and the broader idea of content systems rather than isolated web pages.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Today, I think of my work as connecting three areas: frontend engineering, CMS/content systems, and operational quality. I want to build web experiences that are maintainable for developers, understandable for content teams, and reliable for the people using them.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "That combination of creativity, technical problem-solving, and structured content work continues to shape the kind of projects and roles I pursue.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "publishDate": {
      "en-US": "2026-09-22"
    },
    "socialImage": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Asset",
          "id": "seed05-asset-site-social-default"
        }
      }
    },
    "authorProfile": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-person-profile-gilberto-haro"
        }
      }
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-design-systems"
        }
      }]
    },
    "tools": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-wordpress"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-react"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-experience-hogarth-wwp-apple-content-manager",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "experienceItem"
      }
    }
  },
  "fields": {
    "company": {
      "en-US": "Hogarth/WWP at Apple"
    },
    "role": {
      "en-US": "Content Manager"
    },
    "startDate": {
      "en-US": "2025-04-01"
    },
    "endDate": {
      "en-US": "2026-04-01"
    },
    "isCurrentRole": {
      "en-US": false
    },
    "summary": {
      "en-US": "Managed enterprise AEM/CMS content operations supporting major product initiatives, including publishing, DAM coordination, metadata, localization, content QA, launch readiness, stakeholder coordination, and workflow automation."
    },
    "responsibilities": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Managed enterprise AEM/CMS publishing, DAM coordination, metadata, localization, content QA, and launch readiness. Coordinated stakeholder requirements, production dependencies, and delivery status.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "achievements": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Improved workflow visibility through API-based reporting and LLM-assisted automation, reducing repetitive reporting work.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "location": {
      "en-US": "Sunnyvale, California"
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-localization"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-web-qa-uat"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-workflow-automation"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-technical-documentation-governance"
        }
      }]
    },
    "tools": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-adobe-experience-manager"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-experience-whoi-frontend-developer",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "experienceItem"
      }
    }
  },
  "fields": {
    "company": {
      "en-US": "Woods Hole Oceanographic Institution"
    },
    "role": {
      "en-US": "Frontend Developer"
    },
    "startDate": {
      "en-US": "2025-03-01"
    },
    "endDate": {
      "en-US": "2025-04-01"
    },
    "isCurrentRole": {
      "en-US": false
    },
    "summary": {
      "en-US": "Debugged responsive frontend behavior using HTML, CSS, JavaScript, browser developer tools, and web-quality practices to improve usability, consistency, and performance."
    },
    "responsibilities": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Debugged responsive frontend behavior with HTML, CSS, JavaScript, and browser development tools, with usability, visual consistency, and page performance as review goals.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "achievements": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Resolved frontend and responsive issues across existing pages, improving visual consistency and usability through browser-based debugging and targeted HTML, CSS, and JavaScript fixes.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "location": {
      "en-US": "San Jose, CA"
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-web-qa-uat"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-accessibility-wcag"
        }
      }]
    },
    "tools": {
      "en-US": []
    }
  }
}, {
  "sys": {
    "id": "seed05-experience-robert-half-marketing-web-developer",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "experienceItem"
      }
    }
  },
  "fields": {
    "company": {
      "en-US": "Robert Half International"
    },
    "role": {
      "en-US": "Marketing Web Developer"
    },
    "startDate": {
      "en-US": "2023-04-01"
    },
    "endDate": {
      "en-US": "2024-11-01"
    },
    "isCurrentRole": {
      "en-US": false
    },
    "summary": {
      "en-US": "Supported a large-scale multi-country Drupal-to-AEM migration with content mapping, metadata validation, redirects, publishing standards, accessibility/SEO QA, cross-device UAT, and workflow improvements."
    },
    "responsibilities": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Supported multi-country Drupal-to-AEM content migration, content audits, metadata validation, redirects, publishing standards, and component-based authoring.",
            "marks": [],
            "data": {

            }
          }]
        }, {
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Performed cross-device UAT and QA, identifying usability, accessibility, SEO, redirect, functional, responsive, and performance issues before launch.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "achievements": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Improved web production throughput through semi-automated tracking, standardized handoffs, and clearer task visibility.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "location": {
      "en-US": "San Jose, California"
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-content-migration"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-web-qa-uat"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-accessibility-wcag"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-seo-metadata-governance"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-localization"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-technical-documentation-governance"
        }
      }]
    },
    "tools": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-adobe-experience-manager"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-experience-digitalnest-web-development-specialist",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "experienceItem"
      }
    }
  },
  "fields": {
    "company": {
      "en-US": "DigitalNEST"
    },
    "role": {
      "en-US": "Web Developer Specialist"
    },
    "startDate": {
      "en-US": "2022-08-01"
    },
    "endDate": {
      "en-US": "2023-04-01"
    },
    "isCurrentRole": {
      "en-US": false
    },
    "summary": {
      "en-US": "Developed, maintained, updated, and debugged WordPress websites while supporting website operations, CMS publishing, SEO integration, frontend quality, and collaborative project delivery."
    },
    "responsibilities": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Developed, maintained, updated, and debugged WordPress websites, supporting website operations, CMS publishing, SEO integration, and frontend quality.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "achievements": {
      "en-US": {
        "nodeType": "document",
        "data": {

        },
        "content": [{
          "nodeType": "paragraph",
          "data": {

          },
          "content": [{
            "nodeType": "text",
            "value": "Delivered and maintained WordPress website updates across client and internal projects, resolving frontend issues while supporting publishing, SEO, and day-to-day site quality.",
            "marks": [],
            "data": {

            }
          }]
        }]
      }
    },
    "location": {
      "en-US": "Gilroy, California"
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-web-qa-uat"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-seo-metadata-governance"
        }
      }]
    },
    "tools": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-tool-wordpress"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-group-frontend-ui-engineering",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skillGroup"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Frontend & UI Engineering"
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-design-systems"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-accessibility-wcag"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-group-content-cms-operations",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skillGroup"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Content & CMS Operations"
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-content-modeling"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-content-migration"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-localization"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-group-quality-discoverability",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skillGroup"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Quality & Discoverability"
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-web-qa-uat"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-seo-metadata-governance"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-group-automation-delivery",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skillGroup"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Automation & Delivery"
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-workflow-automation"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-api-integration"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-technical-documentation-governance"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-tool-contentful",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "tool"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Contentful"
    },
    "category": {
      "en-US": "cms-platform"
    },
    "usageContext": {
      "en-US": "Used for semantic content modeling, migration-driven schema governance, and editorial workflows in the Contentful Greenfield Starter."
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-content-modeling"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-content-migration"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-workflow-automation"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-tool-adobe-experience-manager",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "tool"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Adobe Experience Manager"
    },
    "category": {
      "en-US": "cms-platform"
    },
    "usageContext": {
      "en-US": "Used for enterprise CMS publishing, metadata and localization operations, and Drupal-to-AEM migration work."
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-content-migration"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-localization"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-web-qa-uat"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-seo-metadata-governance"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-tool-wordpress",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "tool"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "WordPress"
    },
    "category": {
      "en-US": "cms-platform"
    },
    "usageContext": {
      "en-US": "Used to develop, maintain, update, and debug websites and support CMS publishing and SEO integration at DigitalNEST."
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-cms-operations"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-seo-metadata-governance"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-tool-react",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "tool"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "React"
    },
    "category": {
      "en-US": "frontend-framework"
    },
    "usageContext": {
      "en-US": "Used in the UI Gallery System frontend workspace alongside TypeScript and Storybook."
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-design-systems"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-tool-typescript",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "tool"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "TypeScript"
    },
    "category": {
      "en-US": "language-runtime"
    },
    "usageContext": {
      "en-US": "Used alongside React and Storybook in UI Gallery System's frontend component work."
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-frontend-development"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-design-systems"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-tool-storybook",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "tool"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Storybook"
    },
    "category": {
      "en-US": "design-qa"
    },
    "usageContext": {
      "en-US": "Used as UI Gallery System's primary workspace for reusable components, layout patterns, and responsive review before CMS integration."
    },
    "skills": {
      "en-US": [{
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-design-systems"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-accessibility-wcag"
        }
      }, {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "seed05-skill-web-qa-uat"
        }
      }]
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-frontend-development",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Frontend Development"
    },
    "summary": {
      "en-US": "Build and debug responsive web interfaces."
    },
    "proofSummary": {
      "en-US": "WHOI work used HTML, CSS, and JavaScript to debug responsive behavior; UI Gallery System provides additional frontend project context."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-design-systems",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Design Systems"
    },
    "summary": {
      "en-US": "Organize reusable UI components and layout patterns."
    },
    "proofSummary": {
      "en-US": "UI Gallery System uses Storybook to develop foundations, layout patterns, reusable components, and responsive gallery surfaces."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-accessibility-wcag",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Accessibility / WCAG"
    },
    "summary": {
      "en-US": "Review interfaces for accessibility and usability issues."
    },
    "proofSummary": {
      "en-US": "Robert Half cross-device QA included accessibility and usability issue identification before launch."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-content-modeling",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Content Modeling"
    },
    "summary": {
      "en-US": "Define semantic content types, fields, and relationships before frontend integration."
    },
    "proofSummary": {
      "en-US": "Contentful Greenfield Starter freezes a ten-type semantic model with explicit field, reference, and validation contracts."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-cms-operations",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "CMS Operations"
    },
    "summary": {
      "en-US": "Coordinate CMS publishing, content quality, and delivery workflows."
    },
    "proofSummary": {
      "en-US": "Hogarth work covered AEM content operations; DigitalNEST work covered WordPress website maintenance and publishing."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-content-migration",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Content Migration"
    },
    "summary": {
      "en-US": "Prepare and validate structured content for CMS transitions."
    },
    "proofSummary": {
      "en-US": "Robert Half work included Drupal-to-AEM content mapping, metadata validation, redirects, and migration QA."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-localization",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Localization"
    },
    "summary": {
      "en-US": "Coordinate localized content and publishing requirements."
    },
    "proofSummary": {
      "en-US": "Hogarth work involved customer-facing content across global markets, localization, stakeholder requirements, and publishing standards."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-web-qa-uat",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Web QA / UAT"
    },
    "summary": {
      "en-US": "Test web experiences across devices and document delivery issues."
    },
    "proofSummary": {
      "en-US": "Robert Half UAT covered responsive behavior, functionality, redirects, performance, accessibility, and SEO before launch."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-seo-metadata-governance",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "SEO & Metadata Governance"
    },
    "summary": {
      "en-US": "Review metadata, search visibility, and redirect behavior within content workflows."
    },
    "proofSummary": {
      "en-US": "Robert Half migration work included metadata validation, redirect checks, and SEO QA; DigitalNEST work included SEO integration."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-workflow-automation",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Workflow Automation"
    },
    "summary": {
      "en-US": "Reduce repetitive reporting and production steps through controlled workflows."
    },
    "proofSummary": {
      "en-US": "Hogarth work used API-based reporting and LLM-assisted automation to improve workflow visibility and reduce repetitive reporting."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-api-integration",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "API Integration"
    },
    "summary": {
      "en-US": "Connect content and reporting workflows through API data."
    },
    "proofSummary": {
      "en-US": "The resume records API-based reporting at Hogarth; the Contentful project includes guarded SDK-based CMS tooling."
    }
  }
}, {
  "sys": {
    "id": "seed05-skill-technical-documentation-governance",
    "type": "Entry",
    "contentType": {
      "sys": {
        "type": "Link",
        "linkType": "ContentType",
        "id": "skill"
      }
    }
  },
  "fields": {
    "name": {
      "en-US": "Technical Documentation & Governance"
    },
    "summary": {
      "en-US": "Maintain traceable content contracts, workflow guidance, and delivery records."
    },
    "proofSummary": {
      "en-US": "Contentful Greenfield Starter documents model contracts, approval gates, and editorial guidance; the resume records requirements and delivery-status coordination."
    }
  }
}] as const satisfies readonly SourceEntry[];
export const representativeAssets = [{
  "sys": {
    "id": "seed05-asset-profile-portrait",
    "type": "Asset"
  },
  "fields": {
    "title": {
      "en-US": "Profile portrait - Gilberto Alejandro Haro"
    },
    "description": {
      "en-US": "Selected outdoor profile image showing a person with a backpack and two dogs on a mountain ridge at sunset."
    },
    "file": {
      "en-US": {
        "contentType": "image/jpeg",
        "fileName": "gilberto-haro-profile-portrait.jpg",
        "url": "//assets.example.test/gilberto-haro-profile-portrait.jpg",
        "details": {
          "size": 118413,
          "image": {
            "width": 2000,
            "height": 2000
          }
        }
      }
    }
  }
}, {
  "sys": {
    "id": "seed05-asset-resume-public",
    "type": "Asset"
  },
  "fields": {
    "title": {
      "en-US": "Public resume - Gilberto Alejandro Haro"
    },
    "description": {
      "en-US": "Sanitized two-page professional resume covering web content, CMS operations, frontend development, experience, and skills. Phone and email omitted."
    },
    "file": {
      "en-US": {
        "contentType": "application/pdf",
        "fileName": "gilberto-haro-resume.pdf",
        "url": "//assets.example.test/gilberto-haro-resume.pdf",
        "details": {
          "size": 41035
        }
      }
    }
  }
}, {
  "sys": {
    "id": "seed05-asset-project-enterprise-cms-migration",
    "type": "Asset"
  },
  "fields": {
    "title": {
      "en-US": "Enterprise CMS Migration - conceptual case study illustration"
    },
    "description": {
      "en-US": "Conceptual portfolio illustration showing legacy content, metadata, localization, quality review, and migration into a structured CMS."
    },
    "file": {
      "en-US": {
        "contentType": "image/png",
        "fileName": "enterprise-cms-migration.png",
        "url": "//assets.example.test/enterprise-cms-migration.png",
        "details": {
          "size": 1725854,
          "image": {
            "width": 1731,
            "height": 909
          }
        }
      }
    }
  }
}, {
  "sys": {
    "id": "seed05-asset-project-contentful-greenfield-starter",
    "type": "Asset"
  },
  "fields": {
    "title": {
      "en-US": "Contentful Greenfield Starter - v1 semantic model illustration"
    },
    "description": {
      "en-US": "Conceptual portfolio diagram showing the frozen v1.0.0 Contentful Greenfield Starter semantic model and governed content workflow."
    },
    "file": {
      "en-US": {
        "contentType": "image/png",
        "fileName": "contentful-greenfield-starter.png",
        "url": "//assets.example.test/contentful-greenfield-starter.png",
        "details": {
          "size": 1555038,
          "image": {
            "width": 1731,
            "height": 909
          }
        }
      }
    }
  }
}, {
  "sys": {
    "id": "seed05-asset-project-ui-gallery-system",
    "type": "Asset"
  },
  "fields": {
    "title": {
      "en-US": "UI Gallery System - conceptual component illustration"
    },
    "description": {
      "en-US": "Conceptual portfolio illustration representing reusable components, interface patterns, design tokens, and a component-gallery workspace."
    },
    "file": {
      "en-US": {
        "contentType": "image/png",
        "fileName": "ui-gallery-system.png",
        "url": "//assets.example.test/ui-gallery-system.png",
        "details": {
          "size": 1667403,
          "image": {
            "width": 1731,
            "height": 909
          }
        }
      }
    }
  }
}, {
  "sys": {
    "id": "seed05-asset-project-system-diagram",
    "type": "Asset"
  },
  "fields": {
    "title": {
      "en-US": "Content Migration Workflow - illustrative system diagram"
    },
    "description": {
      "en-US": "Generalized conceptual migration diagram showing content preparation, field mapping, editorial review, QA, and delivery."
    },
    "file": {
      "en-US": {
        "contentType": "image/png",
        "fileName": "content-migration-workflow.png",
        "url": "//assets.example.test/content-migration-workflow.png",
        "details": {
          "size": 1635129,
          "image": {
            "width": 1731,
            "height": 909
          }
        }
      }
    }
  }
}, {
  "sys": {
    "id": "seed05-asset-article-learning-journey",
    "type": "Asset"
  },
  "fields": {
    "title": {
      "en-US": "Web Development Learning Journey - conceptual article illustration"
    },
    "description": {
      "en-US": "Conceptual portfolio illustration representing study, hands-on practice, project building, and applying web-development skills."
    },
    "file": {
      "en-US": {
        "contentType": "image/png",
        "fileName": "web-development-learning-journey.png",
        "url": "//assets.example.test/web-development-learning-journey.png",
        "details": {
          "size": 1640698,
          "image": {
            "width": 1731,
            "height": 909
          }
        }
      }
    }
  }
}, {
  "sys": {
    "id": "seed05-asset-site-social-default",
    "type": "Asset"
  },
  "fields": {
    "title": {
      "en-US": "Gilberto Haro - default portfolio social image"
    },
    "description": {
      "en-US": "Default conceptual portfolio-sharing graphic for Gilberto Alejandro Haro and his Web Content & Marketing Technologist positioning."
    },
    "file": {
      "en-US": {
        "contentType": "image/png",
        "fileName": "default-social-image.png",
        "url": "//assets.example.test/default-social-image.png",
        "details": {
          "size": 1758838,
          "image": {
            "width": 1731,
            "height": 909
          }
        }
      }
    }
  }
}] as const satisfies readonly SourceAsset[];
export const sourceProvenance = {
  "manifestPath": "content-model/seed/phase-05/seed-manifest.json",
  "manifestSha256": "612e5fc20813267e3f1cbbbc53ec308286412eac212f74e96da6879e2adb3d6f",
  "cmsCheckpoint": "9738cb34127b36cbb118de2438fc4db656b5dc0d",
  "historicalObservation": "2026-09-29T08:54:11.057Z",
  "construction": "Exact manifest Entry fields; constructed sys/contentType and reserved assets.example.test file URLs; no captured API response or network use.",
  "publication": "42 draft Entries / 8 processed unpublished Assets / zero publications",
  "records": [{
    "id": "seed05-site-settings-primary",
    "type": "siteSettings",
    "publication": "draft",
    "fieldsSha256": "bf861667e9daa011cbabac394863f9ffb348a6fe578d602d38993354d72d66d2",
    "optionalFields": {
      "siteDescription": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "footerNavigationItems": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "socialLinks": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "primaryNavigationItems": ["seed05-navigation-item-about", "seed05-navigation-item-work", "seed05-navigation-item-projects", "seed05-navigation-item-writing", "seed05-navigation-item-tools", "seed05-navigation-item-contact"],
      "footerNavigationItems": ["seed05-navigation-item-about", "seed05-navigation-item-projects", "seed05-navigation-item-writing", "seed05-navigation-item-contact"],
      "socialLinks": ["seed05-social-link-linkedin", "seed05-social-link-github"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-person-profile-gilberto-haro",
    "type": "personProfile",
    "publication": "draft",
    "fieldsSha256": "358ed6414062f8bba3ffb8ba2fd19462993a9109fb091a245f4941cba377d62b",
    "optionalFields": {
      "secondaryTitle": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "publicEmail": {
        "decision": "omit",
        "reason": "Explicit owner decision: OMIT. No substitute contact details; approved LinkedIn remains available."
      },
      "location": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "availabilityStatus": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "workPreference": {
        "decision": "include",
        "reason": "Exact owner-approved public wording; no employment type, timezone, onsite, or geographic qualifier added."
      },
      "contactIntro": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "resume": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "learningHighlights": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "socialLinks": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "socialLinks": ["seed05-social-link-linkedin", "seed05-social-link-github"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract", "owner-decisions-05-2"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-social-link-linkedin",
    "type": "socialLink",
    "publication": "draft",
    "fieldsSha256": "0c43b30ac06b5f52a79937e31277eada6909873a81853f02a0fa21e52f406bd1",
    "optionalFields": {
      "sortOrder": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract", "owner-decisions-05-2"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-social-link-github",
    "type": "socialLink",
    "publication": "draft",
    "fieldsSha256": "bccb164d16496ab2342d3009a6b6709cb7577618cac586a394757cb2ac7c9393",
    "optionalFields": {
      "sortOrder": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-navigation-item-about",
    "type": "navigationItem",
    "publication": "draft",
    "fieldsSha256": "092559e12e8d0139b8df8c8cfdaf23fac7f1dccd88a933b4830e6b7fc05200ab",
    "optionalFields": {
      "description": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["A", "B"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-navigation-item-work",
    "type": "navigationItem",
    "publication": "draft",
    "fieldsSha256": "b667281208c23e43c3b3a1fdd45a0450f7a996a9f9491db8d24f3ac984878492",
    "optionalFields": {
      "description": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["A", "B"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-navigation-item-projects",
    "type": "navigationItem",
    "publication": "draft",
    "fieldsSha256": "a2a5dfa740ec2cdc10e69d61233442fa8f2759d2718c4ce778602eb7291dcd2b",
    "optionalFields": {
      "description": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["A", "B"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-navigation-item-writing",
    "type": "navigationItem",
    "publication": "draft",
    "fieldsSha256": "d9469c12c73f358521e1c874e297a0e255c8f4a6711ba492f4eb0e37711bf710",
    "optionalFields": {
      "description": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["A", "B"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-navigation-item-tools",
    "type": "navigationItem",
    "publication": "draft",
    "fieldsSha256": "c2ef50e69e5d6c1fcab3297a0a065dd99cd425c61f87257ff43155bfaa74cec7",
    "optionalFields": {
      "description": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["A", "B"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-navigation-item-contact",
    "type": "navigationItem",
    "publication": "draft",
    "fieldsSha256": "8774a5e650f77fad11dcffddcc5be98868488336af25f5ba1b521e04ab6e1f87",
    "optionalFields": {
      "description": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["A", "B"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-project-enterprise-cms-migration",
    "type": "project",
    "publication": "draft",
    "fieldsSha256": "5744fbe9fd1f5790ac4503836057ced280d50bfc336847db31a8db7a14e89149",
    "optionalFields": {
      "projectStatus": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contextSummary": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "caseStudyBody": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "metrics": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "galleryImages": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "liveUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "repositoryUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "tags": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "seoTitle": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "seoDescription": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "socialImage": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedExperience": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "relatedProjects": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "galleryImages": ["seed05-asset-project-system-diagram"],
      "skills": ["seed05-skill-cms-operations", "seed05-skill-content-migration", "seed05-skill-web-qa-uat", "seed05-skill-seo-metadata-governance", "seed05-skill-accessibility-wcag", "seed05-skill-localization", "seed05-skill-technical-documentation-governance"],
      "tools": ["seed05-tool-adobe-experience-manager"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract", "owner-decisions-05-2"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-project-contentful-greenfield-starter",
    "type": "project",
    "publication": "draft",
    "fieldsSha256": "a36e7506a3010eedb085d8b9cd8bc3fc8ea758ea2d2810f9dba0179716604a98",
    "optionalFields": {
      "projectStatus": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contextSummary": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "caseStudyBody": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "metrics": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "galleryImages": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "liveUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "repositoryUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "tags": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "seoTitle": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "seoDescription": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "socialImage": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedExperience": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "relatedProjects": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-content-modeling", "seed05-skill-cms-operations", "seed05-skill-content-migration", "seed05-skill-workflow-automation", "seed05-skill-api-integration", "seed05-skill-technical-documentation-governance"],
      "tools": ["seed05-tool-contentful"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-project-ui-gallery-system",
    "type": "project",
    "publication": "draft",
    "fieldsSha256": "071bb627d2bb4b73753f46732429007be35541333a6f58d66e275ff8612bbec0",
    "optionalFields": {
      "projectStatus": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contextSummary": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "caseStudyBody": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "metrics": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "galleryImages": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "liveUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "repositoryUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "tags": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "seoTitle": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "seoDescription": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "socialImage": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedExperience": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "relatedProjects": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-frontend-development", "seed05-skill-design-systems", "seed05-skill-accessibility-wcag", "seed05-skill-web-qa-uat", "seed05-skill-technical-documentation-governance"],
      "tools": ["seed05-tool-react", "seed05-tool-typescript", "seed05-tool-storybook"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-article-web-development-certifications-learning-journey",
    "type": "article",
    "publication": "draft",
    "fieldsSha256": "20ae49e7c71ed933b63bf7bdea498599201cd2a8ed32086770e72c7ce9ae867f",
    "optionalFields": {
      "updatedDate": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contentPillar": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "category": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "tags": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "heroImage": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "seoTitle": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "seoDescription": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "socialImage": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedProjects": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "relatedArticles": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-frontend-development", "seed05-skill-technical-documentation-governance"],
      "tools": ["seed05-tool-react", "seed05-tool-typescript"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract", "owner-required-content-approval-05-2"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-article-state-management-in-react",
    "type": "article",
    "publication": "draft",
    "fieldsSha256": "c7b19d8d4c714994d8ba47e70ec8b5443de41d94c852fed4634549283e9c5227",
    "optionalFields": {
      "updatedDate": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contentPillar": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "category": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "tags": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "heroImage": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "seoTitle": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "seoDescription": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "socialImage": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedProjects": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "relatedArticles": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-frontend-development"],
      "tools": ["seed05-tool-react"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract", "owner-required-content-approval-05-2"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-article-about-me",
    "type": "article",
    "publication": "draft",
    "fieldsSha256": "8fb2f55b3ed61f5f045ad4192b6e8f78d078df1529a7c7c12d351565e406eeba",
    "optionalFields": {
      "updatedDate": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contentPillar": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "category": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "tags": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "heroImage": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "seoTitle": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "seoDescription": {
        "decision": "omit",
        "reason": "Intentional code-owned fallback to semantic title/summary or excerpt; no separate editorial override need is supported."
      },
      "socialImage": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedProjects": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "relatedArticles": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-frontend-development", "seed05-skill-cms-operations", "seed05-skill-design-systems"],
      "tools": ["seed05-tool-wordpress", "seed05-tool-react"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract", "owner-required-content-approval-05-2"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-experience-hogarth-wwp-apple-content-manager",
    "type": "experienceItem",
    "publication": "draft",
    "fieldsSha256": "75e81f3a7a2ef8c6e0996e9f26a732a8537679560b95d5a7ebe48c351210e4a6",
    "optionalFields": {
      "endDate": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "isCurrentRole": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "location": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "employmentType": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "companyUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "companyLogo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "metrics": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contextSummary": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedArticles": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-cms-operations", "seed05-skill-localization", "seed05-skill-web-qa-uat", "seed05-skill-workflow-automation", "seed05-skill-technical-documentation-governance"],
      "tools": ["seed05-tool-adobe-experience-manager"]
    },
    "datePrecision": {
      "endDate": {
        "sourcePrecision": "month",
        "sourceValue": "2026-04",
        "cmsValue": "2026-04-01",
        "dayIsEncoding": true
      },
      "startDate": {
        "sourcePrecision": "month",
        "sourceValue": "2025-04",
        "cmsValue": "2025-04-01",
        "dayIsEncoding": true
      }
    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract", "owner-decisions-05-2"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-experience-whoi-frontend-developer",
    "type": "experienceItem",
    "publication": "draft",
    "fieldsSha256": "8fa7148ef8a87ed2cdc3ba3dcf7ab677805094a6b906c2562beb377131638723",
    "optionalFields": {
      "endDate": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "isCurrentRole": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "location": {
        "decision": "include",
        "reason": "Owner-approved public location: San Jose, CA. Prior San Jose/Remote conflict retained as history."
      },
      "employmentType": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "companyUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "companyLogo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "metrics": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contextSummary": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedArticles": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-frontend-development", "seed05-skill-web-qa-uat", "seed05-skill-accessibility-wcag"],
      "tools": []
    },
    "datePrecision": {
      "startDate": {
        "sourcePrecision": "month",
        "sourceValue": "2025-03",
        "cmsValue": "2025-03-01",
        "dayIsEncoding": true
      },
      "endDate": {
        "sourcePrecision": "month",
        "sourceValue": "2025-04",
        "cmsValue": "2025-04-01",
        "dayIsEncoding": true
      }
    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract", "owner-decisions-05-2", "owner-required-content-approval-05-2"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-experience-robert-half-marketing-web-developer",
    "type": "experienceItem",
    "publication": "draft",
    "fieldsSha256": "cbe7af1a450b3f19dc96bc7394cd96b0d40869456f41e2e358bb4e669ac3b6d3",
    "optionalFields": {
      "endDate": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "isCurrentRole": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "location": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "employmentType": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "companyUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "companyLogo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "metrics": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contextSummary": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedArticles": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-cms-operations", "seed05-skill-content-migration", "seed05-skill-web-qa-uat", "seed05-skill-accessibility-wcag", "seed05-skill-seo-metadata-governance", "seed05-skill-localization", "seed05-skill-technical-documentation-governance"],
      "tools": ["seed05-tool-adobe-experience-manager"]
    },
    "datePrecision": {
      "startDate": {
        "sourcePrecision": "month",
        "sourceValue": "2023-04",
        "cmsValue": "2023-04-01",
        "dayIsEncoding": true
      },
      "endDate": {
        "sourcePrecision": "month",
        "sourceValue": "2024-11",
        "cmsValue": "2024-11-01",
        "dayIsEncoding": true
      }
    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-experience-digitalnest-web-development-specialist",
    "type": "experienceItem",
    "publication": "draft",
    "fieldsSha256": "738ed973cc8e9d11873afb48681c9a551d9c3aee0fc554032e8c0aa874fdf847",
    "optionalFields": {
      "endDate": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "isCurrentRole": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "location": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "employmentType": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "companyUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "companyLogo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "metrics": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "contextSummary": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "tools": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      },
      "relatedArticles": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-frontend-development", "seed05-skill-cms-operations", "seed05-skill-web-qa-uat", "seed05-skill-seo-metadata-governance"],
      "tools": ["seed05-tool-wordpress"]
    },
    "datePrecision": {
      "startDate": {
        "sourcePrecision": "month",
        "sourceValue": "2022-08",
        "cmsValue": "2022-08-01",
        "dayIsEncoding": true
      },
      "endDate": {
        "sourcePrecision": "month",
        "sourceValue": "2023-04",
        "cmsValue": "2023-04-01",
        "dayIsEncoding": true
      }
    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract", "owner-decisions-05-2", "owner-required-content-approval-05-2"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-group-frontend-ui-engineering",
    "type": "skillGroup",
    "publication": "draft",
    "fieldsSha256": "6c3a46f072133fbfc6ea10d43fab9a5d35fe06cba219955d061ef95838ac6e0a",
    "optionalFields": {
      "description": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "sortOrder": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-frontend-development", "seed05-skill-design-systems", "seed05-skill-accessibility-wcag"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-group-content-cms-operations",
    "type": "skillGroup",
    "publication": "draft",
    "fieldsSha256": "4a87ee8537c96e71c24afe7eb3930341c940ee321590a0d3ab4b1f6387d3eab1",
    "optionalFields": {
      "description": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "sortOrder": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-content-modeling", "seed05-skill-cms-operations", "seed05-skill-content-migration", "seed05-skill-localization"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-group-quality-discoverability",
    "type": "skillGroup",
    "publication": "draft",
    "fieldsSha256": "05bca924991aead18dd2960216a918fbc9f9f2e176fd27734398f7ede89b72a7",
    "optionalFields": {
      "description": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "sortOrder": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-web-qa-uat", "seed05-skill-seo-metadata-governance"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-group-automation-delivery",
    "type": "skillGroup",
    "publication": "draft",
    "fieldsSha256": "4f75d19c7474d60d678adbf07ef8abf12d078401b88c11bb0bcdf650cbe5865f",
    "optionalFields": {
      "description": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "sortOrder": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-workflow-automation", "seed05-skill-api-integration", "seed05-skill-technical-documentation-governance"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-tool-contentful",
    "type": "tool",
    "publication": "draft",
    "fieldsSha256": "98a1baae2eda11f7f1cc53c65b7cadba01ee0cfa79fa4d7b1905cc35bce8f639",
    "optionalFields": {
      "externalUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "logo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-content-modeling", "seed05-skill-cms-operations", "seed05-skill-content-migration", "seed05-skill-workflow-automation"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-tool-adobe-experience-manager",
    "type": "tool",
    "publication": "draft",
    "fieldsSha256": "089ac212449223515e19247404b9d3c14064edfc5bd2a023cc4a15df7933acc8",
    "optionalFields": {
      "externalUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "logo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-cms-operations", "seed05-skill-content-migration", "seed05-skill-localization", "seed05-skill-web-qa-uat", "seed05-skill-seo-metadata-governance"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-tool-wordpress",
    "type": "tool",
    "publication": "draft",
    "fieldsSha256": "3262a1d1ca2bfa0668fc35795836d33fc78e8b30a5cc4261889ba1a0ebafac3c",
    "optionalFields": {
      "externalUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "logo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-cms-operations", "seed05-skill-frontend-development", "seed05-skill-seo-metadata-governance"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-tool-react",
    "type": "tool",
    "publication": "draft",
    "fieldsSha256": "d9edfabcf7de129affec655b7fa3ed01bba91ffb7372c22c786449fb53ac17bb",
    "optionalFields": {
      "externalUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "logo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-frontend-development", "seed05-skill-design-systems"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-tool-typescript",
    "type": "tool",
    "publication": "draft",
    "fieldsSha256": "2967f8ac4c51f13508e351d2fd2b0061bdf40dba5a3fdeeb7fccef6388ab6759",
    "optionalFields": {
      "externalUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "logo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-frontend-development", "seed05-skill-design-systems"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-tool-storybook",
    "type": "tool",
    "publication": "draft",
    "fieldsSha256": "834c202c13a2a5d23bbfa9730b1a3c820d91c277828b074101cfee926379612e",
    "optionalFields": {
      "externalUrl": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "logo": {
        "decision": "omit",
        "reason": "Intentional omission; use approved fallback where applicable."
      },
      "skills": {
        "decision": "include",
        "reason": "Planning source supplies this field; final source review still applies."
      }
    },
    "orderedArrays": {
      "skills": ["seed05-skill-design-systems", "seed05-skill-accessibility-wcag", "seed05-skill-web-qa-uat"]
    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-frontend-development",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "028942c146b402febf5ac9a8b31826d08a80fe26c862728fdc40eac71e1a7c66",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-design-systems",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "cc1e709b131eb7853535b071233375fa2a8eb7d4969e048e54eec228b7ddb261",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-accessibility-wcag",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "dea4ff369c974e145676d6243b160ad56dbf7e4b31389f28bd940d51e9d3162d",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-content-modeling",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "5cb0ea1a5bc251090cd372f7de30455594863d18cf131625b63a2e1035131f6b",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-cms-operations",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "289755f389379fe4753ea7208ceabaa8229a10d68a29c9f019422cc278c30c98",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-content-migration",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "2a86e2739084e968dfbe33d7b5c93ae360c9e61b778b7645f5bf763baa5bf109",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-localization",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "ac21acb10fa116a39ce35c7c10d25b74267b6fdc6a6e40b8a07da44a303b4d93",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-web-qa-uat",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "70c6466d55c0f29286731d07cdf57239c01f9f60ec9d4129c170cd13bf4a8d75",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-seo-metadata-governance",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "c19b7bd9381d9c6681ff172f40ceb41d6e44cfa41bfad0d36ed42f2db396ecfc",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-workflow-automation",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "f0c73fb6e10da75c476b5ef24467a027477985cce70598e4308900949e726192",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-api-integration",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "c02ea45dc4b19baee50e4c7b69077e26656a25f7938f101603f962dcda520297",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }, {
    "id": "seed05-skill-technical-documentation-governance",
    "type": "skill",
    "publication": "draft",
    "fieldsSha256": "d7f47ecb3bdce4ce5258f285fbb6f318d50f3bc69fe1234d6d595a6ff24313ca",
    "optionalFields": {
      "summary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      },
      "proofSummary": {
        "decision": "include",
        "reason": "Supported local draft; public-use review remains required."
      }
    },
    "orderedArrays": {

    },
    "datePrecision": {

    },
    "sourceClasses": ["B", "C"],
    "sourceBasis": ["external-source-pack", "frozen-v1-contract"],
    "sourceStatus": "APPROVED",
    "publicSafetyStatus": "APPROVED"
  }]
} as const;

// These are test intentions, deliberately not ValidatedPreviewAccess capabilities.
export const simulatedContexts = {
  representativeDraft: { simulation: true, audience: 'PUBLIC', publication: 'draft', publicSafety: 'approved', expectedEligibility: false },
  publicEligible: { simulation: true, audience: 'PUBLIC', publication: 'published-revision', publicSafety: 'approved', expectedEligibility: true },
  trustedPreview: { simulation: true, audience: 'TRUSTED_PREVIEW', publication: 'draft', publicSafety: 'approved', authentication: 'SIMULATED_ONLY' },
} as const;
export function sourceEntry(id: string): SourceEntry {
  const entry = representativeEntries.find(candidate => candidate.sys.id === id);
  if (!entry) throw new Error('Unknown fixture entry');
  return entry;
}
// Unknown return type is intentional: malformed variants must never masquerade as normalized data.
export function entryVariant(id: string, field: string, value: unknown, locale = 'en-US'): unknown {
  const entry = sourceEntry(id);
  return { ...structuredClone(entry), fields: { ...structuredClone(entry.fields), [field]: { [locale]: value } } };
}
const whoi = sourceEntry('seed05-experience-whoi-frontend-developer');
export const whoiToolsAbsent: unknown = { ...whoi, fields: Object.fromEntries(Object.entries(whoi.fields).filter(([field]) => field !== 'tools')) };
export const whoiToolsEmpty: unknown = whoi;
export const malformedSourceCases: Readonly<Record<string, unknown>> = {
  requiredNull: entryVariant('seed05-project-ui-gallery-system', 'title', null),
  requiredBlank: entryVariant('seed05-project-ui-gallery-system', 'title', '   '),
  wrongLocale: entryVariant('seed05-project-ui-gallery-system', 'title', 'Fixture', 'fr-FR'),
  optionalNull: entryVariant('seed05-project-ui-gallery-system', 'projectStatus', null),
  invalidSlug: entryVariant('seed05-project-ui-gallery-system', 'slug', '../escape'),
  wrongReferenceKind: entryVariant('seed05-article-about-me', 'authorProfile', { sys: { type: 'Link', linkType: 'Asset', id: 'seed05-asset-profile-portrait' } }),
  wrongReferenceType: entryVariant('seed05-article-about-me', 'authorProfile', { sys: { type: 'Link', linkType: 'Entry', id: 'seed05-tool-react' } }),
  unresolvedReference: entryVariant('seed05-article-about-me', 'authorProfile', { sys: { type: 'Link', linkType: 'Entry', id: 'synthetic-absent' } }),
  whoiWrongLocale: entryVariant(whoi.sys.id, 'tools', [], 'fr-FR'),
  whoiNull: entryVariant(whoi.sys.id, 'tools', null),
  requiredNavigationEmpty: entryVariant('seed05-site-settings-primary', 'primaryNavigationItems', []),
  requiredSkillsEmpty: entryVariant('seed05-skill-group-frontend-ui-engineering', 'skills', []),
  invalidDate: entryVariant(whoi.sys.id, 'startDate', '2025-02-30'),
  reversedDates: entryVariant(whoi.sys.id, 'endDate', '2020-01-01'),
  currentWithEnd: entryVariant(whoi.sys.id, 'isCurrentRole', true),
  unknownNode: entryVariant('seed05-article-about-me', 'body', { nodeType: 'document', data: {}, content: [{ nodeType: 'heading-1', data: {}, content: [] }] }),
  unsafeLink: entryVariant('seed05-social-link-github', 'url', 'javascript:alert(1)'),
  selfReference: entryVariant('seed05-project-ui-gallery-system', 'relatedProjects', [{ sys: { type: 'Link', linkType: 'Entry', id: 'seed05-project-ui-gallery-system' } }]),
};

// S: neutral synthetic Rich Text examples, not new professional content.
export const sourceMarkExamples = [
  { nodeType: 'text', value: 'Fixture bold', marks: [{ type: 'bold' }], data: {} },
  { nodeType: 'text', value: 'Fixture italic', marks: [{ type: 'italic' }], data: {} },
  { nodeType: 'text', value: 'Fixture underline', marks: [{ type: 'underline' }], data: {} },
  { nodeType: 'text', value: 'Fixture code', marks: [{ type: 'code' }], data: {} },
  { nodeType: 'text', value: 'Fixture superscript', marks: [{ type: 'superscript' }], data: {} },
  { nodeType: 'text', value: 'Fixture subscript', marks: [{ type: 'subscript' }], data: {} },
  { nodeType: 'text', value: 'Fixture strikethrough', marks: [{ type: 'strikethrough' }], data: {} },
] as const;
export const sourceStructureExamples: readonly unknown[] = [
  { nodeType: 'heading-2', data: {}, content: [{ nodeType: 'text', value: 'Fixture heading', data: {}, marks: [] }] },
  { nodeType: 'heading-3', data: {}, content: [{ nodeType: 'text', value: 'Fixture subheading', data: {}, marks: [] }] },
  { nodeType: 'blockquote', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: 'Fixture quote', marks: [], data: {} }] }] },
  { nodeType: 'unordered-list', data: {}, content: [{ nodeType: 'list-item', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: 'Fixture item', data: {}, marks: [] }] }] }] },
  { nodeType: 'ordered-list', data: {}, content: [{ nodeType: 'list-item', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'hyperlink', data: { uri: 'https://example.test/fixture' }, content: [{ nodeType: 'text', value: 'Fixture link', data: {}, marks: [] }] }] }] }] },
  { nodeType: 'embedded-asset-block', data: { target: { sys: { type: 'Link', linkType: 'Asset', id: 'seed05-asset-project-system-diagram' } } }, content: [] },
  { nodeType: 'embedded-asset-block', data: { target: { sys: { type: 'Link', linkType: 'Asset', id: 'seed05-asset-resume-public' } } }, content: [] },
];
export const sourceRichTextNegativeExamples: Readonly<Record<string, unknown>> = {
  futureMark: { nodeType: 'text', value: 'Fixture', marks: [{ type: 'future-mark' }], data: {} },
  bodyUnderline: sourceMarkExamples[2],
  invalidNesting: { nodeType: 'document', data: {}, content: [{ nodeType: 'list-item', data: {}, content: [] }] },
  rawHtml: { nodeType: 'html', data: {}, value: '<script>fixture</script>' },
  table: { nodeType: 'table', data: {}, content: [] },
  embeddedEntry: { nodeType: 'embedded-entry-block', data: { target: { sys: { type: 'Link', linkType: 'Entry', id: 'seed05-tool-react' } } }, content: [] },
  emptyDocument: { nodeType: 'document', data: {}, content: [] },
};

// Fixture context descriptors deliberately cannot satisfy ValidatedPreviewAccess.
// Constructed revision IDs are simulation identities, never observed CMS revision values.
export const sourceFixtureContextPolicy = {
  "locale": "en-US",
  "sourceComparison": "STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION",
  "articlePrecision": "day",
  "reviewedAccessibility": [
    {
      "id": "seed05-asset-profile-portrait",
      "treatment": "meaningful",
      "text": "A person with a backpack stands on a mountain ridge at sunset with two dogs."
    },
    {
      "id": "seed05-asset-resume-public",
      "treatment": "meaningful",
      "text": "Download Gilberto Alejandro Haro's professional resume (PDF, 2 pages)."
    },
    {
      "id": "seed05-asset-project-enterprise-cms-migration",
      "treatment": "meaningful",
      "text": "Conceptual illustration showing legacy content, metadata, localization, and QA flowing into a structured CMS."
    },
    {
      "id": "seed05-asset-project-contentful-greenfield-starter",
      "treatment": "meaningful",
      "text": "Conceptual diagram of the Contentful Greenfield Starter showing ten semantic content types and a governed content-model workflow."
    },
    {
      "id": "seed05-asset-project-ui-gallery-system",
      "treatment": "meaningful",
      "text": "Conceptual illustration of a reusable component gallery with interface patterns, design tokens, and UI building blocks."
    },
    {
      "id": "seed05-asset-project-system-diagram",
      "treatment": "meaningful",
      "text": "Illustrative content migration workflow showing preparation, field mapping, editorial review, and final delivery."
    },
    {
      "id": "seed05-asset-article-learning-journey",
      "treatment": "meaningful",
      "text": "Conceptual learning path showing study, hands-on practice, project building, and applying web development skills."
    },
    {
      "id": "seed05-asset-site-social-default",
      "treatment": "meaningful",
      "text": "Portfolio identity graphic for Gilberto Alejandro Haro, Web Content & Marketing Technologist, with conceptual web and content-system imagery."
    }
  ],
  "employmentPrecision": [
    {
      "id": "seed05-experience-hogarth-wwp-apple-content-manager",
      "fields": {
        "endDate": {
          "sourcePrecision": "month",
          "sourceValue": "2026-04",
          "cmsValue": "2026-04-01",
          "dayIsEncoding": true
        },
        "startDate": {
          "sourcePrecision": "month",
          "sourceValue": "2025-04",
          "cmsValue": "2025-04-01",
          "dayIsEncoding": true
        }
      }
    },
    {
      "id": "seed05-experience-whoi-frontend-developer",
      "fields": {
        "startDate": {
          "sourcePrecision": "month",
          "sourceValue": "2025-03",
          "cmsValue": "2025-03-01",
          "dayIsEncoding": true
        },
        "endDate": {
          "sourcePrecision": "month",
          "sourceValue": "2025-04",
          "cmsValue": "2025-04-01",
          "dayIsEncoding": true
        }
      }
    },
    {
      "id": "seed05-experience-robert-half-marketing-web-developer",
      "fields": {
        "startDate": {
          "sourcePrecision": "month",
          "sourceValue": "2023-04",
          "cmsValue": "2023-04-01",
          "dayIsEncoding": true
        },
        "endDate": {
          "sourcePrecision": "month",
          "sourceValue": "2024-11",
          "cmsValue": "2024-11-01",
          "dayIsEncoding": true
        }
      }
    },
    {
      "id": "seed05-experience-digitalnest-web-development-specialist",
      "fields": {
        "startDate": {
          "sourcePrecision": "month",
          "sourceValue": "2022-08",
          "cmsValue": "2022-08-01",
          "dayIsEncoding": true
        },
        "endDate": {
          "sourcePrecision": "month",
          "sourceValue": "2023-04",
          "cmsValue": "2023-04-01",
          "dayIsEncoding": true
        }
      }
    }
  ]
} as const;
const simulatedRecordIds = [
  "seed05-site-settings-primary",
  "seed05-person-profile-gilberto-haro",
  "seed05-social-link-linkedin",
  "seed05-social-link-github",
  "seed05-navigation-item-about",
  "seed05-navigation-item-work",
  "seed05-navigation-item-projects",
  "seed05-navigation-item-writing",
  "seed05-navigation-item-tools",
  "seed05-navigation-item-contact",
  "seed05-project-enterprise-cms-migration",
  "seed05-project-contentful-greenfield-starter",
  "seed05-project-ui-gallery-system",
  "seed05-article-web-development-certifications-learning-journey",
  "seed05-article-state-management-in-react",
  "seed05-article-about-me",
  "seed05-experience-hogarth-wwp-apple-content-manager",
  "seed05-experience-whoi-frontend-developer",
  "seed05-experience-robert-half-marketing-web-developer",
  "seed05-experience-digitalnest-web-development-specialist",
  "seed05-skill-group-frontend-ui-engineering",
  "seed05-skill-group-content-cms-operations",
  "seed05-skill-group-quality-discoverability",
  "seed05-skill-group-automation-delivery",
  "seed05-tool-contentful",
  "seed05-tool-adobe-experience-manager",
  "seed05-tool-wordpress",
  "seed05-tool-react",
  "seed05-tool-typescript",
  "seed05-tool-storybook",
  "seed05-skill-frontend-development",
  "seed05-skill-design-systems",
  "seed05-skill-accessibility-wcag",
  "seed05-skill-content-modeling",
  "seed05-skill-cms-operations",
  "seed05-skill-content-migration",
  "seed05-skill-localization",
  "seed05-skill-web-qa-uat",
  "seed05-skill-seo-metadata-governance",
  "seed05-skill-workflow-automation",
  "seed05-skill-api-integration",
  "seed05-skill-technical-documentation-governance",
  "seed05-asset-profile-portrait",
  "seed05-asset-resume-public",
  "seed05-asset-project-enterprise-cms-migration",
  "seed05-asset-project-contentful-greenfield-starter",
  "seed05-asset-project-ui-gallery-system",
  "seed05-asset-project-system-diagram",
  "seed05-asset-article-learning-journey",
  "seed05-asset-site-social-default"
] as const;
export const simulatedRevisionFacts = {
  representativeDraft: simulatedRecordIds.map(id => ({ id, revision: 'simulation-revision-' + id, publication: 'draft', publicSafety: 'approved' } as const)),
  publicEligible: simulatedRecordIds.map(id => ({ id, revision: 'simulation-revision-' + id, publication: 'published-revision', publicSafety: 'approved' } as const)),
} as const;
export const sourceFixtureContexts = {
  publicEligible: { simulation: true, audience: 'PUBLIC', mode: 'offline-demo', completeness: 'SIMULATED_COMPLETE', policy: sourceFixtureContextPolicy, revisionFacts: simulatedRevisionFacts.publicEligible },
  representativeDraft: { simulation: true, audience: 'PUBLIC', mode: 'offline-demo', completeness: 'SIMULATED_COMPLETE', policy: sourceFixtureContextPolicy, revisionFacts: simulatedRevisionFacts.representativeDraft },
  trustedPreview: { simulation: true, audience: 'TRUSTED_PREVIEW', mode: 'trusted-preview', completeness: 'SIMULATED_COMPLETE', policy: sourceFixtureContextPolicy, revisionFacts: simulatedRevisionFacts.representativeDraft, access: 'SIMULATED_ONLY_NOT_AUTH_CAPABILITY' },
} as const;
