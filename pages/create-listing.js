import React from "react";
import { useState, useEffect } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
import { listingSchema } from "@/lib/validation";
import prisma from '@/lib/prisma';
// import Autocomplete from 'react-google-autocomplete';
import {
  Card,
  Input,
  Button,
  Typography,
  // Autocomplete,
  DateTimePicker,
  TextField,
  Select,
  Menu,
  MenuHandler,
  MenuList,
  // GoogleMaps,
  MenuItem,
  Textarea
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { createOrUpdateUser } from '@/lib/utils/createOrUpdateUser';

const CreateListing = () => {
    const { data: session } = useSession();
    const { user } = useUser(); // Access user data
    const [country, setCountry] = useState(''); // Store country name
    const { countries } = useCountries(); // Access countries object

    const [formData, setFormData] = useState({
      name: '',
      images: [],
      shortCaption: '',
      description: '',
      price: 0,
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      coordinatesId: null,
      categories: [],
      phoneNumber: '',
      latitude: null,
      longitude: null,
    });

    useEffect(() => {
      if (formData.location) {
        handleLocationSelect(formData.location);
      }
    }, [formData.location]);

    const handleLocationSelect = async (place) => {
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();

      setFormData((prevFormData) => ({
        ...prevFormData,
        location: place.label,
        latitude,
        longitude,
      }));
    };

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      async function fetchCategories() {
        const fetchedCategories = await prisma.category.findMany();
        setCategories(fetchedCategories);
      }

      fetchCategories();
    }, []);

    const categoryOptions = categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    const [fieldErrors, setFieldErrors] = useState({});

    const getFieldErrorMessage = (fieldName, errorCode) => {
      switch (errorCode) {
        case 'required':
          return `${fieldName} is required`;
        case 'string.min':
          return `${fieldName} must be at least 3 characters long`;
        case 'string.array.nonempty':
          return `At least one image is required for ${fieldName}`;
        case 'number.positive':
          return `${fieldName} must be a positive number`;
        case 'date':
          return `${fieldName} must be a valid date`;
        case 'date.gt':
          return 'End date must be after start date';
        default:
          return 'Invalid input';
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const validatedData = listingSchema.parse(formData);

          const updatedUser = await createOrUpdateUser(session.user.id, {
            firstName: user.firstName,
            lastName: session.user.lastName,
            email: session.user.email,
            username: session.user.username,
            phoneNumber: session.user.phoneNumber,
            image: session.user.image,
          });

          formData.host = { connect: { id: updatedUser.id } };

          const existingCoordinates = await prisma.coordinates.findFirst({
            where: { latitude: formData.latitude, longitude: formData.longitude },
          });

          if (existingCoordinates) {
            formData.coordinatesId = existingCoordinates.id;
          } else {
            const newCoordinates = await prisma.coordinates.create({
              data: {
                name: formData.location,
                latitude: formData.latitude,
                longitude: formData.longitude,
              },
            });
            formData.coordinatesId = newCoordinates.id;
          }

          const createdListing = await prisma.listing.create({
            data: {
              ...validatedData,
              host: { connect: { id: updatedUser.id } },
              shortCaption: formData.shortCaption,
              description: formData.description,
              price: formData.price,
              phoneNumber: formData.phoneNumber,
              startDate: formData.startDate,
              endDate: formData.endDate,
              images: formData.images,
              categories: formData.categories,
              coordinates: { connect: { id: formData.coordinatesId } },
        },
      });

      // Handle success
      console.log('Listing created successfully:', createdListing);
      // Redirect to draft review page or display success message
    } catch (error) {
      if (error.issues) {
        setFieldErrors(
          error.issues.reduce((acc, issue) => {
            acc[issue.path[0]] = issue.code;
            return acc;
          }, {})
        );
      }
    }
  };

  return (

    <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
        Create a Listing
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Listing Name
            </Typography>
            <Input
            size="lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required // Make field required
            className={`!border-t-blue-gray-200 ${fieldErrors.name ? 'border-red-500' : ''}`} // Apply error styling
            labelProps={{
                className: "before:content-none after:content-none",
            }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Short Caption
            </Typography>
            <Input
            size="lg"
            value={formData.shortCaption}
            onChange={(e) => setFormData({ ...formData, shortCaption: e.target.value })}
            required
            className={`!border-t-blue-gray-200 ${fieldErrors.shortCaption ? 'border-red-500' : ''}`} // Apply error styling
            labelProps={{
                className: "before:content-none after:content-none",
            }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Start Date
            </Typography>
            <DateTimePicker
            label="Start Date"
            value={formData.startDate}
            onChange={(newValue) => setFormData({ ...formData, startDate: newValue })}
            required
            className={`!border-t-blue-gray-200 ${fieldErrors.startDate ? 'border-red-500' : ''}`} // Apply error styling
            renderInput={(params) => <TextField {...params} />}
                />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            End Date
            </Typography>
            <DateTimePicker
            label="End Date"
            value={formData.endDate}
            onChange={(newValue) => setFormData({ ...formData, endDate: newValue })}
            required
            className={`!border-t-blue-gray-200 ${fieldErrors.endDate ? 'border-red-500' : ''}`} // Apply error styling
            renderInput={(params) => <TextField {...params} />}
                />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Upload Images
            </Typography>
            <Input
            size="lg"
            value={formData.images}
            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
            required
            className={`!border-t-blue-gray-200 ${fieldErrors.images ? 'border-red-500' : ''}`} // Apply error styling
            labelProps={{
                className: "before:content-none after:content-none",
            }}
            />

            {/* Image upload component with input fields for image URLs */}
            {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
            Location
            </Typography>
            <GoogleMaps apiKey="API_KEY" />
            <Autocomplete
            // ... props for Google Places API integration
            placeholder="Enter a location"
            onSelect={handleLocationSelect}
            options={{ 
                types: ['geocode'], 
                componentRestrictions: {
                    country: "RW",
                },
            }}
            required
            className={`!border-t-blue-gray-200 ${fieldErrors.location ? 'border-red-500' : ''}`} // Apply error styling
            /> */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Categories
            </Typography>
            <Select
            labelId="demo-multiple-select-label"
            id="demo-multiple-select"
            multiple
            required
            value={formData.categories}
            onChange={(event) => setFormData({ ...formData, categories: event.target.value })}
            renderValue={(selected) => selected.join(', ')}
            options={categoryOptions}
            className={`!border-t-blue-gray-200 ${fieldErrors.categories ? 'border-red-500' : ''}`} // Apply error styling
            >
            </Select>
            
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Long Description
            </Typography>
            <Textarea
            size="lg"
            rows={4} // Adjust the number of rows as needed
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className={`!border-t-blue-gray-200 ${fieldErrors.description ? 'border-red-500' : ''}`}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Price
            </Typography>
            <Input
            type="number"
            size="lg"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            className={`!border-t-blue-gray-200 ${fieldErrors.price ? 'border-red-500' : ''}`}
            />
            {/* Phone number component with dropdown */}
            <div className="relative flex w-full max-w-[24rem]">
                <Menu placement="bottom-start">
                    <MenuHandler>
                       <Button
                         ripple={false}
                         variant="text"
                         color="blue-gray"
                         className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                        >
                        {/* Dynamically display selected country flag and code */}
                        {countries[country] && (
                         <img
                           src={countries[country].flags.svg}
                           alt={countries[country].name}
                           className="h-4 w-4 rounded-full object-cover"
                         />
                         )}
                         {countries[country]?.countryCallingCode || ''}
                       </Button>
                    </MenuHandler>
                     <MenuList className="max-h-[20rem] max-w-[18rem]">
                         {Object.entries(countries).map(([name, country]) => (
                            <MenuItem
                                key={name}
                                value={name}
                                className="flex items-center gap-2"
                                onClick={() => setCountry(name)}
                            >
                           <img
                             src={country.flags.svg}
                             alt={name}
                             className="h-5 w-5 rounded-full object-cover"
                            />
                          {name} <span className="ml-auto">{country.countryCallingCode}</span>
                           </MenuItem>
                           ))}
                     </MenuList>
                </Menu>
                <Input
                   type="tel"
                    placeholder="Mobile Number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                     }}
                    containerProps={{
                         className: "min-w-0",
                     }}
                />
            </div>
            <div className="mt-2 text-red-500 text-sm">
            {fieldErrors.name && getFieldErrorMessage('Name', fieldErrors.name)}
            {fieldErrors.shortCaption && getFieldErrorMessage('Short Caption', fieldErrors.shortCaption)}
            {fieldErrors.startDate && getFieldErrorMessage('Start Date', fieldErrors.startDate)}
            {fieldErrors.endDate && getFieldErrorMessage('End Date', fieldErrors.endDate)}
            {fieldErrors.images && getFieldErrorMessage('Images', fieldErrors.images)}
            {fieldErrors.location && getFieldErrorMessage('Location', fieldErrors.location)}
            {fieldErrors.categories && getFieldErrorMessage('Categories', fieldErrors.categories)}
            {fieldErrors.description && getFieldErrorMessage('Description', fieldErrors.description)}
            {fieldErrors.price && getFieldErrorMessage('Price', fieldErrors.price)}
            {fieldErrors.phoneNumber && getFieldErrorMessage('Phone Number', fieldErrors.phoneNumber)}
            </div>
        </div>
        <Button className="mt-6" fullWidth type="submit">
            Create Listing
        </Button>
      </form>
    </Card>
  );
}

export default CreateListing;
