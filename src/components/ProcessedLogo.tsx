import { useState, useEffect } from 'react';
import aircareLogoOriginal from "@/assets/aircare-logo-original.jpeg";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";

interface ProcessedLogoProps {
  className?: string;
  alt?: string;
}

export const ProcessedLogo = ({ className = "", alt = "AirCare Logo" }: ProcessedLogoProps) => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processLogo = async () => {
      try {
        // Load the original image
        const response = await fetch(aircareLogoOriginal);
        const blob = await response.blob();
        const image = await loadImage(blob);
        
        // Remove background
        const processedBlob = await removeBackground(image);
        const processedUrl = URL.createObjectURL(processedBlob);
        
        setProcessedImageUrl(processedUrl);
      } catch (error) {
        console.error('Failed to process logo:', error);
        // Fallback to original image
        setProcessedImageUrl(aircareLogoOriginal);
      } finally {
        setIsProcessing(false);
      }
    };

    processLogo();
  }, []);

  if (isProcessing) {
    return (
      <div className={`animate-pulse bg-white/20 ${className}`} />
    );
  }

  return (
    <img 
      src={processedImageUrl || aircareLogoOriginal}
      alt={alt}
      className={className}
    />
  );
};