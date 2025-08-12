interface TableHead {
  /**
   * The text to display in the table header.
   * @type {string}
   * @example "Name"
   * @description The text to display in the table header. This will be displayed as the title of the column.
   */
  text: string
  /**
   * The class to apply to the table header.
   * @type {string}
   * @example "text-center"
   * @description The class to apply to the table header. This will be used for styling purposes.
   */
  class?: string
}

interface TableBody {
  /**
   * The text to display in the table body.
   * @type {string}
   * @example "John Doe"
   * @description The text to display in the table body. This will be displayed as the content of the cell.
   */
  text: string
  /**
   * The class to apply to the table body.
   * @type {string}
   * @example "text-left"
   * @description The class to apply to the table body. This will be used for styling purposes.
   */
  class?: string
}

export interface TableData {
  /**
   * The title of the table.
   * @type {string[] | TableHead[]}
   * @example "[User List] or [{ text: 'User List', class: 'text-center' }]"
   * @description The title of the table. This will be displayed as the main heading of the table.
   * If an array of objects is provided, each object should contain a `text` property for the title and an optional `class` property for styling.
   */
  head: (string | TableHead)[]
  /**
   * The data to display in the table body.
   * @type {string[][] | TableBody[][]}
   * @example "[[John Doe]] or [[{ text: 'John Doe', class: 'text-left' }]]"
   * @description The data to display in the table body. This will be displayed as the content of the cells.
   * If an array of objects is provided, each object should contain a `text` property for the content and an optional `class` property for styling.
   */
  body: (string | TableBody)[][]
}

export interface AppTableProps {
  /**
   * The data to display in the table.
   * @type {TableData}
   * @example { head: [{ text: 'Name', class: 'text-center' }], body: [['John Doe', { text: 'Active', class: 'text-success' }]] }
   * @description The data to display in the table. This will be used to render the table headers and body.
   * The `head` property can be array strings or objects, if an object is provided, it should contain a `text` property for the title and an optional `class` property for styling.
   * The `body` property can be array strings or objects, if an object is provided, it should contain a `text` property for the content and an optional `class` property for styling.
   */
  data: TableData
}
