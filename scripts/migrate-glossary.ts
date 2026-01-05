/**
 * Glossar-Migrations-Script
 *
 * Migriert die statischen Glossar-Daten aus src/data/glossary/ in die Supabase-Datenbank.
 *
 * Ausführung:
 * 1. Stelle sicher, dass die Datenbank-Tabellen existieren (führe 000_complete_setup.sql aus)
 * 2. Setze die Umgebungsvariablen SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY
 * 3. Führe aus: npx tsx scripts/migrate-glossary.ts
 */

import { createClient } from '@supabase/supabase-js';

// Statische Glossar-Daten importieren
import { glossaryData } from '../src/data/glossary';
import { GlossaryItem } from '../src/data/glossary/types';

// Supabase Client mit Service Role Key (hat volle Schreibrechte)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Fehler: SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY müssen gesetzt sein!');
  console.log('\nBeispiel:');
  console.log('  SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=xxx npx tsx scripts/migrate-glossary.ts');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface MigrationStats {
  total: number;
  migrated: number;
  failed: number;
  errors: string[];
}

async function migrateGlossary(): Promise<void> {
  console.log('🚀 Starte Glossar-Migration...\n');

  const stats: MigrationStats = {
    total: glossaryData.length,
    migrated: 0,
    failed: 0,
    errors: [],
  };

  console.log(`📚 ${stats.total} Begriffe gefunden\n`);

  // Schritt 1: Alle Begriffe migrieren
  console.log('📝 Schritt 1: Begriffe migrieren...\n');

  const termIdMap = new Map<string, string>(); // slug -> id

  for (const item of glossaryData) {
    try {
      // Haupteintrag erstellen
      const { data: term, error: termError } = await supabase
        .from('glossary_terms')
        .insert({
          term: item.term,
          slug: item.slug,
          definition: item.definition,
          teaser: item.content?.teaser || null,
          alias: item.alias || null,
          tags: item.tags,
          is_published: true,
          meta_title: `${item.term} - Rückenwind Eltern Glossar`,
          meta_description: item.definition.substring(0, 160),
        })
        .select('id')
        .single();

      if (termError) {
        // Wenn der Begriff bereits existiert, überspringen
        if (termError.code === '23505') { // Unique constraint violation
          console.log(`  ⏭️  ${item.term} - bereits vorhanden, übersprungen`);

          // ID des existierenden Begriffs holen
          const { data: existing } = await supabase
            .from('glossary_terms')
            .select('id')
            .eq('slug', item.slug)
            .single();

          if (existing) {
            termIdMap.set(item.slug, existing.id);
          }
          continue;
        }
        throw termError;
      }

      termIdMap.set(item.slug, term.id);

      // Sektionen migrieren
      if (item.content?.sections && item.content.sections.length > 0) {
        for (let i = 0; i < item.content.sections.length; i++) {
          const section = item.content.sections[i];
          await supabase.from('glossary_sections').insert({
            term_id: term.id,
            title: section.title,
            content: section.content,
            section_type: 'content',
            sort_order: i,
          });
        }
      }

      // Literary Devices migrieren (als spezielle Sektionen)
      if (item.content?.literaryDevices && item.content.literaryDevices.length > 0) {
        for (let i = 0; i < item.content.literaryDevices.length; i++) {
          const device = item.content.literaryDevices[i];
          await supabase.from('glossary_sections').insert({
            term_id: term.id,
            title: device.title,
            content: device.content,
            section_type: 'literary_device',
            sort_order: 100 + i, // Nach den normalen Sektionen
          });
        }
      }

      // Referenzen migrieren
      if (item.content?.references && item.content.references.length > 0) {
        for (let i = 0; i < item.content.references.length; i++) {
          await supabase.from('glossary_references').insert({
            term_id: term.id,
            reference_text: item.content.references[i],
            sort_order: i,
          });
        }
      }

      stats.migrated++;
      console.log(`  ✅ ${item.term}`);

    } catch (error: any) {
      stats.failed++;
      stats.errors.push(`${item.term}: ${error.message}`);
      console.log(`  ❌ ${item.term}: ${error.message}`);
    }
  }

  // Schritt 2: Verwandte Begriffe verknüpfen
  console.log('\n🔗 Schritt 2: Verwandte Begriffe verknüpfen...\n');

  let linkedCount = 0;
  for (const item of glossaryData) {
    if (item.content?.relatedTerms && item.content.relatedTerms.length > 0) {
      const sourceId = termIdMap.get(item.slug);
      if (!sourceId) continue;

      for (const relatedSlug of item.content.relatedTerms) {
        const relatedId = termIdMap.get(relatedSlug);
        if (!relatedId) {
          console.log(`  ⚠️  ${item.term} -> ${relatedSlug} (nicht gefunden)`);
          continue;
        }

        try {
          await supabase.from('glossary_related_terms').insert({
            term_id: sourceId,
            related_term_id: relatedId,
          });
          linkedCount++;
        } catch (error: any) {
          // Ignoriere duplicate key errors
          if (error.code !== '23505') {
            console.log(`  ⚠️  ${item.term} -> ${relatedSlug}: ${error.message}`);
          }
        }
      }
    }
  }
  console.log(`  ✅ ${linkedCount} Verknüpfungen erstellt`);

  // Zusammenfassung
  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration abgeschlossen!\n');
  console.log(`  Gesamt:     ${stats.total} Begriffe`);
  console.log(`  Migriert:   ${stats.migrated} ✅`);
  console.log(`  Fehlerhaft: ${stats.failed} ❌`);

  if (stats.errors.length > 0) {
    console.log('\n⚠️  Fehler:');
    stats.errors.forEach(e => console.log(`    - ${e}`));
  }

  console.log('\n' + '='.repeat(50));
}

// Ausführen
migrateGlossary()
  .then(() => {
    console.log('\n✨ Migration erfolgreich beendet!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migration fehlgeschlagen:', error);
    process.exit(1);
  });
