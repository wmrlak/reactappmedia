import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import {TiDelete} from "react-icons/ti";
import {useRemoveAlbumMutation} from "../store";
import PhotosList from "./PhotosList";


function AlbumsListItem({album}) {

    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album)
    };

    //Create header
    const header =
        <>
            <Button className="mr-3" onClick={handleRemoveAlbum} loading={results.isLoading}>
                <TiDelete/>
            </Button>
            {album.title}
        </>;

    return (<ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album}/>
        </ExpandablePanel>);
}

export default AlbumsListItem