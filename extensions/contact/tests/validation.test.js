import { describe, expect, it } from "vitest";
import {
	NAME_MAX_LENGTH,
	NAME_REPEAT_THRESHOLD,
	INQUIRY_MIN_LENGTH,
	INQUIRY_MIN_WORDS,
	validateEmail,
	validateName,
	validateInquiry
} from "../pages/frontStore/contact/Contact";

describe("validateEmail", () => {
	it("accepts well-formed addresses", () => {
		expect(validateEmail("user@example.com")).toBe(true);
	});

	it("rejects malformed addresses", () => {
		expect(validateEmail("not-an-email")).toBe(false);
	});
});

describe("validateName", () => {
	it("requires a non-empty value", () => {
		expect(validateName("   ")).toBe("Name is required.");
	});

	it("enforces length boundaries", () => {
		expect(validateName("A")).toBe("Name must be between 2 and " + NAME_MAX_LENGTH + " characters.");
	});

	it("rejects unexpected characters", () => {
		expect(validateName("John123")).toBe("Use letters and basic punctuation only.");
	});

	it("flags repeated character sequences", () => {
		const repeatedName = "A".repeat(NAME_REPEAT_THRESHOLD + 1);
		expect(validateName(repeatedName)).toBe("Name appears to contain repeated characters.");
	});

	it("accepts a valid name", () => {
		expect(validateName("John O'Connell")).toBe("");
	});
});

describe("validateInquiry", () => {
	it("requires a non-empty message", () => {
		expect(validateInquiry(" ")).toBe("Inquiry is required.");
	});

	it("enforces minimum word count", () => {
		const limitedWords = "Detailed message with plenty of letters ensuring length yet short";
		expect(validateInquiry(limitedWords)).toBe("Add more detail to your message (at least " + INQUIRY_MIN_WORDS + " words).");
	});

	it("flags repeated sequences", () => {
		const repeatedSequence = Array.from({ length: INQUIRY_MIN_WORDS }, (_, index) => "word" + index).join(" ") + " aaaaaaa";
		expect(validateInquiry(repeatedSequence)).toBe("Inquiry appears to contain repeated characters.");
	});

	it("accepts a detailed inquiry", () => {
		const validInquiry = Array.from({ length: INQUIRY_MIN_WORDS + 5 }, (_, index) => "topic" + index).join(" ") + " describing our partnership goals across upcoming campaigns.";
		expect(validateInquiry(validInquiry)).toBe("");
	});
});
