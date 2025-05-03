
import { GlossaryItem } from './types';

export const aTerms: GlossaryItem[] = [
  {
    term: "ADHS",
    slug: "adhs",
    definition: "Neurobiologische Störung, gekennzeichnet durch Probleme mit Aufmerksamkeit, Impulsivität und/oder Hyperaktivität.",
    tags: ["Diagnose-ADHS"],
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
    definition: "Bewusste Wahrnehmung des gegenwärtigen Moments ohne Bewertung.",
    tags: ["Konzept-Psychologie", "Therapie-Methode", "Alltag", "Burnout", "ADHS", "Essstörung"],
    alias: "Mindfulness",
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
        },
        {
          title: "Achtsamkeit bei psychischen Störungen",
          content: "Bei Burnout kann Achtsamkeit helfen, frühe Warnsignale zu erkennen und eine gesündere Beziehung zu Stress zu entwickeln. Bei ADHS unterstützt sie die Konzentration und Selbstregulation. Bei Essstörungen fördert sie ein bewussteres Verhältnis zum Körper und zur Nahrungsaufnahme."
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
    term: "ACT",
    slug: "act",
    definition: "Verhaltenstherapeutischer Ansatz, der Akzeptanz von Unvermeidbarem und werteorientiertes Handeln fördert.",
    tags: ["Therapie-Ansatz", "Burnout", "ADHS", "Essstörung"],
    alias: "Akzeptanz- und Commitment-Therapie",
    content: {
      teaser: "ACT ist ein moderner therapeutischer Ansatz, der Menschen dabei unterstützt, schwierige Gedanken und Gefühle zu akzeptieren und gleichzeitig ein wertorientiertes Leben zu führen.",
      sections: [
        {
          title: "Was ist ACT?",
          content: "Die Akzeptanz- und Commitment-Therapie (ACT) ist ein verhaltenstherapeutischer Ansatz, der darauf abzielt, psychische Flexibilität zu fördern. Im Gegensatz zu traditionellen Ansätzen, die sich auf die Reduzierung von Symptomen konzentrieren, lehrt ACT, wie man schwierige Gefühle und Gedanken akzeptieren kann, während man gleichzeitig Handlungen unternimmt, die mit den eigenen Werten übereinstimmen."
        },
        {
          title: "Die sechs Kernprozesse der ACT",
          content: "ACT basiert auf sechs miteinander verbundenen Kernprozessen: Akzeptanz (statt Vermeidung), kognitive Defusion (Distanz zu Gedanken schaffen), Kontakt mit dem gegenwärtigen Moment (Achtsamkeit), das Selbst als Kontext (Beobachter-Perspektive), Werte (was wirklich wichtig ist) und engagiertes Handeln (Schritte in Richtung der Werte)."
        },
        {
          title: "ACT bei verschiedenen Störungsbildern",
          content: "Bei Burnout hilft ACT, Stressgedanken zu akzeptieren und gleichzeitig werteorientierte Selbstfürsorge zu praktizieren. Bei ADHS kann ACT unterstützen, Frustrationen über Symptome zu akzeptieren und dennoch produktive Strukturen zu entwickeln. Bei Essstörungen fördert ACT eine gesündere Beziehung zum Körper und zur Nahrung durch Akzeptanz und werteorientiertes Handeln."
        }
      ],
      literaryDevices: [
        {
          title: "Der Bus und die Passagiere",
          content: "Stellen Sie sich vor, Sie sind der Busfahrer Ihres Lebens. Die schwierigen Gedanken und Gefühle sind wie laute Passagiere, die Sie ablenken und in eine andere Richtung lenken wollen. ACT lehrt Sie nicht, die Passagiere zum Schweigen zu bringen (was oft nicht funktioniert), sondern sie mitfahren zu lassen, während Sie dennoch den Bus in die Richtung steuern, die für Sie wichtig ist."
        }
      ],
      references: [
        "Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2011). Acceptance and commitment therapy: The process and practice of mindful change (2nd ed.). New York: Guilford Press.",
        "Harris, R. (2009). ACT made simple: An easy-to-read primer on acceptance and commitment therapy. Oakland, CA: New Harbinger Publications."
      ],
      relatedTerms: ["achtsamkeit", "akzeptanz", "kognitive-verhaltenstherapie"]
    }
  },
  {
    term: "Adjustment Disorder",
    slug: "adjustment-disorder",
    definition: "Reaktion auf psychosoziale Belastungen, die über eine normale Reaktion hinausgeht und klinisch bedeutsames Leiden oder Beeinträchtigungen verursacht.",
    tags: ["Diagnose-Stress", "Diagnose-Burnout"],
    alias: "Anpassungsstörung",
    content: {
      teaser: "Eine Anpassungsstörung ist eine psychische Reaktion auf identifizierbare Belastungsfaktoren, die zu emotionalem Leiden und Funktionsbeeinträchtigungen führt.",
      sections: [
        {
          title: "Definition und Diagnosekriterien",
          content: "Eine Anpassungsstörung entwickelt sich als Reaktion auf einen oder mehrere identifizierbare Stressoren innerhalb von drei Monaten nach deren Auftreten. Die Reaktion geht über das normale oder erwartbare Maß hinaus und verursacht deutliches Leiden oder Beeinträchtigungen in sozialen, beruflichen oder anderen wichtigen Funktionsbereichen."
        },
        {
          title: "Unterschied zum Burnout",
          content: "Während Burnout meist durch chronischen Arbeitsstress verursacht wird und sich langsam entwickelt, kann eine Anpassungsstörung durch verschiedene Arten von Stressoren ausgelöst werden und tritt relativ schnell auf. Eine Anpassungsstörung ist eine offizielle Diagnose, während Burnout eher ein Konzept ist, das in der ICD-11 als 'arbeitsbezogenes Phänomen' beschrieben wird."
        },
        {
          title: "Behandlung und Verlauf",
          content: "Die Behandlung einer Anpassungsstörung umfasst meist psychotherapeutische Ansätze wie kognitive Verhaltenstherapie oder Problemlösungsstrategien. Die Prognose ist in der Regel gut, und die Symptome klingen oft innerhalb von sechs Monaten ab, wenn der Stressor beseitigt ist oder eine Anpassung stattgefunden hat."
        }
      ],
      literaryDevices: [
        {
          title: "Der umgeknickte Baum",
          content: "Eine Anpassungsstörung kann mit einem Baum verglichen werden, der durch einen plötzlichen Sturm umgeknickt wurde. Der Baum war zuvor gesund, aber die Belastung war zu stark. Mit der richtigen Unterstützung und Zeit kann er sich wieder aufrichten und weiterwachsen, möglicherweise mit einer leichten Neigung als Zeichen der erlebten Belastung."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Casey, P. (2014). Adjustment disorder: New developments. Current Psychiatry Reports, 16(6), 451."
      ],
      relatedTerms: ["stress", "belastung", "burnout", "anpassungsstoerung"]
    }
  },
  {
    term: "Akute Belastungsreaktion",
    slug: "akute-belastungsreaktion",
    definition: "Vorübergehende Reaktion auf eine außergewöhnliche körperliche oder seelische Belastung.",
    tags: ["Diagnose-Stress"],
    content: {
      teaser: "Die akute Belastungsreaktion ist eine vorübergehende Störung als Reaktion auf außergewöhnliche physische oder psychische Belastung, die in der Regel innerhalb von Stunden oder Tagen abklingt.",
      sections: [
        {
          title: "Definition und Symptome",
          content: "Eine akute Belastungsreaktion tritt als direkte Folge einer außergewöhnlichen Belastung auf und äußert sich durch ein gemischtes Bild an Symptomen. Dazu können Betäubungsgefühle, Bewusstseinseinengung, eingeschränkte Aufmerksamkeit, Desorientierung, Angst, Depression, Wut, Verzweiflung, Überaktivität oder Rückzug gehören. Auch körperliche Symptome wie Herzrasen, Schwitzen und Zittern können auftreten."
        },
        {
          title: "Unterschied zur Posttraumatischen Belastungsstörung",
          content: "Im Gegensatz zur Posttraumatischen Belastungsstörung (PTBS) ist die akute Belastungsreaktion vorübergehend und klingt in der Regel innerhalb von 24 bis 72 Stunden ab. Sie kann jedoch auch der Vorläufer einer PTBS sein, wenn die Symptome länger anhalten oder sich verschlimmern."
        },
        {
          title: "Umgang und Unterstützung",
          content: "Bei einer akuten Belastungsreaktion ist es wichtig, Sicherheit zu vermitteln, praktische und emotionale Unterstützung anzubieten und für Ruhe und Erholung zu sorgen. Professionelle Hilfe kann sinnvoll sein, wenn die Symptome besonders stark sind oder nicht abklingen. Techniken wie Grounding und Atemübungen können helfen, Übererregung zu reduzieren."
        }
      ],
      literaryDevices: [
        {
          title: "Der Schutzmechanismus",
          content: "Die akute Belastungsreaktion kann mit dem Sicherungssystem eines Hauses verglichen werden. Bei einer plötzlichen Überspannung (extremer Stress) springen die Sicherungen heraus (Symptome), um größere Schäden zu verhindern. Dies ist ein automatischer Schutzmechanismus. Nach einiger Zeit können die Sicherungen wieder eingeschaltet werden, und das System funktioniert wieder normal."
        }
      ],
      references: [
        "World Health Organization. (2019). International statistical classification of diseases and related health problems (11th ed.).",
        "Bryant, R. A. (2018). The current evidence for acute stress disorder. Current Psychiatry Reports, 20(12), 111."
      ],
      relatedTerms: ["stress", "trauma", "posttraumatische-belastungsstoerung"]
    }
  },
  {
    term: "Alltagssprache (Eltern)",
    slug: "alltagssprache-eltern",
    definition: "Begriffe und Formulierungen, die Eltern selbst verwenden, um ihre Erfahrungen zu beschreiben (z.B. \"am Ende sein\", \"ausgelaugt\").",
    tags: ["Alltag", "Elternsprache", "Glossar"],
    content: {
      teaser: "Alltagssprache von Eltern umfasst spezifische Begriffe und Ausdrücke, mit denen Eltern ihre Erfahrungen, Herausforderungen und Emotionen beschreiben und die oft wertvolle Hinweise auf ihr Wohlbefinden geben können.",
      sections: [
        {
          title: "Bedeutung der Alltagssprache",
          content: "Die von Eltern verwendete Alltagssprache bietet einen Einblick in ihre subjektive Erfahrungswelt und kann wichtige Hinweise auf Belastungen, Überforderung oder Erschöpfung geben. Ausdrücke wie 'am Ende sein', 'ausgelaugt' oder 'ich kann nicht mehr' zeigen oft emotionale Zustände an, die auf ein erhöhtes Burnout-Risiko hindeuten können."
        },
        {
          title: "Alltagssprache als Brücke zur Fachsprache",
          content: "Für Fachpersonen ist es wichtig, die Alltagssprache der Eltern zu verstehen und als Brücke zur fachlichen Kommunikation zu nutzen. Wenn Eltern beispielsweise sagen, ihr Kind sei 'schwierig' oder 'anstrengend', können dahinter verschiedene Phänomene stehen, die fachlich differenzierter betrachtet werden müssen."
        },
        {
          title: "Kulturelle und soziale Dimension",
          content: "Die Alltagssprache von Eltern ist kulturell und sozial geprägt und kann je nach Bildungshintergrund, kulturellem Kontext und sozialer Schicht variieren. Dies ist bei der Beratung und Unterstützung von Eltern zu berücksichtigen, um Missverständnisse zu vermeiden und eine gemeinsame Kommunikationsbasis zu schaffen."
        }
      ],
      literaryDevices: [
        {
          title: "Die Übersetzungsarbeit",
          content: "Die Verständigung zwischen Eltern und Fachpersonen ähnelt manchmal einer Übersetzungsarbeit zwischen zwei Sprachen. Ein Elternteil sagt vielleicht: 'Mein Kind treibt mich in den Wahnsinn', während eine Fachperson diesen Ausruf in Konzepte wie 'elterliche Belastung', 'Erziehungsstress' oder 'dysfunktionale Interaktionsmuster' übersetzen muss. Die Kunst liegt darin, die Alltagssprache wert zu schätzen und gleichzeitig die fachliche Präzision zu wahren."
        }
      ],
      references: [
        "Schneewind, K. A. (2010). Familienpsychologie (3. Aufl.). Stuttgart: Kohlhammer.",
        "Tröster, H. (2010). Eltern-Belastungs-Inventar (EBI). Deutsche Version des Parenting Stress Index (PSI) von R.R. Abidin. Göttingen: Hogrefe."
      ],
      relatedTerms: ["am-ende-sein", "ausgelaugt", "eltern-burnout"]
    }
  },
  {
    term: "Am Ende sein",
    slug: "am-ende-sein",
    definition: "Gefühl völliger körperlicher und emotionaler Erschöpfung und Überforderung.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout"],
    content: {
      teaser: "Der Ausdruck 'am Ende sein' beschreibt einen Zustand tiefgreifender Erschöpfung und Überforderung, der oft ein Warnsignal für ein fortgeschrittenes Burnout-Stadium darstellt.",
      sections: [
        {
          title: "Bedeutung und Erleben",
          content: "Wenn Eltern sagen, sie seien 'am Ende', beschreiben sie damit einen Zustand, in dem ihre körperlichen, emotionalen und kognitiven Ressourcen erschöpft sind. Sie fühlen sich ausgebrannt, überfordert und unfähig, den Anforderungen des Alltags gerecht zu werden. Dieses Gefühl geht oft mit Hoffnungslosigkeit, Hilflosigkeit und dem Eindruck einher, in einer ausweglosen Situation gefangen zu sein."
        },
        {
          title: "Als Warnsignal für Burnout",
          content: "Die Aussage 'Ich bin am Ende' sollte als ernstes Warnsignal verstanden werden, das auf ein fortgeschrittenes Stadium von Erschöpfung hindeutet. Es signalisiert, dass die betroffene Person dringend Unterstützung, Entlastung und möglicherweise professionelle Hilfe benötigt, um nicht vollständig in einen Burnout zu geraten oder sich davon zu erholen."
        },
        {
          title: "Umgang und Hilfestellungen",
          content: "Wenn jemand sich 'am Ende' fühlt, sind kurzfristige Entlastung und Unterstützung besonders wichtig. Dies kann durch praktische Hilfe im Alltag, emotionale Unterstützung durch Zuhören und Verständnis oder professionelle Beratung und Therapie erfolgen. Es ist wichtig, die Situation ernst zu nehmen und nicht mit oberflächlichen Ratschlägen oder Bagatellisierung zu reagieren."
        }
      ],
      literaryDevices: [
        {
          title: "Die leere Batterie",
          content: "Das Gefühl, 'am Ende zu sein', kann mit einer völlig entladenen Batterie verglichen werden, die keine Energie mehr liefern kann. So wie eine entladene Batterie nicht einfach durch kurzes Aufladen wieder voll funktionsfähig wird, benötigt auch ein Mensch in diesem Zustand Zeit, Ruhe und eine grundlegende Regeneration, um seine Energiereserven wiederherzustellen."
        }
      ],
      references: [
        "Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: Recent research and its implications for psychiatry. World Psychiatry, 15(2), 103-111.",
        "Roskam, I., Brianda, M. E., & Mikolajczak, M. (2018). A step forward in the conceptualization and measurement of parental burnout: The Parental Burnout Assessment (PBA). Frontiers in Psychology, 9, 758."
      ],
      relatedTerms: ["burnout", "erschoepfung", "ausgelaugt", "ueberforderung"]
    }
  },
  {
    term: "Anorexia",
    slug: "anorexia",
    definition: "Appetitlosigkeit als Symptom, nicht die spezifische Diagnose Anorexia Nervosa. (ICD-10: R63.0)",
    tags: ["Symptom-Essstörung", "Diagnose"],
    content: {
      teaser: "Anorexia bezeichnet medizinisch betrachtet den Appetitsverlust als Symptom verschiedener Erkrankungen und ist von der psychischen Störung Anorexia nervosa (Magersucht) zu unterscheiden.",
      sections: [
        {
          title: "Definition und Abgrenzung",
          content: "Der Begriff 'Anorexia' bezeichnet im medizinischen Sinne zunächst einfach den Verlust des Appetits oder die verringerte Nahrungsaufnahme. Dies ist von der Essstörung 'Anorexia nervosa' (Magersucht) zu unterscheiden, bei der die Nahrungsverweigerung nicht durch Appetitlosigkeit, sondern durch eine Gewichtsphobie und gestörte Körperwahrnehmung bedingt ist."
        },
        {
          title: "Mögliche Ursachen",
          content: "Anorexia als Symptom kann verschiedene Ursachen haben, darunter körperliche Erkrankungen (wie Infektionen, Magen-Darm-Erkrankungen, Krebs), psychische Faktoren (wie Depression, Angststörungen, Stress), Nebenwirkungen von Medikamenten oder altersbedingten Veränderungen. Es handelt sich also um ein unspezifisches Symptom, das weiterer Abklärung bedarf."
        },
        {
          title: "Klinische Bedeutung",
          content: "Anhaltender Appetitsverlust kann zu ungewolltem Gewichtsverlust, Mangelernährung und weiteren gesundheitlichen Problemen führen. Besonders bei älteren Menschen, Kindern oder Personen mit chronischen Erkrankungen kann dies schwerwiegende Folgen haben. Bei anhaltender oder ungeklärter Anorexia ist daher eine ärztliche Abklärung wichtig."
        }
      ],
      literaryDevices: [
        {
          title: "Das verlorene Hungersignal",
          content: "Anorexia kann mit einem defekten Alarmsystem verglichen werden. Normalerweise sendet unser Körper Hungersignale wie ein Alarmsystem, das uns mitteilt, wann wir Energie benötigen. Bei Anorexia funktioniert dieses System nicht richtig – der Alarm bleibt stumm oder wird vom Körper ignoriert, obwohl Nahrung benötigt wird. Während bei Anorexia nervosa der Alarm zwar funktioniert, aber bewusst überhört wird."
        }
      ],
      references: [
        "World Health Organization. (2019). International statistical classification of diseases and related health problems (11th ed.).",
        "Thomas, D. R., & Ashmen, W. (2019). Anorexia and cachexia. In W. R. Hazzard (Ed.), Principles of Geriatric Medicine and Gerontology (7th ed.). McGraw-Hill Education."
      ],
      relatedTerms: ["anorexia-nervosa", "appetitlosigkeit", "gewichtsverlust"]
    }
  },
  {
    term: "Anorexia Nervosa",
    slug: "anorexia-nervosa",
    definition: "Essstörung gekennzeichnet durch starkes Untergewicht, intensive Angst vor Gewichtszunahme und eine gestörte Körperwahrnehmung. (ICD-10: F50.0)",
    tags: ["Diagnose-Essstörung"],
    alias: "Magersucht",
    content: {
      teaser: "Anorexia nervosa ist eine schwerwiegende Essstörung, die durch selbst herbeigeführten Gewichtsverlust, gestörte Körperwahrnehmung und intensive Angst vor Gewichtszunahme gekennzeichnet ist.",
      sections: [
        {
          title: "Definition und Diagnosekriterien",
          content: "Anorexia nervosa ist durch drei Hauptkriterien gekennzeichnet: 1) Die Aufrechterhaltung eines signifikant niedrigen Körpergewichts (BMI unter 18,5 kg/m² bei Erwachsenen), 2) intensive Angst vor Gewichtszunahme trotz Untergewicht, und 3) eine gestörte Wahrnehmung des eigenen Körpers oder übermäßiger Einfluss des Körpergewichts auf die Selbstbewertung."
        },
        {
          title: "Subtypen und Verlauf",
          content: "Es werden zwei Haupttypen unterschieden: Der restriktive Typ, bei dem das Gewicht primär durch Nahrungsrestriktion und oft übermäßige körperliche Aktivität reduziert wird, und der Purging-Typ mit Essanfällen und kompensatorischem Verhalten wie Erbrechen oder Missbrauch von Abführmitteln. Die Erkrankung beginnt typischerweise in der Adoleszenz, kann aber in jedem Alter auftreten. Der Verlauf ist variabel, von vollständiger Genesung bis zu einem chronischen, lebensbedrohlichen Zustand."
        },
        {
          title: "Behandlungsansätze",
          content: "Die Behandlung erfordert einen multidisziplinären Ansatz, der medizinische Überwachung, Ernährungsberatung und Psychotherapie umfasst. Je nach Schweregrad kann eine ambulante, teilstationäre oder vollstationäre Behandlung notwendig sein. Ziele sind die Normalisierung des Essverhaltens und Gewichts, die Behandlung der psychischen Aspekte und die Prävention von Rückfällen."
        }
      ],
      literaryDevices: [
        {
          title: "Das verzerrte Spiegelbild",
          content: "Anorexia nervosa kann mit einem verzerrten Spiegel verglichen werden, der ein völlig anderes Bild zeigt als die Realität. Eine Person mit dieser Erkrankung blickt in den Spiegel und sieht sich als 'zu dick', selbst wenn der Körper bereits gefährlich abgemagert ist. Diese Verzerrung ist nicht willentlich, sondern Teil der Erkrankung – ähnlich wie ein Spukhaus-Spiegel, der die Realität verfälscht darstellt."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Zipfel, S., Giel, K. E., Bulik, C. M., Hay, P., & Schmidt, U. (2015). Anorexia nervosa: aetiology, assessment, and treatment. The Lancet Psychiatry, 2(12), 1099-1111."
      ],
      relatedTerms: ["magersucht", "koerperschemastoerung", "essstoerung"]
    }
  },
  {
    term: "Anorexia Nervosa, Binge-Eating/Purging Type",
    slug: "anorexia-nervosa-binge-eating-purging-type",
    definition: "Subtyp der Anorexia Nervosa, bei dem neben restriktivem Essverhalten auch Essanfälle und/oder selbstinduziertes Erbrechen oder andere kompensatorische Verhaltensweisen auftreten. (ICD-10: F50.02)",
    tags: ["Diagnose-Essstörung"],
    content: {
      teaser: "Dieser Subtyp der Anorexia nervosa ist durch eine Kombination aus starkem Untergewicht, Essanfällen und kompensatorischen Maßnahmen wie selbstinduziertem Erbrechen gekennzeichnet.",
      sections: [
        {
          title: "Charakteristika und Diagnose",
          content: "Bei diesem Subtyp der Anorexia nervosa treten neben dem für die Grunderkrankung typischen Untergewicht und der Angst vor Gewichtszunahme auch wiederkehrende Essanfälle und/oder kompensatorische Verhaltensweisen wie selbstinduziertes Erbrechen, Missbrauch von Abführmitteln oder exzessiver Sport auf. Im Gegensatz zum restriktiven Typ ist die Nahrungsaufnahme nicht nur eingeschränkt, sondern weist auch Phasen von unkontrolliertem Essen auf."
        },
        {
          title: "Unterschiede zu Bulimia Nervosa",
          content: "Der Binge-Eating/Purging-Typ der Anorexia nervosa kann leicht mit Bulimia nervosa verwechselt werden, da beide Störungen Essanfälle und kompensatorisches Verhalten beinhalten. Der entscheidende Unterschied liegt jedoch im Körpergewicht: Bei Anorexia nervosa liegt ein signifikantes Untergewicht vor (BMI < 18,5), während das Gewicht bei Bulimia nervosa normal oder erhöht sein kann."
        },
        {
          title: "Behandlungsherausforderungen",
          content: "Dieser Subtyp stellt besondere Herausforderungen in der Behandlung dar, da sowohl die Unterernährung als auch das dysfunktionale Essverhalten mit Essanfällen und Kompensationsverhalten adressiert werden müssen. Die Therapie umfasst daher neben der Gewichtsnormalisierung auch spezifische Interventionen zur Regulation des Essverhaltens, zum Umgang mit Essanfällen und zur Reduktion von Purging-Verhalten."
        }
      ],
      literaryDevices: [
        {
          title: "Der Pendel-Effekt",
          content: "Das Essverhalten beim Binge-Eating/Purging-Typ der Anorexia nervosa kann mit einem Pendel verglichen werden, das zwischen extremen Positionen schwingt. Auf der einen Seite steht die strikte Kontrolle und Einschränkung, auf der anderen Seite der Kontrollverlust während der Essanfälle. Das Purging-Verhalten stellt dann den verzweifelten Versuch dar, das Pendel wieder in Richtung Kontrolle zu zwingen, was jedoch langfristig nur zu stärkeren Ausschlägen führt."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Eddy, K. T., Tabri, N., Thomas, J. J., Murray, H. B., Keshaviah, A., Hastings, E., ... & Franko, D. L. (2017). Recovery from anorexia nervosa and bulimia nervosa at 22-year follow-up. The Journal of clinical psychiatry, 78(2), 184-189."
      ],
      relatedTerms: ["anorexia-nervosa", "bulimia-nervosa", "essanfall", "purging"]
    }
  },
  {
    term: "Anorexia Nervosa, Restricting Type",
    slug: "anorexia-nervosa-restricting-type",
    definition: "Subtyp der Anorexia Nervosa, bei dem das Untergewicht primär durch Hungern, Diäten oder exzessiven Sport erreicht wird, ohne regelmäßige Essanfälle oder Purging-Verhalten. (ICD-10: F50.01)",
    tags: ["Diagnose-Essstörung"],
    content: {
      teaser: "Der restriktive Typ der Anorexia nervosa ist durch starkes Untergewicht gekennzeichnet, das primär durch Nahrungsrestriktion und oft exzessiven Sport erreicht wird, ohne Essanfälle oder Purging-Verhalten.",
      sections: [
        {
          title: "Charakteristika und Diagnose",
          content: "Beim restriktiven Typ der Anorexia nervosa wird das Untergewicht hauptsächlich durch starke Einschränkung der Nahrungsaufnahme und oft durch übermäßige körperliche Aktivität erreicht. Im Gegensatz zum Binge-Eating/Purging-Typ treten keine regelmäßigen Essanfälle auf, und die Betroffenen greifen nicht regelmäßig zu Purging-Verhalten wie selbstinduziertem Erbrechen oder Missbrauch von Abführmitteln."
        },
        {
          title: "Psychologische Merkmale",
          content: "Personen mit diesem Subtyp zeigen oft eine ausgeprägte Rigidität und Perfektionismus, nicht nur in Bezug auf Essen und Gewicht, sondern auch in anderen Lebensbereichen. Die Nahrungsaufnahme wird streng kontrolliert, oft mit komplexen Regeln und Ritualen verbunden. Häufig besteht ein Stolz auf die 'Selbstkontrolle' und die Fähigkeit, Hungergefühle zu ignorieren oder zu unterdrücken."
        },
        {
          title: "Medizinische Komplikationen und Behandlung",
          content: "Dieser Subtyp kann schnell zu schweren medizinischen Komplikationen führen, da die kontinuierliche Unterernährung ohne die gelegentliche Nahrungsaufnahme während Essanfällen zu einem besonders niedrigen Körpergewicht führen kann. Die Behandlung konzentriert sich auf die schrittweise Normalisierung des Essverhaltens und des Gewichts sowie auf die Veränderung der rigiden Denkmuster und der Angst vor Gewichtszunahme."
        }
      ],
      literaryDevices: [
        {
          title: "Das eingefrorene Thermostat",
          content: "Der restriktive Typ der Anorexia nervosa kann mit einem defekten Thermostat verglichen werden, der kontinuierlich auf 'zu kalt' eingestellt ist. Während ein funktionierender Thermostat bei Kälte die Heizung aktivieren würde (analog zum Hungergefühl, das zur Nahrungsaufnahme führt), reagiert dieser defekte Thermostat nicht mehr auf die tatsächliche Temperatur des Körpers. Stattdessen hält er starr an einer Einstellung fest, die für den Organismus gefährlich ist."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Kaye, W. H., Wierenga, C. E., Bailer, U. F., Simmons, A. N., & Bischoff-Grethe, A. (2013). Nothing tastes as good as skinny feels: the neurobiology of anorexia nervosa. Trends in neurosciences, 36(2), 110-120."
      ],
      relatedTerms: ["anorexia-nervosa", "restriktion", "hungern", "koerperschemastoerung"]
    }
  },
  {
    term: "Anorexia Nervosa, Unspecified",
    slug: "anorexia-nervosa-unspecified",
    definition: "Diagnose, wenn die Kriterien für Anorexia Nervosa erfüllt sind, aber der Subtyp nicht spezifiziert ist. (ICD-10: F50.00)",
    tags: ["Diagnose-Essstörung"],
    content: {
      teaser: "Anorexia Nervosa, nicht näher bezeichnet, wird diagnostiziert, wenn die Hauptkriterien der Anorexia nervosa erfüllt sind, aber keine eindeutige Zuordnung zu einem spezifischen Subtyp möglich ist.",
      sections: [
        {
          title: "Diagnostische Einordnung",
          content: "Diese Diagnose wird gestellt, wenn eine Person die Kernmerkmale der Anorexia nervosa aufweist (signifikantes Untergewicht, Angst vor Gewichtszunahme, gestörte Körperwahrnehmung), aber nicht eindeutig dem restriktiven oder dem Binge-Eating/Purging-Typ zugeordnet werden kann. Dies kann der Fall sein, wenn das Essverhalten nicht klar zu kategorisieren ist oder sich im Wechsel Merkmale beider Subtypen zeigen."
        },
        {
          title: "Klinische Bedeutung",
          content: "Auch wenn der Subtyp nicht spezifiziert ist, handelt es sich um eine vollwertige Diagnose, die die gleiche klinische Aufmerksamkeit und Behandlungsbedürftigkeit signalisiert wie die spezifischen Subtypen. Die medizinischen Komplikationen und psychologischen Auswirkungen können ebenso gravierend sein."
        },
        {
          title: "Behandlungsansatz",
          content: "Die Behandlung orientiert sich an den Standards für Anorexia nervosa und berücksichtigt die individuellen Symptome und Verhaltensweisen. Eine gründliche fortlaufende Diagnostik kann hilfreich sein, um das spezifische Muster des Essverhaltens besser zu verstehen und die Therapie entsprechend anzupassen."
        }
      ],
      literaryDevices: [
        {
          title: "Das unklare Muster",
          content: "Anorexia nervosa ohne spezifizierten Subtyp kann mit einem Musikstück verglichen werden, das zwischen verschiedenen Tonarten wechselt. Obwohl das Grundthema (die Kernsymptomatik der Anorexie) klar erkennbar ist, folgt die Melodie (das spezifische Essverhalten) keinem eindeutigen Muster, sondern verändert sich und kombiniert verschiedene Elemente auf eine Weise, die sich einer klaren Kategorisierung entzieht."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Treasure, J., Duarte, T. A., & Schmidt, U. (2020). Eating disorders. The Lancet, 395(10227), 899-911."
      ],
      relatedTerms: ["anorexia-nervosa", "essstoerung", "diagnostik"]
    }
  },
  {
    term: "Anpassungsstörung",
    slug: "anpassungsstoerung",
    definition: "Eine psychische Reaktion auf eine identifizierbare Belastung, die innerhalb von drei Monaten nach dem Ereignis beginnt.",
    tags: ["Diagnose-Stress", "Diagnose-Burnout"],
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
    term: "Anstrengung",
    slug: "anstrengung",
    definition: "Hoher subjektiv empfundener Energieaufwand, um den Alltag oder spezifische Aufgaben zu bewältigen.",
    tags: ["Alltag", "Symptom-Burnout", "Symptom-ADHS", "Symptom-Essstörung"],
    content: {
      teaser: "Anstrengung beschreibt den subjektiv empfundenen hohen Energieaufwand bei der Bewältigung von Aufgaben oder Situationen, der im Kontext psychischer Belastung besondere Bedeutung erlangt.",
      sections: [
        {
          title: "Anstrengung im psychologischen Kontext",
          content: "Anstrengung bezeichnet den subjektiv wahrgenommenen Aufwand an Energie oder Ressourcen, der benötigt wird, um Aufgaben zu bewältigen oder Situationen zu meistern. Während ein gewisses Maß an Anstrengung normal und oft notwendig für Leistung ist, kann übermäßige oder anhaltende Anstrengung ein Zeichen für erhöhte Belastung oder bestehende psychische Probleme sein, insbesondere wenn alltägliche Aktivitäten unverhältnismäßig viel Kraft kosten."
        },
        {
          title: "Anstrengung bei verschiedenen Störungsbildern",
          content: "Bei Burnout wird der alltägliche Energieaufwand als unverhältnismäßig hoch empfunden, selbst bei früher leicht bewältigbaren Aufgaben. Bei ADHS erfordert die Aufrechterhaltung von Aufmerksamkeit und Organisation oft eine überdurchschnittliche Anstrengung, was zu schnellerer Erschöpfung führen kann. Bei Essstörungen kann der ständige Kampf mit Nahrung und Körperbild erhebliche mentale Anstrengung bedeuten und andere Lebensbereiche beeinträchtigen."
        },
        {
          title: "Maß der Anstrengung als diagnostischer Hinweis",
          content: "Das subjektive Empfinden unverhältnismäßiger Anstrengung kann ein wichtiger diagnostischer Hinweis sein. Wenn alltägliche Aktivitäten wie Aufstehen, soziale Interaktionen oder Routineaufgaben als außerordentlich anstrengend erlebt werden, kann dies auf eine beginnende oder bestehende psychische Störung hindeuten. Die Veränderung im Anstrengungserleben über Zeit kann ein wertvoller Indikator für Verschlechterung oder Verbesserung sein."
        }
      ],
      literaryDevices: [
        {
          title: "Die schwere Rüstung",
          content: "Übermäßige Anstrengung im Alltag kann mit dem Tragen einer schweren Rüstung verglichen werden. Während andere Menschen sich leicht und frei bewegen können, muss die betroffene Person jede Bewegung gegen das Gewicht dieser Rüstung durchführen. Selbst einfache Handgriffe erfordern zusätzliche Kraft, und am Ende des Tages ist die Erschöpfung ungleich größer als bei anderen. Die Rüstung ist für Außenstehende oft unsichtbar, was es schwer macht, die tatsächliche Belastung nachzuvollziehen."
        }
      ],
      references: [
        "Hockey, R. (2013). The psychology of fatigue: Work, effort and control. Cambridge University Press.",
        "Baumeister, R. F., & Tierney, J. (2012). Willpower: Rediscovering the greatest human strength. Penguin Books."
      ],
      relatedTerms: ["erschoepfung", "burnout", "belastung", "energiedefizit"]
    }
  },
  {
    term: "Atypical Anorexia Nervosa",
    slug: "atypical-anorexia-nervosa",
    definition: "Essstörung mit Merkmalen der Anorexia Nervosa, bei der jedoch trotz signifikantem Gewichtsverlust das Gewicht im Normalbereich oder darüber liegt. (ICD-10: F50.1)",
    tags: ["Diagnose-Essstörung"],
    content: {
      teaser: "Atypische Anorexia nervosa ist eine Essstörung mit den psychologischen Merkmalen der klassischen Anorexie, jedoch ohne das charakteristische Untergewicht.",
      sections: [
        {
          title: "Definition und Diagnose",
          content: "Die atypische Anorexia nervosa ist durch einen signifikanten Gewichtsverlust und anorektisches Verhalten und Denken gekennzeichnet, allerdings liegt das Körpergewicht trotz erheblicher Gewichtsabnahme noch im Normal- oder sogar im Übergewichtsbereich. Betroffene zeigen dieselbe intensive Angst vor Gewichtszunahme, Körperbildstörung und restriktives Essverhalten wie bei der klassischen Anorexie."
        },
        {
          title: "Klinische Bedeutung und Unterschätzung",
          content: "Diese Störung wird oft unterschätzt oder übersehen, da Betroffene nicht das typische stark untergewichtige Erscheinungsbild aufweisen. Dennoch können die gleichen schwerwiegenden medizinischen Komplikationen auftreten, besonders wenn der Gewichtsverlust schnell erfolgt ist. Die psychologische Belastung ist ebenso gravierend wie bei der klassischen Anorexie, wobei oft zusätzlich Scham empfunden wird, 'nicht dünn genug zu sein'."
        },
        {
          title: "Behandlungsansätze",
          content: "Die Behandlung folgt ähnlichen Prinzipien wie bei der klassischen Anorexie und umfasst psychotherapeutische Ansätze (wie kognitive Verhaltenstherapie), Ernährungsberatung und gegebenenfalls medizinische Überwachung. Ein besonderer Fokus liegt auf der Normalisierung des Essverhaltens und der Arbeitsannahme an dysfunktionalen Einstellungen bezüglich Körperbild, Gewicht und Selbstwert."
        }
      ],
      literaryDevices: [
        {
          title: "Das unsichtbare Leiden",
          content: "Die atypische Anorexia nervosa kann mit einem inneren Feuer verglichen werden, das unter einer scheinbar intakten Oberfläche brennt. Von außen erscheint alles normal oder sogar gesund, während im Inneren der gleiche verzehrende Kampf stattfindet wie bei der klassischen Anorexie. Wie bei einem Haus, das von innen brennt, ohne dass außen Flammen zu sehen sind, ist die Gefahr nicht weniger real, aber leichter zu übersehen."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Sawyer, S. M., Whitelaw, M., Le Grange, D., Yeo, M., & Hughes, E. K. (2016). Physical and psychological morbidity in adolescents with atypical anorexia nervosa. Pediatrics, 137(4), e20154080."
      ],
      relatedTerms: ["anorexia-nervosa", "gewichtsverlust", "koerperschemastoerung", "essstoerung"]
    }
  },
  {
    term: "Atypical Bulimia Nervosa",
    slug: "atypical-bulimia-nervosa",
    definition: "Essstörung mit Merkmalen der Bulimia Nervosa, bei der jedoch nicht alle diagnostischen Kriterien (z.B. Häufigkeit der Essanfälle/Purging) erfüllt sind. (ICD-10: F50.3)",
    tags: ["Diagnose-Essstörung"],
    content: {
      teaser: "Atypische Bulimia nervosa ist eine Essstörung, die wesentliche Merkmale der Bulimie aufweist, jedoch nicht alle diagnostischen Kriterien vollständig erfüllt.",
      sections: [
        {
          title: "Definition und Abgrenzung",
          content: "Die atypische Bulimia nervosa bezeichnet ein Essstörungsbild, bei dem wichtige Elemente der klassischen Bulimie vorhanden sind, aber nicht alle diagnostischen Kriterien erfüllt werden. Dies kann die Häufigkeit oder Dauer der Essanfälle betreffen, das kompensatorische Verhalten (wie Erbrechen oder Abführmittelmissbrauch) oder die übermäßige Bedeutung von Figur und Gewicht für das Selbstwertgefühl."
        },
        {
          title: "Klinische Bedeutung",
          content: "Obwohl die atypische Form nicht alle Kriterien der vollen Diagnose erfüllt, kann sie dennoch erhebliches Leiden und Beeinträchtigungen verursachen. Betroffene leiden unter ähnlichen psychischen und physischen Folgen wie bei der typischen Bulimie und haben ein erhöhtes Risiko, im Verlauf eine vollständige Essstörung zu entwickeln. Die rechtzeitige Erkennung und Behandlung ist daher ebenso wichtig."
        },
        {
          title: "Behandlungsansätze",
          content: "Die Behandlung orientiert sich an den Methoden für die klassische Bulimia nervosa, mit Anpassungen je nach individueller Symptomatik. Kognitive Verhaltenstherapie gilt als Methode der Wahl, ergänzt durch Ernährungsberatung und bei Bedarf medikamentöse Unterstützung. Ein wichtiges Ziel ist die Normalisierung des Essverhaltens und die Reduktion des kompensatorischen Verhaltens."
        }
      ],
      literaryDevices: [
        {
          title: "Der unvollständige Kreis",
          content: "Die atypische Bulimia nervosa kann mit einem fast geschlossenen Kreis verglichen werden. Obwohl er nicht vollständig geschlossen ist (nicht alle diagnostischen Kriterien sind erfüllt), ist die Form des Kreises dennoch klar erkennbar. Die Lücke im Kreis bedeutet jedoch nicht, dass das Leid der betroffenen Person geringer oder weniger behandlungsbedürftig ist – sie sitzt immer noch in der gleichen kreisförmigen Falle aus Essanfällen, Kompensation und Scham."
        }
      ],
      references: [
        "World Health Organization. (2019). International statistical classification of diseases and related health problems (11th ed.).",
        "Fairburn, C. G., & Harrison, P. J. (2003). Eating disorders. The Lancet, 361(9355), 407-416."
      ],
      relatedTerms: ["bulimia-nervosa", "essanfall", "purging", "essstoerung"]
    }
  },
  {
    term: "Auffällig",
    slug: "auffaellig",
    definition: "Verhalten eines Kindes, das von Gleichaltrigen abweicht und bei Eltern oder Erziehern Anlass zur Sorge gibt.",
    tags: ["Alltag", "Elternsprache", "Symptom-ADHS", "Symptom-Essstörung"],
    content: {
      teaser: "Der Begriff 'auffällig' beschreibt in der Elternsprache ein kindliches Verhalten, das von der erwarteten Norm abweicht und bei Betreuungspersonen Besorgnis auslöst.",
      sections: [
        {
          title: "Bedeutung und Verwendung",
          content: "Wenn Eltern oder Erziehungspersonen ein Kind als 'auffällig' beschreiben, meinen sie damit, dass sein Verhalten in bestimmten Bereichen von dem abweicht, was sie als altersgerecht oder normal betrachten. Der Begriff ist unspezifisch und kann sich auf verschiedene Verhaltensweisen beziehen, wie Unruhe, Konzentrationsschwierigkeiten, soziale Probleme, emotionale Ausbrüche oder ungewöhnliche Essgewohnheiten. Als Alltagsbegriff dient er oft als erster Ausdruck elterlicher Sorge, bevor eine fachliche Einschätzung erfolgt."
        },
        {
          title: "Auffälligkeit im Kontext von ADHS",
          content: "Im Zusammenhang mit ADHS können 'auffällige' Verhaltensweisen erhöhte motorische Aktivität, Impulsivität, Konzentrationsschwierigkeiten oder Probleme beim Befolgen von Regeln umfassen. Eltern bemerken oft, dass ihr Kind im Vergleich zu Gleichaltrigen mehr Bewegungsdrang hat, leichter ablenkbar ist oder Schwierigkeiten hat, altersangemessene Aufgaben zu bewältigen."
        },
        {
          title: "Auffälligkeit bei Essstörungen",
          content: "Im Kontext von Essstörungen können auffällige Verhaltensweisen veränderte Essgewohnheiten, übermäßige Beschäftigung mit Nahrung oder Gewicht, Vermeiden gemeinsamer Mahlzeiten oder ungewöhnliche Rituale rund ums Essen sein. Besonders bei jüngeren Kindern zeigen sich Essstörungen oft zunächst als 'auffälliges' Verhalten rund um Nahrungsaufnahme, bevor eine klinische Diagnose gestellt wird."
        }
      ],
      literaryDevices: [
        {
          title: "Der rote Punkt",
          content: "Ein 'auffälliges' Kind in einer Gruppe kann mit einem roten Punkt auf einem weißen Blatt verglichen werden. Der rote Punkt zieht sofort alle Blicke auf sich und scheint nicht ins Gesamtbild zu passen. Doch ob dieser Punkt tatsächlich ein Problem darstellt oder einfach nur eine andere Farbe ist, erfordert eine genauere Betrachtung. Manchmal ist der rote Punkt einfach Teil eines größeren, noch nicht erkannten Musters."
        }
      ],
      references: [
        "Döpfner, M., & Banaschewski, T. (2013). Aufmerksamkeitsdefizit-/Hyperaktivitätsstörungen (ADHS). In F. Petermann (Hrsg.), Lehrbuch der Klinischen Kinderpsychologie (7. Aufl., S. 271-290). Göttingen: Hogrefe.",
        "Herpertz-Dahlmann, B. (2015). Adolescent eating disorders: update on definitions, symptomatology, epidemiology, and comorbidity. Child and adolescent psychiatric clinics of North America, 24(1), 177-196."
      ],
      relatedTerms: ["adhs", "verhaltensauffaelligkeit", "verhaltensstoerung", "essstoerung"]
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
    term: "Ausgelaugt",
    slug: "ausgelaugt",
    definition: "Zustand tiefer emotionaler und körperlicher Erschöpfung, oft verbunden mit dem Gefühl, keine Energiereserven mehr zu haben.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout"],
    content: {
      teaser: "'Ausgelaugt sein' bezeichnet einen Zustand umfassender Erschöpfung mit dem Gefühl, dass die eigenen Energiereserven vollständig verbraucht sind.",
      sections: [
        {
          title: "Bedeutung und Erleben",
          content: "Das Gefühl, 'ausgelaugt' zu sein, beschreibt einen Zustand tiefer körperlicher und emotionaler Erschöpfung. Betroffene empfinden eine extreme Müdigkeit, die sich durch Schlaf allein nicht beheben lässt, verbunden mit dem Gefühl, dass ihnen die Kraft für alltägliche Aufgaben fehlt. Der Begriff veranschaulicht bildlich, dass alle Ressourcen und Energiereserven wie 'herausgesaugt' oder 'ausgewaschen' wurden."
        },
        {
          title: "Ausgelaugt sein im Elternalltag",
          content: "Besonders Eltern verwenden diesen Begriff häufig, um ihre Erschöpfung nach anhaltenden Belastungen zu beschreiben. Der chronische Schlafmangel, die ständige Sorge um das Wohlbefinden der Kinder, die permanente Verfügbarkeit und der Mangel an Erholungsphasen können dazu führen, dass Eltern sich 'ausgelaugt' fühlen. Dieses Gefühl geht oft mit Schuldgefühlen einher, nicht mehr genug Energie für die Bedürfnisse der Kinder zu haben."
        },
        {
          title: "Bezug zum Burnout",
          content: "Das Gefühl, 'ausgelaugt' zu sein, ist ein wichtiges Warnsignal für ein beginnedes oder fortgeschrittenes Burnout. Es entspricht der Erschöpfungskomponente des Burnout-Syndroms und zeigt an, dass die Belastungsgrenze erreicht oder bereits überschritten wurde. In diesem Stadium ist professionelle Unterstützung und eine umfassende Selbstfürsorgestrategie besonders wichtig, um eine weitere Verschlechterung zu verhindern."
        }
      ],
      literaryDevices: [
        {
          title: "Der ausgetrocknete Schwamm",
          content: "Ein ausgelaugter Mensch gleicht einem völlig ausgetrockneten Schwamm. Normalerweise kann ein Schwamm Wasser aufnehmen und wieder abgeben - er hat Ressourcen und kann funktionieren. Doch wenn er zu lange trocken bleibt, verhärtet er sich, verliert seine Elastizität und kann seine Funktion nicht mehr erfüllen. Erst wenn er gründlich und langanhaltend mit Wasser getränkt wird, nicht nur oberflächlich befeuchtet, kann er seine ursprüngliche Funktionalität zurückgewinnen."
        }
      ],
      references: [
        "Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: Recent research and its implications for psychiatry. World Psychiatry, 15(2), 103-111.",
        "Mikolajczak, M., & Roskam, I. (2018). A Theoretical and Clinical Framework for Parental Burnout: The Balance Between Risks and Resources (BR2). Frontiers in Psychology, 9, 886."
      ],
      relatedTerms: ["burnout", "erschoepfung", "am-ende-sein", "erholung"]
    }
  },
  {
    term: "Ausgebrannt",
    slug: "ausgebrannt",
    definition: "Umgangssprachlich für Burnout; Zustand völliger Erschöpfung durch chronische Überlastung.",
    tags: ["Alltag", "Elternsprache", "Symptom-Burnout"],
    content: {
      teaser: "'Ausgebrannt sein' beschreibt einen Zustand vollständiger emotionaler, körperlicher und mentaler Erschöpfung als Folge langanhaltender Überlastung.",
      sections: [
        {
          title: "Bedeutung und Symptomatik",
          content: "Der Begriff 'ausgebrannt' bezeichnet einen Zustand, in dem jemand durch chronische Überlastung und Stress völlig erschöpft ist. Er umfasst mehr als nur Müdigkeit – es handelt sich um eine umfassende Erschöpfung, die körperliche, emotionale und mentale Aspekte beinhaltet. Typische Anzeichen sind anhaltende Erschöpfung, Antriebslosigkeit, emotionale Distanzierung, verringerte Leistungsfähigkeit und oft zynische Einstellungen zur eigenen Tätigkeit oder Rolle."
        },
        {
          title: "Entstehung und Verlauf",
          content: "Das 'Ausbrennen' ist kein plötzliches Ereignis, sondern ein schleichender Prozess, der sich über Monate oder Jahre entwickeln kann. Es beginnt oft mit großem Engagement und hohem Energieeinsatz, gefolgt von zunehmender Erschöpfung, wenn die Belastungen die vorhandenen Ressourcen übersteigen. Ohne Intervention kann dies zu völliger Erschöpfung und Funktionsunfähigkeit führen – dem Gefühl, 'nichts mehr zu haben, was brennen könnte'."
        },
        {
          title: "Auswege und Behandlung",
          content: "Die Erholung vom 'Ausgebranntheit' erfordert mehr als nur eine kurze Pause. Sie umfasst meist eine grundlegende Neuausrichtung der Lebensweise mit Fokus auf Selbstfürsorge, Grenzsetzung und Stressreduktion. Professionelle Unterstützung durch Therapie, Coaching oder Beratung ist oft notwendig. Wichtig ist auch die Erkenntnis, dass nicht nur individuelle Faktoren, sondern auch strukturelle Bedingungen zum Burnout beitragen können, die möglicherweise geändert werden müssen."
        }
      ],
      literaryDevices: [
        {
          title: "Die erloschene Flamme",
          content: "Ein ausgebrannter Mensch gleicht einer Kerze, die einst hell brannte, aber nun nur noch ein verkohlter Docht ist. Die Flamme, die für Wärme, Licht und Energie stand, ist erloschen. Weder gibt es noch Wachs zum Schmelzen (Ressourcen), noch eine Flamme zum Brennen (Energie und Begeisterung). Um wieder zu leuchten, braucht es nicht nur einen neuen Funken, sondern eine komplett neue Kerze – also tiefgreifende Erholung und oft eine Neuorientierung im Leben."
        }
      ],
      references: [
        "Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience: Recent research and its implications for psychiatry. World Psychiatry, 15(2), 103-111.",
        "Freudenberger, H. J. (1974). Staff burn-out. Journal of Social Issues, 30(1), 159-165."
      ],
      relatedTerms: ["burnout", "erschoepfung", "ausgelaugt", "erholung"]
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
  {
    term: "Avoidant/Restrictive Food Intake Disorder (ARFID)",
    slug: "arfid",
    definition: "Essstörung gekennzeichnet durch eine vermeidende oder restriktive Nahrungsaufnahme, die zu Gewichtsverlust, Nährstoffmangel oder Abhängigkeit von Sondennahrung führt, ohne die Angst vor Gewichtszunahme oder Körperbildstörung der Anorexie. (ICD-10: F50.89)",
    tags: ["Diagnose-Essstörung"],
    alias: "Vermeidende/Restriktive Nahrungsaufnahmestörung",
    content: {
      teaser: "ARFID ist eine Essstörung, bei der die Nahrungsaufnahme stark eingeschränkt wird, jedoch nicht aufgrund von Gewichts- oder Figursorgen, sondern aus anderen Gründen wie sensorischer Empfindlichkeit oder Angst.",
      sections: [
        {
          title: "Definition und Abgrenzung",
          content: "Die vermeidende/restriktive Nahrungsaufnahmestörung (ARFID) ist eine Essstörung, bei der die Betroffenen die Nahrungsaufnahme erheblich einschränken, was zu Untergewicht, Nährstoffmangel oder der Abhängigkeit von Nahrungsergänzungsmitteln oder Sondenernährung führen kann. Im Gegensatz zu Anorexia nervosa sind die Einschränkungen nicht durch Gewichts- oder Figursorgen motiviert, sondern durch andere Faktoren wie mangelndes Interesse an Nahrung, sensorische Eigenschaften von Lebensmitteln oder Angst vor negativen Konsequenzen des Essens (z.B. Erstickung oder Erbrechen)."
        },
        {
          title: "Erscheinungsformen und Betroffene",
          content: "ARFID kann sich in unterschiedlichen Formen manifestieren: als extremes 'Picky Eating' (sehr wählerisches Essverhalten), als generelles Desinteresse an Nahrung oder als angstmotivierte Vermeidung bestimmter Nahrungsmittel. Die Störung tritt oft bereits im Kindesalter auf, kann aber auch bei Jugendlichen und Erwachsenen diagnostiziert werden. Sie betrifft alle Geschlechter und scheint bei Menschen mit Angststörungen, Autismus-Spektrum-Störungen oder sensorischen Verarbeitungsstörungen häufiger aufzutreten."
        },
        {
          title: "Behandlungsansätze",
          content: "Die Behandlung von ARFID erfordert einen multidisziplinären Ansatz, der je nach individueller Problematik angepasst wird. Sie kann kognitive Verhaltenstherapie, Expositionstherapie für angstmotivierte Vermeidung, sensorische Integration für sensorische Empfindlichkeiten und Ernährungsberatung umfassen. Bei Untergewicht steht zunächst die Gewichtsnormalisierung im Vordergrund, parallel zur Behandlung der zugrundeliegenden psychischen Faktoren."
        }
      ],
      literaryDevices: [
        {
          title: "Die verschlossene Tür",
          content: "ARFID kann mit einer verschlossenen Tür verglichen werden, hinter der sich eine Vielfalt an Nahrungsmitteln befindet. Während die Person mit Anorexie die Tür bewusst verschlossen hält aus Angst vor Gewichtszunahme, ist bei der Person mit ARFID der Schlüssel verloren gegangen oder die Tür scheint bedrohlich. Sie möchte vielleicht hinein, findet aber keinen Zugang oder fürchtet, was hinter der Tür auf sie warten könnte. Die Therapie hilft dabei, einen neuen Schlüssel zu finden oder die Angst vor dem Öffnen der Tür schrittweise zu überwinden."
        }
      ],
      references: [
        "American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.",
        "Bryant-Waugh, R., Markham, L., Kreipe, R. E., & Walsh, B. T. (2010). Feeding and eating disorders in childhood. International Journal of Eating Disorders, 43(2), 98-111."
      ],
      relatedTerms: ["essstoerung", "nahrungsvermeidung", "selektives-essen"]
    }
  }
];
