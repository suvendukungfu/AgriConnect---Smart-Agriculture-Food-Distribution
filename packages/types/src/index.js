"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(['farmer', 'buyer', 'agronomist', 'admin', 'super_admin']),
    permissions: zod_1.z.array(zod_1.z.string()),
    region: zod_1.z.string().optional(),
    avatarUrl: zod_1.z.string().optional(),
});
