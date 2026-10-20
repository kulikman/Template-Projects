import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

/** Round user photo. Uses `next/image` with explicit dimensions. */
export function Avatar({ src, alt, size = 36, className }: AvatarProps): React.ReactElement {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("size-9 rounded-full object-cover", className)}
    />
  );
}
