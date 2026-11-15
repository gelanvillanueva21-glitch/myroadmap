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

export const roadmap = categoryDefinitions.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    priority: category.priority,
    topics: (category.groups ?? [{ title: null, topics: category.topics }]).flatMap((group) =>
        group.topics.map((title) => createTopic(category, title, group.title))
    ),
    groups: category.groups
        ? category.groups.map((group) => ({
            title: group.title,
            topicIds: group.topics.map((title) => `${category.id}-${slugify(group.title)}-${slugify(title)}`)
        }))
        : undefined
}));

export const allTopics = roadmap.flatMap((category) => category.topics);
