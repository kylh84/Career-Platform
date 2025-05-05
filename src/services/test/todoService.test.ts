import todoService from '../todoService';

describe('todoService', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  // Test case 1: Kiểm tra thêm và lấy danh sách todo
  test('addTodo và getAllTodos hoạt động đúng', () => {
    expect(todoService.getAllTodos()).toEqual([]);
    const todo = todoService.addTodo('Viết test');
    expect(todo.title).toBe('Viết test');
    expect(todoService.getAllTodos()).toHaveLength(1);
  });
  // Test case 2: Kiểm tra chuyển đổi trạng thái completed
  test('toggleTodoStatus chuyển đổi trạng thái completed', () => {
    const todo = todoService.addTodo('Toggle');
    expect(todo.completed).toBe(false);
    const toggled = todoService.toggleTodoStatus(todo.id);
    expect(toggled?.completed).toBe(true);
  });
  // Test case 3: Kiểm tra xóa todo
  test('deleteTodo xóa đúng todo', () => {
    const todo = todoService.addTodo('Xóa');
    expect(todoService.deleteTodo(todo.id)).toBe(true);
    expect(todoService.getAllTodos()).toHaveLength(0);
  });
  // Test case 4: Kiểm tra cập nhật tiêu đề todo
  test('updateTodoTitle cập nhật tiêu đề', () => {
    const todo = todoService.addTodo('Cũ');
    const updated = todoService.updateTodoTitle(todo.id, 'Mới');
    expect(updated?.title).toBe('Mới');
  });
});
