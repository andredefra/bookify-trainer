import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ContactFormData } from "@/types/contact";

interface ContactFormFieldsProps {
  form: UseFormReturn<ContactFormData>;
  isSubmitting: boolean;
  onSubmit: (data: ContactFormData) => void;
}

export function ContactFormFields({ form, isSubmitting, onSubmit }: ContactFormFieldsProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="subject"
        rules={{ required: "L'oggetto è obbligatorio" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Oggetto *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona l'oggetto" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Informazioni piano palestra">Informazioni piano palestra</SelectItem>
                <SelectItem value="Demo del prodotto">Demo del prodotto</SelectItem>
                <SelectItem value="Supporto tecnico">Supporto tecnico</SelectItem>
                <SelectItem value="Partnership">Partnership</SelectItem>
                <SelectItem value="Altro">Altro</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          rules={{ required: "Il nome è obbligatorio" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome *</FormLabel>
              <FormControl>
                <Input placeholder="Il tuo nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          rules={{ required: "Il cognome è obbligatorio" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cognome *</FormLabel>
              <FormControl>
                <Input placeholder="Il tuo cognome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        rules={{ 
          required: "L'email è obbligatoria",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Inserisci un'email valida"
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email palestra *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="email@palestra.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gym"
        rules={{ required: "Il nome della palestra è obbligatorio" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Palestra *</FormLabel>
            <FormControl>
              <Input placeholder="Nome della palestra" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="city"
        rules={{ required: "La città è obbligatoria" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Città *</FormLabel>
            <FormControl>
              <Input placeholder="La tua città" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        rules={{ required: "Il messaggio è obbligatorio" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Messaggio *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Descrivi le tue esigenze..."
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
      </Button>
    </form>
  );
}