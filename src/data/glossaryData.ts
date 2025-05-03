interface GlossaryItem {
  term: string;
  slug: string;
  definition: string;
  tags: string[];
  alias?: string;
  content?: {
    teaser?: string;
    sections?: { title: string; content: string; }[];
    literaryDevices?: { title: string; content: string; }[];
    references?: string[];
    relatedTerms?: string[];
  };
}

export const glossaryData: GlossaryItem[] = [
  {
    term: "ADHS",
    slug: "adhs",
    definition: "Aufmerksamkeitsdefizit-Hyperaktivitätsstörung: Eine neurologische Entwicklungsstörung, die sich durch Probleme mit Aufmerksamkeit, Impulsivität und Hyperaktivität auszeichnet.",
    tags: ["Diagnose", "Kinder", "Erwachsene", "Verhalten"],
    alias: "Aufmerksamkeitsdefizit-Hyperaktivitätsstörung",
    content: {
      teaser: "ADHS ist eine neurologische Entwicklungsstörung, die sich durch Probleme mit Aufmerksamkeit, Impulsivität und Hyperaktivität auszeichnet und sowohl Kinder als auch Erwachsene betrifft.",
      sections: [
        {
          title: "Was ist ADHS?",
          content: "ADHS ist eine komplexe Störung, die das Gehirn und das Verhalten beeinflusst. Sie beginnt oft in der Kindheit und kann bis ins Erwachsenenalter andauern. Die Symptome können sich im Laufe der Zeit verändern, aber die Kernmerkmale bleiben bestehen."
        },
        {
          title: "Symptome von ADHS",
          content: "Zu den Hauptsymptomen gehören Schwierigkeiten, die Aufmerksamkeit zu fokussieren, übermäßiges impulsives Verhalten und Hyperaktivität. Diese Symptome können sich in verschiedenen Lebensbereichen manifestieren, wie z.B. in der Schule, bei der Arbeit und in sozialen Beziehungen."
        },
        {
          title: "Diagnose und Behandlung",
          content: "Die Diagnose von ADHS erfolgt in der Regel durch eine umfassende Bewertung, einschließlich medizinischer und psychologischer Tests. Die Behandlung kann Medikamente, Verhaltenstherapie und unterstützende Maßnahmen umfassen."
        }
      ],
      literaryDevices: [
        {
          title: "Der unruhige Geist",
          content: "Stellen Sie sich vor, Ihr Geist ist wie ein Fernseher mit vielen Kanälen, die gleichzeitig laufen. Es ist schwer, sich auf einen Kanal zu konzentrieren, und Sie werden ständig von anderen abgelenkt. Das ist ein bisschen so, wie es sich anfühlt, mit ADHS zu leben."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Barkley, R. A. (2015). Attention-deficit hyperactivity disorder: A handbook for diagnosis and treatment. New York, NY: Guilford Press."
      ],
      relatedTerms: ["hyperaktivitaet", "impulsivitaet", "aufmerksamkeit"]
    }
  },
  {
    term: "Achtsamkeit",
    slug: "achtsamkeit",
    definition: "Eine Form der Meditation, bei der man sich auf den gegenwärtigen Moment konzentriert, ohne zu urteilen.",
    tags: ["Therapie-Konzept", "Selbsthilfe", "Stress"],
    content: {
      teaser: "Achtsamkeit ist eine Praxis, bei der man lernt, den gegenwärtigen Moment bewusst wahrzunehmen, ohne ihn zu bewerten. Sie hilft, Stress abzubauen und das Wohlbefinden zu steigern.",
      sections: [
        {
          title: "Was bedeutet Achtsamkeit?",
          content: "Achtsamkeit bedeutet, dass man seine Aufmerksamkeit bewusst auf das richtet, was gerade geschieht – sei es ein Gedanke, ein Gefühl, eine Körperempfindung oder ein Geräusch. Dabei versucht man, eine offene und akzeptierende Haltung einzunehmen, ohne das Erlebte zu bewerten oder zu verändern."
        },
        {
          title: "Wie praktiziert man Achtsamkeit?",
          content: "Es gibt viele verschiedene Möglichkeiten, Achtsamkeit zu praktizieren. Man kann sich auf den Atem konzentrieren, eine Gehmeditation machen, achtsam essen oder einfach nur bewusst den Alltag erleben. Wichtig ist, regelmäßig zu üben und geduldig mit sich selbst zu sein."
        },
        {
          title: "Vorteile der Achtsamkeit",
          content: "Achtsamkeit kann helfen, Stress abzubauen, die Konzentration zu verbessern, das Selbstbewusstsein zu stärken und das emotionale Gleichgewicht zu fördern. Sie kann auch bei der Bewältigung von chronischen Schmerzen, Angstzuständen und Depressionen unterstützen."
        }
      ],
      literaryDevices: [
        {
          title: "Der Beobachter",
          content: "Stellen Sie sich vor, Sie sitzen am Ufer eines Flusses und beobachten, wie die Gedanken und Gefühle wie Blätter vorbeiziehen. Sie versuchen nicht, sie festzuhalten oder zu verändern, sondern nehmen sie einfach nur wahr. Das ist die Haltung der Achtsamkeit."
        }
      ],
      references: [
        "Kabat-Zinn, J. (1990). Full catastrophe living: Using the wisdom of your body and mind to face stress, pain, and illness. New York: Delacorte Press.",
        "Germer, C. K. (2009). The mindful path to self-compassion: Freeing yourself from destructive thoughts and emotions. New York: Guilford Press."
      ],
      relatedTerms: ["meditation", "stressbewaeltigung", "selbstmitgefuehl"]
    }
  },
  {
    term: "Affekt",
    slug: "affekt",
    definition: "Ein intensives, kurzfristiges Gefühl, das oft mit körperlichen Reaktionen einhergeht.",
    tags: ["Konzept-Psychologie", "Emotionen"],
    content: {
      teaser: "Ein Affekt ist ein starkes, vorübergehendes Gefühl, das mit körperlichen Veränderungen verbunden ist und unser Verhalten beeinflusst.",
      sections: [
        {
          title: "Was ist ein Affekt?",
          content: "Ein Affekt ist ein intensives Gefühl, das plötzlich auftritt und uns überwältigen kann. Er ist oft mit körperlichen Reaktionen wie Herzrasen, Zittern oder Schwitzen verbunden. Affekte können positiv (z.B. Freude, Begeisterung) oder negativ (z.B. Angst, Wut, Trauer) sein."
        },
        {
          title: "Wie entstehen Affekte?",
          content: "Affekte entstehen durch die Bewertung einer Situation oder eines Ereignisses als bedeutsam für unsere Bedürfnisse und Ziele. Diese Bewertung löst eine Kaskade von Reaktionen im Gehirn und im Körper aus, die uns auf eine bestimmte Handlung vorbereiten (z.B. Flucht bei Angst, Angriff bei Wut)."
        },
        {
          title: "Wie geht man mit Affekten um?",
          content: "Es ist wichtig, Affekte wahrzunehmen und anzuerkennen, ohne sie zu unterdrücken oder sich von ihnen überwältigen zu lassen. Man kann lernen, Affekte zu regulieren, indem man sich beruhigt, die Situation neu bewertet oder alternative Handlungsoptionen sucht."
        }
      ],
      literaryDevices: [
        {
          title: "Der Sturm",
          content: "Stellen Sie sich einen Affekt wie einen plötzlichen Sturm vor, der über Sie hereinbricht. Er kann Sie mitreißen und Ihnen die Sicht nehmen. Aber wie jeder Sturm zieht auch der Affekt irgendwann vorbei. Es ist wichtig, sich nicht im Sturm zu verlieren, sondern einen sicheren Ort zu suchen und abzuwarten, bis er vorüber ist."
        }
      ],
      references: [
        "Ekman, P. (1992). An argument for basic emotions. Cognition & Emotion, 6(3-4), 169-200.",
        "Scherer, K. R. (2009). What are emotions? And how can they be measured? Social Science Information, 44(4), 695-729."
      ],
      relatedTerms: ["emotionen", "gefuehle", "stress"]
    }
  },
  {
    term: "Angst",
    slug: "angst",
    definition: "Ein Gefühl der Besorgnis, Nervosität oder Furcht vor einer drohenden Gefahr oder einem ungewissen Ereignis.",
    tags: ["Konzept-Psychologie", "Emotionen", "Stress"],
    content: {
      teaser: "Angst ist ein grundlegendes Gefühl, das uns vor Gefahren warnt und uns hilft, uns zu schützen. Sie kann jedoch auch übermäßig werden und unser Leben beeinträchtigen.",
      sections: [
        {
          title: "Was ist Angst?",
          content: "Angst ist ein Gefühl der Besorgnis, Nervosität oder Furcht vor einer drohenden Gefahr oder einem ungewissen Ereignis. Sie ist eine natürliche Reaktion auf Stress und hilft uns, uns auf potenzielle Bedrohungen vorzubereiten."
        },
        {
          title: "Wie äußert sich Angst?",
          content: "Angst kann sich auf verschiedene Weise äußern, sowohl psychisch (z.B. Sorgen, Panik, Konzentrationsschwierigkeiten) als auch körperlich (z.B. Herzrasen, Schwitzen, Zittern, Übelkeit). Sie kann auch zu Verhaltensänderungen führen, wie z.B. Vermeidung von bestimmten Situationen oder Orten."
        },
        {
          title: "Wann wird Angst zum Problem?",
          content: "Angst wird dann zum Problem, wenn sie übermäßig stark, anhaltend oder unbegründet ist und unser Leben beeinträchtigt. Angststörungen sind psychische Erkrankungen, die professionelle Hilfe erfordern."
        }
      ],
      literaryDevices: [
        {
          title: "Der innere Wachhund",
          content: "Stellen Sie sich die Angst wie einen inneren Wachhund vor, der uns vor Gefahren warnen soll. Manchmal bellt er jedoch zu laut oder grundlos, und wir fühlen uns ständig in Alarmbereitschaft. Es ist wichtig, dem Wachhund beizubringen, wann er bellen soll und wann nicht."
        }
      ],
      references: [
        "Barlow, D. H. (2002). Anxiety and its disorders: The nature and treatment of anxiety and panic (2nd ed.). New York: Guilford Press.",
        "LeDoux, J. E. (2015). Anxious: Using the brain to understand and treat fear and anxiety. New York: Viking."
      ],
      relatedTerms: ["angststoerung", "panik", "stressbewaeltigung"]
    }
  },
  {
    term: "Anorexie",
    slug: "anorexie",
    definition: "Eine schwere Essstörung, die durch selbst herbeigeführten Gewichtsverlust, Körperschemastörung und die Angst vor Gewichtszunahme gekennzeichnet ist.",
    tags: ["Diagnose", "Essstörung"],
    alias: "Anorexia nervosa",
    content: {
      teaser: "Anorexie ist eine ernsthafte Essstörung, die durch selbst herbeigeführten Gewichtsverlust, eine verzerrte Körperwahrnehmung und die Angst vor Gewichtszunahme gekennzeichnet ist.",
      sections: [
        {
          title: "Was ist Anorexie?",
          content: "Anorexie ist eine psychische Erkrankung, die zu den Essstörungen gehört. Sie ist durch einen selbst herbeigeführten Gewichtsverlust gekennzeichnet, der meist durch eine starke Einschränkung der Nahrungsaufnahme und/oder übermäßige körperliche Aktivität erreicht wird."
        },
        {
          title: "Symptome der Anorexie",
          content: "Zu den Hauptsymptomen gehören ein starkes Untergewicht, eine verzerrte Körperwahrnehmung (Körperschemastörung), die Angst vor Gewichtszunahme, das Ausbleiben der Menstruation bei Frauen und verschiedene körperliche Komplikationen."
        },
        {
          title: "Behandlung der Anorexie",
          content: "Die Behandlung der Anorexie ist komplex und erfordert in der Regel ein multidisziplinäres Team, bestehend aus Ärzten, Psychotherapeuten und Ernährungsberatern. Sie umfasst sowohl die Wiederherstellung eines gesunden Gewichts als auch die Behandlung der psychischen Ursachen der Störung."
        }
      ],
      literaryDevices: [
        {
          title: "Die innere Stimme",
          content: "Stellen Sie sich vor, eine innere Stimme sagt Ihnen ständig, dass Sie zu dick sind, egal wie dünn Sie sind. Diese Stimme kontrolliert Ihr Denken und Handeln und lässt Sie keine Ruhe finden. Das ist ein bisschen so, wie es sich anfühlt, mit Anorexie zu leben."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Treasure, J., Duarte, T., & Schmidt, U. (2020). Eating disorders. The Lancet, 395(10227), 899-911."
      ],
      relatedTerms: ["essstoerung", "bulimie", "koerperschemastoerung"]
    }
  },
  {
    term: "Anpassungsstörung",
    slug: "anpassungsstoerung",
    definition: "Eine psychische Reaktion auf eine identifizierbare Belastung, die innerhalb von drei Monaten nach dem Ereignis beginnt.",
    tags: ["Diagnose", "Stress"],
    content: {
      teaser: "Eine Anpassungsstörung ist eine psychische Reaktion auf eine belastende Lebenssituation, die sich in Form von emotionalen oder Verhaltenssymptomen äußert.",
      sections: [
        {
          title: "Was ist eine Anpassungsstörung?",
          content: "Eine Anpassungsstörung ist eine psychische Erkrankung, die als Reaktion auf eine identifizierbare Belastung auftritt. Diese Belastung kann ein einzelnes Ereignis sein (z.B. Trennung, Verlust des Arbeitsplatzes) oder eine anhaltende Situation (z.B. Beziehungsprobleme, finanzielle Schwierigkeiten)."
        },
        {
          title: "Symptome einer Anpassungsstörung",
          content: "Die Symptome können vielfältig sein und umfassen depressive Verstimmung, Angstzustände, Reizbarkeit, Schlafstörungen, Konzentrationsschwierigkeiten und Verhaltensänderungen. Sie beginnen in der Regel innerhalb von drei Monaten nach dem belastenden Ereignis."
        },
        {
          title: "Behandlung einer Anpassungsstörung",
          content: "Die Behandlung zielt darauf ab, die Symptome zu lindern und die Anpassung an die neue Situation zu erleichtern. Sie kann Psychotherapie, Medikamente oder eine Kombination aus beidem umfassen."
        }
      ],
      literaryDevices: [
        {
          title: "Der Stolperstein",
          content: "Stellen Sie sich vor, das Leben ist wie ein Weg, auf dem wir unterwegs sind. Manchmal liegt ein Stolperstein im Weg, der uns aus dem Gleichgewicht bringt. Eine Anpassungsstörung ist wie die Reaktion auf diesen Stolperstein – wir brauchen Zeit, um uns wiederzufinden und unseren Weg fortzusetzen."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Casey, P., & Wittchen, H. U. (2001). Adjustment disorders in DSM-IV. In M. Maj (Ed.), Psychiatric diagnosis and classification (pp. 215-244). Chichester: John Wiley & Sons."
      ],
      relatedTerms: ["stress", "krise", "belastung"]
    }
  },
  {
    term: "Aufmerksamkeit",
    slug: "aufmerksamkeit",
    definition: "Die Fähigkeit, sich auf bestimmte Informationen oder Reize zu konzentrieren und andere auszublenden.",
    tags: ["Konzept-Psychologie", "Kognition"],
    content: {
      teaser: "Aufmerksamkeit ist die Fähigkeit, sich auf bestimmte Informationen zu konzentrieren und andere auszublenden. Sie ist eine wichtige Voraussetzung für viele kognitive Prozesse.",
      sections: [
        {
          title: "Was ist Aufmerksamkeit?",
          content: "Aufmerksamkeit ist ein kognitiver Prozess, der es uns ermöglicht, uns auf bestimmte Informationen oder Reize zu konzentrieren und andere auszublenden. Sie ist eine begrenzte Ressource, d.h. wir können nicht unbegrenzt viele Dinge gleichzeitig beachten."
        },
        {
          title: "Arten der Aufmerksamkeit",
          content: "Es gibt verschiedene Arten der Aufmerksamkeit, wie z.B. selektive Aufmerksamkeit (die Fähigkeit, irrelevante Informationen auszublenden), geteilte Aufmerksamkeit (die Fähigkeit, mehrere Aufgaben gleichzeitig zu bearbeiten) und dauerhafte Aufmerksamkeit (die Fähigkeit, sich über einen längeren Zeitraum auf eine Aufgabe zu konzentrieren)."
        },
        {
          title: "Aufmerksamkeit und ADHS",
          content: "Bei Menschen mit ADHS ist die Aufmerksamkeit oft beeinträchtigt. Sie haben Schwierigkeiten, sich zu konzentrieren, lassen sich leicht ablenken und machen Flüchtigkeitsfehler."
        }
      ],
      literaryDevices: [
        {
          title: "Der Scheinwerfer",
          content: "Stellen Sie sich die Aufmerksamkeit wie einen Scheinwerfer vor, den wir auf bestimmte Dinge richten können. Je stärker wir uns konzentrieren, desto heller leuchtet der Scheinwerfer. Wenn wir abgelenkt sind, flackert der Scheinwerfer oder richtet sich auf andere Dinge."
        }
      ],
      references: [
        "Posner, M. I. (1994). Attention: The mechanisms of consciousness. Proceedings of the National Academy of Sciences, 91(16), 7398-7403.",
        "Styles, E. A. (2006). Attention, perception and memory. Hove: Psychology Press."
      ],
      relatedTerms: ["konzentration", "ablenkung", "adhs"]
    }
  },
  {
    term: "Autismus",
    slug: "autismus",
    definition: "Eine neurologische Entwicklungsstörung, die sich durch Schwierigkeiten in der sozialen Interaktion und Kommunikation sowie durch repetitive Verhaltensweisen auszeichnet.",
    tags: ["Diagnose", "Kinder", "Erwachsene", "Verhalten"],
    alias: "Autismus-Spektrum-Störung",
    content: {
      teaser: "Autismus ist eine neurologische Entwicklungsstörung, die sich durch Schwierigkeiten in der sozialen Interaktion und Kommunikation sowie durch repetitive Verhaltensweisen auszeichnet und ein breites Spektrum umfasst.",
      sections: [
        {
          title: "Was ist Autismus?",
          content: "Autismus ist eine komplexe neurologische Entwicklungsstörung, die sich auf die Art und Weise auswirkt, wie eine Person die Welt wahrnimmt und mit ihr interagiert. Sie beginnt in der frühen Kindheit und dauert in der Regel ein Leben lang an."
        },
        {
          title: "Symptome von Autismus",
          content: "Zu den Hauptsymptomen gehören Schwierigkeiten in der sozialen Interaktion und Kommunikation, repetitive Verhaltensweisen, eingeschränkte Interessen und sensorische Empfindlichkeiten. Die Ausprägung der Symptome ist von Person zu Person sehr unterschiedlich."
        },
        {
          title: "Diagnose und Behandlung",
          content: "Die Diagnose von Autismus erfolgt in der Regel durch eine umfassende Bewertung, einschließlich Verhaltensbeobachtungen und standardisierten Tests. Die Behandlung kann Verhaltenstherapie, Sprachtherapie, Ergotherapie und unterstützende Maßnahmen umfassen."
        }
      ],
      literaryDevices: [
        {
          title: "Die andere Sprache",
          content: "Stellen Sie sich vor, Sie reisen in ein fremdes Land, in dem die Menschen eine andere Sprache sprechen und andere soziale Regeln haben. Es ist schwer, sich zu verständigen und Kontakte zu knüpfen. Das ist ein bisschen so, wie es sich anfühlt, mit Autismus zu leben."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Volkmar, F. R., Siegel, M., Woodbury-Smith, M., King, B., Trajkovski, S., & Hodgdon, J. (2014). Handbook of autism and pervasive developmental disorders (4th ed.). Hoboken, NJ: John Wiley & Sons."
      ],
      relatedTerms: ["soziale-interaktion", "kommunikation", "repetitive-verhalten"]
    }
  },
  
  // Neue Einträge für Buchstabe B
  {
    term: "Belastung",
    slug: "belastung",
    definition: "Allgemeiner Begriff für Anspannung, Druck oder Beanspruchung, die körperlich oder psychisch empfunden wird.",
    tags: ["Konzept-Psychologie", "Stress", "Alltag", "Burnout", "ADHS", "Essstörung"],
    content: {
      teaser: "Belastung beschreibt eine allgemeine Form der Anspannung oder Beanspruchung, die sowohl körperlich als auch psychisch wahrgenommen werden kann.",
      sections: [
        {
          title: "Was bedeutet Belastung?",
          content: "Belastung bezeichnet den Zustand des Ausgesetztseins gegenüber Faktoren, die Stress oder Druck erzeugen und Ressourcen beanspruchen. Diese können von außen kommen (etwa durch Arbeit, Familie oder soziale Anforderungen) oder von innen (z.B. durch eigene Ansprüche, Sorgen oder körperliche Faktoren). Belastungen können akut oder chronisch sein und variieren stark in ihrer Intensität und Auswirkung."
        },
        {
          title: "Belastung im Kontext psychischer Gesundheit",
          content: "Im psychologischen Kontext wird Belastung oft als ein wichtiger Faktor bei der Entstehung verschiedener psychischer Probleme betrachtet. Chronische oder übermäßige Belastung kann zu Erschöpfungszuständen wie Burnout führen, bestehende Probleme wie ADHS-Symptome verschlimmern oder als Trigger für Essstörungen wirken. Die individuelle Belastbarkeit und verfügbare Bewältigungsstrategien bestimmen dabei, wie gut jemand mit Belastungen umgehen kann."
        },
        {
          title: "Belastungen im Elternalltag",
          content: "Eltern sind besonderen Belastungen ausgesetzt, da sie nicht nur für sich selbst, sondern auch für ihre Kinder Verantwortung tragen. Die ständige Sorge um das Wohlbefinden der Kinder, der Spagat zwischen verschiedenen Rollen und Verantwortlichkeiten sowie praktische Alltagsherausforderungen können zu einer erheblichen Gesamtbelastung führen. Bei Eltern von Kindern mit besonderen Bedürfnissen oder Entwicklungsstörungen wie ADHS können diese Belastungen noch intensiver sein."
        }
      ],
      literaryDevices: [
        {
          title: "Das Fass-Modell",
          content: "Belastungen können wie Wasser in einem Fass verstanden werden. Jeder Mensch hat ein Fass mit einer bestimmten Kapazität. Tägliche Belastungen füllen das Fass allmählich. Kleine Belastungen sind wie Tropfen, große Belastungen wie ganze Eimer Wasser. Wenn das Fass überläuft, zeigen sich Symptome von Überlastung wie Erschöpfung oder Reizbarkeit. Selbstfürsorge und Stressbewältigung sind wie Hähne am Fass, die helfen, Wasser abzulassen, bevor es überläuft."
        }
      ],
      references: [
        "Lazarus, R. S., & Folkman, S. (1984). Stress, appraisal, and coping. Springer Publishing Company.",
        "Kaluza, G. (2018). Stressbewältigung: Trainingsmanual zur psychologischen Gesundheitsförderung. Springer-Verlag."
      ],
      relatedTerms: ["burnout", "stress", "belastungsgrenze", "selbstfuersorge"]
    }
  },
  {
    term: "Belastungsgrenze",
    slug: "belastungsgrenze",
    definition: "Der Punkt, an dem eine Person die auf sie einwirkenden Belastungen nicht mehr bewältigen kann, was zu Erschöpfung oder Zusammenbruch führen kann.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout", "Stress"],
    content: {
      teaser: "Die Belastungsgrenze beschreibt den kritischen Punkt, an dem ein Mensch die Summe aller Anforderungen nicht mehr bewältigen kann.",
      sections: [
        {
          title: "Definition und Bedeutung",
          content: "Die Belastungsgrenze markiert die Schwelle, an der die Summe aller Stressoren und Anforderungen die Bewältigungsfähigkeiten einer Person übersteigt. Sie ist individuell unterschiedlich und kann sich je nach Lebensumständen, körperlicher und psychischer Verfassung sowie vorhandenen Ressourcen verschieben. Das Überschreiten der Belastungsgrenze führt typischerweise zu Symptomen wie Erschöpfung, emotionaler Überforderung, Reizbarkeit oder sogar zu einem Zusammenbruch."
        },
        {
          title: "Anzeichen für das Erreichen der Belastungsgrenze",
          content: "Das Erreichen der persönlichen Belastungsgrenze kündigt sich oft durch verschiedene Warnsignale an: anhaltende Erschöpfung trotz ausreichend Schlaf, erhöhte Reizbarkeit und emotionale Reaktivität, Konzentrationsschwierigkeiten, körperliche Symptome wie Kopf- oder Rückenschmerzen, verminderte Leistungsfähigkeit, sozialer Rückzug oder das Gefühl, den Alltag nicht mehr bewältigen zu können. Diese Anzeichen ernst zu nehmen ist wichtig, um einem Burnout vorzubeugen."
        },
        {
          title: "Umgang mit der eigenen Belastungsgrenze",
          content: "Ein gesunder Umgang mit der eigenen Belastungsgrenze erfordert Selbsterkenntnis und die Bereitschaft, Grenzen zu respektieren. Dazu gehört, die eigenen Warnsignale zu kennen, realistische Einschätzungen der eigenen Kapazitäten vorzunehmen, bei Bedarf Unterstützung zu suchen oder anzunehmen und Prioritäten zu setzen. Regelmäßige Selbstfürsorge, Stressbewältigungstechniken und das Erlernen von Nein-Sagen können helfen, die Belastungsgrenze zu respektieren und Überlastung zu vermeiden."
        }
      ],
      literaryDevices: [
        {
          title: "Die Gummiband-Analogie",
          content: "Die Belastungsgrenze kann mit einem Gummiband verglichen werden. Es kann gedehnt werden und kehrt normalerweise in seine ursprüngliche Form zurück. Wird es jedoch zu stark oder zu lange gedehnt, verliert es seine Elastizität oder reißt schließlich. Ähnlich verhält es sich mit Menschen: Kurzfristige Belastungen können oft gut bewältigt werden, aber chronische Überdehnung führt zu nachlassender Resilienz und schließlich zum 'Reißen' - dem Zusammenbruch."
        }
      ],
      references: [
        "Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: Recent research and its implications for psychiatry. World Psychiatry, 15(2), 103-111.",
        "Hobfoll, S. E. (1989). Conservation of resources: A new attempt at conceptualizing stress. American Psychologist, 44(3), 513-524."
      ],
      relatedTerms: ["burnout", "stress", "belastung", "selbstfuersorge", "ressourcen"]
    }
  },
  {
    term: "Begleitung",
    slug: "begleitung",
    definition: "Unterstützung, Beistand oder Anleitung während eines Prozesses, einer Behandlung oder einer schwierigen Lebensphase.",
    tags: ["Therapie-Konzept", "Intervention", "Alltag", "Familie", "Soziales"],
    content: {
      teaser: "Begleitung beschreibt den Prozess des Unterstützens und Beistehens während herausfordernder Lebensphasen oder therapeutischer Prozesse.",
      sections: [
        {
          title: "Begleitung als Konzept",
          content: "Begleitung bezeichnet im psychosozialen Kontext eine Form der Unterstützung, bei der eine Person einer anderen während eines Veränderungsprozesses, einer Krise oder einer Behandlung zur Seite steht. Anders als bei direktiver Führung oder Anweisung liegt der Fokus auf dem gemeinsamen Gehen eines Weges, wobei die begleitete Person ihre Autonomie behält. Begleitung kann professionell (durch Therapeuten, Berater, Coaches) oder privat (durch Angehörige, Freunde) erfolgen."
        },
        {
          title: "Formen der professionellen Begleitung",
          content: "Professionelle Begleitung kann verschiedene Formen annehmen, wie therapeutische Begleitung, Coaching, Beratung oder Supervision. Sie zeichnet sich durch einen definierten Rahmen, klare Grenzen und spezifische Kompetenzen der begleitenden Person aus. Bei der therapeutischen Begleitung steht die Unterstützung bei der Bewältigung psychischer Schwierigkeiten im Vordergrund, während Coaching eher auf die Entwicklung persönlicher oder beruflicher Potenziale abzielt."
        },
        {
          title: "Begleitung im familiären Kontext",
          content: "Im familiären Kontext bedeutet Begleitung, für Angehörige da zu sein, ohne deren Autonomie einzuschränken oder Probleme für sie zu lösen. Dies kann besonders herausfordernd sein, etwa wenn Eltern Kinder mit psychischen Auffälligkeiten wie ADHS begleiten oder wenn Familienmitglieder eine Person mit einer Essstörung unterstützen. Wichtige Aspekte sind hier Geduld, Verständnis, emotionale Präsenz und die Bereitschaft, auch schwierige Emotionen auszuhalten, ohne übermäßig einzugreifen."
        }
      ],
      literaryDevices: [
        {
          title: "Der gemeinsame Weg",
          content: "Therapeutische Begleitung lässt sich mit einer gemeinsamen Wanderung vergleichen. Der Begleiter ist nicht der Führer, der den Weg vorgibt, sondern ein erfahrener Mitwanderer, der Orientierung bieten kann, wenn der andere unsicher ist. Er kennt mögliche Gefahren und Abkürzungen, entscheidet aber nicht über die Richtung oder das Tempo – diese Wahl bleibt beim Begleiteten. Der Begleiter kann stützen, wenn das Gelände schwierig wird, aber muss den anderen seinen eigenen Weg finden lassen."
        }
      ],
      references: [
        "Rogers, C. R. (1961). On Becoming a Person: A Therapist's View of Psychotherapy. Houghton Mifflin.",
        "Petzold, H. G. (2003). Integrative Therapie: Modelle, Theorien und Methoden für eine schulenübergreifende Psychotherapie. Junfermann Verlag."
      ],
      relatedTerms: ["therapie", "beratung", "selbsthilfe", "unterstuetzung"]
    }
  },
  {
    term: "Behavioral Activation (BA) / Verhaltensaktivierung",
    alias: "Verhaltensaktivierung",
    slug: "verhaltensaktivierung",
    definition: "Ein therapeutischer Ansatz (oft bei Depression), der darauf abzielt, durch die schrittweise Zunahme angenehmer oder sinnstiftender Aktivitäten die Stimmung zu verbessern und Passivität zu durchbrechen.",
    tags: ["Therapie-Ansatz", "Therapie-Methode", "Burnout", "Depression"],
    content: {
      teaser: "Verhaltensaktivierung ist eine wirksame therapeutische Methode, die durch gezielte Steigerung positiver Aktivitäten depressive Symptome und Erschöpfungszustände lindern kann.",
      sections: [
        {
          title: "Grundprinzipien der Verhaltensaktivierung",
          content: "Die Verhaltensaktivierung basiert auf der Beobachtung, dass Menschen mit Depression oder Burnout oft in einem Teufelskreis aus Passivität, Rückzug und verschlechterter Stimmung gefangen sind. Der therapeutische Ansatz zielt darauf ab, diesen Kreislauf durch systematisches Einführen und Steigern positiver Aktivitäten zu durchbrechen. Der Fokus liegt dabei nicht auf dem Gefühl vor der Aktivität ('Ich habe keine Lust'), sondern auf dem Verhalten selbst und der Erfahrung danach. Kernprinzip ist 'Handeln kommt vor dem Fühlen' – positive Gefühle folgen oft dem aktiven Handeln, nicht umgekehrt."
        },
        {
          title: "Praktische Umsetzung",
          content: "In der praktischen Anwendung werden zunächst Aktivitäten identifiziert, die potenziell Freude, Kompetenzerleben oder Sinn vermitteln könnten. Diese werden in kleine, machbare Schritte unterteilt und in einem Aktivitätenplan festgehalten. Begonnen wird mit leicht erreichbaren Zielen, um Erfolgserlebnisse zu sichern. Der Fortschritt wird dokumentiert, etwa in einem Tagebuch, in dem auch die Stimmung vor und nach den Aktivitäten festgehalten wird. Dies ermöglicht es, den Zusammenhang zwischen Aktivität und Stimmung direkt zu erleben."
        },
        {
          title: "Anwendung bei Burnout und elterlicher Erschöpfung",
          content: "Bei Burnout oder elterlicher Erschöpfung kann die Verhaltensaktivierung helfen, wieder Zugang zu eigenen Ressourcen und Kraftquellen zu finden. Gerade für Eltern, die ihre eigenen Bedürfnisse oft hintenanstellen, bietet der Ansatz eine Struktur, um regelmäßig selbstfürsorgende Aktivitäten in den Alltag zu integrieren. Wichtig ist dabei die Balance: Es geht nicht um zusätzliche Verpflichtungen, sondern um die bewusste Einplanung von Aktivitäten, die Energie geben statt zu nehmen. Die Verhaltensaktivierung kann auch dabei helfen, das Spektrum an Aktivitäten zu erweitern und neue Quellen positiver Verstärkung zu erschließen."
        }
      ],
      literaryDevices: [
        {
          title: "Der Motor und der leere Tank",
          content: "Burnout und Depression können mit einem Auto verglichen werden, dessen Tank leer ist. Reine kognitive Arbeit ('Ich sollte positiver denken') gleicht dem Drehen des Zündschlüssels ohne Benzin – der Motor springt nicht an. Die Verhaltensaktivierung gleicht dem Auffüllen des Tanks mit kleinen Mengen Treibstoff: Erst wenn wieder etwas Energie im System ist, kann der Motor laufen und selbst Energie erzeugen. Jede positive Aktivität ist wie ein kleiner Schluck Benzin, der hilft, wieder in Bewegung zu kommen."
        }
      ],
      references: [
        "Martell, C. R., Dimidjian, S., & Herman-Dunn, R. (2013). Behavioral activation for depression: A clinician's guide. Guilford Press.",
        "Lejuez, C. W., Hopko, D. R., & Hopko, S. D. (2001). A brief behavioral activation treatment for depression: Treatment manual. Behavior Modification, 25(2), 255-286."
      ],
      relatedTerms: ["depression", "burnout", "kognitive-verhaltenstherapie", "selbstfuersorge"]
    }
  },
  {
    term: "Benehmen",
    slug: "benehmen",
    definition: "Die Art und Weise, wie sich jemand verhält oder benimmt.",
    tags: ["Alltag", "Verhalten", "ADHS", "Erziehung"],
    content: {
      teaser: "Benehmen beschreibt die Art und Weise, wie sich jemand in sozialen Situationen verhält und ob dieses Verhalten gesellschaftlichen Erwartungen entspricht.",
      sections: [
        {
          title: "Benehmen und soziale Erwartungen",
          content: "Benehmen bezieht sich auf das sichtbare Verhalten einer Person und dessen Übereinstimmung mit sozialen Normen und Erwartungen. Was als 'gutes' oder 'schlechtes' Benehmen gilt, ist stark kulturell und kontextuell geprägt und unterliegt einem stetigen Wandel. In der Erziehung ist die Vermittlung von sozial akzeptablem Benehmen ein zentrales Anliegen, wobei Kinder lernen, ihr Verhalten an unterschiedliche soziale Situationen anzupassen."
        },
        {
          title: "Herausforderungen bei ADHS",
          content: "Kinder mit ADHS haben oft Schwier
