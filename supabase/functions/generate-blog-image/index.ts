
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
    crisis: ['krise', 'notfall', 'akut', 'gefahr', 'panik']
  };
  
  for (const [emotion, keywords] of Object.entries(emotions)) {
    if (keywords.some(keyword => combinedText.includes(keyword))) {
      switch (emotion) {
        case 'stress': return 'calming and supportive with soft, peaceful elements';
        case 'hope': return 'hopeful and encouraging with warm, uplifting atmosphere';
        case 'family': return 'warm family atmosphere with caring, nurturing vibes';
        case 'healing': return 'gentle healing energy with restorative, peaceful mood';
        case 'crisis': return 'safe and secure environment with protective, reassuring tone';
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
    'esstoerungen': 'healthy, balanced lifestyle scene with positive food relationships',
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
    'emotion': ['gefühl', 'emotion', 'freude', 'angst', 'trauer', 'wut']
  };
  
  for (const [theme, keywords] of Object.entries(themeMap)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      themes.push(theme);
    }
  }
  
  return themes;
}

function generateOptimizedPrompt(title: string, category: string, content: string): string {
  console.log('Generating enhanced prompt with comprehensive analysis...');
  
  const tone = analyzeContentTone(content, title);
  const categoryStyle = getCategoryStyle(category);
  const themes = extractKeyThemes(content, title);
  
  // Enhanced prompt with better context and specificity
  let prompt = `Professional illustration for German parenting blog article: "${title.substring(0, 60)}${title.length > 60 ? '...' : ''}"

Visual Style: ${categoryStyle}
Emotional Tone: ${tone}
Portrait orientation (3:4 aspect ratio), modern minimalist illustration style
Warm pastel color palette with soft gradients
European family representation, diverse and inclusive
No text overlays or written words in the image
`;

  // Add theme-specific elements
  if (themes.length > 0) {
    prompt += `\nThematic Elements: `;
    if (themes.includes('nature')) prompt += 'Natural outdoor setting, ';
    if (themes.includes('home')) prompt += 'Cozy indoor environment, ';
    if (themes.includes('communication')) prompt += 'People in meaningful conversation, ';
    if (themes.includes('education')) prompt += 'Learning and growth imagery, ';
    if (themes.includes('routine')) prompt += 'Organized, structured elements, ';
    if (themes.includes('emotion')) prompt += 'Emotionally expressive and authentic, ';
  }

  prompt += `\nOverall Mood: Calming, professional yet approachable, hopeful and supportive
Art Style: Contemporary digital illustration, clean lines, gentle shadows
Lighting: Soft, natural lighting that creates warmth and comfort`;

  console.log(`Generated enhanced prompt (${prompt.length} characters) with themes:`, themes);
  return prompt;
}

// Enhanced error handling and validation
function validateRequest(body: any): { isValid: boolean; error?: string } {
  if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
    return { isValid: false, error: 'Title is required and must be a non-empty string' };
  }
  
  if (body.title.length > 200) {
    return { isValid: false, error: 'Title is too long (max 200 characters)' };
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

    const { title, topic, category, content } = body;

    console.log(`Generating enhanced image for: ${title} (Category: ${category || 'unknown'})`);

    // Generate enhanced prompt with comprehensive analysis
    const imagePrompt = generateOptimizedPrompt(title, category || '', content || '');

    console.log('Calling OpenAI with enhanced prompt and improved error handling...');

    // Enhanced OpenAI API call with better error handling
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'natural'
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${errorText}`);
      
      // Enhanced error classification
      let userFriendlyError = 'Fehler bei der Bildgenerierung.';
      if (response.status === 429) {
        userFriendlyError = 'Zu viele Anfragen. Bitte versuchen Sie es in einem Moment erneut.';
      } else if (response.status === 400) {
        userFriendlyError = 'Ungültige Anfrage. Bitte überprüfen Sie den Titel.';
      } else if (response.status === 401) {
        userFriendlyError = 'Authentifizierungsfehler. API-Schlüssel überprüfen.';
      } else if (response.status >= 500) {
        userFriendlyError = 'Server-Fehler. Bitte versuchen Sie es später erneut.';
      }
      
      throw new Error(`${userFriendlyError} (Status: ${response.status})`);
    }

    const data = await response.json();
    
    // Enhanced response validation
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.error('Invalid OpenAI response structure:', data);
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

    console.log('Successfully generated enhanced, optimized blog image');

    return new Response(
      JSON.stringify({ imageUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

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
        errorMessage = 'Fehler beim Zugriff auf den Bildgenerator.';
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
