/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element !== undefined){
      this.element = element;
      this.registerEvents();
    }
    else
    return new Error('Необходимо передать параметр element');
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.querySelector('.create-income-button').onclick = e => { 
      App.getModal('newIncome').open();
    }

    this.element.querySelector('.create-expense-button').onclick = e => { 
      App.getModal('newExpense').open();
    }
  }
}
