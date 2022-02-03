import { act, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { IAtomOrSelector, loginUserState } from '../../store/state';
import { Login } from './Login';

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

describe('The login page should', () => {
    test('change when the user enters a name.', () => {
        const onChange = jest.fn();

        render(
        <RecoilRoot>
            <RecoilObserver node={loginUserState} onChange={onChange} />
            <Login />
        </RecoilRoot>,
        );

        const component = screen.getByTestId("login-username");

        fireEvent.change(component, {target: {value: 'mock-username'}});

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith({"password": "", "username": ""}); // Initial state on render.
        expect(onChange).toHaveBeenCalledWith({"password": "", "username": "mock-username"}); // New value on change.
    });
    test('change when the user enters a password.', () => {
        const onChange = jest.fn();

        render(
        <RecoilRoot>
            <RecoilObserver node={loginUserState} onChange={onChange} />
            <Login />
        </RecoilRoot>,
        );

        const component = screen.getByTestId("login-password");

        fireEvent.change(component, {target: {value: 'mock-password'}});

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith({"password": "", "username": ""}); // Initial state on render.
        expect(onChange).toHaveBeenCalledWith({"password": "mock-password", "username": ""}); // New value on change.
    });
});