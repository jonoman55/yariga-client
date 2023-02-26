/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

/**
 * Image Props
 */
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderImg?: string;
  errorImg?: string;
};

/**
 * Image Component
 */
export default function Img({ src, placeholderImg, errorImg, ...props }: ImageProps) {
  const [imgSrc, setSrc] = useState<string | undefined>(placeholderImg || src);

  useEffect(() => {
    const img: HTMLImageElement = new Image();
    img.src = src as string;
    img.addEventListener("load", () => {
      setSrc(src);
    });
    img.addEventListener("error", () => {
      setSrc(errorImg || placeholderImg);
    });
  }, [src, placeholderImg, errorImg]);

  return <img {...props} src={imgSrc} />;
};