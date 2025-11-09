export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 60;
export const NAME_REPEAT_THRESHOLD = 4;
export const INQUIRY_MIN_LENGTH = 50;
export const INQUIRY_MAX_LENGTH = 1000;
export const INQUIRY_MIN_WORDS = 20;
export const INQUIRY_REPEAT_THRESHOLD = 7;

const hasRepeatedSequence = (value, threshold) => {
	if (threshold < 2) {
		return false;
	}
	const repeatRegex = new RegExp(`(.)\\1{${threshold - 1},}`);
	return repeatRegex.test(value);
};

export const validateEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(String(email).toLowerCase());
};

export const validateName = (name) => {
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

export const validateInquiry = (inquiry) => {
	const value = inquiry.trim();
	if (!value) {
		return "Inquiry is required.";
	}
	if (value.length < INQUIRY_MIN_LENGTH) {
		return `Inquiry should be at least ${INQUIRY_MIN_LENGTH} characters.`;
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
