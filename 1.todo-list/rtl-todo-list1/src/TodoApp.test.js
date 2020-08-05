import React from 'react';
import TodoApp from './TodoApp';
import { render } from 'react-testing-library';
import { fireEvent } from '@testing-library/react';

describe('<TodoApp />', () => {
  it('renders TodoForm and TodoList', () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    getByText('등록'); // TodoForm 존재유무 
    getByTestId('TodoList'); // TodoList 존재유무 
  });

  it('render two defaults todos', () => {
      const { getByText} = render(<TodoApp />);
      getByText('TDD 배우기');
      getByText('react-testing-library 사용하기');
  });

  it('creates new todo', () => {
      const { getByPlaceholderText, getByText } = render(<TodoApp />);
      //이벤트 발생시켜서 새 항목을 추가하면
      fireEvent.change(getByPlaceholderText('할 일을 입력하세요'), {
          target: {
              value:'새 항목 추가하기'
          }
        });
        fireEvent.click(getByText('등록'));
        //해당학목이 보여져야함
        getByText('새 항목이 추가하기');
    });

    it('toggle todo', () => {
        const { getByText } = render(<TodoApp />);
        //TDD 배우기 항목에 클릭 이벤트 발생시키고 text-decoration 속성이 설정되는지 확인
        const todoText = getByText('TDD 배우기');
        expect(todoText).toHaveStyle('text-decoration : line-through;');
        fireEvent.click(todoText);
        expect(todoText).not.toHaveStyle('text-decoration: line-through;');
        fireEvent.click(todoText);
        expect(todoText).toHaveStyle('text-decoration: line-through;');
    });

    it('removes todo', () => {
        const { getByText } = render(<TodoApp />);
        const todoText = getByText('TDD 배우기');
        const removeButton = todoText.nextSibling;
        fireEvent.click(removeButton);
        expect (todoText).not.toBeInTheDocument(); //페이지에서 사라졌음을 의미함
    });
});

