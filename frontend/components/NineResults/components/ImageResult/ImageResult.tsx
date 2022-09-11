import Image from 'next/image';
import { Wrapper } from './styled';
import loadingImage from '@public/svg/loading.svg';

interface Props {
  image: string;
  prompt: string;
  isLoading: boolean;
}

export const ImageResult = ({ image, prompt, isLoading }: Props) => {
  return (
    <Wrapper>
      {isLoading ? (
        <Image src={loadingImage} alt={prompt} width={225} height={225} />
      ) : (
        <a href={image} target="_blank" rel="noreferrer">
          <Image src={image} alt={prompt} width={225} height={225} />
        </a>
      )}
    </Wrapper>
  );
};
