// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab

import * as z from "zod";
import { dsbunnyRegistry } from '@dsbunny/zod-registry';
import { KTXInfoSchema } from '@dsbunny/ktx-schema';
import { ExifMetadataSchema } from './exif-metadata.schema.js';
import { IccProfileSchema } from './icc-profile.schema.js';
import { IptcProfileSchema } from './iptc-profile.schema.js';
import { FileStatAndChecksumsSchema } from './file.schema.js';
import { FfprobeDataSchema } from './ffprobe-data.schema.js';
import { SharpMetadataSchema } from './sharp-metadata.schema.js';
import {
	AnimatedPosterTimingsSchema,
	FileTimingsSchema,
	ImageTimingsSchema,
	MetadataTimingsSchema,
	PosterSeriesTimingsSchema,
	PosterTimingsSchema,
	PrevueTimingsSchema,
	TextureTimingsSchema,
	TileSeriesTimingsSchema,
	TileSeriesImageTimingsSchema,
	VideoTimingsSchema,
} from './timings.schema.js';
import { XmpProfileSchema } from './xmp-profile.schema.js';

// #region Metadata
// Base metadata for all files.
const BaseMetadata = {
	type: z.literal('base'),
	file: FileStatAndChecksumsSchema,
	timings: FileTimingsSchema,
	tags: z.array(z.string().max(64)).max(100).optional(),
};

export const HintDataPosterEntrySchema = z.object({
	quality: z.enum(['medium', 'high', 'sample']),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
}).register(dsbunnyRegistry, {
	id: 'HintDataPosterEntrySchema',
	description: 'A single entry in the hint poster array.',
});
export type HintDataPosterEntry = z.infer<typeof HintDataPosterEntrySchema>;

export const HintDataSchema = z.object({
	type: z.literal('hint'),
	poster: z.array(HintDataPosterEntrySchema),
}).register(dsbunnyRegistry, {
	id: 'HintDataSchema',
	description: 'Hint data for assets.',
});
export type HintData = z.infer<typeof HintDataSchema>;

export const FileMetadataSchema = z.object({
	...BaseMetadata,
	type: z.literal('file'),
	hint: HintDataSchema.optional(),
}).register(dsbunnyRegistry, {
	id: 'FileMetadataSchema',
	description: 'Metadata for a file.',
});
export type FileMetadata = z.infer<typeof FileMetadataSchema>;

export const ImageMetadataSchema = z.object({
	...BaseMetadata,
	type: z.literal('image'),
	sharp: SharpMetadataSchema,
	exif: ExifMetadataSchema.optional(),
	icc: IccProfileSchema.optional(),
	iptc: IptcProfileSchema.optional(),
	xmp: XmpProfileSchema.optional(),
	ffprobe: FfprobeDataSchema,
	hint: HintDataSchema.optional(),
	timings: ImageTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'ImageMetadataSchema',
	description: 'Metadata for an image file.',
});
export type ImageMetadata = z.infer<typeof ImageMetadataSchema>;

export const TextureMetadataSchema = z.object({
	...BaseMetadata,
	type: z.literal('texture'),
	ktx: KTXInfoSchema.optional(),
	hint: HintDataSchema.optional(),
	timings: TextureTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'TextureMetadataSchema',
	description: 'Metadata for a texture file.',
});
export type TextureMetadata = z.infer<typeof TextureMetadataSchema>;

export const VideoMetadataSchema = z.object({
	...BaseMetadata,
	type: z.literal('video'),
	ffprobe: FfprobeDataSchema
		.describe('Metadata from the ffprobe tool.'),
	codecs: z.array(z.string().max(255)).optional()
		.describe('The codecs used in the video file, per RFC 6381.'),
	hint: HintDataSchema.optional(),
	timings: VideoTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'VideoMetadataSchema',
	description: 'Metadata for a video file.',
});
export type VideoMetadata = z.infer<typeof VideoMetadataSchema>;

// Media types that are not supported, primarily due to technical limitations.
// Media can be rejected due to check rules.
export const RejectedMetadataSchema = z.object({
	...BaseMetadata,
	type: z.literal('rejected'),
	error_text: z.string(),
}).register(dsbunnyRegistry, {
	id: 'RejectedMetadataSchema',
	description: 'Metadata for an rejected file.',
});
export type RejectedMetadata = z.infer<typeof RejectedMetadataSchema>;

// Union of all metadata types.
export const MetadataSchema = z.discriminatedUnion("type", [
	FileMetadataSchema,
	ImageMetadataSchema,
	TextureMetadataSchema,
	VideoMetadataSchema,
	RejectedMetadataSchema,
]).register(dsbunnyRegistry, {
	id: 'MetadataSchema',
	description: 'Union of all metadata types.',
});
export type Metadata = z.infer<typeof MetadataSchema>;

// Encapsulation of metadata in a S3 object.
export const MetadataMetadataSchema = z.object({
	...BaseMetadata,
	type: z.literal('metadata'),
	timings: MetadataTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'MetadataMetadataSchema',
	description: 'Metadata for a metadata object.',
});
export type MetadataMetadata = z.infer<typeof MetadataMetadataSchema>;
// #endregion

// #region Preview
export const PosterMetadataEntrySchema = z.object({
	...BaseMetadata,
	type: z.literal('poster-image'),
	quality: z.enum(['medium', 'high', 'sample']),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	blurhash: z.string().optional(),
	timings: PosterTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'PosterMetadataEntrySchema',
	description: 'A single entry in the poster array.',
});
export type PosterMetadataEntry = z.infer<typeof PosterMetadataEntrySchema>;

export const PosterMetadataSchema = z.object({
	type: z.literal('poster'),
	poster: z.array(PosterMetadataEntrySchema),
}).register(dsbunnyRegistry, {
	id: 'PosterMetadataSchema',
	description: 'Metadata for an image poster.',
});
export type PosterMetadata = z.infer<typeof PosterMetadataSchema>;

export const AnimatedPosterMetadataEntrySchema = z.object({
	...BaseMetadata,
	type: z.literal('animated-poster-image'),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	timings: AnimatedPosterTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'AnimatedPosterMetadataEntrySchema',
	description: 'A single entry in the animated poster array.',
});
export type AnimatedPosterMetadataEntry = z.infer<typeof AnimatedPosterMetadataEntrySchema>;

export const AnimatedPosterMetadataSchema = z.object({
	type: z.literal('animated-poster'),
	poster: AnimatedPosterMetadataEntrySchema,
}).register(dsbunnyRegistry, {
	id: 'AnimatedPosterMetadataSchema',
	description: 'Metadata for an animated poster.',
});
export type AnimatedPosterMetadata = z.infer<typeof AnimatedPosterMetadataSchema>;

export const PosterSeriesMetadataEntrySchema = z.object({
	...BaseMetadata,
	type: z.literal('poster-series-image'),
	index: z.number().int().min(1).max(3),
	quality: z.enum(['medium', 'high', 'sample']),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	blurhash: z.string().optional(),
	timings: PosterSeriesTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'PosterSeriesMetadataEntrySchema',
	description: 'A single entry in the poster series array.',
});
export type PosterSeriesMetadataEntry = z.infer<typeof PosterSeriesMetadataEntrySchema>;

export const PosterSeriesMetadataSchema = z.object({
	type: z.literal('poster-series'),
	series: z.array(PosterSeriesMetadataEntrySchema),
}).register(dsbunnyRegistry, {
	id: 'PosterSeriesMetadataSchema',
	description: 'Metadata for an image poster series.',
});
export type PosterSeriesMetadata = z.infer<typeof PosterSeriesMetadataSchema>;

export const TileSeriesMetadataEntrySchema = z.object({
	...BaseMetadata,
	type: z.literal('tile-series-image'),
	index: z.number().int().min(1).max(9999),
	count: z.number().int().min(1).max(9),
	quality: z.enum(['low']),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	timings: TileSeriesImageTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'TileSeriesMetadataEntrySchema',
	description: 'A single entry in the tile series array.',
});
export type TileSeriesMetadataEntry = z.infer<typeof TileSeriesMetadataEntrySchema>;

export const TileSeriesMetadataSchema = z.object({
	type: z.literal('tile-series'),
	series: z.array(TileSeriesMetadataEntrySchema),
	timings: TileSeriesTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'TileSeriesMetadataSchema',
	description: 'Metadata for an image tile series.',
});
export type TileSeriesMetadata = z.infer<typeof TileSeriesMetadataSchema>;

export const TileSeriesMetadataMetadataSchema = z.object({
	...BaseMetadata,
	type: z.literal('tile-series-metadata'),
	timings: MetadataTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'TileSeriesMetadataMetadataSchema',
	description: 'Metadata for an image tile series metadata.',
});
export type TileSeriesMetadataMetadata = z.infer<typeof TileSeriesMetadataMetadataSchema>;

export const PrevueMetadataEntrySchema = z.object({
	...BaseMetadata,
	type: z.literal('prevue-video'),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	timings: PrevueTimingsSchema,
}).register(dsbunnyRegistry, {
	id: 'PrevueMetadataEntrySchema',
	description: 'A single entry in the prevue array.',
});
export type PrevueMetadataEntry = z.infer<typeof PrevueMetadataEntrySchema>;

export const PrevueMetadataSchema = z.object({
	type: z.literal('prevue'),
	prevue: PrevueMetadataEntrySchema,
}).register(dsbunnyRegistry, {
	id: 'PrevueMetadataSchema',
	description: 'Metadata for a video prevue.',
});
export type PrevueMetadata = z.infer<typeof PrevueMetadataSchema>;

// Union of all preview metadata types.
export const PreviewMetadataSchema = z.discriminatedUnion("type", [
	PosterMetadataSchema,
	AnimatedPosterMetadataSchema,
	PosterSeriesMetadataSchema,
	TileSeriesMetadataMetadataSchema,
	PrevueMetadataSchema,
]).register(dsbunnyRegistry, {
	id: 'PreviewMetadataSchema',
	description: 'Union of all preview metadata types.',
});
export type PreviewMetadata = z.infer<typeof PreviewMetadataSchema>;

export const AllMetadataSchema = z.union([
	MetadataMetadataSchema,
	PreviewMetadataSchema,
]).register(dsbunnyRegistry, {
	id: 'AllMetadataSchema',
	description: 'Union of all metadata types.',
});
export type AllMetadata = z.infer<typeof AllMetadataSchema>;
// #endregion
