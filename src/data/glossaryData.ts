
export interface GlossaryItem {
  term: string;
  alias?: string;
  definition: string;
  tags: string[];
  slug: string;
  content?: {
    teaser: string;
    sections: {
      title: string;
      content: string;
    }[];
    literaryDevices?: {
      title: string;
      content: string;
    }[];
    references?: string[];
    relatedTerms?: string[];
  }
}

export const glossaryData: GlossaryItem[] = [
  {
    term: "Achtsamkeit",
    alias: "Mindfulness",
    definition: "Bewusste Wahrnehmung des gegenwärtigen Moments ohne Bewertung.",
    tags: ["Konzept-Psychologie", "Therapie-Methode", "Alltag", "Burnout", "ADHS", "Essstörung"],
    slug: "achtsamkeit",
    content: {
      teaser: "Achtsamkeit ist eine Praxis der bewussten Wahrnehmung des gegenwärtigen Moments ohne Bewertung. Sie hat ihre Wurzeln in buddhistischen Meditationstechniken und ist heute ein wichtiges Element vieler Therapieansätze.",
      sections: [
        {
          title: "Definition und Ursprung",
          content: "Achtsamkeit (englisch: Mindfulness) bezeichnet eine Form der Aufmerksamkeitslenkung, bei der bewusst, im gegenwärtigen Moment und ohne Bewertung wahrgenommen wird, was gerade geschieht. Diese Praxis hat ihre Wurzeln in der buddhistischen Meditation, wurde aber seit den 1970er Jahren zunehmend in westliche psychologische und medizinische Kontexte integriert."
        },
        {
          title: "Anwendung in der Therapie",
          content: "In der Psychotherapie wird Achtsamkeit als eigenständige Methode oder als Element verschiedener Therapieansätze eingesetzt. Bekannte achtsamkeitsbasierte Interventionen sind MBSR (Mindfulness-Based Stress Reduction), MBCT (Mindfulness-Based Cognitive Therapy) und Elemente der DBT (Dialektisch-Behaviorale Therapie) sowie ACT (Akzeptanz- und Commitment-Therapie). Diese Ansätze haben sich als wirksam bei der Behandlung von Stress, Depression, Angststörungen, Burnout und als unterstützendes Element bei ADHS und Essstörungen erwiesen."
        },
        {
          title: "Achtsamkeit im Familienalltag",
          content: "Für Eltern und Kinder kann Achtsamkeit eine wertvolle Ressource sein. Achtsame Elternschaft (Mindful Parenting) bedeutet, mit voller Aufmerksamkeit und ohne vorschnelle Bewertung auf die Bedürfnisse und Verhaltensweisen der Kinder zu reagieren. Dies kann die Eltern-Kind-Beziehung stärken, Stress reduzieren und bei der Regulation intensiver Emotionen helfen. Auch für Kinder mit ADHS können altersgerechte Achtsamkeitsübungen hilfreich sein, um ihre Aufmerksamkeit und Selbstregulation zu verbessern."
        }
      ],
      literaryDevices: [
        {
          title: "Metapher: Der achtsame Beobachter",
          content: "Stellen Sie sich vor, Sie sitzen am Ufer eines Flusses und beobachten, wie Blätter auf dem Wasser vorbeischwimmen. Jedes Blatt repräsentiert einen Gedanken oder ein Gefühl. Anstatt ins Wasser zu springen und den Blättern nachzujagen (sich in Gedanken zu verstricken), bleiben Sie als achtsamer Beobachter am Ufer sitzen und nehmen lediglich wahr, wie die Blätter (Gedanken) kommen und wieder gehen."
        }
      ],
      references: [
        "Kabat-Zinn, J. (2013). Full Catastrophe Living: Using the Wisdom of Your Body and Mind to Face Stress, Pain, and Illness. Bantam Books.",
        "Segal, Z. V., Williams, J. M. G., & Teasdale, J. D. (2002). Mindfulness-Based Cognitive Therapy for Depression: A New Approach to Preventing Relapse. Guilford Press."
      ],
      relatedTerms: ["akzeptanz-und-commitment-therapie", "dialektisch-behaviorale-therapie", "selbstfuersorge", "burnout", "stresstoleranz"]
    }
  },
  {
    term: "ADHS",
    alias: "Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung",
    definition: "Neurobiologische Störung, gekennzeichnet durch Probleme mit Aufmerksamkeit, Impulsivität und/oder Hyperaktivität.",
    tags: ["Diagnose-ADHS"],
    slug: "adhs",
    content: {
      teaser: "ADHS (Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung) ist eine neurobiologische Entwicklungsstörung, die sich durch Probleme mit Aufmerksamkeit, Impulskontrolle und/oder Hyperaktivität äußert und erhebliche Auswirkungen auf den Alltag haben kann.",
      sections: [
        {
          title: "Definition und Symptomatik",
          content: "ADHS (Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung) ist eine neurobiologische Entwicklungsstörung, die durch ein durchgängiges Muster von Unaufmerksamkeit und/oder Hyperaktivität-Impulsivität gekennzeichnet ist. Die Symptome müssen in einem Ausmaß auftreten, das mit dem Entwicklungsstand nicht vereinbar ist und sich direkt negativ auf soziale, schulische oder berufliche Aktivitäten auswirkt. Nach DSM-5 werden drei Erscheinungsformen unterschieden: der vorwiegend unaufmerksame Typ, der vorwiegend hyperaktiv-impulsive Typ und der kombinierte Typ."
        },
        {
          title: "Ursachen und Prävalenz",
          content: "ADHS hat eine starke genetische Komponente mit einer Erblichkeit von etwa 70-80%. Umweltfaktoren wie Schwangerschafts- und Geburtskomplikationen, Frühgeburt, niedriges Geburtsgewicht, Exposition gegenüber Toxinen oder psychosoziale Faktoren können die Entwicklung von ADHS mitbeeinflussen. Die Prävalenz liegt bei Kindern und Jugendlichen weltweit bei etwa 5-7%. Bei etwa 50-70% der Betroffenen persistieren die Symptome bis ins Erwachsenenalter, wobei sich das Erscheinungsbild verändern kann."
        },
        {
          title: "Diagnose und Behandlung",
          content: "Die Diagnose erfolgt durch eine umfassende klinische Beurteilung, basierend auf Anamnese, Verhaltensbeobachtung, standardisierten Fragebögen und ggf. neuropsychologischen Tests. Eine multimodale Behandlung umfasst psychoedukation, Verhaltenstherapie, Elterntraining, pädagogische Maßnahmen und bei entsprechender Indikation eine medikamentöse Therapie (in erster Linie mit Stimulanzien wie Methylphenidat oder mit Nicht-Stimulanzien wie Atomoxetin). Der Behandlungsplan sollte individuell angepasst werden und auf die spezifischen Symptome und Bedürfnisse des Betroffenen eingehen."
        },
        {
          title: "ADHS im Familienkontext",
          content: "Eltern von Kindern mit ADHS stehen vor besonderen Herausforderungen. Das Verständnis der Störung als neurobiologische Bedingung kann helfen, unangemessene Schuldzuweisungen zu vermeiden. Strukturierte Tagesabläufe, klare Regeln, positive Verstärkung erwünschten Verhaltens und spezifisches Elterntraining können den Familienalltag erleichtern. Auch die Zusammenarbeit mit Schule und anderen Betreuungspersonen ist wichtig, um ein unterstützendes Umfeld zu schaffen."
        }
      ],
      literaryDevices: [
        {
          title: "Metapher: Der Ferrari-Motor",
          content: "Ein Kind mit ADHS hat oft einen 'Ferrari-Motor im Kopf, aber die Bremsen eines Tretrollers'. Diese Metapher veranschaulicht die Diskrepanz zwischen der hohen inneren Aktivierung und der eingeschränkten Fähigkeit zur Selbstregulation und Handlungssteuerung."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Barkley, R. A. (2018). Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment (4th ed.). Guilford Press."
      ],
      relatedTerms: ["hyperaktiv", "impulsivitaet", "aufmerksamkeitsstoerung", "multimodale-therapie", "elterntraining"]
    }
  },
  {
    term: "Burn-out",
    definition: "Zustand ausgesprochener emotionaler, körperlicher und geistiger Erschöpfung aufgrund chronischer beruflicher oder privater Überlastung. (ICD-10: Z73.0)",
    tags: ["Diagnose-Burnout", "Diagnose-Stress"],
    slug: "burnout",
    content: {
      teaser: "Burnout ist ein Zustand körperlicher, emotionaler und geistiger Erschöpfung, der durch langanhaltenden Stress und übermäßige Belastung entsteht. Besonders bei Eltern kann dies durch die anhaltenden Anforderungen der Kindererziehung in Kombination mit anderen Verpflichtungen auftreten.",
      sections: [
        {
          title: "Definition und Symptomatik",
          content: "Burnout bezeichnet einen Zustand tiefgreifender Erschöpfung, der durch anhaltenden Stress und Überlastung entsteht. Das Syndrom umfasst drei Kerndimensionen: emotionale Erschöpfung (Gefühl des Ausgelaugtseins), Depersonalisation/Zynismus (distanzierte Haltung gegenüber anderen, insbesondere den Personen, für die man Verantwortung trägt) und reduzierte Leistungsfähigkeit (subjektiver Eindruck verminderter Kompetenz und Produktivität). Bei Eltern-Burnout können sich diese Symptome in emotionaler Distanz zum Kind, verminderter Geduld und Toleranz sowie dem Gefühl, den Anforderungen als Elternteil nicht mehr gewachsen zu sein, äußern."
        },
        {
          title: "Entstehung und Risikofaktoren",
          content: "Burnout entsteht durch ein chronisches Missverhältnis zwischen Anforderungen und Ressourcen. Besonders gefährdet sind Menschen mit hohem Pflichtbewusstsein, Perfektionismus und Schwierigkeiten, 'Nein' zu sagen. Bei Eltern-Burnout spielen zusätzlich Faktoren wie unzureichende soziale Unterstützung, hohe eigene Ansprüche an die Elternrolle, besondere Herausforderungen mit dem Kind (z.B. durch Entwicklungsstörungen, chronische Erkrankungen), berufliche Belastungen und mangelnde Zeit für eigene Bedürfnisse eine Rolle."
        },
        {
          title: "Diagnose und Abgrenzung",
          content: "Im ICD-10 wird Burnout unter Z73.0 als 'Ausgebranntsein' oder 'Zustand der totalen Erschöpfung' klassifiziert. Es ist wichtig, Burnout von anderen psychischen Störungen, insbesondere Depressionen, zu unterscheiden. Im Gegensatz zur Depression ist Burnout typischerweise stärker kontextbezogen und die Symptome bessern sich eher durch Entlastung und Erholung. Eine sorgfältige diagnostische Abklärung durch Fachleute ist wichtig, um eine angemessene Behandlung zu gewährleisten."
        },
        {
          title: "Prävention und Intervention",
          content: "Die Prävention von Burnout umfasst das frühzeitige Erkennen von Warnsignalen, die Entwicklung gesunder Grenzen, regelmäßige Selbstfürsorge und den Aufbau sozialer Unterstützungssysteme. Interventionen bei bestehendem Burnout zielen auf eine Reduktion der Belastung, die Stärkung persönlicher Ressourcen und eine realistische Neubewertung der Situation ab. Dies kann durch professionelle Unterstützung wie Psychotherapie, Coaching oder Beratung, aber auch durch konkrete Entlastung im Alltag (z.B. durch zusätzliche Kinderbetreuung) erfolgen. Bei Eltern-Burnout ist es besonders wichtig, Schuldgefühle abzubauen und zu verstehen, dass die eigene Gesundheit eine Voraussetzung für das Wohlbefinden der Kinder ist."
        }
      ],
      literaryDevices: [
        {
          title: "Analogie: Das ausgebrannte Feuer",
          content: "Burnout ist wie ein Feuer, das zu lange zu intensiv gebrannt hat und schließlich nur noch glimmende Asche hinterlässt. Zu Beginn lodert die Flamme der Begeisterung und des Engagements hoch, doch ohne ausreichend Brennstoff (Ressourcen) und bei zu starkem Wind (Stress und Anforderungen) brennt sie schließlich aus, bis nur noch Erschöpfung bleibt."
        }
      ],
      references: [
        "Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: recent research and its implications for psychiatry. World psychiatry, 15(2), 103–111.",
        "Roskam, I., Brianda, M. E., & Mikolajczak, M. (2018). A Step Forward in the Conceptualization and Measurement of Parental Burnout: The Parental Burnout Assessment (PBA). Frontiers in psychology, 9, 758."
      ],
      relatedTerms: ["erschoepfung", "stress", "selbstfuersorge", "ausgelaugt", "ueberfordert", "emotionsregulation"]
    }
  },
  // Continue with other existing glossary entries...
  {
    term: "Zappelig",
    definition: "Körperlich unruhig, ständig in Bewegung, Schwierigkeiten, still zu sitzen.",
    tags: ["Alltag", "Elternsprache", "Symptom-ADHS"],
    slug: "zappelig",
    content: {
      teaser: "Zappeligkeit beschreibt einen Zustand körperlicher Unruhe, bei dem es schwerfällt stillzusitzen oder ruhig zu bleiben - ein häufiges Symptom bei ADHS, aber auch eine normale Verhaltensweise bei Kindern in bestimmten Entwicklungsphasen.",
      sections: [
        {
          title: "Definition und Erscheinungsbild",
          content: "Zappeligkeit (auch: motorische Unruhe) bezeichnet einen Zustand, bei dem eine Person – typischerweise ein Kind – Schwierigkeiten hat, körperlich still zu sein. Dies äußert sich in ständiger Bewegung, Wippen mit den Beinen, Herumrutschen auf dem Stuhl, Spielen mit Gegenständen oder anderen unwillkürlichen Bewegungen. Bei Kindern mit ADHS ist Zappeligkeit eines der Kernsymptome der Hyperaktivitätskomponente und tritt in einem Ausmaß auf, das über das entwicklungsgerechte Maß hinausgeht."
        },
        {
          title: "Ursachen und Zusammenhänge",
          content: "Zappeligkeit kann verschiedene Ursachen haben. Bei ADHS liegt eine neurobiologische Grundlage vor, bei der Schwierigkeiten in der Selbstregulation und Impulskontrolle bestehen. Andere mögliche Ursachen können übermäßige Müdigkeit, Langeweile, Angst oder Stress, übermäßiger Zucker- oder Koffeinkonsum, sowie eine altersgemäße entwicklungsbedingte motorische Unruhe sein. Wichtig ist die Unterscheidung zwischen normaler kindlicher Lebhaftigkeit und pathologischer Hyperaktivität."
        },
        {
          title: "Umgang mit Zappeligkeit im Alltag",
          content: "Für Kinder mit ausgeprägter Zappeligkeit können Strategien wie regelmäßige Bewegungspausen, die Erlaubnis für kontrollierte Bewegung (z.B. Wippkissen, Therapiekreisel), klare Strukturen und Routinen sowie ausreichend körperliche Aktivität hilfreich sein. Auch spezifische Konzentrationsübungen und die Vermittlung von Selbstregulationstechniken können unterstützen. Bei Kindern mit ADHS kann eine multimodale Therapie, die neben diesen pädagogischen Maßnahmen auch Psychoedukation, Verhaltenstherapie und ggf. medikamentöse Behandlung umfasst, angezeigt sein."
        }
      ],
      references: [
        "Döpfner, M., Frölich, J., & Lehmkuhl, G. (2013). Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS). Hogrefe Verlag.",
        "Barkley, R. A. (2018). Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment (4th ed.). Guilford Press."
      ],
      relatedTerms: ["adhs", "hyperaktiv", "dreht-auf", "aufmerksamkeitsstoerung", "multimodale-therapie"]
    }
  }
];

// Helper function to create URL-friendly slugs
export function createSlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Helper function to get a term by slug
export function getTermBySlug(slug: string): GlossaryItem | undefined {
  return glossaryData.find(item => item.slug === slug);
}

// Helper function to get related terms
export function getRelatedTerms(slugs: string[]): GlossaryItem[] {
  return slugs
    .map(slug => getTermBySlug(slug))
    .filter((term): term is GlossaryItem => term !== undefined);
}
