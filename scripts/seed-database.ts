/**
 * Database Seeding Script
 *
 * Dieses Script migriert die statischen Blog- und Glossar-Daten in die Supabase-Datenbank.
 *
 * Ausführung:
 * npx tsx scripts/seed-database.ts
 *
 * Voraussetzungen:
 * - .env Datei mit VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY
 * - npm install @supabase/supabase-js dotenv tsx
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================
// BLOG DATA
// ============================================================

const blogPostsData = [
  {
    title: "7 Anzeichen für elterliches Burnout und was Sie dagegen tun können",
    slug: "anzeichen-elterliches-burnout",
    excerpt: "Erfahren Sie, wie Sie die ersten Warnzeichen erkennen und gezielt gegensteuern können.",
    category: "burnout",
    category_label: "Eltern-Burnout",
    tags: ["Burnout", "Selbstfürsorge", "Stressmanagement", "Elterngesundheit"],
    author: "Janike Arent",
    image_url: "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=1964",
    featured: true,
    published: true,
    published_at: "2023-04-15T08:00:00+02:00",
    reading_time: 15,
    meta_title: "7 Anzeichen für elterliches Burnout | Rückenwind Eltern",
    meta_description: "Eltern-Burnout frühzeitig erkennen und behandeln: Die 7 wichtigsten Warnsignale und effektive Gegenmaßnahmen für mehr Energie im Familienalltag.",
    content: `<h2 id="einführung">Einführung: Wenn Eltern am Limit sind</h2>
<p>Als Mutter von drei Kindern und therapeutische Begleiterin unzähliger Familien weiß ich: Elternsein ist einer der anspruchsvollsten Jobs der Welt – ohne Ausbildung, ohne Urlaub und mit 24/7-Bereitschaft.</p>

<h2 id="warnzeichen">Die 7 Warnzeichen für elterliches Burnout</h2>
<ol>
<li><strong>Chronische Erschöpfung</strong> - Sie könnten 12 Stunden schlafen und fühlen sich trotzdem müde.</li>
<li><strong>Emotionale Distanz</strong> - Emotionale Abstumpfung gegenüber den eigenen Kindern.</li>
<li><strong>Reizbarkeit</strong> - Niedrige Frustrationstoleranz bei Kleinigkeiten.</li>
<li><strong>Versagensgefühle</strong> - Ständiger Vergleich mit anderen Eltern.</li>
<li><strong>Fluchtfantasien</strong> - Der Wunsch, einfach wegzufahren.</li>
<li><strong>Vernachlässigung der Selbstfürsorge</strong> - Keine Energie für eigene Bedürfnisse.</li>
<li><strong>Körperliche Symptome</strong> - Kopfschmerzen, Magenbeschwerden, Muskelverspannungen.</li>
</ol>

<h2 id="strategien">Erste-Hilfe-Strategien</h2>
<p>Anerkennen Sie Ihren Zustand, implementieren Sie minimale Selbstfürsorge und organisieren Sie Unterstützung.</p>`
  },
  {
    title: "Wie Sie ADHS bei Kindern positiv begleiten können",
    slug: "adhs-bei-kindern-begleiten",
    excerpt: "Praktische Strategien für den Alltag mit ADHS-Kindern, die wirklich funktionieren.",
    category: "adhs",
    category_label: "ADHS",
    tags: ["ADHS", "Kindesentwicklung", "Aufmerksamkeit", "Hyperaktivität"],
    author: "Janike Arent",
    image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1972",
    featured: false,
    published: true,
    published_at: "2023-03-02T09:30:00+02:00",
    reading_time: 12,
    meta_title: "ADHS bei Kindern positiv begleiten | Rückenwind Eltern",
    meta_description: "Entdecken Sie bewährte Strategien für Eltern von Kindern mit ADHS. Positiver Umgang mit Hyperaktivität und Aufmerksamkeitsproblemen.",
    content: `<h2 id="verstehen">ADHS verstehen: Mehr als nur Zappelphilipp</h2>
<p>ADHS ist eine der häufigsten neurobiologischen Entwicklungsstörungen im Kindesalter. In Deutschland sind etwa 5% aller Kinder betroffen.</p>

<h2 id="staerken">Die Stärken von ADHS-Kindern</h2>
<ul>
<li>Hoher Energielevel - Dynamisch und ausdauernd</li>
<li>Hyperfokus - Außergewöhnliche Konzentration bei Interessen</li>
<li>Kreativität - Originelles, "Out-of-the-box" Denken</li>
<li>Spontaneität - Beherzt und mutig</li>
</ul>

<h2 id="strategien">Alltagsstrategien für zu Hause</h2>
<p>Struktur schaffen, Bewegungsmöglichkeiten integrieren, ablenkungsarme Umgebung und positive Verstärkung.</p>`
  },
  {
    title: "Essstörungen frühzeitig erkennen: Ein Leitfaden für Eltern",
    slug: "essstoerungen-fruehzeitig-erkennen",
    excerpt: "Was Sie als Eltern über die Anzeichen und Prävention von Essstörungen wissen sollten.",
    category: "essstoerungen",
    category_label: "Essstörungen",
    tags: ["Essstörungen", "Anorexie", "Bulimie", "Prävention"],
    author: "Janike Arent",
    image_url: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070",
    featured: false,
    published: true,
    published_at: "2023-02-18T10:15:00+01:00",
    reading_time: 18,
    meta_title: "Essstörungen bei Kindern erkennen | Rückenwind Eltern",
    meta_description: "Wie Eltern Essstörungen bei Kindern frühzeitig erkennen können. Warnzeichen, Prävention und Hilfe.",
    content: `<h2>Warum Essstörungen immer früher beginnen</h2>
<p>Essstörungen manifestieren sich bei Kindern und Jugendlichen immer früher. In Deutschland leiden etwa 5-6% der Kinder an einer klinisch relevanten Essstörung.</p>

<h2>Die verschiedenen Formen</h2>
<ul>
<li>Anorexia Nervosa - Selbst herbeigeführter Gewichtsverlust</li>
<li>Bulimia Nervosa - Essanfälle mit kompensatorischen Maßnahmen</li>
<li>Binge-Eating - Essanfälle ohne Kompensation</li>
</ul>

<h2>Frühwarnzeichen</h2>
<p>Verhaltensänderungen rund ums Essen, körperliche Anzeichen wie Gewichtsveränderungen, und psychosoziale Veränderungen.</p>`
  }
];

// ============================================================
// GLOSSARY DATA
// ============================================================

const glossaryTermsData = [
  {
    term: "Achtsamkeit",
    slug: "achtsamkeit",
    definition: "Bewusste Wahrnehmung des gegenwärtigen Moments ohne Bewertung.",
    teaser: "Achtsamkeit beschreibt die bewusste und wertfreie Wahrnehmung des gegenwärtigen Moments.",
    alias: "Mindfulness",
    tags: ["Konzept", "Therapie", "Alltag", "Burnout", "ADHS"],
    is_published: true,
    sections: [
      {
        title: "Was ist Achtsamkeit?",
        content: "Achtsamkeit bezeichnet die Fähigkeit, bewusst im gegenwärtigen Moment zu verweilen und Erfahrungen, Gedanken und Gefühle ohne Bewertung wahrzunehmen. Diese aus buddhistischen Meditationspraktiken stammende Haltung wurde von Jon Kabat-Zinn in den westlichen Kontext übertragen.",
        section_type: "content",
        sort_order: 0
      },
      {
        title: "Achtsamkeit im therapeutischen Kontext",
        content: "In der Psychotherapie hat sich Achtsamkeit als wirksames Element etabliert und ist Kernbestandteil verschiedener therapeutischer Ansätze wie der Achtsamkeitsbasierten Stressreduktion (MBSR) und der Akzeptanz- und Commitment-Therapie (ACT).",
        section_type: "content",
        sort_order: 1
      },
      {
        title: "Der achtsame Beobachter",
        content: "Achtsamkeit kann man sich wie einen wohlwollenden, neutralen Beobachter vorstellen, der auf einem Hügel sitzt und das geschäftige Treiben (unsere Gedanken und Gefühle) in einem Tal beobachtet.",
        section_type: "literary_device",
        sort_order: 2
      }
    ],
    references: [
      "Kabat-Zinn, J. (2013). Gesund durch Meditation. O.W. Barth.",
      "Segal, Z. V. et al. (2008). Die Achtsamkeitsbasierte Kognitive Therapie der Depression."
    ]
  },
  {
    term: "ADHS",
    slug: "adhs",
    definition: "Neurobiologische Störung, gekennzeichnet durch Probleme mit Aufmerksamkeit, Impulsivität und/oder Hyperaktivität.",
    teaser: "ADHS ist eine neurobiologische Entwicklungsstörung, die sich durch Aufmerksamkeitsschwierigkeiten, Impulsivität und/oder motorische Unruhe äußert.",
    alias: "Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung",
    tags: ["Diagnose", "ADHS"],
    is_published: true,
    sections: [
      {
        title: "Was ist ADHS?",
        content: "Die Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS) ist eine der häufigsten psychiatrischen Diagnosen im Kindes- und Jugendalter. Sie ist durch ein durchgehendes Muster von Unaufmerksamkeit und/oder Hyperaktivität-Impulsivität gekennzeichnet.",
        section_type: "content",
        sort_order: 0
      },
      {
        title: "Erscheinungsformen und Diagnose",
        content: "Nach DSM-5 werden drei Erscheinungsformen unterschieden: der vorwiegend unaufmerksame Typ, der vorwiegend hyperaktiv-impulsive Typ und der kombinierte Typ.",
        section_type: "content",
        sort_order: 1
      },
      {
        title: "Das Ferrari-Gehirn mit Fahrradbremsen",
        content: "ADHS kann man sich wie einen Ferrari mit Fahrradbremsen vorstellen. Das Gehirn ist leistungsstark, hat aber Schwierigkeiten, dieses Potenzial zu kontrollieren.",
        section_type: "literary_device",
        sort_order: 2
      }
    ],
    references: [
      "Barkley, R. A. (2015). Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment.",
      "AWMF S3-Leitlinie ADHS bei Kindern, Jugendlichen und Erwachsenen."
    ]
  },
  {
    term: "ACT",
    slug: "act",
    definition: "Verhaltenstherapeutischer Ansatz, der Akzeptanz von Unvermeidbarem und werteorientiertes Handeln fördert.",
    teaser: "Die Akzeptanz- und Commitment-Therapie (ACT) unterstützt Menschen dabei, unangenehme Gedanken zu akzeptieren und wertorientiert zu handeln.",
    alias: "Akzeptanz- und Commitment-Therapie",
    tags: ["Therapie", "Burnout", "ADHS"],
    is_published: true,
    sections: [
      {
        title: "Grundlagen der ACT",
        content: "Die Akzeptanz- und Commitment-Therapie wurde von Steven Hayes entwickelt und gehört zur dritten Welle der Verhaltenstherapie. Sie fördert die psychologische Flexibilität.",
        section_type: "content",
        sort_order: 0
      },
      {
        title: "Die sechs Kernprozesse",
        content: "ACT basiert auf: 1) Akzeptanz, 2) Kognitive Defusion, 3) Präsenz im gegenwärtigen Moment, 4) Selbst als Kontext, 5) Werte, 6) Engagiertes Handeln.",
        section_type: "content",
        sort_order: 1
      },
      {
        title: "Der Fahrgast im Bus",
        content: "Stellen Sie sich vor, Sie sind ein Busfahrer, und schwierige Gedanken sind wie unangenehme Fahrgäste. Sie entscheiden trotzdem, wohin Sie fahren.",
        section_type: "literary_device",
        sort_order: 2
      }
    ],
    references: [
      "Hayes, S. C. et al. (2014). Akzeptanz- und Commitment-Therapie. Junfermann.",
      "Harris, R. (2009). ACT made simple. New Harbinger Publications."
    ]
  },
  {
    term: "Burnout",
    slug: "burnout",
    definition: "Zustand emotionaler, körperlicher und geistiger Erschöpfung durch chronische Überlastung.",
    teaser: "Burnout ist ein Zustand totaler Erschöpfung, der durch langanhaltende Überforderung entsteht.",
    alias: "Erschöpfungssyndrom",
    tags: ["Diagnose", "Burnout", "Alltag"],
    is_published: true,
    sections: [
      {
        title: "Was ist Burnout?",
        content: "Burnout beschreibt einen Zustand tiefgreifender emotionaler, körperlicher und geistiger Erschöpfung, der durch anhaltende Überforderung entsteht. Im Kontext der Elternschaft spricht man auch von Eltern-Burnout.",
        section_type: "content",
        sort_order: 0
      },
      {
        title: "Symptome erkennen",
        content: "Typische Symptome sind chronische Müdigkeit, emotionale Distanz, Zynismus, reduzierte Leistungsfähigkeit und körperliche Beschwerden wie Schlafstörungen oder Kopfschmerzen.",
        section_type: "content",
        sort_order: 1
      }
    ],
    references: [
      "Maslach, C. & Leiter, M. P. (2016). Burnout: A Complete Guide for Individuals & Organizations.",
      "Roskam, I. et al. (2018). Parental Burnout Around the Globe."
    ]
  },
  {
    term: "Essstörung",
    slug: "essstoerung",
    definition: "Psychische Erkrankung mit gestörtem Essverhalten und verzerrter Körperwahrnehmung.",
    teaser: "Essstörungen sind komplexe psychische Erkrankungen, die sich im Essverhalten manifestieren.",
    alias: null,
    tags: ["Diagnose", "Essstörung"],
    is_published: true,
    sections: [
      {
        title: "Formen von Essstörungen",
        content: "Zu den häufigsten Formen gehören Anorexia Nervosa (Magersucht), Bulimia Nervosa (Bulimie) und die Binge-Eating-Störung. Jede Form hat eigene Charakteristika.",
        section_type: "content",
        sort_order: 0
      },
      {
        title: "Warnzeichen erkennen",
        content: "Frühwarnzeichen können drastische Gewichtsveränderungen, Essensrituale, heimliches Essen, übermäßige Beschäftigung mit Kalorien und Körperbild sein.",
        section_type: "content",
        sort_order: 1
      }
    ],
    references: [
      "Herpertz, S. et al. (2019). S3-Leitlinie Diagnostik und Behandlung der Essstörungen.",
      "Treasure, J. et al. (2020). Eating Disorders. The Lancet."
    ]
  }
];

// ============================================================
// SEEDING FUNCTIONS
// ============================================================

async function seedBlogPosts() {
  console.log('Seeding blog posts...');

  for (const post of blogPostsData) {
    const { data, error } = await supabase
      .from('blog_posts')
      .upsert(post, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`Error inserting blog post "${post.title}":`, error.message);
    } else {
      console.log(`✓ Blog post: ${post.title}`);
    }
  }

  console.log(`Finished seeding ${blogPostsData.length} blog posts.\n`);
}

async function seedGlossaryTerms() {
  console.log('Seeding glossary terms...');

  for (const termData of glossaryTermsData) {
    const { sections, references, ...term } = termData;

    // Insert main term
    const { data: insertedTerm, error: termError } = await supabase
      .from('glossary_terms')
      .upsert({
        term: term.term,
        slug: term.slug,
        definition: term.definition,
        teaser: term.teaser,
        alias: term.alias,
        tags: term.tags,
        is_published: term.is_published
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (termError) {
      console.error(`Error inserting term "${term.term}":`, termError.message);
      continue;
    }

    console.log(`✓ Term: ${term.term}`);

    // Insert sections
    if (sections && sections.length > 0) {
      // First delete existing sections for this term
      await supabase
        .from('glossary_sections')
        .delete()
        .eq('term_id', insertedTerm.id);

      for (const section of sections) {
        const { error: sectionError } = await supabase
          .from('glossary_sections')
          .insert({
            term_id: insertedTerm.id,
            title: section.title,
            content: section.content,
            section_type: section.section_type,
            sort_order: section.sort_order
          });

        if (sectionError) {
          console.error(`  Error inserting section "${section.title}":`, sectionError.message);
        }
      }
    }

    // Insert references
    if (references && references.length > 0) {
      // First delete existing references for this term
      await supabase
        .from('glossary_references')
        .delete()
        .eq('term_id', insertedTerm.id);

      for (let i = 0; i < references.length; i++) {
        const { error: refError } = await supabase
          .from('glossary_references')
          .insert({
            term_id: insertedTerm.id,
            reference_text: references[i],
            sort_order: i
          });

        if (refError) {
          console.error(`  Error inserting reference:`, refError.message);
        }
      }
    }
  }

  console.log(`Finished seeding ${glossaryTermsData.length} glossary terms.\n`);
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('='.repeat(50));
  console.log('DATABASE SEEDING SCRIPT');
  console.log('='.repeat(50));
  console.log(`Supabase URL: ${supabaseUrl}\n`);

  try {
    await seedBlogPosts();
    await seedGlossaryTerms();

    console.log('='.repeat(50));
    console.log('SEEDING COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(50));
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

main();
