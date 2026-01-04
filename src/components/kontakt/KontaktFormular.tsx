
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name muss mindestens 2 Zeichen lang sein' })
    .max(100, { message: 'Name darf maximal 100 Zeichen lang sein' }),
  email: z.string()
    .email({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' })
    .max(255, { message: 'E-Mail darf maximal 255 Zeichen lang sein' }),
  subject: z.string()
    .min(1, { message: 'Bitte wählen Sie einen Betreff aus' }),
  message: z.string()
    .min(10, { message: 'Nachricht muss mindestens 10 Zeichen lang sein' })
    .max(2000, { message: 'Nachricht darf maximal 2000 Zeichen lang sein' })
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const KontaktFormular = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (formData: ContactFormData) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw new Error(error.message || 'Ein Fehler ist aufgetreten');
      }

      toast({
        title: "Nachricht erfolgreich gesendet!",
        description: "Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns so schnell wie möglich bei Ihnen melden.",
      });

      reset();
    } catch (error) {
      console.error('Fehler beim Senden des Formulars:', error);
      toast({
        title: "Fehler beim Senden",
        description: `Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail. Details: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-display font-semibold mb-6">Schreiben Sie uns</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Ihr Name"
            className="mt-1"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1" role="alert">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="ihre-email@beispiel.de"
            className="mt-1"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1" role="alert">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subject">Betreff *</Label>
          <Select onValueChange={(value) => setValue('subject', value)} value={watch('subject')}>
            <SelectTrigger aria-invalid={errors.subject ? "true" : "false"}>
              <SelectValue placeholder="Bitte wählen Sie einen Betreff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allgemeine-anfrage">Allgemeine Anfrage</SelectItem>
              <SelectItem value="plattform-frage">Frage zur Plattform</SelectItem>
              <SelectItem value="buchung">Coaching-Buchung</SelectItem>
              <SelectItem value="technische-frage">Technische Frage</SelectItem>
              <SelectItem value="sonstiges">Sonstiges</SelectItem>
            </SelectContent>
          </Select>
          {errors.subject && (
            <p className="text-sm text-red-600 mt-1" role="alert">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message">Nachricht *</Label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Ihre Nachricht an uns"
            rows={5}
            className="mt-1 resize-none"
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1" role="alert">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
        </Button>
      </form>
    </div>
  );
};

export default KontaktFormular;
