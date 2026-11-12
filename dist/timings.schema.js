// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// Internal performance timings
import * as z from "zod";
import { dsbunnyRegistry } from '@dsbunny/zod-registry';
// #region Base
export const FileTimingsSchema = z.object({
    '@type': z.literal('FileTimings')
        .describe('Type of the file timings object.'),
    file_http_duration: z.number()
        .describe('Time taken to download the file from the HTTP server.'),
    file_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the file.'),
}).register(dsbunnyRegistry, {
    id: 'FileTimingsSchema',
    description: 'Performance timings for the file.',
});
export const ImageTimingsSchema = FileTimingsSchema.extend({
    '@type': z.literal('ImageTimings')
        .describe('Type of the image timings object.'),
    image_sharp_duration: z.number()
        .describe('Time taken to probe the image using sharp.'),
    image_ffprobe_duration: z.number()
        .describe('Time taken to probe the image using ffprobe.'),
}).register(dsbunnyRegistry, {
    id: 'ImageTimingsSchema',
    description: 'Performance timings for the image.',
});
export const TextureTimingsSchema = FileTimingsSchema.extend({
    '@type': z.literal('TextureTimings')
        .describe('Type of the texture timings object.'),
    texture_ktxinfo_duration: z.number()
        .describe('Time taken to probe the KTX texture information.'),
}).register(dsbunnyRegistry, {
    id: 'TextureTimingsSchema',
    description: 'Performance timings for the texture.',
});
export const VideoTimingsSchema = FileTimingsSchema.extend({
    '@type': z.literal('VideoTimings')
        .describe('Type of the video timings object.'),
    video_ffprobe_duration: z.number()
        .describe('Time taken to probe the video using ffprobe.'),
}).register(dsbunnyRegistry, {
    id: 'VideoTimingsSchema',
    description: 'Performance timings for the video.',
});
export const MetadataTimingsSchema = z.object({
    '@type': z.literal('MetadataTimings')
        .describe('Type of the metadata timings object.'),
    metadata_http_duration: z.number()
        .describe('Time taken to upload the metadata to the HTTP server.'),
}).register(dsbunnyRegistry, {
    id: 'MetadataTimingsSchema',
    description: 'Performance timings for the metadata.',
});
// #endregion
// #region Preview
export const PosterTimingsSchema = z.object({
    '@type': z.literal('PosterTimings')
        .describe('Type of the poster timings object.'),
    poster_canvas_duration: z.number().optional()
        .describe('Time taken to generate the poster using node-canvas.'),
    poster_ffmpeg_duration: z.number().optional()
        .describe('Time taken to generate the poster using ffmpeg.'),
    poster_avifenc_duration: z.number().optional()
        .describe('Time taken to convert the poster using avifenc.'),
    poster_sharp_duration: z.number().optional()
        .describe('Time taken to convert the poster using sharp.'),
    poster_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the poster.'),
    poster_http_duration: z.number()
        .describe('Time taken to upload the poster to the HTTP server.'),
}).register(dsbunnyRegistry, {
    id: 'PosterTimingsSchema',
    description: 'Performance timings for the poster.',
});
export const AnimatedPosterTimingsSchema = z.object({
    '@type': z.literal('AnimatedPosterTimings')
        .describe('Type of the animated poster timings object.'),
    animated_poster_ffmpeg_duration: z.number()
        .describe('Time taken to generate the animated poster using ffmpeg.'),
    animated_poster_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the animated poster.'),
    animated_poster_http_duration: z.number()
        .describe('Time taken to upload the animated poster to the HTTP server.'),
}).register(dsbunnyRegistry, {
    id: 'AnimatedPosterTimingsSchema',
    description: 'Performance timings for the animated poster.',
});
export const PosterSeriesTimingsSchema = z.object({
    '@type': z.literal('PosterSeriesTimings')
        .describe('Type of the poster series timings object.'),
    poster_series_ffmpeg_duration: z.number()
        .describe('Time taken to generate the poster series using ffmpeg.'),
    poster_series_avifenc_duration: z.number().optional()
        .describe('Time taken to convert the poster series using avifenc.'),
    poster_series_sharp_duration: z.number().optional()
        .describe('Time taken to convert the poster series using sharp.'),
    poster_series_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the poster series.'),
    poster_series_http_duration: z.number()
        .describe('Time taken to upload the poster series to the HTTP server.'),
}).register(dsbunnyRegistry, {
    id: 'PosterSeriesTimingsSchema',
    description: 'Performance timings for the poster series.',
});
export const TileSeriesImageTimingsSchema = z.object({
    '@type': z.literal('TileSeriesImageTimings')
        .describe('Type of the tile series image timings object.'),
    tile_series_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the tile series.'),
    tile_series_http_duration: z.number()
        .describe('Time taken to upload the tile series to the HTTP server.'),
}).register(dsbunnyRegistry, {
    id: 'TileSeriesImageTimingsSchema',
    description: 'Performance timings for the tile series.',
});
export const TileSeriesTimingsSchema = z.object({
    '@type': z.literal('TileSeriesTimings')
        .describe('Type of the tile series timings object.'),
    tile_series_ffprobe_duration: z.number()
        .describe('Time taken to probe the video using ffprobe.'),
    tile_series_ffmpeg_duration: z.number()
        .describe('Time taken to generate the tile series using ffmpeg.'),
    tile_series_avifenc_duration: z.number().optional()
        .describe('Time taken to convert the tile series using avifenc.'),
    tile_series_sharp_duration: z.number().optional()
        .describe('Time taken to convert the tile series using sharp.'),
}).register(dsbunnyRegistry, {
    id: 'TileSeriesTimingsSchema',
    description: 'Performance timings for the tile series set.',
});
export const PrevueTimingsSchema = z.object({
    '@type': z.literal('PrevueTimings')
        .describe('Type of the prevue timings object.'),
    prevue_ffmpeg_duration: z.number()
        .describe('Time taken to generate the prevue using ffmpeg.'),
    prevue_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the prevue.'),
    prevue_http_duration: z.number()
        .describe('Time taken to upload the prevue to the HTTP server.'),
}).register(dsbunnyRegistry, {
    id: 'PrevueTimingsSchema',
    description: 'Performance timings for the prevue video.',
});
// #endregion
//# sourceMappingURL=timings.schema.js.map