#ゲームセッションの情報を一覧表示する際に取得したいデータのテーブル

model GameSessionSummary 
  id                 ゲームセッションの一意の識別子
  title              ゲームセッションのタイトル
  dueDate            ゲームセッションの締め切り日
  communicationType  コミュニケーションの種類（チャット、VC、対面など）
  qualification      応募資格
  scenarioId         シナリオの識別子
  scenario           使用するシナリオの情報
  gms                ゲームマスターのユーザー情報
  applicants         応募者のユーザー情報
  createdAt          作成日時
  updatedAt          更新日時



#一覧画面から募集詳細表示画面に遷移した後など、募集１つ１つに対して取得したいデータのテーブル

model GameSessionDetail
  id                 ゲームセッション詳細の一意の識別子
  gameSessionId      ゲームセッションの識別子
  description        ゲームセッションの詳細説明
  isMobileCompatible モバイル対応かどうか
  isSpectator        観戦可能かどうか
  ageLimit           年齢制限
  players            参加プレイヤーのユーザー情報
  spectators         観戦者のユーザー情報




#型定義
enum CommunicationType
  CHAT               チャット
  VC                 VC通話
  IN_PERSON          対面

enum Qualification 
  ANYONE             誰でも
  MUTUAL_FOLLOW      相互フォローのみ
  COMMUNITY_MEMBER   コミュニティメンバーのみ

enum SpectatorType 
  ANYONE             誰でも
  MUTUAL_FOLLOW      相互フォローのみ
  COMMUNITY_MEMBER   コミュニティメンバーのみ
