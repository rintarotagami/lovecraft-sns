import Image from "next/image";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { naishoMoji, limelight, retorogo } from "@/utils/font"
import NavMenu from "@/components/NavMenu/NavMenu";


export default function Home() {
  return (
    <>
      <NavMenu />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow text-[#fefad3]">
          <section className={`relative bg-[url('/assets/img/Curtain.jpg')] bg-cover bg-center h-[90vh] flex items-center justify-center ${limelight.className}`}>
            <div className="absolute inset-0 bg-[url('/assets/img/SpotLight.png')] bg-cover bg-center opacity-90"></div>

            <div className="container mx-auto px-4 relative">
              <div className="text-center mb-8">
                <div className="flex flex-col items-center border-b border-[#fefad3] pb-4 mb-4">
                  <div className="flex flex-col items-end">
                    <Image
                      src="/assets/img/LoveCraft_logo.png"
                      alt="LoveCraft タイトル"
                      width={1000}
                      height={200}
                      className="drop-shadow-2xl"
                    />
                    <div className="text-[#fefad3] text-4xl tracking-wider">
                      <span className={`${naishoMoji.className}`}>マーダーミステリ-</span>SNS
                    </div>
                  </div>
                </div>

                {/* <h2 className="text-2xl font-bold text-[#fefad3]">遺された証拠から推理し、謎を解き明かせ。</h2> */}
              </div>
              <div className="flex justify-center space-x-4 mb-8">
                <a className="border-2 border-[#fefad3] hover:bg-[#fefad3]/20 text-[#fefad3] font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300" href="https://www.instagram.com/lovecraft_chuo/"><FaInstagram className="mr-2" />Instagram</a>
                <a className="border-2 border-[#fefad3] hover:bg-[#fefad3]/20 text-[#fefad3] font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300" href="https://twitter.com/c_murdermystery"><FaTwitter className="mr-2" />Twitter</a>
                <a className="border-2 border-[#fefad3] hover:bg-[#fefad3]/20 text-[#fefad3] font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300" href="https://youtube.com/channel/UC8BA853RQsLt4Brw_fhkU2Q"><FaYoutube className="mr-2" />Youtube</a>
              </div>

              <div className="animate-bounce text-[#fefad3] flex flex-col justify-center items-center text-center mt-12">
                <span className="inline-block animate-bounce text-[#fefad3]">Scroll</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

            </div>
          </section>
          <section id="aboutUs" className="h-screen py-40">
            <h3 className={`text-[10vw] font-bold mb-4 ${limelight.className}`} style={{ WebkitTextStroke: '1px #fefad3', color: 'transparent' }}>LoveCraft</h3>
            <div className="container mx-auto px-4">
              <p className="leading-relaxed">
                <span className={`bg-[#fefad3] text-2xl text-[#1d1717] px-1 mr-3 ${limelight.className}`} >LoveCraft</span>は、マーダーミステリーを他のユーザーと一緒に楽しむためのウェブサイトです。<br /><br />
                魅力的なストーリーと奥深い謎解きが織り成す世界で、あなたの推理力や協力スキルを存分に発揮できます。<br />
                ウェブ上で気軽に参加でき、友達や新たな仲間と一緒に特別な体験を共有することができます。<br /><br />
                ラブクラフトで、まだ見ぬ冒険と謎解きの世界へ飛び込もう！
              </p>
            </div>
          </section>
          <section id="murderMystery" className="relative h-screen py-44">
            <h3 className={`absolute top-0 right-0 left-0 -z-10 text-[13vw] text-nowrap font-bold mb-4 text-center ${limelight.className}`} style={{ WebkitTextStroke: '1.2px #b6b294', color: 'transparent', marginLeft: '-50vw', marginRight: '-50vw' }}>Murder Mystery</h3>
            <div className="flex container mx-auto px-4">
              <div className="w-1/2 mr-10 h-96 bg-white flex justify-center items-center"><h2 className="text-3xl text-black">動画埋めこみ予定</h2></div>
              <p className="leading-relaxed flex-1">
                <span className={`bg-[#fefad3] text-2xl text-[#1d1717] p-1 mr-3 ${retorogo.className}`} >マーダーミステリー</span>（Murder Mystery）は、殺人事件を題材にした体験型の推理ゲームです。<br /><br />
                マーダーミステリーには物語とルールが定められた専用のシナリオを使用します。
                物語はシナリオごとに異なり、その中で殺人事件が起きます。
                参加者は事件に関係するキャラクターとなり、全員で協力して真相を解き明かします。
                個人のサブミッションがあるのもマーダーミステリーの面白さです。
                <br /><br />
                また、マーダーミステリーの特徴の一つとして<span className={`bg-[#fefad3] text-2xl text-[#1d1717] p-1 mr-3 ${retorogo.className}`} >ロールプレイング</span>があります。
                参加者はシナリオに沿って自分の思ったように役になりきり、プレイしていくのです。
                事件の真相を暴けるか否か、楽しめるか否かそれらは全て参加するあなた次第となる、
                とても自由なゲームです。
              </p>
            </div>
          </section>

          <div className="fixed -z-50 w-screen h-screen top-0">
            <div className="relative w-full h-full overflow-hidden">
              <svg className="absolute w-full h-full opacity-100">
                <defs>
                  <filter id="feTurbulence" filterUnits="userSpaceOnUse">
                    <feTurbulence type="turbulence" baseFrequency="0.2" numOctaves="10" seed="3" stitchTiles="noStitch" />
                    {/* baseFrequencyでテクスチャーの細かさを変更可能 */}
                  </filter>
                </defs>
                <circle filter="url(#feTurbulence)" cx="1000" cy="100" r="60" />
              </svg>
              <div className="absolute w-full h-full bg-[#020101] top-0 left-0 z-10 opacity-90">
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
