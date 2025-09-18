import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const Senin = React.lazy(() => import("../components/Mapel/Senin"))
const Selasa = React.lazy(() => import("../components/Mapel/Selasa"))
const Rabu = React.lazy(() => import("../components/Mapel/Rabu"))
const Kamis = React.lazy(() => import("../components/Mapel/Kamis"))
const Jumat = React.lazy(() => import("../components/Mapel/Jumat"))

const Schedule = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDay = daysOfWeek[new Date().getDay()]
    
    useEffect(() => {
        AOS.init()
        AOS.refresh()
    }, [])

    // Data siswa berdasarkan nomor absen
    const students = [
        "Victor", "Agus", "Ahmad", "Zakki", "Akbar", "Andre", "Aris", "Asri", "Aswin",
        "Aurelius", "Bowo", "Candra", "Danang", "Daniel", "Davin", "Herlyno", "Diky", "Dita",
        "Elsa", "Fawas", "Ferindo", "Galang", "Hana", "Haryadi", "Marisa", "Maylinda",
        "Mei", "Miftah", "Huda", "Aziz", "Rizky", "Nadien", "Nanda", "Pratama",
        "Putri", "Siska", "Sony", "Suci", "Unggun", "Vicky", "Wahyu", "Zalfa"
    ]

    // Jadwal Piket Biasa (existing)
    const regularPiketGroup = [
        ["Victor","Agus","Hudha","Zakki","Akbar","Andre","Aris","Asri","Aswin"],
        ["Aurelius", "Bowo", "Candra", "Danang", "Daniel","Davin","Herlyno","Diky","Dita"],
        ["Elsa","Fawas","Ferindo","Galang","Hana","Haryadi","Marisa","Maylinda"],
        ["Mei","Miftah","Huda","Aziz","Rizky","Nadien","Nanda","Pratama"],
        ["Putri","Siska","Sony","Suci","Unggun","Zalfa","Wahyu","Vicky"],
    ]

    // Function untuk menentukan minggu ke berapa (1 atau 2) dalam siklus 2 minggu
    const getCurrentWeekInCycle = () => {
        const today = new Date()
        const startDate = new Date('2025-09-15') // Tanggal referensi awal (bisa disesuaikan)
        const diffTime = today - startDate
        const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))
        return (diffWeeks % 2) + 1 // Akan menghasilkan 1 atau 2
    }

    // Jadwal Piket MBG (2 minggu rotasi)
    const getMBGPiketSchedule = () => {
        // Minggu 1
        const week1 = {
            1: students.slice(0, 5),   // Monday: 1-5
            2: students.slice(5, 10),  // Tuesday: 6-10
            3: students.slice(10, 15), // Wednesday: 11-15
            4: students.slice(15, 20), // Thursday: 16-20
            5: students.slice(20, 25)  // Friday: 21-25
        }

        // Minggu 2
        const week2 = {
            1: students.slice(25, 30), // Monday: 26-30
            2: students.slice(30, 35), // Tuesday: 31-35
            3: students.slice(35, 40), // Wednesday: 36-40
            4: [...students.slice(40, 42), ...students.slice(0, 3)], // Thursday: 41-42, 1-3
            5: students.slice(3, 8)    // Friday: 4-8
        }

        return { week1, week2 }
    }

    const dayComponents = [
        null, // Kosongkan indeks 0
        Senin,
        Selasa,
        Rabu,
        Kamis,
        Jumat,
    ]

    // Component berdasarkan hari saat ini
    const TodayComponent = dayComponents[new Date().getDay()]
    
    // Piket biasa untuk hari ini
    const currentRegularPiket = regularPiketGroup[new Date().getDay() - 1]
    
    // Piket MBG untuk hari ini
    const currentWeek = getCurrentWeekInCycle()
    const mbgSchedule = getMBGPiketSchedule()
    const currentDayNumber = new Date().getDay()
    const currentMBGPiket = currentDayNumber >= 1 && currentDayNumber <= 5 
        ? (currentWeek === 1 ? mbgSchedule.week1[currentDayNumber] : mbgSchedule.week2[currentDayNumber])
        : null

    console.log("Current Day:", currentDay)
    console.log("Current Week in Cycle:", currentWeek)
    console.log("Regular Piket:", currentRegularPiket)
    console.log("MBG Piket:", currentMBGPiket)

    return (
        <>
            {/* Jadwal Mapel */}
            <div className="lg:flex lg:justify-center lg:gap-32 lg:mb-10 lg:mt-16 ">
                <div className="text-white flex flex-col justify-center items-center mt-8 md:mt-3 overflow-y-hidden">
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

            {/* Container untuk kedua jadwal piket */}
            <div className="lg:flex lg:justify-center lg:gap-16 lg:mb-10">
                
                {/* Jadwal Piket Biasa */}
                <div className="text-white flex flex-col justify-center items-center mt-8 lg:mt-0 mb-10 overflow-y-hidden">
                    <div
                        className="text-2xl font-medium mb-5 text-center"
                        data-aos="fade-up"
                        data-aos-duration="500">
                        Piket Biasa
                    </div>
                    {currentRegularPiket && currentRegularPiket.length > 0 ? (
                        currentRegularPiket.map((piketName, index) => (
                            <div
                                key={index}
                                className={`border-t-2 border-white flex justify-center py-[0.50rem] w-72 px-3 ${
                                    index === currentRegularPiket.length - 1 ? "border-b-2" : ""
                                }`}
                                data-aos="fade-up"
                                data-aos-duration={600 + index * 100}>
                                <div className="text-base font-medium">{piketName}</div>
                            </div>
                        ))
                    ) : (
                        <p className="opacity-50">Tidak Ada Jadwal Hari Ini</p>
                    )}
                </div>

                {/* Jadwal Piket MBG */}
                <div className="text-white flex flex-col justify-center items-center mt-8 lg:mt-0 mb-10 overflow-y-hidden">
                    <div
                        className="text-2xl font-medium mb-3 text-center"
                        data-aos="fade-up"
                        data-aos-duration="500">
                        Piket MBG
                    </div>
                    <div
                        className="text-sm font-medium mb-5 text-center opacity-75"
                        data-aos="fade-up"
                        data-aos-duration="550">
                        Minggu {currentWeek}
                    </div>
                    {currentMBGPiket && currentMBGPiket.length > 0 ? (
                        currentMBGPiket.map((piketName, index) => (
                            <div
                                key={index}
                                className={`border-t-2 border-blue-400 flex justify-center py-[0.50rem] w-72 px-3 ${
                                    index === currentMBGPiket.length - 1 ? "border-b-2" : ""
                                }`}
                                data-aos="fade-up"
                                data-aos-duration={600 + index * 100}>
                                <div className="text-base font-medium">{piketName}</div>
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
