import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { TaskService } from '../task.service';
import { StatusTask } from '../enum/statusTask.enum';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockService = {
    getAllTask: jest.fn(),
    getTaskByStatus: jest.fn(),
    getFilterTask: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockService }],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should return all tasks', async () => {
    const result = { tasks: [] };
    jest.spyOn(service, 'getAllTask').mockResolvedValue(result);
    expect(await controller.getAllTask()).toBe(result);
  });

  it('should return tasks by status', async () => {
    const result = { tasks: [] };
    jest.spyOn(service, 'getTaskByStatus').mockResolvedValue(result);
    expect(await controller.getTaskByStatus(StatusTask.DONE)).toBe(result);
  });

  it('should filter tasks', async () => {
    const result = { tasks: [] };
    jest.spyOn(service, 'getFilterTask').mockResolvedValue(result);
    expect(await controller.getFilterTask('test')).toBe(result);
  });

  it('should create a task', async () => {
    const dto = { title: 'Task', description: '', status: StatusTask.NOT_DONE };
    const result = { newTask: { id: 1, ...dto } };
    jest.spyOn(service, 'createTask').mockResolvedValue(result);
    expect(await controller.createTask(dto)).toBe(result);
  });

  it('should update a task', async () => {
    const dto = { id: 1, title: 'Updated', status: StatusTask.DONE, description: 'Description'};
    const result = { task: dto };
    jest.spyOn(service, 'updateTask').mockResolvedValue(result);
    expect(await controller.updateTask(dto)).toBe(result);
  });

  it('should delete a task', async () => {
    const result = { message: 'Task was deleted success' };
    jest.spyOn(service, 'deleteTask').mockResolvedValue(result);
    expect(await controller.deleteTask(1)).toBe(result);
  });
});
