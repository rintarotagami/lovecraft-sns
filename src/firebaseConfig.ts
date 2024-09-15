// 必要なSDKの関数をインポート
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebaseの設定情報を環境変数から取得
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);

// Firestoreインスタンスを取得
const db = getFirestore(app);

export { db };