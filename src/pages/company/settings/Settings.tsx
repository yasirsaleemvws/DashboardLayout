import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconHome from '../../../components/Icon/IconHome';
import IconDollarSignCircle from '../../../components/Icon/IconDollarSignCircle';
import IconUser from '../../../components/Icon/IconUser';
import IconPhone from '../../../components/Icon/IconPhone';
import { Tab } from '@headlessui/react';
import IconInfoCircle from '../../../components/Icon/IconInfoCircle';

const Settings = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Settings'));
    });
    const [tabs, setTabs] = useState<string>('home');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    return (
        <div>
            <div className="panel" id="icon">
                <div className="mb-5">
                    <Tab.Group>
                        <Tab.List className="mt-3 mr-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                            dark:hover:border-b-black' -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger`}
                                    >
                                        <IconHome className="ltr:mr-2 rtl:ml-2" />
                                        Home
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                            dark:hover:border-b-black' -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger`}
                                    >
                                        <IconUser className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        Profile
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                            dark:hover:border-b-black' -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger`}
                                    >
                                        <IconPhone className="ltr:mr-2 rtl:ml-2" />
                                        Contact
                                    </button>
                                )}
                            </Tab>
                            <Tab className="pointer-events-none -mb-[1px] flex items-center p-3.5 py-2 text-white-light dark:text-dark">
                                <IconInfoCircle className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                Disabled
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <h4 className="mb-4 text-2xl font-semibold">We move your world!</h4>
                                    <p className="mb-4">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div>
                                    <div className="flex items-start pt-5">
                                        <div className="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
                                            <img
                                                src="/assets/images/profile-34.jpeg"
                                                alt="img"
                                                className="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark"
                                            />
                                        </div>
                                        <div className="flex-auto">
                                            <h5 className="mb-4 text-xl font-medium">Media heading</h5>
                                            <p className="text-white-dark">
                                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                                viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="pt-5">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>Disabled</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>

            </div>
        </div>
    );
};

export default Settings;
