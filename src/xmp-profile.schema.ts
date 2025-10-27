// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// Derived from xmp-reader/index.js.

import * as z from "zod";

export const XmpProfile = z.object({
	keywords: z.array(z.string()).optional()
		.describe('Keywords associated with the image.'),
	title: z.string().optional()
		.describe('The title of the image.'),
	description: z.string().optional()
		.describe('A description of the image.'),
	rating: z.number().optional()
		.describe('The rating of the image.'),
	location: z.string().optional()
		.describe('The location of the image.'),
	creator: z.string().optional()
		.describe('The creator of the image.'),
	attribution: z.string().optional()
		.describe('The attribution of the image.'),
	terms: z.string().optional()
		.describe('The terms of the image.'),
})
	.describe('Metadata from the XMP standard.');
export type XmpProfile = z.infer<typeof XmpProfile>;
