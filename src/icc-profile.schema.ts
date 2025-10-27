// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// Derived from icc.IccProfile in icc/index.d.ts.

import * as z from "zod";

const Version = z.enum(['2.0', '2.1', '2.4', '4.0', '4.2', '4.3', '4.4'])
	.describe('The version of the ICC profile.');
const Intent = z.enum(['Perceptual', 'Relative', 'Saturation', 'Absolute'])
	.describe('The rendering intent of the profile.');

const DeviceClass = z.enum(['Scanner', 'Monitor', 'Printer', 'Link', 'Abstract', 'Space', 'Named color'])
	.describe('The device class of the profile.');
const Platform = z.enum(['Apple', 'Adobe', 'Microsoft', 'Sun Microsystems', 'Silicon Graphics', 'Taligent'])
	.describe('The platform on which the profile was created.');
const Whitepoint = z.tuple([z.number(), z.number(), z.number()])
	.describe('The white point of the profile.');

export const IccProfile = z.object({
	version: Version,
	intent: Intent,

	cmm: z.string().optional()
		.describe('The name of the CMM that created the profile. This is a 4-byte ASCII string.'),
	colorSpace: z.string().optional()
		.describe('The color space of the profile. This is a 4-byte ASCII string.'),
	connectionSpace: z.string().optional()
		.describe('The connection space of the profile. This is a 4-byte ASCII string.'),
	copyright: z.string().optional()
		.describe('The copyright of the profile.'),
	creator: z.string().optional()
		.describe('The name of the profile creator.'),
	description: z.string().optional()
		.describe('A description of the profile.'),
	deviceClass: DeviceClass.optional(),
	deviceModelDescription: z.string().optional()
		.describe('A description of the device model.'),
	manufacturer: z.string().optional()
		.describe('The name of the device manufacturer.'),
	model: z.string().optional()
		.describe('The name of the device model.'),
	platform: Platform.optional(),
	viewingConditionsDescription: z.string().optional()
		.describe('A description of the viewing conditions.'),
	whitepoint: Whitepoint.optional(),
})
	.describe('Metadata from the ICC standard.');
export type IccProfile = z.infer<typeof IccProfile>;
