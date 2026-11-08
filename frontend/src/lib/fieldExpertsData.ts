/**
 * Field Experts & Mentors Intelligence Compendium
 * Comprehensive multi-sector registry of world-class Titans, Contemporary Achievers,
 * and Grounded Reachable Mentors curated for Abhishek Gangadhar.
 */

export type ExpertSector =
  | 'tech_coding'
  | 'ai_machine_learning'
  | 'economics_finance'
  | 'space_physics'
  | 'startups_business'
  | 'geopolitics_strategy'
  | 'psychology_mentalism'
  | 'inventions_hardware'
  | 'history_civilization'
  | 'arts_creative_direction';

export type ExpertTier =
  | 'titan'        // Legendary Master / Field Pioneer
  | 'achiever'     // Contemporary High-Impact Leader / CEO / Researcher
  | 'grounded';    // Accessible Practitioner / Grassroots Mentor / Reachable via Cold Email

export interface ExpertProfile {
  id: string;
  name: string;
  slug: string;
  title: string;
  organization: string;
  sector: ExpertSector;
  tier: ExpertTier;
  ageOrEra: string;
  location: string;
  nationality: string;
  status: 'Living & Active' | 'Historical Master' | 'Active Practitioner';

  // Contact & Outreach Channels
  reachOutChannel: string;
  emailOrContact?: string;
  socials: {
    xTwitter?: string;
    linkedIn?: string;
    github?: string;
    website?: string;
    youtubeOrPodcast?: string;
  };
  coldOutreachAngle: string;

  // Biography & Contributions
  biography: string;
  breakthroughContributions: string[];
  currentWork: string;

  // Personalized Intelligence for Abhishek Gangadhar
  whyInMyList: string;
  whatICanLearn: string[];
  howTheyCanHelpMe: string;
  recommendedMaterials: string[];
}

const STORAGE_KEY = 'jarvis_field_experts_registry';

export const SECTOR_METADATA: Record<ExpertSector, { label: string; icon: string }> = {
  tech_coding: { label: 'Technology & Architecture', icon: '💻' },
  ai_machine_learning: { label: 'AI & Deep Learning', icon: '🤖' },
  inventions_hardware: { label: 'Inventions & Hardware', icon: '⚡' },
  economics_finance: { label: 'Economics & Capital', icon: '💰' },
  startups_business: { label: 'Startups & Business Titans', icon: '📈' },
  space_physics: { label: 'Space, Aerospace & Physics', icon: '🚀' },
  geopolitics_strategy: { label: 'Geopolitics & Grand Strategy', icon: '🏛️' },
  psychology_mentalism: { label: 'Psychology & Mentalism', icon: '🧠' },
  history_civilization: { label: 'History & Civilizations', icon: '🌍' },
  arts_creative_direction: { label: 'Design & Creative Arts', icon: '🎨' },
};

export const INITIAL_EXPERTS: ExpertProfile[] = [
  // 1. TECHNOLOGY & ARCHITECTURE
  {
    id: 'exp-carmack',
    name: 'John Carmack',
    slug: 'john-carmack',
    title: 'Legendary 3D Engine Architect & Founder',
    organization: 'Keen Technologies (Former id Software & Oculus VR)',
    sector: 'tech_coding',
    tier: 'titan',
    ageOrEra: '54 (Born 1970)',
    location: 'Dallas, Texas, USA',
    nationality: 'American',
    status: 'Living & Active',
    reachOutChannel: 'X (Twitter) Public Replies & Technical Threads',
    emailOrContact: 'johncarmack@x.com (Active on X)',
    socials: {
      xTwitter: 'https://x.com/ID_AA_Carmack',
      website: 'https://en.wikipedia.org/wiki/John_Carmack',
    },
    coldOutreachAngle:
      'Direct, zero-fluff technical question comparing WebGL vertex shader memory bandwith against WebAssembly SIMD topological CAD algorithms.',
    biography:
      'Pioneer of modern real-time 3D computer graphics. Creator of Commander Keen, Wolfenstein 3D, Doom, and Quake. Revolutionized binary space partitioning (BSP trees), surface caching, Carmack Reverse shadow volumes, and mobile VR optimization at Oculus.',
    breakthroughContributions: [
      'Pioneered real-time 3D rasterization algorithms that birthed modern computer graphics',
      'Fast inverse square root mathematical optimization implementations',
      'Open-sourced historic game engines establishing gold standards for clean C/C++ architecture',
    ],
    currentWork:
      'Conducting solitary, deep-focus AGI engineering research at Keen Technologies, focusing on reinforcement learning and neural symbolic algorithms.',
    whyInMyList:
      'Primary North Star for StarkForge CAD engine. Carmack proves that a single engineer with obsessive focus and deep first-principles mathematical rigor can outperform entire corporate divisions.',
    whatICanLearn: [
      'Relentless work ethic: 60-hour focused coding weeks without meetings or distractions',
      'Write clean, transparent C-style code over overly convoluted OOP abstractions',
      'Optimize at the hardware memory and cache-line level rather than trusting generic runtimes',
    ],
    howTheyCanHelpMe:
      'Benchmark for StarkForge CAD 60 FPS topological meshing pipeline. Study his Quake engine design to structure WebGL memory buffers.',
    recommendedMaterials: [
      'Masters of Doom by David Kushner',
      'John Carmack Lex Fridman Podcast Episodes (#267 and #309)',
      'John Carmacks Historic .plan files and engine release notes',
    ],
  },
  {
    id: 'exp-bellard',
    name: 'Fabrice Bellard',
    slug: 'fabrice-bellard',
    title: 'Prolific Solo Systems & Emulation Polymath',
    organization: 'Independent Creator / QuickJS / TinyCC',
    sector: 'tech_coding',
    tier: 'titan',
    ageOrEra: '54 (Born 1972)',
    location: 'Paris, France',
    nationality: 'French',
    status: 'Living & Active',
    reachOutChannel: 'Direct Technical Email (Plain Text)',
    emailOrContact: 'fabrice@bellard.org',
    socials: {
      website: 'https://bellard.org',
    },
    coldOutreachAngle:
      'Concise, polite technical email citing a specific performance benchmark in QuickJS or TinyCC with an architectural fix or patch.',
    biography:
      'Widely regarded as one of the most prolific living software engineers in history. Single-handedly created FFmpeg (the media engine that powers YouTube, VLC, and Netflix), QEMU (hardware virtualizer powering Android emulator and cloud clouds), TinyCC (fastest C compiler), QuickJS (micro JavaScript runtime in pure C), and computed Pi to world-record digits on a single PC.',
    breakthroughContributions: [
      'Created FFmpeg from scratch — the universal standard for video/audio decoding',
      'Created QEMU — foundational CPU emulator powering global cloud virtual machines',
      'Created QuickJS — zero-dependency micro JavaScript engine fitting in embedded microcontrollers',
    ],
    currentWork:
      'Developing high-efficiency neural compression and ultra-compact LLM runtimes (TS-LLM) running on consumer CPU architectures.',
    whyInMyList:
      'Proves that multi-billion dollar foundational infrastructure (FFmpeg, QEMU) can be conceived and brought to production by one individual.',
    whatICanLearn: [
      'Mastery over C and machine-level binary formats',
      'High productivity without large teams: deep understanding of specifications and clean architecture',
      'Ability to build foundational cross-platform tools that endure for decades',
    ],
    howTheyCanHelpMe:
      'Direct blueprint for the Sovereign Microkernel OS sandbox. Bellards QEMU and TinyCC architectures provide the exact mental models for Abhishek to implement browser process isolation.',
    recommendedMaterials: [
      'Bellards personal website publications: bellard.org',
      'FFmpeg and QuickJS architectural source trees on GitHub',
    ],
  },
  {
    id: 'exp-mrdoob',
    name: 'Ricardo Cabello (Mr.doob)',
    slug: 'ricardo-cabello-mrdoob',
    title: 'Creator & Lead Architect of Three.js',
    organization: 'Three.js / Open Source WebGL Ecosystem',
    sector: 'tech_coding',
    tier: 'grounded',
    ageOrEra: '40s',
    location: 'Barcelona, Spain / London, UK',
    nationality: 'Spanish',
    status: 'Active Practitioner',
    reachOutChannel: 'GitHub Discussions & X (Twitter) DM',
    emailOrContact: 'info@mrdoob.com',
    socials: {
      xTwitter: 'https://x.com/mrdoob',
      github: 'https://github.com/mrdoob',
      website: 'https://mrdoob.com',
    },
    coldOutreachAngle:
      'Share a live Netlify demo of StarkForge CAD showcasing custom GLSL shaders and topological WebGL geometry with a question on scene graph batching.',
    biography:
      'Self-taught creative technologist who democratized 3D graphics on the web by creating Three.js in 2010. Built the foundational WebGL library that powers thousands of 3D games, architectural visualizers, and spatial applications across the internet.',
    breakthroughContributions: [
      'Created and maintained Three.js for over 15 years with over 100,000 GitHub stars',
      'Democratized WebGL, WebGPU, and browser shaders for millions of developers worldwide',
    ],
    currentWork:
      'Architecting Three.js transition to WebGPU, TSL (Three Shading Language), and WebXR spatial computing.',
    whyInMyList:
      'Direct mentor and ecosystem creator for StarkForge CAD. Accessible, grounded practitioner who actively engages with developers pushing WebGL boundaries.',
    whatICanLearn: [
      'How to build an intuitive, elegant API over complex graphics driver interfaces',
      'Maintaining an open-source standard for 15+ years with consistent releases',
      'Community management and collaborative engineering excellence',
    ],
    howTheyCanHelpMe:
      'Abhishek can submit StarkForge CAD custom geometry shaders as Three.js showcase examples or receive architectural guidance on WebGPU pipeline migration.',
    recommendedMaterials: [
      'Three.js Source Repository on GitHub',
      'Mr.doob technical interviews on WebGL and Creative Coding',
    ],
  },

  // 2. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
  {
    id: 'exp-sutskever',
    name: 'Ilya Sutskever',
    slug: 'ilya-sutskever',
    title: 'Co-Founder & Former Chief Scientist of OpenAI',
    organization: 'Safe Superintelligence Inc. (SSI)',
    sector: 'ai_machine_learning',
    tier: 'titan',
    ageOrEra: '39 (Born 1985)',
    location: 'Palo Alto, California, USA',
    nationality: 'Canadian / Israeli',
    status: 'Living & Active',
    reachOutChannel: 'Academic Research Preprints & SSI Team Outreach',
    emailOrContact: 'contact@ssi.inc',
    socials: {
      xTwitter: 'https://x.com/ilyasut',
      website: 'https://ssi.inc',
    },
    coldOutreachAngle:
      'Submitting an original research paper or mathematical monograph exploring transformer self-attention reasoning stability under distributed microkernel constraints.',
    biography:
      'Key pioneer of modern deep learning. Co-creator of AlexNet (which sparked the deep learning revolution in 2012), Sequence-to-Sequence learning, AlphaGo, and GPT-1 through GPT-4. Believed in the scaling hypothesis long before the rest of the world.',
    breakthroughContributions: [
      'Co-invented AlexNet, proving GPUs can train deep convolutional neural networks',
      'Co-invented Sequence to Sequence learning with attention mechanisms',
      'Chief architect behind GPT-2, GPT-3, GPT-4, and the RLHF paradigm',
    ],
    currentWork:
      'Building Safe Superintelligence Inc. (SSI), dedicated to solving AI alignment and building safe superintelligent systems straight through a singular focus without product distractions.',
    whyInMyList:
      'Represents deep conviction in foundational scaling laws. Inspires Abhishek to maintain uncompromising conviction in autonomous intelligence and sovereign reasoning architectures.',
    whatICanLearn: [
      'Unwavering intellectual conviction when pursuing counter-intuitive scientific breakthroughs',
      'First-principles mathematical understanding of deep learning models',
      'Refusal to get sidetracked by short-term commercial hype',
    ],
    howTheyCanHelpMe:
      'Theoretical blueprint for A.V.I.S. neural copilot reasoning loops. Study his papers to optimize local LLM context distillation.',
    recommendedMaterials: [
      'AlexNet 2012 NeurIPS Paper',
      'Ilya Sutskever 30 Must-Read AI Papers list',
      'Dwarkesh Patel Podcast with Ilya Sutskever',
    ],
  },
  {
    id: 'exp-karpathy',
    name: 'Andrej Karpathy',
    slug: 'andrej-karpathy',
    title: 'Leading AI Educator, Former Tesla AI Director & OpenAI Founding Member',
    organization: 'Eureka Labs / Autonomous Creator',
    sector: 'ai_machine_learning',
    tier: 'achiever',
    ageOrEra: '38 (Born 1986)',
    location: 'San Francisco, California, USA',
    nationality: 'Slovak / Canadian',
    status: 'Living & Active',
    reachOutChannel: 'X (Twitter) Replies & GitHub Pull Requests',
    emailOrContact: 'karpathy@gmail.com',
    socials: {
      xTwitter: 'https://x.com/karpathy',
      github: 'https://github.com/karpathy',
      youtubeOrPodcast: 'https://youtube.com/@AndrejKarpathy',
      website: 'https://karpathy.ai',
    },
    coldOutreachAngle:
      'Concise GitHub PR or insightful technical reproduction of llm.c / micrograd running on custom WASM threads with benchmark metrics.',
    biography:
      'World-renowned computer scientist and educator. Creator of Stanford CS231n (Convolutional Neural Networks). Led the computer vision team for Tesla Full Self-Driving (FSD) and Autopilot. Built llm.c and micrograd from first principles in pure C and Python.',
    breakthroughContributions: [
      'Directed Tesla FSD neural vision architecture and data engine Dojo',
      'Created micrograd, nanoGPT, and llm.c demonstrating raw training from scratch in C',
      'Taught millions of engineers the deepest mechanics of modern neural networks',
    ],
    currentWork:
      'Founding Eureka Labs — an AI-native education institute creating symbiotic human-AI learning environments.',
    whyInMyList:
      'The ultimate role model for software clarity: understands systems so deeply that he can write them from scratch in pure C with zero third-party dependencies.',
    whatICanLearn: [
      'Learn by building from raw scratch: never trust a framework until you can build its micro-version yourself',
      'Extreme clarity in technical communication and documentation',
      'Combining theoretical AI depth with low-level C systems execution',
    ],
    howTheyCanHelpMe:
      'Direct architectural inspiration for A.V.I.S. local telemetry engine and StarkForge CAD memory models. Study llm.c to run local neural models inside browser threads.',
    recommendedMaterials: [
      'Neural Networks: Zero to Hero YouTube Series',
      'llm.c repository on GitHub',
      'State of GPT Keynote (Microsoft Build 2023)',
    ],
  },

  // 3. INVENTIONS, HARDWARE & DEEP CHIPS
  {
    id: 'exp-keller',
    name: 'Jim Keller',
    slug: 'jim-keller',
    title: 'Legendary Silicon Architect & CEO',
    organization: 'Tenstorrent (Former AMD, Apple, Tesla, Intel)',
    sector: 'inventions_hardware',
    tier: 'titan',
    ageOrEra: '65 (Born 1959)',
    location: 'Silicon Valley, California, USA',
    nationality: 'American',
    status: 'Living & Active',
    reachOutChannel: 'Tenstorrent Developer Forum & Technical Podcasts',
    emailOrContact: 'info@tenstorrent.com',
    socials: {
      xTwitter: 'https://x.com/jimkxo',
      website: 'https://tenstorrent.com',
    },
    coldOutreachAngle:
      'Sharing an architectural diagram of Sovereign OS hardware memory isolation on RISC-V with a focused question on bus arbitration.',
    biography:
      'The undisputed titan of modern computer microprocessor design. Designed AMD K7/K8 (Athlon 64), Apple A4 and A5 chips (which powered the iPhone 4/4S and iPad revolution), AMD Zen architecture (which revived AMD against Intel), Tesla Full Self-Driving hardware, and now leads Tenstorrent developing RISC-V AI processors.',
    breakthroughContributions: [
      'Architected AMD Zen CPU core, shifting the global x86 computing landscape',
      'Designed Apple A4/A5 silicon chips establishing Apple proprietary hardware supremacy',
      'Pioneered modular chiplet architectures and open RISC-V AI acceleration',
    ],
    currentWork:
      'CEO of Tenstorrent, building open-source RISC-V processors and scalable AI accelerator chips to break the Nvidia GPU monopoly.',
    whyInMyList:
      'Master of managing extreme engineering complexity. Proves that every 5 years, one should rethink computer architecture from first principles rather than accumulating legacy baggage.',
    whatICanLearn: [
      'Complexity is the enemy: clean abstractions must be rebuilt every few years',
      'Decisiveness in engineering: make the best decision with 70% data rather than waiting',
      'Understanding hardware at the silicon transistor, memory bus, and cache level',
    ],
    howTheyCanHelpMe:
      'Guiding philosophy for Sovereign OS hardware sandboxing. Kellers principle of clean boundaries dictates how Sovereign OS separates unprivileged UI threads from secure microkernels.',
    recommendedMaterials: [
      'Jim Keller Lex Fridman Interviews (#70, #140, #222)',
      'Jim Keller Tenstorrent Keynotes on RISC-V and AI hardware',
    ],
  },

  // 4. ECONOMICS, CAPITAL & FINANCE
  {
    id: 'exp-dalio',
    name: 'Ray Dalio',
    slug: 'ray-dalio',
    title: 'Founder, Co-CIO Mentor & Macroeconomic Historian',
    organization: 'Bridgewater Associates',
    sector: 'economics_finance',
    tier: 'titan',
    ageOrEra: '75 (Born 1949)',
    location: 'Westport, Connecticut, USA',
    nationality: 'American',
    status: 'Living & Active',
    reachOutChannel: 'LinkedIn Direct Articles & Dalio Family Office Contact',
    emailOrContact: 'principles@bridgewater.com',
    socials: {
      xTwitter: 'https://x.com/raydalio',
      linkedIn: 'https://linkedin.com/in/raydalio',
      website: 'https://principles.com',
    },
    coldOutreachAngle:
      'Sending an analytical breakdown of economic cycle indicators modeled into JARVIS OS Analyzer tool with automated algorithmic stress tests.',
    biography:
      'Founder of Bridgewater Associates, growing it into the largest and most successful hedge fund in the world ($160B AUM). Pioneered risk parity asset allocation (All Weather portfolio), radical transparency in organizational management, and formal models of long-term debt cycles.',
    breakthroughContributions: [
      'Created the Pure Alpha and All Weather Risk Parity financial strategies',
      'Formulated the Economic Machine mechanics explaining credit cycles and inflation',
      'Author of Principles: Life and Work and Principles for Dealing with the Changing World Order',
    ],
    currentWork:
      'Analyzing global monetary shifts, currency debasement, great power conflicts, and mentoring the next generation of global leaders.',
    whyInMyList:
      'Teaches how to model the global macro economy as an algorithmic, deterministic machine. Invaluable for Abhishek to understand venture capital timing and capital preservation.',
    whatICanLearn: [
      'Radical truth and radical transparency in decision making and code reviews',
      'History repeats: everything that happens today has happened many times before in history',
      'Triangulating opinions with believable people rather than trusting raw intuition',
    ],
    howTheyCanHelpMe:
      'Mental models to structure JARVIS OS Learning & Research Analyzer and build robust, recession-proof personal finances.',
    recommendedMaterials: [
      'Principles: Life and Work by Ray Dalio',
      'How The Economic Machine Works (30-minute master animation)',
      'Principles for Dealing with the Changing World Order by Ray Dalio',
    ],
  },
  {
    id: 'exp-taleb',
    name: 'Nassim Nicholas Taleb',
    slug: 'nassim-nicholas-taleb',
    title: 'Mathematical Risk Theorist, Former Trader & Author',
    organization: 'NYU Tandon School of Engineering / Universa Investments',
    sector: 'economics_finance',
    tier: 'titan',
    ageOrEra: '64 (Born 1960)',
    location: 'New York, USA',
    nationality: 'Lebanese / American',
    status: 'Living & Active',
    reachOutChannel: 'X (Twitter) Technical Threads & Research Papers',
    emailOrContact: 'nnt@fooledbyrandomness.com',
    socials: {
      xTwitter: 'https://x.com/nntaleb',
      website: 'https://fooledbyrandomness.com',
    },
    coldOutreachAngle:
      'Engaging strictly on mathematical probability distribution tails or fat-tailed risk modeling without academic buzzwords.',
    biography:
      'Philosopher of probability, former derivatives trader, and mathematical researcher. Author of the Incerto (Fooled by Randomness, The Black Swan, Antifragile, Skin in the Game). Coined the concept of Antifragility — systems that gain from disorder and volatility.',
    breakthroughContributions: [
      'Formulated the Black Swan theory of unpredictable high-impact catastrophic events',
      'Coined the concept of Antifragility (things that benefit from shock and stress)',
      'Established the ethical necessity of Skin in the Game in technical and political leadership',
    ],
    currentWork:
      'Writing technical papers on fat-tailed statistics, tail risk hedging, and epistemic probability at Universa Investments.',
    whyInMyList:
      'Mandatory mental model for designing software that never collapses under unexpected production stress. Sovereign OS and StarkForge CAD must be Antifragile.',
    whatICanLearn: [
      'Build systems that survive worst-case Black Swan edge cases rather than optimizing for averages',
      'Never trust advice from anyone who does not have Skin in the Game',
      'Via Negativa: excellence is achieved by subtracting flaws and bugs, not by adding unnecessary code',
    ],
    howTheyCanHelpMe:
      'Guiding philosophy for DocGov Vault and Sovereign OS encryption: zero single points of failure and robust local independence.',
    recommendedMaterials: [
      'Antifragile: Things That Gain from Disorder by Nassim Nicholas Taleb',
      'The Black Swan by Nassim Nicholas Taleb',
      'Skin in the Game by Nassim Nicholas Taleb',
    ],
  },

  // 5. STARTUPS, BUSINESS & VENTURE TITANS
  {
    id: 'exp-altman',
    name: 'Sam Altman',
    slug: 'sam-altman',
    title: 'CEO of OpenAI, Former President of Y Combinator',
    organization: 'OpenAI (Investor in Stripe, Reddit, Helion Energy)',
    sector: 'startups_business',
    tier: 'titan',
    ageOrEra: '40 (Born 1985)',
    location: 'San Francisco, California, USA',
    nationality: 'American',
    status: 'Living & Active',
    reachOutChannel: 'Short, High-Impact Cold Email (2 sentences max)',
    emailOrContact: 'sama@openai.com',
    socials: {
      xTwitter: 'https://x.com/sama',
      website: 'https://blog.samaltman.com',
    },
    coldOutreachAngle:
      'Ultra-concise 3-bullet email: 1) What StarkForge CAD does, 2) The traction/speed metric, 3) 15-second demo video link.',
    biography:
      'Technologist, serial entrepreneur, and venture investor. Former president of Y Combinator where he scaled the incubator to fund thousands of world-changing startups (Airbnb, Stripe, DoorDash). As CEO of OpenAI, orchestrated the fastest consumer app growth in history with ChatGPT.',
    breakthroughContributions: [
      'Scaled Y Combinator into the global epicenter of startup creation',
      'Guided OpenAI from a small non-profit research lab into the global leader in Generative AI',
      'Early backer and catalyst for nuclear fusion (Helion) and longevity research (Retro)',
    ],
    currentWork:
      'Leading OpenAI development of frontier reasoning models (o1/o3), agentic systems, and global computing infrastructure.',
    whyInMyList:
      'Demonstrates high-agency ambition and the art of executing gigantic vision through compounding determination.',
    whatICanLearn: [
      'How to be high agency: bend the world to your will by relentless persistence',
      'Compounding momentum: small, continuous engineering upgrades compound into unstoppable leads',
      'Think in decades while executing turn-by-turn with extreme daily velocity',
    ],
    howTheyCanHelpMe:
      'Framework for scaling Gauri Idols and StarkForge CAD into multi-million dollar tech entities.',
    recommendedMaterials: [
      'How To Be Successful blog post by Sam Altman (blog.samaltman.com)',
      'Stanford CS183B: How to Start a Startup lecture series by Sam Altman',
    ],
  },
  {
    id: 'exp-graham',
    name: 'Paul Graham',
    slug: 'paul-graham',
    title: 'Co-Founder of Y Combinator, Essayist & Lisp Hacker',
    organization: 'Y Combinator / Independent Essayist',
    sector: 'startups_business',
    tier: 'titan',
    ageOrEra: '60 (Born 1964)',
    location: 'United Kingdom',
    nationality: 'British / American',
    status: 'Living & Active',
    reachOutChannel: 'Thoughtful Cold Email with an original essay response',
    emailOrContact: 'pg@ycombinator.com',
    socials: {
      xTwitter: 'https://x.com/paulg',
      website: 'https://paulgraham.com',
    },
    coldOutreachAngle:
      'Sending a concise note showing how his essay Do Things that Dont Scale was directly applied to acquire early customers for Gauri Idols.',
    biography:
      'Programmer, essayist, and investor. Created Viaweb (the first web-based application, acquired by Yahoo for $49M). Co-founded Y Combinator in 2005. His essays on startups, programming languages, and wealth creation are considered scripture for technology founders worldwide.',
    breakthroughContributions: [
      'Invented the modern startup accelerator model with Y Combinator',
      'Authored Hackers & Painters and dozens of foundational essays shaping Silicon Valley culture',
      'Pioneered server-side web applications with Viaweb',
    ],
    currentWork:
      'Writing long-form essays exploring human psychology, startup mechanics, and societal trends.',
    whyInMyList:
      'The ultimate philosophical guide for young hackers. Teaches Abhishek to make something people want and ignore prestige traps.',
    whatICanLearn: [
      'Make something people want: the single most important rule in technology',
      'Relentless focus on building and talking to users: ignore all other distractions',
      'Write with crystalline clarity: if you cannot explain your software simply, you do not understand it',
    ],
    howTheyCanHelpMe:
      'Essential compass for prioritizing features in JARVIS Workspace and focusing on raw user utility for StarkForge CAD.',
    recommendedMaterials: [
      'Hackers & Painters: Big Ideas from the Computer Age by Paul Graham',
      'Essays: Do Things that Dont Scale, How to Think for Yourself, Maker vs Manager Schedule',
    ],
  },

  // 6. SPACE, AEROSPACE & DEEP PHYSICS
  {
    id: 'exp-somanath',
    name: 'Dr. S. Somanath',
    slug: 's-somanath',
    title: 'Chairman of ISRO & Secretary, Department of Space',
    organization: 'Indian Space Research Organisation (ISRO)',
    sector: 'space_physics',
    tier: 'achiever',
    ageOrEra: '61 (Born 1963)',
    location: 'Bengaluru, Karnataka, India',
    nationality: 'Indian',
    status: 'Living & Active',
    reachOutChannel: 'ISRO Headquarters Office & Bengaluru Aerospace Symposia',
    emailOrContact: 'chairman@isro.gov.in',
    socials: {
      website: 'https://isro.gov.in',
    },
    coldOutreachAngle:
      'Connecting via SIT alumni network with a formal technical proposal demonstrating StarkForge CAD simulation for lightweight satellite bracket topologies.',
    biography:
      'Distinguished Indian aerospace engineer. Led the historic Chandrayaan-3 mission that made India the first country in human history to land successfully on the lunar South Pole at a fraction of global mission budgets ($75M). Architected the GSLV Mk-III (LVM3) heavy-lift launch vehicle.',
    breakthroughContributions: [
      'Successfully executed Chandrayaan-3 lunar south pole landing',
      'Architected the LVM3 heavy-lift rocket capable of human spaceflight',
      'Pioneered extreme frugal engineering with zero compromise on mission reliability',
    ],
    currentWork:
      'Directing Indias Gaganyaan human spaceflight mission, Bharatiya Antariksh Station space station, and Chandrayaan-4 sample return.',
    whyInMyList:
      'Proves that Indian engineers operating from Bengaluru can lead the entire world in high-technology achievements on disciplined budgets.',
    whatICanLearn: [
      'Extreme frugal engineering: achieving 10x output with disciplined resource allocation',
      'Rigorous systems engineering and failure-mode redundancy',
      'Grace, calm, and humility when leading multi-thousand person national missions',
    ],
    howTheyCanHelpMe:
      'Direct inspiration for StarkForge CAD engineering precision. Abhishek is based in Bengaluru, making ISRO engineering standards the gold standard to emulate.',
    recommendedMaterials: [
      'Chandrayaan-3 Post-Mission Engineering Debriefs',
      'Dr. S. Somanath Keynote Addresses on Systems Engineering and Indias Space Economy',
    ],
  },

  // 7. GEOPOLITICS & GRAND STRATEGY
  {
    id: 'exp-jaishankar',
    name: 'Dr. S. Jaishankar',
    slug: 's-jaishankar',
    title: 'Minister of External Affairs & Strategic Diplomat',
    organization: 'Government of India (Former Foreign Secretary)',
    sector: 'geopolitics_strategy',
    tier: 'achiever',
    ageOrEra: '70 (Born 1955)',
    location: 'New Delhi, India',
    nationality: 'Indian',
    status: 'Living & Active',
    reachOutChannel: 'MEA Public Grievance / Book Symposia Q&A',
    emailOrContact: 'eam@mea.gov.in',
    socials: {
      xTwitter: 'https://x.com/DrSJaishankar',
      website: 'https://mea.gov.in',
    },
    coldOutreachAngle:
      'Presenting a briefing paper on technological sovereignty, microkernel OS supply-chain independence, and Indian software export self-reliance.',
    biography:
      'Career diplomat, scholar, and statesman. Former Foreign Secretary of India, Ambassador to the United States and China. Key architect of Indias multi-aligned foreign policy in a multipolar world. Author of The India Way and Why Bharat Matters.',
    breakthroughContributions: [
      'Masterminded Indias non-aligned strategic autonomy during major geopolitical crises',
      'Negotiated the historic US-India Civil Nuclear Agreement',
      'Transformed public communication of diplomacy through sharp, unapologetic intellectual articulation',
    ],
    currentWork:
      'Leading Indian foreign diplomacy, expanding the Global South alliance, and safeguarding national technological and economic interests.',
    whyInMyList:
      'Teaches sovereign strategic thinking: how a nation or an individual maintains autonomy without becoming beholden to any single dominant power.',
    whatICanLearn: [
      'Strategic autonomy: always maintain optionality and never become dependent on a single supplier or platform',
      'Articulating positions with unflappable intellectual precision under intense scrutiny',
      'Navigating complex multipolar landscapes through pragmatism rather than emotional ideology',
    ],
    howTheyCanHelpMe:
      'Foundational philosophy for Sovereign OS: engineering true technological independence so users own their data and computing identity.',
    recommendedMaterials: [
      'The India Way: Strategies for an Uncertain World by Dr. S. Jaishankar',
      'Why Bharat Matters by Dr. S. Jaishankar',
    ],
  },

  // 8. PSYCHOLOGY, MENTALISM & HUMAN PERFORMANCE
  {
    id: 'exp-huberman',
    name: 'Dr. Andrew Huberman',
    slug: 'andrew-huberman',
    title: 'Neuroscientist & Professor of Neurobiology',
    organization: 'Stanford University School of Medicine / Huberman Lab',
    sector: 'psychology_mentalism',
    tier: 'achiever',
    ageOrEra: '49 (Born 1975)',
    location: 'Palo Alto, California, USA',
    nationality: 'American',
    status: 'Living & Active',
    reachOutChannel: 'Huberman Lab Contact & Academic Inquiries',
    emailOrContact: 'info@hubermanlab.com',
    socials: {
      xTwitter: 'https://x.com/hubermanlab',
      youtubeOrPodcast: 'https://youtube.com/@hubermanlab',
      website: 'https://hubermanlab.com',
    },
    coldOutreachAngle:
      'Sharing a software-assisted circadian and ultradian sprint tracking module built inside JARVIS OS Time Engine.',
    biography:
      'Tenured Professor of Neurobiology and Ophthalmology at Stanford. Host of the #1 health podcast Huberman Lab. Translates cutting-edge neuroscience into actionable protocols for focus, dopamine regulation, sleep architecture, and neuroplasticity.',
    breakthroughContributions: [
      'Published groundbreaking papers on neural regeneration and vision pathways at Stanford',
      'Democratized protocol-driven neuroscience for mental performance and cognitive stamina',
    ],
    currentWork:
      'Investigating neural mechanisms of mental states, visual processing, and protocolized cognitive endurance.',
    whyInMyList:
      'Provides the biological blueprint for Abhishek to sustain 14-hour engineering days without cognitive burnout.',
    whatICanLearn: [
      'Dopamine mechanics: attach dopamine to the effort itself, not just the outcome',
      'Circadian biology: light exposure, cold immersion, and sleep hygiene to maximize brain output',
      'Ultradian 90-minute focus cycles for deep engineering sprints',
    ],
    howTheyCanHelpMe:
      'Optimize daily operating schedule and incorporate behavioral protocols directly into the JARVIS OS Productivity and Sprint Engine.',
    recommendedMaterials: [
      'Huberman Lab Podcast: Master Your Sleep & Optimize Dopamine',
      'Stanford Neurobiology research publications by Huberman Lab',
    ],
  },

  // 9. HISTORY & CIVILIZATIONS
  {
    id: 'exp-durant',
    name: 'Will Durant',
    slug: 'will-durant',
    title: 'Pulitzer Prize Winning Historian & Philosopher',
    organization: 'Author of The Story of Civilization (with Ariel Durant)',
    sector: 'history_civilization',
    tier: 'titan',
    ageOrEra: '1885–1981 (Lived 96 years)',
    location: 'Los Angeles, California, USA',
    nationality: 'American',
    status: 'Historical Master',
    reachOutChannel: 'Works and Literary Estate in Public Domain',
    socials: {
      website: 'https://willdurant.com',
    },
    coldOutreachAngle:
      'Study his lifelong compilation methodology: reading thousands of volumes and distilling universal civilizational patterns.',
    biography:
      'Spent 50 years writing the monumental 11-volume, 10,000-page masterwork The Story of Civilization alongside his wife Ariel Durant. Awarded the Pulitzer Prize for General Non-Fiction and the Presidential Medal of Freedom. Synthesized the entire history of philosophy and human civilizations with poetic grace.',
    breakthroughContributions: [
      'Authored The Story of Philosophy, making philosophy accessible to millions',
      'Authored The Story of Civilization, the most comprehensive history compilation in English',
      'Distilled thousands of years of human struggle into The Lessons of History',
    ],
    currentWork:
      'Enduring literary legacy serving as the definitive map of human civilizational cycles.',
    whyInMyList:
      'Prevents historical blindness. Gives Abhishek deep perspective on how civilizations rise, automate, decay, and renew themselves.',
    whatICanLearn: [
      'Patience for monumental 50-year works: grand achievements take decades of disciplined daily reading and writing',
      'The Lessons of History: biology is the ultimate judge, ideas that violate nature will collapse',
      'Synthesis: the ability to take overwhelming information and distill it into crystalline prose',
    ],
    howTheyCanHelpMe:
      'Informs the philosophical foundation of Sovereign OS: designing systems that outlast ephemeral web trends by honoring human nature.',
    recommendedMaterials: [
      'The Lessons of History by Will and Ariel Durant',
      'The Story of Philosophy by Will Durant',
      'The Story of Civilization: Our Oriental Heritage',
    ],
  },

  // 10. ARTS & CREATIVE DIRECTION
  {
    id: 'exp-ive',
    name: 'Sir Jony Ive',
    slug: 'jony-ive',
    title: 'Former Chief Design Officer of Apple & Founder',
    organization: 'LoveFrom (Designer of iMac, iPod, iPhone, Apple Watch)',
    sector: 'arts_creative_direction',
    tier: 'titan',
    ageOrEra: '58 (Born 1967)',
    location: 'San Francisco, California, USA / London, UK',
    nationality: 'British',
    status: 'Living & Active',
    reachOutChannel: 'LoveFrom Studio San Francisco & Royal College of Art',
    emailOrContact: 'studio@lovefrom.com',
    socials: {
      website: 'https://lovefrom.com',
    },
    coldOutreachAngle:
      'Presenting a bespoke physical or digital artifact showcasing the purest distillation of functional design in StarkForge CAD or Sovereign OS.',
    biography:
      'Regarded as the most influential industrial designer of the 21st century. Collaborated intimately with Steve Jobs for over two decades to design the iMac, iPod, iPhone, iPad, MacBook Air, and Apple Watch. Transformed technology from beige boxes into objects of desire.',
    breakthroughContributions: [
      'Designed the iPhone, iPod, and modern unibody MacBook architectures',
      'Pioneered precision aluminum machining, sapphire crystal screens, and minimalist packaging',
      'Defined the modern aesthetic of premium consumer technology',
    ],
    currentWork:
      'Leading LoveFrom design collective, collaborating with Sam Altman on an upcoming next-generation AI hardware computing platform.',
    whyInMyList:
      'The standard bearer for obsessive industrial and digital design. Reminds Abhishek that software must not only work, it must feel inevitable, poetic, and beautiful.',
    whatICanLearn: [
      'Simplicity is not the lack of clutter: it is the consequence of solving deep complexity',
      'Care deeply about the parts nobody sees: internal code architecture matters as much as the UI',
      'Material honesty: honor the medium you are building for (pixels, WebGL, shaders)',
    ],
    howTheyCanHelpMe:
      'Design inspiration for the Nettools dark engineering theme, StarkForge CAD viewport styling, and Gauri Idols artisan commerce aesthetic.',
    recommendedMaterials: [
      'Jony Ive: The Genius Behind Apples Greatest Products by Leander Kahney',
      'Jony Ive address at California College of the Arts and Royal College of Art',
    ],
  },
];

export class FieldExpertsStore {
  private static cached: ExpertProfile[] | null = null;

  public static getExperts(): ExpertProfile[] {
    if (this.cached) return this.cached;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge default experts with user-added ones
          const defaultIds = new Set(INITIAL_EXPERTS.map((e) => e.id));
          const custom = parsed.filter((e: ExpertProfile) => !defaultIds.has(e.id));
          const merged = [...INITIAL_EXPERTS, ...custom];
          this.cached = merged;
          return merged;
        }
      }
    } catch {}
    this.cached = INITIAL_EXPERTS;
    return INITIAL_EXPERTS;
  }

  public static addExpert(expert: ExpertProfile): ExpertProfile[] {
    const current = this.getExperts();
    const updated = [expert, ...current];
    this.cached = updated;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    return updated;
  }
}
