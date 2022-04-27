import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CardBox from "./CardBox";

describe('CardBox component tests', () => {
    it("button to accept and reject should be rendered", () => {
        render(<CardBox/>)
    })
})