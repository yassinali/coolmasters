"use client";

import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { passwordSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Current password is required" }),
  newPassword: passwordSchema,
});

type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;

export function PasswordForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit({
    currentPassword,
    newPassword,
  }: UpdatePasswordValues) {
    setStatus(null);
    setError(null);

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });

    if (error) {
      setError(error.message || "Falha ao alterar a senha");
    } else {
      setStatus("Senha alterada com sucesso");
      form.reset();
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alterar senha</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* OAuth users (without a password) can use the "forgot password" flow */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha actual</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Current password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Nova senha" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}
            {status && (
              <div role="status" className="text-sm text-green-600">
                {status}
              </div>
            )}
            <LoadingButton type="submit" loading={loading}>
              Gravar
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
