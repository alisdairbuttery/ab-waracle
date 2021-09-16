import { faHeart, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageVote } from "../../models";

type CatCardProps = {
    id: string;
    imageUrl: string;
    imageName: string;
    votes: number;
    isFavourite: boolean;
    addFavourite: (id: string) => void;
    removeFavourite: (id: string) => void;
    voteOnImage: (id: string, voteType: ImageVote) => void;
}

const CatCard: React.FC<CatCardProps> = ({
    id,
    imageUrl,
    imageName,
    votes,
    isFavourite,
    addFavourite,
    removeFavourite,
    voteOnImage,
}) => {
    let favIconStyles = `inline-block mr-5 cursor-pointer ${isFavourite ? 'text-red-600' : 'text-gray-600'}`;

    return (
        <div key={id} className="rounded overflow-hidden shadow-lg bg-gray-200">
            <img className="w-full" src={imageUrl} alt={imageName} />
            <div className="px-6 pt-4 pb-4">
                <span onClick={() => isFavourite ? removeFavourite(id) : addFavourite(id)} className={favIconStyles}>
                    <FontAwesomeIcon icon={faHeart} />
                </span>
                <span className="inline-block mr-4 align-top cursor-pointer text-gray-600" onClick={() => voteOnImage(id, ImageVote.up)}><FontAwesomeIcon icon={faThumbsUp} /></span>
                <span className="inline-block mr-2 align-top cursor-pointer text-gray-600" onClick={() => voteOnImage(id, ImageVote.down)}><FontAwesomeIcon icon={faThumbsDown} /></span>

                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 float-right">Votes: {votes}</span>
            </div>
        </div>
    );
}

export default CatCard;