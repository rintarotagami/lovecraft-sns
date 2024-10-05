import { getSearchedName } from '@/db/searched-name';
import { useCurrentUser } from '@/hooks/use-current-user';
import EditProfileSheetClient from '@/components/EditProfileSheet/EditProfileSheetClient';
import {auth} from '@/auth'

const EditProfileSheet = async () => {
    const session = await auth()
    if (!session) {
        throw new Error("Session is null")
    }
    const user = session.user
    const searchedName = user?.id ? await getSearchedName(user.id) : undefined

    if (searchedName) {
        return <EditProfileSheetClient searchedName={searchedName} />
    }

};

export default EditProfileSheet;




