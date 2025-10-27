import * as z from "zod";
export declare const FormatEnum: z.ZodEnum<{
    input: "input";
    avif: "avif";
    dz: "dz";
    fits: "fits";
    gif: "gif";
    heif: "heif";
    jpeg: "jpeg";
    jpg: "jpg";
    jp2: "jp2";
    jxl: "jxl";
    magick: "magick";
    openslide: "openslide";
    pdf: "pdf";
    png: "png";
    ppm: "ppm";
    raw: "raw";
    svg: "svg";
    tiff: "tiff";
    tif: "tif";
    v: "v";
    webp: "webp";
}>;
export type FormatEnum = z.infer<typeof FormatEnum>;
export declare const ColourspaceEnum: z.ZodEnum<{
    multiband: "multiband";
    "b-w": "b-w";
    bw: "bw";
    cmyk: "cmyk";
    srgb: "srgb";
}>;
export type ColourspaceEnum = z.infer<typeof ColourspaceEnum>;
export declare const Channels: z.ZodNumber;
export type Channels = z.infer<typeof Channels>;
export declare const LevelMetadata: z.ZodObject<{
    width: z.ZodNumber;
    height: z.ZodNumber;
}, z.core.$strip>;
export type LevelMetadata = z.infer<typeof LevelMetadata>;
export declare const SharpMetadata: z.ZodObject<{
    orientation: z.ZodOptional<z.ZodNumber>;
    format: z.ZodOptional<z.ZodEnum<{
        input: "input";
        avif: "avif";
        dz: "dz";
        fits: "fits";
        gif: "gif";
        heif: "heif";
        jpeg: "jpeg";
        jpg: "jpg";
        jp2: "jp2";
        jxl: "jxl";
        magick: "magick";
        openslide: "openslide";
        pdf: "pdf";
        png: "png";
        ppm: "ppm";
        raw: "raw";
        svg: "svg";
        tiff: "tiff";
        tif: "tif";
        v: "v";
        webp: "webp";
    }>>;
    size: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    space: z.ZodOptional<z.ZodEnum<{
        multiband: "multiband";
        "b-w": "b-w";
        bw: "bw";
        cmyk: "cmyk";
        srgb: "srgb";
    }>>;
    channels: z.ZodOptional<z.ZodNumber>;
    depth: z.ZodOptional<z.ZodString>;
    density: z.ZodOptional<z.ZodNumber>;
    chromaSubsampling: z.ZodOptional<z.ZodString>;
    isProgressive: z.ZodOptional<z.ZodBoolean>;
    pages: z.ZodOptional<z.ZodNumber>;
    pageHeight: z.ZodOptional<z.ZodNumber>;
    loop: z.ZodOptional<z.ZodNumber>;
    delay: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
    pagePrimary: z.ZodOptional<z.ZodNumber>;
    hasProfile: z.ZodOptional<z.ZodBoolean>;
    hasAlpha: z.ZodOptional<z.ZodBoolean>;
    compression: z.ZodOptional<z.ZodEnum<{
        av1: "av1";
        hevc: "hevc";
    }>>;
    background: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
        r: z.ZodNumber;
        g: z.ZodNumber;
        b: z.ZodNumber;
    }, z.core.$strip>, z.ZodNumber]>>;
    levels: z.ZodOptional<z.ZodArray<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, z.core.$strip>>>;
    subifds: z.ZodOptional<z.ZodNumber>;
    resolutionUnit: z.ZodOptional<z.ZodEnum<{
        inch: "inch";
        cm: "cm";
    }>>;
    formatMagick: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SharpMetadata = z.infer<typeof SharpMetadata>;
//# sourceMappingURL=sharp-metadata.schema.d.ts.map