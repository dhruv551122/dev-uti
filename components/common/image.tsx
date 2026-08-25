"use client";

import { SanityImageCrop, SanityImageHotspot } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";
import { SanityAsset } from "@sanity/image-url";
import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src: {
    asset: SanityAsset;
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  alt?: string;
  ref?: React.RefObject<HTMLImageElement | null>;
  onLoad?: () => void;
};

export const SanityImage = ({ src, ref, alt, onLoad, ...props }: Props) => {
  // Ensure alt is not undefined or empty, fallback to "Image" if it is
  const altText = alt || process.env.NEXT_PUBLIC_SITE_NAME || "Placeaa";

  return (
    <Image
      src={urlForImage(src).url()}
      alt={altText}
      sizes="(min-width: 1200px) 85vw, (min-width: 768px) 75vw"
      loader={({ width, quality = 100 }) =>
        urlForImage(src).width(width).quality(quality).url()
      }
      {...props}
      ref={ref}
      onLoad={onLoad}
    />
  );
};
