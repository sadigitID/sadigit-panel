export interface TableDataOfferOrContract {
  head: string[]
  body: string[][]
}

export interface OffersOrContractResponse {
  status: boolean
  message: string
  data: TableDataOfferOrContract
}
