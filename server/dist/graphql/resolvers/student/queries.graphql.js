"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = {
    getStudentByUserID(_parent, args, { prisma }) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield prisma.student.findUnique({
                where: {
                    userID: args.id,
                },
                include: {
                    lorApplications: true,
                    reminders: true,
                    testScores: true,
                    user: {
                        include: {
                            department: true,
                        },
                    },
                },
            });
            return student;
        });
    },
};
//# sourceMappingURL=queries.graphql.js.map