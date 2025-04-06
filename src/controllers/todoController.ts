import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Todo } from '../models/Todo';

const todoRepository = AppDataSource.getRepository(Todo);

// 全てのTODOを取得
export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await todoRepository.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
};

// 新しいTODOを作成
export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description } = req.body;
        const todo = todoRepository.create({ title, description });
        const newTodo = await todoRepository.save(todo);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: '無効なデータです' });
    }
};

// 特定のTODOを取得
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const todo = await todoRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!todo) {
            res.status(404).json({ message: 'TODOが見つかりません' });
            return;
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
};

// TODOを更新
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, completed } = req.body;
        const todo = await todoRepository.findOneBy({ id: parseInt(req.params.id) });

        if (!todo) {
            res.status(404).json({ message: 'TODOが見つかりません' });
            return;
        }

        todo.title = title;
        todo.description = description;
        todo.completed = completed;

        const updatedTodo = await todoRepository.save(todo);
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: '無効なデータです' });
    }
};

// TODOを削除
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await todoRepository.delete(parseInt(req.params.id));
        if (result.affected === 0) {
            res.status(404).json({ message: 'TODOが見つかりません' });
            return;
        }
        res.status(200).json({ message: 'TODOが削除されました' });
    } catch (error) {
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
}; 