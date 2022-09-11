import Image from 'next/image';
import { Wrapper } from './styled';
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
    <Wrapper>
      {isLoading ? (
        <Image src={loadingImage} alt={prompt} width={width} height={height} />
      ) : (
        <a href={image} target="_blank" rel="noreferrer">
          <Image src={image} alt={prompt} width={width} height={height} />
        </a>
      )}
    </Wrapper>
  );
};
