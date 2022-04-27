import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Header from "./Header";


test("Header component tests", ()=>{
    render(<Header></Header>)
    expect(screen.getByRole('banner')).toHaveTextContent('Tinder for movies');
})