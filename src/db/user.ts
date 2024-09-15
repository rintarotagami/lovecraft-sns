 // Start of Selection
import { db } from '@/firebaseConfig';
import { collection, getDoc, doc, query, where, getDocs } from 'firebase/firestore';

export const getUserByEmail = async (email: string) => {
    try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return null;
        return querySnapshot.docs[0].data();
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', id));
        if (!userDoc.exists()) return null;
        return userDoc.data();
    } catch (e) {
        return null;
    }
};