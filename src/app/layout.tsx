import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth'; 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoveCraft - マーダーミステリーSNS",
  description:
    "LoveCraftは、オンラインでのマーダーミステリーセッションの募集、マッチング、コミュニティ形成をサポートするプラットフォームです。初心者からベテランまで、すべてのマーダーミステリー愛好者が参加できる環境を提供します。プロフィール設定、フォローフォロワー機能、Twitter連携、Discordサーバーの自動作成など、快適にセッションを楽しむための多彩な機能を搭載。プレイヤー同士のつながりを深めながら、シナリオやセッションを手軽に開催・参加できる仕組みを提供します。",
  keywords:
    "マーダーミステリー, オンラインセッション, コミュニティ, LoveCraft, ゲームサークル, TRPG, シナリオ, プレイヤー募集, マッチング, Discord, Twitter連携",
  authors: [{ name: "RintaroTagami" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth(); // セッション情報を取得

  return (
    <SessionProvider session={session}>
      <html lang="ja">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
