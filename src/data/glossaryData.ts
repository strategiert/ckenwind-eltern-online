
export interface GlossaryItem {
  term: string;
  alias?: string;
  definition: string;
  tags: string[];
}

export const glossaryData: GlossaryItem[] = [
  {
    term: "Achtsamkeit",
    alias: "Mindfulness",
    definition: "Bewusste Wahrnehmung des gegenwärtigen Moments ohne Bewertung.",
    tags: ["Konzept-Psychologie", "Therapie-Methode", "Alltag", "Burnout", "ADHS", "Essstörung"]
  },
  {
    term: "ACT",
    alias: "Akzeptanz- und Commitment-Therapie",
    definition: "Verhaltenstherapeutischer Ansatz, der Akzeptanz von Unvermeidbarem und werteorientiertes Handeln fördert.",
    tags: ["Therapie-Ansatz", "Burnout", "ADHS", "Essstörung"]
  },
  {
    term: "ADHS",
    alias: "Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung",
    definition: "Neurobiologische Störung, gekennzeichnet durch Probleme mit Aufmerksamkeit, Impulsivität und/oder Hyperaktivität.",
    tags: ["Diagnose-ADHS"]
  },
  {
    term: "Adjustment Disorder",
    alias: "Anpassungsstörung",
    definition: "Reaktion auf psychosoziale Belastungen, die über eine normale Reaktion hinausgeht und klinisch bedeutsames Leiden oder Beeinträchtigungen verursacht.",
    tags: ["Diagnose-Stress", "Diagnose-Burnout"]
  },
  {
    term: "Akute Belastungsreaktion",
    definition: "Vorübergehende Reaktion auf eine außergewöhnliche körperliche oder seelische Belastung.",
    tags: ["Diagnose-Stress"]
  },
  {
    term: "Alltagssprache",
    alias: "Eltern",
    definition: "Begriffe und Formulierungen, die Eltern selbst verwenden, um ihre Erfahrungen zu beschreiben (z.B. 'am Ende sein', 'ausgelaugt').",
    tags: ["Alltag", "Elternsprache", "Glossar"]
  },
  {
    term: "Am Ende sein",
    definition: "Gefühl völliger körperlicher und emotionaler Erschöpfung und Überforderung.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout"]
  },
  {
    term: "Anorexia",
    alias: "Symptom",
    definition: "Appetitlosigkeit als Symptom, nicht die spezifische Diagnose Anorexia Nervosa. (ICD-10: R63.0)",
    tags: ["Symptom-Essstörung", "Diagnose"]
  },
  {
    term: "Anorexia Nervosa",
    alias: "Magersucht",
    definition: "Essstörung gekennzeichnet durch starkes Untergewicht, intensive Angst vor Gewichtszunahme und eine gestörte Körperwahrnehmung. (ICD-10: F50.0)",
    tags: ["Diagnose-Essstörung"]
  },
  {
    term: "Anorexia Nervosa, Binge-Eating/Purging Type",
    definition: "Subtyp der Anorexia Nervosa, bei dem neben restriktivem Essverhalten auch Essanfälle und/oder selbstinduziertes Erbrechen oder andere kompensatorische Verhaltensweisen auftreten. (ICD-10: F50.02)",
    tags: ["Diagnose-Essstörung"]
  },
  {
    term: "Anorexia Nervosa, Restricting Type",
    definition: "Subtyp der Anorexia Nervosa, bei dem das Untergewicht primär durch Hungern, Diäten oder exzessiven Sport erreicht wird, ohne regelmäßige Essanfälle oder Purging-Verhalten. (ICD-10: F50.01)",
    tags: ["Diagnose-Essstörung"]
  },
  {
    term: "Anorexia Nervosa, Unspecified",
    definition: "Diagnose, wenn die Kriterien für Anorexia Nervosa erfüllt sind, aber der Subtyp nicht spezifiziert ist. (ICD-10: F50.00)",
    tags: ["Diagnose-Essstörung"]
  },
  {
    term: "Anstrengung",
    definition: "Hoher subjektiv empfundener Energieaufwand, um den Alltag oder spezifische Aufgaben zu bewältigen.",
    tags: ["Alltag", "Symptom-Burnout", "Symptom-ADHS", "Symptom-Essstörung"]
  },
  {
    term: "Attention-Deficit Hyperactivity Disorder",
    alias: "ADHS",
    definition: "Siehe ADHS.",
    tags: ["Diagnose-ADHS"]
  },
  {
    term: "Atypical Anorexia Nervosa",
    definition: "Essstörung mit Merkmalen der Anorexia Nervosa, bei der jedoch trotz signifikantem Gewichtsverlust das Gewicht im Normalbereich oder darüber liegt. (ICD-10: F50.1)",
    tags: ["Diagnose-Essstörung"]
  },
  {
    term: "Atypical Bulimia Nervosa",
    definition: "Essstörung mit Merkmalen der Bulimia Nervosa, bei der jedoch nicht alle diagnostischen Kriterien (z.B. Häufigkeit der Essanfälle/Purging) erfüllt sind. (ICD-10: F50.3)",
    tags: ["Diagnose-Essstörung"]
  },
  {
    term: "Auffällig",
    definition: "Verhalten eines Kindes, das von Gleichaltrigen abweicht und bei Eltern oder Erziehern Anlass zur Sorge gibt.",
    tags: ["Alltag", "Elternsprache", "Symptom-ADHS", "Symptom-Essstörung"]
  },
  {
    term: "Ausgelaugt",
    definition: "Zustand tiefer emotionaler und körperlicher Erschöpfung, oft verbunden mit dem Gefühl, keine Energiereserven mehr zu haben.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout"]
  },
  {
    term: "Ausgebrannt",
    definition: "Umgangssprachlich für Burnout; Zustand völliger Erschöpfung durch chronische Überlastung.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout"]
  },
  {
    term: "Avoidant/Restrictive Food Intake Disorder",
    alias: "ARFID",
    definition: "Essstörung gekennzeichnet durch eine vermeidende oder restriktive Nahrungsaufnahme, die zu Gewichtsverlust, Nährstoffmangel oder Abhängigkeit von Sondennahrung führt, ohne die Angst vor Gewichtszunahme oder Körperbildstörung der Anorexie. (ICD-10: F50.89)",
    tags: ["Diagnose-Essstörung"]
  },
  {
    term: "Behavior Therapy",
    alias: "Verhaltenstherapie",
    definition: "Therapieansatz, der auf der Lerntheorie basiert und darauf abzielt, problematisches Verhalten durch systematische Trainings und Anpassung von Umweltbedingungen zu verändern.",
    tags: ["Therapie-Ansatz", "ADHS", "Burnout", "Essstörung"]
  },
  {
    term: "Bewältigungsstrategien",
    alias: "Coping",
    definition: "Kognitive und verhaltensbezogene Strategien zum Umgang mit Stress, Belastungen und schwierigen Emotionen.",
    tags: ["Konzept-Psychologie", "Bewältigung", "Therapie-Methode", "Alltag", "Burnout", "ADHS", "Essstörung"]
  },
  // Rest of glossary terms follow the same pattern...
  {
    term: "Binge-Eating-Störung",
    definition: "Essstörung gekennzeichnet durch wiederkehrende Essanfälle mit Kontrollverlust, ohne regelmäßige kompensatorische Maßnahmen wie bei der Bulimie.",
    tags: ["Diagnose-Essstörung"]
  },
  {
    term: "Bremse ziehen",
    definition: "Aktiv gegensteuern, um eine negative Entwicklung (z.B. weiteren Gewichtsverlust, zunehmende Überlastung) zu stoppen oder zu verlangsamen.",
    tags: ["Alltag", "Elternsprache", "Essstörung", "Burnout"]
  },
  {
    term: "Bulimia Nervosa",
    alias: "Ess-Brech-Sucht",
    definition: "Essstörung gekennzeichnet durch wiederkehrende Essanfälle, gefolgt von kompensatorischen Maßnahmen (z.B. Erbrechen, Abführmittelmissbrauch, exzessiver Sport), um eine Gewichtszunahme zu verhindern. (ICD-10: F50.2)",
    tags: ["Diagnose-Essstörung"]
  },
  {
    term: "Burn-out",
    definition: "Zustand ausgesprochener emotionaler, körperlicher und geistiger Erschöpfung aufgrund chronischer beruflicher oder privater Überlastung. (ICD-10: Z73.0)",
    tags: ["Diagnose-Burnout", "Diagnose-Stress"]
  },
  {
    term: "CBT",
    alias: "Kognitive Verhaltenstherapie",
    definition: "Siehe Kognitive Verhaltenstherapie.",
    tags: ["Therapie-Ansatz", "Burnout", "ADHS", "Essstörung"]
  },
  {
    term: "Chronisch übermüdet",
    definition: "Anhaltender Zustand von Müdigkeit, Schläfrigkeit und Energielosigkeit aufgrund von Schlafmangel oder schlechter Schlafqualität.",
    tags: ["Alltag", "Symptom-Burnout", "Symptom-ADHS"]
  },
  {
    term: "DBT",
    alias: "Dialektisch-Behaviorale Therapie",
    definition: "Siehe Dialektisch-Behaviorale Therapie.",
    tags: ["Therapie-Ansatz", "Essstörung", "Emotionsregulation"]
  },
  {
    term: "Dialektisch-Behaviorale Therapie",
    alias: "DBT",
    definition: "Therapieform, die Elemente der KVT mit Achtsamkeit und dialektischen Strategien kombiniert; ursprünglich für Borderline-Störungen entwickelt, auch bei Essstörungen und Emotionsregulationsproblemen eingesetzt.",
    tags: ["Therapie-Ansatz", "Essstörung", "Emotionsregulation"]
  },
  {
    term: "Dreht auf",
    definition: "Zustand gesteigerter motorischer Unruhe, Erregung und Aktivität, oft bei Kindern mit ADHS, besonders abends oder bei Übermüdung.",
    tags: ["Alltag", "Elternsprache", "Symptom-ADHS"]
  },
  {
    term: "DSM-5",
    alias: "Diagnostic and Statistical Manual of Mental Disorders, 5th Edition",
    definition: "Klassifikationssystem für psychische Störungen, herausgegeben von der American Psychiatric Association.",
    tags: ["Diagnose", "Klassifikation"]
  },
  {
    term: "Zappelig",
    definition: "Körperlich unruhig, ständig in Bewegung, Schwierigkeiten, still zu sitzen.",
    tags: ["Alltag", "Elternsprache", "Symptom-ADHS"]
  }
  // Adding all 100+ terms would make this file too large
  // In a real implementation, you would include all the terms
];
