import React, { useState } from "react";
import { toast } from 'react-toastify';
import "./Contact.scss";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		inquiry: ''
	});
	const [errors, setErrors] = useState({});

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
		return re.test(String(email).toLowerCase());
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: '' }); // Clear any error on change
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let validationErrors = {};

		// Email validation
		if (!formData.email) {
			validationErrors.email = "Email is required.";
		} else if (!validateEmail(formData.email)) {
			validationErrors.email = "Please enter a valid email.";
		}

		// Inquiry validation
		if (!formData.inquiry) {
			validationErrors.inquiry = "Inquiry is required.";
		}

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			 try {
					// Send POST request to the backend
					const response = await fetch('/api/contact-email', {
							method: 'POST',
							headers: {
									'Content-Type': 'application/json'
							},
							body: JSON.stringify(formData)
					});

					const result = await response.json();

					if (response.ok) {
							toast.success(result.message);
							setFormData({ name: '', phone: '', email: '', inquiry: '' }); // Reset form after submission
					} else {
							toast.error(result.message || 'Something went wrong.');
					}
			} catch (error) {
					console.error('Error:', error);
					toast.error('Failed to submit form');
			}
		}
	};

	return (
		<div className="page-width">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<div className="text-center md:text-left px-2">
					<h2 className="h1">Contact Us</h2>
					<p>For any questions, contact us at.</p>
					<p>Email📧: sales@goodtrendpromos.com</p>
					<p>Phone☎️: 571 393 1345</p>
				</div>

				<div className="px-2">
					<h2 className="h2">Send us a message</h2>
					<form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
						<div>
							<label htmlFor="name" className="block text-md font-medium text-gray-700">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
							/>
						</div>

						<div>
							<label htmlFor="phone" className="block text-md font-medium text-gray-700">Phone Number</label>
							<input
								type="text"
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
							/>
						</div>

						<div>
							<label htmlFor="email" className="block text-md font-medium text-gray-700">Email *</label>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">{errors.email}</p>
							)}
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md`}
							/>
						</div>

						<div>
							<label htmlFor="inquiry" className="block text-md font-medium text-gray-700">Inquiry *</label>
							{errors.inquiry && (
								<p className="text-red-500 text-sm mt-1">{errors.inquiry}</p>
							)}
							<textarea
								id="inquiry"
								name="inquiry"
								value={formData.inquiry}
								onChange={handleChange}
								rows="4"
								className={`mt-1 block w-full px-3 py-2 border ${errors.inquiry ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md`}
							></textarea>
						</div>

						<div>
							<button
								type="submit"
								className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}



export const layout = {
  areaId: "content",
  sortOrder: 1,
};