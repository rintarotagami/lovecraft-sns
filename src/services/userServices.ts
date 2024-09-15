import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

// ユーザーをFirestoreに追加する関数
async function addUser(user: {
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    password?: string;
    role?: 'ADMIN' | 'USER';
}) {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("ユーザーが追加されました。ID: ", docRef.id);
    } catch (e) {
        console.error("ユーザー追加時にエラーが発生しました: ", e);
    }
}

export { addUser }; 