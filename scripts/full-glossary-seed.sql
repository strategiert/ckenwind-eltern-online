-- ============================================================
-- FULL GLOSSARY DATA MIGRATION
-- Generated: 2026-01-05T14:02:41.078Z
-- Total terms: 45
-- ============================================================

-- GLOSSARY TERMS
-- ============================================================

INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Achtsamkeit',
  'achtsamkeit',
  'Bewusste Wahrnehmung des gegenwärtigen Moments ohne Bewertung.',
  'Achtsamkeit beschreibt die bewusste und wertfreie Wahrnehmung des gegenwärtigen Moments.',
  'Mindfulness',
  ARRAY['Konzept-Psychologie', 'Therapie-Methode', 'Alltag', 'Burnout', 'ADHS', 'Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'ACT',
  'act',
  'Verhaltenstherapeutischer Ansatz, der Akzeptanz von Unvermeidbarem und werteorientiertes Handeln fördert.',
  'Die Akzeptanz- und Commitment-Therapie (ACT) ist ein moderner therapeutischer Ansatz, der Menschen dabei unterstützt, unangenehme Gedanken und Gefühle zu akzeptieren und gleichzeitig wertorientiert zu handeln.',
  'Akzeptanz- und Commitment-Therapie',
  ARRAY['Therapie-Ansatz', 'Burnout', 'ADHS', 'Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'ADHS',
  'adhs',
  'Neurobiologische Störung, gekennzeichnet durch Probleme mit Aufmerksamkeit, Impulsivität und/oder Hyperaktivität.',
  'ADHS ist eine neurobiologische Entwicklungsstörung, die sich durch Aufmerksamkeitsschwierigkeiten, Impulsivität und/oder motorische Unruhe äußert und im Alltag zu deutlichen Beeinträchtigungen führen kann.',
  'Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung',
  ARRAY['Diagnose-ADHS'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Adjustment Disorder',
  'adjustment-disorder',
  'Reaktion auf psychosoziale Belastungen, die über eine normale Reaktion hinausgeht und klinisch bedeutsames Leiden oder Beeinträchtigungen verursacht.',
  'Die Anpassungsstörung ist eine psychische Reaktion auf belastende Lebensereignisse, die zu deutlichen emotionalen oder verhaltensbezogenen Symptomen führt.',
  'Anpassungsstörung',
  ARRAY['Diagnose-Stress', 'Diagnose-Burnout'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Akute Belastungsreaktion',
  'akute-belastungsreaktion',
  'Vorübergehende Reaktion auf eine außergewöhnliche körperliche oder seelische Belastung.',
  'Die akute Belastungsreaktion ist eine unmittelbare, vorübergehende psychische Reaktion auf ein stark belastendes Ereignis.',
  NULL,
  ARRAY['Diagnose-Stress'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Akzeptanz- und Commitment-Therapie (ACT)',
  'akzeptanz-und-commitment-therapie',
  'Siehe ACT.',
  'Die Akzeptanz- und Commitment-Therapie (ACT) ist ein moderner verhaltenstherapeutischer Ansatz, der Menschen dabei unterstützt, unangenehme Gedanken und Gefühle zu akzeptieren und gleichzeitig wertorientiert zu handeln.',
  'ACT',
  ARRAY['Therapie-Ansatz', 'Burnout', 'ADHS', 'Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Alltagssprache (Eltern)',
  'alltagssprache-eltern',
  'Begriffe und Formulierungen, die Eltern selbst verwenden, um ihre Erfahrungen zu beschreiben (z.B. ''am Ende sein'', ''ausgelaugt'').',
  'Die Alltagssprache von Eltern umfasst spezifische Ausdrücke und Redewendungen, mit denen sie ihre Erfahrungen, Gefühle und Herausforderungen im Familienalltag beschreiben.',
  NULL,
  ARRAY['Alltag', 'Elternsprache', 'Glossar'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Am Ende sein',
  'am-ende-sein',
  'Gefühl völliger körperlicher und emotionaler Erschöpfung und Überforderung.',
  '''Am Ende sein'' beschreibt einen Zustand tiefgreifender Erschöpfung und Überforderung, bei dem die eigenen Ressourcen aufgebraucht erscheinen.',
  NULL,
  ARRAY['Alltag', 'Elternsprache', 'Symptom-Burnout'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Anorexia (Symptom)',
  'anorexia-symptom',
  'Appetitlosigkeit als Symptom, nicht die spezifische Diagnose Anorexia Nervosa. (ICD-10: R63.0)',
  'Anorexia bezeichnet als Symptom einen Appetitverlust, der bei verschiedenen körperlichen und psychischen Erkrankungen auftreten kann.',
  NULL,
  ARRAY['Symptom-Essstörung', 'Diagnose'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Anorexia Nervosa',
  'anorexia-nervosa',
  'Essstörung gekennzeichnet durch starkes Untergewicht, intensive Angst vor Gewichtszunahme und eine gestörte Körperwahrnehmung. (ICD-10: F50.0)',
  'Anorexia nervosa ist eine schwerwiegende Essstörung, die durch selbst herbeigeführten Gewichtsverlust, intensive Angst vor Gewichtszunahme und eine gestörte Körperwahrnehmung gekennzeichnet ist.',
  'Magersucht',
  ARRAY['Diagnose-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Anorexia Nervosa, Binge-Eating/Purging Type',
  'anorexia-nervosa-binge-eating-purging-type',
  'Subtyp der Anorexia Nervosa, bei dem neben restriktivem Essverhalten auch Essanfälle und/oder selbstinduziertes Erbrechen oder andere kompensatorische Verhaltensweisen auftreten. (ICD-10: F50.02)',
  'Der Binge-Eating/Purging-Typ der Anorexia Nervosa ist durch die Kombination von Untergewicht mit wiederkehrenden Essanfällen und/oder gewichtskontrollierenden Maßnahmen wie Erbrechen gekennzeichnet.',
  NULL,
  ARRAY['Diagnose-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Anorexia Nervosa, Restricting Type',
  'anorexia-nervosa-restricting-type',
  'Subtyp der Anorexia Nervosa, bei dem das Untergewicht primär durch Hungern, Diäten oder exzessiven Sport erreicht wird, ohne regelmäßige Essanfälle oder Purging-Verhalten. (ICD-10: F50.01)',
  'Der restriktive Typ der Anorexia nervosa ist durch striktes Einschränken der Nahrungszufuhr und/oder übermäßige körperliche Aktivität gekennzeichnet, ohne regelmäßige Essanfälle oder kompensatorische Maßnahmen.',
  NULL,
  ARRAY['Diagnose-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Anorexia Nervosa, Unspecified',
  'anorexia-nervosa-unspecified',
  'Diagnose, wenn die Kriterien für Anorexia Nervosa erfüllt sind, aber der Subtyp nicht spezifiziert ist. (ICD-10: F50.00)',
  'Anorexia Nervosa, Unspecified bezeichnet Fälle von Magersucht, bei denen eine eindeutige Zuordnung zu einem spezifischen Subtyp nicht möglich oder nicht erfolgt ist.',
  NULL,
  ARRAY['Diagnose-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Anpassungsstörung',
  'anpassungsstoerung',
  'Siehe Adjustment Disorder.',
  'Die Anpassungsstörung ist eine psychische Reaktion auf belastende Lebensereignisse, die zu deutlichen emotionalen oder verhaltensbezogenen Symptomen führt, welche die normale Bewältigungsfähigkeit übersteigen.',
  'Adjustment Disorder',
  ARRAY['Diagnose-Stress', 'Diagnose-Burnout'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Anstrengung',
  'anstrengung',
  'Hoher subjektiv empfundener Energieaufwand, um den Alltag oder spezifische Aufgaben zu bewältigen.',
  'Anstrengung beschreibt den subjektiv empfundenen Energieaufwand, der nötig ist, um bestimmte Aufgaben zu bewältigen oder den Alltag zu meistern.',
  NULL,
  ARRAY['Alltag', 'Symptom-Burnout', 'Symptom-ADHS', 'Symptom-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Attention-Deficit Hyperactivity Disorder (ADHS)',
  'attention-deficit-hyperactivity-disorder',
  'Siehe ADHS.',
  'Attention-Deficit Hyperactivity Disorder (ADHS) ist die englische Bezeichnung für die Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung, eine neurobiologische Entwicklungsstörung mit Symptomen wie Unaufmerksamkeit, Impulsivität und/oder Hyperaktivität.',
  'ADHS',
  ARRAY['Diagnose-ADHS'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Atypical Anorexia Nervosa',
  'atypical-anorexia-nervosa',
  'Essstörung mit Merkmalen der Anorexia Nervosa, bei der jedoch trotz signifikantem Gewichtsverlust das Gewicht im Normalbereich oder darüber liegt. (ICD-10: F50.1)',
  'Atypische Anorexia Nervosa bezeichnet eine Essstörung, bei der alle psychologischen Merkmale der Anorexia Nervosa vorliegen, aber das Körpergewicht trotz erheblicher Gewichtsabnahme im Normal- oder Übergewichtsbereich liegt.',
  NULL,
  ARRAY['Diagnose-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Atypical Bulimia Nervosa',
  'atypical-bulimia-nervosa',
  'Essstörung mit Merkmalen der Bulimia Nervosa, bei der jedoch nicht alle diagnostischen Kriterien (z.B. Häufigkeit der Essanfälle/Purging) erfüllt sind. (ICD-10: F50.3)',
  'Die atypische Bulimia Nervosa ist eine Essstörung, bei der einige, aber nicht alle diagnostischen Kriterien der klassischen Bulimia Nervosa erfüllt sind, während dennoch ein klinisch bedeutsames Störungsbild vorliegt.',
  NULL,
  ARRAY['Diagnose-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Auffällig',
  'auffaellig',
  'Verhalten eines Kindes, das von Gleichaltrigen abweicht und bei Eltern oder Erziehern Anlass zur Sorge gibt.',
  'Der Begriff ''auffällig'' beschreibt im Kontext von Kindern und Jugendlichen ein Verhalten, das von der Norm abweicht und Aufmerksamkeit oder Sorge bei Erwachsenen weckt.',
  NULL,
  ARRAY['Alltag', 'Elternsprache', 'Symptom-ADHS', 'Symptom-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Ausgelaugt',
  'ausgelaugt',
  'Zustand tiefer emotionaler und körperlicher Erschöpfung, oft verbunden mit dem Gefühl, keine Energiereserven mehr zu haben.',
  'Ausgelaugt sein beschreibt einen Zustand tiefgreifender Erschöpfung, bei dem die körperlichen und emotionalen Reserven aufgebraucht erscheinen und selbst alltägliche Aufgaben zur Belastung werden.',
  NULL,
  ARRAY['Alltag', 'Elternsprache', 'Symptom-Burnout'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Ausgebrannt',
  'ausgebrannt',
  'Umgangssprachlich für Burnout; Zustand völliger Erschöpfung durch chronische Überlastung.',
  'Ausgebrannt sein beschreibt einen Zustand tiefgreifender körperlicher, emotionaler und mentaler Erschöpfung als Folge langanhaltender Überlastung und Stress.',
  NULL,
  ARRAY['Alltag', 'Elternsprache', 'Symptom-Burnout'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Avoidant/Restrictive Food Intake Disorder (ARFID)',
  'avoidant-restrictive-food-intake-disorder',
  'Essstörung gekennzeichnet durch eine vermeidende oder restriktive Nahrungsaufnahme, die zu Gewichtsverlust, Nährstoffmangel oder Abhängigkeit von Sondennahrung führt, ohne die Angst vor Gewichtszunahme oder Körperbildstörung der Anorexie. (ICD-10: F50.89)',
  'ARFID ist eine Essstörung, bei der die Nahrungsaufnahme stark eingeschränkt ist, nicht aufgrund von Gewichts- oder Körperbildsorgen, sondern wegen Desinteresse an Nahrung, sensorischen Eigenschaften oder Ängsten wie Erstickungsangst.',
  NULL,
  ARRAY['Diagnose-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Behavioral Activation (BA)',
  'behavioral-activation',
  'Ein therapeutischer Ansatz (oft bei Depression), der darauf abzielt, durch die schrittweise Zunahme angenehmer oder sinnstiftender Aktivitäten die Stimmung zu verbessern und Passivität zu durchbrechen.',
  'Verhaltensaktivierung ist eine wirksame therapeutische Methode, die durch gezielte Steigerung positiver Aktivitäten depressive Symptome und Erschöpfungszustände lindern kann.',
  'Verhaltensaktivierung',
  ARRAY['Therapie-Ansatz', 'Therapie-Methode', 'Burnout', 'Depression'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Behavior Therapy',
  'behavior-therapy',
  'Therapieform, die auf der Lerntheorie basiert und darauf abzielt, problematische Verhaltensweisen zu ändern und neue, gesündere Verhaltensmuster zu entwickeln.',
  'Die Verhaltenstherapie ist ein evidenzbasierter psychotherapeutischer Ansatz, der auf Lerntheorien basiert und konkrete Verhaltensänderungen anstrebt.',
  'Verhaltenstherapie',
  ARRAY['Therapie-Ansatz', 'Behandlung', 'ADHS', 'Essstörung', 'Burnout'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Begleitung',
  'begleitung',
  'Unterstützung, Beistand oder Anleitung während eines Prozesses, einer Behandlung oder einer schwierigen Lebensphase.',
  'Begleitung beschreibt den Prozess des Unterstützens und Beistehens während herausfordernder Lebensphasen oder therapeutischer Prozesse.',
  NULL,
  ARRAY['Therapie-Konzept', 'Intervention', 'Alltag', 'Familie', 'Soziales'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Belastung',
  'belastung',
  'Allgemeiner Begriff für Anspannung, Druck oder Beanspruchung, die körperlich oder psychisch empfunden wird.',
  'Belastung beschreibt eine allgemeine Form der Anspannung oder Beanspruchung, die sowohl körperlich als auch psychisch wahrgenommen werden kann.',
  NULL,
  ARRAY['Konzept-Psychologie', 'Stress', 'Alltag', 'Burnout', 'ADHS', 'Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Belastungsgrenze',
  'belastungsgrenze',
  'Der Punkt, an dem eine Person die auf sie einwirkenden Belastungen nicht mehr bewältigen kann, was zu Erschöpfung oder Zusammenbruch führen kann.',
  'Die Belastungsgrenze beschreibt den kritischen Punkt, an dem ein Mensch die Summe aller Anforderungen nicht mehr bewältigen kann.',
  NULL,
  ARRAY['Alltag', 'Elternsprache', 'Symptom-Burnout', 'Stress'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Benehmen',
  'benehmen',
  'Die Art und Weise, wie sich jemand verhält oder benimmt.',
  'Benehmen beschreibt die Art und Weise, wie sich jemand in sozialen Situationen verhält und ob dieses Verhalten gesellschaftlichen Erwartungen entspricht.',
  NULL,
  ARRAY['Alltag', 'Verhalten', 'ADHS', 'Erziehung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Beratung',
  'beratung',
  'Professionelle Unterstützung und Hilfestellung bei persönlichen, familiären oder beruflichen Problemen oder Entscheidungen.',
  'Beratung bietet strukturierte Unterstützung bei der Bewältigung von Herausforderungen oder Entscheidungsfindungen durch fachliche Expertise und gezielte Gesprächsführung.',
  NULL,
  ARRAY['Therapie-Konzept', 'Intervention', 'Hilfsangebot', 'Psychosozial'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Bereavement',
  'bereavement',
  'Der Zustand des Trauerns nach einem Verlust, insbesondere nach dem Tod einer nahestehenden Person.',
  'Bereavement beschreibt den Prozess des Trauerns und der emotionalen Anpassung nach dem Verlust einer nahestehenden Person oder einer bedeutsamen Lebensrealität.',
  'Trauerfall',
  ARRAY['Konzept-Psychologie', 'Alltag', 'Diagnose-Burnout'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Besserung',
  'besserung',
  'Positive Veränderung eines Zustands oder einer Situation, besonders im Kontext von Gesundheit, Therapie oder zwischenmenschlichen Beziehungen.',
  'Besserung beschreibt eine positive Entwicklung oder Veränderung, sei es in Bezug auf psychische oder körperliche Gesundheit, Verhaltensweisen oder Lebenssituationen.',
  NULL,
  ARRAY['Alltag', 'Elternsprache', 'Therapie-Prozess', 'Genesung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Bewegungsdrang',
  'bewegungsdrang',
  'Ein starkes inneres Bedürfnis nach körperlicher Aktivität und Bewegung, das besonders bei Kindern mit ADHS ausgeprägt sein kann.',
  'Bewegungsdrang beschreibt ein intensives Bedürfnis nach körperlicher Aktivität, das bei manchen Menschen, insbesondere Kindern mit ADHS, besonders stark ausgeprägt ist.',
  NULL,
  ARRAY['Symptom-ADHS', 'Alltag', 'Verhalten', 'Erziehung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Bewältigungsstrategien',
  'bewaeltigungsstrategien',
  'Methoden und Verhaltensweisen, die Menschen einsetzen, um mit Stress, Herausforderungen oder belastenden Situationen umzugehen.',
  'Bewältigungsstrategien (Coping) sind die verschiedenen Wege, auf denen Menschen versuchen, mit Stress, schwierigen Emotionen und herausfordernden Lebenssituationen umzugehen.',
  'Coping',
  ARRAY['Konzept-Psychologie', 'Therapie-Methode', 'Burnout', 'ADHS', 'Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Beziehung',
  'beziehung',
  'Wechselseitige Verbindung und Interaktion zwischen zwei oder mehr Personen, die von emotionaler Bindung, Kommunikation und gegenseitiger Beeinflussung geprägt ist.',
  'Beziehungen sind fundamentale zwischenmenschliche Verbindungen, die für unsere psychische Gesundheit, Entwicklung und Lebensqualität entscheidend sind.',
  NULL,
  ARRAY['Alltag', 'Familie', 'Soziales', 'Konzept-Psychologie'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Binge Eating',
  'binge-eating',
  'Episoden unkontrollierten, übermäßigen Essens, oft begleitet von Gefühlen des Kontrollverlusts.',
  'Binge Eating bezeichnet Episoden unkontrollierten Essens großer Nahrungsmengen, begleitet von einem Gefühl des Kontrollverlusts und oft gefolgt von Scham und Schuldgefühlen.',
  'Essanfall',
  ARRAY['Symptom-Essstörung', 'Diagnose-Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Binge-Eating-Störung',
  'binge-eating-stoerung',
  'Essstörung, gekennzeichnet durch wiederholte Episoden von Essanfällen ohne kompensatorisches Verhalten wie bei Bulimie.',
  'Die Binge-Eating-Störung ist eine Essstörung, bei der wiederholt Essanfälle auftreten, ohne dass regelmäßiges kompensatorisches Verhalten wie selbstinduziertes Erbrechen oder Missbrauch von Abführmitteln folgt.',
  NULL,
  ARRAY['Diagnose-Essstörung', 'Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Bockig',
  'bockig',
  'Verhalten, das durch Widerstand, Trotz oder Verweigerung gekennzeichnet ist, besonders bei Kindern.',
  'Bockiges Verhalten beschreibt eine Form des Widerstands oder Trotzes, die besonders im Kindesalter als normale Entwicklungsphase auftritt, aber auch als Symptom tieferliegender Probleme erscheinen kann.',
  NULL,
  ARRAY['Alltag', 'Elternsprache', 'Verhalten', 'Erziehung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Body Dysmorphic Disorder',
  'body-dysmorphic-disorder',
  'Psychische Störung, bei der eine übermäßige Beschäftigung mit eingebildeten oder geringfügigen Mängeln des eigenen Erscheinungsbildes im Vordergrund steht.',
  'Die körperdysmorphe Störung (BDD) ist gekennzeichnet durch eine übermäßige Beschäftigung mit eingebildeten oder stark überbetonten Mängeln im eigenen Erscheinungsbild, die zu erheblichem Leidensdruck führt.',
  'Körperdysmorphe Störung',
  ARRAY['Diagnose', 'Körperbild', 'Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Body Image',
  'body-image',
  'Die subjektive Wahrnehmung und Bewertung des eigenen Körpers, einschließlich Gedanken, Gefühlen und Vorstellungen über das eigene Aussehen.',
  'Das Körperbild umfasst unsere subjektiven Wahrnehmungen, Gedanken, Gefühle und Verhaltensweisen in Bezug auf den eigenen Körper und ist besonders im Kontext von Essstörungen ein zentrales Konzept.',
  'Körperbild',
  ARRAY['Konzept-Psychologie', 'Essstörung', 'Gesundheit'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Borderline-Persönlichkeitsstörung',
  'borderline-persoenlichkeitsstoerung',
  'Psychische Störung, charakterisiert durch Instabilität in zwischenmenschlichen Beziehungen, Selbstbild und Affekten sowie ausgeprägte Impulsivität.',
  'Die Borderline-Persönlichkeitsstörung ist durch tiefgreifende Muster von Instabilität in zwischenmenschlichen Beziehungen, im Selbstbild und in Gefühlen sowie durch ausgeprägte Impulsivität gekennzeichnet.',
  'BPS, Emotional instabile Persönlichkeitsstörung vom Borderline-Typ',
  ARRAY['Diagnose', 'Persönlichkeit', 'Konzept-Psychologie'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Boundary Setting',
  'boundary-setting',
  'Prozess des Etablierens und Kommunizierens von persönlichen Grenzen, um die eigenen physischen, emotionalen und zeitlichen Bedürfnisse zu schützen.',
  'Grenzen setzen bedeutet, klare Regeln und Erwartungen dafür zu definieren, wie andere Menschen mit uns umgehen dürfen, um unsere physische und psychische Gesundheit zu schützen.',
  'Grenzen setzen',
  ARRAY['Konzept-Psychologie', 'Burnout', 'Familie', 'Stress'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Bremse ziehen',
  'bremse-ziehen',
  'Metapher für das bewusste Unterbrechen einer belastenden Situation oder eines übermäßigen Engagements, um Überlastung vorzubeugen.',
  'Die Bremse zu ziehen bedeutet, bewusst innezuhalten und Grenzen zu setzen, um sich vor Überlastung und Erschöpfung zu schützen.',
  NULL,
  ARRAY['Alltag', 'Elternsprache', 'Burnout', 'Selbstfürsorge'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Brief Therapy',
  'brief-therapy',
  'Therapeutischer Ansatz mit begrenzter Sitzungsanzahl und fokussiertem Vorgehen, der auf schnelle, zielorientierte Interventionen setzt.',
  'Kurzzeittherapie ist ein fokussierter, lösungsorientierter therapeutischer Ansatz mit begrenzter Sitzungsanzahl, der auf schnelle, zielorientierte Veränderungen abzielt.',
  'Kurzzeittherapie',
  ARRAY['Therapie-Ansatz', 'Therapie-Methode', 'Intervention'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Bulimia Nervosa',
  'bulimia-nervosa',
  'Essstörung, gekennzeichnet durch wiederkehrende Essanfälle mit anschließendem kompensatorischem Verhalten wie Erbrechen oder Abführmittelmissbrauch.',
  'Bulimia Nervosa ist eine schwerwiegende Essstörung, die durch einen Kreislauf aus Essanfällen und anschließenden kompensatorischen Verhaltensweisen gekennzeichnet ist.',
  'Ess-Brech-Sucht',
  ARRAY['Diagnose-Essstörung', 'Essstörung'],
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


INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  'Burn-out',
  'burn-out',
  'Zustand emotionaler, physischer und geistiger Erschöpfung durch anhaltenden Stress, oft verbunden mit reduzierter Leistungsfähigkeit und Depersonalisation.',
  'Burnout beschreibt einen Zustand tiefgreifender Erschöpfung und Desillusionierung, der durch chronischen Stress und Überforderung entsteht und verschiedene Lebensbereiche beeinträchtigen kann.',
  'Burnout-Syndrom, Ausgebranntsein',
  ARRAY['Diagnose-Burnout', 'Burnout', 'Stress', 'Arbeit'],
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

-- Delete existing sections first
DELETE FROM public.glossary_sections WHERE term_id IN (SELECT id FROM public.glossary_terms);

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Was ist Achtsamkeit?', 'Achtsamkeit bezeichnet die Fähigkeit, bewusst im gegenwärtigen Moment zu verweilen und Erfahrungen, Gedanken und Gefühle ohne Bewertung wahrzunehmen. Es handelt sich um eine Form der Aufmerksamkeitslenkung, die absichtsvoll, nicht-wertend und auf den gegenwärtigen Moment bezogen ist. Diese aus buddhistischen Meditationspraktiken stammende Haltung wurde von Jon Kabat-Zinn in den westlichen Kontext übertragen und wissenschaftlich erforscht.', 'content', 0
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Achtsamkeit im therapeutischen Kontext', 'In der Psychotherapie hat sich Achtsamkeit als wirksames Element etabliert und ist Kernbestandteil verschiedener therapeutischer Ansätze wie der Achtsamkeitsbasierten Stressreduktion (MBSR), der Achtsamkeitsbasierten Kognitiven Therapie (MBCT) und der Akzeptanz- und Commitment-Therapie (ACT). Durch das Üben von Achtsamkeit lernen Menschen, ihre automatischen Reaktionsmuster zu unterbrechen, Distanz zu belastenden Gedanken und Gefühlen zu gewinnen und präsenter im Hier und Jetzt zu sein.', 'content', 1
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Achtsamkeit für Eltern und Kinder', 'Für Eltern kann Achtsamkeit besonders wertvoll sein, um in stressigen Situationen nicht in automatische Reaktionsmuster zu verfallen und stattdessen bewusst zu handeln. Achtsame Elternschaft (''Mindful Parenting'') bedeutet, den Moment mit dem Kind bewusst wahrzunehmen, auf Autopilotreaktionen zu verzichten und die eigenen Gedanken und Gefühle zu erkennen, ohne sofort auf sie zu reagieren. Auch für Kinder mit ADHS oder Essstörungen können altersgerechte Achtsamkeitsübungen hilfreich sein, um Selbstregulation zu fördern.', 'content', 2
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der achtsame Beobachter', 'Achtsamkeit kann man sich wie einen wohlwollenden, neutralen Beobachter vorstellen, der auf einem Hügel sitzt und das geschäftige Treiben (unsere Gedanken und Gefühle) in einem Tal beobachtet. Dieser Beobachter nimmt alles wahr, was geschieht, aber er lässt sich nicht in das Geschehen hineinziehen. Er bewertet nicht, was er sieht, sondern nimmt es einfach zur Kenntnis. Durch regelmäßige Achtsamkeitspraxis lernen wir, immer öfter diesen Beobachterposten einzunehmen, anstatt im Tal von unseren Gedanken und Gefühlen mitgerissen zu werden.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Grundlagen der ACT', 'Die Akzeptanz- und Commitment-Therapie (ausgesprochen als ein Wort: ''Act'') wurde von Steven Hayes entwickelt und gehört zur dritten Welle der Verhaltenstherapie. Im Gegensatz zu traditionellen kognitiven Ansätzen versucht ACT nicht primär, belastende Gedanken oder Gefühle zu verändern. Stattdessen fördert sie die psychologische Flexibilität – die Fähigkeit, auch bei unangenehmen inneren Erfahrungen im gegenwärtigen Moment präsent zu bleiben und das eigene Verhalten an persönlichen Werten auszurichten.', 'content', 0
FROM public.glossary_terms WHERE slug = 'act';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die sechs Kernprozesse der ACT', 'ACT basiert auf sechs miteinander verbundenen Prozessen: 1) Akzeptanz: Das Annehmen unerwünschter privater Erfahrungen ohne Vermeidung, 2) Kognitive Defusion: Das Lösen von Gedanken, statt sich mit ihnen zu identifizieren, 3) Präsenz im gegenwärtigen Moment: Bewusste Aufmerksamkeit auf das Hier und Jetzt, 4) Selbst als Kontext: Das beobachtende Selbst erkennen, das von wechselnden Gedanken und Gefühlen verschieden ist,, 5) Werte: Identifizieren dessen, was im Leben wirklich wichtig ist, 6) Engagiertes Handeln: Konkrete Schritte unternehmen, um ein werteorientiertes Leben zu führen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'act';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'ACT bei verschiedenen Problemstellungen', 'ACT hat sich bei einer Vielzahl psychischer Probleme als wirksam erwiesen. Bei Burnout hilft ACT, die Erschöpfung nicht zu bekämpfen, sondern zu akzeptieren und gleichzeitig Wege zu finden, im Einklang mit den eigenen Werten zu handeln. Für Eltern von Kindern mit ADHS kann ACT unterstützen, die Herausforderungen anzunehmen und dennoch eine erfüllende Elternschaft zu leben. Bei Essstörungen richtet ACT den Fokus darauf, einen flexibleren Umgang mit Körpererleben und Nahrungsaufnahme zu entwickeln, statt rigide Kontrolle auszuüben.', 'content', 2
FROM public.glossary_terms WHERE slug = 'act';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der Fahrgast im Bus', 'Stellen Sie sich vor, Sie sind ein Busfahrer, und verschiedene schwierige Gedanken und Gefühle sind wie unangenehme Fahrgäste in Ihrem Bus. Traditionelle Ansätze wären, die Fahrgäste zu bekämpfen oder sie von der Weiterfahrt abzuhalten. ACT schlägt einen anderen Weg vor: Sie akzeptieren, dass diese Fahrgäste mitfahren, aber Sie entscheiden als Fahrer trotzdem selbst, wohin Sie fahren. Die schwierigen Gedanken und Gefühle dürfen da sein, aber sie bestimmen nicht die Richtung Ihres Lebens.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'act';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Was ist ADHS?', 'Die Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS) ist eine der häufigsten psychiatrischen Diagnosen im Kindes- und Jugendalter, die oft bis ins Erwachsenenalter fortbesteht. Sie ist durch ein durchgehendes Muster von Unaufmerksamkeit und/oder Hyperaktivität-Impulsivität gekennzeichnet, das die Funktionsfähigkeit oder Entwicklung beeinträchtigt. Die Symptome müssen vor dem 12. Lebensjahr auftreten, in mehr als einem Lebensbereich (z.B. Schule und zuhause) vorhanden sein und mindestens sechs Monate anhalten.', 'content', 0
FROM public.glossary_terms WHERE slug = 'adhs';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Erscheinungsformen und Diagnose', 'Nach DSM-5 werden drei Erscheinungsformen unterschieden: der vorwiegend unaufmerksame Typ (wenn hauptsächlich Aufmerksamkeitsprobleme vorliegen), der vorwiegend hyperaktiv-impulsive Typ (wenn hauptsächlich Hyperaktivität und Impulsivität dominieren) und der kombinierte Typ (wenn beide Symptombereiche ausgeprägt sind). Die Diagnose erfolgt durch erfahrene Fachleute (Kinder- und Jugendpsychiater, Kinder- und Jugendpsychotherapeuten) auf Basis von Verhaltensbeobachtungen, Fragebögen, Interviews und neuropsychologischen Tests. Typische Symptome sind leichte Ablenkbarkeit, Schwierigkeiten, Aufgaben zu Ende zu bringen, übermäßiges Reden oder Unterbrechen anderer, Zappeligkeit und Schwierigkeiten beim ruhigen Spielen oder Arbeiten.', 'content', 1
FROM public.glossary_terms WHERE slug = 'adhs';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Ursachen und Behandlung', 'ADHS hat eine starke genetische Komponente mit einer Erblichkeit von etwa 70-80%. Umweltfaktoren wie Komplikationen während der Schwangerschaft oder Geburt können ebenfalls eine Rolle spielen. Die Behandlung erfolgt multimodal und umfasst Psychoedukation, Verhaltenstherapie, Elterntraining, schulische Unterstützung und bei mittelschweren bis schweren Fällen auch medikamentöse Therapie, vorwiegend mit Stimulanzien wie Methylphenidat. Mit der richtigen Unterstützung können Kinder und Erwachsene mit ADHS ein erfüllendes Leben führen und ihre Stärken, wie Kreativität, Energie und Begeisterungsfähigkeit, entfalten.', 'content', 2
FROM public.glossary_terms WHERE slug = 'adhs';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das Ferrari-Gehirn mit Fahrradbrems', 'ADHS kann man sich wie einen Ferrari mit Fahrradbremsen vorstellen. Das Gehirn eines Menschen mit ADHS ist leistungsstark und kann enorm schnell denken (wie ein Ferrari), hat aber Schwierigkeiten, dieses Potenzial zu kontrollieren und zu steuern (wie ein Auto mit unzureichenden Bremsen). Dies führt dazu, dass betroffene Personen manchmal Schwierigkeiten haben, ihre Gedanken, Impulse oder Bewegungen zu stoppen oder zu verlangsamen, wenn es nötig wäre.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'adhs';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Definition und Merkmale', 'Eine Anpassungsstörung ist eine übermäßige Reaktion auf einen oder mehrere identifizierbare Stressoren, die innerhalb von drei Monaten nach Beginn der Belastung auftritt. Die Symptome überschreiten das erwartbare Maß an Belastung und führen zu deutlichen Beeinträchtigungen im sozialen oder beruflichen Funktionsniveau. Typische Symptome können depressive Stimmung, Angst, Verhaltensstörungen oder eine Kombination davon sein. Im Gegensatz zu anderen psychischen Störungen ist bei der Anpassungsstörung der Auslöser klar identifizierbar.', 'content', 0
FROM public.glossary_terms WHERE slug = 'adjustment-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Auslöser und Risikogruppen', 'Auslöser können einzelne Ereignisse wie Jobverlust, Trennung, Umzug, Erkrankung oder anhaltende Stressoren wie berufliche Überforderung, finanzielle Probleme oder familiäre Konflikte sein. Auch positive Veränderungen wie Heirat oder Elternschaft können eine Anpassungsstörung auslösen, wenn sie mit erheblichen Lebensveränderungen verbunden sind. Besonders gefährdet sind Menschen in Lebensphasen mit multiplen Veränderungen, Personen mit schwachem sozialem Netzwerk oder Menschen mit vorbestehenden psychischen Problemen. Eltern von Kindern mit besonderen Bedürfnissen, wie ADHS oder chronischen Erkrankungen, haben ebenfalls ein erhöhtes Risiko.', 'content', 1
FROM public.glossary_terms WHERE slug = 'adjustment-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Behandlung und Verlauf', 'Anpassungsstörungen sind in der Regel zeitlich begrenzt und klingen oft innerhalb von sechs Monaten nach Ende des Stressors ab. Die Behandlung umfasst unterstützende Psychotherapie, um Bewältigungsstrategien zu entwickeln und die emotionale Verarbeitung zu fördern. Kognitive Verhaltenstherapie kann helfen, negative Gedankenmuster zu erkennen und zu modifizieren. In einigen Fällen, besonders bei starken depressiven oder Angstsymptomen, kann eine kurzfristige medikamentöse Behandlung sinnvoll sein. Die Prognose ist bei adäquater Behandlung gut, kann sich jedoch bei anhaltenden Stressoren oder mangelnder Unterstützung zu einer länger anhaltenden Depression oder Angststörung entwickeln.', 'content', 2
FROM public.glossary_terms WHERE slug = 'adjustment-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der überforderte Anpassungsmechanismus', 'Unser Körper und unsere Psyche verfügen über natürliche Anpassungsmechanismen, ähnlich wie ein Thermostat, der die Temperatur reguliert. Bei einer Anpassungsstörung ist dieser ''psychologische Thermostat'' überfordert. Wenn die Raumtemperatur plötzlich extrem ansteigt oder fällt, kann selbst ein gut funktionierender Thermostat die Temperatur nicht sofort wieder ins Gleichgewicht bringen. Ähnlich verhält es sich bei der Anpassungsstörung: Der psychologische Regulationsmechanismus ist mit der Größe oder Geschwindigkeit der Veränderung überfordert und benötigt Zeit und Unterstützung, um wieder ein Gleichgewicht herzustellen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'adjustment-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Definition und Symptome', 'Die akute Belastungsreaktion ist eine vorübergehende Störung, die bei einem psychisch nicht manifest gestörten Menschen als Reaktion auf eine außergewöhnliche physische oder psychische Belastung entsteht und üblicherweise innerhalb von Stunden oder Tagen abklingt. Die Symptome zeigen ein typisches gemischtes und wechselndes Bild und umfassen zunächst ein Gefühl von Betäubung, Bewusstseinseinengung und eingeschränkter Aufmerksamkeit, gefolgt von weiteren Symptomen wie Rückzug von der Umgebung, Unruhe, Überaktivität, Angst, Depression, Wut oder Verzweiflung.', 'content', 0
FROM public.glossary_terms WHERE slug = 'akute-belastungsreaktion';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Abgrenzung zu anderen Störungen', 'Die akute Belastungsreaktion unterscheidet sich von der Posttraumatischen Belastungsstörung (PTBS) durch ihre kürzere Dauer und das unmittelbare Auftreten nach dem belastenden Ereignis, während die PTBS verzögert auftreten kann und länger anhält. Von der Anpassungsstörung grenzt sie sich durch die höhere Intensität des auslösenden Stressors ab – bei der akuten Belastungsreaktion handelt es sich um ein außergewöhnlich belastendes Ereignis wie Unfall, Gewalt oder Naturkatastrophe, nicht um alltägliche Stressoren.', 'content', 1
FROM public.glossary_terms WHERE slug = 'akute-belastungsreaktion';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Umgang und Hilfestellung', 'Der Umgang mit einer akuten Belastungsreaktion sollte unterstützend und verständnisvoll sein, ohne zu pathologisieren. Die betroffene Person braucht Sicherheit, Beruhigung und das Gefühl, nicht allein zu sein. Psychologische Erste Hilfe umfasst praktische Unterstützung, Informationen über normale Stressreaktionen, Förderung positiver Bewältigungsstrategien und Vermittlung sozialer Unterstützung. Bei anhaltenden oder sich verschlechternden Symptomen sollte professionelle Hilfe in Anspruch genommen werden, um eine Chronifizierung zu vermeiden.', 'content', 2
FROM public.glossary_terms WHERE slug = 'akute-belastungsreaktion';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das psychologische Erdbeben', 'Eine akute Belastungsreaktion kann mit einem psychologischen Erdbeben verglichen werden. So wie bei einem plötzlichen Erdbeben der Boden – die sonst so verlässliche Grundlage unserer physischen Existenz – ins Wanken gerät, erschüttert ein traumatisches Ereignis die Grundannahmen unserer psychischen Existenz: dass die Welt sicher ist, dass wir Kontrolle haben und dass uns nichts Schlimmes passieren kann. Und so wie nach einem Erdbeben zunächst Chaos und Verwirrung herrschen, bevor man beginnen kann, die Schäden zu begutachten und aufzuräumen, braucht auch der Geist nach einem psychologischen Erdbeben Zeit, um das Geschehene zu verarbeiten und wieder ins Gleichgewicht zu kommen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'akute-belastungsreaktion';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Was ist die Akzeptanz- und Commitment-Therapie?', 'Die Akzeptanz- und Commitment-Therapie, abgekürzt ACT (ausgesprochen als ein Wort: ''Act''), ist ein therapeutischer Ansatz der dritten Welle der Verhaltenstherapie. Sie wurde von Steven Hayes und Kollegen entwickelt und integriert achtsamkeitsbasierte Strategien mit verhaltenstherapeutischen Interventionen. Ihre Grundannahme ist, dass das Vermeiden unangenehmer Gedanken und Gefühle langfristig zu mehr psychischem Leid führt. Stattdessen fördert ACT die Akzeptanz dieser Erfahrungen und das engagierte Handeln in Richtung persönlich wichtiger Werte.', 'content', 0
FROM public.glossary_terms WHERE slug = 'akzeptanz-und-commitment-therapie';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Grundlegende Prinzipien', 'ACT basiert auf sechs miteinander verbundenen Kernprozessen, die zusammen die psychologische Flexibilität fördern: 1) Akzeptanz unangenehmer Erfahrungen statt Vermeidung, 2) Kognitive Defusion oder das ''Loslösen'' von Gedanken, 3) Kontakt mit dem gegenwärtigen Moment, 4) Entwicklung des ''beobachtenden Selbst'', 5) Identifikation persönlich wichtiger Werte und 6) Engagiertes Handeln in Übereinstimmung mit diesen Werten. Die Metaphern und erlebnisorientierten Übungen in ACT helfen dabei, diese Prozesse direkt zu erfahren, statt sie nur intellektuell zu verstehen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'akzeptanz-und-commitment-therapie';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Anwendungsbereiche', 'ACT hat sich bei einer Vielzahl psychischer Probleme als wirksam erwiesen, darunter Depressionen, Angststörungen, chronische Schmerzen, Suchtprobleme und Stress. Bei Burnout hilft ACT, die Erschöpfung zu akzeptieren und gleichzeitig das Handeln an den eigenen Werten auszurichten. Für Eltern von Kindern mit ADHS bietet ACT Strategien zur Akzeptanz der Herausforderungen und zur Gestaltung einer erfüllenden Elternschaft trotz Schwierigkeiten. Bei Essstörungen fördert ACT einen flexibleren Umgang mit dem Körpererleben und der Nahrungsaufnahme, statt rigide Kontrolle anzustreben.', 'content', 2
FROM public.glossary_terms WHERE slug = 'akzeptanz-und-commitment-therapie';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der unwillkommene Partygast', 'Stellen Sie sich vor, schwierige Gedanken und Gefühle sind wie ein unwillkommener Gast auf Ihrer Party (Ihrem Leben). Je mehr Sie versuchen, diesen Gast hinauszuwerfen, desto mehr Aufmerksamkeit und Energie widmen Sie ihm, und desto weniger können Sie Ihre Party genießen. ACT schlägt vor, diesen Gast zwar nicht einzuladen, aber wenn er auftaucht, ihn einfach dasein zu lassen – und sich trotzdem auf die anderen Gäste und die Musik zu konzentrieren, also auf das, was Ihnen wichtig ist. Der unerwünschte Gast ist zwar da, bestimmt aber nicht mehr die gesamte Party.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'akzeptanz-und-commitment-therapie';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Bedeutung der Alltagssprache', 'Die Alltagssprache von Eltern spiegelt ihre unmittelbaren Erfahrungen wider und unterscheidet sich oft von der klinischen oder fachlichen Terminologie. Ausdrücke wie ''am Ende sein'', ''ausgelaugt'' oder ''keine Luft zum Atmen haben'' beschreiben emotionale Zustände direkter und authentischer als Fachbegriffe wie ''emotionale Erschöpfung'' oder ''reduzierte persönliche Leistungsfähigkeit''. Diese Sprache ist wichtig, weil sie die subjektive Erfahrungswelt der Eltern erfasst und ihnen ermöglicht, sich verstanden zu fühlen, auch wenn sie keine formale Diagnose haben.', 'content', 0
FROM public.glossary_terms WHERE slug = 'alltagssprache-eltern';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Brücke zwischen Alltagserfahrung und Fachsprache', 'Die Anerkennung und Wertschätzung der Alltagssprache von Eltern bildet eine wichtige Brücke zwischen ihrer Erfahrungswelt und der professionellen Unterstützung. Während die Fachsprache präzise und wissenschaftlich fundiert ist, kann sie für Eltern distanziert oder abstrakt wirken. Wenn Fachpersonen die Alltagssprache der Eltern aufgreifen und respektieren, entsteht eine gemeinsame Verständigungsebene. Gleichzeitig können Fachpersonen behutsam Fachbegriffe einführen und erklären, sodass Eltern zunehmend in der Lage sind, ihre Erfahrungen auch im fachlichen Kontext zu kommunizieren.', 'content', 1
FROM public.glossary_terms WHERE slug = 'alltagssprache-eltern';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Kulturelle und soziale Aspekte der Elternsprache', 'Die Alltagssprache von Eltern ist auch kulturell und sozial geprägt. Welche Begriffe Eltern verwenden, um ihre Erfahrungen zu beschreiben, hängt von ihrem kulturellen Hintergrund, ihrem sozialen Umfeld und ihren persönlichen Erfahrungen ab. In manchen Kulturen oder sozialen Gruppen kann der Ausdruck bestimmter Gefühle oder Belastungen tabuisiert sein, sodass Eltern auf Umschreibungen oder metaphorische Ausdrücke zurückgreifen. Die Sensibilität für diese sprachlichen Nuancen ist ein wichtiger Aspekt kultursensibler Elternberatung und -begleitung.', 'content', 2
FROM public.glossary_terms WHERE slug = 'alltagssprache-eltern';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das sprachliche Fenster', 'Die Alltagssprache von Eltern kann als Fenster zu ihrer inneren Erfahrungswelt betrachtet werden. Wie ein echtes Fenster lässt sie uns einen Blick in das Innere werfen, ohne dass wir vollständig eintreten können. Die Worte und Ausdrücke, die Eltern wählen, sind wie die Scheiben dieses Fensters – manchmal klar und transparent, manchmal leicht getönt oder sogar teilweise verhängt. Je aufmerksamer wir auf diese sprachlichen Feinheiten achten, desto besser können wir verstehen, was im ''Haus'' der elterlichen Erfahrungen tatsächlich vor sich geht.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'alltagssprache-eltern';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Alltagsverständnis und Erfahrung', 'Der Ausdruck ''am Ende sein'' ist eine alltägliche Redewendung, die einen Zustand beschreibt, in dem jemand das Gefühl hat, keine Kraft, Energie oder Ressourcen mehr zu haben, um mit den Anforderungen des Lebens umzugehen. Es handelt sich um ein subjektives Empfinden von Erschöpfung, das über normale Müdigkeit hinausgeht und oft mit einem Gefühl der Hilf- und Hoffnungslosigkeit verbunden ist. Eltern verwenden diesen Ausdruck häufig, um ihre Erfahrung zu beschreiben, wenn die Anforderungen der Kinderbetreuung, des Berufs und andere Verpflichtungen ihre Bewältigungskapazitäten übersteigen.', 'content', 0
FROM public.glossary_terms WHERE slug = 'am-ende-sein';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Psychologische Einordnung', 'Aus psychologischer Perspektive kann das ''Am-Ende-Sein'' als ein Warnsignal für beginnenden oder fortgeschrittenen Burnout betrachtet werden. Es kennzeichnet die emotionale Erschöpfung, die als Kernsymptom des Burnout-Syndroms gilt. Dieser Zustand entsteht nicht plötzlich, sondern entwickelt sich meist schleichend über einen längeren Zeitraum, in dem die Person kontinuierlich mehr Energie ausgibt, als sie regenerieren kann. Bei Eltern kann dies besonders ausgeprägt sein, da die Betreuung von Kindern eine ständige Anforderung darstellt, die kaum Pausen zulässt.', 'content', 1
FROM public.glossary_terms WHERE slug = 'am-ende-sein';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Bewältigungsstrategien und Hilfe', 'Wenn Eltern das Gefühl haben, ''am Ende zu sein'', ist dies ein deutliches Zeichen dafür, dass sie dringend Unterstützung und Entlastung benötigen. Kurzfristig können Notfallstrategien wie das Organisieren von Kinderbetreuung und bewusstes Einplanen von Ruhepausen helfen. Mittelfristig ist es wichtig, die eigenen Grenzen anzuerkennen, realistische Erwartungen zu setzen und Unterstützungssysteme zu aktivieren. Langfristig kann eine Überprüfung und Neuausrichtung des Lebensstils, der Prioritäten und des Umgangs mit Stress notwendig sein. Professionelle Unterstützung durch Beratung oder Therapie kann helfen, die zugrundeliegenden Muster zu erkennen und zu verändern.', 'content', 2
FROM public.glossary_terms WHERE slug = 'am-ende-sein';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die leere Batterie', '''Am Ende sein'' ist wie eine völlig entladene Batterie in einem wichtigen Gerät. So wie eine leere Batterie keine Energie mehr für die Funktion des Geräts liefern kann, hat ein Mensch, der ''am Ende ist'', keine Energie mehr für die Anforderungen des täglichen Lebens. Und ähnlich wie eine Batterie nicht durch kurzes Aufladen wieder voll funktionsfähig wird, wenn sie tiefentladen wurde, braucht auch ein Mensch in diesem Zustand mehr als nur eine gute Nacht Schlaf oder ein entspannendes Wochenende, um wieder zu voller Kraft zu kommen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'am-ende-sein';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Definition und Abgrenzung', 'Der Begriff ''Anorexia'' bezeichnet medizinisch betrachtet zunächst nur das Symptom des Appetitverlusts oder der Appetitlosigkeit. Dies ist zu unterscheiden von ''Anorexia nervosa'', die eine spezifische psychische Erkrankung aus dem Bereich der Essstörungen darstellt. Als Symptom kann Anorexia bei zahlreichen körperlichen und psychischen Erkrankungen auftreten und ist in der ICD-10 unter R63.0 klassifiziert.', 'content', 0
FROM public.glossary_terms WHERE slug = 'anorexia-symptom';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Ursachen für Appetitlosigkeit', 'Appetitlosigkeit kann viele verschiedene Ursachen haben. Häufig tritt sie im Zusammenhang mit akuten Infektionen, Verdauungsproblemen oder als Nebenwirkung bestimmter Medikamente auf. Auch psychische Faktoren wie Stress, Depression oder Angstzustände können zu Appetitlosigkeit führen. Bei Kindern kann temporäre Appetitlosigkeit Teil normaler Entwicklungsphasen sein oder auf emotionale Belastungen hinweisen. Bei älteren Menschen kann ein vermindertes Hungergefühl mit altersbedingten Veränderungen des Stoffwechsels und der Sinneswahrnehmung zusammenhängen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'anorexia-symptom';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Beobachtung und Handlungsbedarf', 'Kurzzeitige Appetitlosigkeit, etwa während einer Erkältung, ist meist unproblematisch. Anhaltender Appetitverlust sollte jedoch ärztlich abgeklärt werden, besonders wenn er mit ungewolltem Gewichtsverlust, Müdigkeit oder anderen Symptomen einhergeht. Bei Kindern ist ein verändertes Essverhalten zu beachten, wenn es über typische ''schwierige Esser''-Phasen hinausgeht. Eltern sollten darauf achten, ob das Kind generell weniger Interesse an Essen zeigt oder ob selektives Essen vorliegt, bei dem nur bestimmte Nahrungsmittel gemieden werden. Bei Verdacht auf eine beginnende Essstörung ist frühes Handeln wichtig, wobei ein ausgewogener Umgang mit dem Thema Essen und ein nicht zu starker Fokus auf Gewicht und Figur hilfreich sind.', 'content', 2
FROM public.glossary_terms WHERE slug = 'anorexia-symptom';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der verstummte Dialog', 'Appetit kann als ein Dialog zwischen Körper und Umwelt verstanden werden. Normalerweise ''spricht'' unser Körper zu uns durch Hungersignale, wenn er Nahrung benötigt, und wir ''antworten'', indem wir essen. Appetitlosigkeit ist wie ein verstummter Dialog – der Körper sendet keine klaren Signale mehr oder wir können sie nicht mehr wahrnehmen. Dies kann geschehen, weil andere ''Stimmen'' (wie Stress, Krankheit oder emotionale Belastung) zu laut sind und die Hungersignale übertönen, oder weil die ''Verbindungsleitung'' gestört ist, etwa durch biochemische Veränderungen bei Krankheit oder Depression.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'anorexia-symptom';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Merkmale und Diagnose', 'Die Anorexia nervosa (Magersucht) ist durch ein deutlich zu niedriges Körpergewicht gekennzeichnet, das durch Nahrungsrestriktion, manchmal begleitet von übermäßiger körperlicher Aktivität, selbstinduziertem Erbrechen oder Missbrauch von Abführmitteln, herbeigeführt wird. Nach ICD-10 liegt das Körpergewicht mindestens 15% unter dem erwarteten Gewicht (BMI ≤ 17,5 kg/m²). Trotz Untergewicht besteht eine intensive Angst vor Gewichtszunahme und ein gestörtes Körperbild – Betroffene nehmen sich trotz objektiven Untergewichts als ''zu dick'' wahr oder leugnen den Ernst ihrer Gewichtsabnahme. Die Störung beginnt typischerweise in der Adoleszenz und tritt überwiegend bei Mädchen und jungen Frauen auf, zunehmend aber auch bei Jungen und jungen Männern.', 'content', 0
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Subtypen und Verläufe', 'Es werden zwei Haupttypen unterschieden: Der restriktive Typ, bei dem primär durch Nahrungsrestriktion und übermäßige körperliche Aktivität Gewicht verloren wird, und der Binge-Eating/Purging-Typ, bei dem zusätzlich wiederkehrende Essanfälle und/oder kompensatorische Verhaltensweisen wie Erbrechen oder Missbrauch von Abführmitteln auftreten. Der Verlauf ist variabel – manche Betroffene erleben eine einzelne Episode mit vollständiger Genesung, andere einen chronischen, lebenslangen Verlauf mit schwerwiegenden körperlichen Folgen. Zu den körperlichen Komplikationen gehören Herzrhythmusstörungen, Osteoporose, Unfruchtbarkeit, Elektrolytstörungen und im schlimmsten Fall der Tod, mit einer der höchsten Mortalitätsraten unter psychischen Erkrankungen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Behandlung und Unterstützung', 'Die Behandlung erfordert einen multidisziplinären Ansatz, der medizinische Überwachung, Ernährungstherapie und psychotherapeutische Interventionen umfasst. Bei starkem Untergewicht steht zunächst die körperliche Stabilisierung im Vordergrund, oft im stationären Setting. Die kognitive Verhaltenstherapie, familienbasierte Therapie (besonders bei Jugendlichen) und psychodynamische Ansätze haben sich als wirksam erwiesen. Der Einbezug der Familie ist besonders bei jüngeren Patienten wichtig. Eltern sollten auf Frühwarnzeichen wie deutliche Veränderungen des Essverhaltens, exzessiven Sport, sozialen Rückzug und übermäßige Beschäftigung mit Essen und Gewicht achten.', 'content', 2
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das tyrannische Regime', 'Anorexia nervosa kann als eine Art ''tyrannisches Regime'' verstanden werden, das die Kontrolle über das Leben des Betroffenen übernimmt. Was als ''einfache Diät'' oder Versuch, gesünder zu leben, beginnt, entwickelt sich zu einem strengen Regelwerk mit immer mehr Verboten und Pflichten. Wie ein Diktator verspricht die Anorexie zunächst Sicherheit und Kontrolle, fordert aber zunehmend schwerere Opfer und isoliert den Betroffenen von unterstützenden Beziehungen. Die anfänglichen ''Belohnungen'' (wie Gefühle von Stolz und Kontrolle) werden immer seltener, während die ''Strafen'' für Regelbrüche (Schuldgefühle, Selbsthass) immer härter werden. Die Heilung beginnt, wenn die Person erkennt, dass dieses Regime nicht ihr eigentliches Selbst repräsentiert, und beginnt, sich gegen die Tyrannei aufzulehnen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Merkmale und Diagnostik', 'Der Binge-Eating/Purging-Typ der Anorexia Nervosa erfüllt die Grundkriterien der Anorexia nervosa (deutliches Untergewicht, Angst vor Gewichtszunahme, gestörtes Körperbild), zeigt aber zusätzlich regelmäßige Episoden von Essanfällen und/oder kompensatorischen Verhaltensweisen. Bei Essanfällen werden innerhalb kurzer Zeit objektiv große Nahrungsmengen verzehrt, begleitet von einem Gefühl des Kontrollverlusts. Purging-Verhalten umfasst selbstinduziertes Erbrechen, Missbrauch von Abführmitteln, Entwässerungsmitteln oder Einläufen. Auch exzessive körperliche Aktivität kann als kompensatorisches Verhalten eingesetzt werden. Für die Diagnose des Binge-Eating/Purging-Typs müssen diese Verhaltensweisen wiederholt während der aktuellen Episode der Anorexia nervosa aufgetreten sein.', 'content', 0
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-binge-eating-purging-type';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Abgrenzung und Überschneidungen', 'Dieser Subtyp weist Überlappungen mit der Bulimia nervosa auf, unterscheidet sich jedoch durch das deutliche Untergewicht. Übergänge zwischen den beiden Störungsbildern sind nicht selten. Viele Betroffene wechseln im Laufe ihrer Erkrankung zwischen den Subtypen der Anorexia nervosa oder entwickeln eine Bulimia nervosa. Der Binge-Eating/Purging-Typ ist oft mit impulsiveren Persönlichkeitszügen, emotionaler Instabilität und einem höheren Risiko für selbstverletzendes Verhalten und Substanzmissbrauch verbunden als der restriktive Typ.', 'content', 1
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-binge-eating-purging-type';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Behandlungsherausforderungen', 'Die Behandlung dieses Subtyps stellt besondere Herausforderungen dar, da neben der Gewichtszunahme auch die Essanfälle und das kompensatorische Verhalten adressiert werden müssen. Die Betroffenen erleben oft intensive Scham- und Schuldgefühle bezüglich dieser Verhaltensweisen und verheimlichen sie. Der therapeutische Ansatz muss daher eine vertrauensvolle Beziehung etablieren und ein nicht-wertendes Umfeld schaffen. Die kognitive Verhaltenstherapie hat sich als wirksam erwiesen, wobei der Fokus neben der Normalisierung des Essverhaltens auch auf der Identifikation auslösender Faktoren für Essanfälle und der Entwicklung alternativer Bewältigungsstrategien für schwierige Emotionen liegt.', 'content', 2
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-binge-eating-purging-type';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das Pendel der Extreme', 'Der Binge-Eating/Purging-Typ der Anorexia nervosa kann mit einem Pendel verglichen werden, das zwischen extremen Positionen schwingt. Auf der einen Seite steht die strenge Kontrolle und Restriktion, auf der anderen der Kontrollverlust während der Essanfälle. Das Pendel schwingt mit großer Kraft von einem Extrem zum anderen, ohne eine stabile Mitte zu finden. Wie bei einem realen Pendel verbraucht diese ständige Bewegung zwischen den Extremen enorme Energie und führt zu Erschöpfung. Der Heilungsprozess besteht darin, die heftigen Ausschläge allmählich zu verringern und dem Pendel zu helfen, eine ausgewogenere, ruhigere Position zu finden.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-binge-eating-purging-type';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Klinisches Bild und Diagnose', 'Der restriktive Typ der Anorexia nervosa erfüllt die Grundkriterien der Erkrankung (deutliches Untergewicht, Angst vor Gewichtszunahme, Körperbildstörung), erreicht und hält das niedrige Gewicht aber hauptsächlich durch Nahrungsrestriktion und/oder übermäßige körperliche Betätigung. Charakteristisch sind strenge Diätregeln, das Zählen von Kalorien, das Meiden bestimmter Nahrungsmittelgruppen (besonders fett- oder kohlenhydratreiche Speisen) und oft zwanghaft betriebener Sport. Für die Diagnose des restriktiven Typs dürfen in den letzten drei Monaten keine wiederkehrenden Essanfälle oder kompensatorischen Verhaltensweisen wie selbstinduziertes Erbrechen oder Missbrauch von Abführmitteln aufgetreten sein.', 'content', 0
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-restricting-type';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Psychologische Charakteristika', 'Betroffene mit dem restriktiven Typ zeigen häufig ausgeprägte Perfektionismus- und Zwangszüge, hohe Selbstkontrolle und Schwierigkeiten, Emotionen wahrzunehmen und auszudrücken (Alexithymie). Die Nahrungsrestriktion beginnt oft mit dem Wunsch, Kontrolle über das eigene Leben zu gewinnen oder mit gesellschaftlichen Idealen übereinzustimmen, entwickelt aber zunehmend eine Eigendynamik. Erfolgreiche Gewichtsabnahme und Hungern können vorübergehend euphorische Gefühle auslösen und werden mit Stolz und Überlegenheitsgefühlen verbunden. Mit fortschreitender Mangelernährung treten Konzentrationsstörungen, Reizbarkeit und sozialer Rückzug auf, die die Störung weiter verstärken können.', 'content', 1
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-restricting-type';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Körperliche Folgen und Behandlung', 'Die anhaltende Unterernährung beim restriktiven Typ führt zu gravierenden körperlichen Folgen wie Herzrhythmusstörungen, Osteoporose, hormonellen Störungen mit Ausbleiben der Menstruation, Infertilität und erhöhter Infektanfälligkeit. Die Behandlung muss somatische und psychische Aspekte integrieren. Bei schwerem Untergewicht steht zunächst die Wiederherstellung eines gesundheitlich vertretbaren Gewichts im Vordergrund, oft im stationären Rahmen. Die psychotherapeutische Behandlung zielt auf die Veränderung dysfunktionaler Denkmuster bezüglich Gewicht und Figur, die Verbesserung der Emotionsregulation und den Aufbau eines positiven Selbstwertgefühls jenseits von Gewichtskontrolle ab.', 'content', 2
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-restricting-type';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das perfekte Bauwerk', 'Der restriktive Typ der Anorexia nervosa kann mit dem Versuch verglichen werden, ein perfektes Bauwerk zu errichten, das keinerlei Unregelmäßigkeiten oder Fehler aufweist. Die Betroffenen sehen ihren Körper als ein Projekt, das durch strenge Regeln, Kontrolle und Disziplin zu einem ''idealen'' Zustand geformt werden muss. Wie ein Architekt, der besessen davon ist, jeden Millimeter genau zu planen und zu kontrollieren, überwachen sie jede Kalorie und jede körperliche Aktivität. Aber je mehr sie nach Perfektion streben, desto fragiler wird das Bauwerk – bis es schließlich einzustürzen droht. Der Heilungsprozess beginnt mit der Erkenntnis, dass echte Schönheit und Stärke nicht in der perfekten Symmetrie liegen, sondern in der Widerstandsfähigkeit eines Gebäudes, das flexibel genug ist, um den Stürmen des Lebens standzuhalten.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-restricting-type';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Diagnostische Einordnung', 'Die Diagnose ''Anorexia Nervosa, Unspecified'' wird vergeben, wenn die grundlegenden Kriterien der Anorexia nervosa erfüllt sind (ausgeprägtes Untergewicht, intensive Angst vor Gewichtszunahme, Körperbildstörung), aber keine ausreichenden Informationen vorliegen oder keine klare Zuordnung zum restriktiven Typ oder zum Binge-Eating/Purging-Typ möglich ist. Dies kann der Fall sein, wenn das Essverhalten und gewichtskontrollierende Maßnahmen wechseln oder nicht eindeutig erfasst werden können, etwa bei unzureichender Anamnese oder wenn Betroffene bestimmte Verhaltensweisen nicht offenlegen.', 'content', 0
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-unspecified';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Klinische Relevanz', 'Die unspezifische Form der Anorexia nervosa ist klinisch ebenso ernst zu nehmen wie die spezifizierten Subtypen. Das Fehlen einer Subtypisierung bedeutet nicht, dass die Störung weniger schwerwiegend ist oder weniger Behandlungsbedarf besteht. Die körperlichen und psychischen Folgen entsprechen denen der anderen Formen der Anorexia nervosa. In der Praxis kann die Diagnose vorläufig sein, bis durch fortgesetzte Beobachtung und therapeutische Beziehungsbildung ein klareres Bild des Essverhaltens entsteht und eine spezifischere Einordnung möglich wird.', 'content', 1
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-unspecified';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Behandlungsansatz', 'Der Behandlungsansatz bei der unspezifizierten Form der Anorexia nervosa orientiert sich an den allgemeinen Leitlinien zur Behandlung der Essstörung. Zentrale Elemente sind die Normalisierung des Essverhaltens und des Gewichts, die psychotherapeutische Bearbeitung der zugrundeliegenden psychologischen Faktoren und die Behandlung von Begleiterkrankungen. Im Verlauf der Behandlung ist es wichtig, auf mögliche Essanfälle oder kompensatorisches Verhalten zu achten, um die Therapie entsprechend anzupassen. Die interdisziplinäre Zusammenarbeit von Ärzten, Psychotherapeuten, Ernährungsfachkräften und bei Bedarf weiteren Fachpersonen ist auch hier ein zentraler Erfolgsfaktor.', 'content', 2
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-unspecified';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das unbenannte Porträt', 'Die unspezifizierte Form der Anorexia nervosa kann mit einem Porträt verglichen werden, dessen genaue Stilrichtung noch nicht bestimmt wurde. Die grundlegenden Elemente des Bildes – die Leinwand, die Farben, das Motiv – sind klar erkennbar und identifizieren es eindeutig als Porträt (die Grundkriterien der Anorexia nervosa). Doch ob es sich um einen Impressionismus, Expressionismus oder Realismus handelt (der spezifische Subtyp), ist noch nicht festgelegt oder erfasst worden. Dies ändert jedoch nichts an der Tatsache, dass es sich um ein vollwertiges Kunstwerk handelt, das dieselbe Aufmerksamkeit und Pflege benötigt wie ein bereits kategorisiertes Werk.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-unspecified';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Definition und Merkmale', 'Eine Anpassungsstörung ist eine übermäßige, beeinträchtigende Reaktion auf einen oder mehrere identifizierbare Stressoren, die innerhalb von drei Monaten nach deren Beginn auftritt. Die Symptomatik überschreitet das erwartbare Maß an Belastungsreaktion und führt zu deutlichen Beeinträchtigungen im sozialen oder beruflichen Funktionsniveau. Typische Symptome können depressive Stimmung, Angst, Verhaltensstörungen oder eine Kombination davon sein. Im Gegensatz zu anderen psychischen Störungen ist bei der Anpassungsstörung der Auslöser klar identifizierbar, und die Symptome sollten innerhalb von sechs Monaten nach Ende des Stressors abklingen.', 'content', 0
FROM public.glossary_terms WHERE slug = 'anpassungsstoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Auslöser und Risikogruppen', 'Auslöser können einzelne Ereignisse wie Jobverlust, Trennung, Umzug, schwere Erkrankung oder anhaltende Stressoren wie berufliche Überforderung, finanzielle Probleme oder familiäre Konflikte sein. Auch positive Veränderungen wie Heirat oder Elternschaft können eine Anpassungsstörung auslösen, wenn sie mit erheblichen Lebensveränderungen verbunden sind. Besonders gefährdet sind Menschen in Lebensphasen mit multiplen Veränderungen, Personen mit schwachem sozialem Netzwerk oder Menschen mit vorbestehenden psychischen Problemen. Eltern von Kindern mit besonderen Bedürfnissen, wie ADHS oder chronischen Erkrankungen, haben ebenfalls ein erhöhtes Risiko.', 'content', 1
FROM public.glossary_terms WHERE slug = 'anpassungsstoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Behandlung und Verlauf', 'Die Behandlung umfasst unterstützende Psychotherapie, um Bewältigungsstrategien zu entwickeln und die emotionale Verarbeitung zu fördern. Kognitive Verhaltenstherapie kann helfen, negative Gedankenmuster zu erkennen und zu modifizieren. Entspannungstechniken und Stressbewältigungsstrategien sind wichtige Elemente der Therapie. In einigen Fällen, besonders bei starken depressiven oder Angstsymptomen, kann eine kurzfristige medikamentöse Behandlung sinnvoll sein. Die Prognose ist bei adäquater Behandlung gut. Ohne angemessene Unterstützung kann sich die Störung jedoch bei anhaltenden Stressoren zu einer länger anhaltenden Depression oder Angststörung entwickeln.', 'content', 2
FROM public.glossary_terms WHERE slug = 'anpassungsstoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das überflutete System', 'Eine Anpassungsstörung kann mit einem Entwässerungssystem verglichen werden, das mit einer plötzlichen Überschwemmung konfrontiert wird. Ein gut funktionierendes System kann mit normalen Regenfällen umgehen und das Wasser ableiten. Bei einem ungewöhnlich starken oder anhaltenden Unwetter kann jedoch selbst ein gutes System überlastet werden und überfluten. Die Folge ist eine ''Überschwemmung'' von Emotionen und Reaktionen, die nicht mehr adäquat ''abfließen'' können. Die Behandlung besteht darin, vorübergehende zusätzliche ''Abflussmöglichkeiten'' zu schaffen (Unterstützung, Bewältigungsstrategien) und langfristig das ''Entwässerungssystem'' zu verbessern (Resilienz aufbauen).', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'anpassungsstoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Anstrengung im Alltag', 'Anstrengung ist ein normaler Teil des menschlichen Erlebens und beschreibt die körperliche und/oder geistige Energie, die für die Bewältigung von Aufgaben aufgewendet wird. Das subjektive Erleben von Anstrengung variiert stark zwischen Individuen und wird von zahlreichen Faktoren beeinflusst, darunter körperliche und psychische Verfassung, Schlafqualität, Motivation und Interesse an der Aufgabe, sowie vorhandene Fähigkeiten und Ressourcen. Anstrengung ist nicht grundsätzlich negativ zu bewerten – moderate Anstrengung kann zu Erfolgserlebnissen, persönlichem Wachstum und Zufriedenheit führen (Eustress). Problematisch wird sie, wenn sie chronisch zu hoch ist und die verfügbaren Ressourcen übersteigt.', 'content', 0
FROM public.glossary_terms WHERE slug = 'anstrengung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Anstrengung im Kontext psychischer Gesundheit', 'Bei verschiedenen psychischen Zuständen und Erkrankungen kann die subjektiv empfundene Anstrengung für bestimmte Tätigkeiten erhöht sein. Menschen mit Burnout erleben oft selbst einfache Alltagsaufgaben als unverhältnismäßig anstrengend, was mit der emotionalen Erschöpfung als Kernsymptom zusammenhängt. Bei ADHS kann die Anstrengung für Aufgaben, die Aufmerksamkeit, Organisation oder Impulskontrolle erfordern, deutlich erhöht sein, da die neurobiologischen Grundlagen dieser exekutiven Funktionen beeinträchtigt sind. Bei Essstörungen kann die mentale Anstrengung im Zusammenhang mit Mahlzeiten und Körperwahrnehmung enorm sein, da ständige innere Konflikte, Regeln und Kontrollbedürfnisse bewältigt werden müssen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'anstrengung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Umgang mit erhöhter Anstrengung', 'Der Umgang mit erhöhter Anstrengung erfordert zunächst das Erkennen und Akzeptieren der eigenen Grenzen. Es ist wichtig, realistische Erwartungen zu setzen und sich nicht mit anderen zu vergleichen, besonders bei Vorliegen psychischer Beeinträchtigungen. Strategien zur Bewältigung umfassen das Setzen von Prioritäten, das Aufteilen größerer Aufgaben in kleinere Schritte, regelmäßige Pausen und eine gute Selbstfürsorge. Bei ADHS können externe Strukturierungshilfen, klare Routinen und die Nutzung von Stärken und Interessen hilfreich sein. Bei Burnout ist oft eine grundlegende Neuausrichtung des Verhältnisses von Belastung und Erholung notwendig. Professionelle Unterstützung sollte in Anspruch genommen werden, wenn die Anstrengung dauerhaft als überwältigend erlebt wird.', 'content', 2
FROM public.glossary_terms WHERE slug = 'anstrengung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die Energiewährung', 'Anstrengung kann als eine Art ''Energiewährung'' verstanden werden, die wir für verschiedene Aktivitäten ''ausgeben''. Jeder Mensch hat ein bestimmtes tägliches ''Budget'' dieser Währung, das durch Schlaf, Erholung und positive Erfahrungen aufgefüllt wird. Bei manchen psychischen Zuständen wie ADHS oder Burnout ist dieses Budget jedoch von vornherein kleiner oder wird schneller aufgebraucht. Bestimmte Aktivitäten kosten auch unterschiedlich viel dieser ''Währung'' – was für einen Menschen ein ''Schnäppchen'' ist (wenig Anstrengung), kann für einen anderen mit ADHS oder Burnout ''teuer'' (sehr anstrengend) sein. Gutes Energiemanagement bedeutet, bewusst zu entscheiden, wofür man seine begrenzte ''Währung'' ausgibt und wie man das Budget wieder auffüllen kann.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'anstrengung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Internationale Perspektive und Terminologie', 'Attention-Deficit Hyperactivity Disorder (ADHS) ist die im englischsprachigen Raum und in internationalen Klassifikationssystemen wie dem DSM-5 (Diagnostic and Statistical Manual of Mental Disorders) verwendete Bezeichnung für die Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung. In deutschsprachigen Ländern wird vorwiegend die Abkürzung ADHS verwendet, während im internationalen wissenschaftlichen Kontext die Abkürzung ADHD gebräuchlich ist. Die Kernsymptomatik und diagnostischen Kriterien sind im Wesentlichen identisch, obwohl es leichte Unterschiede zwischen den Klassifikationssystemen DSM-5 (amerikanisch) und ICD-10/11 (international) gibt.', 'content', 0
FROM public.glossary_terms WHERE slug = 'attention-deficit-hyperactivity-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Forschung und internationale Zusammenarbeit', 'Die internationale Forschung zu ADHS/ADHD ist umfangreich und wächst stetig. Die englischsprachige Terminologie dominiert die wissenschaftliche Literatur, weshalb es für Fachleute und interessierte Eltern wichtig sein kann, mit beiden Begrifflichkeiten vertraut zu sein, um auf aktuelle Forschungsergebnisse zugreifen zu können. Internationale Zusammenarbeit hat zu einem besseren Verständnis der neurobiologischen Grundlagen, genetischen Faktoren und wirksamen Behandlungsansätze geführt. Die global vernetzten Selbsthilfe- und Advocacy-Organisationen für Menschen mit ADHS nutzen oft beide Bezeichnungen, um international anschlussfähig zu sein.', 'content', 1
FROM public.glossary_terms WHERE slug = 'attention-deficit-hyperactivity-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Kulturübergreifende Aspekte', 'Die Prävalenz, Diagnostik und Behandlung von ADHS/ADHD variiert zwischen verschiedenen Ländern und Kulturen. Diese Unterschiede beruhen teilweise auf kulturellen Faktoren, verschiedenen Bildungs- und Gesundheitssystemen sowie unterschiedlichen diagnostischen Praktiken. In einigen Ländern wird die Diagnose häufiger gestellt als in anderen, was zu Debatten über mögliche Über- oder Unterdiagnostizierung geführt hat. Trotz dieser Unterschiede zeigt die Forschung, dass ADHS/ADHD ein weltweit vorkommendes Phänomen ist, das nicht auf bestimmte Kulturen oder Gesellschaften beschränkt ist. Die Symptome und Beeinträchtigungen sind kulturübergreifend ähnlich, auch wenn sie in verschiedenen Kontexten unterschiedlich interpretiert und behandelt werden können.', 'content', 2
FROM public.glossary_terms WHERE slug = 'attention-deficit-hyperactivity-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die universelle Sprache des ADHS', 'ADHS/ADHD ist wie eine universelle Sprache, die weltweit von vielen Menschen ''gesprochen'' wird, aber in verschiedenen ''Dialekten'' (kulturellen Kontexten) zum Ausdruck kommt. Die Grundvokabeln dieser Sprache – Unaufmerksamkeit, Impulsivität, Hyperaktivität – sind überall erkennbar, aber die ''Aussprache'' (wie die Symptome sich manifestieren), die ''Grammatik'' (wie die Symptome zusammenhängen) und der ''Wortschatz'' (welche Symptome im Vordergrund stehen) können je nach kulturellem und sozialem Kontext variieren. Trotz dieser Unterschiede können sich Menschen mit ADHS/ADHD aus verschiedenen Teilen der Welt oft in ihren Erfahrungen wiedererkennen – sie verstehen die ''Sprache'' des anderen, auch wenn sie unterschiedliche Worte dafür verwenden.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'attention-deficit-hyperactivity-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Definition und Diagnosekriterien', 'Die atypische Anorexia nervosa ist eine Form der Essstörung, bei der Betroffene einen signifikanten Gewichtsverlust durch Nahrungsrestriktion und/oder übermäßige körperliche Aktivität erzielen, jedoch nicht das Untergewichtskriterium der klassischen Anorexia nervosa erreichen. Sie zeigen dieselben psychologischen Merkmale wie bei der klassischen Form: intensive Angst vor Gewichtszunahme, übermäßiger Einfluss von Körpergewicht oder -form auf die Selbstbewertung und eine Störung in der Wahrnehmung des eigenen Körpers. In der ICD-10 wird diese Störung unter F50.1 ''Atypische Anorexia nervosa'' klassifiziert, während sie im DSM-5 zu den ''Other Specified Feeding or Eating Disorders'' (OSFED) gehört.', 'content', 0
FROM public.glossary_terms WHERE slug = 'atypical-anorexia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Klinische Bedeutung und Folgen', 'Die atypische Anorexia nervosa wurde lange Zeit unterschätzt, obwohl sie häufiger vorkommt als die klassische Form. Neuere Forschung zeigt, dass die medizinischen Komplikationen und psychologischen Beeinträchtigungen ebenso schwerwiegend sein können wie bei der klassischen Anorexia nervosa. Betroffene können dieselben körperlichen Komplikationen entwickeln, darunter Herzrhythmusstörungen, niedriger Blutdruck, Hormonveränderungen und Knochendichteverlust. Da das Gewicht im Normbereich liegt, wird die Störung oft später erkannt oder nicht ernst genommen, was die Behandlung verzögern und den Krankheitsverlauf verschlechtern kann. Die schnelle Gewichtsabnahme, unabhängig vom Ausgangsgewicht, ist ein wichtigerer Risikofaktor für medizinische Komplikationen als das absolute Gewicht.', 'content', 1
FROM public.glossary_terms WHERE slug = 'atypical-anorexia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Besondere Herausforderungen und Behandlung', 'Die Behandlung der atypischen Anorexia nervosa stellt besondere Herausforderungen dar. Betroffene haben oft Schwierigkeiten, ihre Essstörung anzuerkennen, da sie nicht dem stereotypen Bild der ''ausgemergelten Anorektikerin'' entsprechen. Auch Fachleute können die Schwere der Störung unterschätzen, wenn sie sich zu sehr am Gewicht orientieren. Die Behandlung sollte sich an denselben Prinzipien orientieren wie bei der klassischen Anorexia nervosa: Normalisierung des Essverhaltens, psychotherapeutische Bearbeitung der Körperbildstörung und der zugrunde liegenden psychologischen Faktoren sowie Behandlung von Begleiterkrankungen. Besondere Aufmerksamkeit sollte auf die Bestimmung eines angemessenen Zielgewichtsbereichs gelegt werden, der die individuelle Gewichtsgeschichte berücksichtigt.', 'content', 2
FROM public.glossary_terms WHERE slug = 'atypical-anorexia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das unsichtbare Erdbeben', 'Die atypische Anorexia nervosa kann mit einem Erdbeben verglichen werden, das zwar massive strukturelle Schäden im Inneren eines Gebäudes verursacht, aber von außen kaum sichtbare Spuren hinterlässt. Während Passanten das Gebäude für stabil und unversehrt halten mögen, wissen die Bewohner um die gefährlichen Risse in den tragenden Wänden, die wackelnden Fundamente und die Gefahr eines plötzlichen Einsturzes. Ähnlich können Menschen mit atypischer Anorexie nach außen ''normal'' oder sogar ''gesund'' erscheinen, während ihr Körper und ihre Psyche unter den massiven Auswirkungen der Nahrungsrestriktion, des Gewichtsverlusts und der verzerrten Körperwahrnehmung leiden.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'atypical-anorexia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Definition und diagnostische Einordnung', 'Die atypische Bulimia Nervosa (ICD-10: F50.3) beschreibt ein Störungsbild, bei dem wesentliche Merkmale der Bulimia Nervosa vorhanden sind, aber nicht alle diagnostischen Kriterien erfüllt werden. Dies kann die Häufigkeit der Essanfälle betreffen (weniger als zweimal pro Woche), die Dauer der Erkrankung (weniger als drei Monate) oder das Fehlen bestimmter psychologischer Merkmale wie die übermäßige Bedeutung von Figur und Gewicht für das Selbstwertgefühl. Im DSM-5 würde diese Störung unter ''Other Specified Feeding or Eating Disorder'' (OSFED) mit der Spezifizierung ''Bulimia Nervosa of low frequency and/or limited duration'' klassifiziert werden.', 'content', 0
FROM public.glossary_terms WHERE slug = 'atypical-bulimia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Symptomatik und klinische Bedeutung', 'Menschen mit atypischer Bulimia Nervosa erleben wiederkehrende Episoden von Essanfällen, gefolgt von kompensatorischem Verhalten wie selbstinduziertem Erbrechen, Missbrauch von Abführmitteln oder exzessivem Sport, jedoch in geringerer Häufigkeit oder Intensität als bei der typischen Form. Trotz der ''atypischen'' Klassifikation kann die Störung erhebliches Leiden verursachen und mit ähnlichen körperlichen und psychischen Komplikationen einhergehen wie die vollausgeprägte Bulimia Nervosa, darunter Elektrolytstörungen, Zahnschäden durch Magensäure, Depressionen und Angststörungen. Die Betroffenen zeigen oft dieselben Muster von dysfunktionalen Gedanken über Essen, Gewicht und Figur und dieselben Schwierigkeiten mit der Emotionsregulation.', 'content', 1
FROM public.glossary_terms WHERE slug = 'atypical-bulimia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Verlauf und Behandlung', 'Die atypische Bulimia Nervosa kann ein Frühstadium der vollausgeprägten Störung darstellen, aber auch eine eigenständige, länger andauernde Form der Essstörung sein. Sie kann außerdem eine Übergangsform im Genesungsprozess von einer vollausgeprägten Bulimia Nervosa repräsentieren. Die Behandlung orientiert sich an den Leitlinien für Bulimia Nervosa, wobei die kognitive Verhaltenstherapie für Essstörungen (CBT-E) als Methode der ersten Wahl gilt. Ziele sind die Normalisierung des Essverhaltens, die Unterbrechung des Teufelskreises aus Essanfällen und kompensatorischem Verhalten, die Veränderung dysfunktionaler Gedanken über Essen, Gewicht und Figur sowie die Verbesserung der Emotionsregulation. Eine frühzeitige Intervention ist wichtig, da sie die Chance auf vollständige Genesung erhöht und die Entwicklung einer vollausgeprägten Essstörung verhindern kann.', 'content', 2
FROM public.glossary_terms WHERE slug = 'atypical-bulimia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das unvollständige Puzzle', 'Die atypische Bulimia Nervosa kann mit einem Puzzle verglichen werden, bei dem die meisten, aber nicht alle Teile vorhanden sind. Obwohl einige Stücke fehlen mögen, ist das Gesamtbild dennoch erkennbar und die Lücken beeinträchtigen die Struktur und Stabilität des Puzzles. Ähnlich wie ein unvollständiges Puzzle dennoch viel Aufmerksamkeit und Sorgfalt beim Zusammensetzen erfordert, benötigen Menschen mit atypischer Bulimia Nervosa dieselbe ernsthafte Behandlung und Unterstützung wie jene mit der vollständig ausgeprägten Form. Die fehlenden ''Puzzleteile'' (diagnostische Kriterien) bedeuten nicht, dass das Problem weniger real oder belastend ist.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'atypical-bulimia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Was bedeutet ''auffälliges Verhalten''?', 'Der Begriff ''auffällig'' wird im Alltag von Eltern, Erziehern und Lehrern verwendet, um Verhaltensweisen zu beschreiben, die vom erwarteten altersgerechten Verhalten abweichen und Anlass zur Beobachtung oder Sorge geben. Diese Abweichungen können sich in verschiedenen Bereichen zeigen: im Sozialverhalten (z.B. extreme Schüchternheit oder Aggressivität), in der Aufmerksamkeit und Konzentration (z.B. erhöhte Ablenkbarkeit, Hyperaktivität), im emotionalen Bereich (z.B. übermäßige Ängstlichkeit, Stimmungsschwankungen) oder im Essverhalten (z.B. stark selektives Essen, Nahrungsverweigerung). Wichtig ist, dass ''Auffälligkeit'' zunächst nur eine Beobachtung beschreibt und keine Diagnose darstellt.', 'content', 0
FROM public.glossary_terms WHERE slug = 'auffaellig';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Einordnung und Umgang', 'Die Einordnung, was als ''auffällig'' gilt, ist stark kontextabhängig und wird von kulturellen, sozialen und individuellen Faktoren beeinflusst. Was in einem Umfeld als problematisch angesehen wird, kann in einem anderen als Variante der Normalität gelten. Bei der Beurteilung von auffälligem Verhalten sollten verschiedene Aspekte berücksichtigt werden: die Entwicklungsstufe des Kindes, die Intensität und Häufigkeit des Verhaltens, die Situationen, in denen es auftritt, und die Beeinträchtigung des Kindes oder seines Umfelds. Wenn Eltern Verhaltensweisen als auffällig wahrnehmen, ist eine beobachtende und nicht wertende Haltung hilfreich, verbunden mit der Bereitschaft, bei anhaltenden Sorgen fachliche Unterstützung zu suchen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'auffaellig';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der Weg von ''auffällig'' zur Diagnose', 'Wenn Verhaltensmuster über längere Zeit bestehen und zu Beeinträchtigungen im Alltag führen, kann eine diagnostische Abklärung sinnvoll sein. Der Weg führt oft vom Kinderarzt zu spezialisierten Fachleuten wie Kinder- und Jugendpsychiatern oder -psychotherapeuten. Dabei wird eine umfassende Diagnostik durchgeführt, die Gespräche, standardisierte Fragebögen, Verhaltensbeobachtungen und bei Bedarf weitere Tests umfasst. Es ist wichtig zu verstehen, dass nicht jedes ''auffällige'' Verhalten auf eine psychische Störung hindeutet – oft handelt es sich um vorübergehende Entwicklungsphasen oder Reaktionen auf Umweltbedingungen. Bei bestätigten Diagnosen wie ADHS oder beginnenden Essstörungen ist eine frühe, angemessene Intervention entscheidend für einen positiven Verlauf.', 'content', 2
FROM public.glossary_terms WHERE slug = 'auffaellig';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das bunte Orchester', 'Kindliches Verhalten kann mit einem Orchester verglichen werden, in dem jedes Kind sein eigenes Instrument spielt. Die meisten Kinder spielen in einer ähnlichen Lautstärke und Tonart, die für das ''Gesamtstück'' passend erscheint. Ein ''auffälliges'' Kind spielt sein Instrument entweder viel lauter oder leiser als die anderen, in einer anderen Tonart oder mit einem völlig anderen Rhythmus. Dies kann das Gesamtbild des Orchesters stören, macht die individuelle Melodie des Kindes aber nicht weniger wertvoll. Die Herausforderung für Eltern und Pädagogen besteht darin, zu erkennen, ob das Kind einfach seinen eigenen einzigartigen Musikstil entwickelt (eine Variante der Normalität) oder ob sein Spiel Ausdruck davon ist, dass es sein Instrument nicht richtig handhaben kann oder Unterstützung beim Erlernen der gemeinsamen Melodie benötigt (und somit professionelle Hilfe brauchen könnte).', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'auffaellig';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das Erleben von Ausgelaugtsein', 'Der Ausdruck ''ausgelaugt sein'' beschreibt bildhaft das Gefühl, als seien alle Kräfte und Ressourcen aus dem Körper ''herausgelaugt'' oder extrahiert worden. Betroffene berichten von einer durchdringenden Müdigkeit, die durch Schlaf kaum besser wird, verminderter Leistungsfähigkeit und dem Gefühl, ''nichts mehr geben zu können''. Die Erschöpfung betrifft dabei sowohl die körperliche Ebene (z.B. Schwere in den Gliedern, erhöhtes Schlafbedürfnis, Anfälligkeit für Infekte) als auch die emotionale (z.B. Reizbarkeit, Gefühl der Leere, verminderte Empathiefähigkeit) und kognitive Ebene (z.B. Konzentrationsprobleme, verlangsamtes Denken).', 'content', 0
FROM public.glossary_terms WHERE slug = 'ausgelaugt';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Ausgelaugtsein bei Eltern', 'Eltern sind besonders anfällig dafür, sich ausgelaugt zu fühlen, da die Betreuung von Kindern eine kontinuierliche körperliche und emotionale Anforderung darstellt, oft verbunden mit Schlafmangel und wenig Zeit zur Regeneration. Besonders belastend ist die Situation für Alleinerziehende oder Eltern von Kindern mit besonderen Bedürfnissen, wie ADHS oder chronischen Erkrankungen. Wenn Eltern sich ausgelaugt fühlen, kann dies ihre Beziehung zum Kind beeinträchtigen – sie reagieren möglicherweise gereizter, ungeduldiger oder emotional distanzierter als sie es sich wünschen würden. Gleichzeitig können Schuldgefühle auftreten, den eigenen Ansprüchen nicht gerecht zu werden, was die Erschöpfung noch verstärkt.', 'content', 1
FROM public.glossary_terms WHERE slug = 'ausgelaugt';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Regeneration und Unterstützung', 'Der Zustand des Ausgelaugtseins signalisiert einen dringenden Bedarf nach Regeneration und Unterstützung. Kurzfristige Erleichterung können Pausen und kurze ''Auszeiten'' im Alltag bringen, in denen bewusst Energie getankt wird (z.B. ein kurzer Spaziergang allein, eine Tasse Tee in Ruhe trinken). Mittelfristig ist es wichtig, regelmäßige Erholungsphasen einzuplanen und Unterstützung zu organisieren, etwa durch Partner, Familie, Freunde oder professionelle Hilfen. Langfristig kann es notwendig sein, die eigene Lebenssituation zu überdenken und strukturelle Änderungen vorzunehmen, um eine bessere Balance zwischen Belastung und Erholung zu erreichen. Bei anhaltendem Ausgelaugtsein sollte auch eine ärztliche Abklärung erfolgen, da chronische Erschöpfung ein Symptom verschiedener körperlicher und psychischer Erkrankungen sein kann, darunter Burnout, Depression oder bestimmte Autoimmunerkrankungen.', 'content', 2
FROM public.glossary_terms WHERE slug = 'ausgelaugt';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der ausgetrocknete Schwamm', 'Ein ausgelaugter Mensch ähnelt einem vollständig ausgetrockneten Schwamm. Ein frischer, feuchter Schwamm kann viel Flüssigkeit aufnehmen und wieder abgeben – er ist elastisch, anpassungsfähig und funktional. Wenn er jedoch zu oft ausgewrungen wird, ohne wieder Feuchtigkeit aufnehmen zu können, wird er hart, spröde und brüchig. Er kann seine Funktion nicht mehr erfüllen und zerbricht leicht bei Druck. In ähnlicher Weise verliert ein chronisch ausgelaugter Mensch seine emotionale und physische Elastizität, seine Anpassungsfähigkeit und seine Fähigkeit, auf die Bedürfnisse anderer zu reagieren. Der Heilungsprozess besteht darin, dem Schwamm – oder dem Menschen – Zeit zu geben, sich wieder mit Feuchtigkeit – oder Energie und Lebensfreude – zu füllen, bis er wieder seine natürliche Flexibilität und Funktionalität zurückgewinnt.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'ausgelaugt';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das Phänomen des Ausgebranntseins', 'Der Begriff ''ausgebrannt'' oder ''Burnout'' stammt ursprünglich aus dem Englischen (''burned out'') und wurde in den 1970er Jahren vom amerikanischen Psychoanalytiker Herbert Freudenberger geprägt. Er beschrieb damit einen Zustand der völligen Erschöpfung bei hochengagierten Helfern im sozialen Bereich. Heute wird der Begriff breiter verwendet und beschreibt einen Prozess, der durch chronischen Stress und Überforderung ausgelöst wird und zu physischer und psychischer Erschöpfung, Entfremdung von der eigenen Tätigkeit (Zynismus, innere Distanzierung) und reduzierter Leistungsfähigkeit führt. Es handelt sich um mehr als nur Müdigkeit – vielmehr um das Gefühl, ''nichts mehr zu haben'', womit man Anforderungen begegnen könnte.', 'content', 0
FROM public.glossary_terms WHERE slug = 'ausgebrannt';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Ausgebranntsein bei Eltern', 'Eltern sind besonders gefährdet, auszubrennen, da die Elternschaft eine kontinuierliche, emotional fordernde Aufgabe darstellt, bei der kaum Pausen möglich sind und die Anforderungen sich ständig verändern. Der Begriff ''Parental Burnout'' oder ''Eltern-Burnout'' beschreibt dieses spezifische Phänomen. Typische Anzeichen sind chronische Erschöpfung in der Elternrolle, emotionale Distanzierung vom Kind (''Ich funktioniere nur noch auf Autopilot''), Verlust der Erfüllung in der Elternschaft und ein Kontrast zwischen dem früheren und dem aktuellen elterlichen Selbst (''Ich bin nicht mehr der Vater/die Mutter, der/die ich sein möchte''). Besonders betroffen sind oft perfektionistische Eltern, alleinerziehende Eltern und Eltern von Kindern mit besonderen Bedürfnissen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'ausgebrannt';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Wege aus dem Ausgebranntsein', 'Die Erholung von einem Burnout-Zustand erfordert in der Regel mehr als nur eine kurze Auszeit – sie beinhaltet eine grundlegende Neuausrichtung des Verhältnisses von Belastung und Erholung. Kurzfristig sind direkte Entlastung, ausreichend Schlaf und Unterstützung durch andere wichtig. Mittelfristig geht es um den Aufbau nachhaltiger Selbstfürsorgepraktiken, das Setzen von Grenzen und die Überprüfung persönlicher Standards und Erwartungen. Der Prozess umfasst auch das Erkennen und Verändern dysfunktionaler Denkmuster und Überzeugungen, die zur Überlastung beigetragen haben. Professionelle Unterstützung durch Psychotherapie kann dabei hilfreich sein. Für Eltern ist es besonders wichtig, Unterstützungsnetzwerke zu aktivieren oder aufzubauen und sich von dem Idealbild der ''perfekten'' oder ''sich selbst aufopfernden'' Elternschaft zu lösen.', 'content', 2
FROM public.glossary_terms WHERE slug = 'ausgebrannt';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die erloschene Kerze', 'Das Ausgebranntsein kann mit einer Kerze verglichen werden, die zu lange und zu intensiv gebrannt hat. Eine Kerze gibt Licht und Wärme, solange sie Brennstoff hat. Wenn sie jedoch keine Pausen bekommt und ständig brennt, wird der Wachs immer weniger, die Flamme schwächer, bis schließlich nur noch ein verkohlter Docht übrig bleibt – ausgebrannt, unfähig, weiter Licht oder Wärme zu spenden. Ähnlich verhält es sich mit Menschen, die zu lange ohne Pausen und Energiezufuhr für andere ''brennen'' – sei es im Beruf oder in der Familie. Die gute Nachricht ist: Anders als eine Kerze kann ein Mensch seinen ''Brennstoff'' erneuern. Es braucht jedoch Zeit, Selbstfürsorge und oft eine neue Art zu ''brennen'', die nachhaltiger ist und das eigene Wohlbefinden nicht aufzehrt.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'ausgebrannt';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Definition und Merkmale', 'Die Avoidant/Restrictive Food Intake Disorder (ARFID, dt. vermeidende/restriktive Nahrungsaufnahmestörung) ist eine Essstörung, die durch eine deutliche Einschränkung der Nahrungsaufnahme gekennzeichnet ist, aber im Gegensatz zu Anorexia nervosa nicht mit Gewichtssorgen oder einer Körperbildstörung verbunden ist. Die gestörte Nahrungsaufnahme führt zu signifikanten Folgen wie Gewichtsverlust, Nährstoffmangel, Abhängigkeit von Sondenernährung oder Nahrungsergänzungsmitteln und/oder erheblichen Beeinträchtigungen im psychosozialen Funktionsniveau. Die Störung kann nicht besser durch mangelnde Verfügbarkeit von Nahrung, kulturelle Praktiken oder eine andere medizinische oder psychische Erkrankung erklärt werden.', 'content', 0
FROM public.glossary_terms WHERE slug = 'avoidant-restrictive-food-intake-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Erscheinungsformen und Ursachen', 'ARFID kann verschiedene Erscheinungsformen haben und aus unterschiedlichen Gründen entstehen: Einige Betroffene zeigen ein generelles Desinteresse an Nahrung oder haben einen geringen Appetit, andere reagieren empfindlich auf sensorische Eigenschaften wie Geschmack, Geruch, Textur oder Aussehen bestimmter Lebensmittel. Eine dritte Gruppe vermeidet Nahrung aufgrund spezifischer Ängste wie Erstickungsangst, Angst vor Erbrechen oder negativen gastrointestinalen Symptomen. ARFID kann in jedem Alter auftreten, ist aber besonders häufig bei Kindern und Jugendlichen und oft mit anderen Erkrankungen wie Autismus-Spektrum-Störungen, ADHS, Angststörungen oder gastrointestinalen Problemen verbunden.', 'content', 1
FROM public.glossary_terms WHERE slug = 'avoidant-restrictive-food-intake-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Diagnose und Behandlung', 'Die Diagnose von ARFID erfordert eine umfassende Evaluation durch Fachleute, um andere medizinische und psychische Ursachen für das gestörte Essverhalten auszuschließen. Die Behandlung ist multidisziplinär und umfasst ernährungstherapeutische, psychotherapeutische und bei Bedarf medizinische Interventionen. Ein wichtiger Ansatz ist die schrittweise Exposition gegenüber gemiedenen Lebensmitteln, kombiniert mit kognitiv-verhaltenstherapeutischen Techniken zur Bewältigung von Ängsten oder Aversionen. Bei Kindern ist der Einbezug der Familie essenziell. Im Gegensatz zu anderen Essstörungen wird bei ARFID in der Regel eine Erweiterung des Nahrungsspektrums und nicht eine Reduzierung angestrebt. Die Prognose ist bei früher Intervention und angemessener Behandlung günstig, wobei besonders bei lange bestehenden Fällen mit ausgeprägten Nährstoffdefiziten eine längere Behandlungsdauer zu erwarten ist.', 'content', 2
FROM public.glossary_terms WHERE slug = 'avoidant-restrictive-food-intake-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die Festung um den Teller', 'ARFID kann mit einer Festung verglichen werden, die ein Kind oder einen Erwachsenen von der Vielfalt der Nahrung trennt. Während bei Anorexie diese Festung gebaut wird, um das Innere (den Körper) vor dem ''bedrohlichen'' Essen zu schützen, entsteht die ARFID-Festung aus anderen Gründen: Manchmal sind die Mauern aus sensorischen Barrieren gebaut – die Textur oder der Geschmack erscheinen unerträglich. Bei anderen sind es Angstmauern – die Furcht vor dem Ersticken oder Erbrechen bildet unüberwindbare Hindernisse. Bei wieder anderen scheint die Festung eher wie ein Nebel zu sein – das Interesse oder der Appetit fehlen einfach. Die Behandlung gleicht dem behutsamen, geduldigen Abbau dieser Mauern, Stein für Stein, oder dem langsamen Lichten des Nebels, bis der Weg zu einer vielfältigeren, nährstoffreichen Ernährung frei ist.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'avoidant-restrictive-food-intake-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Grundprinzipien der Verhaltensaktivierung', 'Die Verhaltensaktivierung basiert auf der Beobachtung, dass Menschen mit Depression oder Burnout oft in einem Teufelskreis aus Passivität, Rückzug und verschlechterter Stimmung gefangen sind. Der therapeutische Ansatz zielt darauf ab, diesen Kreislauf durch systematisches Einführen und Steigern positiver Aktivitäten zu durchbrechen. Der Fokus liegt dabei nicht auf dem Gefühl vor der Aktivität (''Ich habe keine Lust''), sondern auf dem Verhalten selbst und der Erfahrung danach. Kernprinzip ist ''Handeln kommt vor dem Fühlen'' – positive Gefühle folgen oft dem aktiven Handeln, nicht umgekehrt.', 'content', 0
FROM public.glossary_terms WHERE slug = 'behavioral-activation';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Praktische Umsetzung', 'In der praktischen Anwendung werden zunächst Aktivitäten identifiziert, die potenziell Freude, Kompetenzerleben oder Sinn vermitteln könnten. Diese werden in kleine, machbare Schritte unterteilt und in einem Aktivitätenplan festgehalten. Begonnen wird mit leicht erreichbaren Zielen, um Erfolgserlebnisse zu sichern. Der Fortschritt wird dokumentiert, etwa in einem Tagebuch, in dem auch die Stimmung vor und nach den Aktivitäten festgehalten wird. Dies ermöglicht es, den Zusammenhang zwischen Aktivität und Stimmung direkt zu erleben.', 'content', 1
FROM public.glossary_terms WHERE slug = 'behavioral-activation';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Anwendung bei Burnout und elterlicher Erschöpfung', 'Bei Burnout oder elterlicher Erschöpfung kann die Verhaltensaktivierung helfen, wieder Zugang zu eigenen Ressourcen und Kraftquellen zu finden. Gerade für Eltern, die ihre eigenen Bedürfnisse oft hintenanstellen, bietet der Ansatz eine Struktur, um regelmäßig selbstfürsorgende Aktivitäten in den Alltag zu integrieren. Wichtig ist dabei die Balance: Es geht nicht um zusätzliche Verpflichtungen, sondern um die bewusste Einplanung von Aktivitäten, die Energie geben statt zu nehmen. Die Verhaltensaktivierung kann auch dabei helfen, das Spektrum an Aktivitäten zu erweitern und neue Quellen positiver Verstärkung zu erschließen.', 'content', 2
FROM public.glossary_terms WHERE slug = 'behavioral-activation';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der Motor und der leere Tank', 'Burnout und Depression können mit einem Auto verglichen werden, dessen Tank leer ist. Reine kognitive Arbeit (''Ich sollte positiver denken'') gleicht dem Drehen des Zündschlüssels ohne Benzin – der Motor springt nicht an. Die Verhaltensaktivierung gleicht dem Auffüllen des Tanks mit kleinen Mengen Treibstoff: Erst wenn wieder etwas Energie im System ist, kann der Motor laufen und selbst Energie erzeugen. Jede positive Aktivität ist wie ein kleiner Schluck Benzin, der hilft, wieder in Bewegung zu kommen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'behavioral-activation';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Grundprinzipien der Verhaltenstherapie', 'Die Verhaltenstherapie basiert auf der Annahme, dass viele psychische Probleme erlernt sind und daher auch wieder verlernt oder durch neue Verhaltensweisen ersetzt werden können. Sie konzentriert sich auf beobachtbares Verhalten und messbare Veränderungen, statt primär auf unbewusste Prozesse. Kerntechniken umfassen systematische Desensibilisierung (schrittweise Konfrontation mit angstauslösenden Reizen), Verstärkung erwünschten Verhaltens, Löschung unerwünschten Verhaltens und Modelllernen. Die Verhaltenstherapie ist stark strukturiert und zielgerichtet, wobei konkrete Verhaltensänderungen im Alltag angestrebt werden.', 'content', 0
FROM public.glossary_terms WHERE slug = 'behavior-therapy';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Anwendungsgebiete bei Eltern und Kindern', 'Bei ADHS wird die Verhaltenstherapie oft eingesetzt, um Kindern zu helfen, Selbstregulationsstrategien zu entwickeln und Eltern Techniken zur konsequenten, positiven Erziehung zu vermitteln. Bei Essstörungen fokussiert die Verhaltenstherapie auf die Normalisierung des Essverhaltens und den Umgang mit auslösenden Faktoren. Für Eltern mit Burnout-Symptomen kann die Verhaltenstherapie helfen, belastende Verhaltens- und Denkmuster zu identifizieren und zu verändern sowie Selbstfürsorge-Routinen zu etablieren.', 'content', 1
FROM public.glossary_terms WHERE slug = 'behavior-therapy';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Kognitive Verhaltenstherapie als Weiterentwicklung', 'Die kognitive Verhaltenstherapie (KVT) erweitert den Ansatz der klassischen Verhaltenstherapie um die Arbeit mit Gedanken und inneren Überzeugungen. Sie geht davon aus, dass nicht nur äußere Ereignisse, sondern vor allem unsere Bewertungen dieser Ereignisse Emotionen und Verhalten beeinflussen. Durch die Identifikation und Veränderung dysfunktionaler Gedankenmuster sollen negative Emotionen reduziert und funktionalere Verhaltensweisen ermöglicht werden. Die KVT ist heute eine der am besten erforschten und wirksamsten psychotherapeutischen Methoden für eine Vielzahl psychischer Störungen.', 'content', 2
FROM public.glossary_terms WHERE slug = 'behavior-therapy';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der Garten der Gewohnheiten', 'Verhaltenstherapie kann mit der Arbeit eines Gärtners verglichen werden: Unerwünschte Verhaltensweisen sind wie Unkraut, das regelmäßig gejätet werden muss, während erwünschte Verhaltensweisen wie wertvolle Pflanzen sind, die gehegt und gepflegt werden müssen, um zu gedeihen. Der Therapeut ist dabei wie ein Gärtner, der Werkzeuge und Wissen bereitstellt, aber die eigentliche Pflege muss der Patient selbst übernehmen. Mit der Zeit können aus anfänglich mühsamen Verhaltensänderungen neue Gewohnheiten werden, die kaum noch bewusste Anstrengung erfordern – ähnlich wie Pflanzen, die erst regelmäßig gegossen werden müssen, aber später selbstständig gedeihen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'behavior-therapy';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Begleitung als Konzept', 'Begleitung bezeichnet im psychosozialen Kontext eine Form der Unterstützung, bei der eine Person einer anderen während eines Veränderungsprozesses, einer Krise oder einer Behandlung zur Seite steht. Anders als bei direktiver Führung oder Anweisung liegt der Fokus auf dem gemeinsamen Gehen eines Weges, wobei die begleitete Person ihre Autonomie behält. Begleitung kann professionell (durch Therapeuten, Berater, Coaches) oder privat (durch Angehörige, Freunde) erfolgen.', 'content', 0
FROM public.glossary_terms WHERE slug = 'begleitung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Formen der professionellen Begleitung', 'Professionelle Begleitung kann verschiedene Formen annehmen, wie therapeutische Begleitung, Coaching, Beratung oder Supervision. Sie zeichnet sich durch einen definierten Rahmen, klare Grenzen und spezifische Kompetenzen der begleitenden Person aus. Bei der therapeutischen Begleitung steht die Unterstützung bei der Bewältigung psychischer Schwierigkeiten im Vordergrund, während Coaching eher auf die Entwicklung persönlicher oder beruflicher Potenziale abzielt.', 'content', 1
FROM public.glossary_terms WHERE slug = 'begleitung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Begleitung im familiären Kontext', 'Im familiären Kontext bedeutet Begleitung, für Angehörige da zu sein, ohne deren Autonomie einzuschränken oder Probleme für sie zu lösen. Dies kann besonders herausfordernd sein, etwa wenn Eltern Kinder mit psychischen Auffälligkeiten wie ADHS begleiten oder wenn Familienmitglieder eine Person mit einer Essstörung unterstützen. Wichtige Aspekte sind hier Geduld, Verständnis, emotionale Präsenz und die Bereitschaft, auch schwierige Emotionen auszuhalten, ohne übermäßig einzugreifen.', 'content', 2
FROM public.glossary_terms WHERE slug = 'begleitung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der gemeinsame Weg', 'Therapeutische Begleitung lässt sich mit einer gemeinsamen Wanderung vergleichen. Der Begleiter ist nicht der Führer, der den Weg vorgibt, sondern ein erfahrener Mitwanderer, der Orientierung bieten kann, wenn der andere unsicher ist. Er kennt mögliche Gefahren und Abkürzungen, entscheidet aber nicht über die Richtung oder das Tempo – diese Wahl bleibt beim Begleiteten. Der Begleiter kann stützen, wenn das Gelände schwierig wird, aber muss den anderen seinen eigenen Weg finden lassen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'begleitung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Was bedeutet Belastung?', 'Belastung bezeichnet den Zustand des Ausgesetztseins gegenüber Faktoren, die Stress oder Druck erzeugen und Ressourcen beanspruchen. Diese können von außen kommen (etwa durch Arbeit, Familie oder soziale Anforderungen) oder von innen (z.B. durch eigene Ansprüche, Sorgen oder körperliche Faktoren). Belastungen können akut oder chronisch sein und variieren stark in ihrer Intensität und Auswirkung.', 'content', 0
FROM public.glossary_terms WHERE slug = 'belastung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Belastung im Kontext psychischer Gesundheit', 'Im psychologischen Kontext wird Belastung oft als ein wichtiger Faktor bei der Entstehung verschiedener psychischer Probleme betrachtet. Chronische oder übermäßige Belastung kann zu Erschöpfungszuständen wie Burnout führen, bestehende Probleme wie ADHS-Symptome verschlimmern oder als Trigger für Essstörungen wirken. Die individuelle Belastbarkeit und verfügbare Bewältigungsstrategien bestimmen dabei, wie gut jemand mit Belastungen umgehen kann.', 'content', 1
FROM public.glossary_terms WHERE slug = 'belastung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Belastungen im Elternalltag', 'Eltern sind besonderen Belastungen ausgesetzt, da sie nicht nur für sich selbst, sondern auch für ihre Kinder Verantwortung tragen. Die ständige Sorge um das Wohlbefinden der Kinder, der Spagat zwischen verschiedenen Rollen und Verantwortlichkeiten sowie praktische Alltagsherausforderungen können zu einer erheblichen Gesamtbelastung führen. Bei Eltern von Kindern mit besonderen Bedürfnissen oder Entwicklungsstörungen wie ADHS können diese Belastungen noch intensiver sein.', 'content', 2
FROM public.glossary_terms WHERE slug = 'belastung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das Fass-Modell', 'Belastungen können wie Wasser in einem Fass verstanden werden. Jeder Mensch hat ein Fass mit einer bestimmten Kapazität. Tägliche Belastungen füllen das Fass allmählich. Kleine Belastungen sind wie Tropfen, große Belastungen wie ganze Eimer Wasser. Wenn das Fass überläuft, zeigen sich Symptome von Überlastung wie Erschöpfung oder Reizbarkeit. Selbstfürsorge und Stressbewältigung sind wie Hähne am Fass, die helfen, Wasser abzulassen, bevor es überläuft.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'belastung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Definition und Bedeutung', 'Die Belastungsgrenze markiert die Schwelle, an der die Summe aller Stressoren und Anforderungen die Bewältigungsfähigkeiten einer Person übersteigt. Sie ist individuell unterschiedlich und kann sich je nach Lebensumständen, körperlicher und psychischer Verfassung sowie vorhandenen Ressourcen verschieben. Das Überschreiten der Belastungsgrenze führt typischerweise zu Symptomen wie Erschöpfung, emotionaler Überforderung, Reizbarkeit oder sogar zu einem Zusammenbruch.', 'content', 0
FROM public.glossary_terms WHERE slug = 'belastungsgrenze';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Anzeichen für das Erreichen der Belastungsgrenze', 'Das Erreichen der persönlichen Belastungsgrenze kündigt sich oft durch verschiedene Warnsignale an: anhaltende Erschöpfung trotz ausreichend Schlaf, erhöhte Reizbarkeit und emotionale Reaktivität, Konzentrationsschwierigkeiten, körperliche Symptome wie Kopf- oder Rückenschmerzen, verminderte Leistungsfähigkeit, sozialer Rückzug oder das Gefühl, den Alltag nicht mehr bewältigen zu können. Diese Anzeichen ernst zu nehmen ist wichtig, um einem Burnout vorzubeugen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'belastungsgrenze';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Umgang mit der eigenen Belastungsgrenze', 'Ein gesunder Umgang mit der eigenen Belastungsgrenze erfordert Selbsterkenntnis und die Bereitschaft, Grenzen zu respektieren. Dazu gehört, die eigenen Warnsignale zu kennen, realistische Einschätzungen der eigenen Kapazitäten vorzunehmen, bei Bedarf Unterstützung zu suchen oder anzunehmen und Prioritäten zu setzen. Regelmäßige Selbstfürsorge, Stressbewältigungstechniken und das Erlernen von Nein-Sagen können helfen, die Belastungsgrenze zu respektieren und Überlastung zu vermeiden.', 'content', 2
FROM public.glossary_terms WHERE slug = 'belastungsgrenze';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die Gummiband-Analogie', 'Die Belastungsgrenze kann mit einem Gummiband verglichen werden. Es kann gedehnt werden und kehrt normalerweise in seine ursprüngliche Form zurück. Wird es jedoch zu stark oder zu lange gedehnt, verliert es seine Elastizität oder reißt schließlich. Ähnlich verhält es sich mit Menschen: Kurzfristige Belastungen können oft gut bewältigt werden, aber chronische Überdehnung führt zu nachlassender Resilienz und schließlich zum ''Reißen'' - dem Zusammenbruch.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'belastungsgrenze';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Benehmen und soziale Erwartungen', 'Benehmen bezieht sich auf das sichtbare Verhalten einer Person und dessen Übereinstimmung mit sozialen Normen und Erwartungen. Was als ''gutes'' oder ''schlechtes'' Benehmen gilt, ist stark kulturell und kontextuell geprägt und unterliegt einem stetigen Wandel. In der Erziehung ist die Vermittlung von sozial akzeptablem Benehmen ein zentrales Anliegen, wobei Kinder lernen, ihr Verhalten an unterschiedliche soziale Situationen anzupassen.', 'content', 0
FROM public.glossary_terms WHERE slug = 'benehmen';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Herausforderungen bei ADHS', 'Kinder mit ADHS haben oft Schwierigkeiten mit ihrem Benehmen, da ihre Impulsivität, Hyperaktivität und Aufmerksamkeitsprobleme es ihnen erschweren, soziale Regeln zu verstehen und einzuhalten. Sie handeln oft, bevor sie denken, unterbrechen andere oder haben Schwierigkeiten, still zu sitzen und ruhig zu bleiben. Diese Verhaltensweisen sind nicht absichtlich oder boshaft, sondern Ausdruck ihrer Störung.', 'content', 1
FROM public.glossary_terms WHERE slug = 'benehmen';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Unterstützung bei Verhaltensauffälligkeiten', 'Bei Kindern mit Verhaltensauffälligkeiten ist es wichtig, klare Regeln und Strukturen zu schaffen, angemessenes Verhalten zu loben und unangemessenes Verhalten konsequent, aber verständnisvoll zu begrenzen. Dabei sollte man zwischen dem Kind und seinem Verhalten unterscheiden: Nicht das Kind ist ''schlecht'', sondern bestimmte Verhaltensweisen sind unangemessen. Eine positive Verstärkung erwünschten Verhaltens ist oft wirksamer als Bestrafung.', 'content', 2
FROM public.glossary_terms WHERE slug = 'benehmen';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der soziale Kompass', 'Benehmen kann mit einem sozialen Kompass verglichen werden, der uns hilft, uns in der Gesellschaft zu orientieren. Kinder müssen lernen, diesen Kompass zu lesen und zu nutzen, um in verschiedenen sozialen Situationen angemessen zu navigieren. Kinder mit ADHS haben manchmal einen Kompass, der ungenau ist oder dessen Nadel zu schnell schwingt, was es ihnen schwerer macht, den richtigen Weg zu finden.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'benehmen';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Charakteristika professioneller Beratung', 'Professionelle Beratung ist ein zeitlich begrenzter, zielgerichteter Prozess, der darauf abzielt, Menschen bei der Lösung spezifischer Probleme, bei Entscheidungsfindungen oder bei persönlichen Entwicklungsprozessen zu unterstützen. Anders als in der Therapie geht es in der Beratung weniger um tiefgreifende psychische Probleme, sondern eher um konkrete Fragestellungen und Herausforderungen. Beratung ist ressourcen- und lösungsorientiert, wobei die Beratenden ihr Fachwissen und ihre methodischen Kompetenzen nutzen, um den Ratsuchenden zu eigenständigen Lösungen zu verhelfen.', 'content', 0
FROM public.glossary_terms WHERE slug = 'beratung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Beratungsangebote für Eltern', 'Für Eltern gibt es vielfältige Beratungsangebote, die von Erziehungsberatung über Familienberatung bis hin zu spezifischen Angeboten für Eltern von Kindern mit ADHS oder Essstörungen reichen. Diese Angebote können von öffentlichen Trägern wie Jugendämtern, Beratungsstellen oder Familienbildungsstätten, aber auch von freien Trägern, Selbsthilfeorganisationen oder Privatpraxen angeboten werden. Die Beratung kann in Form von Einzelgesprächen, Paargesprächen, Familiengesprächen oder auch in Gruppenformaten stattfinden und ist oft kostenlos oder kostengünstig zugänglich.', 'content', 1
FROM public.glossary_terms WHERE slug = 'beratung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Unterschied zwischen Beratung und Therapie', 'Während Beratung und Therapie ähnliche Methoden und Ansätze verwenden können, unterscheiden sie sich in Umfang, Tiefe und Zielsetzung. Beratung ist in der Regel zeitlich begrenzter (wenige Sitzungen bis einige Monate), fokussiert auf konkrete Themen oder Probleme und zielt auf Klärung, Orientierung und Handlungsbefähigung ab. Therapie hingegen ist meist längerfristig angelegt, befasst sich mit tieferliegenden psychischen Prozessen und zielt auf umfassendere Veränderungen der Persönlichkeit oder auf die Behandlung psychischer Störungen ab. Die Übergänge können jedoch fließend sein, und manche Beratungsprozesse können in therapeutische Prozesse übergehen oder diese ergänzen.', 'content', 2
FROM public.glossary_terms WHERE slug = 'beratung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der Wegweiser am Kreuzungspunkt', 'Beratung kann mit einem Wegweiser an einer komplexen Kreuzung verglichen werden. Der Ratsuchende steht vor verschiedenen möglichen Wegen, unsicher, welche Richtung die richtige ist. Der Berater ist wie ein ortskundiger Helfer, der die verschiedenen Wege kennt, ihre Vor- und Nachteile erläutern kann und vielleicht sogar eine Karte zur Verfügung stellt. Die Entscheidung, welchen Weg man nimmt, und das Gehen selbst bleiben jedoch die Aufgabe des Ratsuchenden. Der Berater begleitet nur ein Stück des Weges, gibt Orientierung und stärkt die Fähigkeit, auch zukünftige Kreuzungen selbständig zu meistern.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'beratung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Trauer als natürliche Reaktion', 'Trauer ist eine natürliche und notwendige emotionale Reaktion auf Verluste. Sie kann sich auf vielfältige Weise äußern – emotional (z.B. durch Schmerz, Wut, Schuldgefühle), kognitiv (z.B. durch Gedankenkreisen, Sinnsuche), physisch (z.B. durch Erschöpfung, Schlafstörungen) und verhaltensbezogen (z.B. durch sozialen Rückzug, Vermeidungsverhalten). Jeder Mensch trauert individuell, und es gibt kein ''richtiges'' oder ''falsches'' Trauern. Der Trauerprozess verläuft nicht linear, sondern in Wellen, mit guten und schlechten Tagen, und kann Jahre dauern.', 'content', 0
FROM public.glossary_terms WHERE slug = 'bereavement';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Trauerphasen und Trauerarbeit', 'Obwohl Trauer individuell verläuft, werden oft Phasenmodelle zur Beschreibung herangezogen. Ein bekanntes Modell stammt von Elisabeth Kübler-Ross und beschreibt fünf Phasen: Verleugnung, Wut, Verhandeln, Depression und Akzeptanz. Moderne Ansätze betonen jedoch die Nichtlinearität dieser Phasen und die Individualität des Prozesses. Trauerarbeit bezeichnet die aktive Auseinandersetzung mit dem Verlust und kann durch Rituale, das Teilen von Erinnerungen, kreative Ausdrucksformen oder Gespräche unterstützt werden. Ziel ist nicht das ''Überwinden'' der Trauer, sondern das Integrieren des Verlustes in die eigene Lebensgeschichte.', 'content', 1
FROM public.glossary_terms WHERE slug = 'bereavement';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Komplizierte Trauer und Unterstützungsmöglichkeiten', 'Von komplizierter oder pathologischer Trauer spricht man, wenn der Trauerprozess dauerhaft blockiert ist oder so intensiv bleibt, dass eine Anpassung an die neue Realität nicht möglich ist. Dies kann sich durch anhaltende intensive Sehnsucht, Nicht-Akzeptieren des Verlusts, starke Schuldgefühle oder Selbstvorwürfe, soziale Isolation oder Vermeidung von Erinnerungen äußern. Unterstützung bei Trauerprozessen kann durch das soziale Umfeld, Selbsthilfegruppen, Trauerbegleitung oder Therapie erfolgen. Besonders bei komplizierter Trauer kann professionelle Hilfe wichtig sein, um wieder eine Perspektive zu entwickeln.', 'content', 2
FROM public.glossary_terms WHERE slug = 'bereavement';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die Trauer als zweites Leben', 'Trauer kann als ein paralleles Leben betrachtet werden, das nach einem bedeutenden Verlust neben unserem gewöhnlichen Leben entsteht. Anfangs nimmt dieses ''zweite Leben'' fast allen Raum ein, es ist überwältigend und verdrängt alles andere. Mit der Zeit lernen wir jedoch, beide Leben zu führen – das äußere, alltägliche Leben und das innere Leben der Trauer. Das Trauerleben wird nicht kleiner, aber unser Alltag wächst wieder um es herum, wie ein Baum, der um eine Verletzung herum weiterwächst. Die Trauer bleibt, wird Teil von uns, aber sie definiert nicht mehr unser gesamtes Sein.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'bereavement';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Besserung im Therapieprozess', 'Im therapeutischen Kontext bezeichnet Besserung eine Verringerung von Symptomen oder problematischen Verhaltensweisen und eine Zunahme von Wohlbefinden und Funktionsfähigkeit. Wichtig ist dabei, dass Besserung oft kein geradliniger Prozess ist, sondern mit Höhen und Tiefen, Rückschlägen und Fortschritten verbunden sein kann. Bei der Behandlung von psychischen Erkrankungen wie Depressionen, Burnout, ADHS oder Essstörungen kann eine Besserung an subjektiven Kriterien (wie verbessertes Wohlbefinden), an objektiven Kriterien (wie Symptomreduktion) oder an funktionalen Kriterien (wie verbesserte soziale oder berufliche Funktionsfähigkeit) gemessen werden.', 'content', 0
FROM public.glossary_terms WHERE slug = 'besserung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Faktoren, die Besserung beeinflussen', 'Zahlreiche Faktoren können eine Besserung fördern oder behindern. Zu den förderlichen Faktoren gehören unter anderem eine tragfähige therapeutische Beziehung, soziale Unterstützung, Motivation zur Veränderung, Selbstwirksamkeitserleben und angemessene Bewältigungsstrategien. Hinderliche Faktoren können sein: anhaltende Stressoren, fehlende soziale Unterstützung, komorbide Erkrankungen, ungünstige Umweltbedingungen oder maladaptive Denk- und Verhaltensmuster. Die Wechselwirkung dieser Faktoren bestimmt oft den Verlauf und die Geschwindigkeit der Besserung.', 'content', 1
FROM public.glossary_terms WHERE slug = 'besserung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Besserung aus elterlicher Perspektive', 'Für Eltern ist die Besserung ihres Kindes – sei es bei ADHS, Essstörungen oder anderen Herausforderungen – oft ein zentrales Anliegen und Hoffnungsträger. Dabei ist es wichtig, realistische Erwartungen zu haben und kleine Fortschritte wahrzunehmen und wertzuschätzen. Besserung kann sich auf verschiedenen Ebenen zeigen: in der Symptomatik des Kindes, in seinem Wohlbefinden, in seinen sozialen Beziehungen oder in der Familiendynamik insgesamt. Auch die Besserung der eigenen elterlichen Befindlichkeit, etwa bei Eltern-Burnout, ist ein wichtiger Aspekt, der oft mit der Besserung des Kindes zusammenhängt.', 'content', 2
FROM public.glossary_terms WHERE slug = 'besserung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die Spirale der Besserung', 'Besserung lässt sich mit einer aufwärts führenden Spirale vergleichen. Von außen betrachtet scheint man manchmal im Kreis zu gehen oder sogar zurückzufallen, doch tatsächlich bewegt man sich auf einer höheren Ebene. Was wie ein Rückfall in alte Muster aussieht, ist oft in Wirklichkeit ein ähnliches Problem auf einer neuen, komplexeren Ebene. Jede ''Runde'' der Spirale bringt neue Erkenntnisse und Fähigkeiten mit sich, auch wenn es sich zeitweise anfühlt, als käme man nicht voran. Die Spirale kann durch Rückschläge kurzzeitig nach unten führen, doch mit jeder erfolgreichen Bewältigung festigt sich der Weg nach oben.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'besserung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Bewegungsdrang bei ADHS', 'Bei ADHS ist der Bewegungsdrang (motorische Hyperaktivität) eines der Kernsymptome und geht über das normale, altersgerechte Maß an Bewegungsbedürfnis hinaus. Betroffene Kinder haben Schwierigkeiten, stillzusitzen, zappeln häufig mit Händen oder Füßen, rutschen auf dem Stuhl herum, stehen in Situationen auf, in denen Sitzenbleiben erwartet wird, laufen oder klettern exzessiv in unpassenden Situationen, oder haben Schwierigkeiten, ruhig zu spielen. Dieser gesteigerte Bewegungsdrang resultiert aus neurologischen Besonderheiten in der Impulskontrolle und Selbstregulation und ist nicht Ausdruck von mangelnder Disziplin oder schlechter Erziehung.', 'content', 0
FROM public.glossary_terms WHERE slug = 'bewegungsdrang';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Unterschied zwischen normalem und auffälligem Bewegungsdrang', 'Ein gewisses Maß an Bewegungsdrang ist bei allen Kindern normal und wichtig für ihre Entwicklung. Der Unterschied liegt in der Intensität, Dauer und Situationsangemessenheit. Bei ADHS ist der Bewegungsdrang oft so stark, dass er die altersangemessene Teilnahme an strukturierten Aktivitäten (wie Unterricht) wesentlich beeinträchtigt. Zudem kann er auch in Situationen auftreten, in denen andere Kinder problemlos zur Ruhe kommen können. Bei der Bewertung sollten immer Alter, Entwicklungsstand und Kontext berücksichtigt werden, da jüngere Kinder naturgemäß einen höheren Bewegungsdrang haben als ältere.', 'content', 1
FROM public.glossary_terms WHERE slug = 'bewegungsdrang';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Umgang mit starkem Bewegungsdrang', 'Für Eltern und Pädagogen ist es wichtig, einen konstruktiven Umgang mit dem Bewegungsdrang zu finden, statt ihn nur unterdrücken zu wollen. Hilfreich sind regelmäßige Bewegungspausen, die Integration von Bewegung in Lernaktivitäten, Sport und Freizeitaktivitäten mit viel Bewegung, sowie klare Strukturen und Routinen, die Zeiten für Bewegung und Zeiten für Konzentration definieren. Auch die Gestaltung der Umgebung kann unterstützend wirken, etwa durch Sitzmöglichkeiten, die Bewegung erlauben (Sitzbälle, Stehpulte). Bei manchen Kindern kann auch eine medikamentöse Behandlung der ADHS den Bewegungsdrang auf ein handhabbares Maß reduzieren.', 'content', 2
FROM public.glossary_terms WHERE slug = 'bewegungsdrang';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der innere Motor', 'Den Bewegungsdrang bei ADHS kann man mit einem Motor vergleichen, der ständig auf hohen Touren läuft und sich nicht abschalten lässt. Während die meisten Menschen ihren ''Motor'' je nach Situation hoch- oder runterfahren können, scheint bei Menschen mit ADHS der Gashebel festzuklemmen. Der Motor läuft immer mit Vollgas, selbst wenn die Situation Leerlauf erfordern würde. Diese ständige innere Unruhe und der Drang nach Bewegung können für die Betroffenen selbst sehr anstrengend sein, da sie gegen etwas ankämpfen, das sie nicht willentlich kontrollieren können.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'bewegungsdrang';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Arten von Bewältigungsstrategien', 'Bewältigungsstrategien können in verschiedene Kategorien eingeteilt werden. Problemfokussierte Strategien zielen darauf ab, das Problem direkt anzugehen und zu lösen (z.B. Informationssuche, Planung, aktives Handeln). Emotionsfokussierte Strategien helfen, die emotionale Reaktion auf ein Problem zu regulieren (z.B. Entspannungstechniken, Akzeptanz, positives Umdeuten). Vermeidungsstrategien versuchen, dem Problem oder den damit verbundenen Gefühlen auszuweichen (z.B. Ablenkung, Verleugnung, Substanzkonsum). Soziale Strategien nutzen zwischenmenschliche Beziehungen zur Unterstützung (z.B. Rat suchen, sich mitteilen, Hilfe annehmen).', 'content', 0
FROM public.glossary_terms WHERE slug = 'bewaeltigungsstrategien';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Funktionale und dysfunktionale Bewältigungsstrategien', 'Ob eine Bewältigungsstrategie funktional oder dysfunktional ist, hängt vom Kontext, der Situation und den langfristigen Folgen ab. Kurzfristig kann eine Strategie entlastend wirken, langfristig aber problematisch sein (z.B. kann Alkoholkonsum kurzfristig entspannen, langfristig aber zu Abhängigkeit führen). Funktionale Strategien tragen zur nachhaltigen Problemlösung bei und fördern das psychische Wohlbefinden. Dysfunktionale Strategien verschärfen das Problem oft langfristig oder schaffen neue Probleme. Eine flexible Anpassung der Strategien an unterschiedliche Situationen ist meist am effektivsten.', 'content', 1
FROM public.glossary_terms WHERE slug = 'bewaeltigungsstrategien';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Bewältigungsstrategien in spezifischen Kontexten', 'Bei Eltern-Burnout können hilfreiche Bewältigungsstrategien sein: Prioritäten setzen, Selbstfürsorge praktizieren, Unterstützung suchen, realistische Erwartungen entwickeln und Grenzen setzen. Bei ADHS können strukturierende Maßnahmen, Routinen, Bewegung, externe Erinnerungshilfen und spezifische Arbeitsstrategien hilfreich sein. Im Kontext von Essstörungen können achtsamkeitsbasierte Ansätze, Emotionsregulationstechniken, die Arbeit an verzerrten Körperbildern und alternative Stressbewältigungsmethoden wichtige Bewältigungsstrategien darstellen.', 'content', 2
FROM public.glossary_terms WHERE slug = 'bewaeltigungsstrategien';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das Werkzeug-Set', 'Bewältigungsstrategien können mit einem Werkzeugkasten verglichen werden. Jedes Werkzeug (jede Strategie) ist für bestimmte Aufgaben gut geeignet, für andere weniger. Ein Hammer ist perfekt, um einen Nagel einzuschlagen, aber ungeeignet, um eine Schraube zu drehen. Ähnlich kann eine bestimmte Bewältigungsstrategie in einer Situation hilfreich sein, in einer anderen jedoch unwirksam oder sogar kontraproduktiv. Je vielfältiger der Werkzeugkasten, desto besser kann man auf unterschiedliche Herausforderungen reagieren. Manche Menschen haben nur wenige Werkzeuge und versuchen dann, alle Probleme mit demselben Werkzeug zu lösen – ähnlich wie jemand, der nur einen Hammer besitzt und alles als Nagel betrachtet.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'bewaeltigungsstrategien';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Beziehungsformen und ihre Bedeutung', 'Beziehungen können vielfältige Formen annehmen – familiäre Beziehungen, Freundschaften, romantische Partnerschaften, berufliche Beziehungen oder therapeutische Beziehungen. Jede Form hat ihre eigenen Charakteristika und Dynamiken. Gesunde Beziehungen sind geprägt durch gegenseitigen Respekt, Vertrauen, Unterstützung, Kommunikation, Konfliktfähigkeit und die Balance zwischen Nähe und Autonomie. Sie bieten emotionale Sicherheit, soziale Unterstützung und Raum für persönliches Wachstum. Beziehungserfahrungen prägen unsere Persönlichkeit, unser Selbstbild und unsere Fähigkeit, mit anderen Menschen in Kontakt zu treten.', 'content', 0
FROM public.glossary_terms WHERE slug = 'beziehung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Eltern-Kind-Beziehung', 'Die Eltern-Kind-Beziehung ist eine der prägendsten Beziehungen im menschlichen Leben. In der frühen Kindheit bildet sie die Grundlage für die Entwicklung von Bindungssicherheit, die wiederum die spätere Beziehungsfähigkeit stark beeinflusst. In der Pubertät verändert sich diese Beziehung, wenn Jugendliche mehr Autonomie anstreben, was oft zu Konflikten führen kann. Bei Kindern mit ADHS kann die Eltern-Kind-Beziehung durch die Symptomatik zusätzlich belastet sein, etwa durch häufige Konflikte um Regeln, Hausaufgaben oder Alltagsstruktur. Eine positive, unterstützende Eltern-Kind-Beziehung kann jedoch einen wichtigen Schutzfaktor darstellen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'beziehung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Beziehungen im Kontext von psychischen Belastungen', 'Psychische Belastungen wie Burnout, ADHS oder Essstörungen können Beziehungen stark beeinflussen und von ihnen beeinflusst werden. Bei Eltern-Burnout sind oft die familiären Beziehungen belastet – durch Reizbarkeit, emotionale Erschöpfung oder Gefühle der Entfremdung. Bei Essstörungen können gestörte Körperwahrnehmung und Schamgefühle zu sozialem Rückzug und Beziehungsproblemen führen. Umgekehrt können unterstützende Beziehungen eine wichtige Ressource bei der Bewältigung dieser Herausforderungen sein. In der Therapie dieser Störungen ist daher die Berücksichtigung und gegebenenfalls Stärkung des sozialen Netzwerks oft ein wichtiger Baustein.', 'content', 2
FROM public.glossary_terms WHERE slug = 'beziehung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der Beziehungstanz', 'Beziehungen können mit einem Tanz verglichen werden, bei dem beide Partner aufeinander eingehen, sich anpassen und gemeinsam bewegen. Wie beim Tanzen gibt es Momente der perfekten Harmonie, aber auch Situationen, in denen man sich auf die Füße tritt. Manchmal führt einer, dann wieder der andere; mal bewegt man sich im gleichen Rhythmus, mal muss man sich neu aufeinander einstimmen. Eine gute Beziehung erfordert, wie ein gelungener Tanz, Aufmerksamkeit füreinander, Flexibilität, nonverbale Kommunikation und die Bereitschaft, aus Fehlern zu lernen und es immer wieder neu zu versuchen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'beziehung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Definition und Charakteristika', 'Ein Binge-Eating-Anfall (Essanfall) ist definiert als das Verzehren einer ungewöhnlich großen Nahrungsmenge innerhalb eines begrenzten Zeitraums (meist weniger als zwei Stunden), verbunden mit einem Gefühl des Kontrollverlusts während des Essens. Das Essen erfolgt typischerweise schneller als normal, bis zu einem unangenehmen Völlegefühl, auch ohne körperlichen Hunger. Oft werden die Mahlzeiten allein eingenommen, da Schamgefühle bezüglich der verzehrten Menge bestehen. Nach einem Essanfall treten häufig Gefühle von Ekel gegenüber sich selbst, Depressionen oder große Schuldgefühle auf.', 'content', 0
FROM public.glossary_terms WHERE slug = 'binge-eating';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Unterschied zu normalem Überessen', 'Gelegentliches Überessen (z.B. bei Festen oder besonderen Anlässen) ist normal und unterscheidet sich von Binge Eating. Der Hauptunterschied liegt im Kontrollverlust und der emotionalen Belastung. Während normales Überessen oft sozial eingebettet und genussvoll ist, sind Essanfälle typischerweise von negativen Gefühlen begleitet und finden heimlich statt. Zudem sind Essanfälle bei einer Essstörung wiederkehrend und nicht nur gelegentlich. Die subjektive Erfahrung des Kontrollverlusts – das Gefühl, nicht aufhören zu können, selbst wenn man möchte – ist ein charakteristisches Merkmal von Binge Eating.', 'content', 1
FROM public.glossary_terms WHERE slug = 'binge-eating';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Auslöser und therapeutische Ansätze', 'Essanfälle können durch verschiedene Faktoren ausgelöst werden, darunter emotionaler Stress, Hunger durch restriktives Essverhalten, negative Körperwahrnehmung oder als Bewältigungsmechanismus für schwierige Gefühle. Die Behandlung umfasst verschiedene Ansätze: Die kognitive Verhaltenstherapie zielt darauf ab, dysfunktionale Gedanken über Essen, Gewicht und Körperbild zu identifizieren und zu verändern. Ernährungsberatung kann helfen, ein regelmäßiges, ausgewogenes Essverhalten zu etablieren. Achtsamkeitsbasierte Ansätze fördern die bewusste Wahrnehmung von Hunger- und Sättigungssignalen sowie emotionalen Zuständen. Bei zugrundeliegenden psychischen Erkrankungen wie Depressionen kann auch eine medikamentöse Behandlung erwogen werden.', 'content', 2
FROM public.glossary_terms WHERE slug = 'binge-eating';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der emotionale Tsunami', 'Ein Essanfall kann mit einem emotionalen Tsunami verglichen werden. Am Anfang steht oft eine Welle negativer Gefühle, die immer höher wird. Das Essen dient als verzweifelter Versuch, diese Welle aufzuhalten oder zu überstehen – als würde man sich an einem Stück Treibholz festklammern. Während des Essanfalls gibt es einen kurzen Moment der Erleichterung, eine Art emotionale Betäubung. Doch wie ein Tsunami hinterlässt die Welle, wenn sie vorüber ist, Verwüstung – in Form von Scham, Schuld und Selbstvorwürfen. Diese negativen Gefühle können dann wieder die nächste Welle aufbauen, wodurch ein Teufelskreis entsteht. Therapeutische Arbeit zielt darauf ab, bessere ''Frühwarnsysteme'' zu entwickeln und konstruktivere Wege zu finden, mit dem emotionalen ''Wetter'' umzugehen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'binge-eating';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Diagnosepkriterien und Charakteristika', 'Die Binge-Eating-Störung (BES) ist seit 2013 als eigenständige Diagnose im DSM-5 anerkannt. Charakteristisch sind wiederholte Episoden von Essanfällen, bei denen in einem begrenzten Zeitraum (z.B. innerhalb von zwei Stunden) eine größere Nahrungsmenge verzehrt wird, als die meisten Menschen unter ähnlichen Umständen essen würden, verbunden mit einem Gefühl des Kontrollverlusts. Diese Essanfälle sind mit mindestens drei der folgenden Merkmale verbunden: deutlich schneller essen als normal, essen bis zu einem unangenehmen Völlegefühl, große Nahrungsmengen essen ohne körperlichen Hunger, allein essen aus Scham, sowie Ekel, Depressionen oder Schuldgefühle nach dem Essen. Die Essanfälle verursachen deutliches Leiden und treten mindestens einmal wöchentlich über drei Monate auf.', 'content', 0
FROM public.glossary_terms WHERE slug = 'binge-eating-stoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Abgrenzung zu anderen Essstörungen', 'Der Hauptunterschied zwischen BES und Bulimia Nervosa liegt im Fehlen regelmäßiger kompensatorischer Verhaltensweisen wie selbstinduziertes Erbrechen, Missbrauch von Abführmitteln oder exzessiven Sport nach Essanfällen. Im Gegensatz zur Anorexia Nervosa steht bei der BES nicht das Streben nach Gewichtsverlust im Vordergrund, obwohl Betroffene oft unzufrieden mit ihrem Körper sind. BES kann mit Normalgewicht auftreten, ist aber häufig mit Übergewicht oder Adipositas verbunden, während Anorexie typischerweise mit Untergewicht einhergeht.', 'content', 1
FROM public.glossary_terms WHERE slug = 'binge-eating-stoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Behandlungsansätze und Prognose', 'Die Behandlung der Binge-Eating-Störung umfasst verschiedene Ansätze, wobei die kognitive Verhaltenstherapie (KVT) als Methode der Wahl gilt. Ziele sind die Normalisierung des Essverhaltens, die Verbesserung der Selbstwahrnehmung und die Entwicklung alternativer Bewältigungsstrategien für negative Emotionen. Auch interpersonelle Psychotherapie, dialektisch-behaviorale Therapie und achtsamkeitsbasierte Interventionen zeigen gute Erfolge. Bei komorbiden psychischen Störungen wie Depression kann eine medikamentöse Behandlung erwogen werden. Selbsthilfegruppen können eine wertvolle Ergänzung darstellen. Die Prognose ist bei adäquater Behandlung vergleichsweise gut, wobei etwa 50-60% der Betroffenen eine vollständige Remission der Essanfälle erreichen können. Herausfordernd bleibt oft die langfristige Aufrechterhaltung eines gesunden Essverhaltens.', 'content', 2
FROM public.glossary_terms WHERE slug = 'binge-eating-stoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der Gefühlswellenkompensator', 'Die Binge-Eating-Störung kann als eine Art emotionaler Druckausgleichsmechanismus verstanden werden, ähnlich einem Schnellkochtopf ohne funktionierende Ventile. Innere Spannungen, unangenehme Gefühle oder Stress bauen sich auf, ohne dass gesunde Wege gefunden werden, diesen ''Druck'' abzulassen. Das unkontrollierte Essen wird zum Ersatzventil – es verschafft kurzfristig Erleichterung, indem es negative Emotionen durch den Fokus auf das Essen zeitweise überdeckt. Doch anders als ein echtes Ventil, das den Druck sicher ablässt, führen Essanfälle zu neuen Problemen (Scham, Schuldgefühle), die den inneren Druck letztlich wieder erhöhen. Therapie zielt darauf ab, gesündere ''Druckventile'' zu installieren und den grundlegenden emotionalen ''Dampfkessel'' besser zu regulieren.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'binge-eating-stoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Bockigkeit als Entwicklungsphase', 'Bockiges Verhalten ist besonders in bestimmten Entwicklungsphasen wie der Trotzphase (ca. 2-3 Jahre) oder der Pubertät normal und sogar wichtig für die Entwicklung von Autonomie und Selbstständigkeit. Kinder testen in diesen Phasen Grenzen aus und entwickeln ein Gefühl für ihre eigene Identität und Handlungsfähigkeit. Bockigkeit äußert sich durch Verweigerung, verbales ''Nein'', ignorieren von Aufforderungen, Wutausbrüche oder passiven Widerstand. Diese Verhaltensweisen können für Eltern herausfordernd sein, sind aber meist vorübergehend und Teil einer gesunden Entwicklung.', 'content', 0
FROM public.glossary_terms WHERE slug = 'bockig';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Bockigkeit versus oppositionelles Verhalten', 'Es ist wichtig, normale entwicklungsbedingte Bockigkeit von klinisch relevanten Verhaltensauffälligkeiten wie der oppositionellen Trotzstörung zu unterscheiden. Bei letzterer sind trotziges Verhalten, Wut und Feindseligkeit übermäßig stark ausgeprägt, anhaltend (mindestens 6 Monate) und führen zu erheblichen Beeinträchtigungen im Alltag. Während gelegentliche Bockigkeit normal ist, deutet ein konstantes Muster von aggressivem, verweigerndem Verhalten in verschiedenen Situationen eher auf eine Störung hin. Insbesondere bei Kindern mit ADHS tritt oppositionelles Verhalten häufiger auf, was die Familiendynamik zusätzlich belasten kann.', 'content', 1
FROM public.glossary_terms WHERE slug = 'bockig';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Umgang mit bockigem Verhalten', 'Ein konstruktiver Umgang mit bockigem Verhalten umfasst mehrere Aspekte: Zunächst ist es wichtig, ruhig zu bleiben und nicht in Machtkämpfe einzusteigen, da diese die Situation meist verschlimmern. Klare, altersgerechte Grenzen und Konsequenzen sollten konsistent kommuniziert und durchgesetzt werden. Gleichzeitig sollte dem Kind ein angemessenes Maß an Autonomie und Mitbestimmung ermöglicht werden. Positive Verstärkung erwünschten Verhaltens ist oft wirksamer als Bestrafung unerwünschten Verhaltens. Bei anhaltenden Problemen kann es hilfreich sein, die Ursachen des Verhaltens zu analysieren: Ist das Kind überfordert? Sucht es Aufmerksamkeit? Hat es Schwierigkeiten, seine Emotionen zu regulieren? Diese Einsichten können helfen, gezielter zu reagieren.', 'content', 2
FROM public.glossary_terms WHERE slug = 'bockig';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die Wurzel und der junge Baum', 'Bockiges Verhalten kann mit dem Wachstumsprozess eines jungen Baumes verglichen werden. So wie ein Baum Wurzeln entwickeln muss, um standfest zu werden, muss ein Kind lernen, einen eigenen Standpunkt zu entwickeln und zu vertreten. Manchmal wachsen diese Wurzeln zunächst in alle Richtungen und erscheinen chaotisch – ähnlich wie bockiges Verhalten zunächst ungerichtet und überschießend wirken kann. Doch mit der richtigen Unterstützung und Führung – wie ein Gärtner, der dem jungen Baum eine Stütze gibt, ohne sein Wachstum zu behindern – kann das Kind lernen, seinen Willen konstruktiv einzusetzen und seine Autonomie in sozial verträglicher Weise auszudrücken.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'bockig';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Symptomatik und Diagnosekriterien', 'Die körperdysmorphe Störung (Body Dysmorphic Disorder, BDD) ist durch eine übermäßige Beschäftigung mit wahrgenommenen Defekten oder Mängeln im äußeren Erscheinungsbild charakterisiert, die für andere nicht sichtbar oder nur geringfügig erscheinen. Diese Bedenken können sich auf verschiedene Körperteile beziehen, am häufigsten auf Haut, Haare oder Gesichtsmerkmale wie Nase, Augen oder Lippen. Betroffene verbringen oft viele Stunden täglich mit Gedanken an ihre vermeintlichen Makel und entwickeln wiederholte Verhaltensweisen wie übermäßiges Überprüfen im Spiegel, übertriebene Körperpflege, Hautmanipulation oder ständiges Vergleichen mit anderen. Die Beschäftigung mit dem Makel verursacht klinisch bedeutsamen Leidensdruck und Beeinträchtigungen im sozialen, beruflichen oder anderen wichtigen Funktionsbereichen.', 'content', 0
FROM public.glossary_terms WHERE slug = 'body-dysmorphic-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Abgrenzung zu Essstörungen', 'Obwohl sowohl BDD als auch Essstörungen mit einem gestörten Körperbild einhergehen können, gibt es wichtige Unterschiede: Bei Essstörungen steht die Sorge um Gewicht und Figur im Vordergrund, was sich in gestörtem Essverhalten äußert. Bei BDD fokussieren sich die Bedenken oft auf spezifische Körperteile oder -merkmale, die nicht unbedingt mit dem Gewicht zusammenhängen. Allerdings können beide Störungen koexistieren, und die Grenzen können fließend sein. Eine differenzierte Diagnostik ist wichtig, da sich die Behandlungsansätze teilweise unterscheiden. Wenn sich die Bedenken bei BDD ausschließlich auf das Körpergewicht oder die Figur beziehen, wird in der Regel eher eine Essstörung diagnostiziert.', 'content', 1
FROM public.glossary_terms WHERE slug = 'body-dysmorphic-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Behandlungsansätze', 'Die Behandlung der körperdysmorphen Störung umfasst primär psychotherapeutische Ansätze, wobei die kognitive Verhaltenstherapie als Methode der ersten Wahl gilt. Zentrale Elemente sind die kognitive Umstrukturierung verzerrter Gedanken und Überzeugungen bezüglich des Aussehens, Expositionsübungen (z.B. sich ohne Kaschierungsversuche in sozialen Situationen zeigen) und der Abbau von Sicherheits- und Kontrollverhalten wie übermäßiges Spiegelschauen. Bei schweren Verläufen können zusätzlich selektive Serotonin-Wiederaufnahmehemmer (SSRI) eingesetzt werden. Die Behandlung erfordert oft Geduld, da die verzerrte Körperwahrnehmung tief verankert sein kann und die Krankheitseinsicht manchmal eingeschränkt ist.', 'content', 2
FROM public.glossary_terms WHERE slug = 'body-dysmorphic-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das verzerrte Spiegelbild', 'Die körperdysmorphe Störung kann mit dem Phänomen eines Zerr­spiegels verglichen werden, wie man sie auf Jahrmärkten findet. Während andere Menschen den Betroffenen durch einen normalen Spiegel sehen und ein unverzerrtes Bild wahrnehmen, blickt der Betroffene selbst durch einen Zerrspiegel, der bestimmte Merkmale dramatisch vergrößert oder verzerrt darstellt. Was für andere kaum wahrnehmbar ist, erscheint im Zerrspiegel des eigenen Bewusstseins als massiver Makel. Das Problem liegt nicht im tatsächlichen Aussehen, sondern im ''Spiegel'' – der inneren Wahrnehmung und Bewertung des eigenen Körpers. Therapie zielt darauf ab, diesen verzerrenden Spiegel durch einen realistischeren zu ersetzen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'body-dysmorphic-disorder';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Komponenten des Körperbildes', 'Das Körperbild setzt sich aus mehreren Komponenten zusammen: Die perzeptive Komponente betrifft die Wahrnehmung der eigenen Körperform und -größe, die oft von der Realität abweichen kann. Die kognitive Komponente umfasst Gedanken und Überzeugungen über den eigenen Körper. Die affektive Komponente bezieht sich auf Gefühle gegenüber dem eigenen Körper, wie Zufriedenheit oder Unzufriedenheit. Die behaviorale Komponente schließlich beinhaltet Verhaltensweisen, die aus dem Körperbild resultieren, wie Vermeidung bestimmter Situationen, übermäßiges Überprüfen oder Kaschieren des Körpers. Ein gesundes Körperbild ist gekennzeichnet durch eine realistische Wahrnehmung, Akzeptanz natürlicher Körpermerkmale und ein Gefühl von Wohlfühlen im eigenen Körper.', 'content', 0
FROM public.glossary_terms WHERE slug = 'body-image';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Körperbild und Essstörungen', 'Ein gestörtes Körperbild ist ein zentrales Merkmal vieler Essstörungen. Bei Anorexia Nervosa nehmen sich Betroffene trotz Untergewicht oft als zu dick wahr (Körperschemastörung) und überbewerten Figur und Gewicht für ihren Selbstwert. Bei Bulimia Nervosa und Binge-Eating-Störung steht meist eine starke Unzufriedenheit mit dem eigenen Körper im Vordergrund, die das Essverhalten beeinflusst. Die Arbeit am Körperbild ist daher ein wichtiger Bestandteil der Therapie von Essstörungen und umfasst die Korrektur von Wahrnehmungsverzerrungen, die Veränderung negativer Körperbezogener Gedanken und Gefühle sowie den Abbau problematischer Verhaltensweisen wie ständiges Wiegen oder Vermeiden des Spiegelbilds.', 'content', 1
FROM public.glossary_terms WHERE slug = 'body-image';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Entwicklung des Körperbildes', 'Das Körperbild entwickelt sich über die gesamte Lebensspanne und wird durch verschiedene Faktoren beeinflusst. In der Kindheit spielen Eltern eine wichtige Rolle, indem sie durch ihre Rückmeldungen und ihr eigenes Verhältnis zum Körper ein Modell bieten. In der Pubertät verändert sich der Körper dramatisch, was oft zu einer verstärkten Auseinandersetzung mit dem Körperbild führt. Gesellschaftliche und mediale Ideale sowie Vergleiche mit Gleichaltrigen gewinnen in dieser Phase besonders an Bedeutung. Auch kulturelle Normen, persönliche Erfahrungen (wie Hänseleien oder Traumata) und biologische Faktoren (wie hormonelle Veränderungen) beeinflussen die Entwicklung des Körperbildes. Ein positives Körperbild kann durch wertschätzende Rückmeldungen, einen fokus auf Funktionalität statt Aussehen und kritische Medienkompetenz gefördert werden.', 'content', 2
FROM public.glossary_terms WHERE slug = 'body-image';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das innere Bilderbuch', 'Das Körperbild kann mit einem persönlichen Bilderbuch verglichen werden, das wir über unseren Körper anlegen. Dieses Buch enthält nicht nur Fotografien (unsere Wahrnehmung), sondern auch Kommentare, Bewertungen und Geschichten, die wir zu diesen Bildern hinzufügen. Manche dieser Geschichten haben wir selbst geschrieben, andere wurden uns von Eltern, Freunden oder der Gesellschaft eingegeben. Oft blättern wir immer wieder zu den kritischsten Seiten zurück und ignorieren die positiven Aspekte. Eine gesunde Beziehung zum eigenen Körper bedeutet, das ganze Buch zu betrachten, auch die Seiten mit Stärken und Fähigkeiten, manche kritische Kommentare zu überdenken und neu zu schreiben, und zu verstehen, dass dieses Buch nur einen Teil unserer Identität ausmacht – nicht die gesamte Geschichte unseres Wertes.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'body-image';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Klinisches Bild und Diagnosekriterien', 'Die Borderline-Persönlichkeitsstörung (BPS) äußert sich durch ein tiefgreifendes Muster von Instabilität in der Emotionsregulation, der Impulskontrolle, zwischenmenschlichen Beziehungen und im Selbstbild. Nach DSM-5 müssen für eine Diagnose mindestens fünf von neun Kriterien erfüllt sein, darunter: verzweifeltes Bemühen, tatsächliches oder vermutetes Verlassenwerden zu vermeiden; instabile, intensive zwischenmenschliche Beziehungen mit Wechsel zwischen Idealisierung und Abwertung; Identitätsstörung mit instabilem Selbstbild; Impulsivität in potenziell selbstschädigenden Bereichen; wiederholtes suizidales oder selbstverletzendes Verhalten; affektive Instabilität mit intensiven Stimmungsschwankungen; chronische Gefühle von Leere; unangemessene, intensive Wut oder Schwierigkeiten, Wut zu kontrollieren; sowie vorübergehende paranoide Vorstellungen oder schwere dissoziative Symptome.', 'content', 0
FROM public.glossary_terms WHERE slug = 'borderline-persoenlichkeitsstoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Ursachen und Entstehung', 'Die Entstehung der Borderline-Persönlichkeitsstörung wird auf ein komplexes Zusammenspiel biologischer, psychologischer und sozialer Faktoren zurückgeführt. Neurobiologisch werden Dysfunktionen in Hirnregionen beobachtet, die für die Emotionsregulation zuständig sind. Genetische Faktoren spielen ebenfalls eine Rolle, wie Zwillingsstudien zeigen. Psychosoziale Risikofaktoren umfassen traumatische Erfahrungen in der Kindheit (wie emotionaler, physischer oder sexueller Missbrauch), Vernachlässigung, Verlust wichtiger Bezugspersonen oder invalidierendes Umfeld, in dem emotionale Reaktionen häufig ignoriert, bestraft oder als ungültig erklärt werden. Diese Faktoren können zu Defiziten in der emotionalen Regulationsfähigkeit und zu einer erhöhten Vulnerabilität führen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'borderline-persoenlichkeitsstoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Behandlungsansätze und Prognose', 'Die Behandlung der BPS erfordert meist einen langfristigen, multimodalen Ansatz. Die dialektisch-behaviorale Therapie (DBT) nach Marsha Linehan ist der am besten untersuchte Behandlungsansatz, der sich besonders auf die Verbesserung der Emotionsregulation, Stresstoleranz, zwischenmenschlichen Fertigkeiten und Achtsamkeit konzentriert. Auch die mentalisierungsbasierte Therapie (MBT) und die übertragungsfokussierte Psychotherapie (TFP) zeigen gute Erfolge. Medikamentöse Behandlungen können unterstützend eingesetzt werden, z.B. zur Symptomreduktion bei komorbiden Störungen wie Depression oder Angststörungen. Entgegen früherer Annahmen ist die Prognose bei adäquater Behandlung insgesamt günstig: Studien zeigen, dass viele Betroffene im Laufe der Zeit eine deutliche Symptomreduktion oder sogar Remission erreichen können, besonders wenn sie frühzeitig Hilfe erhalten.', 'content', 2
FROM public.glossary_terms WHERE slug = 'borderline-persoenlichkeitsstoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der emotionale Thermostat', 'Die emotionale Instabilität bei Borderline kann mit einem defekten Thermostat verglichen werden. Während ein funktionierender Thermostat die Temperatur in einem angenehmen Bereich hält und nur leichte Schwankungen zulässt, schwingt ein defekter Thermostat zwischen extremer Hitze und Kälte – ohne die mittleren, gemäßigten Bereiche zu erfassen. Ähnlich erleben Menschen mit BPS oft extreme emotionale Zustände: intensive Wut, tiefe Verzweiflung oder überwältigende Angst, während ausgeglichene emotionale Zustände selten und schwer zu halten sind. Die Therapie arbeitet daran, diesen ''emotionalen Thermostat'' zu reparieren, sodass ein breiteres Spektrum an Gefühlszuständen erlebt und moderate Emotionen länger gehalten werden können, ohne sofort in Extreme zu kippen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'borderline-persoenlichkeitsstoerung';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Bedeutung gesunder Grenzen', 'Gesunde persönliche Grenzen sind wichtig für psychisches Wohlbefinden und selbstbestimmtes Leben. Sie definieren, wo wir enden und andere beginnen, was wir akzeptieren und was nicht. Ohne klare Grenzen können wir uns ausgebeutet, überfordert oder manipuliert fühlen. Grenzen können physisch (persönlicher Raum, Berührung), emotional (welche Gefühle wir teilen, wie andere mit unseren Gefühlen umgehen), zeitlich (wie wir unsere Zeit einteilen), materiell (Umgang mit Besitz) und digital (Online-Verfügbarkeit, soziale Medien) sein. Die Fähigkeit, Grenzen zu setzen, ist eng mit Selbstwertgefühl und Selbstfürsorge verbunden – wer sich selbst wertschätzt, erkennt seine Bedürfnisse an und kommuniziert sie.', 'content', 0
FROM public.glossary_terms WHERE slug = 'boundary-setting';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Grenzen setzen im Elternalltag', 'Für Eltern ist Grenzsetzung in zweifacher Hinsicht relevant: Sie müssen eigene Grenzen zum Schutz vor Überlastung setzen und gleichzeitig ihren Kindern angemessene Grenzen vermitteln. Elterliche Grenzen könnten beinhalten: Zeit für sich selbst einzufordern, ''Nein'' zu sagen zu zusätzlichen Verpflichtungen, Erwartungen an Unterstützung durch Partner oder Familie zu kommunizieren oder den Umfang von Arbeitsbelastungen zu begrenzen. Bei elterlicher Erschöpfung ist das Setzen von Grenzen oft ein wichtiger Therapiebestandteil. Gleichzeitig müssen Eltern ihren Kindern Grenzen setzen, um Sicherheit und Orientierung zu bieten. Diese Balance zwischen eigenen Bedürfnissen und Verantwortung für die Kinder kann herausfordernd sein.', 'content', 1
FROM public.glossary_terms WHERE slug = 'boundary-setting';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Effektive Techniken zum Setzen von Grenzen', 'Grenzen effektiv zu setzen erfordert klare Kommunikation ohne Rechtfertigung oder Schuldgefühle. Hilfreich ist die Verwendung von Ich-Botschaften (''Ich fühle mich überfordert, wenn...'') statt Vorwürfen. Konsistenz ist wichtig – wiederholt überschrittene Grenzen werden nicht ernst genommen. Auch das Antizipieren möglicher Reaktionen und das Vorbereiten entsprechender Antworten kann helfen. Das Setzen von Grenzen erfordert oft Übung, besonders für Menschen, die dazu neigen, eigene Bedürfnisse hintenanzustellen. Grenzen sollten dabei nicht als Mauer, sondern als Tor verstanden werden – sie regulieren den Zugang, statt ihn völlig zu blockieren. In der Therapie werden oft systematisch Techniken zur Grenzsetzung erarbeitet, wie das Erkennen eigener Bedürfnisse, Übungen zur Selbstbehauptung und die schrittweise Anwendung in realen Situationen.', 'content', 2
FROM public.glossary_terms WHERE slug = 'boundary-setting';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der persönliche Garten', 'Persönliche Grenzen können mit einem Garten verglichen werden, den man pflegt und schützt. Ein Garten braucht einen Zaun, der klar markiert, wo er beginnt und endet. Dieser Zaun hat Tore, durch die man bestimmte Menschen einladen kann, während andere draußen bleiben müssen. Manche Menschen laden wir ein, den gesamten Garten zu sehen, bei anderen beschränken wir den Zugang auf bestimmte Bereiche. Wenn wir keine klaren Grenzen setzen, ist es, als würden wir unseren Garten ungeschützt lassen – jeder kann hineinlaufen, Pflanzen zertreten oder sogar ernten, was wir gesät haben. Das Setzen von Grenzen bedeutet nicht, unfreundlich oder abweisend zu sein – es bedeutet, zu entscheiden, wer welchen Zugang zu unserem ''inneren Garten'' erhält, und so dafür zu sorgen, dass er gedeihen kann.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'boundary-setting';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die Bremse als Selbstschutz', 'Die ''Bremse zu ziehen'' ist eine bildhafte Umschreibung für einen bewussten Stopp in Situationen, die uns zu überfordern drohen oder bereits überfordern. Anders als das unfreiwillige Zusammenbrechen ist das ''Bremse ziehen'' eine aktive, selbstbestimmte Handlung. Es bedeutet, Verantwortung für die eigene psychische und physische Gesundheit zu übernehmen, indem man rechtzeitig erkennt, wann es zu viel wird. Dies kann das Ablehnen weiterer Aufgaben, das Delegieren von Verantwortlichkeiten, das Einlegen von Pausen oder das vorübergehende Zurückfahren von Aktivitäten umfassen. Das frühzeitige ''Bremsen'' kann verhindern, dass es zum vollständigen ''Crash'' in Form eines Burnouts kommt.', 'content', 0
FROM public.glossary_terms WHERE slug = 'bremse-ziehen';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Herausforderungen beim ''Bremse ziehen''', 'Trotz der offensichtlichen Wichtigkeit fällt es vielen Menschen schwer, rechtzeitig ''die Bremse zu ziehen''. Gründe hierfür können sein: gesellschaftliche und internalisierte Erwartungen an ständige Leistungsbereitschaft und Verfügbarkeit, Angst vor negativen Konsequenzen oder Bewertungen, Schwierigkeiten, eigene Grenzen wahrzunehmen oder ernst zu nehmen, sowie starkes Pflicht- und Verantwortungsgefühl, besonders bei Eltern. Auch Persönlichkeitsmerkmale wie Perfektionismus oder der Wunsch, es allen recht zu machen, können das rechtzeitige Bremsen erschweren. Häufig ist die Fähigkeit, eigene Grenzen zu erkennen und zu respektieren, durch frühe Erfahrungen geprägt und muss im Erwachsenenalter neu erlernt werden.', 'content', 1
FROM public.glossary_terms WHERE slug = 'bremse-ziehen';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die Bremse im Familienalltag', 'Im Kontext von Elternschaft ist das ''Bremse ziehen'' besonders wichtig, da Eltern oft unter chronischer Belastung stehen und ihre eigenen Grenzen zugunsten der Kinder zurückstellen. Konkrete Strategien können sein: Bewusst Auszeiten einplanen und diese als nicht-verhandelbar betrachten; klare Kommunikation der eigenen Grenzen gegenüber Kindern, Partner und anderen; Unterstützungssysteme aktivieren; Prioritäten setzen und bewusst entscheiden, was wirklich wichtig ist und was warten kann; sowie Routinen etablieren, die regelmäßige Erholungsphasen sicherstellen. Ein wichtiger Aspekt ist auch, Kindern vorzuleben, dass es in Ordnung und sogar wichtig ist, auf die eigenen Bedürfnisse zu achten – so werden sie lernen, auch selbst rechtzeitig ''die Bremse zu ziehen''.', 'content', 2
FROM public.glossary_terms WHERE slug = 'bremse-ziehen';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der Akku und das Aufladen', 'Unser Energiehaushalt lässt sich mit dem Akku eines Mobiltelefons vergleichen. Wie ein Smartphone verbrauchen wir Energie für verschiedene ''Anwendungen'' – Arbeit, Kinderbetreuung, soziale Interaktionen, Haushalt. Ein Telefon zeigt durch die Akkuanzeige klar an, wann es Zeit zum Aufladen ist, und bei kritischem Akkustand aktiviert es automatisch den Energiesparmodus. Menschen haben diesen automatischen ''Energiesparmodus'' oft nicht oder ignorieren ihn. Stattdessen laufen sie weiter auf 5% Batterie und wundern sich, wenn das System plötzlich abstürzt. ''Die Bremse ziehen'' ist wie das bewusste Aktivieren des Energiesparmodus und das Einstecken des Ladekabels, bevor der Akku völlig leer ist – eine präventive Maßnahme, um funktionsfähig zu bleiben.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'bremse-ziehen';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Grundprinzipien der Kurzzeittherapie', 'Die Kurzzeittherapie zeichnet sich durch eine begrenzte Anzahl von Sitzungen (typischerweise 6-20) und einen fokussierten, strukturierten Ansatz aus. Anders als langfristige Therapien konzentriert sie sich weniger auf tiefgreifende persönlichkeitsstrukturelle Veränderungen oder umfassende Aufarbeitung der Vergangenheit, sondern auf konkrete, erreichbare Ziele und die Lösung spezifischer Probleme. Zu den Grundprinzipien gehören: klare Zieldefinition zu Beginn der Therapie, Fokus auf Gegenwart und Zukunft statt auf die Vergangenheit, Aktivierung von Ressourcen und Stärken des Klienten, sowie eine aktive, direktive Haltung des Therapeuten. Die Zeitbegrenzung wird dabei nicht als Einschränkung, sondern als therapeutisches Element gesehen, das Motivation und Fokus fördern kann.', 'content', 0
FROM public.glossary_terms WHERE slug = 'brief-therapy';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Verschiedene Ansätze der Kurzzeittherapie', 'Es gibt verschiedene Modelle der Kurzzeittherapie, die auf unterschiedlichen theoretischen Grundlagen basieren. Die kognitive Kurzzeittherapie fokussiert auf die Veränderung dysfunktionaler Gedankenmuster. Die lösungsfokussierte Kurzzeittherapie konzentriert sich auf die Entwicklung von Lösungen statt auf Problemanalyse, indem sie Ausnahmen vom Problem und bereits vorhandene Ressourcen identifiziert. Die psychodynamische Kurzzeittherapie arbeitet mit einem zentralen Konfliktthema und dessen Auswirkungen auf aktuelle Beziehungsmuster. Die strategische Kurzzeittherapie zielt auf direkte Verhaltensänderungen durch paradoxe Interventionen oder Umdeutungen ab. Allen gemeinsam ist der Fokus auf Effizienz und schnelle Veränderung durch gezielte Interventionen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'brief-therapy';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Anwendungsgebiete und Grenzen', 'Kurzzeittherapien sind besonders geeignet für Klienten mit umschriebenen Problemen, guter Motivation, ausreichenden Ressourcen und ohne schwerwiegende psychische Erkrankungen. Sie können wirksam sein bei leichten bis mittelschweren Depressionen, Angststörungen, Anpassungsstörungen, spezifischen Phobien oder bei Lebenskrisen und Entscheidungskonflikten. Auch als erste Interventionsstufe oder zur Überbrückung bis zum Beginn einer Langzeittherapie können sie sinnvoll sein. Grenzen der Kurzzeittherapie liegen bei schweren, chronischen oder komplexen psychischen Störungen, tiefgreifenden Persönlichkeitsstörungen oder bei mehrfach traumatisierten Personen. Hier sind oft längerfristige, intensivere therapeutische Prozesse nötig. Wichtig ist eine sorgfältige Indikationsstellung, um zu entscheiden, welche Klienten von diesem Ansatz profitieren können.', 'content', 2
FROM public.glossary_terms WHERE slug = 'brief-therapy';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Der therapeutische Sprint', 'Wenn traditionelle Langzeittherapie einem Marathonlauf gleicht, bei dem Ausdauer und Durchhaltevermögen über eine lange Strecke gefragt sind, dann ist die Kurzzeittherapie wie ein Sprint – kurz, intensiv und mit voller Kraft auf ein klar definiertes Ziel gerichtet. Wie ein Sprinter konzentriert sich der Kurzzeittherapie-Ansatz nicht darauf, die gesamte ''Landschaft der Psyche'' zu erkunden, sondern darauf, so direkt wie möglich zur Ziellinie zu gelangen. Der Therapeut ist dabei wie ein Coach, der nicht jedes Detail der Lauftechnik analysieren will, sondern gezielt jene Aspekte trainiert, die für das unmittelbare Rennen entscheidend sind. Diese Herangehensweise erfordert Fokus, Klarheit und die Bereitschaft, nicht jeden möglichen Weg zu erkunden, sondern entschlossen den direktesten zu wählen.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'brief-therapy';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Diagnostische Kriterien', 'Die Bulimia Nervosa ist durch wiederkehrende Episoden von Essanfällen gekennzeichnet, bei denen in einem begrenzten Zeitraum eine objektiv große Nahrungsmenge konsumiert wird, begleitet von einem Gefühl des Kontrollverlusts. Um die übermäßige Kalorienzufuhr zu kompensieren, greifen Betroffene zu unangemessenen Maßnahmen wie selbstinduziertem Erbrechen, Missbrauch von Abführmitteln, Diuretika oder anderen Medikamenten, strengem Fasten oder übermäßiger körperlicher Betätigung. Diese Verhaltensweisen müssen für eine Diagnose mindestens einmal wöchentlich über drei Monate auftreten. Charakteristisch ist zudem, dass Figur und Gewicht einen übermäßigen Einfluss auf die Selbstbewertung haben. Anders als bei der Anorexia Nervosa ist das Körpergewicht bei Bulimie meist im Normalbereich oder leicht darüber oder darunter.', 'content', 0
FROM public.glossary_terms WHERE slug = 'bulimia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Ursachen und Risikofaktoren', 'Die Entstehung der Bulimia Nervosa ist multifaktoriell bedingt. Biologische Faktoren umfassen genetische Veranlagungen und Veränderungen im Serotonin-Stoffwechsel, die Stimmung und Sättigungsgefühl beeinflussen können. Psychologische Faktoren beinhalten niedriges Selbstwertgefühl, Perfektionismus, Schwierigkeiten bei der Emotionsregulation und Impulskontrolle sowie eine übermäßige Beschäftigung mit Körper und Gewicht. Soziokulturelle Faktoren wie der gesellschaftliche Schlankheitsdruck, die Idealisierung bestimmter Körperformen in den Medien und familiäre Einflüsse spielen ebenfalls eine Rolle. Häufig beginnt die Störung im späten Jugendalter oder frühen Erwachsenenalter, oft nach einer Phase des Diäthaltens. Traumatische Erlebnisse und Mobbing bezüglich des Körpers können als Auslöser wirken.', 'content', 1
FROM public.glossary_terms WHERE slug = 'bulimia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Behandlungsansätze und Prognose', 'Die Behandlung der Bulimia Nervosa erfordert meist einen mehrgleisigen Ansatz. Die kognitive Verhaltenstherapie (KVT) gilt als Methode der ersten Wahl und zielt darauf ab, das gestörte Essverhalten zu normalisieren und dysfunktionale Gedanken über Körper, Gewicht und Selbstwert zu verändern. Die interpersonelle Psychotherapie konzentriert sich auf zwischenmenschliche Probleme, die die Essstörung aufrechterhalten können. Medikamentöse Behandlungen, insbesondere mit selektiven Serotonin-Wiederaufnahmehemmern (SSRIs), können unterstützend wirken. Bei schweren Verläufen kann eine stationäre oder tagesklinische Behandlung notwendig sein. Die Prognose ist bei adäquater Behandlung vergleichsweise günstig, mit Remissionsraten von etwa 50-70% nach evidenzbasierter Therapie, obwohl Rückfälle vorkommen können. Eine frühzeitige Behandlung verbessert die Erfolgsaussichten.', 'content', 2
FROM public.glossary_terms WHERE slug = 'bulimia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Das pendelnde Pendel', 'Die Bulimia Nervosa kann mit einem Pendel verglichen werden, das zwischen zwei Extremen schwingt – Kontrolle und Kontrollverlust. Auf der einen Seite steht der Versuch, das Essverhalten und Gewicht strikt zu kontrollieren, oft durch restriktive Diäten und selbst auferlegte Regeln. Wenn diese rigide Kontrolle nicht aufrechterhalten werden kann, schwingt das Pendel zum anderen Extrem – dem völligen Kontrollverlust während eines Essanfalls. Das anschließende kompensatorische Verhalten (z.B. Erbrechen) ist der verzweifelte Versuch, das Pendel wieder zurück zur Kontrolle zu zwingen. Dieser Kreislauf verstärkt sich selbst: Je strenger die Kontrolle, desto intensiver die Gegenreaktion des Kontrollverlusts. Therapeutisches Ziel ist es, dieses Pendel zur Ruhe zu bringen und ein ausgewogenes, flexibles Verhältnis zum Essen zu entwickeln, bei dem weder absolute Kontrolle noch Kontrollverlust dominieren.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'bulimia-nervosa';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Symptome und Verlauf', 'Burnout entwickelt sich typischerweise schleichend über mehrere Phasen. Frühe Anzeichen umfassen übermäßiges Engagement, Ehrgeiz und das Gefühl der Unentbehrlichkeit, gefolgt von zunehmender Erschöpfung, reduzierter Leistungsfähigkeit, sozialer Isolation und psychosomatischen Beschwerden. Das vollentwickelte Burnout-Syndrom ist nach Maslach durch drei Kerndimensionen gekennzeichnet: Emotionale Erschöpfung (Gefühl des Ausgelaugtseins, Energiemangel), Depersonalisation/Zynismus (distanzierte, gefühllose Einstellung gegenüber Arbeit oder Betreuungsaufgaben) und reduzierte persönliche Leistungsfähigkeit (negative Selbstbewertung der eigenen Kompetenz und Erfolge). Körperliche Symptome können Schlafstörungen, chronische Müdigkeit, erhöhte Anfälligkeit für Infekte, Kopf- und Rückenschmerzen oder Verdauungsprobleme umfassen.', 'content', 0
FROM public.glossary_terms WHERE slug = 'burn-out';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Eltern-Burnout', 'Eltern-Burnout ist eine spezifische Form des Burnouts, die durch die chronischen und überwältigenden Anforderungen der Elternschaft entsteht. Die Symptomatik ähnelt dem beruflichen Burnout, ist jedoch spezifisch auf die Elternrolle bezogen: emotionale Erschöpfung im Zusammenhang mit der elterlichen Rolle, emotionale Distanzierung von den eigenen Kindern und ein Gefühl der Ineffektivität in der Elternrolle. Risikofaktoren umfassen Perfektionismus und zu hohe Erwartungen an sich selbst als Elternteil, mangelnde Unterstützung durch Partner oder soziales Umfeld, besondere Herausforderungen wie Kinder mit besonderen Bedürfnissen oder chronischen Erkrankungen, sowie gesellschaftlicher Druck und idealisierte Elternbilder. Eltern-Burnout kann erhebliche Auswirkungen auf die Eltern-Kind-Beziehung haben und zu erhöhter Reizbarkeit oder emotionaler Unverfügbarkeit führen.', 'content', 1
FROM public.glossary_terms WHERE slug = 'burn-out';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Prävention und Behandlung', 'Die Prävention von Burnout umfasst sowohl individuelle als auch strukturelle Maßnahmen. Auf individueller Ebene sind Selbstfürsorge, Stressmanagement, realistische Zielsetzung, gesunde Work-Life-Balance und die Fähigkeit, Grenzen zu setzen, wichtig. Strukturelle Maßnahmen können verbesserte Arbeitsbedingungen, klare Rollenverteilung, angemessene Ressourcen und unterstützende Führung beinhalten. Die Behandlung eines manifesten Burnouts erfordert meist einen mehrgleisigen Ansatz: Akute Entlastung und Distanzierung von den übermäßigen Anforderungen; psychotherapeutische Unterstützung zur Bearbeitung dysfunktionaler Denk- und Verhaltensmuster; Erlernen von Stressbewältigungsstrategien und Selbstfürsorge; sowie bei Eltern-Burnout die Entwicklung realistischer Erwartungen an sich selbst als Elternteil und das Aktivieren von Unterstützungssystemen. Bei schweren Verläufen kann eine stationäre Behandlung notwendig sein.', 'content', 2
FROM public.glossary_terms WHERE slug = 'burn-out';

INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, 'Die ausgelöschte Kerze', 'Burnout kann mit einer Kerze verglichen werden, die an beiden Enden brennt. Anfangs gibt sie mehr Licht und Wärme ab – ähnlich dem anfänglich erhöhten Engagement beim Burnout. Doch mit der Zeit verzehrt sich die Kerze schneller als sie es bei normaler Brennweise tun würde. Die Flamme, zunächst hell und stark, wird immer kleiner, flackert und droht zu erlöschen. Was zurückbleibt, ist nicht mehr die stolze, aufrechte Kerze, sondern geschmolzenes Wachs ohne Form und Funktion. Um wieder zu ''brennen'' und Licht zu spenden, braucht es mehr als nur ein neues Streichholz – es bedarf eines neuen Gleichgewichts zwischen dem Verbrennen (Geben) und der Erneuerung der eigenen Substanz.', 'literary_device', 3
FROM public.glossary_terms WHERE slug = 'burn-out';


-- ============================================================
-- GLOSSARY REFERENCES
-- ============================================================

-- Delete existing references first
DELETE FROM public.glossary_references WHERE term_id IN (SELECT id FROM public.glossary_terms);

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Kabat-Zinn, J. (2013). Gesund durch Meditation: Das große Buch der Selbstheilung mit MBSR. O.W. Barth eBook.', 0
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Segal, Z. V., Williams, J. M. G., & Teasdale, J. D. (2008). Die Achtsamkeitsbasierte Kognitive Therapie der Depression. Tübingen: dgvt-Verlag.', 1
FROM public.glossary_terms WHERE slug = 'achtsamkeit';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2014). Akzeptanz- und Commitment-Therapie. Junfermann Verlag.', 0
FROM public.glossary_terms WHERE slug = 'act';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Harris, R. (2009). ACT made simple: An easy-to-read primer on acceptance and commitment therapy. New Harbinger Publications.', 1
FROM public.glossary_terms WHERE slug = 'act';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Döpfner, M., Frölich, J., & Lehmkuhl, G. (2013). Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS). Hogrefe Verlag.', 0
FROM public.glossary_terms WHERE slug = 'adhs';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Barkley, R. A. (2018). Attention-deficit hyperactivity disorder: A handbook for diagnosis and treatment. Guilford Publications.', 1
FROM public.glossary_terms WHERE slug = 'adhs';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Casey, P. (2014). Adjustment disorder: New developments. Current Psychiatry Reports, 16(6), 451.', 0
FROM public.glossary_terms WHERE slug = 'adjustment-disorder';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Maercker, A., Einsle, F., & Köllner, V. (2007). Adjustment disorders as stress response syndromes: A new diagnostic concept and its exploration in a medical sample. Psychopathology, 40(3), 135-146.', 1
FROM public.glossary_terms WHERE slug = 'adjustment-disorder';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'World Health Organization. (2019). International statistical classification of diseases and related health problems (11th ed.).', 0
FROM public.glossary_terms WHERE slug = 'akute-belastungsreaktion';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Bengel, J., & Huber, B. (2020). Akute Belastungsreaktion und -störung. In E. Brähler & B. Strauß (Eds.), Grundlagen der medizinischen Psychologie (pp. 485-497). Hogrefe Verlag.', 1
FROM public.glossary_terms WHERE slug = 'akute-belastungsreaktion';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2014). Akzeptanz- und Commitment-Therapie. Junfermann Verlag.', 0
FROM public.glossary_terms WHERE slug = 'akzeptanz-und-commitment-therapie';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Harris, R. (2009). ACT made simple: An easy-to-read primer on acceptance and commitment therapy. New Harbinger Publications.', 1
FROM public.glossary_terms WHERE slug = 'akzeptanz-und-commitment-therapie';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Krebs, G., & Kumschick, I. R. (2019). Sprache und Kommunikation in Beratungsgesprächen mit Eltern. Hogrefe Verlag.', 0
FROM public.glossary_terms WHERE slug = 'alltagssprache-eltern';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Schön, B. (2018). Elternsprache - Kindersprache: Entwicklung im Gespräch. Beltz Juventa.', 1
FROM public.glossary_terms WHERE slug = 'alltagssprache-eltern';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Rösing, I. (2003). Ist die Burnout-Forschung ausgebrannt? Analyse und Kritik der internationalen Burnout-Forschung. Kröning: Asanger.', 0
FROM public.glossary_terms WHERE slug = 'am-ende-sein';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: Recent research and its implications for psychiatry. World Psychiatry, 15(2), 103-111.', 1
FROM public.glossary_terms WHERE slug = 'am-ende-sein';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Biesalski, H. K., & Grimm, P. (2011). Taschenatlas Ernährung. Georg Thieme Verlag.', 0
FROM public.glossary_terms WHERE slug = 'anorexia-symptom';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Treasure, J., Claudino, A. M., & Zucker, N. (2010). Eating disorders. The Lancet, 375(9714), 583-593.', 1
FROM public.glossary_terms WHERE slug = 'anorexia-symptom';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Herpertz, S., de Zwaan, M., & Zipfel, S. (2019). Handbuch Essstörungen und Adipositas. Springer-Verlag.', 0
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Lock, J., & Le Grange, D. (2015). Treatment manual for anorexia nervosa: A family-based approach. Guilford Publications.', 1
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Eddy, K. T., Dorer, D. J., Franko, D. L., Tahilani, K., Thompson-Brenner, H., & Herzog, D. B. (2008). Diagnostic crossover in anorexia nervosa and bulimia nervosa: Implications for DSM-V. American Journal of Psychiatry, 165(2), 245-250.', 0
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-binge-eating-purging-type';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Dalle Grave, R. (2011). Eating disorders: Progress and challenges. European Journal of Internal Medicine, 22(2), 153-160.', 1
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-binge-eating-purging-type';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Zipfel, S., Giel, K. E., Bulik, C. M., Hay, P., & Schmidt, U. (2015). Anorexia nervosa: Aetiology, assessment, and treatment. The Lancet Psychiatry, 2(12), 1099-1111.', 0
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-restricting-type';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Hilbert, A., Hoek, H. W., & Schmidt, R. (2017). Evidence-based clinical guidelines for eating disorders: International comparison. Current Opinion in Psychiatry, 30(6), 423-437.', 1
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-restricting-type';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.).', 0
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-unspecified';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'World Health Organization. (2019). International statistical classification of diseases and related health problems (11th ed.).', 1
FROM public.glossary_terms WHERE slug = 'anorexia-nervosa-unspecified';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Casey, P. (2014). Adjustment disorder: New developments. Current Psychiatry Reports, 16(6), 451.', 0
FROM public.glossary_terms WHERE slug = 'anpassungsstoerung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Maercker, A., Einsle, F., & Köllner, V. (2007). Adjustment disorders as stress response syndromes: A new diagnostic concept and its exploration in a medical sample. Psychopathology, 40(3), 135-146.', 1
FROM public.glossary_terms WHERE slug = 'anpassungsstoerung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Hockey, R. (2013). The psychology of fatigue: Work, effort and control. Cambridge University Press.', 0
FROM public.glossary_terms WHERE slug = 'anstrengung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Barkley, R. A. (2015). Attention-deficit hyperactivity disorder: A handbook for diagnosis and treatment (4th ed.). Guilford Press.', 1
FROM public.glossary_terms WHERE slug = 'anstrengung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Faraone, S. V., Asherson, P., Banaschewski, T., Biederman, J., Buitelaar, J. K., Ramos-Quiroga, J. A., ... & Franke, B. (2015). Attention-deficit/hyperactivity disorder. Nature Reviews Disease Primers, 1, 15020.', 0
FROM public.glossary_terms WHERE slug = 'attention-deficit-hyperactivity-disorder';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Polanczyk, G. V., Willcutt, E. G., Salum, G. A., Kieling, C., & Rohde, L. A. (2014). ADHD prevalence estimates across three decades: An updated systematic review and meta-regression analysis. International Journal of Epidemiology, 43(2), 434-442.', 1
FROM public.glossary_terms WHERE slug = 'attention-deficit-hyperactivity-disorder';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Sawyer, S. M., Whitelaw, M., Le Grange, D., Yeo, M., & Hughes, E. K. (2016). Physical and psychological morbidity in adolescents with atypical anorexia nervosa. Pediatrics, 137(4), e20154080.', 0
FROM public.glossary_terms WHERE slug = 'atypical-anorexia-nervosa';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Forney, K. J., Brown, T. A., Holland-Carter, L. A., Kennedy, G. A., & Keel, P. K. (2017). Defining ''significant weight loss'' in atypical anorexia nervosa. International Journal of Eating Disorders, 50(8), 952-962.', 1
FROM public.glossary_terms WHERE slug = 'atypical-anorexia-nervosa';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Fairburn, C. G. (2008). Cognitive behavior therapy and eating disorders. Guilford Press.', 0
FROM public.glossary_terms WHERE slug = 'atypical-bulimia-nervosa';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Machado, P. P. P., Machado, B. C., Gonçalves, S., & Hoek, H. W. (2007). The prevalence of eating disorders not otherwise specified. International Journal of Eating Disorders, 40(3), 212-217.', 1
FROM public.glossary_terms WHERE slug = 'atypical-bulimia-nervosa';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Döpfner, M., & Petermann, F. (2012). Diagnostik psychischer Störungen im Kindes- und Jugendalter. Hogrefe Verlag.', 0
FROM public.glossary_terms WHERE slug = 'auffaellig';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Steinhausen, H. C. (2019). Psychische Störungen bei Kindern und Jugendlichen: Lehrbuch der Kinder- und Jugendpsychiatrie und -psychotherapie. Urban & Fischer.', 1
FROM public.glossary_terms WHERE slug = 'auffaellig';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Kaluza, G. (2018). Stressbewältigung: Trainingsmanual zur psychologischen Gesundheitsförderung. Springer-Verlag.', 0
FROM public.glossary_terms WHERE slug = 'ausgelaugt';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Rösing, I. (2003). Ist die Burnout-Forschung ausgebrannt? Analyse und Kritik der internationalen Burnout-Forschung. Kröning: Asanger.', 1
FROM public.glossary_terms WHERE slug = 'ausgelaugt';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Freudenberger, H. J. (1974). Staff burn-out. Journal of Social Issues, 30(1), 159-165.', 0
FROM public.glossary_terms WHERE slug = 'ausgebrannt';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Roskam, I., Raes, M. E., & Mikolajczak, M. (2017). Exhausted parents: Development and preliminary validation of the Parental Burnout Inventory. Frontiers in Psychology, 8, 163.', 1
FROM public.glossary_terms WHERE slug = 'ausgebrannt';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Bryant-Waugh, R., Markham, L., Kreipe, R. E., & Walsh, B. T. (2010). Feeding and eating disorders in childhood. International Journal of Eating Disorders, 43(2), 98-111.', 0
FROM public.glossary_terms WHERE slug = 'avoidant-restrictive-food-intake-disorder';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Thomas, J. J., Lawson, E. A., Micali, N., Misra, M., Deckersbach, T., & Eddy, K. T. (2017). Avoidant/restrictive food intake disorder: A three-dimensional model of neurobiology with implications for etiology and treatment. Current Psychiatry Reports, 19(8), 54.', 1
FROM public.glossary_terms WHERE slug = 'avoidant-restrictive-food-intake-disorder';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Martell, C. R., Dimidjian, S., & Herman-Dunn, R. (2013). Behavioral activation for depression: A clinician''s guide. Guilford Press.', 0
FROM public.glossary_terms WHERE slug = 'behavioral-activation';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Lejuez, C. W., Hopko, D. R., & Hopko, S. D. (2001). A brief behavioral activation treatment for depression: Treatment manual. Behavior Modification, 25(2), 255-286.', 1
FROM public.glossary_terms WHERE slug = 'behavioral-activation';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Beck, J. S. (2021). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.', 0
FROM public.glossary_terms WHERE slug = 'behavior-therapy';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Margraf, J., & Schneider, S. (Hrsg.). (2018). Lehrbuch der Verhaltenstherapie, Band 1: Grundlagen, Diagnostik, Verfahren, Rahmenbedingungen (4. Aufl.). Springer.', 1
FROM public.glossary_terms WHERE slug = 'behavior-therapy';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Rogers, C. R. (1961). On Becoming a Person: A Therapist''s View of Psychotherapy. Houghton Mifflin.', 0
FROM public.glossary_terms WHERE slug = 'begleitung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Petzold, H. G. (2003). Integrative Therapie: Modelle, Theorien und Methoden für eine schulenübergreifende Psychotherapie. Junfermann Verlag.', 1
FROM public.glossary_terms WHERE slug = 'begleitung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Lazarus, R. S., & Folkman, S. (1984). Stress, appraisal, and coping. Springer Publishing Company.', 0
FROM public.glossary_terms WHERE slug = 'belastung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Kaluza, G. (2018). Stressbewältigung: Trainingsmanual zur psychologischen Gesundheitsförderung. Springer-Verlag.', 1
FROM public.glossary_terms WHERE slug = 'belastung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: Recent research and its implications for psychiatry. World Psychiatry, 15(2), 103-111.', 0
FROM public.glossary_terms WHERE slug = 'belastungsgrenze';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Hobfoll, S. E. (1989). Conservation of resources: A new attempt at conceptualizing stress. American Psychologist, 44(3), 513-524.', 1
FROM public.glossary_terms WHERE slug = 'belastungsgrenze';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Barkley, R. A. (2013). Taking charge of ADHD: The complete, authoritative guide for parents. New York: Guilford Press.', 0
FROM public.glossary_terms WHERE slug = 'benehmen';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Greene, R. W. (2014). The explosive child: A new approach for understanding and parenting easily frustrated, chronically inflexible children. New York: Harper.', 1
FROM public.glossary_terms WHERE slug = 'benehmen';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Nestmann, F., Engel, F., & Sickendiek, U. (Hrsg.). (2014). Das Handbuch der Beratung (3. Aufl.). DGVT-Verlag.', 0
FROM public.glossary_terms WHERE slug = 'beratung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Warschburger, P. (2009). Beratungspsychologie. Heidelberg: Springer Medizin Verlag.', 1
FROM public.glossary_terms WHERE slug = 'beratung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Worden, J. W. (2018). Grief counseling and grief therapy: A handbook for the mental health practitioner (5th ed.). Springer Publishing Company.', 0
FROM public.glossary_terms WHERE slug = 'bereavement';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Kast, V. (2015). Trauern: Phasen und Chancen des psychischen Prozesses (3. Aufl.). Kreuz Verlag.', 1
FROM public.glossary_terms WHERE slug = 'bereavement';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Lambert, M. J. (2013). Bergin and Garfield''s handbook of psychotherapy and behavior change (6th ed.). John Wiley & Sons.', 0
FROM public.glossary_terms WHERE slug = 'besserung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Prochaska, J. O., & Norcross, J. C. (2018). Systems of psychotherapy: A transtheoretical analysis (9th ed.). Oxford University Press.', 1
FROM public.glossary_terms WHERE slug = 'besserung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Barkley, R. A. (2018). Attention-deficit hyperactivity disorder: A handbook for diagnosis and treatment (4th ed.). Guilford Press.', 0
FROM public.glossary_terms WHERE slug = 'bewegungsdrang';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Döpfner, M., Schürmann, S., & Frölich, J. (2019). Therapieprogramm für Kinder mit hyperkinetischem und oppositionellem Problemverhalten (THOP) (6. Aufl.). Beltz.', 1
FROM public.glossary_terms WHERE slug = 'bewegungsdrang';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Lazarus, R. S., & Folkman, S. (1984). Stress, appraisal, and coping. Springer Publishing Company.', 0
FROM public.glossary_terms WHERE slug = 'bewaeltigungsstrategien';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Skinner, E. A., Edge, K., Altman, J., & Sherwood, H. (2003). Searching for the structure of coping: A review and critique of category systems for classifying ways of coping. Psychological Bulletin, 129(2), 216-269.', 1
FROM public.glossary_terms WHERE slug = 'bewaeltigungsstrategien';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Gottman, J. M., & Silver, N. (2015). The seven principles for making marriage work. Harmony Books.', 0
FROM public.glossary_terms WHERE slug = 'beziehung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Bowlby, J. (1988). A secure base: Parent-child attachment and healthy human development. Basic Books.', 1
FROM public.glossary_terms WHERE slug = 'beziehung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.).', 0
FROM public.glossary_terms WHERE slug = 'binge-eating';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Fairburn, C. G. (2008). Cognitive behavior therapy and eating disorders. Guilford Press.', 1
FROM public.glossary_terms WHERE slug = 'binge-eating';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.).', 0
FROM public.glossary_terms WHERE slug = 'binge-eating-stoerung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Hilbert, A., & Tuschen-Caffier, B. (2010). Essanfälle und Adipositas: Ein Manual zur kognitiv-behavioralen Therapie der Binge-Eating-Störung. Hogrefe.', 1
FROM public.glossary_terms WHERE slug = 'binge-eating-stoerung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Campbell, S. B. (2006). Behavior problems in preschool children: Clinical and developmental issues (2nd ed.). Guilford Press.', 0
FROM public.glossary_terms WHERE slug = 'bockig';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Döpfner, M., Schürmann, S., & Frölich, J. (2019). Therapieprogramm für Kinder mit hyperkinetischem und oppositionellem Problemverhalten (THOP) (6. Aufl.). Beltz.', 1
FROM public.glossary_terms WHERE slug = 'bockig';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Phillips, K. A. (2009). Understanding body dysmorphic disorder: An essential guide. Oxford University Press.', 0
FROM public.glossary_terms WHERE slug = 'body-dysmorphic-disorder';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Wilhelm, S., Phillips, K. A., & Steketee, G. (2013). Cognitive-behavioral therapy for body dysmorphic disorder: A treatment manual. Guilford Press.', 1
FROM public.glossary_terms WHERE slug = 'body-dysmorphic-disorder';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Cash, T. F., & Smolak, L. (Eds.). (2012). Body image: A handbook of science, practice, and prevention (2nd ed.). Guilford Press.', 0
FROM public.glossary_terms WHERE slug = 'body-image';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Vocks, S., & Legenbauer, T. (2010). Körperbildtherapie bei Anorexia und Bulimia nervosa: Ein kognitiv-verhaltenstherapeutisches Behandlungsprogramm (2. Aufl.). Hogrefe.', 1
FROM public.glossary_terms WHERE slug = 'body-image';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Linehan, M. M. (2014). DBT Skills Training Manual (2nd ed.). Guilford Press.', 0
FROM public.glossary_terms WHERE slug = 'borderline-persoenlichkeitsstoerung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Bohus, M., & Kröger, C. (2011). Psychopathologie und Therapie der Borderline-Persönlichkeitsstörung. Deutsches Ärzteblatt, 108(49), 834-841.', 1
FROM public.glossary_terms WHERE slug = 'borderline-persoenlichkeitsstoerung';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Cloud, H., & Townsend, J. (2017). Boundaries: When to say yes, how to say no to take control of your life. Zondervan.', 0
FROM public.glossary_terms WHERE slug = 'boundary-setting';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Brown, B. (2015). Rising strong: The reckoning, the rumble, the revolution. Random House.', 1
FROM public.glossary_terms WHERE slug = 'boundary-setting';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: Recent research and its implications for psychiatry. World Psychiatry, 15(2), 103-111.', 0
FROM public.glossary_terms WHERE slug = 'bremse-ziehen';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Neff, K. (2011). Self-compassion: Stop beating yourself up and leave insecurity behind. William Morrow.', 1
FROM public.glossary_terms WHERE slug = 'bremse-ziehen';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Bloom, B. L. (1997). Planned short-term psychotherapy: A clinical handbook (2nd ed.). Allyn & Bacon.', 0
FROM public.glossary_terms WHERE slug = 'brief-therapy';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'de Shazer, S., & Dolan, Y. (2007). More than miracles: The state of the art of solution-focused brief therapy. Haworth Press.', 1
FROM public.glossary_terms WHERE slug = 'brief-therapy';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Fairburn, C. G. (2008). Cognitive behavior therapy and eating disorders. Guilford Press.', 0
FROM public.glossary_terms WHERE slug = 'bulimia-nervosa';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Treasure, J., Schmidt, U., & Van Furth, E. (Eds.). (2020). Handbook of eating disorders (3rd ed.). Wiley.', 1
FROM public.glossary_terms WHERE slug = 'bulimia-nervosa';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: Recent research and its implications for psychiatry. World Psychiatry, 15(2), 103-111.', 0
FROM public.glossary_terms WHERE slug = 'burn-out';

INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, 'Roskam, I., Raes, M. E., & Mikolajczak, M. (2017). Exhausted parents: Development and preliminary validation of the parental burnout inventory. Frontiers in Psychology, 8, 163.', 1
FROM public.glossary_terms WHERE slug = 'burn-out';


-- ============================================================
-- MIGRATION COMPLETE
-- ============================================================
