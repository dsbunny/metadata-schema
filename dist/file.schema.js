// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// File metadata
import * as z from "zod";
import { S3URI } from "./uri.schema.js";
export const FileStatAndChecksums = z.object({
    s3_filename: z.string().min(1).max(255) // Matching Google Drive.
        .describe('The name of the file.'),
    content_type: z.string().min(5).max(255)
        .describe('The MIME type of the file.'),
    size: z.number().min(20).max(5497558138880) // 5TB
        .describe('The size of the file in bytes.'),
    mtime: z.string().datetime({ offset: true })
        .describe('The last modified time of the file.'),
    md5: z.string().length(24) // Base64 encoded 16 bytes.
        .describe('The MD5 checksum of the file.'),
    sha256: z.string().length(44)
        .describe('The SHA-256 checksum of the file.'),
    s3_uri: S3URI.min(2).max(2048)
        .describe('The URI of the file in S3.'),
    s3_version_id: z.string().min(2).max(255)
        .describe('The version ID of the file in S3.'),
    s3_etag: z.string().min(2).max(2048)
        .describe('The ETag of the file in S3.'),
    s3_parts: z.array(z.number().min(20).max(5497558138880)).min(1).max(10000)
        .describe('The size of each part of the file in S3.'),
})
    .describe('The file metadata.');
//# sourceMappingURL=file.schema.js.map