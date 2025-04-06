# TypeScript TODOアプリケーション

TypeScriptで作成されたシンプルなTODOアプリケーションです。バックエンドはExpress + TypeORM + SQLite、フロントエンドはReact + Material-UIを使用しています。

## 機能

- TODOの作成、更新、削除
- 完了/未完了の切り替え
- モダンなUIデザイン
- レスポンシブなレイアウト

## 必要条件

- Node.js (v14以上)
- npm (v6以上)

## セットアップ

1. リポジトリをクローン
```bash
git clone [リポジトリURL]
cd [プロジェクトディレクトリ]
```

2. 依存関係のインストール
```bash
# バックエンドの依存関係をインストール
npm install

# フロントエンドの依存関係をインストール
cd client
npm install
cd ..
```

## 開発サーバーの起動

1. バックエンドサーバーの起動
```bash
npm run dev
```

2. フロントエンド開発サーバーの起動（別のターミナルで）
```bash
cd client
npm start
```

または、両方のサーバーを同時に起動する場合：
```bash
npm run dev:full
```

## アプリケーションへのアクセス

- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:3000/api/todos

## APIエンドポイント

- `GET /api/todos` - 全てのTODOを取得
- `POST /api/todos` - 新しいTODOを作成
- `GET /api/todos/:id` - 特定のTODOを取得
- `PUT /api/todos/:id` - TODOを更新
- `DELETE /api/todos/:id` - TODOを削除

## データベース

SQLiteデータベースを使用しており、データは`todo.sqlite`ファイルに保存されます。このファイルは自動的に作成されます。

## ライセンス

MIT