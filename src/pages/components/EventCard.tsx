
import { Calendar, LocationEdit, RockingChairIcon } from 'lucide-react';
import { formatDate } from './../../utils/index';
import { useAuth } from '../../contexts/AuthContext';

const EventCard = ({ currentEvent, onDelete, onBook }: { currentEvent: any, onDelete: (id: string) => void, onBook: any }) => {

    const { user } = useAuth()
    return (
        <div className="flex flex-col rounded-xl shadow-sm px-5 py-4 gap-2 min-h-[250px] h-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">{currentEvent.title}</h1>
                <div className='flex  gap-1'>
                    <LocationEdit />
                    <p className="font-medium text-black/50 w-[80%] wrap-break-word text-sm">{currentEvent.venue}</p>
                </div>
                <div className='flex items-center gap-1'>
                    <Calendar />
                    <p className="text-sm font-semibold bg-gray-200 rounded-3xl w-fit px-3 py-1 font-mono ">{formatDate(currentEvent.date).fulldate} - {formatDate(currentEvent).formattedTime}</p>
                </div>
                <div className='flex items-center gap-1'>
                    <RockingChairIcon />
                    <p className='font-medium text-lg'><span className='font-mono'>{currentEvent.availableSeats}</span> left </p>
                </div>
            </div>
            <div className='flex justify-between items-center w-full gap-5 mt-auto'>
                {user ? (
                    <button className='px-4 py-2 font-semibold text-white bg-blue-500 rounded-xl cursor-pointer hover:ring-4 ring-offset-2 ring-blue-400' onClick={() => onBook(currentEvent._id)}>
                        Book Event
                    </button>
                ) : (
                    <a href="/login" className="bg-black cursor-pointer text-white font-semibold text-xl flex items-center rounded-2xl text-center w-fit px-4 py-2 gap-2 hover:ring-4 ring-offset-2 ring-black/60 mx-auto" >
                        Login to book
                    </a>
                )}

                {user?.role === 'admin' && (<button className='px-4 py-2 font-semibold text-white bg-red-500 rounded-xl cursor-pointer hover:ring-4 ring-offset-2 ring-red-400' onClick={() => onDelete(currentEvent._id)}>
                    Delete
                </button>)}
            </div>
        </div>
    )
}

export default EventCard