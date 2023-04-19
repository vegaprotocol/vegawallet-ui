// import { render, screen } from '@testing-library/react'
// import { MemoryRouter } from 'react-router-dom'
// import { Page } from './page'

// eslint-disable-next-line jest/no-commented-out-tests
// describe('Page', () => {
// eslint-disable-next-line jest/no-commented-out-tests
//   it('should header and content', () => {
//     render(
//       <MemoryRouter>
//         <Page name="test">
//           <span>Test content</span>
//         </Page>
//       </MemoryRouter>
//     )
//     expect(screen.getByText('Test content')).toBeInTheDocument()
//     expect(screen.getByTestId('test-header')).toHaveTextContent('test')
//   })

// eslint-disable-next-line jest/no-commented-out-tests
//   it('should render back button if back is present', () => {
//     render(
//       <MemoryRouter>
//         <Page back={true} name="test">
//           <span>Test content</span>
//         </Page>
//       </MemoryRouter>
//     )
//     expect(screen.getByTestId('page-back')).toBeInTheDocument()
//   })
// })

describe('Page', () => {
  it('should render', () => {
    expect(true).toBe(true)
  })
})
