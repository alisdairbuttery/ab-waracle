
import { Helmet } from 'react-helmet';
import { useState } from "react";
import { navigate } from "@reach/router";

// Constants
import { AppTitle, ROUTES } from "../constants";

// Services
import { CatApiClient } from "../services/catApi";
import ApiClient from "../services/ApiClient";

export const UploadScreen: React.FunctionComponent = () => {

    const catApiService = new CatApiClient(new ApiClient());

    const [uploading, setUploading] = useState<boolean>(false);
    const [imageData, setImageData] = useState<FileList | null>(null);
    const [uploadError, setUploadError] = useState<boolean>(false);

    const loadImagesForUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        let target = e.target as HTMLInputElement;
        const files = target.files;
        if(files) setImageData(files);
    }

    const uploadImages = async () : Promise<void> => {
        const formData = new FormData();

        if(imageData) {

            setUploading(true);

            for(var i = 0; i < imageData?.length; i++) {
                formData.append('file', imageData[i])
            };

            const imageUploaded: boolean = await catApiService.uploadCatImage(formData);

            if(imageUploaded) {
                navigate(ROUTES.HOME);
            } else {
                setUploadError(true);
                setUploading(false);
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>{AppTitle} | Upload a cat image</title>
            </Helmet>
            <div className="container mx-auto">

                <div className="flex justify-center mt-8">

                    <div className="max-w-sm w-sm rounded-lg shadow-lg bg-white">
                        <div className="m-4">
                            <div className="flex items-center justify-center w-full">

                                <label className="flex flex-col w-full min-h-32 border-4 border-gray-300 border-dashed bg-white hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                                    <div className="flex flex-col items-center justify-center pt-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        {imageData === null || imageData.length === 0 ?
                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Attach a cat image</p>
                                        : 
                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 text-center">Image <strong>{imageData[0].name}</strong> <br />ready to upload</p>
                                        }
                                    </div>

                                    <input type="file" className="opacity-0" onChange={(e) => loadImagesForUpload(e)} />
                                </label>
                            </div>
                        </div>

                        {uploadError &&
                            <p className="px-4 py-2 text-red-500 font-bold text-center mt-0 mb-0"> An error occurred with your image upload please try again.</p>
                        }

                        <div className="flex justify-center p-2">
                            
                            <button className={`w-full px-4 py-2 rounded text-white ${imageData == null ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500'}`} disabled={imageData != null ? false : true} onClick={() => uploadImages()}>
                                {uploading ? 
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Image uploading
                                    </>
                                :
                                    <>Upload</>
                                }
                            </button>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )
}