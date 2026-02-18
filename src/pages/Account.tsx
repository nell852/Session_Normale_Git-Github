"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { User, Package, MapPin, Settings, CreditCard, Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/LanguageContext"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"

// Interface pour les éléments de commande
interface OrderItem {
  id: string
  product_id: string | null
  quantity: number
  size: string
  color: string
  price: number
  created_at: string
}

// Interface basée sur les champs actuellement disponibles
interface UserProfile {
  id: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
  email?: string | null
  avatar_url?: string | null
  bio?: string | null
  website?: string | null
}

// Type pour les commandes basé sur votre schéma
interface Order {
  id: string
  created_at: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | null
  total_amount: number
  payment_status: "pending" | "paid" | "failed" | "refunded" | null
  tracking_number: string | null
  user_id: string | null
  order_items: OrderItem[]
}

export default function Account() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: "",
    website: "",
  })

  // Fonction de formatage des prix en XAF
  const formatPriceXAF = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    checkUserAndLoadProfile()
  }, [])

  const checkUserAndLoadProfile = async () => {
    try {
      // Vérifier si l'utilisateur est connecté
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        toast({
          variant: "destructive",
          title: "Accès refusé",
          description: "Vous devez être connecté pour accéder à cette page.",
        })
        navigate("/login")
        return
      }

      // Récupérer le profil utilisateur avec gestion des champs optionnels
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError) {
        console.error("Erreur lors de la récupération du profil:", profileError)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger votre profil.",
        })
        return
      }

      if (profileData) {
        const userProfile: UserProfile = {
          id: profileData.id,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone,
          created_at: profileData.created_at,
          updated_at: profileData.updated_at,
          email: (profileData as any).email || user.email || "",
          avatar_url: (profileData as any).avatar_url || null,
          bio: (profileData as any).bio || null,
          website: (profileData as any).website || null,
        }

        setProfile(userProfile)
        setFormData({
          first_name: userProfile.first_name || "",
          last_name: userProfile.last_name || "",
          email: userProfile.email || "",
          phone: userProfile.phone || "",
          bio: userProfile.bio || "",
          website: userProfile.website || "",
        })
      }

      // Récupérer les commandes de l'utilisateur avec leurs éléments
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
          id,
          created_at,
          status,
          total_amount,
          payment_status,
          tracking_number,
          user_id,
          order_items (
            id,
            product_id,
            quantity,
            size,
            color,
            price,
            created_at
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (ordersError) {
        console.error("Erreur lors de la récupération des commandes:", ordersError)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger vos commandes.",
        })
      } else {
        setOrders(ordersData || [])
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Utilisateur non connecté")
      }

      const updateData: any = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        updated_at: new Date().toISOString(),
      }

      try {
        const { error } = await supabase
          .from("profiles")
          .update({
            ...updateData,
            email: formData.email,
            bio: formData.bio,
            website: formData.website,
          })
          .eq("id", user.id)

        if (error) {
          const { error: basicError } = await supabase.from("profiles").update(updateData).eq("id", user.id)

          if (basicError) {
            throw basicError
          }

          toast({
            title: "Profil partiellement mis à jour",
            description:
              "Certains champs n'ont pas pu être sauvegardés. Veuillez exécuter les migrations de base de données.",
          })
        } else {
          toast({
            title: "Profil mis à jour",
            description: "Vos informations ont été sauvegardées avec succès.",
          })
        }
      } catch (updateError) {
        throw updateError
      }

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              first_name: formData.first_name,
              last_name: formData.last_name,
              phone: formData.phone,
              email: formData.email,
              bio: formData.bio,
              website: formData.website,
              updated_at: new Date().toISOString(),
            }
          : null,
      )
    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde:", error)
      toast({
        variant: "destructive",
        title: "Erreur de sauvegarde",
        description: "Impossible de sauvegarder vos modifications.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      })
      navigate("/login")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de se déconnecter.",
      })
    }
  }

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Livré</Badge>
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800">Expédié</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">En cours</Badge>
      case "confirmed":
        return <Badge className="bg-purple-100 text-purple-800">Confirmé</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800">En attente</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>
      default:
        return <Badge variant="secondary">{status || "Inconnu"}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string | null) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Échoué</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800">Remboursé</Badge>
      default:
        return <Badge variant="secondary">{status || "Inconnu"}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement de votre profil...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profil introuvable</h1>
          <Button onClick={() => navigate("/login")}>Se connecter</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bonjour {profile.first_name || "Utilisateur"} !</h1>
          <p className="text-muted-foreground">Gérez vos informations et commandes</p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          Se déconnecter
        </Button>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Commandes</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Adresses</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Paiement</span>
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Favoris</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Paramètres</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes Commandes</CardTitle>
              <CardDescription>Consultez l'historique de vos commandes</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Aucune commande</p>
                  <p className="text-muted-foreground mb-4">Vous n'avez pas encore passé de commande</p>
                  <Button variant="outline">Découvrir nos produits</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-4">
                            <span className="font-medium">#{order.id.slice(0, 8)}</span>
                            {getStatusBadge(order.status)}
                            {getPaymentStatusBadge(order.payment_status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString("fr-FR")}
                            {order.tracking_number && ` • Suivi: ${order.tracking_number}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPriceXAF(order.total_amount)}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Articles commandés :</h4>
                        {order.order_items.length === 0 ? (
                          <p className="text-sm text-muted-foreground">Aucun article</p>
                        ) : (
                          <ul className="space-y-2">
                            {order.order_items.map((item) => (
                              <li key={item.id} className="text-sm">
                                <span>
                                  {item.quantity}x {item.product_id ? `Produit #${item.product_id.slice(0, 8)}` : "Article inconnu"} 
                                  ({item.size}, {item.color}) - {formatPriceXAF(item.price * item.quantity)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
              <CardDescription>
                Gérez vos informations de profil • Membre depuis le{" "}
                {new Date(profile.created_at).toLocaleDateString("fr-FR")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom</label>
                    <Input
                      name="first_name"
                      type="text"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="Votre prénom"
                      disabled={isSaving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <Input
                      name="last_name"
                      type="text"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {profile.email ? "Email modifiable" : "Champ email non disponible - exécutez les migrations"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+33 6 12 34 56 78"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <Input
                    name="bio"
                    type="text"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Parlez-nous de vous..."
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {profile.bio !== undefined
                      ? "Bio modifiable"
                      : "Champ bio non disponible - exécutez les migrations"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Site web</label>
                  <Input
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://votre-site.com"
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {profile.website !== undefined
                      ? "Site web modifiable"
                      : "Champ site web non disponible - exécutez les migrations"}
                  </p>
                </div>

                <Button type="submit" className="bg-brand-blue hover:bg-brand-blue-dark" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    "Sauvegarder les modifications"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes Adresses</CardTitle>
              <CardDescription>Gérez vos adresses de livraison et facturation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Aucune adresse enregistrée</p>
                  <p className="text-muted-foreground mb-4">Ajoutez une adresse pour faciliter vos commandes</p>
                  <Button variant="outline">Ajouter une adresse</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Moyens de Paiement</CardTitle>
              <CardDescription>Gérez vos cartes bancaires et moyens de paiement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CreditCard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Aucun moyen de paiement</p>
                <p className="text-muted-foreground mb-4">Ajoutez une carte pour faciliter vos achats</p>
                <Button variant="outline">Ajouter une carte</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ma Liste de Souhaits</CardTitle>
              <CardDescription>Retrouvez vos articles favoris</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Votre liste de souhaits est vide</p>
                <p className="text-muted-foreground mb-4">Ajoutez des articles à votre liste en cliquant sur le cœur</p>
                <Button variant="outline">Découvrir nos produits</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du Compte</CardTitle>
              <CardDescription>Configurez vos préférences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications par email</p>
                    <p className="text-sm text-muted-foreground">Recevez des emails sur vos commandes et nos offres</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications SMS</p>
                    <p className="text-sm text-muted-foreground">Recevez des SMS pour le suivi de vos commandes</p>
                  </div>
                  <input type="checkbox" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">Recevez nos dernières nouvelles et offres spéciales</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="destructive" className="w-full">
                  Supprimer mon compte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}