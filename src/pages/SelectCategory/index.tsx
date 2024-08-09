import React from 'react';
import CategoryCard from './Components/categoryCard';
import Navbar from '../../components/navbar';
import { Container, Grid, Typography } from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import {
  Fastfood,
  LocalGroceryStore,
  LocalPharmacy,
  DirectionsCar,
  LocalShipping,
} from '@mui/icons-material';

const categories = [
  {
    name: 'Food',
    description: 'Have your cravings at the doorsteps.',
    icon: Fastfood,
  },
  {
    name: 'Grocery',
    description: 'Find the best quality of groceries and more.',
    icon: LocalGroceryStore,
  },
  {
    name: 'Pharmacy',
    description: 'You can have the medicines and more.',
    icon: LocalPharmacy,
  },
  {
    name: 'Bikes',
    description: 'Book your rides and reach the destination.',
    icon: DirectionsBikeIcon,
  },
  {
    name: 'Truck',
    description: 'Book your rides and reach the destination.',
    icon: LocalShipping,
  },
  {
    name: 'Car',
    description: 'Book your rides and reach the destination.',
    icon: DirectionsCar,
  },
];

const SelectCategory: React.FC = () => {
  const handleCategoryClick = (category: { name: string; description: string; icon: React.ElementType }) => {
    alert(`Category clicked: ${category.name}`);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" component="h1" style={{ margin: '45px 0' }}>
          Select Category
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CategoryCard category={category} onClick={() => handleCategoryClick(category)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default SelectCategory;
