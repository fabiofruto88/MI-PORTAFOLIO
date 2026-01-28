import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
      {...props}
    />
  );
}
