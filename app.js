const STORAGE_KEY = 'todo-list-items';
const THEME_KEY = 'todo-list-theme';

const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const emptyState = document.querySelector('#empty-state');
const remainingCount = document.querySelector('#remaining-count');
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
const themeLabel = document.querySelector('#theme-label');
const filterButtons = document.querySelectorAll('.filter-button');

// 目前的篩選條件,不需要保存到 localStorage
let currentFilter = 'all';

// 從 localStorage 讀取資料,格式不正確時使用空清單
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

// 將目前的待辦清單保存到 localStorage
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 目前所有待辦事項
let todos = loadTodos();

// 依照目前的篩選條件取得要顯示的待辦事項
function getVisibleTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

// 根據目前狀態顯示對應的空清單提示
function getEmptyMessage() {
  if (todos.length === 0) {
    return '還沒有任何待辦事項,新增一個吧!';
  }

  if (currentFilter === 'active') {
    return '目前沒有未完成的事項,切換到「全部」可查看其他待辦。';
  }

  return '目前沒有已完成的事項,切換到「全部」可查看其他待辦。';
}

// 依照資料重新繪製清單與統計數字
function renderTodos() {
  const visibleTodos = getVisibleTodos();
  list.replaceChildren();

  visibleTodos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item${todo.completed ? ' completed' : ''}`;
    item.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `完成「${todo.text}」`);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.textContent = '刪除';
    deleteButton.setAttribute('aria-label', `刪除「${todo.text}」`);

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  emptyState.hidden = visibleTodos.length > 0;
  emptyState.textContent = getEmptyMessage();
  remainingCount.textContent = `未完成:${todos.filter((todo) => !todo.completed).length} 項`;
}

// 套用主題並更新按鈕上的圖示與文字
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? '淺色模式' : '深色模式';
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

// 沒有手動選擇時,依照作業系統的顏色設定決定初始主題
function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
    return;
  }

  const followsDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(followsDarkMode ? 'dark' : 'light');
}

// 表單送出時新增待辦,空白內容直接忽略
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    return;
  }

  todos.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  input.value = '';
  input.focus();
});

// 用事件委派處理勾選與刪除
list.addEventListener('click', (event) => {
  const item = event.target.closest('.todo-item');
  if (!item) {
    return;
  }

  const todo = todos.find((currentTodo) => currentTodo.id === item.dataset.id);
  if (!todo) {
    return;
  }

  if (event.target.matches('input[type="checkbox"]')) {
    todo.completed = event.target.checked;
  } else if (event.target.matches('.delete-button')) {
    todos = todos.filter((currentTodo) => currentTodo.id !== todo.id);
  } else {
    return;
  }

  saveTodos();
  renderTodos();
});

// 切換篩選條件並更新目前按鈕的樣式
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((currentButton) => {
      const isActive = currentButton === button;
      currentButton.classList.toggle('is-active', isActive);
      currentButton.setAttribute('aria-pressed', String(isActive));
    });

    renderTodos();
  });
});

// 切換淺色與深色模式,並保存使用者的選擇
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
});

initializeTheme();
renderTodos();