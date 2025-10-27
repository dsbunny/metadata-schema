// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// Derived from fluent-ffmpeg/ffprobe.js.
import * as z from "zod";
export const FfprobeStreamDisposition = z.object({
    default: z.number().optional()
        .describe('Whether the stream is the default.'),
    dub: z.number().optional()
        .describe('Whether the stream is a dub.'),
    original: z.number().optional()
        .describe('Whether the stream is the original.'),
    comment: z.number().optional()
        .describe('Whether the stream is a comment.'),
    lyrics: z.number().optional()
        .describe('Whether the stream is lyrics.'),
    karaoke: z.number().optional()
        .describe('Whether the stream is karaoke.'),
    forced: z.number().optional()
        .describe('Whether the stream is forced.'),
    hearing_impaired: z.number().optional()
        .describe('Whether the stream is hearing impaired.'),
    visual_impaired: z.number().optional()
        .describe('Whether the stream is visual impaired.'),
    clean_effects: z.number().optional()
        .describe('Whether the stream has clean effects.'),
    attached_pic: z.number().optional()
        .describe('Whether the stream is an attached picture.'),
    timed_thumbnails: z.number().optional()
        .describe('Whether the stream is timed thumbnails.'),
})
    .describe('Disposition of the stream.');
export const FfprobeStream = z.object({
    index: z.number()
        .describe('The index of the stream.'),
    codec_name: z.string().optional()
        .describe('The name of the codec.'),
    codec_long_name: z.string().optional()
        .describe('The long name of the codec.'),
    profile: z.string().optional() // Upstream reports number.
        .describe('The profile of the codec.'),
    codec_type: z.string().optional()
        .describe('The type of the codec.'),
    codec_time_base: z.string().optional()
        .describe('The time base of the codec.'),
    codec_tag_string: z.string().optional()
        .describe('The tag string of the codec.'),
    codec_tag: z.string().optional()
        .describe('The tag of the codec.'),
    width: z.number().optional()
        .describe('The width of the video stream.'),
    height: z.number().optional()
        .describe('The height of the video stream.'),
    coded_width: z.number().optional()
        .describe('The coded width of the video stream.'),
    coded_height: z.number().optional()
        .describe('The coded height of the video stream.'),
    has_b_frames: z.number().optional()
        .describe('Whether the video stream has B-frames.'),
    sample_aspect_ratio: z.string().optional()
        .describe('The sample aspect ratio (SAR) of the video stream.'),
    display_aspect_ratio: z.string().optional()
        .describe('The display aspect ratio (DAR) of the video stream.'),
    pix_fmt: z.string().optional()
        .describe('The pixel format of the video stream.'),
    level: z.string().optional()
        .describe('The level of the video stream.'),
    color_range: z.string().optional()
        .describe('The color range of the video stream.'),
    color_space: z.string().optional()
        .describe('The color space of the video stream.'),
    color_transfer: z.string().optional()
        .describe('The color transfer of the video stream.'),
    color_primaries: z.string().optional()
        .describe('The color primaries of the video stream.'),
    chroma_location: z.string().optional()
        .describe('The chroma location of the video stream.'),
    field_order: z.string().optional()
        .describe('The field order of the video stream.'),
    timecode: z.string().optional()
        .describe('The timecode of the video stream.'),
    refs: z.number().optional()
        .describe('The number of reference frames.'),
    id: z.string().optional()
        .describe('The ID of the stream.'),
    r_frame_rate: z.string().optional()
        .describe('The frame rate of the video stream.'),
    avg_frame_rate: z.string().optional()
        .describe('The average frame rate of the video stream.'),
    time_base: z.string().optional()
        .describe('The time base of the video stream.'),
    start_pts: z.number().optional()
        .describe('The start PTS of the video stream.'),
    start_time: z.number().optional()
        .describe('The start time of the video stream.'),
    duration_ts: z.number().optional() // Upstream reports string.
        .describe('The duration in time base units.'),
    duration: z.number().optional() // Upstream reports string.
        .describe('The duration in seconds.'),
    bit_rate: z.string().optional()
        .describe('The bit rate of the video stream.'),
    max_bit_rate: z.string().optional()
        .describe('The maximum bit rate of the video stream.'),
    bits_per_raw_sample: z.number().optional() // Upstream reports string.
        .describe('The bits per raw sample of the video stream.'),
    nb_frames: z.string().optional()
        .describe('The number of frames.'),
    nb_read_frames: z.string().optional()
        .describe('The number of read frames.'),
    nb_read_packets: z.string().optional()
        .describe('The number of read packets.'),
    sample_fmt: z.string().optional()
        .describe('The sample format of the audio stream.'),
    sample_rate: z.number().optional()
        .describe('The sample rate of the audio stream.'),
    channels: z.number().optional()
        .describe('The number of channels of the audio stream.'),
    channel_layout: z.string().optional()
        .describe('The channel layout of the audio stream.'),
    bits_per_sample: z.number().optional()
        .describe('The bits per sample of the audio stream.'),
    disposition: FfprobeStreamDisposition.optional()
        .describe('The disposition of the stream.'),
    rotation: z.union([z.string(), z.number()]).optional()
        .describe('The rotation of the video stream.'),
})
    .describe('Stream metadata from the ffprobe tool.');
export const FfprobeFormat = z.object({
    filename: z.string().optional()
        .describe('The filename of the file.'),
    nb_streams: z.number().optional()
        .describe('The number of streams.'),
    nb_programs: z.number().optional()
        .describe('The number of programs.'),
    format_name: z.string().optional()
        .describe('The name of the format.'),
    format_long_name: z.string().optional()
        .describe('The long name of the format.'),
    start_time: z.number().optional()
        .describe('The start time of the file.'),
    duration: z.number().optional()
        .describe('The duration of the file.'),
    size: z.number().optional()
        .describe('The size of the file.'),
    bit_rate: z.number().optional()
        .describe('The bit rate of the file.'),
    probe_score: z.number().optional()
        .describe('The probe score of the file.'),
    tags: z.record(z.string(), z.union([z.string(), z.number()])).optional()
        .describe('The tags of the file.'),
})
    .describe('Format metadata from the ffprobe tool.');
export const FfprobeData = z.object({
    streams: z.array(FfprobeStream)
        .describe('The streams of the file.'),
    format: FfprobeFormat,
    //chapters: z.array(z.unknown()),
})
    .describe('Metadata from the ffprobe tool.');
//# sourceMappingURL=ffprobe-data.schema.js.map