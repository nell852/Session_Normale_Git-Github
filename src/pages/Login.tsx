"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/contexts/LanguageContext"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

export default function Login() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // Mettre à jour ou créer le profil dans la table profiles
        const profileData = {
          id: data.user.id,
          email: data.user.email,
          updated_at: new Date().toISOString(),
        }

        const { error: profileError } = await supabase
          .from("profiles")
          .upsert(profileData, { onConflict: "id" })

        if (profileError) {
          console.error("Erreur lors de la mise à jour du profil:", profileError)
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Connexion réussie, mais échec de la mise à jour du profil.",
          })
        }

        toast({
          title: "Connexion réussie !",
          description: "Bienvenue sur StyleThread.",
        })

        navigate("/account")
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error)

      let errorMessage = "Une erreur est survenue lors de la connexion."

      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou mot de passe incorrect."
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Veuillez confirmer votre email avant de vous connecter."
      } else if (error.message.includes("Too many requests")) {
        errorMessage = "Trop de tentatives. Veuillez réessayer plus tard."
      } else if (error.message.includes("Invalid email")) {
        errorMessage = "Adresse email invalide."
      }

      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/account`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        throw error
      }

      // La redirection est gérée par Supabase, mais nous pouvons vérifier l'utilisateur après la redirection
      if (data) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Mettre à jour ou créer le profil dans la table profiles
          const profileData = {
            id: user.id,
            email: user.email,
            first_name: user.user_metadata?.given_name || null,
            last_name: user.user_metadata?.family_name || null,
            avatar_url: user.user_metadata?.avatar_url || null,
            updated_at: new Date().toISOString(),
          }

          const { error: profileError } = await supabase
            .from("profiles")
            .upsert(profileData, { onConflict: "id" })

          if (profileError) {
            console.error("Erreur lors de la mise à jour du profil:", profileError)
            toast({
              variant: "destructive",
              title: "Erreur",
              description: "Connexion réussie, mais échec de la mise à jour du profil.",
            })
          }
        }
      }
    } catch (error: any) {
      console.error("Erreur lors de la connexion avec Google:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de se connecter avec Google.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/account`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error("Erreur lors de la connexion avec Facebook:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de se connecter avec Facebook.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>Connectez-vous à votre compte StyleThread</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                    disabled={isLoading}
                  />
                  <span className="text-sm">Se souvenir de moi</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-brand-blue hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue-dark" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                ou
              </span>
            </div>

           
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Pas encore de compte ? </span>
              <Link to="/register" className="text-brand-blue hover:underline">
                Créer un compte
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}