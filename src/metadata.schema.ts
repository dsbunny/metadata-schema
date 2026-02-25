// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab

import * as z from "zod";
import { KTXInfoSchema } from '@dsbunny/ktx-schema';
import { SharpMetadata } from './sharp-metadata.schema.js';
import { ExifMetadata } from './exif-metadata.schema.js';
import { IccProfile } from './icc-profile.schema.js';
import { IptcProfile } from './iptc-profile.schema.js';
import { XmpProfile } from './xmp-profile.schema.js';
import { FfprobeData } from './ffprobe-data.schema.js';
import {
	AnimatedPosterTimings,
	FileTimings,
	ImageTimings,
	MetadataTimings,
	PosterSeriesTimings,
	PosterTimings,
	PrevueTimings,
	TextureTimings,
	TileSeriesTimings,
	TileSeriesImageTimings,
	VideoTimings,
} from './timings.schema.js';
import { FileStatAndChecksums } from './file.schema.js';

// #region Metadata
// Base metadata for all files.
const BaseMetadata = {
	type: z.literal('base'),
	file: FileStatAndChecksums,
	timings: FileTimings,
	tags: z.array(z.string().max(64)).max(100).optional(),
};

export const HintDataPosterEntry = z.object({
	quality: z.enum(['medium', 'high', 'sample']),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
})
	.describe('A single entry in the hint poster array.');
export type HintDataPosterEntry = z.infer<typeof HintDataPosterEntry>;

export const HintData = z.object({
	type: z.literal('hint'),
	poster: z.array(HintDataPosterEntry),
})
	.describe('Hint data for assets.');
export type HintData = z.infer<typeof HintData>;

export const FileMetadata = z.object({
	...BaseMetadata,
	type: z.literal('file'),
	hint: HintData.optional(),
})
export type FileMetadata = z.infer<typeof FileMetadata>;

export const ImageMetadata = z.object({
	...BaseMetadata,
	type: z.literal('image'),
	sharp: SharpMetadata,
	exif: ExifMetadata.optional(),
	icc: IccProfile.optional(),
	iptc: IptcProfile.optional(),
	xmp: XmpProfile.optional(),
	ffprobe: FfprobeData,
	hint: HintData.optional(),
	timings: ImageTimings,
})
	.describe('Metadata for an image file.');
export type ImageMetadata = z.infer<typeof ImageMetadata>;

export const TextureMetadata = z.object({
	...BaseMetadata,
	type: z.literal('texture'),
	ktx: KTXInfoSchema.optional(),
	hint: HintData.optional(),
	timings: TextureTimings,
})
	.describe('Metadata for a texture file.');
export type TextureMetadata = z.infer<typeof TextureMetadata>;

export const VideoMetadata = z.object({
	...BaseMetadata,
	type: z.literal('video'),
	ffprobe: FfprobeData
		.describe('Metadata from the ffprobe tool.'),
	codecs: z.array(z.string().max(255)).optional()
		.describe('The codecs used in the video file, per RFC 6381.'),
	hint: HintData.optional(),
	timings: VideoTimings,
})
	.describe('Metadata for a video file.');
export type VideoMetadata = z.infer<typeof VideoMetadata>;

// Media types that are not supported, primarily due to technical limitations.
// Media can be rejected due to check rules.
export const RejectedMetadata = z.object({
	...BaseMetadata,
	type: z.literal('rejected'),
	error_text: z.string(),
})
	.describe('Metadata for an rejected file.');
export type RejectedMetadata = z.infer<typeof RejectedMetadata>;

// Union of all metadata types.
export const Metadata = z.discriminatedUnion("type", [
	FileMetadata,
	ImageMetadata,
	TextureMetadata,
	VideoMetadata,
	RejectedMetadata,
])
	.describe('Union of all metadata types.');
export type Metadata = z.infer<typeof Metadata>;

// Encapsulation of metadata in a S3 object.
export const MetadataMetadata = z.object({
	...BaseMetadata,
	type: z.literal('metadata'),
	timings: MetadataTimings,
})
	.describe('Metadata for a metadata object.');
export type MetadataMetadata = z.infer<typeof MetadataMetadata>;
// #endregion

// #region Preview
export const PosterMetadataEntry = z.object({
	...BaseMetadata,
	type: z.literal('poster-image'),
	quality: z.enum(['medium', 'high', 'sample']),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	blurhash: z.string().optional(),
	timings: PosterTimings,
})
	.describe('A single entry in the poster array.');
export type PosterMetadataEntry = z.infer<typeof PosterMetadataEntry>;

export const PosterMetadata = z.object({
	type: z.literal('poster'),
	poster: z.array(PosterMetadataEntry),
})
	.describe('Metadata for an image poster.');
export type PosterMetadata = z.infer<typeof PosterMetadata>;

export const AnimatedPosterMetadataEntry = z.object({
	...BaseMetadata,
	type: z.literal('animated-poster-image'),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	timings: AnimatedPosterTimings,
})
	.describe('A single entry in the animated poster array.');
export type AnimatedPosterMetadataEntry = z.infer<typeof AnimatedPosterMetadataEntry>;

export const AnimatedPosterMetadata = z.object({
	type: z.literal('animated-poster'),
	poster: AnimatedPosterMetadataEntry,
})
	.describe('Metadata for an animated poster.');
export type AnimatedPosterMetadata = z.infer<typeof AnimatedPosterMetadata>;

export const PosterSeriesMetadataEntry = z.object({
	...BaseMetadata,
	type: z.literal('poster-series-image'),
	index: z.number().int().min(1).max(3),
	quality: z.enum(['medium', 'high', 'sample']),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	blurhash: z.string().optional(),
	timings: PosterSeriesTimings,
})
	.describe('A single entry in the poster series array.');
export type PosterSeriesMetadataEntry = z.infer<typeof PosterSeriesMetadataEntry>;

export const PosterSeriesMetadata = z.object({
	type: z.literal('poster-series'),
	series: z.array(PosterSeriesMetadataEntry),
})
	.describe('Metadata for an image poster series.');
export type PosterSeriesMetadata = z.infer<typeof PosterSeriesMetadata>;

export const TileSeriesMetadataEntry = z.object({
	...BaseMetadata,
	type: z.literal('tile-series-image'),
	index: z.number().int().min(1).max(9999),
	count: z.number().int().min(1).max(9),
	quality: z.enum(['low']),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	timings: TileSeriesImageTimings,
})
	.describe('A single entry in the tile series array.');
export type TileSeriesMetadataEntry = z.infer<typeof TileSeriesMetadataEntry>;

export const TileSeriesMetadata = z.object({
	type: z.literal('tile-series'),
	series: z.array(TileSeriesMetadataEntry),
	timings: TileSeriesTimings,
})
	.describe('Metadata for an image tile series.');
export type TileSeriesMetadata = z.infer<typeof TileSeriesMetadata>;

export const TileSeriesMetadataMetadata = z.object({
	...BaseMetadata,
	type: z.literal('tile-series-metadata'),
	timings: MetadataTimings,
})
	.describe('Metadata for an image tile series metadata.');
export type TileSeriesMetadataMetadata = z.infer<typeof TileSeriesMetadataMetadata>;

export const PrevueMetadataEntry = z.object({
	...BaseMetadata,
	type: z.literal('prevue-video'),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
	timings: PrevueTimings,
})
	.describe('A single entry in the prevue array.');
export type PrevueMetadataEntry = z.infer<typeof PrevueMetadataEntry>;

export const PrevueMetadata = z.object({
	type: z.literal('prevue'),
	prevue: PrevueMetadataEntry,
})
	.describe('Metadata for a video prevue.');
export type PrevueMetadata = z.infer<typeof PrevueMetadata>;

// Union of all preview metadata types.
export const PreviewMetadata = z.discriminatedUnion("type", [
	PosterMetadata,
	AnimatedPosterMetadata,
	PosterSeriesMetadata,
	TileSeriesMetadataMetadata,
	PrevueMetadata,
])
	.describe('Union of all preview metadata types.');z
export type PreviewMetadata = z.infer<typeof PreviewMetadata>;

export const AllMetadata = z.union([
	MetadataMetadata,
	PreviewMetadata,
])
	.describe('Union of all metadata types.');
export type AllMetadata = z.infer<typeof AllMetadata>;
// #endregion
