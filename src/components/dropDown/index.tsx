import React, { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent,} from '@mui/material';

interface DropdownComponentProps {
    title: string;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ title }) => {
    const [selectedItem, setSelectedItem] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedItem(event.target.value as string);
    };

    return (
        <FormControl
            variant="outlined"
            fullWidth
            style={{
                maxWidth: '470px',
                backgroundColor: 'white',
                borderColor: 'black',
                margin: "0 auto"
            }}
        >
            <InputLabel id="dropdown-label" sx={{ color: 'black' }}>{title}</InputLabel>
            <Select
                labelId="dropdown-label"
                value={selectedItem}
                onChange={handleChange}
                label={title}
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '12px',
                    '& .MuiSelect-outlined': {
                        color: 'black',
                    },
                    '& .MuiSelect-icon': {
                        color: 'black',
                    },
                }}
            >
                <MenuItem value="Action" sx={{ color: 'black' }}>Action</MenuItem>
                <MenuItem value="Another action" sx={{ color: 'black' }}>Another action</MenuItem>
                <MenuItem value="Something else" sx={{ color: 'black' }}>Something else</MenuItem>
            </Select>
        </FormControl>
    );
};

export default DropdownComponent;
