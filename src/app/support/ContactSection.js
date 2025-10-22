import React from "react";
import { useState } from "react";
import { MapPin, Phone, Mail,CheckCircle, XCircle } from "lucide-react";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");
  const [ dialog, setDialog ] = useState({ open: false, success: null, message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      
      // Here you can send formData to backend
      setResult("Sending...");

      const data = new FormData();
      data.append("access_key", "21f066cd-a321-4b79-b96f-bcd4fca82b67");
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("message", formData.message);

      data.append("from_name", "CodeMonarch"); // makes email look branded

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: data,
        });
        const res = await response.json();
        if (res.success) {
          setDialog({
            open: true,
            success: true,
            message: "Your form has been submitted successfully 🎉",
          });
          setFormData({ name: "", email: "", phone: "", message: "" });
          setErrors({});
        } else {
          setDialog({
            open: true,
            success: false,
            message: "Failed to send message. Please try again ❌",
          });
        }
      } catch (error) {
        setDialog({
          open: true,
          success: false,
          message: "An error occurred. Please try again later ❌",
        });
      }
    }
  };

  return (
    <div className="bg-black/50 text-white overflow-x-hidden">
      <section
        id="Contact"
        className="py-20 bg-gradient-to-b from-black to-black/80"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-16 transform transition-all duration-1000`}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
              Contact Us?
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              For any queries, suggestions, or support, feel free to reach out to<br></br>
              us using the contact information below or by filling out the form.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Location</h3>
                  <p className="text-white">
                    Guru Nanak Nagar Moga, Punjab, 142001.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                {/* <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div> */}
                {/* <div>
                  <h3 className="text-white font-semibold text-lg">Phone</h3>
                  <p className="text-white">(91+) ................</p>
                </div> */}
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Email</h3>
                  <p className="text-white">rajputsunny0009@gmail.com</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="bg-gradient-to-br from-black to-black p-8 rounded-2xl border border-white">
                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white-800 border border-white rounded-lg text-white placeholder-white focus:border-red-500 focus:outline-none transition-colors duration-300"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white-800 border border-white rounded-lg text-white placeholder-white focus:border-red-500 focus:outline-none transition-colors duration-300"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                      className="w-full px-4 py-3 bg-white-800 border border-white rounded-lg text-white placeholder-white focus:border-red-500 focus:outline-none transition-colors duration-300"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <textarea
                      rows={5}
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white-800 border border-white rounded-lg text-white placeholder-white focus:border-red-500 focus:outline-none transition-colors duration-300 resize-none"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button  aria-label="Chat with CodeMonarch"
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* success dialgoue box */ }
      {dialog.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
          <div className="bg-white text-black rounded-2xl shadow-lg p-8 w-96 text-center">
            {dialog.success ? (
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            ) : (
              <XCircle className="w-12 h-12 text-red-500 mx-auto" />
            )}
            <h2 className="text-2xl font-bold mt-4">
              {dialog.success ? "Success!" : "Oops!"}
            </h2>
            <p className="text-gray-600 mt-2">{dialog.message}</p>
            <button  aria-label="Close "
              onClick={() => setDialog({ ...dialog, open: false })}
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactSection;
