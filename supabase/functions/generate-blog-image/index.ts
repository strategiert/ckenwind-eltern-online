
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simplified content analysis for better performance
function analyzeContentTone(content: string, title: string): string {
  const combinedText = (content + ' ' + title).toLowerCase();
  
  if (combinedText.includes('stress') || combinedText.includes('burnout')) {
    return 'calming and supportive';
  }
  if (combinedText.includes('hilfe') || combinedText.includes('unterstützung')) {
    return 'hopeful and encouraging';
  }
  if (combinedText.includes('familie') || combinedText.includes('kinder')) {
    return 'warm family atmosphere';
  }
  
  return 'peaceful and nurturing';
}

function getCategoryStyle(category: string): string {
  const styles: Record<string, string> = {
    'eltern-tipps': 'warm family scene with caring parent and child',
    'burnout-praevention': 'peaceful restoration scene with soft lighting',
    'adhs-hilfe': 'organized, structured family environment',
    'esstoerungen': 'healthy balanced lifestyle scene',
    'familienalltag': 'cozy family moments',
    'selbstfuersorge': 'peaceful self-care moment'
  };
  
  return styles[category] || 'supportive family scene';
}

function generateOptimizedPrompt(title: string, category: string, content: string): string {
  console.log('Generating optimized prompt for faster processing...');
  
  const tone = analyzeContentTone(content, title);
  const categoryStyle = getCategoryStyle(category);
  
  // Simplified prompt to stay under token limits
  const prompt = `Professional illustration for German parenting blog: "${title.substring(0, 50)}..."

Style: ${categoryStyle}
Mood: ${tone}
Visual: Modern minimalist illustration, warm pastel colors, portrait orientation
European family representation, no text, calming atmosphere
Professional yet approachable aesthetic for parents facing challenges`;

  console.log(`Generated prompt length: ${prompt.length} characters`);
  return prompt;
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

    console.log(`Generating image for: ${title} (Category: ${category})`);

    // Generate simplified prompt
    const imagePrompt = generateOptimizedPrompt(title, category || '', content || '');

    console.log('Calling OpenAI with optimized prompt...');

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
      
      throw new Error(`Image generation failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log('Successfully generated optimized blog image');

    return new Response(
      JSON.stringify({ imageUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-blog-image function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Fehler bei der Bildgenerierung. Bitte versuchen Sie es erneut.',
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
