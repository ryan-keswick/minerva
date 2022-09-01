import Image from 'next/image';
import { Wrapper } from './styled';

interface Props {
  image: string;
  prompt: string;
}

export const ImageResult = ({ image, prompt }: Props) => {
  console.log(image, prompt);
  return (
    <Wrapper>
      <a href={image} target="_blank" rel="noreferrer">
        <Image src={image} alt={prompt} width={225} height={225} />
      </a>
    </Wrapper>
  );
};
