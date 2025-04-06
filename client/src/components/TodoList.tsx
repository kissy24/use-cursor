import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Checkbox,
    TextField,
    Button,
    Box,
    Paper,
    Typography
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Todo } from '../types/Todo';
import { todoApi } from '../api/todoApi';

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false });

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const data = await todoApi.getAll();
            setTodos(data);
        } catch (error) {
            console.error('TODOの読み込みに失敗しました:', error);
        }
    };

    const handleCreate = async () => {
        if (!newTodo.title || !newTodo.description) return;

        try {
            const created = await todoApi.create(newTodo);
            setTodos([...todos, created]);
            setNewTodo({ title: '', description: '', completed: false });
        } catch (error) {
            console.error('TODOの作成に失敗しました:', error);
        }
    };

    const handleUpdate = async (todo: Todo) => {
        try {
            const updated = await todoApi.update(todo.id, {
                ...todo,
                completed: !todo.completed
            });
            setTodos(todos.map(t => t.id === updated.id ? updated : t));
        } catch (error) {
            console.error('TODOの更新に失敗しました:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await todoApi.delete(id);
            setTodos(todos.filter(t => t.id !== id));
        } catch (error) {
            console.error('TODOの削除に失敗しました:', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                TODOリスト
            </Typography>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    label="タイトル"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    sx={{ mb: 1 }}
                />
                <TextField
                    fullWidth
                    label="説明"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    sx={{ mb: 1 }}
                />
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={!newTodo.title || !newTodo.description}
                >
                    追加
                </Button>
            </Box>

            <List>
                {todos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        sx={{
                            bgcolor: 'background.paper',
                            mb: 1,
                            borderRadius: 1
                        }}
                    >
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => handleUpdate(todo)}
                            color="primary"
                        />
                        <ListItemText
                            primary={todo.title}
                            secondary={todo.description}
                            sx={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? 'text.secondary' : 'text.primary'
                            }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDelete(todo.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}; 