import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  SvgIcon,
  Typography,
  Box,
} from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface CategoryCardProps {
  category: {
    name: string;
    description: string;
    icon: SvgIconComponent;
  };
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const IconComponent = category.icon;

  return (
    <Card onClick={onClick} sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardActionArea>
        <Box sx={{ position: 'relative', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SvgIcon component={IconComponent} sx={{ width: '100px', height: '100px', color: 'primary.main' }} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
