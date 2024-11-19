import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; // Material-UI components
import "swiper/css";
import "./AdvertisementCard.css"; // Styling for the card component

const AdvertisementCard = ({ ad, reports = [] }) => {
  const [open, setOpen] = useState(false);

  // Handle popup open and close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card className="advertisement-card">
        {/* Swipeable Image Gallery with Swiper */}
        {ad.images.length > 0 && (
          <div className="advertisement-images">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop
            >
              {ad.images.map((image, index) => (
                <SwiperSlide key={index} className="image-slide">
                  <CardMedia
                    component="img"
                    height="300"
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
          <Typography variant="body2" color="text.secondary">
            {ad.description}
          </Typography>
        </CardContent>

        {/* Status and Expiration Date */}
        <CardContent>
          <Typography variant="body2" color="text.primary">
            Status:
            {ad.is_active === 1 && ad.isExpired === false
              ? "Active"
              : ad.is_active === 0 && ad.isExpired === false
                ? "Deactivated"
                : "Expired"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Expiration Date: {new Date(ad.expires_at).toLocaleDateString()}
          </Typography>
        </CardContent>

        {/* Action Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "10px" }}
          onClick={handleOpen}
        >
          Manage Advertisement
        </Button>
      </Card>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Manage Advertisement</DialogTitle>
        <DialogContent>
          {/* User Name and User ID */}
          <Typography variant="body2" color="text.primary" gutterBottom>
            <strong>User Name:</strong> {ad.user_name}
          </Typography>
          <Typography variant="body2" color="text.primary" gutterBottom>
            <strong>User ID:</strong> {ad.user_id}
          </Typography>

          {/* Active Period */}
          <Typography variant="body2" color="text.primary" gutterBottom>
            <strong>Active Period:</strong> From{" "}
            {new Date(ad.created_at).toLocaleDateString()} to{" "}
            {new Date(ad.expires_at).toLocaleDateString()}
          </Typography>

          {/* Reports Information */}
          <Typography variant="body2" color="text.primary" gutterBottom>
            <strong>Reports:</strong> {reports.length} reports received
          </Typography>

          {reports.length > 0 && (
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginTop: "10px" }}
              onClick={() => alert("Navigating to View Reports...")}
            >
              View Reports
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          {/* Deactivate and Delete Buttons */}
          <Button
            variant="contained"
            color="warning"
            onClick={() => alert("Ad deactivated!")}
          >
            Deactivate
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => alert("Ad deleted!")}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdvertisementCard;
