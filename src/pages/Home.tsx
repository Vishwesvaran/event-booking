import { useEffect, useState } from "react";
import { addEvents, bookSeats, fetchEvents, removeEvent } from "../services/events.services";
import EventCard from "./components/EventCard";
import { Calendar, LocationEdit, Plus, Search, Ticket, X } from "lucide-react";
import { formatDate } from "../utils";
import AddEventForm from "./components/AddEventForm";
import type { Events } from "../types";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const [events, setEvents] = useState<Events[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Events[]>([]);
    const [bookModal, setBookModal] = useState(false);
    const [bookData, setBookData] = useState<any>(null);
    const [addEventModal, setAddEventModal] = useState(false);

    const { user } = useAuth();

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");
    // const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");
    const [resultSummary, setResultSummary] = useState("Showing all events");




    const getAllEvents = async () => {
        try {
            const allEvents = await fetchEvents();
            if (allEvents?.data) {
                setEvents(allEvents.data);
                setFilteredEvents(allEvents.data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        getAllEvents();
    }, []);

    useEffect(() => {
        if (user) {
            toast.info(`Logged in as ${user.username}`, { autoClose: 1000 });
        }
    }, []);


    useEffect(() => {
        let filtered = [...events];
        let summary = ""

        if (searchTerm) {
            filtered = filtered.filter(
                (event) =>
                    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
            );
            summary = `Showing ${filtered.length} result${filtered.length !== 1 ? "s" : ""} for “${searchTerm}”`;
        }


        // if (startDate && endDate) {
        //     const start = new Date(startDate).getTime();
        //     const end = new Date(endDate).getTime();

        //     filtered = filtered.filter((event: any) => {
        //         const eventTime = new Date(event.dateTime).getTime();
        //         return eventTime >= start && eventTime <= end;
        //     });

        //     const startLabel = new Date(startDate).toLocaleDateString("en-GB", {
        //         day: "2-digit",
        //         month: "short",
        //         year: "numeric",
        //     });
        //     const endLabel = new Date(endDate).toLocaleDateString("en-GB", {
        //         day: "2-digit",
        //         month: "short",
        //         year: "numeric",
        //     });

        //     summary = `Showing ${filtered.length} event${filtered.length !== 1 ? "s" : ""} between ${startLabel} and ${endLabel}`;
        // }


        if (sortOption === "date-asc") {
            filtered.sort(
                (a: any, b: any) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
            );
            summary = `Showing ${filtered.length} event${filtered.length !== 1 ? "s" : ""} sorted by Date (Oldest first)`;
        } else if (sortOption === "date-desc") {
            filtered.sort(
                (a: any, b: any) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
            );
            summary = `Showing ${filtered.length} event${filtered.length !== 1 ? "s" : ""} sorted by Date (Newest first)`;
        } else if (sortOption === "seats-asc") {
            filtered.sort((a, b) => a.availableSeats - b.availableSeats);
            summary = `Showing ${filtered.length} event${filtered.length !== 1 ? "s" : ""} sorted by Seats (Lowest first)`;
        } else if (sortOption === "seats-desc") {
            filtered.sort((a, b) => b.availableSeats - a.availableSeats);
            summary = `Showing ${filtered.length} event${filtered.length !== 1 ? "s" : ""} sorted by Seats (Highest first)`;
        }

        if (!searchTerm && !sortOption) {
            summary = `Showing all ${events.length} event${events.length !== 1 ? "s" : ""}`;
        }

        setResultSummary(summary)
        setFilteredEvents(filtered);
    }, [events, searchTerm, sortOption,]);


    const deleteEvent = async (id: string) => {
        await removeEvent(id);
        toast.success("Event Deleted Successfully", {
            position: "top-right",
            autoClose: 3000,
        });
        getAllEvents();
    };

    const bookEvent = async (id: string) => {
        const response = await bookSeats(id);
        setBookModal(true);
        console.log(formatDate(response.data.date).fulldate)
        setBookData(response);
        getAllEvents();
        toast.success("Event Booked successfully!");
    };

    // Add Event
    const handleAddEvent = async ({ title, date, venue, availableSeats }: Events) => {
        await addEvents({ title, date, venue, availableSeats });
        getAllEvents();
        toast.success("Event added successfully!");
    };

    return (
        <>
            {/* BOOKING MODAL */}
            {bookModal && (
                <div className="flex absolute top-0 bottom-0 left-0 right-0 w-screen h-screen justify-center items-center bg-black/50 z-99">
                    <div className="flex flex-col bg-white shadow-md px-5 py-4 rounded-2xl min-w-[500px]">
                        <div className="flex gap-1 items-center justify-center">
                            <h1 className="text-xl font-medium self-center text-green-600">
                                {bookData?.message}
                            </h1>
                            <X
                                className="ml-auto size-12 cursor-pointer rounded-full p-2 hover:bg-gray-100"
                                onClick={() => setBookModal(false)}
                            />
                        </div>
                        <div className="flex items-center w-full gap-1 flex-col">
                            <div className="flex gap-3 flex-col mt-5">
                                <div className="flex items-center gap-1">
                                    <Ticket />
                                    <h2 className="text-xl font-semibold">
                                        {bookData?.data?.title}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-1">
                                    <LocationEdit />
                                    <p className="font-medium text-black/50">
                                        {bookData?.data?.venue}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar />
                                    <p className="text-sm font-semibold">
                                        {formatDate(bookData?.data?.date).fulldate} -{" "}
                                        {formatDate(bookData?.data?.date).formattedTime}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD EVENT MODAL */}
            {addEventModal && (
                <div className="flex absolute top-0 bottom-0 left-0 right-0 w-screen h-screen justify-center items-center bg-black/50 z-99">
                    <AddEventForm onAdd={handleAddEvent} closeModal={setAddEventModal} />
                </div>
            )}

            {/* MAIN CONTENT */}
            <section className="flex gap-5 py-10 px-20 flex-col">
                <div className="items-center flex justify-between w-full">
                    <h1 className="text-2xl font-semibold">Upcoming Events:</h1>
                    {user?.role === "admin" && (
                        <button
                            className="flex items-center px-5 w-fit rounded-xl gap-1 font-semibold text-xl text-white bg-blue-500 py-1 cursor-pointer hover:ring-4 ring-offset-2 ring-blue-400"
                            onClick={() => setAddEventModal(true)}
                        >
                            <Plus />
                            Add Event
                        </button>
                    )}
                </div>

                {/* SEARCH + FILTERS */}
                <div className="flex flex-wrap items-center gap-8 w-full  rounded-xl justify-center py-4 bg-gray-100 mb-4">
                    <div className="flex items-center relative min-w-100 border-2 border-gray-500 rounded-xl bg-white ">
                        <label htmlFor="search" className="absolute z-0 right-5">
                            <Search />
                        </label>
                        <input
                            type="text"
                            placeholder="Search by title or venue..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2 px-4 rounded-[inherit]"
                            name="search"
                            id="search"
                        />
                    </div>


                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border px-3 py-2 rounded-lg bg-white w-50"
                    >
                        <option value="">Sort by...</option>
                        <option value="date-asc">Date Asc</option>
                        <option value="date-desc">Date Des</option>
                        <option value="seats-asc">Seats Lowest</option>
                        <option value="seats-desc">Seats Highest</option>
                    </select>

                    {/* <div className="flex items-center gap-2 ">
                        <label>From:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border px-2 py-1 rounded-lg bg-white"
                        />
                    </div>

                    <div className="flex items-center gap-2 ">
                        <label>To:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border px-2 py-1 rounded-lg bg-white"
                        />
                    </div> */}
                </div>

                {/* RESULTS SUMMARY */}
                <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 text-blue-800 text-sm font-medium w-fit">
                    {resultSummary}
                </div>

                {/* EVENT LIST */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5 items-center pl-3 flex-wrap">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((eve, idx) => (
                            <EventCard
                                key={idx}
                                currentEvent={eve}
                                onDelete={deleteEvent}
                                onBook={bookEvent}
                            />
                        ))
                    ) : (
                        <div className="flex items-center justify-center py-10 w-full">
                            <p className="text-2xl font-semibold text-blue-950">
                                No Upcoming Events...
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
