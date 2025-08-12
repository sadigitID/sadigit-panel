export interface DashboardResponse {
  status: boolean
  message: string
  data: AppDashboardData[]
}

export interface AppDashboardData {
  id: number
  title: string
  totalUser: number
  colorClass: ColorClass
  pageInfo: PageInfo
  sectionTitles: SectionTitles
  userCountries: CountryUsage[]
  growthSeries: ChartSeries[]
  growthChartOptions: ChartOptions
  upgradeSeries: ChartSeries[]
  upgradeChartOptions: ChartOptions
  dataExpired: TableData
  dataPengunjungTerbanyak: TableData
  upgradeLogs: UpgradeLog[]
}

export interface ColorClass {
  text: string
  bg: string
}

export interface PageInfo {
  image: string
  imageAlt: string
  title: string
  subtitle: string
}

export interface SectionTitles {
  totalUser: string
  countryUsage: string
  userGrowth: string
  upgradeStats: string
  reminderTitle: string
  reminderDesc: string
  topVisitorsTitle: string
  topVisitorsDesc: string
  logTitle: string
  logDesc: string
}

export interface CountryUsage {
  countryCode: string
  countryName: string
  count: number
}

export interface ChartSeries {
  name: string
  data: number[]
}

export interface ChartOptions {
  chart: {
    type: string
    toolbar: {
      show: boolean
    }
  }
  xaxis: {
    categories: string[]
    labels: {
      style: {
        colors: string
        fontSize: string
      }
    }
  }
  plotOptions: {
    bar: {
      borderRadius: number
      columnWidth: string
    }
  }
  dataLabels: {
    enabled: boolean
  }
  colors: string[]
  grid: {
    borderColor: string
  }
}

export interface TableData {
  head: string[]
  body: string[][]
}

export interface UpgradeLog {
  name: string
  id: string
  price: string
  duration: string
  date: string
}
