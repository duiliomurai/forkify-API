import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
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
    const curPage = this._data.page;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1)
      return `${this._generateMarkupButtonNext(curPage)}`;

    // Last page
    if (curPage === numPages && numPages > 1)
      return `${this._generateMarkupButtonPrevious(curPage)}`;

    // Other page
    if (curPage < numPages && numPages > 1) {
      return `${this._generateMarkupButtonPrevious(curPage)}
      ${this._generateMarkupButtonNext(curPage)}`;
    }

    // Page 1, and there aren't other pages
  }

  _generateMarkupButtonNext(page) {
    return ` 
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
  }

  _generateMarkupButtonPrevious(page) {
    return ` 
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
            <span>Page ${page - 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
        </button>`;
  }
}

export default new PaginationView();
