import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'Could not find any recipes. Please, try again!';
  _message = '';

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;

    // Page 1 and there are other numPages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', currentPage);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', currentPage);
    }

    // Middle page
    if (currentPage < numPages) {
      return (
        this._generateMarkupButton('prev', currentPage) +
        this._generateMarkupButton('next', currentPage)
      );
    }

    // Page 1 and there are no other numPages
    return '';
  }

  _generateMarkupButton(direction, currentPage) {
    return `
        <button data-goto="${
          direction === 'prev' ? currentPage - 1 : currentPage + 1
        }" class="btn--inline pagination__btn--${direction}">
          ${
            direction === 'prev'
              ? `<svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>`
              : ''
          }
          <span>Page ${
            direction === 'prev' ? currentPage - 1 : currentPage + 1
          }</span>
          ${
            direction === 'next'
              ? `<svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>`
              : ''
          }
        </button>`;
  }
}

export default new PaginationView();
