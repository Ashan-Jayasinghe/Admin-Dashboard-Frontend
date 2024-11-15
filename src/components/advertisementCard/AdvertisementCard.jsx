import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material"; // Material-UI components
import "swiper/css";
import "./AdvertisementCard.css"; // Styling for the card component

const AdvertisementCard = ({ ad }) => {
  return (
    <Card className="advertisement-card">
      {/* Swipeable Image Gallery with Swiper */}
      {ad.images.length > 0 && (
        <div className="advertisement-images">
          <Swiper
            spaceBetween={10} // Space between slides
            slidesPerView={1} // Show 1 slide at a time
            navigation
            pagination={{ clickable: true }}
            loop
          >
            {ad.images.map((image, index) => (
              <SwiperSlide key={index} className="image-slide">
                <CardMedia
                  component="img"
                  height="300" // Increase the image height here
                  image={image}
                  alt={`Ad ${ad.id} Image ${index + 1}`}
                  className="advertisement-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Title and Description */}
      <CardContent>
        <Typography variant="h6" component="div">
          {ad.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="advertisement-description"
        >
          {ad.description}
        </Typography>
      </CardContent>

      {/* Additional Data */}
      <CardContent>
        {/* Category and Subcategory */}
        <Typography variant="body2" color="text.primary">
          Category: {ad.category}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Subcategory: {ad.subcategory}
        </Typography>

        {/* Stock */}
        <Typography variant="body2" color="text.primary">
          Stock: {ad.stock}
        </Typography>

        {/* Address */}
        <Typography variant="body2" color="text.primary">
          Address: {ad.address}
        </Typography>

        {/* Mobile Number */}
        <Typography variant="body2" color="text.primary">
          Mobile: {ad.mobile}
        </Typography>

        {/* Created At */}
        <Typography variant="body2" color="text.secondary">
          Created At: {new Date(ad.created_at).toLocaleDateString()}
        </Typography>

        {/* User ID */}
        <Typography variant="body2" color="text.secondary">
          User ID: {ad.user_id}
        </Typography>

        {/* Accept Terms */}
        <Typography variant="body2" color="text.primary">
          Accept Terms: {ad.accept_terms ? "Yes" : "No"}
        </Typography>
      </CardContent>

      {/* Advertisement Status and Expiration Date */}
      <CardContent>
        {/* Status with Dynamic Color */}
        <Typography
          variant="body2"
          color="text.primary"
          className={`advertisement-status 
        ${ad.is_active === 1 && ad.isExpired === false ? "active" : ""}
        ${ad.is_active === 0 && ad.isExpired === 0 ? "deactivated" : ""}
        ${ad.isExpired === 1 ? "expired" : ""}`}
        >
          Status:
          {ad.is_active === 1 && ad.isExpired === false
            ? "Active"
            : ad.is_active === 0 && ad.isExpired === false
              ? "Deactivated"
              : "Expired"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="advertisement-expiry"
        >
          Expiration Date: {new Date(ad.expires_at).toLocaleDateString()}
        </Typography>
      </CardContent>

      {/* Action Button */}
      <Button variant="contained" color="primary" sx={{ margin: "10px" }}>
        Manage Advertisement
      </Button>
    </Card>
  );
};

export default AdvertisementCard;
