import { getUserBySearchedId } from '@/db/user';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import UserIcon from '@/components/userProfile/UserIcon/UserIcon'; // UserIconコンポーネントをインポート
import FollowButton from '@/components/userProfile/FollowButton/FollowButton'; // FollowButtonコンポーネントをインポート
import CheckIsFollowIcon from '@/components/userProfile/CheckIsFollowIcon/ChackIsFollowIcon';

interface Params {
    params: {
        searchedName: string;
    };
}

const UserPage = async ({ params }: Params) => {
    const session = await auth();
    const user = await getUserBySearchedId(params.searchedName);

    if (!user) {
        notFound();
    }

    // session.user.email を使用
    const isOwnProfile = session?.user?.email === user.email;

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center space-x-6">
                <UserIcon imageName={user.image ?? 'default.png'} altText={user.name ?? 'Default Name'} className="w-24 h-24 border-4 border-blue-500 rounded-full" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{user.name ?? 'Default Name'}</h1>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-gray-500 mb-5">@{params.searchedName}</p>
                    {!isOwnProfile && (
                        <div className="flex space-x-2 mb-5">
                            <FollowButton followedUserId={user.id} />
                            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300">チャット</button>
                        </div>
                    )}
                    <CheckIsFollowIcon followerUserId={user.id} />
                </div>
            </div>
        </div>
    );
};

export default UserPage;

