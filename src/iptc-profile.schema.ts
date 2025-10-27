// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// Derived from iptc-reader/index.js.

import * as z from "zod";

export const IptcProfile = z.object({
	title: z.string().optional()
		.describe('Title of the image'),
	caption: z.string().optional()
		.describe('Caption of the image'),
	credit: z.string().optional()
		.describe('Credit of the image'),
	keywords: z.array(z.string()).optional()
		.describe('Keywords of the image'),
	dateCreated: z.string().optional()
		.describe('Date the image was created'),
	byline: z.string().optional()
		.describe('Byline of the image'),
	bylineTitle: z.string().optional()
		.describe('Byline title of the image'),
	captionWriter: z.string().optional()
		.describe('Caption writer of the image'),
	headline: z.string().optional()
		.describe('Headline of the image'),
	copyright: z.string().optional()
		.describe('Copyright of the image'),
	category: z.string().optional()
		.describe('Category of the image'),
})
	.describe('Metadata from the IPTC standard.');
export type IptcProfile = z.infer<typeof IptcProfile>;
