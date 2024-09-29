#シナリオの情報を一覧表示する際に取得したいデータのテーブル

model ScenarioSummary
  id                 シナリオの一意の識別子
  name               シナリオの名前
  overview           シナリオの概要
  introduction       シナリオの導入部分
  tags               シナリオに関連するタグ
  isGMless           ゲームマスター不要かどうか
  expectedPlayers    予想されるプレイヤー数
  expectedPlayTime   シナリオの予想プレイ時間
  authors            シナリオの著者情報



#一覧画面からシナリオ詳細表示画面に遷移した後など、募集１つ１つに対して取得したいデータのテーブル

model ScenarioDetails
  description        シナリオの詳細説明
  contents           シナリオの内容物
  url                シナリオのURL
  precautions        シナリオの注意事項
  prohibitions       シナリオの禁止事項
  termsOfUse         シナリオの利用規約
  commercialUse      シナリオの商業利用に関する情報
  updateHistory      シナリオの更新履歴