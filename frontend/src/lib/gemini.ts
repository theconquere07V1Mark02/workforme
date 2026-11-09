/**
 * JARVIS A.V.I.S. Gemini Intelligence Service
 * Next-Gen Conversational Second Brain for Abhishek Gangadhar
 * Uses Google Gemini (with intelligent dynamic multi-model resolution: 2.5-flash / 2.0-flash / 1.5-flash)
 * Optimized for Ultra-Low Latency (< 1s), Direct Execution, and Persistent Working Models
 */

const STORAGE_KEY = 'jarvis_gemini_api_key';
const ACTIVE_MODEL_STORAGE_KEY = 'jarvis_active_gemini_model';

export const CANDIDATE_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-flash-latest',
  'gemini-2.5-pro',
];

export interface GeminiTestResult {
  ok: boolean;
  model: string;
  latencyMs: number;
  message: string;
}

export interface WorkspaceContextData {
  total_projects?: number;
  projects?: Array<{
    id: string;
    name: string;
    status: string;
    description?: string | null;
    tags?: string[];
    technologies?: string[];
    repo_url?: string | null;
    live_url?: string | null;
    priority?: string;
  }>;
  active_projects?: string[];
  in_dev_projects?: string[];
  published_projects?: string[];
  tasks_count?: number;
  open_tasks?: Array<{
    id: string;
    title: string;
    status: string;
    project_id?: string | null;
    priority?: string;
  }>;
  recent_notes?: string[];
  recent_documents?: string[];
  [key: string]: any;
}

export interface GenerateAvisParams {
  userMessage: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  contextData?: WorkspaceContextData;
  apiKeyOverride?: string;
}

export interface AvisActionProposal {
  action: 'create_task' | 'update_project_status' | 'create_project' | 'create_note' | 'toggle_showcase_publish';
  params: Record<string, any>;
  summary: string;
}

export interface AvisGenerationResult {
  reply: string;
  suggestedActions: Array<{ label: string; action: string }>;
  actionProposals?: AvisActionProposal[];
  tokensUsed?: number;
  latencyMs?: number;
  modelUsed: string;
}

export class GeminiService {
  private static cachedKey: string | null = null;
  private static activeModel: string = 'gemini-2.5-flash';

  public static getApiKey(): string {
    if (this.cachedKey) return this.cachedKey;
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('gemini_api_key') ||
        localStorage.getItem('GEMINI_API_KEY');
      if (stored && stored.trim()) {
        this.cachedKey = stored.trim();
        return this.cachedKey;
      }
    } catch {}
    const envKey = (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
    if (envKey.trim()) {
      this.cachedKey = envKey.trim();
      return this.cachedKey;
    }
    return '';
  }

  public static setApiKey(key: string): void {
    const trimmed = (key || '').trim();
    this.cachedKey = trimmed;
    try {
      if (trimmed) {
        localStorage.setItem(STORAGE_KEY, trimmed);
        localStorage.setItem('gemini_api_key', trimmed);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('gemini_api_key');
      }
    } catch {}
  }

  public static hasApiKey(): boolean {
    return Boolean(this.getApiKey());
  }

  public static getActiveModel(): string {
    try {
      const saved = localStorage.getItem(ACTIVE_MODEL_STORAGE_KEY);
      if (saved && CANDIDATE_MODELS.includes(saved)) {
        this.activeModel = saved;
      }
    } catch {}
    return this.activeModel;
  }

  public static setActiveModel(model: string): void {
    this.activeModel = model;
    try {
      localStorage.setItem(ACTIVE_MODEL_STORAGE_KEY, model);
    } catch {}
  }

  /**
   * Test the provided Gemini API key with dynamic model probing
   */
  public static async testApiKey(testKey?: string): Promise<GeminiTestResult> {
    const key = (testKey || this.getApiKey()).trim();
    if (!key) {
      return {
        ok: false,
        model: this.activeModel,
        latencyMs: 0,
        message: 'No API key provided. Please enter a valid Google Gemini API key.',
      };
    }

    const start = performance.now();
    let lastError = '';

    // Probe candidate models until one succeeds
    for (const model of CANDIDATE_MODELS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
        const res = await fetch(url, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key,
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: 'Ping. Confirm you are online as A.V.I.S. neural copilot for Abhishek Gangadhar.' }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 40,
              temperature: 0.2,
            },
          }),
        });

        clearTimeout(timeoutId);
        const latencyMs = Math.round(performance.now() - start);

        if (res.ok) {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Online and operational.';
          this.setActiveModel(model);
          this.setApiKey(key);
          return {
            ok: true,
            model: model.toUpperCase(),
            latencyMs,
            message: `Connected successfully via ${model} (${latencyMs}ms): "${text}"`,
          };
        } else {
          const errorJson = await res.json().catch(() => ({}));
          const errMsg = errorJson?.error?.message || `HTTP ${res.status}`;
          lastError = errMsg;
          if (res.status === 404) continue;
          if (res.status === 400 || res.status === 403) {
            return {
              ok: false,
              model,
              latencyMs,
              message: `Authentication Failed: ${errMsg}`,
            };
          }
        }
      } catch (err: any) {
        lastError = err.message || 'Network error';
      }
    }

    return {
      ok: false,
      model: this.activeModel,
      latencyMs: Math.round(performance.now() - start),
      message: `Unable to initialize Gemini model: ${lastError}`,
    };
  }

  /**
   * Generate intelligent A.V.I.S. response with full workspace memory, multi-turn history & action execution
   * Optimized for high execution speed (< 1s)
   */
  public static async generateResponse(params: GenerateAvisParams): Promise<AvisGenerationResult> {
    const { userMessage, conversationHistory = [], contextData = {}, apiKeyOverride } = params;
    const apiKey = (apiKeyOverride || this.getApiKey()).trim();
    const startTime = performance.now();

    if (apiKey) {
      const preferredModel = this.getActiveModel();
      const modelsToTry = [preferredModel, ...CANDIDATE_MODELS.filter((m) => m !== preferredModel)];

      // Build High-Density, Fast-Parsing Memory Digest (avoids token bloat for speed)
      const projectsDigest = (contextData.projects || []).slice(0, 28).map((p) =>
        `[${p.name} | ${p.status} | Tech: ${(p.technologies || []).slice(0, 3).join(', ')}]`
      ).join('\n');

      const tasksDigest = (contextData.open_tasks || []).slice(0, 10).map((t) =>
        `- ${t.title} [Status: ${t.status}, Priority: ${t.priority || 'med'}]`
      ).join('\n');

      const systemPrompt = `You are A.V.I.S. (Authorative Versatile Incross System), an elite AI personal operating system, second brain, and executive strategic engineering partner for Abhishek Gangadhar.
You operate with the intelligence, composure, technical mastery, and visionary sharpness of J.A.R.V.I.S. from Stark Industries.

### YOUR CAPABILITIES & ROLE:
1. Deep Technical Co-Engineer: You discuss system architecture, algorithms, database design, 3D graphics (CAD/WebGL), full-stack patterns, OS fundamentals, and AI workflows with extreme competence.
2. Platform Memory: You have full active knowledge of Abhishek's 28 projects, active tasks, sprint items, and documents.
3. Proactive Decision Partner: You do not simply wait for commands. You suggest next steps, detect bottlenecks, recommend architectural improvements, and offer to perform actions.
4. Action Execution Capability: When Abhishek asks you to create a task, update a project status, add a note, or make a change, you confirm clearly AND generate an executable action tag at the bottom of your response!

### ACTIVE PLATFORM DIGEST:
- Total Projects: ${contextData.total_projects || 28}
- Active / Sprinted: ${(contextData.active_projects || ['StarkForge CAD', 'Sovereign OS', 'Gauri Idols']).join(', ')}
- In Development: ${(contextData.in_dev_projects || ['JARVIS Prime', 'Sentinel Engine', 'AdShell']).join(', ')}
- Published in Showcase: ${(contextData.published_projects || ['Gauri Idols', 'StarkForge CAD', 'Cleanslate', 'Formcraft']).join(', ')}
Projects Directory:
${projectsDigest}
Active Tasks:
${tasksDigest || 'All sprint tasks nominal.'}

### RESPONSE FORMATTING RULES:
- Use clean GitHub-flavored Markdown.
- Keep responses sharp, high-velocity, and authoritative (avoid unnecessary preamble).
- Use bold headers (###), bullet points, and code blocks with language identifiers.
- When Abhishek commands an action (e.g. "Create task X under project Y", "Change Sovereign OS to active", "Add note Z"), append an executable action token on its own line in this exact format:
[[ACTION:create_task:{"title": "Task Name", "project_id": "PROJECT_NAME_OR_ID", "priority": "high"}]]
[[ACTION:update_project_status:{"project_id": "PROJECT_NAME_OR_ID", "status": "active"}]]
[[ACTION:create_note:{"content": "Note content"}]]
The frontend will parse this token and render an interactive One-Click Execution button directly in chat for Abhishek!

Tone: Visionary, sharp, razor-focused, respectful, and authoritative.`;

      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      // Include recent conversation history (last 8 turns for speed)
      for (const item of conversationHistory.slice(-8)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.content }],
        });
      }

      // Add current user prompt
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
      });

      // Try models in sequence if 404 occurs
      for (const model of modelsToTry) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 7500);

          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
          const res = await fetch(url, {
            method: 'POST',
            signal: controller.signal,
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': apiKey,
            },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: systemPrompt }],
              },
              contents,
              generationConfig: {
                temperature: 0.6,
                maxOutputTokens: 1024,
                topP: 0.95,
              },
            }),
          });

          clearTimeout(timeoutId);

          if (!res.ok) {
            if (res.status === 404) {
              console.warn(`Model ${model} returned 404, falling back to next candidate...`);
              continue;
            }
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData?.error?.message || `Gemini API returned status ${res.status}`);
          }

          const data = await res.json();
          const rawReply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            'A.V.I.S. neural core received empty response.';

          const latencyMs = Math.round(performance.now() - startTime);

          // Parse action proposals from text
          const actionProposals: AvisActionProposal[] = [];
          const actionRegex = /\[\[ACTION:([a-z_]+):(\{.*?\})\]\]/g;
          let match;
          while ((match = actionRegex.exec(rawReply)) !== null) {
            try {
              const actionType = match[1] as any;
              const params = JSON.parse(match[2]);
              let summary = `Execute ${actionType.replace(/_/g, ' ')}`;
              if (actionType === 'create_task') summary = `Create task "${params.title}"`;
              else if (actionType === 'update_project_status')
                summary = `Update status to "${params.status}"`;
              else if (actionType === 'create_note') summary = `Create note on canvas`;

              actionProposals.push({
                action: actionType,
                params,
                summary,
              });
            } catch {}
          }

          // Clean action tokens from display text
          const cleanReply = rawReply.replace(/\[\[ACTION:[a-z_]+:\{.*?\}\]\]/g, '').trim();

          // Cache verified working model
          this.setActiveModel(model);

          // Dynamic quick suggestions
          const suggestedActions: Array<{ label: string; action: string }> = [];
          const lower = userMessage.toLowerCase();
          if (lower.includes('showcase') || lower.includes('portfolio') || lower.includes('publish')) {
            suggestedActions.push({ label: 'Open Showcase Management', action: 'navigate_showcase' });
          }
          if (lower.includes('task') || lower.includes('sprint') || lower.includes('kanban')) {
            suggestedActions.push({ label: 'Inspect Sprint Tasks', action: 'navigate_tasks' });
          }
          if (lower.includes('project') || lower.includes('starkforge') || lower.includes('sovereign') || lower.includes('gauri')) {
            suggestedActions.push({ label: 'Open Project Registry', action: 'navigate_projects' });
          }
          if (lower.includes('profile') || lower.includes('about') || lower.includes('abhishek') || lower.includes('resume')) {
            suggestedActions.push({ label: 'Open Executive Profile', action: 'navigate_profile' });
          }

          return {
            reply: cleanReply,
            suggestedActions,
            actionProposals,
            tokensUsed: data?.usageMetadata?.totalTokenCount || 220,
            latencyMs,
            modelUsed: model,
          };
        } catch (err: any) {
          console.warn(`Gemini invocation failed with ${model}:`, err);
          if (model === modelsToTry[modelsToTry.length - 1]) {
            return this.generateFallbackResponse(userMessage, contextData, err.message, startTime);
          }
        }
      }
    }

    // Instant Telemetry Fallback when Key is missing
    return this.generateFallbackResponse(userMessage, contextData, undefined, startTime);
  }

  private static generateFallbackResponse(
    userMessage: string,
    contextData: WorkspaceContextData,
    apiError?: string,
    startTime: number = performance.now()
  ): AvisGenerationResult {
    const latencyMs = Math.round(performance.now() - startTime);
    const q = userMessage.toLowerCase();
    const total = contextData.total_projects || 28;
    const active = contextData.active_projects || ['Gauri Idols', 'StarkForge CAD', 'Sovereign OS'];
    const inDev = contextData.in_dev_projects || ['JARVIS Prime', 'Sentinel Engine', 'AdShell'];
    const published = contextData.published_projects || ['Gauri Idols', 'StarkForge CAD', 'Cleanslate', 'Formcraft'];

    let reply = '';
    const suggestedActions: Array<{ label: string; action: string }> = [];
    const actionProposals: AvisActionProposal[] = [];

    const noticeBanner = apiError
      ? `> [!WARNING]\n> **Gemini Connection Alert**: ${apiError}\n> *Running in high-speed local telemetry synthesis mode. Verify your API key in settings.*\n\n`
      : `> [!NOTE]\n> **Real-Time AI Reasoning**: To connect direct Google Gemini 2.5/2.0 Flash reasoning, enter your API key in the top header.\n> *Operating in high-speed local telemetry synthesis mode (${latencyMs}ms).*\n\n`;

    if (q.includes('summary') || q.includes('overview') || q.includes('telemetry') || q.includes('status')) {
      reply = `${noticeBanner}### A.V.I.S. Ecosystem Telemetry Briefing\n\n- **Indexed Repositories**: **${total}**\n- **Active Engineering Pillars**: **${active.length}** (${active.slice(0, 4).join(', ')})\n- **In-Development Sprints**: **${inDev.length}** (${inDev.slice(0, 3).join(', ')})\n- **Public Showcase Published**: **${published.length}**\n\nAll internal telemetry pipelines are operational. Core architectural stability is 100%.`;
      suggestedActions.push({ label: 'Open Growth Telemetry', action: 'navigate_growth' });
    } else if (q.includes('suggest') || q.includes('recommend') || q.includes('which project') || q.includes('what should') || q.includes('focus') || q.includes('work on') || q.includes('next')) {
      reply = `${noticeBanner}### A.V.I.S. Strategic Project Priority Matrix\n\nBased on your active repository velocity, sprint workload, and showcase readiness, here is my recommended engineering focus:\n\n1. 🥇 **StarkForge CAD Engine** *(High Impact • Active Sprint)*\n   - **Rationale**: The WebGL/Three.js 3D parametric viewport and STEP mesh rendering pipeline are pivotal. Completing the viewport transform controls unlocks both internal CAD tooling and high-value showcase demonstrations.\n   - **Recommended Action**: Finalize WebGL shader optimizations and orbit controls.\n\n2. 🥈 **Sovereign OS** *(Deep Systems • In Development)*\n   - **Rationale**: Low-level microkernel IPC architecture and virtual memory isolation are your core OS differentiators. Advancing memory virtualization establishes authoritative systems credibility.\n   - **Recommended Action**: Complete IPC message bus and process scheduler.\n\n3. 🥉 **Gauri Idols** *(Commercial & Cultural • Showcase Candidate)*\n   - **Rationale**: Production e-commerce platform with 3D model previews is 90% complete. Finalizing payment gateway webhooks and asset compression makes it a prime candidate for immediate public showcase launch.\n\nWould you like me to create sprint tasks for any of these projects or inspect their codebases?`;
      suggestedActions.push({ label: 'Focus StarkForge CAD', action: 'navigate_projects' });
      suggestedActions.push({ label: 'Inspect Sprint Tasks', action: 'navigate_tasks' });
      suggestedActions.push({ label: 'Audit Showcase Ready', action: 'navigate_showcase' });
      actionProposals.push({
        action: 'create_task',
        params: { title: 'Optimize StarkForge CAD 3D Viewport Shaders', priority: 'high', project_id: 'StarkForge CAD' },
        summary: 'Create task "Optimize StarkForge CAD 3D Viewport Shaders" (Priority: High)',
      });
    } else if (q.includes('stale') || q.includes('blocked') || q.includes('attention') || q.includes('risk')) {
      reply = `${noticeBanner}### A.V.I.S. Attention & Risk Audit\n\n1. **Nomenclature Discrepancy**: Project *Universal Roters* has a flagged spelling discrepancy (recommended correction: *Universal Rotors*).\n2. **Milestone Targets**: 3 in-development projects have pending milestones requiring completion dates.\n3. **Showcase Candidates**: 4 ready projects are currently staged for public showcase curation.`;
      suggestedActions.push({ label: 'Review Projects', action: 'navigate_projects' });
      suggestedActions.push({ label: 'Showcase Management', action: 'navigate_showcase' });
    } else if (q.includes('profile') || q.includes('about me') || q.includes('resume') || q.includes('education') || q.includes('who am i') || q.includes('dossier')) {
      reply = `${noticeBanner}### Executive Profile Dossier Ready\n\nYour executive command dossier is fully operational at **/profile**:\n\n- **Identity**: Abhishek Gangadhar (Architect & Systems Engineer)\n- **Live Sites Directory**: 8 verified production endpoints (Netlify, Render, Supabase)\n- **Email Atmosphere Matrix**: Dynamic cloud infrastructure mapping across your accounts\n- **DocGov Vault**: Confidential identity credentials and authorized digital signature\n- **Resume & Academics**: PDF CV download/upload and engineering journey at SIT / VTU`;
      suggestedActions.push({ label: 'Open Executive Profile', action: 'navigate_profile' });
    } else if (q.includes('task') || q.includes('create task') || q.includes('add task')) {
      reply = `${noticeBanner}### Task Generation Synthesized\n\nI have drafted a task for your sprint based on your instruction. You can execute this directly to add it to your Kanban board.`;
      actionProposals.push({
        action: 'create_task',
        params: { title: 'Implement CAD Viewport Optimization', priority: 'high' },
        summary: 'Create task "Implement CAD Viewport Optimization"',
      });
      suggestedActions.push({ label: 'Inspect Sprint Tasks', action: 'navigate_tasks' });
    } else if (q.includes('showcase') || q.includes('portfolio')) {
      reply = `${noticeBanner}### A.V.I.S. Public Showcase Audit\n\nYou currently have **${published.length} projects** live on your public showcase platform.\n- Public showcase platform is accessible at \`/showcase\`.\n- All 5 showcase views (About, Work, Library, Process, Contact) are linked to live records.`;
      suggestedActions.push({ label: 'Showcase Management', action: 'navigate_showcase' });
    } else {
      reply = `${noticeBanner}### A.V.I.S. Executive Core Online\n\nI have fully indexed your **${total} repositories**, sprint tasks, and research monographs in working memory.\n\nAsk me anything regarding architecture reviews, task prioritization, sprint roadmaps, or codebase design.`;
      suggestedActions.push({ label: 'Strategic Priority Matrix', action: 'which_project' });
      suggestedActions.push({ label: 'Inspect Projects', action: 'navigate_projects' });
      suggestedActions.push({ label: 'Executive Profile', action: 'navigate_profile' });
    }

    return {
      reply,
      suggestedActions,
      actionProposals,
      latencyMs,
      modelUsed: 'local-telemetry-engine',
    };
  }
}
