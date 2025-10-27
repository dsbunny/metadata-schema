import * as z from "zod";
export declare const IptcProfile: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodString>;
    credit: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    dateCreated: z.ZodOptional<z.ZodString>;
    byline: z.ZodOptional<z.ZodString>;
    bylineTitle: z.ZodOptional<z.ZodString>;
    captionWriter: z.ZodOptional<z.ZodString>;
    headline: z.ZodOptional<z.ZodString>;
    copyright: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type IptcProfile = z.infer<typeof IptcProfile>;
//# sourceMappingURL=iptc-profile.schema.d.ts.map