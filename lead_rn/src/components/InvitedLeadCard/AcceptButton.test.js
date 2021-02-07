import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import AcceptButton from './AcceptButton';

describe("AcceptButton test suite", () => {
    test("AcceptButton render output testing", async () => {
        const { getByText } = render(
            <AcceptButton />,
        );
        const button = getByText('Accept');
        expect(button).toBeTruthy();
    });
    test("Simulates click", async () => {
        const clickMe = jest.spyOn(Alert, 'alert')
        // Rendering Button component using react-native-test-renderer.
        const { getByText } = render(
            <AcceptButton onButtonPress={clickMe} />,
        );
        const button = getByText('Accept');
        fireEvent.press(button);
        expect(clickMe).toHaveBeenCalled();
    });
});