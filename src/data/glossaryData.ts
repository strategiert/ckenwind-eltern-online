
import { Content } from 'lucide-react';

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
          content: "Kinder mit ADHS haben oft Schwierigkeiten, ihr Verhalten den sozialen Erwartungen anzupassen, nicht weil sie nicht wollen, sondern weil ihre neurologische Disposition die Impulskontrolle und Aufmerksamkeitslenkung erschwert. Was von außen als 'schlechtes Benehmen' interpretiert werden kann, ist häufig Ausdruck der Kernproblematik der Störung. Eltern und Bezugspersonen stehen vor der Herausforderung, zwischen altersgerechtem Verhalten, störungsbedingten Schwierigkeiten und bewussten Grenzverletzungen zu unterscheiden."
        },
        {
          title: "Förderung angemessenen Benehmens",
          content: "Die Förderung sozial angemessenen Verhaltens erfolgt am wirksamsten durch klare, konsistente Strukturen, positive Verstärkung erwünschten Verhaltens und eindeutige Rückmeldungen. Besonders bei Kindern mit ADHS sind unmittelbare Konsequenzen wichtiger als verzögerte Reaktionen. Dabei ist zu beachten, dass Kinder und Jugendliche unterschiedliche Entwicklungsgeschwindigkeiten haben und das Erlernen sozialer Normen ein längerer Prozess ist, bei dem Geduld und Verständnis zentral sind."
        }
      ],
      literaryDevices: [
        {
          title: "Die soziale Landkarte",
          content: "Das Erlernen angemessenen Benehmens kann mit dem Lesen einer komplexen sozialen Landkarte verglichen werden. Während die meisten Kinder instinktiv die Zeichen und Symbole dieser Karte verstehen und navigieren können, müssen Kinder mit bestimmten neurologischen Unterschieden wie ADHS diese Zeichen explizit lernen und bewusst interpretieren – als würden sie eine Fremdsprache erlernen, während andere diese als Muttersprache beherrschen."
        }
      ],
      references: [
        "Barkley, R. A. (2018). Attention-deficit hyperactivity disorder: A handbook for diagnosis and treatment (4th ed.). New York: Guilford Press.",
        "Döpfner, M., & Schürmann, S. (2016). Wackelpeter und Trotzkopf: Hilfen für Eltern bei ADHS-Symptomen, hyperkinetischem und oppositionellem Verhalten. Beltz."
      ],
      relatedTerms: ["adhs", "impulsivitaet", "sozialverhalten", "erziehung"]
    }
  },
  {
    term: "Beratung",
    slug: "beratung",
    definition: "Professionelle Unterstützung durch Gespräche, Information und Anleitung bei persönlichen, sozialen oder psychischen Fragen und Problemen.",
    tags: ["Therapie-Konzept", "Intervention", "Alltag", "Soziales"],
    content: {
      teaser: "Beratung bezeichnet eine zeitlich begrenzte, prozesshafte Unterstützung zur Klärung von Fragen und Bewältigung von Herausforderungen in verschiedenen Lebensbereichen.",
      sections: [
        {
          title: "Was ist Beratung?",
          content: "Beratung ist eine professionelle Interaktionsform, bei der ausgebildete Berater*innen Ratsuchende dabei unterstützen, spezifische Probleme zu erkennen, zu verstehen und Lösungsansätze zu entwickeln. Im Unterschied zur Therapie ist Beratung in der Regel kürzer, fokussierter auf konkrete Fragestellungen und richtet sich nicht primär an Menschen mit psychischen Erkrankungen. Sie hat zum Ziel, die Selbsthilfefähigkeiten, Entscheidungskompetenz und Handlungsfähigkeit der Ratsuchenden zu stärken."
        },
        {
          title: "Formen der Beratung für Eltern",
          content: "Für Eltern existieren verschiedene spezialisierte Beratungsangebote: Erziehungsberatung unterstützt bei Fragen zur kindlichen Entwicklung und bei Erziehungsproblemen. Familienberatung fokussiert auf das Familiensystem als Ganzes und hilft bei Konflikten oder in Umbruchsituationen. Spezifische Beratungsangebote gibt es zudem für Eltern von Kindern mit ADHS, Essstörungen oder anderen besonderen Herausforderungen. Diese vermitteln Informationen über die jeweilige Störung, konkrete Handlungsstrategien und emotionale Unterstützung."
        },
        {
          title: "Beratungsprozess und Wirksamkeit",
          content: "Ein typischer Beratungsprozess beginnt mit der Klärung des Anliegens, gefolgt von einer Analyse der Situation, dem gemeinsamen Entwickeln von Zielen und Lösungswegen und schließlich der Umsetzungsbegleitung. Erfolgreiche Beratung zeichnet sich durch Ressourcenorientierung aus – sie aktiviert und stärkt vorhandene Stärken und Fähigkeiten der Ratsuchenden. Studien zeigen, dass besonders die Beziehungsqualität zwischen Berater*in und Klient*in, die fachliche Kompetenz der Beratenden und die aktive Beteiligung der Ratsuchenden wesentliche Wirkfaktoren sind."
        }
      ],
      literaryDevices: [
        {
          title: "Der Kompass",
          content: "Beratung lässt sich mit einem Kompass vergleichen, der in unübersichtlichem Gelände Orientierung bietet, ohne den Weg vorzugeben. Der Kompass zeigt die Richtung, aber die Ratsuchenden bestimmen selbst, welchen Pfad sie einschlagen, in welchem Tempo sie gehen und welche Abzweigungen sie erkunden möchten. Der Beratende als 'Kompassgeber' hat Kenntnis vom Gelände, weiß um mögliche Hindernisse und Abkürzungen, überlässt die Entscheidungen jedoch den Reisenden selbst."
        }
      ],
      references: [
        "Nestmann, F., Engel, F., & Sickendiek, U. (2014). Das Handbuch der Beratung. Band 1: Disziplinen und Zugänge. Tübingen: dgvt-Verlag.",
        "McLeod, J. (2013). An introduction to counselling (5th ed.). Maidenhead, UK: McGraw-Hill Education."
      ],
      relatedTerms: ["erziehungsberatung", "therapie", "coaching", "selbsthilfe"]
    }
  },
  {
    term: "Bereavement / Trauerfall",
    alias: "Trauer(fall)",
    slug: "trauerfall",
    definition: "Der Zustand der Trauer nach dem Verlust einer nahestehenden Person; ein signifikanter Lebensstressor, der Anpassungsreaktionen erfordert.",
    tags: ["Konzept-Psychologie", "Stress", "Trauma"],
    content: {
      teaser: "Bereavement oder Trauerfall bezeichnet sowohl den Zustand nach einem schwerwiegenden Verlust als auch den Prozess der emotionalen Bewältigung und Anpassung an die neue Lebenssituation.",
      sections: [
        {
          title: "Trauer als psychologischer Prozess",
          content: "Trauer ist eine natürliche Reaktion auf Verlust, insbesondere nach dem Tod einer nahestehenden Person. Der Trauerprozess ist individuell sehr unterschiedlich und kann sich emotional, kognitiv, physisch, sozial und spirituell äußern. Bekannte Phasenmodelle (wie das von Kübler-Ross mit den Phasen Verleugnung, Wut, Verhandeln, Depression und Akzeptanz) bieten Orientierung, verlaufen jedoch selten linear. Moderne Trauerforschung betont eher die individuellen Bewältigungsstile und den Prozess der Integration des Verlustes in die eigene Lebensgeschichte."
        },
        {
          title: "Trauer bei Kindern und Jugendlichen",
          content: "Kinder und Jugendliche trauern anders als Erwachsene. Ihre Trauerreaktionen sind oft sprunghafter und können sich in verschiedenen Entwicklungsphasen wiederholen. Jüngere Kinder haben noch kein vollständiges Verständnis der Endgültigkeit des Todes und können mit wiederholten Fragen, verstärktem Spiel oder physischen Beschwerden reagieren. Jugendliche hingegen kämpfen oft mit der Balance zwischen dem Trauerprozess und altersentsprechenden Entwicklungsaufgaben. Offene, altersgerechte Kommunikation, Einbeziehung in Rituale und die Möglichkeit, Gefühle auszudrücken, sind wichtige unterstützende Faktoren."
        },
        {
          title: "Unterstützung bei Trauer",
          content: "Unterstützung für Trauernde kann verschiedene Formen annehmen, von informeller sozialer Unterstützung durch Freunde und Familie bis zu professionellen Angeboten wie Trauerberatung oder -therapie. Hilfreich sind Gesprächsräume, in denen über den Verstorbenen und die eigenen Gefühle gesprochen werden kann, praktische Hilfe im Alltag sowie die Akzeptanz individueller Trauerwege. Bei komplizierter oder verlängerter Trauer, die das Funktionieren über längere Zeit stark beeinträchtigt, kann professionelle Unterstützung notwendig werden."
        }
      ],
      literaryDevices: [
        {
          title: "Die gebrochene Vase",
          content: "Trauer nach einem bedeutenden Verlust kann mit einer zerbrochenen Vase verglichen werden. Die Scherben stehen für die Fragmente des Lebens, die nach dem Verlust neu zusammengefügt werden müssen. Die restaurierte Vase wird nie wieder genau wie zuvor sein – die Risse bleiben sichtbar, doch mit der Zeit wird sie wieder ein neues, eigenständiges Ganzes. Die Risse können sogar zu besonderen Merkmalen werden, die das Licht auf besondere Weise brechen und der Vase einen einzigartigen Charakter verleihen – ähnlich wie Menschen nach durchlebter Trauer oft eine besondere Tiefe und Empathie entwickeln."
        }
      ],
      references: [
        "Stroebe, M., Schut, H., & Boerner, K. (2017). Modelle der Trauerbewältigung. In Handbuch Trauerbegleitung und Trauerforschung. Springer VS.",
        "Worden, J. W. (2018). Grief counseling and grief therapy: A handbook for the mental health practitioner (5th ed.). Springer Publishing Company."
      ],
      relatedTerms: ["trauma", "verlust", "resilienz", "anpassungsstoerung"]
    }
  },
  {
    term: "Besserung",
    slug: "besserung",
    definition: "Der Prozess der Genesung oder Verbesserung eines Zustands oder einer Symptomatik.",
    tags: ["Alltag", "Verlauf", "Therapie-Konzept"],
    content: {
      teaser: "Besserung bezeichnet die positive Entwicklung bei einem Krankheits- oder Problemverlauf und kann sowohl subjektiv empfunden als auch objektiv beobachtet werden.",
      sections: [
        {
          title: "Begriff und Bedeutung",
          content: "Besserung beschreibt den Prozess der Genesung oder Verbesserung eines problematischen Zustands, sei es eine körperliche oder psychische Erkrankung, eine belastende Lebenssituation oder eine bestimmte Symptomatik. Der Begriff hat sowohl eine medizinisch-therapeutische als auch eine alltagssprachliche Dimension und beinhaltet die Vorstellung einer positiven Entwicklung weg vom Problem hin zu einem verbesserten Zustand."
        },
        {
          title: "Besserung im therapeutischen Kontext",
          content: "Im therapeutischen Kontext wird Besserung anhand verschiedener Parameter gemessen: durch Symptomreduktion, verbesserte Funktionalität im Alltag, erhöhtes Wohlbefinden oder positive Veränderungen in Denk- und Verhaltensmustern. Wichtig ist dabei die Unterscheidung zwischen objektiv messbarer Besserung (etwa durch standardisierte Tests oder Verhaltensbeobachtungen) und subjektiv erlebter Besserung, die durch das persönliche Erleben der Betroffenen definiert wird. Beide Aspekte sind relevant, können aber durchaus unterschiedlich ausfallen."
        },
        {
          title: "Verlauf und Faktoren der Besserung",
          content: "Besserungsprozesse verlaufen selten linear. Vielmehr sind sie oft durch Höhen und Tiefen, Plateaus und manchmal auch vorübergehende Verschlechterungen gekennzeichnet. Faktoren, die eine Besserung fördern können, umfassen therapeutische Interventionen, soziale Unterstützung, Selbstwirksamkeitserfahrungen, Lebensstiländerungen sowie biologische Faktoren wie Medikation oder neuroplastische Prozesse. Die individuelle Einstellung und Erwartungshaltung spielt ebenfalls eine Rolle – positive Erwartungen können den Besserungsprozess durch Placebo-Effekte und erhöhte Motivation unterstützen."
        }
      ],
      literaryDevices: [
        {
          title: "Der Weg durch die Berge",
          content: "Den Besserungsprozess kann man mit einer Wanderung durch bergiges Gelände vergleichen. Der Weg beginnt im Tal der Probleme oder Symptome und führt allmählich aufwärts. Es gibt steilere und flachere Abschnitte, manchmal sogar Passagen, bei denen man das Gefühl hat, wieder abzusteigen. Zwischendurch erreicht man Plateaus, wo der Anstieg eine Weile pausiert. Jeder Wanderer hat sein eigenes Tempo und seinen eigenen Weg, und manchmal braucht man Begleiter, die unterstützen oder den Weg weisen. Am Ende steht nicht unbedingt der höchste Gipfel (vollständige Heilung), sondern vielleicht eine Hochebene – ein stabiler Zustand, von dem aus man die Landschaft mit anderen Augen sieht und besser mit verbliebenen Herausforderungen umgehen kann."
        }
      ],
      references: [
        "Frank, J. D., & Frank, J. B. (1993). Persuasion and healing: A comparative study of psychotherapy (3rd ed.). Johns Hopkins University Press.",
        "Grawe, K. (2004). Psychological therapy. Hogrefe Publishing."
      ],
      relatedTerms: ["heilung", "genesung", "therapie", "verlauf"]
    }
  },
  {
    term: "Bewegungsdrang",
    slug: "bewegungsdrang",
    definition: "Ein starkes inneres Bedürfnis nach körperlicher Bewegung; bei ADHS oft als motorische Unruhe oder Zappeln sichtbar.",
    tags: ["Symptom-ADHS", "Verhalten"],
    content: {
      teaser: "Bewegungsdrang beschreibt ein intensives körperliches Bedürfnis nach Aktivität und Bewegung, das besonders bei Menschen mit ADHS stark ausgeprägt sein kann.",
      sections: [
        {
          title: "Bewegungsdrang als Phänomen",
          content: "Bewegungsdrang bezeichnet ein starkes innerliches Bedürfnis nach körperlicher Bewegung und motorischer Aktivität. Dieses Phänomen ist Teil der normalen menschlichen Erfahrung, besonders ausgeprägt im Kindesalter, und dient evolutionsbiologisch der motorischen Entwicklung sowie dem Abbau von Spannungen. Bei manchen Menschen, insbesondere solchen mit ADHS, ist dieser Drang intensiver und führt zu einem subjektiv empfundenen 'Nicht-stillsitzen-können'."
        },
        {
          title: "Bewegungsdrang als ADHS-Symptom",
          content: "Bei ADHS ist ein verstärkter Bewegungsdrang (motorische Hyperaktivität) eines der Kernsymptome neben Aufmerksamkeitsstörungen und Impulsivität. Er äußert sich durch ständiges Zappeln, Herumlaufen, übermäßiges Reden oder andere motorische Aktivitäten. Diese Hyperaktivität basiert auf neurologischen Besonderheiten in der Regulation von Aktivierung und Hemmung. Mit zunehmendem Alter kann sich die offensichtliche Hyperaktivität in ein subjektives Gefühl innerer Unruhe wandeln, besonders bei Erwachsenen mit ADHS."
        },
        {
          title: "Umgang mit Bewegungsdrang",
          content: "Der Umgang mit starkem Bewegungsdrang erfordert sowohl Verständnis für die zugrundeliegenden neurobiologischen Prozesse als auch praktische Bewältigungsstrategien. Statt Bewegung zu unterdrücken, ist es oft sinnvoller, sie konstruktiv zu kanalisieren: durch regelmäßige Bewegungspausen, Sport, die Ermöglichung diskreter Bewegung (z.B. durch Wippkissen oder Stehpulte) oder die Integration von Bewegung in Lern- und Arbeitsprozesse. Bei starkem Bewegungsdrang im Rahmen einer ADHS-Symptomatik kann auch eine multimodale Behandlung mit Verhaltenstherapie, Elterntraining und bei Bedarf Medikation hilfreich sein."
        }
      ],
      literaryDevices: [
        {
          title: "Der innere Motor",
          content: "Bewegungsdrang bei ADHS kann man sich wie einen Motor vorstellen, der ständig auf hohen Touren läuft und nicht heruntergeschaltet werden kann. Dieser Motor treibt den Körper unaufhörlich an, produziert Energie, die irgendwie abgeleitet werden muss. Während die meisten Menschen ihren inneren Motor nach Bedarf regulieren können – hochfahren, wenn Energie benötigt wird, und drosseln, wenn Ruhe angesagt ist – fehlt bei ADHS gewissermaßen der Leerlaufschalter. Die Energie sucht sich dann ihre eigenen Wege – durch Fuß wippen, Fingerklopfen, Aufstehen oder innere Rastlosigkeit."
        }
      ],
      references: [
        "Barkley, R. A. (2018). Attention-deficit hyperactivity disorder: A handbook for diagnosis and treatment (4th ed.). New York: Guilford Press.",
        "Döpfner, M., Frölich, J., & Lehmkuhl, G. (2013). Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS). Hogrefe Verlag."
      ],
      relatedTerms: ["adhs", "hyperaktivitaet", "impulsivitaet", "motorik"]
    }
  },
  {
    term: "Beziehung",
    slug: "beziehung",
    definition: "Die Verbindung oder das Verhältnis zwischen zwei oder mehr Personen; relevant für familiäre Dynamiken, soziale Unterstützung und therapeutische Prozesse.",
    tags: ["Konzept-Psychologie", "Familie", "Beziehung", "Soziales"],
    content: {
      teaser: "Beziehungen bilden das Grundgerüst menschlichen Zusammenlebens und haben tiefgreifenden Einfluss auf psychische Gesundheit, Wohlbefinden und Entwicklung.",
      sections: [
        {
          title: "Grundlagen zwischenmenschlicher Beziehungen",
          content: "Beziehungen sind die Grundlage des sozialen Lebens und umfassen verschiedene Formen der Verbindung zwischen Menschen, von engen familiären Bindungen über Freundschaften bis hin zu professionellen oder therapeutischen Beziehungen. Sie sind geprägt durch Interaktion, Kommunikation, emotionale Verbindung und gemeinsame Erfahrungen. Psychologisch betrachtet erfüllen Beziehungen grundlegende Bedürfnisse nach Zugehörigkeit, Sicherheit, Anerkennung und emotionalem Austausch und haben einen signifikanten Einfluss auf unsere psychische und physische Gesundheit."
        },
        {
          title: "Familiäre Beziehungen und kindliche Entwicklung",
          content: "In der Familie werden die ersten und prägendsten Beziehungserfahrungen gemacht. Die Eltern-Kind-Beziehung bildet das Fundament für das Bindungsverhalten und beeinflusst die sozial-emotionale Entwicklung sowie die Fähigkeit, später selbst gesunde Beziehungen aufzubauen. Sichere Bindungen fördern Selbstwertgefühl, Resilienz und soziale Kompetenz. Bei Kindern mit besonderen Bedürfnissen wie ADHS oder innerhalb von Familien mit psychischen Belastungen sind Beziehungen oft komplexer und erfordern besondere Aufmerksamkeit, um förderliche Interaktionsmuster zu etablieren und aufrechtzuerhalten."
        },
        {
          title: "Therapeutische Beziehung als Wirkfaktor",
          content: "In Psychotherapie und Beratung stellt die Beziehung zwischen Therapeut und Klient einen zentralen Wirkfaktor dar. Eine vertrauensvolle, empathische und authentische Beziehung bildet die Basis für Veränderungsprozesse. Studien zeigen, dass die Qualität dieser Arbeitsbeziehung (Working Alliance) einen größeren Einfluss auf den Therapieerfolg haben kann als die spezifische therapeutische Methode. Die therapeutische Beziehung bietet einen sicheren Raum für Exploration, Reflexion und das Erproben neuer Verhaltens- und Denkmuster und kann korrigierende Beziehungserfahrungen ermöglichen."
        }
      ],
      literaryDevices: [
        {
          title: "Das Beziehungsnetz",
          content: "Beziehungen lassen sich als ein komplexes Netz verstehen, das uns trägt und umgibt. Jede Verbindung in diesem Netz hat eine eigene Qualität und Stärke – manche Fäden sind dick und belastbar wie Seile, andere zart wie Spinnweben. Einige Verbindungen sind eng geknüpft, andere locker und flexibel. Das Netz verändert sich ständig: Neue Fäden werden gesponnen, alte reißen oder verblassen, manche werden stärker mit der Zeit. In schwierigen Zeiten kann dieses Netz uns auffangen und halten. Die Qualität des Netzes – seine Dichte, Flexibilität und Widerstandsfähigkeit – beeinflusst maßgeblich, wie gut wir Krisen bewältigen können."
        }
      ],
      references: [
        "Bowlby, J. (1988). A secure base: Parent-child attachment and healthy human development. Basic Books.",
        "Wampold, B. E., & Imel, Z. E. (2015). The great psychotherapy debate: The evidence for what makes psychotherapy work (2nd ed.). Routledge."
      ],
      relatedTerms: ["bindung", "familie", "kommunikation", "therapie"]
    }
  },
  {
    term: "Binge Eating / Essanfall",
    alias: "Essanfall",
    slug: "essanfall",
    definition: "Verzehr einer ungewöhnlich großen Nahrungsmenge in einem abgrenzbaren Zeitraum, verbunden mit dem Gefühl des Kontrollverlusts über das Essen.",
    tags: ["Symptom-Essstörung", "Verhalten"],
    content: {
      teaser: "Binge Eating bezeichnet wiederkehrende Episoden unkontrollierten Überessens großer Nahrungsmengen, oft begleitet von Scham und emotionalem Stress.",
      sections: [
        {
          title: "Definition und Merkmale",
          content: "Ein Essanfall (Binge Eating Episode) ist durch zwei Hauptmerkmale gekennzeichnet: Erstens den Verzehr einer objektiv großen Nahrungsmenge innerhalb eines begrenzten Zeitraums (meist unter zwei Stunden), die deutlich mehr ist, als die meisten Menschen unter ähnlichen Umständen essen würden. Zweitens das Gefühl des Kontrollverlusts während der Episode – das Gefühl, nicht aufhören zu können oder keine Kontrolle darüber zu haben, was oder wie viel gegessen wird. Essanfälle unterscheiden sich von normalem Überessen durch diesen Kontrollverlust und sind oft von schnellem Essen, Essen bis zu einem unangenehmen Völlegefühl, alleine Essen aus Verlegenheit und nachfolgenden Gefühlen von Ekel, Depressivität oder Schuld begleitet."
        },
        {
          title: "Ursachen und Auslöser",
          content: "Die Entstehung von Essanfällen ist multifaktoriell bedingt. Biologische Faktoren wie genetische Prädisposition und Störungen der Hunger-Sättigungs-Regulation spielen eine Rolle. Psychologisch betrachtet dienen Essanfälle oft als dysfunktionale Bewältigungsstrategie für negative Emotionen wie Stress, Angst, Wut oder Langeweile. Sie können auch als Reaktion auf strenge Diäten oder Nahrungsrestriktion auftreten, wenn der Körper gegen die Einschränkung rebelliert. Soziokulturelle Faktoren wie gesellschaftlicher Schlankheitsdruck, Diätkultur und die Stigmatisierung von Übergewicht tragen ebenfalls zur Entstehung und Aufrechterhaltung von Essanfällen bei."
        },
        {
          title: "Behandlungsansätze",
          content: "Die Behandlung von Essanfällen erfordert in der Regel einen multidimensionalen Ansatz. Kognitive Verhaltenstherapie gilt als Methode der ersten Wahl und zielt darauf ab, dysfunktionale Gedanken und Verhaltensweisen zu identifizieren und zu modifizieren, regelmäßige Mahlzeitenmuster zu etablieren und alternative Bewältigungsstrategien zu entwickeln. Auch dialektisch-behaviorale Therapie kann helfen, emotionale Regulation zu verbessern. Ernährungsberatung unterstützt bei der Entwicklung eines gesunden, ausgewogenen Essverhaltens ohne strenge Einschränkungen. Selbsthilfegruppen bieten zusätzliche Unterstützung und die Möglichkeit zum Erfahrungsaustausch. Bei einer vorliegenden Binge-Eating-Störung kann auch eine medikamentöse Behandlung erwogen werden."
        }
      ],
      literaryDevices: [
        {
          title: "Der Tsunami",
          content: "Ein Essanfall lässt sich mit einem Tsunami vergleichen. Er beginnt oft mit einer kaum spürbaren Erschütterung – einem Gedanken, einer Emotion oder einem Auslöser, der zunächst unbedrohlich erscheint. Dann zieht sich das Wasser zurück (die Anspannung baut sich auf), bevor die mächtige Welle hereinbricht. Der Essanfall selbst gleicht dieser überwältigenden Welle, die alles mit sich reißt und gegen die anzukämpfen zwecklos erscheint. Nach dem Tsunami bleibt die Verwüstung zurück: Scham, Schuldgefühle und das Versprechen, dass es 'nie wieder' passieren wird. Doch ohne Bearbeitung der Grunderschütterung – der emotionalen Trigger und dysfunktionalen Denkmuster – baut sich der nächste Tsunami bereits auf."
        }
      ],
      references: [
        "Fairburn, C. G. (2013). Overcoming binge eating (2nd ed.). Guilford Press.",
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing."
      ],
      relatedTerms: ["binge-eating-stoerung", "essstoerung", "emotionales-essen", "kontrollverlust"]
    }
  },
  {
    term: "Body Dysmorphic Disorder (BDD) / Körperdysmorphe Störung",
    alias: "Körperdysmorphe Störung",
    slug: "koerperdysmorphe-stoerung",
    definition: "Psychische Störung, bei der Betroffene sich übermäßig mit vermeintlichen Mängeln ihres Aussehens beschäftigen; kann gemeinsam mit Essstörungen auftreten.",
    tags: ["Diagnose", "Essstörung", "Kognition"],
    content: {
      teaser: "Die körperdysmorphe Störung ist gekennzeichnet durch eine übermäßige Beschäftigung mit eingebildeten oder stark überbetonten Makeln am eigenen Körper, die zu erheblichem Leidensdruck und Einschränkungen führt.",
      sections: [
        {
          title: "Symptome und Diagnose",
          content: "Die körperdysmorphe Störung (KDS) ist durch eine zwanghafte Beschäftigung mit wahrgenommenen Defekten oder Mängeln im äußeren Erscheinungsbild gekennzeichnet, die für andere kaum oder gar nicht sichtbar sind. Betroffene verbringen täglich mehrere Stunden mit Gedanken an diese vermeintlichen Makel, häufig bezogen auf Gesicht, Haut, Haare oder bestimmte Körperproportionen. Die Beschäftigung führt zu klinisch bedeutsamem Leidensdruck und Beeinträchtigungen im sozialen, beruflichen oder anderen Funktionsbereichen. Typische Verhaltensweisen sind exzessives Überprüfen im Spiegel, übermäßige Körperpflege, Hautbearbeitung, ständiges Vergleichen mit anderen, Vermeidung sozialer Situationen und das wiederholte Suchen nach Bestätigung."
        },
        {
          title: "Abgrenzung zu Essstörungen",
          content: "Obwohl KDS und Essstörungen Überschneidungen aufweisen, unterscheiden sie sich in wichtigen Aspekten. Bei Essstörungen steht die Sorge um Gewicht und Körperform im Vordergrund, verbunden mit gestörtem Essverhalten. Bei KDS können die Sorgen jeden Körperteil betreffen und sind nicht notwendigerweise mit auffälligem Essverhalten verbunden. Dennoch können beide Störungen koexistieren, und die Übergänge können fließend sein, besonders wenn bei KDS Körperbereiche betroffen sind, die mit Gewicht oder Form zusammenhängen. Die Differentialdiagnose ist wichtig für eine zielgerichtete Behandlung."
        },
        {
          title: "Behandlung und Umgang",
          content: "Die Behandlung der KDS umfasst primär kognitive Verhaltenstherapie, die darauf abzielt, dysfunktionale Gedanken zu identifizieren und zu modifizieren, das Überprüfungs- und Vermeidungsverhalten zu reduzieren und eine realistischere Körperwahrnehmung zu fördern. Expositionsübungen konfrontieren Betroffene schrittweise mit gefürchteten Situationen. Bei schweren Verläufen können auch Antidepressiva aus der Gruppe der selektiven Serotonin-Wiederaufnahmehemmer (SSRI) hilfreich sein. Für Angehörige ist es wichtig, zu verstehen, dass die Sorgen der Betroffenen für diese sehr real sind, auch wenn sie für Außenstehende unbegründet erscheinen. Bagatellisierung ('Stell dich nicht so an') verstärkt nur das Gefühl, nicht verstanden zu werden."
        }
      ],
      literaryDevices: [
        {
          title: "Die verzerrte Linse",
          content: "Die körperdysmorphe Störung lässt sich mit einer stark verzerrenden Linse vergleichen, durch die Betroffene ihren Körper betrachten. Während andere Menschen sie durch eine normale Linse sehen und nichts Ungewöhnliches bemerken, sehen die Betroffenen durch ihre Linse jede kleine Unregelmäßigkeit vergrößert, verzerrt und überbetont. Diese Linse färbt ihre gesamte Wahrnehmung und lässt sie glauben, dass auch andere ihre 'Makel' genauso deutlich sehen. Die therapeutische Arbeit besteht darin, die verzerrte Linse zu erkennen und allmählich zu lernen, auch durch eine realistischere Linse zu blicken."
        }
      ],
      references: [
        "Phillips, K. A. (2009). Understanding body dysmorphic disorder. Oxford University Press.",
        "Wilhelm, S., Phillips, K. A., & Steketee, G. (2013). Cognitive-behavioral therapy for body dysmorphic disorder: A treatment manual. Guilford Press."
      ],
      relatedTerms: ["koerperbild", "essstoerung", "zwangsstoerung", "selbstwert"]
    }
  },
  {
    term: "Body Image / Körperbild",
    alias: "Körperbild",
    slug: "koerperbild",
    definition: "Die subjektive Vorstellung und Bewertung des eigenen Körpers, einschließlich Gedanken, Gefühle und Wahrnehmungen bezüglich Aussehen und Form. Bei Essstörungen oft negativ verzerrt.",
    tags: ["Konzept-Psychologie", "Symptom-Essstörung", "Kognition", "Erleben-Kind"],
    content: {
      teaser: "Das Körperbild umfasst unsere innere Vorstellung, Wahrnehmung und Bewertung des eigenen Körpers und beeinflusst maßgeblich unser Selbstwertgefühl und Wohlbefinden.",
      sections: [
        {
          title: "Definition und Komponenten des Körperbildes",
          content: "Das Körperbild ist ein multidimensionales Konstrukt, das die Art und Weise beschreibt, wie wir unseren eigenen Körper wahrnehmen, fühlen und bewerten. Es umfasst mehrere Komponenten: die perzeptive Komponente (wie genau wir unseren Körper wahrnehmen), die kognitive Komponente (Gedanken und Überzeugungen über den Körper), die affektive Komponente (Gefühle gegenüber dem eigenen Körper) und die behaviorale Komponente (Verhaltensweisen in Bezug auf den Körper wie Vermeidung oder Überprüfung). Das Körperbild ist nicht statisch, sondern kann sich je nach Situation, Stimmung und Lebensphase verändern."
        },
        {
          title: "Entwicklung des Körperbildes",
          content: "Die Entwicklung des Körperbildes beginnt bereits in der frühen Kindheit und wird durch zahlreiche Faktoren beeinflusst. Familiäre Einstellungen und Kommentare über Gewicht und Aussehen prägen frühe Körperschemata. In der Pubertät, wenn der Körper sich stark verändert, verstärkt sich die Auseinandersetzung mit dem Körperbild, besonders unter dem Einfluss von Gleichaltrigen und Medien. Gesellschaftliche Schönheits- und Körperideale spielen eine bedeutende Rolle, ebenso wie kulturelle Unterschiede in der Bewertung von Körperformen. Soziale Medien haben in den letzten Jahren zusätzlichen Einfluss auf die Entwicklung des Körperbildes gewonnen, indem sie oft unrealistische und bearbeitete Bilder präsentieren, die als Vergleichsstandard dienen."
        },
        {
          title: "Körperbildstörungen und therapeutische Ansätze",
          content: "Ein negatives oder gestörtes Körperbild ist ein zentrales Merkmal von Essstörungen wie Anorexie und Bulimie, kann aber auch bei anderen psychischen Störungen wie Depressionen oder der körperdysmorphen Störung auftreten. Bei Essstörungen ist die Selbstbewertung übermäßig von Körperform und -gewicht abhängig, und die Körperwahrnehmung kann stark verzerrt sein. Therapeutische Ansätze zur Verbesserung des Körperbildes umfassen kognitive Verhaltenstherapie zur Identifikation und Modifikation negativer Körperschemata, Expositionsübungen zur Konfrontation mit dem eigenen Körper, Spiegelkonfrontationen unter therapeutischer Anleitung, Körperakzeptanztraining und medienanalytische Ansätze, die den kritischen Umgang mit idealisierten Körperbildern fördern."
        }
      ],
      literaryDevices: [
        {
          title: "Der innere Spiegel",
          content: "Das Körperbild ist wie ein innerer Spiegel, den wir ständig mit uns herumtragen. Anders als ein echter Spiegel zeigt er jedoch nicht das objektive Spiegelbild, sondern eine Version, die durch unsere Erfahrungen, Überzeugungen und emotionalen Filter verzerrt ist. Manche Menschen tragen einen Spiegel, der alles vergrößert, was sie als Makel empfinden, und alles verkleinert, was andere als schön betrachten würden. Andere haben einen Spiegel mit blinden Flecken, der bestimmte Aspekte ihres Körpers ganz ausblendet. Die therapeutische Arbeit besteht darin, den verzerrten inneren Spiegel durch einen klareren, wohlwollenderen zu ersetzen, der ein vollständigeres und realistischeres Bild zeigt."
        }
      ],
      references: [
        "Cash, T. F., & Smolak, L. (Eds.). (2011). Body image: A handbook of science, practice, and prevention (2nd ed.). Guilford Press.",
        "Vocks, S., & Legenbauer, T. (2010). Körperbildtherapie bei Anorexia und Bulimia nervosa: Ein kognitiv-verhaltenstherapeutisches Behandlungsprogramm. Hogrefe Verlag."
      ],
      relatedTerms: ["essstoerung", "koerperdysmorphe-stoerung", "selbstwert", "medienkonsum"]
    }
  },
  {
    term: "Bockig",
    slug: "bockig",
    definition: "Widerwilliges, trotziges oder aufsässiges Verhalten, oft als Teil der normalen kindlichen Entwicklung oder als Reaktion auf Frustration.",
    tags: ["Alltag", "Elternsprache", "Verhalten", "Entwicklung", "ADHS"],
    content: {
      teaser: "Bockiges Verhalten äußert sich in Widerstand und Verweigerung und stellt sowohl ein normales Entwicklungsphänomen bei Kindern als auch eine Herausforderung im Erziehungsalltag dar.",
      sections: [
        {
          title: "Bockigkeit als Entwicklungsphänomen",
          content: "Bockiges Verhalten ist vor allem in bestimmten Entwicklungsphasen ein normaler Teil kindlicher Entwicklung. Besonders ausgeprägt ist es in der sogenannten Trotzphase (etwa zwischen dem 2. und 4. Lebensjahr), wenn Kinder Autonomie entwickeln und ihre Grenzen austesten. Später kann es in der Pubertät erneut vermehrt auftreten, wenn Jugendliche ihre Identität formen und sich von elterlichen Vorgaben abgrenzen. Diese Phasen der Widerständigkeit sind wichtig für die Entwicklung von Selbstständigkeit und der Fähigkeit, eigene Bedürfnisse wahrzunehmen und zu vertreten."
        },
        {
          title: "Ursachen und Auslöser für bockiges Verhalten",
          content: "Bockiges Verhalten kann verschiedene Ursachen haben und durch verschiedene Faktoren ausgelöst werden. Es kann eine Reaktion auf Überforderung, Müdigkeit oder Hunger sein, wenn die Selbstregulationsfähigkeiten noch nicht ausreichend entwickelt sind. Manchmal entsteht es aus Frustration über mangelnde Autonomie oder fehlende Mitbestimmungsmöglichkeiten. Bei ADHS kann verstärktes bockiges oder oppositionelles Verhalten mit der Impulsivität und emotionalen Dysregulation zusammenhängen, die Teil der Störung ist. Auch Überstimulation oder Unterstimulation können zu Widerstand führen, ebenso wie unklare Erwartungen oder inkonsistente Grenzen."
        },
        {
          title: "Umgang mit bockigem Verhalten",
          content: "Ein konstruktiver Umgang mit bockigem Verhalten beginnt mit dem Verständnis, dass es oft eine Form der Kommunikation ist und nicht persönlich gegen die Eltern gerichtet. Hilfreich ist eine klare, altersgerechte Kommunikation auf Augenhöhe und das Anbieten von Auswahlmöglichkeiten, die dem Kind ein Gefühl von Kontrolle geben. Das Eingehen auf zugrunde liegende Bedürfnisse und Gefühle kann Widerstand oft auflösen. Konsequentes Verhalten der Eltern mit klaren, vorhersehbaren Grenzen bietet Sicherheit. Bei übermäßig bockigem Verhalten, das über normale Entwicklungsphasen hinausgeht, kann fachliche Unterstützung durch Erziehungsberatung oder therapeutische Angebote sinnvoll sein."
        }
      ],
      literaryDevices: [
        {
          title: "Die Mauer und der Fluss",
          content: "Bockiges Verhalten kann man mit dem Versuch vergleichen, eine Mauer gegen einen Fluss zu errichten. Das Kind ist wie der Fluss, der seinen eigenen Weg finden möchte, während Verbote oder Anforderungen wie eine Mauer wirken. Je höher und fester die Mauer gebaut wird, desto mehr Widerstand (Wasserdruck) baut sich auf. Manchmal führt dies zu einem Durchbruch der Mauer (Wutausbruch) oder zum Umleiten des Wassers (passive Verweigerung). Ein geschickterer Umgang wäre, statt einer Mauer einen Kanal zu bauen: dem Kind einen Rahmen zu geben, in dem es seinen Weg finden kann, ohne dass die Energie des Flusses blockiert wird oder unkontrolliert ausbricht."
        }
      ],
      references: [
        "Greene, R. W. (2014). Explosives Kind - Das Buch: Das New York Times Bestseller-Elternbuch: Warum manche Kinder schneller aus der Haut fahren und wie man ihnen helfen kann. Trias.",
        "Krowatschek, D., Albrecht, S., & Krowatschek, G. (2007). Marburger Konzentrationstraining (MKT) für Kindergarten- und Vorschulkinder. Verlag modernes lernen."
      ],
      relatedTerms: ["trotz", "autonomie", "grenzen-setzen", "adhs"]
    }
  },
  {
    term: "Borderline-Persönlichkeitsstörung (BPS)",
    slug: "borderline-persoenlichkeitsstoerung",
    definition: "Eine psychische Störung, gekennzeichnet durch Instabilität in Stimmungen, Beziehungen, Selbstbild und Verhalten. DBT wurde ursprünglich für BPS entwickelt.",
    tags: ["Diagnose", "Persönlichkeitsstörung"],
    content: {
      teaser: "Die Borderline-Persönlichkeitsstörung ist geprägt durch emotionale Instabilität, Impulsivität, unsichere Beziehungen und ein instabiles Selbstbild, was zu erheblichem Leidensdruck führt.",
      sections: [
        {
          title: "Symptome und Diagnosekriterien",
          content: "Die Borderline-Persönlichkeitsstörung (BPS) ist durch ein durchgängiges Muster von Instabilität in der Emotionsregulation, Impulsivität, Selbstbild und zwischenmenschlichen Beziehungen charakterisiert. Zu den typischen Symptomen gehören Angst vor dem Verlassenwerden, instabile intensive Beziehungen, Identitätsstörung, Impulsivität (z.B. bei Geldausgaben, Substanzkonsum, Sexualität), wiederholte suizidale Handlungen oder Selbstverletzung, affektive Instabilität mit intensiven Stimmungsschwankungen, chronische Gefühle von Leere, unangemessen starke Wut oder Schwierigkeiten, Wut zu kontrollieren, sowie vorübergehende paranoide Gedanken oder dissoziative Symptome unter starkem Stress."
        },
        {
          title: "Ursachen und Entstehung",
          content: "Die Entstehung der BPS wird durch ein Zusammenspiel von biologischen, psychologischen und sozialen Faktoren erklärt. Genetische Einflüsse scheinen eine Rolle zu spielen, ebenso wie neurobiologische Faktoren, besonders im Bereich der Emotionsregulation. Psychosoziale Faktoren umfassen oft frühe belastende Lebenserfahrungen wie emotionale Vernachlässigung, Missbrauch oder Trauma, die in Wechselwirkung mit einer biologischen Vulnerabilität zur Entwicklung der Störung beitragen können. Das Biosoziale Modell von Linehan beschreibt BPS als Ergebnis einer Wechselwirkung zwischen biologisch bedingter emotionaler Verletzlichkeit und einem invalidierenden Umfeld, das emotionale Reaktionen nicht angemessen anerkennt oder bestärkt."
        },
        {
          title: "Behandlungsansätze",
          content: "Die Dialektisch-Behaviorale Therapie (DBT) wurde spezifisch für BPS entwickelt und ist der am besten untersuchte Behandlungsansatz. Sie kombiniert Techniken der Verhaltenstherapie mit Elementen der Achtsamkeit und fokussiert auf vier Hauptbereiche: Emotionsregulation, zwischenmenschliche Fertigkeiten, Stresstoleranz und Achtsamkeit. Auch andere spezialisierte Psychotherapien wie die mentalisierungsbasierte Therapie (MBT), die schemafokussierte Therapie und die übertragungsfokussierte Psychotherapie (TFP) haben sich als wirksam erwiesen. Medikamentöse Behandlungen können unterstützend eingesetzt werden, insbesondere für spezifische Symptome wie Stimmungsschwankungen oder Impulsivität, sind jedoch nicht Therapie der ersten Wahl."
        }
      ],
      literaryDevices: [
        {
          title: "Der emotionale Thermostat",
          content: "Die emotionale Erfahrung bei BPS kann mit einem fehlerhaften Thermostat verglichen werden. Während ein funktionierender Thermostat die Temperatur in einem angenehmen Bereich hält und nur leicht nachreguliert, schwankt der Thermostat bei BPS extrem: Von Eiskälte (emotionale Leere, Taubheit) zu plötzlicher überwältigender Hitze (intensive emotionale Reaktionen), ohne die gemäßigten Zwischenstufen zu erreichen. Die therapeutische Arbeit besteht darin, diesen 'emotionalen Thermostat' zu reparieren, damit er Emotionen feiner regulieren kann und nicht mehr zwischen den Extremen hin und her springt."
        }
      ],
      references: [
        "Linehan, M. M. (2018). Cognitive-behavioral treatment of borderline personality disorder. Guilford Publications.",
        "National Institute for Health and Care Excellence. (2009). Borderline personality disorder: recognition and management. NICE Clinical Guideline 78."
      ],
      relatedTerms: ["dialektisch-behaviorale-therapie", "emotionsregulation", "dissoziation", "trauma"]
    }
  },
  {
    term: "Boundary Setting / Grenzen setzen",
    alias: "Grenzen setzen",
    slug: "grenzen-setzen",
    definition: "Das Definieren und Kommunizieren persönlicher Grenzen in sozialen Interaktionen, um die eigene Integrität, Bedürfnisse und Belastbarkeit zu schützen. Wichtig für Selbstfürsorge.",
    tags: ["Therapie-Konzept", "Konzept-Psychologie", "Alltag", "Burnout", "ADHS", "Erziehung", "Selbstfürsorge"],
    content: {
      teaser: "Grenzen setzen bedeutet, die eigenen körperlichen, emotionalen oder kognitiven Grenzen zu erkennen, zu kommunizieren und zu schützen – ein wesentlicher Aspekt gesunder Beziehungen und psychischen Wohlbefindens.",
      sections: [
        {
          title: "Bedeutung und Arten von Grenzen",
          content: "Grenzen sind unsichtbare Linien, die definieren, wo wir enden und andere beginnen, was wir akzeptieren und was nicht, welches Verhalten für uns angemessen ist oder verletzend wirkt. Es gibt verschiedene Arten von Grenzen: Physische Grenzen betreffen unseren Körper und unseren persönlichen Raum; emotionale Grenzen schützen unsere Gefühle und psychische Integrität; zeitliche und energetische Grenzen definieren, wie viel Zeit und Energie wir für andere aufbringen können oder wollen; materielle Grenzen bestimmen den Umgang mit unserem Eigentum. Gesunde Grenzen sind flexibel und können je nach Situation, Beziehung und eigenem Zustand variieren."
        },
        {
          title: "Grenzen in der Erziehung",
          content: "In der Erziehung dienen Grenzen sowohl dem Schutz des Kindes als auch der Entwicklung seiner sozialen Fähigkeiten und Selbstregulation. Kinder brauchen klare, verständliche und konsistente Grenzen, um Sicherheit zu erleben und zu lernen, wie sie mit anderen interagieren können. Bei Kindern mit ADHS kann das Setzen und Einhalten von Grenzen besonders herausfordernd sein, da Impulsivität und exekutive Funktionsstörungen das Verständnis und die Einhaltung von Regeln erschweren. Hier sind besonders klare, einfache und unmittelbare Konsequenzen wichtig, kombiniert mit positiver Verstärkung erwünschten Verhaltens."
        },
        {
          title: "Grenzen als Burnout-Prävention",
          content: "Das Setzen gesunder Grenzen ist ein wesentlicher Aspekt der Burnout-Prävention und Selbstfürsorge, besonders für Eltern und Betreuungspersonen. Die Fähigkeit, 'Nein' zu sagen, wenn die eigenen Ressourcen erschöpft sind, Aufgaben zu delegieren oder um Hilfe zu bitten, kann vor Überbelastung schützen. Viele Menschen, besonders Frauen und Personen in helfenden Berufen, haben Schwierigkeiten mit dem Setzen von Grenzen, oft aus Angst vor Ablehnung oder aufgrund verinnerlichter Überzeugungen, dass die Bedürfnisse anderer wichtiger seien als die eigenen. Die Entwicklung gesunder Grenzen erfordert Selbstreflexion, Übung und manchmal therapeutische Unterstützung, kann aber langfristig die Lebensqualität und Beziehungszufriedenheit deutlich verbessern."
        }
      ],
      literaryDevices: [
        {
          title: "Der unsichtbare Garten",
          content: "Grenzen kann man sich wie einen unsichtbaren Garten vorstellen, der uns umgibt. Wir entscheiden, welchen Zaun wir errichten – hoch oder niedrig, durchlässig oder fest – und wer ein Tor erhält, um einzutreten. Bei gesunden Grenzen ist der Zaun klar erkennbar, aber nicht unüberwindlich; wir können bewusst entscheiden, wen wir hineinlassen und wie nah. Ohne Zaun können andere ungehindert durch unseren Garten laufen, ihn zertrampeln oder ausnutzen. Ein zu hoher, undurchdringlicher Zaun hingegen kann zur Isolation führen. Die Kunst der gesunden Grenzen ist es, einen Zaun zu errichten, der uns schützt, aber dennoch verbindende Tore hat, die wir bewusst öffnen können."
        }
      ],
      references: [
        "Cloud, H., & Townsend, J. (2017). Boundaries: When to say yes, how to say no to take control of your life. Zondervan.",
        "Brown, B. (2015). Rising strong: The reckoning. The rumble. The revolution. Spiegel & Grau."
      ],
      relatedTerms: ["selbstfuersorge", "burnout-praevention", "assertivitaet", "nein-sagen"]
    }
  },
  {
    term: "Brief Therapy / Kurzzeittherapie",
    alias: "Kurzzeittherapie",
    slug: "kurzzeittherapie",
    definition: "Zeitlich begrenzte Form der Psychotherapie mit einem klaren Fokus auf spezifische Ziele.",
    tags: ["Therapie-Ansatz"],
    content: {
      teaser: "Kurzzeittherapie ist ein effizienter therapeutischer Ansatz mit begrenzter Sitzungsanzahl, der auf spezifische Probleme fokussiert und lösungsorientierte Interventionen nutzt.",
      sections: [
        {
          title: "Grundprinzipien der Kurzzeittherapie",
          content: "Kurzzeittherapie (Brief Therapy) zeichnet sich durch eine begrenzte Anzahl von Therapiesitzungen aus, typischerweise zwischen 5 und 25 Sitzungen. Sie ist fokussierter und zielorientierter als langfristige Therapieformen und konzentriert sich auf spezifische, klar definierte Probleme statt auf eine umfassende Persönlichkeitsveränderung. Der Ansatz ist in der Regel aktiver und direktiver, mit einem Schwerpunkt auf Lösungen und konkreten Verhaltensänderungen statt auf tiefgreifender Analyse der Vergangenheit. Kurzzeittherapie betont die Ressourcen und Stärken der Klienten und fördert deren Selbstwirksamkeit und Autonomie."
        },
        {
          title: "Anwendungsbereiche und Methoden",
          content: "Kurzzeittherapeutische Ansätze werden bei verschiedenen Problemstellungen eingesetzt, darunter leichte bis mittelgradige Depressionen, Angststörungen, spezifische Phobien, Beziehungsprobleme und Anpassungsschwierigkeiten. Sie eignen sich besonders für klar umgrenzte Probleme mit geringer Chronifizierung. Zu den wichtigsten Methoden zählen die lösungsfokussierte Kurzzeittherapie nach de Shazer, die kognitive Verhaltenstherapie, die strategische Kurzzeittherapie nach Haley und die interpersonelle Therapie. Diese Ansätze nutzen Techniken wie Zielsetzung, Hausaufgaben, Reframing (Umdeutung), paradoxe Interventionen und andere kognitive und behaviorale Werkzeuge."
        },
        {
          title: "Vor- und Nachteile",
          content: "Zu den Vorteilen der Kurzzeittherapie gehören ihre Effizienz, Kosteneffektivität und der schnellere Zugang im Vergleich zu längeren Therapieformen. Die klare Fokussierung und zeitliche Begrenzung kann die Motivation und das Engagement der Klienten fördern und die Therapie scheut sich nicht, auch rasche Verbesserungen anzustreben. Allerdings ist sie nicht für alle Problemstellungen geeignet. Bei komplexen, chronifizierten Störungen, tiefgreifenden Persönlichkeitsproblemen oder schweren Traumata kann eine längerfristige Therapie angemessener sein. Die Wirksamkeit der Kurzzeittherapie ist für viele Störungsbilder gut belegt, wobei der Erfolg auch von der Passung zwischen Therapeut, Klient und Methode abhängt."
        }
      ],
      literaryDevices: [
        {
          title: "Der Scheinwerfer statt der Flächenbeleuchtung",
          content: "Die Kurzzeittherapie gleicht einem gezielten Scheinwerfer, der intensives Licht auf ein spezifisches Problem wirft, während die Langzeittherapie eher einer Flächenbeleuchtung entspricht, die den gesamten Raum ausleuchtet. Der Scheinwerfer ermöglicht es, ein bestimmtes Element mit großer Klarheit und Detailgenauigkeit zu betrachten und gezielte Veränderungen vorzunehmen. Er ist energieeffizient und zweckorientiert, kann aber nicht den gesamten Raum erhellen. Die Entscheidung zwischen Scheinwerfer und Flächenbeleuchtung hängt davon ab, was genau sichtbar gemacht und verändert werden soll."
        }
      ],
      references: [
        "De Shazer, S., & Dolan, Y. (2012). More than miracles: The state of the art of solution-focused brief therapy. Routledge.",
        "Hoyt, M. F. (Ed.). (2017). Brief therapy and beyond: Stories, language, love, hope, and time. Wiley."
      ],
      relatedTerms: ["loesungsorientierung", "psychotherapie", "zielorientierung", "verhaltenstherapie"]
    }
  }
];

export const getTermBySlug = (slug: string) => {
  return glossaryData.find(item => item.slug === slug);
};

export const getRelatedTerms = (termSlugs: string[]) => {
  return glossaryData.filter(term => termSlugs.includes(term.slug));
};
