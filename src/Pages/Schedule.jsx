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

  // Jadwal Piket Biasa (existing)
  const regularPiketGroup = [
    ["Victor","Agus","Hudha","Zakki","Akbar","Andre","Aris","Asri","Aswin"],
    ["Aurelius","Bowo","Candra","Danang","Daniel","Davin","Herlyno","Diky","Dita"],
    ["Elsa","Fawas","Ferindo","Galang","Hana","Haryadi","Marisa","Maylinda"],
    ["Mei","Miftah","Huda","Aziz","Rizky","Nadien","Nanda","Pratama"],
    ["Putri","Siska","Sony","Suci","Unggun","Zalfa","Wahyu","Vicky"]
  ]

  // Jadwal Piket MBG per Kloter (5 hari per kloter)
  const mbgKloter = [
    ["Viktor", "Agus", "Hudha", "Zaki", "Unggul", "Zalfa"],
    ["Aris", "Asih", "Aswin", "Aurelius", "Andre"],
    ["Bowo", "Candra", "Danang", "Daniel", "Davin"],
    ["Herlyno", "Diky", "Dita", "Elsa", "Fawaz"],
    ["Feri", "Jalu", "Linda", "Haryadu", "Marisa"],
    ["May", "Mey", "Miftha", "Huda", "Aziz"],
    ["Rizky", "Nadien", "Nanda", "Riksan", "Putri"],
    ["Siska", "Sony", "Arum", "Unggun", "Farel", "Gilang"]
  ]

  // Hitung kloter aktif berdasarkan hari (ganti setiap hari)
  const getCurrentKloter = () => {
    // Tanggal referensi: 27 Oktober 2025 (Senin) = Kloter 4
    const startDate = new Date("2025-10-27")
    const today = new Date()
    
    // Reset waktu ke tengah malam untuk perhitungan hari yang akurat
    startDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    
    const diffMs = today.getTime() - startDate.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    // Hitung hari kerja yang sudah berlalu (skip weekend)
    let workDays = 0
    const tempDate = new Date(startDate)
    while (tempDate <= today) {
      const dayOfWeek = tempDate.getDay()
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Senin-Jumat
        workDays++
      }
      tempDate.setDate(tempDate.getDate() + 1)
    }
    
    // Kloter 4 dimulai 27 Oktober (hari kerja pertama = 0)
    // Setiap hari ganti kloter
    const kloterIndex = (3 + workDays - 1) % mbgKloter.length
    
    return {
      number: kloterIndex + 1,
      members: mbgKloter[kloterIndex]
    }
  }

  const dayComponents = [null, Senin, Selasa, Rabu, Kamis, Jumat]
  const TodayComponent = dayComponents[todayIndex] || null

  // Ambil data piket untuk hari ini
  const currentRegularPiket = regularPiketGroup[todayIndex - 1] || []
  const currentKloter = getCurrentKloter()
  const currentMBGPiket = (todayIndex >= 1 && todayIndex <= 5) ? currentKloter.members : []

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
            Kloter {currentKloter.number}
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