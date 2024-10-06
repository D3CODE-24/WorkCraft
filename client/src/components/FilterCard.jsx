import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: [
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli and Daman and Diu",
            "Lakshadweep",
            "Delhi",
            "Puducherry",
            "Jammu and Kashmir",
            "Ladakh"
        ]
    },
    {
        filterType: "Industry",
        array: [
            "Carpenter",
            "Electrician",
            "Plumber",
            "Mason",
            "Farm worker",
            "Loader",
            "Tailor",
            "Fitness Trainer",
            "Painter",
            "Cook",
            "Social Worker"
        ]
    },
    
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();

    const handleSelectChange = (filterType, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    useEffect(() => {
        const activeFilters = Object.values(selectedFilters).filter(Boolean).join(", ");
        dispatch(setSearchedQuery(activeFilters));
    }, [selectedFilters, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                filterData.map((data, index) => (
                    <div key={index} className='my-4'>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        <select
                            className='w-full p-2 mt-2 border rounded-md'
                            onChange={(e) => handleSelectChange(data.filterType, e.target.value)}
                            value={selectedFilters[data.filterType] || ''}
                        >
                            <option value="">Select {data.filterType}</option>
                            {data.array.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                ))
            }
        </div>
    );
};

export default FilterCard;
