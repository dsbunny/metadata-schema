// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// Derived from Sharp.Metadata in sharp.d.ts.
import * as z from "zod";
export const FormatEnum = z.enum([
    'avif',
    'dz',
    'fits',
    'gif',
    'heif',
    'input',
    'jpeg',
    'jpg',
    'jp2',
    'jxl',
    'magick',
    'openslide',
    'pdf',
    'png',
    'ppm',
    'raw',
    'svg',
    'tiff',
    'tif',
    'v',
    'webp',
])
    .describe('Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg.');
export const ColourspaceEnum = z.enum([
    'multiband',
    'b-w',
    'bw',
    'cmyk',
    'srgb',
])
    .describe('Name of colour space interpretation.');
// 3 for sRGB, 4 for CMYK.
export const Channels = z.number().min(3).max(4)
    .describe('Number of bands e.g. 3 for sRGB, 4 for CMYK.');
export const LevelMetadata = z.object({
    width: z.number(),
    height: z.number(),
});
export const SharpMetadata = z.object({
    orientation: z.number().optional()
        .describe('Number value of the EXIF Orientation header, if present.'),
    format: FormatEnum.optional(),
    size: z.number().optional()
        .describe('Total size of image in bytes.'),
    width: z.number().optional()
        .describe('Number of pixels wide (EXIF orientation is not taken into consideration).'),
    height: z.number().optional()
        .describe('Number of pixels high (EXIF orientation is not taken into consideration).'),
    space: ColourspaceEnum.optional(),
    channels: Channels.optional(),
    depth: z.string().optional()
        .describe('Name of pixel depth format e.g. uchar, char, ushort, float ...'),
    density: z.number().optional()
        .describe('Number of pixels per inch (DPI), if present.'),
    chromaSubsampling: z.string().optional() // Upstream marks as required.
        .describe('String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK.'),
    isProgressive: z.boolean().optional()
        .describe('Boolean indicating whether the image is interlaced using a progressive scan.'),
    pages: z.number().optional()
        .describe('Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP.'),
    pageHeight: z.number().optional()
        .describe('Number of pixels high each page in a multi-page image will be.'),
    loop: z.number().optional()
        .describe('Number of times to loop an animated image, zero refers to a continuous loop.'),
    delay: z.array(z.number()).optional()
        .describe('Delay in ms between each page in an animated image, provided as an array of integers.'),
    pagePrimary: z.number().optional()
        .describe('Number of the primary page in a HEIF image.'),
    hasProfile: z.boolean().optional()
        .describe('Boolean indicating the presence of an embedded ICC profile.'),
    hasAlpha: z.boolean().optional()
        .describe('Boolean indicating the presence of an alpha transparency channel.'),
    // Explicitly leave out Buffer fields as provided separately in metadata container.
    //exif: z.string().optional(),
    //icc: z.string().optional(),
    //iptc: z.string().optional(),
    //xmp: z.string().optional(),
    //tifftagPhotoshop: z.buffer().optional(),
    compression: z.enum(['av1', 'hevc']).optional()
        .describe('The encoder used to compress an HEIF file, `av1` (AVIF) or `hevc` (HEIC).'),
    background: z.union([z.object({
            r: z.number(),
            g: z.number(),
            b: z.number(),
        }), z.number()]).optional()
        .describe('Default background colour, if present, for PNG (bKGD) and GIF images, either an RGB Object or a single greyscale value.'),
    levels: z.array(LevelMetadata).optional()
        .describe('Details of each level in a multi-level image provided as an array of objects.'),
    subifds: z.number().optional()
        .describe('Number of Sub Image File Directories in an OME-TIFF image.'),
    resolutionUnit: z.enum(['inch', 'cm']).optional()
        .describe('The unit of resolution (density).'),
    formatMagick: z.string().optional()
        .describe('String containing format for images loaded via *magick.'),
})
    .describe('Metadata from the sharp image processing library.');
//# sourceMappingURL=sharp-metadata.schema.js.map