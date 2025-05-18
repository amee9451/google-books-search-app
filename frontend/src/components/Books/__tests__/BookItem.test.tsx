import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookItem from '../BookItem';
import { BookItemProps } from '../../../types/Books/Book.types';
import { UNNOWN_AUTHOR, DESCRIPTION } from '../../../constants/Book';
describe('BookItem Component', () => {
  // Properly typed mock data that matches BookItemProps['book']
  const mockBook: BookItemProps['book'] = {
    id: '1',
    volumeInfo: {
      title: 'The Pragmatic Programmer',
      authors: ['Andy Hunt'],
      publishedDate: '1999-10-30',
      description: 'A classic book on software engineering',
      publisher: 'Addison-Wesley',
      imageLinks: {
        thumbnail: '',
        smallThumbnail: '',
      },
    },
    // Only include these if they're in your Book type
    title: 'The Pragmatic Programmer',
    authors: ['Andy Hunt'],
    publishedDate: '1999-10-30',
    description: 'A classic book on software engineering',
    publisher: 'Addison-Wesley',
    smallThumbnail: '',
    previewLink: 'http://test.test/test',
    listPriceAmount: 39.99,
  };

  const renderComponent = (props?: Partial<BookItemProps>) => {
    return render(<BookItem book={{ ...mockBook, ...props?.book }} />);
  };

  it('renders collapsed view by default', () => {
    renderComponent();

    expect(screen.getByText(/Andy Hunt/)).toBeInTheDocument();
    expect(screen.getByText(/The Pragmatic Programmer/)).toBeInTheDocument();
    expect(screen.queryByText(DESCRIPTION)).not.toBeInTheDocument();
  });

  it('expands when clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button'));

    // Verify expanded content using data-testid
    expect(screen.getByTestId('book-description')).toBeInTheDocument();
    expect(screen.getByTestId('book-price')).toHaveTextContent('$39.99');
    expect(screen.getByTestId('published-date')).toHaveTextContent('1999-10-30');
    expect(screen.getByTestId('publisher')).toHaveTextContent('Addison-Wesley');
    expect(screen.getByTestId('preview-link')).toBeInTheDocument();
  });

  it('shows unknown author when no authors provided', () => {
    renderComponent({
      book: {
        authors: undefined as unknown as string[],
        title: '',
        publishedDate: '',
        description: '',
        publisher: '',
        smallThumbnail: '',
        previewLink: '',
        listPriceAmount: 0,
        id: '',
        volumeInfo: {
          title: '',
          authors: undefined,
          description: undefined,
          imageLinks: undefined,
          publishedDate: undefined,
        },
      },
    });
    expect(screen.getByText(UNNOWN_AUTHOR)).toBeInTheDocument();
  });
  it('shows "No description available" when description is missing', () => {
    renderComponent({
      book: {
        description: undefined as unknown as string,
        title: '',
        authors: [],
        publishedDate: '',
        publisher: '',
        smallThumbnail: '',
        previewLink: '',
        listPriceAmount: 0,
        id: '',
        volumeInfo: {
          title: '',
          authors: undefined,
          description: undefined,
          imageLinks: undefined,
          publishedDate: undefined,
        },
      },
    });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/No description available/)).toBeInTheDocument();
  });

  it('does not show price when listPriceAmount is not provided', () => {
    renderComponent({
      book: {
        listPriceAmount: undefined as unknown as number,
        title: '',
        authors: [],
        publishedDate: '',
        description: '',
        publisher: '',
        smallThumbnail: '',
        previewLink: '',
        id: '',
        volumeInfo: {
          title: '',
          authors: undefined,
          description: undefined,
          imageLinks: undefined,
          publishedDate: undefined,
        },
      },
    });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Price:')).not.toBeInTheDocument();
  });
});
