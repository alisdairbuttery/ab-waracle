import { AppTitle, ROUTES } from "../constants";
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from "@reach/router";
import { useEffect, useState } from "react";

// Services
import { CatApiClient } from "../services/catApi";
import ApiClient from "../services/ApiClient";
import { ImageVote, SingleCatResponse } from "../models";

// Components
import CatCard from '../components/cards/catCard';
import InfoBox from '../components/infoBox/infoBox';
import Loader from "../components/loader/loader";

export const HomeScreen: React.FC = (props: RouteComponentProps) => {

    const [loadedImages, setLoadedImages] = useState<boolean>(false);
    const [catImages, setCatImages] = useState<SingleCatResponse[]>();
    const [favouriteImages, setFavouriteImages] = useState<string[]>([]);

    const catApiService = new CatApiClient(new ApiClient());

    async function fetchCatImages() {
        const images = await catApiService.listMyCats();

        const votes = await catApiService.getAllImageVotes();

        images.map((image) => {
            const imageVoteObject = votes.filter((vote) => vote.image_id === image.id);
            image.votes = imageVoteObject ? imageVoteObject.length : 0;
        });

        setCatImages(images);
        setLoadedImages(true);
    }

    useEffect(() => {
        fetchCatImages();
    }, []);

    const saveFavouriteImage = async (id: string) => {
        try {
            await catApiService.saveFavourite(id);
            setFavouriteImages([id, ...favouriteImages])
        } catch(err) {
            console.error("Err saving: ", err);
            // set errors
        }
    }

    const removeFavouriteImage = async (id: string) => {
        try {
            await catApiService.removeFavourite(id);
            setFavouriteImages(favouriteImages.filter((item) => {
                return item !== id;
            }))
        } catch(err) {
            console.error("Err removing: ", err);
            // set errors
        }
    }

    const voteOnImage = async (imageId: string, vote: ImageVote) => {
        try {
            const voteSuccess = await catApiService.voteImage(imageId, vote);

            if(voteSuccess) {
                fetchCatImages();
            }
        } catch(err) {
            console.error("Err removing: ", err);
            // set errors
        }
    }

    return (
        <>
            <Helmet>
                <title>{AppTitle} | Your cat images</title>
            </Helmet>

            <div className="container mx-auto">
                {!loadedImages ? 
                    <Loader title="Fetching latest cat images..." />
                : catImages && catImages.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {catImages?.map((image) => {
                            let isImageFav = favouriteImages.includes(image.id);
                    
                            return (
                                <CatCard
                                    id={image.id}
                                    imageUrl={image.url}
                                    imageName={image.original_filename}
                                    votes={image.votes}
                                    isFavourite={isImageFav}
                                    addFavourite={saveFavouriteImage}
                                    removeFavourite={removeFavouriteImage}
                                    voteOnImage={voteOnImage}
                                />
                            )
                        })}
                    </div>
                :
                    <InfoBox title="No images currently available">
                        <p className="text-sm">Visit the <Link to={ROUTES.UPLOAD} className="underline">upload page</Link> to upload your favourite cat images</p>
                    </InfoBox>
                }
            </div>

        </>
    );
}