import axios from 'axios';
import { Todo } from '../types/Todo';

const API_URL = 'http://localhost:3000/api/todos';

export const todoApi = {
    getAll: async (): Promise<Todo[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    create: async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> => {
        const response = await axios.post(API_URL, todo);
        return response.data;
    },

    update: async (id: number, todo: Partial<Todo>): Promise<Todo> => {
        const response = await axios.put(`${API_URL}/${id}`, todo);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
}; 