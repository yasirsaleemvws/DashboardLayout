import React from 'react';
import { Modal, Input, Button } from "antd";
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from "yup";
import { useFormik } from "formik";
import { POST_PARKING_AREAS } from '../../api/PrivateApi';
import { toast } from 'react-toastify';

export default function AddParkingModal({ visible, onClose, onSave }) {
    const queryClient = useQueryClient();

    const validationSchema = Yup.object().shape({
        areaName: Yup.string().required("Area Name is required"),
        length: Yup.string().required("Length is required"),
        width: Yup.string().required("Width is required"),
        capacity: Yup.string().required("Capacity is required"),
        cameras: Yup.string().required("Cameras is required"),
    });

    // React Query Mutation
    const mutation = useMutation(
        async (formData) => {
            return await POST_PARKING_AREAS(formData);
        },
        {
            retry: false,
            onSuccess: (data) => {
                toast.success(data.message || "Parking Area Added Successfully!");
                formik.resetForm();
                queryClient.invalidateQueries(["parkingAreas"]);
                onSave();
                onClose();
            },
            onError: (error) => {
                toast.error(error?.message || "Failed to add parking area");
            }
        }
    );

    const formik = useFormik({
        initialValues: {
            areaName: "",
            length: "",
            width: "",
            capacity: "",
            cameras: "",
        },
        validationSchema,
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            className="rounded-lg max-w-[400px]"
        >
            <div className="p-2 rounded-lg">
                <div className="flex items-center mb-4">
                    <img src="/images/icons/files.png" alt="Parking Icon" className="w-10 h-10 mr-3" />
                    <h2 className=" text-lg font-semibold">Add Parking Area</h2>
                </div>

                {/* ✅ Use a regular form instead of AntD Form */}
                <form onSubmit={formik.handleSubmit}>
                    {/* Parking Area Name */}
                    <div className="mb-4">
                        <label className="text-gray-700">Area Name <span className='text-red-600'>*</span></label>
                        <Input
                            name="areaName"
                            placeholder="Enter Area Name"
                            value={formik.values.areaName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-3 py-2 rounded-md text-gray-700 border border-gray-600"

                        />
                        {formik.touched.areaName && formik.errors.areaName && (
                            <div className="text-red-500 text-sm">{formik.errors.areaName}</div>
                        )}
                    </div>

                    {/* Length & Width */}
                    <div className="flex space-x-4 mb-4">
                        <div>
                            <label className="text-gray-700">Length <span className='text-red-600'>*</span></label>
                            <Input
                                name="length"
                                placeholder="Enter Length"
                                value={formik.values.length}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='number'
                                className="w-full px-3 py-2 rounded-md text-gray-700 border border-gray-600"

                            />
                            {formik.touched.length && formik.errors.length && (
                                <div className="text-red-500 text-sm">{formik.errors.length}</div>
                            )}
                        </div>

                        <div>
                            <label className="text-gray-700">Width <span className='text-red-600'>*</span></label>
                            <Input
                                name="width"
                                placeholder="Enter Width"
                                value={formik.values.width}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='number'
                                className="w-full px-3 py-2 rounded-md text-gray-700 border border-gray-600"

                            />
                            {formik.touched.width && formik.errors.width && (
                                <div className="text-red-500 text-sm">{formik.errors.width}</div>
                            )}
                        </div>
                    </div>

                    {/* Capacity */}
                    <div className="mb-4">
                        <label className="text-gray-700">Capacity <span className='text-red-600'>*</span></label>
                        <Input
                            name="capacity"
                            placeholder="Enter Capacity"
                            value={formik.values.capacity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type='number'
                            className="w-full px-3 py-2 rounded-md text-gray-700 border border-gray-600"

                        />
                        {formik.touched.capacity && formik.errors.capacity && (
                            <div className="text-red-500 text-sm">{formik.errors.capacity}</div>
                        )}
                    </div>

                    {/* Cameras */}
                    <div className="mb-4">
                        <label className="text-gray-700">Cameras <span className='text-red-600'>*</span></label>
                        <Input
                            name="cameras"
                            placeholder="Enter Cameras"
                            value={formik.values.cameras}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type='number'
                            className="w-full px-3 py-2 rounded-md text-gray-700 border border-gray-600"

                        />
                        {formik.touched.cameras && formik.errors.cameras && (
                            <div className="text-red-500 text-sm">{formik.errors.cameras}</div>
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
