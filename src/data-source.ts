import { DataSource } from "typeorm";
import { Todo } from "./models/Todo";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "todo.sqlite",
    synchronize: true,
    logging: true,
    entities: [Todo],
    subscribers: [],
    migrations: [],
}); 