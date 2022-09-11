import { Wrapper, CenterImage, MiddleImage, MiddleMiddleImage } from './styled';
import ImageResult from './components/ImageResult';

interface Props {
  images: string[];
  prompt: string;
  isLoading: boolean;
}

export const NineResults = ({ images, prompt, isLoading }: Props) => {
  return (
    <Wrapper>
      <ImageResult image={images[0]} prompt={prompt} isLoading={isLoading} />
      <MiddleImage>
        <ImageResult image={images[1]} prompt={prompt} isLoading={isLoading} />
      </MiddleImage>
      <ImageResult image={images[2]} prompt={prompt} isLoading={isLoading} />
      <CenterImage>
        <ImageResult image={images[3]} prompt={prompt} isLoading={isLoading} />
      </CenterImage>
      <MiddleMiddleImage>
        <ImageResult image={images[4]} prompt={prompt} isLoading={isLoading} />
      </MiddleMiddleImage>
      <CenterImage>
        <ImageResult image={images[5]} prompt={prompt} isLoading={isLoading} />
      </CenterImage>
      <ImageResult image={images[6]} prompt={prompt} isLoading={isLoading} />
      <MiddleImage>
        <ImageResult image={images[7]} prompt={prompt} isLoading={isLoading} />
      </MiddleImage>
      <ImageResult image={images[8]} prompt={prompt} isLoading={isLoading} />
    </Wrapper>
  );
};
