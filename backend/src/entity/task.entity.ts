import { StatusTask } from "../task/enum/statusTask.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Task {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({default: StatusTask.NOT_DONE})
    status: StatusTask;
}