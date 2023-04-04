import icons from 'url:../../img/icons.svg';
import View from './View';
import { RES_PER_PAGE } from '../config';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const nextPage = `
    <button data-goto="${
      curPage + 1
    }"  class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    const prevPage = `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
  `;

    console.log(numPages);
    //Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      ${nextPage}
    `;
    }

    //Last Page
    if (curPage === numPages && numPages > 1) {
      return `
      ${prevPage}
      `;
    }
    // Other Page
    if (curPage < numPages) {
      return `
    ${prevPage}
    ${nextPage}
    `;
    }

    //Page 1, and there are no other pages
    return '';
  }
  addHandlerPagination(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      e.preventDefault();
      const btn = e.target.closest(`.btn--inline`);
      if(!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
}

export default new PaginationView();
