
import { Calendar, LocationEdit, RockingChairIcon } from 'lucide-react';
import { formatDate } from './../../utils/index';

const EventCard = ({ currentEvent, onDelete, onBook }: { currentEvent: any, onDelete: (id: string) => void, onBook:any }) => {
    return (
        <div className="flex flex-col rounded-xl shadow-sm px-5 py-4 gap-2 ">
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
            <div className='flex justify-between items-center w-full gap-5 mt-5'>
                <button className='px-4 py-2 font-semibold text-white bg-blue-500 rounded-xl cursor-pointer' onClick={() => onBook(currentEvent._id)}>
                    Book Event
                </button>
                <button className='px-4 py-2 font-semibold text-white bg-red-500 rounded-xl cursor-pointer' onClick={()=> onDelete(currentEvent._id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default EventCard