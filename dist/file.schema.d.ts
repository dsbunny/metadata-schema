import * as z from "zod";
export declare const FileStatAndChecksums: z.ZodObject<{
    s3_filename: z.ZodString;
    content_type: z.ZodString;
    size: z.ZodNumber;
    mtime: z.ZodString;
    md5: z.ZodString;
    sha256: z.ZodString;
    s3_uri: z.ZodString;
    s3_version_id: z.ZodString;
    s3_etag: z.ZodString;
    s3_parts: z.ZodArray<z.ZodNumber>;
}, z.core.$strip>;
export type FileStatAndChecksums = z.infer<typeof FileStatAndChecksums>;
//# sourceMappingURL=file.schema.d.ts.map