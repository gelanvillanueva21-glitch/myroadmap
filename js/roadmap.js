const resource = (title, url) => ({ title, url });

const resourceCatalog = {
    mdn: resource("MDN Web Docs", "https://developer.mozilla.org/"),
    mdnHtml: resource("MDN: HTML", "https://developer.mozilla.org/en-US/docs/Web/HTML"),
    mdnCss: resource("MDN: CSS", "https://developer.mozilla.org/en-US/docs/Web/CSS"),
    mdnJs: resource("MDN: JavaScript", "https://developer.mozilla.org/en-US/docs/Web/JavaScript"),
    mdnHttp: resource("MDN: HTTP", "https://developer.mozilla.org/en-US/docs/Web/HTTP"),
    mdnFetch: resource("MDN: Fetch API", "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"),
    mdnStorage: resource("MDN: Web Storage API", "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API"),
    typescript: resource("TypeScript Handbook", "https://www.typescriptlang.org/docs/handbook/intro.html"),
    react: resource("React documentation", "https://react.dev/learn"),
    next: resource("Next.js documentation", "https://nextjs.org/docs"),
    rust: resource("The Rust Programming Language", "https://doc.rust-lang.org/book/"),
    rustExample: resource("Rust by Example", "https://doc.rust-lang.org/rust-by-example/"),
    rustStd: resource("Rust standard library", "https://doc.rust-lang.org/std/"),
    axum: resource("Axum documentation", "https://docs.rs/axum/latest/axum/"),
    express: resource("Express documentation", "https://expressjs.com/"),
    nest: resource("NestJS documentation", "https://docs.nestjs.com/"),
    fastapi: resource("FastAPI documentation", "https://fastapi.tiangolo.com/"),
    django: resource("Django documentation", "https://docs.djangoproject.com/"),
    spring: resource("Spring Boot documentation", "https://docs.spring.io/spring-boot/"),
    gin: resource("Gin documentation", "https://gin-gonic.com/docs/"),
    aspnet: resource("ASP.NET Core documentation", "https://learn.microsoft.com/en-us/aspnet/core/"),
    vue: resource("Vue documentation", "https://vuejs.org/guide/"),
    angular: resource("Angular documentation", "https://angular.dev/overview"),
    svelte: resource("Svelte documentation", "https://svelte.dev/docs"),
    postgres: resource("PostgreSQL documentation", "https://www.postgresql.org/docs/"),
    docker: resource("Docker documentation", "https://docs.docker.com/"),
    git: resource("Git documentation", "https://git-scm.com/doc"),
    actions: resource("GitHub Actions documentation", "https://docs.github.com/en/actions"),
    owasp: resource("OWASP Top 10", "https://owasp.org/www-project-top-ten/"),
    linux: resource("Linux documentation", "https://www.kernel.org/doc/html/latest/"),
    nginx: resource("Nginx documentation", "https://nginx.org/en/docs/"),
    webSecurity: resource("MDN: Web security", "https://developer.mozilla.org/en-US/docs/Web/Security"),
    webAccessibility: resource("MDN: Accessibility", "https://developer.mozilla.org/en-US/docs/Web/Accessibility"),
    webVitals: resource("Web Vitals", "https://web.dev/articles/vitals")
};

export const PATHWAY_OPTIONS = {
    frontend: {
        languages: [
            { id: "javascript", title: "JavaScript", description: "The language of interactive web experiences." },
            { id: "typescript", title: "TypeScript", description: "Typed JavaScript for safer, scalable applications." }
        ],
        frameworks: [
            { id: "react", title: "React", description: "Build component-driven user interfaces.", url: "https://react.dev/learn" },
            { id: "nextjs", title: "Next.js", description: "React framework for full-stack web applications.", url: "https://nextjs.org/docs", requires: ["react"] },
            { id: "vue", title: "Vue", description: "Progressive framework for building web interfaces.", url: "https://vuejs.org/guide/" },
            { id: "angular", title: "Angular", description: "Full-featured framework for web applications.", url: "https://angular.dev/overview" },
            { id: "svelte", title: "Svelte", description: "Compiler-based framework for concise interfaces.", url: "https://svelte.dev/docs" }
        ]
    },
    backend: {
        languages: [
            { id: "javascript", title: "JavaScript / Node.js", description: "Use JavaScript and Node.js to build server applications." },
            { id: "rust", title: "Rust", description: "Build efficient services with strong memory safety." },
            { id: "python", title: "Python", description: "Write readable services and automation." },
            { id: "java", title: "Java", description: "Build robust, object-oriented enterprise services." },
            { id: "go", title: "Go", description: "Create simple, concurrent network services." },
            { id: "csharp", title: "C# / .NET", description: "Develop modern services on the .NET platform." }
        ],
        frameworks: {
            javascript: [
                { id: "express", title: "Express.js", description: "Minimal, flexible Node.js web framework.", url: "https://expressjs.com/" },
                { id: "nestjs", title: "NestJS", description: "Structured Node.js framework for scalable services.", url: "https://docs.nestjs.com/" }
            ],
            rust: [
                { id: "axum", title: "Axum", description: "Ergonomic, modular Rust web application framework.", url: "https://docs.rs/axum/latest/axum/" }
            ],
            python: [
                { id: "fastapi", title: "FastAPI", description: "Modern Python framework for typed APIs.", url: "https://fastapi.tiangolo.com/" },
                { id: "django", title: "Django", description: "Batteries-included Python web framework.", url: "https://docs.djangoproject.com/" }
            ],
            java: [
                { id: "spring-boot", title: "Spring Boot", description: "Convention-based framework for Spring applications.", url: "https://docs.spring.io/spring-boot/" }
            ],
            go: [
                { id: "gin", title: "Gin", description: "HTTP web framework for Go.", url: "https://gin-gonic.com/docs/" }
            ],
            csharp: [
                { id: "aspnet-core", title: "ASP.NET Core", description: "Cross-platform framework for .NET web apps and APIs.", url: "https://learn.microsoft.com/en-us/aspnet/core/" }
            ]
        }
    }
};

export const DEFAULT_SELECTIONS = {
    frontend: {
        languages: ["javascript", "typescript"],
        frameworks: { javascript: ["react", "nextjs"], typescript: ["react", "nextjs"] }
    },
    backend: {
        languages: ["rust"],
        frameworks: { rust: ["axum"] }
    }
};

export const ALL_SELECTIONS = {
    frontend: {
        languages: PATHWAY_OPTIONS.frontend.languages.map((language) => language.id),
        frameworks: Object.fromEntries(PATHWAY_OPTIONS.frontend.languages.map((language) => [
            language.id,
            PATHWAY_OPTIONS.frontend.frameworks.map((framework) => framework.id)
        ]))
    },
    backend: {
        languages: PATHWAY_OPTIONS.backend.languages.map((language) => language.id),
        frameworks: Object.fromEntries(PATHWAY_OPTIONS.backend.languages.map((language) => [
            language.id,
            (PATHWAY_OPTIONS.backend.frameworks[language.id] ?? []).map((framework) => framework.id)
        ]))
    }
};

export const normalizeSelections = (value) => {
    const result = {};
    for (const track of ["frontend", "backend"]) {
        const options = PATHWAY_OPTIONS[track];
        const selection = value?.[track];
        const validLanguageIds = new Set(options.languages.map((language) => language.id));
        const selectedLanguages = Array.isArray(selection?.languages)
            ? [...new Set(selection.languages.filter((id) => validLanguageIds.has(id)))]
            : [];
        const frameworks = {};

        for (const languageId of selectedLanguages) {
            const availableFrameworks = track === "frontend"
                ? options.frameworks
                : options.frameworks[languageId] ?? [];
            const validFrameworkIds = new Set(availableFrameworks.map((framework) => framework.id));
            const selectedFrameworks = Array.isArray(selection?.frameworks?.[languageId])
                ? [...new Set(selection.frameworks[languageId].filter((id) => validFrameworkIds.has(id)))]
                : [];
            frameworks[languageId] = selectedFrameworks.filter((frameworkId) => {
                const framework = availableFrameworks.find((item) => item.id === frameworkId);
                return !framework?.requires || framework.requires.every((requiredId) => selectedFrameworks.includes(requiredId));
            });
        }
        result[track] = { languages: selectedLanguages, frameworks };
    }
    return result;
};

const categoryDefinitions = [
    {
        id: "software-engineering-fundamentals",
        title: "Software Engineering Fundamentals",
        description: "Core practices for designing, understanding, and maintaining software.",
        priority: "essential",
        topics: [
            "Software Development Life Cycle (SDLC)", "Requirements gathering", "Functional requirements",
            "Non-functional requirements", "Requirement analysis", "User stories", "Acceptance criteria",
            "Software development methodologies", "Agile fundamentals", "Scrum fundamentals", "Kanban fundamentals",
            "Software design principles", "Separation of concerns", "Single Responsibility Principle", "SOLID principles",
            "DRY principle", "KISS principle", "YAGNI principle", "Coupling and cohesion", "Modularity", "Abstraction",
            "Encapsulation", "Composition over inheritance", "Clean code", "Code readability", "Code maintainability",
            "Refactoring", "Technical debt", "Debugging methodologies", "Reading unfamiliar codebases",
            "Tracing application execution flow", "Understanding existing architecture"
        ]
    },
    {
        id: "programming-fundamentals",
        title: "Programming Fundamentals and Computer Science",
        description: "Build problem-solving skills and understand the foundations beneath applications.",
        priority: "essential",
        topics: [
            "Variables and data types", "Control flow", "Functions", "Scope", "Memory fundamentals", "Stack and heap",
            "References and pointers", "Data structures", "Arrays and vectors", "Linked lists", "Stacks and queues",
            "Hash maps and hash sets", "Trees", "Graphs", "Searching algorithms", "Sorting algorithms", "Recursion",
            "Time complexity", "Space complexity", "Big O notation", "Basic algorithm problem-solving",
            "Object-oriented programming", "Functional programming fundamentals", "Error handling",
            "Concurrency fundamentals", "Parallelism fundamentals", "Operating system fundamentals", "Processes and threads"
        ]
    },
    {
        id: "frontend-engineering",
        title: "Frontend Engineering",
        description: "Create accessible, responsive, interactive experiences for the web.",
        priority: "essential",
        groups: [
            {
                title: "HTML and CSS",
                topics: [
                    "Semantic HTML", "Accessibility fundamentals", "Forms and validation", "CSS selectors", "CSS specificity",
                    "Box model", "Flexbox", "CSS Grid", "Responsive design", "Media queries", "CSS positioning",
                    "CSS variables", "CSS architecture", "Browser rendering fundamentals", "Accessibility and keyboard navigation"
                ]
            },
            {
                title: "JavaScript",
                topics: [
                    "JavaScript fundamentals", "ES6+ features", "DOM manipulation", "Event handling", "Event propagation",
                    "Event delegation", "Asynchronous JavaScript", "Promises", "Async/await", "Fetch API", "Error handling",
                    "Modules and imports", "Closures", "Scope and hoisting", "The event loop", "Browser APIs",
                    "LocalStorage and SessionStorage", "JavaScript debugging"
                ]
            },
            {
                title: "TypeScript",
                topics: [
                    "Type annotations", "Interfaces and type aliases", "Union and intersection types", "Generics",
                    "Type narrowing", "Utility types", "Type inference", "Strict mode", "Typing API responses",
                    "Typing reusable components"
                ]
            },
            {
                title: "React",
                topics: [
                    "Components", "Props", "State", "Rendering and reconciliation", "Component composition",
                    "Conditional rendering", "Lists and keys", "Event handling", "useState", "useEffect", "useContext",
                    "useReducer", "Custom hooks", "State management", "Controlled components", "Form handling",
                    "Component lifecycle concepts", "Error boundaries", "React performance fundamentals", "Code splitting",
                    "Component architecture", "Data fetching", "Frontend error handling"
                ]
            },
            {
                title: "Next.js",
                topics: [
                    "App Router", "Server Components", "Client Components", "Server-side rendering", "Static rendering",
                    "Dynamic rendering", "Route handlers", "Layouts and nested routing", "Loading and error boundaries",
                    "Server actions fundamentals", "Caching fundamentals", "Metadata and SEO", "Environment variables",
                    "Production builds"
                ]
            }
        ]
    },
    {
        id: "backend-engineering",
        title: "Backend Engineering",
        description: "Design robust services, APIs, and server-side applications.",
        priority: "essential",
        groups: [
            {
                title: "Backend fundamentals",
                topics: [
                    "Client-server architecture", "Backend application architecture", "Request-response lifecycle",
                    "REST API design", "HTTP methods", "HTTP status codes", "Request headers", "Request bodies",
                    "Response formats", "Middleware", "Routing", "Input validation", "Error handling", "Authentication",
                    "Authorization", "Logging", "Configuration management", "Environment variables", "Dependency management",
                    "Service layer", "Repository pattern", "Dependency injection fundamentals"
                ]
            },
            {
                title: "Rust",
                topics: [
                    "Cargo and project structure", "Variables and mutability", "Primitive and compound data types",
                    "Ownership", "Borrowing", "References", "Lifetimes", "Structs", "Enums", "Pattern matching", "Option",
                    "Result", "Error propagation", "Traits", "Generics", "Modules and visibility", "Collections",
                    "Iterators", "Closures", "Smart pointers", "Interior mutability", "Concurrency", "Threads", "Channels",
                    "Async and await", "Futures", "Tokio runtime", "Rust project organization", "Testing Rust applications"
                ]
            },
            {
                title: "Rust web development",
                topics: [
                    "Axum fundamentals", "Routing", "Handlers", "Extractors", "Request validation", "Middleware",
                    "State management", "Error responses", "Authentication", "Database integration", "SQLx",
                    "Connection pooling", "Application configuration", "Structured logging", "API integration testing"
                ]
            }
        ]
    },
    {
        id: "databases-data-engineering",
        title: "Databases and Data Engineering",
        description: "Model, query, secure, and operate persistent application data.",
        priority: "essential",
        topics: [
            "Relational databases", "SQL fundamentals", "Database schema design", "Tables and columns", "Primary keys",
            "Foreign keys", "Unique constraints", "Check constraints", "One-to-one relationships", "One-to-many relationships",
            "Many-to-many relationships", "Joins", "Aggregations", "Subqueries", "Indexes", "Query optimization",
            "Database normalization", "Transactions", "ACID properties", "Isolation levels", "Concurrency control",
            "Database migrations", "Connection pooling", "Database backups", "Database restoration", "PostgreSQL",
            "ORM fundamentals", "Raw SQL vs. ORM", "Data modeling", "Database security"
        ]
    },
    {
        id: "networking-web-fundamentals",
        title: "Networking and Web Fundamentals",
        description: "Understand how browsers, services, and networks communicate.",
        priority: "essential",
        topics: [
            "How the internet works", "Client-server communication", "IP addresses", "Ports", "TCP", "UDP", "DNS",
            "Domain names", "HTTP", "HTTPS", "TLS", "Request-response lifecycle", "HTTP headers", "Cookies", "Sessions",
            "CORS", "CSRF", "REST architecture", "JSON", "WebSockets fundamentals", "Reverse proxies",
            "Load balancing fundamentals", "CDN fundamentals", "Browser networking tools", "Network debugging"
        ]
    },
    {
        id: "software-architecture-system-design",
        title: "Software Architecture and System Design",
        description: "Make deliberate design choices and reason about evolving systems.",
        priority: "important",
        topics: [
            "Architecture fundamentals", "Monolithic architecture", "Modular monolith", "Microservices architecture",
            "Layered architecture", "Clean architecture", "Hexagonal architecture", "Domain-driven design fundamentals",
            "Separation of concerns", "Dependency inversion", "SOLID principles in architecture", "Component boundaries",
            "Service boundaries", "API contracts", "Database design in system architecture", "Synchronous communication",
            "Asynchronous communication", "Message queues", "Caching strategies", "Scalability fundamentals", "Availability",
            "Reliability", "Fault tolerance", "System design documentation", "Architecture decision records (ADR)",
            "UML fundamentals", "Sequence diagrams", "Entity relationship diagrams", "Trade-off analysis", "Design patterns",
            "Event-driven architecture fundamentals"
        ]
    },
    {
        id: "testing-security-quality",
        title: "Testing, Security and Quality Assurance",
        description: "Validate behavior and reduce security and reliability risks.",
        priority: "essential",
        groups: [
            {
                title: "Testing",
                topics: [
                    "Testing fundamentals", "Unit testing", "Integration testing", "End-to-end testing", "API testing",
                    "Component testing", "Regression testing", "Test isolation", "Mocking and stubbing", "Test fixtures",
                    "Test coverage", "Test-driven development", "Automated testing", "Test environments",
                    "Debugging failing tests"
                ]
            },
            {
                title: "Security",
                topics: [
                    "Authentication vs. authorization", "Password hashing", "Secure session management", "JWT fundamentals",
                    "HTTP-only cookies", "CSRF protection", "XSS prevention", "SQL injection prevention", "Input validation",
                    "Output encoding", "CORS configuration", "Rate limiting", "Secrets management",
                    "Secure environment configuration", "Dependency vulnerability scanning", "OWASP Top 10",
                    "Least privilege", "Security headers", "HTTPS enforcement"
                ]
            }
        ]
    },
    {
        id: "devops-infrastructure-cicd",
        title: "DevOps, Infrastructure and CI/CD",
        description: "Automate collaboration, builds, and reliable infrastructure operations.",
        priority: "essential",
        groups: [
            {
                title: "Linux and server administration",
                topics: [
                    "Linux filesystem", "File permissions", "Users and groups", "Processes", "Services and daemons",
                    "Shell scripting fundamentals", "SSH", "Environment configuration", "System logs", "Resource monitoring",
                    "Server troubleshooting"
                ]
            },
            {
                title: "Git and collaboration",
                topics: [
                    "Git fundamentals", "Branching strategies", "Merge and rebase", "Conflict resolution", "Pull requests",
                    "Code reviews", "Commit conventions", "Git tags", "Release management", "GitHub workflows"
                ]
            },
            {
                title: "Docker",
                topics: [
                    "Container fundamentals", "Images and containers", "Dockerfiles", "Docker Compose", "Container networking",
                    "Volumes", "Persistent storage", "Environment variables", "Multi-stage builds", "Container security",
                    "Container troubleshooting"
                ]
            },
            {
                title: "CI/CD",
                topics: [
                    "Continuous Integration", "Continuous Delivery", "Continuous Deployment", "GitHub Actions",
                    "Workflow configuration", "Automated testing pipelines", "Build pipelines", "Deployment pipelines",
                    "Pipeline secrets", "Artifact management", "Deployment environments", "Rollback strategies"
                ]
            },
            {
                title: "Cloud and infrastructure",
                topics: [
                    "Cloud computing fundamentals", "VPS fundamentals", "Cloud infrastructure concepts",
                    "Infrastructure provisioning", "Reverse proxy configuration", "Nginx", "Domain configuration",
                    "DNS configuration", "SSL certificates", "TLS configuration", "Firewall fundamentals", "Server security",
                    "Cloud storage fundamentals"
                ]
            }
        ]
    },
    {
        id: "production-deployment-maintenance",
        title: "Production Deployment and Maintenance",
        description: "Deploy, observe, recover, and maintain production systems.",
        priority: "essential",
        topics: [
            "Development vs. staging vs. production", "Production environment configuration", "Production builds",
            "Frontend deployment", "Backend deployment", "Database deployment", "Docker-based deployment",
            "VPS deployment", "Domain configuration", "DNS records", "HTTPS configuration", "Reverse proxy deployment",
            "Environment secrets", "Database migrations in production", "Database backup strategies", "Database restoration",
            "Application logging", "Structured logs", "Health checks", "Monitoring fundamentals", "Application metrics",
            "Error tracking", "Performance monitoring", "Troubleshooting production issues", "Application updates",
            "Zero-downtime deployment fundamentals", "Rollback procedures", "Disaster recovery fundamentals"
        ]
    },
    {
        id: "professional-engineering-workflow",
        title: "Professional Engineering Workflow",
        description: "Plan, communicate, review, and deliver software with a team.",
        priority: "important",
        topics: [
            "Project planning", "Feature breakdown", "Task estimation", "Technical specifications", "API documentation",
            "README documentation", "Code documentation", "Architecture documentation", "Issue tracking", "GitHub Projects",
            "Pull request reviews", "Collaborative development", "Versioning", "Semantic Versioning", "Changelogs",
            "Release notes", "Technical decision-making", "Code review practices", "Working with legacy code",
            "Refactoring existing systems", "Dependency updates", "Engineering trade-offs",
            "Reading technical documentation", "Evaluating third-party libraries", "Open-source contribution fundamentals"
        ]
    },
    {
        id: "advanced-specialized-topics",
        title: "Advanced and Specialized Topics",
        description: "Optional paths for deeper specialization beyond the core roadmap.",
        priority: "advanced",
        topics: [
            "Redis", "Advanced caching", "Message brokers", "RabbitMQ", "Kafka fundamentals", "GraphQL", "gRPC",
            "WebSockets", "Distributed systems", "Event-driven systems", "Kubernetes", "Infrastructure as Code",
            "Terraform", "Cloud architecture", "AWS fundamentals", "Observability", "OpenTelemetry",
            "Advanced PostgreSQL optimization", "Advanced concurrency", "Advanced system design",
            "Horizontal and vertical scaling", "High availability", "Distributed transactions", "Disaster recovery planning"
        ]
    }
];

const topicResourceMap = {
    "Semantic HTML": ["mdnHtml"],
    "Accessibility fundamentals": ["webAccessibility"],
    "Forms and validation": ["mdnHtml"],
    "CSS selectors": ["mdnCss"],
    "Responsive design": ["mdnCss"],
    "JavaScript fundamentals": ["mdnJs"],
    "ES6+ features": ["mdnJs"],
    "DOM manipulation": ["mdn"],
    "Asynchronous JavaScript": ["mdnJs"],
    "Promises": ["mdnJs"],
    "Async/await": ["mdnJs"],
    "Fetch API": ["mdnFetch"],
    "LocalStorage and SessionStorage": ["mdnStorage"],
    "Type annotations": ["typescript"],
    "Interfaces and type aliases": ["typescript"],
    "Generics": ["typescript", "rust"],
    "Components": ["react"],
    "Props": ["react"],
    "State": ["react"],
    "useState": ["react"],
    "useEffect": ["react"],
    "App Router": ["next"],
    "Server Components": ["next"],
    "REST API design": ["mdnHttp"],
    "HTTP methods": ["mdnHttp"],
    "HTTP status codes": ["mdnHttp"],
    "Ownership": ["rust"],
    "Borrowing": ["rust"],
    "Lifetimes": ["rust"],
    "Traits": ["rust"],
    "Option": ["rust"],
    "Result": ["rust"],
    "Axum fundamentals": ["axum"],
    "Express app setup": ["express"],
    "NestJS project structure": ["nest"],
    "FastAPI application setup": ["fastapi"],
    "Django project structure": ["django"],
    "Spring Boot project setup": ["spring"],
    "Gin application setup": ["gin"],
    "ASP.NET Core project setup": ["aspnet"],
    "Vue application setup": ["vue"],
    "Angular application setup": ["angular"],
    "Svelte application setup": ["svelte"],
    "PostgreSQL": ["postgres"],
    "SQL fundamentals": ["postgres"],
    "HTTP": ["mdnHttp"],
    "HTTPS": ["mdnHttp", "webSecurity"],
    "OWASP Top 10": ["owasp"],
    "XSS prevention": ["webSecurity", "owasp"],
    "SQL injection prevention": ["owasp"],
    "Linux filesystem": ["linux"],
    "Git fundamentals": ["git"],
    "Docker": ["docker"],
    "Dockerfiles": ["docker"],
    "Docker Compose": ["docker"],
    "GitHub Actions": ["actions"],
    "Nginx": ["nginx"],
    "Performance monitoring": ["webVitals"]
};

const descriptionFor = (title, categoryTitle, groupTitle) => {
    const area = groupTitle ? `${groupTitle.toLowerCase()} ` : "";
    return `Learn the core concepts, practical applications, and common trade-offs of ${title} in ${area}${categoryTitle.toLowerCase()}.`;
};

const slugify = (value) => value
    .toLowerCase()
    .replaceAll("&", " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const createTopic = (category, title, groupTitle) => {
    const resourceKeys = topicResourceMap[title] ?? [];
    return {
        id: `${category.id}-${groupTitle ? `${slugify(groupTitle)}-` : ""}${slugify(title)}`,
        title,
        description: descriptionFor(title, category.title, groupTitle),
        priority: category.id === "advanced-specialized-topics" ? "advanced" : category.priority,
        ...(resourceKeys.length
            ? { resources: resourceKeys.map((key) => resourceCatalog[key]) }
            : {})
    };
};

const backendLanguageTopics = {
    javascript: {
        title: "Node.js fundamentals",
        topics: [
            "Node.js runtime and event loop", "npm and package management", "CommonJS and ES modules",
            "Asynchronous I/O", "Promises and async/await", "Environment and process APIs",
            "Streams and buffers", "Error handling in Node.js", "Configuration and secrets",
            "Node.js testing", "Building HTTP servers"
        ]
    },
    python: {
        title: "Python",
        topics: [
            "Python syntax and data types", "Functions and modules", "Virtual environments and pip",
            "Classes and object-oriented Python", "Exceptions and error handling", "Type hints",
            "Iterators and generators", "Asyncio fundamentals", "Python package structure", "Python testing"
        ]
    },
    java: {
        title: "Java",
        topics: [
            "Java syntax and types", "Classes and interfaces", "Collections framework", "Generics",
            "Exception handling", "Build tools and dependencies", "Streams and lambdas", "Concurrency fundamentals",
            "Java project structure", "Java testing"
        ]
    },
    go: {
        title: "Go",
        topics: [
            "Go syntax and types", "Functions and methods", "Structs and interfaces", "Packages and modules",
            "Errors and error handling", "Slices and maps", "Goroutines and channels", "Context and cancellation",
            "Go project structure", "Go testing"
        ]
    },
    csharp: {
        title: "C# and .NET",
        topics: [
            "C# syntax and types", "Classes and records", "Interfaces and generics", "LINQ",
            "Async and await", "Exception handling", ".NET SDK and project structure", "NuGet packages",
            "Dependency injection", "C# testing"
        ]
    }
};

const backendFrameworks = {
    javascript: {
        express: {
            title: "Express.js",
            topics: ["Express app setup", "Routing and route parameters", "Middleware", "Request validation",
                "Error handling middleware", "REST API construction", "Authentication", "Database integration",
                "Testing Express applications"]
        },
        nestjs: {
            title: "NestJS",
            topics: ["NestJS project structure", "Modules and dependency injection", "Controllers and providers",
                "Request validation", "Guards and authentication", "Interceptors and pipes", "Database integration",
                "Configuration and logging", "Testing NestJS applications"]
        }
    },
    python: {
        fastapi: {
            title: "FastAPI",
            topics: ["FastAPI application setup", "Path and query parameters", "Pydantic request models",
                "Dependency injection", "Response models and status codes", "Error handling", "Authentication",
                "Database integration", "Async endpoints", "API testing"]
        },
        django: {
            title: "Django",
            topics: ["Django project structure", "Models and migrations", "Views and URL routing", "Templates",
                "Forms and validation", "Django admin", "Authentication and permissions", "Django REST APIs",
                "Database queries", "Django testing"]
        }
    },
    java: {
        "spring-boot": {
            title: "Spring Boot",
            topics: ["Spring Boot project setup", "Dependency injection and beans", "Controllers and routing",
                "Request validation", "Service and repository layers", "Spring Data", "Security fundamentals",
                "Configuration and profiles", "Logging and monitoring", "Spring Boot testing"]
        }
    },
    go: {
        gin: {
            title: "Gin",
            topics: ["Gin application setup", "Routes and route groups", "Handlers and context", "Middleware",
                "Request binding and validation", "Error responses", "Database integration", "Authentication",
                "Configuration and logging", "Gin API testing"]
        }
    },
    csharp: {
        "aspnet-core": {
            title: "ASP.NET Core",
            topics: ["ASP.NET Core project setup", "Middleware pipeline", "Minimal APIs and controllers",
                "Dependency injection", "Model binding and validation", "Error handling", "Authentication and authorization",
                "Entity Framework Core", "Configuration and logging", "ASP.NET Core testing"]
        }
    }
};

const frontendFrameworkTopics = {
    vue: {
        title: "Vue",
        topics: ["Vue application setup", "Single-file components", "Template syntax", "Reactivity fundamentals",
            "Props and events", "Computed properties and watchers", "Component composition", "Vue Router",
            "Forms and validation", "Data fetching", "Vue testing"]
    },
    angular: {
        title: "Angular",
        topics: ["Angular application setup", "Components and templates", "Binding and directives",
            "Services and dependency injection", "Routing", "Forms and validation", "HTTP client and data fetching",
            "Signals and reactive state", "Application testing", "Production builds"]
    },
    svelte: {
        title: "Svelte",
        topics: ["Svelte application setup", "Components and markup", "Reactivity and state", "Props and events",
            "Conditional rendering and lists", "Component composition", "Forms and bindings", "Data fetching",
            "SvelteKit fundamentals", "Svelte testing"]
    }
};

const sourceGroup = (categoryId, title) =>
    categoryDefinitions.find((category) => category.id === categoryId)?.groups?.find((group) => group.title === title);

const frontendFrameworkGroup = (frameworkId) => {
    if (frameworkId === "react") {
        return sourceGroup("frontend-engineering", "React");
    }
    if (frameworkId === "nextjs") {
        return sourceGroup("frontend-engineering", "Next.js");
    }
    return frontendFrameworkTopics[frameworkId];
};

export const buildRoadmap = (inputSelections = DEFAULT_SELECTIONS) => {
    const selections = normalizeSelections(inputSelections);
    return categoryDefinitions.map((category) => {
        let groups = category.groups;
        if (category.id === "frontend-engineering") {
            groups = [
                sourceGroup(category.id, "HTML and CSS"),
                ...selections.frontend.languages.map((languageId) =>
                    sourceGroup(category.id, languageId === "javascript" ? "JavaScript" : "TypeScript")
                ),
                ...[...new Set(selections.frontend.languages.flatMap((languageId) => selections.frontend.frameworks[languageId] ?? []))]
                    .map((frameworkId) => frontendFrameworkGroup(frameworkId))
            ];
        } else if (category.id === "backend-engineering") {
            groups = [
                sourceGroup(category.id, "Backend fundamentals"),
                ...selections.backend.languages.map((languageId) => languageId === "rust"
                    ? sourceGroup(category.id, "Rust")
                    : backendLanguageTopics[languageId]),
                ...selections.backend.languages.flatMap((languageId) =>
                    (selections.backend.frameworks[languageId] ?? []).map((frameworkId) =>
                        languageId === "rust"
                            ? sourceGroup(category.id, "Rust web development")
                            : backendFrameworks[languageId][frameworkId]
                    )
                )
            ];
        }

        const validGroups = (groups ?? []).filter(Boolean);
        const topics = category.topics
            ? category.topics.map((title) => createTopic(category, title, null))
            : validGroups.flatMap((group) =>
                group.topics.map((title) => createTopic(category, title, group.title))
            );
        return {
            id: category.id,
            title: category.title,
            description: category.description,
            priority: category.priority,
            topics,
            groups: category.topics
                ? undefined
                : validGroups.map((group) => ({
                    title: group.title,
                    topicIds: group.topics.map((title) =>
                        `${category.id}-${slugify(group.title)}-${slugify(title)}`
                    )
                }))
        };
    });
};

export const roadmap = buildRoadmap();
export const allTopics = buildRoadmap(ALL_SELECTIONS).flatMap((category) => category.topics);
