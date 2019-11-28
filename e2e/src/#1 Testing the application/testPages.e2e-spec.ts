import { TestPages } from "./testPages.po";
import { browser, element, by } from "protractor";

describe("#1 Check List View page", () => {
  let page: TestPages;

  beforeEach(() => {
    page = new TestPages();
  });

  it(".1 Select season's text should be select round", () => {
    page.navigateTo();
    expect(page.getSeasonsDefaultText()).toEqual("Select round.");
  });

  it(".2 Fill search field", () => {
    expect(page.fillSearchField());
  });

  it(".3 Search in the table", () => {
    expect(page.getSearchButton().click());
  });

  it(".4 Get some results", () => {
    expect(page.getTableRows().count()).toBeGreaterThanOrEqual(1);
  });

  it(".5 Filter seasons field", () => {
    expect(page.searchForOptionWithValue("1950"));
  });

  it(".6 Get some results", () => {
    expect(page.getTableRows().count()).toBeGreaterThanOrEqual(1);
  });

  it(".7 Check routing to driver's details", () => {
    expect(page.routeToFirstRowOfTable().click());
  });

  it(".8 Check that table is not empty", () => {
    expect(page.getTableRows().count()).toBeGreaterThanOrEqual(1);
  });

  it(".9 Browser's url should be : 'http://localhost:4200/driverDetails' ", () => {
    expect(browser.getCurrentUrl()).toEqual(
      "http://localhost:4200/driverDetails"
    );
  });

  it(".10 Click Laps field", () => {
    expect(page.clickThElementOfTable(5));
  });

  it(".11 Check if laps are sorted", () => {
    var ele = element.all(by.css("table tr td:nth-of-type(6)"));
    ele
      .map(function(eachName) {
        return eachName.getText().then(function(unSorted) {
          return unSorted;
        });
      })
      .then(function(unSorted) {
        var sorted = unSorted;
        sorted = sorted.sort(); //sort the array
        expect(sorted).toEqual(unSorted); //check if both sorted and unsorted arrays are same
      });
  });
  it(".12 Click Grid field", () => {
    expect(page.clickThElementOfTable(4));
  });

  it(".13 Check if Grids are sorted", () => {
    var ele = element.all(by.css("table tr td:nth-of-type(5)"));
    ele
      .map(function(eachName) {
        return eachName.getText().then(function(unSorted) {
          return unSorted;
        });
      })
      .then(function(unSorted) {
        var sorted = unSorted;
        sorted = sorted.sort(); //sort the array
        expect(sorted).toEqual(unSorted); //check if both sorted and unsorted arrays are same
      });
  });

  it(".14 Check routing back", () => {
    expect(page.getBackButton().click());
  });

  it(".15 Browser's url should be: 'http://localhost:4200/driverStandings'", () => {
    expect(browser.getCurrentUrl()).toEqual(
      "http://localhost:4200/driverStandings"
    );
  });
});
