import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import emailjs from '@emailjs/browser'; // Import EmailJS
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false); // État de chargement

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Envoyer l'e-mail via EmailJS
      await emailjs.send(
        'service_lt1rh5c', // Remplacez par votre Service ID
        'template_jeafy9e', // Remplacez par votre Template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'fPlwIN8-Jue0vhZba' // Remplacez par votre Public Key
      );

      toast({
        title: 'Message envoyé',
        description: 'Nous vous répondrons dans les plus brefs délais.',
      });

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'nyogognell@gmail.com',
      description: 'Réponse sous 24h',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+237 698 849 425',
      description: 'Lun-Ven 9h-18h',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: 'Yaoundé, Odza Borne 10',
      description: 'Showroom sur RDV',
    },
    {
      icon: Clock,
      title: 'Horaires',
      value: 'Lun-Ven: 9h-18h',
      description: 'Sam: 10h-16h',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contactez-Nous</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Une question ? Un conseil ? Notre équipe est là pour vous accompagner.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nom complet *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Sujet *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Objet de votre message"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Votre message..."
                    rows={6}
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-blue hover:bg-brand-blue-dark"
                  disabled={isLoading}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Informations de Contact</h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{info.title}</h3>
                      <p className="text-foreground">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Questions Fréquentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Délais de livraison</h4>
                  <p className="text-sm text-muted-foreground">2h -3h </p>
                </div>
                <div>
                  <h4 className="font-medium">Retours et échanges</h4>
                  <p className="text-sm text-muted-foreground">30 jours pour changer d'avis</p>
                </div>
                <div>
                  <h4 className="font-medium">Guide des tailles</h4>
                  <p className="text-sm text-muted-foreground">
                    Consultez notre guide sur chaque fiche produit
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
