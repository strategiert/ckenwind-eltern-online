
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    console.log(`Generating image for blog title: ${title}`);

    // First, analyze the content to extract specific visual elements
    let contentAnalysis = '';
    if (content) {
      console.log('Analyzing blog content for visual elements...');
      
      const analysisPrompt = `Analyze this German parenting blog article and extract 2-3 specific visual elements or scenarios that could be illustrated in an image. Focus on concrete situations, emotions, or activities mentioned in the article.

Article content:
${content}

Return only a brief description of visual elements (max 100 words) that would represent the main scenarios or situations discussed in the article.`;

      const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: analysisPrompt }
          ],
          temperature: 0.3,
          max_tokens: 200,
        }),
      });

      if (analysisResponse.ok) {
        const analysisData = await analysisResponse.json();
        contentAnalysis = analysisData.choices[0].message.content;
        console.log('Content analysis result:', contentAnalysis);
      }
    }

    // Create a detailed image prompt based on content analysis
    const baseImagePrompt = `Create a warm, professional illustration for a German parenting blog article titled "${title}". The image should be:
    - Family-friendly and supportive in tone
    - Related to ${category || 'parenting and family life'}
    - Featuring soft, calming colors (purples, blues, warm tones)
    - Modern, clean illustration style
    - Suitable for a mental health and parenting support website
    - No text overlays
    - Horizontal layout (16:9 aspect ratio)`;

    const specificPrompt = contentAnalysis 
      ? `${baseImagePrompt}
    
    Specific visual elements to include based on article content:
    ${contentAnalysis}
    
    Make the illustration represent these specific scenarios while maintaining a professional, supportive appearance.`
      : `${baseImagePrompt}
    
    Topic context: ${topic || title}
    Show a realistic family situation that relates to the challenges and solutions discussed in parenting and mental health support.`;

    console.log('Using image prompt:', specificPrompt);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: specificPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'natural'
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log('Successfully generated content-specific blog title image');

    return new Response(
      JSON.stringify({ imageUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-blog-image function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
