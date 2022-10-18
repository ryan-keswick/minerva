import Image from 'next/image';
import loadingImage from '@/public/svg/loading.svg';

interface Props {
  image?: { images: string[] };
  width?: number;
  height?: number;
  prompt: string;
  isLoading: boolean;
}

export const ImageResult = ({
  image,
  width = 225,
  height = 225,
  prompt,
  isLoading,
}: Props) => {
  return (
    <div className="rounded-md border-2 border-white hover:border-dark-blue">
      {isLoading || !image?.images[0] ? (
        <Image
          className="rounded-md"
          src={loadingImage}
          alt={prompt}
          width={width}
          height={height}
        />
      ) : (
        <a href={image.images[0]} target="_blank" rel="noreferrer">
          <Image
            className="rounded-md"
            src={image.images[0]}
            alt={prompt}
            width={width}
            height={height}
          />
        </a>
      )}
    </div>
  );
};
