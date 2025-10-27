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
export type FileTimings = z.infer<typeof FileTimings>;

export const ImageTimings = FileTimings.extend({
	image_sharp_duration: z.number()
		.describe('Time taken to probe the image using sharp.'),
	image_ffprobe_duration: z.number()
		.describe('Time taken to probe the image using ffprobe.'),
})
	.describe('Performance timings for the image.');
export type ImageTimings = z.infer<typeof ImageTimings>;

export const TextureTimings = FileTimings.extend({
	texture_ktxinfo_duration: z.number()
		.describe('Time taken to probe the KTX texture information.'),
})
	.describe('Performance timings for the texture.');
export type TextureTimings = z.infer<typeof TextureTimings>;

export const VideoTimings = FileTimings.extend({
	video_ffprobe_duration: z.number()
		.describe('Time taken to probe the image using ffprobe.'),
})
	.describe('Performance timings for the image.');
export type VideoTimings = z.infer<typeof VideoTimings>;

export const MetadataTimings = z.object({
	metadata_http_duration: z.number()
		.describe('Time taken to upload the metadata to the HTTP server.'),
})
	.describe('Performance timings for the metadata.');
export type MetadataTimings = z.infer<typeof MetadataTimings>;
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
export type PosterTimings = z.infer<typeof PosterTimings>;

export const AnimatedPosterTimings = z.object({
	animated_poster_ffmpeg_duration: z.number()
		.describe('Time taken to generate the animated poster using ffmpeg.'),
	animated_poster_ck_duration: z.number()
		.describe('Time taken to calculate the checksum of the animated poster.'),
	animated_poster_http_duration: z.number()
		.describe('Time taken to upload the animated poster to the HTTP server.'),
})
	.describe('Performance timings for the animated poster.');
export type AnimatedPosterTimings = z.infer<typeof AnimatedPosterTimings>;

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
export type PosterSeriesTimings = z.infer<typeof PosterSeriesTimings>;

export const TileSeriesImageTimings = z.object({
	tile_series_ck_duration: z.number()
		.describe('Time taken to calculate the checksum of the tile series.'),
	tile_series_http_duration: z.number()
		.describe('Time taken to upload the tile series to the HTTP server.'),
})
	.describe('Performance timings for the tile series.');
export type TileSeriesImageTimings = z.infer<typeof TileSeriesImageTimings>;

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
export type TileSeriesTimings = z.infer<typeof TileSeriesTimings>;

export const PrevueTimings = z.object({
	prevue_ffmpeg_duration: z.number()
		.describe('Time taken to generate the prevue using ffmpeg.'),
	prevue_ck_duration: z.number()
		.describe('Time taken to calculate the checksum of the prevue.'),
	prevue_http_duration: z.number()
		.describe('Time taken to upload the prevue to the HTTP server.'),
})
	.describe('Performance timings for the prevue video.');
export type PrevueTimings = z.infer<typeof PrevueTimings>;
// #endregion
