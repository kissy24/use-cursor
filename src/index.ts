import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import { AppDataSource } from './data-source';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());

// ルーティング
app.use('/api/todos', todoRoutes);

// データベース接続とサーバー起動
AppDataSource.initialize()
    .then(() => {
        console.log('データベースに接続しました');
        app.listen(PORT, () => {
            console.log(`サーバーが起動しました: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('データベース接続エラー:', error);
    }); 