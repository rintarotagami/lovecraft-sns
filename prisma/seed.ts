import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const scenarios = [
        {
            title: '星空のマリス',
            overview: 'プレイ時間：4時間～5時間\n人数：プレイヤー7人+ゲームマスター（司会進行役）1人\n環境：通話ツール（Discordなど）とココフォリアが必要です。',
            introduction: '「知識は罪だ」\n人類が長い時間をかけ辿り着いた、たったひとつの真実。\n人は知る事で憎み、知る事で争い、知る事で殺し、知る事で滅んだ。\n地下に逃げた我々は、その学びを決して忘れる事なく、否、決して思い出す事なく生きていこう。\n\n―――。\n\n朝が来ると光が差し込み、やがて空が橙色に染まり、そして静かな夜が訪れる。\nこのシステムを思いつき開発した人は、きっと素晴らしい人だろう。\nだって、朝焼けを見ていると、今日も頑張ろうって思えるから。\nだって、夕暮れを見ていると、優しい気持ちになれるから。\nだって、星空を見ていると、明日を待ち望んで眠れるから。\n\n―――この世界は素晴らしい物で溢れている。\n作り物のように美しく、気味が悪いくらいに優しい。\nそんな悲劇が似合わない世界で。\nあなたたちのお話が、はじまります。',
            tags: ['イバラユーギ', 'シナリオ'],
            isGMless: false,
            expectedPlayers: 7,
            expectedPlayTime: '4時間～5時間',
            imageNames: [
                'hoshizora_marisu1.jpg',
                'hoshizora_marisu2.jpg',
                'hoshizora_marisu3.jpg',
                'hoshizora_marisu4.jpg',
                'hoshizora_marisu5.jpg',
                'hoshizora_marisu6.jpg',
                'hoshizora_marisu7.jpg',
                'hoshizora_marisu8.jpg',
                'hoshizora_marisu9.jpg',
            ],
            authors: {
                create: [
                    {
                        author: {
                            create: {
                                role: 'システム・シナリオ',
                                name: 'イバラユーギ',
                            },
                        },
                    },
                    {
                        author: {
                            create: {
                                role: 'デザイン',
                                name: 'おれんじ',
                            },
                        },
                    },
                    {
                        author: {
                            create: {
                                role: 'イラスト',
                                name: '衿崎',
                            },
                        },
                    },
                    {
                        author: {
                            create: {
                                role: '動画',
                                name: 'じくまる',
                            },
                        },
                    },
                    {
                        author: {
                            create: {
                                role: 'ココフォリアデザイン',
                                name: 'うめぼしたろ',
                            },
                        },
                    },
                ],
            },
            gameSessions: {
                create: [],
            },
            scenarioDetail: {
                create: {
                    contents: '◆まずはじめにお読みください　PDFファイル\n◆星空のマリスGMガイド　PDF＆Wordファイル\n◆プレイヤー配布物\n→キャラクターシート　PDFファイル\n→各種エンディング　　JPGファイル＋PDFファイル\n◆星空のマリスココフォリアデータ　ZIPファイル\n（ココフォリアへZIPファイルをドラッグすることで使用出来ます）\n◆各種画像　22ファイル',
                    url: 'https://booth.pm/ja/items/3078406',
                    precaution: 'このゲームは、マーダーミステリーゲームと呼ばれるジャンルの「一度しか遊べないゲーム」です。プレイヤーが7名と、ゲームを司会進行するためのGM(ゲームマスター)の計8名が必要です。',
                    prohibition: '禁止事項がここに記載されます。',
                    termsOfUse: '利用規約がここに記載されます。',
                    commercialUse: '【動画配信について】\nマーダーミステリー「星空のマリス」の動画配信に関しましては、ご自由に行って頂いて問題ありません。\nネタバレなどの配慮だけお願い致します。',
                    updateHistory: {
                        create: [
                            {
                                date: new Date('2023-05-10T18:00:00Z'),
                                content: 'ココフォリアに修正が入りました。\n・オンライン版星空のマリス追加DL.zip\nの再ダウンロードをお願いします。',
                            },
                            {
                                date: new Date('2023-05-15T18:00:00Z'),
                                content: 'ココフォリア盤面がリニューアルされました。\n購入済の方は、無料でダウンロードできます。\n・オンライン版星空のマリス追加DL.zip\nをダウンロード後、ご使用ください。',
                            },
                        ],
                    },
                    videoUrls: ['https://www.youtube.com/watch?v=ixVY-CywqUE&t=13s'],
                    description: '【宣伝】\n同じ世界観で描かれたマーダーミステリー「荒廃のマリス」\n大阪のマーダーミステリー専門店NAGAKUTSU(@nagakutsu1)など、全国のマーダーミステリー専門店で公演中！\nまた前日譚である「幻想のマリス」もイバラユーギのHPにて無料公開中！',
                },
            },
        },
        // ここに他の10個のシナリオを追加します
        {
            title: '日陰草の住む屋敷',
            overview: 'プレイ時間：2時間半〜4時間\n人数：プレイヤー3人+ゲームマスター（司会進行役）1人\n環境：Discordとココフォリアが必要です。\n密談無し',
            introduction: '闇に紛れ、暗殺を稼業とする木隠家。木隠邸と呼ばれる屋敷に、その血を受け継ぐ四人の兄弟が住んでいる。名は、木隠カズラ・木隠ヤツデ・木隠アオイ・木隠オガセ。\n\n彼らはまだ未熟であり、世を離れ密かに生きる日陰草と呼ばれている暗殺者の血が覚醒すれば、その名を残すことは間違いないだろう。\n\nただし木隠の正式な後継者となるのは、一世代に一人だけ。木隠家の人間が互いに殺しあう「継承の儀」が訪れれば、一人の人間が他の雑草の命を刈り取ってしまうためである。また木隠の血筋を継ぐ人間は、代々「日陰病」という病を持つとされている。\n\n太陽の光を浴びれば紫外線に反応して症状が起こり、最悪の場合死に至る。そのこともあり、彼らはこの屋敷の外に出ることはなかった。\n\nしかしある寒い冬の日、日差しが強い正午のこと。スピーカーから今日が「継承の儀」に設定されたという音声が流れる。また驚くべきことに、木隠家の人間が既に一人は死亡しているという。\n\n一触即発の状況の中、三人は警戒態勢をとるが殺し合いは始まらなかった。だが、この中に殺しを行った人物はいると考えられる。\n\n残された三人はまずはその犯人を探し出し、その後でこれから取るべき行動について考えることにした。',
            tags: ['マーダーミステリー', 'シナリオ'],
            isGMless: false,
            expectedPlayers: 3,
            expectedPlayTime: '2時間半〜4時間',
            imageNames: [
                'hikagesounosumuyasiki1.jpg',
                'hikagesounosumuyasiki2.jpg',
                'hikagesounosumuyasiki3.jpg',
                'hikagesounosumuyasiki4.jpg',
            ],
            authors: {
                create: [
                    {
                        author: {
                            create: {
                                role: 'システム・シナリオ',
                                name: 'itohaki',
                            },
                        },
                    },
                ],
            },
            gameSessions: {
                create: [],
            },
            scenarioDetail: {
                create: {
                    contents: '◆ココフォリア用データ\n◆各種ハンドアウト\n◆GM用ガイド＆台本\n◆解説シート\n◆ディスコード・ココフォリアの事前準備説明\n◆キービジュアル',
                    url: 'https://booth.pm/ja/items/3892889',
                    precaution: 'このゲームは、マーダーミステリーゲームのため一度しか遊べません。プレイヤー3名とGMが必要です。',
                    prohibition: '【著作権上の理由により、当シナリオデータの再配布を禁じます。】',
                    termsOfUse: '無償利用の範囲でシナリオの改変は可能です。有償利用は禁止されています。',
                    commercialUse: 'シナリオ・GMガイドについて\n\n・当シナリオの許可なき有償利用は禁じさせていただきます。無償利用の範囲であれば、シナリオの改変については問題ございません。\n\n・GMガイド・ハンドアウトなどの著作権は製作者が有しております。許可なき再配布は禁止させていただきます。',
                    updateHistory: {
                        create: [],
                    },
                    videoUrls: [],
                    description: 'こちら以下のリンクは、ネタバレのない商品説明となっております。\n\nhttps://itohaki.com/list/hikagesou/',
                },
            },
        },
    ];

    //TODO: キャラクター情報を登録できるようにしたい。登録したらかっこよく表示
    
    for (const scenario of scenarios) {
        const createdScenario = await prisma.scenarioSummary.create({
            data: scenario,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })