import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

export default function Register() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 6 caractères.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Créer l'utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`,
          },
        },
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        // Insérer les données du profil dans la table profiles
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        if (profileError) {
          console.error('Erreur lors de la création du profil:', profileError);
          // On continue même si le profil n'est pas créé, l'utilisateur est déjà enregistré
        }

        toast({
          title: 'Compte créé avec succès !',
          description: 'Vérifiez votre email pour confirmer votre compte.',
        });

        // Rediriger vers la page de connexion ou tableau de bord
        navigate('/login');
      }
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);

      let errorMessage = 'Une erreur est survenue lors de la création du compte.';

      if (error.message.includes('User already registered')) {
        errorMessage = 'Un compte existe déjà avec cette adresse email.';
      } else if (error.message.includes('Invalid email')) {
        errorMessage = 'Adresse email invalide.';
      } else if (error.message.includes('Password should be at least')) {
        errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
      }

      toast({
        variant: 'destructive',
        title: "Erreur d'inscription",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de se connecter avec Google.',
      });
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de se connecter avec Facebook.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Créer un compte</CardTitle>
            <CardDescription>Rejoignez la communauté StyleThread</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Prénom"
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Nom
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Nom"
                    disabled={isLoading}
                  />
                </div>
              </div>

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
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    minLength={6}
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input type="checkbox" required className="mt-1" disabled={isLoading} />
                <span className="text-sm text-muted-foreground">
                  J'accepte les{' '}
                  <Link to="/terms" className="text-brand-blue hover:underline">
                    conditions générales
                  </Link>{' '}
                  et la{' '}
                  <Link to="/privacy" className="text-brand-blue hover:underline">
                    politique de confidentialité
                  </Link>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-blue-dark"
                disabled={isLoading}
              >
                {isLoading ? 'Création en cours...' : 'Créer mon compte'}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                ou
              </span>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleFacebookSignUp}
                disabled={isLoading}
                type="button"
              >
                Continuer avec Facebook
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Déjà un compte ? </span>
              <Link to="/login" className="text-brand-blue hover:underline">
                Se connecter
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
