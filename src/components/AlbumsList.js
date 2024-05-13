import {useAddAlbumMutation, useFetchAlbumsQuery} from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({user}) {

    //query hook run immediately whenever the component is first displayed on the screen and there is no need to use useEffect().
    //If we repeat the call useFetchAlbumsQuery() with an identical user,
    //you will notice that still one request happens. Identical requests are executed once and the same
    //response data is given. The tag system is used to mark certain queries as being out-of-date
    //after specific mutations are executed.
    //isLoading() is set to true the first time we make the request. isFetching() is set to true every time we make the request.
    const {data, error, isLoading, isFetching} = useFetchAlbumsQuery(user);

    //mutation hooks give you a function to run when you want to change some data.
    //results contains data such as isError, isLoading, isSuccess, isUninitialized (this mutation hasn't been executed yet) etc.
    //We set up a rule saying that every time we call that mutation, we automatically re-fetch the data using a second HTTP request.
    //This happens using tags in albumsApi.
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        //2 HTTP requests happen, one to add the new Album entry (POST) and another one to
        //get the up-to-date list of albums (GET)
      addAlbum(user)
    };

    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3}/>
    } else if (error) {
        content = <div> Error loading albums.</div>
    } else {
        content = data.map(album => {
            return <AlbumsListItem key={album.id} album={album}/>
        });
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button onClick={handleAddAlbum} loading={results.isLoading}>
                    + Add Album
                </Button>
            </div>
            <div>
                {content}
            </div>
        </div>
    );
}

export default AlbumsList