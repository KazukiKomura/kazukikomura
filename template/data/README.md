# データ管理ガイド

この個人ページでは、すべてのコンテンツが外部のJSONファイルで管理されています。情報を更新するには、以下のファイルを編集してください。

## ファイル構造

### profile.json
基本的なプロフィール情報を管理します。
- 名前（first, last）
- メールアドレス
- 自己紹介文
- SNSリンク

### experience.json
職歴・経験を管理します（配列形式）。
- position: 職位
- company: 会社名
- description: 詳細説明
- period: 期間

### education.json
学歴を管理します（配列形式）。
- institution: 教育機関名
- degree: 学位
- field: 専攻分野
- period: 期間

### publications.json
研究発表・論文を管理します。
- conference: 国際会議（査読あり）
- domestic: 国内学会

各論文項目：
- title: タイトル
- authors: 著者
- venue: 発表場所
- year: 年
- doi: DOI（オプション）

## 更新方法

1. 該当するJSONファイルを開く
2. データを追加・編集・削除
3. JSONの構文が正しいことを確認
4. ブラウザでページを再読み込み

## 注意点

- JSONファイルの構文エラーがあると、そのセクションが正しく表示されません
- 日本語文字は正しくエンコードされている必要があります
- 新しい項目を追加する際は、既存の構造に従ってください