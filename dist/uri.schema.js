// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
// REF: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
import * as z from "zod";
// Basic URI validation using regex
export const URI = z.string().regex(/^([a-z][a-z0-9+.-]*):(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?$/, 'Invalid URI format');
// Specialised URI validation for S3 URIs
export const S3URI = z.string().regex(/^s3:\/\/[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\/.*)?$/, 'Invalid S3 URI format');
// Basic URN validation using regex
export const URN = z.string().regex(/^urn:[a-z0-9][a-z0-9-]{0,31}:[a-z0-9()+,\-.:=@;$_!*'%]+$/, 'Invalid URN format');
//# sourceMappingURL=uri.schema.js.map