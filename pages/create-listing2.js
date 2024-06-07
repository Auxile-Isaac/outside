import Head from 'next/head';
import Script from 'next/script';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Textarea
} from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr's CSS
import prisma from '@/lib/prisma';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import Router from 'next/router';

function LocationSearchInput({ value, onChange, onSelect }) {
  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      onSelect({ address, latLng });
    } catch (error) {
      console.error('Error selecting address', error);
    }
  };

  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="autocomplete-dropdown-container">
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={suggestion.placeId} // Ensure key prop is provided here
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
}

function CreateListing({ categories: initialCategories }) {
  const [name, setName] = useState('');
  const [shortCaption, setShortCaption] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const startDateRef = React.createRef(); // Create a ref for the input
  const [endDate, setEndDate] = useState('');
  const endDateRef = React.createRef();
  const [location, setLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({}); // to store selected location details
  const [images, setImages] = useState('');
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    // Initialize Flatpickr on component mount
    flatpickr(startDateRef.current, {
      enableTime: true,  // Enable time selection
      dateFormat: "Y-m-d H:i", // Set desired date and time format
      time_24hr: true,  // Use 24-hour format
      allowInput: true,  // Allow manual input
      theme: "material_blue",  // Apply Material Design theme
    });
    flatpickr(endDateRef.current, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      time_24hr: true,
      allowInput: true,
      theme: "material_blue",
    });
  }, []);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation.address);
    setSelectedLocation(selectedLocation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... handle form submission logic (fetch, API calls, etc.)
  };

  return (
    <div>
      <Head>
        <Script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzN9QQjSZRS865tiM5bWwclv1kwngPvh0&libraries=places"
        ></Script>
      </Head>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Create a Listing
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your listing details and we should approve it as soon as possible.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Listing Name
            </Typography>
            <Input
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text" 
              placeholder="Listing Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Short Caption
            </Typography>
            <Input
              size="lg"
              value={shortCaption}
              onChange={(e) => setShortCaption(e.target.value)}
              required
              type="text" 
              placeholder="Short caption to describe the listing"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Start Date
            </Typography>
            <input
              ref={startDateRef} // Attach ref to the input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              End Date
            </Typography>
            <input
              ref={endDateRef}
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Upload Images
            </Typography>
            <Input
              size="lg"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Price
            </Typography>
            <Input
              size="lg"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Location
            </Typography>
            <LocationSearchInput
              value={location}
              onChange={(e) => setLocation(e)}
              onSelect={handleLocationSelect}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Long Description
            </Typography>
            <Textarea
              size="lg"
              rows={4} // Adjust the number of rows as needed
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Card color="transparent" shadow={false}>
              {categories.length > 0 ? (
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Categories
                  </Typography>
                  <Card>
                    <List>
                      {categories.map((category) => (
                        <ListItem key={category.id} className="p-0">
                          <label
                            htmlFor={`category-${category.id}`}
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                          >
                            <ListItemPrefix className="mr-3">
                              <Checkbox
                                id={`category-${category.id}`}
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{ className: "p-0" }}
                                checked={categories.includes(category.id)}
                                onChange={() =>
                                  setCategories((prevCategories) =>
                                    prevCategories.includes(category.id)
                                      ? prevCategories.filter(
                                          (id) => id !== category.id
                                        )
                                      : [...prevCategories, category.id]
                                  )
                                }
                              />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="font-medium">
                              {category.name}
                            </Typography>
                          </label>
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                </div>
              ) : (
                <p>Loading categories...</p>
              )}
              {/* ... rest of the form */}
            </Card>
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}

export async function getStaticProps() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });

  return {
    props: {
      categories,
    },
  };
}

export default CreateListing;
