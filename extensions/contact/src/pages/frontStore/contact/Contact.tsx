import React, { useState } from "react";
import { toast } from 'react-toastify';
import "./Contact.scss";

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 60;
export const NAME_REPEAT_THRESHOLD = 4;
export const INQUIRY_MIN_LENGTH = 50;
export const INQUIRY_MAX_LENGTH = 1000;
export const INQUIRY_MIN_WORDS = 20;
export const INQUIRY_REPEAT_THRESHOLD = 7;

const hasRepeatedSequence = (value: string, threshold: number): boolean => {
	if (threshold < 2) {
		return false;
	}
	const repeatRegex = new RegExp(`(.)\\1{${threshold - 1},}`);
	return repeatRegex.test(value);
};

export const validateEmail = (email: string): boolean => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(String(email).toLowerCase());
};

export const validateName = (name: string): string => {
	const value = name.trim();
	if (!value) {
		return "Name is required.";
	}
	if (value.length < NAME_MIN_LENGTH || value.length > NAME_MAX_LENGTH) {
		return `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters.`;
	}
	const pattern = /^[a-zA-Z][a-zA-Z .'-]*$/;
	if (!pattern.test(value)) {
		return "Use letters and basic punctuation only.";
	}
	if (hasRepeatedSequence(value, NAME_REPEAT_THRESHOLD)) {
		return "Name appears to contain repeated characters.";
	}
	return "";
};

export const validateInquiry = (inquiry: string): string => {
	const value = inquiry.trim();
	if (!value) {
		return "Inquiry is required.";
	}
	const wordCount = value.split(/\s+/).length;
	if (wordCount < INQUIRY_MIN_WORDS) {
		return `Add more detail to your message (at least ${INQUIRY_MIN_WORDS} words).`;
	}
	if (hasRepeatedSequence(value, INQUIRY_REPEAT_THRESHOLD)) {
		return "Inquiry appears to contain repeated characters.";
	}
	return "";
};


export default function ContactForm() {
	const [formData, setFormData] = useState<{
		name: string;
		phone: string;
		email: string;
		inquiry: string;
	}>({
		name: '',
		phone: '',
		email: '',
		inquiry: ''
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: '' }); // Clear any error on change
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let validationErrors: { [key: string]: string } = {};

		const nameError = validateName(formData.name);
		if (nameError) {
			validationErrors.name = nameError;
		}

		// Email validation
		if (!formData.email) {
			validationErrors.email = "Email is required.";
		} else if (!validateEmail(formData.email)) {
			validationErrors.email = "Please enter a valid email.";
		}

		const inquiryError = validateInquiry(formData.inquiry);
		if (inquiryError) {
			validationErrors.inquiry = inquiryError;
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
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">{errors.name}</p>
							)}
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md`}
								maxLength={NAME_MAX_LENGTH}
							/>
						</div>

						<div>
							<label htmlFor="phone" className="block text-md font-medium text-gray-700">Phone Number</label>
							<input
								type="tel"
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
								minLength={INQUIRY_MIN_LENGTH}
								maxLength={INQUIRY_MAX_LENGTH}
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