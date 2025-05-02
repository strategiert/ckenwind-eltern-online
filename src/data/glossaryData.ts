
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
    term: "ACT",
    alias: "Akzeptanz- und Commitment-Therapie",
    definition: "Verhaltenstherapeutischer Ansatz, der Akzeptanz von Unvermeidbarem und werteorientiertes Handeln fördert.",
    tags: ["Therapie-Ansatz", "Burnout", "ADHS", "Essstörung"],
    slug: "act",
    content: {
      teaser: "Die Akzeptanz- und Commitment-Therapie (ACT) ist ein moderner verhaltenstherapeutischer Ansatz, der darauf abzielt, psychologische Flexibilität zu fördern, indem er Menschen hilft, ihre Gedanken und Gefühle zu akzeptieren und gleichzeitig ein werteorientiertes Leben zu führen.",
      sections: [
        {
          title: "Grundprinzipien",
          content: "ACT basiert auf sechs Kernprozessen: Akzeptanz, kognitive Defusion (Distanzierung von Gedanken), Präsenz im gegenwärtigen Moment (Achtsamkeit), Selbst als Kontext (Beobachter-Perspektive), Werte und engagiertes Handeln. Das Akronym ACT steht für 'Accept' (akzeptiere deine Reaktionen und sei präsent), 'Choose' (wähle eine Richtung basierend auf deinen Werten) und 'Take action' (handle engagiert)."
        },
        {
          title: "Anwendung bei verschiedenen Problemstellungen",
          content: "ACT hat sich als wirksam erwiesen bei der Behandlung von Angststörungen, Depression, chronischen Schmerzen, Essstörungen und Substanzabhängigkeiten. Im Kontext von Eltern-Burnout kann ACT helfen, belastende Gedanken und Gefühle zu akzeptieren, ohne von ihnen überwältigt zu werden, und gleichzeitig Handlungen zu fördern, die mit den persönlichen Werten als Eltern übereinstimmen. Bei ADHS kann ACT die Akzeptanz der Diagnose unterstützen und helfen, trotz Schwierigkeiten ein erfüllendes Leben zu führen."
        },
        {
          title: "Unterschied zu traditionellen Ansätzen",
          content: "Im Gegensatz zu traditionellen kognitiven Verhaltenstherapien zielt ACT nicht primär darauf ab, negative Gedanken oder Gefühle zu reduzieren oder zu verändern. Stattdessen fördert ACT die Bereitschaft, diese Erfahrungen zu akzeptieren und gleichzeitig Schritte in Richtung eines wertvollen Lebens zu unternehmen, unabhängig von diesen Erfahrungen."
        }
      ],
      references: [
        "Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2011). Acceptance and Commitment Therapy: The Process and Practice of Mindful Change. Guilford Press.",
        "A-Tjak, J. G., Davis, M. L., Morina, N., Powers, M. B., Smits, J. A., & Emmelkamp, P. M. (2015). A meta-analysis of the efficacy of acceptance and commitment therapy for clinically relevant mental and physical health problems. Psychotherapy and Psychosomatics, 84(1), 30-36."
      ],
      relatedTerms: ["achtsamkeit", "akzeptanz", "werteorientierung", "psychologische-flexibilitaet"]
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
    term: "Adjustment Disorder",
    alias: "Anpassungsstörung",
    definition: "Reaktion auf psychosoziale Belastungen, die über eine normale Reaktion hinausgeht und klinisch bedeutsames Leiden oder Beeinträchtigungen verursacht.",
    tags: ["Diagnose-Stress", "Diagnose-Burnout"],
    slug: "adjustment-disorder",
    content: {
      teaser: "Eine Anpassungsstörung (Adjustment Disorder) ist eine maladaptive Reaktion auf identifizierbare psychosoziale Belastungsfaktoren, die zu signifikantem Leiden und Beeinträchtigungen führt, aber nicht die Kriterien für eine spezifischere psychische Störung erfüllt.",
      sections: [
        {
          title: "Definition und Diagnosekriterien",
          content: "Eine Anpassungsstörung ist durch emotionale oder Verhaltenssymptome gekennzeichnet, die innerhalb von drei Monaten nach Beginn einer identifizierbaren Belastung auftreten. Diese Reaktion geht über eine normale oder erwartbare Reaktion auf den Stressor hinaus und verursacht signifikantes Leiden oder Beeinträchtigungen im sozialen, beruflichen oder anderen wichtigen Funktionsbereichen. Die Symptome dürfen nicht länger als sechs Monate nach Ende des Stressors oder seiner Folgen anhalten, um als Anpassungsstörung diagnostiziert zu werden."
        },
        {
          title: "Untertypen und klinisches Bild",
          content: "Je nach vorherrschender Symptomatik werden verschiedene Untertypen unterschieden: mit depressiver Stimmung, mit Angst, mit gemischter Angst und depressiver Stimmung, mit Störung des Sozialverhaltens, mit gemischter Störung von Gefühlen und Sozialverhalten sowie unspezifiziert. Bei Eltern können Anpassungsstörungen durch verschiedene Belastungen ausgelöst werden, wie die Geburt eines Kindes mit besonderen Bedürfnissen, Veränderungen der Familiensituation, berufliche Herausforderungen oder andere signifikante Lebensereignisse."
        },
        {
          title: "Abgrenzung zum Burnout und anderen Störungen",
          content: "Im Gegensatz zum Burnout-Syndrom, das typischerweise durch chronische Arbeits- oder Familienbelastungen entsteht und nicht als eigenständige Diagnosekategorie klassifiziert ist, bezieht sich eine Anpassungsstörung auf eine spezifische, identifizierbare Belastungssituation. Die Abgrenzung zur posttraumatischen Belastungsstörung liegt in der Schwere des auslösenden Ereignisses, das bei einer PTBS ein traumatisches Ausmaß hat. Von depressiven oder Angststörungen unterscheidet sich die Anpassungsstörung durch den direkten zeitlichen und kausalen Zusammenhang mit einem spezifischen Stressor."
        },
        {
          title: "Behandlung",
          content: "Die Behandlung einer Anpassungsstörung zielt auf die Bewältigung des Stressors und die Linderung der Symptome ab. Psychotherapeutische Ansätze wie kognitive Verhaltenstherapie, Problemlösetraining und unterstützende Gespräche helfen, adaptive Bewältigungsstrategien zu entwickeln. In einigen Fällen kann eine kurzfristige medikamentöse Unterstützung, z.B. mit Anxiolytika oder Antidepressiva, erwogen werden. Soziale Unterstützung und praktische Hilfen bei der Bewältigung der Belastungssituation sind ebenfalls wichtig."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Casey, P., & Bailey, S. (2011). Adjustment disorders: the state of the art. World Psychiatry, 10(1), 11-18."
      ],
      relatedTerms: ["stress", "belastungsreaktion", "burnout", "depression", "trauma"]
    }
  },
  {
    term: "Akute Belastungsreaktion",
    definition: "Vorübergehende Reaktion auf eine außergewöhnliche körperliche oder seelische Belastung.",
    tags: ["Diagnose-Stress"],
    slug: "akute-belastungsreaktion",
    content: {
      teaser: "Eine akute Belastungsreaktion ist eine vorübergehende psychische Störung, die bei Menschen ohne andere erkennbare psychische Erkrankungen als Reaktion auf eine außergewöhnliche körperliche oder seelische Belastung auftritt und in der Regel innerhalb von Stunden oder Tagen abklingt.",
      sections: [
        {
          title: "Definition und Symptomatik",
          content: "Die akute Belastungsreaktion (ICD-10: F43.0) tritt als direkte Folge einer außergewöhnlichen körperlichen oder seelischen Belastung auf und klingt gewöhnlich innerhalb von Stunden oder Tagen ab. Die Symptome zeigen typischerweise ein gemischtes und wechselndes Bild und umfassen ein initiales Stadium von 'Betäubung', gefolgt von weiteren Symptomen wie Rückzug, eingeschränkter Aufmerksamkeit, Desorientierung, Wut oder verbale Aggression, Verzweiflung, unangemessene oder sinnlose Überaktivität oder übermäßige Trauer."
        },
        {
          title: "Unterschied zur Posttraumatischen Belastungsstörung",
          content: "Im Gegensatz zur Posttraumatischen Belastungsstörung (PTBS) ist die akute Belastungsreaktion eine vorübergehende Störung, die ohne spezifische Behandlung binnen weniger Tage bis Wochen wieder abklingt. Die PTBS hingegen entwickelt sich als verzögerte oder protrahierte Reaktion auf ein belastendes Ereignis und kann ohne Behandlung chronifizieren. Die akute Belastungsstörung (DSM-5) kann als Vorläufer einer PTBS angesehen werden, wenn die Symptome länger als drei Tage, aber weniger als einen Monat andauern."
        },
        {
          title: "Bedeutung für Eltern",
          content: "Eltern können akute Belastungsreaktionen als Folge verschiedener Ereignisse entwickeln, wie z.B. nach einem Unfall oder einer plötzlichen Erkrankung des Kindes, nach einer traumatischen Geburtserfahrung oder bei Konfrontation mit anderen schwerwiegenden Stressoren. Das Verständnis dieser normalen Reaktion auf außergewöhnliche Belastungen kann helfen, Schuldgefühle zu reduzieren und frühzeitig Unterstützung zu suchen, wenn die Symptome nicht wie erwartet abklingen."
        },
        {
          title: "Umgang und Unterstützung",
          content: "Der Umgang mit einer akuten Belastungsreaktion umfasst in erster Linie psychosoziale Unterstützung, das Schaffen eines sicheren Umfelds, die Normalisierung der Reaktion und die Förderung adaptiver Bewältigungsstrategien. Betroffene Eltern sollten ermutigt werden, sich Zeit für Erholung zu nehmen, soziale Unterstützung zu nutzen und bei anhaltenden Symptomen professionelle Hilfe in Anspruch zu nehmen, um einer möglichen Entwicklung einer PTBS vorzubeugen."
        }
      ],
      references: [
        "World Health Organization. (2019). International Statistical Classification of Diseases and Related Health Problems (11th ed.).",
        "Bryant, R. A. (2018). The Current Evidence for Acute Stress Disorder. Current Psychiatry Reports, 20(12), 111."
      ],
      relatedTerms: ["stress", "trauma", "posttraumatische-belastungsstoerung", "belastung", "resilienz"]
    }
  },
  {
    term: "Akzeptanz- und Commitment-Therapie",
    alias: "ACT",
    definition: "Siehe ACT.",
    tags: ["Therapie-Ansatz", "Burnout", "ADHS", "Essstörung"],
    slug: "akzeptanz-und-commitment-therapie",
    content: {
      teaser: "Die Akzeptanz- und Commitment-Therapie (ACT) ist ein moderner verhaltenstherapeutischer Ansatz, der darauf abzielt, psychologische Flexibilität zu fördern, indem er Menschen hilft, ihre Gedanken und Gefühle zu akzeptieren und gleichzeitig ein werteorientiertes Leben zu führen.",
      sections: [
        {
          title: "Grundprinzipien",
          content: "ACT basiert auf sechs Kernprozessen: Akzeptanz, kognitive Defusion (Distanzierung von Gedanken), Präsenz im gegenwärtigen Moment (Achtsamkeit), Selbst als Kontext (Beobachter-Perspektive), Werte und engagiertes Handeln. Das Akronym ACT steht für 'Accept' (akzeptiere deine Reaktionen und sei präsent), 'Choose' (wähle eine Richtung basierend auf deinen Werten) und 'Take action' (handle engagiert)."
        },
        {
          title: "Anwendung bei verschiedenen Problemstellungen",
          content: "ACT hat sich als wirksam erwiesen bei der Behandlung von Angststörungen, Depression, chronischen Schmerzen, Essstörungen und Substanzabhängigkeiten. Im Kontext von Eltern-Burnout kann ACT helfen, belastende Gedanken und Gefühle zu akzeptieren, ohne von ihnen überwältigt zu werden, und gleichzeitig Handlungen zu fördern, die mit den persönlichen Werten als Eltern übereinstimmen. Bei ADHS kann ACT die Akzeptanz der Diagnose unterstützen und helfen, trotz Schwierigkeiten ein erfüllendes Leben zu führen."
        },
        {
          title: "Unterschied zu traditionellen Ansätzen",
          content: "Im Gegensatz zu traditionellen kognitiven Verhaltenstherapien zielt ACT nicht primär darauf ab, negative Gedanken oder Gefühle zu reduzieren oder zu verändern. Stattdessen fördert ACT die Bereitschaft, diese Erfahrungen zu akzeptieren und gleichzeitig Schritte in Richtung eines wertvollen Lebens zu unternehmen, unabhängig von diesen Erfahrungen."
        }
      ],
      references: [
        "Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2011). Acceptance and Commitment Therapy: The Process and Practice of Mindful Change. Guilford Press.",
        "A-Tjak, J. G., Davis, M. L., Morina, N., Powers, M. B., Smits, J. A., & Emmelkamp, P. M. (2015). A meta-analysis of the efficacy of acceptance and commitment therapy for clinically relevant mental and physical health problems. Psychotherapy and Psychosomatics, 84(1), 30-36."
      ],
      relatedTerms: ["achtsamkeit", "akzeptanz", "werteorientierung", "psychologische-flexibilitaet"]
    }
  },
  {
    term: "Alltagssprache",
    alias: "Eltern",
    definition: "Begriffe und Formulierungen, die Eltern selbst verwenden, um ihre Erfahrungen zu beschreiben (z.B. \"am Ende sein\", \"ausgelaugt\").",
    tags: ["Alltag", "Elternsprache", "Glossar"],
    slug: "alltagssprache",
    content: {
      teaser: "Alltagssprache im Kontext von Eltern bezieht sich auf die informellen Begriffe und Ausdrücke, die Eltern verwenden, um ihre täglichen Erfahrungen, Herausforderungen und Emotionen zu beschreiben, oft ohne klinisch-diagnostische Terminologie.",
      sections: [
        {
          title: "Bedeutung der Alltagssprache",
          content: "Die Alltagssprache von Eltern spiegelt ihre individuellen Erfahrungen und Wahrnehmungen wider und bildet eine wichtige Brücke zwischen Fachterminologie und persönlichem Erleben. Ausdrücke wie 'am Ende sein', 'ausgelaugt' oder 'nicht mehr können' beschreiben Zustände, die in der klinischen Sprache möglicherweise als Erschöpfungszustände oder Burnout-Symptome bezeichnet würden. Die Alltagssprache ermöglicht es Eltern, ihre Erlebnisse authentisch zu kommunizieren, ohne sich an formelle Definitionen halten zu müssen."
        },
        {
          title: "Anerkennung im professionellen Kontext",
          content: "Für Fachpersonen im psychosozialen Bereich ist es wichtig, die Alltagssprache der Eltern zu verstehen und anzuerkennen, um eine vertrauensvolle Kommunikation zu ermöglichen. Wenn Eltern beispielsweise sagen, ihr Kind sei 'zappelig', könnte dies in der Fachsprache als 'motorische Unruhe' oder als mögliches Symptom von ADHS beschrieben werden. Die Anerkennung der elterlichen Ausdrucksweise schafft Vertrauen und fördert ein gemeinsames Verständnis für die Situation."
        },
        {
          title: "Übersetzung zwischen Alltagssprache und Fachsprache",
          content: "Ein wichtiger Aspekt in der Kommunikation zwischen Eltern und Fachpersonen ist die 'Übersetzungsarbeit' zwischen Alltagssprache und Fachterminologie. Diese Übersetzung hilft einerseits Eltern, ihre Erfahrungen in einen größeren Kontext einzuordnen und mögliche Unterstützungsangebote zu finden. Andererseits hilft sie Fachpersonen, die individuellen Erlebnisse der Eltern richtig zu verstehen und einzuordnen, ohne sie vorschnell zu pathologisieren oder zu bagatellisieren."
        }
      ],
      relatedTerms: ["am-ende-sein", "ausgelaugt", "ueberfordert", "nicht-mehr-koennen", "zappelig", "dreht-auf"]
    }
  },
  {
    term: "Am Ende sein",
    definition: "Gefühl völliger körperlicher und emotionaler Erschöpfung und Überforderung.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout"],
    slug: "am-ende-sein",
    content: {
      teaser: "'Am Ende sein' beschreibt einen Zustand tiefer körperlicher und emotionaler Erschöpfung, bei dem man das Gefühl hat, keine Ressourcen mehr zur Bewältigung alltäglicher Anforderungen zu haben - ein häufiger Ausdruck für Burnout-ähnliche Zustände bei Eltern.",
      sections: [
        {
          title: "Bedeutung und Erleben",
          content: "'Am Ende sein' ist ein Ausdruck aus der Alltagssprache, der einen Zustand beschreibt, in dem Menschen sich völlig erschöpft, kraftlos und überfordert fühlen. Bei Eltern kann dieses Gefühl durch die anhaltende Belastung der Kindererziehung in Kombination mit anderen Verpflichtungen entstehen. Es beschreibt einen Punkt, an dem die eigenen Ressourcen aufgebraucht erscheinen und selbst alltägliche Aufgaben überwältigend wirken. Betroffene haben oft das Gefühl, nicht mehr weiterzukönnen und keine Reserven mehr zu haben."
        },
        {
          title: "Warnsignal für Burnout",
          content: "Das Gefühl, 'am Ende zu sein', ist ein wichtiges Warnsignal, das auf einen beginnenden oder fortgeschrittenen Burnout hinweisen kann. Im Gegensatz zur normalen Müdigkeit, die durch ausreichend Erholung abklingt, ist dieser Zustand tiefer und anhaltender. Er kann mit weiteren Symptomen wie Reizbarkeit, Schlafstörungen, verminderter Leistungsfähigkeit, erhöhter Anfälligkeit für Erkrankungen und emotionaler Distanz zu den eigenen Kindern einhergehen."
        },
        {
          title: "Umgang und Unterstützung",
          content: "Wenn Eltern sich 'am Ende' fühlen, ist es wichtig, dieses Signal ernst zu nehmen und aktiv gegenzusteuern. Kurzfristig kann es hilfreich sein, konkrete Entlastung zu organisieren (z.B. durch Unterstützung bei der Kinderbetreuung) und sich bewusst Auszeiten zu nehmen. Mittel- und langfristig können Änderungen in der Alltagsorganisation, Stressmanagement-Techniken, der Aufbau von Unterstützungsnetzwerken und eine Überprüfung der eigenen Ansprüche und Prioritäten hilfreich sein. Bei anhaltenden Beschwerden ist professionelle Unterstützung durch Beratungsstellen, Psychotherapie oder ärztliche Begleitung ratsam, um einer Chronifizierung vorzubeugen."
        }
      ],
      relatedTerms: ["burnout", "erschoepfung", "ausgelaugt", "ueberfordert", "stress", "selbstfuersorge"]
    }
  },
  {
    term: "Anorexia",
    alias: "Symptom",
    definition: "Appetitlosigkeit als Symptom, nicht die spezifische Diagnose Anorexia Nervosa. (ICD-10: R63.0)",
    tags: ["Symptom-Essstörung", "Diagnose"],
    slug: "anorexia-symptom",
    content: {
      teaser: "Anorexia als Symptom bezieht sich auf Appetitlosigkeit oder Appetitverminderung ohne Hungergefühl, unabhängig von der spezifischen Essstörung Anorexia Nervosa. Es kann bei verschiedenen körperlichen und psychischen Zuständen auftreten.",
      sections: [
        {
          title: "Definition und Abgrenzung",
          content: "Der Begriff 'Anorexia' (ICD-10: R63.0) bezeichnet als Symptom den Verlust des Appetits oder das Fehlen von Hungergefühlen, auch wenn der Körper objektiv Nahrung benötigt. Dies unterscheidet sich von der Essstörung 'Anorexia Nervosa' (ICD-10: F50.0), bei der die Nahrungsverweigerung nicht durch mangelnden Appetit, sondern durch die Angst vor Gewichtszunahme und eine gestörte Körperwahrnehmung motiviert ist. Als Symptom kann Anorexia bei verschiedenen körperlichen und psychischen Zuständen auftreten und ist nicht auf Essstörungen beschränkt."
        },
        {
          title: "Ursachen",
          content: "Appetitlosigkeit kann durch verschiedene Faktoren verursacht werden. Körperliche Ursachen umfassen Infektionen, Stoffwechselstörungen, Nebenwirkungen von Medikamenten, Krebserkrankungen oder entzündliche Prozesse. Psychische Faktoren wie Depression, Angststörungen, akute Stresssituationen oder Trauer können ebenfalls zu Appetitlosigkeit führen. Bei Kindern kann Appetitlosigkeit auch entwicklungsbedingt sein oder durch Umgebungsfaktoren wie Familienspannungen oder unangenehme Esssituationen beeinflusst werden."
        },
        {
          title: "Bedeutung bei Kindern und Jugendlichen",
          content: "Bei Kindern und Jugendlichen ist die Unterscheidung zwischen normalen Schwankungen des Essverhaltens, vorübergehender Appetitlosigkeit und beginnenden Essstörungen besonders wichtig. Während kurzzeitige Appetitlosigkeit bei Kindern häufig harmlos ist (z.B. während einer Erkrankung oder in Phasen geringeren Wachstums), erfordert anhaltende Appetitlosigkeit eine ärztliche Abklärung. Für Eltern ist es wichtig, zwischen altersentsprechenden Phasen wählerischen Essverhaltens, vorübergehender Appetitlosigkeit und problematischen Entwicklungen zu unterscheiden."
        },
        {
          title: "Umgang und Intervention",
          content: "Der Umgang mit Appetitlosigkeit hängt von der Ursache ab. Bei körperlichen Erkrankungen steht die Behandlung der Grunderkrankung im Vordergrund. Bei psychisch bedingter Appetitlosigkeit können Stressreduktion, psychologische Unterstützung oder psychiatrische Behandlung hilfreich sein. Bei Kindern mit vorübergehender Appetitlosigkeit ist es wichtig, einen entspannten Umgang mit dem Thema Essen zu bewahren, Machtkämpfe zu vermeiden und positive Esserlebnisse zu schaffen. Bei Verdacht auf eine beginnende Essstörung sollte frühzeitig fachliche Hilfe in Anspruch genommen werden."
        }
      ],
      references: [
        "World Health Organization. (2019). International Statistical Classification of Diseases and Related Health Problems (11th ed.).",
        "Bryant-Waugh, R., & Lask, B. (2013). Overview of eating disorders in childhood and adolescence. In B. Lask & R. Bryant-Waugh (Eds.), Eating disorders in childhood and adolescence (4th ed., pp. 33-49). Routledge."
      ],
      relatedTerms: ["anorexia-nervosa", "appetitlosigkeit", "essproblem-kind", "essstoerung"]
    }
  },
  {
    term: "Anorexia Nervosa",
    alias: "Magersucht",
    definition: "Essstörung gekennzeichnet durch starkes Untergewicht, intensive Angst vor Gewichtszunahme und eine gestörte Körperwahrnehmung. (ICD-10: F50.0)",
    tags: ["Diagnose-Essstörung"],
    slug: "anorexia-nervosa",
    content: {
      teaser: "Anorexia Nervosa (Magersucht) ist eine ernsthafte psychische Erkrankung, gekennzeichnet durch selbst herbeigeführten Gewichtsverlust, intensive Angst vor Gewichtszunahme und gestörte Körperwahrnehmung, die besonders häufig im Jugendalter beginnt.",
      sections: [
        {
          title: "Definition und Diagnosekriterien",
          content: "Anorexia Nervosa (ICD-10: F50.0) ist gekennzeichnet durch einen absichtlich herbeigeführten oder aufrechterhaltenen Gewichtsverlust, der zu einem Body-Mass-Index (BMI) von unter 17,5 kg/m² bei Erwachsenen oder einem entsprechenden Perzentilwert bei Kindern und Jugendlichen führt. Die Betroffenen haben eine ausgeprägte Angst vor Gewichtszunahme trotz Untergewicht und eine Störung der Körperwahrnehmung, bei der sie sich als zu dick empfinden, obwohl sie objektiv untergewichtig sind. Oft besteht eine Verleugnung des Krankheitswertes und der Gefährlichkeit des niedrigen Körpergewichts."
        },
        {
          title: "Subtypen und Erscheinungsformen",
          content: "Es werden zwei Hauptsubtypen unterschieden: Der restriktive Typ (F50.01), bei dem das niedrige Gewicht hauptsächlich durch Nahrungsrestriktion und/oder exzessive körperliche Aktivität erreicht wird, und der Binge-Eating/Purging-Typ (F50.02), bei dem zusätzlich regelmäßig Essanfälle und/oder 'purging'-Verhalten (selbstinduziertes Erbrechen, Missbrauch von Abführmitteln, Diuretika etc.) auftreten. Bei Kindern und jüngeren Jugendlichen kann sich die Erkrankung anders präsentieren als bei Erwachsenen, beispielsweise durch Wachstumsstillstand oder verzögerte Pubertät statt Gewichtsverlust."
        },
        {
          title: "Medizinische Komplikationen",
          content: "Anorexia Nervosa kann zu schwerwiegenden körperlichen Komplikationen führen, darunter Herzrhythmusstörungen, Elektrolytstörungen, Osteoporose, Amenorrhoe (Ausbleiben der Menstruation), Unfruchtbarkeit, Wachstumsstörungen und in schweren Fällen zum Tod. Die Erkrankung hat die höchste Mortalitätsrate unter allen psychischen Störungen, bedingt sowohl durch medizinische Komplikationen als auch durch eine erhöhte Suizidrate."
        },
        {
          title: "Behandlung und Prognose",
          content: "Die Behandlung der Anorexia Nervosa erfordert einen multidisziplinären Ansatz, der Ernährungstherapie, Psychotherapie (insbesondere kognitive Verhaltenstherapie, familienbasierte Therapie bei Jugendlichen) und medizinische Überwachung umfasst. Bei schweren Fällen kann eine stationäre Behandlung oder sogar eine Zwangsernährung notwendig sein. Die Prognose ist besser bei frühzeitiger Intervention, jüngerem Erkrankungsalter und Einbeziehung der Familie in die Behandlung. Dennoch ist Anorexia Nervosa oft chronisch verlaufend und erfordert langfristige Behandlung und Begleitung."
        },
        {
          title: "Bedeutung für Eltern",
          content: "Für Eltern ist es wichtig, Warnsignale wie deutlichen Gewichtsverlust, stark eingeschränkte Nahrungsaufnahme, übermäßige Beschäftigung mit Essen, Gewicht und Figur, sozialen Rückzug oder zwanghaften Sport zu erkennen. Eine frühzeitige Intervention verbessert die Prognose erheblich. In der Behandlung von Kindern und Jugendlichen spielt die Familie eine zentrale Rolle, besonders in familienbasierten Therapieansätzen wie der Maudsley-Methode, bei der die Eltern aktiv in die Normalisierung des Essverhaltens einbezogen werden."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Lock, J., & Le Grange, D. (2015). Treatment manual for anorexia nervosa: A family-based approach (2nd ed.). Guilford Publications."
      ],
      relatedTerms: ["magersucht", "essstoerung", "untergewicht", "koerperbild", "familienbasierte-therapie"]
    }
  },
  {
    term: "Anorexia Nervosa, Binge-Eating/Purging Type",
    definition: "Subtyp der Anorexia Nervosa, bei dem neben restriktivem Essverhalten auch Essanfälle und/oder selbstinduziertes Erbrechen oder andere kompensatorische Verhaltensweisen auftreten. (ICD-10: F50.02)",
    tags: ["Diagnose-Essstörung"],
    slug: "anorexia-nervosa-binge-purging",
    content: {
      teaser: "Der Binge-Eating/Purging-Typ der Anorexia Nervosa ist ein komplexer Subtyp, bei dem Betroffene neben dem restriktiven Essverhalten und deutlichem Untergewicht auch regelmäßig Essanfälle und/oder kompensatorische Maßnahmen wie selbstinduziertes Erbrechen oder Missbrauch von Abführmitteln zeigen.",
      sections: [
        {
          title: "Klinisches Bild und Besonderheiten",
          content: "Beim Binge-Eating/Purging-Typ der Anorexia Nervosa (ICD-10: F50.02) erfüllen die Betroffenen alle grundlegenden Kriterien der Anorexia Nervosa - deutliches Untergewicht, Angst vor Gewichtszunahme und Körperbildstörung - zeigen aber zusätzlich regelmäßig Essanfälle und/oder Purging-Verhalten (selbstinduziertes Erbrechen, Missbrauch von Abführmitteln, Diuretika oder Einläufen). Dieser Subtyp stellt eine Art Mischform zwischen Anorexia Nervosa und Bulimia Nervosa dar und zeigt oft eine stärkere Impulsivität und emotionale Instabilität als der restriktive Typ."
        },
        {
          title: "Risiken und Komplikationen",
          content: "Der Binge-Eating/Purging-Typ ist mit besonderen gesundheitlichen Risiken verbunden. Neben den für Anorexia Nervosa typischen Komplikationen des Untergewichts kommen spezifische Folgen des Purging-Verhaltens hinzu: Elektrolytstörungen (besonders gefährlich: Kaliummangel), Säure-Basen-Haushalt-Störungen, Zahnschäden durch Magensäure, Verletzungen der Speiseröhre, Entzündungen der Speicheldrüsen und Schwielen an den Fingerknöcheln ('Russell's Sign'). Dieses Muster ist oft mit einer höheren Komorbidität mit anderen psychischen Störungen wie Persönlichkeitsstörungen, Selbstverletzung und Substanzmissbrauch assoziiert."
        },
        {
          title: "Behandlungsbesonderheiten",
          content: "Die Behandlung des Binge-Eating/Purging-Typs der Anorexia Nervosa ist oft komplexer als die des restriktiven Typs. Sie erfordert nicht nur die Normalisierung des Essverhaltens und Gewichts, sondern auch spezifische Interventionen zur Unterbrechung des Binge-Purging-Zyklus. Die Therapie umfasst in der Regel sowohl Elemente aus der Behandlung der Anorexia Nervosa als auch der Bulimia Nervosa. Besondere Aufmerksamkeit muss der Behandlung von Impulsivität, emotionaler Dysregulation und komorbiden Störungen gewidmet werden. Dialektisch-Behaviorale Therapie (DBT) oder andere Ansätze zur Emotionsregulation können besonders hilfreich sein."
        },
        {
          title: "Prognose und Verlauf",
          content: "Der Binge-Eating/Purging-Typ der Anorexia Nervosa ist oft mit einem schwereren Krankheitsverlauf und einer schlechteren Prognose assoziiert als der restriktive Typ. Es besteht ein höheres Risiko für chronische Verläufe, häufigere stationäre Aufnahmen und eine höhere Mortalitätsrate. Zudem kommt es häufiger zu diagnostischen Übergängen, insbesondere zur Bulimia Nervosa oder zur nicht näher bezeichneten Essstörung (EDNOS). Eine frühzeitige, intensive und auf die spezifischen Bedürfnisse angepasste Behandlung ist daher besonders wichtig."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Eddy, K. T., Tabri, N., Thomas, J. J., Murray, H. B., Keshaviah, A., Hastings, E., ... & Franko, D. L. (2017). Recovery from anorexia nervosa and bulimia nervosa at 22-year follow-up. Journal of Clinical Psychiatry, 78(2), 184-189."
      ],
      relatedTerms: ["anorexia-nervosa", "bulimia-nervosa", "purging", "essanfall", "erbrechen", "abfuehrmittelmissbrauch"]
    }
  },
  {
    term: "Anorexia Nervosa, Restricting Type",
    definition: "Subtyp der Anorexia Nervosa, bei dem das Untergewicht primär durch Hungern, Diäten oder exzessiven Sport erreicht wird, ohne regelmäßige Essanfälle oder Purging-Verhalten. (ICD-10: F50.01)",
    tags: ["Diagnose-Essstörung"],
    slug: "anorexia-nervosa-restricting",
    content: {
      teaser: "Der restriktive Typ der Anorexia Nervosa ist gekennzeichnet durch stark eingeschränkte Nahrungsaufnahme und/oder übermäßige körperliche Aktivität zum Gewichtsverlust, ohne regelmäßige Essanfälle oder kompensatorische Maßnahmen wie Erbrechen oder Abführmittelmissbrauch.",
      sections: [
        {
          title: "Klinisches Bild",
          content: "Beim restriktiven Typ der Anorexia Nervosa (ICD-10: F50.01) erreichen und halten die Betroffenen ihr deutlich zu niedriges Körpergewicht primär durch Kalorienrestriktion, selektives Essverhalten und/oder übermäßige körperliche Betätigung. Im Gegensatz zum Binge-Eating/Purging-Typ treten keine regelmäßigen Essanfälle auf, und es werden keine kompensatorischen Verhaltensweisen wie selbstinduziertes Erbrechen oder Missbrauch von Abführmitteln eingesetzt. Charakteristisch sind eine starke Selbstkontrolle, rigide Essensregeln und oft ritualisierte Verhaltensweisen rund um die Nahrungsaufnahme."
        },
        {
          title: "Psychologische Merkmale",
          content: "Betroffene mit dem restriktiven Typ zeigen häufig bestimmte Persönlichkeitsmerkmale wie Perfektionismus, zwanghafte Züge, hohe Leistungsorientierung und ein starkes Kontrollbedürfnis. Diese Eigenschaften, die oft schon vor der Erkrankung bestehen, können einerseits als prädisponierende Faktoren wirken und werden andererseits durch die Mangelernährung noch verstärkt. Im Vergleich zum Binge-Eating/Purging-Typ weisen Patienten mit dem restriktiven Typ typischerweise weniger Impulsivität und emotionale Instabilität auf, zeigen aber oft eine stärkere emotionale Rigidität und soziale Hemmung."
        },
        {
          title: "Körperliche Folgen",
          content: "Die körperlichen Folgen des restriktiven Typs der Anorexia Nervosa sind primär durch die chronische Mangelernährung und das extreme Untergewicht bedingt. Dazu gehören Herz-Kreislauf-Probleme wie Bradykardie (verlangsamter Herzschlag) und Hypotonie (niedriger Blutdruck), hormonelle Störungen mit Ausbleiben der Menstruation (Amenorrhoe), Osteoporose, Muskelschwund, Elektrolytstörungen, gestörte Thermoregulation mit ständigem Frieren, Lanugo-Behaarung (feiner Haarflaum am Körper) sowie psychomotorische Verlangsamung und kognitive Beeinträchtigungen."
        },
        {
          title: "Behandlungsansätze",
          content: "Die Behandlung des restriktiven Typs der Anorexia Nervosa konzentriert sich auf die schrittweise Normalisierung des Essverhaltens, die Gewichtszunahme und die Veränderung dysfunktionaler Denkmuster bezüglich Gewicht, Figur und Selbstwert. Bei Jugendlichen hat sich besonders die familienbasierte Therapie (Maudsley-Ansatz) als wirksam erwiesen, bei der die Eltern aktiv in die Wiederherstellung eines normalen Essverhaltens einbezogen werden. Bei Erwachsenen kommen vor allem kognitive Verhaltenstherapie, fokale psychodynamische Therapie und in schweren Fällen eine stationäre multimodale Behandlung zum Einsatz. Die Prognose ist bei frühzeitiger Intervention besser als beim Binge-Eating/Purging-Typ, aber die Behandlung erfordert oft Geduld und langfristige Begleitung."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Lock, J., & Le Grange, D. (2015). Treatment manual for anorexia nervosa: A family-based approach (2nd ed.). Guilford Publications."
      ],
      relatedTerms: ["anorexia-nervosa", "kalorienrestriktion", "untergewicht", "amenorrhoe", "familienbasierte-therapie"]
    }
  },
  {
    term: "Anorexia Nervosa, Unspecified",
    definition: "Diagnose, wenn die Kriterien für Anorexia Nervosa erfüllt sind, aber der Subtyp nicht spezifiziert ist. (ICD-10: F50.00)",
    tags: ["Diagnose-Essstörung"],
    slug: "anorexia-nervosa-unspecified",
    content: {
      teaser: "Anorexia Nervosa, unspezifischer Typ (ICD-10: F50.00) bezieht sich auf Fälle, bei denen die diagnostischen Kriterien für Anorexia Nervosa erfüllt sind, aber eine Einordnung in die spezifischen Subtypen (restriktiver Typ oder Binge-Eating/Purging-Typ) nicht möglich oder nicht erfolgt ist.",
      sections: [
        {
          title: "Diagnostische Einordnung",
          content: "Die Diagnose 'Anorexia Nervosa, unspezifisch' wird gestellt, wenn eine Person die grundlegenden Kriterien der Anorexia Nervosa erfüllt - deutlich niedriges Körpergewicht, intensive Angst vor Gewichtszunahme trotz Untergewicht und eine Störung der Körperwahrnehmung - aber aus verschiedenen Gründen keine eindeutige Zuordnung zu einem der spezifischen Subtypen erfolgt. Dies kann der Fall sein, wenn das Essverhalten variiert, die klinische Beurteilung nicht ausreichend Informationen über das Vorhandensein von Essanfällen oder Purging-Verhalten ergibt oder wenn sich das Muster der Essstörung im Verlauf der Erkrankung häufig ändert."
        },
        {
          title: "Klinische Bedeutung",
          content: "Obwohl die Spezifizierung des Subtyps wichtige Informationen für die Behandlungsplanung liefern kann, hat die unspezifische Diagnose denselben klinischen Stellenwert wie die spezifischeren Diagnosen. Die grundlegenden Behandlungsprinzipien - Normalisierung des Essverhaltens, Gewichtsrehabilitation und Korrektur dysfunktionaler Denkmuster - gelten unabhängig vom Subtyp. Die unspezifische Diagnose kann als vorläufige Diagnose gestellt werden, wenn noch nicht genügend Informationen für eine spezifischere Einordnung vorliegen, aber eine Behandlung bereits eingeleitet werden soll."
        },
        {
          title: "Verlauf und Wechsel zwischen Subtypen",
          content: "Die Forschung zeigt, dass die Subtypen der Anorexia Nervosa nicht immer stabil sind und sich im Krankheitsverlauf ändern können. Etwa die Hälfte der Patienten mit initial restriktivem Typ entwickelt im Verlauf Essanfälle oder Purging-Verhalten. Umgekehrt können Patienten mit Binge-Eating/Purging-Typ in Phasen übergehen, in denen ausschließlich restriktives Essverhalten vorliegt. Diese Fluktuationen im Symptommuster unterstreichen die Bedeutung einer kontinuierlichen klinischen Beurteilung und Anpassung der Behandlungsstrategien."
        },
        {
          title: "Übergang zu anderen Essstörungsdiagnosen",
          content: "Neben dem Wechsel zwischen den Subtypen der Anorexia Nervosa kann es im Krankheitsverlauf auch zu diagnostischen Übergängen zu anderen Essstörungen kommen. So entwickeln etwa 10-50% der Patienten mit Anorexia Nervosa im Verlauf eine Bulimia Nervosa, was als 'diagnostischer Crossover' bezeichnet wird. Diese Übergänge sind besonders häufig beim Binge-Eating/Purging-Typ der Anorexia Nervosa. Die unspezifische Diagnose kann in manchen Fällen ein Hinweis auf ein instabiles oder im Wandel begriffenes Symptommuster sein, das ein erhöhtes Risiko für solche diagnostischen Übergänge birgt."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Eddy, K. T., Tabri, N., Thomas, J. J., Murray, H. B., Keshaviah, A., Hastings, E., ... & Franko, D. L. (2017). Recovery from anorexia nervosa and bulimia nervosa at 22-year follow-up. Journal of Clinical Psychiatry, 78(2), 184-189."
      ],
      relatedTerms: ["anorexia-nervosa", "anorexia-nervosa-restricting", "anorexia-nervosa-binge-purging", "essstoerung-diagnostik"]
    }
  },
  {
    term: "Anpassungsstörung",
    definition: "Siehe Adjustment Disorder.",
    tags: ["Diagnose-Stress", "Diagnose-Burnout"],
    slug: "anpassungsstoerung",
    content: {
      teaser: "Eine Anpassungsstörung (Adjustment Disorder) ist eine maladaptive Reaktion auf identifizierbare psychosoziale Belastungsfaktoren, die zu signifikantem Leiden und Beeinträchtigungen führt, aber nicht die Kriterien für eine spezifischere psychische Störung erfüllt.",
      sections: [
        {
          title: "Definition und Diagnosekriterien",
          content: "Eine Anpassungsstörung ist durch emotionale oder Verhaltenssymptome gekennzeichnet, die innerhalb von drei Monaten nach Beginn einer identifizierbaren Belastung auftreten. Diese Reaktion geht über eine normale oder erwartbare Reaktion auf den Stressor hinaus und verursacht signifikantes Leiden oder Beeinträchtigungen im sozialen, beruflichen oder anderen wichtigen Funktionsbereichen. Die Symptome dürfen nicht länger als sechs Monate nach Ende des Stressors oder seiner Folgen anhalten, um als Anpassungsstörung diagnostiziert zu werden."
        },
        {
          title: "Untertypen und klinisches Bild",
          content: "Je nach vorherrschender Symptomatik werden verschiedene Untertypen unterschieden: mit depressiver Stimmung, mit Angst, mit gemischter Angst und depressiver Stimmung, mit Störung des Sozialverhaltens, mit gemischter Störung von Gefühlen und Sozialverhalten sowie unspezifiziert. Bei Eltern können Anpassungsstörungen durch verschiedene Belastungen ausgelöst werden, wie die Geburt eines Kindes mit besonderen Bedürfnissen, Veränderungen der Familiensituation, berufliche Herausforderungen oder andere signifikante Lebensereignisse."
        },
        {
          title: "Abgrenzung zum Burnout und anderen Störungen",
          content: "Im Gegensatz zum Burnout-Syndrom, das typischerweise durch chronische Arbeits- oder Familienbelastungen entsteht und nicht als eigenständige Diagnosekategorie klassifiziert ist, bezieht sich eine Anpassungsstörung auf eine spezifische, identifizierbare Belastungssituation. Die Abgrenzung zur posttraumatischen Belastungsstörung liegt in der Schwere des auslösenden Ereignisses, das bei einer PTBS ein traumatisches Ausmaß hat. Von depressiven oder Angststörungen unterscheidet sich die Anpassungsstörung durch den direkten zeitlichen und kausalen Zusammenhang mit einem spezifischen Stressor."
        },
        {
          title: "Behandlung",
          content: "Die Behandlung einer Anpassungsstörung zielt auf die Bewältigung des Stressors und die Linderung der Symptome ab. Psychotherapeutische Ansätze wie kognitive Verhaltenstherapie, Problemlösetraining und unterstützende Gespräche helfen, adaptive Bewältigungsstrategien zu entwickeln. In einigen Fällen kann eine kurzfristige medikamentöse Unterstützung, z.B. mit Anxiolytika oder Antidepressiva, erwogen werden. Soziale Unterstützung und praktische Hilfen bei der Bewältigung der Belastungssituation sind ebenfalls wichtig."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Casey, P., & Bailey, S. (2011). Adjustment disorders: the state of the art. World Psychiatry, 10(1), 11-18."
      ],
      relatedTerms: ["stress", "belastungsreaktion", "burnout", "depression", "trauma"]
    }
  },
  {
    term: "Anstrengung",
    definition: "Hoher subjektiv empfundener Energieaufwand, um den Alltag oder spezifische Aufgaben zu bewältigen.",
    tags: ["Alltag", "Symptom-Burnout", "Symptom-ADHS", "Symptom-Essstörung"],
    slug: "anstrengung",
    content: {
      teaser: "Anstrengung beschreibt den subjektiven Energieaufwand, der nötig ist, um Aktivitäten zu bewältigen. Bei Erschöpfungszuständen, ADHS oder Essstörungen kann selbst der Alltag als unverhältnismäßig anstrengend erlebt werden.",
      sections: [
        {
          title: "Bedeutung und Erleben",
          content: "Anstrengung bezieht sich auf die subjektiv empfundene Mühe oder den Kraftaufwand, der erforderlich ist, um bestimmte Aufgaben oder Aktivitäten zu bewältigen. Während ein gewisses Maß an Anstrengung bei herausfordernden Tätigkeiten normal ist, kann das Erleben unverhältnismäßiger Anstrengung bei alltäglichen Aufgaben ein wichtiges Symptom verschiedener psychischer und körperlicher Zustände sein. Bei Burnout oder Erschöpfungszuständen können selbst einfache Alltagsaktivitäten als übermäßig anstrengend empfunden werden, was zu einem Teufelskreis aus Vermeidung, reduzierter Aktivität und weiterer Erschöpfung führen kann."
        },
        {
          title: "Anstrengung und Burnout",
          content: "Im Kontext eines Burnouts oder einer Erschöpfungsdepression ist die erhöhte subjektive Anstrengung ein Kernsymptom. Betroffene berichten, dass selbst einfache Handlungen wie das Aufstehen am Morgen, persönliche Hygiene oder soziale Interaktionen einen unverhältnismäßig hohen Energieaufwand erfordern. Diese erhöhte Anstrengung hängt mit der emotionalen, kognitiven und körperlichen Erschöpfung zusammen und wird oft begleitet von verminderter Belastbarkeit und einem Gefühl, sich ständig zu überfordern. Für Eltern kann dies bedeuten, dass die Bewältigung des Familienalltags und die Erfüllung der elterlichen Pflichten als zunehmend anstrengend und überwältigend erlebt werden."
        },
        {
          title: "Anstrengung bei ADHS",
          content: "Menschen mit ADHS erleben oft eine erhöhte Anstrengung in Bereichen, die exekutive Funktionen erfordern, wie Aufmerksamkeitsfokussierung, Organisation, Planung oder Impulskontrolle. Diese erhöhte Anstrengung resultiert aus der neurobiologischen Grundlage der Störung und ist nicht einfach durch mangelnde Motivation oder Faulheit erklärbar. Ein Kind mit ADHS muss beispielsweise deutlich mehr mentale Energie aufwenden, um im Unterricht aufmerksam zu bleiben oder Hausaufgaben zu erledigen, als ein Kind ohne ADHS. Dieses ständige 'Gegen-den-Strom-Schwimmen' kann zu chronischer Erschöpfung und sekundären psychischen Problemen führen."
        },
        {
          title: "Anstrengung im Kontext von Essstörungen",
          content: "Bei Essstörungen kann sich erhöhte Anstrengung in verschiedenen Bereichen zeigen. Menschen mit Anorexia Nervosa investieren oft übermäßige Energie in die Kontrolle ihrer Nahrungsaufnahme und körperlichen Aktivität sowie in die ständige Beschäftigung mit Essen, Gewicht und Figur. Die Mangelernährung selbst führt zu einer verminderten körperlichen Leistungsfähigkeit, wodurch alltägliche Aktivitäten anstrengender werden. Gleichzeitig besteht oft ein zwanghafter Drang zu übermäßiger körperlicher Aktivität trotz Erschöpfung. Bei Bulimia Nervosa und Binge-Eating-Störung kann die emotionale und kognitive Anstrengung, die mit der Kontrolle von Essanfällen und dem Umgang mit Scham und Schuldgefühlen verbunden ist, erheblich sein."
        }
      ],
      relatedTerms: ["erschoepfung", "burnout", "ueberfordert", "stress", "energielosigkeit", "adhs", "essstoerung"]
    }
  },
  {
    term: "Attention-Deficit Hyperactivity Disorder",
    alias: "ADHS",
    definition: "Siehe ADHS.",
    tags: ["Diagnose-ADHS"],
    slug: "attention-deficit-hyperactivity-disorder",
    content: {
      teaser: "Attention-Deficit Hyperactivity Disorder (ADHS) ist die englische Bezeichnung für die Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung, eine neurobiologische Entwicklungsstörung, die sich durch Probleme mit Aufmerksamkeit, Impulskontrolle und/oder Hyperaktivität äußert.",
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
      relatedTerms: ["adhs", "hyperaktiv", "impulsivitaet", "aufmerksamkeitsstoerung", "multimodale-therapie", "elterntraining"]
    }
  },
  {
    term: "Atypical Anorexia Nervosa",
    definition: "Essstörung mit Merkmalen der Anorexia Nervosa, bei der jedoch trotz signifikantem Gewichtsverlust das Gewicht im Normalbereich oder darüber liegt. (ICD-10: F50.1)",
    tags: ["Diagnose-Essstörung"],
    slug: "atypical-anorexia-nervosa",
    content: {
      teaser: "Atypische Anorexia Nervosa ist eine Essstörung, bei der alle psychologischen Merkmale der klassischen Anorexia Nervosa vorliegen, das Körpergewicht jedoch trotz signifikantem Gewichtsverlust im Normalbereich oder darüber bleibt.",
      sections: [
        {
          title: "Definition und Diagnosekriterien",
          content: "Die atypische Anorexia Nervosa (ICD-10: F50.1) ist eine Variante der Anorexia Nervosa, bei der die Betroffenen einen klinisch signifikanten Gewichtsverlust erfahren haben, ihr Body-Mass-Index (BMI) aber immer noch im Normal- oder sogar im Übergewichtsbereich liegt. Trotz des 'normalen' Gewichts zeigen die Betroffenen dieselben psychologischen Merkmale wie bei der klassischen Anorexia Nervosa: intensive Angst vor Gewichtszunahme, gestörte Körperwahrnehmung und ein übermäßiger Einfluss von Körpergewicht und -form auf die Selbstbewertung. Im DSM-5 ist diese Störung als 'Atypische Anorexia Nervosa' unter der Kategorie 'Other Specified Feeding or Eating Disorders' (OSFED) klassifiziert."
        },
        {
          title: "Klinische Bedeutung und gesundheitliche Folgen",
          content: "Trotz des nicht-untergewichtigen Status können die gesundheitlichen Folgen der atypischen Anorexia Nervosa genauso schwerwiegend sein wie bei der klassischen Form. Der schnelle und signifikante Gewichtsverlust kann zu ähnlichen medizinischen Komplikationen führen, darunter Herzrhythmusstörungen, Elektrolytstörungen, Amenorrhoe (Ausbleiben der Menstruation), Knochendichteverlust und andere endokrine Veränderungen. Forschungsergebnisse deuten darauf hin, dass die psychische Belastung bei atypischer Anorexia Nervosa der bei klassischer Anorexia Nervosa entspricht oder diese sogar übertreffen kann, möglicherweise aufgrund zusätzlicher Stigmatisierung und des Gefühls, 'nicht krank genug' zu sein, um Hilfe zu verdienen."
        },
        {
          title: "Besondere Herausforderungen in Diagnose und Behandlung",
          content: "Die Diagnose der atypischen Anorexia Nervosa stellt besondere Herausforderungen dar, da die Betroffenen äußerlich oft nicht als 'untergewichtig' oder 'krank' erscheinen. Dies kann dazu führen, dass die Störung von Angehörigen, aber auch von Fachpersonen übersehen oder bagatellisiert wird. Betroffene erhalten oft Lob für ihren Gewichtsverlust statt Besorgnis, was die Störung verstärken kann. Auch in der Behandlung bestehen spezifische Herausforderungen: Die Notwendigkeit einer Gewichtsrehabilitation ist oft weniger offensichtlich, und es kann schwieriger sein, angemessene Ernährungsziele zu definieren, besonders wenn die Betroffenen vor der Erkrankung übergewichtig waren."
        },
        {
          title: "Bedeutung für Eltern und Angehörige",
          content: "Für Eltern und Angehörige ist es wichtig zu verstehen, dass ein 'normales' oder erhöhtes Körpergewicht eine ernsthafte Essstörung nicht ausschließt. Warnsignale können ein schneller Gewichtsverlust, restriktives Essverhalten, übermäßige Beschäftigung mit Essen, Gewicht und Figur sowie sozialer Rückzug sein - unabhängig vom aktuellen Gewichtsstatus. Die frühzeitige Erkennung und Behandlung sind entscheidend für den Therapieerfolg. Die Behandlung folgt ähnlichen Prinzipien wie bei der klassischen Anorexia Nervosa, mit besonderem Fokus auf die Normalisierung des Essverhaltens, die Korrektur dysfunktionaler Gedanken und Einstellungen bezüglich Gewicht und Figur sowie die Förderung eines positiven Körperbildes und Selbstwertgefühls."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Sawyer, S. M., Whitelaw, M., Le Grange, D., Yeo, M., & Hughes, E. K. (2016). Physical and psychological morbidity in adolescents with atypical anorexia nervosa. Pediatrics, 137(4), e20154080."
      ],
      relatedTerms: ["anorexia-nervosa", "other-specified-feeding-or-eating-disorders", "gewichtsverlust", "koerperbild", "essstoerung-diagnose"]
    }
  },
  {
    term: "Atypical Bulimia Nervosa",
    definition: "Essstörung mit Merkmalen der Bulimia Nervosa, bei der jedoch nicht alle diagnostischen Kriterien (z.B. Häufigkeit der Essanfälle/Purging) erfüllt sind. (ICD-10: F50.3)",
    tags: ["Diagnose-Essstörung"],
    slug: "atypical-bulimia-nervosa",
    content: {
      teaser: "Atypische Bulimia Nervosa ist eine Essstörung mit wesentlichen Merkmalen der Bulimia Nervosa, bei der jedoch nicht alle diagnostischen Kriterien vollständig erfüllt sind, etwa bezüglich der Häufigkeit von Essanfällen oder kompensatorischen Verhaltensweisen.",
      sections: [
        {
          title: "Definition und Diagnosekriterien",
          content: "Die atypische Bulimia Nervosa (ICD-10: F50.3) umfasst Essstörungen, die wesentliche Merkmale der Bulimia Nervosa aufweisen, aber nicht alle diagnostischen Kriterien erfüllen. Dies kann bedeuten, dass Essanfälle oder kompensatorische Verhaltensweisen (wie selbstinduziertes Erbrechen, Missbrauch von Abführmitteln oder exzessive körperliche Aktivität) weniger häufig auftreten als für die Diagnose der Bulimia Nervosa erforderlich, oder dass eines der anderen Kriterien nicht vollständig erfüllt ist. Im DSM-5 fallen diese Fälle unter die Kategorie 'Other Specified Feeding or Eating Disorder' (OSFED) als 'Bulimia Nervosa of low frequency and/or limited duration'."
        },
        {
          title: "Klinisches Bild und Symptomatik",
          content: "Betroffene mit atypischer Bulimia Nervosa zeigen wiederkehrende Episoden von Essanfällen, bei denen sie in einem abgrenzbaren Zeitraum eine deutlich größere Nahrungsmenge zu sich nehmen, als die meisten Menschen unter ähnlichen Umständen essen würden, und dabei ein Gefühl des Kontrollverlusts erleben. Um eine Gewichtszunahme zu kompensieren, greifen sie zu unangemessenen gegensteuernden Maßnahmen wie Erbrechen, Fasten, exzessivem Sport oder Missbrauch von Medikamenten. Wie bei der typischen Bulimia Nervosa sind Selbstwertgefühl und Selbstbeurteilung übermäßig von Figur und Gewicht abhängig. Der Unterschied zur voll ausgeprägten Bulimia Nervosa liegt meist in der Frequenz oder Dauer der Symptome."
        },
        {
          title: "Relevanz und gesundheitliche Folgen",
          content: "Obwohl die atypische Bulimia Nervosa als 'milder' angesehen werden könnte, können die gesundheitlichen und psychosozialen Folgen erheblich sein. Die kompensatorischen Verhaltensweisen können zu ähnlichen medizinischen Komplikationen führen wie bei der typischen Bulimia Nervosa, darunter Elektrolytstörungen, Zahnschäden durch Magensäure, Ösophagitis, Entzündungen der Speicheldrüsen und Herzrhythmusstörungen. Die psychische Belastung mit Scham, Schuldgefühlen und sozialer Isolation kann ebenso intensiv sein. Zudem besteht das Risiko einer Progression zu einer voll ausgeprägten Bulimia Nervosa oder einer anderen Essstörung."
        },
        {
          title: "Behandlung und Prognose",
          content: "Die Behandlung der atypischen Bulimia Nervosa folgt ähnlichen Prinzipien wie die der typischen Form. Kognitive Verhaltenstherapie, speziell für Essstörungen entwickelt (CBT-E), gilt als Therapie der ersten Wahl. Auch interpersonelle Psychotherapie, dialektisch-behaviorale Therapie oder familienbasierte Ansätze (besonders bei Jugendlichen) können wirksam sein. Die Ernährungsberatung spielt eine zentrale Rolle bei der Etablierung eines regelmäßigen, ausgewogenen Essverhaltens. In einigen Fällen kann eine medikamentöse Unterstützung, typischerweise mit Antidepressiva vom SSRI-Typ, erwogen werden. Die Prognose ist bei frühzeitiger Intervention oft günstig, wobei die weniger häufigen Symptome einerseits als 'milder' angesehen werden können, andererseits aber manchmal auch zu einer verzögerten Diagnose und Behandlung führen."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Fairburn, C. G., & Harrison, P. J. (2003). Eating disorders. The Lancet, 361(9355), 407-416."
      ],
      relatedTerms: ["bulimia-nervosa", "essanfall", "erbrechen", "abfuehrmittelmissbrauch", "other-specified-feeding-or-eating-disorders"]
    }
  },
  {
    term: "Auffällig",
    definition: "Verhalten eines Kindes, das von Gleichaltrigen abweicht und bei Eltern oder Erziehern Anlass zur Sorge gibt.",
    tags: ["Alltag", "Elternsprache", "Symptom-ADHS", "Symptom-Essstörung"],
    slug: "auffaellig",
    content: {
      teaser: "'Auffälliges' Verhalten bei Kindern bezeichnet Verhaltensweisen, die von der alterstypischen Norm abweichen und Anlass zur Sorge geben - ein häufig von Eltern genutzter Begriff, der verschiedene Symptome beschreiben kann und eine genauere Abklärung erfordert.",
      sections: [
        {
          title: "Bedeutung und Verwendung",
          content: "Der Begriff 'auffällig' wird von Eltern, Erziehern und Lehrern häufig verwendet, um Verhaltensweisen zu beschreiben, die von der alterstypischen Entwicklung oder dem erwarteten Verhalten abweichen und Anlass zur Sorge geben. Diese allgemeine Beschreibung kann sich auf eine Vielzahl von Verhaltensweisen, Entwicklungsaspekten oder emotionalen Zuständen beziehen. Das Konzept der 'Auffälligkeit' ist subjektiv und kontextabhängig - was in einer Familie oder Kultur als auffällig gilt, mag in einer anderen normal erscheinen. Dennoch kann die elterliche Wahrnehmung eines Kindes als 'auffällig' ein wichtiger erster Hinweis auf mögliche Entwicklungs- oder psychische Probleme sein, die einer genaueren Abklärung bedürfen."
        },
        {
          title: "Mögliche Bereiche von Auffälligkeiten",
          content: "Auffälligkeiten können sich in verschiedenen Bereichen zeigen: Im Verhalten (z.B. extreme Unruhe, Aggressivität, sozialer Rückzug), in der emotionalen Entwicklung (z.B. außergewöhnliche Ängstlichkeit, Stimmungsschwankungen), in der kognitiven Entwicklung (z.B. Lernschwierigkeiten trotz normaler Intelligenz), in der Sprachentwicklung (z.B. verzögerter Spracherwerb, Stottern), in der Motorik (z.B. Koordinationsprobleme), im sozialen Verhalten (z.B. Schwierigkeiten, Freundschaften zu schließen) oder im Essverhalten (z.B. extreme Wählerigkeit, Nahrungsverweigerung). Im Kontext von ADHS könnte ein Kind als 'auffällig' beschrieben werden, wenn es durch extreme Unruhe, Impulsivität oder Unaufmerksamkeit im Vergleich zu Gleichaltrigen heraussticht. Bei Essstörungen könnten ungewöhnliche Essmuster, übermäßige Beschäftigung mit dem Gewicht oder starke Gewichtsveränderungen als 'auffällig' wahrgenommen werden."
        },
        {
          title: "Vom Alltagsbegriff zur fachlichen Einordnung",
          content: "Der Weg vom elterlichen Eindruck 'Mein Kind ist auffällig' zur differenzierten Diagnostik und gegebenenfalls Behandlung ist wichtig. Fachpersonen helfen dabei, die subjektiv wahrgenommenen Auffälligkeiten zu konkretisieren und einzuordnen. Dies geschieht durch gezielte Fragen nach Art, Häufigkeit, Intensität, Kontext und Auswirkungen der beobachteten Verhaltensweisen sowie durch standardisierte Beobachtungs- und Testverfahren. Nicht jedes als 'auffällig' empfundene Verhalten ist pathologisch - es kann sich um eine vorübergehende Entwicklungsphase, eine Reaktion auf Umweltfaktoren oder eine normale Variante der Entwicklung handeln. Andererseits sollten anhaltende Auffälligkeiten, die das Kind oder die Familie belasten, ernst genommen und fachlich abgeklärt werden."
        },
        {
          title: "Umgang mit Auffälligkeiten im Familienkontext",
          content: "Für Eltern ist es hilfreich, bei wahrgenommenen Auffälligkeiten zunächst genau zu beobachten: In welchen Situationen tritt das Verhalten auf? Was geht ihm voraus? Was folgt darauf? Wie lange besteht es schon? Wie reagiert das Kind, wenn man versucht, es zu beeinflussen? Diese Beobachtungen helfen Fachpersonen bei der Einordnung. Wichtig ist auch, das Kind nicht auf seine Auffälligkeiten zu reduzieren, sondern seine Stärken und positiven Eigenschaften gleichwertig wahrzunehmen. Bei anhaltenden oder belastenden Auffälligkeiten ist es ratsam, niedrigschwellige Beratungsangebote wie Erziehungsberatungsstellen, den kinderärztlichen Dienst oder schulpsychologische Dienste in Anspruch zu nehmen, um eine Einschätzung zu erhalten und gegebenenfalls weitere Schritte zu planen."
        }
      ],
      relatedTerms: ["entwicklung", "adhs", "essstoerung", "verhaltensauffaelligkeit", "entwicklungsverzoegerung", "diagnostik"]
    }
  },
  {
    term: "Ausgelaugt",
    definition: "Zustand tiefer emotionaler und körperlicher Erschöpfung, oft verbunden mit dem Gefühl, keine Energiereserven mehr zu haben.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout"],
    slug: "ausgelaugt",
    content: {
      teaser: "'Ausgelaugt sein' beschreibt einen Zustand tiefgreifender körperlicher und emotionaler Erschöpfung, bei dem man sich wie 'leergepumpt' fühlt und keine Energiereserven mehr zu haben scheint - ein häufiges Symptom bei Burnout, besonders bei Eltern.",
      sections: [
        {
          title: "Definition und Erleben",
          content: "Der Begriff 'ausgelaugt' beschreibt einen Zustand tiefgreifender Erschöpfung, bei dem sich Betroffene wie 'leergepumpt' oder 'ausgewrungen' fühlen. Es ist mehr als nur Müdigkeit oder vorübergehende Erschöpfung - es ist das Gefühl, dass die eigenen körperlichen, emotionalen und mentalen Ressourcen vollständig verbraucht sind und keine Reserven mehr zur Verfügung stehen. Dieser Zustand betrifft den ganzen Menschen und äußert sich sowohl körperlich (z.B. chronische Müdigkeit, Schlafstörungen, erhöhte Anfälligkeit für Krankheiten) als auch emotional (z.B. Gefühlsleere, Gereiztheit, verminderte Empathiefähigkeit) und kognitiv (z.B. Konzentrationsprobleme, verminderte Entscheidungsfähigkeit)."
        },
        {
          title: "Ausgelaugt sein als Symptom von Burnout",
          content: "Das Gefühl, ausgelaugt zu sein, ist ein zentrales Symptom des Burnout-Syndroms und entspricht der Dimension der emotionalen Erschöpfung nach Maslach. Bei Eltern kann dieser Zustand durch die anhaltenden Anforderungen der Kindererziehung in Kombination mit anderen Verpflichtungen entstehen. Typischerweise entwickelt sich das Gefühl, ausgelaugt zu sein, nicht plötzlich, sondern graduell im Verlauf eines längeren Prozesses, in dem die eigenen Ressourcen kontinuierlich überbeansprucht werden, ohne dass ausreichend Regeneration stattfindet. Im fortgeschrittenen Stadium kann selbst nach Erholungsphasen wie Wochenenden oder Urlaub das Gefühl der tiefen Erschöpfung bestehen bleiben."
        },
        {
          title: "Unterschied zu normaler Ermüdung und anderen Zuständen",
          content: "Das Gefühl, ausgelaugt zu sein, unterscheidet sich von normaler Ermüdung oder Erschöpfung nach Anstrengung. Während normale Ermüdung durch ausreichend Ruhe und Schlaf abgebaut werden kann, ist das Ausgelaugt-Sein persistenter und spricht weniger gut auf übliche Erholungsmaßnahmen an. Im Gegensatz zur Depression, bei der eine gedrückte Stimmung und Interessenverlust im Vordergrund stehen, ist das primäre Merkmal des Ausgelaugt-Seins die Erschöpfung und der Ressourcenverlust. Dennoch können sich beide Zustände überlappen oder ineinander übergehen. Auch von einer gewöhnlichen Überarbeitung unterscheidet sich das Ausgelaugt-Sein durch seine Tiefe, Persistenz und den gleichzeitigen Verlust der Freude an früher geschätzten Aktivitäten."
        },
        {
          title: "Umgang und Regeneration",
          content: "Wenn sich Eltern chronisch ausgelaugt fühlen, ist es wichtig, dieses Warnsignal ernst zu nehmen. Kurzfristig können konkrete Entlastung im Alltag, bewusste Pausen und die Fokussierung auf Grundbedürfnisse wie Schlaf, Bewegung und ausgewogene Ernährung hilfreich sein. Mittelfristig ist es wichtig, die eigenen Grenzen zu erkennen und zu respektieren, realistische Erwartungen zu setzen und Prioritäten neu zu bewerten. Der Aufbau von Unterstützungssystemen, das Erlernen von Stressbewältigungstechniken und die bewusste Integration von Selbstfürsorge in den Alltag können dazu beitragen, die Energiereserven wieder aufzufüllen. Bei anhaltendem Gefühl des Ausgelaugtseins ist professionelle Unterstützung durch Beratungsstellen, Psychotherapie oder ärztliche Begleitung ratsam, um einer Chronifizierung und Entwicklung weiterer gesundheitlicher Probleme vorzubeugen."
        }
      ],
      relatedTerms: ["burnout", "erschoepfung", "energielosigkeit", "stress", "eltern-burnout", "selbstfuersorge", "ueberfordert"]
    }
  },
  {
    term: "Ausgebrannt",
    definition: "Umgangssprachlich für Burnout; Zustand völliger Erschöpfung durch chronische Überlastung.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout"],
    slug: "ausgebrannt",
    content: {
      teaser: "'Ausgebrannt sein' beschreibt umgangssprachlich einen Zustand totaler körperlicher, emotionaler und geistiger Erschöpfung nach längerer Überlastung - ein Bild dafür, dass die eigene 'innere Flamme' erloschen ist.",
      sections: [
        {
          title: "Bedeutung und Metaphorik",
          content: "Der Begriff 'ausgebrannt' ist die deutsche Entsprechung des englischen 'burnout' und nutzt die Metapher eines Feuers, das zunächst hell lodert, dann aber aufgrund mangelnder Ressourcen oder zu hoher Beanspruchung erlischt. Diese Metapher veranschaulicht den Prozess vom anfänglichen Enthusiasmus und Engagement über zunehmende Erschöpfung bis hin zum völligen 'Erlöschen' der Energie und Motivation. Im Unterschied zur fachlichen Bezeichnung 'Burnout-Syndrom', die ein spezifisches psychologisches Konstrukt mit definierten Dimensionen beschreibt, wird der Begriff 'ausgebrannt' in der Alltagssprache breiter verwendet, um Zustände tiefer Erschöpfung und Überforderung zu beschreiben."
        },
        {
          title: "Symptome des Ausgebrannt-Seins",
          content: "Sich ausgebrannt zu fühlen, umfasst typischerweise mehrere Dimensionen: emotionale Erschöpfung (Gefühl der Leere, emotionale Überforderung, Gereiztheit), Depersonalisation/Zynismus (emotionale Distanz zu anderen Menschen, besonders zu jenen, für die man Verantwortung trägt, zynische Einstellung) und verminderte persönliche Leistungsfähigkeit (subjektives Gefühl der Inkompetenz, verminderte Produktivität und Belastbarkeit). Bei Eltern kann sich das Ausgebrannt-Sein durch emotionale Distanz zu den eigenen Kindern, Ungeduld, das Gefühl, der Elternrolle nicht mehr gewachsen zu sein, und eine verminderte Fähigkeit, auf die Bedürfnisse der Kinder einzugehen, äußern."
        },
        {
          title: "Entstehung und Verlauf",
          content: "Das Gefühl, ausgebrannt zu sein, entwickelt sich typischerweise nicht über Nacht, sondern in einem schleichenden Prozess, der oft Monate oder Jahre dauert. Nach dem Phasenmodell von Freudenberger und North durchläuft man verschiedene Stadien: von überhöhtem Engagement und Perfektionismus über zunehmende Erschöpfung und Rückzug bis hin zu Verzweiflung und völliger Erschöpfung. Bei Eltern kann der Prozess des Ausbrennens durch anhaltend hohe Anforderungen der Kinderbetreuung, unzureichende Unterstützung, hohe eigene Ansprüche, besondere Herausforderungen mit dem Kind (z.B. durch Entwicklungsstörungen, chronische Erkrankungen), berufliche Belastungen und mangelnde Zeit für eigene Bedürfnisse gefördert werden."
        },
        {
          title: "Umgang und Prävention",
          content: "Wenn sich Eltern ausgebrannt fühlen, ist es wichtig, diesen Zustand ernst zu nehmen und aktiv gegenzusteuern. Kurzfristig kann konkrete Entlastung im Alltag durch Unterstützung bei der Kinderbetreuung, Prioritätensetzung und bewusste Pausen hilfreich sein. Mittelfristig sind der Aufbau und die Nutzung sozialer Unterstützungssysteme, die Überprüfung eigener Ansprüche und Erwartungen sowie die Integration von Selbstfürsorge in den Alltag wichtig. Das Erlernen von Stressbewältigungstechniken, Grenzsetzung und die bewusste Pflege eigener Interessen und sozialer Kontakte können präventiv wirken. Bei anhaltendem Gefühl des Ausgebrannt-Seins ist professionelle Unterstützung durch Beratungsstellen, Psychotherapie oder ärztliche Begleitung ratsam, um einer Chronifizierung vorzubeugen und den Weg zurück zu mehr Energie und Lebensfreude zu finden."
        }
      ],
      literaryDevices: [
        {
          title: "Analogie: Das ausgebrannte Feuer",
          content: "Ausgebrannt-Sein ist wie ein Feuer, das zu lange zu intensiv gebrannt hat und schließlich nur noch glimmende Asche hinterlässt. Zu Beginn lodert die Flamme der Begeisterung und des Engagements hoch, doch ohne ausreichend Brennstoff (Ressourcen) und bei zu starkem Wind (Stress und Anforderungen) brennt sie schließlich aus, bis nur noch Erschöpfung bleibt."
        }
      ],
      references: [
        "Freudenberger, H. J., & North, G. (1992). Burnout bei Frauen: Über das Gefühl des Ausgebranntseins. Frankfurt am Main: Fischer Taschenbuch Verlag.",
        "Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: recent research and its implications for psychiatry. World psychiatry, 15(2), 103–111."
      ],
      relatedTerms: ["burnout", "erschoepfung", "ausgelaugt", "stress", "selbstfuersorge", "ueberfordert"]
    }
  },
  {
    term: "Avoidant/Restrictive Food Intake Disorder",
    alias: "ARFID",
    definition: "Essstörung gekennzeichnet durch eine vermeidende oder restriktive Nahrungsaufnahme, die zu Gewichtsverlust, Nährstoffmangel oder Abhängigkeit von Sondennahrung führt, ohne die Angst vor Gewichtszunahme oder Körperbildstörung der Anorexie. (ICD-10: F50.89)",
    tags: ["Diagnose-Essstörung"],
    slug: "arfid",
    content: {
      teaser: "Die Vermeidende/Restriktive Nahrungsaufnahmestörung (ARFID) ist eine Essstörung, bei der die Nahrungsaufnahme stark eingeschränkt ist, aber im Gegensatz zur Anorexia Nervosa keine Angst vor Gewichtszunahme oder Körperbildstörungen bestehen.",
      sections: [
        {
          title: "Definition und Diagnosekriterien",
          content: "Die Vermeidende/Restriktive Nahrungsaufnahmestörung (Avoidant/Restrictive Food Intake Disorder, ARFID) ist charakterisiert durch eine deutlich eingeschränkte Nahrungsaufnahme, die zu signifikanten Problemen führt: Gewichtsverlust oder ausbleibende Gewichtszunahme, signifikanter Nährstoffmangel, Abhängigkeit von enteraler Ernährung oder oralen Nahrungsergänzungsmitteln oder erhebliche Beeinträchtigungen im psychosozialen Funktionsniveau. Im Gegensatz zu anderen Essstörungen besteht keine Angst vor Gewichtszunahme oder Körperbildstörung. Die DSM-5-Diagnose erfordert, dass die Störung nicht besser durch einen Mangel an Nahrungsmitteln, kulturelle Praktiken oder eine andere medizinische oder psychische Erkrankung erklärt werden kann."
        },
        {
          title: "Erscheinungsformen und Auslöser",
          content: "ARFID kann sich in verschiedenen Formen äußern: Als mangelndes Interesse an Nahrung oder Essen, als sensorische Abneigung gegen bestimmte Lebensmittel aufgrund von Geschmack, Textur, Geruch oder Aussehen oder als Angst vor aversiven Konsequenzen des Essens wie Würgen, Erbrechen oder Erstickungsangst. Auslösend können traumatische Erlebnisse im Zusammenhang mit Nahrung sein (wie Würge- oder Erstickungserfahrungen), aber auch entwicklungsbedingte Faktoren wie extreme Nahrungsselektivität im Kindesalter oder Angststörungen. ARFID kann in jedem Alter auftreten, wird aber häufig im Kindes- und Jugendalter diagnostiziert und betrifft oft Kinder, die bereits zuvor als 'wählerische Esser' galten."
        },
        {
          title: "Abgrenzung zu anderen Essstörungen und Folgen",
          content: "Im Unterschied zu Anorexia Nervosa oder Bulimia Nervosa steht bei ARFID nicht die Sorge um Gewicht oder Figur im Vordergrund. Dennoch können die körperlichen Folgen ähnlich gravierend sein: Untergewicht, Wachstumsstörungen bei Kindern, Nährstoffmängel mit entsprechenden Folgeerscheinungen, gastrointestinale Beschwerden und bei ausgeprägten Fällen kardiovaskuläre Komplikationen. Psychosoziale Folgen umfassen soziale Isolation durch die Vermeidung gemeinsamer Mahlzeiten, Einschränkungen im Alltagsleben und familiäre Konflikte rund um das Thema Essen."
        },
        {
          title: "Behandlungsansätze und Relevanz für Eltern",
          content: "Die Behandlung von ARFID erfordert oft einen interdisziplinären Ansatz aus Medizin, Ernährungstherapie und Psychotherapie. Bei Kindern und Jugendlichen werden häufig familienbasierte Ansätze verwendet, die Eltern aktiv einbeziehen. Therapeutische Elemente können u.a. systematische Desensibilisierung (schrittweise Heranführung an gefürchtete Lebensmittel), kognitive Verhaltenstherapie zur Bearbeitung von Ängsten, Esstraining und bei Bedarf medizinische Interventionen bei starkem Untergewicht umfassen. Für Eltern ist es wichtig, zwischen entwicklungsbedingter Nahrungsselektivität ('Pickiness') und ARFID zu unterscheiden. Während erstere häufig bei Kleinkindern auftritt und meist vorübergehend ist, ist ARFID durch signifikante gesundheitliche oder psychosoziale Beeinträchtigungen gekennzeichnet und erfordert professionelle Hilfe. Eltern sollten bei anhaltenden Essproblemen, die zu Gewichtsverlust, Nährstoffmängeln oder erheblichen familiären Belastungen führen, fachliche Beratung suchen."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). American Psychiatric Publishing.",
        "Thomas, J. J., Lawson, E. A., Micali, N., Misra, M., Deckersbach, T., & Eddy, K. T. (2017). Avoidant/Restrictive Food Intake Disorder: a Three-Dimensional Model of Neurobiology with Implications for Etiology and Treatment. Current Psychiatry Reports, 19(8), 54."
      ],
      relatedTerms: ["selektives-essen", "essensablehnung", "essproblem-kinder", "neophobie", "ernaehrungsschwierigkeiten"]
    }
  },
  // Continue with other existing glossary entries...
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
