import Image from "next/image";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />  
      <main className="flex-grow">
        <section className="bg-[url('/assets/img/Curtain.jpg')] bg-cover bg-center h-screen flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="border-b border-[#fefad3] pb-4 mb-4">
                <Image
                  src="/assets/img/LoveCraft_logo.png"
                  alt="LoveCraft タイトル"
                  width={384}
                  height={192}
                  className="mx-auto mb-4 w-full max-w-2xl h-auto"
                />
                <div className="text-[#fefad3] font-bold text-xl">
                  マーダーミステリーSNS
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-[#fefad3]">遺された証拠から推理し、謎を解き明かせ。</h2>
            </div>
            <div className="flex justify-center space-x-4 mb-8">
              <a className="border-2 border-[#fefad3] hover:bg-[#fefad3]/20 text-[#fefad3] font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300" href="https://www.instagram.com/lovecraft_chuo/"><FaInstagram className="mr-2" />Instagram</a>
              <a className="border-2 border-[#fefad3] hover:bg-[#fefad3]/20 text-[#fefad3] font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300" href="https://twitter.com/c_murdermystery"><FaTwitter className="mr-2" />Twitter</a>
              <a className="border-2 border-[#fefad3] hover:bg-[#fefad3]/20 text-[#fefad3] font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300" href="https://youtube.com/channel/UC8BA853RQsLt4Brw_fhkU2Q"><FaYoutube className="mr-2" />Youtube</a>
            </div>
            <div className="text-center">
              <span className="inline-block animate-bounce text-[#fefad3]">Scroll</span>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-4 text-center">LoveCraftとは？</h3>
            <p className="text-gray-700 leading-relaxed">
              LoveCraftはマーダーミステリーやTRPGなどのプレイ・配信・作成販売を行う中央大学発のゲームサークルです。
              <br />
              マーダーミステリーやTRPGのシナリオの背景に多用されているクトゥルフ神話の代表的な作家である、ハワード・フィリップス・ラヴクラフト（Howard Phillips Lovecraft、1890年8月20日 - 1937年3月15日）と創作への情熱（Love Craft）から名付けられました。
              <br />
              オンライン・オフライン両方の活動を行っていて、オフラインの場合でも新型コロナウイルスの感染対策ガイドラインに沿って活動を行います。
            </p>
          </div>
        </section>
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-4 text-center">お知らせ</h3>
            <p className="text-gray-700 text-center">LoveCraft非公式サイトが開設されました！</p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-4 text-center">マーダーミステリーとは？</h3>
            <p className="text-gray-700 leading-relaxed">
              マーダーミステリー（Murder Mystery）は、殺人事件を題材にした体験型の推理ゲームです。
              マーダーミステリーには物語とルールが定められた専用のシナリオを使用します。
              物語はシナリオごとに異なり、その中で殺人事件が起きます。
              参加者は事件に関係するキャラクターとなり、全員で協力して真相を解き明かします。
              個人のサブミッションがあるのもマーダーミステリーの面白さです。
              <br />
              また、マーダーミステリーの特徴の一つとしてRP（ロールプレイング）があります。
              参加者はシナリオに沿って自分の思ったように役になりきり、プレイしていくのです。
              事件の真相を暴けるか否か、楽しめるか否かそれらは全て参加するあなた次第となる、
              とても自由なゲームです。
            </p>
          </div>
        </section>
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-4 text-center">TRPGとは？</h3>
            <p className="text-gray-700 leading-relaxed">
              TRPGとは用意された物語の登場人物となって、その物語世界の中で主体的に行動し、そして物語を完成させる遊びです。誰もが多少は抱いた「冒険をしてみたい」「ドラゴンを倒してみたい」という憧れをかなえられます。ゲーム機を使ったRPGと大きく異なる点は、参加者が自分の思い通りに発言し役を演じることで、誰も予想できないような結末を迎えることができる点です。TRPGにもゲームを成り立たせるうえで必要な最低限のシナリオの制約がありますので、「なんでも自由」というわけではありませんが、その制約の範疇で自由なゲーム進行を行うことができます。この点はマーダーミステリーと同じ点だと思います。マーダーミステリーと似て非なるものとしては、結末が決まっていないことです。マーダーミステリーもある程度結末の選択肢はありますが、最終的にはいくつかのパターンに収まります。しかしTRPGでは途中での脱落など様々な要素があるので物語の結末は無限です。自分で物語を紡いでいくTRPGも極めて自由なゲームです。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
