import {
  AlertCircle,
  Calculator,
  Camera,
  FileText,
  Globe,
  MapPin,
  Navigation,
  Upload,
  X,
} from "lucide-react";
import React, { useState } from "react";
import Label from "../ui/Labal";
import { Input } from "../ui/Input";
import type { PropertyData } from "./type";
import Select from "../ui/select";
import { accuracyToZoom } from "@/libs/AccuracyZoom";
import { cn } from "@/libs/utils";

type AddPropertyFormProps = {
  currentStep: number | null;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  propertyData: PropertyData;
  setPropertyData: React.Dispatch<React.SetStateAction<PropertyData>>;
};

const propertyTypes = [
  "Residential House",
  "Apartment Complex",
  "Commercial Building",
  "Office Space",
  "Retail Space",
  "Industrial Property",
  "Land/Plot",
  "Mixed-Use Development",
];

const constructionStatuses = [
  "Completed",
  "Under Construction",
  "Planned/Pre-Construction",
];

const landTitleTypes = [
  "Certificate of Occupancy (C of O)",
  "Deed of Assignment",
  "Governor's Consent",
  "Statutory Right of Occupancy",
  "Customary Right of Occupancy",
  "Survey Plan",
  "Building Plan Approval",
];

const documentTypes = [
  "Property Title Documents",
  "Survey Plan",
  "Building Plan Approval",
  "Environmental Impact Assessment",
  "Tax Clearance Certificate",
  "Property Valuation Report",
  "Construction Permits",
  "Insurance Documents",
  "Legal Due Diligence Report",
  "Financial Projections",
  "Property Management Agreement",
  "Compliance Certificates",
];

function AddPropertyForm({
  currentStep,
  errors,
  setErrors,
  propertyData,
  setPropertyData,
}: AddPropertyFormProps) {
  const [gettingLocation, setGettingLocation] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const handleAddFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((prev) => [...prev, trimmed]);
      setPropertyData((prev) => ({
        ...prev,
        features: [...prev.features, trimmed],
      }));
    }
    setNewFeature("");
  };

  const handleRemoveFeature = (feature: string) => {
    setFeatures((prev) => prev.filter((f) => f !== feature));
    setPropertyData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const getCurrentLocation = async () => {
    setGettingLocation(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setGettingLocation(false);
      return;
    }

    // 1️⃣ Check permission state (if supported)
    if (navigator.permissions) {
      try {
        const status = await navigator.permissions.query({
          name: "geolocation",
        });
        if (status.state === "denied") {
          alert(
            "Location access has been blocked. Please enable it in your browser settings."
          );
          setGettingLocation(false);
          return;
        }
      } catch {}
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPropertyData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
          locationMethod: "GPS",
        }));
        setGettingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(
          "Unable to get your location. Please enter coordinates manually."
        );
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleInputChange = (
    field: keyof PropertyData,
    value: string | number | File[]
  ) => {
    setPropertyData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleDocumentTypeToggle = (docType: string) => {
    setPropertyData((prev) => ({
      ...prev,
      documentTypes: prev.documentTypes.includes(docType)
        ? prev.documentTypes.filter((d) => d !== docType)
        : [...prev.documentTypes, docType],
    }));
  };

  switch (currentStep) {
    case 1:
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Property Name *</Label>
              <Input
                id="name"
                value={propertyData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Lagos Luxury Apartments"
                className={cn(errors.state && "border border-red-500")}
              />
              {errors.name && (
                <p className="text-red-500 flex items-center text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />

                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="propertyType">Property Type *</Label>

              <Select
                value={propertyData.propertyType}
                display="Select property type"
                options={propertyTypes}
                onChange={(value) => handleInputChange("propertyType", value)}
                // className={cn(errors.state && "border border-red-500")}
              />
              {errors.propertyType && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.propertyType}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Describe the property..."
              rows={3}
              value={propertyData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={cn(
                "w-full border border-gray-300 rounded-md p-2 focus:outline-gray-400 focus:outline-2 focus:ring-1 focus:ring-gray-300 focus:outline-offset-2",
                errors.state && "border border-red-500"
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 flex items-center ">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="constructionStatus">Construction Status *</Label>

              <Select
                value={propertyData.constructionStatus}
                options={constructionStatuses}
                display="Select status"
                onChange={(value) => handleInputChange("propertyType", value)}
              />
            </div>
            {propertyData.constructionStatus === "Under Construction" && (
              <div>
                <Label htmlFor="completionDate">Expected Completion Date</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={propertyData.completionDate}
                  onChange={(e) =>
                    handleInputChange("completionDate", e.target.value)
                  }
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={propertyData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Street address"
              className={cn(errors.address && "border border-red-500")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1 flex items-center ">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={propertyData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="e.g., Lagos"
                className={cn(errors.city && "border border-red-500")}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1 flex items-center ">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.city}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={propertyData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                placeholder="e.g., Lagos State"
                className={cn(errors.state && "border border-red-500")}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1 flex items-center ">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.state}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms </Label>
              <Input
                id="bedrooms"
                type="number"
                value={propertyData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                placeholder="0"
                className={cn(errors.bedrooms && "border border-red-500")}
              />

              {errors.bedrooms && (
                <p className="text-red-500 flex items-center text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />

                  {errors.bedrooms}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms </Label>
              <Input
                id="bathrooms"
                type="number"
                value={propertyData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                placeholder="0"
                className={cn(errors.bathrooms && "border border-red-500")}
              />
              {errors.bathrooms && (
                <p className="text-red-500 flex items-center text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.bathrooms}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="squareFootage">Square Footage </Label>
              <Input
                id="squareFootage"
                type="number"
                value={propertyData.squareFootage}
                onChange={(e) =>
                  handleInputChange("squareFootage", e.target.value)
                }
                placeholder="0"
                className={cn(errors.squareFootage && "border border-red-500")}
              />

              {errors.squareFootage && (
                <p className="text-red-500 flex items-center text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />

                  {errors.squareFootage}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                id="yearBuilt"
                type="number"
                value={propertyData.yearBuilt}
                onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                placeholder="2024"
                className={cn(errors.yearBuilt && "border border-red-500")}
              />
              {errors.yearBuilt && (
                <p className="text-red-500 flex items-center text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />

                  {errors.yearBuilt}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="landSize">Land Size (sqm)</Label>
              <Input
                id="landSize"
                type="number"
                value={propertyData.landSize}
                onChange={(e) => handleInputChange("landSize", e.target.value)}
                placeholder="500"
                className={cn(errors.landSize && "border border-red-500")}
              />

              {errors.landSize && (
                <p className="text-red-500 flex items-center text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />

                  {errors.landSize}
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-5">Property Features</h4>
            <div
              className={cn(
                "space-y-2",
                errors.features && "border border-red-500 p-2 rounded-md"
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Enter a new feature"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {features.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between px-3 py-1 border border-slate-200 rounded break-words max-w-full"
                    >
                      <span className="text-sm">{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(feature)}
                        className="text-slate-500 hover:text-slate-700 cursor-pointer text-sm"
                      >
                        <X />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.features && (
              <p className="text-red-500 flex items-center text-sm mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />

                {errors.features}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Land Borders</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="northBorder">North Border</Label>
                <Input
                  id="northBorder"
                  value={propertyData.northBorder}
                  onChange={(e) =>
                    handleInputChange("northBorder", e.target.value)
                  }
                  placeholder="e.g., Main Road"
                  className={cn(errors.northBorder && "border border-red-500")}
                />

                {errors.northBorder && (
                  <p className="text-red-500 flex items-center text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />

                    {errors.northBorder}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="southBorder">South Border</Label>
                <Input
                  id="southBorder"
                  value={propertyData.southBorder}
                  onChange={(e) =>
                    handleInputChange("southBorder", e.target.value)
                  }
                  placeholder="e.g., Residential Plot"
                  className={cn(errors.southBorder && "border border-red-500")}
                />

                {errors.southBorder && (
                  <p className="text-red-500 flex items-center text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />

                    {errors.southBorder}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="eastBorder">East Border</Label>
                <Input
                  id="eastBorder"
                  value={propertyData.eastBorder}
                  onChange={(e) =>
                    handleInputChange("eastBorder", e.target.value)
                  }
                  placeholder="e.g., Commercial Building"
                  className={cn(errors.eastBorder && "border border-red-500")}
                />
                {errors.eastBorder && (
                  <p className="text-red-500 flex items-center text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />

                    {errors.eastBorder}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="westBorder">West Border</Label>
                <Input
                  id="westBorder"
                  value={propertyData.westBorder}
                  onChange={(e) =>
                    handleInputChange("westBorder", e.target.value)
                  }
                  placeholder="e.g., Open Space"
                  className={cn(errors.westBorder && "border border-red-500")}
                />
                {errors.westBorder && (
                  <p className="text-red-500 flex items-center text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />

                    {errors.westBorder}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <div className="">
                <Label htmlFor="landTitle">Land Title Type</Label>
                <Select
                  value={propertyData.landTitle}
                  display="Select title type"
                  options={landTitleTypes}
                  onChange={(value) => handleInputChange("propertyType", value)}
                />

                {errors.landTitle && (
                  <p className="text-red-500 flex items-center text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />

                    {errors.landTitle}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="surveyPlan">Survey Plan Number</Label>
                <Input
                  id="surveyPlan"
                  value={propertyData.surveyPlan}
                  onChange={(e) =>
                    handleInputChange("surveyPlan", e.target.value)
                  }
                  placeholder="e.g., SP/LAG/2024/001"
                  className={cn(errors.surveyPlan && "border border-red-500")}
                />

                {errors.surveyPlan && (
                  <p className="text-red-500 flex items-center text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />

                    {errors.surveyPlan}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="space-y-4 border border-gray-300 rounded-md p-6">
          <div>
            <h1 className="flex items-center text-3xl mb-5  text-black font-bold">
              <Calculator className="w-5 h-5 mr-2" />
              <span> 1:1 Token Model</span>
            </h1>
            <div>
              <p className="text-sm text-slate-600 mb-4">
                Each token represents ₦1 of property value. Total tokens = Total
                property value.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalValue">Total Property Value (₦) </Label>
                  <Input
                    id="totalValue"
                    type="number"
                    value={propertyData.totalValue}
                    onChange={(e) =>
                      handleInputChange("totalValue", e.target.value)
                    }
                    placeholder="50000000"
                    className={cn(errors.totalValue && "border border-red-500")}
                  />

                  {errors.totalValue && (
                    <p className="text-red-500 flex items-center text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />

                      {errors.totalValue}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="totalTokens">Total Tokens Available</Label>
                  <Input
                    id="totalTokens"
                    value={propertyData.totalTokens}
                    readOnly
                    className="bg-slate-50"
                    placeholder="Auto-calculated"
                  />
                </div>

                <div>
                  <Label htmlFor="minInvestment">Minimum Investment (₦)</Label>
                  <Input
                    id="minInvestment"
                    type="number"
                    value={propertyData.minInvestment}
                    onChange={(e) =>
                      handleInputChange("minInvestment", e.target.value)
                    }
                    placeholder="1"
                    className={cn(
                      errors.minInvestment && "border border-red-500"
                    )}
                  />

                  {errors.minInvestment && (
                    <p className="text-red-500 flex items-center text-sm mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />

                      {errors.minInvestment}
                    </p>
                  )}
                </div>
              </div>

              {propertyData.totalValue && propertyData.expectedROI && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                  <h4 className="font-semibold text-xl mb-3 text-emerald-800 ">
                    Investment Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Property Value:</span>
                      <span className="font-semibold ml-2">
                        ₦
                        {Number.parseInt(
                          propertyData.totalValue
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600">Total Tokens:</span>
                      <span className="font-semibold ml-2">
                        {propertyData.totalTokens}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600">Price per Token:</span>
                      <span className="font-semibold ml-2">₦1</span>
                    </div>
                    <div>
                      <span className="text-slate-600">
                        Minimium investment
                      </span>
                      <span className="font-semibold ml-2">
                        {propertyData.minInvestment}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="space-y-4 border border-gray-300 rounded-md p-6">
          <div>
            <div>
              <h1 className="flex items-center text-2xl mb-5 font-semibold">
                <MapPin className="w-5 h-5 mr-2" />
                Property Location
              </h1>
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={gettingLocation}
                    className="flex items-center bg-black/80 hover:bg-black/70 text-white py-2 px-5 rounded-md cursor-pointer "
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    {gettingLocation
                      ? "Getting Location..."
                      : "Use Current Location"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const lat = prompt("Enter Latitude:");
                      const lng = prompt("Enter Longitude:");
                      if (lat && lng) {
                        setPropertyData((prev) => ({
                          ...prev,
                          latitude: lat,
                          longitude: lng,
                          locationMethod: "Manual",
                        }));
                      }
                    }}
                    className="flex items-center border border-gray-300 focus:ring focus:ring-gray-300 py-2 px-4 cursor-pointer rounded-md"
                  >
                    Enter Manually
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">Latitude *</Label>
                    <Input
                      id="latitude"
                      value={propertyData.latitude}
                      onChange={(e) =>
                        handleInputChange("latitude", e.target.value)
                      }
                      placeholder="6.5244"
                      className={cn(errors.latitude && "border border-red-500")}
                    />

                    {errors.latitude && (
                      <p className="text-red-500 flex items-center text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />

                        {errors.latitude}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitude *</Label>
                    <Input
                      id="longitude"
                      value={propertyData.longitude}
                      onChange={(e) =>
                        handleInputChange("longitude", e.target.value)
                      }
                      placeholder="3.3792"
                      className={cn(
                        errors.longitude && "border border-red-500"
                      )}
                    />

                    {errors.longitude && (
                      <p className="text-red-500 flex items-center text-sm mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />

                        {errors.longitude}
                      </p>
                    )}
                  </div>
                </div>

                {propertyData.latitude && propertyData.longitude && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-blue-800">
                          Location Captured
                        </h4>
                        <p className="text-sm text-blue-600">
                          Coordinates: {propertyData.latitude},{" "}
                          {propertyData.longitude}
                        </p>
                        <p className="text-xs text-blue-500">
                          Method: {propertyData.locationMethod}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const lat = parseFloat(propertyData.latitude);
                          const lng = parseFloat(propertyData.longitude);
                          const acc = parseFloat(propertyData.accuracy || "0");
                          // derive a zoom level from accuracy
                          const zoom = accuracyToZoom(acc, lat);
                          // open Google Maps centered at lat/lng with that zoom
                          const url = `https://www.google.com/maps/@${lat},${lng},${zoom}z`;
                          window.open(url, "_blank");
                        }}
                        className="flex items-center border py-1 px-3 cursor-pointer rounded-md border-blue-500"
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        <span>View on Map</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );

    case 5:
      return (
        <div className="space-y-4 ">
          <div className="border border-gray-300 rounded-md p-6">
            <h1 className="flex items-center text-2xl font-semibold mb-5">
              <Upload className="w-5 h-5 mr-2" />
              Property Images
            </h1>
            <div>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Upload property images</p>
                <p className="text-sm text-slate-500 mb-4">
                  JPG, PNG up to 10MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleInputChange("images", Array.from(e.target.files));
                    }
                  }}
                  className="hidden"
                  id="images"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("images")?.click()}
                  className="border border-gray-300 rounded-md py-2 px-4"
                >
                  Choose Images
                </button>
                {propertyData.images.length > 0 && (
                  <p className="text-sm text-emerald-600 mt-2">
                    {propertyData.images.length} image(s) selected
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-6">
            <div>
              <h1 className="flex items-center text-2xl mb-5 font-semibold">
                <FileText className="w-5 h-5 mr-2" />
                Legal Documents & KYC
              </h1>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <Label>Required Document Types</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {documentTypes.map((docType) => (
                      <div
                        key={docType}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={docType}
                          checked={propertyData.features.includes(docType)}
                          onChange={() => handleDocumentTypeToggle(docType)}
                          className="w-4 h-4"
                        />

                        <Label htmlFor={docType} className="text-sm">
                          {docType}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-2 border-dashed mt-10 border-slate-300 rounded-lg p-6 text-center">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">Upload legal documents</p>
                  <p className="text-sm text-slate-500 mb-4">
                    PDF, DOC, DOCX up to 25MB each
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleInputChange(
                          "documents",
                          Array.from(e.target.files)
                        );
                      }
                    }}
                    className="hidden"
                    id="documents"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("documents")?.click()
                    }
                    className="border border-gray-300 rounded-md py-2 cursor-pointer px-4"
                  >
                    Choose Documents
                  </button>
                  {propertyData.documents.length > 0 && (
                    <p className="text-sm text-emerald-600 mt-2">
                      {propertyData.documents.length} document(s) selected
                    </p>
                  )}
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-semibold text-amber-800">
                        Document Verification
                      </h4>
                      <p className="text-sm text-amber-700">
                        All uploaded documents will be reviewed by our legal
                        team for compliance and authenticity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default AddPropertyForm;
