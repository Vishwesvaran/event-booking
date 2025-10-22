import { useEffect, useState } from "react"
import { addEvents, bookSeats, fetchEvents, removeEvent } from "../services/events.services"
import EventCard from "./components/EventCard"
import { Calendar, LocationEdit, Plus, Ticket, X } from "lucide-react"
import { formatDate } from "../utils"
import AddEventForm from "./components/AddEventForm"
import type { Events } from "../types"
import { toast } from "react-toastify"
import { useAuth } from "../contexts/AuthContext"



const Home = () => {
    const [events, setEvents] = useState([])
    const [bookModal, setBookModal] = useState(false)
    const [bookData, setBookData] = useState<any>()
    const [addEventModal, setAddEventModal] = useState(false)
    const { user } = useAuth();


    useEffect(() => {
        if(user) {
            toast.info(`Logged in as ${user.username}`, {
                autoClose:1000
            })
        }
    }, [])
    const getAllEvents = async () => {
        const allEvents = await fetchEvents()
        if (allEvents.data) {
            setEvents(allEvents.data)
        }
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    useEffect(() => {
        getAllEvents()
    }, [events])


    const deleteEvent = async (id: string) => {
        await removeEvent(id)
        toast.success('Event Deleted Successfully', {
            position: 'top-right',
            autoClose: 3000,

        })
    }

    const bookEvent = async (id: string) => {
        const response = await bookSeats(id)
        setBookModal(true)
        setBookData(response)
        toast.success('Event Booked successfully!')
    }

    const handleAddEvent = async ({ title, date, venue, availableSeats, }: Events) => {
        await addEvents({ title, date, venue, availableSeats })

        toast.success('Event added successfully!')

    }
    return (
        <>
            {bookModal && (
                <div className="flex absolute top-0 bottom-0 left-0 right-0 w-screen h-screen justify-center items-center bg-black/50 ">
                    <div className="flex flex-col bg-white shadow-md px-5 py-4 rounded-2xl min-w-[500px]">
                        <div className="flex gap-1  items-center justify-center">
                            <h1 className="text-xl font-medium self-center text-green-600">{bookData?.message}</h1>
                            <X className=" ml-auto size-12 cursor-pointer rounded-full p-2 hover:bg-gray-100" onClick={() => setBookModal(false)} />
                        </div>
                        <div className="flex items-center w-full gap-1 flex-col">
                            <div className="flex gap-3 flex-col mt-5">
                                <div className='flex items-center gap-1'>
                                    <Ticket />
                                    <h2 className="text-xl font-semibold">{bookData?.data.title}</h2>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <LocationEdit />-
                                    <p className="font-medium text-black/50">{bookData.data.venue}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Calendar /> -
                                    <p className="text-sm font-semibold">{formatDate(bookData.data.date).fulldate} - {formatDate(bookData.data.data).formattedTime}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
            {addEventModal && (
                <div className="flex absolute top-0 bottom-0 left-0 right-0 w-screen h-screen justify-center items-center bg-black/50 ">
                    <AddEventForm onAdd={handleAddEvent} closeModal={setAddEventModal} />
                </div>
            )

            }
            <section className="flex gap-5 py-10 px-20 flex-col">
                <div className="items-center flex justify-between w-full">

                    <h1 className="text-2xl font-semibold">
                        Upcoming Events:
                    </h1>
                    {user?.role === 'admin' && (<button className=" flex items-center px-5 w-fit rounded-xl gap-1 font-semibold text-xl text-white bg-blue-500 py-1 cursor-pointer hover:ring-4 ring-offset-2 ring-blue-400" onClick={() => setAddEventModal(true)}>
                        <Plus />
                        Add Event
                    </button>)}
                </div>
                <div className="flex gap-5 items-center pl-3 flex-wrap">
                    {events.length > 0 ? events.map((eve: any, idx) => (
                        <EventCard currentEvent={eve} key={idx} onDelete={deleteEvent} onBook={bookEvent} />
                    )) : (
                        <div className="flex items-center justify-center py-10 w-full">
                            <p className="text-2xl font-semibold text-blue-950">No Upcoming Events...</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Home