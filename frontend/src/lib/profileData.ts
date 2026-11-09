/**
 * Abhishek Gangadhar — Executive Profile & Dossier Data Architecture
 * Persistent in-memory + localStorage store with Supabase sync
 */

export interface MultiAccountProfile {
  id: string;
  accountName: string;
  handle: string;
  url: string;
  email: string;
  phone?: string;
  devices: string[];
  roleOrType: string;
  isActive: boolean;
  notes?: string;
}

export interface SocialAccount {
  id: string;
  platform: string;
  icon: string;
  handle: string;
  url: string;
  category: 'social' | 'professional' | 'developer' | 'freelance';
  verified: boolean;
  subAccounts?: MultiAccountProfile[];
}

export interface StrategicContact {
  id: string;
  name: string;
  title: string;
  organization: string;
  category: 'investor_hnw' | 'founder_cto' | 'tech_referral' | 'academic_topper' | 'gov_institutional';
  influenceLevel: 'VIP / Critical' | 'High Leverage' | 'Strategic Partner' | 'Emerging Key Contact';
  connectionChannel: string;
  relationshipStatus: 'Active Ally' | 'Strategic Partner' | 'Dormant - Needs Touchpoint' | 'Pipeline';
  importanceRationale: string;
  nextBestMove: string;
  email?: string;
  phone?: string;
  linkedInUrl?: string;
}

export interface PublicPresenceAsset {
  id: string;
  name: string;
  type: 'live_website' | 'google_serp' | 'github_ecosystem' | 'social_entity' | 'commerce';
  headline: string;
  url: string;
  visibility: 'Public to World' | 'Selective Showcase' | 'Indexed on Google';
  publicPerception: string;
  associatedBrand: string;
  trafficOrIndexStatus: string;
}

export interface LiveSite {
  id: string;
  name: string;
  description: string;
  url: string;
  status: 'live' | 'staging' | 'private' | 'maintenance';
  cloudProvider: 'Netlify' | 'Render' | 'Supabase' | 'Vercel' | 'AWS' | 'Other';
  visibility: 'public' | 'private';
  sslActive: boolean;
}

export interface EducationEntry {
  id: string;
  level: '10th' | '12th' | 'higher';
  title: string;
  institution: string;
  boardOrUniversity: string;
  year: string;
  scoreOrGrade: string;
  highlights: string[];
  docUrl?: string;
  fileName?: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  category: 'course' | 'workshop' | 'hackathon_win' | 'event_participation' | 'honor';
  date: string;
  credentialId?: string;
  certificateUrl?: string;
  fileName?: string;
  verified: boolean;
}

export interface IdentityDoc {
  id: string;
  title: string;
  idType: 'aadhaar' | 'college_id' | 'school_id' | 'pan' | 'voter' | 'docgov' | 'signature';
  maskedNumber: string;
  issuedBy: string;
  docUrl?: string;
  fileName?: string;
  isPrivate: boolean;
}

export interface MembershipEntry {
  id: string;
  organization: string;
  role: string;
  category: 'developer_community' | 'academic' | 'open_source' | 'council';
  since: string;
  url?: string;
}

export interface CommunityEntry {
  id: string;
  name: string;
  platform: 'WhatsApp' | 'LinkedIn' | 'Reddit' | 'Discord' | 'Telegram' | 'Slack';
  handleOrLink: string;
  membersCount?: string;
  role: 'Member' | 'Admin' | 'Moderator' | 'Founder';
}

export interface ConnectedService {
  name: string;
  category: 'database' | 'hosting' | 'backend' | 'git' | 'media' | 'finance';
  accountName: string;
  url: string;
  status: 'active' | 'configured';
}

export interface EmailAtmosphere {
  id: string;
  email: string;
  label: string;
  purpose: 'Developer & Cloud' | 'Academic & Research' | 'Business & Startup' | 'Personal & Identity';
  connectedServices: ConnectedService[];
}

export interface PublicationEntry {
  id: string;
  title: string;
  type: 'research_paper' | 'patent' | 'whitepaper' | 'technical_article' | 'blog';
  publishedIn: string;
  date: string;
  url?: string;
  docUrl?: string;
  fileName?: string;
  abstract: string;
  coAuthors?: string[];
}

export interface ExecutiveProfile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  avatarUrl: string;
  portfolioUrl: string;
  homeAddress: string;
  officeAddress: string;
  phone: string;
  primaryEmail: string;
  resumeUrl: string;
  resumeFileName: string;
  skills: string[];
  socials: SocialAccount[];
  liveSites: LiveSite[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  identityDocs: IdentityDoc[];
  memberships: MembershipEntry[];
  communities: CommunityEntry[];
  emailAtmospheres: EmailAtmosphere[];
  publications: PublicationEntry[];
  strategicNetwork: StrategicContact[];
  publicAssets: PublicPresenceAsset[];
}

const STORAGE_KEY = 'jarvis_executive_profile';

export const DEFAULT_PROFILE: ExecutiveProfile = {
  name: 'Abhishek Gangadhar',
  title: 'Lead Systems Architect & Full-Stack AI Engineer',
  tagline: 'Architect of Sovereign Systems, Autonomous Intelligence & 3D Engineering Platforms',
  summary:
    'Visionary computer scientist and full-stack systems engineer dedicated to building sovereign operating architectures, distributed cloud backends, advanced WebGL/WASM 3D CAD engines, and autonomous multi-agent intelligence ecosystems. Creator of JARVIS OS, StarkForge CAD, and Sovereign OS. Passionate about pushing the frontiers of software autonomy, developer tooling, and modern distributed infrastructure.',
  avatarUrl: '',
  portfolioUrl: '/showcase',
  homeAddress: 'Bengaluru, Karnataka, India',
  officeAddress: 'SIT Innovation Hub & StarkForge Engineering Labs, Karnataka, India',
  phone: '+91 (Verified)',
  primaryEmail: 'abhishek.gangadhar@example.com',
  resumeUrl: '',
  resumeFileName: 'Abhishek_Gangadhar_CV.pdf',
  skills: [
    'System Architecture',
    'TypeScript / Node.js',
    'Python & AI/ML',
    'WebGL / Three.js / CAD',
    'Supabase & PostgreSQL',
    'React & Modern Frontend',
    'Netlify / Render / Cloud Hosting',
    'Distributed Microservices',
    'Agentic AI Integration',
  ],
  socials: [
    {
      id: 'soc-li',
      platform: 'LinkedIn',
      icon: '💼',
      handle: 'in/abhishek-gangadhar',
      url: 'https://linkedin.com/in/abhishek-gangadhar',
      category: 'professional',
      verified: true,
      subAccounts: [
        {
          id: 'li-1',
          accountName: 'Abhishek Gangadhar (Lead Systems Architect & Founder)',
          handle: 'in/abhishek-gangadhar',
          url: 'https://linkedin.com/in/abhishek-gangadhar',
          email: 'theconquere07@gmail.com',
          phone: '+91 (Primary Verified)',
          devices: ['Windows 11 JARVIS Rig', 'iPhone 15 Pro'],
          roleOrType: 'Primary Professional Identity',
          isActive: true,
          notes: 'Main executive presence, 2,800+ connections, tech leadership & system architecture posts',
        },
        {
          id: 'li-2',
          accountName: 'StarkForge Technologies (Official Organization Admin)',
          handle: 'company/starkforge-tech',
          url: 'https://linkedin.com/company/starkforge-tech',
          email: 'founder@starkforge.io',
          devices: ['MacBook Pro M2'],
          roleOrType: 'Founder & SuperAdmin Page',
          isActive: true,
          notes: 'Official company page for 3D CAD modeling software and investor updates',
        },
        {
          id: 'li-3',
          accountName: 'Abhishek G. (SIT Academic & Research Profile)',
          handle: 'in/abhishek-sit-research',
          url: 'https://linkedin.com/in/abhishek-sit-research',
          email: 'abhishek.academic@sit.ac.in',
          devices: ['Campus Workstation', 'iPhone 15 Pro'],
          roleOrType: 'Academic & Alumni Network',
          isActive: true,
          notes: 'Affiliated with SIT Computer Science, IEEE student branch collaborations',
        },
      ],
    },
    {
      id: 'soc-gh',
      platform: 'GitHub',
      icon: '🐙',
      handle: 'theconquere07V1Mark02',
      url: 'https://github.com/theconquere07V1Mark02',
      category: 'developer',
      verified: true,
      subAccounts: [
        {
          id: 'gh-1',
          accountName: 'theconquere07V1Mark02 (Primary Architecture Root)',
          handle: 'theconquere07V1Mark02',
          url: 'https://github.com/theconquere07V1Mark02',
          email: 'theconquere07@gmail.com',
          devices: ['Windows 11 Rig (Ed25519 SSH)', 'WSL2 Ubuntu'],
          roleOrType: 'Root Architecture & 28 Repos',
          isActive: true,
          notes: 'Houses JARVIS Ecosystem, StarkForge CAD, AI Agents, and full codebase',
        },
        {
          id: 'gh-2',
          accountName: 'sovereign-microkernel-team (Core Kernel Org)',
          handle: 'orgs/sovereign-microkernel-team',
          url: 'https://github.com/sovereign-microkernel-team',
          email: 'dev@sovereign-os.org',
          devices: ['Linux DevBox', 'Cloud Runner'],
          roleOrType: 'Organization Owner',
          isActive: true,
          notes: 'Open-source distributed microkernel OS and hardware sandboxing libraries',
        },
      ],
    },
    {
      id: 'soc-in',
      platform: 'Instagram',
      icon: '📸',
      handle: '@abhii_gangadhar',
      url: 'https://instagram.com/abhii_gangadhar',
      category: 'social',
      verified: true,
      subAccounts: [
        {
          id: 'ig-1',
          accountName: 'Abhishek Gangadhar (Personal & Lifestyle)',
          handle: '@abhii_gangadhar',
          url: 'https://instagram.com/abhii_gangadhar',
          email: 'abhishek.gangadhar.personal@gmail.com',
          phone: '+91 (Primary Mobile)',
          devices: ['iPhone 15 Pro'],
          roleOrType: 'Personal Lifestyle & Stories',
          isActive: true,
          notes: 'Personal life, travel, campus moments, and close friends circle',
        },
        {
          id: 'ig-2',
          accountName: 'StarkForge 3D Tech (@starkforge_tech)',
          handle: '@starkforge_tech',
          url: 'https://instagram.com/starkforge_tech',
          email: 'founder@starkforge.io',
          devices: ['MacBook Pro M2', 'iPhone 15 Pro'],
          roleOrType: 'Brand & 3D Tech Demos',
          isActive: true,
          notes: 'Showcases browser CAD engine renders, WebGL demos, and behind-the-scenes engineering',
        },
        {
          id: 'ig-3',
          accountName: 'Gauri Idols Official (@gauriidols_official)',
          handle: '@gauriidols_official',
          url: 'https://instagram.com/gauriidols_official',
          email: 'admin@gauriidols.com',
          devices: ['Android Business Tablet', 'Windows Rig'],
          roleOrType: 'Commercial Commerce Storefront',
          isActive: true,
          notes: 'E-commerce showcase for festive deity craftsmanship, customer orders, and marketing',
        },
      ],
    },
    {
      id: 'soc-x',
      platform: 'X (Twitter)',
      icon: '𝕏',
      handle: '@theconquere07',
      url: 'https://x.com/theconquere07',
      category: 'social',
      verified: true,
      subAccounts: [
        {
          id: 'x-1',
          accountName: 'Abhishek Gangadhar (@theconquere07)',
          handle: '@theconquere07',
          url: 'https://x.com/theconquere07',
          email: 'theconquere07@gmail.com',
          devices: ['Windows 11 Rig', 'iPhone 15 Pro'],
          roleOrType: 'Tech & Architecture Thinker',
          isActive: true,
          notes: 'Tech thoughts, LLM architecture, agentic systems, and 3D graphics discussions',
        },
        {
          id: 'x-2',
          accountName: 'StarkForge CAD (@starkforge_tech)',
          handle: '@starkforge_tech',
          url: 'https://x.com/starkforge_tech',
          email: 'founder@starkforge.io',
          devices: ['Web Client'],
          roleOrType: 'Company Product Updates',
          isActive: true,
          notes: 'Release notes, CAD benchmarks, WebAssembly updates',
        },
      ],
    },
    {
      id: 'soc-sc',
      platform: 'Snapchat',
      icon: '👻',
      handle: 'abhii_g07',
      url: 'https://snapchat.com/add/abhii_g07',
      category: 'social',
      verified: true,
      subAccounts: [
        {
          id: 'sc-1',
          accountName: 'Abhishek G. (abhii_g07)',
          handle: 'abhii_g07',
          url: 'https://snapchat.com/add/abhii_g07',
          email: 'abhishek.gangadhar.personal@gmail.com',
          phone: '+91 (Verified)',
          devices: ['iPhone 15 Pro'],
          roleOrType: 'Personal Social & Daily Streaks',
          isActive: true,
          notes: 'Private snap streaks, memories, college crew',
        },
      ],
    },
    {
      id: 'soc-fb',
      platform: 'Facebook',
      icon: '📘',
      handle: 'abhishek.gangadhar.official',
      url: 'https://facebook.com/abhishek.gangadhar.official',
      category: 'social',
      verified: true,
      subAccounts: [
        {
          id: 'fb-1',
          accountName: 'Abhishek Gangadhar Profile',
          handle: 'abhishek.gangadhar.official',
          url: 'https://facebook.com/abhishek.gangadhar.official',
          email: 'abhishek.gangadhar.personal@gmail.com',
          devices: ['Windows 11 Rig', 'iPhone 15 Pro'],
          roleOrType: 'Family & Longstanding Social Circle',
          isActive: true,
          notes: 'Personal account, school & family connectivity',
        },
        {
          id: 'fb-2',
          accountName: 'Gauri Idols Facebook Store Page',
          handle: 'pages/gauriidols',
          url: 'https://facebook.com/gauriidols',
          email: 'admin@gauriidols.com',
          devices: ['Meta Business Suite'],
          roleOrType: 'Meta Business Manager Admin',
          isActive: true,
          notes: 'Ad campaigns, festive commerce inquiries, customer WhatsApp chat redirects',
        },
      ],
    },
    {
      id: 'soc-up',
      platform: 'Upwork',
      icon: '🟢',
      handle: 'Abhishek G. (Top Rated Engineer)',
      url: 'https://upwork.com/freelancers/~abhishekg',
      category: 'freelance',
      verified: true,
      subAccounts: [
        {
          id: 'up-1',
          accountName: 'Abhishek G. (Top Rated Full-Stack & 3D Architect)',
          handle: 'freelancers/~abhishekg',
          url: 'https://upwork.com/freelancers/~abhishekg',
          email: 'freelance.abhishek@gmail.com',
          devices: ['Windows Rig (Time Tracker App)'],
          roleOrType: 'Top-Rated Consulting Specialist',
          isActive: true,
          notes: 'Enterprise contracts, high-throughput CAD consulting, distributed cloud systems',
        },
      ],
    },
    {
      id: 'soc-ind',
      platform: 'Indeed',
      icon: '📄',
      handle: 'Abhishek Gangadhar Profile',
      url: 'https://indeed.com',
      category: 'professional',
      verified: true,
      subAccounts: [
        {
          id: 'ind-1',
          accountName: 'Verified Principal Systems Engineer Profile',
          handle: 'candidates/abhishek-gangadhar',
          url: 'https://indeed.com',
          email: 'contact@abhishek.engineering',
          devices: ['Chrome Web Session'],
          roleOrType: 'Verified Tech Candidate',
          isActive: true,
          notes: 'Direct recruiter outreach, executive engineering opportunities',
        },
      ],
    },
  ],
  liveSites: [
    {
      id: 'site-gauri',
      name: 'Gauri Idols',
      description: 'Production E-Commerce & Cultural Artistry Platform',
      url: 'https://gauriidols.netlify.app',
      status: 'live',
      cloudProvider: 'Netlify',
      visibility: 'public',
      sslActive: true,
    },
    {
      id: 'site-starkforge',
      name: 'StarkForge CAD',
      description: 'Browser-native WebGL & Parametric 3D Engineering Suite',
      url: 'https://starkforge.dev',
      status: 'staging',
      cloudProvider: 'Render',
      visibility: 'public',
      sslActive: true,
    },
    {
      id: 'site-sovereign',
      name: 'Sovereign OS',
      description: 'Microkernel architecture and containerized personal management OS',
      url: 'https://sovereign-os.internal',
      status: 'private',
      cloudProvider: 'Supabase',
      visibility: 'private',
      sslActive: true,
    },
    {
      id: 'site-cleanslate',
      name: 'Cleanslate',
      description: 'Minimalist workspace productivity & high-velocity notes engine',
      url: 'https://cleanslate.netlify.app',
      status: 'live',
      cloudProvider: 'Netlify',
      visibility: 'public',
      sslActive: true,
    },
    {
      id: 'site-formcraft',
      name: 'Formcraft Dynamic Engine',
      description: 'Modern form and structured data acquisition framework',
      url: 'https://formcraft.render.com',
      status: 'live',
      cloudProvider: 'Render',
      visibility: 'public',
      sslActive: true,
    },
    {
      id: 'site-sit',
      name: 'SIT Academic Hub',
      description: 'Institutional academic resources, syllabus matrix and syllabus tracking',
      url: 'https://sit-academic-hub.org',
      status: 'live',
      cloudProvider: 'Netlify',
      visibility: 'public',
      sslActive: true,
    },
  ],
  education: [
    {
      id: 'edu-higher',
      level: 'higher',
      title: 'Bachelor of Technology / Engineering (Computer Science)',
      institution: 'SIT Campus / University Academic Hub',
      boardOrUniversity: 'Visvesvaraya Technological University (VTU)',
      year: '2023 – Present (Ongoing)',
      scoreOrGrade: 'Current CGPA: 8.8+ / 10',
      highlights: [
        'Specialization in Distributed Systems, System Architecture & Autonomous AI',
        'Head of Technical Projects & Innovation Lab member',
        'Published conference papers on multi-agent execution engines',
      ],
    },
    {
      id: 'edu-12th',
      level: '12th',
      title: 'Senior Secondary / Pre-University Certificate (12th Standard)',
      institution: 'Pre-University College of Science',
      boardOrUniversity: 'State Department of Pre-University Education',
      year: '2021 – 2023',
      scoreOrGrade: 'Distinction (92.4%)',
      highlights: [
        'Physics, Chemistry, Mathematics & Computer Science stream',
        'Top 1% rank in Mathematics & Computer Science regional examination',
      ],
    },
    {
      id: 'edu-10th',
      level: '10th',
      title: 'Secondary School Leaving Certificate (10th Standard)',
      institution: 'High School of Excellence',
      boardOrUniversity: 'Secondary Education Board',
      year: '2020 – 2021',
      scoreOrGrade: 'First Class with Distinction (95.2%)',
      highlights: [
        'School topper in Science, Mathematics and English',
        'Awarded Student of the Year for Academic and Leadership Excellence',
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Google Cloud Platform: Architecture & Data Engineering',
      issuer: 'Google Cloud Certified',
      category: 'course',
      date: '2025',
      credentialId: 'GCC-ARC-994821',
      verified: true,
    },
    {
      id: 'cert-2',
      title: '1st Place Winner — State Autonomous AI Hackathon',
      issuer: 'National Technology Innovation Forum',
      category: 'hackathon_win',
      date: '2025',
      credentialId: 'HACK-WIN-2025-01',
      verified: true,
    },
    {
      id: 'cert-3',
      title: 'Advanced Full-Stack Engineering & System Design',
      issuer: 'Meta & Coursera Professional Specialization',
      category: 'course',
      date: '2024',
      credentialId: 'META-SYS-772183',
      verified: true,
    },
    {
      id: 'cert-4',
      title: 'WebGL & High-Performance 3D Graphics Workshop Lead',
      issuer: 'SIT Developer Chapter',
      category: 'workshop',
      date: '2024',
      credentialId: 'WSHOP-GL-091',
      verified: true,
    },
  ],
  identityDocs: [
    {
      id: 'id-aadhaar',
      title: 'Government Identity Card (Aadhaar)',
      idType: 'aadhaar',
      maskedNumber: 'XXXX-XXXX-4812',
      issuedBy: 'Unique Identification Authority of India (UIDAI)',
      fileName: 'Aadhaar_Card_Verified.pdf',
      isPrivate: true,
    },
    {
      id: 'id-college',
      title: 'Official Academic Identity Card',
      idType: 'college_id',
      maskedNumber: 'SIT-CSE-2023-049',
      issuedBy: 'SIT Institute of Technology',
      fileName: 'SIT_Student_ID_Abhishek.pdf',
      isPrivate: true,
    },
    {
      id: 'id-school',
      title: 'High School Identification Record',
      idType: 'school_id',
      maskedNumber: 'SCH-2021-998',
      issuedBy: 'Secondary Education Council',
      fileName: 'Secondary_School_ID.pdf',
      isPrivate: true,
    },
    {
      id: 'id-govdoc-1',
      title: 'DocGov: Official Domicile & Birth Certificate',
      idType: 'docgov',
      maskedNumber: 'GOV-DOM-KA-8819',
      issuedBy: 'Government of Karnataka Revenue Department',
      fileName: 'Domicile_Certificate_Gov.pdf',
      isPrivate: true,
    },
    {
      id: 'id-sig',
      title: 'DocGov: Authorized Digital Signature & Stamp',
      idType: 'signature',
      maskedNumber: 'DS-ABHISHEK-G-2026',
      issuedBy: 'eSign Verified Identity Authority',
      fileName: 'Digital_Signature_Abhishek.pdf',
      isPrivate: true,
    },
  ],
  memberships: [
    {
      id: 'mem-gdg',
      organization: 'Google Developer Groups (GDG)',
      role: 'Active Member & Tech Speaker',
      category: 'developer_community',
      since: '2024',
      url: 'https://developers.google.com/community/gdg',
    },
    {
      id: 'mem-ieee',
      organization: 'IEEE Computer Society',
      role: 'Student Member',
      category: 'academic',
      since: '2023',
      url: 'https://www.ieee.org',
    },
    {
      id: 'mem-oss',
      organization: 'Open Source Initiative & GitHub Builders',
      role: 'Contributing Architect',
      category: 'open_source',
      since: '2023',
      url: 'https://github.com',
    },
  ],
  communities: [
    {
      id: 'comm-wp',
      name: 'StarkForge Founders & Core Devs Network',
      platform: 'WhatsApp',
      handleOrLink: 'Private WhatsApp Channel',
      membersCount: '120+ Builders',
      role: 'Admin',
    },
    {
      id: 'comm-li',
      name: 'Cloud Architects & Distributed Systems Forum',
      platform: 'LinkedIn',
      handleOrLink: 'linkedin.com/groups/cloud-systems',
      membersCount: '18,500+ Engineers',
      role: 'Member',
    },
    {
      id: 'comm-rd',
      name: 'r/MachineLearning & r/webdev Communities',
      platform: 'Reddit',
      handleOrLink: 'reddit.com/user/theconquere07',
      role: 'Member',
    },
    {
      id: 'comm-dc',
      name: 'JARVIS OS & Sovereign Community Server',
      platform: 'Discord',
      handleOrLink: 'discord.gg/jarvis-ecosystem',
      membersCount: '450+ Tech Enthusiasts',
      role: 'Founder',
    },
  ],
  emailAtmospheres: [
    {
      id: 'atm-dev',
      email: 'theconquere07@gmail.com',
      label: 'Primary Developer & Cloud Atmosphere',
      purpose: 'Developer & Cloud',
      connectedServices: [
        { name: 'Supabase Database', category: 'database', accountName: 'eziyjpfbpbgpnqtzkdwy (Active)', url: 'https://supabase.com/dashboard', status: 'active' },
        { name: 'Render Cloud Backend', category: 'backend', accountName: 'theconquere07-render', url: 'https://dashboard.render.com', status: 'active' },
        { name: 'Netlify Edge Frontend', category: 'hosting', accountName: 'theconquere07-netlify', url: 'https://app.netlify.com', status: 'active' },
        { name: 'GitHub Architecture Repos', category: 'git', accountName: 'theconquere07V1Mark02 (18 repos)', url: 'https://github.com/theconquere07V1Mark02', status: 'active' },
        { name: 'Google Cloud Platform', category: 'backend', accountName: 'StarkForge Cloud Engine', url: 'https://console.cloud.google.com', status: 'active' },
      ],
    },
    {
      id: 'atm-acad',
      email: 'abhishek.academic@sit.ac.in',
      label: 'SIT Academic & Research Atmosphere',
      purpose: 'Academic & Research',
      connectedServices: [
        { name: 'SIT Academic Portal', category: 'backend', accountName: 'Student Portal CSE', url: 'https://sit-academic-hub.org', status: 'active' },
        { name: 'Google Workspace for Education', category: 'hosting', accountName: 'abhishek@sit.ac.in', url: 'https://workspace.google.com', status: 'active' },
        { name: 'IEEE Xplore Research Library', category: 'media', accountName: 'Academic Member Access', url: 'https://ieeexplore.ieee.org', status: 'active' },
        { name: 'VTU Exam & Results Portal', category: 'backend', accountName: 'VTU USN: SIT-CSE-2023', url: 'https://vtu.ac.in', status: 'active' },
      ],
    },
    {
      id: 'atm-biz',
      email: 'founder@starkforge.io',
      label: 'StarkForge CAD Executive Atmosphere',
      purpose: 'Business & Startup',
      connectedServices: [
        { name: 'Official YouTube Channel', category: 'media', accountName: 'StarkForge Tech & CAD', url: 'https://youtube.com', status: 'active' },
        { name: 'Stripe Merchant Gateway', category: 'finance', accountName: 'StarkForge Payments Master', url: 'https://dashboard.stripe.com', status: 'active' },
        { name: 'Business X (Twitter) Account', category: 'media', accountName: '@starkforge_tech', url: 'https://x.com', status: 'active' },
        { name: 'StarkForge Cloud Backend', category: 'hosting', accountName: 'starkforge-api-prod', url: 'https://starkforge.dev', status: 'active' },
      ],
    },
    {
      id: 'atm-gauri',
      email: 'admin@gauriidols.com',
      label: 'Gauri Idols E-Commerce Atmosphere',
      purpose: 'Business & Startup',
      connectedServices: [
        { name: 'Netlify Edge Production', category: 'hosting', accountName: 'gauriidols.netlify.app', url: 'https://gauriidols.netlify.app', status: 'active' },
        { name: 'Razorpay Payment Gateway', category: 'finance', accountName: 'Gauri Artistry Merchant', url: 'https://razorpay.com', status: 'active' },
        { name: 'Inventory & Order Supabase', category: 'database', accountName: 'gauri-prod-db', url: 'https://supabase.com', status: 'active' },
      ],
    },
    {
      id: 'atm-personal',
      email: 'abhishek.gangadhar.personal@gmail.com',
      label: 'Personal Identity & Gov Atmosphere',
      purpose: 'Personal & Identity',
      connectedServices: [
        { name: 'Government DigiLocker', category: 'backend', accountName: 'UIDAI Aadhaar Vault', url: 'https://digilocker.gov.in', status: 'active' },
        { name: 'Cloud Domain Registrars', category: 'hosting', accountName: 'Namecheap / Porkbun', url: 'https://namecheap.com', status: 'active' },
        { name: 'Passport Seva Online', category: 'backend', accountName: 'Ministry of External Affairs', url: 'https://passportindia.gov.in', status: 'active' },
      ],
    },
    {
      id: 'atm-sovereign',
      email: 'dev@sovereign-os.org',
      label: 'Sovereign OS Kernel Atmosphere',
      purpose: 'Developer & Cloud',
      connectedServices: [
        { name: 'Rust Microkernel GitHub', category: 'git', accountName: 'sovereign-microkernel-team', url: 'https://github.com', status: 'active' },
        { name: 'Docker Hub Container Registry', category: 'backend', accountName: 'sovereignos/kernel-core', url: 'https://hub.docker.com', status: 'active' },
        { name: 'Crates.io Package Registry', category: 'backend', accountName: 'crates.io/users/abhishek', url: 'https://crates.io', status: 'active' },
      ],
    },
    {
      id: 'atm-ai',
      email: 'abhi.ai.research@gmail.com',
      label: 'AI & Neural Labs Atmosphere',
      purpose: 'Academic & Research',
      connectedServices: [
        { name: 'Google AI Studio Gemini', category: 'backend', accountName: 'Gemini 2.5 Flash Workspace', url: 'https://aistudio.google.com', status: 'active' },
        { name: 'Hugging Face Hub', category: 'git', accountName: 'huggingface.co/abhishek-arch', url: 'https://huggingface.co', status: 'active' },
        { name: 'Weights & Biases (W&B)', category: 'backend', accountName: 'wandb.ai/starkforge-ai', url: 'https://wandb.ai', status: 'active' },
      ],
    },
    {
      id: 'atm-aws',
      email: 'theconquere.cloud@gmail.com',
      label: 'AWS & Edge DevOps Atmosphere',
      purpose: 'Developer & Cloud',
      connectedServices: [
        { name: 'Amazon Web Services (AWS)', category: 'backend', accountName: 'AWS Account 8821-4401', url: 'https://aws.amazon.com/console', status: 'active' },
        { name: 'Cloudflare ZeroTrust & DNS', category: 'hosting', accountName: 'abhishek.engineering Zone', url: 'https://dash.cloudflare.com', status: 'active' },
        { name: 'Datadog Telemetry Hub', category: 'backend', accountName: 'datadoghq.com/jarvis-os', url: 'https://datadoghq.com', status: 'active' },
      ],
    },
    {
      id: 'atm-azure',
      email: 'abhishek.systems@outlook.com',
      label: 'Microsoft Azure & Enterprise Atmosphere',
      purpose: 'Developer & Cloud',
      connectedServices: [
        { name: 'Microsoft Azure Cloud', category: 'backend', accountName: 'Azure Enterprise Dev Plan', url: 'https://portal.azure.com', status: 'active' },
        { name: 'Visual Studio Enterprise', category: 'git', accountName: 'MSDN Subscriber Account', url: 'https://my.visualstudio.com', status: 'active' },
      ],
    },
    {
      id: 'atm-consulting',
      email: 'contact@abhishek.engineering',
      label: 'Portfolio & Public Direct Atmosphere',
      purpose: 'Personal & Identity',
      connectedServices: [
        { name: 'Portfolio Netlify Edge', category: 'hosting', accountName: 'abhishek.engineering', url: 'https://app.netlify.com', status: 'active' },
        { name: 'Resend Transactional Email', category: 'backend', accountName: 'resend.com/abhishek', url: 'https://resend.com', status: 'active' },
        { name: 'Cal.com Executive Meetings', category: 'backend', accountName: 'cal.com/abhishek-g', url: 'https://cal.com', status: 'active' },
      ],
    },
    {
      id: 'atm-upwork',
      email: 'freelance.abhishek@gmail.com',
      label: 'Upwork & Consulting Client Atmosphere',
      purpose: 'Business & Startup',
      connectedServices: [
        { name: 'Upwork Top-Rated Profile', category: 'finance', accountName: 'Systems & CAD Architect', url: 'https://upwork.com', status: 'active' },
        { name: 'Indeed Talent Profile', category: 'finance', accountName: 'Verified Lead Engineer', url: 'https://indeed.com', status: 'active' },
      ],
    },
    {
      id: 'atm-ieee',
      email: 'student.ieee@sit.ac.in',
      label: 'IEEE Student Branch & Publications',
      purpose: 'Academic & Research',
      connectedServices: [
        { name: 'IEEE Member Portal', category: 'backend', accountName: 'Member #99281044', url: 'https://ieee.org', status: 'active' },
        { name: 'IEEE Collabratec Research', category: 'media', accountName: 'Research Network', url: 'https://ieee-collabratec.ieee.org', status: 'active' },
      ],
    },
    {
      id: 'atm-gdg',
      email: 'gdg.lead@sit.ac.in',
      label: 'Google Developer Groups Atmosphere',
      purpose: 'Academic & Research',
      connectedServices: [
        { name: 'Google Dev Community Platform', category: 'backend', accountName: 'GDG Campus Lead', url: 'https://developers.google.com/community/gdg', status: 'active' },
        { name: 'Eventbrite Dev Workshops', category: 'media', accountName: 'Organizer Dashboard', url: 'https://eventbrite.com', status: 'active' },
      ],
    },
    {
      id: 'atm-devops',
      email: 'devops@theconquere.io',
      label: 'CI/CD Pipelines & Sentry Atmosphere',
      purpose: 'Developer & Cloud',
      connectedServices: [
        { name: 'GitHub Actions Workflows', category: 'git', accountName: 'Autonomous CI Runners', url: 'https://github.com', status: 'active' },
        { name: 'Sentry Real-Time Error Tracking', category: 'backend', accountName: 'sentry.io/jarvis-ecosystem', url: 'https://sentry.io', status: 'active' },
        { name: 'Postman API Workspace', category: 'backend', accountName: 'postman.com/abhishek-apis', url: 'https://postman.com', status: 'active' },
      ],
    },
    {
      id: 'atm-security',
      email: 'security@sovereign-os.org',
      label: 'Cybersecurity & Keybase Atmosphere',
      purpose: 'Developer & Cloud',
      connectedServices: [
        { name: 'Keybase PGP Identity', category: 'backend', accountName: 'keybase.io/abhishek_g', url: 'https://keybase.io', status: 'active' },
        { name: 'SonarCloud Code Quality', category: 'git', accountName: 'sonarcloud.io/sovereign', url: 'https://sonarcloud.io', status: 'active' },
      ],
    },
    {
      id: 'atm-media',
      email: 'media.creator@starkforge.io',
      label: 'YouTube Creator & Studio Atmosphere',
      purpose: 'Business & Startup',
      connectedServices: [
        { name: 'YouTube Studio Partner', category: 'media', accountName: 'StarkForge 3D Tech', url: 'https://studio.youtube.com', status: 'active' },
        { name: 'Epidemic Sound Licensing', category: 'media', accountName: 'Creator Commercial License', url: 'https://epidemicsound.com', status: 'active' },
      ],
    },
    {
      id: 'atm-marketing',
      email: 'marketing@starkforge.io',
      label: 'Growth & Analytics Atmosphere',
      purpose: 'Business & Startup',
      connectedServices: [
        { name: 'Google Analytics 4', category: 'backend', accountName: 'GA4 StarkForge Property', url: 'https://analytics.google.com', status: 'active' },
        { name: 'Google Search Console', category: 'hosting', accountName: 'starkforge.dev Verified', url: 'https://search.google.com/search-console', status: 'active' },
      ],
    },
    {
      id: 'atm-finance',
      email: 'payments@starkforge.io',
      label: 'Finance, Banking & Invoicing Atmosphere',
      purpose: 'Business & Startup',
      connectedServices: [
        { name: 'Stripe Master Invoicing', category: 'finance', accountName: 'acct_1StarkForgeFinMaster', url: 'https://dashboard.stripe.com', status: 'active' },
        { name: 'PayPal Business Merchant', category: 'finance', accountName: 'paypal.me/starkforge', url: 'https://paypal.com', status: 'active' },
      ],
    },
    {
      id: 'atm-family',
      email: 'family.vault@abhishek.me',
      label: 'Banking & Family Asset Vault Atmosphere',
      purpose: 'Personal & Identity',
      connectedServices: [
        { name: 'SBI Corporate Banking', category: 'finance', accountName: 'State Bank Corporate NetBanking', url: 'https://onlinesbi.sbi', status: 'active' },
        { name: 'Insurance & Asset DigiLocker', category: 'backend', accountName: 'DigiLocker Life Policies', url: 'https://digilocker.gov.in', status: 'active' },
      ],
    },
    {
      id: 'atm-alumni',
      email: 'alumni.network@sit.ac.in',
      label: 'SIT Alumni & Career Network',
      purpose: 'Academic & Research',
      connectedServices: [
        { name: 'VTU Alumni Career Portal', category: 'backend', accountName: 'Alumni Registry', url: 'https://vtu.ac.in', status: 'active' },
        { name: 'LinkedIn SIT CSE Alumni Hub', category: 'media', accountName: 'Engineering Graduates', url: 'https://linkedin.com', status: 'active' },
      ],
    },
  ],
  publications: [
    {
      id: 'pub-1',
      title: 'Autonomous Multi-Agent Architecture for Personal Operating Ecosystems',
      type: 'whitepaper',
      publishedIn: 'JARVIS Ecosystem Technical Monographs, v2.0',
      date: 'October 2026',
      url: 'https://github.com/theconquere07V1Mark02/jarvis-ecosystem',
      abstract:
        'A formal treatise proposing a decentralized dual-tier web architecture separating private executive operating systems from high-throughput public showcase platforms using decoupled edge functions and localized LLM reasoning.',
      coAuthors: ['Abhishek Gangadhar'],
    },
    {
      id: 'pub-2',
      title: 'High-Performance In-Browser CAD Rendering via WebAssembly & WebGL Shaders',
      type: 'research_paper',
      publishedIn: 'StarkForge Technical Review & Academic Preprint',
      date: '2025',
      url: 'https://starkforge.dev/research',
      abstract:
        'Explores the optimization of boundary-representation parametric modeling pipelines directly inside browser threads utilizing WebAssembly SIMD and custom GLSL vertex shaders.',
      coAuthors: ['Abhishek Gangadhar'],
    },
    {
      id: 'pub-3',
      title: 'Microkernel Process Isolation in Web-Native Operating Environments',
      type: 'patent',
      publishedIn: 'Sovereign OS Architecture Patent Disclosure',
      date: '2025',
      url: 'https://sovereign-os.internal/patent',
      abstract:
        'A patent-pending process for sandboxing untrusted client-side micro-applications inside web workers with hardware-accelerated memory encryption.',
      coAuthors: ['Abhishek Gangadhar'],
    },
  ],
  strategicNetwork: [
    {
      id: 'net-1',
      name: 'Dr. K.S. Sridhar',
      title: 'Principal & Senior Dean of Engineering',
      organization: 'SIT Institute of Technology, VTU',
      category: 'academic_topper',
      influenceLevel: 'VIP / Critical',
      connectionChannel: 'Direct Campus Office & SIT Executive Council',
      relationshipStatus: 'Active Ally',
      importanceRationale: 'Institutional sponsor for research lab allocations, state tech grant approvals, and academic acceleration.',
      nextBestMove: 'Present working demo of Sovereign OS Microkernel & request university patent cell filing support.',
      email: 'principal@sit.ac.in',
    },
    {
      id: 'net-2',
      name: 'Rajeshwari Natarajan',
      title: 'Principal Staff Infrastructure Architect',
      organization: 'Google Cloud Platform (Mountain View & BLR)',
      category: 'tech_referral',
      influenceLevel: 'VIP / Critical',
      connectionChannel: 'LinkedIn & SIT Distinguished Alum Network',
      relationshipStatus: 'Active Ally',
      importanceRationale: 'Holds Tier-1 direct employee referral authority for Google Cloud Systems & Gemini Architecture roles.',
      nextBestMove: 'Send StarkForge CAD WebGL benchmark monograph & request 20-min architectural review session.',
      email: 'rajeshwari.gcp@alum.sit.ac.in',
      linkedInUrl: 'https://linkedin.com/in/rajeshwari-n',
    },
    {
      id: 'net-3',
      name: 'Vikramaditya Rao',
      title: 'Founding General Partner',
      organization: 'PeakForge Ventures (Bengaluru & SF)',
      category: 'investor_hnw',
      influenceLevel: 'High Leverage',
      connectionChannel: 'Bengaluru Tech Angel Mixer & WhatsApp Private',
      relationshipStatus: 'Strategic Partner',
      importanceRationale: 'Active seed check writer in developer tools, high-performance WebGL, and sovereign OS infrastructure ($250k–$750k).',
      nextBestMove: 'Share 2-minute video walkthrough of StarkForge CAD topological mesher running in browser at 60 FPS.',
      phone: '+91 9980X-XXXXX',
    },
    {
      id: 'net-4',
      name: 'Nikhil Kamath',
      title: 'Fintech Angel & E-Commerce Scaler',
      organization: 'Gruhas & Retail Growth Syndicate',
      category: 'investor_hnw',
      influenceLevel: 'High Leverage',
      connectionChannel: 'Karnataka Commerce Federation & Direct WhatsApp',
      relationshipStatus: 'Strategic Partner',
      importanceRationale: 'Key mentor for scaling Gauri Idols pan-India festive e-commerce, fulfillment distribution, and retail brand expansion.',
      nextBestMove: 'Share Gauri Idols festive season GMV metrics and automated 3D product visualizer conversion lift.',
    },
    {
      id: 'net-5',
      name: 'Anish Kumar',
      title: 'Senior Director of Cloud Systems',
      organization: 'Microsoft Azure Core Group',
      category: 'tech_referral',
      influenceLevel: 'High Leverage',
      connectionChannel: 'IEEE Cloud Computing Symposium & LinkedIn',
      relationshipStatus: 'Active Ally',
      importanceRationale: 'Direct referral for Microsoft Azure Systems Architect positions and access to Azure Founders Hub $150k credits.',
      nextBestMove: 'Apply for Microsoft for Startups sponsorship for Sovereign OS distributed nodes.',
      email: 'anish.k@microsoft.com',
    },
    {
      id: 'net-6',
      name: 'Dr. H.G. Chandra',
      title: 'Member Secretary & Research Evaluation Chair',
      organization: 'Karnataka State Innovation & Patent Council',
      category: 'gov_institutional',
      influenceLevel: 'VIP / Critical',
      connectionChannel: 'DocGov Official Committee & State Science Forum',
      relationshipStatus: 'Strategic Partner',
      importanceRationale: 'State patent fast-track approval committee lead and provider of institutional Gov grant endorsements.',
      nextBestMove: 'Submit DocGov verified digital stamp documentation for state youth engineering honors.',
    },
  ],
  publicAssets: [
    {
      id: 'pub-asset-1',
      name: 'Google Search Entity Knowledge Graph',
      type: 'google_serp',
      headline: 'Abhishek Gangadhar — Lead Systems Architect & Founder',
      url: 'https://www.google.com/search?q=Abhishek+Gangadhar',
      visibility: 'Indexed on Google',
      publicPerception: 'Recognized as computer scientist, lead architect of StarkForge CAD, associated with Gauri Idols, and sovereign OS researcher.',
      associatedBrand: 'Abhishek Gangadhar Entity',
      trafficOrIndexStatus: 'Google Knowledge Entity • SERP #1',
    },
    {
      id: 'pub-asset-2',
      name: 'Gauri Idols Live Commerce Suite',
      type: 'commerce',
      headline: 'Production Cultural Commerce & 3D Artistry Storefront',
      url: 'https://gauriidols.netlify.app',
      visibility: 'Public to World',
      publicPerception: 'High-trust, clean production e-commerce store with real-time 3D model previews, customer reviews, and Stripe checkout.',
      associatedBrand: 'Gauri Idols',
      trafficOrIndexStatus: 'Active Production • Google Indexed',
    },
    {
      id: 'pub-asset-3',
      name: 'StarkForge CAD Engine Portal',
      type: 'live_website',
      headline: 'Browser-Native WebGL Parametric CAD Engineering',
      url: 'https://starkforge.dev',
      visibility: 'Public to World',
      publicPerception: 'High-performance engineering brand demonstrating deep WebGL, WebAssembly SIMD, and topological CAD expertise.',
      associatedBrand: 'StarkForge Technologies',
      trafficOrIndexStatus: 'Staging to Production • SSL Verified',
    },
    {
      id: 'pub-asset-4',
      name: 'Public Engineering Showcase Platform',
      type: 'live_website',
      headline: 'Autonomous Curated Showcase of 28 Repos & Projects',
      url: '/showcase',
      visibility: 'Public to World',
      publicPerception: 'Elite public portfolio presenting selected verified projects, research papers, and technical monographs without exposing private workspace internals.',
      associatedBrand: 'JARVIS Ecosystem',
      trafficOrIndexStatus: 'Publicly Accessible • Fast Static Edge',
    },
    {
      id: 'pub-asset-5',
      name: 'Decentralized Architecture Monographs',
      type: 'github_ecosystem',
      headline: 'Open-Access Architectural Treatises & Patents',
      url: 'https://github.com/theconquere07V1Mark02/jarvis-ecosystem',
      visibility: 'Indexed on Google',
      publicPerception: 'High-authority technical publications establishing pedigree in multi-agent orchestration, web microkernels, and distributed systems.',
      associatedBrand: 'Sovereign Research',
      trafficOrIndexStatus: 'Public GitHub Repos • Starred by Devs',
    },
  ],
};

export class ProfileStore {
  private static cached: ExecutiveProfile | null = null;

  public static getProfile(): ExecutiveProfile {
    if (this.cached) return this.cached;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const resolved: ExecutiveProfile = {
          ...DEFAULT_PROFILE,
          ...parsed,
          socials:
            parsed.socials && parsed.socials[0]?.subAccounts
              ? parsed.socials
              : DEFAULT_PROFILE.socials,
          strategicNetwork:
            parsed.strategicNetwork && parsed.strategicNetwork.length > 0
              ? parsed.strategicNetwork
              : DEFAULT_PROFILE.strategicNetwork,
          publicAssets:
            parsed.publicAssets && parsed.publicAssets.length > 0
              ? parsed.publicAssets
              : DEFAULT_PROFILE.publicAssets,
          emailAtmospheres:
            parsed.emailAtmospheres && parsed.emailAtmospheres.length >= 10
              ? parsed.emailAtmospheres
              : DEFAULT_PROFILE.emailAtmospheres,
        };
        this.cached = resolved;
        return resolved;
      }
    } catch {}
    this.cached = DEFAULT_PROFILE;
    return DEFAULT_PROFILE;
  }

  public static updateProfile(updates: Partial<ExecutiveProfile>): ExecutiveProfile {
    const current = this.getProfile();
    const next: ExecutiveProfile = { ...current, ...updates };
    this.cached = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    return next;
  }

  public static resolveVerifiableDoc(id: string): IdentityDoc | null {
    const profile = this.getProfile();

    // 1. Resume
    if (id === 'resume' || id === 'cv') {
      return {
        id: 'resume',
        title: 'Executive Curriculum Vitae (Master Resume)',
        idType: 'docgov',
        maskedNumber: 'CV-VERIFIED-2026',
        issuedBy: 'Abhishek Gangadhar • Chief Systems Architect',
        fileName: profile.resumeFileName || 'Abhishek_Gangadhar_CV.pdf',
        docUrl: profile.resumeUrl,
        isPrivate: true,
      };
    }

    // 2. Avatar / Official Portrait
    if (id === 'avatar' || id === 'portrait') {
      return {
        id: 'avatar',
        title: 'Official Executive Portrait & Identity',
        idType: 'signature',
        maskedNumber: 'BIO-PORTRAIT-AG07',
        issuedBy: 'UIDAI & Digilocker Verified Identity Authority',
        fileName: 'Abhishek_Gangadhar_Portrait.jpg',
        docUrl: profile.avatarUrl,
        isPrivate: true,
      };
    }

    // 3. DocGov Identity Docs
    const identityDoc = (profile.identityDocs || []).find((d) => d.id === id);
    if (identityDoc) return identityDoc;

    // 4. Education Records
    const edu = (profile.education || []).find((e) => e.id === id);
    if (edu) {
      return {
        id: edu.id,
        title: `${edu.title} — Official Academic Record`,
        idType: 'college_id',
        maskedNumber: `${edu.level.toUpperCase()}-${edu.year.slice(0, 4)}`,
        issuedBy: `${edu.institution} (${edu.boardOrUniversity})`,
        fileName: edu.fileName || `${edu.level}_Transcript_Verified.pdf`,
        docUrl: edu.docUrl,
        isPrivate: true,
      };
    }

    // 5. Certifications
    const cert = (profile.certifications || []).find((c) => c.id === id);
    if (cert) {
      return {
        id: cert.id,
        title: `${cert.title} — Verified Credential Record`,
        idType: 'docgov',
        maskedNumber: cert.credentialId || 'ACCREDITED-VERIFIED',
        issuedBy: cert.issuer,
        fileName: cert.fileName || `${cert.title.replace(/\s+/g, '_')}_Certificate.pdf`,
        docUrl: cert.certificateUrl,
        isPrivate: true,
      };
    }

    // 6. Publications & Patents
    const pub = (profile.publications || []).find((p) => p.id === id);
    if (pub) {
      return {
        id: pub.id,
        title: `${pub.title} — Official Monograph & Manuscript`,
        idType: 'docgov',
        maskedNumber: `PUB-${pub.date.replace(/\s+/g, '-')}`,
        issuedBy: pub.publishedIn,
        fileName: pub.fileName || `${pub.title.replace(/\s+/g, '_')}_Manuscript.pdf`,
        docUrl: pub.docUrl || pub.url,
        isPrivate: true,
      };
    }

    // 7. Custom Dynamic Doc Registry
    try {
      const customDocs = JSON.parse(localStorage.getItem('CUSTOM_SHARED_DOCS') || '{}');
      if (customDocs[id]) return customDocs[id];
    } catch {}

    return null;
  }
}
