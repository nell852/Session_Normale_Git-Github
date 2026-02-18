import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url = window.location.href }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg">
          <Share2 className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Partager ce produit</h4>
          <div className="space-y-2">
            {navigator.share && (
              <Button onClick={handleNativeShare} className="w-full justify-start" variant="ghost">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            )}
            <Button onClick={handleCopyLink} className="w-full justify-start" variant="ghost">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                  Lien copié !
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copier le lien
                </>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
