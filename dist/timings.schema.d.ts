import * as z from "zod";
export declare const FileTimingsSchema: z.ZodObject<{
    file_http_duration: z.ZodNumber;
    file_ck_duration: z.ZodNumber;
}, z.core.$strip>;
export type FileTimings = z.infer<typeof FileTimingsSchema>;
export declare const ImageTimingsSchema: z.ZodObject<{
    file_http_duration: z.ZodNumber;
    file_ck_duration: z.ZodNumber;
    image_sharp_duration: z.ZodNumber;
    image_ffprobe_duration: z.ZodNumber;
}, z.core.$strip>;
export type ImageTimings = z.infer<typeof ImageTimingsSchema>;
export declare const TextureTimingsSchema: z.ZodObject<{
    file_http_duration: z.ZodNumber;
    file_ck_duration: z.ZodNumber;
    texture_ktxinfo_duration: z.ZodNumber;
}, z.core.$strip>;
export type TextureTimings = z.infer<typeof TextureTimingsSchema>;
export declare const VideoTimingsSchema: z.ZodObject<{
    file_http_duration: z.ZodNumber;
    file_ck_duration: z.ZodNumber;
    video_ffprobe_duration: z.ZodNumber;
}, z.core.$strip>;
export type VideoTimings = z.infer<typeof VideoTimingsSchema>;
export declare const MetadataTimingsSchema: z.ZodObject<{
    metadata_http_duration: z.ZodNumber;
}, z.core.$strip>;
export type MetadataTimings = z.infer<typeof MetadataTimingsSchema>;
export declare const PosterTimingsSchema: z.ZodObject<{
    poster_canvas_duration: z.ZodOptional<z.ZodNumber>;
    poster_ffmpeg_duration: z.ZodOptional<z.ZodNumber>;
    poster_avifenc_duration: z.ZodOptional<z.ZodNumber>;
    poster_sharp_duration: z.ZodOptional<z.ZodNumber>;
    poster_ck_duration: z.ZodNumber;
    poster_http_duration: z.ZodNumber;
}, z.core.$strip>;
export type PosterTimings = z.infer<typeof PosterTimingsSchema>;
export declare const AnimatedPosterTimingsSchema: z.ZodObject<{
    animated_poster_ffmpeg_duration: z.ZodNumber;
    animated_poster_ck_duration: z.ZodNumber;
    animated_poster_http_duration: z.ZodNumber;
}, z.core.$strip>;
export type AnimatedPosterTimings = z.infer<typeof AnimatedPosterTimingsSchema>;
export declare const PosterSeriesTimingsSchema: z.ZodObject<{
    poster_series_ffmpeg_duration: z.ZodNumber;
    poster_series_avifenc_duration: z.ZodOptional<z.ZodNumber>;
    poster_series_sharp_duration: z.ZodOptional<z.ZodNumber>;
    poster_series_ck_duration: z.ZodNumber;
    poster_series_http_duration: z.ZodNumber;
}, z.core.$strip>;
export type PosterSeriesTimings = z.infer<typeof PosterSeriesTimingsSchema>;
export declare const TileSeriesImageTimingsSchema: z.ZodObject<{
    tile_series_ck_duration: z.ZodNumber;
    tile_series_http_duration: z.ZodNumber;
}, z.core.$strip>;
export type TileSeriesImageTimings = z.infer<typeof TileSeriesImageTimingsSchema>;
export declare const TileSeriesTimingsSchema: z.ZodObject<{
    tile_series_ffprobe_duration: z.ZodNumber;
    tile_series_ffmpeg_duration: z.ZodNumber;
    tile_series_avifenc_duration: z.ZodOptional<z.ZodNumber>;
    tile_series_sharp_duration: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type TileSeriesTimings = z.infer<typeof TileSeriesTimingsSchema>;
export declare const PrevueTimingsSchema: z.ZodObject<{
    prevue_ffmpeg_duration: z.ZodNumber;
    prevue_ck_duration: z.ZodNumber;
    prevue_http_duration: z.ZodNumber;
}, z.core.$strip>;
export type PrevueTimings = z.infer<typeof PrevueTimingsSchema>;
//# sourceMappingURL=timings.schema.d.ts.map