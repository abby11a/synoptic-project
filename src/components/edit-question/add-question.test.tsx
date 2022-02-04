import { act, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { answerState, IAtomOrSelector, loginUserState } from '../../store/state';
import { AddQuestion } from './AddQuestion';

export const RecoilObserver = ({node, onChange}: IAtomOrSelector) => {
    const value = useRecoilValue(node);
    React.useEffect(() => onChange(value), [onChange, value]);
    return null;
  };
  
// act and advance jest timers
export function flushPromisesAndTimers(): Promise<void> {
    return act(
      () =>
        new Promise(resolve => {
          setTimeout(resolve, 100);
          jest.runAllTimers();
        }),
    );
}

describe('The add question page should', () => {
    test('change when the user enters a question.', () => {
        const onChange = jest.fn();

        render(
        <RecoilRoot>
            <RecoilObserver node={answerState} onChange={onChange} />
            <AddQuestion />
        </RecoilRoot>,
        );

        const component = screen.getByPlaceholderText("Enter New Question");

        fireEvent.change(component, {target: {value: 'mock-question'}});

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith({question:'', a: '', b: '', c: '', d:'', e:'', correct: ''});
        expect(onChange).toHaveBeenCalledWith({question:'mock-question', a: '', b: '', c: '', d:'', e:'', correct: ''});
    });

    test('change as expected when the user enters a question and 3 answers.', () => {
        const onChange = jest.fn();

        render(
        <RecoilRoot>
            <RecoilObserver node={answerState} onChange={onChange} />
            <AddQuestion />
        </RecoilRoot>,
        );

        const component = screen.getByPlaceholderText("Enter New Question");
        const answerA = screen.getByPlaceholderText("Enter Answer A" );
        const answerB = screen.getByPlaceholderText("Enter Answer B" );
        const answerC = screen.getByPlaceholderText("Enter Answer C" );
        
        fireEvent.change(component, {target: {value: 'mock-question'}});
        fireEvent.change(answerA, {target: {value: 'answer A'}});
        fireEvent.change(answerB, {target: {value: 'answer B'}});
        fireEvent.change(answerC, {target: {value: 'answer C'}});

        expect(onChange).toHaveBeenCalledTimes(5);
        expect(onChange).toHaveBeenCalledWith({question:'', a: '', b: '', c: '', d:'', e:'', correct: ''});
        expect(onChange).toHaveBeenCalledWith({question:'mock-question', a: '', b: '', c: '', d:'', e:'', correct: ''});
        expect(onChange).toHaveBeenCalledWith({question:'mock-question', a: 'answer A', b: '', c: '', d:'', e:'', correct: ''});
        expect(onChange).toHaveBeenCalledWith({question:'mock-question', a: 'answer A', b: 'answer B', c: '', d:'', e:'', correct: ''});
        expect(onChange).toHaveBeenCalledWith({question:'mock-question', a: 'answer A', b: 'answer B', c: 'answer C', d:'', e:'', correct: ''});
    });
});
