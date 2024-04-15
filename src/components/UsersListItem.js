
import {GoTrashcan} from "react-icons/go";
import Button from "./Button";
import {removeUser} from "../store";
import {useThunk} from "../hooks/use-thunk";

function UsersListItem({user}) {

    const [doRemoveUser, isDeletingUser, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user)
    };

    return (
        <div className="mb-2 border rounded">
            <div className="flex flex-row items-center justify-between">
                <div className="flex p-2 justify-between items-center, cursor-pointer">
                    <Button className="mr-3" loading={isDeletingUser} onClick={handleClick}>
                        <GoTrashcan />
                    </Button>
                    {error && <div>Error deleting user.</div>}
                    {user.name}
                </div>
            </div>
        </div>
    );
}

export default UsersListItem;