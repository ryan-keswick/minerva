import Image from 'next/image';
import loadingImage from '@public/svg/loading.svg';

interface Props {
  image: string;
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
      {isLoading ? (
        <Image
          className="rounded-md"
          src={loadingImage}
          alt={prompt}
          width={width}
          height={height}
        />
      ) : (
        <a href={image} target="_blank" rel="noreferrer">
          <Image
            className="rounded-md"
            src={image}
            alt={prompt}
            width={width}
            height={height}
          />
        </a>
      )}
    </div>
  );
};
