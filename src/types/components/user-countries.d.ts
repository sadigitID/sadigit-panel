interface UserCountriesData {
  /**
   * The code of the country.
   * @type {string}
   * @example "US"
   * @description The code of the country. This will be used to identify the country in the data.
   */
  countryCode: string
  /**
   * The name of the country.
   * @type {string}
   * @example "United States"
   * @description The name of the country. This will be displayed as the label for the country in the data.
   */
  countryName: string
  /**
   * Count of users from the country.
   * @type {number}
   * @example 100
   * @description The count of users from the country. This will be used to display the number of users from the country in the data.
   */
  count: number
}

export interface UserCountriesProps {
  /**
   * The title of the user countries component.
   * @type {string}
   * @example "User Countries"
   * @description The title of the user countries component. This will be displayed as the main heading.
   */
  title: string
  /**
   * The data to display inside the user countries component.
   * @type {UserCountriesData[]}
   * @example [{ countryCode: "US", countryName: "United States", count: 100 }]
   * @description The data to display inside the user countries component. This will be used to display the list of countries and their respective user counts.
   */
  data: UserCountriesData[]
}
