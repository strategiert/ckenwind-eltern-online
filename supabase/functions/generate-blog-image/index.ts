import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced content analysis for better performance and accuracy
function analyzeContentTone(content: string, title: string): string {
  const combinedText = (content + ' ' + title).toLowerCase();
  
  // More comprehensive emotional analysis
  const emotions = {
    stress: ['stress', 'burnout', 'erschöpfung', 'überforderung', 'druck'],
    hope: ['hilfe', 'unterstützung', 'lösung', 'erfolg', 'schaffen', 'hoffnung'],
    family: ['familie', 'kinder', 'eltern', 'mutter', 'vater', 'geschwister'],
    healing: ['heilung', 'therapie', 'genesung', 'besserung', 'fortschritt'],
    crisis: ['krise', 'notfall', 'akut', 'gefahr', 'panik'],
    eating: ['essen', 'fress', 'hunger', 'satt', 'diät', 'gewicht', 'körper']
  };
  
  for (const [emotion, keywords] of Object.entries(emotions)) {
    if (keywords.some(keyword => combinedText.includes(keyword))) {
      switch (emotion) {
        case 'stress': return 'calming and supportive with soft, peaceful elements';
        case 'hope': return 'hopeful and encouraging with warm, uplifting atmosphere';
        case 'family': return 'warm family atmosphere with caring, nurturing vibes';
        case 'healing': return 'gentle healing energy with restorative, peaceful mood';
        case 'crisis': return 'safe and secure environment with protective, reassuring tone';
        case 'eating': return 'balanced, healthy lifestyle with positive relationship to food';
        default: return 'peaceful and nurturing with gentle, supportive energy';
      }
    }
  }
  
  return 'peaceful and nurturing with gentle, supportive energy';
}

function getCategoryStyle(category: string): string {
  const styles: Record<string, string> = {
    'eltern-tipps': 'modern family scene with parent and child in warm, cozy setting',
    'burnout-praevention': 'serene restoration scene with soft lighting and calming elements',
    'adhs-hilfe': 'organized, structured environment with clear, focused imagery',
    'esstoerungen': 'healthy, balanced lifestyle scene with positive food relationships and mindful eating',
    'familienalltag': 'authentic family moments with natural, everyday warmth',
    'selbstfuersorge': 'peaceful self-care moment with gentle, nurturing atmosphere',
    'mentale-gesundheit': 'supportive mental wellness scene with hope and strength'
  };
  
  return styles[category] || 'supportive family scene with caring atmosphere';
}

function extractKeyThemes(content: string, title: string): string[] {
  const text = (content + ' ' + title).toLowerCase();
  const themes = [];
  
  // Theme detection with German keywords
  const themeMap = {
    'nature': ['natur', 'draußen', 'spaziergang', 'park', 'garten'],
    'home': ['zuhause', 'wohnung', 'haus', 'zimmer', 'küche'],
    'communication': ['gespräch', 'reden', 'kommunikation', 'sprechen'],
    'education': ['lernen', 'schule', 'bildung', 'wissen', 'verstehen'],
    'routine': ['routine', 'struktur', 'plan', 'organisation', 'ordnung'],
    'emotion': ['gefühl', 'emotion', 'freude', 'angst', 'trauer', 'wut'],
    'food': ['essen', 'fress', 'hunger', 'satt', 'diät', 'mahlzeit', 'küche'],
    'support': ['hilfe', 'unterstützung', 'begleitung', 'therapie', 'beratung']
  };
  
  for (const [theme, keywords] of Object.entries(themeMap)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      themes.push(theme);
    }
  }
  
  return themes;
}

// Smart prompt truncation that preserves essential information
function truncatePromptIntelligently(prompt: string, maxLength: number = 950): string {
  if (prompt.length <= maxLength) {
    return prompt;
  }

  // Split into sentences
  const sentences = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Always keep the first sentence (usually the main scene description)
  let result = sentences[0].trim();
  
  // Priority keywords to preserve
  const priorityKeywords = [
    'emotional tone', 'portrait orientation', 'modern illustration',
    'warm colors', 'family', 'parent', 'child', 'supportive',
    'German', 'professional', 'nurturing'
  ];
  
  // Add sentences that contain priority keywords
  for (let i = 1; i < sentences.length && result.length < maxLength - 100; i++) {
    const sentence = sentences[i].trim();
    if (priorityKeywords.some(keyword => sentence.toLowerCase().includes(keyword.toLowerCase()))) {
      if (result.length + sentence.length + 2 <= maxLength) {
        result += '. ' + sentence;
      }
    }
  }
  
  // Ensure it ends properly
  if (!result.endsWith('.') && !result.endsWith('!') && !result.endsWith('?')) {
    result += '.';
  }
  
  // If still too long, truncate at word boundary
  if (result.length > maxLength) {
    result = result.substring(0, maxLength - 3);
    const lastSpace = result.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.8) {
      result = result.substring(0, lastSpace);
    }
    result += '...';
  }
  
  return result;
}

async function analyzeContentForImage(title: string, topic: string, category: string, content: string): Promise<string> {
  console.log('Analyzing content with GPT-4 mini for image description...');
  
  const analysisPrompt = `Analyze this German parenting blog article and create a concise image description for DALL-E 3.

Article Title: "${title}"
Topic: "${topic}"
Category: "${category}"
Content Preview: "${content.substring(0, 300)}..."

Create a professional image description that includes:
1. Main visual scene (people, setting, objects)
2. Emotional tone and atmosphere
3. Art style (modern illustration, warm colors, etc.)

The image should be:
- Professional yet approachable
- Culturally appropriate for German families
- Emotionally supportive and positive
- Portrait orientation (3:4 ratio)
- Modern illustration style with warm colors

Keep the description concise but detailed. Respond with ONLY the image description, no additional text.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert at creating concise, detailed image descriptions for family and parenting content. Keep descriptions under 800 characters while maintaining essential details.' },
        { role: 'user', content: analysisPrompt }
      ],
      max_tokens: 200,
      temperature: 0.7
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`GPT-4 mini analysis error: ${response.status} - ${errorText}`);
    throw new Error(`Fehler bei der Inhaltsanalyse: ${response.status}`);
  }

  const data = await response.json();
  let imageDescription = data.choices[0]?.message?.content;
  
  if (!imageDescription || typeof imageDescription !== 'string') {
    throw new Error('Keine gültige Bildbeschreibung von der Analyse erhalten.');
  }

  // Apply intelligent truncation
  imageDescription = truncatePromptIntelligently(imageDescription.trim(), 950);
  
  console.log(`Generated image description (${imageDescription.length} characters): ${imageDescription.substring(0, 100)}...`);
  return imageDescription;
}

function generateOptimizedPrompt(title: string, category: string, content: string): string {
  console.log('Generating enhanced prompt with comprehensive analysis...');
  
  const tone = analyzeContentTone(content, title);
  const categoryStyle = getCategoryStyle(category);
  const themes = extractKeyThemes(content, title);
  
  // Enhanced prompt with better context and specificity
  let prompt = `Professional illustration for German parenting blog: "${title.substring(0, 40)}${title.length > 40 ? '...' : ''}"

Style: ${categoryStyle}
Tone: ${tone}
Portrait (3:4), modern illustration, warm pastels
European family, diverse, no text overlays`;

  // Add theme-specific elements
  if (themes.length > 0) {
    prompt += `\nElements: `;
    if (themes.includes('nature')) prompt += 'outdoor setting, ';
    if (themes.includes('home')) prompt += 'cozy indoor, ';
    if (themes.includes('communication')) prompt += 'meaningful conversation, ';
    if (themes.includes('emotion')) prompt += 'emotionally expressive, ';
    if (themes.includes('food')) prompt += 'positive food relationship, ';
    if (themes.includes('support')) prompt += 'supportive interactions, ';
  }

  prompt += `\nMood: Calming, professional, hopeful
Art: Contemporary digital, clean lines, soft lighting`;

  // Apply intelligent truncation
  prompt = truncatePromptIntelligently(prompt, 950);
  
  console.log(`Generated enhanced prompt (${prompt.length} characters) with themes:`, themes);
  return prompt;
}

async function generateImageFromPrompt(imagePrompt: string): Promise<string> {
  console.log('Generating image with DALL-E 3 from provided prompt...');

  // Apply truncation as safety measure
  const truncatedPrompt = truncatePromptIntelligently(imagePrompt, 950);
  console.log(`Using prompt (${truncatedPrompt.length} characters): ${truncatedPrompt.substring(0, 100)}...`);

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: truncatedPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'natural'
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`DALL-E 3 error: ${response.status} - ${errorText}`);
    
    let userFriendlyError = 'Fehler bei der Bildgenerierung.';
    if (response.status === 429) {
      userFriendlyError = 'Zu viele Anfragen. Bitte versuchen Sie es in einem Moment erneut.';
    } else if (response.status === 400) {
      userFriendlyError = 'Ungültige Anfrage für die Bildgenerierung.';
    } else if (response.status === 401) {
      userFriendlyError = 'Authentifizierungsfehler. API-Schlüssel überprüfen.';
    } else if (response.status >= 500) {
      userFriendlyError = 'Server-Fehler. Bitte versuchen Sie es später erneut.';
    }
    
    throw new Error(`${userFriendlyError} (Status: ${response.status})`);
  }

  const data = await response.json();
  
  if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
    console.error('Invalid DALL-E 3 response structure:', data);
    throw new Error('Ungültige Antwort von der Bildgenerierung erhalten.');
  }
  
  const imageUrl = data.data[0]?.url;
  if (!imageUrl || typeof imageUrl !== 'string') {
    console.error('Missing or invalid image URL in response:', data.data[0]);
    throw new Error('Keine gültige Bild-URL in der Antwort erhalten.');
  }

  // Validate URL format
  try {
    new URL(imageUrl);
  } catch {
    console.error('Invalid URL format received:', imageUrl);
    throw new Error('Ungültige Bild-URL Format erhalten.');
  }

  return imageUrl;
}

// Enhanced error handling and validation
function validateRequest(body: any): { isValid: boolean; error?: string } {
  if (!body.mode || (body.mode !== 'analyze' && body.mode !== 'generate')) {
    return { isValid: false, error: 'Mode is required and must be either "analyze" or "generate"' };
  }

  if (body.mode === 'analyze') {
    if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
      return { isValid: false, error: 'Title is required for content analysis' };
    }
    if (body.title.length > 200) {
      return { isValid: false, error: 'Title is too long (max 200 characters)' };
    }
  }

  if (body.mode === 'generate') {
    if (!body.imagePrompt || typeof body.imagePrompt !== 'string' || !body.imagePrompt.trim()) {
      return { isValid: false, error: 'Image prompt is required for image generation' };
    }
    // Removed the length check here since we now handle truncation automatically
  }
  
  return { isValid: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Enhanced input validation
    const validation = validateRequest(body);
    if (!validation.isValid) {
      console.error('Validation error:', validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { mode, title, topic, category, content, imagePrompt } = body;

    if (mode === 'analyze') {
      console.log(`Analyzing content for: ${title} (Category: ${category || 'unknown'})`);
      
      // Use GPT-4 mini to analyze content and generate image description
      const imageDescription = await analyzeContentForImage(title, topic || '', category || '', content || '');
      
      console.log('Successfully analyzed content and generated image description');
      
      return new Response(
        JSON.stringify({ imageDescription }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    if (mode === 'generate') {
      console.log(`Generating image from prompt (${imagePrompt.length} characters): ${imagePrompt.substring(0, 100)}...`);
      
      // Use DALL-E 3 to generate image from the provided prompt (with automatic truncation)
      const imageUrl = await generateImageFromPrompt(imagePrompt);
      
      console.log('Successfully generated image from prompt');
      
      return new Response(
        JSON.stringify({ imageUrl }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

  } catch (error) {
    console.error('Error in enhanced generate-blog-image function:', error);
    
    // Enhanced error response with user-friendly messages
    let errorMessage = 'Ein unerwarteter Fehler ist aufgetreten.';
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        errorMessage = 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.';
      } else if (error.message.includes('JSON')) {
        errorMessage = 'Fehler beim Verarbeiten der Antwort.';
        statusCode = 422;
      } else if (error.message.includes('API')) {
        errorMessage = 'Fehler beim Zugriff auf den AI-Service.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      {
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
