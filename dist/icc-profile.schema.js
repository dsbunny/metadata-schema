// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// Derived from icc.IccProfile in icc/index.d.ts.
import * as z from "zod";
import { dsbunnyRegistry } from '@dsbunny/zod-registry';
const VersionSchema = z.enum(['2.0', '2.1', '2.4', '4.0', '4.2', '4.3', '4.4']).register(dsbunnyRegistry, {
    id: 'VersionSchema',
    description: 'The version of the ICC profile.',
});
const IntentSchema = z.enum(['Perceptual', 'Relative', 'Saturation', 'Absolute']).register(dsbunnyRegistry, {
    id: 'IntentSchema',
    description: 'The rendering intent of the profile.',
});
const DeviceClassSchema = z.enum(['Scanner', 'Monitor', 'Printer', 'Link', 'Abstract', 'Space', 'Named color']).register(dsbunnyRegistry, {
    id: 'DeviceClassSchema',
    description: 'The device class of the profile.',
});
const PlatformSchema = z.enum(['Apple', 'Adobe', 'Microsoft', 'Sun Microsystems', 'Silicon Graphics', 'Taligent']).register(dsbunnyRegistry, {
    id: 'PlatformSchema',
    description: 'The platform on which the profile was created.',
});
const WhitepointSchema = z.tuple([z.number(), z.number(), z.number()]).register(dsbunnyRegistry, {
    id: 'WhitepointSchema',
    description: 'The white point of the profile.',
});
export const IccProfileSchema = z.object({
    version: VersionSchema,
    intent: IntentSchema,
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
    deviceClass: DeviceClassSchema.optional(),
    deviceModelDescription: z.string().optional()
        .describe('A description of the device model.'),
    manufacturer: z.string().optional()
        .describe('The name of the device manufacturer.'),
    model: z.string().optional()
        .describe('The name of the device model.'),
    platform: PlatformSchema.optional(),
    viewingConditionsDescription: z.string().optional()
        .describe('A description of the viewing conditions.'),
    whitepoint: WhitepointSchema.optional(),
}).register(dsbunnyRegistry, {
    id: 'IccProfileSchema',
    description: 'Metadata from the ICC standard.',
});
//# sourceMappingURL=icc-profile.schema.js.map