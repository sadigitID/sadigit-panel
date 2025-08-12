import { prayerAPI } from '@/services/axios'
import type { SalatTimeResponse, SalatTimes } from '@/types/services/salat-time-service'

/**
 * Fetches salat times for a specific country and city.
 * Returns only the prayer timings, not the full response structure.
 *
 * @param country - A country name or 2 character alpha ISO 3166 codes
 * @param city - Name of the city
 * @param date - Specific gregorian date in DD-MM-YYYY format
 * @returns A Promise that resolves to SalatTimings
 */
export const getSalatTimes = async (
  country: string,
  city: string,
  date: string
): Promise<SalatTimes[]> => {
  const { data } = await prayerAPI.get<SalatTimeResponse>('/timingsByCity', {
    params: {
      country,
      city,
      date
    }
  })

  if (data.code !== 200) {
    throw new Error('Failed to fetch salat times')
  }

  const { timings } = data.data

  return [
    {
      name: 'Subuh',
      start: timings.Fajr,
      end: timings.Sunrise
    },
    {
      name: 'Dzuhur',
      start: timings.Dhuhr,
      end: timings.Asr
    },
    {
      name: 'Ashar',
      start: timings.Asr,
      end: timings.Sunset
    },
    {
      name: 'Maghrib',
      start: timings.Sunset,
      end: timings.Isha
    },
    {
      name: 'Isya',
      start: timings.Isha,
      end: timings.Fajr
    }
  ]
}
