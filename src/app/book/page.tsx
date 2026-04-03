"use client";

import React from "react";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import useSessionStorage from "@/hooks/useSessionStorage";
import toast, { Toaster } from "react-hot-toast";
import { Clock, ChevronDown } from "lucide-react";

interface BookingData {
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  ageGroup: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
}

const initialData: BookingData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  gender: "",
  ageGroup: "",
  service: "",
  preferredDate: today(getLocalTimeZone()).toString(),
  preferredTime: "",
};

const BookingForm = () => {
  const [formData, setFormData] = useSessionStorage<BookingData>(
    "appointment-booking",
    initialData,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: any) => {
    if (date) {
      setFormData((prev) => ({ ...prev, preferredDate: date.toString() }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    const requiredFields: (keyof BookingData)[] = [
      "fullName",
      "phoneNumber",
      "email",
      "gender",
      "ageGroup",
      "service",
      "preferredDate",
      "preferredTime",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Appointment booked successfully!");
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen pt-30 bg-[#f8faff] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#002169] mb-2">
            {`Book Your Doctor's Appointment`}
          </h1>
          <p className="text-slate-500">
            Fill in your details below to schedule your visit
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-[#002169] py-4 px-8">
            <h2 className="text-white font-semibold text-lg">
              Appointment Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="text-red-500 mr-1">*</span>Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none text-slate-900 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="text-red-500 mr-1">*</span>Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+254 7980 346 289"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none text-slate-900 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="text-red-500 mr-1">*</span>Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johndoe@example.com"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none text-slate-900 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="text-red-500 mr-1">*</span>Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none text-slate-900 appearance-none bg-white"
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Age Group */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="text-red-500 mr-1">*</span>Age Group
                </label>
                <div className="relative">
                  <select
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none text-slate-900 appearance-none bg-white"
                  >
                    <option value="" disabled>
                      Select age group
                    </option>
                    <option value="infant">Infant (0-2)</option>
                    <option value="child">Child (3-12)</option>
                    <option value="teen">Teen (13-19)</option>
                    <option value="adult">Adult (20-64)</option>
                    <option value="senior">Senior (65+)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Select Service */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="text-red-500 mr-1">*</span>Select Service
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none text-slate-900 appearance-none bg-white"
                  >
                    <option value="" disabled>
                      Select service
                    </option>
                    <option value="general">General Consultation</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dentistry">Dentistry</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="pediatrics">Pediatrics</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="text-red-500 mr-1">*</span>Preferred Date
                </label>
                <DatePicker
                  aria-label="Preferred Date"
                  className="w-full cursor-pointer"
                  value={parseDate(formData.preferredDate)}
                  onChange={handleDateChange}
                  variant="bordered"
                  radius="lg"
                  showMonthAndYearPickers
                  calendarProps={{
                    className:
                      "bg-white shadow-xl border border-slate-200 rounded-lg",
                  }}
                  popoverProps={{
                    className: "bg-white cursor-pointer",
                  }}
                />
              </div>

              {/* Preferred Time */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="text-red-500 mr-1">*</span>Preferred Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all outline-none text-slate-900 appearance-none bg-white"
                  >
                    <option value="" disabled>
                      Select time
                    </option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-3.5 px-10 rounded-lg shadow-lg transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
