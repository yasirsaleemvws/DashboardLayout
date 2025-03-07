import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import IconUser from '../../components/Icon/IconUser';
import IconThumbUp from '../../components/Icon/IconThumbUp';
import IconHome from '../../components/Icon/IconHome';
import BasicInfo from './steps/BasicInfo';
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { POST__REGISTER } from '../../api/PublicApi';
import Address from './steps/Address';
import ParkingInfo from './steps/ParkingInfo';

const SignUP = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Cover'));
    });
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const [activeTab, setActiveTab] = useState<any>('"basic"');
    const [formData, setFormData] = useState({
        basicInfo: { name: "", email: "", regNumber: "", businessType: "" },
        address: { country: "", city: "", state: "", zip: "", address: "", street: "", apartment: "" },
        parkingInfo: [],
    });

    const [errors, setErrors] = useState({});

    const registerMutation = useMutation(
        async (data) => {
            const response = await POST__REGISTER(data);
            return response;
        },
        {
            onSuccess: (data) => {
                toast.success(data.message);
                navigate('/signin');
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
        }
    );

    const validateField = (step: any, field: any, value: any) => {
        let errorMsg = "";

        if (!value) {
            errorMsg = `${field.replace(/([A-Z])/g, " $1")} is required`;
        }

        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [step]: { ...prevErrors[step], [field]: errorMsg },
        }));
    };

    const handleChange = (step: any, field: any, value: any, index: any = null) => {
        setFormData((prev: any) => {
            if (step === "parkingInfo") {
                const updatedParking: any = prev.parkingInfo ? [...prev.parkingInfo] : []; // ✅ Ensure array exists

                if (!updatedParking[index]) {
                    updatedParking[index] = {};
                }

                updatedParking[index][field] = value;
                return { ...prev, parkingInfo: updatedParking };
            }
            return { ...prev, [step]: { ...prev[step], [field]: value } };

        });

        validateField(step, field, value);
    };

    const validateStep = (step: any) => {
        let newErrors = {};
        let isValid = true;

        if (step === "basicInfo") {
            Object.keys(formData.basicInfo).forEach((field: any) => {
                if (!formData.basicInfo[field]) {
                    newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
                    isValid = false;
                }
            });

            // Password match validation
            if (formData.basicInfo.password !== formData.basicInfo.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
                isValid = false;
            }
        } else if (step === "parking") {
            formData.parkingInfo.forEach((area, index) => {
                let areaErrors = {};
                Object.keys(area).forEach((field) => {
                    if (!area[field]) {
                        areaErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
                        isValid = false;
                    }
                });
                newErrors[index] = areaErrors;
            });
        } else {
            Object.keys(formData[step]).forEach((field) => {
                if (!formData[step][field]) {
                    newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
                    isValid = false;
                }
            });
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [step]: newErrors,
        }));

        return isValid;
    };

    const handleNext = async (step: any, event: any) => {
        if (validateStep(step)) {
            if (step === "basicInfo") setActiveTab("address");
            if (step === "address") setActiveTab("parking");
            if (step === "parking") {
                registerMutation.mutateAsync(formData);
            }
        }
    };
    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link to="/" className="w-48 block lg:w-72 ms-10">
                                <img src="/assets/images/auth/logo-white.svg" alt="Logo" className="w-full" />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/register.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-8 block lg:hidden">
                                <img src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
                            </Link>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign Up</h1>
                            </div>
                            <form className="mb-5">
                                <div className="inline-block w-full">
                                    <div className="relative z-[1]">
                                        <div
                                            className={`${activeTab === 'basic' ? 'w-[15%]' : activeTab === 'address' ? 'w-[48%]' : activeTab === 'parking' ? 'w-[81%]' : ''}
                                        bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]`}
                                        ></div>
                                        <ul className="mb-5 grid grid-cols-3">
                                            <li className="mx-auto">
                                                <button
                                                    type="button"
                                                    className={`${activeTab === 'basic' ? '!border-primary !bg-primary text-white' : ''}
                                                border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                                    onClick={() => setActiveTab("basic")}
                                                >
                                                    <IconHome />
                                                </button>
                                                <span className={`${activeTab === 'basic' ? 'text-primary ' : ''}text-center block mt-2`}>Home</span>
                                            </li>
                                            <li className="mx-auto">
                                                <button
                                                    type="button"
                                                    className={`${activeTab === 'address' ? '!border-primary !bg-primary text-white' : ''}
                                                border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                                    onClick={() => setActiveTab('address')}
                                                >
                                                    <IconUser className="w-5 h-5" />
                                                </button>
                                                <span className={`${activeTab === 'address' ? 'text-primary ' : ''}text-center block mt-2`}>About</span>
                                            </li>
                                            <li className="mx-auto">
                                                <button
                                                    type="button"
                                                    className={`${activeTab === 'parking' ? '!border-primary !bg-primary text-white' : ''}
                                                border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                                    onClick={() => setActiveTab('parking')}
                                                >
                                                    <IconThumbUp className="w-5 h-5" />
                                                </button>
                                                <span className={`${activeTab === 'parking' ? 'text-primary ' : ''}text-center block mt-2`}>Success</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>

                                        <div className="mb-5">
                                            {activeTab === "basic" && <BasicInfo formData={formData} handleChange={handleChange} errors={errors.basicInfo} handleNext={handleNext} />}
                                            {activeTab === "address" && <Address formData={formData} handleChange={handleChange} errors={errors.address} handleNext={handleNext} />}
                                            {activeTab === "parking" && <ParkingInfo formData={formData} handleChange={handleChange} errors={errors.parking} handleNext={handleNext} loading={registerMutation.isLoading} />}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <button type="button" className={`btn btn-primary ${activeTab === 'basic' ? 'hidden' : ''}`} onClick={() => setActiveTab(activeTab === 'parking' ? 'address' : 'basic')}>
                                            Back
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab(activeTab === 'basic' ? 'address' : 'parking')}>
                                            {activeTab === 'parking' ? 'Finish' : 'Next'}
                                        </button>
                                    </div>
                                </div>
                            </form>


                            <div className="text-center dark:text-white">
                                Already have an account ?&nbsp;
                                <Link to="/signin" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN IN
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUP;
