"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xppaknlw"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  website: z.string().max(0).optional(), // honeypot, kept empty by real users
})

type FormValues = z.infer<typeof formSchema>

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  })

  async function onSubmit(data: FormValues) {
    if (data.website) {
      // Honeypot field was filled in by a bot; silently drop the submission.
      form.reset()
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      })

      if (!response.ok) throw new Error("Request failed")

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      form.reset()
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again, or email me directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Me</h2>
          <p className="text-muted-foreground">Get in touch for opportunities or collaborations</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <input
                  type="text"
                  {...form.register("website")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject of your message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message" className="min-h-[120px] resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t px-6 py-4">
            <p className="text-sm text-muted-foreground">
              You can also reach me directly at{" "}
              <a href="mailto:nabiausaaf@gmail.com" className="font-medium text-primary hover:underline">
                nabiausaaf@gmail.com
              </a>
            </p>
          </CardFooter>
        </Card>
        <Toaster />
      </div>
    </section>
  )
}
