
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Local content analysis functions
function analyzeEmotionalTone(content: string, title: string): string {
  const stressKeywords = ['stress', 'burnout', 'erschöpfung', 'überforderung', 'müdigkeit'];
  const hopeKeywords = ['hilfe', 'unterstützung', 'lösungen', 'strategien', 'wege'];
  const urgencyKeywords = ['sofort', 'notfall', 'dringend', 'schnell'];
  const calmKeywords = ['ruhe', 'entspannung', 'gelassenheit', 'balance'];

  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();
  const combinedText = lowerContent + ' ' + lowerTitle;

  if (urgencyKeywords.some(keyword => combinedText.includes(keyword))) {
    return 'urgent and supportive';
  }
  if (stressKeywords.some(keyword => combinedText.includes(keyword))) {
    return 'calming and reassuring';
  }
  if (hopeKeywords.some(keyword => combinedText.includes(keyword))) {
    return 'hopeful and encouraging';
  }
  if (calmKeywords.some(keyword => combinedText.includes(keyword))) {
    return 'peaceful and serene';
  }
  
  return 'warm and supportive';
}

function extractKeyScenarios(content: string): string[] {
  const scenarios: string[] = [];
  const lines = content.split('\n');
  
  // Look for practical examples or scenarios in the content
  const scenarioPatterns = [
    /beispiel:/i,
    /situation:/i,
    /wenn.*dann/i,
    /alltag/i,
    /familie/i,
    /kinder/i,
    /eltern/i
  ];
  
  for (const line of lines) {
    if (scenarioPatterns.some(pattern => pattern.test(line)) && line.length > 20 && line.length < 150) {
      scenarios.push(line.trim().replace(/^#+\s*/, '').substring(0, 100));
    }
  }
  
  return scenarios.slice(0, 3); // Max 3 scenarios
}

function identifyVisualMetaphors(title: string, category: string): string[] {
  const metaphors: string[] = [];
  
  // Category-based visual metaphors
  const categoryMetaphors: Record<string, string[]> = {
    'burnout-praevention': ['warm light breaking through clouds', 'person finding balance on a scale', 'gentle sunrise over mountains'],
    'adhs-hilfe': ['organized colorful blocks', 'clear path through forest', 'structured rainbow'],
    'esstoerungen': ['healthy family meal scene', 'balanced plate of food', 'kitchen with warm lighting'],
    'eltern-tipps': ['parent and child connecting', 'helpful hands reaching out', 'family puzzle pieces'],
    'familienalltag': ['cozy family scene', 'home environment', 'daily life moments'],
    'selbstfuersorge': ['person in peaceful moment', 'self-care ritual', 'quiet reflection space']
  };
  
  // Title-based metaphors
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('burnout')) {
    metaphors.push('phoenix rising from ashes', 'candle being relit');
  }
  if (lowerTitle.includes('stress')) {
    metaphors.push('storm clouds clearing', 'calm after storm');
  }
  if (lowerTitle.includes('hilfe')) {
    metaphors.push('helping hands', 'bridge over troubled water');
  }
  
  return [...metaphors, ...(categoryMetaphors[category] || [])].slice(0, 2);
}

function generateOptimizedPrompt(title: string, category: string, content: string): string {
  console.log('Starting local content analysis...');
  
  // Perform local analysis
  const emotionalTone = analyzeEmotionalTone(content, title);
  const keyScenarios = extractKeyScenarios(content);
  const visualMetaphors = identifyVisualMetaphors(title, category);
  
  console.log(`Analysis complete - Tone: ${emotionalTone}, Scenarios: ${keyScenarios.length}, Metaphors: ${visualMetaphors.length}`);
  
  // Category-specific styles
  const categoryStyles: Record<string, string> = {
    'eltern-tipps': 'practical family guidance scene',
    'burnout-praevention': 'calming, restorative atmosphere with soft lighting',
    'adhs-hilfe': 'organized, structured environment with clear visual elements',
    'esstoerungen': 'healthy, balanced meal setting with warm family atmosphere',
    'familienalltag': 'realistic family life moments with warm connections',
    'selbstfuersorge': 'peaceful self-care moment with gentle, nurturing elements'
  };

  const categoryStyle = categoryStyles[category] || 'supportive family atmosphere';
  
  // Build optimized prompt
  let optimizedPrompt = `Create a professional, warm illustration for a German parenting blog article titled "${title}".

**Emotional Tone:** ${emotionalTone}
**Visual Style:** ${categoryStyle}
**Key Elements:** ${keyScenarios.length > 0 ? keyScenarios.join(', ') : 'supportive family dynamics'}`;

  if (visualMetaphors.length > 0) {
    optimizedPrompt += `\n**Visual Metaphors:** ${visualMetaphors.join(', ')}`;
  }

  optimizedPrompt += `

**Technical Requirements:**
- Modern, minimalist illustration style (not photorealistic)
- Warm, calming color palette with soft pastels and gentle accents
- Portrait orientation (9:16 ratio) optimized for blog headers
- No text overlays or written words
- European/German family representation
- Professional yet approachable aesthetic

**Mood:** Create an image that conveys hope, support, and understanding for parents facing challenges. The illustration should be calming, professional, and emotionally resonant without being overwhelming.`;

  return optimizedPrompt;
}

function createFallbackPrompt(title: string, category: string): string {
  console.log('Using fallback prompt generation...');
  
  const fallbackStyles: Record<string, string> = {
    'eltern-tipps': 'caring parent with child in warm home setting',
    'burnout-praevention': 'peaceful person in calming environment with soft lighting',
    'adhs-hilfe': 'organized family scene with clear, structured elements',
    'esstoerungen': 'healthy family mealtime with positive atmosphere',
    'familienalltag': 'happy family moment in cozy home',
    'selbstfuersorge': 'person in peaceful self-care moment'
  };

  return `Professional illustration for German parenting blog: "${title}". 
Style: ${fallbackStyles[category] || 'supportive family scene'}. 
Warm colors, modern minimalist style, portrait orientation, no text, European family, calming and hopeful mood.`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, topic, category, content } = await req.json();

    if (!title) {
      return new Response(
        JSON.stringify({ error: 'Title is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Generating optimized image for: ${title} (Category: ${category})`);

    // Generate optimized prompt using local analysis
    let imagePrompt: string;
    
    try {
      if (content && content.length > 100) {
        imagePrompt = generateOptimizedPrompt(title, category || '', content);
        console.log('Generated optimized prompt based on content analysis');
      } else {
        imagePrompt = createFallbackPrompt(title, category || '');
        console.log('Used fallback prompt due to insufficient content');
      }
    } catch (analysisError) {
      console.error('Error during content analysis:', analysisError);
      imagePrompt = createFallbackPrompt(title, category || '');
      console.log('Switched to fallback prompt due to analysis error');
    }

    // Log prompt length for monitoring
    console.log(`Final prompt length: ${imagePrompt.length} characters`);

    // Generate image with OpenAI
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
      
      // Enhanced error handling with specific messages
      if (response.status === 400) {
        console.error('Bad request - likely prompt issue. Prompt length:', imagePrompt.length);
        throw new Error(`Image generation failed: Invalid prompt or request format`);
      } else if (response.status === 429) {
        throw new Error(`Image generation failed: Rate limit exceeded`);
      } else {
        throw new Error(`Image generation failed: OpenAI API error ${response.status}`);
      }
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log('Successfully generated optimized blog image using local analysis');

    return new Response(
      JSON.stringify({ imageUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-blog-image function:', error);
    
    // Provide specific error messages for different failure types
    let errorMessage = 'Ein unerwarteter Fehler bei der Bildgenerierung ist aufgetreten.';
    
    if (error.message.includes('Invalid prompt')) {
      errorMessage = 'Fehler bei der Prompt-Generierung. Bitte versuchen Sie es mit einem anderen Titel.';
    } else if (error.message.includes('Rate limit')) {
      errorMessage = 'Zu viele Anfragen. Bitte warten Sie einen Moment und versuchen Sie es erneut.';
    } else if (error.message.includes('OpenAI API error')) {
      errorMessage = 'Fehler beim OpenAI-Service. Bitte prüfen Sie Ihre API-Konfiguration.';
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
