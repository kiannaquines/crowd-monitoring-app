import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { CATEGORY_URL } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';

interface CategoryInfo {
    category_id: number;
    category_name: string;
    date_added: string;
    update_date: string;
}

interface TagInputProps {
    onChange: (selectedOptions: any) => void;
}

const TagInput: React.FC<TagInputProps> = ({ onChange }) => {
    const { toast } = useToast();
    const accessToken = Cookies.get('bearer');
    const [categories, setCategories] = useState<CategoryInfo[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(CATEGORY_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok && response.status === 404) {
                    toast({
                        title: 'Empty Category',
                        description: 'There was an error fetching categories.',
                    });
                }

                const data = await response.json();
                if (data && data.length > 0) {
                    setCategories(data);
                } else {
                    console.error('Empty categories data:', data);
                }
            } catch (error) {
                toast({
                    title: 'Fetch Error',
                    description: 'There was an error fetching categories.',
                });
            }
        };

        fetchCategories();
    }, [accessToken, toast]);

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            borderRadius: '0.2rem',
            cursor: 'pointer',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            cursor: 'pointer',
        }),
    };

    const handleSelectChange = (selectedOptions: any) => {
        onChange(selectedOptions);
    };


    return (
        <Select
            options={categories.map(category => ({
                value: category.category_id,
                label: category.category_name,
            }))}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                },
            })}
            isMulti
            styles={customStyles}
            placeholder="Select Category"
            className='cursor-pointer'
            name='category'
            onChange={handleSelectChange}
        />
    );
};

export default TagInput;
