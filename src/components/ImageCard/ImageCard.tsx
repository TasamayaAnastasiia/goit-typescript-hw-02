import { Image } from "../App/App.types";

type Props = {
    image: Image;
    onOpen: (image: string, date: string) => void;
}

const ImageCard = ({image, onOpen}: Props): React.ReactElement => {
    return (
        <div>
            <img onClick={() => onOpen(image.urls.regular, image.created_at)} width="350" height="267" src={image.urls.small} alt="image"/>
        </div>
    );
}
export default ImageCard;