import { db } from '@/lib/db';

export const getSearchedName = async (userId: string) => {
    try {
        const searchedName = await db.searchedName.findUnique({
            where: {
                userId: userId,
            },
        });        
        
        return searchedName?.searchedName;
    } catch (error) {
        console.error('searchedName取得時にエラーが発生しました:', error);
        return null;
    }
};


export const getSearchedNameBySearchedName = async (searchedName: string) => {
    try {
        const result = await db.searchedName.findUnique({
            where: {
                searchedName: searchedName,
            },
        });

        return result;
    } catch (error) {
        console.error('searchedName取得時にエラーが発生しました:', error);
        return null;
    }
};
