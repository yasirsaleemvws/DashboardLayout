import React, { useState } from 'react';
import { Modal, Input, Button, Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GET_AVAILABLE_PARKING_SLOTS, POST_MANUAL_PARKER } from '../../api/PrivateApi';
import { toast } from 'react-toastify';

const { Option } = Select;

export default function AddManualParkingModal({ visible, onClose, onSave }) {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery(
        ["availableParkingSlots"],
        () => GET_AVAILABLE_PARKING_SLOTS(),
        { keepPreviousData: false }
    );

    const [selectedParkingArea, setSelectedParkingArea] = useState(null);

    const validationSchema = Yup.object().shape({
        parkingFee: Yup.number().required("Parking fee is required"),
        parkingArea: Yup.string().required("Please select a parking area"),
        slot: Yup.string().required("Please select a parking slot"),
        plateNumber: Yup.string().required("Plate number is required"),
    });

    const mutation = useMutation(
        async (formData) => {
            return await POST_MANUAL_PARKER(formData);
        },
        {
            retry: false,
            onSuccess: (data) => {
                toast.success(data.message);
                formik.resetForm();
                onSave();
                onClose();
                queryClient.invalidateQueries(["manualParker"]);
            },
            onError: (error) => {
                toast.error(error?.message);
            }
        }
    );

    const formik = useFormik({
        initialValues: {
            parkingFee: "",
            parkingArea: "",
            slot: "",
            plateNumber: "",
        },
        validationSchema,
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });

    const handleParkingAreaChange = (value) => {
        setSelectedParkingArea(value);
        formik.setFieldValue("parkingArea", value);
        formik.setFieldValue("slot", ""); // Reset slot
    };

    return (
        <Modal open={visible} onCancel={onClose} footer={null} centered className="rounded-lg max-w-[400px]">
            <div className="p-2 rounded-lg">
                <div className="flex items-center mb-4">
                    <img src="/images/icons/files.png" alt="Icon" className="w-10 h-10 mr-3" />
                    <h2 className="text-lg font-semibold">Add Manual Parker</h2>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    {/* Parking Fee */}
                    <div className="mb-4">
                        <label className="text-gray-700">Parking Fees <span className='text-red-600'>*</span></label>
                        <Input
                            name="parkingFee"
                            type="number"
                            placeholder="Enter Parking Fees"
                            className="w-full px-3 py-2 rounded-md border border-gray-600"
                            value={formik.values.parkingFee}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.parkingFee && formik.errors.parkingFee && (
                            <div className="text-red-500 text-sm">{formik.errors.parkingFee}</div>
                        )}
                    </div>

                    {/* Parking Area */}
                    <div className="mb-4">
                        <label className="text-gray-700">Parking Area <span className='text-red-600'>*</span></label>
                        <Select
                            placeholder="Select Parking Area"
                            className="w-full px-3 py-2 rounded-md border border-gray-600"
                            value={formik.values.parkingArea}
                            onChange={handleParkingAreaChange}
                        >
                            {data?.data.map((item) => (
                                <Option key={item._id} value={item._id}>{item.areaName}</Option>
                            ))}
                        </Select>
                        {formik.touched.parkingArea && formik.errors.parkingArea && (
                            <div className="text-red-500 text-sm">{formik.errors.parkingArea}</div>
                        )}
                    </div>

                    {/* Show Parking Slot Field only if Parking Area is selected */}
                    {selectedParkingArea && (
                        <div className="mb-4">
                            <label className="text-gray-700">Available Parking Slot <span className='text-red-600'>*</span></label>
                            <Select
                                placeholder="Select Parking Slot"
                                className="w-full px-3 py-2 rounded-md border border-gray-600"
                                value={formik.values.slot}
                                onChange={(value) => formik.setFieldValue("slot", value)}
                            >
                                {data?.data
                                    .find(area => area._id === selectedParkingArea)
                                    ?.availableSlots
                                    .map(slot => (
                                        <Option key={slot._id} value={slot._id}>{slot.slotNumber}</Option>
                                    ))
                                }
                            </Select>
                            {formik.touched.slot && formik.errors.slot && (
                                <div className="text-red-500 text-sm">{formik.errors.slot}</div>
                            )}
                        </div>
                    )}

                    {/* Plate Number */}
                    <div className="mb-4">
                        <label className="text-gray-700">Plate Number <span className='text-red-600'>*</span></label>
                        <Input
                            name="plateNumber"
                            placeholder="Enter Plate Number"
                            className="w-full px-3 py-2 rounded-md border border-gray-600"
                            value={formik.values.plateNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.plateNumber && formik.errors.plateNumber && (
                            <div className="text-red-500 text-sm">{formik.errors.plateNumber}</div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="mt-4">
                        <Button
                            type="primary"
                            className="w-full py-5 text-white bg-purple-600 hover:bg-purple-700 rounded-md text-lg font-semibold"
                            htmlType="submit"
                            loading={mutation.isLoading}
                            disabled={mutation.isLoading}
                        >
                            {mutation.isLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
