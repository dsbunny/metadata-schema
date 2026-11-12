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
import { AnimatedPosterTimingsSchema, FileTimingsSchema, ImageTimingsSchema, MetadataTimingsSchema, PosterSeriesTimingsSchema, PosterTimingsSchema, PrevueTimingsSchema, TextureTimingsSchema, TileSeriesTimingsSchema, TileSeriesImageTimingsSchema, VideoTimingsSchema, } from './timings.schema.js';
import { XmpProfileSchema } from './xmp-profile.schema.js';
// #region Metadata
// Base metadata for all files.
const BaseMetadataSchema = z.object({
    '@type': z.literal('BaseMetadata')
        .describe('Type of the base metadata object.'),
    file: FileStatAndChecksumsSchema,
    timings: FileTimingsSchema,
    tags: z.array(z.string().max(64)).max(100).optional(),
});
export const HintDataPosterEntrySchema = z.object({
    '@type': z.literal('HintDataPosterEntry')
        .describe('Type of the hint data poster entry object.'),
    quality: z.enum(['medium', 'high', 'sample']),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
}).register(dsbunnyRegistry, {
    id: 'HintDataPosterEntrySchema',
    description: 'A single entry in the hint poster array.',
});
export const HintDataSchema = z.object({
    '@type': z.literal('HintData')
        .describe('Type of the hint data object.'),
    poster: z.array(HintDataPosterEntrySchema),
}).register(dsbunnyRegistry, {
    id: 'HintDataSchema',
    description: 'Hint data for assets.',
});
export const FileMetadataSchema = BaseMetadataSchema.extend({
    '@type': z.literal('FileMetadata')
        .describe('Type of the file metadata object.'),
    hint: HintDataSchema.optional(),
}).register(dsbunnyRegistry, {
    id: 'FileMetadataSchema',
    description: 'Metadata for a file.',
});
export const ImageMetadataSchema = BaseMetadataSchema.extend({
    '@type': z.literal('ImageMetadata')
        .describe('Type of the image metadata object.'),
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
export const TextureMetadataSchema = BaseMetadataSchema.extend({
    '@type': z.literal('TextureMetadata')
        .describe('Type of the texture metadata object.'),
    ktx: KTXInfoSchema.optional(),
    hint: HintDataSchema.optional(),
    timings: TextureTimingsSchema,
}).register(dsbunnyRegistry, {
    id: 'TextureMetadataSchema',
    description: 'Metadata for a texture file.',
});
export const VideoMetadataSchema = BaseMetadataSchema.extend({
    '@type': z.literal('VideoMetadata')
        .describe('Type of the video metadata object.'),
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
// Media types that are not supported, primarily due to technical limitations.
// Media can be rejected due to check rules.
export const RejectedMetadataSchema = BaseMetadataSchema.extend({
    '@type': z.literal('RejectedMetadata')
        .describe('Type of the rejected metadata object.'),
    error_text: z.string(),
}).register(dsbunnyRegistry, {
    id: 'RejectedMetadataSchema',
    description: 'Metadata for an rejected file.',
});
// Union of all metadata types.
export const MetadataSchema = z.discriminatedUnion("@type", [
    FileMetadataSchema,
    ImageMetadataSchema,
    TextureMetadataSchema,
    VideoMetadataSchema,
    RejectedMetadataSchema,
]).register(dsbunnyRegistry, {
    id: 'MetadataSchema',
    description: 'Union of all metadata types.',
});
// Encapsulation of metadata in a S3 object.
export const MetadataMetadataSchema = BaseMetadataSchema.extend({
    '@type': z.literal('MetadataMetadata')
        .describe('Type of the metadata metadata object.'),
    timings: MetadataTimingsSchema,
}).register(dsbunnyRegistry, {
    id: 'MetadataMetadataSchema',
    description: 'Metadata for a metadata object.',
});
// #endregion
// #region Preview
export const PosterMetadataEntrySchema = BaseMetadataSchema.extend({
    '@type': z.literal('PosterMetadataEntry')
        .describe('Type of the poster metadata entry object.'),
    quality: z.enum(['medium', 'high', 'sample']),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    blurhash: z.string().optional(),
    timings: PosterTimingsSchema,
}).register(dsbunnyRegistry, {
    id: 'PosterMetadataEntrySchema',
    description: 'A single entry in the poster array.',
});
export const PosterMetadataSchema = z.object({
    '@type': z.literal('PosterMetadata')
        .describe('Type of the poster metadata object.'),
    poster: z.array(PosterMetadataEntrySchema),
}).register(dsbunnyRegistry, {
    id: 'PosterMetadataSchema',
    description: 'Metadata for an image poster.',
});
export const AnimatedPosterMetadataEntrySchema = BaseMetadataSchema.extend({
    '@type': z.literal('AnimatedPosterMetadataEntry')
        .describe('Type of the animated poster metadata entry object.'),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    timings: AnimatedPosterTimingsSchema,
}).register(dsbunnyRegistry, {
    id: 'AnimatedPosterMetadataEntrySchema',
    description: 'A single entry in the animated poster array.',
});
export const AnimatedPosterMetadataSchema = z.object({
    '@type': z.literal('AnimatedPosterMetadata')
        .describe('Type of the animated poster metadata object.'),
    poster: AnimatedPosterMetadataEntrySchema,
}).register(dsbunnyRegistry, {
    id: 'AnimatedPosterMetadataSchema',
    description: 'Metadata for an animated poster.',
});
export const PosterSeriesMetadataEntrySchema = BaseMetadataSchema.extend({
    '@type': z.literal('PosterSeriesMetadataEntry')
        .describe('Type of the poster series metadata entry object.'),
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
export const PosterSeriesMetadataSchema = z.object({
    '@type': z.literal('PosterSeriesMetadata')
        .describe('Type of the poster series metadata object.'),
    series: z.array(PosterSeriesMetadataEntrySchema),
}).register(dsbunnyRegistry, {
    id: 'PosterSeriesMetadataSchema',
    description: 'Metadata for an image poster series.',
});
export const TileSeriesMetadataEntrySchema = BaseMetadataSchema.extend({
    '@type': z.literal('TileSeriesMetadataEntry')
        .describe('Type of the tile series metadata entry object.'),
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
export const TileSeriesMetadataSchema = z.object({
    '@type': z.literal('TileSeriesMetadata')
        .describe('Type of the tile series metadata object.'),
    series: z.array(TileSeriesMetadataEntrySchema),
    timings: TileSeriesTimingsSchema,
}).register(dsbunnyRegistry, {
    id: 'TileSeriesMetadataSchema',
    description: 'Metadata for an image tile series.',
});
export const TileSeriesMetadataMetadataSchema = BaseMetadataSchema.extend({
    '@type': z.literal('TileSeriesMetadataMetadata')
        .describe('Type of the tile series metadata metadata object.'),
    timings: MetadataTimingsSchema,
}).register(dsbunnyRegistry, {
    id: 'TileSeriesMetadataMetadataSchema',
    description: 'Metadata for an image tile series metadata.',
});
export const PrevueMetadataEntrySchema = BaseMetadataSchema.extend({
    '@type': z.literal('PrevueMetadataEntry')
        .describe('Type of the prevue metadata entry object.'),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    timings: PrevueTimingsSchema,
}).register(dsbunnyRegistry, {
    id: 'PrevueMetadataEntrySchema',
    description: 'A single entry in the prevue array.',
});
export const PrevueMetadataSchema = z.object({
    '@type': z.literal('PrevueMetadata')
        .describe('Type of the prevue metadata object.'),
    prevue: PrevueMetadataEntrySchema,
}).register(dsbunnyRegistry, {
    id: 'PrevueMetadataSchema',
    description: 'Metadata for a video prevue.',
});
// Union of all preview metadata types.
export const PreviewMetadataSchema = z.discriminatedUnion("@type", [
    PosterMetadataSchema,
    AnimatedPosterMetadataSchema,
    PosterSeriesMetadataSchema,
    TileSeriesMetadataMetadataSchema,
    PrevueMetadataSchema,
]).register(dsbunnyRegistry, {
    id: 'PreviewMetadataSchema',
    description: 'Union of all preview metadata types.',
});
export const AllMetadataSchema = z.union([
    MetadataMetadataSchema,
    PreviewMetadataSchema,
]).register(dsbunnyRegistry, {
    id: 'AllMetadataSchema',
    description: 'Union of all metadata types.',
});
// #endregion
//# sourceMappingURL=metadata.schema.js.map