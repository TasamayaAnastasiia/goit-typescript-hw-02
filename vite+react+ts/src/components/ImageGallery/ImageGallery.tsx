import ImageCard from "../ImageCard/ImageCard";
import css from "../ImageGallery/ImageGallery.module.css";
import { Image } from "../App/App.types";
import { FC } from "react";

type Props = {
  list: Image[];
  onOpen: (image: string, date: string) => void;
};

const ImageGallery = ({ list, onOpen }: Props): React.ReactElement => {
  return (
    <ul className={css.list}>
      {list.map((image) => (
        <li className={css.image} key={image.id}>
          <ImageCard image={image} onOpen={onOpen}></ImageCard>
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
