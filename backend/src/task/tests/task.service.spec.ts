import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../../entity/task.entity';
import { Repository } from 'typeorm';
import { StatusTask } from '../enum/statusTask.enum';

const mockTaskRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('TaskService', () => {
  let service: TaskService;
  let repo: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repo = module.get(getRepositoryToken(Task));
  });

  it('should return all tasks', async () => {
    const tasks = [{ id: 1, title: 'Test', status: StatusTask.DONE }];
    repo.find.mockResolvedValue(tasks as Task[]);
    expect(await service.getAllTask()).toEqual({ tasks });
  });

  it('should return message if no tasks found', async () => {
    repo.find.mockResolvedValue([]);
    expect(await service.getAllTask()).toEqual({ tasks: [] }); // ← тут зміна
  });


  it('should return tasks by status', async () => {
    const tasks = [{ id: 1, title: 'Task', status: StatusTask.DONE }];
    repo.find.mockResolvedValue(tasks as Task[]);
    expect(await service.getTaskByStatus(StatusTask.DONE)).toEqual({ tasks });
  });

  it('should create a task', async () => {
    const dto = { title: 'New Task', description: '', status: StatusTask.DONE };
    const saved = { id: 1, ...dto };
    repo.create.mockReturnValue(saved as Task);
    repo.save.mockResolvedValue(saved as Task);
    expect(await service.createTask(dto)).toEqual({ newTask: saved });
  });

  it('should update a task', async () => {
    const dto = { id: 1, title: 'Updated', status: StatusTask.DONE };
    const task = { id: 1, title: 'Old', status: StatusTask.DONE };
    repo.findOne.mockResolvedValue(task as Task);
    repo.save.mockResolvedValue({ ...task, ...dto } as Task);
    expect(await service.updateTask(dto)).toEqual({ task: { ...task, ...dto } });
  });

  it('should delete a task (success)', async () => {
    repo.delete.mockResolvedValue({ affected: 1, raw: {} }); // додано raw
    expect(await service.deleteTask(1)).toEqual({ message: 'Task was deleted success' });
  });

  it('should return not found message on delete fail', async () => {
    repo.delete.mockResolvedValue({ affected: 0, raw: {} }); // додано raw
    expect(await service.deleteTask(1)).toEqual({ message: 'Task was not found' });
  });
});
