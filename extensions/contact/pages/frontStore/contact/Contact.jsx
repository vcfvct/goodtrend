import React from "react";

export default function ContactFrom() {
	return (
		<div className="page-width">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<div className="text-center md:text-left px-2 ">
					<h2 className="h1 ">Contact Us</h2>
					<p>For any questions, contact us at.</p>
					<p>Email: katie@goodtrendpromos.com</p>
					<p>Phone: 571 393 1345</p>
				</div>
			</div>
		</div>
	);
}

export const layout = {
  areaId: "content",
  sortOrder: 1,
};