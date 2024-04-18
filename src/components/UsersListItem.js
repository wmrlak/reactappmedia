
import {GoTrashcan} from "react-icons/go";
import Button from "./Button";
import {removeUser} from "../store";
import {useThunk} from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({user}) {

    const [doRemoveUser, isDeletingUser, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user)
    };


    //This is the header of the Expandable panel
    //Put the header in a React fragment. When this fragment is shown in the
    //screen no new html element is created, i.e no new div tag.
    //(if it was a <div></div>, the new div would be in the html)
    const header = <>
        <Button className="mr-3" loading={isDeletingUser} onClick={handleClick}>
            <GoTrashcan />
        </Button>
        {error && <div>Error deleting user.</div>}
        {user.name}
    </>;

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );
}

export default UsersListItem;