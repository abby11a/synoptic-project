import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { quizIndexState } from '../../store/state';
import { RecoilObserver } from '../login/login.test';
import { Quizzes } from './Quizzes';

describe('The quizzes page should', () => {
    test('change when the user clicks an item', () => {
        const onChange = jest.fn();
        
        render(
        <RecoilRoot>
            <RecoilObserver node={quizIndexState} onChange={onChange} />
            <Quizzes />
        </RecoilRoot>,
        );

        const component = screen.getByTestId(`quiz-item-0`);

        fireEvent.click(component);

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith({questions: false, index: 0}); // Initial state on render.
        expect(onChange).toHaveBeenCalledWith({questions: true, index: 0}); // New value on change.
    });
});