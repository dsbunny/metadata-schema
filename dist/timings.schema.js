// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// Internal performance timings
import * as z from "zod";
// #region Base
export const FileTimings = z.object({
    file_http_duration: z.number()
        .describe('Time taken to download the file from the HTTP server.'),
    file_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the file.'),
})
    .describe('Performance timings for the file.');
export const ImageTimings = FileTimings.extend({
    image_sharp_duration: z.number()
        .describe('Time taken to probe the image using sharp.'),
    image_ffprobe_duration: z.number()
        .describe('Time taken to probe the image using ffprobe.'),
})
    .describe('Performance timings for the image.');
export const TextureTimings = FileTimings.extend({
    texture_ktxinfo_duration: z.number()
        .describe('Time taken to probe the KTX texture information.'),
})
    .describe('Performance timings for the texture.');
export const VideoTimings = FileTimings.extend({
    video_ffprobe_duration: z.number()
        .describe('Time taken to probe the image using ffprobe.'),
})
    .describe('Performance timings for the image.');
export const MetadataTimings = z.object({
    metadata_http_duration: z.number()
        .describe('Time taken to upload the metadata to the HTTP server.'),
})
    .describe('Performance timings for the metadata.');
// #endregion
// #region Preview
export const PosterTimings = z.object({
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
})
    .describe('Performance timings for the poster.');
export const AnimatedPosterTimings = z.object({
    animated_poster_ffmpeg_duration: z.number()
        .describe('Time taken to generate the animated poster using ffmpeg.'),
    animated_poster_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the animated poster.'),
    animated_poster_http_duration: z.number()
        .describe('Time taken to upload the animated poster to the HTTP server.'),
})
    .describe('Performance timings for the animated poster.');
export const PosterSeriesTimings = z.object({
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
})
    .describe('Performance timings for the poster series.');
export const TileSeriesImageTimings = z.object({
    tile_series_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the tile series.'),
    tile_series_http_duration: z.number()
        .describe('Time taken to upload the tile series to the HTTP server.'),
})
    .describe('Performance timings for the tile series.');
export const TileSeriesTimings = z.object({
    tile_series_ffprobe_duration: z.number()
        .describe('Time taken to probe the video using ffprobe.'),
    tile_series_ffmpeg_duration: z.number()
        .describe('Time taken to generate the tile series using ffmpeg.'),
    tile_series_avifenc_duration: z.number().optional()
        .describe('Time taken to convert the tile series using avifenc.'),
    tile_series_sharp_duration: z.number().optional()
        .describe('Time taken to convert the tile series using sharp.'),
})
    .describe('Performance timings for the tile series set.');
export const PrevueTimings = z.object({
    prevue_ffmpeg_duration: z.number()
        .describe('Time taken to generate the prevue using ffmpeg.'),
    prevue_ck_duration: z.number()
        .describe('Time taken to calculate the checksum of the prevue.'),
    prevue_http_duration: z.number()
        .describe('Time taken to upload the prevue to the HTTP server.'),
})
    .describe('Performance timings for the prevue video.');
// #endregion
//# sourceMappingURL=timings.schema.js.map