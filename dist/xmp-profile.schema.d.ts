import * as z from "zod";
export declare const XmpProfile: z.ZodObject<{
    keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    rating: z.ZodOptional<z.ZodNumber>;
    location: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodString>;
    attribution: z.ZodOptional<z.ZodString>;
    terms: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type XmpProfile = z.infer<typeof XmpProfile>;
//# sourceMappingURL=xmp-profile.schema.d.ts.map