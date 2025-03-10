import React from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../config/Constants';
import { Tooltip } from 'antd';

export default function ParkingCard({ data }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <img
        src="/images/parking-card.png"
        alt={data.areaName}
        className="w-full h-230 object-cover rounded-lg p-5"
      />

      <h3 className="text-lg font-semibold text-purple-600 mt-3 text-center mb-3">
        {data?.areaName}
        <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded ml-2">
          {data.totalReservedAndOccupied}/{data.totalSlots}
        </span>
      </h3>
      <p className="text-gray-500 text-sm text-center mb-10">Average Occupancy: {data.averageOccupancy}%</p>

      <div className="flex justify-between items-center mt-4 text-white cursor-pointer" onClick={() => navigate(`${APP_ROUTES.PARKING_AREA}?id=${data._id}&&view=2d`)}>
        <Tooltip title="Reserved slots">
          <span className="text-sm bg-purple-800 p-2 flex-1 text-center" style={{ borderRadius: '0 0 0 10px' }}>{data.reservedSlots} ({data.reservedPercentage}%)</span>
        </Tooltip>
        <Tooltip title="Occupied slots">
          <span className="text-sm bg-purple-600 p-2 flex-1 text-center">{data.occupiedSlots} ({data.occupiedPercentage}%)</span>
        </Tooltip>
        <Tooltip title="Available slots">
          <span className="text-sm bg-purple-400 p-2 flex-1 text-center" style={{ borderRadius: '0 0 10px 0' }}>{data.availableSlots} ({data.availablePercentage}%)</span>
        </Tooltip>
      </div>
    </div>
  )
}
