import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const Senin = React.lazy(() => import("../components/Mapel/Senin"))
const Selasa = React.lazy(() => import("../components/Mapel/Selasa"))
const Rabu = React.lazy(() => import("../components/Mapel/Rabu"))
const Kamis = React.lazy(() => import("../components/Mapel/Kamis"))
const Jumat = React.lazy(() => import("../components/Mapel/Jumat"))

const Schedule = () => {
  const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumnat", "Sabtu"]
  const todayIndex = new Date().getDay()
  const currentDay = daysOfWeek[todayIndex]

  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  // Daftar siswa urut absen 1–42
  const students = [
    "Victor","Agus","Ahmad","Zakki","Akbar",
    "Andre","Aris","Asri","Aswin","Aurelius",
    "Bowo","Candra","Danang","Daniel","Davin",
    "Herlyno","Diky","Dita","Elsa","Fawas",
    "Ferindo","Galang","Hana","Haryadi","Marisa",
    "Maylinda","Mei","Miftah","Huda","Aziz",
    "Rizky","Nadien","Nanda","Pratama","Putri",
    "Siska","Sony","Suci","Unggun","Vicky",
    "Wahyu","Zalfa"
  ]

  // Jadwal Piket Biasa (existing)
  const regularPiketGroup = [
    ["Victor","Agus","Hudha","Zakki","Akbar","Andre","Aris","Asri","Aswin"],
    ["Aurelius","Bowo","Candra","Danang","Daniel","Davin","Herlyno","Diky","Dita"],
    ["Elsa","Fawas","Ferindo","Galang","Hana","Haryadi","Marisa","Maylinda"],
    ["Mei","Miftah","Huda","Aziz","Rizky","Nadien","Nanda","Pratama"],
    ["Putri","Siska","Sony","Suci","Unggun","Zalfa","Wahyu","Vicky"]
  ]

  // Hitung minggu berjalan sejak tanggal referensi
  const getCurrentWeekNumber = () => {
    const startDate = new Date("2025-09-15")
    const diffMs = Date.now() - startDate.getTime()
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))
    return diffWeeks + 1
  }

  // Buat jadwal MBG per minggu, 5 hari × 5 siswa, melingkar tanpa ulang
  const getWeeklyMBGSchedule = (weekNum) => {
    const perDay = 5, days = 5
    const startIdx = (weekNum - 1) * perDay * days
    const schedule = {}
    for (let d = 1; d <= days; d++) {
      schedule[d] = []
      for (let i = 0; i < perDay; i++) {
        const idx = (startIdx + (d-1)*perDay + i) % students.length
        schedule[d].push(students[idx])
      }
    }
    return schedule
  }

  const dayComponents = [null, Senin, Selasa, Rabu, Kamis, Jumat]
  const TodayComponent = dayComponents[todayIndex] || null

  // Ambil data piket untuk hari ini
  const currentRegularPiket = regularPiketGroup[todayIndex - 1] || []
  const currentWeek = getCurrentWeekNumber()
  const mbgSchedule = getWeeklyMBGSchedule(currentWeek)
  const currentMBGPiket = mbgSchedule[todayIndex] || []

  return (
    <>
      {/* Jadwal Mapel */}
      <div className="lg:flex lg:justify-center lg:gap-32 lg:mb-10 lg:mt-16">
        <div className="text-white flex flex-col items-center mt-8 overflow-y-hidden">
          <div className="text-2xl font-medium mb-5" data-aos="fade-up" data-aos-duration="500">
            {currentDay}
          </div>
          <div data-aos="fade-up" data-aos-duration="400">
            {TodayComponent ? (
              <React.Suspense fallback={<p>Loading...</p>}>
                <TodayComponent />
              </React.Suspense>
            ) : (
              <p className="opacity-50">Tidak Ada Jadwal Hari Ini</p>
            )}
          </div>
        </div>
      </div>

      {/* Jadwal Piket */}
      <div className="lg:flex lg:justify-center lg:gap-16 lg:mb-10">
        {/* Piket Biasa */}
        <div className="text-white flex flex-col items-center mt-8 overflow-y-hidden">
          <div className="text-2xl font-medium mb-5 text-center" data-aos="fade-up" data-aos-duration="500">
            Piket Biasa
          </div>
          {currentRegularPiket.length > 0 ? (
            currentRegularPiket.map((name, i) => (
              <div
                key={i}
                className={`border-t-2 border-white flex justify-center py-2 w-72 ${i === currentRegularPiket.length-1 ? "border-b-2" : ""}`}
                data-aos="fade-up"
                data-aos-duration={600 + i * 100}
              >
                <span className="text-base font-medium">{name}</span>
              </div>
            ))
          ) : (
            <p className="opacity-50">Tidak Ada Jadwal Hari Ini</p>
          )}
        </div>

        {/* Piket MBG */}
        <div className="text-white flex flex-col items-center mt-8 overflow-y-hidden">
          <div className="text-2xl font-medium mb-2 text-center" data-aos="fade-up" data-aos-duration="500">
            Piket MBG
          </div>
          <div className="text-sm font-medium mb-5 opacity-75" data-aos="fade-up" data-aos-duration="550">
            Minggu {currentWeek}
          </div>
          {currentMBGPiket.length > 0 ? (
            currentMBGPiket.map((name, i) => (
              <div
                key={i}
                className={`border-t-2 border-blue-400 flex justify-center py-2 w-72 ${i === currentMBGPiket.length-1 ? "border-b-2" : ""}`}
                data-aos="fade-up"
                data-aos-duration={600 + i * 100}
              >
                <span className="text-base font-medium">{name}</span>
              </div>
            ))
          ) : (
            <p className="opacity-50">Tidak Ada Jadwal Hari Ini</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Schedule
