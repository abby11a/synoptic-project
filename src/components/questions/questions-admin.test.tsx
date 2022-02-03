import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { questionNumberState } from '../../store/state';
import { RecoilObserver } from '../login/login.test';
import { QuestionsAdmin } from './Questions-Admin';

describe('The admin questions page should', () => {
    test('change the question number when the user clicks an item', () => {
        const onChange = jest.fn();
        
        render(
        <RecoilRoot>
            <RecoilObserver node={questionNumberState} onChange={onChange} />
            <QuestionsAdmin />
        </RecoilRoot>,
        );

        const component = screen.getByTestId(`question-item-box-1`);

        fireEvent.click(component);

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith(0); // Initial state on render.
        expect(onChange).toHaveBeenCalledWith(1); // New value on change.
    });
});