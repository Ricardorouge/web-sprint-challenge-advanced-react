// Write your tests here
import React from 'react'
import {render,fireEvent,userEvent,screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppFunctional from './AppFunctional'


test('Renders without crashing',()=>{
  render(<AppFunctional/>)
})

beforeEach(()=>{
  render(<AppFunctional/>)
})

test('heading is rendering',()=>{
  const h3 = screen.getByTestId(/heading/i)
  expect(h3).toBeVisible()
  screen.debug()
})
test('renders submit button ',()=>{
  const submit = screen.getByTestId(/submit/i)
  expect(submit).toBeVisible()
})
test('renders keypad',()=>{
  const keypad = screen.getByTestId(/keypad/i)
  expect(keypad).toBeVisible()
})
test('typing in input changes value',()=>{
  const input = screen.getByTestId(/input/i)
  fireEvent.change(input,{target:{value:'foobar@gmail.com'}})
  expect(input).toHaveValue('foobar@gmail.com')
})
