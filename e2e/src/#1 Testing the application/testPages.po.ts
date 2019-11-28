import { browser, by, element } from "protractor";

export class TestPages {
  navigateTo() {
    return browser.get("/");
  }

  getSeasonsDefaultText() {
    return element(by.css("option:checked")).getText();
  }

  fillSearchField() {
    return element(by.css("input[formControlName=searchField]")).sendKeys("1");
  }

  getSearchButton() {
    return element(by.id("searchButton"));
  }

  getTableRows() {
    return element.all(by.tagName("tr"));
  }

  searchForOptionWithValue(value) {
    return element(by.cssContainingText("option", value)).click();
  }

  routeToFirstRowOfTable() {
    return element.all(by.tagName("td")).get(0);
  }

  clickThElementOfTable(number) {
    return element
      .all(by.tagName("th"))
      .get(number)
      .click();
  }

  getBackButton() {
    return element(by.css(".bckButton"));
  }
}
