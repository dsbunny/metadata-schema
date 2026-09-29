// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
import * as z from "zod";
import { KTXInfoSchema } from '@dsbunny/ktx-schema';
import { SharpMetadataSchema } from './sharp-metadata.schema.js';
import { ExifMetadataSchema } from './exif-metadata.schema.js';
import { IccProfileSchema } from './icc-profile.schema.js';
import { IptcProfileSchema } from './iptc-profile.schema.js';
import { XmpProfileSchema } from './xmp-profile.schema.js';
import { FfprobeDataSchema } from './ffprobe-data.schema.js';
import { AnimatedPosterTimingsSchema, FileTimingsSchema, ImageTimingsSchema, MetadataTimingsSchema, PosterSeriesTimingsSchema, PosterTimingsSchema, PrevueTimingsSchema, TextureTimingsSchema, TileSeriesTimingsSchema, TileSeriesImageTimingsSchema, VideoTimingsSchema, } from './timings.schema.js';
import { FileStatAndChecksumsSchema } from './file.schema.js';
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
})
    .describe('A single entry in the hint poster array.');
export const HintDataSchema = z.object({
    type: z.literal('hint'),
    poster: z.array(HintDataPosterEntrySchema),
})
    .describe('Hint data for assets.');
export const FileMetadataSchema = z.object({
    ...BaseMetadata,
    type: z.literal('file'),
    hint: HintDataSchema.optional(),
});
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
})
    .describe('Metadata for an image file.');
export const TextureMetadataSchema = z.object({
    ...BaseMetadata,
    type: z.literal('texture'),
    ktx: KTXInfoSchema.optional(),
    hint: HintDataSchema.optional(),
    timings: TextureTimingsSchema,
})
    .describe('Metadata for a texture file.');
export const VideoMetadataSchema = z.object({
    ...BaseMetadata,
    type: z.literal('video'),
    ffprobe: FfprobeDataSchema
        .describe('Metadata from the ffprobe tool.'),
    codecs: z.array(z.string().max(255)).optional()
        .describe('The codecs used in the video file, per RFC 6381.'),
    hint: HintDataSchema.optional(),
    timings: VideoTimingsSchema,
})
    .describe('Metadata for a video file.');
// Media types that are not supported, primarily due to technical limitations.
// Media can be rejected due to check rules.
export const RejectedMetadataSchema = z.object({
    ...BaseMetadata,
    type: z.literal('rejected'),
    error_text: z.string(),
})
    .describe('Metadata for an rejected file.');
// Union of all metadata types.
export const MetadataSchema = z.discriminatedUnion("type", [
    FileMetadataSchema,
    ImageMetadataSchema,
    TextureMetadataSchema,
    VideoMetadataSchema,
    RejectedMetadataSchema,
])
    .describe('Union of all metadata types.');
// Encapsulation of metadata in a S3 object.
export const MetadataMetadataSchema = z.object({
    ...BaseMetadata,
    type: z.literal('metadata'),
    timings: MetadataTimingsSchema,
})
    .describe('Metadata for a metadata object.');
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
})
    .describe('A single entry in the poster array.');
export const PosterMetadataSchema = z.object({
    type: z.literal('poster'),
    poster: z.array(PosterMetadataEntrySchema),
})
    .describe('Metadata for an image poster.');
export const AnimatedPosterMetadataEntrySchema = z.object({
    ...BaseMetadata,
    type: z.literal('animated-poster-image'),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    timings: AnimatedPosterTimingsSchema,
})
    .describe('A single entry in the animated poster array.');
export const AnimatedPosterMetadataSchema = z.object({
    type: z.literal('animated-poster'),
    poster: AnimatedPosterMetadataEntrySchema,
})
    .describe('Metadata for an animated poster.');
export const PosterSeriesMetadataEntrySchema = z.object({
    ...BaseMetadata,
    type: z.literal('poster-series-image'),
    index: z.number().int().min(1).max(3),
    quality: z.enum(['medium', 'high', 'sample']),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    blurhash: z.string().optional(),
    timings: PosterSeriesTimingsSchema,
})
    .describe('A single entry in the poster series array.');
export const PosterSeriesMetadataSchema = z.object({
    type: z.literal('poster-series'),
    series: z.array(PosterSeriesMetadataEntrySchema),
})
    .describe('Metadata for an image poster series.');
export const TileSeriesMetadataEntrySchema = z.object({
    ...BaseMetadata,
    type: z.literal('tile-series-image'),
    index: z.number().int().min(1).max(9999),
    count: z.number().int().min(1).max(9),
    quality: z.enum(['low']),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    timings: TileSeriesImageTimingsSchema,
})
    .describe('A single entry in the tile series array.');
export const TileSeriesMetadataSchema = z.object({
    type: z.literal('tile-series'),
    series: z.array(TileSeriesMetadataEntrySchema),
    timings: TileSeriesTimingsSchema,
})
    .describe('Metadata for an image tile series.');
export const TileSeriesMetadataMetadataSchema = z.object({
    ...BaseMetadata,
    type: z.literal('tile-series-metadata'),
    timings: MetadataTimingsSchema,
})
    .describe('Metadata for an image tile series metadata.');
export const PrevueMetadataEntrySchema = z.object({
    ...BaseMetadata,
    type: z.literal('prevue-video'),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    timings: PrevueTimingsSchema,
})
    .describe('A single entry in the prevue array.');
export const PrevueMetadataSchema = z.object({
    type: z.literal('prevue'),
    prevue: PrevueMetadataEntrySchema,
})
    .describe('Metadata for a video prevue.');
// Union of all preview metadata types.
export const PreviewMetadataSchema = z.discriminatedUnion("type", [
    PosterMetadataSchema,
    AnimatedPosterMetadataSchema,
    PosterSeriesMetadataSchema,
    TileSeriesMetadataMetadataSchema,
    PrevueMetadataSchema,
])
    .describe('Union of all preview metadata types.');
z;
export const AllMetadataSchema = z.union([
    MetadataMetadataSchema,
    PreviewMetadataSchema,
])
    .describe('Union of all metadata types.');
// #endregion
//# sourceMappingURL=metadata.schema.js.map