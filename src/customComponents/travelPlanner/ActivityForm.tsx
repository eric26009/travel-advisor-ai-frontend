"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/constants";

export const activitySchema = z.object({
  destination: z.string().min(1, { message: "Destination is required" }),
  month: z.string().min(1, { message: "Month is required" }),
  accessCode: z.string().min(1, { message: "Access Code is required" }),
});

interface Props {
  submitActivityForm: (values: z.infer<typeof activitySchema>) => void;
  loading: boolean;
}

const ActivityForm = ({ submitActivityForm, loading }: Props) => {
  const activityForm = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      destination: "",
      month: "January",
      accessCode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof activitySchema>) => {
    submitActivityForm(values);
  };

  return (
    <Form {...activityForm}>
      <form
        onSubmit={activityForm.handleSubmit(onSubmit)}
        className="grid gap-y-3"
      >
        <FormField
          control={activityForm.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input placeholder="Seattle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={activityForm.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Month</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="max-h-[200px]">
                      <SelectLabel>Months</SelectLabel>
                      {months.map((m) => (
                        <SelectItem value={m} key={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={activityForm.control}
          name="accessCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Access Code{" "}
                <Popover>
                  <PopoverTrigger>
                    <i className="fa-regular fa-circle-question" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <span className="text-sm">
                      If you do not have an access code, send a message to{" "}
                      <a
                        href="https://www.linkedin.com/in/feldmaneric"
                        target="_blank"
                        className="font-bold hover:underline"
                      >
                        Eric Feldman
                      </a>
                    </span>
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  // @ts-ignore
                  style={{ WebkitTextSecurity: "disc" }}
                  autoComplete="off"
                  placeholder="Code"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} variant="default">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ActivityForm;
