"use client";

import { Button } from "@gitnapp/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gitnapp/ui/components/ui/form";
import { Input } from "@gitnapp/ui/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ShowcaseSection, Stack } from "../showcase";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
});

export function FormSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast(`Submitted: ${JSON.stringify(values)}`);
  }

  return (
    <ShowcaseSection
      id="form"
      title="Form"
      description="react-hook-form + zod validation wired through the Form primitives."
    >
      <Stack>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="peduarte" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Stack>
    </ShowcaseSection>
  );
}
