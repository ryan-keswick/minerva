import { Wrapper, CenterImage, MiddleImage, MiddleMiddleImage } from './styled';
import ImageResult from './components/ImageResult';
import { S3_BUCKET_URL } from '@constants/aws';

interface Props {
  imageFolder: string;
  prompt: string;
}

const getImages = (imageFolder: string) => {
  const images = [];
  for (let i = 0; i < 9; i++) {
    images.push(`${S3_BUCKET_URL}/${imageFolder}/${i}.png`);
  }
  return images;
};

export const NineResults = ({ imageFolder, prompt }: Props) => {
  const images = getImages(imageFolder);
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
