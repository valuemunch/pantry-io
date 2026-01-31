import { render, screen, fireEvent } from '@testing-library/react'
import { IngredientInput } from '../IngredientInput'
import { vi, describe, it, expect } from 'vitest'

// Mock the server action
vi.mock('@/app/actions', () => ({
  getRandomCuisine: vi.fn(),
}))

describe('IngredientInput', () => {
  it('shows error when less than 3 ingredients are entered', () => {
    render(<IngredientInput />)
    
    const input = screen.getByLabelText(/Enter 3 Pantry Staples/i)
    const button = screen.getByRole('button', { name: /What's for Dinner\?/i })

    fireEvent.change(input, { target: { value: 'chicken, tomato' } })
    fireEvent.click(button)

    expect(screen.getByText(/Please enter exactly 3 ingredients/i)).toBeInTheDocument()
  })

  it('shows error when an ingredient is too short', () => {
    render(<IngredientInput />)
    
    const input = screen.getByLabelText(/Enter 3 Pantry Staples/i)
    const button = screen.getByRole('button', { name: /What's for Dinner\?/i })

    fireEvent.change(input, { target: { value: 'a, chicken, tomato' } })
    fireEvent.click(button)

    expect(screen.getByText(/must be between 2 and 25 characters/i)).toBeInTheDocument()
  })

  it('clears error on input change', () => {
    render(<IngredientInput />)
    
    const input = screen.getByLabelText(/Enter 3 Pantry Staples/i)
    const button = screen.getByRole('button', { name: /What's for Dinner\?/i })

    fireEvent.change(input, { target: { value: 'invalid' } })
    fireEvent.click(button)
    expect(screen.getByText(/Please enter exactly 3 ingredients/i)).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'valid, data, here' } })
    expect(screen.queryByText(/Please enter exactly 3 ingredients/i)).not.toBeInTheDocument()
  })
})
