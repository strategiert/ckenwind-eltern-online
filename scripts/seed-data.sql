-- ============================================================
-- BLOG POSTS DATA
-- ============================================================

INSERT INTO public.blog_posts (title, slug, excerpt, category, category_label, tags, author, image_url, featured, published, published_at, reading_time, meta_title, meta_description, content)
VALUES
(
  '7 Anzeichen für elterliches Burnout und was Sie dagegen tun können',
  'anzeichen-elterliches-burnout',
  'Erfahren Sie, wie Sie die ersten Warnzeichen erkennen und gezielt gegensteuern können.',
  'burnout',
  'Eltern-Burnout',
  ARRAY['Burnout', 'Selbstfürsorge', 'Stressmanagement', 'Elterngesundheit'],
  'Janike Arent',
  'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=1964',
  true,
  true,
  '2023-04-15T08:00:00+02:00',
  15,
  '7 Anzeichen für elterliches Burnout | Rückenwind Eltern',
  'Eltern-Burnout frühzeitig erkennen und behandeln: Die 7 wichtigsten Warnsignale und effektive Gegenmaßnahmen für mehr Energie im Familienalltag.',
  '<h2 id="einführung">Einführung: Wenn Eltern am Limit sind</h2>
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
<p>Anerkennen Sie Ihren Zustand, implementieren Sie minimale Selbstfürsorge und organisieren Sie Unterstützung.</p>'
),
(
  'Wie Sie ADHS bei Kindern positiv begleiten können',
  'adhs-bei-kindern-begleiten',
  'Praktische Strategien für den Alltag mit ADHS-Kindern, die wirklich funktionieren.',
  'adhs',
  'ADHS',
  ARRAY['ADHS', 'Kindesentwicklung', 'Aufmerksamkeit', 'Hyperaktivität'],
  'Janike Arent',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1972',
  false,
  true,
  '2023-03-02T09:30:00+02:00',
  12,
  'ADHS bei Kindern positiv begleiten | Rückenwind Eltern',
  'Entdecken Sie bewährte Strategien für Eltern von Kindern mit ADHS. Positiver Umgang mit Hyperaktivität und Aufmerksamkeitsproblemen.',
  '<h2 id="verstehen">ADHS verstehen: Mehr als nur Zappelphilipp</h2>
<p>ADHS ist eine der häufigsten neurobiologischen Entwicklungsstörungen im Kindesalter. In Deutschland sind etwa 5% aller Kinder betroffen.</p>

<h2 id="staerken">Die Stärken von ADHS-Kindern</h2>
<ul>
<li>Hoher Energielevel - Dynamisch und ausdauernd</li>
<li>Hyperfokus - Außergewöhnliche Konzentration bei Interessen</li>
<li>Kreativität - Originelles, "Out-of-the-box" Denken</li>
<li>Spontaneität - Beherzt und mutig</li>
</ul>

<h2 id="strategien">Alltagsstrategien für zu Hause</h2>
<p>Struktur schaffen, Bewegungsmöglichkeiten integrieren, ablenkungsarme Umgebung und positive Verstärkung.</p>'
),
(
  'Essstörungen frühzeitig erkennen: Ein Leitfaden für Eltern',
  'essstoerungen-fruehzeitig-erkennen',
  'Was Sie als Eltern über die Anzeichen und Prävention von Essstörungen wissen sollten.',
  'essstoerungen',
  'Essstörungen',
  ARRAY['Essstörungen', 'Anorexie', 'Bulimie', 'Prävention'],
  'Janike Arent',
  'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070',
  false,
  true,
  '2023-02-18T10:15:00+01:00',
  18,
  'Essstörungen bei Kindern erkennen | Rückenwind Eltern',
  'Wie Eltern Essstörungen bei Kindern frühzeitig erkennen können. Warnzeichen, Prävention und Hilfe.',
  '<h2>Warum Essstörungen immer früher beginnen</h2>
<p>Essstörungen manifestieren sich bei Kindern und Jugendlichen immer früher. In Deutschland leiden etwa 5-6% der Kinder an einer klinisch relevanten Essstörung.</p>

<h2>Die verschiedenen Formen</h2>
<ul>
<li>Anorexia Nervosa - Selbst herbeigeführter Gewichtsverlust</li>
<li>Bulimia Nervosa - Essanfälle mit kompensatorischen Maßnahmen</li>
<li>Binge-Eating - Essanfälle ohne Kompensation</li>
</ul>

<h2>Frühwarnzeichen</h2>
<p>Verhaltensänderungen rund ums Essen, körperliche Anzeichen wie Gewichtsveränderungen, und psychosoziale Veränderungen.</p>'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  category = EXCLUDED.category,
  category_label = EXCLUDED.category_label,
  tags = EXCLUDED.tags,
  author = EXCLUDED.author,
  image_url = EXCLUDED.image_url,
  featured = EXCLUDED.featured,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  reading_time = EXCLUDED.reading_time,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  content = EXCLUDED.content,
  updated_at = now();

-- ============================================================
-- GLOSSARY TERMS DATA
-- ============================================================

-- Achtsamkeit
INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Achtsamkeit',
  'achtsamkeit',
  'Bewusste Wahrnehmung des gegenwärtigen Moments ohne Bewertung.',
  'Achtsamkeit beschreibt die bewusste und wertfreie Wahrnehmung des gegenwärtigen Moments.',
  'Mindfulness',
  ARRAY['Konzept', 'Therapie', 'Alltag', 'Burnout', 'ADHS'],
  true
)
ON CONFLICT (slug) DO UPDATE SET
  term = EXCLUDED.term,
  definition = EXCLUDED.definition,
  teaser = EXCLUDED.teaser,
  alias = EXCLUDED.alias,
  tags = EXCLUDED.tags,
  is_published = EXCLUDED.is_published,
  updated_at = now();

-- ADHS
INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'ADHS',
  'adhs',
  'Neurobiologische Störung, gekennzeichnet durch Probleme mit Aufmerksamkeit, Impulsivität und/oder Hyperaktivität.',
  'ADHS ist eine neurobiologische Entwicklungsstörung, die sich durch Aufmerksamkeitsschwierigkeiten, Impulsivität und/oder motorische Unruhe äußert.',
  'Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung',
  ARRAY['Diagnose', 'ADHS'],
  true
)
ON CONFLICT (slug) DO UPDATE SET
  term = EXCLUDED.term,
  definition = EXCLUDED.definition,
  teaser = EXCLUDED.teaser,
  alias = EXCLUDED.alias,
  tags = EXCLUDED.tags,
  is_published = EXCLUDED.is_published,
  updated_at = now();

-- ACT
INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'ACT',
  'act',
  'Verhaltenstherapeutischer Ansatz, der Akzeptanz von Unvermeidbarem und werteorientiertes Handeln fördert.',
  'Die Akzeptanz- und Commitment-Therapie (ACT) unterstützt Menschen dabei, unangenehme Gedanken zu akzeptieren und wertorientiert zu handeln.',
  'Akzeptanz- und Commitment-Therapie',
  ARRAY['Therapie', 'Burnout', 'ADHS'],
  true
)
ON CONFLICT (slug) DO UPDATE SET
  term = EXCLUDED.term,
  definition = EXCLUDED.definition,
  teaser = EXCLUDED.teaser,
  alias = EXCLUDED.alias,
  tags = EXCLUDED.tags,
  is_published = EXCLUDED.is_published,
  updated_at = now();

-- Burnout
INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Burnout',
  'burnout',
  'Zustand emotionaler, körperlicher und geistiger Erschöpfung durch chronische Überlastung.',
  'Burnout ist ein Zustand totaler Erschöpfung, der durch langanhaltende Überforderung entsteht.',
  'Erschöpfungssyndrom',
  ARRAY['Diagnose', 'Burnout', 'Alltag'],
  true
)
ON CONFLICT (slug) DO UPDATE SET
  term = EXCLUDED.term,
  definition = EXCLUDED.definition,
  teaser = EXCLUDED.teaser,
  alias = EXCLUDED.alias,
  tags = EXCLUDED.tags,
  is_published = EXCLUDED.is_published,
  updated_at = now();

-- Essstörung
INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Essstörung',
  'essstoerung',
  'Psychische Erkrankung mit gestörtem Essverhalten und verzerrter Körperwahrnehmung.',
  'Essstörungen sind komplexe psychische Erkrankungen, die sich im Essverhalten manifestieren.',
  NULL,
  ARRAY['Diagnose', 'Essstörung'],
  true
)
ON CONFLICT (slug) DO UPDATE SET
  term = EXCLUDED.term,
  definition = EXCLUDED.definition,
  teaser = EXCLUDED.teaser,
  alias = EXCLUDED.alias,
  tags = EXCLUDED.tags,
  is_published = EXCLUDED.is_published,
  updated_at = now();

-- ============================================================
-- GLOSSARY SECTIONS
-- ============================================================

-- Delete existing sections and re-insert
DELETE FROM public.glossary_sections WHERE term_id IN (SELECT id FROM public.glossary_terms);

-- Achtsamkeit Sections
INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Was ist Achtsamkeit?', 'Achtsamkeit bezeichnet die Fähigkeit, bewusst im gegenwärtigen Moment zu verweilen und Erfahrungen, Gedanken und Gefühle ohne Bewertung wahrzunehmen. Diese aus buddhistischen Meditationspraktiken stammende Haltung wurde von Jon Kabat-Zinn in den westlichen Kontext übertragen.', 'content', 0
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Achtsamkeit im therapeutischen Kontext', 'In der Psychotherapie hat sich Achtsamkeit als wirksames Element etabliert und ist Kernbestandteil verschiedener therapeutischer Ansätze wie der Achtsamkeitsbasierten Stressreduktion (MBSR) und der Akzeptanz- und Commitment-Therapie (ACT).', 'content', 1
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der achtsame Beobachter', 'Achtsamkeit kann man sich wie einen wohlwollenden, neutralen Beobachter vorstellen, der auf einem Hügel sitzt und das geschäftige Treiben (unsere Gedanken und Gefühle) in einem Tal beobachtet.', 'literary_device', 2
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

-- ADHS Sections
INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Was ist ADHS?', 'Die Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS) ist eine der häufigsten psychiatrischen Diagnosen im Kindes- und Jugendalter. Sie ist durch ein durchgehendes Muster von Unaufmerksamkeit und/oder Hyperaktivität-Impulsivität gekennzeichnet.', 'content', 0
FROM public.glossary_terms WHERE slug = 'adhs';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Erscheinungsformen und Diagnose', 'Nach DSM-5 werden drei Erscheinungsformen unterschieden: der vorwiegend unaufmerksame Typ, der vorwiegend hyperaktiv-impulsive Typ und der kombinierte Typ.', 'content', 1
FROM public.glossary_terms WHERE slug = 'adhs';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das Ferrari-Gehirn mit Fahrradbremsen', 'ADHS kann man sich wie einen Ferrari mit Fahrradbremsen vorstellen. Das Gehirn ist leistungsstark, hat aber Schwierigkeiten, dieses Potenzial zu kontrollieren.', 'literary_device', 2
FROM public.glossary_terms WHERE slug = 'adhs';

-- ACT Sections
INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Grundlagen der ACT', 'Die Akzeptanz- und Commitment-Therapie wurde von Steven Hayes entwickelt und gehört zur dritten Welle der Verhaltenstherapie. Sie fördert die psychologische Flexibilität.', 'content', 0
FROM public.glossary_terms WHERE slug = 'act';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die sechs Kernprozesse', 'ACT basiert auf: 1) Akzeptanz, 2) Kognitive Defusion, 3) Präsenz im gegenwärtigen Moment, 4) Selbst als Kontext, 5) Werte, 6) Engagiertes Handeln.', 'content', 1
FROM public.glossary_terms WHERE slug = 'act';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der Fahrgast im Bus', 'Stellen Sie sich vor, Sie sind ein Busfahrer, und schwierige Gedanken sind wie unangenehme Fahrgäste. Sie entscheiden trotzdem, wohin Sie fahren.', 'literary_device', 2
FROM public.glossary_terms WHERE slug = 'act';

-- Burnout Sections
INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Was ist Burnout?', 'Burnout beschreibt einen Zustand tiefgreifender emotionaler, körperlicher und geistiger Erschöpfung, der durch anhaltende Überforderung entsteht. Im Kontext der Elternschaft spricht man auch von Eltern-Burnout.', 'content', 0
FROM public.glossary_terms WHERE slug = 'burnout';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Symptome erkennen', 'Typische Symptome sind chronische Müdigkeit, emotionale Distanz, Zynismus, reduzierte Leistungsfähigkeit und körperliche Beschwerden wie Schlafstörungen oder Kopfschmerzen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'burnout';

-- Essstörung Sections
INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Formen von Essstörungen', 'Zu den häufigsten Formen gehören Anorexia Nervosa (Magersucht), Bulimia Nervosa (Bulimie) und die Binge-Eating-Störung. Jede Form hat eigene Charakteristika.', 'content', 0
FROM public.glossary_terms WHERE slug = 'essstoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Warnzeichen erkennen', 'Frühwarnzeichen können drastische Gewichtsveränderungen, Essensrituale, heimliches Essen, übermäßige Beschäftigung mit Kalorien und Körperbild sein.', 'content', 1
FROM public.glossary_terms WHERE slug = 'essstoerung';

-- ============================================================
-- GLOSSARY REFERENCES
-- ============================================================

DELETE FROM public.glossary_references WHERE term_id IN (SELECT id FROM public.glossary_terms);

-- Achtsamkeit References
INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Kabat-Zinn, J. (2013). Gesund durch Meditation. O.W. Barth.', 0
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Segal, Z. V. et al. (2008). Die Achtsamkeitsbasierte Kognitive Therapie der Depression.', 1
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

-- ADHS References
INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Barkley, R. A. (2015). Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment.', 0
FROM public.glossary_terms WHERE slug = 'adhs';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'AWMF S3-Leitlinie ADHS bei Kindern, Jugendlichen und Erwachsenen.', 1
FROM public.glossary_terms WHERE slug = 'adhs';

-- ACT References
INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Hayes, S. C. et al. (2014). Akzeptanz- und Commitment-Therapie. Junfermann.', 0
FROM public.glossary_terms WHERE slug = 'act';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Harris, R. (2009). ACT made simple. New Harbinger Publications.', 1
FROM public.glossary_terms WHERE slug = 'act';

-- Burnout References
INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Maslach, C. & Leiter, M. P. (2016). Burnout: A Complete Guide for Individuals & Organizations.', 0
FROM public.glossary_terms WHERE slug = 'burnout';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Roskam, I. et al. (2018). Parental Burnout Around the Globe.', 1
FROM public.glossary_terms WHERE slug = 'burnout';

-- Essstörung References
INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Herpertz, S. et al. (2019). S3-Leitlinie Diagnostik und Behandlung der Essstörungen.', 0
FROM public.glossary_terms WHERE slug = 'essstoerung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Treasure, J. et al. (2020). Eating Disorders. The Lancet.', 1
FROM public.glossary_terms WHERE slug = 'essstoerung';
