import { Wrapper, CenterImage, MiddleImage, MiddleMiddleImage } from './styled';
import ImageResult from './components/ImageResult';

interface Props {
  images: string;
  prompt: string;
}

export const NineResults = ({ images, prompt }: Props) => {
  return (
    <Wrapper>
      <ImageResult image={images[0]} prompt={prompt} />

      <MiddleImage>
        <ImageResult image={images[1]} prompt={prompt} />
      </MiddleImage>

      <ImageResult image={images[2]} prompt={prompt} />

      <CenterImage>
        <ImageResult image={images[3]} prompt={prompt} />
      </CenterImage>

      <MiddleMiddleImage>
        <ImageResult image={images[4]} prompt={prompt} />
      </MiddleMiddleImage>

      <CenterImage>
        <ImageResult image={images[5]} prompt={prompt} />
      </CenterImage>

      <ImageResult image={images[6]} prompt={prompt} />

      <MiddleImage>
        <ImageResult image={images[7]} prompt={prompt} />
      </MiddleImage>

      <ImageResult image={images[8]} prompt={prompt} />
    </Wrapper>
  );
};
