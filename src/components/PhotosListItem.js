import {GoTrashcan} from "react-icons/go";
import {useRemovePhotoMutation} from "../store";

function PhotosListItem({photo}) {

    const [removePhoto, results] = useRemovePhotoMutation();
    const handleRemovePhoto = () => {
        removePhoto(photo)
    };

    return (
        <div className="relative cursor-pointer m-2" onClick={handleRemovePhoto}>
            <img className="h-30 w-30" src={photo.url} alt="random pic"/>
            <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
                <GoTrashcan className="text-3xl"/>
            </div>
        </div>
    );
}

export default PhotosListItem;