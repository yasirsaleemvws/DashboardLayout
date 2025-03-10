import React from 'react';

export default function ParkingSlot({ item }) {
    const getSlotStyle = () => {
        if (!item.isOccupied && item.isReserved) {
            return "bg-purple-600 text-white";
        } else {
            return "bg-purple-100 text-purple-800";
        }
    };

    return (
        <div className={`relative min-h-[120px] border flex items-center justify-center rounded-md shadow-md text-4xl font-semibold ${getSlotStyle()}`}>
            {!item.isOccupied && !item.isReserved ? (
                <div>P</div>
            ) : item.isOccupied && !item.isReserved ? (
                <img src="/images/car.png" alt="Car" className="max-h-[100px]" />
            ) : !item.isOccupied && item.isReserved ? (
                <div className="text-center">
                    <p className="text-[1.5rem] font-bold">RESERVED</p>
                    <p className="text-[1rem]">Membership Monthly</p>
                </div>
            ) : (
                <>
                    <small className='absolute top-[-2px] right-0 px-2 py-1 rounded-b rounded-r bg-purple-600 text-white'>R</small>
                    <img src="/images/car.png" alt="Car" className="max-h-[100px]" />
                </>
            )}
        </div>
    );
}
