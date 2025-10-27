import * as z from "zod";
export declare const IccProfile: z.ZodObject<{
    version: z.ZodEnum<{
        "2.0": "2.0";
        2.1: "2.1";
        2.4: "2.4";
        "4.0": "4.0";
        4.2: "4.2";
        4.3: "4.3";
        4.4: "4.4";
    }>;
    intent: z.ZodEnum<{
        Saturation: "Saturation";
        Perceptual: "Perceptual";
        Relative: "Relative";
        Absolute: "Absolute";
    }>;
    cmm: z.ZodOptional<z.ZodString>;
    colorSpace: z.ZodOptional<z.ZodString>;
    connectionSpace: z.ZodOptional<z.ZodString>;
    copyright: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    deviceClass: z.ZodOptional<z.ZodEnum<{
        Scanner: "Scanner";
        Monitor: "Monitor";
        Printer: "Printer";
        Link: "Link";
        Abstract: "Abstract";
        Space: "Space";
        "Named color": "Named color";
    }>>;
    deviceModelDescription: z.ZodOptional<z.ZodString>;
    manufacturer: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodEnum<{
        Apple: "Apple";
        Adobe: "Adobe";
        Microsoft: "Microsoft";
        "Sun Microsystems": "Sun Microsystems";
        "Silicon Graphics": "Silicon Graphics";
        Taligent: "Taligent";
    }>>;
    viewingConditionsDescription: z.ZodOptional<z.ZodString>;
    whitepoint: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber, z.ZodNumber], null>>;
}, z.core.$strip>;
export type IccProfile = z.infer<typeof IccProfile>;
//# sourceMappingURL=icc-profile.schema.d.ts.map