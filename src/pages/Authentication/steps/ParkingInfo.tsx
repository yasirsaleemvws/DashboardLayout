import React, { useState } from "react";

interface ParkingInfoProps {
  formData: any;
  handleChange: (step: string, field: string, value: string, index: number) => void;
  errors: any;
  handleNext: (step: string) => void;
  loading: boolean;
}

export default function ParkingInfo({ formData, handleChange, errors, handleNext, loading }: ParkingInfoProps) {
  const [parkingAreas, setParkingAreas] = useState([{ areaName: "", length: "", width: "", capacity: "", cameras: "" }]);

  const handleAddMore = () => {
    setParkingAreas([...parkingAreas, { areaName: "", length: "", width: "", capacity: "", cameras: "" }]);
  };

  return (
    <form className="mt-6 space-y-4">
      {parkingAreas.map((area, index) => (
        <div key={index} className="space-y-4">
          <label className="block text-gray-700">{index + 1} Parking Area.</label>
          <div>
            <label className="block text-gray-700">Parking Area Name <span className='text-red-600'>*</span></label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none border-gray-300"
              value={formData.parkingInfo[index]?.areaName || ""}
              onChange={(e) => handleChange("parkingInfo", "areaName", e.target.value, index)}
              placeholder="Enter Area Name"
            />
            {errors?.[`${index}_areaName`] && <p className="text-red-600">{errors[`${index}_areaName`]}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Parking Area <span className='text-red-600'>*</span></label>
            <div className="flex space-x-4">
              <div>
                <input
                  type="number"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none border-gray-300"
                  value={formData.parkingInfo[index]?.length || ""}
                  onChange={(e) => handleChange("parkingInfo", "length", e.target.value, index)}
                  placeholder="Enter Length"
                />
                {errors?.[`${index}_length`] && <p className="text-red-600">{errors[`${index}_length`]}</p>}
              </div>
              <div>
                <input
                  type="number"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none border-gray-300"
                  value={formData.parkingInfo[index]?.width || ""}
                  onChange={(e) => handleChange("parkingInfo", "width", e.target.value, index)}
                  placeholder="Enter Width"
                />
                {errors?.[`${index}_width`] && <p className="text-red-600">{errors[`${index}_width`]}</p>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Parking Capacity <span className='text-red-600'>*</span></label>
            <input
              type="number"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none border-gray-300"
              value={formData.parkingInfo[index]?.capacity || ""}
              onChange={(e) => handleChange("parkingInfo", "capacity", e.target.value, index)}
              placeholder="Enter Capacity"
            />
            {errors?.[`${index}_capacity`] && <p className="text-red-600">{errors[`${index}_capacity`]}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Installed Cameras <span className='text-red-600'>*</span></label>
            <input
              type="number"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none border-gray-300"
              value={formData.parkingInfo[index]?.cameras || ""}
              onChange={(e) => handleChange("parkingInfo", "cameras", e.target.value, index)}
              placeholder="Enter Number of Cameras"
            />
            {errors?.[`${index}_cameras`] && <p className="text-red-600">{errors[`${index}_cameras`]}</p>}
          </div>

          {parkingAreas.length > 1 && <hr />}

          {index === parkingAreas.length - 1 && (
            <p onClick={handleAddMore} className="w-full underline text-right text-purple-800 py-2 font-bold transition">
              Add More Parking Area
            </p>
          )}
        </div>
      ))}

      <button type="button" className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition" onClick={() => handleNext("parkingInfo")}>
        {loading ? "Register..." : "Register"}
      </button>
    </form>
  );
}