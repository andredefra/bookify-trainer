import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Info } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export interface Step1GeneralInfoProps {
  form: UseFormReturn<any>;
  isPaid: boolean;
  setIsPaid: (value: boolean) => void;
  onNext: () => void;
  onCancel?: () => void;
}

export function Step1GeneralInfo({ form, isPaid, setIsPaid, onNext, onCancel }: Step1GeneralInfoProps) {
  const duration = form.watch("duration") || 4;
  const targetFrequency = form.watch("targetFrequency") || 3;
  const totalSessions = duration * targetFrequency;

  const isValid = form.watch("title")?.trim();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Template Title</FormLabel>
            <FormControl>
              <Input placeholder="Weekly Strength Program" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="weekStart"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (weeks)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="4"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sessions per week</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="7"
                  placeholder="3"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                />
              </FormControl>
              <FormDescription>How many workouts per week</FormDescription>
            </FormItem>
          )}
        />
      </div>

      {/* Total Sessions Preview */}
      <div className="p-3 bg-muted rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Sessions:</span>
          <Badge variant="outline">
            {duration} weeks × {targetFrequency} sessions = {totalSessions} total
          </Badge>
        </div>
      </div>

      <FormField
        control={form.control}
        name="objective"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Program Objective</FormLabel>
            <FormControl>
              <Input placeholder="Strength & Conditioning" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the program and its benefits"
                className="resize-none"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isPaid"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Enable Base Price</FormLabel>
              <FormDescription>
                Set a default price for this training template
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  setIsPaid(checked);
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {isPaid && (
        <div className="space-y-3 pl-4 border-l-2 border-primary/20">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Price (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="100.00"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <p>
              This is a default price. You can override it when assigning the program
              to a specific client or adding it to a package.
            </p>
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-between">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <div className={onCancel ? '' : 'ml-auto'}>
          <Button type="button" onClick={onNext} disabled={!isValid}>
            Next: Build Workout
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
